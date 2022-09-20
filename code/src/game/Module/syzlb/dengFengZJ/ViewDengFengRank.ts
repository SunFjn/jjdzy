class ViewDengFengRank extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbRank: fairygui.GRichTextField;
	public lbPoint: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uua0u32a";

	public static createInstance(): ViewDengFengRank {
		return <ViewDengFengRank><any>(fairygui.UIPackage.createObject("syzlb", "ViewDengFengRank"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengRank").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderRew
		s.list.setVirtual();
		super.childrenCreated();
	}
	private _lstArr: any[];
	private _type

	protected onShown(): void {
		let s = this;
		s.registerEvent(true);
		s._type = s._args
		let m = GGlobal.modelDengFengZJ
		m.CG_RANK_REWARD(s._type)
	}

	protected onHide(): void {
		let s = this;
		s.list.numItems = 0;
		s.registerEvent(false);
		s.lbRank.text = ""
		s.lbPoint.text = ""
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		let m = GGlobal.modelDengFengZJ
		m.register(pFlag, Model_DengFengZJ.RANK_DAT, self.update, self);
	}

	private update() {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		if (s._type == 0) {
			s.lbRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR))
			s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR);
			s._lstArr = m.getCfgRankSea()
		} else {
			s.lbRank.text = "我的排名：" + (m.finalRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.finalRank + "", Color.GREENSTR))
			s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.finalPoint + "", Color.GREENSTR);
			s._lstArr = m.getCfgRankFinal()
		}

		s.list.numItems = s._lstArr.length;
	}

	private renderRew(index, obj: VDengFengRank) {
		obj.setVo(this._lstArr[index], this._type, index + 1);
	}
}