<template>
  <div class="fitness">
    <el-card class="recommendations-card">
      <div class="bmi-calculator" style="display: flex;flex-direction: column;align-items: center;gap: 20px;">
        <div class="bmi-calculator-input">
          <div class="bmi-calculator-input-item" style="padding: 30px 20px 0px 0px;font-size: 18px">
            <label>输入你的身高体重，以便于计算你的bmi</label>
          </div>
          <div class="bmi-calculator-input-item">
            <label for="height">身高(cm)</label>
            <input type="number" id="height" v-model="height">
          </div>
          <div class="bmi-calculator-input-item">
            <label for="weight">体重(kg)</label>
            <input type="number" id="weight" v-model="weight">
          </div>
          <button @click="calculateBMI">计算</button>
        </div>
        <div class="bmi-calculator-result">
          <div>BMI: {{ bmi }}</div>
          <div v-if="bmi < 18.5">体型偏瘦</div>
          <div v-else-if="bmi < 25">体型正常</div>
          <div v-else-if="bmi < 30">体型超重</div>
          <div v-else-if="bmi < 35">体型肥胖</div>
          <div v-else>严重肥胖</div>
        </div>
      </div>
    </el-card>

    <el-card class="recommendations-card">
      <div class="bmi-calculator-table" style="display: flex;flex-direction: column;align-items: center;gap: 20px;">
        <el-table :data="filteredTableData" border style="width:550px">
          <el-table-column prop="BMI" label="BMI值" width="180"></el-table-column>
          <el-table-column prop="体型" label="体形判断" width="180"></el-table-column>
          <el-table-column prop="推荐锻炼" label="推荐锻炼" width="190"></el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="recommendations-card">
      <div style="text-align: center; font-size: 14px; display: flex;gap: 100px;justify-content: center">
        <div style="display: inline-block;" v-show="!recommendation || recommendation === '偏瘦'">
          <el-card shadow="hover">
            <div><img src="@/assets/肌肉锻炼.png" style="width: 30%;"></div>
            <div>
              <div>肌肉锻炼</div>
              <div>
                <p>对于那些想要肌肉体积变大，有效地增加肌肉质</p>
                <p>量，同时将脂肪增加保持在最低限度的人</p>
              </div>
            </div>
          </el-card>
        </div>
        <div style="display: inline-block;" v-show="!recommendation || recommendation === '正常'">
          <el-card shadow="hover">
            <div><img src="@/assets/提臀.png" style="width: 30%"></div>
            <div>
              <div>提臀</div>
              <div>
                <p>做好准备，严格按照指南进行特定的锻炼和营养摄</p>
                <p>入。带你练出有型的臀部不粗腿。</p>
              </div>
            </div>
          </el-card>
        </div>
        <div style="display: inline-block;" v-show="!recommendation || recommendation === '超重'">
          <el-card shadow="hover">
            <div><img src="@/assets/腹肌.png" style="width: 30%"></div>
            <div>
              <div>6块腹肌</div>
              <div>
                <p>为了凸显腹肌，体脂不超过10%是很重要的。身体</p>
                <p>前倾，重点锻炼腹肌和斜肌。</p>
              </div>
            </div>
          </el-card>
        </div>

        <div style="display: inline-block;" v-show="!recommendation || recommendation === '肥胖' || recommendation === '严重肥胖'">
          <el-card shadow="hover">
            <div><img src="@/assets/瘦身减肥.png" style="width: 30%;"></div>
            <div>
              <div>瘦身减肥</div>
              <div>
                <p>您想减肥吗？我们能让您在不挨饿，吃的足够</p>
                <p>健康的情况下，有效地加快您的新陈代谢。</p>
              </div>
            </div>
          </el-card>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weight: null,
      height: null,
      bmi: null,
      recommendation: null,
      tableData: [
        {
          BMI: '0-18.5',
          体型: '偏瘦',
          推荐锻炼: '减肥，增强体脂肪，增强肌肉力量',
          show: true
        },
        {
          BMI: '18.5-24.9',
          体型: '正常',
          推荐锻炼: '保持健康饮食，保持良好的睡眠，增强体力',
          show: true
        },
        {
          BMI: '25-29.9',
          体型: '超重',
          推荐锻炼: '减肥，增强体脂肪，增强肌肉力量',
          show: true
        },
        {
          BMI: '30-34.9',
          体型: '肥胖',
          推荐锻炼: '减肥，增强体脂肪，增强肌肉力量',
          show: true
        },
        {
          BMI: '35-39.9',
          体型: '严重肥胖',
          推荐锻炼: '不断减肥，不断增强体脂肪，增强肌肉力量',
          show: true
        }
      ],
      userBMI: null, // 用户输入的BMI值
    };
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter(item => {
        // 根据用户的BMI值设置show属性
        return this.userBMI === null || item.BMI.includes(this.userBMI);
        // return {
        //   ...item,
        //   show: this.userBMI === null || item.BMI.includes(this.userBMI),
        // }
      });
    },
  },
  methods: {
    calculateBMI() {
      if (this.weight && this.height) {
        // 计算BMI
        const heightInMeters = this.height / 100;
        this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);

        // 根据BMI设置推荐内容
        if (this.bmi < 18.5) {
          this.recommendation = '偏瘦';
          this.userBMI = '0-18.5';
        } else if (this.bmi < 25) {
          this.recommendation = '正常';
          this.userBMI = '18.5-24.9';
        } else if (this.bmi < 30) {
          this.recommendation = '超重';
          this.userBMI = '25-29.9';
        } else if (this.bmi < 35) {
          this.recommendation = '肥胖';
          this.userBMI = '30-34.9';
        } else {
          this.recommendation = '严重肥胖';
          this.userBMI = '35-39.9';
        }

        // 显示表格
        this.showTable = true;
      } else {
        alert('请输入体重和身高');
      }
    },
  },
};
</script>

<style scoped>
.bmi-calculator {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
}

.bmi-calculator-input {
  display: flex;
  gap: 10px;
}

.bmi-calculator-input-item {
  display: flex;
  flex-direction: column;
}

.bmi-calculator-input-item label {
  margin-bottom: 5px;
  font-weight: bold;
}

.bmi-calculator-input-item input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.bmi-calculator-result {
  margin-top: 20px;
  font-size: 18px;
}

button {
  transform: translateY(30px);
  height: 30px;
  background-color: #13a57c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.recommendations-card {
  margin: 20px;
}
</style>