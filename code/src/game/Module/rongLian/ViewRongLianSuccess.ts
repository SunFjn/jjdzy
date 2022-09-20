class ViewRongLianSuccess extends UIModalPanel {

	public shape: fairygui.GGraph;
	public imgBack: fairygui.GImage;
	public lbTitle: fairygui.GTextField;
	public lb1: fairygui.GTextField;
	public lb2: fairygui.GTextField;
	public btnSure: fairygui.GButton;
	public lb3: fairygui.GTextField;
	public lb4: fairygui.GTextField;
	public lb5: fairygui.GTextField;
	public lbTip: fairygui.GTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("rongLian", "ViewRongLianSuccess").asCom;
		this.contentPane = this.view;

		this.imgBack = <fairygui.GImage><any>(this.view.getChild("imgBack"));
		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.lb1 = <fairygui.GTextField><any>(this.view.getChild("lb1"));
		this.lb2 = <fairygui.GTextField><any>(this.view.getChild("lb2"));
		this.btnSure = <fairygui.GButton><any>(this.view.getChild("btnSure"));
		this.lb3 = <fairygui.GTextField><any>(this.view.getChild("lb3"));
		this.lb4 = <fairygui.GTextField><any>(this.view.getChild("lb4"));
		this.lb5 = <fairygui.GTextField><any>(this.view.getChild("lb5"));
		this.lbTip = <fairygui.GTextField><any>(this.view.getChild("lbTip"));
		super.childrenCreated();
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.btnSure.addClickListener(this.closeEventHandler, this);
		this.update(arg.exp, arg.coin, arg.item, arg.lianhun, arg.dan)
	}

	protected onHide(): void {
		this.btnSure.removeClickListener(this.closeEventHandler, this);
		GGlobal.layerMgr.close(UIConst.RONGLIAN_SUCCESS);
	}

	public update(exp, coin, item, lianhun, dan): void {
		this.lb1.text = "经验" + "[color=#18e748]+" + exp + "[color]";
		this.lb2.text = "铜钱" + "[color=#18e748]+" + coin + "[color]";
		this.lb3.text = "强化石" + "[color=#18e748]+" + item + "[color]";
		this.lb4.text = "炼魂石" + "[color=#18e748]+" + lianhun + "[color]";
		this.lb5.text = "星宿培养丹" + "[color=#18e748]+" + dan + "[color]";
		this.lbTip.visible = Model_RongLian.FULL_EXP
	}
}