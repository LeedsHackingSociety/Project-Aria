$(document).ready( function() {
	$('.menuToggle > a').click( function(e) {
		toggleMenu(e, this);
	});

	$('a[data-nav=true]').click( function(e) {
		menuItem(e, this);
	});
});