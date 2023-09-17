import React, { useEffect, useState } from 'react';
import { Modal, Button, List, Input, Notification, useToaster } from 'rsuite';
import ConfirmationBox from './Confirmation';
export default function CategorieEdit({ btnText, btnIcon, btnClass }) {


    // PROBLEM : THE LIST DOES NOT UPDATE AFTER CRUD OPERATIONS
  const [open, setOpen] = useState(false);
  const [SelectedCategorie, SetSelectedCategorie] = useState({});
  const [Categories, SetCategories] = useState([{}]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCategorieOpen = () => SetAddCategorieOpen(true);
  const handleCategorieClose = () => {
    SetAddCategorieOpen(false);
  };
  const [AddCategorieOpen, SetAddCategorieOpen] = useState(false);
  const [NewCategorieName,SetNewCategorieName] = useState("")
 
 
  const AddcategorieModal = (
    <Modal open={AddCategorieOpen} onClose={handleCategorieClose}>
      <Modal.Header>
        <span className="text-md font-semibold">
          Ajouter une nouvelle categorie
        </span>
      </Modal.Header>
      <Modal.Body>
        <Input placeholder="nom de la categorie" onChange={(e)=>{SetNewCategorieName(e)}} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={()=>{CrudCategories('add')
          handleCategorieClose()}}
          className="bg-green-500 text-white"
        >
          Ajouter
        </Button>
        <Button
          onClick={handleCategorieClose}
          className="bg-red-500 text-white"
        >
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  )
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
        payload.payload = SelectedCategorie.category_id;
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
        payload.payload = NewCategorieName;
        window.electron.ipcRenderer.sendMessage('categories', payload);
        //response
        window.electron.ipcRenderer.once('categoriesList', (arg) => {
          if (arg) {
            SetCategories(arg);
          }
        });
        break;
      case 'update':
        payload.action = 'update';
        payload.payload = SelectedCategorie;
        window.electron.ipcRenderer.sendMessage('categories', payload);
        //response
        window.electron.ipcRenderer.once('categoriesList', (arg) => {
          if (arg) {
            SetCategories(arg);
          }
        });
        break;
    }
  }
  useEffect(() => {
    CrudCategories('get');
  }, [0]);
  console.log('item id ');
  return (
    <>
      <Button className={btnClass} onClick={handleOpen} startIcon={btnIcon}>
        {btnText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex">
            <div className="w-2/3 h-96 overflow-y-scroll ">
              <List bordered>
                {Categories &&
                  Categories.map((item) => (
                    <List.Item
                      className={
                        SelectedCategorie.category_id == item.category_id
                          ? 'hover:bg-gray-300 bg-gray-300 text-white'
                          : 'hover:bg-gray-300 '
                      }
                      onClick={() => {
                        SetSelectedCategorie(item);
                      }}
                    >
                      {item.name}
                    </List.Item>
                  ))}
              </List>
            </div>

            <div className="flex flex-col gap-2 w-2/6 mr-3 ml-3">
                {AddcategorieModal}
              <Button className="bg-blue-500 text-white " onClick={()=>{SetAddCategorieOpen(true)}}>Ajouter</Button>
              <Button className="bg-green-500 text-white " onClick={()=>{CrudCategories('update')}}>Modifer</Button>
              <ConfirmationBox
                OnConfirm={() => {
                  {
                    SelectedCategorie && CrudCategories('delete');
                  }
                }}
                message={'Cliquer sur oui pour Supprimer cette categorie.'}
                title={'Supprimer categorie'}
                btnText={'Supprimer'}
                btnClass={'text-center text-white  bg-red-500'}
              />
              <div className="flex flex-col gap-2 mt-5">
                <span>Nom de la categorie</span>
                <Input value={SelectedCategorie.name} onChange={(e)=>{SetSelectedCategorie((prev)=>({
                    ...prev ,
                    name:e
                }))}} />
              </div>
            </div>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}
