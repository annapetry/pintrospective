// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializejson.min
//= require isotope.pkgd
//= require imagesloaded.pkgd
//= require underscore
//= require backbone
//= require backbone.stickit.min
//= require heartcode-canvasloader-min
//= require bootstrap
//= require pintrospective
//= require_tree ../templates
//= require_tree ./utils
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .


$(document).ready(function (){
  $("#demo").click(function (event) {
    event.preventDefault();
    $("#usernameField").val("FridaKhalo");
    $("#passwordField").val("fridakhalo");
    $('#sign-in').click();
  });
});