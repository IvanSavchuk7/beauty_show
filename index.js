document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_campaign", "utm_content", "utm_term"];

    let utmString = "";

    utmKeys.forEach((key, index) => {
        const value = params.get(key);
        if (value) {
            utmString += (utmString ? "&" : "?") + `${key}=${encodeURIComponent(value)}`;
        }
    });

    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        if (utmString) {
            if (!button.href.includes("utm_")) {
                button.href += utmString;
            }
        }
    });
});
