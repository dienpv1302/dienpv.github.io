
var startTimeAB = 0;
var endTimeAB = 0;
var isRepeatAB = false;
var start_repeat = false;
var isLoop = false;
var control_active = false;

// Add event listener on keydown
document.addEventListener('keydown', (event) => {	
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
		case 'c':	
			media.currentTime = 0;				
			break;
		case 'a':
			if (event.altKey) media.currentTime -= 6;
			else media.currentTime -= 3;	
				
			if (media.currentTime < 0)
				media.currentTime = 0;
				
			break;
		case 'd':				
				if (event.altKey) media.currentTime += 6;
				else media.currentTime += 3;
				
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
		case ' ':
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
		speed_item.onclick = openPopupGuide;
		media.parentNode.insertBefore(speed_item, media.nextSibling);
	}
	
	var idpv_popup = document.getElementById('idpv_popup');
	if(null == idpv_popup)  createPopupGuide();
	
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

 function createPopupGuide() {
        // Tạo cửa sổ pop-up
        var popup = document.createElement('div');
        popup.id = 'idpv_popup';
        popup.style.display = 'none';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.padding = '20px';
        popup.style.backgroundColor = '#fff';
        popup.style.border = '1px solid #ccc';
        popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        popup.style.zIndex = '9999';
        //popup.style.maxWidth = '400px';
		popup.style.width = '50%'; 

        // Tạo nút đóng
        var closeBtn = document.createElement('span');
        closeBtn.id = 'close-btn';
        closeBtn.innerHTML = 'X';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.onclick = closePopupGuide;

        // Tạo nội dung hướng dẫn
        var content = document.createElement('div');
        content.id = 'popup-content';
		content.innerHTML = `
            <h2 style="color:black">Hướng dẫn sử dụng tính năng</h2>
            <p><b>Space</b> Play/Pause; <b>c</b> Restart audio</p>
            <p><b>a</b> Seeking left 3s; <b>alt+a</b> Seeking left 6s</p>
            <p><b>d</b> Seeking right 3s;</p>
            <p><b>w</b> Increase speed by 0.25x; <b>x</b> Decrease speed by 0.25x; <b>z</b> reset speed = 1x</p>
            <p><b>[</b> Begin time Repeat A-B</p>
            <p><b>]</b> End time Repeat A-B</p>
            <p><b>\\</b> Cancel repeat A-B</p>
        `;
      

        // Thêm nút đóng và nội dung vào cửa sổ pop-up
        popup.appendChild(closeBtn);
        popup.appendChild(content);

        // Thêm cửa sổ pop-up vào body
        document.body.appendChild(popup);

        // Hiển thị cửa sổ pop-up
        popup.style.display = 'none';
    }

    // Hàm đóng cửa sổ pop-up
    function closePopupGuide() {
        document.getElementById('idpv_popup').style.display = 'none';
    }
	
	function openPopupGuide() {
        document.getElementById('idpv_popup').style.display = 'block';
    }