import React from 'react'

function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
const minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
]);

export default function SeekBar({trackLength, currentPosition, onSeek, onSlidingStart}) {
    const elapsed = minutesAndSeconds(currentPosition);
    const remaining = minutesAndSeconds(trackLength - currentPosition);
    return (
        <div className="seekBar">
            <div>
                {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
            </div>
            <div>---</div>
            <div>
                {elapsed[0] + ":" + elapsed[1]}
            </div>
        </div>
    )
}
