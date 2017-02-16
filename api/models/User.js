/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'User',
  autoUpdatedAt: false,
  autoCreatedAt: false,
  autoPK: false,
  attributes: {
    UserID: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true
    },
    Name: {
      type: 'string'
    },
    PassWd: {
      type: 'string'
    },
    Email: {
      type: 'string'
    },
    PhoneNum: {
      type: 'integer'
    },
    Credit: {
      type: 'integer'
    },
    School: {
      type: 'string'
    },
    Nickname: {
      type: 'string'
    },
    Publishtimes: {
      type: 'integer'
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
    Prfile: {
      type: 'string'
    }
  }
};

