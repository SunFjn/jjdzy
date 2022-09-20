class UIModalPanel extends fairygui.GComponent implements IUIView {
	public view: fairygui.GComponent;
	public fuiName: string;
	public imgName: string;
	public uiparent: fairygui.GComponent;
	public panelId;
	public isInit: boolean = false;
	public openLv: number = 0;
	protected _args: any;
	public modalLayer: fairygui.GLoader;
	public isShowMask: boolean = true;
	/**这个值要恒为 false，不然不会执行 onShown,详细内容查看doShowAnimation方法 */
	public isShowOpenAnimation: boolean = false;//是否显示缩放动画
	public isClosePanel: boolean = true;
	public lastLifeTime = 0;
	/***传入打包的文件名和图片名字 */
	public constructor() {
		super();
	}

	public loadRes(fuiName: string = null, imgName: string = null): void {
		if (!fuiName && !imgName) {
			this.childrenCreated();
		} else {
			this.fuiName = fuiName;
			this.imgName = imgName;
			if (this.fuiName) {
				RES.getResAsync(fuiName, this.fuiCompHandle, this);
			} else {
				this.fuiCompHandle();
			}
		}
	}

	private fuiCompHandle(data: any = null, key: any = null): void {
		if (this.imgName) {
			RES.getResAsync(this.imgName, this.imgCompHandle, this);
		} else {
			this.imgCompHandle();
		}
	}

	private imgCompHandle(data: any = null, key: any = null): void {
		this.childrenCreated();
	}

	private _contentPane: fairygui.GComponent;
	public set contentPane(val: fairygui.GComponent) {
		if (this._contentPane != val) {
			if (this._contentPane != null)
				this.removeChild(this._contentPane);
			this._contentPane = val;
			if (this._contentPane != null) {
				this.addChild(this._contentPane);
				this.setSize(this._contentPane.width, this._contentPane.height);
				this._contentPane.addRelation(this, fairygui.RelationType.Size);
				this._frame = <fairygui.GComponent><any>(this._contentPane.getChild("frame"));
				if (this._frame != null) {
					this.closeButton = this._frame.getChild("closeButton");
				}
			}
		}
	}

	public get contentPane(): fairygui.GComponent {
		return this._contentPane;
	}

	private _frame: fairygui.GComponent;
	public get frame(): fairygui.GComponent {
		return this._frame;
	}

	private _closeButton: fairygui.GObject;
	public get closeButton(): fairygui.GObject {
		return this._closeButton;
	}

	public set closeButton(value: fairygui.GObject) {
		if (this._closeButton != null)
			this._closeButton.removeClickListener(this.closeEventHandler, this);
		this._closeButton = value;
		if (this._closeButton != null)
			this._closeButton.addClickListener(this.closeEventHandler, this);
	}

	protected closeEventHandler(evt: egret.Event): void {
		this.doHideAnimation();
	}

	protected childrenCreated(): void {
		this.setPivot(0.5, 0.5);
		this.isInit = true;
		if (this.isShowMask) {
			this.modalLayer = new fairygui.GLoader();
			this.modalLayer.fill = fairygui.LoaderFillType.ScaleFree;
			this.modalLayer.url = "ui://jvxpx9em61zd77";
			if (this.parent) {
				this.setModalMask();
				if (this.isClosePanel)
					this.modalLayer.addClickListener(this.closePanelByModal, this);
			}
		}
		this.doShowAnimation();
	}

	public closePanelByModal() {
		if (!this.isInit) {//防止某些界面  未初始化完成关闭引发的一些报错
			return;
		}
		if (this.isClosePanel) {
			this.closeEventHandler(null);
		}
	}
	_isLife
	public isOpenState = false;
	/**显示时播放动画效果*/
	protected doShowAnimation(): void {
		let self = this;
		if (self.isInit) {
			self.resetPosition();
		}
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self)
		if (!this.isShowOpenAnimation) {
			if (this.isOpenState) {
				this.isOpen = true;
				this.showview();
			}
			return;
		}
		// this.scaleX = 0;
		// this.scaleY = 0;
		// egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn).call(this.onShown, this);
	}

	public doHideAnimation(): void {
		let self = this;
		self.scaleX = 1;
		self.scaleY = 1;
		self.isOpen = false;
		GGlobal.control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self)
		if (!self.isShowOpenAnimation) {
			self.hide();
			return;
		}
		// egret.Tween.get(self).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.sineIn).call(self.hide, self);
	}

	private showview() {
		this.eventFunction(1);
		this.onShown();
	}

	private hide() {
		if (this.modalLayer) {
			this.modalLayer.removeFromParent();
		}
		this.isOpenState = false;
		if (this.isInit) {
			this.eventFunction(0);
			this.onHide();
		}
		this.lastLifeTime = egret.getTimer();
		GGlobal.layerMgr.close(this.panelId);
	}

	protected defaultHide() {

	}

	protected onShown(): void {

	}

	protected onHide(): void {
	}

	private isOpen: boolean = false;
	public onOpen(arg) {
		this.isOpenState = true;
		this.lastLifeTime = egret.getTimer();
		this._args = arg;
		if (this.isInit) {
			if (!this.isOpen || arg) {
				this.doShowAnimation();
			}
		}
		if (this.isOpen) {
			if (this.modalLayer && this.parent) {
				this.setModalMask();
				if (this.isClosePanel) this.modalLayer.addClickListener(this.closePanelByModal, this);
			}
		}
	}

	public setModalMask() {
		if (this.modalLayer && this.parent) {
			this.modalLayer.setSize(App.stage.stageWidth, App.stage.stageHeight);
			this.modalLayer.setXY(-GGlobal.layerMgr.offx, 0);
			let sc = 1 / LayerManager.getFullScreenSc();
			this.modalLayer.setScale(sc, sc);
			let idx = this.parent.getChildIndex(this) - 1;
			idx = idx < 0 ? 0 : idx;
			this.parent.addChildAt(this.modalLayer, idx);
		}
	}

	public onClose() {
		if (this.modalLayer) {
			this.modalLayer.removeFromParent();
		}
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
		this.setModalMask();
	}

	public dispose() {
		this.isInit = false;
		super.dispose();
	}

	/** 关闭界面，界面自己调用，封装了GGlobal.layerMgr.close()接口 */
	public closeView() {
		GGlobal.layerMgr.close2(this.panelId);
	}

	/**
     * 传入1是注册事件 0为移除
     */
	public eventFunction(type) {

	}
}