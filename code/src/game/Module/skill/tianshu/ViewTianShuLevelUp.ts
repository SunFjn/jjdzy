/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewTianShuLevelUp extends UIModalPanel {

	public frame: fairygui.GComponent;
	public lbPower: fairygui.GTextField;
	public lbAttr: fairygui.GRichTextField;
	public lbAttrNext: fairygui.GRichTextField;
	public lbAttrMax: fairygui.GRichTextField;
	public attrGroup: fairygui.GGroup;
	public lbCount: ViewResource;
	public lbLevel: fairygui.GRichTextField;
	public btnLevel: Button0;
	public btnOneKey: Button1;
	public barExp: fairygui.GProgressBar;
	public cost0: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;

	public static URL: string = "ui://c7onhgk8qqvu2c";

	public static createInstance(): ViewTianShuLevelUp {
		return <ViewTianShuLevelUp><any>(fairygui.UIPackage.createObject("Skill", "ViewTianShuLevelUp"));
	}

	public constructor() {
		super();
		this.loadRes();
		this.isShowOpenAnimation = false;
	}
	protected childrenCreated(): void {
		var s = this;
		s.view = fairygui.UIPackage.createObject("Skill", "ViewTianShuLevelUp").asCom;
		s.contentPane = s.view;
		var b = s.view;
		s.frame = <fairygui.GComponent><any>(b.getChild("frame"));
		s.lbPower = <fairygui.GTextField><any>(b.getChild("lbPower"));
		s.lbAttr = <fairygui.GRichTextField><any>(b.getChild("lbAttr"));
		s.lbAttrNext = <fairygui.GRichTextField><any>(b.getChild("lbAttrNext"));
		s.attrGroup = <fairygui.GGroup><any>(b.getChild("attrGroup"));
		s.lbCount = <ViewResource><any>(b.getChild("lbCount"));
		s.lbLevel = <fairygui.GRichTextField><any>(b.getChild("lbLevel"));
		s.btnLevel = <Button0><any>(b.getChild("btnLevel"));
		s.btnOneKey = <Button1><any>(b.getChild("btnOneKey"));
		s.barExp = <fairygui.GProgressBar><any>(b.getChild("barExp"));
		s.cost0 = <fairygui.GGroup><any>(b.getChild("cost0"));
		s.maxGroup = <fairygui.GGroup><any>(b.getChild("maxGroup"));
		s.lbAttrMax = <fairygui.GRichTextField><any>(b.getChild("lbAttrMax"));
		s.resetPosition();
		super.childrenCreated();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

	private onlvlup() {
		if (Model_Bag.getItemCount(Model_TianShu.peiyangdan) < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_TianShu.peiyangdan));
			return;
		}
		GGlobal.modeltianshu.CG_LEVELUP_975(0)
	}

	private onOneKeylvlup() {
		if (Model_Bag.getItemCount(Model_TianShu.peiyangdan) < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_TianShu.peiyangdan));
			return;
		}
		GGlobal.modeltianshu.CG_LEVELUP_975(1)
	}

	public update() {
		var s = this;
		var m = GGlobal.modeltianshu;
		var lv = m.level;
		lv = lv == 0 ? 1 : lv;
		var lib = Config.booklv_215[lv];
		s.barExp.max = lib.exp;
		s.barExp.value = m.exp;
		s.lbPower.text = lib.power+ "";
		s.lbLevel.text = "Lv." + lv;
		let count = lib.exp/10;
		if (lv < m.getBookLvMax()) {
			s.lbAttr.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", null, Color.getColorStr(1));
			lv += 1;
			lib = Config.booklv_215[lv];
			s.lbAttrNext.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", null, Color.getColorStr(2));
			s.lbAttrMax.visible = false;
			s.cost0.visible = true;
			s.maxGroup.visible = false;
			s.attrGroup.visible = true;
			var c = Model_Bag.getItemCount(Model_TianShu.peiyangdan);
			let itemVo = VoItem.create(Model_TianShu.peiyangdan);
			s.btnLevel.checkNotice = s.btnOneKey.checkNotice = c >= count;
			s.lbCount.setImgUrl(itemVo.icon)
			s.lbCount.setCount(c);
		} else {
			s.barExp.max = 1;
			s.barExp.value = 1;
			s.barExp._titleObject.text = "已满级";
			s.cost0.visible = false;
			s.attrGroup.visible = false;
			s.lbAttrMax.visible = true;
			s.maxGroup.visible = true;
			s.lbAttrMax.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", "#FFFFFF", "#15f234");
		}
	}

	private onBagUpdate() {
		this.lbCount.text = Model_Bag.getItemCount(Model_TianShu.peiyangdan) + "";
	}

	protected onShown() {
		var s = this;
		s.update();
		s.btnLevel.addClickListener(s.onlvlup, s);
		s.btnOneKey.addClickListener(s.onOneKeylvlup, s);
		GGlobal.control.listen(Enum_MsgType.MSG_TS_LEVELUP, s.update, s);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.onBagUpdate, s);//背包更新
	}

	protected onHide() {
		var s = this;
		s.btnLevel.removeClickListener(s.onlvlup, s);
		s.btnOneKey.removeClickListener(s.onOneKeylvlup, s);
		GGlobal.control.remove(Enum_MsgType.MSG_TS_LEVELUP, s.update, s);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.onBagUpdate, s);//背包更新
		GGlobal.layerMgr.close(UIConst.TIANSHULEVEL);
	}
}