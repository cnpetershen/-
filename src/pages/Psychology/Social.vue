<script lang="ts">
import axios from 'axios';
import { marked } from 'marked'; // 使用 import 语法导入 marked

export default {
  name: 'social',
  computed: {
    articleId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getArticleDetail() {
      const articleId = this.articleId;
      axios.get(`/api/psychology/social`)
          .then(response => {
            this.articles = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    renderMarkdown(markdown) {
      return marked(markdown);
    },
  },
  mounted() {
    this.getArticleDetail();

  },
  computed: {},

  data() {
    return {
      articles: [],
    };
  }
}
</script>

<template>
  <div>
    <el-card class="as1" v-for="item in articles||[]">
      <div>
        <router-link :to="'/psychology/article/' + item.id"><h2>{{ item.title }}</h2></router-link>
      </div>
      <div v-html="renderMarkdown(item.content)" class="as2"></div> <!-- 使用 v-html 渲染 Markdown 内容 -->
    </el-card>
  </div>
</template>

<style scoped>
/* 可以根据需要添加样式 */
.as1 {
  margin: auto 150px;
  padding: 0 60px 40px 60px;
}

h2 {
  font-size: 35px;
  text-shadow: 0 8px 6px #6699FF;
}

.as2 {
  font-size: 18px;
  line-height: 32px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 限制显示 2 行 */
  overflow: hidden;
}


</style>