/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child_TianShu extends fairygui.GComponent {

	public useImg: fairygui.GImage;
	public bwIcon: fairygui.GLoader;
	public drugBt: Button2;
	public useBt: Button2;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public starLb: fairygui.GTextField;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public attGroup: fairygui.GGroup;
	public upStarBt: Button0;
	public costLb: fairygui.GRichTextField;
	public upStarGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public drugCount: fairygui.GRichTextField;
	public skillDes: fairygui.GRichTextField;
	public showAtt: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public lbTip: fairygui.GRichTextField;
	public showBt: fairygui.GButton;
	public starPowerLb: fairygui.GTextField;
	public promptLb0: fairygui.GLabel;
	public jueXingBt: Button2;
	public static URL: string = "ui://3tzqotadqqvu23";

	public static createInstance(): Child_TianShu {
		return <Child_TianShu><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.promptLb0.text = "天书效果";
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandle;
		s.list.setVirtual();
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.TIANSHU);
	}

	private showHandler() {
		if (this.vo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(7, this.vo.id);
		}
	}

	private curItem: TianShuItem;
	private selecteIndex: number = 0;
	private itemClickHandle(event: fairygui.ItemEvent): void {
		let s = this;
		let item: TianShuItem = event.itemObject as TianShuItem;
		let m = GGlobal.modeltianshu;
		s.vo = item.vo;
		s.selecteIndex = item.sindex;
		if (s.curItem) s.curItem.setSel(false);
		s.curItem = item;
		s.curItem.setSel(true);
		Model_GlobalMsg.selectID = 0;
		s.updateView();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let self = this;
		let item: TianShuItem = obj as TianShuItem;
		item.vo = this._sortList[index];
		item.sindex = index;
		if ((Model_GlobalMsg.selectID > 0 && item.vo.id == Model_GlobalMsg.selectID) || (self.selecteIndex == index)) {
			if (self.curItem) self.curItem.setSel(false);
			self.curItem = item;
			self.curItem.setSel(true);
			self.vo = item.vo;
		} else if (self.vo && this.vo.id == item.vo.id) {
			self.curItem = item;
			self.curItem.setSel(true);
			self.vo = item.vo;
		} else if (!self.vo && !self.curItem && Model_GlobalMsg.selectID <= 0) {
			self.curItem = item;
			self.curItem.setSel(true);
			self.vo = item.vo;
		} else {
			item.setSel(false);
		}
	}

	private wearHandler(e) {
		let s = this;
		if (s.vo.star == 0) {
			ViewCommonWarn.text("尚未激活" + s.vo.name);
			return;
		}
		let m = GGlobal.modeltianshu;
		m.CG_CHANGETIANSHU_973(s.vo.id);
	}

	/**升级*/
	private levelUpHandler(e) {
		GGlobal.layerMgr.open(UIConst.TIANSHULEVEL);
	}

	/**属性丹*/
	private dragHandler(e) {
		let s = this;
		GGlobal.layerMgr.open(UIConst.TIANSHUDRAG, s.vo);
	}

	/**升星*/
	private starHandler(e) {
		let s = this;
		let id = JSON.parse(s.vo.item)[0][1];
		let count = Model_Bag.getItemCount(id);
		if (count < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(id));
			return;
		}
		let m = GGlobal.modeltianshu;
		m.CG_STARUP_977(s.vo.id);
	}

	public updateView(): void {
		let self = this;
		let cf = Config.bookstar_215;
		let m = GGlobal.modeltianshu;
		if (!self.vo) self.vo = self._sortList[self.selecteIndex];
		if (!self.vo) return;
		self.useBt.visible = self.vo.id != m.currentID && self.vo.star != 0;
		self.useImg.visible = self.vo.id == m.currentID;
		let nowVO: VoTianShu = self.vo;
		self.powerLb.text = (nowVO.star > 0 ? nowVO.power : 0) + "";
		self.nameLb.text = HtmlUtil.fontNoSize(nowVO.name, Color.getColorStr(nowVO.pin));
		IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + nowVO.pic + ".png");
		self.starLb.text = ConfigHelp.getStarFontStr(nowVO.star);
		self.skillDes.text = nowVO.desc;
		self.drugCount.text = m.shuxingdan + "/" + m.getDrugCount();
		self.lbTip.text = "可提升天书属性丹吞噬上限：" + HtmlUtil.fontNoSize(nowVO.max * (nowVO.star > 0 ? nowVO.star : 1) + "", Color.getColorStr(5));
		let attstr0: string = "";
		let attstr1: string = "";
		self.attGroup.visible = false;
		self.showAtt.visible = true;
		self.maxGroup.visible = false;
		self.upStarGroup.visible = true;
		if (nowVO.star == 0) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.showAtt.text = attstr0;
			self.starPowerLb.text = cf[nowVO.pin * 1000 + 1].power + "";
		} else if (nowVO.isMaxStar()) {
			attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + nowVO.star].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.upStarBt.checkNotice = false;
			self.showAtt.text = attstr0;
			self.maxGroup.visible = true;
			self.upStarGroup.visible = false;
		} else {

			attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + nowVO.star].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[nowVO.pin * 1000 + nowVO.star].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			self.curAtt.text = attstr0;
			self.nextAtt.text = attstr1;
			self.attGroup.visible = true;
			self.showAtt.visible = false;
			self.starPowerLb.text = (cf[cf[nowVO.pin * 1000 + nowVO.star].next].power - cf[nowVO.pin * 1000 + nowVO.star].power) + "";
		}
		let str = "消耗:" + HtmlUtil.fontNoSize(nowVO.name, Color.getColorStr(nowVO.pin)) + "x1";
		let items = JSON.parse(nowVO.item)[0];
		let c = Model_Bag.getItemCount(items[1]);
		if (c >= items[2]) str += "<font color='#15f234'>(" + c + "/" + items[2] + ")</font>";
		else str += "<font color='#ed1414'>(" + c + "/" + items[2] + ")</font>";

		self.costLb.text = str;
		self.upStarBt.text = nowVO.star == 0 ? "激活" : "升星";
		self.showBt.visible = nowVO.star > 0;
		self.setActiTip();
		self.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.TIANSHU);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 4);
	}

	private levelUp() {
		let m = GGlobal.modeltianshu;
	}
	private StarUpdate() {
		ViewCommonWarn.text("升级成功");
		this.updateList();
	}
	private vo: VoTianShu;
	private _sortList;
	private updateList() {
		let s = this;
		let m = GGlobal.modeltianshu;
		s._sortList = m.data;
		if (s.curItem) s.curItem.setSel(false);
		s.curItem = null;
		s.list.numItems = s._sortList.length;
		s.updateView();
	}

	private wearBack() {
		let s = this;
		if (s.curItem) s.curItem.setSel(false);
		s.curItem = null;
		s.selecteIndex = 0;
		let m = GGlobal.modeltianshu;
		s._sortList = m.data;
		s.list.numItems = s._sortList.length;
		s.updateView();
	}

	private setActiTip() {
		let s = this;
		let v = s.vo;
		let id = JSON.parse(v.item)[0][1];
		let count = Model_Bag.getItemCount(id);
		s.upStarBt.checkNotice = count > 0 && !v.isMaxStar();
	}

	private noticeHandler() {
		let s = this;
		let r = GGlobal.reddot;
		s.drugBt.checkNotice = r.checkCondition(UIConst.TIANSHU, 1);
		s.useBt.checkNotice = r.checkCondition(UIConst.TIANSHU, 3);
		if (s.vo) s.setActiTip();
	}

	protected onShown() {
		let s = this;
		let c = GGlobal.control;
		s.eventFunction(1);
		c.listen(Enum_MsgType.MSG_TS_DRUG, s.updateView, s);
		c.listen(Enum_MsgType.MSG_TS_UPDATE, s.updateList, s);
		c.listen(Enum_MsgType.MSG_TS_LEVELUP, s.levelUp, s);
		c.listen(Enum_MsgType.MSG_TS_WAEAR, s.wearBack, s);
		c.listen(Enum_MsgType.MSG_TS_STAR, s.StarUpdate, s);

		GGlobal.reddot.listen(ReddotEvent.CHECK_TIANSHU, s.noticeHandler, s);

		s.noticeHandler();
		s.updateList();
	}
	public open() {
		this.onShown();
	}

	public close() {
		this.onHide();
	}

	protected onHide() {
		let s = this;
		s.eventFunction(0);
		s.vo = null;
		let c = GGlobal.control;
		if (s.curItem) s.curItem.setSel(false);
		s.curItem = null;
		s.list.numItems = 0;
		s.selecteIndex = 0;
		Model_GlobalMsg.selectID = 0;
		c.remove(Enum_MsgType.MSG_TS_DRUG, s.updateView, s);
		c.remove(Enum_MsgType.MSG_TS_UPDATE, s.updateList, s);
		c.remove(Enum_MsgType.MSG_TS_WAEAR, s.wearBack, s);
		c.remove(Enum_MsgType.MSG_TS_STAR, s.StarUpdate, s);
		c.remove(Enum_MsgType.MSG_TS_LEVELUP, s.levelUp, s);
		GGlobal.reddot.remove(ReddotEvent.CHECK_TIANSHU, s.noticeHandler, s);
		IconUtil.setImg(s.bwIcon, null);
	}

	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.useBt, EventUtil.TOUCH, self.wearHandler, self);
		event(t, self.drugBt, EventUtil.TOUCH, self.dragHandler, self);
		event(t, self.upStarBt, EventUtil.TOUCH, self.starHandler, self);
		event(t, self.showBt, EventUtil.TOUCH, self.showHandler, self);
		event(t, self.jueXingBt, EventUtil.TOUCH, self.OnJueXing, self);
		event(t, self.list, fairygui.ItemEvent.CLICK, self.itemClickHandle, self);
	}
}