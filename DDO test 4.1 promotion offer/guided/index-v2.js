(function() {
    window.showPromotionalAlertMessage = false;
      var modalHtml = '<div id="promotional_modal" aria-hidden="false" class="modal fade ups-form_wrap in" role="dialog" style="display: none;" tabindex="-1"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><!----><button id="closePromotionalModal"class="close ng-star-inserted" data-dismiss="modal"><span aria-hidden="true" class="ups-icon-x"></span><span class="ups-readerTxt">Close</span></button><h2 class="modal-title">Get up to 40% off!<h2><p style="display:inline-block;">When you use the "Easy" promotion code</p></div><div class="modal-body ups-form_wrap"> <div></div> <div> Nunce Congue lacus tincident portitor posuere. </div> <div class="ups-clear ups-form_ctaGroup text-center ups-noTxt"><button class="ups-cta ups-cta_primary" id="applyPromotionalCode" type="button" onclick ="applyPromotionalCode()">Apply Code</button></div></div></div></div></div><div id="promotional_overlay" class="modal-backdrop fade in"></div>';

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
            if (document.querySelector("button[id='nbsSessionExpirationOk']") && !window.showPromotionalAlertMessage){
                setTimeout(function() {
                    window.showPromotionalAlertMessage = true;	
                    var modal = $('button[id="nbsSessionExpirationOk"]').closest('div[class*="modal-dialog"]').parent();
                    modal.remove();
                    observer.disconnect();
                    openPromotionalModal();                    
                }, 1000);
            } else if (document.querySelector("payment promo-code label[for='nbsPromoCodeUsePromoCodeSwitch']")) {
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
        var modal = document.getElementById("promotional_modal");
		if (!modal) {
		  $('body').append(modalHtml);	
		  modal = document.getElementById("promotional_modal")	
		} 
        modal.style.display = "block";
    }

    $(document).on("click","#closePromotionalModal", function(event) {      
        var modal = document.getElementById("promotional_modal");
        modal.style.display = "none";
        $(modal).remove();  
        $('#promotional_overlay').remove();    
    }); 

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

})();
