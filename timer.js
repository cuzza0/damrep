$(document).ready(function(){

    // Layout script, sets body to window size at start
    var bwidth = ($(window).width()); 
    var bheight = ($(window).height());
/*    if (bheight < 768 || bwidth < 768) {
        alert('The full version is the Damage Report Manager is intended for iPad use only. Detected phone resolution. Redirecting to Timer only edition.');
        window.location.replace('timer.html');
    } */
    bwidth -= 50;
    bheight -= 50;
    $('body').css('width', bwidth + 'px');
    $('body').css('height', bheight + 'px');
    $('#loaderready').hide();
    $('#loaderbtn').click(function(){
        var gameOver = document.getElementsByTagName("audio")[1];
        gameOver.play();
        $('#loaderbox').fadeOut(1000);
    });

/*    $('body').css('width', '960px');
    $('body').css('height', '640px'); */

    // Breach box toggles
    $('div#breach').click(function(){
        $(this).toggleClass("redbtn");
    });

    // Settings box toggles
    $('#settings').hide();
    $('#credits').hide();
    $('#redAlert').hide();
    $('#gameOver').hide();
    
    
    $('#setbtn').click(function(){
        $('#timer').hide();
        $('#settings').show();
    });

    $('#mainbtn').click(function(){
        $('#settings').hide();
        $('#timer').show();
    });

    $('#crsetbtn').click(function(){
        $('#credits').hide();
        $('#settings').show();
    });

    $('#crmainbtn').click(function(){
        $('#credits').hide();
        $('#timer').show();
    });

    $('#credbtn').click(function(){
        $('#settings').hide();
        $('#credits').show();
    });

    // System Status buttons - THIS SUCKS AND NEEDS TO BE REDONE WITH REPEATABLE FUNCTION
    // Plasma Capacitor
    $('#pcUp').click(function () {
        if ($('#pcOut').html() < 100) {
            $('#pcOut').html(function (i, val) {
                return val * 1 + 10;
            });
        }
    });
    $('#pcDown').click(function () {
        if ($('#pcOut').html() > 0) {
            $('#pcOut').html(function (i, val) {
                return val * 1 - 10;
            });
        }
    });
    // Flux Generator
    $('#fgUp').click(function () {
        if ($('#fgOut').html() < 100) {
            $('#fgOut').html(function (i, val) {
                return val * 1 + 10;
            });
        }
    });
    $('#fgDown').click(function () {
        if ($('#fgOut').html() > 0) {
            $('#fgOut').html(function (i, val) {
                return val * 1 - 10;
            });
        }
    });
    // Photonic Emitter
    $('#peUp').click(function () {
        if ($('#peOut').html() < 100) {
            $('#peOut').html(function (i, val) {
                return val * 1 + 10;
            });
        }
    });
    $('#peDown').click(function () {
        if ($('#peOut').html() > 0) {
            $('#peOut').html(function (i, val) {
                return val * 1 - 10;
            });
        }
    });
    // Torque Relay
    $('#trUp').click(function () {
        if ($('#trOut').html() < 100) {
            $('#trOut').html(function (i, val) {
                return val * 1 + 10;
            });
        }
    });
    $('#trDown').click(function () {
        if ($('#trOut').html() > 0) {
            $('#trOut').html(function (i, val) {
                return val * 1 - 10;
            });
        }
    });
    // Sonic Modulator
    $('#smUp').click(function () {
        if ($('#smOut').html() < 100) {
            $('#smOut').html(function (i, val) {
                return val * 1 + 10;
            });
        }
    });
    $('#smDown').click(function () {
        if ($('#smOut').html() > 0) {
            $('#smOut').html(function (i, val) {
                return val * 1 - 10;
            });
        }
    });
    
    // Timer script
    // Initialise timer buttons
    $('#tmrpause').hide();
    $('#tmrresume').hide();
    $('#tmrreset').hide();
	$('#gameoverdisp').hide();
	
	// Timer display
    var timer = Tock({
        callback: function () {
            $('#tmrdisp').html(function() {
                var ms = timer.lap();

                // Initialise timer
                if (ms <= 0) {
                    return "0:00.00";
                }

                // Calculate from raw milliseconds to m:ss.cs
                var milliseconds = Math.floor((ms / 10) % 100).toString(),
                seconds = Math.floor((ms / 1000) % 60).toString(),
                minutes = Math.floor((ms / (60 * 1000)) % 60).toString();

                // Add leading 0 to ss.cs
                if (milliseconds.length === 1) {
                    milliseconds = '0' + milliseconds;
                } 
                if (seconds.length === 1) {
                    seconds = '0' + seconds;
                }

                // Send result to display
                return minutes + ":" + seconds + "." + milliseconds;
            });
        }
    });

    // Grab initial countdown interval and deck size from Settings page
    var setInterSet = $('#tmrInterSet').val();
    var tmrInterval = timer.timeToMS(setInterSet);
    var setDRDeck = $('#tmrDRDeck').val();
    var setDREvent = $('#tmrDREvent').val();
    var drinitdeck = parseInt(setDRDeck, 10); // + parseInt(setDREvent, 10);
    var setTotalTmr = tmrInterval * drinitdeck;
	$('#setTotTime').html(timer.msToTime(setTotalTmr)); 
//	var tmrInterval = 10000;
//	var drinitdeck = 3;
    var drnowdeck = drinitdeck;
//    $('#tmrlap').html(tmrInterval + ' ' + drinitdeck + ' ' + setInterSet + ' ' + setTotalTmr + ' ' + setDREvent + ' ' + setDRDeck + ' ' + timer.msToTime(setTotalTmr));

    // Grab updates to countdown interval and deck size from Settings page
    $('#tmrInterSet').change(function() {
        setInterSet = $('#tmrInterSet').val();
        tmrInterval = timer.timeToMS(setInterSet);
        setTotalTmr = tmrInterval * drinitdeck;
        $('#setTotTime').html(timer.msToTime(setTotalTmr)); 
    });

    $('#tmrDRDeck').change(function() {
        setDRDeck = $('#tmrDRDeck').val();
        drinitdeck = parseInt(setDRDeck, 10); // + parseInt(setDREvent, 10);
        drnowdeck = drinitdeck;
        setTotalTmr = tmrInterval * drinitdeck;
        $('#setTotTime').html(timer.msToTime(setTotalTmr)); 
    });

    $('#tmrDREvent').change(function() {
        setDREvent = $('#tmrDREvent').val();
        drinitdeck = parseInt(setDRDeck, 10); // + parseInt(setDREvent, 10);
        drnowdeck = drinitdeck;
        setTotalTmr = tmrInterval * drinitdeck;
        $('#setTotTime').html(timer.msToTime(setTotalTmr)); 
    });


    // Timer button controls
    // Start button - shown on load, hides itself, shows pause
    $('#tmrstart').on('click', function () {
        timer.start();
		countdown.start(tmrInterval);
        $('#tmrpause').show();
        $('#tmrstart').hide();
        $('#setbtn').hide();
        $('#tmrreset').hide();
        var redAlert = document.getElementsByTagName("audio")[0];
        redAlert.play();
    });
    // Pause button - hidden until start, unhides reset, toggles between self and resume
    $('#tmrpause').on('click', function () {
        timer.pause();
		countdown.pause();
        $('#tmrpause').hide();
        $('#tmrresume').show();
        $('#tmrreset').show();
    });

    // Resume button - hidden until pause, hides reset toggles between self and pause
    $('#tmrresume').on('click', function () {
        timer.pause();
		countdown.pause();
        $('#tmrresume').hide();
        $('#tmrpause').show();
        $('#tmrreset').hide();
    });

    // Reset button - resets timer to 0, hidden until pause, shows start and hides self+resume
    $('#tmrreset').on('click', function () {
        timer.reset();
		countdown.stop();
        $('#tmrdisp').html('0:00.00');
        $('#tmrlap').removeClass('redtext');
        $('#tmrdisp').removeClass('redtext');
		$('#tmrcount').html('3:00:00');
		$('#tmrlap').html('');
		$('#gameoverdisp').hide();
        $('#tmrresume').hide();
        $('#tmrpause').hide();
        $('#tmrreset').hide();
        $('#tmrdisp').show();
        $('#tmrstart').show();
        $('#setbtn').show();
        drnowdeck = drinitdeck;
    });

	var countdown = Tock({
			countdown : true,
			interval : 10,
			callback : function () {
				$('#tmrcount').html(timer.msToTime(countdown.lap()));
			},
			complete : function () {
				drnowdeck -= 1;
				var drdrawcard = drinitdeck - drnowdeck;
				countdown.stop();
                $('#tmrcount').html('3:00:00');
				if (drnowdeck <= 0) {
                    timer.stop();
                    $('#tmrpause').hide();
                    $('#tmrreset').show();
                    $('#tmrlap').html('');
                    $('#gameoverdisp').show();
                    $('#tmrdisp').hide();
                    var gameOver = document.getElementsByTagName("audio")[1];
                    gameOver.play();
                    
                    
				} else {
                    if (drnowdeck === 1) {
                        $('#tmrlap').html('DAMAGE REPORT - Draw Card #' + drdrawcard + '! ' + drnowdeck + ' card remains');
                        $('#tmrlap').addClass('redtext');
                        $('#tmrdisp').addClass('redtext');
                    } else {
                        $('#tmrlap').html('DAMAGE REPORT - Draw Card #' + drdrawcard + '! ' + drnowdeck + ' cards remain');
                    }
//                    $('#tmrlap').html(timer.msToTime(timer.lap()) + ' - DAMAGE REPORT - Draw Card #' + drdrawcard + '! ' + drnowdeck + ' cards remain<br>');
                    var redAlert = document.getElementsByTagName("audio")[0];
                    redAlert.play();
                    countdown.start(tmrInterval);
				}
			}
		});
});

$(window).load(function(){
    $('#loaderPop').hide();
    $('#loaderready').show();
//    $('#loaderbox').fadeOut(500);
});

$(window).resize(function () {

    // Layout script, sets body to window size on resize
    var bwidth = ($(window).width()); 
    var bheight = ($(window).height());
    bwidth -= 50;
    bheight -= 50;
    $('body').css('width', bwidth + 'px');
    $('body').css('height', bheight + 'px');
});