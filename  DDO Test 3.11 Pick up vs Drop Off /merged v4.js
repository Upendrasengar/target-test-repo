(function () {
    if (!window.hasGuidedTestExecuted) {
        var config = {
            childList: true,
            subtree: true,
            attributes: true
        };
        var css = '<style>\
                common-view-toggle.custom-options fieldset .ups-input_wrapper:first-child{\
                    width:40% !important;\
                }\
                common-view-toggle.custom-options fieldset .ups-input_wrapper:last-child{\
                    width:60% !important;\
                }\
                .cust-width{ width: 50% !important} .cust-message { display: block; font-size: smaller; color: #808080; } common-view-toggle.custom-options .cust-message {position: absolute;z-index: 1; white-space: nowrap;}\
                common-view-toggle.custom-options .ups-toggle_view_left:before, .ups-toggle_view_right:before\
                {\
                    display:none;\
                }\
            </style>\
        ';

        $("head").append(css);
        try {
            updateInterface();
        } catch (e) {

        }
        function updateInterface() {
            var cvt = $("common-view-toggle");
            if (cvt.length && !cvt.hasClass("custom-options")) {
                if (!window.hasTestDefaultSelected) {
                    //Dispatch click on schedule a pick-up
                    setTimeout(function () {
                        $("#nbsShipmentServicesDropOffPickupViewToggleOption2InputId").click();
                    }, 100);
                    window.hasTestDefaultSelected = true;
                }

                //start of guided view handling
                if (~window.location.href.indexOf("ups.com/ship/guided")) {
                    setTimeout(function () {
                        $("common-view-toggle fieldset div p").parent().remove()
                        $("common-view-toggle fieldset div label").removeClass("ups-form_label").addClass("ups-radio-custom-label")
                        $("common-view-toggle fieldset div").removeClass("ups-toggle_view_selection").addClass("ups-input_wrapper ups-buttonList_wrapper")
                        $("common-view-toggle fieldset div").removeClass("col-md-4").addClass("col-md-6");
                        $("#nbsPickupServicePageShipmentServices > section > div > h2 > span").text("Choose Pick-Up or Drop-Off");
                        $("[for=nbsShipmentServicesDropOffPickupViewToggleOption2InputId] span:first-child").text("Schedule a pickup");
                        var div = $("common-view-toggle fieldset div");
                        if (!~div[0].textContent.indexOf("Schedule"))
                            $(div[0]).insertAfter(div[1]);
                        $("common-view-toggle.custom-options fieldset .ups-input_wrapper:last-child").css("text-align", "right");
                    }, 200);
                } else {
                    $("#nbsShipmentServices > section > div > h2 > span").text("Choose Pick-Up or Drop-Off");
                }
                //End of guided view 

                //Add class
                $("common-view-toggle").addClass("custom-options");

                //Disconnect observer
                if (window.pcMt) {
                    window.pcMt.disconnect();
                }

                var poll = function () {
                    console.debug("Polling for pricebar");
                    var priceBar = document.getElementById("nbsBalanceBarTotalCharges");
                    if (priceBar) {
                        setObserverForPriceChange();
                    } else {
                        setTimeout(poll, 500);
                    }
                }

                poll();

                function setObserverForPriceChange() {
                    window.resetCounter = 1;
                    console.debug("Called setObserverForPriceChange")
                    window.pcMt = new MutationObserver(function (mList, newObserver) {
                        //Run as soon as available in DOM
                        try {
                            window.resetCounter = 1;
                            console.debug("MO running Update pickup date");
                            pickupDate();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    );
                    window.pcMt.observe(document.querySelector("#total-charges-spinner"), config);
                    pickupDate();
                }

            };
            $("common-view-toggle").addClass("custom-options");
        }
        var mt = new MutationObserver(function (ele, observer) {
            setTimeout(function () {
                try {
                    updateInterface();
                } catch (e) {

                }
                // console.debug("observer running for condense information");
            }, 0);
        });

        mt.observe(document.querySelector("body"), {
            childList: true,
            subtree: true,
            attributes: true
        });

        // mt.observe(document.querySelector("shipment-packages"), { childList: true, subtree: true });
        window.hasGuidedTestExecuted = true;

        //Cancel shipment handler
        document.addEventListener("click", cancelShipmentHandler, true);

        function cancelShipmentHandler(event) {
            if (event.target.id == "nbsCancelShipmentWarningYes" || event.target.id == "nbsButtonDrawer4") {
                //Since user is cancellling shipment so again select schedule pick up by default as a fresh journey
                if (event.target.id == "nbsCancelShipmentWarningYes" || event.target.id == "nbsButtonDrawer4") {
                    window.hasTestDefaultSelected = false;
                }
            }
        }

        $(document).on("change", "#nbsShipmentServicesDropOffPickupViewToggleOption2InputId", function () {
            window.resetCounter = 1;
            pickupDate();
        });

        function pickupDate() {
            try {
                var divs = $("#nbsShipmentServicesDropOffPickupViewToggleOption1InputId").closest("fieldset").find("div");
                if (divs.length == 2) {
                    $("#nbsShipmentServicesDropOffPickupViewToggleOption1InputId").closest("fieldset").find("div").addClass("col-md-6 cust-width");
                    if (divs[0].querySelector("input").id == "nbsShipmentServicesDropOffPickupViewToggleOption1InputId")
                        $(divs[0]).before(divs[1]);
                }
            } catch (e) {
                console.debug(e);
            }

            console.debug("function called pickupDate");
            // simulating click on expand button to expand
            $('#nbsBalanceBarExpandButton').trigger("click");
            $("#nbsBalanceBarBody").css("display", "none");

            var ele = document.querySelector('#nbsBalanceBarPickupChargesSubtotals > div > div.col-xs-6.text-right');
            var pickupCharges = null;
            if (ele || window.pickupCharges) {
                // extracting pickupCharges
                pickupCharges = (ele && ele.innerText);
                window.pickupCharges = (ele && ele.innerText) || window.pickupCharges;
                console.debug(window.pickupCharges);
                // $("[for=nbsShipmentServicesDropOffPickupViewToggleOption2InputId] span").text("Schedule a pick-up (+" + pickupCharges + ")");
                $("[for=nbsShipmentServicesDropOffPickupViewToggleOption1InputId]").html("Drop-off shipment or include it in another pick-up <span class='cust-message'>-" + window.pickupCharges + "</span>");
            } else {
                $("[for=nbsShipmentServicesDropOffPickupViewToggleOption1InputId]").html("Drop-off shipment or include it in another pick-up");
            }
            $("[for=nbsShipmentServicesDropOffPickupViewToggleOption2InputId] span:first-child").text("Schedule a pickup");

            // simulating click on expand button to collapse
            $('#nbsBalanceBarExpandButton').trigger("click");

            setTimeout(function () {
                var isChecked = $("#nbsShipmentServicesDropOffPickupViewToggleOption2InputId").is(":checked");
                if (isChecked && pickupCharges == null && window.resetCounter <= 10) {
                    console.debug("Again called pickup date because schedule is checked and price not found");
                    window.resetCounter++;
                    pickupDate();
                }
            }, 1000);

        }
    }
}
)();