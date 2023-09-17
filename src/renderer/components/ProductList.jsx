import React, { useEffect, useState } from 'react';
import FiltreIcon from '@rsuite/icons/legacy/Filter';
import EditIcon from '@rsuite/icons/Edit';
import ClearIcon from '@rsuite/icons/Table';
import {
  Modal,
  Button,
  Input,
  Placeholder,
  SelectPicker,
  InputNumber,
  Table,
} from 'rsuite';
import ItemDetails from './controles/ItemDetails';

const { Column, HeaderCell, Cell } = Table;

export default function ProductList({ editable,SetPosSelectedItem }) {
  const [open, setOpen] = React.useState(false);
  const [ItemFiltre, SetItemFiltre] = useState({
    name: '',
    categorie: '',
    price: '',
  });
  const [Selecteditem, SetSelectedItem] = useState(null);
  const [detailsOpen, SetDetailsOpen] = useState(false);
  const [categories, SetCategories] = useState([
    {
      name: '',
      category_id: '',
    },
  ]);
  const [itemList, SetItemList] = useState([{}]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const config = {
    currency: ' Da',
  };

  function getCategories() {
    const payload = {
      action: 'get',
      payload: '',
    };

    window.electron.ipcRenderer.sendMessage('categories', payload);

    //response
    window.electron.ipcRenderer.once('categoriesList', (arg) => {
      if (arg) {
        SetCategories(arg);
      }
    });
  }

  function itemBox(id, img, name, price) {
    return (
      <div
        className="text-black hover:bg-gray-200 rounded-md flex flex-col items-center gap-2 "
        onClick={() => {

          window.electron.ipcRenderer.sendMessage('items', {payload:id,action:'getOne'});

          //response
          window.electron.ipcRenderer.once('itemsList', (arg) => {
            if (arg) {
              SetPosSelectedItem('add',arg);
            }
          });
        
        }}
      >
        <img src={img} alt="" width={'64px'} height={'64px'} />

        <div className="flex flex-col  items-center m-0">
          <span className="">{name}</span>
          <span>
            {price} {config.currency}
          </span>
        </div>
      </div>
    );
  }

  const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div
        style={{
          width: 40,
          height: 40,
          background: '#f5f5f5',
          borderRadius: 6,
          marginTop: 2,
          overflow: 'hidden',
          display: 'inline-block',
        }}
      >
        <img src={rowData.avatar} width="40" />
      </div>
    </Cell>
  );
  console.log('Re rendred');
  function crudtItems(action) {
    let payload = {
      action: 'get',
      payload: '',
    };

    switch (action) {
      case 'get':
        payload.action = 'get';
        window.electron.ipcRenderer.sendMessage('items', payload);

        //response
        window.electron.ipcRenderer.once('itemsList', (arg) => {
          if (arg) {
            SetItemList(arg);
          }
        });
        break;

      case 'filtre':
        payload.action = 'filtre';
        payload.payload = ItemFiltre;
        window.electron.ipcRenderer.sendMessage('items', payload);

        //response
        window.electron.ipcRenderer.once('itemsList', (arg) => {
          if (arg) {
            SetItemList(arg);
          }
        });
        break;
    }
  }
  useEffect(() => {
    getCategories();
    crudtItems('get');
  }, [0]);
  const data = categories.map((item) => ({
    label: item.name,
    value: item.category_id,
  }));

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex gap-1">
        <Input
          placeholder="Nom du produit"
          className=""
          value={ItemFiltre.name}
          onChange={(e) => {
            SetItemFiltre((prevItem) => ({
              ...prevItem,
              name: e,
            }));
            crudtItems('filtre');
          }}
        ></Input>
        <Button
          onClick={handleOpen}
          startIcon={<FiltreIcon color="white" />}
          className="bg-blue-600"
        ></Button>
        <Button
          onClick={() => {
            SetItemFiltre({ name: '', categorie: '', price: '' });
            crudtItems('filtre');
          }}
          startIcon={<ClearIcon color="white" />}
          className="bg-blue-600"
        ></Button>
      </div>
      <div
        className={
          editable
            ? 'h-screen'
            : 'flex flex-wrap gap-5 overflow-y-scroll justify-center h-screen '
        }
      >
        {editable ? (
          <Table
            bordered
            fillHeight
            loading={!itemList && true}
            className="text-black"
            data={itemList && itemList}
          >
            <Column width={80} align="center">
              <HeaderCell>Image</HeaderCell>
              <ImageCell dataKey="image_url" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Nom</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Prix</HeaderCell>
              <Cell dataKey="price" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column align="center" flexGrow>
              <HeaderCell>Category</HeaderCell>
              <Cell dataKey="categories.name" />
            </Column>

            <Column flexGrow>
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {(rowData) => (
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-500 text-white"
                      onClick={() => {
                        SetSelectedItem(rowData.item_id);
                        SetDetailsOpen(true);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        ) : (
          itemList.map((item) =>
            itemBox(item.item_id, item.image_url, item.name, item.price)
          )
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Recherche avancer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex  flex-col gap-3">
          <Input
            placeholder="Nom du produit"
            className=""
            value={ItemFiltre.name}
            onChange={(e) => {
              SetItemFiltre((prevItem) => ({
                ...prevItem,
                name: e,
              }));
            }}
          />
          <SelectPicker
            data={data}
            className="w-full"
            placeholder=""
            searchable={false}
            onChange={(e) => {
              alert(e);
              SetItemFiltre((prevItem) => ({
                ...prevItem,
                categorie: e,
              }));
            }}
          />
          <InputNumber
            placeholder="Prix"
            className=""
            value={ItemFiltre.price}
            onChange={(e) => {
              SetItemFiltre((prevItem) => ({
                ...prevItem,
                price: Number(e),
              }));
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              crudtItems('filtre');
              handleClose();
            }}
            className="bg-blue-600 text-white"
          >
            Ok
          </Button>
          <Button onClick={handleClose} className="bg-red-400 text-white">
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
