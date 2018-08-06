"use strict";
var body = $('body');
var wholeHeight = [];
var lastHeights = [];
var withoutLast = [];
var previousMax = -1;
var current, next, previous;
var allPhotos = [];
var count = 0;
var maximum = 0;
var container;
const columnString = '<div class="col-md-12 img-column"></div>';
var windowWidth = 0;
var firstStart = true;

$(function () {
  // $("html").easeScroll({
  //   frameRate: 60,
  //   animationTime: 1200,
  //   stepSize: 120,
  //   pulseAlgorithm: 1,
  //   pulseScale: 8,
  //   pulseNormalize: 1,
  //   accelerationDelta: 20,
  //   accelerationMax: 1,
  //   keyboardSupport: true,
  //   arrowScroll: 50,
  //   touchpadSupport: true,
  //   fixedBackground: true
  // });

  $('.navbar-nav li a, .brand').click(function (e) {
    e.preventDefault();
    var target = "/" + $(this).attr('href');
    body.addClass('invisible');
    setTimeout(function () {
      window.location.href = target;
    }, 500);
  });


  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  $(document).ready(function () {
    console.log($(window).width());
  });

  $(window).load(function () {
    if (firstStart) {
      windowWidth = $(window).width();
      allPhotos = $('.img-container');
    }
    count = 0;
    SetColumns();
    changeDirection();
    body.removeClass('invisible');
    SetControlsOffset();
  });

  function changeDirection() {
    var photos = $('.img-column:nth-child(1) .img-container');
    var firstColumn = $('.img-column:nth-child(1)');
    $(photos.get().reverse()).each(function () {
      $(this).appendTo(firstColumn);
    });
  }

  function Stable() {
    wholeHeight = [];
    $('.img-column').each(function (item) {
      var height = $(this).height();
      wholeHeight.push(height);
    });
  }

  function GetLastHeight() {
    lastHeights = [];
    withoutLast = [];
    $('.img-column').each(function (item) {
      var last = $(this).find('.img-container:last-child').height();
      lastHeights.push(last);
    });
    for (var i = 0; i < wholeHeight.length; i++) {
      withoutLast.push(wholeHeight[i] - lastHeights[i]);
    }
  }

  function StableAll() {
    Stable();
    GetLastHeight();
    var length = wholeHeight.length;
    var max = withoutLast.max();
    var min = wholeHeight.min();
    if (max > min) {
      var index = withoutLast.indexOf(max);
      var ToIndex = wholeHeight.indexOf(min);
      var element = $('.img-column:nth-child(' + (index + 1) + ') .img-container').last();
      var target = $('.img-column:nth-child(' + (ToIndex + 1) + ')');
      element.appendTo(target);
      if (previousMax != max) {
        previousMax = max;
        count++;
        if (count < maximum)
          StableAll();
      }
    }
  }

  function SetColumns() {
    maximum = allPhotos.length;
    container = $('.result');
    if (windowWidth < 768) {
      $('#photo_view').remove();
    }
    if (windowWidth >= 600 && windowWidth < 992) {
      container.append(columnString);
    }
    else if (windowWidth >= 992 && windowWidth < 1921) {
      for (let i = 0; i < 3; i++) {
        container.append(columnString);
      }
    }
    else if (windowWidth > 1921) {
      for (let i = 0; i < 4; i++) {
        container.append(columnString);
      }
    }
    StableAll();
  }

  function SetControlsOffset() {
    var currentPhoto = $('.photo.current img');
    var width = currentPhoto.width();
    $('.controls').css('width', width + 'px');
  }

  window.addEventListener("orientationchange", function () {
    $('.img-column').remove();
    container.append(columnString);
    // allPhotos.forEach(element => {
    //   container.find('.img-column').add(element);
    // });
    var firstColumn = container.find('.img-column');
    $.each(allPhotos, function (index, value) {
      firstColumn.append(value);
    });
    windowWidth = $(window).height();
    firstStart = false;
    $(window).trigger('load');
    // open(location, '_self').close();
  }, false);
});