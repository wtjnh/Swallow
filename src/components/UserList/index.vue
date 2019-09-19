<template>
  <div style="width:320px"  >
    <div v-for="(value, index) in userlist" :key="index" class="userlist" @click="withChat(value)">
      <Card :id="value">
          <div style="text-align: center" >
            <Icon type="ios-text" style="float: right; color:red; display: none;" size="20" />
              <Avatar
              :avatarName="value"
              :bgc="color"
              :style="{float: 'left'}"/>
              <p>{{value}}</p>
          </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/Avatar'
export default {
  data() {
    return {
      notify: false,
      isTouch: false,
      color:"#008B8B"
    }
  },
  props:["userlist","useradd","userdel"],
  watch: {
    // 用户加入
    useradd: function() {
      if(this.userlist.indexOf(this.useradd[1]) === -1)
        this.userlist.push(this.useradd[1]);
    },
    // 用户退出
    userdel:function() {
      let del = this.userlist.indexOf(this.userdel[1]);
      if(del > -1) {
        this.userlist.splice(del,1);
      }
    },
    // 用户列表更新发送到vuex
    userlist() {
      this.$store.commit('changeUserlist',this.userlist);
    },
    // 接收来自vuex的用户消息信息
    '$store.state.notify':function() {
      document.getElementById(this.$store.state.notify).getElementsByTagName("i")[0].style.display = "";
    }
  },
  methods: {
    withChat(value) {
      // 点击用户时，如果存在消息提醒图标，就让图标消失
      let iElem = document.getElementById(value).getElementsByTagName("i")[0];
      if(iElem.style.display !== "none"  ) {
        iElem.style.display = "none";
      }
      // 向vuex 发送点击用户和更换用户信息
      this.$store.commit('changeClick',value);
      this.$store.commit('changeUser',value);
    }
  },
  components: {Avatar}
}
</script>

<style>
  .userlist {
    width: 200px;
    margin-top: 5px;
  }
  .beLight {
    background: #fff;
    /* background: lightslategray; */
  }
</style>

