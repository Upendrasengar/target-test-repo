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
            background: #FFD100;
            border: 1px solid #FFD100 !important;
            text-align: center;
        }
        
        #EvenFaster.ups-day_rate label,#Faster.ups-day_rate label,#Preferred.ups-day_rate label {
            padding-top: 48px;
            box-sizing: border-box;
            background: #FFD100;
            border: 1px solid #FFD100;
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
            background: #330000;
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
            background: #FFD100;
            #transition: all 0.5s;
            
        }
        
        #EvenFaster.ups-day_rate .ups-radio-custom:checked+div,#Faster.ups-day_rate .ups-radio-custom:checked+div,#Preferred.ups-day_rate .ups-radio-custom:checked+div {
            background: #330000 !important;
            color: #fff !important;
            width: 100% !important;
            border-radius: 5px 5px 0px 0px;
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
        
        .ups-official_datepicker_container .ups-official_datepicker {
            position: relative !important;
            width: 580px;
            height: 465px;
        }

        .ups-accordion_list {
            margin-bottom: 0px !important;
        }

        .row.iw_row .iw_columns.col-lg-12 .ups-accordion_list {
            padding-top: 0px !important;
        }
        </style>`;



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
                            attributes: true
                        };
                        updateTilesObserver = new MutationObserver(updateTiles);
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
                    }
                }
            }, 0);
        });

        function updateTiles() {
            console.debug("updateTiles called");
            $(".thead").remove();
            setTimeout(function () {
                $("<div class='thead'>Faster</div>").insertAfter($("#Faster input"));
                $("<div class='thead'>Fastest</div>").insertAfter($("#EvenFaster input"));
                $("<div class='thead'>Preferred</div>").insertAfter($("#Preferred input"));

                $(".shipping-option-label").remove();
                $('<div class="shipping-option-label"><p>Select a shipping service option</p></div>').prependTo($("section.ups-accordion_list"))
                $(".upsell-tiles").empty();

                var $eFaster = $("#EvenFaster").clone();
                $eFaster.find("input").attr("id", "cust-input-EvenFaster").attr("name", "cust-input");
                $eFaster.find("label").attr("for", "cust-input-EvenFaster");
                $(".upsell-tiles").append($eFaster);

                var $faster = $("#Faster").clone();
                $faster.find("input").attr("id", "cust-input-Faster").attr("name", "cust-input");
                $faster.find("label").attr("for", "cust-input-Faster");
                $(".upsell-tiles").append($faster);

                var $Preferred = $("#Preferred").clone();
                $Preferred.find("input").attr("id", "cust-input-Preferred").attr("name", "cust-input");
                $Preferred.find("label").attr("for", "cust-input-Preferred");
                $(".upsell-tiles").append($Preferred);
            }, 0);
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
