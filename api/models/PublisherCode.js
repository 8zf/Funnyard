/**
 * PublisherCode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'PublisherCode',
  autoUpdatedAt: false,
  autoCreatedAt: false,
  autoPK: false,
  attributes: {
    Code: {
      primaryKey: true,
      required: true,
      unique: true,
      type: 'string'
    },
    IsUsable: {
      type: 'integer'
    },
    PublisherID: {
      type: 'string'
    }
  }
};

