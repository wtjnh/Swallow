<template>
	<div>
		<div>
			<ul v-if="messages">
        <li v-for="(msg, index) in messages" :key="index" :class="msg[0]">
          <p>{{msg[1]}}</p>
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" :class="msg[2]"/>
        </li>
      </ul>
		</div>
	</div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
	name: "Messages",
	components: { Avatar },
	props: ["my","store"],
	data() {
		return {
      //需要渲染的聊天内容放在这里
      messages: [],
      // 全部用户的聊天内容放在这里
      storeMessage: {},
		};
  },
  mounted() {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e));
  },
	methods: {
    beforeunloadHandler (e) {
      let name = sessionStorage.getItem("username");
      this.$socket.emit('storeMessage', [name,this.storeMessage]);
    }
  },
  watch: {
    my: function() {
      let user = this.$store.state.privateUser;
      // 发送消息和接收信息处理
      if(!this.storeMessage.hasOwnProperty(this.my[2])) {
          this.storeMessage[this.my[2]] = [];
          if(this.my[3]) {
            this.storeMessage[this.my[2]].push(["myself",this.my[0],"avatarMyself"]);
          } else {
            // 消息提醒发送到vuex
            this.$store.commit("beNotify",this.my[2]);
            this.storeMessage[this.my[2]].push(["other",this.my[0],"avatarOther"]);
          }
      } else {
          if(this.my[3]) {
            this.storeMessage[this.my[2]].push(["myself",this.my[0],"avatarMyself"]);
          } else {          
            // 消息提醒发送到vuex
            this.$store.commit("beNotify",this.my[2]);
            this.storeMessage[this.my[2]].push(["other",this.my[0],"avatarOther"]);
          }
      }
      // 判断当前点击的用户是否存在聊天内容，存在就渲染聊天内容
      if(this.storeMessage.hasOwnProperty(user)) {
        this.messages = [];
        // let notifyList = [];

        this.storeMessage[user].forEach(e => {
          this.messages.push(e);
        });

      }
    },
    store: function() {;
      if(this.store) {
        let data = JSON.parse(this.store);
        this.storeMessage = data;
      }
    },
    // 切换用户时判断切换的用户是否存在聊天内容，存在就渲染聊天内容
    '$store.state.privateUser': function() {
      this.messages = [];
      let user = this.$store.state.privateUser;
      if(this.storeMessage.hasOwnProperty(user)) {
        this.storeMessage[user].forEach(e => {
          this.messages.push(e);
        });
      }
    },
  },
  computed: {
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  }
};
</script>

<style>
  ul li {
    list-style-type: none;
    margin: 10px;
    /* text-align: right */
  }
  .myself {
    text-align: right;
  }
  .other {
    text-align: left;
  }
  .myself p:first-child {
    /* text-align: right; */
    padding: 9px;
    margin-right: 6px;
    display: -webkit-inline-box;
    background: greenyellow;
    border-radius: 15px;
    max-width: 300px;
    word-break: break-all; 
    white-space: pre-wrap;
    /* text-align: left */
  }
  .other p:first-child {
    /* text-align: left; */
    padding: 9px;
    margin-left: 6px;
    display: -webkit-inline-box;
    background: whitesmoke;
    border-radius: 15px;
    max-width: 300px;
    word-break: break-all; 
    white-space: pre-wrap;
    /* text-align: left */
  }
  .avatarMyself {
    float: right
  }
  .avatarOther {
    float: left
  }
</style>
