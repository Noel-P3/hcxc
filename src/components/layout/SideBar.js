import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBarData } from './SideBarData';
import Submenu from './SideBarMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 8px;
`;

const SideBarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 100;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

function SideBar({nombreUsuario, onLogOut}) {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
        <IconContext.Provider value={{ color: '#fff'}}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </NavIcon>
                <h1 style={{color: '#fff', marginLeft: 60}}>{nombreUsuario}</h1>
                <NavIcon>
                    <AiIcons.AiOutlineLogout onClick={onLogOut}/>
                </NavIcon>
            </Nav>
            <SideBarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to='#'>
                        <AiIcons.AiOutlineClose onClick={showSidebar}/>
                    </NavIcon>
                    {SideBarData.map((item, index) => {
                        return <Submenu item={item} key={index}/>;
                    })}
                </SidebarWrap>
            </SideBarNav>
            </IconContext.Provider>
        </>
    )
}

export default SideBar
