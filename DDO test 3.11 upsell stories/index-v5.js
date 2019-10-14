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
            #EvenFaster.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,#Preferred.ups-day_rate .ups-radio-custom:checked + label > .upsell-label,#Faster.ups-day_rate .ups-radio-custom:checked + label > .upsell-label{
           color:#fff
        }
        </style>`;
       	$("head").append(style);
        var mtObserver = new MutationObserver(function (mvt, observer) {
            setTimeout(function () {
                var section = document.querySelector("shipment-services > service");
                var hasAnyTile = document.querySelectorAll("#Faster,#EvenFaster,#Preferred");
                if (section && hasAnyTile.length > 0 && $(".upsell-label").length == 0) {
                    if (!$("section.ups-accordion_list > div.ups-accordion_wrapper").length) {
                       
                        updateTiles();
                        var config = {
                            subtree: true,
                            attributes: true
                        };
                        updateTilesObserver = new MutationObserver(updateTiles);
                        updateTilesObserver.observe(section.querySelector("service-grid"), config);
                    }
                }
            }, 0);
        });

        function updateTiles() {
            console.debug("updateTiles called");
            setTimeout(function () { 
 				$(".thead").remove();
                $("#Faster label").prepend("<div class='thead upsell-label'>Faster</div>");
                $("#EvenFaster label").prepend("<div class='thead upsell-label'>Fastest</div>");
                $("#Preferred label").prepend("<div class='thead upsell-label'>Preferred</div>");
            }, 0);
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
