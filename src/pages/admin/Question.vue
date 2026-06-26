
  <template>
    <el-button type="primary" plain style="margin-bottom: 10px" @click="handleAdd">添加</el-button>
    <el-table :data="QuestionData" style="width: 100%">
      <el-table-column fixed prop="askDatetime" label="Date" width="150" />
      <el-table-column prop="username" label="Name" width="120" />
      <el-table-column prop="message" label="Question" width="600" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">
            Delete
          </el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
  import axios from 'axios'
    export default {
      name: 'question',
      data() {
        return {
          QuestionData: [],
           item:{
             askDatetime:'',
             username:'',
             message:''
            }
        }
      },
      mounted() {
        axios.get(`/api/admin/dialogs/questions`).then(res => {
          this.QuestionData = res.data;
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
              this.$prompt('请输入问题', '添加新数据', {
                inputValue: '',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(({ value: question }) => {
                // 将新数据添加到 QuestionData 数组中
                this.QuestionData.push({ date, name, question });
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
                return axios.delete("/api/admin/dialogs/questions/" + row.id); // 发送请求删除用户
              })
              .then(() => {
                this.QuestionData.splice(index, 1); // 从数组中删除问题
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
              this.QuestionData[index].message = value;

              // 发送更新请求到后端
              axios.put(`/api/admin/dialogs/questions/${row.id}`, {
                message: value,
                id: row.id
              }).then(response => {
                if (response.data.status === "success") {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '编辑失败，请稍后再试'
                  });
                }
              }).catch(error => {
                this.$message({
                  type: 'error',
                  message: '编辑失败，请稍后再试'
                });
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