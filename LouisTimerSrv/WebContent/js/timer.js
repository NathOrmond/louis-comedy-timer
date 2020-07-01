const REFRESH_RATE = 1000;
var max = 10;
var min = 10;
var sec = 0;

var rounds = 10;
var round_count = 0;
var rest_time = 15;
var work_time = 45;

var index = 0;

var refresh_interval_valid;	
var started = false;


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


/*****************************************************
 * TIMING LOGIC
 */
function setMinutes(time){ 
	max = time;
}

function decrementTime(){
	refreshTimeOnScreen(min,sec);
	if(sec == 0){ 
		
		if(min == 0){ 
			clearInterval(refresh_interval_valid);
		}
		
		min = min - 1;
		sec = 59;
	} else { 
		sec = sec -1;
	}
	
	if((index % work_time) == 0){ 
		round_count += 1;
		index += 1;
		refreshRoundsOnScreen(round_count, rounds)
	} else { 
		index += 1;
	}
}


/*****************************************************
 * EVENTS
 */

function refreshTimeOnScreen(mm,ss){ 
	document.getElementById("CLOCK").innerHTML = ("0" + mm).slice(-2) +":"+ ("0" + ss).slice(-2);
}

function refreshRoundsOnScreen(cnt, rds){ 
	document.getElementById("round_num").innerHTML = cnt + "/" + rds; 
}

function onStart(){ 
	started = true;
	refresh_interval_valid = setInterval(decrementTime , REFRESH_RATE);
}

function onStop(){ 
	started = false;
	clearInterval(refresh_interval_valid);
}

function onReset(){ 
	onStop();
	min = max;
	sec = 0;
	index = 0;
	round_count = 0;
	refreshTimeOnScreen(min, sec);
	refreshRoundsOnScreen(round_count, rounds);
}

function onSetValues(){ 
	
	rounds = document.getElementById("rounds").labels[0].textContent;
	work_time = document.getElementById("work_time");
	rest_time = document.getElementById("rest_time");
	max = ((work_time + rest_time) * rounds) / 60;
	onReset();
}