class ViewTigerPassSignUp extends UIModalPanel {

	public frame: fairygui.GLabel;
	public btnJoin: Button2;
	public n12: fairygui.GImage;
	public lb: fairygui.GRichTextField;
	public lbTip: fairygui.GRichTextField;
	public list: fairygui.GList;
	public imgHas: fairygui.GImage;
	public n14: fairygui.GImage;

	public static URL: string = "ui://7a366usay5hd2e";

	public static createInstance(): ViewTigerPassSignUp {
		return <ViewTigerPassSignUp><any>(fairygui.UIPackage.createObject("zjyw", "ViewTigerPassSignUp"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("zjyw", "ViewTigerPassSignUp").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.itemRenderer = s.rendHandler;
		s.list.callbackThisObj = s;
		super.childrenCreated();
	}
	private _rewArr: IGridImpl[];
	protected onShown(): void {
		let s = this;
		s.btnJoin.addClickListener(s.onJoin, s);
		GGlobal.modelTigerPass.listen(Model_TigerPass.msg_join_employ, s.update, s)
		s.update();
	}

	protected onHide(): void {
		let s = this;
		s.btnJoin.removeClickListener(s.onJoin, s);
		GGlobal.modelTigerPass.remove(Model_TigerPass.msg_join_employ, s.update, s)
		s.list.numItems = 0;
	}

	private update(): void {
		let s = this;
		if (!s._rewArr) {
			let rew = ConfigHelp.getSystemDesc(7105)
			s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(rew))
		}
		s.list.numItems = s._rewArr.length
		let m = GGlobal.modelTigerPass
		if (m.isEmploy) {
			s.imgHas.visible = true;
			s.btnJoin.visible = false;
		} else {
			s.imgHas.visible = false;
			s.btnJoin.visible = true;
			s.btnJoin.checkNotice = true;
		}
		s.lbTip.text = "每天最多被雇佣" + ConfigHelp.getSystemNum(7100) + "次\n奖励通过邮件发送";
	}

	private rendHandler(index, grid: ViewGrid) {
		grid.tipEnabled = true;
		grid.isShowEff = true;
		grid.vo = this._rewArr[index]
	}

	private onJoin() {
		GGlobal.modelTigerPass.CGJoinEmploy8913();
		// this.closeEventHandler(null);
	}
}