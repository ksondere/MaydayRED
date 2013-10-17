var postCount = youTubeVideos.length;
var postsWidth = 0, postsHeight = 0, postsRatio = 0,
	featuredImageWidth = 0, featuredImageHeight = 0, featuredImageRatio = 0,
	indicatorThumbWidth = 100, indicatorThumbHeight = 70, indicatorThumbRatio = indicatorThumbWidth / indicatorThumbHeight;

function handleResize() {
	postsWidth = $('#posts').width();
	postsHeight = $('#posts').height();
	postsRatio = postsWidth / postsHeight;

	$('#posts .post .featured-image').each(function(i, e) {
		featuredImageWidth = $(this).attr('width');
		featuredImageHeight = $(this).attr('height');
		featuredImageRatio = featuredImageWidth / featuredImageHeight;
		if(featuredImageRatio > postsRatio) {
			$(this).css({
				height: '100%',
				width: 'auto',
				top: '0px',
				left: (featuredImageRatio * postsHeight - postsWidth) / -2 + 'px'
			})
		}else {
			$(this).css({
				height: 'auto',
				width: '100%',
				top: (1 / (featuredImageRatio / postsWidth) - postsHeight) / -2 + 'px',
				left: '0px'
			})
		}
	});

	$('#posts .post.has-video .video iframe').each(function(i, e) {
		$(e).css({
			width: postsWidth + 'px',
			height: postsHeight + 'px'
		}).width(postsWidth).height(postsHeight);
	});

	$('#indicators .indicator.thumb').each(function(i, e) {
		featuredImageWidth = $('img', this).attr('width');
		featuredImageHeight = $('img', this).attr('height');
		featuredImageRatio = featuredImageWidth / featuredImageHeight;
		if(featuredImageRatio > indicatorThumbRatio) {
			$('img', this).css({
				height: '100%',
				width: 'auto',
				top: '0px',
				left: (featuredImageRatio * indicatorThumbHeight - indicatorThumbWidth) / -2 + 'px'
			})
		}else {
			$('img', this).css({
				height: 'auto',
				width: '100%',
				top: (1 / (featuredImageRatio / indicatorThumbWidth) - indicatorThumbHeight) / -2 + 'px',
				left: '0px'
			})
		}
	});
}

$(window).resize(handleResize);
handleResize();

$('#posts .content .expand, #posts .content .close').click(function() {
	$(this).parent().parent().toggleClass('open');
	return false;
});
$('#posts .content .title').click(function() {
	if(!$(this).parent().parent().parent().hasClass('no-body'))
		$(this).parent().parent().parent().toggleClass('open');
	return false;
});

var currentPostIndex = 0, newPostIndex = 0;
$('#left-arrow, #right-arrow').click(function() {
	newPostIndex = currentPostIndex;
	if($(this).hasClass('left')) {
		if(--newPostIndex < 0)
			newPostIndex = postCount - 1;
		$('#post-' + newPostIndex)
			.css('left', '-100%')
			.animate({
				left: '0%'
			}, 800);
		$('#post-' + currentPostIndex).animate({
			left: '100%'
		}, 800);


	}else if($(this).hasClass('right')) {
		if(++newPostIndex >= postCount)
			newPostIndex = 0;
		$('#post-' + newPostIndex)
			.css('left', '100%')
			.animate({
				left: '0%'
			}, 800);
		$('#post-' + currentPostIndex).animate({
			left: '-100%'
		}, 800);
	}
	currentPostIndex = newPostIndex;
	$('#indicators .indicator.active').removeClass('active');
	$('#indicator-' + currentPostIndex).addClass('active');

	return false;
});

$('#indicators .indicator').click(function() {
	if(!$(this).hasClass('active')) {
		newPostIndex = $(this).attr('id').substring(10);
		if(newPostIndex < currentPostIndex) {
			$('#post-' + newPostIndex)
				.css('left', '-100%')
				.animate({
					left: '0%'
				}, 800);
			$('#post-' + currentPostIndex).animate({
				left: '100%'
			}, 800);
		}else {
			$('#post-' + newPostIndex)
				.css('left', '100%')
				.animate({
					left: '0%'
				}, 800);
			$('#post-' + currentPostIndex).animate({
				left: '-100%'
			}, 800);
		}
		currentPostIndex = newPostIndex;
		$('#indicators .indicator.active').removeClass('active');
		$('#indicator-' + currentPostIndex).addClass('active');
	}
	return false;
});

var ytTag = document.createElement('script');
ytTag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(ytTag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	$.each(youtubeVideos, function(i, e) {
		e.player = new YT.Player('youtube_' + e.id, {
  			height: postsHeight,
  			width: postsWidth,
  			videoId: e.id,
  			playerVars: {
  				rel: 0,
  				showinfo: 0,
  				wmode: 'transparent'
  			},
  			events: {
	    		'onReady': onPlayerReady
  			}
		});
	});
}

function onPlayerReady(e) {
	$('#playbutton_' + e.target.a.id)
		.click(function() {
			if($(window).width() > 600 || $(window).height() > 600) {
				e.target.playVideo();
				$(this).fadeOut(300).siblings('.featured-image, .content').fadeOut(300);
				$('#indicators').fadeOut(300);
				$(this).siblings('.close-button').fadeIn(300);
				$('#left-arrow, #right-arrow').fadeOut(300);
				return false;
			}
		})
		.fadeIn(300);
	$('#closebutton_' + e.target.a.id).click(function() {
		e.target.pauseVideo();
		$(this).fadeOut(300).siblings('.featured-image, .content').fadeIn(300);
		$('#indicators').fadeIn(300);
		$(this).siblings('.play-button').fadeIn(300);
		$('#left-arrow, #right-arrow').fadeIn(300);
		return false;
	});
}
