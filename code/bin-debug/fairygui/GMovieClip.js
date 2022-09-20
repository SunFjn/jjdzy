var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairygui;
(function (fairygui) {
    var GMovieClip = (function (_super) {
        __extends(GMovieClip, _super);
        function GMovieClip() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GMovieClip.prototype, "color", {
            get: function () {
                return 0;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        GMovieClip.prototype.createDisplayObject = function () {
            this._movieClip = new fairygui.MovieClip();
            this._movieClip["$owner"] = this;
            this._movieClip.touchEnabled = false;
            this.setDisplayObject(this._movieClip);
        };
        Object.defineProperty(GMovieClip.prototype, "playing", {
            get: function () {
                return this._movieClip.playing;
            },
            set: function (value) {
                if (this._movieClip.playing != value) {
                    this._movieClip.playing = value;
                    this.updateGear(5);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GMovieClip.prototype, "frame", {
            get: function () {
                return this._movieClip.frame;
            },
            set: function (value) {
                if (this._movieClip.frame != value) {
                    this._movieClip.frame = value;
                    this.updateGear(5);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GMovieClip.prototype, "timeScale", {
            get: function () {
                return this._movieClip.timeScale;
            },
            set: function (value) {
                this._movieClip.timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        GMovieClip.prototype.rewind = function () {
            this._movieClip.rewind();
        };
        GMovieClip.prototype.syncStatus = function (anotherMc) {
            this._movieClip.syncStatus(anotherMc._movieClip);
        };
        GMovieClip.prototype.advance = function (timeInMiniseconds) {
            this._movieClip.advance(timeInMiniseconds);
        };
        //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        GMovieClip.prototype.setPlaySettings = function (start, end, times, endAt, endCallback, callbackObj) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = -1; }
            if (times === void 0) { times = 0; }
            if (endAt === void 0) { endAt = -1; }
            if (endCallback === void 0) { endCallback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            this._movieClip.setPlaySettings(start, end, times, endAt, endCallback, callbackObj);
        };
        GMovieClip.prototype.constructFromResource = function () {
            this.sourceWidth = this.packageItem.width;
            this.sourceHeight = this.packageItem.height;
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;
            this.setSize(this.sourceWidth, this.sourceHeight);
            this.packageItem.load();
            this._movieClip.interval = this.packageItem.interval;
            this._movieClip.swing = this.packageItem.swing;
            this._movieClip.repeatDelay = this.packageItem.repeatDelay;
            this._movieClip.frames = this.packageItem.frames;
            this._movieClip.smoothing = this.packageItem.smoothing;
        };
        GMovieClip.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            if (buffer.readBool())
                this.color = buffer.readColor();
            buffer.readByte(); //flip
            this._movieClip.frame = buffer.readInt();
            this._movieClip.playing = buffer.readBool();
        };
        return GMovieClip;
    }(fairygui.GObject));
    fairygui.GMovieClip = GMovieClip;
    __reflect(GMovieClip.prototype, "fairygui.GMovieClip");
})(fairygui || (fairygui = {}));
