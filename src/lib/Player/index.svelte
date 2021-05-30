
<script>
	import { onMount } from 'svelte';
	let audio;
	let timer;
	let currTime = '0:00';
	let currPause = false;
	let currPlaybackRate = 1;
	let playbackRates = [ 1.0, 1.25, 1.5, 1.7, 2.0 ];

	onMount(() => {
		audio = new Audio('/shows/gosuch/1.mp3');
		checkStatus()
	})



	function checkStatus(){
		timer = setInterval(()=>check(), .100)

		function check(){
			currTime = calcTime(audio.currentTime)
			currPause = audio.paused
		}

	}

	function calcTime(duration){
		// Hours, minutes and seconds
		var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;

	}

	function play(){
		currPause ? audio.play() : audio.pause()
	}

	function changePlaybackRate(){
		let currRate = audio.playbackRate;
		let nextRate = playbackRates.find( el => el > currRate );
		nextRate = nextRate ? nextRate : playbackRates[0];

		audio.playbackRate = nextRate
		currPlaybackRate = nextRate
	}


	const factor = .3;
	let mFactor;
	let multiplier = 2;
	let interval = null;
	let intervalTimer = null;

	function countdown() {
		setInterval(()=>{

		},
		.5)
	}

	function forward () {
		audio.currentTime += multiplier
		mFactor = factor
		multiplier + factor * mFactor
	}


</script>

<p>{currTime}</p>
<p>{currPause}</p>

<button on:click={play}>{ currPause ? 'Play' : 'Pause' }</button>
<button on:click={changePlaybackRate}>Rate: {currPlaybackRate}</button>
<button on:click={forward}>{'+' + forwardMultiplier + ' s'}</button>