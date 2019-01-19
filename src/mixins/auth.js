import mixinsBase from './base'

export default {
	mixins: [mixinsBase],
	beforeCreate () {
		if(!Site.isLogin){
			this.$router.push({
				name: 'login',
				query: { redirect: this.$router.currentRoute.fullPath }
			});
		}
	}
}