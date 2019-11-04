(function () {
    if (!window.hasUpSellFlagSet) {
        var config = {
            childlist: true,
            subtree: true,
            attributes: true
        };

        var mtObserver = new MutationObserver(function () {
            setTimeout(function () {
                var tiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]');
                if (tiles && tiles.length > 0) {
                    var selectedTiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]:checked')[0];
                    if (selectedTiles) {
                        setDefaultFlagWithTiles();
                    }
                }
            }, 0);
        });

        $(document).on("click", "button[id='nbsBackForwardNavigationPayAndGetLabelsButton']", function (event) {
            if (!window.selectedTiles) {
                window.selectedTiles = docCookies.getItem('selectedTiles');
            }
            if (window.selectedTiles) {
                utag.link({
                    "service_label": window.selectedTiles,
                    "link_name": "Service label selected",
                    "link_page_name": utag.data['new_page_name']
                });
            }

        });

        var tagList = ["Fastest", "EvenFaster", "Faster", "Preferred", "Recommended", "Cheapest"];
        mtObserver.observe(document.body, config);

        function setDefaultFlagWithTiles() {
            var selectedTiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]:checked+label')[0];
            var parentElement = $(selectedTiles).closest('div.ups-input_wrapper')[0];
            if (selectedTiles && parentElement && selectedTiles.innerText && tagList.find(function (item) { return item === parentElement.id })) {
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 1 * 3600 * 1000);
                var lbl = parentElement.id;
                lbl = lbl == "Cheapest" && "Lowest Cost" || lbl;
                lbl = lbl === "EvenFaster" && "Fastest" || lbl;
                window.selectedTiles = lbl;
                docCookies.setItem("selectedTiles", window.selectedTiles, expirationDate.toUTCString(), "/", ".ups.com", true);
            } else {
                window.selectedTiles = null;
                docCookies.removeItem("selectedTiles", "/", ".ups.com");
            }
        }

        function setSelectedtiles(event) {
            var selectedTiles = event.target.parentElement.querySelector('input+label');
            if (selectedTiles && selectedTiles.innerText && tagList.find(function (item) { return item === event.target.parentElement.id })) {
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 1 * 3600 * 1000);
                var lbl = event.target.parentElement.id;
                lbl = lbl == "Cheapest" && "Lowest Cost" || lbl;
                lbl = lbl === "EvenFaster" && "Fastest" || lbl;
                window.selectedTiles = lbl;
                docCookies.setItem("selectedTiles", window.selectedTiles, expirationDate.toUTCString(), "/", ".ups.com", true);
            } else if (event.target.closest('service-tile')) {
                window.selectedTiles = null;
                docCookies.removeItem("selectedTiles", "/", ".ups.com");
            }
        }

        document.addEventListener("change", function (event) {
            if (event.target.id && event.target.id.indexOf('nbsServiceTileServiceRadio') >= 0) {
                setSelectedtiles(event);
            }
        });

        $(document).on("click", "button[id='nbsBackForwardNavigationReviewPrimaryButton']", function (event) {
            if (!window.selectedTiles) {
                setDefaultFlagWithTiles();
            }

        });

        $(document).on("click", "button[id='nbsBackForwardNavigationReviewSecondaryButton']", function (event) {
            if (!window.selectedTiles) {
                setDefaultFlagWithTiles();
            }
        });

        window.hasUpSellFlagSet = true;
    }
}
)();