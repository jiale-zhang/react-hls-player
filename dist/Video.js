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
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Video.prototype.componentDidMount = function () {
        this.initPlayer();
    };
    Video.prototype.componentWillUnmount = function () {
        clearInterval(this.intervalId);
    };
    Video.prototype.initPlayer = function () {
        var _this = this;
        var hls = new Hls();
        hls.loadSource(this.props.src);
        hls.attachMedia(this.player);
        hls.on(Hls.Events.MANIFEST_LOADED, function () {
            if (_this.props.autoPlay) {
                _this.play();
                _this.props.onManifestLoaded({ duration: _this.player.duration || 0 });
            }
        });
        this.intervalId = setInterval(function () {
            _this.props.onPositionChange({ duration: _this.player.duration || 0, currentTime: _this.player.currentTime });
        }, 100);
    };
    Video.prototype.play = function () {
        this.player.currentTime = 0;
        this.player.play();
    };
    Video.prototype.pause = function () {
        this.player.pause();
    };
    Video.prototype.resume = function () {
        this.player.play();
    };
    Video.prototype.setVolume = function (volume) {
        this.player.volume = volume;
    };
    Video.prototype.setPosition = function (currentTime) {
        this.player.currentTime = currentTime;
    };
    Video.prototype.render = function () {
        var _this = this;
        var muted = this.props.muted;
        return (React.createElement("video", { style: { width: '100%', height: '100%', backgroundColor: 'black' }, controls: false, muted: muted, ref: function (video) { return _this.player = video; } }));
    };
    return Video;
}(React.Component));
exports.default = Video;
