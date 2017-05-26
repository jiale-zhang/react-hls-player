"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var mountFlash = function (_a) {
    var name = _a.name, flashPath = _a.flashPath, callback = _a.callback;
    return ({
        __html: "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"\" id=\"" + name + "\" width=\"100%\" height=\"100%\">\n        <param name=\"movie\" value=\"" + flashPath + "?inline=1\" />\n        <param name=\"quality\" value=\"autohigh\" />\n        <param name=\"swliveconnect\" value=\"true\" />\n        <param name=\"allowScriptAccess\" value=\"always\" />\n        <param name=\"bgcolor\" value=\"#0\" />\n        <param name=\"allowFullScreen\" value=\"false\" />\n        <param name=\"wmode\" value=\"window\" />\n        <param name=\"FlashVars\" value=\"callback=" + callback + "\" />\n        <embed\n            src=\"" + flashPath + "?inline=1\"\n            width=\"100%\"\n            height=\"100%\"\n            name=\"" + name + "\"\n            quality=\"autohigh\"\n            bgcolor=\"#0\"\n            align=\"middle\"\n            allowFullScreen=\"false\"\n            allowScriptAccess=\"always\"\n            type=\"application/x-shockwave-flash\"\n            swliveconnect=\"true\"\n            wmode=\"window\"\n            FlashVars=\"callback=" + callback + "\"\n            pluginspage=\"http://www.macromedia.com/go/getflashplayer\" >\n        </embed>\n    </object>"
    });
};
var FlashVideo = (function (_super) {
    __extends(FlashVideo, _super);
    function FlashVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = document.embeds.length;
        _this.name = "flashVideo" + _this.id;
        _this.callbackName = "flashVideoCallback" + _this.id;
        _this.volume = 30;
        return _this;
    }
    FlashVideo.prototype.componentWillMount = function () {
        window[this.callbackName] = this.callback.bind(this);
    };
    FlashVideo.prototype.componentWillReceiveProps = function (_a) {
        var muted = _a.muted;
        if (typeof muted !== 'undefined') {
            this.flashObject.playerVolume(muted ? 0 : this.volume);
        }
    };
    FlashVideo.prototype.callback = function (eventName, args) {
        console.log([eventName, args]);
        switch (eventName) {
            case 'ready':
                this.initPlayer();
                break;
            case 'manifest':
                this.props.onManifestLoaded({
                    duration: this.flashObject.getDuration()
                });
                if (this.props.autoPlay) {
                    this.play();
                }
                break;
            case 'position':
                this.props.onPositionChange({ duration: args[0].duration, currentTime: args[0].position });
            default:
                break;
        }
    };
    FlashVideo.prototype.initPlayer = function () {
        this.flashObject = document[this.name] || document.embeds[this.name];
        this.flashObject.playerLoad(this.props.src);
    };
    FlashVideo.prototype.play = function () {
        this.flashObject.playerPlay();
    };
    FlashVideo.prototype.pause = function () {
        this.flashObject.playerPause();
    };
    FlashVideo.prototype.resume = function () {
        this.flashObject.playerResume();
    };
    FlashVideo.prototype.setVolume = function (volume) {
        this.volume = volume * 100;
        this.flashObject.playerVolume(volume * 100);
    };
    FlashVideo.prototype.render = function () {
        var flashPath = this.props.flashPath;
        return (React.createElement("div", { style: { width: '100%', height: '100%' }, dangerouslySetInnerHTML: mountFlash({ name: this.name, flashPath: flashPath, callback: this.callbackName }) }));
    };
    return FlashVideo;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlashVideo;
