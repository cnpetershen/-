慧医疗 SmartMedical

项目开发时间：2024 年 12 月

一款面向 C 端用户的智慧医疗健康服务平台，集成 AI 健康咨询、医师选择、心理科普、健身方案与管理后台于一体。

---

一、项目简介

「慧医疗」是一个前后端分离的智慧医疗健康服务平台，旨在为普通用户提供从「在线问诊 → AI 健康咨询 → 心理科普 → 健身指导」的一站式健康服务，同时为管理员提供用户/医师/内容/数据的后台管理能力。

核心亮点：

- 接入 DeepSeek 大模型（deepseek-chat）作为 AI 健康专家，支持基于会话线程（threadId）的多轮上下文对话
- 覆盖 C 端用户 与 B 端管理 双端形态
- 集成 ECharts 数据看板，实时呈现平台运营指标

---

二、技术栈

后端 SmartMedical-Server

  类别      	选型                                      
  框架      	Spring Boot 3.3.5                       
  语言      	Java 21                                 
  安全      	Spring Security（当前 permitAll）+ JWT (jjwt 0.11.5)
  持久层     	MyBatis 3.0.3（注解式 SQL）                  
  数据库     	MySQL（库名 sm）                            
  缓存      	Spring Data Redis（已引入依赖）                
  API 文档  	SpringDoc OpenAPI 2.0.2（Swagger UI）     
  HTTP 客户端	RestTemplate（调用 DeepSeek API）           
  工具      	Lombok                                  
  构建      	Maven（mvnw 包装器）                         

前端 vue-project

  类别      	选型                                   
  框架      	Vue 3.4                              
  构建      	Vite 5.2                             
  UI 库    	Element Plus 2.8 + Ant Design Vue 4.2
  路由      	Vue Router 4                         
  状态管理    	Pinia 2（实际使用 reactive store）         
  HTTP    	Axios 1.7                            
  图表      	ECharts 5.5 + vue-echarts 7          
  Markdown	marked 15                            
  富文本     	wangeditor 5                         
  类型      	TypeScript 5.4                       
  其他      	screenfull、vue-i18n、mockjs、js-cookie 

---

三、功能模块

1. C 端用户功能

  模块   	路由                      	功能说明                           
  首页   	/home                   	Banner 轮播 + 专家科普文章列表           
  医师选择 	/choice                 	全体医师列表，按科室（内科/外科等）筛选           
  医师详情 	/choice/detail/:doctorId	医师详细信息，可发起提问                   
  线上咨询 	/contact                	AI 健康咨询，接入 DeepSeek，支持多轮对话与历史记录
  健身方案 	/fitness                	BMI 计算器 + 体型推荐锻炼方案             
  健康心理 	/psychology             	心理文章分类浏览（热门/婚姻/家庭/社交/自我认知）     
  文章详情 	/psychology/article/:id 	Markdown 渲染的文章详情页              
  登录/注册	/login、/register        	JWT 鉴权                         
  个人信息 	/personal               	实名信息（姓名/身份证/手机号/生日/民族/地址）      

2. B 端管理后台 /admin

  模块  	路由                    	功能说明                                    
  智慧首页	/admin/dashboard      	今日到访人数、今日问题数、今日回答数                      
  用户管理	/admin/role/users     	用户 CRUD                                 
  人事管理	/admin/role/personnel 	医师 CRUD                                 
  用户问题	/admin/dialog/question	查看/删除/编辑用户提问                            
  医师回答	/admin/dialog/answer  	查看/删除 AI 回答                             
  投稿文档	/admin/publish        	文章 CRUD（富文本编辑、分类：hot/marriage/family/social/self-awareness）
  数据统计	/admin/statistics     	ECharts 图表（登录柱状图、访问饼图等）                 

3. AI 健康咨询流程

    用户输入 → /api/contact/ask/{username}/{threadId}
            ↓
    ContactService.sendQuestion
      1. 校验用户存在
      2. 按 threadId 取出历史消息
      3. 在头部插入 system 角色："你是健康专家，可以提供健康咨询。"
      4. 组装 DeepSeekMessage 列表
      5. DeepSeekService.sendRequest → POST https://api.deepseek.com/chat/completions
      6. 将 AI 回答存入 message_thread 表
      7. 返回回答内容

---

四、项目结构

    慧医疗/
    ├── SmartMedical-Server/                # Spring Boot 后端
    │   ├── src/main/java/com/peter/smartmedicalserver/
    │   │   ├── config/                     # SecurityConfig、WebConfig、CommonConfig、RestTemplateConfig、GuidConfig
    │   │   ├── controller/                 # 11 个 REST 控制器
    │   │   ├── entity/                     # 9 个实体类
    │   │   ├── mapper/                     # 10 个 MyBatis Mapper
    │   │   ├── service/                    # 11 个 Service
    │   │   ├── utils/                      # JwtUtil、GuidUtil、JsonUtil
    │   │   └── vo/                         # DeepSeek 系列、ResponseStatus、ThreadInfo 等
    │   └── src/main/resources/application.yml
    │
    └── vue-project/                        # Vue 3 前端
        └── vue-project/
            ├── src/
            │   ├── components/             # NavigationBar、Leaderboard、DoctorItem、admin/* 等
            │   ├── pages/                  # Home、Contact、Fitness、Psychology/*、admin/* 等
            │   ├── router/                 # index + admin-routes + choice-routes + psychology-routes
            │   ├── store/                  # reactive 全局 store
            │   ├── utils/                  # request.ts、auth.ts、privilege.js
            │   ├── directive/permission/   # v-permission 指令
            │   └── mock/                   # mockjs 数据
            └── vite.config.js              # 代理 /api → http://localhost:8080

---

五、数据模型

  表名            	说明     	关键字段                                    
  user          	用户账号   	id、username、password、role、latestLoginTime
  personal      	用户实名信息 	name、idCard、phone、birthDate、country、ethnicity、address、username
  doctors       	医师信息   	name、department、specialty、position、photoUrl、telephone
  choice_detail 	医师详情   	name、title、specialty、achievements、communication、award、experience
  articles      	科普/心理文章	title、content、author、date、category      
  banner        	首页轮播图  	url                                     
  message_thread	AI 对话消息	threadId、role(user/system)、username、message、askDatetime

---

六、API 接口概览

所有 REST 接口通过 WebConfig 自动添加 /api 前缀。

  控制器                   	路径                                      	主要功能                
  UserController        	/user/login、/user/register、/user/login-status 等	登录注册、统计             
  ContactController     	/contact/start、/contact/ask/{username}/{threadId}、/contact/history/...	AI 对话               
  DoctorManageController	/admin/role/personnel、/choice/index     	医师管理                
  ChoiceDetailController	/choice/detail/{doctorId}               	医师详情                
  ArticlesController    	/science/articles、/psychology/*、/admin/articles	文章                  
  QuestionsController   	/admin/dialogs/questions                	问题管理                
  AnswerController      	/admin/dialogs/answer                   	回答管理                
  PersonalController    	/personal/{username}                    	个人信息                
  UserManageController  	/admin/role/users                       	用户管理                
  BannerController      	/banner/select                          	轮播图                 
  FileUploadController  	/upload                                 	文件上传（保存至 ./uploads/）

API 文档：启动后端后访问 http://localhost:8080/swagger-ui.html

---

七、本地运行

环境要求

- JDK 21
- MySQL 8.x
- Node.js 18+
- Maven 3.9+（或使用项目自带 mvnw）

1. 准备数据库

    CREATE DATABASE sm DEFAULT CHARACTER SET utf8mb4;

项目未提供初始化脚本，需依据「数据模型」一节自行建表。

2. 启动后端

    cd SmartMedical-Server
    # 修改 src/main/resources/application.yml 中的数据库账号密码
    ./mvnw spring-boot:run
    # 默认端口 8080

3. 启动前端

    cd vue-project/vue-project
    npm install
    npm run dev
    # 默认端口 5173，已配置 /api 代理到 http://localhost:8080

4. 访问

- 前端：http://localhost:5173
- 后端 API：http://localhost:8080
- Swagger：http://localhost:8080/swagger-ui.html

---

八、关键配置说明

SmartMedical-Server/src/main/resources/application.yml：

- 数据库：jdbc:mysql://localhost:3306/sm，默认账号 root / 密码 1234
- 文件上传：./uploads/，单文件上限 2MB
- JWT：secret 与 7 天过期时间（604800 秒）
- MyBatis：使用注解 SQL，无 XML 映射文件
- SpringDoc：仅匹配 /api/** 路径

vue-project/vue-project/vite.config.js：

- /api → http://localhost:8080（保留 /api 前缀）
- /chat-api → 图灵机器人（遗留配置）

---

九、已知问题与改进建议（产品视角）

安全风险（建议优先处理）

1. DeepSeek API Key 硬编码：见 DeepSeekService.java 第 24 行，明文嵌入源码，应迁移至环境变量或配置中心
2. 数据库密码明文：application.yml 中 password: '1234'
3. JWT Secret 硬编码：应使用环境变量注入
4. Spring Security 形同虚设：SecurityConfig 全部 permitAll，未对 /admin/** 做角色校验
5. 密码明文存储：UserService.login 直接 equals 比较密码，未使用 BCryptPasswordEncoder（虽已注入 Bean）
6. 文件上传无校验：未限制类型/大小校验，存在路径穿越风险

工程问题

1. 前端目录嵌套两层 vue-project/vue-project/，存在重复子项目
2. vue-project/vue-project/vue-project/ 三层嵌套，疑似误操作
3. Pinia 已引入但未使用，状态管理用 reactive 替代
4. vite-plugin-mock 已引入但配置被注释
5. 后端 RestTemplateConfig 重复添加 Jackson 转换器
6. 缺少数据库初始化脚本（schema.sql / data.sql）
7. 缺少单元测试与集成测试

产品迭代建议

1. AI 对话增强：流式输出（SSE）、上下文长度控制、敏感词过滤、Token 用量统计
2. 医师问诊：当前「向医师提问」实际仍走 AI，建议接入真实医师端或工单系统
3. 数据看板：补充留存率、转化率、问诊满意度等业务指标
4. 权限模型：细化 admin/doctor/user 三级角色，落地 RBAC
5. 内容审核：文章发布与 AI 回答需接入审核机制
6. 移动端适配：当前以 PC 为主，医疗类产品建议补齐移动端体验

---

十、版本与版权

- 版本：0.0.1-SNAPSHOT
- 版权：慧医疗版权所有 © 2024.12
- 开发：peter
