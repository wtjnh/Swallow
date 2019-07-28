<template>
	<div>
		<div>
			<ul v-if="my">
        <li v-for="(msgmyself, index) in messages" :key="index">
          <span class="myself">{{msgmyself}}</span>
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="avatar"/>
        </li>
      </ul>
      <ul v-if="other">
        <li v-for="(msgother, index) in messages" :key="index">
          <span class="other">{{msgother}}</span>
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="avatar"/>
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
      messages: []
		};
	},
	methods: {
  },
  watch: {
    my: function() {
      this.messages.push(this.my[0]);
      console.log(this.my[1]);
    },
    other: function() {
      
    }
  },
  mounted() {
    // .scrollTop = this.$refs.contentid.scrollHeight;
  }
};
</script>

<style>
  ul li {
    list-style-type: none;
    margin: 10px;
    text-align: right
  }
  .myself {
    padding: 9px;
    margin-right: 6px;
    display: -webkit-inline-box;
    background: greenyellow;
    border-radius: 15px;
    max-width: 300px;
    word-break: break-all; 
    white-space: pre-wrap;
    text-align: left
  }
  .avatar {
    float: right
  }
</style>
