"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Hls = require("hls.js");
var Video_1 = require("./Video");
var flashVideo_1 = require("./flashVideo");
var Controls_1 = require("./Controls");
var HlsPlayer = (function (_super) {
    __extends(HlsPlayer, _super);
    function HlsPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isHlsSupported = Hls.isSupported;
        _this.state = {
            paused: !_this.props.autoPlay,
            muted: false,
            volume: 0,
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
        this.player.setPosition(currentTime);
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
        var requestFullScreen = this.container['requestFullscreen'] || this.container['webkitRequestFullScreen'] || this.container['mozRequestFullScreen'] || this.container['msRequestFullscreen'];
        var exitFullScreen = document['exitFullscreen'] || document["webkitExitFullscreen"] || document['mozCancelFullScreen'] || document['msExitFullscreen'];
        var fullScreen = this.state.fullScreen;
        if (fullScreen) {
            exitFullScreen && exitFullScreen.bind(document)();
        }
        else {
            requestFullScreen && requestFullScreen.bind(this.container)();
        }
        this.setState({
            fullScreen: !fullScreen
        });
    };
    HlsPlayer.prototype.handleManifestLoaded = function (_a) {
        var duration = _a.duration;
        this.setState({
            duration: duration
        });
        this.player.setVolume(this.state.volume);
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
            this.props.controls ? (React.createElement(Controls_1.default, { paused: paused, duration: duration, currentTime: currentTime, muted: muted, volume: volume, onPause: this.handlePause.bind(this), onSetPosition: this.handleSetPosition.bind(this), onMute: this.handleMute.bind(this), onSetVolume: this.handleSetVolume.bind(this), onToggleFullScreen: this.handleToggleFullScreen.bind(this) })) : null));
    };
    return HlsPlayer;
}(React.Component));
exports.default = HlsPlayer;
