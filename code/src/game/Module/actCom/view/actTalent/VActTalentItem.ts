class VActTalentItem extends fairygui.GComponent {

	public lab:fairygui.GRichTextField;
	public list:fairygui.GList;
	public btnGet:Button1;
	public btnRec:Button1;
	public imgGet:fairygui.GImage;

	public static URL:string = "ui://smvxlnhhoiu11";

	public static createInstance():VActTalentItem {
		return <VActTalentItem><any>(fairygui.UIPackage.createObject("actTalent","VActTalentItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
		s.btnGet.addClickListener(s.onClickGet, s);
		s.btnRec.addClickListener(s.onClickRec, s);
	}

	private _listData: Array<IGridImpl>
	private _vo: Vo_HuoDong;
	// private _cfg: Ilffwxltf_285
	private _cfg: any;
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, hid: number) {
		let s = this;
		s._vo = v;
		s._hid = hid;
		var colorStr;
		var model = GGlobal.modelActTalent;
		var count:number;
		s.btnRec.text = "前往";
		if(hid == UIConst.ACTCOM_TALENT)
		{
			s._cfg = Config.lffwxltf_285[v.id];
			count = model.xlCt;
			colorStr = count >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
			s.lab.text = "修炼天赋<font color='" + colorStr + "'>（" + count + "/" + s._cfg.cs + "）</font>";
		}else if(hid == UIConst.YUNCHOUWEIWO_JLMJ)
		{
			s._cfg = Config.jnmj_327[v.id];
			count = model.jlmjCount;
			colorStr = count >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
			s.lab.text = "出谋划策次数<font color='" + colorStr + "'>（" + count + "/" + s._cfg.cs + "）</font>";
		}
		// colorStr = model.xlCt >= s._cfg.cs ? Color.GREENSTR : Color.REDSTR;
		// s.lab.text = "修炼天赋<font color='" + colorStr + "'>（" + model.xlCt + "/" + s._cfg.cs + "）</font>"
		s._status = v ? v.status : 0

		if (s._status == 0) {//前往充值
			s.btnGet.touchable = s.btnGet.visible = false;
			s.btnRec.touchable = s.btnRec.visible = true;
			s.imgGet.visible = false
		} else if (s._status == 1) {//领取
			s.btnGet.checkNotice = s.btnGet.touchable = s.btnGet.visible = true;
			s.btnRec.touchable = s.btnRec.visible = false;
			s.imgGet.visible = false
		} else if (s._status == 2) {//已领取
			s.btnGet.touchable = s.btnGet.visible = false;
			s.btnRec.touchable = s.btnRec.visible = false;
			s.imgGet.visible = true
		} else {
			s.btnGet.touchable = s.btnGet.visible = false;
			s.btnRec.touchable = s.btnRec.visible = false;
			s.imgGet.visible = false
		}
		s._listData = null
		//奖励显示
		s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(s._cfg.jl))
		s.list.numItems = s._listData ? s._listData.length : 0
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
		if(this._hid == UIConst.ACTCOM_TALENT)
		{
			GGlobal.modelActTalent.CG_TALENT_GET9351(this._vo.id);
		}else if(this._hid == UIConst.YUNCHOUWEIWO_JLMJ)
		{
			GGlobal.modelActTalent.CG_YCWW_JLMJ_GET(this._vo.id);
		}
	}

	private onClickRec(e: egret.TouchEvent): void {
		if(this._hid == UIConst.ACTCOM_TALENT)
		{
			GGlobal.layerMgr.open(UIConst.XIULIAN_TF);
		}else if(this._hid == UIConst.YUNCHOUWEIWO_JLMJ)
		{
			GGlobal.layerMgr.open(UIConst.QICE_LOTTERY);
		}
		e.stopImmediatePropagation();
		e.stopPropagation()
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}