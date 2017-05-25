import * as React from 'react'
import * as Hls from 'hls.js'
import FlashVideo from './flashVideo'

interface HlsPlayerProps {
    src: string
    flash: string
    controls: boolean
}

export class HlsPlayer extends React.Component<HlsPlayerProps, any>{


    embedName = 'flashls'
    isHlsSupported = false
    refs: { video: any }
    player: HTMLVideoElement | FlashVideo

    state = {
        flash: '' || this.props.flash
    }

    componentWillMount() {

    }

    componentDidMount() {
        if (this.isHlsSupported) {
            this.initH5Player()
        }
    }

    public setupFlash

    initH5Player() {
        this.player = this.refs.video
        const hls = new Hls()
        hls.loadSource(this.props.src)
        hls.attachMedia(this.refs.video)
        hls.on(Hls.Events.MANIFEST_LOADED, () => {
            this.player.play()
        })
    }


    render() {
        return (
            <div>
                {
                    this.isHlsSupported ?
                        <video ref="video"></video> :
                        <FlashVideo flashPath="" />
                }
            </div>
        )
    }
}