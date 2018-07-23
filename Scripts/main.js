"use strict";
var label = $('#main-label');
var name_label = $('#name_label');
var menu_button = $('#menu_button');
var menu_container = $('.menu-container');
var nav = $('nav');
var body = $('body');

$(function () {
  window.ButtonInterval = setInterval(function () {
    menu_button.addClass('zoomIn');
  }, 2000);

  window.ButtonTimeout = setTimeout(function () {
    window.OriginButtonInterval = setInterval(function () {
      menu_button.removeClass('zoomIn');
    }, 2000);
  }, 350);


  menu_button.hover(function () {
    if ($(window).width() > 768) {
      clearInterval(ButtonInterval);
      clearInterval(OriginButtonInterval);
      clearTimeout(ButtonTimeout);
      $(this).addClass('zoomIn');
    }
  }, function () {
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

  menu_button.click(function () {
    if ($(window).width() < 768) {
      nav.toggleClass('closed');
      menu_button.toggleClass('open');
      menu_container.toggleClass('open');
      $('header .container-fluid').toggleClass('open');
      if($(window).height()<450 && !nav.hasClass('closed')){
        var nav_height = nav.height();
        $('header .container-fluid').css('top', 'calc(50% + '+nav_height/2+'px');
      }
      else if($(window).height()<450 && nav.hasClass('closed')){
        $('header .container-fluid').css('top', '50%');
      }
    }
    else {
      nav.removeClass('closed');
      menu_button.addClass('open');
      menu_container.addClass('open');
      $('header').addClass('open');
    }
  });

  function CloseNav() {
    nav.addClass('closed');
    menu_button.removeClass('open');
    menu_container.removeClass('open');
    $('header').removeClass('open');
  }

  nav.hover(function () {

  }, function () {
    CloseNav();
  });

  $('header').click(function(){
    CloseNav();
  });

  var height = $(window).height();
  var width = $(window).width();
  var O = height / width;

  $(document).ready(function () {
    $(window).trigger('resize');
  });

  $(window).load(function () {
    $(window).trigger('resize');
    body.removeClass('invisible');
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
      setTimeout(function(){
        menu_button.css('top', top + 'px');
      },100);
    }
  }
});

