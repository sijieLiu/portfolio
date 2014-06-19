$(document).ready(function(){
	
	var t = $( window ).height() - 70; 
	$(".bunny").css(
		{
			"height": t
		}
	);
	
	var animateDuration = 500;
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

	var showBunnyAtBottom = function(){
		$(".bunny").css(
			{
				"transform": "translateY(0px)",
				"height": 330,
			}
		);	
	}
	
	var hideBunny = function(){
		$(".bunny").css(
			{
				"transform": "translateY(330px)",
				"height": 330,
			}
		);	
	}
	
	var showBunnyOnTop = function(){
		var t = $( window ).height() - 70; 
		$(".bunny").css(
			{
				"transform": "translateY(0px)",
				"height": t,
				"width": "100%",
				"left": 0
			}
		);	
	}
	
	var isContentShown = function(){
		return $(".navbar-nav li").hasClass("active");
	}
	
	$(".navbar-nav li").hover(
		function(e){	
			// if(isContentShown()){		
// 				showBunnyAtBottom();
// 			}
			
			if(!$(this).hasClass("active")){					
	 			$("#eye-left-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});
				$("#eye-right-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});
			}
			
			$("#eye-left-bow").css({opacity: 1, top: "90px"});		
			$("#eye-right-bow").css({opacity: 1});
		},
		function(e){	
 			$("#eye-left-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-right-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-left-bow").css({top: "111px", opacity: 0});
			$("#eye-right-bow").css({opacity: 0});
			// if(isContentShown()){
			// 	hideBunny();
			// }
		}
	);
		
	/* content nav */
	$(".navbar-nav li, .navbar-brand").click(function(){
		if(!$(this).hasClass("active")) {
			var id = $(this).find("a").data("id");
			var isAnyContentShown = isContentShown();
			if(isAnyContentShown){		
				$(".content").hide();	
				$(".navbar-nav li").removeClass("active");
				showBunnyOnTop();
			}
			
			if(id){
				if(isAnyContentShown){
					$("#"+id).fadeIn(animateDuration, function() {
	    				// Animation complete
						hideBunny();
	  				});
				} else {
					$("#"+id).fadeIn(animateDuration);
					hideBunny();
				}
				$(this).addClass("active");
			}else{
				showBunnyOnTop();
			}
		}
	});
	
});
