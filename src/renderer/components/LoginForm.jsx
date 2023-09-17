import React, { useEffect, useState } from 'react';

import { Button, Input, SelectPicker, Notification, useToaster } from 'rsuite';

export default function LoginForm({ SetUser }) {
  const toaster = useToaster();
  const data = ['Admin', 'Caisse'].map((item) => ({
    label: item,
    value: item,
  }));
  const [UserData, SetUserData] = useState({
    role: 'none',
    password: '',
  });
  console.log(UserData);
   
  function handleLogin() {
    if (UserData.password != undefined) {
      window.electron.ipcRenderer.sendMessage('userLogin', UserData);
    }
    window.electron.ipcRenderer.once('userLogin', (arg) => {
      // eslint-disable-next-line no-console
      if (arg) {
        SetUser({
          role: UserData.role,
          connected: true,
        });
      } else {
        
        toaster.push(message, { placement:'topCenter' })
      }
    });
    /*
  
   
  */
  }
  const message = (
    <Notification type={'error'} header={'erreur'}  closable>
       <span className='text-1xl font-semibold'>Mot de pass incorrect ! </span>
    </Notification>
  );
  return (
    <div className="m-auto background1 text-black w-full flex h-screen items-center justify-center ">
    
   
     
      <div className="flex flex-col gap-5 md:w-1/3  lg:w-1/4 m-auto  bg-white p-5 rounded-md">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span>Utilisateur</span>
          </div>
          <SelectPicker
            data={data}
            placeholder=""
            searchable={false}
            onChange={(e) => {
              SetUserData((prevData) => ({
                ...prevData,
                role: e,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span>Mot de pass</span>
          </div>
          <Input
            type="password"
            value={UserData.password}
            onChange={(e) => {
              SetUserData((prevData) => ({
                ...prevData,
                password: e,
              }));
            }}
          />
        </div>
        <div className="flex gap-2 w-full ">
          <Button className="bg-red-600 text-white hover:bg-red-500 w-full">
            Exit
          </Button>
          <Button
            className="bg-green-600 text-white hover:bg-green-500 w-full"
            onClick={handleLogin}
          >
            Connexion
          </Button>
        </div>
      </div>
    </div>
  );
}
