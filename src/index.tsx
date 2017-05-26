import * as React from 'react'
import * as Hls from 'hls.js'
import Video from './Video'
import FlashVideo from './flashVideo'

interface HlsPlayerProps {
    src: string
    swf: string
    width?: string | number
    height?: string | number
    controls?: boolean
    autoPlay?: boolean
}

export default class HlsPlayer extends React.Component<HlsPlayerProps, any>{

    isHlsSupported = true
    player: Video | FlashVideo
    container: HTMLDivElement

    state = {
        paused: !this.props.autoPlay,
        muted: false,
        volume: 1,
        duration: 0,
        currentTime: 0,
        fullScreen: false
    }

    handlePause() {
        let { paused } = this.state
        paused ? this.player.resume() : this.player.pause()
        this.setState({
            paused: !paused
        })
    }

    handleSetPosition(currentTime) {
        this.setState({
            currentTime
        })
    }

    handleMute() {
        this.setState({
            muted: !this.state.muted
        })
    }

    handleSetVolume(volume) {
        this.setState({
            volume
        })
        this.player.setVolume(volume)
    }

    handleToggleFullScreen() {
        this.setState({
            fullScreen: !this.state.fullScreen
        })
    }

    handleManifestLoaded({ duration }) {
        this.setState({
            duration
        })
    }

    handlePositionChange({ duration, currentTime }) {
        this.setState({
            duration,
            currentTime
        })
    }

    render() {
        let { width, height, src, autoPlay } = this.props,
            { muted, paused, volume, duration, currentTime, fullScreen } = this.state
        return (
            <div style={
                fullScreen ?
                    { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 } :
                    { position: 'relative', display: 'inline-block', width: width || 300, height: height || 150 }
            } ref={container => this.container = container}>
                {
                    this.isHlsSupported ?
                        <Video ref={player => this.player = player} autoPlay={autoPlay} src={src} muted={muted} onManifestLoaded={this.handleManifestLoaded.bind(this)} onPositionChange={this.handlePositionChange.bind(this)}  ></Video> :
                        <FlashVideo flashPath={this.props.swf} ref={player => this.player = player} autoPlay={autoPlay} src={src} muted={muted} onManifestLoaded={this.handleManifestLoaded.bind(this)} onPositionChange={this.handlePositionChange.bind(this)} />
                }
                {
                    this.props.controls ? (
                        <div style={{ position: 'absolute', right: 0, bottom: 0, left: 0, height: '30px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <button onClick={this.handlePause.bind(this)}>{paused ? '播放' : '暂停'}</button>
                            <span>{`${currentTime} / ${duration}`}</span>

                            <button onClick={this.handleMute.bind(this)}>{'静音'}</button>

                            <button onClick={this.handleToggleFullScreen.bind(this)}>{'全屏'}</button>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}