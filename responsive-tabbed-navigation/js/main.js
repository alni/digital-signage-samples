jQuery(document).ready(function ($) {
	var CONFIG = getParameterByName("CONFIG") || null;

	if (!!CONFIG) {
		$.getJSON(CONFIG).done(function (data) {
			console.log(data);
			if (!!data && data.pages && data.pages.length > 0) {
			    if (!!data.hide_tab_bar) {
			        $(".cd-tabs").addClass("tab-bar-hidden");
			    }
				var pages = data.pages;
				$(".cd-tabs-navigation, .cd-tabs-content").empty();
				$.each(pages, function (i, page) {
					if (page.enabled_between && page.enabled_between.length > 1) {
						var now = moment();
						var start = moment(page.enabled_between[0]);
						var end = moment(page.enabled_between[1]);
						if (now.isBefore(start) || now.isAfter(end)) {
							return true; // continue
						}
					}
					var url = page.embed + "";
					if ("params" in page) {
						url += "?" + $.param(page.params);
					}
					var $tab = $("<a/>");
					$tab.attr("data-content", page.id);
					if (!!page.keep_on_screen && +page.keep_on_screen > 0) {
						$tab.attr("data-keep_on_screen", page.keep_on_screen);
					}
					$tab.attr("href", "#0");
					$tab.text(page.title);
					if (!!page.title_icon) {
						$tab.prepend([
							"<i class=\"fa fa-fw fa-",
							page.title_icon,
							"\"></i> "
						].join(""))
					}
					var $content = $("<li/>");
					$content.attr("data-content", page.id);
					if (!!page.preload) {
						$content.append($("<iframe/>")
							.attr("src", url)
							.attr("data-preload", "1"));
					} else {
						$content.append($("<iframe/>")
							.attr("src", "about:blank")
							.attr("data-src", url));
					}
					$(".cd-tabs-navigation").append($tab.appendTo("<li/>"));
					var $tabs_nav = $(".cd-tabs-navigation");
					if ($tabs_nav.outerWidth() < $tabs_nav.get(0).scrollWidth) {
						//$tabs_nav.addClass("overflows");
					}
					
					$(".cd-tabs-content").append($content);
					// <li><a data-content="inbox" class="selected" href="#0">Inbox</a></li>
				});
			}
			init($);
			$("ul.cd-tabs-navigation a:first").trigger("click");

			
			$(window).on("message", function (e) {
				if (e.originalEvent.data == "next-tab") {
					var selectedItem = $("ul.cd-tabs-navigation a.selected");
					selectNextTab(selectedItem);
				}
			});
		});
	}
});
window.ResponsiveTabbedNavigation = true;
var selectNextTab = function(selectedItem) {
	var nextItem = selectedItem.next("a");
	if (nextItem.length < 1) {
		nextItem = $("ul.cd-tabs-navigation a:first");
	}
	console.error(nextItem);
	nextItem.trigger("click");
};
var init = function ($) {
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
					slectedContentHeight = selectedContent.innerHeight(),
					selectedIframe = selectedContent.find("iframe[data-src]");
				
				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');

				if (!selectedIframe.data("preload") && selectedIframe.data("src")) {
					selectedIframe.attr("src", selectedIframe.data("src"));
					selectedContent.addClass('selected').siblings('li')
						.find("iframe[data-src]").attr("src", "about:blank");
				}
				if (!!selectedItem.data("keep_on_screen") 
					&& +selectedItem.data("keep_on_screen") > 0) {
				    setTimeout(function () {
				        /*var nextItem = selectedItem.next("a");
				        if (nextItem.length < 1) {
				            nextItem = $("ul.cd-tabs-navigation a:first");
				        }
				        console.error(nextItem);
				        nextItem.trigger("click");*/
						selectNextTab(selectedItem);
					}, (+selectedItem.data("keep_on_screen")) * 1000);
				}
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