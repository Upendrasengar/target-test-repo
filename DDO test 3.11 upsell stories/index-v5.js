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
