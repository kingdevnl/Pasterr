import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { themeData } from '../editor.theme';
import axios from 'axios';
import {useHistory} from "react-router-dom"
export function Home() {



    useEffect(() => {
        document.getElementById("app").addEventListener("savePaste", evt => {
            save()
        })

    }, [])

    const [code, setCode] = useState('');

    const history = useHistory()

    function handleEditorDidMount(editor, monaco) {

        monaco.editor.defineTheme('dark', themeData);
        monaco.editor.setTheme('dark');
    }

    const handleEditorChange = (value, event) => {
        setCode(value);
    };
    const save = () => {
        axios.post(API_URL + '/paste/create', {
            content: code,
        }).then(value => {
            history.push("/"+value.data.ID)
        }).catch(reason => {
            console.error(reason);
        });
    };

    return (
        <div style={{ height: '100%', marginTop: 0 }}>
            <Editor
                height={'94vh'}
                defaultValue={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                language={'javascript'}
            />
        </div>

    );
}
