<template>
  <el-button type="primary" plain style="margin-bottom: 10px" @click="handleAdd">添加</el-button>
  <el-table :data="UserData" style="width: 100%">
    <el-table-column prop="username" label="UserName" width="120"/>
    <el-table-column prop="password" label="Password" width="600"/>
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
  name: 'user',
  data() {
    return {
      UserData: [],
      item: {
        username: '',
        question: ''
      }
    }
  },
  mounted() {
    axios.get("/api/admin/role/users").then(res => {
      this.UserData = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    handleAdd() {
      this.$prompt('请输入姓名和密码（用逗号分隔）', '添加用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
          .then(({value}) => {
            if (!value) throw new Error('输入值不能为空');
            // 用逗号分隔用户输入的值
            const [username, password] = value.split(',');
            // console.log(username, password);
            // 检查输入值是否有效
            if (username && password) {
              return {
                username: username.trim(), // 去除多余的空格
                password: password.trim() // 去除多余的空格
              };
            }
            throw new Error('输入值不能为空');
          })
          .then(newUser => {
            return axios.post("/api/admin/role/users", newUser); // 发送请求添加用户
          })
          .then(({data}) => {
            this.UserData.push(data); // 将新用户添加到数组
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch(err => {
        console.log(err);
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });
        } else {
          this.$message({
            type: 'error',
            message: `${err.message}`
          });
        }

      });
    },

    // 删除问题的方法
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            return axios.delete("/api/admin/role/users/" + row.username); // 发送请求删除用户
          })
          .then(() => {
            this.UserData.splice(index, 1); // 从数组中删除问题
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

    // 编辑问题的方法
    handleEdit(index, row) {
      // 提示用户输入新的 username 和 password
      this.$prompt('请输入新的姓名和密码（用逗号分隔）', '编辑信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: `${row.username},${row.password}` // 默认显示当前的 name 和 password
      }).then(({value}) => {
        const [newUsername, newPassword] = value.split(','); // 用逗号分隔输入的值
        if (newUsername && newPassword) {
          this.UserData[index].username = newUsername.trim(); // 更新username
          this.UserData[index].password = newPassword.trim(); // 更新password

          // 发送更新请求到后端
          axios.put(`/api/admin/role/users/${row.username}`, {
            username: newUsername.trim(),
            password: newPassword.trim()
          }).then(() => {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '编辑失败，请稍后重试。'
            });
          });
        } else {
          this.$message({
            type: 'error',
            message: '姓名和密码不能为空!'
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