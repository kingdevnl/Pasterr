import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Header.css';
import plus from '../images/plus.svg';
import save from '../images/save.svg';

export default function Header() {

    function savePaste() {
        let event = new Event('savePaste', { save: true }); // (2)
        document.getElementById('app').dispatchEvent(event);
    }

    return (
        <nav className={'navbar'}>
            <Link className={'nav-logo'} to={'/'}>{'{PASTTERR}'}</Link>
            <div className={'nav-right'}>
                <div style={{ marginBottom: 0,  marginTop: 15  }}>
                        <a href={'/'} className={'nav-link'}><img className={'nav-icon'} src={plus} alt='' /></a>
                        <Link to={'#'} className={'nav-link'}><img onClick={savePaste} className={'nav-icon'} src={save} alt='' /></Link>

                </div>
            </div>
        </nav>

    );
}