$('.container-slide').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});
$(window).resize(function() {
    var $imageHeight = $('.js-gallery__image').innerHeight();

    $('.about-block').css({
        'height': $imageHeight
    });
});
var $imageHeight = $('.js-gallery__image').innerHeight();

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


