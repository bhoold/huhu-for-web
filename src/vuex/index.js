import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import head from './modules/head'
import diamondList from './modules/diamondList'

export default new Vuex.Store({
	modules : {
		head,
		diamondList
	}
})
