// Import server startup through a single index entry point
// FS.debug = true;

import './register-api.js';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: Meteor.absolutePath+"/private/uploads"})]
});

Meteor.publish("images", function() {
  return Images.find();
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update': function () {
    // add custom authentication code here
    return true;
  },
  'download': function () {
    // add custom authentication code here
    return true;
  }

});


Meteor.methods({
  'getPDF.read'() {
    console.log("call from server");
    console.log(Meteor.absolutePath);
    return (Assets.getBinary("uploads/images-LAKFHZg2HsCLXMbCS-DHMTS-001-RAP01-v1.0.pdf"));
    // return "getpdf from method"
  },
});


console.log( Meteor.settings.private.RESTAPI.url);
