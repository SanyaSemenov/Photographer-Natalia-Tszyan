"use strict";
var textContainer = $('.content');
var text = $('.content .text');
var body = $('body');
var page = $('html');

// var swup = new Swup();

$(function () {
  jQuery('.text').hyphenate();
  $(window).load(function () {
    body.removeClass('invisible');
  });

  $('.navbar-nav li a, .brand').click(function (e) {
    e.preventDefault(); 
    var target = "/"+$(this).attr('href');
    body.addClass('invisible');
    setTimeout(function () {
      window.location.href = target; 
    }, 500);
  });
});