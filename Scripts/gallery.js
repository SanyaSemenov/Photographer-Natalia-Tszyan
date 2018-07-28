"use strict";
var body = $('body');
var wholeHeight = [];
var lastHeights = [];
var withoutLast = [];
var previousMax = -1;

$(function () {
  $("html").easeScroll({
    frameRate: 60,
    animationTime: 1200,
    stepSize: 120,
    pulseAlgorithm: 1,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true
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
    StableAll();
    changeDirection();
    body.removeClass('invisible');
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
        StableAll();
      }
    }
  }
});