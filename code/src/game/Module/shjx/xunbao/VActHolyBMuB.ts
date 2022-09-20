class VActHolyBMuB extends fairygui.GComponent {

	public lbPoint: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgHas: fairygui.GImage;

	public static URL: string = "ui://4aepcdbwwg9y52";

	public static createInstance(): VActHolyBMuB {
		return <VActHolyBMuB><any>(fairygui.UIPackage.createObject("shouhunJX", "VActHolyBMuB"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbPoint = <fairygui.GRichTextField><any>(this.getChild("lbPoint"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.imgHas = <fairygui.GImage><any>(this.getChild("imgHas"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.btnGet.addClickListener(this.onGet, this);
	}
	private _vo: any
	private _listData: IGridImpl[];
	public setVo(v: Vo_HuoDong, index = 0) {
		this._vo = v;
		let cfg = Config.ssshxbmb_268[v.id]
		let xbQuan = GGlobal.modelSHXunbao.xbQuan
		let colors = xbQuan >= cfg.q ? Color.GREENSTR : Color.REDSTR
		xbQuan = xbQuan >= cfg.q ? cfg.q : xbQuan;
		this.lbPoint.text = "寻宝" + HtmlUtil.fontNoSize("(" + xbQuan + "/" + cfg.q + ")", colors) + "圈"
		this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
		this.list.numItems = this._listData.length;

		if (v.status == 2) {//已领取
			this.btnGet.touchable = this.btnGet.visible = false;
			this.imgHas.visible = true
		}
		else if (v.status == 1 || xbQuan >= cfg.q) {//领取
			this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
			this.imgHas.visible = false
		}
		else {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.imgHas.visible = false
		}
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData[index];
	}

	private onGet() {
		GGlobal.modelSHXunbao.CG_XUNBAO_GOAL(this._vo.id)
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}