(function () {
    if (!window.hasCondensingTestExecuted) {
        var css = '<style id="custom-package-css">\
    .cs-bg {\
        background: #5E544B;\
        color: #fff !important;\
        padding-top: 10px;\
        padding-bottom: 10px;\
    }\
   \
   .cs-bg label span{\
        color:#fff;\
    }\
   \
    package.custom-package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div.col-md-6 > div > div{\
        width:100%\
    }\
   \
    package.custom-package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(3) > div > div.col-md-6.col-md-12 > common-text > div > common-label > label > span{\
       white-space: nowrap;\
    }\
   \
    package.custom-package > section > div.panel-body [id^=nbsIrregularPackgeHelpToolTip] > div > div > p{\
       white-space: normal;\
    }\
   \
    package.custom-package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(3) > div > div.ups-form_group > div{\
        margin:0 !important;\
    }\
   \
    [id^=nbsIrregularPackgeHelpToolTip] > div > button{\
       top: 9px !important;\
       right: -15px !important;\
       color: #4B9DC6 !important;\
    }\
\
    @media (max-width: 1425px) {\
       [id^="nbsIrregularPackgeHelpToolTip"] > div > button {\
         margin-top: -16px;\
         margin-right: 30px;\
       }\
       package-drawer [id^="nbsIrregularPackgeHelpToolTip"] > div > button {\
           margin-top: 0px;\
           margin-right: 0px;\
       }\
   }\
   @media (max-width: 1150px) {\
       [id^="nbsPackgeHelpToolTip"] > div > button {\
           margin-top: -16px;\
       }\
       package-drawer [id^="nbsPackgeHelpToolTip"] > div > button {\
           margin-top: 0px;\
       }\
   }\
   \
   @media (max-width: 992px) {\
       [id^="nbsIrregularPackgeHelpToolTip"] > div > button {\
           margin-top: 0px !important;\
           margin-right: -32px !important;\
       }\
       [id^="nbsPackgeHelpToolTip"] > div > button {\
           margin-top: 0px;\
       }\
   }\
     \
   package.custom-package > section > div.panel-body > div.ups-form_group > div > div.col-md-6 > common-checkbox > div > div > label, label[for^=nbsPackageUnpackedCheckbox]{\
       min-width: 168px;\
       overflow: hidden;\
    }\
   \
    package.custom-package > section > div.panel-body > div.ups-even.panel-body .ups-help button{\
       color: #4B9DC6;\
    }\
    package.custom-package > section > div.panel-body > div.ups-even.panel-body .ups-help button:before {\
       top: 2.5px !important;\
    }\
    package-options .ups-input_has_unit.ups-help_wrapper .ups-help_link {\
       right: 0px !important;\
    }\
    package.custom-package > section > div.panel-body > div.ups-even.panel-body{\
       margin-top: 15px;\
    }\
   \
    package.custom-package > section > div.panel-body > .cs-bg > div:nth-child(2){\
       float: right;\
    }\
    package.custom-package > section > div.panel-body > div.ups-form_group{\
       position: absolute;\
       top: 303px;\
       z-index: 1;\
       white-space: nowrap;\
       width: 220px;\
       right: 23px;\
    }\
    package.custom-package  > section > div.panel-body > div.ups-form_group{\
       display:none;\
    }\
    package.custom-package > section div.custom-row > div.ups-form_group:last-child {\
       width: auto;\
       display: inline-block;\
    }\
    @media (min-width: 992px){\
       package.custom-package > section div.custom-row > div.ups-form_group:last-child {\
           white-space: nowrap;\
           width: 220px;\
       }\
    }    \
    package.custom-package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(2){\
        text-align:center;\
    }\
    div.custom-title {\
       padding: 30px;\
       padding-bottom: 15px;\
       padding-top: 15px;\
    }\
    .custom-head-row{\
        display:none;\
    }\
    package.custom-package .custom-head-row{\
       display:block;\
    }\
    .ups-section package-options .ups-lever .ups-lever_rlabel {\
       margin-left: 0px !important;\
   }\
   \
   removed .ups-form_wrap package.custom-package package-options .ups-checkbox-custom+.ups-checkbox-custom-label.ups-lever:before{\
       top: 11px !important;\
   }\
   \
   removed .ups-form_wrap package.custom-package package-options .ups-checkbox-custom:checked+.ups-checkbox-custom-label.ups-lever:after {\
       top: 16px !important;\
   }\
   package.custom-package .ups-toggle_list .ups-toggle_listItem {\
       border: solid #e8e8e6 1px !important;\
       margin-bottom: 11px !important;\
       padding: 5px 0px 5px 21px !important;\
   }\
   package.custom-package .ups-accordion_toggle {\
       background: #fff;\
       border-top: 1px solid #eae4e4 !important;\
       border-bottom: 1px solid #eae4e4 !important;\
   }\
   package.custom-package .ups-accordion_toggle.ups-active {\
       background: #F7F6F5 !important;\
   }\
   package.custom-package .ups-accordion_wrapper button.ups-active span.open-title{\
       display:block !important;\
   }\
   package.custom-package .ups-accordion_wrapper button:not(.ups-active) span.close-title{\
       display:block !important;\
   }\
   package.custom-package .ups-lever.ups-checkbox-custom-label{\
     width:100%;\
   }\
   package.custom-package .ups-accordion_expand {\
       padding: 15px !important;\
       margin-bottom: 0px !important;\
   }\
   package.custom-package .ups-accordion_list {\
       padding:0px !important;\
       margin:0px !important;\
   }\
   package.custom-package .ups-section {\
       margin-bottom: 16px !important;\
   }\
   #nbsShipmentPackagesAddAnotherPackage span{\
       display:none;\
   }\
   package.custom-package .ups-package_image {\
       margin-top: 30px;\
       max-width: 170px;\
       width: 100%;\
   }\
   .ups-application_wrapper .ups-input_has_unit.ups-help_wrapper .ups-form_label {\
       padding-right: 0px !important\
    }\
   section > shipment-packages > package.custom-package > section > div.panel-body > div.ups-even.panel-body .custom-row > .ups-form_group .ups-help button {\
       padding-top: 11px !important;\
   }\
   package.custom-package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(1) > div > div.ups-form_group > div > div.col-md-6{\
       padding-top: 11px !important;\
   }\
   package.custom-package > section div.custom-row > div.ups-form_group:last-child {\
       margin: 11px 0px !important;\
   }\
   package.custom-package > section > div.panel-body > div.ups-even.panel-body .custom-row div.ups-form_group > div > div.col-xs-1.text-left > spinner > img {\
    margin-left: 155px !important; \
    margin-top: 7px !important; \
    }\
    section > shipment-packages > package.custom-package > section > div.panel-body > div.ups-even.panel-body .custom-row div.ups-form_group > div > div.col-xs-1.text-left > spinner > img {\
        margin-left: 122px !important; \
        margin-top: 18px !important; \
    }\
    </style>\
    ';

        // $("head").append(css);
        try {
            updatePackageInfo();
        } catch (e) {

        }
        function updatePackageInfo() {
            $("#custom-package-css").remove();
            if (!document.querySelector("#ewsSimpleRateCancelBannerText")) {
                $("head").append(css);
                $("package.custom-package").removeClass("custom-package");
                $("select[id^=nbsPackagePackagingTypeDropdown]").closest(".row").addClass("cs-bg");
                $("#nbsShipmentPackagesAddAnotherPackage").removeClass("ups-cta_secondary");
                if (!$("package div.row.custom-row").length) {
                    $("[id^=nbsPackageShipTip]").remove();
                    $("div.custom-head-row").remove();
                    // $("package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div.col-md-6").removeClass("col-md-6").addClass("col-md-4")

                    var weightDiv = $("package input[id^=nbsPackagePackageWeightField]").closest(".col-md-6");
                    if (weightDiv.length) {
                        weightDiv.removeClass("col-md-6").addClass("col-md-4");
                    } else {
                        weightDiv = $("package input[id^=nbsPackagePackageWeightField]").closest(".col-md-4");
                    }

                    var weight = weightDiv.insertAfter("package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(2)");

                    weight.append($("<div class='col-md-12'></div>"));
                    weight.find(".row").appendTo(weight.find(".col-md-12"));

                    $("package > section > div.panel-body input[id^=nbsPackageDeclaredValueField]").closest(".col-md-6").appendTo(weight);
                    // $("package > section > div.panel-body > div:nth-child(4) > div").appendTo(weight);

                    weight.find(".col-md-6").addClass("col-md-12");
                    $("package > section > div.panel-body > div.ups-even.panel-body > div:nth-child(1) > div.col-md-6").removeClass("col-md-6").addClass("col-md-4");
                    $("package > section > div.panel-body > div.ups-form_group > div.row").removeClass("row");
                    weight.append($("package > section > div.panel-body > div.ups-form_group"))
                    //all children of row
                    var children = weight.children();
                    weight.append("<div class='row custom-row'></div>");
                    children.appendTo(weight.find("div.row.custom-row"));
                    $("package > section > div.panel-body").each(function (index, ele) {
                        $('<div class="row custom-head-row"><div class="col-md-12 custom-title">Package ' + (index + 1) + ' of ' + $("package").length + '</div></div>').insertBefore(ele);
                    });
                    setTimeout(function () {
                        updatePackageOptions();
                    }, 100);

                    $("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(1)").insertAfter($("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(3)"));
                    $("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(1)").insertAfter($("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(2)"));

                    // document.removeEventListener("change", updatePackageOptions);
                    // document.addEventListener("change", function (event) {
                    //     // console.log(event.target);
                    //     setTimeout(function () {
                    //         updatePackageOptions();
                    //     }, 1000);
                    // });

                    var observerForPackageOptions = new MutationObserver(function () {
                        updatePackageOptions();
                    });

                    observerForPackageOptions.observe(document.querySelector("package-options"), { childList: true, subtree: true });


                    //For single-page view
                    if (~window.location.href.indexOf("ups.com/ship/single-page")) {
                        $("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(2)")
                            .removeClass("col-xs-6").addClass("col-xs-4")
                            .append('<div class="ups-package_image_container hidden-sm hidden-xs ng-star-inserted"><!----><img class="ups-package_image ng-star-inserted" src="/assets/resources/images/shipping_packages/custom-box-shipping-icons.svg" alt="My Packaging"><!----></div>');
                        var dimRow = $("package input[id^=nbsPackagePackageLengthField]").closest("div.row");
                        dimRow.find(".col-md-4").removeClass("col-md-4").addClass("col-md-12");
                        var unit = dimRow.find("common-input-uom");
                        var lastUnit = unit.last();
                        dimRow.find("common-input-uom").eq(0).replaceWith(lastUnit.clone());
                        dimRow.find("common-input-uom").eq(1).replaceWith(lastUnit.clone());
                    }
                }

                //For single-page view
                if (~window.location.href.indexOf("ups.com/ship/single-page")) {
                    $("package > section > div.panel-body.ng-star-inserted > div.ups-even.panel-body > div:nth-child(1) > div:nth-child(1) > div > div.col-xs-4").removeClass("col-xs-4").addClass("col-xs-12");
                }

                $("package input[id^=nbsPackagePackageWeightField]").closest("package").addClass("custom-package");
            }
        }

        function updatePackageOptions() {
            $("package-options").find(".ups-lever_label").removeClass("ups-lever_label");
            $("package-options label input").each(function (ind, ele) {
                var input = ele;
                $(input).addClass("ups-checkbox-custom").closest(".ups-toggle_listItem").addClass("ups-toggle_listItem ups-checkbox ups-input_wrapper");
                $(input).closest("label").addClass("ups-checkbox-custom-label").find(".ups-lever_switch").remove();
                $(input).prependTo($(input).closest("common-switch"));
            });
            setTimeout(function () {
                var cBox = $("package > section > div.panel-body > div.ups-form_group");
                if (cBox.length) {
                    cBox.find(".row").removeClass("row");
                    $("div.custom-row").append(cBox);
                }
            }, 200);

            //For single-page view
            if (~window.location.href.indexOf("ups.com/ship/single-page")) {
                var dimRow = $("package input[id^=nbsPackagePackageLengthField]").closest("div.row");
                dimRow.find(".col-md-4").removeClass("col-md-4").addClass("col-md-12");
                var unit = dimRow.find("common-input-uom");
                var lastUnit = unit.last();
                dimRow.find("common-input-uom").eq(0).replaceWith(lastUnit.clone());
                dimRow.find("common-input-uom").eq(1).replaceWith(lastUnit.clone());
            }
        }


        var mt = new MutationObserver(function (ele, observer) {
            // console.log(ele);
            setTimeout(function () {
                try {
                    updatePackageInfo();
                } catch (e) {

                }
            }, 0)
        });

        mt.observe(document.querySelector("body"), { childList: true, subtree: true });
        // mt.observe(document.querySelector("shipment-packages"), { childList: true, subtree: true });
        window.hasCondensingTestExecuted = true;
    }
})();