"use strict";
var carouselItems = document.querySelectorAll('.carousel-container .photo');
var list = [];
var len = carouselItems.length;
var label = $('#main-label');

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

  var height = $(window).height();
  var width = $(window).width();
  var O = height / width;

  $(document).ready(function () {
    $(window).trigger('resize');
  });

  $(window).on('resize', function () {
    height = $(this).height();
    width = $(this).width();
    O = height / width;
    SetImageSize(height, width, O);
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
});

