<template>
  <div class="identity-form-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="identity-form">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthDate">
        <el-date-picker
            v-model="form.birthDate"
            type="date"
            placeholder="选择出生日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="form.country" placeholder="请输入国家"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="ethnicity">
        <el-input v-model="form.ethnicity" placeholder="请输入民族"></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入居住地址"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import store from '@/store';
export default {
  name: 'personal',
  data() {
    return {
      status: 'create',
      form: {
        name: '',
        idCard: '',
        phone: '',
        birthDate: '',
        country: '',
        ethnicity: '',
        address: '',

      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^\d{17}[\dXx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        country: [
          { required: true, message: '请输入国家', trigger: 'blur' }
        ],
        ethnicity: [
          { required: true, message: '请输入民族', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入居住地址', trigger: 'blur' }
        ],

      }
    };
  },
  mounted() {
    // 在这里做一些初始化操作，例如从后端获取数据
    this.axios.get(`/api/personal/${store.username}`).then(response => {
      if(response.data!== null){
        this.form = response.data||{};
        if(this.form.name){
          this.status = 'update';
        }
      }

    });
  },
  methods: {
    handleUploadSuccess(response, file) {
      this.form.Photo = response.url;
      this.$message.success('上传成功');
    },
    handleUploadError() {
      this.$message.error('上传失败');
    },
    submitAction(){
      if(this.status === 'create')
        return this.axios.post(`/api/personal/${store.username}`, this.form);
      return this.axios.put(`/api/personal/${store.username}`, this.form);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 在这里处理表单提交逻辑，例如发送到后端
         this.submitAction().then(response => {
            this.status = 'update';
           this.$message.success('提交成功');
          }).catch(error => {
            ElMessage.error(error.message);
          });

        } else {
          this.$message.error('表单验证失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
    }
  }
}
</script>

<style scoped>
.identity-form-container {
  width: 500px;
  margin: 50px auto;
}

.identity-form {
  width: 100%;
}

.el-upload__tip {
  margin-top: 10px;
  font-size: 12px;
  color: #606266;
}
</style>