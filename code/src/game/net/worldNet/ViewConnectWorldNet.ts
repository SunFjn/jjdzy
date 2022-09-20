/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewConnectWorldNet extends UIModalPanel {

	public tip: fairygui.GRichTextField;

	public static URL: string = "ui://7gxkx46wrjjf2y";

	public static createInstance(): ViewConnectWorldNet {
		return <ViewConnectWorldNet><any>(fairygui.UIPackage.createObject("MainUI", "ViewConnectWorldNet"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		var s = this;
		s.view = fairygui.UIPackage.createObject("MainUI", "ViewConnectWorldNet").asCom;
		s.contentPane = s.view;
		s.isShowMask = s.isShowOpenAnimation = false;
		s.tip = <fairygui.GRichTextField><any>(s.view.getChild("tip"));
		super.childrenCreated();
	}


	protected index: number;
	protected timeRun(): void {
		var s = this;
		if (s.index > 3) s.index = 0;
		var str = "";
		for (var i = 0; i < s.index; i++) {
			str += "。";
		}
		str = "正在链接中央服" + str;
		s.tip.text = str;
		s.index += 1;
		var now = egret.getTimer();
		if (now - s.oldTime >= 30000) {//30秒没连上
			Timer.instance.remove(this.timeRun, this);
			GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
			WorldSocketMgr.instance.close(true);
		}
	}

	protected oldTime: number = 0;
	protected onShown(): void {
		var s = this;
		if (s.oldTime <= 0) {
			s.oldTime = egret.getTimer();
			s.index = 0;
			Timer.instance.listen(s.timeRun, s, 200);
		}
	}

	protected onHide(): void {
		this.oldTime = 0;
		Timer.instance.remove(this.timeRun, this);
		GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
	}

}