import { createApp } from 'vue'
import App from './App.vue'
import log from 'loglevel'
// Set Log level first so other imports immediately use it
// log.setLevel('trace')
// log.setLevel('debug')

import * as THREE from 'three'
// import router from './router'
// import { store } from './store/store'
import { createI18n } from 'vue-i18n'
// import i18n from './i18n'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.min'
import ShortKey from 'vue3-shortkey'
import Notifications from '@kyvg/vue3-notification'
// import PrettyCheckbox from 'pretty-checkbox-vue'
import HighchartsVue from 'highcharts-vue'
import HighCharts from 'highcharts'
import heatmap from 'highcharts/modules/heatmap'
import bellcurve from 'highcharts/modules/histogram-bellcurve'
import regression from 'highcharts-regression'
import 'icons/styles.css'
import './style.css'

const scanlabCtTheme = {
  themes: {
    light: {
      primary: '#247ba0',
      secondary: '#3a9989',
      accent: '#ff1654',
      error: '#d31246',
      info: '#2cc8eb',
      success: '#03b5aa',
      warning: '#f9ac34',
      black: '#071920',
      white: '#fffef9',
      lightBlue: '#2cc8eb',
      darkBlue: '#074874',
      buttonBlue: '#1692ae',
      buttonSecondary: '#125471',
    },
  },
}

log.setLevel('info')

const app = createApp(App)

// Add custom Highcharts SVG symbol
// cross symbol
HighCharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
  return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z']
}

heatmap(HighCharts)
bellcurve(HighCharts)
regression(HighCharts)

// Styles
// import './styles/_bootstrap_custom.scss'

// AMI requires THREE to be defined globally on window
window.THREE = THREE

// Vue.use(BootstrapVue)
app.use(Notifications)
app.use(ShortKey, { prevent: ['input', 'textarea'] })
app.use(HighchartsVue)

const loadedLocales = import.meta.globEager('./locales/*.json')
const messages = {}

Object.entries(loadedLocales).forEach(([key, value]) => {
  messages[key.slice(10).slice(0, -5)] = value
})

const i18n = createI18n({
  locale: 'en',
  messages,
})

app.use(i18n)

const vuetify = createVuetify({
  components,
  directives,
  theme: scanlabCtTheme,
})

app.use(vuetify)

// app.use(PrettyCheckbox)

app.config.productionTip = false

// store.dispatch('onInit')

app.mount('#app')
