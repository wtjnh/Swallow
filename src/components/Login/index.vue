<template>
    <div class="login">
      <Card :style="{width:'450px',height: '145px'}">
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
        missPassOrUser: false,
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
          console.log(error);
        }
        );
      this.username = "";
      this.password = "";
    }
  }
}
</script>
<style>
.login {
  position: absolute;
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
.loginMiss {
  position: absolute;
  color: red;
  left: 0;
  right: 0;
  margin: auto;
  width: 210px;
}
</style>
