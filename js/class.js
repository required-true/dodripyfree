// (적용할 객체), 속도 (0~1), 오버시 멈춤(boolean) 
function JackSlider(SelectName,speed,onoff){

//init
  var $this=this;
  $this._$sliderUl=$(SelectName);
  $this._$sliderLi=$(".jacks_items");
  $this._currentX=$this._$sliderUl.position().left;
  $this._movingX=-(speed);
  $this._stopPlay=onoff;

//interval
  $this._autoPlay=setInterval(_setPlaySlider,1)
  
//event
  $this._$sliderUl.on("mouseenter",function(){
    if($this._stopPlay==true){
      clearInterval($this._autoPlay);
    }
  })
  $this._$sliderUl.on("mouseleave",function(){
    if($this._stopPlay==true){
      $this._autoPlay=setInterval(_setPlaySlider,1)
    }
  })

//function
  function _setPlaySlider(){
    $this._currentX+=$this._movingX;
    if($this._currentX<=(-$this._$sliderLi.innerWidth())){
      $this._$sliderLi=$this._$sliderUl.children(".jacks_items");
      $this._$sliderLi.first().appendTo($this._$sliderUl);
      $this._currentX=0;
    }
    $this._$sliderUl.css({"left":$this._currentX}); 
  }
}
