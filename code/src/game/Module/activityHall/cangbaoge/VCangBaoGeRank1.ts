class VCangBaoGeRank1 extends fairygui.GComponent {

	public labPoint: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnRec: Button0;
	public imgGet: fairygui.GImage;
	public n12: fairygui.GRichTextField;

	public static URL: string = "ui://1tr9e6d8z8fv19";

	public static createInstance(): VLingLongRank1 {
		return <VLingLongRank1><any>(fairygui.UIPackage.createObject("lingLong", "VLingLongRank1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.labPoint = <fairygui.GRichTextField><any>(this.getChild("labPoint"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnRec = <Button0><any>(this.getChild("btnRec"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));
		this.n12 = <fairygui.GRichTextField><any>(this.getChild("n12"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		this.btnRec.addClickListener(this.onRec, this);
	}

	private _vo: { cfgId: number, status: number }
	private _dataArr1: Array<any>;
	public setVo(v: { cfgId: number, status: number }, index) {
		this._vo = v;
		let rankCfg = null;

		if (Model_ActivityHall.cbgIsKuaF()) {
			rankCfg = Config.cbgmb2_729[v.cfgId]
		} else {
			rankCfg = Config.cbgmb1_729[v.cfgId]
		}

		if (v) {
			this.labPoint.text = "抽奖次数：" + (rankCfg as Icbgmb2_729).time;
			this._dataArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward));
		} else {
			this.labPoint.text = "";
			this._dataArr1 = []
		}
		this.n12.visible = false;
		if (v.status == 0) {
			this.btnRec.visible = false;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = false;
			this.n12.visible = true;
		} else if (v.status == 1) {
			this.btnRec.visible = true;
			this.imgGet.visible = false;
			this.btnRec.checkNotice = true;
		} else {
			this.btnRec.visible = false;
			this.imgGet.visible = true;
		}
		this.list.numItems = this._dataArr1.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._dataArr1[index];
	}

	public clean(): void {
		super.clean()
		this.list.numItems = 0;
	}

	private onRec() {
		if (this._vo.status == 0) {
			ViewCommonWarn.text("抽奖次数不足")
			return;
		}
		if (Model_ActivityHall.cbgIsKuaF()) {
			GGlobal.modelActivityHall.CG_CBG_GET_4875(Number(this._vo.cfgId));
		} else {
			GGlobal.modelActivityHall.CG_CBG_GET_4855(Number(this._vo.cfgId));
		}

	}
}