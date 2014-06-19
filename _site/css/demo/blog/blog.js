

$('#nav li').bind('mouseover', openSubMenu);
		$('#nav li').bind('mouseout', closeSubMenu);
		function closeSubMenu() {
			$(this).find('ul').css('visibility', 'hidden');	
		};
		function openSubMenu() {
			$(this).find('ul').css('visibility', 'visible');	
		};