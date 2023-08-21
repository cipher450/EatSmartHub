import React, { useState } from 'react';
import FiltreIcon from '@rsuite/icons/legacy/Filter';

import { Modal, Button, Input, Placeholder,SelectPicker,InputNumber } from 'rsuite';

export default function ProductList({ items, editable, SetSelectedItem }) {
  const [open, setOpen] = React.useState(false);
  const data = [
    'Entrées',
    'Salades',
    'Plats principaux',
    'Burgers/Sandwichs',
    'Pizzas',
    'Pâtes',
    'Fruits de mer',
    'Poulet',
    'Végétarien/Végétalien',
    'Accompagnements/Collations',
    'Boissons',
    'Desserts',
    'Menu Enfants',
    'Spécialités/Plats en Vedette',
    'Repas Combinés',
    'Petit-déjeuner',
    'Soupes',
    'Wraps/Bols',
    'Alcools/Forfaits Boissons',
    'Catering/Forfaits Événements',
  ].map((item) => ({
    label: item,
    value: item,
  }));
  const [ItemFiltre, SetItemFiltre] = useState({
    name: '',
    categorie: '',
    price: '',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const config = {
    currency: ' Da',
  };

  function itemBox(id, img, name, price) {
    return (
      <div className="text-black hover:bg-gray-200 rounded-md">
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/665/613/original/beef-burger-isolated-png.png"
          alt=""
          width={'125px'}
        />
        <div className="flex flex-col  items-center m-0">
          <span className="">Burger</span>
          <span>210 {config.currency}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-wrap gap-5 overflow-y-scroll justify-center h-full ">
        {items.map((item) => itemBox(item.id, item.img, item.name, item.price))}
      </div>
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
          }}
        ></Input>
        <Button
          onClick={handleOpen}
          startIcon={<FiltreIcon color="white" />}
          className="bg-blue-600"
        ></Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Recherche avancer</Modal.Title>
        </Modal.Header>
        <Modal.Body className='flex  flex-col gap-3'>
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
            className='w-full'
            placeholder=""
            searchable={false}
            onChange={(e) => {
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
                price: e,
              }));
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="bg-blue-600 text-white">
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
