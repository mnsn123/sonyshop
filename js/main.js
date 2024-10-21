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





jQuery(document).ready(function($) {
/* Floating Menu
	**************************************************************/

 	var $floatingMenuToggle = $('.floating-menu-toggle-wrap'),
			$floatingMenu = $('.floating-header .main-navigation'),
			$floatingMenuItem = $('.floating-header .main-navigation .menu > li');
	if($floatingMenu.length) {
		$floatingMenuItem.each(function(index, element) {
			$(element).addClass('delay-' + index);
		});

		$floatingMenuToggle.click(function() {
		  var clicks = $(this).data('clicks');
		  if (clicks) {
				$floatingMenu.removeClass('is-visible');
				setTimeout(function(){
					$floatingMenuToggle.parent().removeClass('expanded');
				}, 500);
		  } else {
				$floatingMenuToggle.parent().addClass('expanded');
				$floatingMenu.addClass('is-visible');
		  }
		  $(this).data("clicks", !clicks);
		});

	}

	// Back Button
	var backBtnText = $floatingMenu.data( 'back-btn-text' ),
			subMenu = $( '.floating-header .main-navigation .sub-menu' );

	subMenu.each( function () {
		$( this ).prepend( '<li class="back-btn"><a href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i>' + backBtnText + '</a></li>' );
	} );

	var hasChildLink = $( '.floating-header .menu-item-has-children > a' ),
		backBtn = $( '.floating-header .main-navigation .sub-menu .back-btn' );

	backBtn.on('click', function (e) {
		var self = this,
			parent = $( self ).parent(),
			siblingParent = $( self ).parent().parent().siblings().parent(),
			menu = $( self ).parents( '.menu' );

		parent.removeClass( 'in-view' );
		siblingParent.removeClass( 'off-view' );

		e.stopPropagation();
	});

	hasChildLink.on( 'click', function ( e ) {
		var self = this,
			parent = $( self ).parent().parent(),
			menu = $( self ).parents( '.menu' );

		parent.addClass( 'off-view' );
		$( self ).parent().find( '> .sub-menu' ).addClass( 'in-view' );

		e.preventDefault();
		return false;
	} );
    });
	/******************************************************************/
