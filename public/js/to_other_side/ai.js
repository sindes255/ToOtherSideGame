function Ai(){

    this.aiPlayer = '';

    this.init = function(){
        if(game.stats.players.whitePlayer.AI == "1") {
            this.aiPlayer = 'whitePlayer'
        }else if(game.stats.players.blackPlayer.AI == "1"){
            this.aiPlayer = 'blackPlayer'
        }

        this.doTurn = function(fn){
            console.log(this.aiPlayer,game.stats.players.whitePlayer.AI);
            if(fn) fn.apply();
        }
    };




}