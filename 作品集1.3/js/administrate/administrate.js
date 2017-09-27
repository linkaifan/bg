$(document).ready(function(){
;(function (){
	var DeleteIndex = 0,	//定义删除时候用于判断的index变量
		token = sessionStorage.getItem("token");
		console.log(token);
	/*加载后台数据内容*/
	$.ajax({
	  url: 'http://139.199.18.137:7777/api/projects',
	  type: 'GET',
	  success: function (data, status) {
	    console.log(data);
	    var preImg = 'http://139.199.18.137:7777/upload/',
	    	ShowGroup = [],
	    	idlength = data.data.length,
	    	idIndex = -1;
	    function FcreatShow(n){					//创建show对应作品
	    	
	    	var p = '<div class="Show'+data.data[n].id+' Show"><img src='+preImg+data.data[n].pic+' alt="show'+n+'"><p class="ShowText"><span>'+data.data[n].title+'</span><br/><a href="#" class="editBtn">编辑</a><a href="#" class="deleteBtn">删除</a></p></div>';
	    	return p;
	    }
	    for (var i = 0; i < idlength; i++) {		//将其添加到main上
	    	ShowGroup[i] = FcreatShow(i);
	    	$('main').append(ShowGroup[i]);
	    }
	    $('.Show').tap(function (event) {							//事件冒泡
	    	if (event.target.className === 'deleteBtn') {
	    		DeleteIndex = $(event.target).parent().parent().attr("class").substring(4,6);			//当点击删除按钮弹出pop时，记录点击的是第几个作品
	    		sessionStorage.setItem("DeleteIndex", DeleteIndex); 
	    		$('.Mask').fadeIn();

	    	}
	    	else if(event.target.className === 'editBtn'){				//点击对应的编辑按钮跳到对应的编辑页面
	    		idIndex = $(event.target).parent().parent().attr("class").substring(4,6);		//获取点击按钮属于哪个id
	    		sessionStorage.setItem("idIndex", idIndex); 
	    		window.open('edit.html','_self');
	    	}
	    });
	 	
	  },
	  fail: function (err, status) {
	    console.log(err);
	  }
	});

	/*各个按钮点击事件*/
	$('header a img').tap(function(){
		window.open('homepage.html','_self');
	});

	$('.glyphicon-remove').tap(function(){			//X，取消，按钮事件
		if (sessionStorage.getItem("DeleteIndex")) {		//判断是否存在，如果已存在，将其清除；
			sessionStorage.removeItem("DeleteIndex");
		}
		$('.Mask').fadeOut();
	});
	$('.popUpCancel').tap(function () {
		if (sessionStorage.getItem("DeleteIndex")) {		//判断是否存在，如果已存在，将其清除；
			sessionStorage.removeItem("DeleteIndex");
		}
		$('.Mask').fadeOut();
	});
	$('.upLoad').tap(function (event) {				//点击上传作品，跳转到全新的编辑页面,id默认为-1
		if (sessionStorage.getItem("idIndex")) {		//判断是否存在，如果已存在，将其清除；
			sessionStorage.removeItem("idIndex");
		}
		window.open('edit.html?','_self');
		return false;
	});
	$('.popUpDelete').tap(function(event){				//删除特定作品
		alert(DeleteIndex);
		$.ajax({
		  url: 'http://139.199.18.137:7777/api/projects/'+DeleteIndex,
		  headers:{'Authorization':'Bearer '+ token},
		  type: 'DELETE',
		  success: function (data, status) {

		    alert('Delete');
		    sessionStorage.removeItem("DeleteIndex");	
		    window.open('administrate.html','_self');

		  },
		  fail: function (err, status) {
		    console.log(err);
		  }
		});
	});	

})();
});