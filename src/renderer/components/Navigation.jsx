import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import InventoryIcon from '@rsuite/icons/legacy/Archive';
import KDSIcon from '@rsuite/icons/legacy/Bell';
import POSIcon from '@rsuite/icons/legacy/Calculator';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import POS from './Featuers/POS';
import Menu from './Featuers/Menu';
export default function Navigation({SetView}) {
  const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: '#34c3ff',
    color: ' #fff',
  };
  const [expanded, setExpanded] = React.useState(true);
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
          <Nav activeKey="2">
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Tableau de bord
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<POSIcon />}  onClick={()=>{SetView(<POS/>)}}>
              POS
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<GroupIcon />} onClick={()=>{SetView(<Menu/>)}} >
              Gestion du Menu
            </Nav.Item>
            <Nav.Item eventKey="4" icon={<InventoryIcon />}>
              Inventaire
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<GroupIcon />}>
              Gestion du Personnel
            </Nav.Item>
            <Nav.Item eventKey="6" icon={<KDSIcon />}>
              KDS
            </Nav.Item>
            <Nav.Item eventKey="7" icon={<GearCircleIcon />}>
              Réglages
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}
