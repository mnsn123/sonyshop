$(document).ready(function() {
$('.car-content .owl-carousel').owlCarousel({
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    stagePadding: 18,
    loop: true,
    dots: false,
    margin: 8,
    nav: false,
responsive:{
        0:{
            items: 1
        },
        600:{
            items: 1
        },
        1024:{
            items: 2
        },
        1366:{
            items: 3
        }
    }


});

});
