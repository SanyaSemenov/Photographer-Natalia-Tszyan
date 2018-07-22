"use strict";
var carouselItems = document.querySelectorAll('.carousel-container .photo');
var list = [];
var len = carouselItems.length;

$(function(){
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
});