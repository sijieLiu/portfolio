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
			var y = e.pageY;
			var w = $( window ).width();
			var h = $( window ).height();
			var offset = 40 * (w/2 -x) / w ;
			var offsetY = 40 * (h/2 - y) / h;
		
			$("#eye-left").css("right", offset + 265);
			$("#eye-right").css("right", offset + 75);
			
			// $("#face").css("left", offset/5);
			// $("#face").css("top", offsetY/5);
			
			$("#fullscreen_bg").css("background-position-y",   50-offsetY/2 + "%");
			$("#fullscreen_bg").css("background-position-x",  50-offset/2 + "%");
			

			$(".sjbody").css("bottom",  offsetY/2  - 20);			
			$(".sjbody").css("margin-left", -567 - offset/2 + 20);
			
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
	
	$("a, #typewriter, #bg_title").on("mouseover", function () {
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
	
	$(".sjbody").click(function(){
		$("#head-hit").fadeIn(10, function(){
			$(this).fadeOut(250,function(){
				if(!$(".sjbody").hasClass("down")){
				$(".sjbody").height("380px");	
				$(".sjbody").addClass("down");
				}else{
				$(".sjbody").height("780px");	
				$(".sjbody").removeClass("down");
				}
			});
			
			
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
					"<p>Hi there! <br>My name is Sijie Liu.</p>",
					"<p>I design and develop digital products.</p>",
					"<p>I love solving problems and creating delightful and inspirational experiences.</p>",
					"<p>Wanna check out <br>my portfolio?<br/>Here you <a target='_blank' href='https://www.behance.net/sijieliu'>go</a>!</p>",
					"<p>Thoughts? Questions? Ideas? <span style='text-decoration:line-through'>Spam?</span> <br/>Please email me at <br/><a href='mailto:liusij87@gmail.com'>liusij87@gmail.com</a>.</p>",
					"<p>Let's stay connected! <br/>Here is my <a target='_blank' href='https://www.linkedin.com/profile/view?id=70408701'>LinkedIn</a>.</p>"					
				 ],
	    inputsIndex = 0,
		i = 0,
	    isTag,
	    text,
		timeOut;
		
		

	var type = function() {
		
		if($("#typewriter").is(":hover")){ // if hovering take another 500 ms
			setTimeout(type, 500);
			return;
		}	
		
		timeOut = null;
		
	    text = inputs[inputsIndex].slice(0, ++i);
	    if (text === inputs[inputsIndex]) {
			inputsIndex++;
			i = 0;
			if(inputsIndex == inputs.length){ // loop
				inputsIndex = 0;
			}
	    	timeOut = setTimeout(type, 2500);
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
	
	$("#typewriter").hover(function() {
		debugger;
		$("#nose").css("background-size", "40px 80px");
		$("#nose").css("top", "110px");
	}, function(){
		$("#nose").css("background-size", "40px");
		$("#nose").css("top", "130px");
	});
	
	//background
	
	var backgroundURLs = [
		'https://m1.behance.net/rendition/modules/88148653/hd/233d7f68836829526247a7a296b079e6.JPG', //mor wool
		'https://m1.behance.net/rendition/modules/122446477/disp/6bc40dac15c8f8649199e5f68d7b4584.jpeg', //endlessforms
		'https://m1.behance.net/rendition/modules/124992195/hd/63949c289cdffbff9fd7affe9181a1d0.png', //ebay likes
		'https://m1.behance.net/rendition/modules/84694977/hd/b86b2d0758a5351ccb1d97c6abfead12.png' //language game
	
		],
		backgroundURLIndex = 0;
	
	var titles = [
		"<a target='_blank' href='https://www.behance.net/gallery/12277729/Moments-of-reflection'><b>Moments Of Reflection</b> | Game Art</a>", //mor wool
		"<a target='_blank' href='https://www.behance.net/gallery/14047469/Endlessforms-Evolving-3D-Objects-Web-Developement'><b>Endlessforms</b> | Interactive Evolving Design 3D</a>", //mor wool
		"<a target='_blank' href='https://www.behance.net/gallery/17564423/eBay-Street-Product-Design'><b>eBay Street</b> | UX Design</a>", //mor wool
		"<a target='_blank' href='https://www.behance.net/gallery/11755607/Language-Game-Poster-Design'><b>Language Game</b> | Graphic Design</a>", //mor wool
		];
	
	var backgroundLoop = function(){ 
	    setTimeout(function(){
			if(backgroundURLIndex == backgroundURLs.length){
				backgroundURLIndex = 0;
			}
			$("#bg_title").html(titles[backgroundURLIndex]);
			$("#fullscreen_bg").css("background-image", "url("+backgroundURLs[backgroundURLIndex]+")");
			backgroundURLIndex++;
			
			backgroundLoop();
		}, 10000);
	}
	
	$("#bg_title").html(titles[backgroundURLs.length-1]);
	
	$("#fullscreen_bg").css("background-image", "url("+backgroundURLs[backgroundURLs.length-1]+")");

	backgroundLoop();
	
	
});
