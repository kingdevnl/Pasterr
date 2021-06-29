import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { theme } from '../editor.theme';
import { Spinner } from '../components/Spinner';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '../atoms';

export function Home() {

    const monacoRef = useRef(null);
    const editorRef = useRef(null);
    const [source, setSource] = useState('');

    const [settings, setSettings] = useRecoilState(settingsAtom)


    useEffect(() => {
        //TODO: Find a better way then this for the save button in the navbar.
        if (!document.getElementById('app').hasAttribute("hasPasteListener")) {
            document.getElementById('app').addEventListener('savePaste', evt => {
                console.log('xxxx');
                save(editorRef.current.getValue());
            });

            document.getElementById("app").setAttribute("hasPasteListener", true.toString())
        }
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
        console.log(`Saving paste with lang ${localStorage.getItem("language")}`);
        if (source.length < 5000 && source !== '') {
            return axios.post(API_URL + '/paste/create', {
                content: source,
                language: localStorage.getItem("language")
            }).then(value => {
                history.push('/' + value.data.ID);
                localStorage.removeItem('language')
            }).catch(reason => {
                console.error(reason);
            });
        }
        alert("No content, or content > 5000 characters.")
    };

    return (
        <div style={{ height: '100%', marginTop: 0 }}>

            <Editor
                height={'94vh'}
                defaultValue={source}
                theme={'monokai'}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                language={settings.language}
                loading={<Spinner />}
            />
        </div>

    );
}
