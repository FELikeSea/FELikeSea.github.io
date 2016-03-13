//首页的js代码封装
(function(){
    $(function(){
        $(window).resize();
    });//ready

    $(window).resize(function(){ 
        $("#firstPage").css("height", $(window).height());
        //修复小窗口下显示交叉问题
        if($(window).height()>=702){
        	$(".memberPages,#moment").css("height", $(window).height());	
        }else{
        	$(".topLine,.bottomLine").hide();
        }
        
        //首页文字slidedown效果
        
        $('.blockTitle').stop().fadeIn("normal").animate({
            "top" : ($(window).height() - $('.blockTitle').outerHeight())/2
        },500); 
    });

    $(window).on('click',function(e){
        startProgress();
        $(window).unbind('click');
    })

    var currProgress = 0; 
    var done = false; 
    var total = 100; 

    function startProgress() { 
        var prBar = document.getElementById("prog"); 
        var val = document.getElementById("numValue"); 
        prBar.value = currProgress; 
        val.innerHTML = Math.round((currProgress/total)*100)+"%"; 
        currProgress++; 
        if(currProgress>100){
            done=true; 
        }
        if(!done) {
            setTimeout(startProgress, 10);
        }else{ 
            done = false; 
            currProgress = 0; 
        } 
    } 

})();
//teamMembers模块
(function(){
	var num=0;
	$("#moment").mouseover(function(){
		if(num==0){
			$("#circle").show().animate({top:"160px"},600).animate({top:"160px"},2000).animate({top:"-100px"},600);
			var t=0;
			var angle = 0;
			setTimeout(function(){
				if(t>200){
					return;
				}else{
					t++;
					angle+=8;
			     $("#circle").rotate(angle);
			     setTimeout(arguments.callee,10)
				}
			      
			},20);
			num=1;
		}
	});
	
	//teamMembers页面article元素垂直居中
	if($(window).height()<702){return;}
	var h=($(window).height()/2-351)+"px";
	$("article,#momentPage").css("top",h);
	//页面随滑轮而滚动到下一页
	$(function() {
		$(".panel").css({"height":$(window).height()});
		var timer;
		$(window).resize(function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				$(".panel").css({"height":$(window).height()});
			},40);
		});
	
		$.scrollify({
			section:".panel"
		});
		
		$(".scroll").click(function(e) {
			e.preventDefault();
			$.scrollify("move",$(this).attr("href"));
		});
	});
})();

//页面下滑至homePage页面
$(function(){
        $('#homePage').on('scrollSpy:enter', function() {
            timer = setInterval(showImg,50);
	});
        
        function showImg(){
            var set = document.getElementsByClassName('img-set')[0];
            set.style.left = (set.offsetLeft + 10) + 'px';
            set.style.display = 'block';
            if(set.offsetLeft>=358){
                clearInterval(timer);
            }
        }
        
	$('#homePage').on('scrollSpy:exit', function() {
		console.log('exit:', $(this).attr('id'));
	});

	$('#homePage').scrollSpy();
})