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
  attributes: {
    ActivityID: {
      type: 'string'
    },
    Type: {
      // to_activity & to_user & to_publisher
      type: 'string'
    },
    FromID: {
      type: 'string'
    },
    ToID: {
      type: 'string'
    },
    Content: {
      type: 'string'
    }
  }
};

