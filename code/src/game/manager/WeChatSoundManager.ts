class WeChatSoundManager {
	private static _instance: WeChatSoundManager;
	public static get instance() {
		if (!this._instance) {
			this._instance = new WeChatSoundManager();
		}
		return this._instance;
	}

	public BGM = true;//背景限制
	public EFF = true;//特效限制
	public setBGM(val) {
		if (this.BGM == val) {
			return;
		}
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
			this.excute();
		}
	}

	public removeStopFlag(key) {
		var index = this.stopFlags.indexOf(key);
		if (index != -1) {
			this.stopFlags.splice(index, 1);
			this.excute();
		}
	}

	private excute(){
		if (!this.stopFlags.length && this.BGM) {
			fairygui.UIConfig.buttonSoundVolumeScale = 1;
			this.resumeBGM();
		}
		else if (this.stopFlags.length || !this.BGM) {
			this.stopBGM();
			fairygui.UIConfig.buttonSoundVolumeScale = 0;
		}
	}

	private _bgmCtx = null;
	private _bgmPath = "";

	private soundCtxPool = new Array<any>();
	// 预创建实例
	private PreBuildNum = 3;
	private MaxSoundNum = 10;
	// 实例使用指针
	private _index = 0;

	public constructor() {
		let soundCtx = null;
		for (let i = 0; i++; i < this.PreBuildNum) {
			soundCtx = wx.createInnerAudioContext();
			this.soundCtxPool.push(soundCtx);
		}
	}

	public clean() {
		this.soundCtxPool = new Array<any>();
		this._index = 0;
		this._bgmCtx = null;
		this._bgmPath = "";
	}

	// 播放背景音乐
	public playBGM(id) {
		let self = this;
		if (self.stopFlags.length || !self.BGM){
			return;
		}
		if (self._bgmPath == bgmPath) {
			return;
		}
		var bgmPath = RESManager.getVersionUrl("resource/sound/bgm/" + id + ".mp3");
		if (this._bgmPath == bgmPath && this._bgmCtx != null) {
			this._bgmCtx.play();
		} else {
			this._bgmPath = bgmPath;
			if (!this._bgmCtx) {
				this._bgmCtx = wx.createInnerAudioContext();
			}
			this._bgmCtx.src = bgmPath;
			this._bgmCtx.loop = true;
			this._bgmCtx.autoplay = true;
		}
	}

	// 背景音乐是否正在播放
	public isBGMPlaying() {
		if (this._bgmCtx) {
			return !this._bgmCtx.paused;
		}
		return false;
	}

	// 暂停背景音乐
	public pauseBGM() {
		console.log("stop music");
		if (this._bgmCtx) {
			this._bgmCtx.pause();
		}
	}

	// 恢复背景音乐
	public resumeBGM() {
		if (this._bgmCtx) {
			this._bgmCtx.play();
		} else {
			if (this._bgmPath) {
				this.playBGM(this._bgmPath);
			}
		}
	}

	// 停止背景音乐
	public stopBGM() {
		if (this._bgmCtx) {
			this._bgmCtx.stop();
			this._bgmCtx.destroy();
			this._bgmCtx = null;
		}
	}

	// 播放音频
	public playEff(id) {
		var self = this;
		if (self.stopFlags.length || !self.EFF) {
			return;
		}
		var soundPath = RESManager.getVersionUrl("resource/sound/eff/" + id + ".mp3");
		let soundCtx = this.getSoundCtx();
		if (soundCtx) {
			soundCtx.src = soundPath;
			soundCtx.stop();
			soundCtx.play();
		}
	}

	public stopAllSound() {
		this.soundCtxPool.forEach(soundCtx => {
			// 暂停或停止了
			if (!soundCtx.paused) {
				soundCtx.stop();
			}
		});
	}

	// 获取一个音频实例
	private getSoundCtx() {
		let soundCtx = null;
		for (let i = 0; i++; i < this.soundCtxPool.length) {
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
			} else {
				soundCtx = this.soundCtxPool[this._index];
				this._index++;
				if (this._index > this.MaxSoundNum) {
					this._index = 0;
				}
				soundCtx.stop();
			}
		}
		return soundCtx;
	}
}