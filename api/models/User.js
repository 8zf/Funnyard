/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'User',
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    UserID: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true,
    },
    Name: {
      type: 'string'
    },
    PassWd: {
      type: 'string'
    },
    PhoneNum: {
      type: 'string'
    },
    Credit: {
      type: 'integer',
      defaultsTo: 5
    },
    School: {
      type: 'string',
      defaultsTo: '同济大学'
    },
    Nickname: {
      type: 'string'
    },
    RegTime: {
      type: 'datetime'
    },
    Description: {
      type: 'string',
      defaultsTo: '这个人很懒，什么都没有留下'
    },
    Sex: {
      type: 'string',
      defaultsTo: '未设置'
    },
    Age: {
      type: 'integer',
      defaultsTo: 0
    },
    Profile: {
      type: 'string'
    },
    Icon: {
      type: 'string',
      defaultsTo: 'https://omwktgfmo.qnssl.com/default-icon.jpg'
    },
    Participate: {
      collection: 'Activity',
      via: 'Participant'
    },
    Follow: {
      collection: 'Publisher',
      via: 'Follower'
    },
    Like: {
      collection: 'User',
      via: 'Like'
    },
    Comment: {
      collection: 'Comment',
      via: 'From'
    }
  },
  getProfile: function (option, callback) {

  },

  getAssociatedActivity: function (option, callback) {

  },

  findWithSameNameAsPerson: function (opts, cb) {

  }
};

