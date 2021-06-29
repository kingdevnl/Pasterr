import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { theme } from '../editor.theme';
import { Spinner } from '../components/Spinner';

export function Home() {

    const monacoRef = useRef(null);
    const editorRef = useRef(null);
    const [source, setSource] = useState('');

    useEffect(() => {
        //TODO: Find a better way then this for the save button in the navbar.
        document.getElementById('app').addEventListener('savePaste', evt => {
            save(editorRef.current.getValue());
        });
    }, []);


    const history = useHistory();

    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme('monokai', theme);
    }

    function handleEditorDidMount(editor, monaco) {
        monacoRef.current = monaco;
        editorRef.current = editor;

        editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], function() {
            save(editorRef.current.getValue());
        });

        editor.addAction({
            id: 'save',
            label: 'Save',
            run(editor, ...args) {
                save(editorRef.current.getValue());
            },
        });
    }

    const handleEditorChange = (value, event) => {
        setSource(value);
    };
    const save = (source) => {
        axios.post(API_URL + '/paste/create', {
            content: source,
        }).then(value => {
            history.push('/' + value.data.ID);
        }).catch(reason => {
            console.error(reason);
        });
    };

    return (
        <div style={{ height: '100%', marginTop: 0 }}>\

            <Editor
                height={'94vh'}
                defaultValue={source}
                theme={'monokai'}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                language={'javascript'}
                loading={<Spinner />}
            />
        </div>

    );
}
