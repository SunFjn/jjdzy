class SoundManager {
	public constructor() {
	}

	public static _ins;
	public static getInstance(): SoundManager {
		var SoundMgr = SoundManager;
		if (PlatformManager.isWx()) {
			SoundManager._ins = WeChatSoundManager.instance;
		} else {
			if (!SoundMgr._ins) {
				SoundManager._ins = new SoundManager();
			}
		}
		return SoundMgr._ins;
	}

	private firstSound;
	private _hasListen = false;
	private listenOnce(sound) {
		let self = SoundManager.getInstance();
		self.firstSound = sound;
		if(!GGlobal.loginArg.os||GGlobal.loginArg.os != "ios"){
			return false;//安卓机 默认不需要触摸事件
		}
		if (self._hasListen) return true;
		self._hasListen = true;
		if ((GGlobal.sdk && GGlobal.loginArg.os == "ios")||(GGlobal.loginArg.os&&GGlobal.loginArg.os == "ios")) {
			self.canPlay = false;
			App.stage.once(egret.TouchEvent.TOUCH_BEGIN, self.touchHD, self);
			return !self.canPlay;
		}
		return false;
	}

	private touchHD(): void {
		let s = SoundManager.getInstance();
		s.canPlay = true;
		s.excute();
	}

	public bgmSound: egret.Sound = new egret.Sound();
	public bgmChannel: egret.SoundChannel;
	public curbgmurl: string;

	public sounds: any = {};//已经加载进来的sounds
	public loadings: any = {};//正在加载的sounds url

	public canPlay = true;

	public BGM = true;//背景限制
	public EFF = true;//特效限制
	public setBGM(val) {
		if (this.BGM == val) return;
		this.BGM = val;
		this.excute();
	}
	public setEFF(val) {
		this.EFF = val;
	}

	public stopFlags = [];
	public setSoundEnable(v: boolean) {
		if (v) {
			this.removeStopFlag("enable");
		} else {
			this.addStopFlag("enable");
		}
	}

	public addStopFlag(key) {
		var index = this.stopFlags.indexOf(key);
		if (index == -1) {
			this.stopFlags.push(key);
			Timer.instance.callLater(this.excute, 150, this, null, false, false, true);
		}
	}

	public removeStopFlag(key) {
		var index = this.stopFlags.indexOf(key);
		if (index != -1) {
			this.stopFlags.splice(index, 1);
			Timer.instance.callLater(this.excute, 150, this, null, false, false, true);
		}
	}

	public excute() {
		let self = this;
		if (!this.stopFlags.length && this.BGM) {
			this.playCurBGM();
			fairygui.UIConfig.buttonSoundVolumeScale = 1;
		}
		else if (this.stopFlags.length || !this.BGM) {
			this.stopCurBGM();
			fairygui.UIConfig.buttonSoundVolumeScale = 0;
		}
	}

	/**
	 * 播放背景音乐 resource/sound/bmg
	 */
	public playBGM(id) {
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
	}

	private isFirstPlay: boolean = true;
	public playCurBGM() {
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
			var sound: egret.Sound = self.sounds[url];
			if (sound) {
				try {
					if (self.canPlay) {
						self.bgmChannel = sound.play();
						self.bgmChannel.volume = 0.5;
					}
				} catch (e) {
					console.log("playbmgError:" + url);
				}
			} else {
				if (!self.loadings[url]) {
					self.loadings[url] = true;
					RES.getResByUrl(url, self.onBgmLoaded, self, RES.ResourceItem.TYPE_SOUND);
				}
			}
		}
	}

	public stopCurBGM() {
		if (this.bgmChannel) {
			this.bgmChannel.stop();
			this.bgmChannel = null;
		}
		fairygui.UIConfig.buttonSoundVolumeScale = 0;
	}

	protected onBgmLoaded(sound: egret.Sound, url) {
		let self = this;
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
				} catch (e) {
					console.log("playBmgError:" + url);
				}
			}
		}
	}


	private isFirstPlayEff: boolean = true;
	/**
	 * 播放音效 resource/sound/eff
	 */
	public playEff(id): egret.SoundChannel {
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
		var sound: egret.Sound = self.sounds[url];
		if (sound) {
			try {
				if (self.canPlay) {
					var channel = sound.play(0, 1);
					channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onsounded, self);
					self.counter++;
				}
			} catch (e) {
				console.log("playSoundEffError:" + url);
			}
		} else {
			if (!self.loadings[url]) {
				self.loadings[url] = true;
				RES.getResByUrl(url, self.onloaded, self, RES.ResourceItem.TYPE_SOUND);
			}
		}
		return channel;
	}

	protected onloaded(sound, url) {
		if (sound) {
			delete this.loadings[url];
			this.sounds[url] = sound;
		}
	}

	public counter = 0;
	protected onsounded(e: egret.Event) {
		this.counter--;
		e.target.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
	}

	public killChannel(channel: egret.SoundChannel) {
		if (channel && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
			channel.stop();
			this.counter--;
			channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
		}
	}

}