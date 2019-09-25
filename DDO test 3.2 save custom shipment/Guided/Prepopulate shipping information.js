(function () {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    var html = '<style>\
                    .ups-app_inner #recent-packages-form .cust-radio {\
                        display: inline-block !important;\
                        padding: 0px 10px !important;\
                        width: auto !important;\
                   }\
                </style>\
                <div class="row" id="recent-packages-form">\
                    <label class="col-md-12 ups-form_label" for="recent-packages-form">\
                        <span>New or Recently Shipped Packages</span>\
                    </label>\
                    <div class="col-md-2 cust-radio">\
                        <div class="ups-buttonList_wrapper ups-input_wrapper">\
                            <input class="ups-radio-custom" type="radio" checked name="recent-package" id="recent-ship-new" />\
                            <label class="ups-radio-custom-label" for="recent-ship-new">\
                                <span>New</span>\
                            </label>\
                        </div>\
                    </div>\
                </div>\
            ';

    if (!window.prepopulateShippingInfo) {
        var mtObserver = new MutationObserver(function (element, observer) {
            var pk = document.querySelector("package");
            if (pk) {
                setTimeout(function () {
                    var packagingDropdown = document.querySelector('#nbsPackagePackagingTypeDropdown0');
                    if (!document.querySelector('#ewsSimpleRateCancelBannerText') && packagingDropdown) {
                        if (packagingDropdown.selectedOptions[0].innerText === 'My Packaging') {
                            init();
                        } else {
                            var customRadio = document.querySelector("#recent-packages-form");
                            if (customRadio) {
                                customRadio.remove();
                            }
                        }
                    }             
                }, 200);
            }
        }
        );
        var pd = document.querySelector("body");//document.querySelector("package-drawer");
        mtObserver.observe(pd, {
            childrens: true,
            subtree: true,
            attributes: true
        });
        var shipData = docCookies.getItem("shipData");
        if (shipData)
            shipData = JSON.parse(shipData);
        //Has to be done once
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
        document.addEventListener("change", function changeHandler(event) {
            if (event.target.name == "recent-package") {
                var package = $(event.target).closest("package");
                if (event.target.id == "recent-ship-new") {
                    package.find("input[id^=nbsPackagePackageWeightField]").val("")[0].dispatchEvent(getEvent());
                    package.find("input[id^=nbsPackagePackageLengthField]").val("")[0].dispatchEvent(getEvent());
                    package.find("input[id^=nbsPackagePackageWidthField]").val("")[0].dispatchEvent(getEvent());
                    package.find("input[id^=nbsPackagePackageHeightField]").val("")[0].dispatchEvent(getEvent());
                    return;
                }
                var ind = $(event.target).attr("data-index");
                if (shipData) {
                    var dimensions = shipData[ind];
                    package.find("input[id^=nbsPackagePackageWeightField]").val(+dimensions["we"])[0].dispatchEvent(getEvent());
                    if (Object.keys(dimensions).length > 1) {
                        package.find("input[id^=nbsPackagePackageLengthField]").val(+dimensions["l"])[0].dispatchEvent(getEvent());
                        package.find("input[id^=nbsPackagePackageWidthField]").val(+dimensions["w"])[0].dispatchEvent(getEvent());
                        package.find("input[id^=nbsPackagePackageHeightField]").val(+dimensions["h"])[0].dispatchEvent(getEvent());
                    } else {
                        package.find("input[id^=nbsPackagePackageLengthField]").val("")[0].dispatchEvent(getEvent());
                        package.find("input[id^=nbsPackagePackageWidthField]").val("")[0].dispatchEvent(getEvent());
                        package.find("input[id^=nbsPackagePackageHeightField]").val("")[0].dispatchEvent(getEvent());
                    }
                }
            }
        }, true);

        function init() {
            var customRadio = document.querySelector("#recent-packages-form");
            if (!customRadio) {
                var row = $("package").find("input[id^=nbsPackageUnpackedCheckbox]").closest(".row")
                if (row) {
                    shipData = docCookies.getItem("shipData");
                    if (shipData) {
                        shipData = JSON.parse(shipData);
                        // var packages = document.querySelectorAll("package");
                        if (shipData && shipData.length) {
                            $(html).insertAfter(row);
                            // packages.forEach(function (package) {
                            // $(package).find(".row").first().find("div.col-md-6").removeClass(".col-md-6").addClass("col-md-4");
                            shipData.forEach(function (sp, index) {
                                var label = getShipLabel(sp);
                                var radioEle = getRadioHtml(label, index);
                                $("#recent-packages-form").append(radioEle);
                            });
                            // });
                        }
                    }
                }
            }

        }

        function getShipLabel(dimensions) {
            var keys = Object.keys(dimensions);
            //if no value is found in key the remove it
            keys.forEach(function (e) {
                if (dimensions[e] == "") {
                    delete dimensions[e];
                }
            });
            //get length of all keys again
            var keysLength = Object.keys(dimensions).length;
            if (keysLength > 0) {
                if (keysLength == 1) {
                    return +dimensions["we"] + " lbs";
                } else {
                    return +dimensions["l"] + "in x " + +dimensions["w"] + "in x " + +dimensions["h"] + "in" + " / " + +dimensions["we"] + " lbs"
                }
            }
            return '';
        }
        function getRadioHtml(label, index) {
            return '<div class="col-md-3 cust-radio">\
                        <div class="ups-buttonList_wrapper ups-input_wrapper">\
                            <input class="ups-radio-custom" type="radio" name="recent-package" data-index="' + index + '" id="recent_ship_' + index + '" />\
                            <label class="ups-radio-custom-label" for="recent_ship_' + index + '">\
                                <span text="'+ label + '">' + label + '</span>\
                            </label>\
                        </div>\
                    </div>';
        }

        window.prepopulateShippingInfo = true;
    }
}());