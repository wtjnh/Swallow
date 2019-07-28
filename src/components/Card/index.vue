<template>
  <div style="width:320px">
    <div v-for="(value, index) in userlist" :key="index" class="userlist">
      <Card>
          <div style="text-align: center">
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
</style>

