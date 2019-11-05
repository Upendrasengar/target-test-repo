(function () {
    var html = `<div class="col-md-6">
        <div class="ups-label_option">
            <div aria-hidden="true" class="ups-label_option_icon ups-big_icon_circle ups-icon_clickable"><span
                    class="icon ups-icon-email"></span></div>
            <div class="ups-label_option_description">
                <p class="ng-star-inserted">View your shipping history to reship any past shipment.</p>
            </div>
            <div class="ups-label_option_action">
                <button  aria-busy="false" aria-expanded="true" class="ups-cta ups-cta_primary" type="button"
                    id="reshipBtn">
                    View Shipping History &amp; Reship
                </button>
            </div>
        </div>
    </div>`;

    if (!window.hasReshipTestExecuted) {
        $("head").append(`<style>
            #icon:before {
                background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-EccM8blle2lfzwlPidvvAp2gqfOpDfvaq76sUSyqlDdP1hgcAg&s);
                width: 50px;
                height: 50px;
                background-size: 50px;
            }
            a.fRight {
                float: right;
                margin-right: 36px;
            }
            </style>`
        );

        var mt = new MutationObserver(function (mType, observer) {
            var trackingNumber = document.querySelector("#nbsConfirmationShipmentOverviewTrackingNumber");
            if (trackingNumber && !document.querySelector("#reshipBtn")) {
                var row = $("shipment-documents .row").last();
                row.append(html);
                observer.disconnect();
            } else {
                console.debug("nbsConfirmationShipmentOverviewTrackingNumber not loaded........");
            }
        });

        mt.observe(document.querySelector("body"), {
            attributes: true,
            childList: true,
            subtree: true
        });
        window.hasReshipTestExecuted = true;

        $(document).on("click", "#reshipBtn", function (e) {
            window.location.href = "https://www.ups.com/ship/history?loc=en_US";
        });
    }
})();
