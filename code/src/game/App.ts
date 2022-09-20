class App {
	public constructor() {
	}

	public static stageWidth = 0;
	public static stageHeight = 0;

	public static isWeb: boolean = true;//是否web
	public static loginArg;

	public static stage: egret.Stage;
	public static mainSprite: fairygui.GComponent;

	public static isLife = true;
	public static HEART_STATE = "HEART_STATE";
	public static init() {
		egret.lifecycle.addLifecycleListener(this.onLifeCycle);
		egret.lifecycle.onPause = this.onPause;
		egret.lifecycle.onResume = this.onResume;
	}

	private static onLifeCycle(context) {
	}
	private static onPause() {
		App.isLife = false;
		App.userSystemTicker();
		SoundManager.getInstance().addStopFlag("onpause");
		App.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
	}

	private static touchHD() {
		if (!App.isLife) {
			App.isLife = true;
			App.userSystemTicker();
			SoundManager.getInstance().removeStopFlag("onpause");
		}
		App.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
	}

	private static onResume() {
		console.log("onresume");
		App.isLife = true;
		App.userSystemTicker();
		SoundManager.getInstance().removeStopFlag("onpause");
		App.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
	}

	private static _flag = 0;
	private static userSystemTicker() {
		if (!GGlobal.sdk) {
			if (App.isLife) {
				window.clearInterval(this._flag);
			} else {
				this._flag = window.setInterval(this.newUpdate, 1000 / 60);
			}
		}
	}

	private static newUpdate() {
		if (GGlobal && GGlobal.main) {
			GGlobal.main.frameLogic()
		}
	}

}