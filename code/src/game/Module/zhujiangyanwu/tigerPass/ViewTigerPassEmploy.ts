class ViewTigerPassEmploy extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public btnSure: fairygui.GButton;
	public btnCge: fairygui.GButton;
	public lbCost: fairygui.GRichTextField;
	public lbCt: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public imgCost: fairygui.GImage;

	public static URL: string = "ui://7a366usay5hd2f";

	public static createInstance(): ViewTigerPassEmploy {
		return <ViewTigerPassEmploy><any>(fairygui.UIPackage.createObject("zjyw", "ViewTigerPassEmploy"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("zjyw", "ViewTigerPassEmploy").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.itemRenderer = s.rendHandler;
		s.list.callbackThisObj = s;
		super.childrenCreated();
	}
	private _employArr: any[]

	protected onShown(): void {
		let s = this;
		GGlobal.modelTigerPass.listen(Model_TigerPass.msg_employ_list, s.update, s)
		s.btnSure.addClickListener(s.onEmploy, s);
		s.btnCge.addClickListener(s.onCge, s);
		s.list.addEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
		GGlobal.control.listen(Enum_MsgType.ZERO_RESET, s.zeroUp, s);
		s.update()
		s.zeroUp()
	}

	protected onHide(): void {
		let s = this;
		GGlobal.modelTigerPass.remove(Model_TigerPass.msg_employ_list, s.update, s)
		s.btnSure.removeClickListener(s.onEmploy, s);
		s.btnCge.removeClickListener(s.onCge, s);
		s.list.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
		GGlobal.control.remove(Enum_MsgType.ZERO_RESET, s.zeroUp, s);
		s.list.numItems = 0
	}

	private _cost: number;
	private update(): void {
		let m = GGlobal.modelTigerPass;
		let s = this;
		s._employArr = m.employArr;
		s.list.numItems = 6

		if (s._employArr && s._employArr.length > 0) {
			s.list.selectedIndex = 0;
			s._vo = s._employArr[0];
		} else {
			s.list.selectedIndex = -1;
			s._vo = null
		}
		let color = m.ctEmploy == 0 ? Color.REDSTR : Color.GREENSTR
		s.lbCt.text = "??????????????????:" + HtmlUtil.fontNoSize(m.ctEmploy + "/" + ConfigHelp.getSystemNum(7101), color)
		//??????
		if (!s._cost) {
			s._cost = Number(JSON.parse(ConfigHelp.getSystemDesc(7103))[0][2]);
		}
		s.lbCost.text = s._cost + "";
		if (Model_player.voMine.tongbi < s._cost) {
			s.lbCost.color = Color.REDINT;
		} else {
			s.lbCost.color = Color.GREENINT;
		}
	}

	private rendHandler(index, v: ItemTigPasEmploy) {
		v.vo = this._employArr[index]
	}

	private onEmploy() {
		let s = this;
		let m = GGlobal.modelTigerPass
		if (s._vo == null) {
			ViewCommonWarn.text("???????????????")
			return;
		}
		if (Model_player.voMine.yuanbao < s._vo.price) {
			ViewCommonWarn.text("????????????")
			return;
		}
		if (s._vo.count == 0) {
			ViewCommonWarn.text("?????????????????????????????????")
			return;
		}
		if (m.ctEmploy <= 0) {
			ViewCommonWarn.text("????????????????????????")
			return;
		}
		if (m.employId > 0) {
			ViewCommonWarn.text("????????????????????????????????????")
			return;
		}
		m.CGChooseEmploy8911(this._vo.plyId)
		this.closeEventHandler(null)
	}

	private onCge() {
		if (Model_player.voMine.tongbi < this._cost) {
			ViewCommonWarn.text("????????????");
			return;
		}
		GGlobal.modelTigerPass.CGRefreshEmploy8915()
	}

	private _vo: { head: number, frame: number, name: string, vip: number, plyId: number, power: number, price: number, count: number } = null
	private itemClick(e: fairygui.ItemEvent) {
		let v = e.itemObject as ItemTigPasEmploy
		this._vo = v.vo;
	}
	//????????????
	private zeroUp(){
		GGlobal.modelTigerPass.CGOpenEmploy8909();
	}
}