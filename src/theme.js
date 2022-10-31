import { createTheme } from '@material-ui/core/styles'
import { teal, green, yellow, blueGrey } from '@material-ui/core/colors'

const theme = createTheme({
    palette: {
        type: "dark",
        primary: blueGrey,
        secondary: yellow
    }
})

export default theme