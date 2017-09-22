$(function(){  
    var Fbg = (function(){
    	//判断是pc还是移动端
    	function IsPC(){    
    	     var userAgentInfo = navigator.userAgent;  
    	     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
    	     var flag = true;    
    	     for (var v = 0; v < Agents.length; v++) {    
    	         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
    	     }    
    	     return flag;    
    	  }  
    	var isPC = IsPC();



		//jq对象运动框架
    	function startMove($obj, json, fnEnd)                
    	{
    		clearInterval($obj.timer);
    		$obj.timer=setInterval(function (){
    			var bStop=true;		//假设：所有值都已经到了
    			
    			for(var attr in json)
    			{
    				var cur=0;
    				
    				if(attr=='opacity')
    				{
    					cur=Math.round(parseFloat($obj.css(attr))*100);
    				}
    				else
    				{
    					cur=parseInt($obj.css(attr));
    				}
    				
    				var speed=(json[attr]-cur)/50;
    				speed=speed>0?Math.ceil(speed):Math.floor(speed);
    				
    				if(cur!=json[attr])
    					bStop=false;
    				
    				if(attr=='opacity')
    				{
    					$obj.css('opacity',(cur+(speed))/100);

    				}
    				else
    				{
    					$obj.css(attr,cur+speed+'px');
    				}
    			}
    			
    			if(bStop)
    			{
    				clearInterval($obj.timer);
    							
    				if(fnEnd)fnEnd();
    			}
    		}, 50);
    	}

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
    		if (true) {
    			
	    		var self = this,
	    			control = 3;
	    		window.addEventListener("deviceorientation", function(event) {
	    			var gamma = event.gamma,
	    				beta = event.beta;
					$('.roate').find('span').eq(2).html(gamma);
					$('.roate').find('span').eq(1).html(beta);

					if ( gamma > control) {

						$('.roate').find('span').eq(3).html('向右');

					}
					if ( gamma < -control) {


						$('.roate').find('span').eq(3).html('向左');
						
					}

					//判断设备向上还是向下
					if ( beta > control) {
											
						startMove(self.$el.find('img:even'),{top:200});
						startMove(self.$el.find('img:odd'),{top:600});
						$('.roate').find('span').eq(0).html('向下');

						
					}
					if ( beta < -control) {
						startMove(self.$el.find('img:odd'),{top:800});
						startMove(self.$el.find('img:even'),{top:20});
						$('.roate').find('span').eq(0).html('向上');
						
					}
	    		}, false);
	    		
    		}
    	};
    	Bg.prototype.unbind = function(){
    		//this.$el.off();
    	};

    	var init = function(el,options){			//初始化
    		var $el = $(el),	
    			bg = $el.data('bg');
    		if (!bg) {							//单例模式
    			bg = new Bg(el,typeof options === '$object' && options);
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