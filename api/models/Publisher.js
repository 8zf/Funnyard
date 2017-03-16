/**
 * Publisher.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Publisher',
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    PublisherID: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true
    },
    Nickname: {
      type: 'string',
      required: true,
      unique: true
    },
    Icon: {
      type: 'string',
      defaultsTo: 'http://image.funnyard.com/default-icon.jpg'
    },
    EMail: {
      type: 'string',
      size: 30
    },
    PassWd: {
      type: 'string',
      size: 60
    },
    Department: {
      type: 'string'
    },
    Credit: {
      type: 'integer'
    },
    Status: {
      type: 'integer'
    },
    RegistTime: {
      type: 'datetime'
    },
    PhoneNum: {
      type: 'integer'
    },
    AuditWay: {
      type: 'string'
    },
    AuditFile: {
      type: 'string'
    },
    Property: {
      type: 'string'
    },
    Description: {
      type: 'string',
      defaultsTo: '这个发布者很懒，什么都没有留下'
    },
    Follower: {
      collection: 'User',
      via: 'Follow'
    },
    Publish: {
      collection: 'Activity',
      via: 'Owner'
    },
  },
  
  getProfile: function (option, callback) {
    
  },
  
  getActivities: function (option, callback) {
    
  }
};

