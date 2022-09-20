/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLBDialog extends UIPanelBase {

	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6ebx2z2e";

	public static createInstance(): ViewLBDialog {
		return <ViewLBDialog><any>(fairygui.UIPackage.createObject("Boss", "ViewLBDialog"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.isShowMask = false;
		this.isFullScreen = false;
		this.setSkin("Boss", "", "ViewLBDialog");
	}

	protected initView(): void {
		super.initView();
	}

	private close(){
		GGlobal.layerMgr.close2(UIConst.LVBUDAILOG);
	}

	protected onShown() {
		this.setXY(-500,380);
		let str = Config.lvbuboss_224[GGlobal.modelBoss.curEnterId].taici;
		this.lb.text = str;
		egret.Tween.get(this).to({x:41},500).wait(2000).to({x:700},500).call(this.close, this);
	}

	protected onHide() {
	}
}