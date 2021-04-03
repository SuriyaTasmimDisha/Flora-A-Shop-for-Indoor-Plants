import { createMuiTheme } from '@material-ui/core/styles';

export const uiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#097E23'
        }, 
        secondary: {
            main: '#085619'
        },
        text: {
            primary: '#2D2A24'
        }
    },
    typography:{
        h3: {
            fontWeight: 600
        },
        button: {
            fontSize: 1.75
        }
    }
})