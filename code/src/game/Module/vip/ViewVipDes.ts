/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewVipDes extends UIModalPanel {

	public frame: WindowFrame1;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://w4xdcvn7nvyw1";

	public static createInstance(): ViewVipDes {
		return <ViewVipDes><any>(fairygui.UIPackage.createObject("vip", "ViewVipDes"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("vip");
		this.view = fairygui.UIPackage.createObject("vip", "ViewVipDes").asCom;
		this.contentPane = this.view;

		this.frame = <WindowFrame1><any>(this.view.getChild("frame"));
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		super.resetPosition();
		super.childrenCreated();
	}
	i;
	public onShown() {
		let s = this;
		let vip = this._args;
		let lib = Config.VIP_710[vip];
		if(vip>1)
			var  lastLib = Config.VIP_710[vip-1];
		this.frame.text = "VIP"+(vip-1)+"特权";
		s.i = 0;
		let str = lib.shuoming;
		this.lb.text = str;
	}
	private addTxt(str, num, isb) {
		if (num == 0) return "";
		let s = this;
		s.i++;
		if (!isb)
			return s.i + ConfigHelp.reTxt(str, num)+"\n";
		return s.i + str+"\n";
	}

	protected onHide() {
		GGlobal.layerMgr.close(UIConst.VIPDESC);
	}
}