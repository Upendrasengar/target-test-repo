(function() {
    if (!window.carbonNeutralVariation) {
  		
  		 var css = "<style name='DDO_4.4'>\
                    .icon-leaf {\
						background: url(https://i.ibb.co/qRckX5r/green-Leaves.png);\
						height: 20px;\
						width: 20px;\
						display: inline-block;	\
						background-repeat :no-repeat;\
						background-size :24px;\
					}\
					.background-add {\
						background-color: #bfc08e;\ margin :-5px 0 0 -12px;\
    					padding :5px 0  0 12px;\
					}\
					.switch-header-inline {\
					   display :inline-block;\
					   max-width :500px;\
					   marginLeft : 5px;\
					}\
					.form-label-align {\
						margin-top: 0px;\
    					padding-left: 5px;\
					}\
					.detail-label-summary {\
						padding-left: 500px;\
    					margin-top: -30px;\
    					border: 0px;\
					}\
                    </style>";
                    
        $("head").append(css);					
       
        attachObserver();
       
        function attachObserver() {
            var target = document.querySelector('#ups-main > div.ups-form_wrap.ups-wrap.ups-application_wrapper.ups-app_nbs > app > ng-component > div > div > div > div');
            var config = {
                childList: true,
                attributes: true,
                subtree: true
            };
            var callback = function(mutations, observer) {
                if (document.querySelector("input[id='nbsCarbonNeutralOptionBaseOptionSwitch']")) {					                	
                    setTimeout(function() {                    	
                        var nodes = document.querySelectorAll('section common-switch');
                        if (nodes.length > 0) {
                            nodes.forEach(function(node) {
                                carbonNeutralControlVariation(node);                               
                            });
                        }
                    }, 500);

                }
            };
            detailsMutationObserver = new MutationObserver(callback);
            detailsMutationObserver.observe(target, config);
        }

        function carbonNeutralControlVariation(node) {
            var parentElement = node;
            var input = node.querySelector("input[type='checkbox']");
            var labelNode = node.querySelector("label[class ='ups-lever']");
            if(labelNode){
				if (node.querySelector("label span[class='ups-lever_switch']")) {
					node.querySelector("label span[class='ups-lever_switch']").remove();
				}
				input.classList.add('ups-checkbox-custom');
				if (labelNode) {				
					labelNode.classList.add('ups-checkbox-custom-label');
					labelNode.getElementsByClassName('ups-lever_rlabel')[0].style.marginLeft = "15px";
					labelNode.getElementsByClassName('ups-form_label')[0].style.marginTop = "0px";	
					 		               
				}
				var insertedNode = parentElement.insertBefore(input, labelNode);
				if (labelNode.getAttribute('for') === 'nbsCarbonNeutralOptionBaseOptionSwitch' ) {
					  $(labelNode).find('switch-header>strong').text('UPS carbon neutral');	
					  var parent = document.querySelector('section > div.ups-toggle_list')	
					  parent.insertBefore(document.querySelector('carbon-neutral-option') , document.querySelector('saturday-delivery-option'));			 
				}	
            }          				           
        }
       			
        window.carbonNeutralVariation = true;
    }

}
)();