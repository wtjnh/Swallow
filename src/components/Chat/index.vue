<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo"></div> -->
          <Avatar
          :bgc="bgc"
          :avatarName="arName"
          :style="{float: 'left'}"
          />
          <!-- <img v-bind:src="src" alt="nothing" class="round_icon"> -->
          <h2 style="color: white; float: left; margin-left:10px">{{clientName}}</h2>
					<Search :style="{width: '200px', float: 'right'}" />
				</Menu>
			</Header>
			<Layout>
				<Sider hide-trigger :style="{ background: '#fff', height:'536px' }">
					<UserList
          :userlist="userList"
          :useradd= "userAdd"
          :userdel= "userDel"
          />
				</Sider>
				<Layout :style="{padding: '19px'}">
					<Content class="content" ref="contentid">
            <Messages 
            :my="myprop"
            :store="storeData"
            :bgc="bgc"
            /> 
					</Content>
					<Content :style="{ height: '130px', background: '#fff', marginTop:'10px'}">
						<textarea
							name="textarea"
							v-model="myValue"
							:style="{width: '762px',height: '90px',resize: 'none',outline:'none',border:'none',fontSize:'20px'}"
						/>
						<button
							@click="gotMyMsg" 
              class="sendButton"
						>发送</button>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>
<script>
import Avatar from "@/components/Avatar";
import Search from "@/components/Search";
import UserList from "@/components/UserList";
import Messages from "@/components/Messages";
import { connect } from 'tls';
export default {
	name: "FirstPage",
	// props: ['message'],
	data() {
		return {
      clientName: sessionStorage.getItem("username"),
      isConnect: false,
      userList: [],
      userAdd: "",
      userAddindex:0,
      userDel: "",
      userDelindex:0,
      // 这是发送接收需要处理的数据
			myValue: "",
      myprop: [],
      myIndex: 0,
      storeData: '',
      // 头像路径
      src:"",
      bgc:"",
      arName:"Me"
		};
	},
	methods: {
		gotMyMsg() {
      // console.log("my value is: " + this.myValue);
      // this.$Message.info('This is a info tip');
      let user = this.$store.state.privateUser;
      // console.log(user);
      if(this.myValue !=='' && user) {
        this.myprop = [];
        this.myprop.push(this.myValue, this.myIndex, user, "myself");
        this.$refs.contentid.scrollTop = this.$refs.contentid.scrollHeight;
        this.$socket.emit('privateChat',[user,this.myValue]);
        this.myValue = "";
        this.myIndex++;
      } else {
        this.$Message.error("请选择需要发送消息的联系人");
      }
    },
  },
  watch: {
  },
  beforeCreate() {

    if(!sessionStorage.getItem("username"))
      this.$router.push('/');
  },
  beforeMount() {
    let color = ["#90EE90","#8B008B","#DC143C","#FFD700","#FF6347"]
    let randNum = Math.floor(Math.random()*4);
    this.bgc = color[Math.floor(Math.random()*4)];
    console.log(this.bgc);
    // this.src = '/static/img/'+randNum+'.png';
    // console.log(this.src);
  },
  mounted () {
    // 第一次加载页面时可将登录信息加载完毕
    // 第一次加载页面时页面不会刷新，所以socket connect 函数并不会触发，因此只能在mounted 函数内发送登录信息

    this.$socket.emit('connect','');
  },
  sockets: {
      connect() {
        // 刷新页面时可保持客户端与服务端的链接不中断
        console.log("socket connect success!");
        if(sessionStorage.getItem("username")) {
          this.$socket.emit('logined message', sessionStorage.getItem("username"));
        }
        // this.$socket.emit('logined message', sessionStorage.getItem("username"));
      },
      // 在线用户列表,这个功能只在本客户端登录加载联系人时触发
      loginedUserList(list) {
        let myself = list.indexOf(sessionStorage.getItem("username"));
        if( myself > -1) {
          list.splice(myself,1);
        }
        this.userList = list;
      },
      // 别的客户端登录时触发这个函数
      userManageAdd(add) {
        // console.log("the user had logined : " + add);
        this.userAdd = [this.userAddindex, add];
        this.userAddindex++;
      },
      // 别的客户端离线后触发这个函数
      userManageDel(del) {
        // console.log("the user had leaved " + del);
        this.userDel = [this.userDelindex, del];
        this.userDelindex++;
      },
      privateChat(msg) {
        this.myprop = [];
        this.myprop.push(msg[1], this.otherIndex, msg[0]);
        this.$refs.contentid.scrollTop = this.$refs.contentid.scrollHeight;
        this.myIndex++;

      },
      storeMessage(msg) {
        // console.log(msg);
        this.storeData = msg;
        // console.log("receive the data has done");
      }
  },
	components: {Avatar,Search, UserList, Messages }
};
</script>

<style scoped>
.layout {
	/* border: 1px solid #d7dde4; */
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
}
/* .layout-logo {
	width: 100px;
	height: 30px;
	background: #5b6270;
	border-radius: 3px;
	float: left;
	position: relative;
	top: 15px;
	left: 20px;
} */
.layout-nav {
	width: 420px;
	margin: 0 auto;
	margin-right: 20px;
}
.content {
height: 355px;
background: #fff;
overflow-y: auto;
overflow-x: hidden
}
.round_icon{
  width: 34px;
  height: 34px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 5px;
    height: 16px;
    background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    box-shadow: inset 0 0 6px #f5f7f9;
    background-color: #555;
}
.sendButton {
  float: right;
  width: 90px;
  height: 35px;
  border: none;
  outline:none
}
.sendButton:hover{
  background: greenyellow;
}
</style>
