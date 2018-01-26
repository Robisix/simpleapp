// Import client startup through a single index entry point
// FS.debug = true;

import './routes.js';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path:  Meteor.absolutePath+"/private/uploads"})]
});

Meteor.subscribe('images');
