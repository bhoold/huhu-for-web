<template>
	<div id="layout">
		<router-view class="page" />
	</div>
</template>

<script>
import m_auth from './../mixins/auth'

export default {
	name: 'layout',
	mixins: [m_auth]
}
</script>

<style lang="scss">
html,body{
	height: 100%;
}
#layout{
	height: 100%;
}
#layout>.page{
	height: 100%;
}
</style>
