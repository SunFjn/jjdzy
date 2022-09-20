class ViewActHolyBReward extends UIModalPanel {

	public list: fairygui.GList;
	public lb: fairygui.GRichTextField;

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("shouhunJX");
		this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBReward").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private _listData: Array<any>
	private _cfg: Issshxbrank_268

	protected onShown(): void {
		this._cfg = this._args;
		this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._cfg.reward1))
		this.lb.text = "达到" + ConfigHelp.getSystemNum(5606) + "圈后可领取，周一0点结算邮件发送奖励";
		this.update();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBREWARD);
		this.list.numItems = 0;
	}

	private update() {
		this.list.numItems = this._listData.length
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true
		v.isShowEff = true
		v.vo = this._listData[index];
	}
}