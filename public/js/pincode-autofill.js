/**
 * Fills #state and #city when user types a 6-digit Indian pincode.
 * Expects GET /api/pincode/:digits (server proxy).
 */
(function () {
    const pinInput = document.getElementById("pincode");
    const stateInput = document.getElementById("state");
    const cityInput = document.getElementById("city");
    if (!pinInput) return;

    const hintId = "pincode-lookup-hint"; //it will be used to show small helper message under pincode
    let debounceTimer; //used to delay API call

    function setHint(message, variant) { //dynamically create hint message 
        let el = document.getElementById(hintId);
        if (!el) {
            el = document.createElement("div");
            el.id = hintId;
            el.className = "form-text";
            pinInput.closest(".mb-3")?.appendChild(el); //I want to add just bottom to the pinInput 
        }
        el.textContent = message || "";
        el.className =
            "form-text small " +
            (variant === "error"
                ? "text-danger"
                : variant === "ok"
                  ? "text-success"
                  : "text-muted");
    }

    async function lookup() {
        const digits = String(pinInput.value || "").replace(/\D/g, "");
        console.log(digits)
        if (digits.length !== 6) {
            setHint("", "muted");
            return;
        }

        setHint("Looking up pincode…", "muted");
        try {
            const res = await fetch(`/api/pincode/${digits}`);
            const data = await res.json();

            //indiapost api will return array of object not a single object pehle ye hi problem aa rhi thi
            console.log(data);
            if (!data.ok) {
                console.log(data)
                setHint(data.message || "Could not find this pincode.", "error");
                return;
            }

            if (data.state) stateInput.value = data.state;
            if (data.city) cityInput.value = data.city;

            setHint("State and city filled from pincode. You can edit if needed.", "ok");
        } catch (e) {
            setHint("Network error. Check connection and try again.", "error");
        }
    }

    pinInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(lookup, 350);
    });

    pinInput.addEventListener("blur", function () {
        clearTimeout(debounceTimer);
        lookup();
    });

    // Edit page: only auto-lookup on load if state/city are empty (don't overwrite saved data)
    const pinOnLoad = String(pinInput.value || "").replace(/\D/g, "");
    const stateEmpty = !String(stateInput.value || "").trim();
    const cityEmpty = !String(cityInput.value || "").trim();
    if (pinOnLoad.length === 6 && stateEmpty && cityEmpty) {
        lookup();
    }
})(); 
// (function call)();

