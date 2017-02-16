/**
 * Publisher.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Publisher',
  autoUpdatedAt: false,
  autoCreatedAt: false,
  autoPK: false,
  attributes: {
    PublisherID: {
      type: 'integer',
      primaryKey: true,
      required: true,
      unique: true
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
      type: 'string'
    }
  }
};
