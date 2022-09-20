class ViewCrossKingReward extends UIModalPanel {

	public c1:fairygui.Controller;
	public tab0:TabButton;
	public tab1:TabButton;
	public tab2:TabButton;
	public viewReward:ChildCrossKingReward;
	public viewPoint:ChildCrossKingPoint;

	public static URL:string = "ui://yqpfulefj9wf5";

	public static createInstance():ViewCrossKingReward {
		return <ViewCrossKingReward><any>(fairygui.UIPackage.createObject("Arena","ViewCrossKingReward"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingReward").asCom;
		this.contentPane = this.view;

		this.c1 = this.view.getController("c1");
		this.tab0 = <TabButton><any>(this.view.getChild("tab0"));
		this.tab1 = <TabButton><any>(this.view.getChild("tab1"));
		this.tab2 = <TabButton><any>(this.view.getChild("tab2"));
		this.viewReward = <ChildCrossKingReward><any>(this.view.getChild("viewReward"));
		this.viewPoint = <ChildCrossKingPoint><any>(this.view.getChild("viewPoint"));
		super.childrenCreated();
	}
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >>1, (fairygui.GRoot.inst.height - this.height) >>1);
	}

	protected onShown(): void {
		this.addListen();
		this.selectPage();
		GGlobal.modelCrossKing.CG_OPEN_REWARDS();
	}

	protected onHide(): void {
		this.removeListen();
		this.viewReward.closeHD();
		this.viewPoint.closeHD();
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_POINT_REWARD, this.update, this)
	}

	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_POINT_REWARD, this.update, this)
		GGlobal.layerMgr.close(UIConst.CROSS_KING_REWARD);
	}

	private selectPage():void{
		if(this.c1.selectedIndex == 0){
			this.viewReward.update(0);
			(this.frame as fairygui.GLabel).text = this.tab0.text;
		}else if(this.c1.selectedIndex == 1){
			this.viewReward.update(1);
			(this.frame as fairygui.GLabel).text = this.tab1.text;
		}else if(this.c1.selectedIndex == 2){
			this.viewPoint.update();
			(this.frame as fairygui.GLabel).text = this.tab2.text;
		}
		this.tab2.checkNotice = Model_CrossKing.checkReward();
	}

	private update(): void {
		if(this.c1.selectedIndex == 2){
			this.selectPage();
		}
	}
}