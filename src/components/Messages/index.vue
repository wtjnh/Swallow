<template>
	<div>
		<div>
			<ul v-if="messages">
        <li v-for="(msg, index) in messages" :key="index" :class="msg[0]">
          <p>{{msg[1]}}</p>
          <div v-if='msg[2] ==="avatarOther"' class="thunb">
            <Avatar 
            :avatarName ="msg[3]"
            :class="msg[2]"/>
          </div>
          <div v-else class="thunb">
            <Avatar :bgc="bgc" :class="msg[2]" />
          </div>
          <!-- <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" :class="msg[2]"/> -->
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
	props: ["my","store","bgc"],
	data() {
		return {
      //需要渲染的聊天内容放在这里
      messages: [],
      // 全部用户的聊天内容放在这里
      storeMessage: {},
      // src:'',
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
            this.storeMessage[this.my[2]].push(["other",this.my[0],"avatarOther",this.my[2]]);
          }
      } else {
          if(this.my[3]) {
            this.storeMessage[this.my[2]].push(["myself",this.my[0],"avatarMyself"]);
          } else {          
            // 消息提醒发送到vuex
            this.$store.commit("beNotify",this.my[2]);
            this.storeMessage[this.my[2]].push(["other",this.my[0],"avatarOther",this.my[2]]);
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
        //解决聊天记录加载时可能存在与服务端存在的延迟问题，如果服务端延迟加载，就在现有的聊天记录头部添加
        //加载完毕后的聊天记录,如果不存在延迟，一切正常进行，即先加载原先的聊天记录，后现有的聊天记录添加
        //到原先聊天记录的尾部
        if(!Object.keys(this.storeMessage).length) {
          this.storeMessage = data;
        }
        if(Object.keys(this.storeMessage).length){
          let obNameArr = Object.getOwnPropertyNames(data);
          for(let name  of obNameArr) {
            if(this.storeMessage.hasOwnProperty(name)) {
              this.storeMessage[name] = [...data[name],...this.storeMessage[name]]
            }
          }
        }
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
  .thunb{
    display: inline;
  }
</style>
