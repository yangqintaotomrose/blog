/*! bh-lay.com 2014-06-07 */
function formToAjax(a,b){var c=this,b=b||{},d=null;return d="FORM"==a[0].tagName?a:a.find("form"),0==d.length?void console.log("找不到<form>"):(this.formDom=d,this.action=this.formDom.attr("action"),this.method=this.formDom.attr("method")||"GET",this.method=this.method.toUpperCase(),this.onSubmit=b.onSubmit||null,this.onResponse=b.onResponse||null,void this.formDom.on("submit",function(){return c.submit(),!1}))}function pageList(a,b){var b=b||{},c=this;this.list_count=b.list_count||0,this.page_cur=b.page_cur||1,this.page_list_num=b.page_list_num||15,this.page_num=Math.ceil(this.list_count/this.page_list_num),this.jump=null,this.dom=$('<ul class="pagination"></ul>'),this.dom.on("click",'a[data-page="jump"]',function(){var a=parseInt($(this).html());c.page_cur=a-1,c.jumpTo(a)}).on("click",'a[data-page="next"]',function(){var a=++c.page_cur;c.jumpTo(a)}).on("click",'a[data-page="prev"]',function(){var a=--c.page_cur;c.jumpTo(a)}),a.html(this.dom),this.render()}window.admin=window.admin||{},function(a){function b(a){var b,c,e=a||[],f=!1;return 0==e.length||"admin"!=e[0]?f=!0:1==e.length?(b="index",c="首页"):d[e[1]]?(b=e[1],c=d[b]):(b="error",c="出错了",console.log("url err!")),{not_admin:f,page:b,title:c}}function c(a){var b=a.find(".mainCnt_body"),c=$('<div class="mainCnt_body"><div><div class="pro_loading">正在加载</div></div></div>');return a.append(c),0!=b.length&&(a.css("height",a.height()),b.css({position:"absolute",top:0,left:0}),c.css({position:"absolute",top:0,left:"200%"}),b.animate({left:"-100%"},400).fadeOut(100,function(){$(window).scrollTop(0),b.remove(),c.animate({left:0},200,function(){a.css("height","auto"),c.css("position","relative")})})),c}var d={index:"后台首页",share:"分享列表",article:"博文列表",opus:"作品列表",user:"用户",publish:"发布台",friends:"友情链接",labs:"实验室",gallery:"图库"};seajs.use(["/frontEnd/util/lofox.js","/frontEnd/UI/pop.js","/frontEnd/public/admin/render.js","/frontEnd/lib/jquery/jquery.easing.1.3.min.js"],function(){var d=util.lofox(),e=$(".mainCnt"),f=$("title");d.on("change",function(a){var d=b(a),g=d.title,h=d.page;if(d.not_admin)return void window.location.reload();switch(h){case"index":var i=c(e);admin.render.index(i);break;case"article":var i=c(e);admin.render.article(i);break;case"share":var i=c(e);admin.render.share(i);break;case"opus":var i=c(e);admin.render.opus(i);break;case"labs":var i=c(e);admin.render.labs(i);break;case"user":var i=c(e);2==a.length?(g="用户",admin.render.userIndex(i)):a.length>=3&&("list"==a[2]?(g="用户列表",admin.render.userList(i)):"group"==a[2]?(g="用户组列表",i.html("俺是用户组列表页")):"power"==a[2]?(g="权限页",admin.render.powerList(i)):(admin.push("/user/"),admin.refresh()));break;case"publish":e.html('<div class="col-md-12"></div>');var i=e.find(".col-md-12"),j="",k=null;a.length>=3&&(j=a[2]),a.length>=4&&(k=a[3]),j.match(/^(article|share|opus|friends|labs|power|user)$/)?seajs.use("/frontEnd/publish/publish.js",function(a){a.init(i,{active:j,id:k})}):(admin.push("/publish/article"),admin.refresh());break;case"friends":var i=c(e);admin.render.friends(i);break;case"gallery":e.html('<div class="col-md-12"></div>');var i=e.find(".col-md-12");seajs.use("/frontEnd/gallery/index.js",function(a){a.init(i)});break;default:return admin.push("/admin/"),void admin.refresh()}f.html(g+"—剧中人后台"),$(".crumbs").html(g)}),admin.render.base(),$("body").on("click","a.custom-lofox",function(){var a=$(this).attr("href");return d.push(a),d.refresh(),!1}),a.load=function(){require.load.apply(require,arguments)},a.pageList=function(a,b){return new pageList(a,b)},a.push=function(a){var b="/admin/"+(a?a.replace(/^(\/admin\/|\/)/,""):"");d.push.call(d,b)},a.formToAjax=function(a,b){return new formToAjax(a,b)},a.refresh=function(){d.refresh()}})}(window.admin),$(function(){function a(a,b){$.ajax({url:a,type:"POST",success:function(a){if(a&&200==a.code)b&&b(null,"操作成功");else{var c=a.msg||"操作失败";b&&b(c)}},error:function(){b&&b("网络出错！")}})}$("body").on("click","a[data-action-ajaxConfirm]",function(){var b=$(this),c=b.attr("href"),d=b.attr("data-action-ajaxConfirm");return UI.confirm({text:d,callback:function(){a(c,function(a){UI.prompt(a?a:"操作成功！")})}}),!1}).on("click","a[data-action-del]",function(){var b=$(this),c=b.attr("href"),d=b.attr("data-action-del"),e=b.attr("data-item-selector"),f=b.parents(e);return UI.confirm({text:d,callback:function(){a(c,function(a){a?UI.prompt(a):f.fadeTo(400,.1,function(){f.slideUp(200,function(){f.remove()})})})}}),!1}).on("click","a[data-action-ajax]",function(){var a=$(this),b=a.attr("href"),c=a.attr("data-action-ajax");return $.ajax({url:b,type:"POST",success:function(a){UI.prompt(a&&200==a.code?c:"操作失败！")},error:function(){UI.prompt("网络出错！")}}),!1})}),formToAjax.prototype={getData:function(){var a={};return this.formDom.find("input,textarea").each(function(){var b=$(this),c=b.attr("name"),d=b.attr("type");if(c)if("radio"==d||"checkbox"==d);else if("file"==d)console.log("丢弃文件域！");else{var e=b.val();a[c]=e}}),this.formDom.find("select").each(function(){}),a},submit:function(){var a=this,b=this.getData();if(this.onSubmit){var c=this.onSubmit(b);if(0==c)return}$.ajax({url:this.action,type:this.method,data:b,success:function(b){a.onResponse&&a.onResponse(b)}})}},pageList.prototype={jumpTo:function(a){this.page_cur=a,this.render(),this.jump&&this.jump(a)},render:function(){var a="";a+=this.page_cur>1?'<li><a data-page="prev" href="javascript:void(0)" >上一页</a></li>':'<li class="disabled"><span>上一页</span></li>';for(var b=0;b<this.page_num;b++)a+=b+1!=this.page_cur?'<li><a data-page="jump" href="javascript:void(0)">'+(b+1)+"</a></li>":'<li class="disabled"><a href="javascript:void(0)">'+(b+1)+"</a></li>";a+=this.page_num-this.page_cur>=1?'<li><a data-page="next" href="javascript:void(0)">下一页</a></li>':'<li class="disabled"><span>下一页</span></li>',this.dom.html(a)}},window.parse=window.parse||{},function(a){a.time=function(a,b){if(0==arguments.length)return null;var b=b||"{y}-{m}-{d} {h}:{i}:{s}";if("object"==typeof a)var c=a;else var c=new Date(parseInt(a));var d={y:c.getYear()+1900,m:c.getMonth()+1,d:c.getDate(),h:c.getHours(),i:c.getMinutes(),s:c.getSeconds(),a:c.getDay()},e=b.replace(/{(y|m|d|h|i|s|a)}/g,function(){return d[arguments[1]]||arguments[0]});return e}}(window.parse),window.admin=window.admin||{},window.admin.render=window.admin.render||{},function(a){a.base=function(){$(".userCnt").click(function(){$(".username_hover").slideDown(200)}),$(".username_hover").mouseleave(function(){$(this).fadeOut(200)})}}(window.admin.render);