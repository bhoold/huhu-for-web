<template>
	<div id="dashboard">
		<div class="chat">
			<div class="body">
				<div class="title">群</div>
				<ul id="messages">
					<li v-for="(item, index) in history" :key="index">
						<p>{{item.from.username}} - {{item.date | getDate}}:</p>
						<div>{{item.message}}</div>
					</li>
				</ul>
				<form @submit.prevent="submit">
					<span>您对{{other.username}}说</span>
					<input id="m" autocomplete="off" v-model="message" /><button>Send</button>
				</form>
			</div>
			<div class="side">
				<div class="title">用户列表</div>
				<ul>
					<li :class="{active: other.username === user.username, me: username === user.username}" v-for="user in users" @click="chat(user)" :key="user.id">
						{{user.username}} [{{onlineList[user.id]?'在线':'离线'}}] ({{onlineList[user.id]}})
					</li>
				</ul>
			</div>
		</div>
		<p style="text-align: center">总在线人数: {{onlineUserQty || 1 }}</p>
	</div>
</template>

<script>
import m_auth from './../mixins/auth'

import io from 'socket.io-client'

import {MSGTYPE, NOTIFY} from './../assets/js/const'



const SUCCESS = 1000,
	ERROR = -1;

export default {
	name: 'dashboard',
	mixins: [m_auth],
	created () {
		Site.get({
			url: "http://localhost:3000/user/list"
		}).done(res => {
			if(res.data){
				this.users = res.data;
			}
		}).fail(err => {
			console.log(err.message || "获取用户列表失败");
		});

		Site.get({
			url: "http://localhost:3000/user/getState"
		}).done(res => {
			if(res.data){
				this.onlineUserQty = res.data.length;
				res.data.forEach(user => {
					this.$set(this.onlineList, user.id, user.client);
				});
			}
		}).fail(err => {
			console.log(err.message || "获取用户状态失败");
		});


		const socket = this.socket = io('http://localhost:3000', {
			query: 'id=' + Site.loginInfo.id + '&username=' + Site.loginInfo.username,
			//forceNew: true,
			reconnection: false,
			transports: ['websocket']
		});

		socket.on(MSGTYPE.ONLINE, (msg) => {
			if(this.onlineList[msg.id]){
				this.onlineList[msg.id]++;
			}else{
				this.$set(this.onlineList, msg.id, 1);
			}
		});

		socket.on(MSGTYPE.OFFLINE, (msg) => {
			this.onlineList[msg.id]--;
		});

		socket.on(MSGTYPE.NOTIFY, (msg) => {
			if(msg.type === NOTIFY.LOGIN){
				if(msg.code === SUCCESS){
					this.isLogined = true;
					if(this.onlineList[Site.loginInfo.id]){
						this.onlineList[Site.loginInfo.id]++;
					}else{
						this.$set(this.onlineList, Site.loginInfo.id, 1);
					}
				}else{
					console.log(msg);
				}
			}else{
				console.log(msg);
			}
		});

		socket.on(MSGTYPE.MESSAGE, (msg) => {
			this.showMessage(msg);
		});
	},
	mounted () {
		window.vm = this;
	},
	data () {
		return {
			socket: null,
			username: Site.loginInfo.username,
			message: "",
			history: [],
			isLogined: false,
			users: [{
				id: Site.loginInfo.id,
				name: Site.loginInfo.username
			}],
			onlineList: {},
			other: {
				id: "",
				username: "全体"
			},
			onlineUserQty: 0
		}
	},
	filters: {
		getDate (val) {
			let date = new Date(val);
			let year = date.getFullYear(), 
				month = date.getMonth() + 1, 
				day = date.getDate(), 
				hour = date.getHours(), 
				minute = date.getMinutes(), 
				second = date.getSeconds();
			return hour + ':' + minute + ':' + second;
		}
	},
	methods: {
		submit () {
			if(this.isLogined){
				this.socket.emit(MSGTYPE.MESSAGE, {
					sender: Site.loginInfo,
					to: this.other,
					message: this.message
				});
				this.message = "";
			}else{
				console.log("未登录");
			}
		},
		
		chat (user) {
			if(user.username === this.username){
				return;
			}
			this.other = user
		},

		showMessage (msg) {
			this.history.push(msg);
		}
	}
}
</script>

<style lang="scss">
#dashboard{
		padding: 1em;
	.chat{
		display: flex;
		margin: auto;
		width: 600px;
		height: 500px;
		border: 1px solid #ccc;
		.body{
			display: flex;
			flex-direction: column;
		    padding: 1em;
			width: 400px;
			ul{
				flex: 1;
				list-style-type: none;
				padding: 0;
				overflow: auto;
				li{
					&.me{
						color: blue;
					}
					&.active{
						color: red;
					}
					&>p{
					    margin-bottom: 2px;
					}
					&>div{
						padding: 5px;
						border: 1px solid #ccc;
						border-radius: 5px;
					}
				}
			}
		}
		.side{
			flex: 1;
		    padding: 1em;
			ul{
				list-style-type: none;
				padding: 0;
				li{
					&.me{
						color: blue;
					}
					&.active{
						color: red;
					}
				}
			}
		}
	}
}
</style>
