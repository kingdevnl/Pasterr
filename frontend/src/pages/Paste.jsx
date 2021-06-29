import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { theme } from '../editor.theme';
import { Spinner } from '../components/Spinner';

export function Paste() {

    const params = useParams();
    const id = params.id;
    const [data, setData] = useState('');


    useEffect(() => {
        console.log('fetching data.');
        axios.get(API_URL + `/paste/${id}`)
            .then(value => {
                setData(value.data.data.content);
            }).catch(reason => {
            setData('ERROR');
        });
    }, []);

    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme('monokai', theme);
    }


    return (
        <div style={{ height: '100%', marginTop: 0 }}>
            <Editor
                height={'94vh'}
                value={data}
                theme={'monokai'}
                beforeMount={handleEditorWillMount}
                language={'javascript'}
                options={{ readOnly: true }}
                loading={<Spinner />}

            />
        </div>
    );
}