import * as React from 'react'
import * as Hls from 'hls.js'

const Range = ({ value, onRange }) => (
    Hls.isSupported ? <input type="range" value={value} onChange={e => onRange(e.target.value)} /> : (
        <div style={{display: 'inline-block'}}>
            <span></span>
        </div>
    )
)

const Controls = ({ style = {}, paused, duration, currentTime, muted, volume, onPause, onSetPosition, onMute, onSetVolume, onToggleFullScreen }) => (
    <div style={{ position: 'absolute', right: 0, bottom: 0, left: 0, height: '30px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', ...style }}>
        <button onClick={onPause}>{paused ? '播放' : '暂停'}</button>
        <span>{`${Math.round(currentTime)} / ${Math.round(duration)}`}</span>
        <Range value={duration ? currentTime / duration * 100 : 0} onRange={range => onSetPosition(duration * range / 100)} />
        <button onClick={onMute}>{'静音'}</button>
        <Range value={volume * 100} onRange={range => onSetVolume(range / 100)} />
        <button onClick={onToggleFullScreen}>{'全屏'}</button>
    </div>
)

export default Controls