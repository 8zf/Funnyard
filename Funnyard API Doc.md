# Funnyard API Doc

## HOMEPAGE
'/': 'HomeController.default'

## LOGIN/OUT
'get /login': 'LoginController.default'

'post /user_login': 'LoginController.validateUser'

'post /publisher_login': 'LoginController.validatePublisher'

'get /logout': 'LoginController.logout'

## REGISTER
'get /register': 'RegisterController.default'

'get /sendSMS': 'RegisterController.sendSMS'

'post /register_user': 'UserController.add'

'post /register_publisher': 'PublisherController.add'

## ACTIVITY
'get /publish': 'PublishController.publish'

'post /publish': 'ActivityController.add'

'post /remove_activity': 'ActivityController.remove'

'get /ac/:aid': 'ActivityController.show'

'get /activities': 'ActivityController.showAll'

'post /activity/remove/': 'ActivityController.remove'

'get /ac_preview/:aid': 'ActivityController.preview'

'get /participate': 'ParticipateController.participate'

'get /quit': 'ParticipateController.quit'

'get /get_activities': 'HomeController.getActivities'

'get /search': 'ActivityController.search'

## SPACE/CONSOLE
'get /user_space': 'UserController.toSpace'

'get /publisher_space': 'PublisherController.toSpace'

'get /console': 'PublisherController.toConsole'

## UEDITOR
'get /ueditor/qiniu': 'PublishController.getQiniu'

'post /ueditor/qiniu': 'PublishController.postQiniu'


## FILE TO QINIU
'post /upload_icon': 'FileController.uploadIcon'

'post /upload_cover': 'FileController.uploadCover'

## COMMENT
'post /add_comment': 'CommentController.add'