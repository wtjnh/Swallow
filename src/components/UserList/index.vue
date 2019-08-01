<template>
  <div style="width:320px"  >
    <div v-for="(value, index) in userlist" :key="index" class="userlist" @click="withChat(value)">
      <Card :id="value">
          <div style="text-align: center" >
            <Icon type="ios-text" style="float: right;color:red" size="20" v-show="notify" />
            <!-- <Icon type="ios-text" /> -->
              <Avatar :style="{float: 'left'}"/>
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
    }
  },
  props:["userlist","useradd","userdel"],
  watch: {
    useradd: function() {
      if(this.userlist.indexOf(this.useradd[1]) === -1)
        this.userlist.push(this.useradd[1]);
      // alert(this.useradd);
    },
    userdel:function() {
      let del = this.userlist.indexOf(this.userdel[1]);
      if(del > -1) {
        this.userlist.splice(del,1);
      }
      // console.log(this.userlist);
    },
    userlist() {
      this.$store.commit('changeUserlist',this.userlist);
    }
  },
  methods: {
    withChat(value) {
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

