var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this._hasListen = false;
        this.bgmSound = new egret.Sound();
        this.sounds = {}; //已经加载进来的sounds
        this.loadings = {}; //正在加载的sounds url
        this.canPlay = true;
        this.BGM = true; //背景限制
        this.EFF = true; //特效限制
        this.stopFlags = [];
        this.isFirstPlay = true;
        this.isFirstPlayEff = true;
        this.counter = 0;
    }
    SoundManager.getInstance = function () {
        var SoundMgr = SoundManager;
        if (PlatformManager.isWx()) {
            SoundManager._ins = WeChatSoundManager.instance;
        }
        else {
            if (!SoundMgr._ins) {
                SoundManager._ins = new SoundManager();
            }
        }
        return SoundMgr._ins;
    };
    SoundManager.prototype.listenOnce = function (sound) {
        var self = SoundManager.getInstance();
        self.firstSound = sound;
        if (!GGlobal.loginArg.os || GGlobal.loginArg.os != "ios") {
            return false; //安卓机 默认不需要触摸事件
        }
        if (self._hasListen)
            return true;
        self._hasListen = true;
        if ((GGlobal.sdk && GGlobal.loginArg.os == "ios") || (GGlobal.loginArg.os && GGlobal.loginArg.os == "ios")) {
            self.canPlay = false;
            App.stage.once(egret.TouchEvent.TOUCH_BEGIN, self.touchHD, self);
            return !self.canPlay;
        }
        return false;
    };
    SoundManager.prototype.touchHD = function () {
        var s = SoundManager.getInstance();
        s.canPlay = true;
        s.excute();
    };
    SoundManager.prototype.setBGM = function (val) {
        if (this.BGM == val)
            return;
        this.BGM = val;
        this.excute();
    };
    SoundManager.prototype.setEFF = function (val) {
        this.EFF = val;
    };
    SoundManager.prototype.setSoundEnable = function (v) {
        if (v) {
            this.removeStopFlag("enable");
        }
        else {
            this.addStopFlag("enable");
        }
    };
    SoundManager.prototype.addStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index == -1) {
            this.stopFlags.push(key);
            Timer.instance.callLater(this.excute, 150, this, null, false, false, true);
        }
    };
    SoundManager.prototype.removeStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index != -1) {
            this.stopFlags.splice(index, 1);
            Timer.instance.callLater(this.excute, 150, this, null, false, false, true);
        }
    };
    SoundManager.prototype.excute = function () {
        var self = this;
        if (!this.stopFlags.length && this.BGM) {
            this.playCurBGM();
            fairygui.UIConfig.buttonSoundVolumeScale = 1;
        }
        else if (this.stopFlags.length || !this.BGM) {
            this.stopCurBGM();
            fairygui.UIConfig.buttonSoundVolumeScale = 0;
        }
    };
    /**
     * 播放背景音乐 resource/sound/bmg
     */
    SoundManager.prototype.playBGM = function (id) {
        var self = this;
        if (!id) {
            if (self.bgmChannel) {
                self.bgmChannel.stop();
                self.bgmChannel = null;
            }
            self.curbgmurl = null;
            return;
        }
        var url = RESManager.getVersionUrl("resource/sound/bgm/" + id + ".mp3");
        if (self.curbgmurl == url) {
            return;
        }
        self.curbgmurl = url;
        if (id) {
            self.playCurBGM();
        }
    };
    SoundManager.prototype.playCurBGM = function () {
        var self = this;
        if (self.bgmChannel) {
            self.bgmChannel.stop();
            self.bgmChannel = null;
        }
        if (!self.stopFlags.length && self.BGM) {
            var url = self.curbgmurl;
            if (!url) {
                return;
            }
            var sound = self.sounds[url];
            if (sound) {
                try {
                    if (self.canPlay) {
                        self.bgmChannel = sound.play();
                        self.bgmChannel.volume = 0.5;
                    }
                }
                catch (e) {
                    console.log("playbmgError:" + url);
                }
            }
            else {
                if (!self.loadings[url]) {
                    self.loadings[url] = true;
                    RES.getResByUrl(url, self.onBgmLoaded, self, RES.ResourceItem.TYPE_SOUND);
                }
            }
        }
    };
    SoundManager.prototype.stopCurBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
        fairygui.UIConfig.buttonSoundVolumeScale = 0;
    };
    SoundManager.prototype.onBgmLoaded = function (sound, url) {
        var self = this;
        if (sound) {
            self.sounds[url] = sound;
            delete self.loadings[url];
            if (url == this.curbgmurl && !this.stopFlags.length && this.BGM) {
                try {
                    if (self.listenOnce(sound)) {
                        return;
                    }
                    if (self.canPlay) {
                        self.bgmChannel = sound.play();
                        self.bgmChannel.volume = 0.5;
                    }
                }
                catch (e) {
                    console.log("playBmgError:" + url);
                }
            }
        }
    };
    /**
     * 播放音效 resource/sound/eff
     */
    SoundManager.prototype.playEff = function (id) {
        if (!id) {
            return;
        }
        var self = this;
        if (self.stopFlags.length || !self.EFF) {
            return;
        }
        if (self.counter > 3) {
            return;
        }
        var url = RESManager.getVersionUrl("resource/sound/eff/" + id + ".mp3");
        var sound = self.sounds[url];
        if (sound) {
            try {
                if (self.canPlay) {
                    var channel = sound.play(0, 1);
                    channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onsounded, self);
                    self.counter++;
                }
            }
            catch (e) {
                console.log("playSoundEffError:" + url);
            }
        }
        else {
            if (!self.loadings[url]) {
                self.loadings[url] = true;
                RES.getResByUrl(url, self.onloaded, self, RES.ResourceItem.TYPE_SOUND);
            }
        }
        return channel;
    };
    SoundManager.prototype.onloaded = function (sound, url) {
        if (sound) {
            delete this.loadings[url];
            this.sounds[url] = sound;
        }
    };
    SoundManager.prototype.onsounded = function (e) {
        this.counter--;
        e.target.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
    };
    SoundManager.prototype.killChannel = function (channel) {
        if (channel && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            channel.stop();
            this.counter--;
            channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
