import React, { useState } from 'react';
import Navigation from './components/Navigation';

export default function Dashboard({ User }) {
  const [CurrentView, SetCurrentView] = useState(null);
  return (
    <div className='flex'>
      <Navigation SetView={SetCurrentView}/>
      <div className=' w-full'>
      {CurrentView}
      </div>
    </div>
  );
}
