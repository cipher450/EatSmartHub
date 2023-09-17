import React, { useState, useEffect } from 'react';

import Rtable from '../Table';
import ProductList from '../ProductList';
import ConfirmationBox from '../controles/Confirmation';
import { Table, Button } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

export default function POS() {
  const [SelectedTable, SetSelectedTable] = useState({
    number: 0,
    status: 0,
  });

  const [Tables, SetTables] = useState([]);
  const [SelectedItem, SetSelectedItem] = useState({});
  const [Order, SetOrder] = useState({
    order_id:''
  });
  const [OrderItems, SetOrderItems] = useState([]);

  async function ipcRender(message, channel, payload, setFunction) {
    window.electron.ipcRenderer.sendMessage(message, payload);

    return new Promise((resolve) => {
      window.electron.ipcRenderer.once(channel, (arg) => {
        if (arg) {
          setFunction(arg);
        }
        resolve(arg);
      });
    });
  }
  console.log('selected', SelectedTable);
  console.log(Order);
  console.log(OrderItems);
  async function handleAddItem(action, item) {
    SetSelectedItem(item);
    const payload = {
      action: '',
      payload:'',
    };
    switch(action){
      case 'add':
        payload.action='add'
        payload.payload= {
          item: item.item_id,
          quantity: 1,
          order_id: Order.order_id,
        }
        ipcRender("ordersItems","ordersItemsList",payload,SetOrderItems)
      break;
      case 'get':
        payload.action='get'
        payload.payload={
          order_id: Order.order_id,
        }
       await ipcRender("ordersItems","ordersItemsList",payload,SetOrderItems)
      break;
      case 'update-add':
        
      break;
    }
    // item_id & qunatity & order_id
  }

  async function CrudOrder(action) {
    const payload = {
      action: '',
      payload: '',
    };
    switch (action) {
      case 'create':
        payload.action = 'create';
        payload.payload = SelectedTable.table_id;
        await ipcRender('orders', 'ordersList', payload, SetOrder);
        break;
      case 'getCurrent':
        payload.action = 'getByTable';
        payload.payload = SelectedTable.table_id;
        await ipcRender('orders', 'ordersList', payload, SetOrder);
        break;
    }
  }

  async function getOrderItems() {
    if (SelectedTable.number != 0) {
      if (SelectedTable.status == 'libre') {
        CrudOrder('create').then(() => {
          changeTableStatus();
        });
      } else {
       // Retrieve the order and wait for it to be available
      CrudOrder('getCurrent');
      
       setTimeout( handleAddItem("get", null),1500)
      
        
      }
    }
  }

  const caisse = (
    <div className=" text-white  " style={{ height: '80vh' }}>
      <div className="flex ">
        <span className="text-3xl  p-5  w-full bg-blue-950 ">
          Table N°{SelectedTable.number}
        </span>
      </div>
      <div className="flex w-full  " style={{ height: '80vh' }}>
        <div className="flex flex-col " style={{ width: '60%' }}>
          <Table
            bordered
            fillHeight
            className="text-black"
            data={OrderItems}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column align="center" flexGrow>
              <HeaderCell>Item</HeaderCell>
              <Cell dataKey="items.name" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Quantité</HeaderCell>
              <Cell dataKey="quantity" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Prix</HeaderCell>
              <Cell dataKey="items.price" />
            </Column>

            <Column flexGrow>
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {(rowData) => (
                  <div className="flex gap-2">
                    <Button
                      className="bg-green-700 text-white"
                      onClick={() => alert(`id:${rowData.id}`)}
                    >
                      +
                    </Button>
                    <Button
                      className="bg-red-700 text-white"
                      onClick={() => alert(`id:${rowData.id}`)}
                    >
                      -
                    </Button>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
          <div className=" bg-green-700 text-4xl font-black   p-5 text-center  ">
            2540 DA
          </div>
        </div>
        <div
          className="p-2 w-2/5 "
          style={{ backgroundColor: '#f0f0f0', height: '80vh' }}
        >
          <ProductList editable={false} SetPosSelectedItem={handleAddItem} />
        </div>
      </div>
    </div>
  );

  //#region  Tables CRUD
  function getTables() {
    const payload = {
      action: 'get',
      payload: '',
    };

    window.electron.ipcRenderer.sendMessage('tables', payload);

    //response
    window.electron.ipcRenderer.once('TableList', (arg) => {
      if (arg) {
        SetTables(arg);
      }
    });
  }
  function addTable() {
    const payload = {
      action: 'add',
      payload: '',
    };

    window.electron.ipcRenderer.sendMessage('tables', payload);

    //response
    window.electron.ipcRenderer.once('TableList', (arg) => {
      if (arg) {
        SetTables(arg);
      }
    });
  }
  function changeTableStatus() {
    const payload = {
      action: 'get',
      payload: '',
    };
    payload.action = 'update';
    payload.payload = {
      table_id: SelectedTable.table_id,
      status: 'ocuper',
    };
    ipcRender('tables', 'TableList', payload, SetSelectedTable);
  }

  //#endregion
  useEffect(  () => {
   getOrderItems();
  }, [SelectedTable]);
  useEffect(() => {
    getTables();
  }, [0]);
  return (
    <div className="flex flex-col justify-between h-full">
      {SelectedTable.number === 0 && (
        <div className="w-full flex flex-wrap gap-3 justify-center mt-5 ">
          {Tables.map((tbl) => (
            <Rtable
              number={tbl.number}
              occupied={tbl.status}
              SetSelectedTable={SetSelectedTable}
              SetTables={SetTables}
              table_id={tbl.table_id}
            />
          ))}
          <div className="p-2 bg-blue-950 rounded-md flex flex-col cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
              </g>
            </svg>
            <div className="text-center text-white font-bold">
              <ConfirmationBox
                OnConfirm={addTable}
                message={'Cliquer sur oui pour ajouter une nouvelle table.'}
                title={'Ajouter une nouvelle table'}
                btnText={'Ajouter Une Table'}
                btnClass={'text-center text-white font-bold bg-blue-950'}
              />
            </div>
          </div>
        </div>
      )}

      {SelectedTable.number != 0 && caisse}

      <div
        className="p-3 flex gap-2 w-full"
        style={{ backgroundColor: '#f0f0f0' }}
      >
        <Button
          appearance="primary"
          className="bg-blue-700 h-14 w-full"
          disabled={SelectedTable.number == 0 && true}
          onClick={() => {
            SetSelectedTable({
              number: 0,
              status: 0,
            });
            getTables();
          }}
        >
          Voir les table
        </Button>
        <Button
          appearance="primary"
          className="bg-blue-700 h-14 w-full"
          disabled={SelectedTable.number == 0 && true}
          onClick={() => {
            SetSelectedTable({
              number: 0,
              status: 0,
            });
          }}
        >
          Imprimer le Reçu
        </Button>{' '}
        <Button
          appearance="primary"
          className="bg-blue-700 h-14 w-full "
          disabled={SelectedTable.number == 0 && true}
          onClick={() => {
            SetSelectedTable({
              number: 0,
              status: 0,
            });
          }}
        >
          Diviser la Facture
        </Button>
      </div>
    </div>
  );
}
