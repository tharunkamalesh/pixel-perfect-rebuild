import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0a',
                    borderRadius: '24%', // Squircle rounding
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                >
                    {/* Using the Veriis brand orange for high visibility on tiny scales */}
                    <circle cx="12" cy="12" r="3.2" fill="#FF6B00" />
                    <path
                        d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5S17.25 21.5 12 21.5 2.5 17.25 2.5 12"
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.4"
                    />
                    <path
                        d="M12 6.5A5.5 5.5 0 1 1 6.5 12"
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.9"
                    />
                </svg>
            </div>
        ),
        { ...size }
    );
}
