function newWin(url,nw,nh){ //새창열기
	cw=screen.availWidth;
	ch=screen.availHeight;
	ml=(cw-nw)/2;
	mt=(ch-nh)/2;
	optionT='width='+nw+',height='+nh+',top='+mt+',left='+mt+',toolbar=no,location=no,status=no,menubar=no,resizable=no,scrollbars=yes';
	window.open(url,'TaginTag',optionT);
	return false;
}
function currentLnb(dep1,dep2){ //lnb 현재페이지
	$(".menu_1d > li").eq(dep1).addClass("currentOn");
	$(".menu_1d > li.currentOn .menu_2d > li").eq(dep2).addClass("currentOn");
}
function goHome(v){ //홈으로 이동
	switch (v){
		case "user":
			location.href="../user_index.html";
			break;
		case "admin":
			location.href="../admin_index.html";
			break;
	}
}
function setDatePick(obj){ //calender
	$('.miniCalendar').click(function(){
		$(this).parent().find('input').datepicker("show");
	});
	$("#"+obj).datepicker({
		dateFormat:'yy-mm-dd',
		showAnimation:'slide',
		showOtherMonths:true,
		selectOtherMonths:true,
		changeYear:true,
		changeMonth:true,
		showButtonPanel:true
	});
}
function printExct(obj){ //프린트
	$("div."+obj).print({
		globalStyles: true,
		mediaPrint: true,
		stylesheet: null,
		noPrintSelector: ".non-printBox",
		iframe: true,
		append: null,
		prepend: null,
		manuallyCopyFormValues: true,
		deferred: $.Deferred(),
		timeout: 750,
		title: null,
		doctype: '<!doctype html>'
	});
}
function replyAction(){//댓글작성폼 관련
	var tempRpRegHtml="";
	tempRpRegHtml+='<!-- replyDepthWrite s-->';
	tempRpRegHtml+='<div class="rpItem rpRegForm">';
	tempRpRegHtml+='<div class="rpWriteBox2">';
	tempRpRegHtml+='<textarea name="" id="" placeholder="100글자까지 제한"></textarea>';
	tempRpRegHtml+='<a href="#none" class="replyRegBtn">등록</a>';
	tempRpRegHtml+='<div class="txtCountBox">0/100</div>';
	tempRpRegHtml+='</div>';
	tempRpRegHtml+='</div>';
	tempRpRegHtml+='<!-- replyDepthWrite e-->';
	
	function hideRpRegForm(){//댓글작성폼 초기화
		regForm=$('.rpItem');
		regForm.removeClass('rpRegOn');
		regForm.find('.rpCancle').html("댓글작성").removeClass('rpCancle').addClass('rpReg');;
		regForm.find('.rpItem.rpRegForm').remove();
	}

	$('.rpReg').on('click',function(){//댓글작성폼
		hideRpRegForm();
		targetRp=$(this).parent().parent().parent();
		if(!targetRp.hasClass('rpRegOn')){
			targetRp.addClass('rpRegOn');
			targetRp.find('.rpReg').eq(0).html("댓글작성취소").removeClass('rpReg').addClass('rpCancle');
			targetRp.find('.rpContents').eq(0).after(tempRpRegHtml);
			replyAction();
		}
	});
	$('.rpRegOn .rpCancle').on('click',function(){//댓글작성폼 취소
		targetRp=$(this).parent().parent().parent();
		if(targetRp.hasClass('rpRegOn')){
			targetRp.removeClass('rpRegOn');
			targetRp.find('.rpCancle').html("댓글작성").removeClass('rpCancle').addClass('rpReg');;
			targetRp.find('.rpItem.rpRegForm').remove();
			replyAction();
		}
	});
}
function tenantSelectAction(){//입주사관리 이용내역 집계조회별
	var tnntSltOpt = $('.userTenantWrap select#selectOpt-type.selectOpt');
	tnntSltOpt.each(function(){
		var tnntSltedOpt = $(this).children("option:selected").attr('targetViewTable');
		$('.userTenantWrap .mwdViewTable').hide();
		$('.userTenantWrap .'+tnntSltedOpt).show();
	});
	tnntSltOpt.on('change',function(){
		var tnntSltedOpt = $(this).children("option:selected").attr('targetViewTable');
		$('.userTenantWrap .mwdViewTable').hide();
		$('.userTenantWrap .'+tnntSltedOpt).show();
	});
}
function officeChoice(){ //호실선택
	$('.officeChoiceBox li a').click(function(){
		if($(this).parent().hasClass('soldout')){
			alert("선택이 완료된 호실입니다");
		}else{
			$(this).parent().toggleClass('choiced');
			if($(this).parent().hasClass('choiced')){
				alert($(this).text()+"호실이 선택되었습니다.");
			}else{
				alert($(this).text()+"호실이 선택해제되었습니다.");
			}
		}
	});
}
$(document).ready(function(){
	/*  ===================== LOGIN ========================== */
	// Activate Login Tab Btn
	var loginTab = $('.loginTab').children('li');

	loginTab.on('click', function(){
		loginTab.removeClass('active');
		$(this).addClass('active');
	});


	// Show & Hide LoginWarning Area
	var loginField = $('.loginField > .insert > input');
	var loginWarning = $('.loginWarning');

	loginField.on('click', function(){
		loginWarning.hide();
	});

	// [Popup] Find ID/Password
	var popupTab = $('.popupTab').children('li');
	$('.popupBox table .findId').hide();

	popupTab.on('click', function(){
		popupTab.removeClass('active');
		$(this).addClass('active');

		var onTab = $(this).hasClass('findId');

		if (onTab){
			$('.popupBox table .findId').show();
		} else {
			$('.popupBox table .findId').hide();
		}
	});

	/*  ===================== toggleTab ========================== */
	function tabIdToggle(){
		$('.tabId').hide();
		$.each($('.tabId'), function(){
			var toggleTab_on = $('.toggleTab').children('li.actOn').find('a').attr('targetTabId');
			if($(this).hasClass(toggleTab_on)){
				$(this).show();
			}
		});
	}
	tabIdToggle();
	$('.toggleTab li').on('click', function(){
		$('.toggleTab li').removeClass('actOn');
		$(this).addClass('actOn');
		tabIdToggle();
	});

	/*  ===================== SELECTBOX ========================== */
	var selectOpt = $('select.selectOpt');
	selectOpt.each(function(){
		var selectedOpt = $(this).children("option:selected").text();
		$(this).siblings("label").text(selectedOpt);
	});

	selectOpt.on('change',function(){
		var selectedOpt = $(this).children("option:selected").text();
		$(this).siblings("label").text(selectedOpt);
	});

	/*  ===================== LNB MENU ========================== */
	$('.pageWrap').addClass('maxLnb'); //기본으로 maxLnb 클래스 삽입

	function hideLnb(){ //lnb 2Depth 숨기기
		$(".menu_1d > li").removeClass("actOn");
	}
	function hideLnb_min(){
		$('.menu_2d').css('display','none');
	}
	$(".menu_1d > li").hover(function(){ //lnb 1Depth 호버시
		hideLnb();
		if($('.pageWrap').hasClass('maxLnb')){
			$(this).addClass("actOn");
			if(!$(this).hasClass('currentOn')){
				$(this).find('.menu_2d').stop().slideToggle();
			}
		}
		if($('.pageWrap').hasClass('minLnb')){
			$(this).addClass("actOn");
			$(this).find('.menu_2d').stop().slideToggle();
		}
	});
	$('.contentArea').mouseover(function(){
		hideLnb();
	});

	$(".menuBtn").on('click', function(){ //메뉴 확장, 축소
		var cWrap=$(this).parents('.pageWrap');
		if (!cWrap.hasClass("minLnb")) {
			cWrap.removeClass("maxLnb");
			cWrap.addClass("minLnb");
			$(".headerLogo").find("img").attr("src","../../images/common/subHeader_logo_min.png");
		} else{
			$(".menu_1st.min h2 > img").removeClass("activeMenu");
			cWrap.removeClass("minLnb");
			cWrap.addClass("maxLnb");
			$('.menu_1d > li.currentOn').find('.menu_2d').stop().slideDown();
			$(".headerLogo").find("img").attr("src","../../images/common/subHeader_logo.png");
		}
	});

	$(".chck_all").on('change',function(){ //전체체크박스
		if($(this).prop('checked')){
			$(this).parents('table').find('td input[type="checkbox"].checkbox').prop("checked",true);
		}else{
			$(this).parents('table').find('td input[type="checkbox"].checkbox').prop("checked",false);
		}
	});
	
	/*  ===================== inputFile ========================== */
	$('.attachFileWrap .inputFileBox').change(function(){
		var attachInput=$(this);
		console.log( attachInput[0].files );
		var txt = [];
		var attachFileHtml="";
		attachFileHtml+="<ul>";
		for(var i=0; i<this.files.length; i++){
			txt.push(this.files[i].name);
			attachFileHtml+="<li>"+txt[i]+"</li>";
		}
		attachFileHtml+="<li><a href='#none' class='attachReset'>초기화</a></li>";
		attachFileHtml+="</ul>";
		$('.attachFileWrap .inputFilePreview').html(attachFileHtml);
		$('.attachReset').click(function(){
			$('.attachFileWrap .inputFileBox').replaceWith(attachInput.val('').clone(true));
			$('.attachFileWrap .inputFilePreview').html('파일을 첨부하세요');
		});
	});

	// 레이어팝업 컨트롤 
	$('.popupBtn').on('click', function(e) {
		e.preventDefault();
		var targetPop=$(this).attr('popupTarget');
		if(targetPop==undefined){
			$('.popupWrap').bPopup({
				follow: [false, false], 
				opacity:0.3,
				positionStyle: 'fixed'
			});
		}else{
			$('.popupWrap.'+targetPop).bPopup({
				follow: [false, false], 
				opacity:0.3,
				positionStyle: 'fixed'
			});
		}
	});
});