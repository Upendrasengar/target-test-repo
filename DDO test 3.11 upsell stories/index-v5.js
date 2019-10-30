(function () {
    if (!window.hasUpSellLoaded) {
        var style = `<style id='upsell-styles'>
        .thead {
                display: block;
                font-size: 15px;
                font-style: italic;
                color: #1F9189; 
                font-weight: 500;
        }
        #Faster.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,
        #EvenFaster.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,
        #Fastest.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,
        #Preferred.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,
        #Recommended.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,
        #Cheapest.ups-day_rate .ups-radio-custom:checked + label > .upsell-label
        {
           color:#fff;
        }       
        </style>`;
        $("head").append(style);
        var tagList = ["Fastest", "EvenFaster", "Faster", "Preferrred", "Recommended", "Cheapest"];

        //Cancel shipment handler
        document.addEventListener("click", cancelShipmentHandler, true);

        document.addEventListener("click", function (e) {
            if (e.target.closest('#nbsPickupServicePageShipmentServices')) {
                if (e.target.id && e.target.id.indexOf('ups-official-dp-chooser') >= 0 || e.target.classList.contains('ups-official_datepicker_today_btn') || e.target.classList.contains('ups-official_datepicker_clear_btn')) {
                    window.recommendDefault = false;
                }
            }
        }, true);


        function cancelShipmentHandler(event) {
            if (event.target.id == "nbsCancelShipmentWarningYes" || event.target.id == "nbsButtonDrawer4") {
                //Since user is cancelling shipment so again select schedule pick up by default as a fresh journey
                window.recommendDefault = false;
            }
        }
        var updateTilesObserver = new MutationObserver(updateTiles);
        var mtObserver = new MutationObserver(function () {
            var section = document.querySelector("shipment-services > service");
            var hasAnyTile = document.querySelectorAll(tagList.map(function (e) { return "service-tile #" + e; }).join(","));
            if (section && hasAnyTile.length > 0 && $(".upsell-label").length == 0) {
                updateTiles();
                var config = {
                    subtree: true,
                    childlist: true,
                    attributes: true
                };

                updateTilesObserver.observe(section.querySelector("service-grid"), config);
            } else {
                updateTilesObserver.disconnect();
            }
        });

        /**
        * Method to update tile when service tiles are recreated by the app
        */
        function updateTiles() {
            console.debug("updateTiles called");
            tagList.forEach(function (id) {
                addTagInServiceTile(id, id == "Cheapest" && "Lowest Cost" || id);
            });

            setTimeout(function () {
                if ($('service-tile #Recommended').length > 0 && !window.recommendDefault) {
                    window.recommendDefault = true;
                    $('service-tile #Recommended label').click();
                } else if ($('service-tile #Recommended').length > 0 && window.recommendDefault && $('service-tile input[id^="nbsServiceTileServiceRadio"]:checked').length == 0) {
                    $('service-tile #Recommended label').click();
                }
            }, 400);
        }

        /**
         * 
         * @param {Tag for the service tile} tileId 
         * @param {Tile label to be displayed} label 
         * returns true if tile is updated
         */
        function addTagInServiceTile(tileId, label) {
            label = label === "EvenFaster" && "Fastest" || label;
            if (!$("#" + tileId + " label .upsell-label").length) {
                $("#" + tileId + " label").prepend("<div class='thead upsell-label'>" + label + "</div>");
            }
        }

        var config = {
            childlist: true,
            subtree: true,
            attributes: true
        };

        mtObserver.observe(document.body, config);

        window.hasUpSellLoaded = true;
    }
})();
