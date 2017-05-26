import * as React from 'react'

const mountFlash = ({ name, flashPath, callback }) => ({
    __html:
    `<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="${name}" width="100%" height="100%">
        <param name="movie" value="${flashPath}?inline=1" />
        <param name="quality" value="autohigh" />
        <param name="swliveconnect" value="true" />
        <param name="allowScriptAccess" value="always" />
        <param name="bgcolor" value="#0" />
        <param name="allowFullScreen" value="false" />
        <param name="wmode" value="window" />
        <param name="FlashVars" value="callback=${callback}" />
        <embed
            src="${flashPath}?inline=1"
            width="100%"
            height="100%"
            name="${name}"
            quality="autohigh"
            bgcolor="#0"
            align="middle"
            allowFullScreen="false"
            allowScriptAccess="always"
            type="application/x-shockwave-flash"
            swliveconnect="true"
            wmode="window"
            FlashVars="callback=${callback}"
            pluginspage="http://www.macromedia.com/go/getflashplayer" >
        </embed>
    </object>`
})

interface FlashVideoProps {
    flashPath: string
    src?: string
    autoPlay?: boolean
    muted: boolean
    onManifestLoaded: any
    onPositionChange: any
}

export default class FlashVideo extends React.Component<FlashVideoProps, any> {
    flashObject: any
    id: number = document.embeds.length
    name: string = `flashVideo${this.id}`
    callbackName: string = `flashVideoCallback${this.id}`
    volume: number = 30

    componentWillMount() {
        window[this.callbackName] = this.callback.bind(this)
    }

    componentWillReceiveProps({ muted }) {
        if (typeof muted !== 'undefined') {
            this.flashObject.playerVolume(muted ? 0 : this.volume)
        }
    }

    callback(eventName, args) {
        console.log([eventName, args])
        switch (eventName) {
            case 'ready':
                this.initPlayer()
                break
            case 'manifest':
                this.props.onManifestLoaded({
                    duration: this.flashObject.getDuration()
                })
                if (this.props.autoPlay) {
                    this.play()
                }
                break
            case 'position':
                this.props.onPositionChange({ duration: args[0].duration, currentTime: args[0].position })
            default:
                break
        }
    }

    private initPlayer() {
        this.flashObject = document[this.name] || document.embeds[this.name]
        this.flashObject.playerLoad(this.props.src)
    }

    public play() {
        this.flashObject.playerPlay()
    }

    public pause() {
        this.flashObject.playerPause()
    }

    public resume() {
        this.flashObject.playerResume()
    }

    public setVolume(volume) {
        this.volume = volume * 100
        this.flashObject.playerVolume(volume * 100)
    }

    render() {
        let { flashPath } = this.props
        return (
            <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={mountFlash({ name: this.name, flashPath, callback: this.callbackName })}></div>
        )
    }
}