/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Activity',
  attributes: {
    ActivityID: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      required: true
    },
    Theme: {
      type: 'string',
      size: 120
    },
    ALocationLng: {
      type: 'float'
    },
    ALocationLat: {
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
      type: 'integer'
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

