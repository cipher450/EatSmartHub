import React, { useState } from 'react';

import Rtable from '../Table';
import ProductList from '../ProductList';

import { Table, Button } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

export default function POS() {
  const [SelectedTable, SetSelectedTable] = useState(0);
  const items=[
    {
        id:1,
        img:'https://static.vecteezy.com/system/resources/previews/021/665/613/original/beef-burger-isolated-png.png',
        name:'burger',
        price:210
    }
]
  const tbls = [
    {
      num: 1,
      state: true,
    },
    {
      num: 2,
      state: false,
    },
    {
      num: 3,
      state: true,
    },
    {
      num: 4,
      state: false,
    },
    {
      num: 4,
      state: false,
    },
    {
      num: 4,
      state: false,
    },
    {
      num: 4,
      state: false,
    },
    {
      num: 4,
      state: false,
    },
    {
      num: 4,
      state: false,
    },
  ];

  const caisse = (
    <div className=" text-white  " style={{ height: '80vh' }}>
      <div className="flex ">
        <span className="text-3xl  p-5  w-full bg-blue-950 " >
          Table N°{SelectedTable}
        </span>
       
      </div>
      <div className="flex w-full  " style={{ height: '80vh' }}>
       <div className="flex flex-col " style={{width:'60%'}}>
       <Table
          bordered
          fillHeight
          className="text-black"
         
          data={[
            {
              prod: 'Coca cola',
              qte: 5,
              price: 450,
            },
            {
              prod: 'Tacos XL',
              qte: 2,
              price: 1500,
            },
            {
              prod: 'Tacos XL',
              qte: 2,
              price: 1500,
            },
            {
              prod: 'Tacos XL',
              qte: 2,
              price: 1500,
            },
            {
              prod: 'Tacos XL',
              qte: 2,
              price: 1500,
            },
            {
              prod: 'Tacos XL',
              qte: 2,
              price: 1500,
            },
          ]}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column align="center" width={300}>
            <HeaderCell>Item</HeaderCell>
            <Cell dataKey="prod" />
          </Column>

          <Column align="center" width={100}>
            <HeaderCell>Quantité</HeaderCell>
            <Cell dataKey="qte" />
          </Column>

          <Column align="center" width={150}>
            <HeaderCell>Prix</HeaderCell>
            <Cell dataKey="price" />
          </Column>

          <Column>
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
          <ProductList  items={items}/>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col justify-between h-full">
      {SelectedTable === 0 && (
        <div className="w-full flex flex-wrap gap-3 justify-center mt-5 ">
          {tbls.map((tbl) => (
            <Rtable
              number={tbl.num}
              occupied={tbl.state}
              SetSelectedTable={SetSelectedTable}
            />
          ))}
        </div>
      )}

      {SelectedTable != 0 && caisse}

      <div className="p-3 flex gap-2 w-full"  style={{ backgroundColor: '#f0f0f0' }}>
        <Button
          appearance="primary"
          
          className="bg-blue-700 h-14 w-full"
          disabled={SelectedTable == 0 && true}
          onClick={() => {
            SetSelectedTable(0);
          }}
        >
          Voir les table
        </Button>
        <Button
          appearance="primary"
          className="bg-blue-700 h-14 w-full"
          disabled={SelectedTable == 0 && true}
          onClick={() => {
            SetSelectedTable(0);
          }}
        >
          Imprimer le Reçu
        </Button>{' '}
        <Button
          appearance="primary"
          className="bg-blue-700 h-14 w-full "
          disabled={SelectedTable == 0 && true}
          onClick={() => {
            SetSelectedTable(0);
          }}
        >
          Diviser la Facture
        </Button>
      </div>
    </div>
  );
}
