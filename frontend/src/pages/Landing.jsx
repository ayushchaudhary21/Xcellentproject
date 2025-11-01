import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Fixed Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                GitInsight
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <button
                onClick={() => navigate("/search")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 pt-24 pb-12 overflow-hidden"
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Analyze GitHub Repositories Instantly
                </h1>
                <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-lg">
                  Enter a GitHub username and visualize repos, stars, languages
                  and commit activity — powered by Spring Boot + React.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => navigate("/search")}
                  className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start Searching
                </button>
              </div>
            </div>

            {/* Right Mockup Panel */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-2xl p-6 border border-blue-300/50 backdrop-blur-sm">
                {/* Mock Repo Cards */}
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <div className="h-3 bg-white/40 rounded w-24 mb-2"></div>
                    <div className="h-2 bg-white/30 rounded w-32"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <div className="h-3 bg-white/40 rounded w-28 mb-2"></div>
                    <div className="h-2 bg-white/30 rounded w-40"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <div className="h-3 bg-white/40 rounded w-32 mb-2"></div>
                    <div className="h-2 bg-white/30 rounded w-36"></div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="mt-6 flex items-end justify-center gap-2">
                  <div className="w-3 h-8 bg-white/40 rounded"></div>
                  <div className="w-3 h-12 bg-white/50 rounded"></div>
                  <div className="w-3 h-6 bg-white/40 rounded"></div>
                  <div className="w-3 h-10 bg-white/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to explore and analyze repositories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-blue-200">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Search Any GitHub User
              </h3>
              <p className="text-gray-700">
                Fast API powered by Spring Boot backend
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-indigo-200">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Visual Repo Analytics
              </h3>
              <p className="text-gray-700">Interactive charts using Recharts</p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-blue-200">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Blazing Fast UI
              </h3>
              <p className="text-gray-700">
                React + Tailwind with Axios data fetching
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-indigo-200">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-700">
                Proper API handling & rate-limit safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to analyze repositories
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Enter GitHub Username
                </h3>
                <p className="text-gray-600 text-center">
                  Search for any GitHub user and explore their repositories
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-300 to-transparent -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Backend Fetches Data
                </h3>
                <p className="text-gray-600 text-center">
                  Spring Boot API queries GitHub for repos via Axios
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-blue-300 to-transparent -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  View Stats & Charts
                </h3>
                <p className="text-gray-600 text-center">
                  Frontend displays insights, charts & visual analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-gray-600 font-semibold mb-8 uppercase tracking-wide">
            Built With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {["React", "Spring Boot", "Tailwind CSS", "Axios", "Recharts"].map(
              (tech) => (
                <div
                  key={tech}
                  className="px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-semibold mb-2">
            © 2025 GitInsight. Built by Ayush Chaudhary with Spring Boot +
            React.
          </p>
          <p className="text-sm text-gray-400">
            Powered by modern web technologies for a seamless repository
            exploration experience.
          </p>
        </div>
      </footer>
    </div>
  );
}
