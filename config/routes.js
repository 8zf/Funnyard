/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /********* HOMEPAGE *********/
  '/': 'HomeController.default',

  /********* LOGIN/OUT *********/
  'get /login': 'LoginController.default',
  'post /user_login': 'LoginController.validateUser',
  'post /publisher_login': 'LoginController.validatePublisher',
  'get /logout': 'LoginController.logout',

  /********* REGISTER *********/
  'get /register': 'RegisterController.default',
  'get /sendSMS': 'RegisterController.sendSMS',
  'post /register_user': 'UserController.add',
  'post /register_publisher': 'PublisherController.add',

  /********* ACTIVITY *********/
  'get /publish': 'PublishController.publish',
  'post /publish': 'ActivityController.add',
  'post /remove_activity': 'ActivityController.remove',
  'get /ac/:aid': 'ActivityController.show',
  'get /activities': 'ActivityController.showAll',
  'post /activity/remove/': 'ActivityController.remove',
  'get /ac_preview/:aid': 'ActivityController.preview',
  'get /participate': 'ParticipateController.participate',
  'get /quit': 'ParticipateController.quit',
  'get /get_activities': 'HomeController.getActivities',
  'get /search': 'ActivityController.search',

  /********* SPACE/CONSOLE *********/
  'get /user_space': 'UserController.toSpace',
  'get /publisher_space': 'PublisherController.toSpace',
  'get /console': 'PublisherController.toConsole',

  /********* UEditor *********/
  'get /ueditor/qiniu': 'PublishController.getQiniu',
  'post /ueditor/qiniu': 'PublishController.postQiniu',

  /********* FILE_TO_QINIU *********/
  'post /upload_icon': 'FileController.uploadIcon',
  'post /upload_cover': 'FileController.uploadCover',

  /********* COMMENT *********/
  'post /add_comment': 'CommentController.add',

  /********* TEST *********/

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
