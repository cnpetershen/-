<script lang="ts">


export default {

  data() {
    return {
      todayVisits: '',
      todayQuestions: '',
      todayAnswers: '',
    };
  },
  mounted() {

    // 获取今日到访人数
    this.fetchTodayVisits();
    // 获取今日问题数量
    this.fetchTodayQuestions();
    // 获取今日回答数量
    this.fetchTodayAnswers();
  },

  methods: {
    async fetchTodayVisits() {
      try {
        const response = await this.axios.get('/api/user/view-status');
        this.todayVisits = response.data;
      } catch (error) {
        console.error('Failed to fetch today visits:', error);
      }
    },
    async fetchTodayQuestions() {
      try {
        const response =await this.axios.get('/api/user/question-count');
        this.todayQuestions = response.data;
      } catch (error) {
        console.error('Failed to fetch today visits:', error);
      }
    },
    async fetchTodayAnswers() {
      try {
        const response = await this.axios.get('/api/user/answer-count');
        this.todayAnswers = response.data;
      } catch (error) {
        console.error('Failed to fetch today visits:', error);
      }
    },

  },
};
</script>

<template>
  <ElRow :gutter="20" justify="space-between">
    <!-- 第一个卡片：今日到访 -->
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElDescriptions title="今日到访" :column="1" class="mt-20px">
          <ElDescriptionsItem label="到访人数" style="font-size: 20px;font-weight: bolder">{{ todayVisits }}</ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </ElCol>

    <!-- 第二个卡片：今日问题 -->
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElDescriptions title="今日问题" :column="1" class="mt-20px">
          <ElDescriptionsItem label="问题数量">{{ todayQuestions }}</ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </ElCol>

    <!-- 第三个卡片：今日回答 -->
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElDescriptions title="今日回答" :column="1" class="mt-20px">
          <ElDescriptionsItem label="回答数量">{{ todayAnswers }}</ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </ElCol>
  </ElRow>
  <div class="wel">
    <h1>Welcome to Admin Dashboard</h1>
    <p>Hope you have a good day</p>
    <button><router-link to="/admin/statistics" style="color: white;">Get Started</router-link></button>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.wel {
  margin-top: 20px;
  text-align: center;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

button {
  background-color: #3eaf7c;
  color: white;
  border: none;
  text-decoration: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #13a57c;
}
</style>