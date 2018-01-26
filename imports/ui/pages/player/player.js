import { Players } from '/imports/api/players/players.js';
import { PlayerObject } from '/imports/api/players/playerObject.js';
import { Meteor } from 'meteor/meteor';

import './player.html';
import '/imports/ui/components/player/player.js';

Template.App_player.onCreated(function () {
  Meteor.subscribe('players.all');
});

Template.App_player.helpers({
  players() {
    return Players.find({});
  },
  playersImages() {
    return Images.find({});
  },
});


Template.App_player.events({
  'submit .player-add'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name;
    const email = target.email;

    // Meteor.call('players.insert', name.value, email.value, (error) => {
    //   if (error) {
    //     console.log(error.message);
    //   } else {
    //     name.value = '';
    //     email.value = '';
    //   }
    // });

    var newplayer = new PlayerObject( name.value, email.value);

    Meteor.call('players.insertAsObject', newplayer, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        name.value = '';
        email.value = '';
      }
    });

    var file = event.target.avatar;
    console.log(file.files[0]);
        //for (var i = 0, ln = files.length; i < ln; i++) {
          Images.insert(file.files[0], function (err, fileObj) {
            // console.log(err);
            // console.log(fileObj);
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          });
        //}

    console.log("player created");
  },
});
