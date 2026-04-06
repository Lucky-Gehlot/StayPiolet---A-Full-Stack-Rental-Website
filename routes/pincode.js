const express = require("express");
const router = express.Router();

/**
 * Proxy for Indian pincode lookup (browser-safe; avoids third-party CORS).
 * Uses public API: https://api.postalpincode.in/
 */
router.get("/:pincode", async (req, res) => {
    const digits = String(req.params.pincode || "").replace(/\D/g, "");
    if (digits.length !== 6) {
        return res.status(400).json({
            ok: false,
            message: "Enter a valid 6-digit Indian pincode.",
        });
    }

    try {
        const url = `https://api.postalpincode.in/pincode/${digits}`;
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(502).json({
                ok: false,
                message: "Pincode service unavailable. Try again later.",
            });
        }

        const raw = await response.json();
        // API returns a top-level array: [{ Status, Message, PostOffice }, ...]
        const data = Array.isArray(raw) ? raw[0] : raw;
        if (!data || typeof data !== "object") {
            return res.json({
                ok: false,
                message: "Invalid response from pincode service.",
            });
        }

        const offices = data.PostOffice;
        const statusOk =
            String(data.Status || "")
                .toLowerCase()
                .replace(/\s/g, "") === "success";
        if (!statusOk || !Array.isArray(offices) || offices.length === 0) {
            return res.json({
                ok: false,
                message: data.Message || "Pincode not found.",
            });
        }

        const first = offices[0];
        const state = (first.State || "").trim();
        const city = (first.District || first.Region || "").trim();

        return res.json({
            ok: true,
            pincode: digits,
            state,
            city,
            postOffices: offices
                .map((o) => (o.Name || "").trim())
                .filter(Boolean)
                .slice(0, 12),
        });
    } catch (err) {
        console.error("pincode lookup error:", err);
        return res.status(502).json({
            ok: false,
            message: "Could not look up pincode.",
        });
    }
});

module.exports = router;
