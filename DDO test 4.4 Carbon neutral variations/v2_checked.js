(function() {
    if (!window.carbonNeutralVariation) {
		if (window.NodeList && !NodeList.prototype.forEach) {
			NodeList.prototype.forEach = Array.prototype.forEach;
		}
  		
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
						background-color: #dad9b9;\ margin :-5px 0 0 -12px;\
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
					.carbon-neutral-text {\
						margin-top: -10px !important;\
					}\
					.section-checkbox-label{\
					   padding-left: 25px !important;\
					}\
                    </style>";
                    
        $("head").append(css);					
       
        attachObserver();

        var hasSetEvent = false, hasSelected = null;

        function attachObserver() {
			var target = document.querySelector('body');
            var config = {
                childList: true,
                attributes: true,
                subtree: true
            };
            var callback = function(mutations, observer) {
                if (document.querySelector("input[id='nbsCarbonNeutralOptionBaseOptionSwitch']")) {					                	
                    setTimeout(function() {
                    	if ($("#nbsCarbonNeutralOptionBaseOptionSwitch").length && hasSelected != $("#nbsCarbonNeutralOptionBaseOptionSwitch").is(":checked")) {
							$("#nbsCarbonNeutralOptionBaseOptionSwitch").click();
							hasSelected = true;
							if (!hasSetEvent) {
								$(document).on("change", "#nbsCarbonNeutralOptionBaseOptionSwitch", function (e) {
									hasSelected = e.target.checked;
								});
								hasSetEvent = true;
							}
						}
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
					$("label span[class='ups-lever_switch']").remove();
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
					  modifyLabelV2(labelNode);
				}	
            }          				           
        }       			

		function modifyLabelV2(labelNode) {
			 $("<span class='icon-leaf'></span>").insertBefore($(labelNode).find('switch-header'));
             labelNode.getElementsByClassName('ups-form_label')[0].classList.add('form-label-align');            
			 $("input[id='nbsCarbonNeutralOptionBaseOptionSwitch']").closest('div').addClass('background-add');
			 $(labelNode).find('switch-header>strong').addClass('carbon-neutral-text');
			 $(labelNode).find('switch-header').addClass('switch-header-inline');
			 $('shipment-options common-switch input[type="checkbox"]+label').addClass('section-checkbox-label');
        }
          	 
        window.carbonNeutralVariation = true;
    }

}
)();
