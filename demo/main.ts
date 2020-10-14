import Vue from 'vue'
import App from './index.vue'
import Element from 'element-ui'

Vue.use(Element)
new Vue({
    el: '#app',
    render: h => h(App)
})