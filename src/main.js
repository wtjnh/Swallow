// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import './plugins/iview.js'
import {Message} from 'iview'
import  VueResource  from 'vue-resource'
import VueSocketIO from 'vue-socket.io'

Vue.prototype.$Message = Message;
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userList: [],
    privateUser: '',
    beforePrivateUser:'nobody',
    beClick:[],
    // 客户端接收来自别的客户端信息，自己没有点击进入聊天状态时，消息提醒为true
    notify:''
  },
  getters: {},
  mutations: {
    changeUserlist(state,payload) {
      state.userList = payload;
    },
    changeUser(state,payload) {
      state.beforePrivateUser = state.privateUser;
      state.privateUser = payload;
      
      // state.privateUser = payload
    },
    changeClick(state,payload) {
      if(state.beClick.length && state.userList.indexOf(state.beClick[0]) > -1) {
        document.getElementById(state.beClick[0]).style.background= "#fff";
        state.beClick.pop();
        document.getElementById(payload).style.background= "gray";
        state.beClick.push(payload);
      } else {
        document.getElementById(payload).style.background= "gray";
        state.beClick.pop();
        state.beClick.push(payload);
      }
    },
    beNotify(state,payload) {
      state.notify = payload;
      console.log(state.notify);
    }
  }
})
Vue.use(new VueSocketIO({
    connection:'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
)
Vue.use(VueResource)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
