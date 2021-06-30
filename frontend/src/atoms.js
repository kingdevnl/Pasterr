import { atom } from 'recoil';



export const sourceAtom = atom({
    key: 'source',
    default: '// Code here'
})

export const languageAtom = atom({
    key: 'language',
    default: 'TEXT'
})