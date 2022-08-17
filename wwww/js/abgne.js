// JavaScript Document
// gototop ======================================
$(function(){

	$(".warp").append('<div class="gototop">回到最上面</div>');

	var $goToTop = $(".gototop");
	var iScrollPointA = 0;  //滾回的位置
	var iScrollPointB = 300; //滾到的位置 出現gototop

	//滾動事件
	var oScrollTimer = null;
	$(window).on("scroll", function(){
		if(oScrollTimer){
			clearTimeout(oScrollTimer);
		}
		oScrollTimer = setTimeout(function(){
							if( $(window).scrollTop() > iScrollPointB) {
								$goToTop.addClass("active");
							} else {
								$goToTop.removeClass("active");
							}
						}, 200);
	});
	// 讓捲軸用動畫的方式移動到到指定id位罝
	$goToTop.on("click", function(){
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		 //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 500);
		return false;
	});
});

/*---------------------------------------------職業-----------------------------------------------*/
	$(function(){
		// 先取得 #abgne-block-20110111 , 必要參數及輪播間隔
		var $block = $('#abgne-block-20110111'), 
			timrt, speed = 4000,
			fadeOutSpeed = 500,	// 淡出的速度
			fadeInSpeed = 500;		// 淡入的速度

		// 幫 #abgne-block-20110111 .title ul li 加上 hover() 事件
		var $li = $('.job-title .set .setli', $block).hover(function(){
			// 當滑鼠移上時加上 .over 樣式
			$(this).addClass('over').siblings('.over').removeClass('over');
		}, function(){
			// 當滑鼠移出時移除 .over 樣式
			$(this).removeClass('over');
		}).click(function(){
			// 當滑鼠點擊時, 顯示相對應的 div.info
			// 並加上 .on 樣式
			var $this = $(this);
			var i = $this.index();
			$this.add($('.bd div.info', $block).eq($this.index())).addClass('on').addClass('on_'+i).siblings('.on').removeClass('on').removeClass(function (index, className) {return (className.match (/(^|\s)on_\S+/g) || []).join(' ');});
			//定義 位置和class名字 當className符合 on_開頭或 空白on_開頭 接任何非空白字串 找到的字串中間用' '連接
		});
		
		// 幫 $block 加上 hover() 事件
		$block.hover(function(){
			// 當滑鼠移上時停止計時器
			clearTimeout(timer);
		}, function(){
			// 當滑鼠移出時啟動計時器
			timer = setTimeout(move, speed);
		});
		
		// 控制輪播
		function move(){
			var _index = $('.job-title .set .setli.on', $block).index();
			_index = (_index + 1) % $li.length;
			$li.eq(_index).click();

			timer = setTimeout(move, speed);
		}
		
		// 啟動計時器
		timer = setTimeout(move, speed);
	});


/*---------------------------------------------------------------------------------------------*/

  /*輪播bn*/
	$(function(){
		var $block = $('#abgne_fade_pic'), 
			$ad = $block.find('.ad'),
			showIndex = 0,			// 預設要先顯示那一張
			fadeOutSpeed = 1000,	// 淡出的速度
			fadeInSpeed = 1000,		// 淡入的速度
			defaultZ = 10,			// 預設的 z-index
			isHover = false,
			timer, speed = 2500;	// 計時器及輪播切換的速度
		
		// 先把其它圖片的變成透明
		$ad.css({
			opacity: 0,
			zIndex: defaultZ - 1
		}).eq(showIndex).css({
			opacity: 1,
			zIndex: defaultZ
		});
		
		// 組出右下的按鈕
		var str = '';
		for(var i=0;i<$ad.length;i++){
			str += '<a href="#">' + (i + 1) + '</a>';
		}
		var $controlA = $('#abgne_fade_pic').append($('<div class="control">' + str + '</div>').css('zIndex', defaultZ + 1)).find('.control a');

		// 當按鈕被點選時
		// 若要變成滑鼠滑入來切換時, 可以把 click 換成 mouseover
		$controlA.click(function(){
			// 取得目前點擊的號碼
			showIndex = $(this).text() * 1 - 1;
			
			// 顯示相對應的區域並把其它區域變成透明
			$ad.eq(showIndex).stop().fadeTo(fadeInSpeed, 1, function(){
				if(!isHover){
					// 啟動計時器
					timer = setTimeout(autoClick, speed + fadeInSpeed);
				}
			}).css('zIndex', defaultZ).siblings('a').stop().fadeTo(fadeOutSpeed, 0).css('zIndex', defaultZ - 1);
			// 讓 a 加上 .on
			$(this).addClass('on').siblings().removeClass('on');

			return false;
		}).focus(function(){
			$(this).blur();
		}).eq(showIndex).addClass('on');

		$block.hover(function(){
			isHover = true;
			// 停止計時器
			clearTimeout(timer);
		}, function(){
			isHover = false;
			// 啟動計時器
			timer = setTimeout(autoClick, speed);
		})
		
		// 自動點擊下一個
		function autoClick(){
			if(isHover) return;
			showIndex = (showIndex + 1) % $controlA.length;
			$controlA.eq(showIndex).click();
		}
		
		// 啟動計時器
		timer = setTimeout(autoClick, speed);
	});


/*--------------------------------------------特色系統-----------------------------------------------*/

	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.abgne_tab').each(function(){
			// 目前的頁籤區塊
			var $sp = $(this);

			var $defaultLi = $('ul.sps li', $sp).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.sps li', $sp).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});

/*坐騎*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $zq = $(this);

			var $defaultLi = $('ul.zqs li', $zq).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.zqs li', $zq).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});

/*美人*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $mr = $(this);

			var $defaultLi = $('ul.mrs li', $mr).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.mrs li', $mr).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
/*英魂*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $yh = $(this);

			var $defaultLi = $('ul.yhs li', $yh).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.yhs li', $yh).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
/*神翼*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $sy = $(this);

			var $defaultLi = $('ul.sys li', $sy).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.sys li', $sy).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
/*寵物*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $pet = $(this);

			var $defaultLi = $('ul.pets li', $pet).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.pets li', $pet).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
/*幻武*/
	$(function(){
		// 預設顯示第一個 Tab
		var _showTab = 0;
		$('.Main-sp-content').each(function(){
			// 目前的頁籤區塊
			var $hw = $(this);

			var $defaultLi = $('ul.hws li', $hw).eq(_showTab).addClass('active');
			$($defaultLi.find('a').attr('href')).siblings().hide();
			
			// 當 li 頁籤被點擊時...
			// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
			$('ul.hws li', $hw).click(function() {
				// 找出 li 中的超連結 href(#id)
				var $this = $(this),
					_clickTab = $this.find('a').attr('href');
				// 把目前點擊到的 li 頁籤加上 .active
				// 並把兄弟元素中有 .active 的都移除 class
				$this.addClass('active').siblings('.active').removeClass('active');
				// 淡入相對應的內容並隱藏兄弟元素
				$(_clickTab).stop(false, true).fadeIn().siblings().hide();

				return false;
			}).find('a').focus(function(){
				this.blur();
			});
		});
	});
