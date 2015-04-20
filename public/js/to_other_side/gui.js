function Gui(){};

/*================ Initialization of main interface elements ================*/
Gui.prototype.init = function(){
    var body;
    /*=======Add all DOM elements of GUI=======*/
    body =$('body');
    body.prepend(getTemplateByClass('turnContainer'));
    body.prepend(getTemplateByClass('newTurnContainer'));
    body.prepend(getTemplateByClass('menuIcon'));
    body.prepend(getTemplateByClass('helpIcon'));

    this.turnContainer = $('#turnContainer');
    this.turnSpan = this.turnContainer.find('span');
    this.newTurnContainer = $('#newTurnContainer');
    this.newTurnSpan = this.newTurnContainer.find('span');
    this.menuIcon = $('#menuIcon');
    this.helpIcon = $('#helpIcon');

    /*=======Set event listners of any GUI elements=======*/
    this.helpIcon.on('click', function(){
        if($('#modalWrapper').length == 0) {
            showModal({
                header: 'Help',
                text: getTemplateByClass('rules'),
                close:1,
                submit: {
                    text: 'Resume',
                    callback: function(){
                        $('#helpIcon').removeClass('helpIcon_on');
                        hideModal();
                    }
                }
            });
            $('#helpIcon').addClass('helpIcon_on');
        }
    });

    this.helpIcon.mouseenter(function() {
        if($('#modalWrapper').length == 0) {
            $('#helpIcon').addClass('helpIcon_on');
        }
    }).mouseleave(function() {
        if($('#modalWrapper').length == 0) {
            $('#helpIcon').removeClass('helpIcon_on');
        }
    });

    this.menuIcon.mouseenter(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 2px -356px'})
        }
    }).mouseleave(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 2px -303px'})
        }
    });
    /*=======Add event listener to open modal window with game menu=======*/
    this.menuIcon.on('click', function(){
        if($('#modalWrapper').length == 0) {

            showModal({
                header: 'MENU',
                text: '',
                close: 1,
                buttons: [
                    {
                        text: 'Retry',
                        background: 'url(/images/darkwood.jpg); color: #999',
                        callback: function () {
                            game.stats.gameOver = 1;
                            updateModal({
                                header: '<img class="logo-img" src="/images/icon128.png" width="58" height="58"/>To other side',
                                text: '<br>To rotate view use arrow keys on your keyboard or click left key and drag.',
                                background: 'url(/images/bg/main-bg2.jpg) no-repeat center center fixed',
                                load:1,
                                callback:newGame
                            });
                        }
                    },
                    {
                        text: 'New Game',
                        background: 'url(/images/darkwood.jpg); color: #999',
                        callback: function (event) {
                            game.stats.gameOver = 1;
                            var ev = event;

                            updateModal({
                                header: 'New Game',
                                close:1,
                                text: getTemplateByClass('new-game__settings'),
                                switch:1,
                                back: function(){
                                    updateModal(ev.data);
                                },
                                submit: {
                                    text: 'Start Game!',
                                    callback: function(){
                                        var surrArr;

                                        surrArr = $('#new-game__settings').serializeArray();
                                        game.stats.players.whitePlayer.AI = surrArr[0].value;
                                        game.stats.players.blackPlayer.AI = surrArr[1].value;

                                        updateModal({
                                            header: '<img class="logo-img" src="/images/icon128.png" width="58"/>To other side',
                                            text: 'To rotate view use arrow keys on your keyboard or click left mouse key and drag.',
                                            background: 'url(/images/bg/main-bg2.jpg) no-repeat center center fixed',
                                            load:1,
                                            callback:newGame
                                        });
                                    }
                                }
                            });
                        }
                    }, {
                        text: 'Help',
                        callback: function (event) {
                            var ev = event;

                            updateModal({
                                header: 'Help',
                                close:1,
                                text: getTemplateByClass('rules'),
                                submit: {
                                    text: 'Resume',
                                    callback: function(){
                                        hideModal();
                                    }
                                },
                                back: function(){
                                    updateModal(ev.data);
                                }
                            });
                        }
                    }, {
                        text: 'Show in GitHub',
                        callback: function () {
                            document.location.href = '/';
                        }
                    }
                ]
            });
        }else{
            hideModal();
        }
    })
};

/*================ Update turns and players information ================*/
Gui.prototype.update= function(){
    var player;

    player =game.stats.currentPlayer.substr(0,1).toUpperCase() + game.stats.currentPlayer.substr(1);
    this.turnSpan.html(player + ': ' + game.stats.players[ game.stats.currentPlayer + 'Player'].turn + ' Turn');
    gui.newTurnSpan.html(player + ' Player Turn');
    gui.newTurnContainer.fadeIn();

    setTimeout(function(){gui.newTurnContainer.fadeOut()},1500);
};