(function() {
    if (!window.hasPromotionalCodeSet) {
        var modalHtml = '<div id="promotional_modal" aria-hidden="false" class="modal fade ups-form_wrap in" role="dialog" style="display: none;" tabindex="-1"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><!----><button id="closePromotionalModal"class="close ng-star-inserted" data-dismiss="modal"><span aria-hidden="true" class="ups-icon-x"></span><span class="ups-readerTxt">Close</span></button><h2 class="modal-title">Get up to 40% off!<h2><p style="display:inline-block;">When you use the "Easy" promotion code</p></div><div class="modal-body ups-form_wrap"> <div></div> <div> Nunce Congue lacus tincident portitor posuere. </div> <div class="ups-clear ups-form_ctaGroup text-center ups-noTxt"><button class="ups-cta ups-cta_primary" id="applyPromotionalCode" type="button">Apply Code</button></div></div></div></div></div><div id="promotional_overlay" class="modal-backdrop fade in"></div>';

        var css = "<style id='Test_4.1'>\
        #promotional_modal{\
            top :200px;\
            left :400px;\
        }\
        #promotional_modal div[class='modal-content']{\
            width :60%;\
        }\
        #promotional_modal div[class='modal-header']{\
            padding-left: 25px;\
        }\
        #promotional_modal .modal-content .modal-body.ups-form_wrap{\
            padding: 20px 25px 25px;\
        }\
        @media screen and (min-width: 992px){ \
          #promotional_modal .modal-content .modal-body.ups-form_wrap{\
            padding: 20px 25px 25px;\
          }\
        }\
        #promotional_modal .modal-header .close {\
            margin-top: -20px;\
        }";

        $('body').append(css);

        attachObserver();

        function attachObserver() {
            var target = document.querySelector('body');
            var config = {
                childList: true,
                attributes: true,
                subtree: true
            };
            var callback = function(mutations, observer) {
               if (location.href.indexOf('promoCodeAlias') < 0 && document.querySelector("payment promo-code label[for='nbsPromoCodeUsePromoCodeSwitch']")) {
                    setTimeout(function() {
                        if (window.promotionalCode) {
                            applyPromoCodeInPayments();
                        }
                    }, 500);
                }
            };
            detailsMutationObserver = new MutationObserver(callback);
            detailsMutationObserver.observe(target, config);
        }

        function openPromotionalModal() {
            if(displayModal()) {
                var modal = document.getElementById("promotional_modal");
                if (!modal) {
                    $('body').append(modalHtml);
                    modal = document.getElementById("promotional_modal");
                }
                modal.style.display = "block";
            }     
        }

        $(document).on("click", "a", function(event) {
            if (event.target.tagName === 'A') {
                if (!window.showAlertMessage && event.target.getAttribute('href') && event.target.getAttribute('href').length > 1) {
                    if (event.target.innerText != 'Log In' || event.target.innerText != 'Cancel Shipment') {
                        window.showAlertMessage = true;
                        if (!event.target.getAttribute('target') || event.target.getAttribute('target') != '_blank') {
                            openPromotionalModal();
                            event.preventDefault();
                        }
                    }
                }
            }
        });

        $(document).on("click", "#closePromotionalModal", function(event) {
            closePromotionalModal();
        });

        $(document).on("click", "#applyPromotionalCode", function(event) {
            window.promotionalCode = "EASY";
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 1 * 3600 * 1000);
            docCookies.setItem("promotionalCode", window.promotionalCode, expirationDate.toUTCString(), "/", ".ups.com", true);
            closePromotionalModal();
        });

        function closePromotionalModal() {
            var modal = document.getElementById("promotional_modal");
            modal.style.display = "none";
            $(modal).remove();
            $('#promotional_overlay').remove();
        }

        function applyPromoCodeInPayments() {
            var promoToggle = $("promo-code label[for='nbsPromoCodeUsePromoCodeSwitch']");
            promoToggle.click();
            var input = document.querySelector("input[id='nbsPromoCodePaymentPromoCode']");
            if (input && $('#nbsApplyOrRemovePromoCodeBtn').length == 1) {
                input.value = window.promotionalCode;
                input.dispatchEvent(getEvent());                                                
                window.promotionalCode = null;                                  
            }
        }

        function getEvent() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                var ev = document.createEvent("Event");
                ev.initEvent("input", false, true);
                return ev;
            }
            else {
                return new Event("input");
            }
        }

        function displayModal() {
            var flag = false;
            if(location.href.indexOf('guided') >0)  {
                if(location.href.indexOf('ship/guided/pickup-service') >0 || location.href.indexOf('ship/guided/options') >0 || location.href.indexOf('ship/guided/payment') >0) {
                    flag =  true;
                }                                
            } else if(location.href.indexOf('single-page') >0) {
                flag = true;
            } 
            return flag;
        }
        
        window.hasPromotionalCodeSet = true;
    }
}
)();
