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
	props: ["my","other"],
	data() {
		return {
      messages: [],
      mymessages: [],
      otherMessages: [],
      getOtherMessage: [],
      // 存储未点击对话时别人发来的信息
      storeMessage: {},
      changeUser: this.$store.state.privateUser,
		};
	},
	methods: {
  },
  watch: {
    my: function() {
      this.mymessages = []
      this.mymessages.push("myself",this.my[0],"avatarMyself");
      this.messages.push(this.mymessages);
      // console.log(this.my[1]);
      // console.log("the user is " + this.changeUser);
    },
    other: function() {
      let user = this.$store.state.privateUser;
      if(user && user === this.other[2]) {
          this.othermessages = [];
          this.othermessages.push("other",this.other[0],"avatarOther");
          this.messages.push(this.othermessages);
      } else {
        this.getOtherMessage.push(["other",this.other[0],"avatarOther"])
        console.log(this.other[2])
        // console.log("other messsage which doesn't show now" + this.getOtherMessage);
        if(!this.storeMessage.hasOwnProperty(this.other[2])) {
          this.storeMessage[this.other[2]] = [];
          this.storeMessage[this.other[2]].push(["other",this.other[0],"avatarOther"]);
          console.log(this.storeMessage)
        } else {
          this.storeMessage[this.other[2]].push(["other",this.other[0],"avatarOther"]);
          console.log(this.storeMessage)
        }
      }
      // console.log(this.other[1]);
    },
    '$store.state.privateUser': function() {
      let item = this.$store.state.privateUser;
      let beforeItem = this.$store.state.beforePrivateUser;
      if(!this.storeMessage.hasOwnProperty(item)) {
        this.storeMessage[beforeItem] = this.messages;
        this.messages = [];
      } else {
        // if(!item === beforeItem) {}
        this.storeMessage[beforeItem] = this.messages;
        this.messages = [];
        this.storeMessage[item].forEach(e => {
          this.messages.push(e);
        });
      }
      // this.messages = [];
    }
  },
  computed: {},
  mounted() {
    // .scrollTop = this.$refs.contentid.scrollHeight;
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
