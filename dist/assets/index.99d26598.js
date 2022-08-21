(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class u{constructor(){this._observers=[]}subscribe(t){this._observers.push(t)}fire(t){this._observers.forEach(e=>{e.toggle(t)})}}class f{constructor(){this.$menu=document.querySelector(".header__menu")}toggle(t){var e,i,s;t==="CLOSE"&&((e=this.$menu)==null?void 0:e.classList.contains("header__menu--show"))?(i=this.$menu)==null||i.classList.remove("header__menu--show"):(s=this.$menu)==null||s.classList.add("header__menu--show")}}class b{constructor(){this.$backdrop=document.querySelector(".header__menu-backdrop")}toggle(t){var e,i,s;t==="CLOSE"&&((e=this.$backdrop)==null?void 0:e.classList.contains("header__menu-backdrop--show"))?(i=this.$backdrop)==null||i.classList.remove("header__menu-backdrop--show"):(s=this.$backdrop)==null||s.classList.add("header__menu-backdrop--show")}}const S="/assets/icon-hamburger.0c2573b0.svg",p="/assets/icon-close.4ba9bc15.svg";class v{constructor(){this.$button=document.querySelector(".header__menu-button"),this.$body=document.querySelector("body"),this.AnimationManager=new u,this.MenuObs=new f,this.BackdropObs=new b,this.AnimationManager.subscribe(this.MenuObs),this.AnimationManager.subscribe(this.BackdropObs),this.listen()}isMenuOpen(){var e;const t=(e=this.$button)==null?void 0:e.querySelector("img");return(t==null?void 0:t.getAttribute("alt"))==="Close menu"}updateInterface(){!this.$button||(this.isMenuOpen()?(this.AnimationManager.fire("CLOSE"),this.$button.innerHTML=`<img src="${S}" alt="Open menu" />`,this.$body.classList.remove("body-no-scroll")):(this.AnimationManager.fire("OPEN"),this.$button.innerHTML=`<img src="${p}" alt="Close menu" />`,this.$body.classList.add("body-no-scroll")))}listen(){var t,e;(t=this.$button)==null||t.addEventListener("click",()=>this.updateInterface()),(e=this.BackdropObs.$backdrop)==null||e.addEventListener("click",()=>this.updateInterface())}}new v;class g{constructor(){this.$dots=document.querySelectorAll(".testimonials__navigation-dot")}update(t,e){var i,s;this.$dots.length!==0&&((i=this.$dots[t])==null||i.classList.remove("testimonials__navigation-dot--selected"),(s=this.$dots[e])==null||s.classList.add("testimonials__navigation-dot--selected"))}}class E{constructor(){this.$slider=document.querySelector(".testimonials__slider"),this.$slides=document.querySelectorAll(".testimonials__slide"),this.numberOfSlides=this.$slides.length||0,this._currentSlide=0,this._prevSlide=this.numberOfSlides-1,this._nextSlide=1,this.translationStartClientX=0,this.translationMoveClientX=0,this.sliderOffset=0,this.translationOffset=0,this.Dots=new g,this.listen()}goPrevSlide(){this._currentSlide!==0&&(this.Dots.update(this._currentSlide,this._prevSlide),this._nextSlide=this._currentSlide,this._currentSlide=this._prevSlide,this._prevSlide=this._prevSlide-1)}goNextSlide(){this._currentSlide!==this.numberOfSlides-1&&(this.Dots.update(this._currentSlide,this._nextSlide),this._prevSlide=this._currentSlide,this._currentSlide=this._nextSlide,this._nextSlide=this._nextSlide+1)}resetState(){this.translationStartClientX=0,this.translationMoveClientX=0,this.translationOffset=0}applyTranslation(t){var e;(e=this.$slider)==null||e.setAttribute("style",`transform: translateX(${t}%)`)}translationRatio(){const t=window.visualViewport.width,i=(this.translationMoveClientX-this.translationStartClientX)/t*100,s=Math.round((i+Number.EPSILON)*100)/100;this.translationOffset=s,this.applyTranslation(s+this.sliderOffset)}alignSlider(t){var e;(e=this.$slider)==null||e.classList.add("smoothTransition"),this.applyTranslation(t),setTimeout(()=>{var i;(i=this.$slider)==null||i.classList.remove("smoothTransition")},300),this.sliderOffset=t}slideRatio(){const t=window.visualViewport.width;return Math.round(Number(window.getComputedStyle(this.$slides[0]).width.split("px")[0])*10)/10/t*100}saveAndCheckOffSet(){this.sliderOffset+=this.translationOffset;const e=this.slideRatio()*-this.numberOfSlides+100;this.sliderOffset>0?this.alignSlider(0):this.sliderOffset<e&&this.alignSlider(e)}handleTranslationEnd(){this.saveAndCheckOffSet();const t=Math.abs(this.sliderOffset%100);this.translationStartClientX>this.translationMoveClientX&&t<=10?this.alignSlider(this.sliderOffset+t):this.translationStartClientX>this.translationMoveClientX&&t>10?(this.alignSlider(this.sliderOffset-(100-t)),this.goNextSlide()):this.translationStartClientX<this.translationMoveClientX&&t<90?(this.alignSlider(this.sliderOffset+t),this.goPrevSlide()):this.translationStartClientX<this.translationMoveClientX&&t>=90&&this.alignSlider(this.sliderOffset-(100-t)),this.resetState()}listen(){var h,c;const t=this;function e(a){t.translationMoveClientX=a.touches[0].clientX,t.translationRatio()}function i(a){var o,d;(o=t.$slider)==null||o.removeEventListener("touchmove",e),t.handleTranslationEnd(),(d=t.$slider)==null||d.removeEventListener("touchend",i)}function s(a){var o,d;t.translationStartClientX=a.touches[0].clientX,(o=t.$slider)==null||o.addEventListener("touchmove",e),(d=t.$slider)==null||d.addEventListener("touchend",i)}(h=this.$slider)==null||h.addEventListener("touchstart",s);function r(a){t.translationMoveClientX=a.clientX,t.translationRatio()}function l(a){var o;document.removeEventListener("mousemove",r),window.innerWidth<1024?t.handleTranslationEnd():t.saveAndCheckOffSet(),(o=t.$slider)==null||o.classList.remove("grabbing"),document.removeEventListener("mouseup",l)}function m(a){var o;(o=t.$slider)==null||o.classList.add("grabbing"),t.translationStartClientX=a.clientX,document.addEventListener("mousemove",r),document.addEventListener("mouseup",l)}(c=this.$slider)==null||c.addEventListener("mousedown",m)}}new E;class ${constructor(){this.$input=document.querySelector(".footer__newsletter-input"),this.email=""}checkEmail(){const t=this.$input.value;return t===""?"EMPTY":/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)?(this.email=t,"VALID"):"INVALID"}toggle(t){switch(t){case"SUCCESS":this.$input.value="";break;case"ERROR":this.$input.classList.add("error");break;case"RESET":this.$input.classList.remove("error");break}}listen(t){this.$input.addEventListener("input",t)}}class _{constructor(){this.$errorEl=document.querySelector(".footer__newsletter-message")}setSuccess(){this.$errorEl.classList.remove("error"),this.$errorEl.innerHTML="Your email has been successfully submitted!",setTimeout(()=>{this.$errorEl.innerHTML=""},1e4)}setError(){this.$errorEl.classList.add("error"),this.$errorEl.innerHTML="Please insert a valid email"}reset(){this.$errorEl.classList.remove("error"),this.$errorEl.innerHTML=""}toggle(t){switch(t){case"SUCCESS":this.setSuccess();break;case"ERROR":this.setError();break;case"RESET":this.reset();break}}}class L{static post(t,e){return new Promise((i,s)=>{setTimeout(()=>{i({status:"201",data:e})},300)})}}class w{constructor(){this.$button=document.querySelector('[aria-label="submit email form"]'),this.ValidationManager=new u,this.InputEl=new $,this.ErrorEl=new _,this.ValidationManager.subscribe(this.InputEl),this.ValidationManager.subscribe(this.ErrorEl),this.isTyping=this.isTyping.bind(this),this.listen()}async submitEmail(){(await L.post("/email",this.InputEl.email)).status==="201"&&this.ValidationManager.fire("SUCCESS")}displayError(){this.ValidationManager.fire("ERROR")}isTyping(){this.ValidationManager.fire("RESET")}listen(){this.InputEl.listen(this.isTyping),this.$button.addEventListener("click",t=>{switch(t.preventDefault(),this.InputEl.checkEmail()){case"VALID":this.submitEmail();break;case"INVALID":this.displayError();break}})}}new w;const M=document.querySelectorAll("[data-intersect]");function O(n,t){n.forEach(e=>{var i;(e.intersectionRatio===1||e.target.getBoundingClientRect().y<0)&&((i=e.target.children[0])==null||i.classList.add("is-in-viewport"))})}const y={root:null,rootMargin:"0px",threshold:1},C=new IntersectionObserver(O,y);M.forEach((n,t)=>{setTimeout(()=>{C.observe(n)},500*t)});
