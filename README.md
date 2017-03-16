funnyard
=======
    基于地理位置的大学生活动信息聚合平台<br/><br/>
[网站](http://www.funnyard.com:1337)<br><br>
权限控制策略暂时关闭<br>
用户与发布者注册登陆按钮在首页<br>
注册两者皆需要手机短信验证，时限30分钟<br>
登陆持续时间：10分钟（方便测试）<br>
发布者注册需要注册码，测试阶段可在 www.funnyard.com:1337/publishercode 查看<br>
同样的：www.funnyard.com:1337/user<br>
www.funnyard.com:1337/publisher<br>
www.funnyard.com:1337/activity<br>
等接口在开发期间开放，可随时查看数据库信息<br>
具体api：http://sailsjs.com/documentation/reference/blueprint-api 不建议使用<br>
www.funnyard.com/publish ：发布者发布活动，活动内容的图片以及网站静态文件头像等文件在线储存到七牛云，加快访问速度<br>
数据库连接可用 MySQL Workbench，host: 139.129.30.235, port: 3306, user: root, pwd: ********* 直接操作数据库<br>
活动信息界面：www.funnyard.com/activity/activity_id，登陆用户可进行报名与取消报名行为<br>
发布者管理活动：删除活动，不能修改，只能重发
ToDoList:
> - [x] 活动信息界面UI
> - [x] 活动发布UI
> - [x] 注册登陆UI
> - [x] 用户信息界面，头像上传，编辑信息，参与的活动
> - [ ] 发布者控制台，管理发布的活动 using theme 4
> - [x] 参与活动 ajax API ~get
> - [ ] 关注活动，通知动态
> - [ ] 活动筛选分类查找
> - [ ] 活动筛选
> - [ ] 天地图API开发
> - [ ] HTTPS 证书申请
> - [ ] 删除一个活动时如何向用户发送消息
>七牛图片裁剪api：\<imageurl>?imageMogr2/
