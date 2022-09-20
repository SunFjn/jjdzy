/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSceneChange extends UIModalPanel {

	public loadbg: fairygui.GLoader;

	public static URL: string = "ui://7gxkx46wklpn2z";

	public static createInstance(): ViewSceneChange {
		return <ViewSceneChange><any>(fairygui.UIPackage.createObject("MainUI", "ViewSceneChange"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		this.isShowOpenAnimation = false;
		this.view = fairygui.UIPackage.createObject("MainUI", "ViewSceneChange").asCom;
		this.contentPane = this.view;
		this.isShowMask = false;
		this.loadbg = <fairygui.GLoader><any>(this.view.getChild("loadbg"));
		ImageLoader.instance.loader(Enum_Path.BACK_URL + "loading.png", this.loadbg);
		this.loadbg.visible = false;
		super.childrenCreated();
	}

	protected onShown() {
		this.loadbg.visible = true;
		this.loadbg.setScale(1, 10);
		egret.Tween.get(this).wait(10).to({ sx: 40, sy: 50 }, 300).to({ sy: 1 }, 200).call(this.doHideAnimation, this);
	}

	private _sx: number = 0;
	public set sx(val) {
		this.loadbg.scaleX = val;
		this._sx = val;
	}
	public get sx() {
		return this._sx;
	}

	private _sy: number = 0;
	public set sy(val) {
		this.loadbg.scaleY = val;
		this._sy = val;
	}
	public get sy() {
		return this._sy;
	}

	protected onHide() {
		GGlobal.layerMgr.close(UIConst.SCENELOADING);
		// egret.Tween.removeTweens(this);
	}
}