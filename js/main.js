
(function($) {

	function throttle(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function() {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};
	function debounce( func , timeout ) {
	   var timeoutID , timeout = timeout || 200;
	   return function () {
	      var scope = this , args = arguments;
	      clearTimeout( timeoutID );
	      timeoutID = setTimeout( function () {
	          func.apply( scope , Array.prototype.slice.call( args ) );
	      } , timeout );
	   }
	}

	function empty(value){
		return (value === undefined || value === null || value === '');
	}

	function isInt(value) {
	  if (isNaN(value)) {
	    return false;
	  }
	  var x = parseFloat(value);
	  return (x | 0) === x;
	}

	var docSize, docWidth, docHeight, scrollPos, html_el, body, page, main,
		header, header_height, admin_bar, admin_bar_height, first_page_section;


	$(document).ready(function() {

		html_el = $('html');
		body = $('body');
		page = $('#page');
		main = $('#main');
		header = $('#header');
		first_page_section = $('section.page-section:first-child');

		$.sbtheme.initViewportSize();
		$.sbtheme.initScrollPos();
		// $.sbtheme.initHeader();
		$.sbtheme.initMobileMenu();
		$.sbtheme.initModals();
		$.sbtheme.initResume();

	});


	$.sbtheme = (function(sbtheme) {

		sbtheme.initMobileMenu = function() {

			$('.mobile-menu-toggle').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				body.toggleClass('mobile-menu-active');
			}).on('vmousedown', function(e) {
				e.stopPropagation();
			});
			$(document).on('vmousedown', 'body.mobile-menu-active .site-wrap', function() {
				$('body').removeClass('mobile-menu-active');
			});

		};

		sbtheme.initModals = function(){

			$(document).on('click', '.close-modal', function(e){
				e.preventDefault();

				$(this).closest('.modal').removeClass('active');
				body.removeClass(['modal-active', 'resume-modal-active']);
			});

			$('.modal').on('click', function(e){
				if ($(e.target).closest('.modal-content').length === 0){
					$('.modal.active').removeClass('active');
					body.removeClass(['modal-active', 'resume-modal-active']);
				}
			});

			// Project modal
			$('.project-modal-link').on('click', function(e){
				e.preventDefault();

				var modal = $('.modal.project-modal');

				var html = $(this).closest('.project').find('.modal-content').html();

				modal.addClass('active').find('.content > .inner').html(html);
				body.addClass('modal-active');
			});

			// View Resume Modal
			$('.view-resume a').on('click', function(e){
				e.preventDefault();

				var modal = $('.modal.resume-modal');
				modal.addClass('active');

				body.removeClass('modal-active');
				body.addClass('resume-modal-active');
			});

		};

		sbtheme.initResume = function(){
			$('.resume .tab-link').on('click', function(e){
				e.preventDefault();

				if (!$(this).parent().hasClass('active')){
					var index = $(this).attr('data-index');

					$('.resume .tab').removeClass('active');
					$(this).parent().addClass('active');

					$('.resume .panel').removeClass('active');
					$('.resume .panel-' + index).addClass('active');
				}
			});
		};

		sbtheme.smoothScrollToElement = function(element, speed, offset) {
			speed = typeof speed !== 'undefined' ? speed : 1000;
			offset = typeof offset !== 'undefined' ? offset : 0;
			if(element.length > 0) {
				var margin = parseInt(element.css('margin-top'));
				sbtheme.smoothScrollToPos(element.offset().top - (margin > 0 ? margin : 0), speed, offset);
			}
		};
		sbtheme.smoothScrollToPos = function(y, speed, offset) {
			speed = typeof speed !== 'undefined' ? speed : 1000;
			offset = typeof offset !== 'undefined' ? offset : 0;
			var fixedHeaderOffset = 0;
			$('html, body').stop(true).animate({ scrollTop: y - fixedHeaderOffset + offset }, speed, 'easeInOutExpo');
		};

		sbtheme.initScrollPos = function(){
			$.sbtheme.updateScrollPos();
			$(window).scroll(function(){ $.sbtheme.updateScrollPos(); });
			$(window).resize(function(){ $.sbtheme.updateScrollPos(); });
		};
		sbtheme.updateScrollPos = function(){
			scrollPos = $(document).scrollTop();
		};

		sbtheme.initViewportSize = function(){
			$.sbtheme.updateViewportSize();
			$(window).resize(function(){ $.sbtheme.updateViewportSize(); });
		};
		sbtheme.updateViewportSize = function(){
			function viewportSize() {
				var e = window, a = 'inner';
				if (!('innerWidth' in window )) {
					a = 'client';
					e = document.documentElement || document.body;
				}
				return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
			}
			docSize = viewportSize();
			docWidth = docSize.width;
			docHeight = docSize.height;
		};


		return sbtheme;

	})({});

})(jQuery);