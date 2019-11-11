(function () {
    var html = `<div class="col-md-6">
        <div class="ups-label_option">
            <div aria-hidden="true" class="cs-icon ups-label_option_icon ups-big_icon_circle ups-icon_clickable">
                <span class="icon"></span>
            </div>
            <div class="ups-label_option_description">
                <p class="ng-star-inserted">View your shipping history to reship any past shipment.</p>
            </div>
            <div class="ups-label_option_action">
                <button  aria-busy="false" aria-expanded="true" class="ups-cta ups-cta_primary" type="button"
                    id="reship">
                    View Shipping History &amp; Reship
                </button>
            </div>
        </div>
    </div>`;

    if (!window.hasReshipTestExecuted) {
        $("head").append(`<style>
            .cs-icon {
                background: url(https://svgshare.com/i/G47.svg) 0 0 no-repeat;
                background-size: 60px 60px;
                cursor: default;
            }
            </style>`
        );

        var mt = new MutationObserver(function (mType, observer) {
            var trackingNumber = document.querySelector("#nbsConfirmationShipmentOverviewTrackingNumber");
            if (trackingNumber && !document.querySelector("#reship")) {
                var row = $("shipment-documents .row").last();
                row.append(html);
                observer.disconnect();
            }
        });

        
        mt.observe(document.querySelector("body"), {
            attributes: true,
            childList: true,
            subtree: true
        });

        window.hasReshipTestExecuted = true;

        $(document).on("click", "#reship", function (e) {
            window.location.href = "https://www.ups.com/ship/history?loc=en_US";
        });
    }
})();
