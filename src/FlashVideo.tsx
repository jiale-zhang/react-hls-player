import * as React from 'react'

const mountFlash = ({ name, flashPath, callback }) => ({
    __html:
    `<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="${name}" width="100%" height="100%">
        <param name="movie" value="${flashPath}?inline=1" />
        <param name="quality" value="autohigh" />
        <param name="swliveconnect" value="true" />
        <param name="allowScriptAccess" value="always" />
        <param name="bgcolor" value="#0" />
        <param name="allowFullScreen" value="true" />
        <param name="wmode" value="window" />
        <param name="FlashVars" value="callback=${callback}" />
        <embed
            src="${flashPath}?inline=1"
            width="100%"
            height="100%"
            name="${name}"
            quality="autohigh"
            bgcolor="#0"
            align="middle" allowFullScreen="true"
            allowScriptAccess="always"
            type="application/x-shockwave-flash"
            swliveconnect="true"
            wmode="window"
            FlashVars="callback=${callback}"
            pluginspage="http://www.macromedia.com/go/getflashplayer" >
        </embed>
    </object>`
})

const VideoControls: React.StatelessComponent<any> = () => (
    <div>

    </div>
)

interface FlashVideoProps {
    flashPath: string
    controls?: boolean
    width?: number
    height?: number
    poster?: string
}

export default class FlashVideo extends React.Component<FlashVideoProps, any> {
    flashObject: any
    id: number = document.embeds.length
    name: string = `flashVideo${this.id}`
    callbackName: string = `flashVideoCallback${this.id}`
    player: any

    state = {
        height: this.props.height
    }

    componentWillMount() {
        window[this.callbackName] = this.callback.bind(this)
    }

    callback(eventName, args) {
        switch (eventName) {
            case 'ready':
                this.initPlayer()
        }
    }

    get height() {
        return this.state.height
    }

    set height(height: number) {
        this.setState({
            height: height
        })
    }

    initPlayer() {
        this.player = document[this.name] || document.embeds[this.name]
    }

    public play() {

    }

    render() {
        let { flashPath, children, controls, width, height, ...props } = this.props
        return (
            <div {...props} style={{ width, height, position: 'relative' }}>
                <div dangerouslySetInnerHTML={mountFlash({ name: this.name, flashPath, callback: this.callbackName })}></div>
                {
                    controls ? <VideoControls /> : null
                }
            </div>
        )
    }

}