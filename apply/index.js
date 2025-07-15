document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    const urlParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_campaign", "utm_content", "utm_term"].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            const hiddenInput = document.querySelector(`input[name="${param}"]`);
            if (hiddenInput) hiddenInput.value = value;
        }
    });

    const sheetNameInput = document.querySelector('input[name="SheetName"]');
    const utmSource = urlParams.get("utm_source");

    if (utmSource && /facebook|fb/i.test(utmSource)) {
        sheetNameInput.value = "Beauty Show";
    } else {
        sheetNameInput.value = "Beauty Show"; // за замовчуванням
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submit-btn");
        submitBtn.disabled = true; //
        const loader = submitBtn.querySelector(".dot-spinner");
        const text = submitBtn.querySelector("span");
        const arrowOuter = submitBtn.querySelector(".arrow");
        arrowOuter.style.display = "none";
        text.style.display = "none";
        submitBtn.childNodes[submitBtn.childNodes.length - 1].textContent = "";
        loader.style.display = "block";

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbzogLbouUG0_SAFx7WLzi0ulY4B68W-Pvs8Q41eZJ-JYowyzcqUvdXm2ek7pEUmtd4-/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    const submitBtn = document.getElementById("submit-btn");
                    submitBtn.style.display = "flex";
                    submitBtn.style.alignItems = "center";
                    submitBtn.style.justifyContent = "center";
                    arrowOuter.style.display = "block";
                    arrowOuter.style.background = "none";

                    arrowOuter.style.display = "block";
                    loader.style.display = "none";
                    arrowOuter.src = "../assets/images/checkmark.svg"; // ✅ Your checkmark icon
                    arrowOuter.style.background = "none";
                    setTimeout(() => {
                        window.location.href = "https://ivansavchuk7.github.io/beauty_show/finish";
                    }, 1000);
                    submitBtn.classList.add("submitted");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});