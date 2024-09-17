import React, { useState, useEffect } from "react";
import axios from "axios";
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
import { useNavigate } from "react-router-dom"; // To navigate to the Map Page and Composting Guide
import "./IdentifyWaste.css";

const IdentifyWaste: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [classificationResults, setClassificationResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate(); // To navigate to Map Page and Composting Guide
  useEffect(() => {
    document.title = "Identify Waste - Green Melb";
}, []);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("uploaded_file", selectedImage);

      try {
        const response = await axios.post(
          `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/classification/upload/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        setProcessedImageUrl(
          `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}${response.data.processed_file_url}`
        );
        setClassificationResults(response.data.classifications || []);
        setError(null);
      } catch (error) {
        console.error("Error uploading the file:", error);
        setError("There was an issue uploading the file.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateCumulativeCounts = (classificationResults: string[]) => {
    const counts = classificationResults.reduce(
      (acc: Record<string, number>, classification: string) => {
        acc[classification] = (acc[classification] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.entries(counts).map(([classification, count]) => ({
      classification,
      count,
    }));
  };

  const cumulativeCounts = calculateCumulativeCounts(classificationResults);

  // Classification information to display based on the results
  const classificationInformation: Record<string, string> = {
    Recyclable:
      "Recyclable materials can be processed and reused to create new products.",
    Organic:
      "Organic waste includes food scraps and other natural materials that decompose easily.",
    "E-Waste":
      "E-waste refers to discarded electronic devices, which require special handling.",
  };

  const presentClassifications = cumulativeCounts.map(
    (item) => item.classification
  );

  return (
    <div className="full-page-container">
      <Header />
      <div className="identify-waste-content">
        <h1 className="identify-waste-title">Identify Waste</h1>
        <form onSubmit={handleSubmit} className="identify-waste-form">
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="drop-zone-label">
              Drop your JPEG/PNG photo or click to upload
            </label>
          </div>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <button type="submit" className="submit-button">
              Submit
            </button>
          )}
          {error && <div className="error-message">{error}</div>}

          <div className="content-section" style={{ marginTop: "40px" }}>
            {previewUrl && (
              <div className="preview-container">
                <h2 className="preview-title">Image Preview:</h2>
                <img src={previewUrl} alt="Selected" className="image-preview" />
              </div>
            )}
            {processedImageUrl && (
              <div className="preview-container">
                <h2 className="preview-title">Processed Image:</h2>
                <img
                  src={processedImageUrl}
                  alt="Processed"
                  className="image-preview"
                />
              </div>
            )}
            {cumulativeCounts.length > 0 && (
              <div className="preview-container">
                <div className="classification-results">
                  <h2 className="preview-title">Total:</h2>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Classification</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cumulativeCounts.map((item, index) => (
                        <tr key={index}>
                          <td>{item.classification}</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="total-and-legend-container">
                  <div className="legend-container">
                    <h3>Color Information:</h3>
                    <ul>
                      {presentClassifications.includes("E-Waste") && (
                        <li>
                          <span
                            className="legend-color"
                            style={{ backgroundColor: "rgb(153, 153, 255)" }}
                          ></span>
                          E-Waste
                        </li>
                      )}
                      {presentClassifications.includes("Recyclable") && (
                        <li>
                          <span
                            className="legend-color"
                            style={{ backgroundColor: "rgb(255, 153, 153)" }}
                          ></span>
                          Recyclable
                        </li>
                      )}
                      {presentClassifications.includes("Organic") && (
                        <li>
                          <span
                            className="legend-color"
                            style={{ backgroundColor: "rgb(153, 255, 153)" }}
                          ></span>
                          Organic
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Information Section based on Classifications */}
      <div className="information-container">
        {presentClassifications.map((classification) => (
          <div key={classification}>
            <h2>{classification}</h2>
            <p>{classificationInformation[classification]}</p>

            {/* Display the buttons if Organic is present */}
            {classification === "Organic" && (
              <>
                <button
                  className="map-button"
                  onClick={() => navigate("/MapPage")}
                >
                  View Composting Centers
                </button>

                <button
                  className="guide-button"
                  onClick={() => navigate("/CompostingGuide")}
                >
                  View Composting Guide
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default IdentifyWaste;
