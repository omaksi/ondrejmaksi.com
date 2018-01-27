
$(window).load(function(){

	



	var first = $('#first');
	var second = $('#second');

	var margin = 0;


	$(window).on("resize",function(){
		console.log('orientationchange');
		draw();
	});

	function draw(){

		var viewportWidth = $(window).width() - margin;
		var viewportHeight = $(window).height() - margin;

		first.html("OM");

		var singleWidth = first.width();
		var singleHeight = first.height();

		var horizontalCount = Math.floor(viewportWidth/singleWidth) + 1;
		var verticalCount = Math.floor(viewportHeight/singleHeight) + 1;

		var textToAdd = "";
		for (var i = 0; i < verticalCount; i++) {
			for (var j = 0; j < horizontalCount; j++) {
				textToAdd += "OM"
			};
			textToAdd += "<br />";
		};

		first.html(textToAdd);

		second.html(textToAdd);

		second.css('transform', 'rotate(1deg)');
	};

	draw();
	
	window.setTimeout(function(){
		second.css('transform', 'rotate(0deg)');
		window.setTimeout(function(){
			randomRotate();
		}, 11000);
	}, 11000);

	function randomRotate(){
		console.log('rotating!');
		var randomN = (Math.random())
		window.setTimeout(function(){
			second.css('transform', 'rotate('+randomN+'deg)');
		}, randomN*1000);
		window.setTimeout(randomRotate, 11000);
	}
	
});