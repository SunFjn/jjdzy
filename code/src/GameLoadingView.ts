class GameLoadingView {
	private static _inst: GameLoadingView;
	public static getInst(): GameLoadingView {
		return this._inst || (this._inst = new GameLoadingView());
	}
	public constructor() {
		this.initView();
	}
	private readonly imgName = "Login";
	private readonly fuiName = "Login_atlas0";
	private readonly WIDTH = 591;
	// private _bg: egret.Bitmap;
	private _proBg: fairygui.GImage;
	private _proBar: fairygui.GImage;
	private _proBg1: fairygui.GImage;
	private _proBar1: fairygui.GImage;
	private _tips: fairygui.GTextField;
	private txtInfo: fairygui.GTextField;
	private bgSrc: string;
	private panel: fairygui.GComponent;
	private bg: egret.Bitmap;
	private async initView() {
		await RES.getResAsync(this.imgName);
		await RES.getResAsync(this.fuiName);
		GGlobal.createPack("Login");
		var self = this;
		self.panel = fairygui.UIPackage.createObject("Login", "viewLoading").asCom;
		self.bg = new egret.Bitmap();
		var imageLoader: egret.ImageLoader = new egret.ImageLoader();
		imageLoader.addEventListener(egret.Event.COMPLETE, self.loadCompleteHandler1, self);
		self.bgSrc = RESManager.getVersionUrl("loginres/Bm_Back12.jpg");
		imageLoader.load(self.bgSrc);
		GGlobal.main.addChildAt(self.bg, 0);
		self._proBg = <fairygui.GImage><any>self.panel.getChild("progressBg");
		self._proBar = <fairygui.GImage><any>self.panel.getChild("progressBar");
		self._proBg1 = <fairygui.GImage><any>self.panel.getChild("progressBg1");
		self._proBar1 = <fairygui.GImage><any>self.panel.getChild("progressBar1");
		self._tips = <fairygui.GTextField><any>self.panel.getChild("txtProp");
		self.txtInfo = <fairygui.GTextField><any>self.panel.getChild("txtInfo");
		if (self.isShow) {
			GGlobal.main.addChild(self.panel.displayObject);
		}
		if (GGlobal.layerMgr.UI_OFFLINE) {
			GGlobal.main.setChildIndex(GGlobal.layerMgr.UI_OFFLINE.displayObject, GGlobal.main.numChildren - 1);
		}
		self.resize();
		self.isInit = true;
		self._proBar.width = 1;
		self.showPro(self.per, self.tips);
		self._proBar1.width = 0;
		egret.Tween.get(self._proBar1, { loop: true }).to({ width: self.WIDTH }, 600).wait(100).call(this.resetWidth, this);
	}

	private resetWidth() {
		this._proBar1.width = 0;
	}

	private loadCompleteHandler1(event): void {
		var imageLoader = <egret.ImageLoader>event.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this.bg.texture = texture;
		this.resize();
	}

	public hideBg(v){
		this.bg.visible = v;
	}

	private isShow: boolean = false;
	private isInit: boolean = false;
	public show() {
		var self = this;
		self.isShow = true;
		if (self.panel && !self.panel.displayObject.stage) {
			GGlobal.main.addChild(self.panel.displayObject);
			if (GGlobal.layerMgr.UI_OFFLINE) {
				GGlobal.main.setChildIndex(GGlobal.layerMgr.UI_OFFLINE.displayObject, GGlobal.main.numChildren - 1);
			}
		}
	}
	public hide() {
		var self = this;
		self.isShow = false;
		if (self.panel && self.panel.displayObject.stage) {
			GGlobal.main.removeChild(self.panel.displayObject);
		}
		egret.Tween.removeTweens(self._proBar);
		self._proBar.width = 0;
	}
	public clearMemTaken() {
		var self = this;
		self.bg.texture = null;
		egret.Tween.removeTweens(self._proBar);
		egret.Tween.removeTweens(this._proBar1);
		if (self.bg) {
			self.bg.texture = null;
		}
		if (self.panel && self.panel.displayObject.stage) {
			GGlobal.main.removeChild(self.panel.displayObject);
		}
		if (self.bg && self.bg.stage) {
			GGlobal.main.removeChild(self.bg);
		}
	}
	private per = 0; tips = "";
	public showPro(per: number, tips: string) {
		var self = this;
		self.per = per;
		self.tips = tips;
		if (!self.isShow) {
			self.show();
		}
		if (self.isInit) {
			egret.Tween.removeTweens(self._proBar);
			egret.Tween.get(self._proBar).to({ width: per * self.WIDTH }, 200);
			self.txtInfo.text = tips;
			self._tips.text = "加载中,请稍后";
		}
		if(per == 1 && GGlobal.main.isNewRole){
			self.bg.visible = false;
			GGlobal.layerMgr.open(UIConst.STORE_ANI);
		}
	}
	private resize() {
		this.panel.scaleX = this.panel.scaleY = LayerManager.getFullScreenSc();
		let xx = (App.stage.stageWidth - this.panel.width * this.panel.scaleX) >> 1;
		let yy = (App.stage.stageHeight - this.panel.height * this.panel.scaleY) >> 1;
		this.panel.setXY(xx, yy);

		let sw = App.stage.stageWidth;
		let sh = App.stage.stageHeight;
		let rate = sh / sw;
		let mx = sw / 640;
		let my = sh / 1136;
		let sc = Math.max(mx, my);
		this.bg.scaleX = sc;
		this.bg.scaleY = sc;
		this.bg.x = (sw - this.bg.width * sc) >> 1;//不考虑横屏
	}
}