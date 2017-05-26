"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Hls = require("hls.js");
var Range = function (_a) {
    var value = _a.value, onRange = _a.onRange;
    return (Hls.isSupported ? React.createElement("input", { type: "range", value: value, onChange: function (e) { return onRange(e.target.value); } }) : (React.createElement("div", { style: { display: 'inline-block' } },
        React.createElement("span", null))));
};
var Controls = function (_a) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, paused = _a.paused, duration = _a.duration, currentTime = _a.currentTime, muted = _a.muted, volume = _a.volume, onPause = _a.onPause, onSetPosition = _a.onSetPosition, onMute = _a.onMute, onSetVolume = _a.onSetVolume, onToggleFullScreen = _a.onToggleFullScreen;
    return (React.createElement("div", { style: __assign({ position: 'absolute', right: 0, bottom: 0, left: 0, height: '30px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.3)' }, style) },
        React.createElement("button", { onClick: onPause }, paused ? '播放' : '暂停'),
        React.createElement("span", null, Math.round(currentTime) + " / " + Math.round(duration)),
        React.createElement(Range, { value: duration ? currentTime / duration * 100 : 0, onRange: function (range) { return onSetPosition(duration * range / 100); } }),
        React.createElement("button", { onClick: onMute }, '静音'),
        React.createElement(Range, { value: volume * 100, onRange: function (range) { return onSetVolume(range / 100); } }),
        React.createElement("button", { onClick: onToggleFullScreen }, '全屏')));
};
exports.default = Controls;
