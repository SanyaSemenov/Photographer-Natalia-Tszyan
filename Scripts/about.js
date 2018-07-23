"use strict";
var textContainer = $('.content');
var text = $('.content .text');
var body = $('body');
var page = $('html');

$(function () {
  jQuery('.text').hyphenate();
  if(document.referrer.indexOf('index'!=-1)){
    page.css('background-color', '#000000');
  }

  $(window).load(function(){
    body.removeClass('invisible');
  });
});