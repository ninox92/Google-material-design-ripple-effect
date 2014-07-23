#Google material design ripple effect
====================================

jQuery plugin recreates ripple and focus effect using css animations.
A span element will be added as a sibling. This is then animated.
In a later version I'll be using a SVG element to recreate the effects, 
but this will do just fine for now.


How to use the plugin:
Just as simple as this!

```rippleOptions = {
		 	'elements' 	:'.btn, ul.ripple li a',
		 	'focus' 	:'.btn'
		 	};

rippleEffect = new $.RippleEffect(rippleOptions);```


Apply ripple or focus elements using .classes or #id's 
