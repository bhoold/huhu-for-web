// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './app'
import router from './router'
import store from './vuex'

import './../static/bootstrap-4.0.0/scss/bootstrap.scss'
import './assets/css/reset.scss'
import './assets/css/base.scss'

import 'lodash'
import './assets/js/utils'
import './assets/js/site'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	components: { app },
	template: '<app/>'
})
