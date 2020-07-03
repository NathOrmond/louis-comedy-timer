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

/*****************************************************
 * START SCRIPT
 */
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
			round_count += 1;
			refreshRoundsOnScreen(round_count, rounds);
		}
		rest_index += 1;
		index += 1;
		changeBackground("#00FF00");
		
		console.log("INDEX :" + index );
		console.log("REST_INDEX:" + rest_index);
		console.log("REST_TIME:" + rest_time);
		
		if(rest_index >= rest_time){ 
			rest_index = 0;
			console.log("RESET REST INDEX");
			do_work = false;
		}
		
	} else { 
		changeBackground("#FF0000");
		index += 1;
		do_work = true;
	}
	
	if(sec == 0){ 
		if(min == 0){ 
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
	document.getElementById("round_num").innerHTML = cnt + "/" + rds; 
}

function onStart(){ 
	started = true;
	do_work = true;
	refresh_interval_valid = setInterval(decrementTime , REFRESH_RATE);
}

function onStop(){ 
	started = false;
	do_work = false;
	clearInterval(refresh_interval_valid);
}

function onReset(){ 
	onStop();
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