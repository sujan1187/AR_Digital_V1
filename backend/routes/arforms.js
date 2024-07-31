const express = require("express");
const router = express.Router();
const ARForm = require("../models/ARForm"); // Ensure the model path is correct
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Route to fetch company data by company name
router.get("/:companyName", async (req, res) => {
  try {
    const companyName = req.params.companyName;
    console.log(`Fetching company with name: ${companyName}`);

    const company = await ARForm.findOne({ companyName });
    if (!company) {
      console.log("Company not found");
      return res.status(404).json({ message: "Company not found" });
    }

    console.log("Company found:", company);
    res.json(company);
  } catch (err) {
    console.log("Error fetching company:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route to submit form data
router.post(
  "/submit",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { type, companyName, purpose } = req.body;
      const logo = req.files["logo"] ? req.files["logo"][0].path : null;
      const video = req.files["video"] ? req.files["video"][0].path : null;

      // Validate required fields
      if (!type || !companyName || !purpose) {
        return res
          .status(400)
          .json({ message: "Type, companyName, and purpose are required" });
      }

      console.log(`Received form data for company: ${companyName}`);

      // Check if the company already exists
      let company = await ARForm.findOne({ companyName });
      if (company) {
        // Update existing company
        console.log("Updating existing company:", company);
        company = await ARForm.findOneAndUpdate(
          { companyName },
          { type, purpose, logo, video },
          { new: true } // Return the updated document
        );
        res.json(company);
      } else {
        // Create new company
        console.log("Creating new company");
        company = new ARForm({
          type,
          companyName,
          purpose,
          logo,
          video,
        });
        await company.save();
        res.status(201).json(company);
      }
    } catch (err) {
      console.log("Error processing form data:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
