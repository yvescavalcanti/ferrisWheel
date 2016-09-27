(function($){
    
    
    var methods = {
    	// initialization
    	init: function(r,options){
    	    var settings = $.extend({
    	    	r: Math.min(this.height()/2,this.width()/2),
            	start:90,
            	rotateNode:true
            },options);
            
            //setup rotate function
            if(settings.rotateNode){
            	methods.rotate = function(angle){
    				$('.spin-wheel-node').css({'transform':'rotate('+(-angle)+'deg)'});
    				$(this).css({'transform':'rotate('+angle+'deg)'});
    			};
    		}else{
    			methods.rotate = function(angle){
    				$(this).css({'transform':'rotate('+angle+'deg)'});
    			};	
    		}
    		
 		   	var n = $('.spin-wheel-node').length;
		    var step = 2*Math.PI/n;
			var angle = -Math.PI/2;
    		var cx = this.width()/2-30;
    		var cy = this.height()/2-30;
    		var x,y;
    		$('.spin-wheel-node').each(function(){
    			x = cx+Math.round(settings.r*Math.cos(angle));
    			y = cy+Math.round(settings.r*Math.sin(angle));  
    			$(this).css({'left':x,'top':y});
    			$(this).css({'visibility':'visible'});
    			$(this).attr('angle',Math.round(angle*180/Math.PI)%360);
    			angle-=step;
    			$(this).on("click",function(){
    				var a = -(parseInt($(this).attr('angle'))+90);
    				$(".spin-wheel").spinWheel('rotate',a);
    			});
    		});
    	},
    	
    };

    
    
    $.fn.spinWheel = function(method){
    	if (methods[method]){
    		return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
    	}else if(typeof method ==='object' || !method){
    		return methods.init.apply(this, arguments);
    	}else{
    		$.error('Method '+method+' does not exist for spinWheel!');
    	}
    };
    
})(jQuery);
