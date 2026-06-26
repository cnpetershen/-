<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="publishDialogVisible = true">发表文章</el-button>
      </div>
      <el-dialog title="发表文章" v-model="publishDialogVisible" width="500px" height="400px" center>
        <el-form :model="newArticle" :rules="rules" ref="newArticleForm">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="newArticle.title"></el-input>
          </el-form-item>
          <el-form-item label="文章作者" prop="author" required>
            <el-input v-model="newArticle.author"></el-input>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <el-input type="textarea" v-model="newArticle.content"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="date" required>
            <el-date-picker type="date" placeholder="选择日期" v-model="newArticle.date"></el-date-picker>
          </el-form-item>
          <el-form-item label="文章分类" prop="category" required>
            <el-select v-model="newArticle.category">
              <el-option label="hot" value="hot"></el-option>
              <el-option label="marriage" value="marriage"></el-option>
              <el-option label="family" value="family"></el-option>
              <el-option label="social" value="social"></el-option>
              <el-option label="self-awareness" value="self-awareness"></el-option>
                </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePublishOrEdit">确定</el-button>
      </span>
      </el-dialog>
      <!-- 文章表格区域 -->
      <el-table :data="filteredArticles" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>

</template>

<script>
import axios from 'axios';
import {ref} from 'vue';
export default {
  name: 'Publish',
  data() {
    return {
      // 文章列表
      articles: [],
      // 新文章的数据对象
      newArticle: {
        title: '',
        content: '',
        author:'',
        date: '',
        category: ''
      },
      // 发布文章的对话框是否可见
      publishDialogVisible: false,
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      dialogVisible: false
    };
  },
  computed: {
    filteredArticles() {
      // 这里可以根据需要添加过滤逻辑，例如根据搜索条件过滤文章
      return this.articles;
    }
  },
  methods: {
    // 发布文章的方法
    publishArticle() {
      this.$refs.newArticleForm.validate((valid) => {
        if (valid) {
          axios.post('/api/admin/articles', this.newArticle)
              .then(response => {
                // 发布成功后的处理
                this.$message.success('文章发布成功');
                this.publishDialogVisible = false;
                // 清空表单
                this.newArticle.title = '';
                this.newArticle.author = '';
                this.newArticle.content = '';
                this.newArticle.date = '';
                this.newArticle.category = '';
                // 重新获取文章列表
                this.fetchArticles();
              })
              .catch(error => {
                // 处理错误情况
                this.$message.error('文章发布失败');
                console.error(error);
              });
        } else {
          this.$message.error('请填写完整的文章信息');
          return false;
        }
      });
    },
    handlePublishOrEdit(){
      if(!!this.newArticle.id){
        this.updateArticle();
      }else{
        this.publishArticle();
      }
    },

    updateArticle() {
      axios.put(`/api/admin/articles/${this.newArticle.id}`, this.newArticle)
          .then(response => {
            console.log('Article updated successfully:', response.data);
            // 关闭对话框
            this.publishDialogVisible = false;
            // 刷新文章列表
            this.fetchArticles();
          })
          .catch(error => {
            console.error('Error updating article:', error);
          });
    },
    // 编辑文章的方法
    handleEdit(article) {
      // 将当前文章的数据赋值给 newArticle，以便在对话框中显示
      this.newArticle = { ...article };
      // 打开编辑对话框
      this.publishDialogVisible = true;
    },

    resetNewArticle() {
      this.newArticle = {
        title: '',
        content: '',
        author: '',
        date: '',
        category: ''
      };
      this.publishDialogVisible = false;
    },
    // 删除文章的方法
    handleDelete(article) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除请求
        axios.delete(`/api/admin/articles/${article.id}`)
            .then(response => {
              // 删除成功后的处理
              this.$message.success('文章删除成功');
              // 重新获取文章列表
              this.fetchArticles();
            })
            .catch(error => {
              // 处理错误情况
              this.$message.error('文章删除失败');
              console.error(error);
            });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 获取文章列表的方法
    fetchArticles() {
      this.axios.get('/api/admin/articles')
          .then(response => {
            this.articles = response.data;
          })
          .catch(error => {
            console.error('获取文章列表失败:', error);
            this.$message.error('获取文章列表失败');
          });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  created() {
    // 在组件创建时获取文章列表
    this.fetchArticles();
  }
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .btn-pub {
    margin-top: 5px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.center-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 400px;

  .el-dialog {
    margin: auto !important; /* 覆盖默认的 margin */
  }
}
</style>