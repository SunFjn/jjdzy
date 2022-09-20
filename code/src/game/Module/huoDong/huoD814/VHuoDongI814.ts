class VHuoDongI814 extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgGet: fairygui.GImage;
	public btnRec: Button0;
	public labCount: fairygui.GRichTextField;

	public static URL: string = "ui://vrw7je9rt2amd";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lab = <fairygui.GRichTextField><any>(this.getChild("lab"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));
		this.btnRec = <Button0><any>(this.getChild("btnRec"));
		this.labCount = <fairygui.GRichTextField><any>(this.getChild("labCount"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, hid: number) {
		this._vo = v;
		this._hid = hid;
		var colorStr;
		this.labCount.text = "";
		this._listData = null
		var cfgCls =  Model_HuoD814.getCfg814(hid)
		var cfg = cfgCls[v.id];
		if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
			let type = v.id%1000;
			if (type == 1) {
				this.lab.text = "今日可领取"
			} else if (type == 2) {
				this.lab.text = "VIP" + ConfigHelp.getSystemNum(2003) + "可额外领取"
			} else if (type== 3) {
				this.lab.text = "充值任意金额可额外领取"
			} else if (type == 4) {
				this.lab.text = "至尊卡可额外领取"
			}
			this._status = v.status;
			this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr((cfg as Idlhl3_732).reward))

		}
		else if(this._hid == UIConst.HUODONG_DAILY_ONE814){
			this._status = v ? v.getStaCt((cfg as Idbcz3_733).cs) : 0;
			this.labCount.text =  "可充值领奖次数:" + (cfg.cs - v.canCt); 
			this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jl))

			if (this._status == 0) {
				colorStr = Color.REDSTR
				this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>"
			} else {
				colorStr = Color.GREENSTR
				this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>"
			}
		}else if(this._hid == UIConst.HUODONG_ADD_RECHARGE814){
			colorStr = Model_HuoD814.addRecharge >= (cfg as Ileichong3_725).coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.addRecharge + "/" + cfg.coin + "）</font>"
			this._status = v ? v.status : 0
			this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))

		}else if(this._hid == UIConst.HUODONG_DAILY_ADDUP814){
			colorStr = Model_HuoD814.dailyAddUp >= (cfg as Idrlc3_734).coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.dailyAddUp + "/" + cfg.coin + "）</font>"
			this._status = v ? v.status : 0
			this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
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
		//奖励显示
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
		if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
			GGlobal.modelHuoD814.CG_DAILYGIFT_GET(this._vo.id%1000);
		}else if(this._hid == UIConst.HUODONG_DAILY_ONE814){
			GGlobal.modelHuoD814.CG_DAILYONE_GET(this._vo.id);
		}else if(this._hid == UIConst.HUODONG_ADD_RECHARGE814){
			GGlobal.modelHuoD814.CG_ADDRECHARGE_GET(this._vo.id);
		}else if(this._hid == UIConst.HUODONG_DAILY_ADDUP814){
			GGlobal.modelHuoD814.CG_DAILYADDUP_GET(this._vo.id);
		}
	}

	private onClickRec(): void {
		ViewChongZhi.tryToOpenCZ();
	}

	public clean(){
		super.clean();
		this.list.numItems = 0;
	}
}