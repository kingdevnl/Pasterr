import React from 'react';

import '../css/Search.css';
import '../css/Header.css';

import SelectSearch, { fuzzySearch } from 'react-select-search';
import { languages } from '../languages';
import { useRecoilState, useRecoilValue } from 'recoil';
import { languageAtom, sourceAtom } from '../atoms';
import { savePaste } from '../paste.utils';

export default function Header() {
    const [language, setLanguage] = useRecoilState(languageAtom);
    const source = useRecoilValue(sourceAtom);


    function onLanguageChange(val) {
        setLanguage(val);
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
                        value={{ name: language, value: language }}
                    />


                    <a href={'/'}><i className='fas fa-plus-square fa-fw icon' /></a>
                    <a href={'#'} onClick={_ => savePaste(source, language)}><i
                        className='fas fa-save fa-fw icon' /></a>

                </div>
            </nav>
        </div>


    );
}