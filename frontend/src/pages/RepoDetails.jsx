"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const params = useParams();
  const navigate = useNavigate();
  const { username, repoName } = params;
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${username}/${repoName}`
        );
        setRepoDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Error occurred:", err);
        setError("Failed to load repository details");
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    },
    maxWidth: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    backButton: {
      marginBottom: "2rem",
      padding: "0.75rem 1.5rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "background-color 0.3s",
    },
    header: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      marginBottom: "2rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333",
      margin: "0 0 0.5rem 0",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#666",
      margin: "0 0 1rem 0",
    },
    description: {
      fontSize: "1rem",
      color: "#555",
      lineHeight: "1.6",
      margin: 0,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    statCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    statLabel: {
      fontSize: "0.85rem",
      color: "#666",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      fontWeight: "600",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#007bff",
    },
    detailsSection: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    detailsTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "1.5rem",
      margin: 0,
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
      borderBottom: "1px solid #eee",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#333",
    },
    detailValue: {
      color: "#666",
      textAlign: "right",
    },
    ownerCard: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
    },
    ownerAvatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "2px solid #007bff",
    },
    ownerInfo: {
      flex: 1,
    },
    ownerName: {
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    ownerLink: {
      color: "#007bff",
      textDecoration: "none",
      fontSize: "0.9rem",
      margin: 0,
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #e9ecef",
      borderTop: "4px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "1rem",
    },
    errorContainer: {
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      color: "#721c24",
      padding: "1.5rem",
      borderRadius: "8px",
      marginTop: "2rem",
    },
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.spinner}></div>
        <p style={{ color: "#666", fontSize: "1rem" }}>
          Loading repository details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            ← Back
          </button>
          <div style={styles.errorContainer}>
            <strong>Error</strong>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover {
          background-color: #0056b3;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
      `}</style>

      <div style={styles.maxWidth}>
        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          ← Back
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>{repoDetails?.name || "Project"}</h1>
          <p style={styles.subtitle}>
            by <strong>{repoDetails?.owner?.login || "Unknown"}</strong>
          </p>
          <p style={styles.description}>
            {repoDetails?.description || "No description available"}
          </p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statLabel}>Stars</div>
            <div style={styles.statValue}>
              {repoDetails?.stargazers_count || 0}
            </div>
          </div>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statLabel}>Forks</div>
            <div style={styles.statValue}>{repoDetails?.forks_count || 0}</div>
          </div>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statLabel}>Watchers</div>
            <div style={styles.statValue}>
              {repoDetails?.watchers_count || 0}
            </div>
          </div>
        </div>

        <div style={styles.detailsSection}>
          <h2 style={styles.detailsTitle}>Project Information</h2>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Owner</span>
            <div style={styles.ownerCard}>
              {repoDetails?.owner?.avatar_url && (
                <img
                  src={repoDetails?.owner?.avatar_url || "/placeholder.svg"}
                  alt="Owner Avatar"
                  style={styles.ownerAvatar}
                />
              )}
              <div style={styles.ownerInfo}>
                <p style={styles.ownerName}>
                  {repoDetails?.owner?.login || "N/A"}
                </p>
                {repoDetails?.owner?.html_url && (
                  <a
                    href={repoDetails?.owner?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.ownerLink}
                  >
                    View Profile →
                  </a>
                )}
              </div>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Language</span>
            <span style={styles.detailValue}>
              {repoDetails?.language || "Not specified"}
            </span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Last Updated</span>
            <span style={styles.detailValue}>
              {repoDetails?.updated_at
                ? new Date(repoDetails?.updated_at).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
