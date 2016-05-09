jQuery(document).ready(function ($) {
	var CONFIG = getParameterByName("CONFIG") || null;

	if (!!CONFIG) {
		$.getJSON(CONFIG).done(function (data) {
			console.log(data);
			if (!!data && data.pages && data.pages.length > 0) {
				var pages = data.pages;
				$(".cd-tabs-navigation, .cd-tabs-content").empty();
				$.each(pages, function (i, page) {
				    var url = page.embed + "";
				    if ("params" in page) {
				        url += "?" + $.param(page.params);
				    }
					var $tab = $("<a/>");
					$tab.attr("data-content", page.id);
					$tab.attr("href", "#0");
					$tab.text(page.title);
					var $content = $("<li/>");
					$content.attr("data-content", page.id);
					$content.append($("<iframe/>")
						.attr("src", url));
					$(".cd-tabs-navigation").append($tab.appendTo("<li/>"));

					
					$(".cd-tabs-content").append($content);
					// <li><a data-content="inbox" class="selected" href="#0">Inbox</a></li>
				});
			}
			init($);
			$("ul.cd-tabs-navigation a:first").trigger("click");
		});
	}
});
var init = function($) {
	var tabs = $('.cd-tabs');
	
	tabs.each(function(){
		var tab = $(this),
			tabItems = tab.find('ul.cd-tabs-navigation'),
			tabContentWrapper = tab.children('ul.cd-tabs-content'),
			tabNavigation = tab.find('nav');

		tabItems.on('click', 'a', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if( !selectedItem.hasClass('selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				
				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');
				//animate tabContentWrapper height when content changes 
				/*tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);*/
			}
		});

		//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
		checkScrolling(tabNavigation);
		tabNavigation.on('scroll', function(){ 
			checkScrolling($(this));
		});
	});
	
	$(window).on('resize', function(){
		tabs.each(function(){
			var tab = $(this);
			checkScrolling(tab.find('nav'));
			//tab.find('.cd-tabs-content').css('height', 'auto');
		});
	});

	function checkScrolling(tabs){
		var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
			tabsViewport = parseInt(tabs.width());
		if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.cd-tabs').addClass('is-ended');
		} else {
			tabs.parent('.cd-tabs').removeClass('is-ended');
		}
	}
};