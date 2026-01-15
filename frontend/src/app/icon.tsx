import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-yellow-400/10 p-2 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
          <span className="text-xl">⚡</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          Task<span className="text-yellow-400">Flow</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
