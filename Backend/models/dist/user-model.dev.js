"use strict";

var mongoose = require('mongoose');

var Easy = require('./easy-questions');

var Moderate = require('./moderate-questions');

var Difficult = require('./difficult-questions');

var userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/
  },
  contact: {
    type: Number,
    match: /^([7-9][0-9]{9})$/g
  },
  domain: {
    type: Array,
    "default": [],
    requried: false
  },
  isadministrator: [{
    isadmin: {
      type: Boolean,
      required: false,
      "default": false
    },
    club: {
      type: String,
      required: true
    }
  }],
  issudoaccess: {
    type: Boolean,
    required: false,
    "default": false
  },
  clubs: [{
    type: String,
    required: false
  }],
  questionsIds: [{
    easyIds: [{
      type: mongoose.ObjectId,
      ref: 'Easy'
    }],
    moderateIds: [{
      type: mongoose.ObjectId,
      ref: 'Moderate'
    }],
    difficultIds: [{
      type: mongoose.ObjectId,
      ref: 'Difficult'
    }]
  }],
  easyresponses: [{
    id: {
      type: mongoose.ObjectId,
      ref: 'Easy'
    },
    answer: {
      type: String
    },
    marks: {
      type: Number,
      "default": 0
    }
  }],
  moderateresponses: [{
    id: {
      type: mongoose.ObjectId,
      ref: 'Moderate'
    },
    answer: {
      type: String
    },
    marks: {
      type: Number,
      "default": 0
    }
  }],
  difficultresponses: [{
    id: {
      type: mongoose.ObjectId,
      ref: 'Difficult'
    },
    answer: {
      type: String
    },
    marks: {
      type: Number,
      "default": 0
    }
  }],
  totalMarks: {
    type: Number,
    "default": 0
  },
  rank: {
    type: Number,
    "default": -1
  },
  token: {
    type: String
  }
});
module.exports = mongoose.model('User', userSchema);