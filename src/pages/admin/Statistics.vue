<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <div style="width: 100%; height: 400px" id="line"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="width: 100%; height: 400px" id="bar"></div>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="24">
        <el-card>
          <div style="width: 100%; height: 400px" id="pie"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'



const DAY_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
axios.get('/api/user/login-status')
    .then(response => {
      //
      const data = response.data.map(item => ({...item,'dayOfWeek':DAY_OF_WEEK[item.dayOfWeek-1]}));
      const loginCounts = data.map(item => item.loginCount);

      const option1 = {
        title: {
          text: '登录柱状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '登录量',
            data: loginCounts,
            type: 'bar',
            smooth: true
          }
        ]
      };

      let BarDom = document.getElementById('bar');
      let BarChart = echarts.init(BarDom);
      BarChart.setOption(option1);
    })
    .catch(error => {
      console.error('Error fetching login stats:', error);
    });


const option2 = {
  title: {
    text: '访问人群饼图',
    subtext: '占比图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '儿童' },
        { value: 735, name: '少年' },
        { value: 580, name: '青年' },
        { value: 484, name: '中年' },
        { value: 300, name: '老年' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
export default {
  name: "Statistics",
  data() {
    return {
      questionData: [],
      answerData: []
    }
  },
  mounted() {
    this.loadQuestionAndAnswerData();
    //等待页面的元素全部初始完成之后再初始化


    //饼图
    let PieDom=document.getElementById('pie');
    let PieChart=echarts.init(PieDom);
    PieChart.setOption(option2);
  },
  methods: {
    loadQuestionAndAnswerData() {
        Promise.all([
            axios.get('/api/user/question-status')
            .then(response => {
              const questionData = response.data.map(item => item.questionCount);
              this.questionData = questionData;
              return questionData;
            })
            .catch(error => {
              console.error('Error fetching question status:', error);
            }),

        axios.get('/api/user/answer-status')
            .then(response => {
              const answerData = response.data.map(item => item.answerCount);
              this.answerData = answerData;
            })
            .catch(error => {
              console.error('Error fetching answer status:', error);
            })])
        .then(() => {
          this.updateChart();
        });
    },
     updateChart() {
  const option = {
    title: {
      text: '活跃度折线图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 'left'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '问题',
        data: this.questionData,
        type: 'line',
        smooth: true
      },
      {
        name: '答案',
        data: this.answerData,
        type: 'line',
        smooth: true
      }
    ]
  };

  let LineDom = document.getElementById('line');
  let LineChart = echarts.init(LineDom);
  LineChart.setOption(option);
}

}
}
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>