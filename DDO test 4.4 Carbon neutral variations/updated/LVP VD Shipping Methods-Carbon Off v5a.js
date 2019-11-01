(function () {
    if (!window.carbonNeutralVariation) {
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }

        var css = "<style name='DDO_4.4'>\
					.icon-leaf {\
						background: url('https://www.ups.com/assets/resources/images/DDO-Experiments/4.4_UPS_leaf.svg');\
						height: 23px;\
						width: 20px;\
						display: inline-block;	\
						background-repeat :no-repeat;\
						background-size :16px;\
					}\
                    .background-add {\
                        border-radius : 5px;\
                        background-color: #d4d3b3;\
                        margin: -7px -15px 0 -15px;\
                        padding: 6px 0px 0px 14px;\
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
                        margin-left: 15px;\
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
                    carbon-neutral-option details p{\
                        margin-right: 5px;\
                     }\
                     carbon-neutral-option switch-header strong,carbon-neutral-option details summary{\
                        font-size: 0.95em !important;\
                    }\
                     section base-option label{\
                        padding-left: 25px !important;\
                    }\
                    </style>";

        $("head").append(css);

        attachObserver();

        function attachObserver() {
            var target = document.querySelector('body');
            var config = {
                childList: true,
                attributes: true,
                subtree: true
            };
            var callback = function (mutations, observer) {
                if (document.querySelector("input[id='nbsCarbonNeutralOptionBaseOptionSwitch']")) {
                    setTimeout(function () {
                        var nodes = document.querySelectorAll('section common-switch');
                        if (nodes.length > 0) {
                            nodes.forEach(function (node) {
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
            if (labelNode) {
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
                if (labelNode.getAttribute('for') === 'nbsCarbonNeutralOptionBaseOptionSwitch') {
                    $(labelNode).find('switch-header>strong').text('UPS carbon neutral');
                    var parent = document.querySelector('section > div.ups-toggle_list')
                    parent.insertBefore(document.querySelector('carbon-neutral-option'), document.querySelector('saturday-delivery-option'));
                    modifyLabelV5(labelNode);
                }
                var labels = $('section common-switch switch-header>strong[class*="ups-form_label"]');
                labels.each(function (item) {
                    if (labels[item] && labels[item].innerText.indexOf('carbon neutral') < 0) {
                        $(labels[item]).css('font-weight', 'normal');
                    }
                });
            }
        }

        function modifyLabelV5(labelNode) {
            $("<span class='icon-leaf'></span>").insertBefore($(labelNode).find('switch-header'));
            labelNode.getElementsByClassName('ups-form_label')[0].classList.add('form-label-align');
            $("input[id='nbsCarbonNeutralOptionBaseOptionSwitch']").closest('div').addClass('background-add');
            $(labelNode).find('switch-header>strong').text('UPS carbon neutral - Interested in shipping more sustainably?').addClass('carbon-neutral-text');
            $(labelNode).find('switch-header').addClass('switch-header-inline');
            $(labelNode).find('switch-header').closest('div').append('<details close><summary class="detail-label-summary"><span id="carbonNeutralLearnMore" style="text-decoration: underline;">Learn More</span></summary><p style="font-size:0.92em;">Select UPS carbon neutral and support environmental projects that counterbalance the emissions associated with shipping your package. Up to $0.20 for domestic US shipments. Up to $0.75 for international shipments.</p></details>');
        }

        window.carbonNeutralVariation = true;
    }

}
)();
