<template>
  <el-button type="primary" plain style="margin-bottom: 10px" @click="handleAdd">添加</el-button>
  <el-table :data="PersonnelData" style="width:1000px">
    <el-table-column prop="name" label="Name" width="200" />
    <el-table-column prop="department" label="Department" width="200" />
    <el-table-column prop="position" label="Position" width="right" />

    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">
          Delete
        </el-button>
        <el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'Personnel',
  data() {
    return {
      PersonnelData: []
    };
  },
  mounted() {
    this.fetchPersonnelData();
  },
  methods: {
    fetchPersonnelData() {
      axios.get("/api/admin/role/personnel").then((res) => {
        this.PersonnelData = res.data;
      }).catch((err) => {
        console.log(err);
        ElMessage({
          type: 'error',
          message: '数据加载失败，请稍后重试。'
        });
      });
    },
    handleAdd() {
      this.$prompt('请输入姓名', '添加新数据', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value: name }) => {
        this.$prompt('请输入职位', '添加新数据', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value: position }) => {
          this.$prompt('请输入部门', '添加新数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value: department }) => {
            this.PersonnelData.push({ name, position, department });
            axios.post('/api/admin/role/personnel', {
              name,
              position,
              department
            }).then(() => {
              ElMessage({
                type: 'success',
                message: '添加成功!'
              });
            }).catch(() => {
              ElMessage({
                type: 'error',
                message: '添加失败，请稍后重试。'
              });
            });
          }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消输入部门'
            });
          });
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消输入职位'
          });
        });
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消输入姓名'
        });
      });
    },
    handleDelete(index, row) {
      ElMessageBox.confirm('确定删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.PersonnelData.splice(index, 1);
        axios.delete('/api/admin/role/personnel/' + row.name).then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          ElMessage({
            type: 'error',
            message: '删除失败，请稍后重试。'
          });
        });
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleEdit(index, row) {
      this.$prompt('编辑职位信息', '编辑数据', {
        inputValue: row.position,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          this.PersonnelData[index].position = value;
          axios.put(`/api/admin/role/personnel/${row.name}`, {
            ...row,
            position: value
          }).then(() => {
            ElMessage({
              type: 'success',
              message: '编辑成功!'
            });
          }).catch(() => {
            ElMessage({
              type: 'error',
              message: '编辑失败，请稍后重试。'
            });
          });
        }
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消编辑'
        });
      });
    }
  }
};
</script>

<style scoped>
</style>