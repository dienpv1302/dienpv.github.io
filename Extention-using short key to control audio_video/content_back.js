window.onload = function () {

var startTimeAB = 0;
var endTimeAB = 0;
var isRepeatAB = false;
var start_repeat = false;

var media = document.querySelector('video');
if(media == null)
	media = document.querySelector('audio');

// Add event listener on keydown
document.addEventListener('keyup', (event) => {
	var name = event.key;
	var code = event.code;
	console.log(name);
	var prevent = true;	
	
	if (!event.ctrlKey || media == null) {
		// Do Something, may be an 'Undo' operation
		return;
	}
	var speed_item = document.getElementById('id_speed_dpv');
	if(null == speed_item)
	{
		speed_item = document.createElement('p');
		speed_item.id = 'id_speed_dpv';
		speed_item.style.setProperty('font-weight', 'bold');
		speed_item.style.setProperty('color', 'red');
		speed_item.style.setProperty('display', 'none');
		speed_item.style.setProperty('position', 'relative');
		speed_item.style.setProperty('font-size', '20px');
		media.parentNode.insertBefore(speed_item, media.nextSibling);
	}
	
	switch(name) {
		case 'ArrowLeft':	
			if (!event.shiftKey)
				media.currentTime -= 2;
			else
				media.currentTime -= 5;			
				
			if (media.currentTime < 0)
				media.currentTime = 0;
				
			break;
		case 'ArrowRight':				
			if (!event.shiftKey)
				media.currentTime += 2;
			else 
				media.currentTime += 5;			
				
			if (media.currentTime > media.duration)
					media.currentTime = media.duration;
			break;
		case 'ArrowUp':
			media.playbackRate += 0.25;
			break;
		case 'ArrowDown':
			if (event.shiftKey)
					media.playbackRate = 1;
			else 
					media.playbackRate -= 0.25;
			break;
		case ' ':
			if (media.paused)
				media.play();
			else
				media.pause();
			break;
	    case 'q':			
			if(media.style.display=='')
				media.style.display='none';
			else 
				media.style.display='';
			break;
		case 'y':			
			if(speed_item.style.display=='')
				speed_item.style.display='none';
			else 
				speed_item.style.display='';
			break;
		case '[':
			isRepeatAB = false;
			startTimeAB = media.currentTime;
			break;
		case ']':
			endTimeAB = media.currentTime;
			if(startTimeAB >= endTimeAB) {
				startTimeAB = 0;
				endTimeAB = -1;
				isRepeatAB = false;
			}else{
				isRepeatAB = true;
				start_repeat = true;
				checkTimeRepeatAB();
			}      
			break;
		case '\\':
			startTimeAB = 0;
			endTimeAB = -1;
			isRepeatAB = false;
			start_repeat = false;
			break;
		default:
			prevent=false;
			// code block            
	}
	
	if(true == prevent){
		event.preventDefault(); // Now link won't go anywhere
		event.stopPropagation(); // Now the event won't bubble up
	  }
    speed_item.innerHTML = "DienPV - speed: "+media.playbackRate +"x"
});

function checkTimeRepeatAB() {
	if(true == isRepeatAB) {     
	  if(start_repeat == true)
	  {
		media.play();
		start_repeat = false;
		setTimeout(checkTimeRepeatAB, 100);
		return;
	  }   
	  if (media.currentTime >= endTimeAB) {
		media.pause();
		media.currentTime = startTimeAB;
		start_repeat = true;
		setTimeout(checkTimeRepeatAB, 1000);
	  }
	  else{
	  setTimeout(checkTimeRepeatAB, 100);
	  }
	}  
  }
}