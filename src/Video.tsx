import * as React from 'react'
import * as Hls from 'hls.js'

interface VideoProps {
    src?: string
    autoPlay?: boolean
    muted: boolean
    onManifestLoaded: any
    onPositionChange: any
}

export default class Video extends React.Component<VideoProps, any>{

    player: HTMLVideoElement
    intervalId: number

    componentDidMount() {
        this.initPlayer()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    initPlayer() {
        const hls = new Hls()
        hls.loadSource(this.props.src)
        hls.attachMedia(this.player)
        hls.on(Hls.Events.MANIFEST_LOADED, () => {
            if (this.props.autoPlay) {
                this.play()
                this.props.onManifestLoaded({ duration: this.player.duration || 0 })
            }
        })
        this.intervalId = setInterval(() => {
            this.props.onPositionChange({ duration: this.player.duration || 0, currentTime: this.player.currentTime })
        }, 100)
    }

    public play() {
        this.player.currentTime = 0
        this.player.play()
    }

    public pause() {
        this.player.pause()
    }

    public resume() {
        this.player.play()
    }

    public setVolume(volume) {
        this.player.volume = volume
    }

    render() {
        let { muted } = this.props
        return (
            <video style={{ width: '100%', height: '100%', backgroundColor: 'black' }} muted={muted} ref={video => this.player = video}></video>
        )
    }
}