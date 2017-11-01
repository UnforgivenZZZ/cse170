var feedbackHeight = $('#feedback-posts').height();

var main = function () {
	var slideSpeed = 200;
	var dropped = false;
	var category = "";
	
	//alerts
	var alert1 = "Please choose a category for your question.\n";
	var alert2 = "Please enter your comment in the text area.\n";
	var alert3 = "Please leave your phone number or email address.";
	
	//select item from dropdown menu
	$(document).on('click','#select',function() {
		$('.dropdown-content').slideDown(slideSpeed,function() {
			dropped = true;
		});
	});
	
	//select item from dropdown menu
	$(document).on('click','.dropdown-option',function() {
		var newText = $(this).text();
		category = newText;
		$('input[name="category"]').val(category);
		$('#select').text(newText);
		$('.dropdown-content').slideUp(slideSpeed,function() {
			dropped = false;
		});
		if (category == 'Other') {//slide Custom Category down
			$('#custom-cat-holder').addClass('shown');
			$('#custom-cat-holder').slideDown(slideSpeed);
		}
		else if ($('#custom-cat-holder').hasClass('shown')) {//slide Custom Category back up
			$('#custom-cat-holder').removeClass('shown');
			$('#custom-category').val('');
			$('#custom-cat-holder').slideUp(slideSpeed);
		}
	});
	
	//see more
	function showMore() {
		$('#feedback-posts').height('auto');
		$('#see-more-button').text('See Less',function() {
			$('#feedback-posts').addClass('show-more');
		});
	}
	
	function showLess() {
		$('#feedback-posts').height(90);
		$('#see-more-button').text('See More',function() {
			$('#feedback-posts').removeClass('show-more');
		});
	}
	
	$(document).on('click','#see-more-button',function() {
		if ($('#feedback-posts').hasClass('show-more')) {
			showLess();
		}
		else showMore();
	});
	
	//slideUp from wherever
	$(document).on('click','body',function() {
		if (dropped) {
			$('.dropdown-content').slideUp(slideSpeed,function() {
				dropped = false;
			});
		}
	});
	
	$(document).on('submit','#main-form',function() {
		var alertText = "";
		if ($('input[name="category"]').val() == 'none') {
			alertText += alert1;
		}
		if ($('#problem').val() == '') {
			alertText += alert2;
		}
		if ($('#phone').val() == "" && $('#email').val() == "") {
			alertText += alert3;
		}
		
		if (alertText != "") {//-----denies submission unless user has filled out all info
			alert(alertText);
			return false;
		}
	});
};

$(document).ready(main);
