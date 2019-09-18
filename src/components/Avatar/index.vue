<template>
    <div class="demo-avatar">
        <Avatar v-bind:src="src" >{{avatarName}}</Avatar>
    </div>
</template>

<script>
export default {
  props:["src","avatarName"]
}

</script>
