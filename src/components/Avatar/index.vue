<template>
    <div class="demo-avatar">
          <Avatar v-bind:src="src" :style="{background: bgc}" >{{avatarName}}</Avatar>
    </div>
</template>

<script>
// import { watch } from 'fs'
export default {
  props:["src","avatarName","bgc"],
}

</script>
