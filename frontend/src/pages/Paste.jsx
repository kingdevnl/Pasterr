import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { theme } from '../editor.theme';
import { Spinner } from '../components/Spinner';
import { useRecoilState } from 'recoil';
import { languageAtom, sourceAtom } from '../atoms';

export function Paste() {

    const [language, setLanguage] = useRecoilState(languageAtom);
    const [source, setSource] = useRecoilState(sourceAtom);

    const params = useParams();
    const id = params.id;

    const editorRef = useRef(null);

    useEffect(() => {
        console.log('fetching data.');

        axios.get(API_URL + '/paste/' + id)
            .then(value => {
                const data = value.data.data;
                setLanguage(data.language);
                setSource(data.content);
            }).catch(reason => {
            console.error(reason);
            setSource('ERROR');
        });

    }, []);

    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme('monokai', theme);
    }

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    function preventChange(e) {
        if (editorRef.current.getModel().getValue() !== source) {
            editorRef.current.getModel().setValue(source);
        }
    }

    return (
        <div style={{ height: '100%', marginTop: 0 }}>
            <Editor
                height={'94vh'}
                defaultValue={source}
                theme={'monokai'}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                onChange={preventChange}
                language={language}
                loading={<Spinner />}

            />
        </div>
    );
}