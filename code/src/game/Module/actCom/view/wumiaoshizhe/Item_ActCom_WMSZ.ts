class Item_ActCom_WMSZ extends fairygui.GComponent{
	public list: fairygui.GList;
	public rankImg: fairygui.GLoader;
	public labRank: fairygui.GRichTextField;
	public labName: fairygui.GRichTextField;
	public labIntegral: fairygui.GRichTextField;
	public c1: fairygui.Controller;

	private _listData: Array<any>;

	public static URL:string = "ui://5na9ulpx8a0y1";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
		s.list.setVirtual();
	}

	public setData(index:number, qs:number)
	{
		let self = this;
		let model = GGlobal.model_ActWMSZ;
		if (index < 3) {
			self.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
			self.rankImg.visible = true;
			self.labRank.text = "";
		}else{
			self.labRank.text = "第" + (index + 1) + "名";
			self.rankImg.visible = false;
		}

		let vo:WMSZVO = model.rankArr[index];
		if(vo)
		{
			self.c1.selectedIndex = 1;
			self.labName.text = vo.name;
			if(model.myRank == index + 1)
			{
				self.labName.color = Color.GREENINT;
			}else{
				self.labName.color = Color.WHITEINT;
			}
			self.labIntegral.text = "积分：" + vo.integral;
		}else{
			self.c1.selectedIndex = 0;
		}

		let curCfg:Iwmpm_779;
		for(let key in Config.wmpm_779)
		{
			let cfg:Iwmpm_779 = Config.wmpm_779[key];
			let start:number = ConfigHelp.SplitStr(cfg.rank)[0][0];
			let end:number = ConfigHelp.SplitStr(cfg.rank)[0][1];
			if(qs == Math.floor(cfg.id / 100) && (index + 1) >= start && (index + 1) <= end)
			{
				curCfg = cfg;
			}
		}
		self._listData = [];
		if (curCfg) {
			self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(curCfg.reward1));
		}
		self.list.numItems = self._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	public clean() {
		let self = this;
		super.clean();
		self.list.numItems = 0;
		self.rankImg.url = "";
	}
}