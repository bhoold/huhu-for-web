<template>
	<div id="login">
		<div class="signIn">
			<form @submit.prevent="submit">
				<h1 class="h3 mb-3 font-weight-normal">请登录</h1>
				<label for="inputEmail" class="sr-only">Email address</label>
				<input v-model="username" type="text" id="inputEmail" class="form-control" placeholder="账号" required autofocus>
				<label for="inputPassword" class="sr-only">Password</label>
				<input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="密码" required>
				<div class="checkbox mb-3">
					<label>
					<input type="checkbox" value="remember-me"> 记住我
					</label>
				</div>
				<button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
			</form>
		</div>
		<div class="signIn">
			<form @submit.prevent="submit2">
				<h1 class="h3 mb-3 font-weight-normal">注册</h1>
				<label for="inputEmail2" class="sr-only">Email address</label>
				<input v-model="username2" type="text" id="inputEmail2" class="form-control" placeholder="账号" required autofocus>
				<label for="inputPassword2" class="sr-only">Password</label>
				<input v-model="password2" type="password" id="inputPassword2" class="form-control" placeholder="密码" required>
				<label for="reinputPassword" class="sr-only">rePassword</label>
				<input v-model="rePassword2" type="password" id="reinputPassword" class="form-control" placeholder="密码" required>
				<button class="btn btn-lg btn-primary btn-block" type="submit">注册</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
			</form>
		</div>
	</div>
</template>

<script>
import m_noAuth from './../mixins/noAuth'

export default {
	name: 'login',
	mixins: [m_noAuth],
	created () {

	},
	mounted () {

	},
	data () {
		return {
			username: "",
			password: "",
			username2: "",
			password2: "",
			rePassword2: ""
		}
	},
	methods: {
		submit () {
			Site.post({
				url: "http://localhost:3000/public/signIn",
				data: {
					username: this.username,
					password: this.password
				}
			},false).done(res => {
				if(res.data){
					sessionStorage.clear();
					Site.loginInfo = res.data;
					this.$router.push({path: this.$route.query.redirect || '/dashboard'})
				}else{
					console.log('登录失败');
				}
			}).fail(err => {
				console.log(err.message || '登录失败');
			});

		},
		submit2 () {
			Site.post({
				url: "http://localhost:3000/public/signUp",
				data: {
					username: this.username2,
					password: this.password2,
					repassword: this.password2
				}
			},false).done(res => {
				if(res.data){
					console.log('注册成功');
				}else{
					console.log('注册失败');
				}
			}).fail(err => {
				console.log(err.message || '注册失败');
			});

		}

	}
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
