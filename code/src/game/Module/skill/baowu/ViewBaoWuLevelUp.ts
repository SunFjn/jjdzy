class ViewBaoWuLevelUp extends UIModalPanel {

	public lbAttr: fairygui.GRichTextField;
	public lbAttrNext: fairygui.GRichTextField;
	public attrGroup: fairygui.GGroup;
	public lbAttrMax: fairygui.GRichTextField;
	public lbLevel: fairygui.GRichTextField;
	public barExp: fairygui.GProgressBar;
	public maxGroup: fairygui.GGroup;
	public itemName: fairygui.GRichTextField;
	public btnLevel: Button0;
	public btnOneKey: Button1;
	public cost0: fairygui.GGroup;
	public lbPower: fairygui.GLabel;
	public lbCount: ViewResource;

	public static URL: string = "ui://jvxpx9emppkp3dj";

	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewBaoWuLevelUp").asCom;
		this.contentPane = this.view;
		this.lbAttr = <fairygui.GRichTextField><any>(this.view.getChild("lbAttr"));
		this.lbAttrNext = <fairygui.GRichTextField><any>(this.view.getChild("lbAttrNext"));
		this.attrGroup = <fairygui.GGroup><any>(this.view.getChild("attrGroup"));
		this.lbAttrMax = <fairygui.GRichTextField><any>(this.view.getChild("lbAttrMax"));
		this.lbLevel = <fairygui.GRichTextField><any>(this.view.getChild("lbLevel"));
		this.barExp = <fairygui.GProgressBar><any>(this.view.getChild("barExp"));
		this.maxGroup = <fairygui.GGroup><any>(this.view.getChild("maxGroup"));
		this.itemName = <fairygui.GRichTextField><any>(this.view.getChild("itemName"));
		this.btnLevel = <Button0><any>(this.view.getChild("btnLevel"));
		this.btnOneKey = <Button1><any>(this.view.getChild("btnOneKey"));
		this.cost0 = <fairygui.GGroup><any>(this.view.getChild("cost0"));
		this.lbPower = <fairygui.GLabel><any>(this.view.getChild("lbPower"));
		this.lbCount = <ViewResource><any>(this.view.getChild("lbCount"));
		super.childrenCreated();
	}

	private onlvlup() {
		if (Model_Bag.getItemCount(Model_BaoWu.itemId) < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_BaoWu.itemId));
			return;
		}
		GGlobal.modelbw.CG_BAOWU_UPGRADE()
	}

	private onOneKeylvlup() {
		if (Model_Bag.getItemCount(Model_BaoWu.itemId) < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_BaoWu.itemId));
			return;
		}
		GGlobal.modelbw.CG_BAOWU_KEYUPGRADE();
	}

	public update() {
		var s = this;
		var lv = Model_BaoWu.level;
		lv = lv == 0 ? 1 : lv;
		let cfg = Config.baolv_214[lv];
		s.lbPower.text = cfg["power"] + "";
		s.lbLevel.text = "Lv." + lv;
		let vo = VoItem.create(Model_BaoWu.itemId);
		var c = Model_Bag.getItemCount(Model_BaoWu.itemId);
		if (cfg["exp"] > 0) {
			s.barExp.max = cfg["exp"];
			s.barExp.value = Model_BaoWu.exp;
			s.lbAttr.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+");
			let need = Math.ceil((cfg.exp - Model_BaoWu.exp) / 10);
			s.btnLevel.checkNotice = s.btnOneKey.checkNotice = c >= need;
			lv += 1;
			cfg = Config.baolv_214[lv];
			s.lbAttrNext.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+");
			s.lbAttrMax.visible = false;
			s.cost0.visible = true;
			s.maxGroup.visible = false;
			s.attrGroup.visible = true;
		} else {
			s.barExp.max = 1;
			s.barExp.value = 1;
			s.barExp._titleObject.text = "已满级";
			s.cost0.visible = false;
			s.attrGroup.visible = false;
			s.lbAttrMax.visible = true;
			s.maxGroup.visible = true;
			s.lbAttrMax.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+", "#FFFFFF", "#15f234");
			s.btnLevel.checkNotice = s.btnOneKey.checkNotice = false;
		}
		s.lbCount.setCount(c);
		s.lbCount.setImgUrl(vo.icon);
		s.itemName.text = vo.name;
		s.itemName.color = Color.getColorInt(vo.quality);
	}

	private onBagUpdate() {
		this.lbCount.setCount(Model_Bag.getItemCount(Model_BaoWu.itemId));
	}

	protected onShown() {
		var s = this;
		s.update();
		s.btnLevel.addClickListener(s.onlvlup, s);
		s.btnOneKey.addClickListener(s.onOneKeylvlup, s);
		GGlobal.reddot.listen(ReddotEvent.CHECK_BAOWU, s.update, s);
	}

	protected onHide() {
		var s = this;
		s.btnLevel.removeClickListener(s.onlvlup, s);
		s.btnOneKey.removeClickListener(s.onOneKeylvlup, s);
		GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, s.update, s);
		GGlobal.layerMgr.close(UIConst.BAOWU_LEVELUP);
	}
}