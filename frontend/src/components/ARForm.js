import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ARForm = ({ type, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [logo, setLogo] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      setLogo(file);
    } else {
      alert("Please upload a valid image file.");
      e.target.value = null;
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video")) {
      setVideo(file);
    } else {
      alert("Please upload a valid video file.");
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("type", type);
    formData.append("companyName", companyName);
    formData.append("purpose", purpose);
    if (logo) formData.append("logo", logo);
    if (video) formData.append("video", video);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/arforms/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Form submission response:", response.data);
      navigate("/arsuccess");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ar-form">
      <h2>{type} Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Purpose: </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          >
            <option value="">Select purpose</option>
            <option value="marketing">Marketing</option>
            <option value="training">Training</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <label>Logo Upload:</label>
          <input
            type="file"
            onChange={handleLogoChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label>Video Upload:</label>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default ARForm;
