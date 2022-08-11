import svgIcon from '@/components/svgIcon'

const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach(item => svgRequired(item))

export default app => {
  app.component('svg-icon', svgIcon)
}
