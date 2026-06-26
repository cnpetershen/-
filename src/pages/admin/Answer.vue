
<template>
  <el-button type="primary" plain style="margin-bottom: 10px" @click="handleAdd">添加</el-button>
  <el-table :data="AnswerData" style="width: 100%">
    <el-table-column fixed prop="askDatetime" label="Date" width="200" />
    <el-table-column prop="message" label="Answer" width="700" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">
          Delete
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'answer',
  data() {
    return {
      AnswerData: [],
      item:{
        askDatetime:'',
        message:''
      }
    }
  },
  mounted() {
    axios.get(`/api/admin/dialogs/answer`).then(res => {
      this.AnswerData = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    handleAdd() {
      // 弹出一个对话框，让用户输入新的数据（这里假设用户需要输入日期、姓名和问题）
      this.$prompt('请输入日期', '添加新数据', {
        inputValue: '',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value: date }) => {
        this.$prompt('请输入姓名', '添加新数据', {
          inputValue: '',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value: name }) => {
          this.$prompt('请输入答案', '添加新数据', {
            inputValue: '',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value: answer }) => {
            // 将新数据添加到 QuestionData 数组中
            this.AnswerData.push({ date, name, answer });
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消输入问题'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消输入姓名'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消输入日期'
        });
      });
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            console.log(row);
            return axios.delete("/api/admin/dialogs/answer/" + row.id); // 发送请求删除用户
          })
          .then(() => {
            this.AnswerData.splice(index, 1); // 从数组中删除问题
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch((err) => {
            if (err === 'cancel') {
              this.$message({
                type: 'error',
                message: '已取消删除'
              })
            } else {
              console.log(err);
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          });
    },
    handleEdit(index, row) {
      // 弹出编辑对话框，让用户编辑问题内容
      this.$prompt('编辑问题信息', '编辑问题', {
        inputValue: row.question,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          // 如果用户输入了新内容，更新 QuestionData 数组中对应的数据项
          this.AnswerData[index].question = value;
          this.$message({
            type: 'success',
            message: '编辑成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消编辑'
        });
      });
    }



  }
}
</script>



<style scoped>

</style>