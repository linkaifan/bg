$(function(){  
    var Fbg = (function(){
    	//创建一个Bg的类
    	var Bg = function(el,options){
    		this.$el = $(el);
    		this.options = $.extend({},Bg.DEFAULTS,options);

    	};
    	Bg.DEFAULTS = {
    		imgNum:7
    	};

    	Bg.prototype.init = function(){
    		this.bulidHTML();
    		this.setCSS();
    		this.bindEvent();
    	};
    	Bg.prototype.bulidHTML = function() {
    		var html = '',
    			num = this.options.imgNum;
    		for (let i = 0; i < num; i++) {
    			html += `<img src="img/bg${i+1}.png" alt="" class="bg bg${i+1}">`;
    		}
    		this.$el.html(html);


    	};
    	Bg.prototype.setCSS = function() {
    		var StyleNode = document.createElement('style'),
    			css = `
    				.bg-contain{
    					position: relative;
    					height: 900px;
    					width: 100%;
    				}
    				.bg-contain img:nth-of-type(even){
    					width: 100px;
    					height: 100px;
    				}
    				.bg-contain img:nth-of-type(odd){
    					width: 50px;
    					height: 50px;			
    				}
    				.bg{
    					position: absolute;
    				}
    				.bg1{
    					left: 60px;
    					top: 10px;
    				}
    				.bg2{
    					right: 200px;
    					top: 5px;
    				}
    				.bg3{
    					right: 100px;
    					top: 500px;
    				}
    				.bg4{
    					right: 0px;
    					top: 200px;
    				}
    				.bg5{
    					left: 100px;
    					top: 600px;
    				}
    				.bg6{
    					left: 20px;
    					top: 650px;
    				}
    				.bg7{
    					left: 400px;
    					top: 800px;
    				}
    			`;
    			StyleNode.innerHTML = css;
    			document.getElementsByTagName('head')[0].appendChild(StyleNode);
    	};
    	Bg.prototype.bindEvent = function(){
    		var self = this,
    			$BgImg = self.$el.find('img');
    		window.addEventListener("deviceorientation", function(event) {
    					if (event.beta > 60) {
    						$BgImg.eq(0).animate({top:'250px'});
    					}
    					if (event.beta < -60) {
    						$BgImg.eq(0).animate({top:'100px'});

    					}
    				 }, true);
    	};
    	Bg.prototype.unbind = function(){
    		//this.$el.off();
    	};

    	var init = function(el,options){			//初始化
    		var $el = $(el),	
    			bg = $el.data('bg');
    		if (!bg) {							//单例模式
    			bg = new Bg(el,typeof options === 'object' && options);
    			$el.data('bg',bg);
    			bg.init();
    		}
    		if (typeof options === 'string') {
    			bg[options]();
    		}
    	};


    	//扩展成jq插件
    	$.fn.extend({
    		bg:function(options){
    			return this.each(function(){
    				init(this,options);
    			});
    		}
    	});

    	return {
    		init:init
    	};



    })();
    $('.bg-contain').bg({});
});  