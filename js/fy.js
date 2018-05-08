var yt = yt || {};

//加载图片
yt.loadImg = function ($imgs, time) {
    var _time = 0;
    time = time || 200;

    $imgs.each(function () {
        var $that = $(this);
        if ($that.data('hasload')) {
            return false;
        }
        setTimeout(function () {
            $that.fadeOut(0);
            $that.attr('src', $that.data('src'));
            $that.attr('data-hasload', 'true');
            $that.fadeIn(500);
        }, _time);
        _time += time;
    });
};



//wap端环境
yt.isWap = function () {
    var s = navigator.userAgent.toLowerCase();
    var ipad = s.match(/ipad/i) == "ipad"
        , iphone = s.match(/iphone os/i) == "iphone os"
        , midp = s.match(/midp/i) == "midp"
        , uc7 = s.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
        , uc = s.match(/ucweb/i) == "ucweb"
        , android = s.match(/android/i) == "android"
        , ce = s.match(/windows ce/i) == "windows ce"
        , wm = s.match(/windows mobile/i) == "windows mobile";
    if (iphone || midp || uc7 || uc || android || ce || wm || ipad) { return true; }
    return false;
};

//滑动绑定
yt.app = function () {
   
    var $swiperContainer = $("#swiper-container1"),
        $pages = $("#wrapper").children(),
        $as = $("#nav li a"),
        $lis = $("#nav li"),
        $win =$(window),
        slideCount = $pages.length,
        nowIndex = 0,
        acn = "animation",
        mySwiper,
        ssTime;

 

    //设置布局
    var setLayout = function () {
        var $wrapers = $("#swiper-container1 .wraper"),
            $wraper1 = $("#wraper1"),
       
            isWap=yt.isWap(),
            w = 720,
            h = 1135;
        var sl = function () {
            var _w = $wraper1.width(),
                h = $win.height(),
                _h = isWap && _w<h?$win.height():_w * 1135 / 720;
            $wrapers.height(_h);
            if($win.height()<300){
                $(".cn-slidetips").hide();
            }else{
                $(".cn-slidetips").show();
            }
        };
        sl();
        $win.resize(sl);
    };



    //触摸结束绑定
    
    var onTouchEnd = function () {
        var index = mySwiper.index;
        if (nowIndex == slideCount-1 && +mySwiper.touches['diff'] <-50) {
            return mySwiper.swipeTo(0);
        }
    };



    //滑动结束绑定
    var onSlideChangeEnd = function () {
        // 加载图片
        $("#swiper-container1 .swiper-slide img").each(function(){
            if($(this).attr("data-src")){
                $(this).attr("src",$(this).attr("data-src"));
            }
        });

        // 百度统计
//      var lm = $(".lm").eq(mySwiper.activeIndex).attr("lanmu");
//      var hmID = comInfo+lm+'_PV';
//      _hmt.push(['_trackEvent', zhan_name,city_name+'_滑屏PV' , hmID]);
//      var page = mySwiper.activeIndex+1;
//      ga('send', 'event', zhan_name, city_name+'_滑屏PV', city_name+'_'+lm+'_PV_'+page);

    };



    //绑定滑动主函数
    var bindSwiper = function () {
        mySwiper = $swiperContainer.swiper({
            onTouchEnd: onTouchEnd,
            onSlideChangeEnd: onSlideChangeEnd,
            mode: 'vertical',
            // loop:true,
            pagination :"#pagination1"
            
        });
    };
    //滑动2 绑定内页滑动函数
    var bindSwiper2 = function () {
        $(".swiperModule").each(function(){
            var row = parseInt($(this).attr('data-row'));
            var column = parseInt($(this).attr('data-column'));
            if(row == 0 || column == 0){
                //
            }else{
                if(row == 3 && column == 3){  //3行 3列
                    $(this).addClass("swiperModule1");
                }else if(row == 2 && column == 3){  //2行 3列
                    $(this).addClass("swiperModule2");
                }else if(row == 2 && column == 2){  //2行 2列
                    $(this).addClass("swiperModule3");
                }else if(row == 1 && column == 2){  //1行 2列
                  $(this).addClass("swiperModule4");
                }else if(row == 1 && column == 1){  //1行 1列
                  $(this).addClass("swiperModule5");
                }



                var paginationDom ="#"+ $(this).attr("id")+" .pagination";
                // console.log(paginationDom)
                
                var mySwiper2 = $(this).find(".swiper .swiper-container").swiper({
                    mode: 'horizontal',
                    loop: true,
                    pagination: paginationDom,
                    onSlideChangeEnd: function (){
                    // 页面广告滑动绑定埋点
                    ga('send', 'event', zhan_name, city_name+'_页面轮播图片', city_name + '_PageADView');       
                }
                });
            }
        });
      
    };

    //滚到下一个屏  
    var bindNext = function () {
        $(".next").on("click", function () {
            mySwiper.activeIndex = mySwiper.activeIndex || 0;
            var index = mySwiper.activeIndex == slideCount - 1 ? 0 : (mySwiper.activeIndex||0) + 1;
       
            mySwiper.swipeTo(index);
        });
    };




    // 后台布点用数据
//  var zhan_id = $("#baoming").attr("data-zhan");
//  var c_id = $("#baoming").attr("data-id");
//  var from = $("#baoming").attr("data-from");
    // 百度布点用数据
//  var zhan_name = $("#zhan_name").val();
//  var city_name = $("#city_name").val();
//  var tab_name = $("#tab_name").val();
//  var comInfo = tab_name+'_'+city_name+'_';

    
    //初始化
    bindSwiper();
    bindSwiper2();
    bindNext();
    setLayout();

    // 打开关闭通用提示
    function comTips(text){
        $("#comTips .tipsBody").html(text);
        $("#comTips").show();
    }
    
    $("#comTips .tipsClose").click(function(){
        $("#comTips .tipsBody").html("");
        $("#comTips").hide();
    });

    
};
//初始化
yt.init = function () {

    window.onload = function () {
    
        $("#loading").hide();
        setTimeout(yt.app);
        
        var w = $(window).width();
        var h = $(window).height();
        // console.log(w+" , "+h+" , "+h/w)
        if(h/w<1.41){
            $("#swiper-container1").addClass("fat");
        }
    };

 
};
yt.init();