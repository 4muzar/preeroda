(function( $ ){	
	var methods = {
		init : function( options ) {
 			return this.each(function(){
				
				var $this = $(this);
				var data = $this.data('preeroda_mult');
			
				if ( !data ) {
					var settings = {
						//plotsVideos			:	null //array of videoData
					}
					if ( options ) { 
						$.extend( settings, options );
					}					
					data = {
						settings 		: settings
					};
					$this.data('preeroda_mult', data);

					var FRAMES_NUMBER	= 589;
					var IMAGES_URL		= "i_data/mult/s";
					var loadedImagesArray = new Array();
					
					var currentImage = 0;
					var loadedImages = 0;
					
					var multContainer 	= $this.find(".mult-container");
					
					var multScroll 		= $this.find(".mult-scroll");
					var multSlider 		= multScroll.find(".mult-slider");
					var sliderStartPos	= 0;
					var sliderEndPos	= multScroll.outerWidth() - multSlider.outerWidth();
					console.log(sliderEndPos);
					
					//var popup = $(".popup-container");

					/*leftArrow.click(function (e) {
						if (!$(this).hasClass("hidden")) {
							if (--currentVideoIndex == 0) {
								$(this).addClass("hidden");
							}
							rightArrow.removeClass("hidden");
							previewImage.attr("src",settings.plotsVideos[currentVideoIndex].thumb_url);							
						}
					});*/
					
					function showFrame (index) {
						currentImage++;
						
						multContainer.html(loadedImagesArray[index]);
					}
					
					function setSliderPosition (index) {
						multSlider.css({left : Math.ceil(index / FRAMES_NUMBER * (sliderEndPos - sliderStartPos))});
					}
					
					function loadImage(index, completeCallBack) {
						if(index <= FRAMES_NUMBER) {
							var img = new Image();
							loadedImagesArray[index] = $(img);
							$(img).load(function () {
								loadedImages++;
								
								//var numLoadedBars = Math.ceil((loadedImages/max)*12);						
								/*loaderProgressBar.find(".kolbaska").each(function () {
									var ind = parseInt($(this).attr('id').split("_")[1]);
									if (ind <= numLoadedBars)
										$(this).addClass("loaded");
								});*/
								showFrame(index);
								setSliderPosition(index);
							}).error(function () {
								
							}).attr('src', IMAGES_URL + index + ".jpg");
						} else {
							completeCallBack();
						}
					}
					
					//init
					var imageToLoad = 0;
					setInterval(function () {
						loadImage(++imageToLoad, function () {});
					}, 150);					
				}
			});
		}
	};
 
	$.fn.preeroda_mult = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.preeroda_mult' );
		}    
	};
 })( jQuery );
 
 $(document).ready(function() {
	$(".mult-wrapper").preeroda_mult();
 });