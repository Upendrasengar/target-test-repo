(function () {
    if (!window.hasUpSellLoaded) {
        var style = `<style id='upsell-styles'>
        .service-tile-header {
            box-sizing: border-box;
            padding: 10px;
            background: #330000;
            color: #fff;
            position: absolute;
            width: 100%;
        }
        
        .upsell-tiles {
            text-align: center;
            min-height: 155px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }
        
        .ups-shipping_schedule_when .ups-day_rate label {
            background: transparent;
            border: 1px solid #00867E !important;
            text-align: center;
            color: #00867E;
        }
        
        #EvenFaster.ups-day_rate label,#Faster.ups-day_rate label,#Preferred.ups-day_rate label {
            padding-top: 48px;
            box-sizing: border-box;
            background: #E6F3F2;
            color: #00867e;
        }
        
        .upsell-tiles > .ups-day_rate {
            width: 300px !important;
            display: inline-block !important;
            margin-left: 10px !important;
        }
        
        #EvenFaster.ups-day_rate > input,#Faster.ups-day_rate > input,#Preferred.ups-day_rate > input {
            padding: 15px 5px !important;
            font-weight: normal !important;
            cursor: pointer !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: 120px !important;
            border: 1px solid #d9d9d6 !important;
        }
        
        #EvenFaster.ups-day_rate .ups-radio-custom+div,#Faster.ups-day_rate .ups-radio-custom+div,#Preferred.ups-day_rate .ups-radio-custom+div {
            padding: 10px;
            background: #00867E;
            color: #fff;
            position: absolute;
            width: 100%;
            text-align:center;
            #transition: all 0.5s;
            border-radius: 5px 5px 0px 0px;
        }
        
        #EvenFaster.ups-day_rate .ups-radio-custom+div+label,#Faster.ups-day_rate .ups-radio-custom+div+label,#Preferred.ups-day_rate .ups-radio-custom+div+label{
            padding-top: 48px;
            box-sizing: border-box;
            background: #E6F3F2;
            color: #00867e;
            
        }
        
        #EvenFaster.ups-day_rate .ups-radio-custom:checked+div,#Faster.ups-day_rate .ups-radio-custom:checked+div,#Preferred.ups-day_rate .ups-radio-custom:checked+div {
            background: #fff !important;
            color: #00867E!important;
            width: 100% !important;
            border-radius: 5px 5px 0px 0px;
            border: 1px solid #00867E !important;
        }
        
        .upsell-tiles #EvenFaster.ups-day_rate .ups-radio-custom:checked+div,.upsell-tiles #Faster.ups-day_rate .ups-radio-custom:checked+div,.upsell-tiles #Preferred.ups-day_rate .ups-radio-custom:checked+div {
            padding: 12px !important;
            border-radius: 10px 10px 0px 0px;
        }
        
        .upsell-tiles #EvenFaster.ups-day_rate .ups-radio-custom:checked+div+label,.upsell-tiles #Faster.ups-day_rate .ups-radio-custom:checked+div+label,.upsell-tiles #Preferred.ups-day_rate .ups-radio-custom:checked+div+label{
            box-sizing: border-box;
            background: #00867E;
            color: #fff;
            min-height: 115px;
            padding-bottom: 29px;
            line-height: 21px;
            border-radius: 10px 10px 10px 10px;
            box-shadow: 0px 8px 8px 0px #868484;
            border: 0px;
        }
        
        
        #EvenFaster.ups-day_rate .ups-radio-custom:checked+div+label,#Faster.ups-day_rate .ups-radio-custom:checked+div+label,#Preferred.ups-day_rate .ups-radio-custom:checked+div+label{
            box-sizing: border-box;
            background: #00867E;
            color: #fff;
            box-shadow: 0px 5px 5px 0px #868484;
            border-color: #00867E !important;
        }
        
        .ups-shipping_schedule_when .ups-day_rate label {
            border-radius: 5px;
        }
        
        .shipping-option-label {
            margin-left: 29px;
            padding-bottom: 15px;
        }

        .ups-accordion_list {
            margin-bottom: 0px !important;
        }

        .row.iw_row .iw_columns.col-lg-12 .ups-accordion_list {
            padding-top: 0px !important;
        }

        .ups-shipping_schedule_when .ups-shipping_schedule_grid .ups-shipping_schedule_day {
            font-weight: bold !important;
        }
        
        .ups-shipping_schedule_when .ups-shipping_schedule_grid .ups-shipping_schedule_header_wrap {
            background-color: transparent !important;
            color: #000 !important;
        }
        label [id^=nbsServiceTileTotalCharge]{
            font-size:20px;
        }
        .upsell-tiles label[for^=cust-input-] p[id^=nbsServiceTileServiceDescription]{
            font-weight:bold;
        }
        .upsell-tiles label[for^=cust-input-] [id^=nbsServiceTileDeliveryDate]{
            font-weight:100 !important;
        }
        </style>`;



        var updateTilesObserver = new MutationObserver(updateTiles);
        var mtObserver = new MutationObserver(function (mvt, observer) {
            setTimeout(function () {
                var section = document.querySelector("shipment-services > service");
                var hasAnyTile = document.querySelectorAll("#Faster,#EvenFaster,#Preferred");
                if (section && hasAnyTile.length > 0) {
                    if (!$("section.ups-accordion_list > div.ups-accordion_wrapper").length) {
                        $("head").append(style);
                        var accrodian =
                            $("#nbsShipmentServicesService .ups-section")
                                .prepend(`
                            <section class="ups-accordion_list">
                                <div class="ups-accordion_wrapper">
                                    <ul class="ups-accordion_content" style="border: 0;">
                                        <li class="ups-accordion_item ups-active">
                                            <button
                                            class="ups-accordion_toggle ups-active"
                                            aria-expanded="true"
                                            style="background: #f0eeee;border: 0px;">
                                            See All Shipping Services
                                            <i class="icon ups-icon-plus">
                                                <span class="ups-readerTxt">expand</span>
                                            </i>
                                            </button>
                                            <div class="ups-accordion_expand" aria-hidden="false"></div>
                                        </li>
                                    </ul>
                                </div>
                            </section>`
                                );
                        var ac = accrodian[0].querySelector(".ups-accordion_content .ups-accordion_expand");
                        section.querySelectorAll(".ups-section > :not(:first-child)").forEach(function (e) {
                            ac.appendChild(e);
                        })

                        $(".ups-accordion_content").upsAccordion();

                        $(".ups-accordion_toggle").click();

                        $(".ups-accordion_list").prepend(`<div class="upsell-tiles ups-shipping_schedule_when"></div>`);
                        updateTiles();
                        var config = {
                            subtree: true,
                            childlist: true,
                            attributes: true
                        };
                        updateTilesObserver.observe(section.querySelector("service-grid"), config);
                    }
                } else {
                    $("#upsell-styles").remove();
                    if ($("section.ups-accordion_list > div.ups-accordion_wrapper").length) {
                        var newParent = section.querySelector(".ups-section");
                        $(section).find(".ups-accordion_content .ups-accordion_expand").children().each(function (i, e) {
                            newParent.appendChild(e);
                        });
                        $("section.ups-accordion_list").remove();
                        updateTilesObserver.disconnect();
                    }
                }
            }, 0);
        });

        function updateTiles() {
            console.debug("updateTiles called");
            // $(".thead").remove();
            setTimeout(function () {
                var hasTileUpdated = false;
                if (!$("service-tile #Faster .thead").length) {
                    $("<div class='thead'>Faster</div>").insertAfter($("service-tile #Faster input"));
                    hasTileUpdated = true;
                }

                if (!$("service-tile #EvenFaster .thead").length) {
                    $("<div class='thead'>Fastest</div>").insertAfter($("service-tile #EvenFaster input"));
                    hasTileUpdated = true;
                }

                if (!$("service-tile #Preferred .thead").length) {
                    $("<div class='thead'>Preferred</div>").insertAfter($("service-tile #Preferred input"));
                    hasTileUpdated = true;
                }

                if (hasTileUpdated) {
                    $(".upsell-tiles").empty();
                    createTile("EvenFaster");
                    createTile("Faster");
                    createTile("Preferred");
                    //Move position 
                    $("label [id^=nbsServiceTileTotalCharge]").each(function (i, e) {
                        var label = $(e).closest("label");
                        $(e).prependTo(label)
                    });

                    //move position of date
                    $("label [id^=nbsServiceTileDeliveryDate]").each(function (i, e) {
                        var label = $(e).closest("label");
                        $(label).append(e);
                    });

                    //Append date time of delivery
                    $(".upsell-tiles label [id^=nbsServiceTileDeliveryDate]").each(function (i, e) {
                        var id = $(e).closest(".ups-buttonList_wrapper.ups-input_wrapper.ups-day_rate").attr("id");
                        var dateStr = getFormatedDate(getDateForTile(id));
                        $(e).prepend("<span>" + dateStr + " </span>");
                    });
                }

                $(".shipping-option-label").remove();
                $('<div class="shipping-option-label"><p>Select a shipping service option</p></div>').prependTo($("section.ups-accordion_list"))

            }, 10);
        }

        function getDateForTile(type) {
            return $("service-tile #" + type).closest("div.ups-shipping_schedule_row").find("service-group-header").find(".ups-shipping_schedule_header_wrap span").last().text();
        }


        function createTile(tileId) {
            var $tile = $("#" + tileId).clone();
            $tile.find("input").attr("id", "cust-input-" + tileId).attr("name", "cust-input");
            $tile.find("label").attr("for", "cust-input-" + tileId);
            $(".upsell-tiles").append($tile);
        }

        function getFormatedDate(dateStr) {

            var dateArr = dateStr.replace(/\,/ig, "").split(" ");

            var monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            var month = monthNames.indexOf(dateArr[0]) + 1;
            var date = dateArr[1];
            var year = dateArr[2];

            var newDate = new Date(month + "/" + date + "/" + year);

            function dayOfWeekAsInteger(day) {
                return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
            }
            return dayOfWeekAsInteger(newDate.getDay()) + " " + newDate.getMonth() + "/" + newDate.getDate();
        }


        var config = {
            childlist: true,
            subtree: true,
            attributes: true
        };
        mtObserver.observe(document.body, config);

        $(document).on("change", ".upsell-tiles", function (event) {
            if (event.target.checked) {
                var id = event.target.parentElement.id;
                $(".ups-shipping_schedule_grid #" + id + " input").click();
            }
        });

        $(document).on("change", ".ups-shipping_schedule_grid", function (event) {
            if (event.target.parentElement.id === "Faster") {
                $(".upsell-tiles #Faster input").click();
            } else if (event.target.parentElement.id === "EvenFaster") {
                $(".upsell-tiles #EvenFaster input").click();
            } else if (event.target.parentElement.id === "Preferred") {
                $(".upsell-tiles #Preferred input").click();
            } else {
                $('input[name=cust-input]').attr('checked', false);
            }
        });
        window.hasUpSellLoaded = true;
    }
})();
