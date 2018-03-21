!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=54)}([function(t,e){$(document).ready(function(){function t(t,e){for(var n=0;n<t.length;n++)for(var o=0;o<t[n].types.length;o++)if(t[n].types[o]==e)return t[n].long_name;return""}console.log("Custom code loaded"),$("#submitSurvey").on("click",function(e){e.preventDefault();var n=$("#street").val()+", "+$("#city").val()+", "+$("#state").val()+" "+$("#zip").val(),o=null,i=null;(new google.maps.Geocoder).geocode({address:n},function(e,n){if(n==google.maps.GeocoderStatus.OK){console.log(e[0].address_components),console.log(t(e[0].address_components,"neighborhood")),o=e[0].geometry.location.lat(),i=e[0].geometry.location.lng(),console.log(`${o},${i}`);var a={street:$("#street").val(),city:$("#city").val(),state:$("#state").val(),zip:$("#zip").val(),age:$("#age").val(),industry:$("#industry").val(),income:$("#income").val(),education:$("#education").val(),children:$("#children").val(),pets:$("#pets").val(),married:$("#married").val(),car:$("#car").val(),address:$("#street").val()+", "+$("#city").val()+", "+$("#state").val()+" "+$("#zip").val(),neighborhood:t(e[0].address_components,"neighborhood"),geocodeLat:o,geocodeLng:i,hobbies:$("#hobbies").val(),social:$("#social").val()};$.post("/api/surveys",a,function(t){console.log(t)})}})})})},function(t,e){t.exports=function(){console.log("Fetching markers"),$.ajax({url:"/api/surveys/",type:"GET",success:function(t){console.log(t),t.forEach(t=>{let e=new google.maps.LatLng(t.geocodeLat,t.geocodeLng),n=new google.maps.Marker({map:map,position:e,icon:"https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png"});mapControls.mapMarkers.push(n),mapControls.mapLatLng.push(e)})}})}},function(t,e){t.exports=function(){window.mapControls={neighborHoodLayer:null,heatMap:null,mapLatLng:[],mapMarkers:[]},$("#neighborhood-overlay").on("click",function(){!function(t){if(null===window.mapControls.neighborHoodLayer||null===window.mapControls.neighborHoodLayer.getMap()){let e=new google.maps.KmlLayer({url:"http://chicagomap.zolk.com/sources/neighborhoods/source.kml",preserveViewport:!0,map:t});window.mapControls.neighborHoodLayer=e}else window.mapControls.neighborHoodLayer.setMap(null)}(window.map)}),$("#heatmap-overlay").on("click",function(){mapControls.heatMap?mapControls.heatMap.setMap(mapControls.heatMap.getMap()?null:map):mapControls.heatMap=new google.maps.visualization.HeatmapLayer({data:mapControls.mapLatLng,map:map,radius:30})})}},function(t,e,n){const o=n(2),i=n(1);t.exports=function(){let t=new google.maps.Map(document.getElementById("google-fs-map"),{center:new google.maps.LatLng(41.88105093780886,-87.62773873898391),zoom:11});t.setMapTypeId(google.maps.MapTypeId.ROADMAP),window.map=t,o(),i(),google.maps.event.addListener(t,"click",function(t){var e=t.latLng.lat(),n=t.latLng.lng();console.log(`${e}, ${n}`)})}},function(t,e){!function(t){"use strict";t.fn.tkSlickDefault=function(){if(this.length&&void 0!==t.fn.slick){var e=this;e.slick({dots:!0,slidesToShow:e.data("items")||3,responsive:[{breakpoint:1200,settings:{slidesToShow:e.data("itemsLg")||4}},{breakpoint:992,settings:{slidesToShow:e.data("itemsMd")||3}},{breakpoint:768,settings:{slidesToShow:e.data("itemsSm")||3}},{breakpoint:480,settings:{slidesToShow:e.data("itemsXs")||2}},{breakpoint:0,settings:{slidesToShow:1}}],rtl:this.data("rtl"),onSetPosition:function(){t(window).trigger("resize")}}),t(document).on("sidebar.shown",function(){e.slickSetOption("dots",!0,!0)})}},t(".slick-basic").each(function(){t(this).tkSlickDefault()})}(jQuery)},function(t,e){!function(t){"use strict";var e=function(t,e){t.namespace&&"items"===t.property.name&&e.trigger("to.owl.carousel",[t.item.index,300,!0])};t.fn.tkOwlPreview=function(){if(this.length){var n=t(this.data("sync")),o=this,i=this.data("rtl");n.length&&(this.owlCarousel({items:1,slideSpeed:1e3,dots:!1,responsiveRefreshRate:200,rtl:i,nav:!0,navigationText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>']}),this.on("change.owl.carousel",function(t){e(t,n)}),n.owlCarousel({items:5,responsive:{1200:{items:7},768:{items:6},480:{items:3},0:{items:2}},dots:!1,nav:!0,responsiveRefreshRate:100,rtl:i,afterInit:function(t){t.find(".owl-item").eq(0).addClass("synced")}}),n.on("change.owl.carousel",function(t){e(t,o)}),n.find(".owl-item").click(function(e){e.preventDefault();var n=t(this).data("owl-item");o.trigger("to.owl.carousel",[n.index,300,!0])}))}},t(".owl-preview").tkOwlPreview()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkOwlMixed=function(){this.length&&this.owlCarousel({items:2,nav:!0,dots:!1,rtl:this.data("rtl"),navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],responsive:{1200:{items:2},0:{items:1}}})},t(".owl-mixed").tkOwlMixed()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkOwlDefault=function(){if(this.length){var e=this;e.owlCarousel({dots:!0,items:e.data("items")||4,responsive:{1200:{items:e.data("itemsLg")||4},992:{items:e.data("itemsMg")||3},768:{items:e.data("itemsSm")||3},480:{items:e.data("itemsXs")||2},0:{items:1}},rtl:this.data("rtl"),afterUpdate:function(){t(window).trigger("resize")}})}},t(".owl-basic").each(function(){t(this).tkOwlDefault()})}(jQuery)},function(t,e,n){n(7),n(6),n(5)},function(t,e,n){n(8),n(4)},function(t,e){!function(t){"use strict";var e,n,o,i,a,s,r,l,c;t("#subnav").collapse({toggle:!1}),o={effect:"st-effect-1",duration:550,overlay:!1},n=!1,e=navigator.userAgent||navigator.vendor||window.opera,(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(n=!0),i=n?"touchstart":"click",a=function(e,n){var o=e.data("layoutClasses");if(!o){var i=e.data("toggleLayout");if("string"==typeof i)return o=i.split(",").join(" "),e.data("layoutClasses",o),o;var a=new RegExp("sidebar-"+n+"(\\S+)","ig");null!==(o=t("html").get(0).className.match(a))&&o.length&&(o=o.join(" "),e.data("layoutClasses",o))}return o},s=function(t){return{effect:t.data("effect"),overlay:t.data("overlay")}},r=function(){return!!t("body").hasClass("animating")||(t("body").addClass("animating"),setTimeout(function(){t("body").removeClass("animating")},o.duration),!1)},l=function(e,n){var i=t(".st-container"),s=void 0!==e?"#"+e:i.data("stMenuTarget"),r=t(s);if(!r.length)return!1;if(!r.is(":visible"))return!1;if(r.hasClass("sidebar-closed"))return!1;var l=void 0!==n&&n.effect?n.effect:i.data("stMenuEffect"),c=r.is(".left")?"l":"r",d="st-effect-"+c+r.get(0).className.match(/sidebar-size-(\S+)/).pop(),u=r.data("toggleLayout"),f=a(r,c),h={sidebar:r,target:s};t(document).trigger("sidebar.hide",h),t('[data-toggle="sidebar-menu"][href="'+s+'"]').removeClass("active").closest("li").removeClass("active"),t("html").addClass(d),r.addClass(l),i.addClass(l),i.removeClass("st-menu-open st-pusher-overlay"),setTimeout(function(){t("html").removeClass(d),u&&t("html").removeClass(f),r.removeClass(l),i.get(0).className="st-container",r.addClass("sidebar-closed").hide(),t(document).trigger("sidebar.hidden",h)},o.duration)},c=function(e,n){var i=t(".st-container"),s=t(e);if(!s.length)return!1;if(t(window).width()<768&&i.hasClass("st-menu-open"))return l();t('[data-toggle="sidebar-menu"][href="'+e+'"]').addClass("active").closest("li").addClass("active");var r=n.effect,c=n.overlay,d=s.is(".left")?"l":"r",u="st-effect-"+d+s.get(0).className.match(/sidebar-size-(\S+)/).pop(),f=s.data("toggleLayout"),h=a(s,d),p={sidebar:s,target:e};t(document).trigger("sidebar.show",p),t("html").addClass(u),s.show().removeClass("sidebar-closed"),i.data("stMenuEffect",r),i.data("stMenuTarget",e),s.addClass(r),i.addClass(r),c&&i.addClass("st-pusher-overlay"),setTimeout(function(){i.addClass("st-menu-open"),s.find("[data-scrollable]").getNiceScroll().resize(),t(window).trigger("resize")},25),setTimeout(function(){f&&t("html").addClass(h),t(document).trigger("sidebar.shown",p)},o.duration)},t("body").on(i,'[data-toggle="sidebar-menu"]',function(e){if(e.stopPropagation(),e.preventDefault(),r())return!1;var n,i=t(this),a=i.attr("href");if(a.length>3&&!(n=t(a)).length)return!1;if(a.length<3){var d=t('[data-toggle="sidebar-menu"]').not(this).closest("li").length?t('[data-toggle="sidebar-menu"]').not(this).closest("li"):t('[data-toggle="sidebar-menu"]').not(this),u=t(this).closest("li").length?t(this).closest("li"):t(this);return d.removeClass("active"),u.addClass("active"),t("html").hasClass("show-sidebar")&&u.removeClass("active"),t("html").removeClass("show-sidebar"),void(u.hasClass("active")&&t("html").addClass("show-sidebar"))}var f=s(n),h={};i.data("effect")&&(h.effect=i.data("effect")),i.data("overlay")&&(h.overlay=i.data("overlay"));var p=t.extend({},o,f,h);n.hasClass("sidebar-closed")||!n.is(":visible")?c(a,p):l(n.attr("id"),p)}),t(document).on("keydown",null,"esc",function(){if(t(".st-container").hasClass("st-menu-open"))return l(),!1}),t.fn.tkSidebarToggleBar=function(){if(this.length&&this.data("toggleBar")){var e=t("<a></a>");e.attr("href","#"+this.attr("id")).attr("data-toggle","sidebar-menu").addClass("sidebar-toggle-bar"),this.append(e)}},t(".sidebar").each(function(){t(this).tkSidebarToggleBar()}),window.sidebar={open:function(e,n){return!r()&&(n=t.extend({},o,n),c("#"+e,n))},close:function(e,n){return n=t.extend({},o,n),l(e,n)},options:s}}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkSidebarDropdown=function(){if(this.length){var e=this;e.find(".collapse").off("shown.bs.collapse").off("show.bs.collapse").off("hidden.bs.collapse");var n=e.find("[data-scrollable]").getNiceScroll()[0];n.scrollstart(function(){e.is('[data-type="dropdown"]')&&(e.addClass("scrolling"),e.find("#dropdown-temp > ul > li").empty(),e.find("#dropdown-temp").hide(),e.find(".open").removeClass("open"))}),n.scrollend(function(){e.is('[data-type="dropdown"]')&&(t.data(this,"lastScrollTop",n.getScrollTop()),e.removeClass("scrolling"))}),e.find(".hasSubmenu").addClass("dropdown").removeClass("open").find("> ul").addClass("dropdown-menu").removeClass("collapse in").removeAttr("style").end().find("> a").removeClass("collapsed").removeAttr("data-toggle"),e.find(".sidebar-menu > li.dropdown > a").on("mouseenter",function(){var n=e.find("#dropdown-temp");if(e.find(".open").removeClass("open"),n.hide(),!t(this).parent(".dropdown").is(".open")&&!e.is(".scrolling")){var o=t(this).parent(".dropdown"),i=o.find("> .dropdown-menu").clone().removeClass("submenu-hide");n.length||(n=t("<div/>").attr("id","dropdown-temp").appendTo(e)).html("<ul><li></li></ul>"),n.show(),n.find(".dropdown-menu").remove(),n=n.find("> ul > li").css({overflow:"visible"}).addClass("dropdown open"),o.addClass("open"),i.appendTo(n).css({top:o.offset().top-n.offset().top,left:"100%"}).show(),e.is(".right")&&i.css({left:"auto",right:"100%"})}}),e.find(".sidebar-menu > li > a").on("mouseenter",function(){if(!t(this).parent().is(".dropdown")){var e=t(this).closest(".sidebar");e.find(".open").removeClass("open"),e.find("#dropdown-temp").hide()}}),e.find(".sidebar-menu > li > a").on("click",function(e){t(this).parent().is(".dropdown")&&(e.preventDefault(),e.stopPropagation())}),e.on("mouseleave",function(){t(this).find("#dropdown-temp").hide(),t(this).find(".open").removeClass("open")}),e.find(".dropdown").on("mouseover",function(){t(this).addClass("open").children("ul").removeClass("submenu-hide").addClass("submenu-show")}).on("mouseout",function(){t(this).children("ul").removeClass(".submenu-show").addClass("submenu-hide")}),t("body").on("mouseout","#dropdown-temp .dropdown",function(){t(".sidebar-menu .open",t(this).closest(".sidebar")).removeClass(".open")})}};var e=function(){t('.sidebar[data-type="dropdown"]').each(function(){t(this).tkSidebarDropdown()})};function n(){t('.sidebar[data-type="collapse"][data-transformed]').length&&(t('.sidebar[data-type="collapse"][data-transformed]').attr("data-type","dropdown").attr("data-transformed",!0),e())}e(),t(window).bind("enterBreakpoint480",function(){t('.sidebar[data-type="dropdown"]').length&&(t('.sidebar[data-type="dropdown"]').attr("data-type","collapse").attr("data-transformed",!0),t('.sidebar[data-type="collapse"]').each(function(){t(this).tkSidebarCollapse()}))}),t(window).bind("enterBreakpoint768",n),t(window).bind("enterBreakpoint1024",n)}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkSidebarCollapse=function(){if(this.length){var e=this;e.find(".sidebar-menu > li > a").off("mouseenter"),e.find(".sidebar-menu > li.dropdown > a").off("mouseenter"),e.find(".sidebar-menu > li > a").off("mouseenter"),e.find(".sidebar-menu > li > a").off("click"),e.off("mouseleave"),e.find(".dropdown").off("mouseover"),e.find(".dropdown").off("mouseout"),t("body").off("mouseout","#dropdown-temp .dropdown"),e.find("ul.collapse").off("shown.bs.collapse").off("show.bs.collapse").off("hide.bs.collapse").off("hidden.bs.collapse"),e.find("#dropdown-temp").remove(),e.find(".hasSubmenu").removeClass("dropdown").find("> ul").addClass("collapse").removeClass("dropdown-menu submenu-hide submenu-show").end().find("> a").attr("data-toggle","collapse").on("click",function(t){t.preventDefault()}),e.find(".collapse").on("shown.bs.collapse",function(){e.find("[data-scrollable]").getNiceScroll().resize()}),e.find(".collapse").on("show.bs.collapse",function(e){e.stopPropagation();var n=t(this).parents("ul:first").find("> li.open > ul");n.length&&n.collapse("hide").closest(".hasSubmenu").removeClass("open"),t(this).closest(".hasSubmenu").addClass("open")}),e.find(".collapse").on("hidden.bs.collapse",function(e){e.stopPropagation(),t(this).closest(".hasSubmenu").removeClass("open")}),e.find(".collapse").collapse({toggle:!1})}},t('.sidebar[data-type="collapse"]').each(function(){t(this).tkSidebarCollapse()})}(jQuery)},function(t,e){t.exports=function(t){return{"transform-button":!0===t.data("transformButton"),"transform-button-icon":t.data("transformButtonIcon")||"fa-ellipsis-h"}}},function(t,e,n){var o;(o=jQuery)(".sidebar").each(function(){var t=o(this),e=n(13)(t);if(e["transform-button"]){var i=o('<button type="button"></button>');i.attr("data-toggle","sidebar-transform").addClass("btn btn-default").html('<i class="fa '+e["transform-button-icon"]+'"></i>'),t.find(".sidebar-menu").append(i)}})},function(t,e){!function(t){"use strict";var e=function(){t("html").addClass("show-sidebar"),t(".sidebar.sidebar-visible-desktop").not(":visible").each(function(){var e=sidebar.options(t(this));sidebar.open(t(this).attr("id"),e)})},n=function(){t("html").removeClass("show-sidebar"),t(".sidebar:visible").each(function(){sidebar.close(t(this).attr("id"))})};if(t(window).bind("enterBreakpoint768",function(){t(".sidebar").length&&(t(".hide-sidebar").length||e())}),t(window).bind("enterBreakpoint1024",function(){t(".sidebar").length&&(t(".hide-sidebar").length||e())}),t(window).bind("enterBreakpoint480",function(){t(".sidebar").length&&n()}),t(window).width()<=480){if(!t(".sidebar").length)return;n()}}(jQuery)},function(t,e,n){n(15),n(14),n(12),n(11),n(10),function(t){"use strict";t.fn.tkSidebar=function(e){if(this.length){var n=t.extend({menuType:!1,toggleBar:!1},e);"collapse"==n.menuType&&this.tkSidebarCollapse(),"dropdown"==n.menuType&&this.tkSidebarDropdown(),!0===n.toggleBar&&this.tkSidebarToggleBar()}}}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkSidebarSizePcDemo=function(){var e;this.length&&(t(document).on("sidebar.show",function(){t("#pc-open").prop("disabled",!0)}).on("sidebar.hidden",function(){t("#pc-open").prop("disabled",!1)}),this.on("submit",function(n){n.preventDefault();var o=t(".sidebar"),i=t("#pc-value"),a=i.val();i.blur(),(!a.length||a<25)&&(a=25,i.val(a)),o[0].className=o[0].className.replace(/sidebar-size-([\d]+)pc/gi,"sidebar-size-"+a+"pc"),sidebar.open("sidebar-menu"),clearTimeout(e),e=setTimeout(function(){sidebar.close("sidebar-menu")},5e3)}))},t('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo()}(jQuery)},function(t,e){!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var o=(new Date).getTime(),i=Math.max(0,16-(o-t)),a=window.setTimeout(function(){e(o+i)},i);return t=o+i,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),function(t,e){"use strict";t.fn.tkParallax=function(){if(!Modernizr.touch){var n=function(t){return{speed:t.data("speed")||4,translate:t.data("speed")||!0,translateWhen:t.data("translateWhen")||"inViewportTop",autoOffset:t.data("autoOffset"),offset:t.data("offset")||0,opacity:t.data("opacity")}},o=t(e),i=t(".st-content-inner"),a=this,s=!1,r=null,l=0,c=/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor),d=function(n){s||(r=t(n.currentTarget),c?p():(e.requestAnimationFrame(p),s=!0))},u=function(t,e){var n="translate3d(0px,"+e+"px, 0px)";t.style["-webkit-transform"]=n,t.style["-moz-transform"]=n,t.style["-ms-transform"]=n,t.style["-o-transform"]=n,t.style.transform=n},f=a.find(".parallax-layer"),h=function(){f.each(function(){var e=t(this),o=n(e),i=a.outerHeight(!0);o.translate&&e.is("img")&&o.autoOffset&&t.loadImage(e.attr("src")).done(function(){e.removeAttr("style");var t=e.height(),n=.33*t;n+i>t&&(n=t-i),n*=-1,e.attr("data-offset",n),u(e.get(0),n)})})};h(),t(e).on("debouncedresize",h);var p=function(){var e=parseInt(r.scrollTop()),i=r.is(o)?0:r.offset().top,c=a.outerHeight(!0),d=parseInt(t(document.body).css("padding-top")),h=parseInt(t(document.body).css("padding-bottom")),p=r.innerHeight(),m=e+p-(h+d),g=a.offset().top-i-d,v=g+c,b=Math.abs(g),w=g/p*100,k=.5*c,y={};y.inViewport=v>0&&g<p,y.inViewportTop=v>0&&g<0,y.inViewportBottom=v>0&&g<p&&v>p,r.is(o)&&(y.inWindowViewportFull=g>=e&&v<=m,y.inWindowViewport2=g>=e&&g<=m,y.inWindowViewport3=v>=e&&v<=m,y.inWindowViewport4=v>=e&&v>=p&&c>p,y.inWindowViewportTop=!y.inWindowViewport2&&(y.inWindowViewport3||y.inWindowViewport4),y.inWindowViewportBottom=y.inWindowViewport2&&!y.inWindowViewport3,y.inWindowViewport=y.inWindowViewportTop||y.inWindowViewportBottom||y.inWindowViewportFull,y.inViewport=y.inWindowViewport,y.inViewportTop=y.inWindowViewportTop,y.inViewportBottom=y.inWindowViewportBottom,w=(g-e)/p*100),y.inViewportTop&&y.inViewportBottom&&(y.inViewportBottom=!1),isNaN(e)||(f.each(function(){var i=t(this),a=n(i),s=p+c-v;if(r.is(o)&&(s=m-g),a.translate){var d=-1*w*a.speed+a.offset,f=i.height();!y.inViewport||y.inViewportTop||y.inViewportBottom||(i.is("img")&&f>c&&Math.abs(d)+c>f&&(d=-1*(f-c)),i.is("img")||(d=0)),y.inViewportTop&&(i.is("img")&&f==c||!i.is("img"))&&(d=Math.abs(d)),y.inViewportBottom&&!i.is("img")&&(d=c-s,e<l&&(d*=-1)),y.inViewport&&(d=d.toFixed(5),f>o.height()&&e<=0&&(d=0),u(i.get(0),d))}if(a.opacity){var h,C;if(y.inViewportBottom)r.is(o)?(C=((h=s)/c).toFixed(5),h>k?i.css({opacity:C}):i.css({opacity:0})):v<p+k?(C=((h=p+k-v)/k).toFixed(5),i.css({opacity:C})):i.css({opacity:0});else if(y.inViewportTop){var S=r.is(o)?e-g:b;S>k?i.css({opacity:(1-S/c).toFixed(5)}):i.css({opacity:1})}else i.css({opacity:1});y.inViewportBottom&&e<=0&&i.css({opacity:1})}}),l=e),s=!1};i.length?i.scroll(d):o.scroll(d)}},t(".parallax").each(function(){t(this).tkParallax()})}(jQuery,window)},function(t,e){!function(t){"use strict";t.fn.tkIsotope=function(){this.length&&this.isotope({layoutMode:this.data("layoutMode")||"packery",itemSelector:".item"})},t(function(){setTimeout(function(){t('[data-toggle="isotope"]').each(function(){t(this).tkIsotope()})},300),t(document).on("domChanged",function(){t('[data-toggle="isotope"]').each(function(){t(this).isotope()})})})}(jQuery)},function(t,e){t.exports=function(t,e){var n=function(t){var e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.href=t,document.getElementsByTagName("head")[0].appendChild(e)};Array.prototype.foreach=function(t){for(var e=0;e<this.length;e++)t(e,this[e])},function(t,e){t.foreach(function(t,e){n(e)}),"function"==typeof e&&function(t,e){var n=!1,o=!0,i=t.document,a=i.documentElement,s=i.addEventListener,r=s?"addEventListener":"attachEvent",l=s?"removeEventListener":"detachEvent",c=s?"":"on",d=function(o){"readystatechange"==o.type&&"complete"!=i.readyState||(("load"==o.type?t:i)[l](c+o.type,d,!1),!n&&(n=!0)&&e.call(t,o.type||o))},u=function(){try{a.doScroll("left")}catch(t){return void setTimeout(u,50)}d("poll")};if("complete"==i.readyState)e.call(t,"lazy");else{if(!s&&a.doScroll){try{o=!t.frameElement}catch(t){}o&&u()}i[r](c+"DOMContentLoaded",d,!1),i[r](c+"readystatechange",d,!1),t[r](c+"load",d,!1)}}(window,e)}(t,e)}},function(t,e,n){var o=n(20);!function(t){var e=function(){var e=t.cookie("skin"),n=t.cookie("skin-file");void 0!==e&&o(["css/"+n+".min.css"],function(){t("[data-skin]").removeProp("disabled").parent().removeClass("loading")})};t("[data-skin]").on("click",function(){t(this).prop("disabled")||(t("[data-skin]").prop("disabled",!0),t(this).parent().addClass("loading"),t.cookie("skin",t(this).data("skin")),t.cookie("skin-file",t(this).data("file")),e())});var n=t.cookie("skin");void 0!==n&&"default"!=n&&e()}(jQuery)},function(t,e){t.exports=function(){var t=$.cookie("skin");return void 0===t&&(t="default"),t}},function(t,e,n){!function(t){"use strict";var e;n(22)();t.fn.tkScrollable=function(e){if(this.length){var n=t.extend({horizontal:!1},e),o=this.niceScroll({cursorborder:0,horizrailenabled:n.horizontal});if(n.horizontal){var i=o.getContentSize;o.getContentSize=function(){var t=i.call(o);return t.h=o.win.height(),t}}}},t("[data-scrollable]").tkScrollable(),t("[data-scrollable-h]").each(function(){t(this).tkScrollable({horizontal:!0})}),t(window).on("debouncedresize",function(){clearTimeout(e),e=setTimeout(function(){t("[data-scrollable], [data-scrollable-h]").getNiceScroll().resize()},100)})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkGridalicious=function(){this.length&&this.gridalicious({gutter:this.data("gutter")||15,width:this.data("width")||370,selector:"> div",animationOptions:{complete:function(){t(window).trigger("resize")}}})},t('[data-toggle*="gridalicious"]').each(function(){t(this).tkGridalicious()})}(jQuery)},function(t,e){jQuery(window).setBreakpoints({distinct:!0,breakpoints:[320,480,768,1024]})},function(t,e,n){n(25),n(24),n(23),n(21),n(19),n(18),n(17)},function(t,e){!function(t){"use strict";t.fn.tkSummernote=function(){this.length&&void 0!==t.fn.summernote&&this.summernote({height:300})},t(function(){t(".summernote").each(function(){t(this).tkSummernote()})})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkWizard=function(){if(this.length&&void 0!==t.fn.slick){var e=this,n=e.closest(".wizard-container");e.slick({dots:!1,arrows:!1,slidesToShow:1,rtl:this.data("rtl"),slide:"fieldset",onAfterChange:function(o,i){t(document).trigger("after.wizard.step",{wiz:o,target:i,container:n,element:e})}}),n.find(".wiz-next").click(function(t){t.preventDefault(),e.slickNext()}),n.find(".wiz-prev").click(function(t){t.preventDefault(),e.slickPrev()}),n.find(".wiz-step").click(function(n){n.preventDefault(),e.slickGoTo(t(this).data("target"))}),t(document).on("show.bs.modal",function(){e.closest(".modal-body").hide()}),t(document).on("shown.bs.modal",function(){e.closest(".modal-body").show(),e.slickSetOption("dots",!1,!0)})}},t('[data-toggle="wizard"]').each(function(){t(this).tkWizard()}),t(document).on("after.wizard.step",function(t,e){if(e.container.is("#wizard-demo-1")){var n=e.container.find(".wiz-progress li:eq("+e.target+")");e.container.find(".wiz-progress li").removeClass("active complete"),n.addClass("active"),n.prevAll().addClass("complete")}})}(jQuery)},function(t,e){!function(t){"use strict";t('[data-toggle="switch-checkbox"]').each(function(){t(this).bootstrapSwitch({offColor:"danger"})})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkMiniColors=function(){this.length&&void 0!==t.fn.minicolors&&this.minicolors({control:this.attr("data-control")||"hue",defaultValue:this.attr("data-defaultValue")||"",inline:"true"===this.attr("data-inline"),letterCase:this.attr("data-letterCase")||"lowercase",opacity:this.attr("data-opacity"),position:this.attr("data-position")||"bottom left",change:function(t,e){t&&(e&&(t+=", "+e),"object"==typeof console&&console.log(t))},theme:"bootstrap"})},t(".minicolors").each(function(){t(this).tkMiniColors()})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkDatePicker=function(){this.length&&void 0!==t.fn.datepicker&&this.datepicker()},t(".datepicker").tkDatePicker()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkSelectPicker=function(){this.length&&void 0!==t.fn.selectpicker&&this.selectpicker({width:this.data("width")||"100%"})},t(function(){t(".selectpicker").each(function(){t(this).tkSelectPicker()})})}(jQuery)},function(t,e){!function(t){"use strict";var e=function(e){t(".slider-handle",e).html('<i class="fa fa-bars fa-rotate-90"></i>')};t.fn.tkSlider=function(){this.length&&void 0!==t.fn.slider&&(this.slider(),e(this))},t.fn.tkSliderFormatter=function(){this.length&&void 0!==t.fn.slider&&(this.slider({formatter:function(t){return"Current value: "+t}}),e(this))},t.fn.tkSliderUpdate=function(){this.length&&void 0!==t.fn.slider&&(this.on("slide",function(e){t(this.attr("data-on-slide")).text(e.value)}),e(this))},t('[data-slider="default"]').tkSlider(),t('[data-slider="formatter"]').tkSliderFormatter(),t("[data-on-slide]").tkSliderUpdate()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkSelect2=function(){if(this.length&&void 0!==t.fn.select2){var e=this,n={allowClear:e.data("allowClear")};if(e.is("button"))return!0;if(e.is('input[type="button"]'))return!0;e.is('[data-toggle="select2-tags"]')&&(n.tags=e.data("tags").split(",")),e.select2(n)}},t.fn.tkSelect2Enable=function(){this.length&&void 0!==t.fn.select2&&this.click(function(){t(t(this).data("target")).select2("enable")})},t.fn.tkSelect2Disable=function(){this.length&&void 0!==t.fn.select2&&this.click(function(){t(this.data("target")).select2("disable")})},t.fn.tkSelect2Flags=function(){if(this.length&&void 0!==t.fn.select2){var e=function(t){return t.id?"<img class='flag' src='http://select2.github.io/select2/images/flags/"+t.id.toLowerCase()+".png'/>"+t.text:t.text};this.select2({formatResult:e,formatSelection:e,escapeMarkup:function(t){return t}})}},t('[data-toggle*="select2"]').each(function(){t(this).tkSelect2()}),t('[data-toggle="select2-enable"]').tkSelect2Enable(),t('[data-toggle="select2-disable"]').tkSelect2Disable(),t("#select2_7").tkSelect2Flags()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkTouchSpin=function(){this.length&&void 0!==t.fn.TouchSpin&&this.TouchSpin()},t('[data-toggle="touch-spin"]').tkTouchSpin()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkPanelCollapse=function(){if(this.length){var e,n=t(".panel-body",this),o=n.attr("id")||(e=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e(),i=t("<div/>");i.attr("id",o).addClass("collapse"+(this.data("open")?" in":"")).append(n.clone()),n.remove(),t(this).append(i),t(".panel-collapse-trigger",this).attr("data-toggle","collapse").attr("data-target","#"+o).collapse({trigger:!1})}},t('[data-toggle="panel-collapse"]').each(function(){t(this).tkPanelCollapse()})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkModal=function(){if(this.length){var e=this.attr("href")||this.attr("target");e&&(this.click(function(t){t.preventDefault()}),t(e).modal({show:!1}))}};t.fn.tkModalDemo=function(){if(this.length){var e,n,o,i=this.attr("href")||this.attr("target"),a=t(i);i||(i=(e=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e(),this.attr("data-target","#"+i)),i.replace("#",""),a.length||(a=t((n={id:i,template:this.data("template")||"tk-modal-demo",modalOptions:this.data("modalOptions")||"",dialogOptions:this.data("dialogOptions")||"",contentOptions:this.data("contentOptions")||""},o=t("#"+n.template).html(),Handlebars.compile(o)(n))),t("body").append(a),a.modal({show:!1})),this.click(function(t){t.preventDefault(),a.modal("toggle")})}},t('[data-toggle="tk-modal-demo"]').each(function(){t(this).tkModalDemo()})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkCarousel=function(){this.length&&(this.carousel(),this.find("[data-slide]").click(function(t){t.preventDefault()}))}}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkCollapse=function(){if(this.length){var e=this.attr("href")||this.attr("target");e&&(this.click(function(t){t.preventDefault()}),t(e).collapse({toggle:!1}))}}}(jQuery)},function(t,e){!function(){"use strict";window.location!=window.parent.location&&(top.location.href=document.location.href)}()},function(t,e){var n;(n=jQuery)(".progress-bar").each(function(){n(this).width(n(this).attr("aria-valuenow")+"%")})},function(t,e){!function(t){"use strict";t.fn.tkCheckAll=function(){this.length&&this.on("click",function(){t(t(this).data("target")).find(":checkbox").prop("checked",this.checked)})},t('[data-toggle="check-all"]').tkCheckAll()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkDataTable=function(){this.length&&void 0!==t.fn.dataTable&&this.dataTable()},t('[data-toggle="data-table"]').tkDataTable()}(jQuery)},function(t,e){!function(t){"use strict";t("body").tooltip({selector:'[data-toggle="tooltip"]',container:"body"})}(jQuery)},function(t,e){!function(t){"use strict";var e,n=function(t,e,n,o){var i=t,a=e;return t/n<e/o?(i=n,a=e*(n/t)):(i=t*(o/e),a=o),{width:i,height:a}};function o(){t(".cover.overlay").each(function(){t(this).tkCover()})}t.fn.tkCover=function(){this.length&&(this.filter(":visible").not('[class*="height"]').each(function(){var e=t(this),n=e.find("img:first");n.length?t.loadImage(n.attr("src")).done(function(o){e.height(n.height()),t(".overlay-full",e).innerHeight(n.height()),t(document).trigger("domChanged")}):(n=e.find(".img:first"),e.height(n.height()),t(".overlay-full",e).innerHeight(n.height()),t(document).trigger("domChanged"))}),this.filter(":visible").filter('[class*="height"]').each(function(){var e=t(this);(e.find("img")||e.find(".img")).each(function(){var o=t(this);if(!1===o.data("autoSize"))return!0;o.is("img")?t.loadImage(o.attr("src")).done(function(t){o.removeAttr("style"),o.css(n(o.width(),o.height(),e.width(),e.height()))}):(o.removeAttr("style"),o.css(n(o.width(),o.height(),e.width(),e.height())))})}))},t(document).ready(o),t(window).on("load",o),t(window).on("debouncedresize",function(){clearTimeout(e),e=setTimeout(o,200)})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkNestable=function(){this.length&&void 0!==t.fn.nestable&&this.nestable({rootClass:"nestable",listNodeName:"ul",listClass:"nestable-list",itemClass:"nestable-item",dragClass:"nestable-drag",handleClass:"nestable-handle",collapsedClass:"nestable-collapsed",placeClass:"nestable-placeholder",emptyClass:"nestable-empty"})},t(".nestable").tkNestable()}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkExpandable=function(){this.length&&this.find(".expandable-content").append('<div class="expandable-indicator"><i></i></div>')},t(".expandable").each(function(){t(this).tkExpandable()}),t("body").on("click",".expandable-indicator",function(){t(this).closest(".expandable").toggleClass("expandable-open")}),t("body").on("click",".expandable-trigger:not(.expandable-open)",function(){t(this).addClass("expandable-open")})}(jQuery)},function(t,e){!function(t){"use strict";t.fn.tkDaterangepickerReport=function(){var t=this;this.daterangepicker({ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract("days",1),moment().subtract("days",1)],"Last 7 Days":[moment().subtract("days",6),moment()],"Last 30 Days":[moment().subtract("days",29),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract("month",1).startOf("month"),moment().subtract("month",1).endOf("month")]},startDate:moment().subtract("days",29),endDate:moment()},function(e,n){var o=e.format("MMMM D, YYYY")+" - "+n.format("MMMM D, YYYY");t.find("span").html(o)})},t.fn.tkDaterangepickerReservation=function(){this.daterangepicker({timePicker:!0,timePickerIncrement:30,format:"MM/DD/YYYY h:mm A"})},t(".daterangepicker-report").tkDaterangepickerReport(),t(".daterangepicker-reservation").tkDaterangepickerReservation()}(jQuery)},function(t,e){var n,o;n=jQuery,(o=function(){n("[data-show-hover]").hide().each(function(){var t=n(this),e=n(this).data("showHover");t.closest(e).on("mouseover",function(e){e.stopPropagation(),t.show()}).on("mouseout",function(){t.hide()})})})(),window.showHover=o},function(t,e){var n,o,i;n=jQuery,o={map:{checkbox:"fa fa-square-o",checkboxSelected:"fa fa-check-square",checkboxUnknown:"fa fa-check-square fa-muted",error:"fa fa-exclamation-triangle",expanderClosed:"fa fa-caret-right",expanderLazy:"fa fa-angle-right",expanderOpen:"fa fa-caret-down",doc:"fa fa-file-o",noExpander:"",docOpen:"fa fa-file",loading:"fa fa-refresh fa-spin",folder:"fa fa-folder",folderOpen:"fa fa-folder-open"}},i={autoExpandMS:400,focusOnClick:!0,preventVoidMoves:!0,preventRecursiveMoves:!0,dragStart:function(t,e){return!0},dragEnter:function(t,e){return!0},dragDrop:function(t,e){e.otherNode.moveTo(t,e.hitMode)}},n.fn.tkFancyTree=function(){if(this.length&&void 0!==n.fn.fancytree){var t=["glyph"];void 0!==this.attr("data-tree-dnd")&&t.push("dnd"),this.fancytree({extensions:t,glyph:o,dnd:i,clickFolderMode:3,checkbox:void 0!==this.attr("data-tree-checkbox")||!1,selectMode:void 0!==this.attr("data-tree-select")?parseInt(this.attr("data-tree-select")):2})}},n('[data-toggle="tree"]').each(function(){n(this).tkFancyTree()})},function(t,e){t.exports=function(){var t=$.cookie("skin");return void 0===t&&(t="default"),t}},function(t,e,n){!function(t){n(51)();t(".tabbable .nav-tabs").each(function(){var e=t(this).niceScroll({cursorborder:0,horizrailenabled:!0,oneaxismousemode:!0}),n=e.getContentSize;e.getContentSize=function(){var t=n.call(e);return t.h=e.win.height(),t}}),t("[data-scrollable]").getNiceScroll().resize(),t(".tabbable .nav-tabs a").on("shown.bs.tab",function(e){var n=t(this).closest(".tabbable"),o=t(e.target),i=o.attr("href")||o.data("target");n.find(".nav-tabs").getNiceScroll().resize(),t(i).find("[data-scrollable]").getNiceScroll().resize()})}(jQuery)},function(t,e,n){n(52),n(50),n(49),n(48),n(47),n(46),n(45),n(44),n(43),n(42),n(41),n(40),n(39),n(38),n(37),n(36),n(35),n(34),n(33),n(32),n(31),n(30),n(29),n(28),n(27)},function(t,e,n){n(53),n(26),n(16),n(9),window.googleMapsOnLoad=n(3),n(0)}]);
//# sourceMappingURL=bundle.js.map