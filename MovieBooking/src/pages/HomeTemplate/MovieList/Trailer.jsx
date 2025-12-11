import React from "react";

const Trailer = ({ propTrailer, onClose }) => {
  const getEmbedUrl = (url) => {
        if (!url) return "";
        try {
            // If already an embed URL, return as-is
            if (url.includes("youtube.com/embed")) return url;

            // Ensure URL has protocol for URL parsing
            const normalized = url.startsWith("http") ? url : `https://${url}`;
            const u = new URL(normalized);

            let videoId = "";

            if (u.hostname.includes("youtu.be")) {
                videoId = u.pathname.replace(/^\//, "");
            } else if (u.hostname.includes("youtube.com")) {
                // try v param first
                videoId = u.searchParams.get("v") || u.pathname.split("/").pop();
            }

            // fallback: try to find 11-char youtube id in the string
            if (!videoId) {
                const m = url.match(/([A-Za-z0-9_-]{11})/);
                if (m) videoId = m[1];
            }

            if (!videoId) return "";

            // Handle start time 't' or 'start' from query or hash
            let t = u.searchParams.get("t") || u.searchParams.get("start") || "";
            if (!t && u.hash) {
                // hash may be like #t=1m30s
                const h = u.hash.replace(/^#/, "");
                if (h.startsWith("t=")) t = h.substring(2);
            }

            const seconds = parseTimeParam(t);
            const params = seconds ? `?start=${seconds}` : "";

            return `https://www.youtube.com/embed/${videoId}${params}`;
        } catch (e) {
            // fallback: extract id from any string
            const m = url.match(/([A-Za-z0-9_-]{11})/);
            if (m) return `https://www.youtube.com/embed/${m[1]}`;
            return "";
        }
    };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%] aspect-video bg-black rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-[4%] -right-[2.5%] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 flex items-center justify-center rounded-full bg-[#383838] border border-white/60 text-white hover:bg-red-500 transition cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"></i>
        </button>

        <iframe
          className="w-full h-full rounded-lg"
          src={getEmbedUrl(propTrailer)}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
