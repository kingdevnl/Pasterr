import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

import { useHistory } from 'react-router-dom';
import { theme } from '../editor.theme';
import { Spinner } from '../components/Spinner';
import { useRecoilState } from 'recoil';
import { languageAtom, sourceAtom } from '../atoms';
import { savePaste } from '../paste.utils';

export function Home() {


    const [language] = useRecoilState(languageAtom);
    const [source, setSource] = useRecoilState(sourceAtom);


    const history = useHistory();

    function handleEditorWillMount(monaco) {
        monaco.editor.defineTheme('monokai', theme);
    }

    function handleEditorDidMount(editor, monaco) {


        editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], function() {
            savePaste(editor.getValue(), editor.getModel()._languageIdentifier.language)
        });

        editor.addAction({
            id: 'save',
            label: 'Save',
            run(editor, ...args) {
                savePaste(editor.getValue(), language, history)

            },
        });
    }

    const handleEditorChange = (value, event) => {
        setSource(value);
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
                language={language}
                loading={<Spinner />}
            />
        </div>

    );
}
