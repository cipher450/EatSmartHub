import React from 'react'
import ProductList from '../ProductList'
export default function Menu() {
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
