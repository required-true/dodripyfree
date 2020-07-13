$(document).ready(function(){
  headerEffect(); //헤더 서치이벤트, 스크롤 이벤트
  headerBurgerMenu() // 버거메뉴 이벤트
  mainVisualEffect(); //비주얼높이값 맞추기, 폰트이펙트
  brandPageEffect(); // 브랜드 패러랙스 이펙트 //헤더 메뉴 스크롤 이벤트
  guideVidEffect(); //가이드비디오 이동영역 이벤트
  storePageEffect(); // 팝업 , 어사이드메뉴 효과
  communityEffect();
})


function headerEffect(){
  // 검색 영역
  var $search=$(".search_icon");
  var $openBox=$(".search_openbox");
  var $searchFont=$search.children("a");
  var $cancelFont=$("<a href='#;' title='검색영역닫기'><i class='fas fa-times'></i></a>")
  var isOpen=false;
  // 스크롤 영역
  var scrollHeight=$(document).scrollTop();
  var newScrollHeight;
  // 메인메뉴 영역
  var $mainMenu=$("#mainmenu_list").children().find("a");
  var mainMenuIndex;
  var mainMenuTop=[];
  mainMenuTop[0]=($("#brand_wrap").offset().top)-140;
  mainMenuTop[1]=($("#guide_wrap").offset().top)-140;
  mainMenuTop[2]=($("#store_wrap").offset().top)-140;
  mainMenuTop[3]=($("#community_wrap").offset().top)-140;
  // 이벤트
  $search.on("click",openSearchBox);
  $(window).on("scroll",onScroll);
  $mainMenu.on("click",goMainMenu);
  // 메인메뉴 함수
  function goMainMenu(){
    mainMenuIndex=$mainMenu.index($(this));
    $("body:not(:animated),html:not(:animated)").animate({scrollTop:mainMenuTop[mainMenuIndex]},500,"easeOutCubic");
  }
  // 검색 함수
  function openSearchBox(){
    if(isOpen==false){
      $openBox.show().stop().animate({"width":100+"%"},500,"easeOutCubic");
      $searchFont.remove();
      $cancelFont.appendTo($search);
      isOpen=true;
    }else if(isOpen==true){
      $openBox.stop().animate({"width":0},500,"easeOutCubic",function(){$(this).hide()});
      $cancelFont.remove();
      $searchFont.appendTo($search);
      isOpen=false;
    }
  }
  // 스크롤 함수
  function onScroll(){
    newScrollHeight=$(document).scrollTop();
    // scrollHeader(); -- 위로 스크롤시 헤더 활성화 함수
    mainMenuActive();
  }
  function mainMenuActive(){
    if(newScrollHeight<mainMenuTop[0]*0.8){
      mainMenuIndex=undefined;
    }else if(newScrollHeight>=mainMenuTop[0] && newScrollHeight<mainMenuTop[1]*0.9){
      mainMenuIndex=0;
    }else if(newScrollHeight>=mainMenuTop[1]*0.9 && newScrollHeight<mainMenuTop[2]*0.9){
      mainMenuIndex=1;
    }else if(newScrollHeight>=mainMenuTop[2]*0.9 && newScrollHeight<mainMenuTop[3]*0.9){
      mainMenuIndex=2;
    }else if(newScrollHeight>=mainMenuTop[2]*0.9){
      mainMenuIndex=3;
    }
    $mainMenu.removeClass("selected");
    $mainMenu.eq(mainMenuIndex).addClass("selected");
  }
  // function scrollHeader(){ //  -- 위로 스크롤시 헤더 활성화 함수
  //   if(newScrollHeight-scrollHeight>0){
  //     $("#header_wrap:not(:animated)").animate({"top":-66,"opacity":0},300,"easeOutCubic",function(){$(this).hide()});
  //   }else{
  //     $("#header_wrap:not(:animated)").show().animate({"top":0,"opacity":1},300,"easeOutCubic");
  //   }
  //   scrollHeight=newScrollHeight;
  // }
}
function headerBurgerMenu(){
  var $openMenu=$("#open_menu");
  var $burgerFont=$(".menu_icon").children("a")
  var $cancelFont=$("<a href='#;' title='메뉴영역닫기'><i class='fas fa-times'></i></a>");
  var isOpen=false;
  var $menuList=$(".menu_list").children().find("a");
  var menuIndex=0;
  init();
  event();
  function init(){
    $openMenu.css({"width":$(window).innerWidth(),"left":$openMenu.innerWidth()});
  }
  function event(){
    $(".menu_icon").on("click",clickMenu);
    $menuList.on("mouseenter",overMenuList);
    $menuList.on("mouseleave",outMenuList);
  } 
  function clickMenu(){
    if(isOpen==false){
      activeBigMenu(0);
      changeUsbg(0);
      $openMenu.show().stop().animate({"left":0},500,"easeOutCubic");
      $(".menu_icon").html($cancelFont);
      $("body").css({"overflow":"hidden"});
      isOpen=true;
    }else{
      $openMenu.stop().animate({"left":$openMenu.innerWidth()},500,"easeOutCubic");
      $(".menu_icon").html($burgerFont);
      $("body").css({"overflow":"scroll"});
      isOpen=false;
    }
  }
  function overMenuList(){
    menuIndex=$menuList.index($(this));
    activeBigMenu(menuIndex);
    changeUsbg(menuIndex);
  }
  function activeBigMenu(index){
    $menuList.removeClass("selected");
    $menuList.eq(index).addClass("selected");
  }
  function changeUsbg(index){
    $(".menubg_area").css({"left":-100,"opacity":0.5,"background":"url('/images/usbg0"+index+".jpg')no-repeat center/cover"})
    $(".menubg_area").stop().animate({"left":0,"opacity":1},500,"easeOutCubic");
  }
  function outMenuList(){
    $menuList.removeClass("selected");
  }
}
function mainVisualEffect(){
  var $visText=$("#vis_text_wrap").children("p");
  visTextTimeOut();
  resizeHeight();
  event();
  function event(){
    $(window).on("resize",resizeHeight)
  }
  function resizeHeight(){
    $("#visual_wrap").css({"height":$(window).innerHeight()});
    $("#main_vid").css({"height":$(window).innerHeight()});
  }
  function visTextTimeOut(){
    $visText.eq(0).animate({"left":0,"opacity":1},2000,"easeOutCubic",function(){
      for(let i=1; i<4; i++){
        var visTimer=setTimeout(function(){
          $visText.eq(i).animate({"left":0,"opacity":1},1000,"easeOutCubic");
        },750*i)
      }
    });
  }
}
function brandPageEffect(){
  //브랜드영역
  var $brandMenu=$(".brand_menu");
  var $brandMenuLi=$(".brand_menu_list").children().find("a");
  var brandMenuIndex;
  var brandMenuTop=[];
  brandMenuTop[0]=($("#brand_wrap").offset().top);
  brandMenuTop[1]=($("#title_identity").offset().top-100);
  $brandMenu.css({"height":$(window).innerHeight()});
  //브랜드 쇼애니메이션영역
  var $storyLi=$(".story_list").children();
  var storyCount=$storyLi.size();

  //메인메뉴 클릭 스크롤
  var newTop;
  var heightArray=[];
  heightArray[0]=$("#brand_wrap").offset().top;
  heightArray[1]=$("#guide_wrap").offset().top;

  // 일러스트패러랙스
  var $iconWrap=$("#parallax_wrap");
  var $kettle=$(".parallax_kettle");
  var $water=$(".parallax_water");
  var $coffee=$(".parallax_coffee");
  var $drop=$(".parallax_drop");

  //이벤트
  $(window).on("scroll",onScroll);
  $brandMenuLi.on("click",goBrandMenu);
  // 스크롤 이벤트 함수
  function onScroll(){
    newTop=$(document).scrollTop();
    asideOnScroll(); // 메뉴영역 패러랙스 스크롤 이벤트
    bodyOnScroll(); // 본문영역 스크롤 이벤트
    listAnimation(); // 본문영역 
    parallaxIcon();
  }
  function parallaxIcon(){
    if(newTop>0 && newTop<brandMenuTop[0]){
      $water.removeClass("water.selected");
    }else if(newTop>=brandMenuTop[0] && newTop<1600){
      $drop.removeClass("drop_selected");
      $water.addClass("water_selected");
    }else if(newTop>=1600 && newTop<heightArray[1]-$brandMenu.innerHeight()){
      $water.removeClass("water_selected");
      $drop.addClass("drop_selected");
      $coffee.css({"top":900-(newTop/9)});
    }else{
      $drop.removeClass("drop_selected");
    }
  }
  function listAnimation(){
    if(newTop>=brandMenuTop[0]*0.8 && newTop<brandMenuTop[1]*0.8){
      for(var i=0; i<=storyCount; i++){
        $storyLi.eq(i).animate({"opacity":1,"top":0},1000+(500*i),"easeOutCubic");
      }
    }else if(newTop>=brandMenuTop[1]*0.8){
      $(".brand_identity").animate({"opacity":1,"left":0},1000,"easeOutCubic");
    }
  }
  function asideOnScroll(){
    if(newTop>=heightArray[0] && newTop<heightArray[1]-$brandMenu.innerHeight()){
      $brandMenu.css({"top":newTop-heightArray[0]});
      $iconWrap.css({"top":newTop-heightArray[0]});
    }
  }
  function bodyOnScroll(){
    if(newTop>=brandMenuTop[0]*0.8 && newTop<brandMenuTop[1]*0.8){
      brandMenuIndex=0;
    }else if(newTop>=brandMenuTop[1]*0.8){
      brandMenuIndex=1;
    }
    subMenuActive(brandMenuIndex);
  }
  // 서브메뉴 이벤트 함수
  function goBrandMenu(){
    brandMenuIndex=$brandMenuLi.index($(this));
    subMenuScroll(brandMenuIndex);
    // subMenuActive(brandMenuIndex);
  }
  function subMenuActive(index){
    $brandMenuLi.removeClass("selected");
    $brandMenuLi.eq(index).addClass("selected");
  }
  function subMenuScroll(index){
    $("body,html").stop().animate({scrollTop:brandMenuTop[index]},500,"easeOutCubic");
  }
}
function guideVidEffect(){
  // 변수
  // aside
  var $guideMenu=$(".guide_menu_list").children().find("a");
  // body
  var $guideVids=$(".guide_vids");
  var $guideListLi=$(".guide_list").children();
  var $subguideList=$(".subguide_list").children("li");
  var $activeLi;
  var movingWidth=$subguideList.innerWidth()+($subguideList.innerWidth()/19);
  var movingHeight=$subguideList.innerHeight();
  var guideMenuIndex=1;
  var guideVidIndex=1;
  var currentX;
  // 초기설정
  // $("#guide_wrap,#guide_bg").css({"height":$(window).innerHeight()});
  event();  //이벤트
  function event(){
    $guideMenu.on("click",guideMenuClick);
    $(".up_btn").on("click",subMenuUp);
    $(".down_btn").on("click",subMenuDown);
    $(".left_btn").on("click",subMenuLeft);
    $(".right_btn").on("click",subMenuRight);
  }
  function guideMenuClick(){ //메뉴영역 클릭시
    guideMenuIndex=$guideMenu.index($(this));
    positionReset();
    asideActive(guideMenuIndex);
    bodyAnimate(guideMenuIndex);
    bodyVidActive(guideMenuIndex);
  }
  function subMenuUp(){ // 위버튼 클릭시
    if(guideMenuIndex>0){
      guideMenuIndex--;
      positionReset();
      asideActive(guideMenuIndex);
      bodyAnimate(guideMenuIndex);
      bodyVidActive(guideMenuIndex);
    }
  }
  function subMenuDown(){ // 아래버튼 클릭시
    if(guideMenuIndex<3){
      guideMenuIndex++;
      positionReset();
      asideActive(guideMenuIndex);
      bodyAnimate(guideMenuIndex);
      bodyVidActive(guideMenuIndex);
    }
  }
  function subMenuLeft(){ //왼쪽버튼 클릭시
    if(guideVidIndex>0){
      $activeLi=$(".guide_list").children(".active");
      currentX=$activeLi.position().left;
      $activeLi.filter(":not(:animated)").animate({"left":currentX+(movingWidth)},300,"easeOutCubic",function(){
        guideVidIndex--;
      });
      $subguideList.removeClass("selected");
      $activeLi.find("li").eq(guideVidIndex-1).addClass("selected");
    }
  }
  function subMenuRight(){ //오른쪽버튼 클릭시
    var maxVidNum=$guideListLi.size();
    if(guideVidIndex<maxVidNum){
      $activeLi=$(".guide_list").children(".active");
      currentX=$activeLi.position().left;
      $activeLi.filter(":not(:animated)").animate({"left":currentX-movingWidth},300,"easeOutCubic",function(){
        guideVidIndex++;
      });
      $subguideList.removeClass("selected");
      $activeLi.find("li").eq(guideVidIndex+1).addClass("selected");
    }
  }
  function asideActive(index){ // 메뉴영역 활성화 및 해당 li class 부여
    $guideMenu.removeClass("selected");
    $guideMenu.eq(index).addClass("selected");
    $guideListLi.removeClass();
    $guideListLi.eq(index).addClass("active")
  }
  function bodyVidActive(index){ // 해당메뉴 비디오영역 활성화
    $subguideList.removeClass("selected");
    $guideListLi.eq(index).children().find("li").eq(1).addClass("selected");
  }
  function bodyAnimate(index){ // 메뉴별 좌표이동
    if(index<=0){
      $guideVids.stop().animate({"top":movingHeight},300,"easeOutCubic");
    }else if(index>=1){
      $guideVids.stop().animate({"top":-movingHeight*(index-1)},300,"easeOutCubic");
    }
  }
  function positionReset(){ // 좌우 좌표 리셋
    $guideListLi.css({"left":0});
    guideVidIndex=1;
  }
}
function storePageEffect(){
  // 어사이드 메뉴 활성화
  var $storeMenuLiA=$(".store_menu_list").children().find("a");
  var storeMenuIndex=0;
  // 팝업 오픈/클로즈
  var $closeBtn=$("#pop_close_btn");
  var popupTop=$("#store_wrap").offset().top-($("#store_wrap").innerHeight()/2);
  var currentScroll;
  var isOpen=false;

  $(".store_body").load("/load/store00.html");

  $(window).on("scroll",onscroll);
  $closeBtn.on("click",closePopup);
  $storeMenuLiA.on("click",activeStoreMenu);

  function onscroll(){
    currentScroll=$(window).scrollTop();
    if(currentScroll>=popupTop && isOpen==false){
      $("#store_pop_wrap:not(:animated)").show().animate({"bottom":0},1000,"easeOutCubic",function(){
        isOpen=true;
      });
    }
  }
  function closePopup(){
    $("#store_pop_wrap:not(:animated)").animate({"bottom":-150},1000,"easeOutCubic",function(){
      $("#store_pop_wrap").hide();
    });
  }
  function activeStoreMenu(){
    storeMenuIndex=$storeMenuLiA.index($(this));
    $storeMenuLiA.removeClass("selected");
    $storeMenuLiA.eq(storeMenuIndex).addClass("selected");
    $(".store_body").load("/load/store0"+storeMenuIndex+".html");
    $("#drag_icon").show();
  }
}
function communityEffect(){
  var $communityList=$(".community_menu_list").children().find("a");
  var communityIndex=0;
  $(".community_body").load("/load/community00.html");
  event();

  function event(){
    $communityList.on("click",clickMenu);
  }
  function clickMenu(){
    communityIndex=$communityList.index($(this));
    activeCommunityMenu(communityIndex);
  }
  function activeCommunityMenu(index){
    $communityList.removeClass("selected");
    $communityList.eq(index).addClass("selected");
    $(".community_body").load("/load/community0"+index+".html");
  }

  // 슬라이드 클래스 만들기 전 코드
  // var $newsBox=$(".news_box");
  // var $newsLi=$newsBox.children("li");
  // var currentX=$newsBox.position().left;
  // var movingX=-0.5;

  // var autoPlay=setInterval(playAni,1)
  // function playAni(){
  //   currentX+=movingX;
  //   if(currentX<=-($newsLi.innerWidth())){
  //       $newsLi=$newsBox.children("li");
  //       $newsLi.first().appendTo($newsBox);
  //       currentX=0;
  //   }
  //   $newsBox.css({"left":currentX}); 
  // }
}


