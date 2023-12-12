
var startTimeAB = 0;
var endTimeAB = 0;
var isRepeatAB = false;
var start_repeat = false;
const shortseeking = 3;
const longseeking = 6;
var control_mode = 1;
var list_audio = [];
var index_audio_g = -1;
var loop = false;
var time_str_repeatAB = '';
var audio_name = 'We wish you a merry christmas';

window.onload = function () {
    var media = document.querySelector('video');
    if(media == null)
        media = document.querySelector('audio');

    var video_container = document.getElementById('video-container');
    // Add event listener on keydown
    document.addEventListener('keydown', control_mod);

    changeMode(document.getElementById('id-mode'));

    function control_mod(event)
    {
        if(1==control_mode) control_mod1(event);
        else control_mod2(event);
    }
    
    function control_mod1(event)
    {
        var name = event.key;
        var code = event.code;
        console.log(name);
        var prevent = true;        
        
        if (!event.ctrlKey || media == null) {
            // Do Something, may be an 'Undo' operation
            return;
        }
        var speed_item = document.getElementById('idPlaybackRate');
        var left_container = document.getElementById('left-container');
        var right_container = document.getElementById('right-container');
        var id_pdf = document.getElementById('id-pdf');
        var repeat_a_b = document.getElementById('repeat_a_b');

        switch(name) {
            case 'ArrowLeft':	
                if (event.shiftKey)
                    media.currentTime -= longseeking;
                else
				if (event.altKey)
                    media.currentTime = 0;
                else
                    media.currentTime -= shortseeking;			
                    
                if (media.currentTime < 0)
                    media.currentTime = 0;
                    
                break;
            case 'ArrowRight':				
                if (event.shiftKey)
                    media.currentTime += longseeking;
                else 
				if (event.altKey)
                    media.currentTime = media.duration;
                else
                    media.currentTime += shortseeking;			
                    
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
                if (media.paused){								
                    media.play();
				}
                else
                    media.pause();
                break;
            case 'q':			
                if(left_container.style.display==''){
                    left_container.style.display='none';
                    right_container.style.setProperty('width','100%');
                }
                else {
                    left_container.style.display='';
                    right_container.style.width = '35%';
                }
                break;
            case 'm':
                if (video_container.style.display=='none'){
                    video_container.style.display='';
                    id_pdf.style.display='none';
                    //uploadOuter.style.display='';
                }else{
                    video_container.style.display='none';
                    id_pdf.style.display='';
                    //uploadOuter.style.display='none';
                }
                break;
            case '[':
                isRepeatAB = false;
                startTimeAB = media.currentTime;
                repeat_a_b.style.left = startTimeAB * 100/media.duration + '%';
                repeat_a_b.style.width = '5px';
                time_str_repeatAB = document.getElementById('time-elapsed').innerHTML;
                break;
            case ']':
                endTimeAB = media.currentTime;
                time_str_repeatAB += " - " + document.getElementById('time-elapsed').innerHTML;
                if(startTimeAB >= endTimeAB) {
                    startTimeAB = 0;
                    endTimeAB = -1;
                    isRepeatAB = false;
                    repeat_a_b.style.width = '0px';
                }else{
                    repeat_a_b.style.width = (endTimeAB - startTimeAB)*100/media.duration + '%';
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
                repeat_a_b.style.width = '0px';
                break;
            case 'b':
                if (video_container.style['height']==''){
                    video_container.style['height']='76px';
                }else{
                    video_container.style['height']='';
                }
                break;
            case ',':
                click_song(index_audio_g-1);
                break;
            case '.':
                click_song(index_audio_g+1);
                break;
            case '/':
                if (id_pdf.style['margin-top']=='-57px'){
                    id_pdf.style['margin-top']='0px';
                }else{
                    id_pdf.style['margin-top']='-57px'
                }
                break;
            default:
                prevent=false;
                // code block            
        }
        
        if(true == prevent){
            event.preventDefault(); // Now link won't go anywhere
            event.stopPropagation(); // Now the event won't bubble up
          }
        speed_item.innerHTML = media.playbackRate +"x"
    }
    function control_mod2(event)
    {
        var name = event.key;
        var code = event.code;
        
        var prevent = true;        
        
        if (media == null) {
            // Do Something, may be an 'Undo' operation
            return;
        }
        var speed_item = document.getElementById('idPlaybackRate');
        var left_container = document.getElementById('left-container');
        var right_container = document.getElementById('right-container');
        var id_pdf = document.getElementById('id-pdf');
        var repeat_a_b = document.getElementById('repeat_a_b');
        switch(name) {
			case 'c':	
				media.currentTime = 0;				
				break;
            case 'a':	
                if (event.altKey)
                    media.currentTime -= longseeking;
                else
                    media.currentTime -= shortseeking;			
                    
                if (media.currentTime < 0)
                    media.currentTime = 0;
                    
                break;
            case 'd':				
                if (event.altKey)
                    media.currentTime += longseeking;
                else
                    media.currentTime += shortseeking;			
                    
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
                if (media.paused){								
                    media.play();
				}
                else
                    media.pause();
                break;
            case 'm':
                if (video_container.style.display=='none'){
                    video_container.style.display='';
                    id_pdf.style.display='none';
                    //uploadOuter.style.display='';
                }else{
                    video_container.style.display='none';
                    id_pdf.style.display='';
                    //uploadOuter.style.display='none';
                }
                break;
			case 't':
                if (id_pdf.style['margin-top']=='0px'){
                    id_pdf.style['margin-top'] = '-57px';
                }else{
                    id_pdf.style['margin-top'] = '0px';
                }
                break;	
            case 'q':
                var section = document.querySelector('section');
                if (section.style.display=='none'){
                    section.style.display='';
                    document.getElementById('id-hidden-tricky').style.display = 'none';
                }else{
                    section.style.display='none';
                    document.getElementById('id-hidden-tricky').style.display = '';
                }
                break;
            // case 'a':
            //     var dpv_time2 = document.getElementById('dpv_time2');
            //     if (dpv_time2.style.display=='none'){
            //         dpv_time2.style.display='';
            //     }else{
            //         dpv_time2.style.display='none';
            //     }
            //     break;
            case '[':
                time_str_repeatAB = document.getElementById('time-elapsed').innerHTML;
                isRepeatAB = false;
                startTimeAB = media.currentTime;
                repeat_a_b.style.left = startTimeAB * 100/media.duration + '%';
                repeat_a_b.style.width = '5px';
                break;
            case ']':
                endTimeAB = media.currentTime;
                time_str_repeatAB += " - " + document.getElementById('time-elapsed').innerHTML;
                if(startTimeAB >= endTimeAB) {
                    startTimeAB = 0;
                    endTimeAB = -1;
                    isRepeatAB = false;
                    repeat_a_b.style.width = '0px';
                }else{
                    repeat_a_b.style.width = (endTimeAB - startTimeAB)*100/media.duration + '%';
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
                repeat_a_b.style.width = '0px';
                break;
            case ',':
                click_song(index_audio_g-1);
                break;
            case '.':
                click_song(index_audio_g+1);
                break;
            case 'b':
                if (video_container.style['height']==''){
                    video_container.style['height']='76px';
                }else{
                    video_container.style['height']='';
                }
                break;
            case '/':
                if (id_pdf.style['margin-top']=='-57px'){
                    id_pdf.style['margin-top']='0px';
                }else{
                    id_pdf.style['margin-top']='-57px'
                }
                break;
            default:
                prevent=false;
                // code block            
        }
        
        if(true == prevent){
            event.preventDefault(); // Now link won't go anywhere
            event.stopPropagation(); // Now the event won't bubble up
          }
        speed_item.innerHTML = media.playbackRate +"x"
    }

    function refreshTime() {
        document.getElementById('dpv_time').innerHTML = document.getElementById('time-elapsed').innerHTML + ' / ' 
        + document.getElementById('duration').innerHTML + ' ' + media.playbackRate +'x';
        
        if (isRepeatAB)
        {
            document.getElementById('id-rp-ab').style.display = '';
            document.getElementById('id-rp-ab').innerHTML = " AB-[" +time_str_repeatAB +"]";
            document.getElementById('dpv_time').innerHTML += document.getElementById('id-rp-ab').innerHTML;
        }else
        {
            document.getElementById('id-rp-ab').style.display = 'none';

            if (true != loop && media.currentTime >= media.duration)
            {
                click_song(index_audio_g+1);
            }
        }
        document.getElementById('dpv_time2').innerHTML = document.getElementById('dpv_time').innerHTML;
		if (document.getElementById('id-pdf').style.display == 'none')
		{
			document.getElementById('id_audio_name').innerHTML = audio_name;
		}
		else
		{
			document.getElementById('id_audio_name').innerHTML = audio_name + ' [' +document.getElementById('dpv_time').innerHTML+']';
        }
		setTimeout(refreshTime, 100);
    }    
    
    setTimeout(refreshTime, 100);

    function checkTimeRepeatAB() {
        if(true != loop && true == isRepeatAB)
		{
			if (media.currentTime > endTimeAB)
			{media.pause(); media.currentTime = endTimeAB;}
			if (media.currentTime < startTimeAB)
			{media.pause();media.currentTime = startTimeAB;}
            
			setTimeout(checkTimeRepeatAB, 200);
			return;
		}
		if(true == isRepeatAB) {     
          if(start_repeat == true)
          {
            media.play();
            start_repeat = false;
            setTimeout(checkTimeRepeatAB, 100);
            return;
          }   
          if (media.currentTime >= endTimeAB || media.currentTime < startTimeAB) {
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

function dragNdropAdd(event) {
    //Other
    var list_item = document.getElementById('list-item-song');
    var str = "";
    var checkExistSong = 0;
    var checkPDF = 0;
    if (list_audio.length > 0)
    {
        checkExistSong = 1;
    }
    
    for (i=0; i<event.target.files.length; i++)
    {
        var file = event.target.files[i];
        if (file.type != 'application/pdf')
        {
            list_audio.push(file);
            str += " <a href='#' id = 'sel_"+(list_audio.length-1)+"' onclick='return click_song("+(list_audio.length-1)+");'>"+(list_audio.length < 10 ? "0"+list_audio.length:list_audio.length)+" "+file.name+"</a> ";
        }
        else
        {
            var fileName = URL.createObjectURL(file);
            document.getElementById('id-pdf-ob').setAttribute('data', fileName);
            checkPDF = 1;
        }
    }
    list_item.innerHTML += str;
    document.getElementById('id-add-song').classList.add('hide');
    
    if(checkExistSong == 0 && list_audio.length > 0)
    {
        open_file_audio(0);
    }
    else if (checkPDF > 0)
    {
        var video_container = document.getElementById('video-container');
        var id_pdf = document.getElementById('id-pdf');
        video_container.style.display='none';
		id_pdf.style.display='';
    }
}

function dragNdrop(event) {
    var index_audio = 0;
	str="";
	if(event.target.files.length <1 ) return;
    //Only pdf
    if(event.target.files.length ==1 && event.target.files[0].type == 'application/pdf')
    {
        var video_container = document.getElementById('video-container');
        var id_pdf = document.getElementById('id-pdf');
        var fileName = URL.createObjectURL(event.target.files[0]);
		document.getElementById('id-pdf-ob').setAttribute('data', fileName);
		video_container.style.display='none';
		id_pdf.style.display='';
    }
    else
    {
        //Other
        list_audio = [];
        index_audio = 0;
        index_audio_g = -1;
        list_item = document.getElementById('list-item-song');
        
        for (i=0; i<event.target.files.length; i++)
        {
            var file = event.target.files[i];
            if (file.type != 'application/pdf')
            {
                list_audio.push(file);
                str += " <a href='#' id = 'sel_"+i+"'  onclick='return click_song("+i+");'>"+(i < 9 ? "0"+(i+1):(i+1))+" "+file.name+"</a> ";
            }
            else
            {
                var fileName = URL.createObjectURL(file);
                document.getElementById('id-pdf-ob').setAttribute('data', fileName);
            }       
        }
        list_item.innerHTML = str;
        open_file_audio(index_audio);
    }

	//if(file.type == 'video/mp4' || file.type == 'audio/mpeg')
    
    
}

function open_file_audio(index_audio)
{
    if (list_audio.length == 0) return;

	if (index_audio >= list_audio.length) index_audio = 0;

    if(index_audio < 0)
        index_audio = list_audio.length - 1;
    
    if (index_audio_g == index_audio) return;
	
    var file = list_audio[index_audio];

    var video_container = document.getElementById('video-container');
	var id_pdf = document.getElementById('id-pdf');

    var fileName = URL.createObjectURL(file);
    if(file.type.substring(0,5) == 'video' || file.type.substring(0,5) == 'audio')
    {        
        var media = document.querySelector('video');
        media.src = fileName;
        media.load();
		
		// video_container.style.display='';
		// id_pdf.style.display='none';
		{
            var repeat_a_b = document.getElementById('repeat_a_b');
            startTimeAB = 0;
            endTimeAB = -1;
            isRepeatAB = false;
            start_repeat = false;
            repeat_a_b.style.width = '0px';
        }
        media.play();
		audio_name = (index_audio < 9 ? "0"+(index_audio+1):(index_audio+1)) +" " + file.name;
        document.getElementById('id_audio_name').innerHTML = audio_name;
    }
    // else if (file.type == 'application/pdf')  
    // {
	// 	var id_pdf = document.getElementById('id-pdf');
	// 	document.getElementById('id-pdf-ob').setAttribute('data', fileName);
	// 	video_container.style.display='none';
	// 	id_pdf.style.display='';
	// }
	
    if(index_audio_g != index_audio)
    {
        var rm =  document.getElementById("sel_"+index_audio_g);
        if(rm != null) rm.classList.remove("sel");
        
        var add = document.getElementById("sel_"+index_audio)
        if(add != null) add.classList.add("sel");
    }
	
	index_audio_g = index_audio;
}

function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}
function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}

function setLoop(ob)
{
    var media = document.querySelector('video');
    if(media == null)
        media = document.querySelector('audio');
    if(ob.style.color == 'white')
    {
		loop = true;
        ob.style.color = 'aqua';
        ob.style['font-weight'] = 'bold';
        media.setAttribute('loop', '');

    }else{
		loop = false;
        ob.style.color = 'white';
        media.removeAttribute('loop');
        ob.style['font-weight'] = '';
    }
}

function changeMode(ob)
{
    var left_container = document.getElementById('left-container');
    var right_container = document.getElementById('right-container');
    document.getElementById('id-hidden-tricky').style.display = 'none';

    if(ob.style.color == 'white')
    {
        ob.style.color = 'aqua';
        ob.style['font-weight'] = 'bold';
        control_mode = 2;
        right_container.style.width = '0%';
        right_container.style.display = 'none';
        left_container.style.width = '100%';
    }else{
        ob.style.color = 'white';
        ob.style['font-weight'] = '';
        control_mode = 1;
        right_container.style.width = '35%';
        left_container.style.width = '65%';
        right_container.style.display = '';
    }
}

function click_song(index)
{
    open_file_audio(index);
}