import React from 'react';
const Context = React.createContext({
    themes: {
        light: {
            foreground: '#000000',
            background: '#eeeeee',
        },
        dark: {
            foreground: '#ffffff',
            background: '#222222',
        },
    },
    toggle: () => {}
})

export default Context;