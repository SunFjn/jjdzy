class VActTalentGoalItem extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnRec: Button1;
	public imgGet: fairygui.GImage;

	public static URL: string = "ui://ss8kd9acoiu12";

	public static createInstance(): VActTalentGoalItem {
		return <VActTalentGoalItem><any>(fairygui.UIPackage.createObject("actTalentGoal", "VActTalentGoalItem"));
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
	private _cfg: Ilffwtfmb_285
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: Vo_HuoDong, hid: number) {
		let s = this;
		s._vo = v;
		s._hid = hid;
		var colorStr;
		var model = GGlobal.modelActTalent
		s.btnRec.text = "前往";
		s._cfg = Config.lffwtfmb_285[v.id]
		colorStr = v.canCt >= (s._cfg as Issshmb_268).c1 ? Color.GREENSTR : Color.REDSTR;
		s._status = v ? v.status : 0
		if (v.hasCt == 1) {
			s.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "个" + s._cfg.c2 + "级天赋装备"
		} else if (v.hasCt == 2) {
			s.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "个" + Color.getColorName(s._cfg.c2) + "品天赋装备";
		} else if (v.hasCt == 3) {
			s.lab.text = "天赋总等级达到" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "级";
		} else if (v.hasCt == 4) {
			s.lab.text = "天赋总战力达到" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr);
		}

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
		s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(s._cfg.reward))
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
		GGlobal.modelActTalent.CG_GOAL_GET9401(this._vo.hasCt, this._vo.id);
	}

	private onClickRec(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(this._cfg.open)
		e.stopImmediatePropagation();
		e.stopPropagation()
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}