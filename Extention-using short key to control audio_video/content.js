
var startTimeAB = 0;
var endTimeAB = 0;
var isRepeatAB = false;
var start_repeat = false;
var isLoop = false;
var control_active = false;

// Add event listener on keydown
document.addEventListener('keyup', (event) => {	
	var media = document.querySelector('video');
	if(media == null)
		media = document.querySelector('audio');
	
	var name = event.key;
	var code = event.code;
	console.log(name);
	var prevent = true;	
	
	var speed_item = document.getElementById('id_speed_dpv');
	if(!control_active)
	{
		if(event.ctrlKey && 'ArrowUp' == name){
			control_active = true;		
		
		if(speed_item != null)
			speed_item.style.display='';
		}
		
		setTimeout(refreshTime, 200);
	}
	
	if(control_active)
	{
		if(event.ctrlKey && 'ArrowDown' == name){
			control_active = false;
		
		if(speed_item != null)
			speed_item.style.display='none';
		}
	}
	
	var speed_item = document.getElementById('id_speed_dpv');
	if (media == null || speed_item == null || !control_active) {
		// Do Something, may be an 'Undo' operation
		return;
	}
	
	switch(name) {
		case 'a':	
			media.currentTime -= 3;	
				
			if (media.currentTime < 0)
				media.currentTime = 0;
				
			break;
		case 'q':
			media.currentTime -= 5;			
				
			if (media.currentTime < 0)
				media.currentTime = 0;
				
			break;
		case 'd':				
				media.currentTime += 3;
				
			if (media.currentTime > media.duration)
					media.currentTime = media.duration;
			break;
		case 'e':				
			media.currentTime += 5;
				
			if (media.currentTime > media.duration)
					media.currentTime = media.duration;
			break;
		case 'w':
			media.playbackRate += 0.25;
			break;
		case 'x':
			media.playbackRate -= 0.25;
			break;
		case 'z':
			media.playbackRate = 1;
			break;
		case 's':
			if (media.paused)
				media.play();
			else
				media.pause();
			break;
	    case 'l':
			if (isLoop)
				media.setAttribute('loop', '');
			else
				media.removeAttribute('loop');
			isLoop = !isLoop;
			break;
		case 'h':			
			if(media.style.display=='')
				media.style.display='none';
			else 
				media.style.display='';
			break;
		//case 'y':			
		//	if(speed_item.style.display=='')
		//		speed_item.style.display='none';
		//	else 
		//		speed_item.style.display='';
		//	break;
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
});

function refreshTime() {	
	
	var media = document.querySelector('video');
	if(media == null)
		media = document.querySelector('audio');	
	
	var speed_item = document.getElementById('id_speed_dpv');
	if(null == speed_item && media != null)
	{
		speed_item = document.createElement('p');
		speed_item.id = 'id_speed_dpv';
		speed_item.style.setProperty('font-weight', 'bold');
		speed_item.style.setProperty('color', 'red');
		//speed_item.style.setProperty('display', 'none');
		speed_item.style.setProperty('position', 'fixed');
		speed_item.style.setProperty('left', '10px');
		speed_item.style.setProperty('bottom', '10px');
		speed_item.style.setProperty('z-index', '1000');
		speed_item.style.setProperty('font-size', '20px');
		media.parentNode.insertBefore(speed_item, media.nextSibling);
	}
	
	if (control_active){
		setTimeout(refreshTime, 200);		
	}else{
		if(speed_item != null)
			speed_item.style.display='none';
		
	}

	if (media == null) {
		// Do Something, may be an 'Undo' operation
		return;
	}
	
	speed_item.innerHTML = "DienPV: <span style = 'color:green'>"+time_to_string(media.currentTime) + "/" + time_to_string(media.duration)+"</span> "
	+ media.playbackRate +"x" + (isLoop?"<span style = 'color:blue'> - Loop</span>":"");
		
}    
    
setTimeout(refreshTime, 200);

function checkTimeRepeatAB() {
	var media = document.querySelector('video');
	if(media == null)
		media = document.querySelector('audio');
	
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

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    hours: result.substr(0, 2),
	minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

function time_to_string(timeInSeconds) {
  const time = formatTime(Math.round(timeInSeconds));
  return`${time.hours}:${time.minutes}:${time.seconds}`;
}