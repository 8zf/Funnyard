/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  tableName: 'Comment',
  attributes: {
    From: {
      collection: 'User',
      via: 'Comment'
    },
    To: {
      collection: 'Activity',
      via: 'Comment'
    },
    Content: {
      type: 'string'
    }
  }
};

