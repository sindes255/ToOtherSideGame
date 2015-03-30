window.slider = function(elemId, sliderWidth, range1, range2, step) {
    var knobWidth = 12;				// ширина и высота бегунка
    var knobHeight = 12;			// изменяются в зависимости от используемых изображений
    var sliderHeight = 6;			// высота slider'а

    var offsX,tmp;					// вспомагательные переменные
    var d = document;
    var isIE = d.all || window.opera;	// определяем модель DOM
    var point = (sliderWidth-knobWidth-3)/(range2-range1);
    // point - количество пикселей на единицу значения

    var slider = d.createElement('DIV'); // создаем slider
    slider.id = elemId + '_slider';
    slider.className = 'slider';
    d.getElementById(elemId).appendChild(slider);

    var knob = d.createElement('DIV');	// создаем ползунок
    knob.id = elemId + '_knob';
    knob.className = 'knob';
    slider.appendChild(knob); // добавляем его в документ

    knob.style.left = 0;			// бегунок в нулевое значение
    knob.style.width = knobWidth+'px';
    knob.style.height = knobHeight+'px';
    slider.style.width = sliderWidth+'px';
    slider.style.height = sliderHeight+'px';

    var sliderOffset = slider.offsetLeft;			// sliderOffset - абсолютное смещение slider'а
    tmp = slider.offsetParent;		// от левого края в пикселях (в IE не работает)
    while(tmp.tagName != 'BODY') {
        sliderOffset += tmp.offsetLeft;		// тут его и находим
        tmp = tmp.offsetParent;
    }

    if(isIE)						// в зависимости от модели DOM
    {								// назначаем слушателей событий
        knob.onmousedown = startCoord;
        slider.onclick = sliderClick;
        knob.onmouseup = endCoord;
        slider.onmouseup = endCoord;
    }
    else {
        knob.addEventListener("mousedown", startCoord, true);
        slider.addEventListener("click", sliderClick, true);
        knob.addEventListener("mouseup", endCoord, true);
        slider.addEventListener("mouseup", endCoord, true);
    }


// далее подробно не описываю, кто захочет - разберется
//////////////////// функции установки/получения значения //////////////////////////

    function setValue(x)	// установка по пикселям
    {
        if(x < 0) knob.style.left = 0;
        else if(x > sliderWidth-knobWidth-3) knob.style.left = (sliderWidth-3-knobWidth)+'px';
        else {
            if(step == 0) knob.style.left = x+'px';
            else knob.style.left = Math.round(x/(step*point))*step*point+'px';
        }
    }
    function setValue2(x)	// установка по значению
    {
        if(x < range1 || x > range2) alert('Value is not included into a slider range!');
        else setValue((x-range1)*point);

    }

    function getValue()
    {return Math.round(parseInt(knob.style.left)/point)+range1;}

//////////////////////////////// слушатели событий ////////////////////////////////////

    function sliderClick(e) {
        var x;
        if(isIE) {
            if(event.srcElement != slider) return; //IE onclick bug
            x = event.offsetX - Math.round(knobWidth/2);
        }
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
    }

    function startCoord(e) {
        if(isIE) {
            offsX = event.clientX - parseInt(knob.style.left);
            slider.onmousemove = mov;
        }
        else {
            slider.addEventListener("mousemove", mov, true);
        }
    }

    function mov(e)	{
        var x;
        if(isIE) x = event.clientX-offsX;
        else x = e.pageX-sliderOffset-knobWidth/2;
        setValue(x);
    }

    function endCoord()	{
        if(isIE) slider.onmousemove = null;
        else slider.removeEventListener("mousemove", mov, true);
    }

    // объявляем функции setValue2 и getValue как методы класса
    this.setValue = setValue2;
    this.getValue = getValue;
};

window.getRandomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.getMaxMultiple = function(a, b){
    return Math.floor(b / a) *a;
};

window.throttle = function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

window.showModal = function(obj){
    var retry = '',
        location = '',
        close = '';

    game.pause = 1;
    game.removeEventListeners();


    if(obj.retry){
        retry = '<input type="button" class="retry-btn btn" id="retry-btn" value="Retry game?">'
    };
    if(obj.close){
        close = '<span class="close-btn" id="close-btn" style="margin: 8px 0 16px 0;"></span>'
    };
    if(obj.location){
        location = '<input type="button" class="location-btn btn" id="location-btn" value="'+ obj.location.text +'">'

    };

    var button= '', background ='';
    for(var i = 0; i < obj.buttons.length; i++){

        if(obj.buttons[i].background) {
            background = obj.buttons[i].background
        }else{
            background ='url(/images/lightwood.jpg)'
        }
        button = '<input type="button" class="retry-btn btn" id="retry-btn" style="border: 5px outset rgb(48, 48, 48);z-index: 10; padding: 16px 32px; font-size: 18px;  margin-bottom: 20px; float: left; clear: both; width: 100%;  cursor: pointer; background:' + background + ';" value="' + obj.buttons[i].text +'">';
        obj.text += button;
    }

    var modalWrapperTmp = getTemplateByClass('modalWrapper');

    $('body').append(modalWrapperTmp);
    var modalWrapper = $('#modalWrapper');
    var modalLayout = $('#modalLayout');
    var modalContainer = $('#modalContainer');
    var modalContent = modalContainer.find('.modalContent');

    modalContainer.append(close).prepend(retry).prepend(location);
    modalContainer.find('h1').html(obj.header);
    modalContainer.find('.modalText').html(obj.text);
    var buttonEl= {};
    for(var i = 0; i < obj.buttons.length; i++){
        buttonEl = $(modalContent.find('input')[i]);
        buttonEl.on('click', obj.buttons[i].callback)

    }
    if(obj.close) {
        modalLayout.on('click', function (e) {

            hideModal();
        });
    }


    if(obj.close){
        var closeEl = $('#close-btn');
        closeEl.on('click', function(){
            hideModal();
        });
    };


    if(obj.retry){
        var retryEl = $('#retry-btn');
        retryEl.on('click', function(){
            game.stats.gameOver = 1;
            newGame();
            hideModal();
        });
    };
    if(obj.location){
        var locationEl = $('#location-btn');
        locationEl.on('click', function(){
            document.location.href = obj.location.url;
        });


    };


    var opacity = 0;

    modalWrapper.animate({opacity: 1}, 500);

};



window.hideModal = function(){
    if($('#menuIcon'))$('#menuIcon').css({background: 'url(/images/sprite.png) 64px -262px / 555%'})
    game.addEventListeners();
    game.pause = 0;
    $('#modalLayout').remove();
    $('#modalWrapper').fadeOut(function(){$('#modalWrapper').remove();});

};

window.getTemplateByClass = function(cl){
    var jadeTemplates,
        element;

    jadeTemplates = $('#jade-templates');
    element = jadeTemplates.find('.' + cl);
console.log(element[0]);
    return element[0]
};

window.Animate = function(){
    this.turnOn = 0;

    this.elastic = function(progress) {
        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress)
    };

    this.linear = function(progress) {
        return progress
    };

    this.quad = function(progress) {
        return Math.pow(progress, 2)
    };

    this.quint = function(progress) {
        return Math.pow(progress, 5)
    };

    this.circ = function(progress) {
        return 1 - Math.sin(Math.acos(progress))
    };

    this.back = function(progress) {
        return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5)
    };


    this.bounce = function(progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    };

    this.parabola = function(progress){
        var mod = progress;
        if(progress > .5){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    };

    this.doubleParabola = function(progress){
        var mod = progress;
        if(progress > .25 && progress < .5){
            mod = 0.5 - progress
        }else if(progress > .5 && progress < .75){
            mod = progress - 0.5
        }else if(progress > .75){
            mod = 1 - progress
        }
        return -(mod * mod) + 2 * mod
    };

    this.makeEaseInOut = function(delta) {
        return function(progress) {
            if (progress < .5)
                return delta(2*progress) / 2
            else
                return (2 - delta(2*(1-progress))) / 2
        }
    };


    this.makeEaseOut = function(delta) {
        return function(progress) {
            return 1 - delta(1 - progress)
        }
    };
};

window.animate = function(opts) {

    var start = new Date;
    var delta = opts.delta || linear;

    var timer = setInterval(function() {
        var progress = (new Date - start) / opts.duration;

        if (progress > 1) progress = 1;

        opts.step( delta(progress) );

        if (progress == 1) {
            clearInterval(timer);
            opts.complete && opts.complete();
        }
    }, opts.delay || 13);

    return timer;
};