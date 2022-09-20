var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeChatSoundManager = (function () {
    function WeChatSoundManager() {
        this.BGM = true; //背景限制
        this.EFF = true; //特效限制
        this.stopFlags = [];
        this._bgmCtx = null;
        this._bgmPath = "";
        this.soundCtxPool = new Array();
        // 预创建实例
        this.PreBuildNum = 3;
        this.MaxSoundNum = 10;
        // 实例使用指针
        this._index = 0;
        var soundCtx = null;
        for (var i = 0; i++; i < this.PreBuildNum) {
            soundCtx = wx.createInnerAudioContext();
            this.soundCtxPool.push(soundCtx);
        }
    }
    Object.defineProperty(WeChatSoundManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new WeChatSoundManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    WeChatSoundManager.prototype.setBGM = function (val) {
        if (this.BGM == val) {
            return;
        }
        this.BGM = val;
        this.excute();
    };
    WeChatSoundManager.prototype.setEFF = function (val) {
        this.EFF = val;
    };
    WeChatSoundManager.prototype.setSoundEnable = function (v) {
        if (v) {
            this.removeStopFlag("enable");
        }
        else {
            this.addStopFlag("enable");
        }
    };
    WeChatSoundManager.prototype.addStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index == -1) {
            this.stopFlags.push(key);
            this.excute();
        }
    };
    WeChatSoundManager.prototype.removeStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index != -1) {
            this.stopFlags.splice(index, 1);
            this.excute();
        }
    };
    WeChatSoundManager.prototype.excute = function () {
        if (!this.stopFlags.length && this.BGM) {
            fairygui.UIConfig.buttonSoundVolumeScale = 1;
            this.resumeBGM();
        }
        else if (this.stopFlags.length || !this.BGM) {
            this.stopBGM();
            fairygui.UIConfig.buttonSoundVolumeScale = 0;
        }
    };
    WeChatSoundManager.prototype.clean = function () {
        this.soundCtxPool = new Array();
        this._index = 0;
        this._bgmCtx = null;
        this._bgmPath = "";
    };
    // 播放背景音乐
    WeChatSoundManager.prototype.playBGM = function (id) {
        var self = this;
        if (self.stopFlags.length || !self.BGM) {
            return;
        }
        if (self._bgmPath == bgmPath) {
            return;
        }
        var bgmPath = RESManager.getVersionUrl("resource/sound/bgm/" + id + ".mp3");
        if (this._bgmPath == bgmPath && this._bgmCtx != null) {
            this._bgmCtx.play();
        }
        else {
            this._bgmPath = bgmPath;
            if (!this._bgmCtx) {
                this._bgmCtx = wx.createInnerAudioContext();
            }
            this._bgmCtx.src = bgmPath;
            this._bgmCtx.loop = true;
            this._bgmCtx.autoplay = true;
        }
    };
    // 背景音乐是否正在播放
    WeChatSoundManager.prototype.isBGMPlaying = function () {
        if (this._bgmCtx) {
            return !this._bgmCtx.paused;
        }
        return false;
    };
    // 暂停背景音乐
    WeChatSoundManager.prototype.pauseBGM = function () {
        console.log("stop music");
        if (this._bgmCtx) {
            this._bgmCtx.pause();
        }
    };
    // 恢复背景音乐
    WeChatSoundManager.prototype.resumeBGM = function () {
        if (this._bgmCtx) {
            this._bgmCtx.play();
        }
        else {
            if (this._bgmPath) {
                this.playBGM(this._bgmPath);
            }
        }
    };
    // 停止背景音乐
    WeChatSoundManager.prototype.stopBGM = function () {
        if (this._bgmCtx) {
            this._bgmCtx.stop();
            this._bgmCtx.destroy();
            this._bgmCtx = null;
        }
    };
    // 播放音频
    WeChatSoundManager.prototype.playEff = function (id) {
        var self = this;
        if (self.stopFlags.length || !self.EFF) {
            return;
        }
        var soundPath = RESManager.getVersionUrl("resource/sound/eff/" + id + ".mp3");
        var soundCtx = this.getSoundCtx();
        if (soundCtx) {
            soundCtx.src = soundPath;
            soundCtx.stop();
            soundCtx.play();
        }
    };
    WeChatSoundManager.prototype.stopAllSound = function () {
        this.soundCtxPool.forEach(function (soundCtx) {
            // 暂停或停止了
            if (!soundCtx.paused) {
                soundCtx.stop();
            }
        });
    };
    // 获取一个音频实例
    WeChatSoundManager.prototype.getSoundCtx = function () {
        var soundCtx = null;
        for (var i = 0; i++; i < this.soundCtxPool.length) {
            soundCtx = this.soundCtxPool[i];
            // 暂停或停止了
            if (soundCtx.paused) {
                return soundCtx;
            }
        }
        if (!soundCtx) {
            // 留一个实例用于播放背景音乐
            if (this.soundCtxPool.length < this.MaxSoundNum - 1) {
                soundCtx = wx.createInnerAudioContext();
            }
            else {
                soundCtx = this.soundCtxPool[this._index];
                this._index++;
                if (this._index > this.MaxSoundNum) {
                    this._index = 0;
                }
                soundCtx.stop();
            }
        }
        return soundCtx;
    };
    return WeChatSoundManager;
}());
__reflect(WeChatSoundManager.prototype, "WeChatSoundManager");
