import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

// import PDFJS from 'pdfjs-dist';
import { PDFJS } from 'pdfjs-dist'
import './pdfviewer.html';

Template.App_pdfviewer.helpers({
  pdfFiles() {
    return Images.find({ _id:"i9HzyEhAeZMtxbqRq"});
  },
  pdfExample() {
    return  Template.instance().valueExample.get();
  },
});

Template.App_pdfviewer.onCreated(function () {
  console.log("on create handler");
  Meteor.subscribe('getPDF.read');
  this.valueExample = new ReactiveVar("defautlValue" );
  Meteor.call('getPDF.read', (error, result) => {
    if (error) {
      console.log(error.message);
    }else{
        this.valueExample.set(result);
          console.log(result);

          var typedarray = new Uint8Array(result);

          // PDFJS.disableWorker = true;
          PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
          PDFJS.getDocument(typedarray).then(function(pdf) {
            // you can now use *pdf* here
            console.log("hellopdf");
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
              console.log('Page loaded');

              var scale = 1.5;
              var viewport = page.getViewport(scale);
console.log('viewport loaded');
              // Prepare canvas using PDF page dimensions
              var canvas = document.getElementById('the-canvas');
              var context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Render PDF page into canvas context
              var renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              var renderTask = page.render(renderContext);
              renderTask.then(function () {
                console.log('Page rendered');
              });
            });
          }, function (reason) {
            // PDF loading error
            console.error(reason);
          });

          // PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
          // // Create PDF
          // PDFJS.getDocument(result).then(function getPdfHelloWorld(pdf) {
          // 	// Fetch the first page
          // 	pdf.getPage(1).then(function getPageHelloWorld(page) {
          // 		var scale = 1;
          // 		var viewport = page.getViewport(scale);
          //
          // 		// Prepare canvas using PDF page dimensions
          // 		var canvas = document.getElementById('pdfcanvas');
          // 		var context = canvas.getContext('2d');
          // 		canvas.height = viewport.height;
          // 		canvas.width = viewport.width;
          //
          // 		// Render PDF page into canvas context
          // 		page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
          // 			console.log("rendrer step");
          // 		});
          // 	});
          // });
    }
  });


  // atob() is used to convert base64 encoded PDF to binary-like data.
// (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/
// Base64_encoding_and_decoding.)
// var pdfData = atob(
//   'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
//   'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
//   'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
//   'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
//   'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
//   'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
//   'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
//   'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
//   'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
//   'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
//   'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
//   'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
//   'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');
//
// // The workerSrc property shall be specified.
// PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
//
// // Using DocumentInitParameters object to load binary data.
// var loadingTask = PDFJS.getDocument({data: pdfData});
// loadingTask.promise.then(function(pdf) {
//   console.log('PDF loaded');
//
//   // Fetch the first page
//   var pageNumber = 1;
//   pdf.getPage(pageNumber).then(function(page) {
//     console.log('Page loaded');
//
//     var scale = 1.5;
//     var viewport = page.getViewport(scale);
//
//     // Prepare canvas using PDF page dimensions
//     var canvas = document.getElementById('the-canvas');
//     var context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//
//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };
//     var renderTask = page.render(renderContext);
//     renderTask.then(function () {
//       console.log('Page rendered');
//     });
//   });
// }, function (reason) {
//   // PDF loading error
//   console.error(reason);
// });

});



Template.App_pdfviewer.events({
  'click #the-canvas'(event) {
    event.preventDefault();
    console.log(event);
    var elem = $( event.target );
   posY = elem.position().top;
   console.log( posY ) // Returns 0
   var rect = event.target.getBoundingClientRect()
    var ctx = event.target.getContext("2d");
    ctx.font = "30px Arial";
    // ctx.fillText("Hello World",10,50);
    ctx.fillText("My super signature",event.clientX - rect.left ,event.clientY - rect.top);

    console.log("pdf clicked");
  },
});
