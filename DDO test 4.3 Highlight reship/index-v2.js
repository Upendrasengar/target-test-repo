(function () {
    var html = `<a class="ups-cta ups-cta_secondary ups-shipping_header_action"
    href="https://www.ups.com/ship/history?loc=en_US" id="reshipBtn">
    View Shipping History &amp; Reship
    </a>`;

    if (!window.reshipV2Executed) {
        $("head").append(`<style>
            #nbsInfoBannerNavToUisLink {
                float: right;
                margin-right: 36px;
                line-height: 32px;
            }
            </style>`
        );

        var mt = new MutationObserver(function (mType, observer) {
            var reshipAnker = document.querySelector("#reshipBtn");
            if (!reshipAnker) {
                setTimeout(function () {
                    if(!document.querySelector("#reshipBtn")){
                        var ele = $("#nbsInfoBannerNavToUisLink").parent();
                        ele.append(html);
                        $("#nbsInfoBannerNavToUisLink").appendTo($("em[class^=ng-tns]").parent());
                    }
                }, 100);
            }
        });

        mt.observe(document.querySelector("body"), {
            attributes: true,
            childList: true,
            subtree: true
        });
        window.reshipV2Executed = true;
    }
})();