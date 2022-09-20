class UIPanelBase extends fairygui.Window implements IUIView {
	public view: fairygui.GComponent;
	public fuiName: string;
	public imgName: string;
	public uiparent: fairygui.GComponent;
	public panelId;
	public isInit: boolean = false;
	public openLv: number = 0;
	protected _args: any;
	public isShowOpenAnimation: boolean = false;//是否显示缩放动画
	public isFullScreen: boolean = true;//drawcost高的全屏界面设置true
	public modalLayer: fairygui.GLoader;
	public isShowMask = true;
	public lastLifeTime = 0;
	/***传入打包的文件名和图片名字 */
	public constructor() {
		super();
	}

	_isLife
	private $pkg: string; $atlas: string; $skin: string;
	protected setSkin(pkg: string, atlas: string, skin: string) {
		const self = this;
		self.$pkg = pkg;
		self.$atlas = atlas;
		self.$skin = skin;
		if (pkg) {
			RES.getResAsync(pkg, self.fuiCompHandle, self);
		}else{
			self.imgCompHandle();
		}
	}

	private fuiCompHandle(data: any = null, key: any = null): void {
		const self = this;
		GGlobal.createPack(self.$pkg);
		if (self.$atlas) {
			RES.getResAsync(self.$atlas, self.imgCompHandle, self);
		} else {
			self.imgCompHandle();
		}
	}

	private imgCompHandle(data: any = null, key: any = null): void {
		this.setExtends();
		this.childrenCreated();
	}

	protected setExtends() { }
	protected initView() { }
	protected childrenCreated(): void {
		const self = this;
		self.view = self.contentPane = fairygui.UIPackage.createObject(self.$pkg, self.$skin).asCom;
		const children = self.view._children;
		for (let i = 0, len = children.length; i < len; i++) {
			var child = children[i];
			self[child._name] = child;
		}
		const ctrls = self.view.controllers;
		for (let i = 0, len = ctrls.length; i < len; i++) {
			var ctrl = ctrls[i];
			self[ctrl.name] = ctrl;
		}
		this.setPivot(0.5, 0.5);
		if (this.isShowMask) {
			this.modalLayer = new fairygui.GLoader();
			this.modalLayer.fill = fairygui.LoaderFillType.ScaleFree;
			this.modalLayer.url = "ui://jvxpx9emf3sq3dd";
		}
		this.isInit = true;
		this.initView();
		this.show();
	}

	/**显示时播放动画效果*/
	protected doShowAnimation(): void {
		if (this.isInit) {
			this.resetPosition();
		}
		super.doShowAnimation();
		// if (!this.isShowOpenAnimation) {
		// 	super.doShowAnimation();
		// 	return;
		// }

		// this.scaleX = 0;
		// this.scaleY = 0;
		// egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn).call(super.doShowAnimation, this);
	}

	protected doHideAnimation(): void {
		this.scaleX = 1;
		this.scaleY = 1;
		// if (!this.isShowOpenAnimation) {
		super.hideImmediately();
		// 	return;
		// }
		// egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.sineIn).call(super.hideImmediately, this);
	}

	protected defaultHide() {
		GGlobal.layerMgr.close(this.panelId);
		this.lastLifeTime = egret.getTimer();
	}

	protected onShown(): void {

	}

	protected onHide(): void {

	}

	public show(): void {
		let s = this;
		s._isLife = true
		super.show();
		if (s.modalLayer && this.parent) {
			s.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			s.parent.addChildAt(s.modalLayer, s.parent.getChildIndex(s));
		}
		s.resetPosition();
		s.lastLifeTime = egret.getTimer();
		fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, s.resetPosition, s);
	}
	public hide(): void {
		super.hide();
		let s = this;
		if (s.modalLayer) {
			s.modalLayer.removeFromParent();
		}
		fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, s.resetPosition, s);
		s._isLife = false
	}


	public onOpen(arg) {
		let s = this;
		s._args = arg;
		if (s.isInit) {
			s.show();
		}
		if (this.isFullScreen) GGlobal.setUnitLayerVis(false);
	}

	public onClose() {
		let s = this;
		if (s.modalLayer) {
			s.modalLayer.removeFromParent();
		}
		if (s.isFullScreen) GGlobal.setUnitLayerVis(true);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
		if (this.modalLayer) this.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
	}

	public clearTextureAndUIPackage() {
		let s = this;
		if (s.$pkg) {
			let pkg = GGlobal.packDic[s.$pkg];
			if (pkg) {
				delete GGlobal.packDic[s.$pkg];
			}
			fairygui.UIPackage.removePackage(s.$pkg);
			s.$pkg = null;
		}
		if (s.$atlas) {
			RESManager.destoryRes(s.$atlas);
			s.$atlas = null;
		}
		s.isInit = false;
	}

	public dispose() {
		this.isInit = false;
		if (!this.displayObject) {
			console.log("界面移除多次" + this.panelId);
		} else {
			super.dispose();
		}
		if (this.modalLayer) {
			this.modalLayer.removeFromParent();
		}
	}
}