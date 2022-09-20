class View_TuJian_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public suitLvLb: fairygui.GRichTextField;
	public suitBt: Button2;
	public noticeImg: fairygui.GImage;
	public tabArr: Array<TabButton> = [];
	public item: View_TuJianUp_Panel;

	public static URL: string = "ui://m0rbmsgsrcvu24";

	public constructor() {
		super();
		this.setSkin("TuJian", "TuJian_atlas0", "View_TuJian_Panel");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory;
		f.setPackageItemExtension(TuJianItem.URL, TuJianItem);
		f.setPackageItemExtension(TuJianListItem.URL, TuJianListItem);
		f.setPackageItemExtension(View_TuJianUp_Panel.URL, View_TuJianUp_Panel);
		f.setPackageItemExtension(TuJianUpStarItem.URL, TuJianUpStarItem);
	}

	protected initView(): void {
		super.initView();
		let s = this;
		for (let i = 0; i < 4; i++) {
			let tab: TabButton = this["tab" + i];
			s.tabArr.push(tab);
		}
		s.list.callbackThisObj = this;
		s.list.itemRenderer = s.renderHandle;
		s.list.setVirtual();
		s.list.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, this);
		s.suitBt.addClickListener(s.suitHandle, this);
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.OnChange, this);
		GGlobal.modelTuJian.CG_OPEN_TUJIAN();
	}

	private OnChange() {
		let s = this;
		s.list.numItems = 0;
		if (s.curSelItem) s.curSelItem.setChoose(false);
		s.curSelItem = null;
		s.curSelVo = null;
		s.updateShow();
	}

	private suitHandle(): void {
		GGlobal.layerMgr.open(UIConst.TUJIAN_SUIT, Model_TuJian.suitVoArr[this.c1.selectedIndex]);
	}

	private curSelItem: TuJianListItem;
	private curSelVo: Vo_TuJian;
	private listHandle(event: fairygui.ItemEvent): void {
		let s = this;
		let item: TuJianListItem = event.itemObject as TuJianListItem;
		if (s.curSelVo && s.curSelVo.ID == item.vo.ID) return;
		if (s.curSelItem) s.curSelItem.setChoose(false);
		s.curSelVo = null;
		item.setChoose(true);
		s.curSelItem = item;
		s.curSelVo = item.vo;
		s.updateItem();
	}

	public updateItem() {
		let s = this;
		if (!s.curSelVo) return;
		s.item.onShown(s.curSelVo)
	}

	private renderHandle(index: number, obj: TuJianListItem): void {
		let s = this;
		let item: TuJianListItem = obj as TuJianListItem;
		item.setVo(s.listArr[index]);
		if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == item.vo.ID) {
			if (s.curSelItem) s.curSelItem.setChoose(false);
			s.curSelVo = item.vo;
			item.setChoose(true);
			s.curSelItem = item;
			s.item.onShown(s.curSelVo);
			Model_GlobalMsg.selectID = 0;
		} else if (!s.curSelVo && index == 0) {
			s.curSelVo = item.vo;
			item.setChoose(true);
			s.curSelItem = item;
			s.item.onShown(s.curSelVo);
		} else if (s.curSelVo && s.curSelVo.ID == item.vo.ID) {
			s.curSelVo = item.vo;
			item.setChoose(true);
			s.curSelItem = item;
			s.item.onShown(s.curSelVo);
		} else {
			item.setChoose(false);
		}
	}

	private listArr: Array<any> = [];
	public updateShow(): void {
		let s = this;
		for (let i = 0; i < 4; i++) {
			if (i == 0) {
				s.tabArr[i].checkNotice = Model_TuJian.checkTabNotice(i);
			} else {
				s.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.TUJIAN, i);
			}
		}
		s.listArr = Model_TuJian.tuJianArr[s.c1.selectedIndex];
		s.list.numItems = s.listArr.length;
		if (!s.curSelVo) {
			s.curSelVo = s.listArr[0];
		} else {
			for (let i = 0; i < s.listArr.length; i++) {
				if (s.curSelVo.ID == s.listArr[i].ID) {
					s.curSelVo = s.listArr[i];
					break;
				}
			}
		}
		if (s.curSelVo) s.item.onShown(s.curSelVo);
		let vo: Vo_TuJianSuit = Model_TuJian.suitVoArr[s.c1.selectedIndex];
		vo.tujianLv = Model_TuJian.getTuJianLv(s.c1.selectedIndex)
		let nextcfg;
		let attArr: Array<any>;
		if (vo.suitNext > 0) {
			nextcfg = Config.picteam_005[vo.suitNext];
			if (vo.tujianLv >= nextcfg.need) {
				s.noticeImg.visible = true;
			} else {
				s.noticeImg.visible = false;
			}
		} else {
			s.noticeImg.visible = false;
		}
		attArr = vo.suitAttArr;
		s.powerLb.text = (vo.suitPower + Model_TuJian.getTuJianPower(s.c1.selectedIndex)) + "";
		let len = attArr.length;
		let attstr: string = "";
		for (let i = 0; i < len; i++) {
			if (i == 0) {
				attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
			} else {
				attstr += "    " + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
			}
		}
		s.suitLvLb.text = vo.suitLv + "级";
	}

	protected onShown(): void {
		let s = this;
		if (Model_GlobalMsg.selectID > 0 && Config.picture_005[Model_GlobalMsg.selectID]) {
			let cfg = Config.picture_005[Model_GlobalMsg.selectID];
			if (s.c1.selectedIndex == cfg.type - 1) {
				s.updateShow();
			} else {
				s.c1.selectedIndex = cfg.type - 1;
			}
		} else {
			if (s.c1.selectedIndex == 0) {
				s.updateShow();
			} else {
				s.c1.selectedIndex = 0;
			}
		}
		GGlobal.reddot.listen(ReddotEvent.CHECK_TUJIAN, s.updateShow, s);
	}

	protected onHide(): void {
		let self = this;
		if (self.curSelItem) self.curSelItem.setChoose(false);
		self.curSelItem = null
		self.curSelVo = null;
		self.item.onHide();
		self.list.numItems = 0;
		Model_GlobalMsg.selectID = 0;
		GGlobal.layerMgr.close(UIConst.TUJIAN);
		GGlobal.reddot.remove(ReddotEvent.CHECK_TUJIAN, self.updateShow, self);
	}
}