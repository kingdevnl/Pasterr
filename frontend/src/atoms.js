import { atom } from 'recoil';

export const showSettingsAtom = atom({
    key: 'showSettings',
    default: true
})

export const  settingsAtom = atom({
    key: 'settings',
    default: {
        visibility: 'public',
        language: 'TEXT'
    }
})