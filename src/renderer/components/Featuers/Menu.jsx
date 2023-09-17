import React, { useState, useEffect } from 'react';
import ProductList from '../ProductList';

export default function Menu() {
  console.log('random console log')

  return (
    <div className='m-5'>
      <ProductList  editable={true}/>
    </div>
  );
}
