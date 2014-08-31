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
        $('#loaderboxPhone').hide();
    if(isiPhone()){
        $('#loaderboxPad').hide();
        $('#loaderboxPhone').show();
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
        $('.loaderBox').fadeOut(1000);
    });

    // No double tap zooming on buttons when double tapped
    $('.updownbutton,.buttons').nodoubletapzoom();

    // Breach box toggles
    $('div.breachbtn').click(function(){
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
    var hullNow = 1;
    $('div.health_container .healthBar').click(function(){
        $(this).siblings('.healthBar').removeClass('greybtn').removeClass('greyText').removeClass('whiteText');
        $(this).removeClass('greybtn').removeClass('greyText').addClass('whiteText');
        var boxNum = $(this).index();
        var boxes = $(this).parents('.health_container').children('.healthBar');
        var startBar = 0;
        if ($(this).hasClass('hullBar')) {
            hullNow = boxNum;
        }
        $('#debugText').append(hullNow + '<br />');
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
    
    var setDRDeck = $('#tmrDRDeck').val();
    var setDREvent = $('#tmrDREvent').val();
    var drinitdeck = parseInt(setDRDeck, 10); // + parseInt(setDREvent, 10);

// Create the card structure
function Drcard(name, shield, title, text, pcnos, pcsld, fgnos, fgsld, penos, pesld, trnos, trsld, smnos, smsld, breachnos, breachsld) {
    this.name = name;
    this.shield = shield;
    this.title = title;
    this.text = text;
    this.pcnos = pcnos;
    this.pcsld = pcsld;
    this.fgnos = fgnos;
    this.fgsld = fgsld;
    this.penos = penos;
    this.pesld = pesld;
    this.trnos = trnos;
    this.trsld = trsld;
    this.smnos = smnos;
    this.smsld = smsld;
    this.breachnos = breachnos;
    this.breachsld = breachsld;
    Drcard.counter = Drcard.counter + 1;
}
Drcard.counter = 0;

// Insert cards into full deck
//                                shield      green   orange  purple grey  bluw
var cardDR = [];
cardDR[1] = new Drcard('DR01',80,'na','na',30,20,10,10,0,0,0,0,30,30,'na','na');
cardDR[2] = new Drcard('DR02',60,'na','na',10,10,20,0,0,0,20,20,10,50,'na','na');
cardDR[3] = new Drcard('DR03',40,'na','na',20,20,40,30,0,0,0,0,10,20,'na','na');
cardDR[4] = new Drcard('DR04',90,'na','na',0,0,10,0,20,20,30,20,20,30,'na','na');
cardDR[5] = new Drcard('DR05',50,'na','na',20,10,30,20,0,0,0,0,30,60,'na','na');
cardDR[6] = new Drcard('DR06',70,'na','na',30,20,0,0,0,0,40,20,30,40,'na','na');
cardDR[7] = new Drcard('DR07',50,'na','na',10,0,40,30,0,0,0,0,0,20,'na','na');
cardDR[8] = new Drcard('DR08',50,'na','na',0,0,20,20,40,20,0,0,20,20,'na','na');
cardDR[9] = new Drcard('DR09',40,'na','na',10,10,20,10,30,20,0,0,10,20,'na','na');
cardDR[10] = new Drcard('DR10',50,'na','na',30,20,20,10,0,0,0,0,10,20,'na','na');
cardDR[11] = new Drcard('DR11',100,'na','na',0,0,0,0,20,10,0,0,20,50,'a3','na');
cardDR[12] = new Drcard('DR12',50,'na','na',0,0,20,10,10,10,0,0,10,50,'d8','na');
cardDR[13] = new Drcard('DR13',100,'na','na',0,0,0,0,10,10,0,0,20,50,'b9','na');
cardDR[14] = new Drcard('DR14',70,'na','na',0,0,20,20,0,0,20,10,20,40,'na','na');
cardDR[15] = new Drcard('DR15',50,'na','na',0,0,0,0,0,0,20,30,20,40,'e6','na');
cardDR[16] = new Drcard('DR16',70,'na','na',30,30,0,0,0,0,0,0,30,60,'f1','na');
cardDR[17] = new Drcard('DR17',20,'na','na',30,20,0,0,40,30,0,0,10,30,'na','na');
cardDR[18] = new Drcard('DR18',30,'na','na',10,0,10,0,0,0,0,0,20,30,'c4','c4');
cardDR[19] = new Drcard('DR19',50,'na','na',20,20,0,0,0,0,50,30,20,40,'na','na');
cardDR[20] = new Drcard('DR20',70,'na','na',20,20,0,0,40,20,0,0,10,40,'na','na');
cardDR[21] = new Drcard('DR21',60,'na','na',20,20,20,10,0,0,0,0,10,40,'a3','na');
cardDR[22] = new Drcard('DR22',80,'na','na',20,20,0,0,0,0,40,10,10,40,'na','na');
cardDR[23] = new Drcard('DR23',50,'na','na',30,20,0,0,20,10,40,30,10,50,'na','na');
cardDR[24] = new Drcard('DR24',30,'na','na',0,0,10,0,0,0,10,0,20,40,'d8','d8');
cardDR[25] = new Drcard('DR25',30,'na','na',30,20,0,0,10,0,0,0,20,40,'e6','e6');
cardDR[26] = new Drcard('DR26',60,'na','na',20,10,0,0,0,0,20,20,20,50,'b9','na');
cardDR[27] = new Drcard('DR27',30,'na','na',0,0,0,0,10,10,10,10,20,30,'f1','na');
cardDR[28] = new Drcard('DR28',80,'na','na',10,10,0,0,30,20,40,20,10,40,'na','na');
cardDR[29] = new Drcard('DR29',50,'na','na',20,10,0,0,10,10,0,0,20,30,'a3','na');
cardDR[30] = new Drcard('DR30',50,'na','na',0,0,0,0,20,20,0,0,30,50,'b9','na');
cardDR[31] = new Drcard('DR31',100,'na','na',0,0,20,0,20,20,30,20,30,70,'na','na');
cardDR[32] = new Drcard('DR32',60,'na','na',0,0,0,0,40,20,20,10,20,40,'na','na');
cardDR[33] = new Drcard('DR33',30,'na','na',0,0,0,0,40,30,20,20,10,20,'na','na');
cardDR[34] = new Drcard('DR34',70,'na','na',0,0,0,0,0,0,20,20,20,30,'c4','na');
cardDR[35] = new Drcard('DR35',90,'na','na',30,20,10,10,0,0,10,10,20,30,'na','na');
cardDR[36] = new Drcard('DR36',80,'na','na',0,0,0,0,0,0,30,20,30,60,'c4','na');
cardDR[37] = new Drcard('DR37',70,'na','na',0,0,20,20,0,0,0,0,30,50,'d8','na');
cardDR[38] = new Drcard('DR38',70,'na','na',30,30,0,0,0,0,0,0,30,50,'e6','na');
cardDR[39] = new Drcard('DR39',70,'na','na',0,0,0,0,20,20,0,0,30,50,'f1','na');
cardDR[40] = new Drcard('DR40','na','GAME OVER','na','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[41] = new Drcard('DR41','na','ENERGY BURST','Discard all Energies on the ship floor back to the Energy supply Module. Draw and Resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[42] = new Drcard('DR42','na','CRYSTALS SHATTERED','Discard all Crystals on the ship floor back to the Crystal supply Module. Draw and Resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[43] = new Drcard('DR43','na','CIRCUITS FRIED','Discard all Circuits on the ship floor back to the Circuit supply Module. Draw and Resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[44] = new Drcard('DR44','na','SEALED OFF','Draw a Module card. Place this card on the Module indicated. No one may move into this Module while the card is here. Remove this card after the Damage Report timer sounds again. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[45] = new Drcard('DR45','na','LIVE WIRE','Draw a Module card. Place this card on the Module indicated. Each time players move into this Module for the remainder of the game, they receive 1 Injury token. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[46] = new Drcard('DR46','na','SUPPLY SHORTAGE','Remove 5 of each type of non-tool supply from the game. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[47] = new Drcard('DR47','na','CRITICAL HIT','Take 25% hull damage. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[48] = new Drcard('DR48','na','UNEXPECTED DELAYS','All players immediately slide their timers to the black clock. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[49] = new Drcard('DR49','na','GAS LEAK','Until the next Damage Report timer sounds, all non-robot players start their turns one clock farther to the left (never going beyond the black clock). Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[50] = new Drcard('DR50','na','DISASTER LOOMS','Discard the next Damage Report card from the Damage Report deck. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[51] = new Drcard('DR51','na','CATACLYSM','Without revealing them, shuffle the bottom 3 cards on the Damage Report deck and then return them to the bottom of the deck. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');
cardDR[52] = new Drcard('DR52','na','MICRO-ORGANISM ATTACK','All players receive 2 Injury tokens. Draw and resolve another Damage Report.','na','na','na','na','na','na','na','na','na','na','na','na');

// var maxVal = Drcard.counter;
var maxVal = 39;

// Draw cards to use in game
var gameDraws = drinitdeck - 1;
var gameDeck = [];
while (gameDeck.length < gameDraws) {
  var randomnumber = Math.floor(Math.random() * (maxVal - 1 + 1)) + 1;
  var found=false;
  for (var i=0;i<gameDeck.length;i++) {
    if (gameDeck[i]==randomnumber) {
        found=true;
        break;
    }
  }
    if (!found) {
        gameDeck[gameDeck.length]=randomnumber;
    }
} 
var drawNum = 0;

// Pull card from drawn cards and apply it
var drawCard = function() {
    var rando = gameDeck[drawNum];
    drawNum++;
    var statShields = $('.sysShields').html();
    if (statShields == null) {
        statShields = 0;
    }
    var checkHull = 0;
    if (statShields <= 0) {
        checkHull += 1;
    }
    var cardShields = cardDR[rando].shield;
    var cardName = cardDR[rando].name;
    $('#debugText').append('Shields ' + statShields + '<br />');
    $('#debugText').append('Drew card ' + cardName + ' - ' + hullNow + '<br />');
        if (statShields < cardShields) {
            $('#pcOut').removeClass('css' + $('#pcOut').html());
            $('#pcOut').html(($('#pcOut').html() - cardDR[rando].pcnos));
            if ($('#pcOut').html() > 0) {
                $('#pcOut').addClass('css' + $('#pcOut').html());
            } else {
                $('#pcOut').addClass('css0');
            }
            $('#fgOut').removeClass('css' + $('#fgOut').html());
            $('#fgOut').html(($('#fgOut').html() - cardDR[rando].fgnos));
            if ($('#fgOut').html() > 0) {
                $('#fgOut').addClass('css' + $('#fgOut').html());
            } else {
                $('#fgOut').addClass('css0');
            }
            $('#peOut').removeClass('css' + $('#peOut').html());
            $('#peOut').html(($('#peOut').html() - cardDR[rando].penos));
            if ($('#peOut').html() > 0) {
                $('#peOut').addClass('css' + $('#peOut').html());
            } else {
                $('#peOut').addClass('css0');
            }
            $('#trOut').removeClass('css' + $('#trOut').html());
            $('#trOut').html(($('#trOut').html() - cardDR[rando].trnos));
            if ($('#trOut').html() > 0) {
                $('#trOut').addClass('css' + $('#trOut').html());
            } else {
                $('#trOut').addClass('css0');
            }
            $('#smOut').removeClass('css' + $('#smOut').html());
            $('#smOut').html(($('#smOut').html() - cardDR[rando].smnos));
            if ($('#smOut').html() > 0) {
                $('#smOut').addClass('css' + $('#smOut').html());
            } else {
                $('#smOut').addClass('css0');
            }
            if (cardDR[rando].breachnos !== 'na') {
                $('#breach' + cardDR[rando].breachnos).addClass('redbtn');
            }
        } else {
            $('#pcOut').removeClass('css' + $('#pcOut').html());
            $('#pcOut').html(($('#pcOut').html() - cardDR[rando].pcsld));
            if ($('#pcOut').html() > 0) {
                $('#pcOut').addClass('css' + $('#pcOut').html());
            } else {
                $('#pcOut').addClass('css0');
            }
            $('#fgOut').removeClass('css' + $('#fgOut').html());
            $('#fgOut').html(($('#fgOut').html() - cardDR[rando].fgsld));
            if ($('#fgOut').html() > 0) {
                $('#fgOut').addClass('css' + $('#fgOut').html());
            } else {
                $('#fgOut').addClass('css0');
            }
            $('#peOut').removeClass('css' + $('#peOut').html());
            $('#peOut').html(($('#peOut').html() - cardDR[rando].pesld));
            if ($('#peOut').html() > 0) {
                $('#peOut').addClass('css' + $('#peOut').html());
            } else {
                $('#peOut').addClass('css0');
            }
            $('#trOut').removeClass('css' + $('#trOut').html());
            $('#trOut').html(($('#trOut').html() - cardDR[rando].trsld));
            if ($('#trOut').html() > 0) {
                $('#trOut').addClass('css' + $('#trOut').html());
            } else {
                $('#trOut').addClass('css0');
            }
            $('#smOut').removeClass('css' + $('#smOut').html());
            $('#smOut').html(($('#smOut').html() - cardDR[rando].smsld));
            if ($('#smOut').html() > 0) {
                $('#smOut').addClass('css' + $('#smOut').html());
            } else {
                $('#smOut').addClass('css0');
            }
            if (cardDR[rando].breachsld !== 'na') {
                $('#breach' + cardDR[rando].breachsld).addClass('redbtn');
            }
        }

// Take hull damage if Shields were at 0 at the start and took damage this turn
    if (checkHull === 1 && $('.sysShields').html() < 0) {
        hullNow = hullNow + 1;
        if (hullNow > 5) { 
            hullNow = 5; 
        }
//        $('#hullOut').html(hullNow);
        hullTarget = hullNow + 1;
        $('div.health_container .healthBar.hullBar:nth-child(' + hullTarget + ')').addClass('whiteText');
        $('div.health_container .healthBar.hullBar:nth-child(' + hullNow + ')').addClass('greybtn').addClass('greyText').removeClass('whiteText');
    }

// Reset any negative values to 0
    if ($('#pcOut').html() < 0) {
        $('#pcOut').html('0');
    }
    if ($('#fgOut').html() < 0) {
        $('#fgOut').html('0');
    }
    if ($('#peOut').html() < 0) {
        $('#peOut').html('0');
    }
    if ($('#trOut').html() < 0) {
        $('#trOut').html('0');
    }
    if ($('#smOut').html() < 0) {
        $('#smOut').html('0');
    }
    if ($('#hullOut').html() > 5) {
        $('#hullOut').html('5');
    }

//    Game over if system is critical or hull hits 0    
/*    if ($('#pcOut').hasClass('sysCritical') && $('#pcOut').html() <= 0) {
        $('#gameOut').append('GAME OVER - Plasma Capacitor<br />');
    }
    if ($('#fgOut').hasClass('sysCritical') && $('#fgOut').html() <= 0) {
        $('#gameOut').append('GAME OVER - Flux Generator<br />');
    }
    if ($('#peOut').hasClass('sysCritical') && $('#peOut').html() <= 0) {
        $('#gameOut').append('GAME OVER - Photonic Emitter<br />');
    }
    if ($('#trOut').hasClass('sysCritical') && $('#trOut').html() <= 0) {
        $('#gameOut').append('GAME OVER - Torque Relay<br />');
    }
    if ($('#smOut').hasClass('sysCritical') && $('#smOut').html() <= 0) {
        $('#gameOut').append('GAME OVER - Sonic Modulator<br />');
    } 
    if ($('#hullOut').html() >= 5) {
        $('#gameOut').append('GAME OVER - hull<br />');
    } */
};
        
    

$('#pickNew').click(function() {
    if ($('#autoDRApply').prop('checked')) {
        drawCard();
    }
});


    // Timer script
    // Initialise timer buttons
    $('#tmrpause').hide();
    $('#tmrresume').hide();
    $('#tmrreset').hide();
	$('#gameoverdisp').hide();
	var pcInit = 0;
	var fgInit = 0;
	var peInit = 0;
	var trInit = 0;
	var smInit = 0;
	
	
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
        pcInit = $('#pcOut').html();
        fgInit = $('#fgOut').html();
        peInit = $('#peOut').html();
        trInit = $('#trOut').html();
        smInit = $('#smOut').html();
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
		$('#tmrlap').html('');
		$('#gameoverdisp').hide();
        $('#tmrresume').hide();
        $('#tmrpause').hide();
        $('#tmrreset').hide();
        $('#tmrdisp').show();
        $('#tmrstart').show();
        $('#setbtn').show();
        drnowdeck = drinitdeck;
        $('#pcOut').html(pcInit);
        $('#fgOut').html(fgInit);
        $('#peOut').html(peInit);
        $('#trOut').html(trInit);
        $('#smOut').html(smInit);
        $('.statusout').removeClass('css100 css90 css80 css70 css60 css50 css40 css30 css20 css10 css0');
        $('#pcOut').addClass('css' + $('#pcOut').html());
        $('#fgOut').addClass('css' + $('#fgOut').html());
        $('#peOut').addClass('css' + $('#peOut').html());
        $('#trOut').addClass('css' + $('#trOut').html());
        $('#smOut').addClass('css' + $('#smOut').html());
        $('.breachbtn').removeClass('redbtn');
        $('div.health_container .healthBar').removeClass('greybtn').removeClass('greyText').removeClass('whiteText');
        $('div.health_container .healthBar:nth-child(2)').addClass('whiteText');
        hullNow = 1;
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
                    if ($('#autoDRApply').prop('checked')) {
                        drawCard();
                    }
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