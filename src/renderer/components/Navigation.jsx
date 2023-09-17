import React, { useState } from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import InventoryIcon from '@rsuite/icons/legacy/Archive';
import KDSIcon from '@rsuite/icons/legacy/Bell';
import POSIcon from '@rsuite/icons/legacy/Calculator';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import POS from './Featuers/POS';
import Menu from './Featuers/Menu';
import Dash from './Featuers/Dash';
export default function Navigation({SetView}) {
  const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: '#34c3ff',
    color: ' #fff',
  };
  const [expanded, setExpanded] = React.useState(true);
  const [active,SetActive] = useState('1')
  /*
onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
  */
  return (
    <div >
      <Sidenav
        defaultOpenKeys={['3', '4']}
        expanded={expanded}
        className="h-screen"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onOpenChange={(e)=>{alert(e)}}
      >
        <Sidenav.Header>
          <div style={headerStyles} className={expanded ? 'block' : 'hidden'}>
            <h2>EatSmartHub Pro</h2>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={active}>
            <Nav.Item active={active==1 && true} eventKey="1" icon={<DashboardIcon />}onClick={()=>{
              SetActive("1")
              SetView(<Dash/>
              )}}>
              Tableau de bord
            </Nav.Item>
            <Nav.Item  active={active==2 && true} eventKey="2" icon={<POSIcon />}  onClick={()=>{
              SetActive("2")
              SetView(<POS/>
              )}}>
              POS
            </Nav.Item>
            <Nav.Item  active={active==3 && true} eventKey="3" icon={<GroupIcon />} onClick={()=>{
                SetActive("3")
              SetView(<Menu/>)
              }} >
              Gestion du Menu
            </Nav.Item>
            <Nav.Item active={active==4 && true} eventKey="4" icon={<InventoryIcon />}  onClick={()=>{
             SetActive("4")
            }}>
              Inventaire
            </Nav.Item>
            <Nav.Item active={active==5 && true} eventKey="5" icon={<GroupIcon />}  onClick={()=>{
             SetActive("5")
            }}>
              Gestion du Personnel
            </Nav.Item>
            <Nav.Item  active={active==6 && true} eventKey="6" icon={<KDSIcon />}  onClick={()=>{
             SetActive("6")
            }}>
              KDS
            </Nav.Item>
            <Nav.Item active={active==7 && true} eventKey="7" icon={<GearCircleIcon />}  onClick={()=>{
             SetActive("7")
            }}>
              Réglages
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}
