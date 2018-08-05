const PHOTO_HTML = '<div class="photo text-center" id="{0}"></div>';
let photo_sources = [];
let gallery_container;
let photo_view = $('#photo_view');
let control_close = $('.control-close');
let control_left = $('.control-left');
let control_right = $('.control-right');
let number_place = $('#photo_number');
let gallery_section = $('.gallery-section');

class Photo {
  constructor() {
    this.NextPhoto = null;
    this.PreviousPhoto = null;
  }
}

class PhtotStruct {
  constructor() {
    this.image = new Image();
    this.element = null;
    this.counter = 0;
  }

  SetElement(flag, class_name) {
    if (flag)
      this.element.addClass(class_name);
    else if (flag === false)
      this.element.removeClass(class_name);
  }
}

class PhotoCollection {
  constructor() {
    this.AllPhotos = [];
    this.Active = null;
    this.Next = null;
    this.Previous = null;
  }

  OpenActive(number) {
    if (this.AllPhotos) {
      photo_view.removeClass('invisible');
      this.SetActive(false);
      this.SetPrevious(false);
      this.SetNext(false);

      this.Active = this.AllPhotos.find(x => x.counter === number);
      var prev = this.AllPhotos.find(x => x.counter === number - 1);
      var next = this.AllPhotos.find(x => x.counter === number + 1);
      this.Active.SetElement(false, 'previous');
      this.Active.SetElement(true, 'current');
      if (prev) {
        this.Previous = prev;
        this.Previous.SetElement(true, 'previous');
      }
      if (next) {
        this.Next = next;
        this.Next.SetElement(true, 'next');
      }
      number_place.text(this.Active.counter);
    }
  }

  GetByCounter(num) {
    if (this.AllPhotos) {
      var elem = this.AllPhotos.find(x => x.counter === num);
    }
  }

  SetActive(flag) {
    if (this.Active) {
      this.Active.SetElement(flag, 'current');
    }
  }

  SetPrevious(flag) {
    if (this.Previous) {
      this.Previous.SetElement(flag, 'previous');
    }
  }

  SetNext(flag) {
    if (this.Next) {
      this.Next.SetElement(flag, 'next');
    }
  }

  SwitchNext() {
    if (this.AllPhotos) {
      this.SetActive(false);
      this.SetPrevious(false);
      this.SetNext(false);

      this.Active = this.Next;
      var active_index = this.AllPhotos.indexOf(this.Active);
      if (active_index < this.AllPhotos.length - 1)
        this.Next = this.AllPhotos[active_index + 1];
      this.Previous = this.AllPhotos[active_index - 1];

      this.SetActive(true);
      this.SetPrevious(true);
      this.SetNext(true);
    }
  }

  Close() {
    if (this.AllPhotos) {
      photo_view.addClass('invisible');
      // photo_view.addClass('temp');
      // setTimeout(function(){
      //   photo_view.removeClass('temp');
      // }, 300);
      this.SetActive(false);
      this.SetPrevious(false);
      this.SetNext(false);

      $('html').dblclick();
      // gallery_section.trigger('click');
    }
  }
}

String.prototype.format = String.prototype.f = function () {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function (m, n) {
    return args[n] ? args[n] : m;
  });
};

$(function () {
  "use strict";
  let collection;
  function Init() {
    collection = new PhotoCollection();

    var min_photos = $('.img-container');
    min_photos.each(function () {
      var source = $(this).attr('data-src');
      photo_sources.push(source);
    });
    min_photos.click(function () {
      var target = $(this).attr('data-counter');
      collection.OpenActive(parseInt(target) + 1);
    });

    control_close.click(function(){
      collection.Close();
    })
    preload(photo_sources);
  }

  function preload(imageArray, index) {
    index = index || 0;
    if (imageArray && imageArray.length > index) {
      var img = new Image();
      var image = new PhtotStruct();
      img.onload = function () {
        gallery_container.append(PHOTO_HTML.f('gallery_photo' + index));
        collection.AllPhotos[index].element = $('#gallery_photo' + index);
        collection.AllPhotos[index].element.append(img);
        preload(imageArray, index + 1);
      }
      img.src = photo_sources[index];
      img.classList = 'img-photo';
      image.image = img;
      image.counter = index + 1;
      collection.AllPhotos.push(image);
    }
  }

  $(window).on('load', function () {
    if ($(window).width() >= 768) {
      gallery_container = $('.photo-container');
      Init();
    }
    else {
      photo_view.remove();
    }
    console.log(collection);
  })
});