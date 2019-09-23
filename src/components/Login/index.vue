<template>
    <div>
      <div class="register">
        <button class="hoverit" @click="modal = true">注册</button>
      </div>
      <Modal
      v-model="modal"
      width="360"
      >
        <p slot="header" style="color:rgb(25, 190, 107);text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>注册列表</span>
        </p>
        <div style="text-align:center">
          <input type="text" class="registerInput" v-model="registerName" placeholder="输入注册用户名">
          <br>
          <br>
          <input type="text" class="registerInput" v-model="registerPassword" placeholder="输入密码">
        </div>
        <div slot="footer">
            <Button type="success" size="large" long  @click="register">确认注册</Button>
        </div>
      </Modal>
      <Card class="login" :style="{width:'450px',height: '145px'}">
        <div>
          <!-- <Input type="text" placeholder="Enter Username" style="width: 250px" /> -->
          <input type="text" name="user" v-model="username" placeholder="输入用户名" autocomplete="off" class="enterBox">
          <br>
          <br>
          <!-- <Input type="text" placeholder="Enter Pssword" style="width: 250px" /> -->
          <input type="text" name="password" v-model="password" placeholder="输入密码" autocomplete="off" class="enterBox">
          <br>
          <br>
          <!-- <input type="submit" value="登录" class="enterBox loginBox"> -->
          <button @click="loginfunc" class="enterBox loginBox" >登录</button>
          <br>
          <br>
          <span v-show="missPassOrUser" class="loginMiss">登录密码或帐号错误，请重新登录</span>
        </div>
        <!-- <button @click="abc">dddd</button> -->
      </Card>
    </div>
</template>
<script>
export default {
  name:"Login",
  	data() {
      return {
        username: "",
        password: "",
        registerName: "",
        registerPassword: "",
        missPassOrUser: false,
        modal:false
        // serverError: false
      };
	},
  methods: {
    loginfunc() {
      let un = this.username;
      this.$http.post("http://localhost:3000/Login",
      {username:this.username,password:this.password},
      {emulateJSON: true})
      .then(response => {
          // console.log(response.bodyText);
          if(response.bodyText === "OK"){
            sessionStorage.setItem("username",un);
            this.$router.push('/Chat');
          }
          else
            this.missPassOrUser = true;
        },
        error => {
          // serverError = true;
          this.$Message.error('系统出错啦，等下再试');
          console.log(error);
        }
        );
      this.username = "";
      this.password = "";
    },
    register() {
      this.$http.post("http://localhost:3000/Register",
      {username:this.registerName,password:this.registerPassword},
      {emulateJSON: true})
      .then(response => {
          // console.log(response.bodyText);
          if(response.bodyText === "OK"){
            this.$Message.success("注册成功！请重新登录");
            this.registerName = '';
            this.registerPassword = '';
            this.modal = false;
          }
          else if(response.bodyText === "repeated") {
            this.$Message.error('该用户已存在，请认真核对再后注册');
            this.registerName = '';
            this.registerPassword = '';
          }
        },
        error => {
          // serverError = true;
          this.$Message.error('系统出错啦，等下再试');
          console.log(error);
        }
        );
    }
  },

}
</script>
<style>
.login {
  position: absolute !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 145px;
  width: 450px;
}
.enterBox {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 30px;
  width: 179px;
}
.loginBox {
  border: none;
  background: gray;
  outline: none;
}
.loginBox:hover {
  background: greenyellow;
}
.loginMiss {
  position: absolute;
  color: red;
  left: 0;
  right: 0;
  margin: auto;
  width: 210px;
}
.register {
    float: right;
    padding: 6px;
}
.register button {
    width: 100px;
    padding: 6px;
    border: none;
    color: white;
    background: gray;
}
.hoverit:hover{
  background: greenyellow;
}
.registerInput {
  height: 30px;
  width: 100%;
  outline: none;
  /* border-radius: 1px; */
}
</style>
