class ViewCrossKingProSuc extends UIModalPanel {

	public lbTitle: fairygui.GTextField;
	public lbGrade: fairygui.GTextField;
	public img: fairygui.GImage;
	public imgGrade: fairygui.GLoader;

	public static URL: string = "ui://yqpfulefj9wf4";

	public static createInstance(): ViewCrossKingProSuc {
		return <ViewCrossKingProSuc><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossKingProSuc"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingProSuc").asCom;
		this.contentPane = this.view;

		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.lbGrade = <fairygui.GTextField><any>(this.view.getChild("lbGrade"));
		this.img = <fairygui.GImage><any>(this.view.getChild("img"));
		this.imgGrade = <fairygui.GLoader><any>(this.view.getChild("imgGrade"));

		
		super.childrenCreated();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

	protected onShown(): void {
		// this.addListen();
		this.update();
		Timer.instance.callLater(this.addListen, 500, this);
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeEventHandler, this);
	}

	private removeListen(): void {
		Timer.instance.remove(this.addListen, this);
		GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeEventHandler, this);
		GGlobal.layerMgr.close(UIConst.CROSS_KING_ProSuc);
	}

	private update(): void {
		var gradeCfg = Config.lsxx_232[Model_CrossKing.battleGrade + 1]
		if(gradeCfg.dan == 13){
			this.img.visible = true;
			this.lbGrade.text = ""
		}else{
			this.img.visible = false;
			this.lbGrade.text = gradeCfg.name
			this.lbGrade.color = Color.getColorInt(gradeCfg.color)
		}

		this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(gradeCfg.dan / 3));
	}
}