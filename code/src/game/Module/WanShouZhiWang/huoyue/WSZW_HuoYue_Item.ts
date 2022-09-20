class WSZW_HuoYue_Item extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnRec: Button1;
	public imgGet: fairygui.GImage;

	public static URL: string = "ui://6aqn8xprc4543";

	public static createInstance(): VActHolyBeastItem {
		return <VActHolyBeastItem><any>(fairygui.UIPackage.createObject("WSZWActMRHY", "WSZW_HuoYue_Item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lab = <fairygui.GRichTextField><any>(this.getChild("lab"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.btnRec = <Button1><any>(this.getChild("btnRec"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	private _cfg: any
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, hid: number) {
		this._vo = v;
		this._hid = hid;
		var colorStr;
		var model = GGlobal.modelWanShouZhiWang;
		this.btnRec.text = "前往";
		if (this._hid == UIConst.WSZW_HUOYUE) {
			this._cfg = Config.wszwhy_284[v.id];
			colorStr = v.canCt >= (this._cfg as Issshhy_268).c ? Color.GREENSTR : Color.REDSTR;
			this._status = v ? v.status : 0
			if (v.hasCt == 1) {
				this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次全民BOSS";
			} else if (v.hasCt == 2) {
				this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次单刀赴会";
			} else if (v.hasCt == 3) {
				this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次三国战神";
			} else if (v.hasCt == 4) {
				this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次南征北战";
			} else if (v.hasCt == 5) {
				this.lab.text = "BOSS战场获取" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "战场积分";
			}
		}

		if (this._status == 0) {//前往充值
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = true;
			this.imgGet.visible = false
		} else if (this._status == 1) {//领取
			this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		} else if (this._status == 2) {//已领取
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = true
		} else {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		}
		this._listData = null;
		//奖励显示
		if (this._hid == UIConst.WSZW_HUOYUE) {
			this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(Config.wszwhy_284[v.id].reward))
		}
		this.list.numItems = this._listData ? this._listData.length : 0
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		if (this._status == 0) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		if (this._hid == UIConst.WSZW_HUOYUE) {
			GGlobal.modelWanShouZhiWang.CG_HUOYUE_GETAWARD(this._vo.hasCt, this._vo.id);
		}
	}

	private onClickRec(e: egret.TouchEvent): void {
		if (this._hid == UIConst.WSZW_HUOYUE) {
			GGlobal.layerMgr.open(this._cfg.open)
		}
		e.stopImmediatePropagation();
		e.stopPropagation()
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}