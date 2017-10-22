import { createMuiTheme } from 'material-ui/styles'

export const primary = {
  '50': '#efe8ec',
  '100': '#d7c5cf',
  '200': '#bd9eb0',
  '300': '#a27790',
  '400': '#8e5a78',
  '500': '#7a3d60',
  '600': '#723758',
  '700': '#672f4e',
  '800': '#5d2744',
  '900': '#37172A',
  'A100': '#cfe2f3',
  'A200': '#9fc5e8',
  'A400': '#6fa8dc',
  'A700': '#3d85c6',
  'contrastDefaultColor': 'light'
}
export default createMuiTheme({
  palette: {
    primary
  },
  typography: {
    fontFamily: 'Merriweather',
    title: {
      color: primary[900],
      fontSize: '32px'
    },
    headline: {
      fontSize: '18px',
      color: '#262626'
    }
  }
})
