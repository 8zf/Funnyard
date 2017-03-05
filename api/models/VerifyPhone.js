/**
 * VerifyPhone.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "VerifyPhone",
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    PhoneNum: {
      primaryKey: true,
      type: 'string'
    },
    VerifyCode: {
      type: 'integer'
    },
    ExpireAt: {
      type: 'string'
    },
  }
};

