/**
 * Keyword.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Keyword',
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    ID: {
      type: 'integer',
      primaryKey: true,
      required: true,
      unique: true
    },
    Name: {
      type: 'string'
    }
  }

};

