import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Header.css';
import plus from '../images/plus.svg';
import save from '../images/save.svg';

export default function Header() {

    function savePaste() {
        console.log('header clicked');
        let event = new Event("savePaste", {save: true}); // (2)
        document.getElementById("app").dispatchEvent(event);
    }
    return (
        <nav className={'navbar'}>
            <Link className={'nav-logo'} to={'/'}>{'{PASTTERR}'}</Link>
            <div className={'nav-right'}>
                <ul style={{ marginBottom: 0 }}>
                    <li style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        <Link to={'/'} className={'nav-link'}><img className={'nav-icon'} src={plus} alt='' /></Link>
                        <Link to={'#'} className={'nav-link'}><img onClick={savePaste} className={'nav-icon'} src={save} alt='' /></Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}