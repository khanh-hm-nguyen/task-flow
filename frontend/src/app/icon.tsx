import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex', // MUST be explicit for Satori
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(250, 204, 21, 0.1)', 
            borderRadius: '8px',
            padding: '4px',
            marginRight: '4px'
          }}
        >
          <span style={{ fontSize: '16px' }}>⚡</span>
        </div>
     
        <div style={{ display: 'flex', fontWeight: 'bold', fontSize: '12px', color: 'white' }}>
          T<span style={{ color: '#facc15' }}>F</span>
        </div>
      </div>
    ),
    { ...size }
  );
}