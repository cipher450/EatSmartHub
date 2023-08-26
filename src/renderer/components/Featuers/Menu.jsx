import React ,{useState,useEffect} from 'react'
import ProductList from '../ProductList'
 
 export default function Menu() {
  const payload = {
    action: 'get',
    payload: '',
  };
  const [items,Setitems] = useState()
  function getItems(){
    payload.action = 'get';
    window.electron.ipcRenderer.sendMessage('items', payload);

    //response
    window.electron.ipcRenderer.once('itemsList', (arg) => {
      if (arg) {
        SetTables(arg);
      }
    });
  }
  useEffect(() => {
    getTables();
  });
    const items=[
        {
            id:1,
            img:'https://static.vecteezy.com/system/resources/previews/021/665/613/original/beef-burger-isolated-png.png',
            name:'burger',
            price:210
        }
    ]
    //
  return (
    <div>
      <ProductList items={items}/>
    </div>
  )
}
