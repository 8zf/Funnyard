/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Activity',
  autoUpdatedAt: true,
  autoCreatedAt: true,
  autoPK: false,
  attributes: {
    ActivityID: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true
    },
    Theme: {
      type: 'string',
      size: 120
    },
    LocationLng: {
      type: 'float'
    },
    LocationLat: {
      type: 'float'
    },
    Location: {
      type: 'string',
      size: 120
    },
    HoldTime: {
      type: 'datetime'
    },
    EndTime: {
      type: 'datetime'
    },
    HoldTimeStamp: {
      type: 'integer'
    },
    EndTimeStamp: {
      type: 'integer'
    },
    MaxNum: {
      type: 'integer'
    },
    PublishTime: {
      type: 'datetime'
    },
    Poster: {
      type: 'string',
      size: 50
    },
    Description: {
      type: 'string'
    },
    PublisherID: {
      type: 'string'
    },
    Category: {
      type: 'string',
      size: 20
    },
    Pubgroup: {
      type: 'string',
      size: 120
    },
    Acnow: {
      type: 'string',
      size: 20
    },
    NowNum: {
      type: 'integer'
    },
    Applyway: {
      type: 'string',
      size: 20
    },
    Keywords: {
      type: 'string',
      size: 120
    },
    Applyfile: {
      type: 'string',
      size: 6
    }
  }
};

