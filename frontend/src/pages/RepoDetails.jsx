import { useParams, useRouter } from "react";
import { useState, useEffect } from "react";

export default function RepoDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { username, reponame } = params;
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/${username}/${reponame}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repo details");
        }

        const data = await response.json();
        setRepoDetails(data);
      } catch (err) {
        setError("Failed to load repository details");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, reponame]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading repository details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
          >
            ← Back
          </button>
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl animate-fade-in">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in"
        >
          ← Back
        </button>

        {/* Header Section */}
        <div
          className="bg-white rounded-xl shadow-md p-8 border border-blue-100 mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{reponame}</h1>
          <p className="text-gray-600 text-lg mb-4">
            by <span className="font-semibold text-blue-600">{username}</span>
          </p>
          <p className="text-gray-700 leading-relaxed">
            {repoDetails?.description || "No description available"}
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            { label: "Stars", value: repoDetails?.stars || 0, color: "blue" },
            { label: "Forks", value: repoDetails?.forks || 0, color: "indigo" },
            {
              label: "Watchers",
              value: repoDetails?.watchers || 0,
              color: "purple",
            },
            {
              label: "Open Issues",
              value: repoDetails?.openIssues || 0,
              color: "pink",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-${stat.color}-50 border-2 border-${stat.color}-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group`}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <p className={`text-${stat.color}-600 font-medium text-sm mb-2`}>
                {stat.label}
              </p>
              <p
                className={`text-3xl font-bold text-${stat.color}-700 group-hover:text-${stat.color}-800 transition-colors duration-300`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div
          className="bg-white rounded-xl shadow-md p-8 border border-blue-100 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Repository Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
              <span className="text-gray-700 font-medium">Language</span>
              <span className="text-blue-600 font-bold">
                {repoDetails?.language || "Not specified"}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-300">
              <span className="text-gray-700 font-medium">Created</span>
              <span className="text-indigo-600 font-bold">
                {repoDetails?.createdAt || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
              <span className="text-gray-700 font-medium">Last Updated</span>
              <span className="text-purple-600 font-bold">
                {repoDetails?.updatedAt || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-300">
              <span className="text-gray-700 font-medium">URL</span>
              <a
                href={repoDetails?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 font-bold hover:text-pink-700 transition-colors duration-300 truncate"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
