import { useNavigate } from "react-router-dom";

export default function RepoList({ repos, username }) {
  // Mock language distribution data
  const languageData = [
    {
      name: "JavaScript",
      value: Math.floor(repos.length * 0.35),
      color: "#3b82f6",
    },
    { name: "Java", value: Math.floor(repos.length * 0.3), color: "#6366f1" },
    { name: "Python", value: Math.floor(repos.length * 0.2), color: "#8b5cf6" },
    {
      name: "Other",
      value: repos.length - Math.floor(repos.length * 0.85),
      color: "#ec4899",
    },
  ].filter((item) => item.value > 0);

  // get the data over here the total data present here.
  console.log("username : ", username);
  console.log("repos : ", repos);
  // Calculate pie chart segments
  const total = languageData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const segments = languageData.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return {
      ...item,
      startAngle,
      endAngle,
      percentage: ((item.value / total) * 100).toFixed(1),
    };
  });

  console.log("segments are : ", segments);

  const navigate = useNavigate();

  // SVG Pie Chart Component
  const PieChart = () => {
    const radius = 80;
    const cx = 100;
    const cy = 100;

    const polarToCartesian = (angle) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      };
    };

    const createPath = (startAngle, endAngle) => {
      const start = polarToCartesian(startAngle);
      const end = polarToCartesian(endAngle);
      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
      return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    };

    return (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-md"
      >
        {segments.map((segment, index) => (
          <g
            key={index}
            className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          >
            <path
              d={createPath(segment.startAngle, segment.endAngle)}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300 hover:filter hover:brightness-110"
            />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Chart Section */}
      <div className="mb-12 bg-white rounded-xl shadow-md p-8 border border-blue-100 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Language Distribution
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="flex justify-center">
            <PieChart />
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105"
              >
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: segment.color }}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{segment.name}</p>
                  <p className="text-sm text-gray-500">
                    {segment.value} repos ({segment.percentage}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <div
              key={index}
              onClick={() => navigate(`/repos/${username}/${repo.name}`)}
              className="bg-white rounded-xl border-2 border-blue-100 p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              {/* Repo Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 truncate">
                {repo.name}
              </h3>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                  <span className="text-gray-600 font-medium">⭐ Stars</span>
                  <span className="text-blue-600 font-bold">{repo.stars}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300">
                  <span className="text-gray-600 font-medium">📝 forks</span>
                  <span className="text-indigo-600 font-bold">
                    {repo.forks || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
