$(document).ready(function(){

    // Layout script, sets body to window size at start
    var bwidth = ($(window).width()); 
    var bheight = ($(window).height());
    function isiPhone(){
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    }
//        $('#tmrlap').html(navigator.platform);
        $('#loaderWelcomePhone').hide();
        $('#loaderPopPhone').hide();
        $('#loaderbtnPhone').hide();
    if(isiPhone()){
        $('#loaderWelcomePad').hide();
        $('#loaderWelcomePhone').show();
        $('#loaderPopPad').hide();
        $('#loaderPopPhone').show();
        $('#loaderbtnPad').hide();
        $('#loaderbtnPhone').show();
    }
//    $('#tmrlap').html(bwidth + ' ' + bheight);    
    bwidth -= 50;
    bheight -= 50;
    $('body').css('width', bwidth + 'px');
    $('body').css('height', bheight + 'px');
    $('#loaderready').hide();
    $('.loaderBtn').click(function(){
        var gameOver = document.getElementsByTagName("audio")[1];
        gameOver.play();
        $('#loaderbox').fadeOut(1000);
    });

    // No double tap zooming on buttons when double tapped
    $('.updownbutton,.buttons').nodoubletapzoom();

    // Breach box toggles
    $('div#breach').click(function(){
        $(this).toggleClass("redbtn");
    });

    // Health box toggles
    var hideCrisis = function() {
        $('#hthCrisisQP').hide();
        $('#hthCrisisQN').hide();
        $('#hthCrisisTP').hide();
        $('#hthCrisisTN').hide();
    };
    hideCrisis();
    $("#hthCrisisSel").change(function() {
        var pickMe = $('option:selected', this).val();
        hideCrisis();
        if (pickMe !== 'hthCrisisDis') {
            $('#'+pickMe).show();
        }
    });    
    
    $('div.health_container .healthBar:nth-child(2)').addClass('whiteText');
    $('div.health_container .healthBar').click(function(){
        $(this).siblings('.healthBar').removeClass('greybtn').removeClass('greyText').removeClass('whiteText');
        $(this).removeClass('greybtn').removeClass('greyText').addClass('whiteText');
        var boxNum = $(this).index();
        var boxes = $(this).parents('.health_container').children('.healthBar');
        var startBar = 0;
        if (boxNum > 0) {
            boxes.slice( startBar, boxNum -1 ).each(function(){
                if (!$(this).hasClass('greybtn')){
                    $(this).addClass('greybtn').addClass('greyText');
                }
            });
        } else {
            $(this).removeClass('greybtn').removeClass('greyText').addClass('whiteText');
        }
    });
    
    // Settings box toggles
    $('#settings').hide();
    $('#debugBox').hide();
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

    // System Status module display
    $('.checkEnabled').change(function() {
       var selBox = $(this).attr('id').substring(0,2);
       if ($('#' + selBox + 'Enabled').prop('checked')) {
           $('#' + selBox + 'Display').show();
       } else {
           $('#' + selBox + 'Display').hide();
       }
    });

    $('.checkCritical').change(function() {
       var selBox = $(this).attr('id').substring(0,2);
       if ($('#' + selBox + 'Critical').prop('checked')) {
           $('#' + selBox + 'Out').addClass('redtext');
       } else {
           $('#' + selBox + 'Out').removeClass('redtext');
       }
    });

    // System Status installed in switches
    $(".dropSystem").change(function() {
       var selBox = $(this).attr('id');
       var selBoxId = '#' + selBox;
       var selBoxSub = $(this).attr('id').substring(0,2);
        var selSysName = $('option:selected', this).text();
        $('#' + selBoxSub + 'System').html(selSysName);
        var selSysVal = $('option:selected', this).val();
        var selSysDefault = 50;
        switch(selSysVal) {
            case 'sysLifeSup':
                selSysDefault = 80;
                break;
            case 'sysShields':
                selSysDefault = 50;
                break;
            case 'sysHyper':
                selSysDefault = 0;
                break;
            case 'sysTeleport':
                selSysDefault = 50;
                break;
            case 'sysLasers':
                selSysDefault = 50;
                break;
            case 'sysCargoBay':
                selSysDefault = 60;
                break;
            case 'sysEnergy':
                selSysDefault = 100;
                break;
            default:
                selSysDefault = 50;
        }
        $('#' + selBoxSub + 'Out').html(selSysDefault);
        $('#' + selBoxSub + 'Out').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#' + selBoxSub + 'Out').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#' + selBoxSub + 'Out').addClass(selSysVal);
        var newCls = 'css' + $('#' + selBoxSub + 'Out').html();
        $('#' + selBoxSub + 'Out').addClass(newCls);
    });    

    // System Status buttons - THIS SUCKS AND NEEDS TO BE REDONE WITH REPEATABLE FUNCTION
    $('#pcOut').addClass('css50');
    $('#fgOut').addClass('css50');
    $('#peOut').addClass('css50');
    $('#trOut').addClass('css50');
    $('#smOut').addClass('css50');

    $('.updownbutton').click(function () {
        var selBox = $(this).attr('id');
        var selBoxSub = $(this).attr('id').substring(0, 2);
        var selBoxType = $(this).attr('id').substring(2, 4);
        var selBoxVal = parseInt($('#' + selBoxSub + 'Out').html(), 10);
        var oldCls = 'css' + $('#' + selBoxSub + 'Out').html();
        $('#' + selBoxSub + 'Out').removeClass(oldCls);
        if (selBoxType === 'Up') {
            if ($('#' + selBoxSub + 'Out').html() < 100) {
                selBoxVal += 10;
            }
        }
        if (selBoxType === 'Dn') {
            if ($('#' + selBoxSub + 'Out').html() > 0) {
                selBoxVal -= 10;
            }
        }
        $('#' + selBoxSub + 'Out').html(selBoxVal);
        var newCls = 'css' + $('#' + selBoxSub + 'Out').html();
        $('#' + selBoxSub + 'Out').addClass(newCls);
    });
    
    $('#showDebug').click(function(){
        $('#debugBox').show();
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
                    $('#debugText').append(timer.msToTime(timer.lap()) + ' Interval ' + $('#tmrInterSet').val() + ' set ' + drdrawcard + ' of ' + drinitdeck + '<br />');
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
                    $('#debugText').append(timer.msToTime(timer.lap()) + ' Interval ' + $('#tmrInterSet').val() + ' set ' + drdrawcard + ' of ' + drinitdeck + '<br />');
                    var redAlert = document.getElementsByTagName("audio")[0];
                    redAlert.play();
                    countdown.start(tmrInterval);
				}
			}
		});
});

$(window).load(function(){
    $('.loaderPop').hide();
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