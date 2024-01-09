import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

const theme = extendTheme({
    config, styles: {
        global: {
            "h3": {
                'marginTop': '20px',
                'marginBottom': '20px',
                'fontWeight': 'bold'
            },
            ".activeBtn": {
                'bgColor': '#0099cc',
                'width': '100%'
            }
        },
    },
})

export default theme