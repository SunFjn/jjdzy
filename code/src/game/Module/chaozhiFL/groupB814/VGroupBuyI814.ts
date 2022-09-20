class VGroupBuyI814 extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgGet: fairygui.GImage;
	public btnRec: fairygui.GButton;

	public static URL: string = "ui://qzsojhcrr2r0i";

	public static createInstance(): VGroupBuyI814 {
		return <VGroupBuyI814><any>(fairygui.UIPackage.createObject("chaozhifanli", "VGroupBuyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lab = <fairygui.GRichTextField><any>(this.getChild("lab"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));
		this.btnRec = <fairygui.GButton><any>(this.getChild("btnRec"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	public setVo(v: Vo_HuoDong) {
		this._vo = v;
		let cfg = Config.sctg3_730[v.id]
		let colorStr;
		let m = GGlobal.modelGroupB814;
		if (v.status == 0) {
			colorStr = Color.REDSTR
		} else {
			colorStr = Color.GREENSTR
		}
		if (cfg.jine == 0) {
			this.lab.text = "今日首充达到" + cfg.renshu + "人<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>"
		} else if (cfg.jine == 1) {
			this.lab.text = "今日首充达到" + cfg.renshu + "人且个人充值任意金额<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>"
		} else {
			this.lab.text = "今日首充达到" + cfg.renshu + "人且个人充值金额满" + cfg.jine + "元<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>"
		}
		if (v.status == 0) {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = true;
			this.imgGet.visible = false
		} else if (v.status == 1) {
			this.btnGet.touchable = this.btnGet.visible = true;
			this.btnGet.checkNotice = true;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		} else if (v.status == 2) {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = true
		} else {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		}
		//奖励显示

		this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jiangli))
		this.list.numItems = this._listData.length
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		if (this._vo.status == 0) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		GGlobal.modelGroupB814.CG_GET_REWARD(this._vo.id);
	}

	private onClickRec(): void {
		// GGlobal.layerMgr.open(UIConst.CHONGZHI);
		ViewChongZhi.tryToOpenCZ();
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}