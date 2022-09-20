class View_NewWuJiang extends UIModalPanel {

	public nameLb: fairygui.GLabel;
	public txtInfo: fairygui.GRichTextField;
	public btnHand: Button0;
	public wjBg: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emx9ki3ba";

	private awatar: UIRole = null;

	public static createInstance(): View_NewWuJiang {
		return <View_NewWuJiang><any>(fairygui.UIPackage.createObject("common", "View_NewWuJiang"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated() {
		const self = this;
		self.view = fairygui.UIPackage.createObject("common", "View_NewWuJiang").asCom;
		self.contentPane = self.view;
		self.nameLb = <fairygui.GLabel><any>(self.view.getChild("nameLb"));
		self.txtInfo = <fairygui.GRichTextField><any>(self.view.getChild("txtInfo"));
		self.btnHand = <Button0><any>(self.view.getChild("btnHand"));
		self.wjBg = <fairygui.GLoader><any>(self.view.getChild("wjBg"));

		self.btnHand.addClickListener(self.closeEventHandler, self);
		super.childrenCreated();
	}
	
	public onOpen(arg) {
		super.onOpen(arg)
		const self = this;
		var vo: any = arg;
		IconUtil.setImg(self.wjBg, Enum_Path.BACK_URL + "wjGet.png");
		self.nameLb.text = vo.name;

		if (!this.awatar) {
			this.awatar = UIRole.create();
			this.awatar.setPos(this.wjBg.x, this.wjBg.y);
			this.awatar.setScaleXY(1.5, 1.5);
		}
		this.awatar.uiparent = this.displayListContainer;
		let skillArr = ConfigHelp.SplitStr(vo.skills)
		let skillId = Number(skillArr[0][0]);
		this.awatar.playSkillID(skillId);
		this.awatar.setBody(vo.type);
		this.awatar.setWeapon(vo.type);
		this.awatar.onAdd();
	}
	protected onHide() {
		GGlobal.layerMgr.close(UIConst.WU_JIANG_GETTIPS);
		IconUtil.setImg(this.wjBg, null);
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		egret.callLater(Model_WuJiang.showNewItem, null);
	}
}