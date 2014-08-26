$(document).ready(function(){

    // Layout script, sets body to window size at start
    var bwidth = ($(window).width()); 
    var bheight = ($(window).height());
/*    if (bheight < 660 || bwidth < 660) {
        alert('The full version is the Damage Report Manager is intended for iPad use only. Detected phone resolution. Redirecting to Timer only edition.');
        window.location.replace('timer.html');
    } */
//    $('#tmrlap').html(bwidth + ' ' + bheight);    
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
    $('#pcEnabled').change(function(){
        if(this.checked)
            $('#pcDisplay').show();
        else
            $('#pcDisplay').hide();

    });

    $('#fgEnabled').change(function(){
        if(this.checked)
            $('#fgDisplay').show();
        else
            $('#fgDisplay').hide();

    });

    $('#peEnabled').change(function(){
        if(this.checked)
            $('#peDisplay').show();
        else
            $('#peDisplay').hide();

    });

    $('#trEnabled').change(function(){
        if(this.checked)
            $('#trDisplay').show();
        else
            $('#trDisplay').hide();

    });

    $('#smEnabled').change(function(){
        if(this.checked)
            $('#smDisplay').show();
        else
            $('#smDisplay').hide();

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
    $("#ssPCMod").change(function() {
        var pcSysMod = $('option:selected', this).text();
        $('#pcSystem').html(pcSysMod);
        var pcSysVal = $('option:selected', this).val();
        var pcSysDefault = 50;
        switch(pcSysVal) {
            case 'sysLifeSup':
                pcSysDefault = 80;
                break;
            case 'sysShields':
                pcSysDefault = 50;
                break;
            case 'sysHyper':
                pcSysDefault = 0;
                break;
            case 'sysTeleport':
                pcSysDefault = 50;
                break;
            case 'sysLasers':
                pcSysDefault = 50;
                break;
            case 'sysCargoBay':
                pcSysDefault = 60;
                break;
            case 'sysEnergy':
                pcSysDefault = 100;
                break;
            default:
                pcSysDefault = 50;
        }
        $('#pcOut').html(pcSysDefault);
        $('#pcOut').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#pcOut').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#pcOut').addClass(pcSysVal);
        var newCls = 'css' + $('#pcOut').html();
        $('#pcOut').addClass(newCls);
    });    
    
    $("#ssFGMod").change(function() {
        var fgSysMod = $('option:selected', this).text();
        var fgSysVal = $('option:selected', this).val();
        var fgSysDefault = 50;
        switch(fgSysVal) {
            case 'sysLifeSup':
                fgSysDefault = 80;
                break;
            case 'sysShields':
                fgSysDefault = 50;
                break;
            case 'sysHyper':
                fgSysDefault = 0;
                break;
            case 'sysTeleport':
                fgSysDefault = 50;
                break;
            case 'sysLasers':
                fgSysDefault = 50;
                break;
            case 'sysCargoBay':
                fgSysDefault = 60;
                break;
            case 'sysEnergy':
                fgSysDefault = 100;
                break;
            default:
                fgSysDefault = 50;
        }
        $('#fgOut').html(fgSysDefault);
        $('#fgOut').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#fgOut').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#fgOut').addClass(fgSysVal);
        $('#fgSystem').html(fgSysMod);
        var newCls = 'css' + $('#fgOut').html();
        $('#fgOut').addClass(newCls);
    });    
    
    $("#ssPEMod").change(function() {
        var peSysMod = $('option:selected', this).text();
        var peSysVal = $('option:selected', this).val();
        var peSysDefault = 50;
        switch(peSysVal) {
            case 'sysLifeSup':
                peSysDefault = 80;
                break;
            case 'sysShields':
                peSysDefault = 50;
                break;
            case 'sysHyper':
                peSysDefault = 0;
                break;
            case 'sysTeleport':
                peSysDefault = 50;
                break;
            case 'sysLasers':
                peSysDefault = 50;
                break;
            case 'sysCargoBay':
                peSysDefault = 60;
                break;
            case 'sysEnergy':
                peSysDefault = 100;
                break;
            default:
                peSysDefault = 50;
        }
        $('#peOut').html(peSysDefault);
        $('#peOut').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#peOut').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#peOut').addClass(peSysVal);
        $('#peSystem').html(peSysMod);
        var newCls = 'css' + $('#peOut').html();
        $('#peOut').addClass(newCls);
    });    
    
    $("#ssTRMod").change(function() {
        var trSysMod = $('option:selected', this).text();
        var trSysVal = $('option:selected', this).val();
        var trSysDefault = 50;
        switch(trSysVal) {
            case 'sysLifeSup':
                trSysDefault = 80;
                break;
            case 'sysShields':
                trSysDefault = 50;
                break;
            case 'sysHyper':
                trSysDefault = 0;
                break;
            case 'sysTeleport':
                trSysDefault = 50;
                break;
            case 'sysLasers':
                trSysDefault = 50;
                break;
            case 'sysCargoBay':
                trSysDefault = 60;
                break;
            case 'sysEnergy':
                trSysDefault = 100;
                break;
            default:
                trSysDefault = 50;
        }
        $('#trOut').html(trSysDefault);
        $('#trOut').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#trOut').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#trOut').addClass(trSysVal);
        $('#trSystem').html(trSysMod);
        var newCls = 'css' + $('#trOut').html();
        $('#trOut').addClass(newCls);
    });    
    
    $("#ssSMMod").change(function() {
        var smSysMod = $('option:selected', this).text();
        var smSysVal = $('option:selected', this).val();
        var smSysDefault = 50;
        switch(smSysVal) {
            case 'sysLifeSup':
                smSysDefault = 80;
                break;
            case 'sysShields':
                smSysDefault = 50;
                break;
            case 'sysHyper':
                smSysDefault = 0;
                break;
            case 'sysTeleport':
                smSysDefault = 50;
                break;
            case 'sysLasers':
                smSysDefault = 50;
                break;
            case 'sysCargoBay':
                smSysDefault = 60;
                break;
            case 'sysEnergy':
                smSysDefault = 100;
                break;
            default:
                smSysDefault = 50;
        }
        $('#smOut').html(smSysDefault);
        $('#smOut').removeClass('sysLifeSup sysShields sysHyper sysTeleport sysLasers sysCargoBay sysEnergy');
        $('#smOut').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#smOut').addClass(smSysVal);
        $('#smSystem').html(smSysMod);
        var newCls = 'css' + $('#smOut').html();
        $('#smOut').addClass(newCls);
    });    
    
    
    // System Status buttons no longer used as I have gone with numbers instead of bars


    $('div.system_container .systemBar:first-child').addClass('whiteText');
    $('div.system_container .systemBar').click(function(){
        $(this).siblings('.systemBar').removeClass('greybtn').removeClass('greyText').removeClass('whiteText');
        $(this).removeClass('greybtn').removeClass('greyText').addClass('whiteText');
//        $(this).addClass('whitetext');
        var boxNum = $(this).index();
        var boxes = $(this).parents('.system_container').children('.systemBar');
        var startBar = 0;
        if (boxNum > 0) {
            boxes.slice( startBar, boxNum ).each(function(){
                if (!$(this).hasClass('greybtn')){
                    $(this).addClass('greybtn').addClass('greyText');
                }
            });
        } else {
            $(this).removeClass('greybtn').removeClass('greyText').addClass('whiteText');
        }
    });

    // System Status buttons - THIS SUCKS AND NEEDS TO BE REDONE WITH REPEATABLE FUNCTION
    $('#pcOut').addClass('css50');
    $('#fgOut').addClass('css50');
    $('#peOut').addClass('css50');
    $('#trOut').addClass('css50');
    $('#smOut').addClass('css50');

    // Plasma Capacitor
    $('#pcUp').click(function () {
        if ($('#pcOut').html() < 100) {
            var oldCls = 'css' + $('#pcOut').html();
            $('#pcOut').removeClass(oldCls);
            $('#pcOut').html(function (i, val) {
                return val * 1 + 10;
            });
            var newCls = 'css' + $('#pcOut').html();
            $('#pcOut').addClass(newCls);
        }
    });
    $('#pcDown').click(function () {
        if ($('#pcOut').html() > 0) {
            var oldCls = 'css' + $('#pcOut').html();
            $('#pcOut').removeClass(oldCls);
            $('#pcOut').html(function (i, val) {
                return val * 1 - 10;
            });
            var newCls = 'css' + $('#pcOut').html();
            $('#pcOut').addClass(newCls);
        }
    });
    // Flux Generator
    $('#fgUp').click(function () {
        if ($('#fgOut').html() < 100) {
            var oldCls = 'css' + $('#fgOut').html();
            $('#fgOut').removeClass(oldCls);
            $('#fgOut').html(function (i, val) {
                return val * 1 + 10;
            });
            var newCls = 'css' + $('#fgOut').html();
            $('#fgOut').addClass(newCls);
        }
    });
    $('#fgDown').click(function () {
        if ($('#fgOut').html() > 0) {
            var oldCls = 'css' + $('#fgOut').html();
            $('#fgOut').removeClass(oldCls);
            $('#fgOut').html(function (i, val) {
                return val * 1 - 10;
            });
            var newCls = 'css' + $('#fgOut').html();
            $('#fgOut').addClass(newCls);
        }
    });
    // Photonic Emitter
    $('#peUp').click(function () {
        if ($('#peOut').html() < 100) {
            var oldCls = 'css' + $('#peOut').html();
            $('#peOut').removeClass(oldCls);
            $('#peOut').html(function (i, val) {
                return val * 1 + 10;
            });
            var newCls = 'css' + $('#peOut').html();
            $('#peOut').addClass(newCls);
        }
    });
    $('#peDown').click(function () {
        if ($('#peOut').html() > 0) {
            var oldCls = 'css' + $('#peOut').html();
            $('#peOut').removeClass(oldCls);
            $('#peOut').html(function (i, val) {
                return val * 1 - 10;
            });
            var newCls = 'css' + $('#peOut').html();
            $('#peOut').addClass(newCls);
        }
    });
    // Torque Relay
    $('#trUp').click(function () {
        if ($('#trOut').html() < 100) {
            var oldCls = 'css' + $('#trOut').html();
            $('#trOut').removeClass(oldCls);
            $('#trOut').html(function (i, val) {
                return val * 1 + 10;
            });
            var newCls = 'css' + $('#trOut').html();
            $('#trOut').addClass(newCls);
        }
    });
    $('#trDown').click(function () {
        if ($('#trOut').html() > 0) {
            var oldCls = 'css' + $('#trOut').html();
            $('#trOut').removeClass(oldCls);
            $('#trOut').html(function (i, val) {
                return val * 1 - 10;
            });
            var newCls = 'css' + $('#trOut').html();
            $('#trOut').addClass(newCls);
        }
    });
    // Sonic Modulator
    $('#smUp').click(function () {
        if ($('#smOut').html() < 100) {
            var oldCls = 'css' + $('#smOut').html();
            $('#smOut').removeClass(oldCls);
            $('#smOut').html(function (i, val) {
                return val * 1 + 10;
            });
            var newCls = 'css' + $('#smOut').html();
            $('#smOut').addClass(newCls);
        }
    });
    $('#smDown').click(function () {
        if ($('#smOut').html() > 0) {
            var oldCls = 'css' + $('#smOut').html();
            $('#smOut').removeClass(oldCls);
            $('#smOut').html(function (i, val) {
                return val * 1 - 10;
            });
            var newCls = 'css' + $('#smOut').html();
            $('#smOut').addClass(newCls);
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