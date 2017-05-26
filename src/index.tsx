import * as React from 'react'
import * as Hls from 'hls.js'
import Video from './Video'
import FlashVideo from './flashVideo'
import Controls from './Controls'

interface HlsPlayerProps {
    src: string
    swf: string
    width?: string | number
    height?: string | number
    controls?: boolean
    autoPlay?: boolean
}

export default class HlsPlayer extends React.Component<HlsPlayerProps, any>{

    isHlsSupported = Hls.isSupported
    player: Video | FlashVideo
    container: HTMLDivElement

    state = {
        paused: !this.props.autoPlay,
        muted: false,
        volume: 0,
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
        this.player.setPosition(currentTime)
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
        const requestFullScreen = this.container['requestFullscreen'] || this.container['webkitRequestFullScreen'] || this.container['mozRequestFullScreen'] || this.container['msRequestFullscreen']
        const exitFullScreen = document['exitFullscreen'] || document["webkitExitFullscreen"] || document['mozCancelFullScreen'] || document['msExitFullscreen']
        let { fullScreen } = this.state
        if(fullScreen){
            exitFullScreen && exitFullScreen.bind(document)()
        }else{
            requestFullScreen && requestFullScreen.bind(this.container)()
        }
        this.setState({
            fullScreen: !fullScreen
        })
    }

    handleManifestLoaded({ duration }) {
        this.setState({
            duration
        })
        this.player.setVolume(this.state.volume)
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
                        <Controls
                            paused={paused}
                            duration={duration}
                            currentTime={currentTime}
                            muted={muted}
                            volume={volume}
                            onPause={this.handlePause.bind(this)}
                            onSetPosition={this.handleSetPosition.bind(this)}
                            onMute={this.handleMute.bind(this)}
                            onSetVolume={this.handleSetVolume.bind(this)}
                            onToggleFullScreen={this.handleToggleFullScreen.bind(this)}
                        />
                    ) : null
                }
            </div>
        )
    }
}