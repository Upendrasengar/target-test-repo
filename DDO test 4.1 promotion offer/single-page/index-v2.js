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
   
    function openPromotionalModal() {
        var modal = document.getElementById("promotional_modal");
        if (!modal) {
            $('body').append(modalHtml); 
            modal = document.getElementById("promotional_modal");                 
        }
        modal.style.display = "block";
    }

    $(document).on("click","#closePromotionalModal", function(event) {      
        var modal = document.getElementById("promotional_modal");
        modal.style.display = "none";
        $(modal).remove();  
        $('#promotional_overlay').remove();    
    }); 

    $(document).on("click","button[id='nbsSessionExpirationOk']", function(event) {      
        if(!window.showPromotionalAlertMessage){
            window.showPromotionalAlertMessage = true;	
            $("button[id='nbsSessionExpirationOk']").closest('common-modal > div').remove();
            openPromotionalModal();  
        }
    }); 

})();
