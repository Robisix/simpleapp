import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/player/player.js';
import '../../ui/pages/pdfviewer/pdfviewer.js';
import '../../ui/pages/rest/rest.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/players', {
  name: 'App.player',
  action() {
    BlazeLayout.render('App_body', { main: 'App_player' });
  },
});

FlowRouter.route('/pdfviewer', {
  name: 'App.App_pdfviewer',
  action() {
    BlazeLayout.render('App_body', { main: 'App_pdfviewer' });
  },
});

FlowRouter.route('/rest', {
  name: 'App.rest',
  action() {
    BlazeLayout.render('App_body', { main: 'App_rest' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
