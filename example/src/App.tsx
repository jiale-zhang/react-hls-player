import * as React from 'react'
import { render } from 'react-dom'
import HlsPlayer from '../../'

class App extends React.Component<any, any>{
    render() {
        return <HlsPlayer autoPlay controls src="http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8" swf="/flashls/flashlsChromeless.swf"  />
    }
}

render(<App />, document.getElementById('app'))