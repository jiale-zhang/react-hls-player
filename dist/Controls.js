"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Controls = (function (_super) {
    __extends(Controls, _super);
    function Controls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controls.prototype.render = function () {
        var _a = this.props, paused = _a.paused, duration = _a.duration, currentTime = _a.currentTime, muted = _a.muted, volume = _a.volume, fullScreen = _a.fullScreen, onPause = _a.onPause, onSetPosition = _a.onSetPosition, onMute = _a.onMute, onSetVolume = _a.onSetVolume, onToggleFullScreen = _a.onToggleFullScreen;
        return (React.createElement("div", { style: { position: 'absolute', right: 0, bottom: 0, left: 0, height: '30px', backgroundColor: 'rgba(255,255,255,0.3)' } },
            React.createElement("button", { onClick: function () { return onPause(!paused); } }, paused ? '播放' : '暂停'),
            React.createElement("span", null, currentTime + " / " + duration),
            React.createElement("button", { onClick: function () { return onMute(!muted); } }, '静音'),
            React.createElement("button", { onClick: function () { return onToggleFullScreen(!fullScreen); } }, '全屏')));
    };
    return Controls;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controls;
