$('.container-slide').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});

var $photoImageLink = $('.photo-block__item-link');
var $defaultImageWidth = 375;
var $defaultImageHeight = 284;
var $resizeImageWidth = $('.photo-block__item-link img').innerWidth();

$($photoImageLink).css({
    'height' : $defaultImageHeight / ($defaultImageWidth / $resizeImageWidth)
});


var $imageHeight = $('.js-gallery__image').innerHeight();

$(window).resize(function() {
    $imageHeight = $('.js-gallery__image').innerHeight();
    $resizeImageWidth = $('.photo-block__item-link img').innerWidth();

    $('.about-block').css({
        'height': $imageHeight
    });

    $($photoImageLink).css({
        'height' : $defaultImageHeight / ($defaultImageWidth / $resizeImageWidth)
    });
});

$('.about-block').css({
    'height': $imageHeight
});

var $gallery = $('.js-gallery');
var $galleryLength = $gallery.children();
var $galleryFirst = $galleryLength[0];
var $galleryLast = $galleryLength[$galleryLength.length - 1];
$($galleryFirst).css({'opacity' : 1}).addClass('show');
setInterval(function(){
    var $item = $($gallery).children('.show');
    var $itemNext = $($item).next();
    $($item).removeClass('show').css({'opacity' : 0});
    $($itemNext).addClass('show').css({'opacity' : 1});
    if($galleryLast) {
        $($galleryFirst).css({'opacity' : 1}).addClass('show');
        $($item).removeClass('show').css({'opacity' : 0});
        $($itemNext).addClass('show').css({'opacity' : 1});
    }
}, 5000);





