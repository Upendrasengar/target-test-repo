(function () {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    if (!window.saveShippingInfoExecuted) {
        document.addEventListener("click", function clickHandler(event) {
            if (event.target.id == "nbsBackForwardNavigationPayAndGetLabelsButton") {
                updateShippingInformation();
            }
        }, true);

        var keyMap = {
            0: 'we',
            1: 'l',
            2: 'w',
            3: 'h'
        };

        function updateShippingInformation() {

            var packages = document.querySelectorAll("package");
            var shipInfo = [];
            var vType = document.querySelectorAll("shipment-packages package .panel-heading");
            if (vType.length) {
                shipInfo = editViewParser(packages);
            } else {
                shipInfo = reviewUIParser(packages);
            }
            shipInfo = filterShipInfo(shipInfo);
            // Filter data if duplicate object found in current shipping data
            var uniqueData = [];
            shipInfo = shipInfo.filter(function (newDataObj) {
                var isNew = true;
                for (var i = 0; i < uniqueData.length; i++) {
                    var oldDataObj = uniqueData[i];
                    if (isEquivalent(newDataObj, oldDataObj)) {
                        isNew = false;
                        break;
                    }
                }
                isNew && uniqueData.push(newDataObj)
                return isNew;
            });
            console.debug(shipInfo);
            var shipData = docCookies.getItem("shipData");
            if (shipData) {
                shipData = JSON.parse(shipData);
                var newShippingInfo = getUniqueInfo(shipData, shipInfo);
                shipInfo = shipData.concat(newShippingInfo);
            }
            if (shipInfo.length > 3) {
                var exc = shipInfo.length - 3;
                shipInfo = shipInfo.slice(exc);
            }
            var now = new Date();
            // Set cookie expiry to next month
            var nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            docCookies.setItem("shipData", JSON.stringify(shipInfo), nextMonth, "/", ".ups.com", true);
        }

        function getUniqueInfo(oldData, newData) {
            return newData.filter(function (newDataObj) {
                var isNew = true;
                for (var i = 0; i < oldData.length; i++) {
                    var oldDataObj = oldData[i];
                    if (isEquivalent(newDataObj, oldDataObj)) {
                        isNew = false;
                        break;
                    }
                }
                return isNew;
            });
        }

        function isEquivalent(a, b) {
            // Create arrays of property names
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);

            // If number of properties is different,
            // objects are not equivalent
            if (aProps.length != bProps.length) {
                return false;
            }

            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];

                // If values of same property are not equal,
                // objects are not equivalent
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }

            // If we made it this far, objects
            // are considered equivalent
            return true;
        }

        function reviewUIParser(packages) {
            var shipInfo = [];
            packages.forEach(function (p) {
                var dim = {};
                p.querySelectorAll("section > div p").forEach(function (e) {
                    if (~e.innerText.indexOf("My Packaging")) {
                        var dimensions = e.innerText.substring(e.innerText.lastIndexOf("-"), e.innerText.length).split("-")[1];
                        dimensions = dimensions.replace(/(in|x|lbs|\,|\n)/gi, "").split(" ").filter(function (e) { return !!e });
                        dimensions.forEach(function (val, ind) {
                            dim[keyMap[ind]] = val;
                        });
                        shipInfo.push(dim);
                    }
                });
            });
            return shipInfo;
        }

        function editViewParser(packages) {
            //traverse through packages
            var retVal = [];
            packages.forEach(function (package) {
                var dim = {};

                var viewType = package.querySelector(".panel-heading button[id^='nbsEditPackageButton']");
                if (viewType) {

                    //View is with header and do not contain input fields
                    dim = editableParser(package);

                } else {
                    var typeOfPackage = package.querySelector("[id^=nbsPackagePackagingTypeDropdown]").selectedOptions[0].text;
                    // console.log(typeOfPackage);
                    if (typeOfPackage === "My Packaging") {
                        dim = nonEditableParser(package);
                    } else {
                        //To-Do
                        //dim = parseEditableViewOfFixedDimension(package);
                    }

                }
                retVal.push(dim);
            });

            return retVal;

            function editableParser(package) {
                var dim = {};
                var dimensions = [];
                var weight = null;
                var packageTypeEle = package.querySelector(".panel-body .col-md-4");
                // In case user has selected a package other than My Packaging
                if (!(packageTypeEle && ~packageTypeEle.innerText.indexOf("My Packaging"))) {
                    return dim;
                }
                package.querySelectorAll(".panel-body .col-md-4").forEach(function (ele) {
                    var text = ele.innerText;
                    if (~text.indexOf("Weight") && weight == null) {
                        weight = text.match(/[\.\d+]/gi).join("").trim();
                        dimensions.unshift(weight);
                    }
                    if (~text.indexOf("Dimensions")) {
                        dimensions = text.replace(/(Dimensions:|in|x)/gi, "").split(" ").filter(function (e) {
                            return !!e
                        });
                    }
                });

                dimensions.forEach(function (val, ind) {
                    dim[keyMap[ind]] = val;
                });

                return dim;
            }

            function nonEditableParser(package) {
                var keyMap = {
                    0: 'l',
                    1: 'w',
                    2: 'h'
                };
                var $weight = $(package).find("input[id^=nbsPackagePackageWeightField]");
                var dim = {
                    we: $weight.val()
                };
                var dimensions = $(package).find("[id^=nbsPackagePackageLengthField]").first().closest(".row").find("input");
                dimensions.each(function (ind, ele) {
                    if (ele.value != null)
                        dim[keyMap[ind]] = ele.value;
                });
                return dim;
            }

            function parseEditableViewOfFixedDimension(package) {
                //package div.ups-even.panel-body div.row > div > div > div.col-xs-4
                var keyMap = {
                    0: 'l',
                    1: 'w',
                    2: 'h'
                };
                var $weight = $(package).find("input[id^=nbsPackagePackageWeightField]");
                var dim = {
                    we: $weight.val()
                };
                var dimensions = $(package).find("div.ups-even.panel-body div.row > div > div > div.col-xs-4 p:last-child");
                dimensions.each(function (ind, ele) {
                    if (ele.innerText != null)
                        dim[keyMap[ind]] = ele.innerText.match(/\d+/, "")[0];
                });
                return dim;
            }
        }

        function filterShipInfo(data) {
            var newData = [];
            data.forEach(function (dimensions) {
                // special case if no weight is found then 
                // do not consider as valid dimension
                if (!dimensions['we']) {
                    return;
                }

                var keys = Object.keys(dimensions);
                // remove keys do not have value
                keys.forEach(function (e) {
                    if (dimensions[e] == "") {
                        delete dimensions[e];
                        return;
                    }
                });

                keys = Object.keys(dimensions);

                var keysLength = keys.length;

                // All three are mandatory if any of them is present
                if (keysLength > 1 &&
                    !(
                        (dimensions['l'] || dimensions['w'] || dimensions['h'])
                        &&
                        (dimensions['l'] && dimensions['w'] && dimensions['h'])
                    )
                ) {
                    return;
                }

                // if (l , h or w) any of them is present it means all are present
                if (dimensions['l']) {
                    // return if any dimension l*w*h is non-integer
                    if (!(Number.isInteger(+dimensions['l']) && Number.isInteger(+dimensions['w']) && Number.isInteger(+dimensions['h']))) {
                        return;
                    }
                }

                var nonNumericOrNegativeFound = false;
                //if no value is found in key then remove it
                keys.forEach(function (e) {
                    if (dimensions[e] == "") {
                        delete dimensions[e];
                        keysLength--;
                        return;
                    }
                    if (isNaN(+dimensions[e]) || +dimensions[e] < 0) {
                        nonNumericOrNegativeFound = true;
                    }
                });
                if (keysLength > 0 && !nonNumericOrNegativeFound) {
                    newData.push(dimensions);
                }
            });
            return newData;
        }
        window.saveShippingInfoExecuted = true;
    }
}());