"use strict";
var body = $('body');
var wholeHeight = [];
var firtHeights = [];
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
    // changeDirection();
    StableLast();
    body.removeClass('invisible');
    SetControlsOffset();
  });

  function changeDirection() {
    var photos = $('.img-column-first .img-container');
    var firstColumn = $('.img-column-first');
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
    var firstColumnHeight = $('.img-column-first').height();
    wholeHeight.push(firstColumnHeight);
  }

  function GetLastHeight() {
    firtHeights = [];
    withoutLast = [];
    $('.img-column').each(function (item) {
      var last = $(this).find('.img-container:last-child').height();
      firtHeights.push(last);
    });
    var firstImageHeight = $('.img-column-first .img-container:last-child').height();
    firtHeights.push(firstImageHeight);
    for (var i = 0; i < wholeHeight.length; i++) {
      withoutLast.push(wholeHeight[i] - firtHeights[i]);
    }
  }

  function StableAll() {
    Stable();
    GetLastHeight();
    var length = wholeHeight.length;
    var max = withoutLast.filter((x, index) => index < length - 1).max();
    var min = wholeHeight.filter((x, index) => index < length - 1).min();
    var leftPhotos = $('.img-column-first .img-container');
    if (leftPhotos.length != 0) {
      var min = wholeHeight.filter((x, index) => index < length - 1).min();
      var ToIndex = wholeHeight.indexOf(min);

      var element, target;

      // element = $('.img-column:nth-child(' + (index + 1) + ') .img-container').first();
      element = $('.img-column-first .img-container').last();
      console.log($('.img-column'));
      target = $('.img-column')[ToIndex];
      element.appendTo(target);
      // if (previousMax != max) {
      //   previousMax = max;
      count++;
      if (count < maximum)
        StableAll();
      // }
    }
    // if (max > min) {
    //   var index = withoutLast.indexOf(max);
    //   var ToIndex = wholeHeight.indexOf(min);
    //   var element, target;

    //   element = $('.img-column:nth-child(' + (index + 1) + ') .img-container').first();
    //   target = $('.img-column:nth-child(' + (ToIndex + 1) + ')');
    //   element.appendTo(target);
    //   if (previousMax != max) {
    //     previousMax = max;
    //     count++;
    //     if (count < maximum)
    //       StableAll();
    //   }
    // }
  }

  function StableLast() {
    var withoutPrelast = $('.img-column').map(function(){
      var imgs = $(this).find('.img-container');
      var preLastHeight = 0;
      if (imgs.length > 1) {
        var elem = imgs[imgs.length - 2];
        preLastHeight = $(elem).height();
        var height = $(this).height();
        return height - preLastHeight;
      }
      else {
        return null;
      }
    });
    if(withoutPrelast.toArray().some(x => x==null)){
      return;
    }
    var whole = $('.img-column').map(function(){
      return $(this).height();
    });
    var max = withoutPrelast.toArray().max();
    var min = whole.toArray().min();
    if(max > min){
      var index = withoutPrelast.toArray().indexOf(max);
      var ToIndex = whole.toArray().indexOf(min);
      var element, target;

      var neededColumn = $($('.img-column')[index]).find('.img-container');
      element = neededColumn[neededColumn.length - 2];
      target = $('.img-column')[ToIndex];
      var targetLast = $(target).find('.img-container').last();
      var saved = targetLast.clone(true);
      targetLast.remove();
      target.append(element);
      saved.appendTo(target);
      StableLast();
    }
  }

  function SetColumns() {
    maximum = allPhotos.length;
    container = $('.result');
    if (windowWidth < 768) {
      $('#photo_view').remove();
      changeDirection();
    }
    if (windowWidth >= 768 && windowWidth < 992) {
      for (let i = 0; i < 2; i++) {
        container.append(columnString);
      }
      // container.append(columnString);
    }
    else if (windowWidth >= 992 && windowWidth < 1921) {
      for (let i = 0; i < 4; i++) {
        container.append(columnString);
      }
    }
    else if (windowWidth > 1921) {
      for (let i = 0; i < 5; i++) {
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
    // container.append(columnString);
    // allPhotos.forEach(element => {
    //   container.find('.img-column').add(element);
    // });
    var firstColumn = container.find('.img-column-first');
    $.each(allPhotos, function (index, value) {
      firstColumn.append(value);
    });
    windowWidth = $(window).height();
    firstStart = false;
    $(window).trigger('load');
    // open(location, '_self').close();
  }, false);
});