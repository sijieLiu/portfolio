$(document).ready(function(){
	var animateDuration = 200;
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
		  var obj = this, args = arguments;
		  function delayed () {
		      if (!execAsap)
		          func.apply(obj, args);
		      timeout = null;
		  };

		  if (timeout)
		      clearTimeout(timeout);
		  else if (execAsap)
		      func.apply(obj, args);

		  timeout = setTimeout(delayed, threshold || 100);
		};
	}
	  
	$("body").mousemove(debounce(function(e){
			var x = e.pageX;
			var w = $( window ).width();
			var offset = 40 * (w -x) / w ;
		
			$("#eye-left").css("right", offset + 245);
			$("#eye-right").css("right", offset + 55);
		},
		15)
	);

	$(".navbar-nav li").hover(
		function(e){
			
			if(!$(this).hasClass("active")){					
	 			$("#eye-left-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});
				$("#eye-right-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});//	height: 45px; width: 46px;
				$("#eye-right-bow").css({opacity: 1});
				$("#eye-left-bow").css({opacity: 1, bottom: "200px"});	
			} else {
				$("#eye-right-bow").css({opacity: 1});
				$("#eye-left-bow").css({opacity: 1, bottom: "200px"});
			}
		},
		function(e){	
 			$("#eye-left-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-right-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-left-bow").css({opacity: 0, bottom: "180px"});
			$("#eye-right-bow").css({opacity: 0});
		}
	);
		
	/* content nav */
	$(".navbar-nav li:not(.active) a, .navbar-brand").click(function(){
		var id = $(this).data("id");
		$(".content").hide();	
		$(".navbar-nav li").removeClass("active");
		
		if(id){
			$("#"+id).show();
			$(this).parent().addClass("active");
			// $(".bunny").css({"transform", ""})
		}
	});
	
	
});
