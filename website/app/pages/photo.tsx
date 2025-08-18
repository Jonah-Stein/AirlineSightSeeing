import type { PhotoDetails } from "api/types/photos";
import { useGetPhoto } from "app/hooks/photos";
import { Link, useParams } from "react-router";

export default function PhotoPage() {
  const { photoId } = useParams();
  const photoDetails: PhotoDetails | undefined = useGetPhoto(photoId || "");

  if (!photoDetails) {
    return (
      <div className="photo-container">
        <div className="photo-content">
          <div className="photo-loading">Loading photo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-container">
      <div className="photo-content">
        {/* Back Button */}
        <Link to="/profile" className="photo-back-button">
          ← Back to Profile
        </Link>

        {/* Photo Header */}
        <div className="photo-header">
          <h1 className="photo-title">
            {photoDetails.name || "Untitled Photo"}
          </h1>

          <div className="photo-meta">
            <div className="photo-meta-item">
              <div className="photo-meta-label">Date Taken</div>
              <div className="photo-meta-value">
                {photoDetails.datetime
                  ? new Date(photoDetails.datetime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "Unknown"}
              </div>
            </div>

            {photoDetails.lat && photoDetails.lon && (
              <div className="photo-meta-item">
                <div className="photo-meta-label">Photo Location</div>
                <div className="photo-meta-value">
                  <div className="photo-coordinates">
                    {photoDetails.lat.toFixed(6)}, {photoDetails.lon.toFixed(6)}
                  </div>
                </div>
              </div>
            )}

            {photoDetails.meta_lat && photoDetails.meta_lon && (
              <div className="photo-meta-item">
                <div className="photo-meta-label">GPS Location</div>
                <div className="photo-meta-value">
                  <div className="photo-coordinates">
                    {photoDetails.meta_lat.toFixed(6)},{" "}
                    {photoDetails.meta_lon.toFixed(6)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo Image */}
        <div className="photo-image-container">
          <img
            src={photoDetails.imageUrl}
            alt={photoDetails.name || "Photo"}
            className="photo-image"
          />
        </div>

        {/* Photo Details */}
        <div className="photo-details">
          {/* Experience Section */}
          {photoDetails.experience && (
            <div className="photo-section">
              <h2 className="photo-section-title">Experience</h2>
              <div className="photo-section-content">
                <h3>{photoDetails.experience.name}</h3>
                {photoDetails.experience.description && (
                  <p>{photoDetails.experience.description}</p>
                )}
                {/* {photoDetails.experience.date && (
                  <p>
                    Date:{" "}
                    {new Date(
                      photoDetails.experience.date
                    ).toLocaleDateString()}
                  </p>
                )} */}
              </div>
            </div>
          )}

          {/* Pin/Location Section */}
          {photoDetails.pin && (
            <div className="photo-section">
              <h2 className="photo-section-title">Location</h2>
              <div className="photo-section-content">
                <h3>{photoDetails.pin.name}</h3>
                {photoDetails.pin.description && (
                  <p>{photoDetails.pin.description}</p>
                )}
                <div className="photo-location">
                  <span>📍</span>
                  <span className="photo-coordinates">
                    {photoDetails.pin.lat.toFixed(6)},{" "}
                    {photoDetails.pin.lon.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="photo-section">
            <h2 className="photo-section-title">Photo Information</h2>
            <div className="photo-section-content">
              <p>
                <strong>Photo ID:</strong> {photoDetails.id}
              </p>
              <p>
                <strong>User:</strong> {photoDetails.user}
              </p>
              {photoDetails.lat && photoDetails.lon && (
                <p>
                  <strong>Coordinates:</strong> {photoDetails.lat.toFixed(6)},{" "}
                  {photoDetails.lon.toFixed(6)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
