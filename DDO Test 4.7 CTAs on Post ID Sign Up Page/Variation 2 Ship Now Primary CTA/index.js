$(document).ready(function () {
    $("#ups-navItems.ups-container ul.ups-navItems_primary li.ups-menu.ups-navMenu").remove()
    $("#ups-header_custServ.col-md-3.ups-menu").remove();
    $("#ups-header_search").remove();
    $("#ups-headerTools").remove();
    $(".ups-header_utils > li").each(function (ind, ele) {
        if (ele.innerText !== "Log In") { this.remove() }
        //console.log(ind)
    })
    if (!window.hasCTATestExecuted) {
        var mt = new MutationObserver(function (mType, observer) {
            var scComponent = $("signup-confirmation");
            if (scComponent.length) {
                setTimeout(function () {
                    //console.debug("scComponent loaded........");
                    $(".ups-form_ctaGroup button").removeClass("ups-cta_primary").addClass("ups-cta_tertiary")
                    $(".ups-form_ctaGroup button").css("margin", "0px 0px 0px 30px")
                    $('<button id="shipNow" class="ups-cta ups-cta_primary" type="submit"><span>Ship Now</span></button>').insertBefore(".ups-form_ctaGroup button");
                    $(document).on("click", "#shipNow", function (event) {
                        window.location.replace("https://www.ups.com/ship?loc=en_US");
                    });
                }, 1000);
                observer.disconnect();
            } else {
                //console.debug("scComponent not loaded........");
            }
        });

        mt.observe(document.querySelector("body"), {
            attributes: true,
            childList: true,
            subtree: true
        });
        window.hasCTATestExecuted = true;
    }
});