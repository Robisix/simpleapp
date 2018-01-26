// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Players } from './players.js';
import { PlayerObject } from './playerObject.js';
Meteor.methods({
  'players.insert'(name, email) {
    check(name, String);
    check(email, String);

    return Players.insert({
      name,
      email,
      createdAt: new Date(),
    });
  },

  'players.insertAsObject'(player) {
    check(player.name, String);
    check(player.email, String);

    return Players.insert({
      name: player.name,
      email: player.email,
      createdAt: new Date(),
    });
    console.log("playerObject created");
  },
});
