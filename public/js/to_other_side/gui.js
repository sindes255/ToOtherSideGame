function Gui(){};

Gui.prototype.init = function(){
    var body =$('body');
    body.prepend(getTemplateByClass('turnContainer'));
    body.prepend(getTemplateByClass('newTurnContainer'));
    body.prepend(getTemplateByClass('menuIcon'));
    body.prepend(getTemplateByClass('playerIconContainer'));

    this.turnContainer = $('#turnContainer');
    this.turnSpan = this.turnContainer.find('span');
    this.newTurnContainer = $('#newTurnContainer');
    this.newTurnSpan = this.newTurnContainer.find('span');
    this.menuIcon = $('#menuIcon');

    this.playerIconContainer = $('#playerIconContainer');
    this.playerIcon = this.playerIconContainer.find('#playerIcon');
    this.playerIconSlider = new slider('sl', 100, 0, 100, 1);
    this.playerIconSlider.setValue(50);

    var player = $('#player')[0];

    this.playerIcon.on('click', function(){
        if(game.player.play){
            game.player.play = 0;
            game.player.volume = gui.playerIconSlider.getValue()* 0.001;
            gui.playerIconSlider.setValue(0);
            player.volume = 0;
            $('#playerIcon').removeClass('playerIcon__trigger_on').removeClass('playerIcon__on').addClass('playerIcon__off');

        }else{
            game.player.play = 1;
            gui.playerIconSlider.setValue(game.player.volume / 0.001);
            player.volume = game.player.volume;

            $('#playerIcon').removeClass('playerIcon__trigger_off').removeClass('playerIcon__off').addClass('playerIcon__on');
        }
    });
    this.playerIcon.mouseenter(function() {
        if(game.player.play){
            $('#playerIcon').removeClass('playerIcon__on').addClass('playerIcon__trigger_on');

        }else{
            $('#playerIcon').removeClass('playerIcon__off').addClass('playerIcon__trigger_off');

        }
    }).mouseleave(function() {
        if(game.player.play){
            $('#playerIcon').removeClass('playerIcon__trigger_on').addClass('playerIcon__on');
        }else{
            $('#playerIcon').removeClass('playerIcon__trigger_off').addClass('playerIcon__off');
        }
    });

    this.menuIcon.mouseenter(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 64px -399px / 555%'})
        }
    }).mouseleave(function() {
        if($('#modalWrapper').length == 0) {
            $('#menuIcon').css({background: 'url(/images/sprite.png) 64px -262px / 555%'})
        }
    });
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
                            newGame();
                            hideModal();
                        }

                    }, {
                        text: 'New Game',
                        background: 'url(/images/darkwood.jpg); color: #999',
                        callback: function () {
                            game.stats.gameOver = 1;
                            newGame();
                            hideModal();
                        }

                    }, {
                        text: 'Help',
                        callback: function () {

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

Gui.prototype.update= function(){

    var player =game.stats.currentPlayer.substr(0,1).toUpperCase() + game.stats.currentPlayer.substr(1);
    this.turnSpan.html(player + ': ' + game.stats.players[ game.stats.currentPlayer + 'Player'].turn + ' Turn');
    gui.newTurnSpan.html(player + ' Player Turn');
    gui.newTurnContainer.fadeIn();

    setTimeout(function(){gui.newTurnContainer.fadeOut()},1500);
};