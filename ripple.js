/*!
 * Google material design ripple effect
 * By Thomas Reynders http://thomasreynders.com
 * MIT Licensed.
 * 
 * Version 1.0
 * based on : http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
 * https://github.com/ninox92/Google-material-design-ripple-effect/
 */
(function ( $ ) {
	
	/**
	 *create a new jquery class object 
	 */
   	$.RippleEffect = function(o) {
		this.init(o);
	};

	/**
	 * Override 
	 */
	$.RippleEffect.prototype = {
		defaults:{
			//DO NOT CHANGE ORDER
			classes: ['animate', 'focus'],//animation classes
			sibling: '.ink',
			focusTimeOut: 500
		},
		data:{},//data from options
		init: function(o) {
			// initializes properties and methods
			this.setOptions(o);
			this.bind();
		},
		setOptions:function(o) {
			var obj = new Object();
			//append defaults
			for (var attrname in this.defaults) { obj[attrname] = this.defaults[attrname]; }
			//append options
			for (var attrname in o) { obj[attrname] = o[attrname]; }
			this.data = obj;
			
			return this;
		},
		bind: function(){
			var _ = this;
			//bind mouse down event to elements object from data
			if(this.data.elements){
				$(this.data.elements).mousedown(function(e){
					
					_.animate($(this), e, _.data.classes[0]);// make it animate
				});
			} else {
				throw new TypeError("Function.prototype.bind - Please set up the options for RippleEffect correctly! No elements are set, new $.RippleEffect({'elements':'.btn, ul li a'})"); 
			}
			if(this.data.focus){
				
				$(this.data.focus).focus(function(e){
					//add focus state to a element
					var _e = e,
						$t = $(this);
						
					setTimeout(function(){
						_.animate($t, _e, _.data.classes[1]);
					},_.data.focusTimeOut);
					
				});
				//remove the class on focus out
				$(this.data.focus).focusout(function(){
					$(this).find(_.data.sibling).removeClass(_.data.classes[1]);
				});
			}
			
		},
		animate: function(el, e, cssclass){
			tag = el.get(0).tagName;
			switch(tag){//check for what sort of element is clicked
				case "A":
				parent = el.parent();
					break;
				case "BUTTON":
				parent = el;
					break;
				default:
				parent = el;
					break;
			}
			//create .ink element if it doesn't exist
			if(parent.find(this.data.sibling).length == 0)
				parent.prepend("<span class='ink'></span>");
				
			ink = parent.find(this.data.sibling);
			//incase of quick double clicks stop the previous animation
			this.removeCssClasses();
			//ink.removeClass(cssclass);
			
			//set size of .ink
			ink.resetDimensions();
			
			//get click coordinates
			//set to the middle of the element
			//set the position and add class .animate
			if(cssclass == this.data.classes[0]){
				x = e.pageX - parent.offset().left - ink.width()/2;
				y = e.pageY - parent.offset().top - ink.height()/2;
				ink.css({top: y+'px', left: x+'px'}).addClass(cssclass);
			} else {
				ink.center().addClass(cssclass);
			}
		},
		removeCssClasses: function(){
			var c = this.data.classes;
			for(var i=0; i<c.length; i++){
				if( ink.hasClass(c[i]) ) ink.removeClass(c[i]);
			}
		},
		
	};
	jQuery.fn.center = function () {
		//Center the element based on parent element
		this.css("top",((this.parent().outerHeight()/2) - (this.outerHeight()/2)) + 'px');
		this.css("left",(this.parent().outerWidth() - this.outerWidth()) + 'px');
		return this;
	};

	jQuery.fn.resetDimensions = function(){
		//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
		d = Math.max($(this).parent().outerWidth(), $(this).parent().outerHeight());
		$(this).css({height: d, width: d});
	};
})( jQuery );

