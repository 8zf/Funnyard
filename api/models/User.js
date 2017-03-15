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
      type: 'integer'
    },
    Credit: {
      type: 'integer',
      defaultsTo: 5
    },
    School: {
      type: 'string'
    },
    Nickname: {
      type: 'string'
    },
    RegTime: {
      type: 'datetime'
    },
    Description: {
      type: 'string'
    },
    Sex: {
      type: 'string'
    },
    Age: {
      type: 'integer'
    },
    Profile: {
      type: 'string'
    },
    Icon: {
      type: 'string',
      defaultsTo: 'http://image.funnyard.com/default-icon.jpg'
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
  },
  getProfile: function (option, callback) {

  },

  getAssociatedActivity: function (option, callback) {

  },

  findWithSameNameAsPerson: function (opts, cb) {
    
  }
};

