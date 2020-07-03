const REFRESH_RATE = 1000;
var max = 10;
var initialSec = 0;

var min = 10;
var sec = 0;

var rounds = 10;
var round_count = 0;
var rest_time = 15;
var work_time = 45;

var index = 0;
var rest_index = 0;

var refresh_interval_valid;	
var do_work = false;
var started = false;

var first_start = true;

/*****************************************************
 * START SCRIPT
 */
changeBackground("#F0F8FF");
refreshRoundsOnScreen(round_count, rounds);
refreshTimeOnScreen(min,sec);


/*****************************************************
 * DOC LISTENERS
 */
document.getElementById("start_button").addEventListener("click", function(){
	if(!started){
		onStart();
	}
});

document.getElementById("stop_button").addEventListener("click", function(){
	if(started){
		onStop();
	}
});

document.getElementById("reset_button").addEventListener("click", function(){
	onReset();
});

document.getElementById("set_values_button").addEventListener("click", function(){
	onSetValues();
});

function setRounds(){ 
	rounds = parseInt(document.getElementById("rounds").value, 10);
}

function setRest(){ 
	rest_time = parseInt(document.getElementById("rest_time").value, 10);
}

function setWork(){ 
	work_time = parseInt(document.getElementById("work_time").value, 10);
	
}


/*****************************************************
 * TIMING LOGIC
 */
function setMinutes(time){ 
	max = time;
}

function decrementTime(){
	refreshTimeOnScreen(min,sec);
	if( ( do_work && ((index % work_time) == 0) && (index != 0)) || (rest_index != 0)){ 
		if(rest_index == 0){
			playRest();
			round_count += 1;
			refreshRoundsOnScreen(round_count, rounds);
		}
		rest_index += 1;
		index += 1;
		changeBackground("#00FF00");
				
		if(rest_index >= rest_time){ 
			rest_index = 0;
			index = 0;
			console.log("RESET REST INDEX");
			do_work = false;
		}
		
	} else { 
		
		//random checks keep going/ youcandoit / nicework
		if(Math.floor(Math.random() * 100) + Math.floor(Math.random() * 20) == 10){ 
			playKeepGoing();
		} else if(Math.floor(Math.random() * 100) % Math.floor(Math.random() * 75) == 5){ 
			playYouCanDoIt();
		}  else	if(Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) == 7){ 
			playWannaRoll();
		}  
		
		changeBackground("#FF7F50");
		index += 1;
		do_work = true;
	}
	
	if(sec == 0){ 
		if(min == 0){ 
			playNiceWork();
			clearInterval(refresh_interval_valid);
		} else {
			min = min - 1;
			sec = 59;
		}
	} else { 
		sec = sec -1;
	}
}


/*****************************************************
 * EVENTS
 */

function changeBackground(color) {
	   document.body.style.background = color;
}

function refreshTimeOnScreen(mm,ss){ 
	document.getElementById("CLOCK").innerHTML = ("0" + mm).slice(-2) +":"+ ("0" + ss).slice(-2);
}

function refreshRoundsOnScreen(cnt, rds){ 
	document.getElementById("round_num").innerHTML = "Round: " + cnt + "/" + rds; 
}

function onStart(){ 
	
	playRollingNow();
	
	if(first_start){ 
		first_start = false;
		round_count += 1;
		refreshRoundsOnScreen(round_count, rounds);
	}
	
	started = true;
	do_work = true;
	refresh_interval_valid = setInterval(decrementTime , REFRESH_RATE);
}

function onStop(){ 
	started = false;
	do_work = false;
	clearInterval(refresh_interval_valid);
	changeBackground("#F0F8FF");
}

function onReset(){ 
	onStop();
	first_start = true;
	min = max;
	sec = initialSec;
	index = 0;
	round_count = 0;
	refreshTimeOnScreen(min, sec);
	refreshRoundsOnScreen(round_count, rounds);
}

function onSetValues(){
	if(started){ 
		onStop();
	}	
	setRounds();
	setRest();
	setWork();
	
	calculateInitialTimes();
	onReset();
}

function calculateInitialTimes(){ 	
	max = Math.floor(((work_time + rest_time) * rounds) / 60);
	initialSec = ((work_time + rest_time) * rounds) % 60;
}

/*****************************************************
 * AUDIO
 */

function playKeepGoing(){
	var audio = new Audio("./resources/keepgoing.mp3");
	audio.play();
}

function playNiceWork(){ 
	var audio = new Audio("./resources/nicework.mp3");
	audio.play();
}

function playRest(){ 
	var audio = new Audio("./resources/rest.mp3");
	audio.play();
}

function playRollingNow(){ 
	var audio = new Audio("./resources/rollingnow.mp3");
	audio.play();
}

function playWannaRoll(){ 
	var audio = new Audio("./resources/wannaroll1.mp3");
	audio.play();
}

function playYouCanDoIt(){ 
	var audio = new Audio("./resources/youcandoit.mp3");
	audio.play();
}