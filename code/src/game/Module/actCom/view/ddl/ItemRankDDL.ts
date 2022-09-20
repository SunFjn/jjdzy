class ItemRankDDL extends fairygui.GComponent{
	public list: fairygui.GList;
	public lbRank: fairygui.GRichTextField;
	public c1: fairygui.Controller;
	public lbName: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public rankImg: fairygui.GLoader;
	private _listData: Array<any>;

	public static URL:string = "ui://ke8qv0ckxn888";

	public static createInstance():ItemRankDDL {
		return <ItemRankDDL><any>(fairygui.UIPackage.createObject("ActCom_DDL","ItemRankDDL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	public setVo(vo: DDLVO, index, qs:number) {
		let self = this;
		if (index < 3) {
			self.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
			self.rankImg.visible = true;
			self.lbRank.text = "";
		}else{
			self.lbRank.text = "第" + (index + 1) + "名";
			self.rankImg.visible = false;
		}

		if(vo)
		{
			self.c1.selectedIndex = 1;
			self.lbName.text = vo.name;
			self.lbCount.text = "对出" + vo.count + "联";
		}else{
			self.c1.selectedIndex = 0;
		}

		let cfg = Model_ActComDDL.getddlpmCfg(qs, index + 1);
		if (cfg) {
			let award = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
			self._listData = award;
		}
		self.list.numItems = self._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData[index];
	}
}