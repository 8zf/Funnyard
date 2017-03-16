/**
 * PublisherCode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'PublisherCode',
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    Code: {
      primaryKey: true,
      required: true,
      unique: true,
      type: 'string'
    },
    IsUsable: {
      type: 'integer',
      defaultsTo: 1
    },
    PublisherID: {
      type: 'string'
    }
  }
};

