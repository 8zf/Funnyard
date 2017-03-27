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
      required: true
    },
    LocationLng: {
      type: 'string',
      required: true
    },
    LocationLat: {
      type: 'string',
      required: true
    },
    Location: {
      type: 'string',
      required: true,
      size: 120
    },
    HoldTime: {
      type: 'datetime',
      required: true
    },
    EndTime: {
      type: 'datetime',
      required: true
    },
    ViewTime: {
      type: 'integer',
      defaultsTo: 0
    },
    MaxNum: {
      type: 'integer'
    },
    NowNum: {
      type: 'integer',
      defaultsTo: 0
    },
    // PublishTime: {
    //   type: 'datetime'
    // },
    Poster: {
      type: 'string',
      required: true
    },
    Content: {
      type: 'string',
      size: 100000
    },
    // PublisherID: {
    //   type: 'string'
    // },
    Category: {
      type: 'string',
      size: 20
    },
    PubGroup: {
      type: 'string',
      size: 120
    },
    State: {
      type: 'string',
      size: 20
    },
    ApplyWay: {
      type: 'string',
      size: 20
    },
    Keywords: {
      type: 'string',
      size: 120
    },
    ApplyFile: {
      type: 'string',
      size: 6
    },
    Participant: {
      collection: 'User',
      via: 'Participate'
    },
    Features: {
      collection: 'Keyword',
      via: 'IsOwnedBy'
    },
    Owner: {
      model: 'Publisher'
    },
    Comment: {
      collection: 'Comment',
      via: 'To'
    }
  },
  findByKeyword: function (key, cb) {
    Activity.findByKeyword(key, function (err, records) {

    })
  },
  findByName: function (option, cb) {

  }
};

