function toggleMenu(e, element) {
	e.preventDefault();

	var navBody = $(element).parents('nav');
	console.log(navBody[0]);
	if(navBody.attr('class') === 'show') {
		navBody.removeClass('show');
		console.log('Hidden');
	} else {
		navBody.addClass('show');
		console.log('Shown');
	}
}

function menuItem(e, element) {
	e.preventDefault();

	var target = $(element).attr('href');
	if(target.indexOf('#') > -1) {
		var target = target.replace('#','');
	}
	console.log(target);

	location.hash = '#' + target;
}