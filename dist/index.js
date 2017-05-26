"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Video_1 = require("./Video");
var flashVideo_1 = require("./flashVideo");
var HlsPlayer = (function (_super) {
    __extends(HlsPlayer, _super);
    function HlsPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isHlsSupported = true;
        _this.state = {
            paused: !_this.props.autoPlay,
            muted: false,
            volume: 1,
            duration: 0,
            currentTime: 0,
            fullScreen: false
        };
        return _this;
    }
    HlsPlayer.prototype.handlePause = function () {
        var paused = this.state.paused;
        paused ? this.player.resume() : this.player.pause();
        this.setState({
            paused: !paused
        });
    };
    HlsPlayer.prototype.handleSetPosition = function (currentTime) {
        this.setState({
            currentTime: currentTime
        });
    };
    HlsPlayer.prototype.handleMute = function () {
        this.setState({
            muted: !this.state.muted
        });
    };
    HlsPlayer.prototype.handleSetVolume = function (volume) {
        this.setState({
            volume: volume
        });
        this.player.setVolume(volume);
    };
    HlsPlayer.prototype.handleToggleFullScreen = function () {
        this.setState({
            fullScreen: !this.state.fullScreen
        });
    };
    HlsPlayer.prototype.handleManifestLoaded = function (_a) {
        var duration = _a.duration;
        this.setState({
            duration: duration
        });
    };
    HlsPlayer.prototype.handlePositionChange = function (_a) {
        var duration = _a.duration, currentTime = _a.currentTime;
        this.setState({
            duration: duration,
            currentTime: currentTime
        });
    };
    HlsPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, height = _a.height, src = _a.src, autoPlay = _a.autoPlay, _b = this.state, muted = _b.muted, paused = _b.paused, volume = _b.volume, duration = _b.duration, currentTime = _b.currentTime, fullScreen = _b.fullScreen;
        return (React.createElement("div", { style: fullScreen ?
                { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 } :
                { position: 'relative', display: 'inline-block', width: width || 300, height: height || 150 }, ref: function (container) { return _this.container = container; } },
            this.isHlsSupported ?
                React.createElement(Video_1.default, { ref: function (player) { return _this.player = player; }, autoPlay: autoPlay, src: src, muted: muted, onManifestLoaded: this.handleManifestLoaded.bind(this), onPositionChange: this.handlePositionChange.bind(this) }) :
                React.createElement(flashVideo_1.default, { flashPath: this.props.swf, ref: function (player) { return _this.player = player; }, autoPlay: autoPlay, src: src, muted: muted, onManifestLoaded: this.handleManifestLoaded.bind(this), onPositionChange: this.handlePositionChange.bind(this) }),
            this.props.controls ? (React.createElement("div", { style: { position: 'absolute', right: 0, bottom: 0, left: 0, height: '30px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)' } },
                React.createElement("button", { onClick: this.handlePause.bind(this) }, paused ? '播放' : '暂停'),
                React.createElement("span", null, currentTime + " / " + duration),
                React.createElement("button", { onClick: this.handleMute.bind(this) }, '静音'),
                React.createElement("button", { onClick: this.handleToggleFullScreen.bind(this) }, '全屏'))) : null));
    };
    return HlsPlayer;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HlsPlayer;
