"use strict";
var carouselItems = document.querySelectorAll('.carousel-container .photo');
var list = [];
var len = carouselItems.length;
var label = $('#main-label');
var name_label = $('#name_label');
var menu_button = $('#menu_button');
var menu_container = $('.menu-container');
var nav = $('nav');

$(function () {
  function LinkedList(currentPhoto, nextPhoto) {
    this.currentPhoto = currentPhoto;
    this.nextPhoto = nextPhoto;
    this.next = null;
  }

  var last = new LinkedList(carouselItems[len - 2], carouselItems[len - 1]);
  var first = new LinkedList(carouselItems[len - 1], carouselItems[0]);
  last.next = first;

  var between = [];
  between.push(first);
  between.push(new LinkedList(carouselItems[0], carouselItems[1]));
  first.next = between[1];

  for (var i = 1; i < len - 2; i++) {
    between.push(new LinkedList(carouselItems[i], carouselItems[i + 1]));
    between[i - 1].next = between[i];
  }
  between[len - 3].next = between[len - 2];
  between.push(last);
  between[len - 2].next = between[len - 1];
  console.log(between);
  var active = first;
  NextPhoto();
  window.PhotoTimer = setInterval(function () {
    NextPhoto();
  }, 5000);
  
  function NextPhoto() {
    $(active.currentPhoto).removeClass('current');
    $(active.nextPhoto).removeClass('next');
    active = active.next;
    $(active.currentPhoto).addClass('current');
    $(active.nextPhoto).addClass('next');
    var color = $(active.currentPhoto).data('color');
    label.css('color', color);
    label.css('text-shadow', '0 0 10px ' + color);
  }

  window.ButtonInterval = setInterval(function () {
    menu_button.addClass('zoomIn');
  }, 2000);

  window.ButtonTimeout = setTimeout(function () {
    window.OriginButtonInterval = setInterval(function () {
      menu_button.removeClass('zoomIn');
    }, 2000);
  }, 350);


  menu_button.hover(function(){
    if($(window).width()>768){
      clearInterval(ButtonInterval);
      clearInterval(OriginButtonInterval);
      clearTimeout(ButtonTimeout);
      $(this).addClass('zoomIn');
    }
  }, function(){
    $(this).removeClass('zoomIn');
    ButtonInterval = setInterval(function () {
      menu_button.addClass('zoomIn');
    }, 2000);
  
    ButtonTimeout = setTimeout(function () {
      OriginButtonInterval = setInterval(function () {
        menu_button.removeClass('zoomIn');
      }, 2000);
    }, 350);
  });

  menu_button.click(function(){
    if($(window).width()<768){
      nav.toggleClass('closed');
      menu_button.toggleClass('open');
      menu_container.toggleClass('open');
    }
    else{
      nav.removeClass('closed');
      menu_button.addClass('open');
      menu_container.addClass('open');
    }
  });

  nav.hover(function(){

  }, function(){
    nav.addClass('closed');
    menu_button.removeClass('open');
    menu_container.removeClass('open');
  });

  var height = $(window).height();
  var width = $(window).width();
  var O = height / width;

  $(document).ready(function () {
    $(window).trigger('resize');
  });

  $(window).load(function () {
    SetOffsetButton();
  });


  $(window).on('resize', function () {
    height = $(this).height();
    width = $(this).width();
    O = height / width;
    SetImageSize(height, width, O);
    SetOffsetButton();
  });

  function SetImageSize(height, width, O) {
    var s = $(".carousel-container .photo img");
    s.each(function (i) {
      var h = this.naturalHeight;
      var w = this.naturalWidth;
      var o = h / w;
      if (O > o) {
        $(this).css('height', '100vh');
        $(this).css('width', 'auto');
      }
      else {
        $(this).css('width', '100vw');
        $(this).css('height', 'auto');
      }
    });
  }

  function SetOffsetButton() {
    if ($(window).width() >= 768) {
      var top = parseInt(name_label.offset().top);
      if (top > 0)
        menu_button.css('top', top + 'px');
    }
  }
});

