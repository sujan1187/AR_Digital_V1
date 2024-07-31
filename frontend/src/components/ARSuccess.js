import React, { useState } from "react";
import axios from "axios";

const ARSuccess = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState("");

  const handleSearchClick = async () => {
    try {
      console.log(`Searching for company with name: ${companyName}`);
      const response = await axios.get(
        `http://localhost:5000/api/arforms/${companyName}`
      );
      console.log("Company data received:", response.data);
      setCompanyData(response.data);
      setError("");
    } catch (err) {
      console.log("Error fetching company:", err);
      setCompanyData(null);
      setError("Company not found");
    }
  };

  return (
    <div className="ar-success">
      <h2>Submission Successful!</h2>
      <p>Your AR form has been submitted successfully.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {companyData && (
        <div className="company-data">
          <h3>Company Name: {companyData.companyName}</h3>
          <p>Type: {companyData.type}</p>
          <p>Purpose: {companyData.purpose}</p>
          <img
            src={`http://localhost:5000/${companyData.logo}`}
            alt="Company Logo"
          />
          <video width="320" height="240" controls>
            <source
              src={`http://localhost:5000/${companyData.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default ARSuccess;
