import React, { useEffect } from 'react';

import '../css/Search.css';
import '../css/Header.css';

import SelectSearch, { fuzzySearch } from 'react-select-search';
import { languages } from '../languages';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '../atoms';

export default function Header() {
    const [settings, setSettings] = useRecoilState(settingsAtom)


    useEffect(() => {
        localStorage.removeItem('language')
    }, [])

    function savePaste() {
        let event = new Event('savePaste', { save: true }); // (2)
        document.getElementById('app').dispatchEvent(event);
    }

    function onLanguageChange(val) {
        setSettings({
            ...settings,
            language: val
        })

        localStorage.setItem('language', val)

    }


    const options = [];

    languages.forEach(function(value, index) {
        options.push({
            name: value,
            value: value,
        });
    });

    return (
        <div>

            <nav className={'navbar'}>
                <div className={'left'}>
                    <div className={'logo'}>{'{PASTTERR}'}</div>
                </div>
                <div className={'right'}>
                    <SelectSearch
                        options={options}
                        search
                        filterOptions={fuzzySearch}
                        emptyMessage='Not found'
                        onChange={onLanguageChange}
                        value={{name: settings.language, value: settings.language}}
                    />


                    <a href={'/'}><i className='fas fa-plus-square fa-fw icon' /></a>
                    <a href={'#'}><i className='fas fa-save fa-fw icon' /></a>

                </div>
            </nav>
        </div>


    );
}