class ViewAlert extends UIModalPanel {

	public frame: fairygui.GComponent;
	public back: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public btnCancel: Button0;
	public btnOk: Button1;
	public btnGroup: fairygui.GGroup;

	public static URL: string = "ui://jvxpx9emrt7o4l";

	public static createInstance(): ViewAlert {
		return <ViewAlert><any>(fairygui.UIPackage.createObject("common", "ViewAlert"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = GGlobal.commonpkg.createObject("ViewAlert").asCom;
		this.contentPane = this.view;
		this.back = <fairygui.GImage><any>(this.view.getChild("back"));
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.lb.leading = 10;
		this.btnCancel = <Button0><any>(this.view.getChild("btnCancel"));
		this.btnOk = <Button1><any>(this.view.getChild("btnOk"));
		this.btnGroup = <fairygui.GGroup><any>(this.view.getChild("btnGroup"));
		super.childrenCreated();
		this.btnOk.addClickListener(this.onOKT, this);
		this.btnCancel.addClickListener(this.onCancelT, this);
	}

	public static OK = 1;
	public static CANCEL = 2;
	public static OKANDCANCEL = 3;

	public onOK: Handler;
	public onCancel: Handler;
	public onCloseFun: Handler;
	public arg: any;

	public onShown() {
		var arg = this._args;
		if (!arg) return;
		this._isClose = true;
		this.isClosePanel = true;
		this.onOK = arg.onOK;
		this.onCancel = arg.onCancel;
		this.onCloseFun = arg.onClose;
		this.back.text = arg.title;
		this.btnOk.text = arg.oktext;
		this.btnCancel.text = arg.canceltext;
		if (arg.text) this.lb.text = arg.text;

		if (arg.option & 1) {
			// this.btnOk.setXY(199, 278);
			this.btnOk.x = this.width - this.btnOk.width >> 1;
			this.btnOk.visible = true;
		} else if (this.btnOk.parent) {
			this.btnOk.visible = false;
		}
		if (arg.option & 2) {
			// this.btnCancel.setXY(199, 278);
			this.btnCancel.x = this.width - this.btnCancel.width >> 1;
			this.btnCancel.visible = true;
		} else if (this.btnCancel.parent) {
			this.btnCancel.visible = false;
		}

		if (arg.option == 3) {
			// this.btnCancel.setXY(117, 278);
			// this.btnOk.setXY(283, 278);
			this.btnCancel.x = 117;
			this.btnOk.x = 283;
		}
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.ALERT);
	}

	protected closeHandler() {
		this.doHideAnimation();
		this.onOK = null;
		this.onCancel = null;
	}
	private _isClose = true;//true 未点确定取消进入关闭
	public onClose() {
		if (this._isClose && this.onCloseFun) this.onCloseFun.run();
		this.closeHandler();
	}

	public onOKT() {
		this._isClose = false;
		if (this.onOK) this.onOK.run();
		this.closeHandler();
	}

	public onCancelT() {
		this._isClose = false;
		if (this.onCancel) this.onCancel.run();
		this.closeHandler();
	}

	protected closeEventHandler(evt: egret.Event): void {
		this.closeHandler();
	}

	public static show(text: string, onOK: Handler = null, option = 1 | 2, oktext = "确定", canceltext = "取消", cancel: Handler = null, bgEnabled: boolean = true, onClose: Handler = null) {
		var arg = { text: text, onOK: onOK, option: option, onCancel: cancel, oktext: oktext, canceltext: canceltext, bgEnabled: bgEnabled, onClose: onClose };
		if (!GGlobal.layerMgr.isOpenView(UIConst.ALERT)) {
			GGlobal.layerMgr.open(UIConst.ALERT, arg);
		}
	}

}