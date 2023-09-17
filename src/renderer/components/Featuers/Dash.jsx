import React, { useEffect, useState } from 'react';
import { Panel } from 'rsuite';
export default function Dash() {
  const [CurentDate, SetCurentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      SetCurentDate(new Date());
    }, 1000); // Update every second (1000 milliseconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className=" m-2  h-screen">

      <span className="text-1xl font-semibold">
        {CurentDate.toLocaleString()}
      </span>

      <div className="flex flex-col  content-around  h-screen ">

      <div className="flex div-1">
        <div className="p-20 bg-black w-2/3 "></div>
        <div className="flex flex-col gap-2 m-2 w-1/3">
          <Panel className="bg-blue-500  w-full">
            <div className="panel-header flex gap-2">
              <span className=" font-bold text-white">Servie aujourdhuit</span>
            </div>
            <div className="panel-body ">
              <span className="text-2xl m-auto text-center font-bold text-white">
                45012
              </span>
            </div>
          </Panel>
          <Panel className="bg-blue-500 w-full">
            <div className="panel-header">
              <span className=" font-bold text-white">En cours</span>
            </div>
            <div className="panel-body ">
              <span className="text-2xl m-auto text-center font-bold text-white">
                4
              </span>
            </div>
          </Panel>
          <Panel className="bg-blue-500 w-full">
            <div className="panel-header">
              <span className=" font-bold text-white">Total depanse</span>
            </div>
            <div className="panel-body ">
              <span className="text-2xl m-auto text-center font-bold text-white">
                100,000,000 $
              </span>
            </div>
          </Panel>
        </div>
      </div>
      <div className="my-4"></div>
      <div className="flex gap-2 div-2 ">
        <Panel className="bg-green-500  w-full">
          <div className="panel-header">
            <span className=" font-bold text-white">Net Profite </span>
          </div>
          <div className="panel-body ">
            <span className="text-2xl m-auto text-center font-bold text-white">
              100,000,000 $
            </span>
          </div>
        </Panel>
        <Panel className="bg-red-500 w-full">
          <div className="panel-header">
            <span className=" font-bold text-white">Depanse</span>
          </div>
          <div className="panel-body ">
            <span className="text-2xl m-auto text-center font-bold text-white">
              100,000,000 $
            </span>
          </div>
        </Panel>
        <Panel className="bg-blue-500 w-full">
          <div className="panel-header">
            <span className=" font-bold text-white">Total</span>
          </div>
          <div className="panel-body ">
            <span className="text-2xl m-auto text-center font-bold text-white">
              100,000,000 $
            </span>
          </div>
        </Panel>
      </div>
      </div>
    </div>
  );
}
