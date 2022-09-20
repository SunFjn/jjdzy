class VHuoDOnlyItem extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnRec: Button1;
	public imgGet: fairygui.GImage;
	public labCount: fairygui.GRichTextField;

	public static URL: string = "ui://mk3gp0vrlbbw3";

	public static createInstance(): VHuoDOnlyItem {
		return <VHuoDOnlyItem><any>(fairygui.UIPackage.createObject("huoDOnly", "VHuoDOnlyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	private _act: Vo_Activity;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, act: Vo_Activity) {
		this._vo = v;
		this._act = act;
		var colorStr;
		this.labCount.text = "";
		let cfg
		if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
			cfg = Config.zshddbcz_315[v.id]
			this._status = v ? (v as Vo_HuoDong).getStaCt(cfg.cs) : 0;
			this.labCount.text = "可充值领奖次数:" + (cfg.cs - v.canCt);
			if (this._status == 0) {
				colorStr = Color.REDSTR
				this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>"
			} else {
				colorStr = Color.GREENSTR
				this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>"
			}
		} else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
			cfg = Config.zshdljcz_315[v.id]
			let addRecharge = Model_HuoDOnly.getAddRecharge(act.id)
			colorStr = addRecharge >= (cfg as Izshdljcz_315).coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值" + cfg.coin + "元，可领取<font color='" + colorStr + "'>（" + addRecharge + "/" + cfg.coin + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			cfg = Config.zshdybfl_315[v.id]
			let needCt = (cfg as Izshdybfl_315).xh[0][2];
			let hasCt = GGlobal.modelHuoDOnly.getYbao(act.id)
			if (hasCt >= needCt) {
				this.lab.text = "消耗" + needCt + "元宝" + "<font color='" + Color.GREENSTR + "'>(" + hasCt + "/" + needCt + ")</font>";
			} else {
				this.lab.text = "消耗" + needCt + "元宝" + "<font color='" + Color.REDSTR + "'>(" + hasCt + "/" + needCt + ")</font>";
			}
			this._status = v ? v.status : 0
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
		this._listData = null
		//奖励显示
		if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
			this._listData = ConfigHelp.makeItemListArr(cfg.jl)
		} else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
			this._listData = ConfigHelp.makeItemListArr((cfg as Izshdljcz_315).reward)
		} else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			this._listData = ConfigHelp.makeItemListArr((cfg as Izshdybfl_315).reward)
		}
		this.list.numItems = this._listData ? this._listData.length : 0;
		//按钮文字
		if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			this.btnRec.text = "前往"
		} else {
			this.btnRec.text = "前往充值"
		}
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
		if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
			GGlobal.modelHuoDOnly.CG_DAILYONE_GET(this._act.id, this._vo.id);
		} else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
			GGlobal.modelHuoDOnly.CG_ADDRECHARGE_GET(this._act.id, this._vo.id);
		} else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			GGlobal.modelHuoDOnly.CG_YBFL_LQ_8331(this._act.id, this._vo.id);
		}
	}

	private onClickRec(): void {
		if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
			GGlobal.layerMgr.open(UIConst.CANGBAOGE)
		} else {
			ViewChongZhi.tryToOpenCZ();
		}

	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}