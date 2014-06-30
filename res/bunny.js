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
			}
		);	
	}
	
	var isContentShown = function(){
		return $(".navbar-nav li").hasClass("active");
	}
	
	$("a, #typewriter").on("mouseover", function () {
			if(!$(this).hasClass("active")){					
	 			$("#eye-left-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});
				$("#eye-right-shine").css({opacity: 1, "transform": "scale(0.8,0.8)"});
			}
			
			$("#eye-left-bow").css({opacity: 0, top: "50px"});		
			$("#eye-right-bow").css({opacity: 0});
	    }).on("mouseout", function () {
 			$("#eye-left-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-right-shine").css({"transform": "scale(0.2,0.2)", opacity: 0});
			$("#eye-left-bow").css({top: "70px", opacity: 0});
			$("#eye-right-bow").css({opacity: 0});
	    });
	
	$("#face").click(function(){
		$("#head-hit").fadeIn(10, function(){
			$(this).fadeOut(250);
		});
		
	});
	/* content nav */
	$(".navbar-nav li, .navbar-brand").click(function(){		
		if(!$(this).hasClass("active")) {
			var id = $(this).find("a").data("id");
			var isAnyContentShown = isContentShown();
			if(isAnyContentShown){ // switch tabs		
				var $activeContent = $("#" + $(".navbar-nav li.active a").data("id"));
				$activeContent.fadeOut(animateDuration, function(){
					if(id){
						$("#"+id).fadeIn(animateDuration);
						hideBunny();
						$(this).addClass("active");
					}
				});
				//showBunnyOnTop();
				$(".navbar-nav li").removeClass("active");
			}
		
			if(id){	
				if(!isAnyContentShown) {
					$("#"+id).fadeIn(animateDuration);
					hideBunny();
				}
				$(this).addClass("active");
			}else{
				showBunnyOnTop();
			}
			
			$(".navbar-collapse").collapse('hide');
		}
	});
	
	$(window).resize(function(){
		if(!isContentShown()) {
			var t = $( window ).height() - 70; 
			$(".bunny").css(
				{
					"height": t
				}
			);
		}
	})
	
	/*type writter*/
	
	var inputs = [
					// "<p>Hey, I'm a tiny little block. <br/> I'll be watching you. </p>",
					"<p>Hey, you are here! Wanna talk?<br>Email me at <a href='mailto:liusij87@gmail.com'>liusij87@gmail.com</a>.<p>",
					"<p>Ok.. Who I am?<br>I'm Sijie Liu, a UX designer.</p>",
					"<p>Wanna check out my work?<br>Click <a target='_blank' href='https://www.behance.net/sijieliu'>here</a>.</p>",
					"<p>Wanna learn more about my experiences?<br>Check out my <a target='_blank' href='https://www.linkedin.com/profile/view?id=70408701'>LinkedIn</a>.</p>"
				 ],
	    inputsIndex = 0,
		i = 0,
	    isTag,
	    text;

	var type = function() {
	    text = inputs[inputsIndex].slice(0, ++i);
	    if (text === inputs[inputsIndex]) {
			if($("#typewriter").is(":hover")){ // if hovering take another 6000 ms
				setTimeout(type, 2000);
				return;
			}
			inputsIndex++;
			i = 0;
			if(inputsIndex == inputs.length){ // loop
				inputsIndex = 0;
			}
	    	setTimeout(type, 6000);
			return;
	    }
    
	    document.getElementById('typewriter').innerHTML = text;

	    var char = text.slice(-1);
	    if( char === '<' ) isTag = true;
	    if( char === '>' ) isTag = false;

	    if (isTag) return type();
	    setTimeout(type, 80);
	};
	
	type();
});
