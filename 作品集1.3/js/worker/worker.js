//填补数据
var lengthnum = 0;

reloadpage();

function reloadpage() {
	$.ajax({
		type: "get",
		url: "http://139.199.18.137:7777/api/projects",
		datatype: "json",
		success: function(data) {
			introduce=data;
			rightdata(data);
			/*$("ul").html("")*/
			$("#main").html("")
			lengthnum = Object.keys(data.data).length;
			permax = Number(6.4) + Number(23.4) * lengthnum;
			swp1 = lengthnum - 1;
			ioopimg(data);
		},
		error: function(jqXHR) {
			alert("发生错误:" + jqXHR.status)
		},

	})
}

//加载第一个项目的详细信息

function rightdata(data) {
	$(".titleStyle").text("" + data.data[0].title + "");
	$(".introStyle").text("" + data.data[0].intro + "");
    $(".contentStyle").text("" + data.data[0].content + "");
}



//加载轮播图				
function ioopimg(data) {
	$("#main").append("<img class=\"imgfrist\" id=\"img0\"/>");
	$("#img0").css("top", 0 + "%");
	$("#img0").attr("src", data.data[0].pic.replace(/image\//g,'http://139.199.18.137:7777/upload/image/'));
	for (var i = 1; i < lengthnum; i++) {
		var num = "img" + i;
		var text = "text" + i;
		var topnum = Number(6.4) + Number(23.4) * i + "%";
		$("#main").append("<img class=\"imgother\" id=\"" + num + "\"/>");
		$("#" + num + "").css('top', topnum);
		$("#" + num + "").attr("src", data.data[i].pic.replace(/image\//g,'http://139.199.18.137:7777/upload/image/'));
	};
};

//轮播
var timer, timer1, timer2;
var j;
var main = document.getElementById("main");

//点击后轮播

function play1() {
    timer1 = setInterval(turn, 300)
}

function stop1() {
    clearInterval(timer1);
}
//正常轮播

function play() {
    timer = setInterval(turn, 5000)
}

function stop() {
    clearInterval(timer);
}

function play2() {
    timer2 = setInterval(turn, 600)
}

function stop2() {
    clearInterval(timer2);
}
//滑动长距离轮播

function play2() {
    timer2 = setInterval(turn, 10)
}

function stop2() {
    clearInterval(timer2);
}
//开始与结束轮播
var right = document.getElementById("right");
// var openBtn = document.getElementById("openBtn");
// openBtn.addEventListener("touchstart", play);
// var linkBtn = document.getElementById("linkBtn");
//通过改变top值来轮播 change: 修改了轮播方式 
// linkBtn.addEventListener("touchstart", stop);
turn = function turn(i) {
    if (i === undefined) {
        i = 1;
    }
    if (i == 0) {
        //	$("main").bind('click','.imgother', mainClick)
        return
    }
    //$('#main').unbind('click')	
    var newFirst = $('.imgfrist').eq(0).next().removeClass('imgother').addClass('imgfrist')
    var oldFirst = $('.imgfrist').eq(0).remove().appendTo($('#main')).removeClass('imgfrist').addClass('imgother')
    if (i == 1) {
        showobject(newFirst.attr("id")[3])
    }
    return turn(--i)

}
backTurn = function backTurn(i) {
        if (i === undefined) {
            i = 1;
        }
        if (i == 0) {
            //	$("main").bind('click','.imgother', mainClick)
            return
        }
        //$('#main').unbind('click')	
        var imgNums = $('#main').find('img').length
        var oldsFirst = $('.imgfrist').eq(0).removeClass('imgfrist').addClass('imgother')
        var newsFirst = $('.imgother').eq(imgNums - 1).remove().prependTo($('#main')).removeClass('imgother').addClass('imgfrist')

        if (i == 1) {
            if (oldsFirst.attr("id")[3] == 0) {
                showobject(imgNums - 1)
            } else {
                showobject(oldsFirst.attr("id")[3] - 1)
            }
        }
        return backTurn(--i)
    }
    //#main 点击时触发函数
function mainClick(e) {
    stop();
    for (j = 0; j < lengthnum; j++) {
        per2 = (parseInt($(this).css("top")) * 100 / parseInt($("#container").css("height")) + 0.2).toFixed(1)
        per1 = (parseInt($("#img" + j + "").css("top")) * 100 / parseInt($("#container").css("height")) + 0.2).toFixed(1);
        if (per1 >= 0 && per1 < 15) {
            docu = Math.round((per2 - 6.4) / 23.4)
        }
    }

    turn($(this).index())
    if (!(timer1 == undefined)) {
        stop1()
    }
    setTimeout('play()', 800)
}
//引入touchSwipe插件实现上划时，插件滚动1个项目

//重载右侧项目详情函数

function showobject(l) {
    $.ajax({
        type: "get",
        url: "http://139.199.18.137:7777/api/projects",
        datatype: "json",
        success: function(data) {
            $(".titleStyle").text("" + data.data[l].title + "");
            $(".introStyle").text("" + data.data[l].intro + "");
            $(".contentStyle").text("" + data.data[l].content + "");
        }
    })
};

//获取滑动距离
var i;
var el = document.querySelector('#main');
var startPosition, endPosition, deltaX, deltaY, moveLength;
var mNum

el.addEventListener('touchstart', function(event) {
    stop();
    mNum = $('#main').find('#' + event.target.id).index()
})
end = 0;
start = 0;
startTime = 0;
endTime = 0;
el.addEventListener('touchmove', function(event) {
    // console.log(new Date().getTime())
    startTime = new Date().getTime()
    start = event.changedTouches[0].clientY
    if (!end) {
        end = event.changedTouches[0].clientY;
        endTime = new Date().getTime()
    } else {
        if (end - start > 70) {
            if ((startTime - endTime) < 100) {
                turn(1);
                setTimeout('turn(1)', 150)
                setTimeout('turn(1)', 350)
                setTimeout('turn(1)', 600)

            } else {
                turn(1);
                end = start;
            }
        } else if (start - end > 70) {
            backTurn(1)
            end = start;
        }
    }
})
el.addEventListener('touchend', function(event) {
    end = 0;
    endTime = 0;
    play();
})
$('#main').on('touchmove', function(event) { event.preventDefault(); });