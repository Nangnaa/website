window.addEventListener('load',function(){
    var h; // 윈도우의 높이에 관련된 변수입니다.
	var n=0; // 메뉴 번호에 관련된 변수입니다.
	var targety=0; // 상단 목표 위치에 관련된 변수입니다.
	var offsety=0; // 상단 위치에 관련된 변수입니다.
	var timer=0; // 현재 움직임에 관련된 타이머 변수입니다.
	var moving=false; // 현재 움직임 유무에 관련된 변수입니다.

	var container = document.getElementsByClassName('container')[0];
    var gnb = document.getElementById('GNB');  
	var menuList = gnb.children[0].children; 
	var pageList = [];     
	
	//각콘텐츠들을 배열변수 pageList에 각각 입력
	// for(var i=0; i<container.children.length; i++){
	// 	if(container.children[i].tagName == "SECTION"){
	// 		pageList.push(container.children[i]);
	// 	}
	// }

	//SECTION의 높이를 설정
    function init(){
		h = window.innerHeight;
		targety = n * h; 
		menuList[n].classList.add('active');

		for(var i=0; i<pageList.length;i++){
			pageList[i].style.height=h+'px';
		}
	}

	init();
    
	//화면의 크기에 따라서  SECTION의 높이를 설정
	window.addEventListener('resize', init);


	//스크롤 이벤트 적용하는 함수
	document.addEventListener('scroll', function(){

		timer = setInterval(function(){
                clearInterval(timer);     
                offsety = window.pageYOffset;
                // console.log('offsety:' + offsety)

				if(offsety < pageList[1].offsetTop){
					n=0;
				}
				else if(offsety < pageList[2].offsetTop){
					n=1;
				}
				else if(offsety < pageList[3].offsetTop){
					n=2;
                }
				else if(offsety < pageList[4].offsetTop){
					n=3;
                }
				else if(offsety < pageList[5].offsetTop){
					n=4;
                }else{
					n=5;
				}

				for(var i=0; i<menuList.length; i++){
                          if(i == n){
							  menuList[i].classList.add('active');
						  }else{
							  menuList[i].classList.remove('active');
						  }

				}//for(var i=0; i<menuList.length; i++){닫기


		},60);//timer = setInterval(function(){닫기

	});//document.addEventListener('scroll', function(){닫기

	
    //	하는 값을 계산하는 함수
	for(var i=0; i<menuList.length; i++){
		menuList[i].index = i;
		menuList[i].addEventListener('click',function(e){
             e.preventDefault();
			 if(moving) return;
			 offsety=window.pageYOffset;
			 n=e.currentTarget.index;
			 h=window.innerHeight
			 targety=n*h;
			 moveCategory(offsety,targety);
		});

	}

	//이동하는 함수
    function moveCategory(current,target){
		moving=true;
		var timer = setInterval(function(){
           if(target > current){//스크롤이 아래로 이동할때
                  if(Math.abs(target-current)>100){//스크롤이 아래로 가는 애니메이션의 진행여부를 결정하는 제어문
					  current += 100;
				  }else{
					current = target;
					moving = false;
					clearInterval(timer);

					//현재 스크롤의 값을 타겟의 스크롤값을 비교해서 해당하는 대상에 클래스 적용
					for(var i=0; i<menuList.length; i++){
						if(i == n){
							menuList[i].classList.add("active");
						}
						else{
							menuList[i].classList.remove("active");
						}
					}
				  }
		   }
		   else{//스크롤이 위로 이동할때

		       	    if(Math.abs(target-current)>100){//스크롤이 아래로 가는 애니메이션의 진행여부를 결정하는 제어문
					  current -= 100;
				    }else{
					current = target;
					moving = false;
					clearInterval(timer);

					//현재 스크롤의 값을 타겟의 스크롤값을 비교해서 해당하는 대상에 클래스 적용
					for(var i=0; i<menuList.length; i++){
						if(i == n){
							menuList[i].classList.add("active");
						}
						else{
							menuList[i].classList.remove("active");
						}
					}
				  }

		   }

		   window.scrollTo({//scrollTo 스크롤을 목적지로 이동
				top: current,
				behavior: "smooth"
			});

		},1);
	}// function moveCategory(offsety,targety){닫기


  });


		//스크롤 페이지 이동
		var currentScroll = 0;
        var tim;
        window.onload = function () {
            var box = document.getElementsByClassName('page');// box클래스 개수만큼 실행
            for (var i = 0; i < box.length; i++) {
                box[i].addEventListener("mousewheel", MouseWheelHandler, false);
                box[i].addEventListener("DOMMouseScroll", MouseWheelHandler, true);
            }
        }
        function MouseWheelHandler(e) {
            e.preventDefault();
            var delta = 0;
            if (!e) {e = window.e;}
            if (e.wheelDelta) {
                delta = e.wheelDelta / 20; //한번에 마우스휠 되는 크기비율 (20~120)
                if (window.opera) {delta = -delta;}
            }
            else if (e.detail){
                delta = -e.detail / 3;
            }
 
            var p = e.target.parentElement;
            var index = Array.prototype.indexOf.call(p.children, e.target);
            var boxArr = e.target.parentElement.children;
            currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            var NextTarget = currentScroll;
            if (delta > 0) {
                if (index > 0) {
                    var no = (index - 1);
                    NextTarget = boxArr[no].offsetTop;
                }
            }
            else if (delta < 0)
            {
                if (index < boxArr.length - 1) {
                    var no = (index + 1);
                    NextTarget = boxArr[no].offsetTop;
                }
            }
            // 애니메이션
            clearInterval(tim);
            tim = setInterval(tran, 1);
            function tran() {
                var speed = 50;// 이동속도 숫자가 작아질수록 느려짐
                if (currentScroll == NextTarget) {
                    clearInterval(tran);
                } else {
                    if (currentScroll - speed > NextTarget)
                    {
                        currentScroll -= speed;
                    }
                    else if (currentScroll + speed < NextTarget)
                    {
                        currentScroll += speed;
                    }
                    else
                    {
                        currentScroll = NextTarget;
                    }
                    window.scrollTo(0, currentScroll);
                }
            }
        }