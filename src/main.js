import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import 'normalize.css'

import { Button, Loading, Overlay, Tabbar, TabbarItem, Form, Field, Image, Icon, Swipe, SwipeItem, NavBar, Badge, Cell, CellGroup, Toast, RadioGroup, Radio, Picker, Popup, ActionSheet, Checkbox, CheckboxGroup, DatetimePicker, IndexBar, IndexAnchor, PullRefresh, Empty, Tab, Tabs, Tag } from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Loading)
Vue.use(Overlay)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NavBar)
Vue.use(Badge)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(ActionSheet)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatetimePicker)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(PullRefresh)
Vue.use(Empty)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
