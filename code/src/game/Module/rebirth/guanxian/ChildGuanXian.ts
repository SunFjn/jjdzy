class ChildGuanXian extends fairygui.GComponent implements IPanel {

	//>>>>start
	public btnLeft: Button2;
	public btnRight: Button2;
	public lbGuanxian: fairygui.GRichTextField;
	public btnLvUp: Button1;
	public barExp: fairygui.GProgressBar;
	public lbJS: fairygui.GRichTextField;
	public lbGongxun: fairygui.GRichTextField;
	public lbAtt: fairygui.GRichTextField;
	public btnContry: Button2;
	public lbPower: fairygui.GLabel;
	public titleIcon: fairygui.GLoader;
	public imgBig: fairygui.GImage;
	public labBigReward: fairygui.GTextField;
	public gridBigReward: JXGrid;
	public groupJiangYin: fairygui.GGroup;
	public itemList: fairygui.GList;
	public backbg0: fairygui.GLoader;
	public backbg1: fairygui.GLoader;
	//>>>>end

	public static URL: string = "ui://dllc71i9ltpm12";

	public static createInstance(): ChildGuanXian {
		return <ChildGuanXian><any>(fairygui.UIPackage.createObject("rebirth", "ChildGuanXian"));
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.hide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.itemList.callbackThisObj = s;
		s.itemList.itemRenderer = s.awardsRender;

		s.btnContry.addClickListener(s.openContry, s);
		s.lbGongxun.addClickListener(s.openContry, s);
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	public open(): void {
		this.onOpen();
	}

	public hide(): void {
		this.onClose();
	}

	private openContry(e: egret.TouchEvent) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		//材料获取
		let im = VoItem.create(7);
		View_CaiLiao_GetPanel.show(im);
	}

	private nowIndex: number = 0;
	private onPager() {
		this.nowIndex++;
		var m = GGlobal.modelguanxian;
		if (this.nowIndex <= this.maxLen) this.setIndex(true);
		else {
			this.nowIndex = this.maxLen;
		}
	}

	private onPagel() {
		this.nowIndex--;
		if (this.nowIndex > 0) this.setIndex(true);
		else this.nowIndex = 1
	}

	private maxLen: number = 0;
	private setdata() {
		let sf = this;
		sf.setCurrentPropeties();
		sf.setIndex();
		sf.showJiangYin();
	}

	//将印
	private showJiangYin() {
		let now = GGlobal.modelguanxian.guanzhi;
		var next: Ijyjh_701 = null;
		let cfg = Config.jyjh_701;
		//默认10个将印
		for (var i: number = 1; i < 11; i++) {
			let item: Ijyjh_701 = cfg[i];
			if (item.jihuo > now - 1) {
				next = item;
				break;
			}
		}
		this.groupJiangYin.visible = next != null;
		if (next) {
			this.labBigReward.text = "第" + next.jihuo + "阶";
		}
		this.gridBigReward.setCFG(next);
	}

	private setCurrentPropeties() {
		let s = this;
		var m = GGlobal.modelguanxian;
		s.nowIndex = m.guanzhi;
		s.maxLen = m.guanzhi;
		if (s.nowIndex + 1 < m.maxL)
			s.maxLen = s.nowIndex + 1;
		var lib = Config.guanxian_701[s.nowIndex];
		var att = JSON.parse(lib["attr"]);
		s.lbPower.text = "" + ConfigHelp.powerFormulaArr(att);
		s.lbAtt.text = ConfigHelp.attrString(att, "+", "#FFFFFF", "#15f234");
	}

	private levelUpBack() {
		this.setCurrentPropeties();
		this.setIndex();
		this.showJiangYin();
	}

	private setIndex(val = false) {
		let s = this;
		var id = s.nowIndex;
		var m = GGlobal.modelguanxian;

		s.btnLeft.visible = id > 1;
		s.btnRight.visible = id < s.maxLen;
		var lib = Config.guanxian_701[id];
		s.lbGuanxian.text = Model_GuanXian.getJiangXianStrNoJie(id);
		if (lib["name"] == "无") s.lbJS.text = "";
		else s.lbJS.text = ConfigHelp.NumberToChinese(id - 1) + "阶";
		if (val) return;
		var att = JSON.parse(lib["attr"]);
		var award = lib["award"];
		s.showGrid(award);
		s.barExp.max = lib["lvup"];
		var max = lib["lvup"];
		if (max != 0) {
			s.barExp.value = m.gongxun;
			s.barExp.text = m.gongxun + "/" + lib["lvup"];
		} else {
			s.barExp.max = 1;
			s.barExp.value = 1;
			s.barExp._titleObject.text = "已满级";
			s.lbGongxun.grayed = true;
			s.isfull = true;
		}
		s.btnLvUp.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANXIAN, 0);
	}

	protected showGrid(awards) {
		if (awards == "0") return;
		awards = JSON.parse(awards);
		this.awards = ConfigHelp.makeItemListArr(awards);
		this.itemList.numItems = this.awards.length;
	}

	private isfull = false;
	private levelUp(e) {
		if (this.isfull) {
			ViewCommonWarn.text("已满级");
		} else if (this.barExp.value < this.barExp.max) {
			// ViewCommonWarn.text("功勋不足");
			View_CaiLiao_GetPanel.show(VoItem.create(7));
		} else {
			GGlobal.modelguanxian.csLvlUpGX();
		}
	}

	private onCloseHandler(e) {
		GGlobal.layerMgr.close(UIConst.GUANXIAN);
	}

	public onOpen() {
		let s = this;
		var c = Model_player.voMine.country;
		if (c > 0) {
			s.btnContry.visible = true;
			s.btnContry.icon = CommonManager.getUrl("rebirth", "country" + c);
		} else {
			s.btnContry.visible = false;
		}
		IconUtil.setImg(s.backbg0, Enum_Path.BACK_URL + "c_bg1.jpg");
		IconUtil.setImg(s.backbg1, Enum_Path.BACK_URL + "c_bg1.jpg");
		GGlobal.modelguanxian.csGuanxian();
		s.btnLvUp.addClickListener(s.levelUp, s);
		s.btnLeft.addClickListener(s.onPagel, s);
		s.btnRight.addClickListener(s.onPager, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GXINIT, s.setdata, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GXUPDATE, s.levelUpBack, s);
	}

	public onClose() {
		let s = this;
		IconUtil.setImg(s.backbg0, null);
		IconUtil.setImg(s.backbg1, null);
		this.itemList.numItems = 0;
		s.btnLvUp.removeClickListener(s.levelUp, s);
		s.btnLeft.removeClickListener(s.onPagel, s);
		s.btnRight.removeClickListener(s.onPager, s);
		GGlobal.control.remove(Enum_MsgType.MSG_GXINIT, s.setdata, s);
		GGlobal.control.remove(Enum_MsgType.MSG_GXUPDATE, s.levelUpBack, s);
	}
}