(function() {
    if (!window.hasUpSellFlagSet) {
        var mtObserver = new MutationObserver(function(mvt, observer) {

            setTimeout(function() {
                var tiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]');
                mockScript();
                if (tiles && tiles.length > 0) {
                    var selectedTiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]:checked')[0];
                    if (selectedTiles) {
                        setDefaultFlagWithTiles();
                    }
                }

            }, 0);
        }
        );

        var config = {
            childlist: true,
            subtree: true,
            attributes: true
        };
        mtObserver.observe(document.body, config);

        function setDefaultFlagWithTiles() {
            var selectedTiles = $('service-tile > div > input[id^="nbsServiceTileServiceRadio"]:checked+div')[0];
            if (selectedTiles && selectedTiles.innerText) {
                if (selectedTiles.innerText === 'Preferred' || selectedTiles.innerText === 'Faster' || selectedTiles.innerText === 'Fastest') {
                    var now = new Date();
                    now.setTime(now.getTime() + 1 * 3600 * 1000);
                    window.selectedTiles = selectedTiles.innerText;
                    docCookies.setItem("selectedTiles", window.selectedTiles, now.toUTCString(), "/", ".ups.com", true);
                } else {
                    window.selectedTiles = null;
                }
            }
        }

        function setSelectedtiles() {
            var selectedTiles = event.target.parentElement.querySelector('input+div');
            if (selectedTiles && selectedTiles.innerText) {
                if (selectedTiles.innerText === 'Preferred' || selectedTiles.innerText === 'Faster' || selectedTiles.innerText === 'Fastest') {
                    var now = new Date();
                    now.setTime(now.getTime() + 1 * 3600 * 1000);
                    window.selectedTiles = selectedTiles.innerText;
                    docCookies.setItem("selectedTiles", window.selectedTiles, now.toUTCString(), "/", ".ups.com", true);
                } else {
                    window.selectedTiles = null;
                }
            }
        }

        $(document).on("change", ".upsell-tiles", function(event) {
            if (event.target.checked) {
                setSelectedtiles();
            }
        });

        $(document).on("change", ".ups-shipping_schedule_grid", function(event) {
            if (event.target.checked) {
                setSelectedtiles();
            }

        });

        $(document).on("click", "button[id='nbsBackForwardNavigationReviewPrimaryButton']", function(event) {
            if (!window.selectedTiles) {
                setDefaultFlagWithTiles();
            }

        });

        $(document).on("click", "button[id='nbsBackForwardNavigationReviewSecondaryButton']", function(event) {
            if (!window.selectedTiles) {
                setDefaultFlagWithTiles();
            }

        });

        $(document).on("click", "button[id='nbsBackForwardNavigationPayAndGetLabelsButton']", function(event) {
            if(!window.selectedTiles) {
                window.selectedTiles  = docCookies.getItem('selectedTiles');                 
            }
            if (window.selectedTiles) {
                utag.link({
                    "service_label": window.selectedTiles,
                    "link_name": window.selectedTiles,
                    "link_page_name": utag.data['new_page_name']
                });
            }

        });

        function mockScript() {
            var hasAnyTile = $('service-tile').children('#Faster,#Fastest,#Preferred');
            if (hasAnyTile.length <= 0 && $('service-tile').length > 0) {
                if ($('service-tile').length > 3) {
                    $('service-tile')[0].firstElementChild.setAttribute('id', 'Faster');
                    $('service-tile')[1].firstElementChild.setAttribute('id', 'EvenFaster');
                    $('service-tile')[2].firstElementChild.setAttribute('id', 'Preferred');
                }
                else if ($('service-tile').length > 0 && $('service-tile').length < 2 ) {
                    $('service-tile')[0].firstElementChild.setAttribute('id', 'Faster');
                    $('service-tile')[1].firstElementChild.setAttribute('id', 'EvenFaster');                   
                } else {
                    $('service-tile')[0].firstElementChild.setAttribute('id', 'Faster');  
                }
            }
        }

        window.hasUpSellFlagSet = true;
    }
}
)();
