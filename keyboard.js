$('#keyboard-upper-container').hide();

$(document).ready(function(){

	var sentence, time, errors = [];	
	var typings = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
	function setWordText(event) {
		if(typings.length){
			$('#words').text(typings[0]);
			typings.shift();
			errors.push($( "#words-typed" ).find( "span.glyphicon-remove" ).length);
			$('#words-typed').empty();
			sentence = $('#words').html();
			$( "#block" ).stop(true, true).animate({ "left": "15px" });
		} else {
			calculateWPM(event);
		}
	};
	
	setWordText();
	
	function calculateWPM(event) {
		time = event.timeStamp - time;
		var mistakes = errors.reduce(function(a, b) {	
			return a+b;
		});
		var numberOfWords = 54;
		var minutes = (time/1000)/60;
		var wpm = Math.floor(numberOfWords/minutes - (mistakes * 2));
		
		score(wpm);
	};
	
	function score(wpm) {
		var message;
		if(parseInt(wpm) < 0) {
				message = 'Yikes there were a lot of mistakes!';
			} else {
				message = 'You typed ' + wpm + ' words per minute!';
			}
		$('#target').html(message).css({'font-size': '44px'});
		
		playAgain();
	};
	
	function playAgain() {
		setTimeout(function() {
			if(confirm('Would you like to play again?')) {
				location.reload(true);
			}
		}, 5000);
	}
	
	function correctLetter(event) {
		var typed = event.keyCode;
		if(typed === sentence[0].charCodeAt()) {
			$('#words-typed').append($('<span class="glyphicon glyphicon-ok"></span>'));	
		} else {
			$('#words-typed').append($('<span class="glyphicon glyphicon-remove"></span>'));	
		}
		sentence = sentence.slice(1);
		if (sentence.length === 0) {
			setWordText(event);
		} else {
			highlight();
		} 
		
		nextLetterToDOM (sentence[0]);
	}
	
	function nextLetterToDOM(letter) {
		$('#next-letter').text(letter);	
	}
	
	function highlight() {
		$( "#block" ).animate({ "left": "+=17.5px" }, 'fast');
	}
	
	function getKeyCode(keyCode, specialChars) {
		var key;
		if(specialChars.indexOf(keyCode) > -1) {
			key = keyCode;
		} else {
			key = String.fromCharCode(keyCode);
		}
		return key;
	};
	
	function showShiftKeys(event) {
		if(event.shiftKey) {
			$('#keyboard-upper-container').show();
			$('#keyboard-lower-container').hide();
		}
	};
	
	function hideShiftKeys(event) {
		if(!event.shiftKey) {
			$('#keyboard-upper-container').hide();
			$('#keyboard-lower-container').show();
		}
	};
	
	$(document).on('keydown', function(e) {
		showShiftKeys(e);
	});
	
	
	$(document).on('keypress', function(e) {
		if(!time) {
			time = e.timeStamp;
			console.log(time);
		}
		
		var specialCharacters = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63,64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126];
		
		correctLetter(e);
		
		var selector = '#' + getKeyCode(e.keyCode, specialCharacters);
		
		$(selector).css({'background-color': '#38B0DE', 'color': '#fff'});
	});
	
	$(document).on('keyup', function(e) {
		hideShiftKeys(e);
		$('.key').css({'background-color': '#f5f5f5', 'color': '#000'});
	});
	
});