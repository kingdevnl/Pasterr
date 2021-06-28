import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { themeData } from '../editor.theme';

export function Paste() {

    const params = useParams();
    const id = params.id;
    const [data, setData] = useState('')



    useEffect(() => {
        console.log('fetching data.');
        axios.get(API_URL + `/paste/${id}`)
            .then(value => {
                setData(value.data.data.content);
            }).catch(reason => {
            setData('ERROR');
        });
    }, [])

    function handleEditorDidMount(editor, monaco) {

        monaco.editor.defineTheme('dark', themeData);
        monaco.editor.setTheme('dark');
        console.log('Editor loaded');
    }



    return (
        <div style={{ height: '100%', marginTop: 0 }}>
            <Editor
                height={'94vh'}
                defaultValue={""}
                value={data}
                onMount={handleEditorDidMount}
                language={'javascript'}
                options={{    readOnly: true }}
            />
        </div>
    );
}