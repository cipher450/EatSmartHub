import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  ButtonToolbar,
  Form,
  Input,
  SelectPicker,
  InputNumber,
  Toggle,
} from 'rsuite';
import CategorieEdit from './categorieEdit';
import ConfirmationBox from './Confirmation';
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export default function ItemDetails({ item_id, open, setOpen, SetSelected }) {
  console.log('Re rendred')
 
  const handleClose = () => {
    SetSelected(null);
    setOpen(false);
  };
  
  
 

 
  const [currentItem, SetCurrentItem] = useState(null);
  const [SelectedCategorie, SetSelectedCategorie] = useState(0);
  const [categories, SetCategories] = useState([
    {
      name: '',
      category_id: '',
    },
  ]);
  const data = categories.map((item) => ({
    label: item.name,
    value: item.category_id,
  }));

  function CrudItem(action) {
    let payload = {
      action: 'get',
      payload: '',
    };
    if (item_id ) {
   
      switch (action) {
        case 'get':
          payload.action = 'getOne';
          payload.payload = item_id;
          window.electron.ipcRenderer.sendMessage('items', payload);

          //response
          window.electron.ipcRenderer.once('itemsList', (arg) => {
            if (currentItem != arg) {
              SetCurrentItem(arg);
            }
          });
          break;
        case 'update':
          payload.action = 'update';
          payload.payload = currentItem;
          console.log(currentItem)
          window.electron.ipcRenderer.sendMessage('items', payload);

          //response
          window.electron.ipcRenderer.once('itemsList', (arg) => {
            if (arg) {
              SetCurrentItem(arg);
            }
          });
          break;
        case 'delete':
          payload.action = 'delete';
          window.electron.ipcRenderer.sendMessage('items', payload);
          break;
      }
    }
  }
  function CrudCategories(action) {
    let payload = {
      action: 'get',
      payload: '',
    };
    switch (action) {
      case 'get':
        payload.action = 'get';
        window.electron.ipcRenderer.sendMessage('categories', payload);
        //response
        window.electron.ipcRenderer.once('categoriesList', (arg) => {
          if (arg) {
            SetCategories(arg);
          }
        });
        break;
      case 'delete':
        payload.action = 'delete';
        payload.payload = SelectedCategorie;
        window.electron.ipcRenderer.sendMessage('categories', payload);
        //response
        window.electron.ipcRenderer.once('categoriesList', (arg) => {
          if (arg) {
            SetCategories(arg);
          }
        });
        break;
      case 'add':
        payload.action = 'add';
        payload: SelectedCategorie;
        break;
    }
  }

  function addImage() {}
  useEffect(() => {
    CrudItem('get');
  }),[];
    

  useEffect(() => {
    CrudCategories('get');
  }, []);

  if (currentItem) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <span className="font-semibold">{currentItem.name}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="flex gap-5">
            <div>
              <img
                src={currentItem.image_url}
                width={'150px'}
                height={'350px'}
                className="p-5 border  border-rose-600"
                onClick={addImage}
              />
            </div>
            <Form>
              <Form.Group controlId="name">
                <Form.ControlLabel>Nom</Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={currentItem.name}
                  onChange={(e) => {
                    SetCurrentItem((item) => ({
                      ...item,
                      name: e,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group controlId="categories">
                <Form.ControlLabel>Category</Form.ControlLabel>
                <div className="flex gap-1">
                  <SelectPicker
                    data={data}
                    value={currentItem.category_id}
                    onChange={(e) => {
                      SetCurrentItem((item) => ({
                        ...item,
                        category_id: e,
                      }));
                      SetSelectedCategorie(e);
                    }}
                    placeholder=""
                    searchable={false}
                  />
                  <CategorieEdit
                    btnText={'Modifier'}
                    btnClass={'bg-blue-500 text-white'}
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.ControlLabel>Prix</Form.ControlLabel>
                <InputNumber
                  value={currentItem.price}
                  onChange={(e) => {
                    SetCurrentItem((item) => ({
                      ...item,
                      price: e,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group controlId="textarea">
                <Form.ControlLabel>Descriptions</Form.ControlLabel>
                <Form.Control
                  rows={5}
                  name="textarea"
                  accepter={Textarea}
                  value={currentItem.description}
                  onChange={(e) => {
                    SetCurrentItem((item) => ({
                      ...item,
                      description: e,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.ControlLabel>Disponibilité</Form.ControlLabel>
                <Toggle
                  checked={currentItem.status}
                  onChange={(e) => {
                    SetCurrentItem((item) => ({
                      ...item,
                      status: e,
                    }));
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <ConfirmationBox
            OnConfirm={() => {
              CrudItem('update');
              handleClose();
            }}
            btnClass={'bg-green-500 text-white'}
            btnText={'Enregistre'}
            message={'Cliquer sur oui pour enrgister les modification.'}
            title={'Enrgister les modification'}
          />
          <ConfirmationBox
            OnConfirm={() => {
              CrudItem('delete');
              handleClose();
            }}
            btnClass={'bg-red-500 text-white'}
            btnText={'Supprimer'}
            message={'Cliquer sur oui pour Supprimer ce produit.'}
            title={'Supprimer un produit'}
          />
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <></>;
  }
}
