<template>
  <div id="container">
    <div class="header">
      <span style="float: left;">线上咨询</span>
      <span style="float: right;">{{ beijingTime }}</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in messageList" :key="index">
        <div v-if="item.isSelf" class="messageContainer leftAlign">
          <img src="/public/l.png" class="imgleft">
          <span class="spanleft">{{ item.message }}</span>
        </div>
        <div v-else class="messageContainer rightAlign">
          <span class="spanright">{{ item.message }}</span>
          <img src="/public/r.png" class="imgright">
        </div>
      </li>
    </ul>
    <div class="footer" style="width: 70%;margin: 0 auto">
      <!-- 添加输入内容 -->
      <input id="text" type="text" placeholder="说点什么吧..." v-model="inputValue" @keyup.enter="chat">
      <!-- 给发送也绑定一个事件 -->
      <span id="btn" @click="chat">发送</span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import axios from 'axios';
import store from '@/store';

export default defineComponent({
  name: 'contact',
  setup() {
    // 定义响应式数据
    const beijingTime = ref('');
    const inputValue = ref('');
    const messageList = ref([]);
    const threadId = ref('');

    // 更新时间的函数
    const updateBeijingTime = () => {
      const now = new Date();
      const options = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'Asia/Shanghai'};
      beijingTime.value = new Intl.DateTimeFormat('zh-CN', options).format(now);
    };

    // 初始加载时更新时间
    updateBeijingTime();

    // 每秒更新一次时间
    let intervalId: number;

    // 定义方法
    const chat = async () => {
      // 检查输入框是否有值
      if (inputValue.value.trim() === '') {
        return; // 防止发送空消息
      }

      // 获取自己输入内容,将内容渲染到页面
      messageList.value.push({
        message: inputValue.value,
        isSelf: true
      });

      // 获取机器人接口内容,也将内容渲染到页面
      try {
        const response = await axios.post(`/api/contact/ask/${store.user.username}/${threadId.value}`, {
          message: inputValue.value
        });
        const data = response.data;
        console.log(data);
        messageList.value.push({
          message: data,
          isSelf: false
        });
        // 最后清除文本框
        inputValue.value = '';
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    //加载会话历史记录
    const loadHistory = async () => {
      try {
        const {data: {threadId: _threadId}} = await axios.get(`/api/contact/history/${store.user.username}/threadId`);
        threadId.value = _threadId;
        const {data} = await axios.get(`/api/contact/history/${store.user.username}/${_threadId}`);
        console.log(data);
        // const data = response.data;
        messageList.value = data.map(item => {
          return {
            message: item.message,
            isSelf: item.role === 'user'
          };
        });
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    onMounted(async () => {
      intervalId = setInterval(updateBeijingTime, 1000);
      await loadHistory();
    });

    // 组件卸载时清除定时器
    onUnmounted(() => {
      clearInterval(intervalId);
    });

    // 返回需要暴露给模板的属性和方法
    return {
      inputValue,
      messageList,
      chat,
      beijingTime
    };
  }
});
</script>

<style scoped>
.header {
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  height: 20px;
}

.content {
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 500px;
  width: 100%;
  overflow-y: auto;
}

.content li {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.imgleft {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.imgright {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}

.spanleft {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.spanright {
  background-color: #dcf8c6;
  padding: 10px;
  border-radius: 10px;
  max-width: 74%;
  text-align: right;
}

.footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f0f0f0;
}

.footer input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.footer span {
  cursor: pointer;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.messageContainer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: calc(100vw - 50px);
}
.leftAlign {
  align-items: flex-end;
  justify-self: flex-end;
  margin-left: 200px;
}

.rightAlign {
  align-items: flex-start;
  margin-left: 200px;
  justify-self: flex-start;
}
</style>