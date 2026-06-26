<script lang="ts">
import axios from 'axios';
import { marked } from 'marked'; // 使用 import 语法导入 marked

export default {
  name: 'ArticleDetail',
  computed: {
    articleId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getArticleDetail() {
      const articleId = this.articleId;
      axios.get(`/api/psychology/articles/${articleId}`)
          .then(response => {
            this.articleTitle = response.data.title;
            this.articleContentText = marked(response.data.content); // 使用 marked 渲染 Markdown
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
  mounted() {
    this.getArticleDetail();
  },
  data() {
    return {
      articleTitle: '',
      articleContentText: '',
    };
  }
}
</script>

<template>
  <el-card class="as1">
    <div>
      <h2>{{ articleTitle }}</h2>
    </div>
    <div v-html="articleContentText" class="as2"></div> <!-- 使用 v-html 渲染 Markdown 内容 -->
  </el-card>
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
}


</style>