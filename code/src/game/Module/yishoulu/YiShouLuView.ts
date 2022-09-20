/**
 * 异兽录主界面
 */
class YiShouLuView extends fairygui.GComponent implements IPanel {
	public item0: YiShouLuGrid;
	public item1: YiShouLuGrid;
	public item2: YiShouLuGrid;
	public item3: YiShouLuGrid;
	public item4: YiShouLuGrid;
	public item5: YiShouLuGrid;
	public item6: YiShouLuGrid;
	public item7: YiShouLuGrid;
	public powerLb: fairygui.GLabel;
	public suitName: fairygui.GTextField;
	public suitLv: fairygui.GTextField;
	public c1: fairygui.Controller;
	private gridArr: YiShouLuGrid[];
	private selectGrid: YiShouLuGrid;
	public activateBtn: Button1;
	public lvUpBtn: Button0;
	public oneKeyLvUpBtn: Button1;
	public labAttrAct: fairygui.GRichTextField;
	public costLb: fairygui.GRichTextField;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrCur1: fairygui.GRichTextField;
	public labAttrNext1: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public labEffAct: fairygui.GRichTextField;
	public curEffTitle: fairygui.GTextField;
	public labEffCur: fairygui.GRichTextField;
	public nextEffTitle: fairygui.GTextField;
	public labEffNext: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public jinjieBtn: Button1;
	public showBt: Button2;
	public itemName: fairygui.GTextField;
	public itemName1: fairygui.GTextField;
	public vres1: ViewResource;
	public vres2: ViewResource;
	public lvTxt: fairygui.GTextField;
	public effTitle: fairygui.GTextField;
	public hasActGroup: fairygui.GGroup;
	public noActGroup: fairygui.GGroup;
	public iconImg: fairygui.GLoader;
	public nameLb: fairygui.GLabel;
	public backImg: fairygui.GLoader;

	public constructor() {
		super();
	}

	public static URL: string = "ui://7y83phvni1zv1";
	public static createInstance(): YiShouLuView {
		return <YiShouLuView><any>(fairygui.UIPackage.createObject("YiShouLu", "YiShouLuView"));
	}


	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onShown();
	}

	closePanel(pData?: any) {
		this.onHide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	protected onShown() {
		let self = this;
		IconUtil.setImg(self.backImg, Enum_Path.YISHOULU_URL + "back_7120.png");
		self.gridArr = [];
		for (var i = 0; i < 8; i++) {
			self.gridArr.push(self["item" + i]);
			self.gridArr[i].name = "" + i;
			self.gridArr[i].choose(false);
		}
		self.vres1.setType(0);
		self.vres2.setType(0);
		self.addListen();
	}

	protected onHide() {
		let self = this;
		IconUtil.setImg(self.backImg, null);
		self.removeListen();
		self.selectGrid = null;
	}

	/**
	 * 添加事件
	 */
	public addListen(): void {
		let self = this;
		for (var i = 0; i < 8; i++) {
			self.gridArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
		}
		if (Model_YiShouLu.dataArr.length > 0) {
			self.updatePage();
		}
		self.activateBtn.addClickListener(this.onActivate, this);
		self.lvUpBtn.addClickListener(this.onLvUp, this);
		self.oneKeyLvUpBtn.addClickListener(this.onOneKeyLvUp, this);
		self.jinjieBtn.addClickListener(this.onJinJie, this);
		self.showBt.addClickListener(self.showHandler, self);
		GGlobal.control.listen(UIConst.YISHOULU, self.updatePage, self);
	}

	/**
	 * 删除事件
	 */
	public removeListen(): void {
		let self = this;
		for (var i = 0; i < 8; i++) {
			self.gridArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
		}
		self.activateBtn.removeClickListener(this.onActivate, this);
		self.lvUpBtn.removeClickListener(this.onLvUp, this);
		self.oneKeyLvUpBtn.removeClickListener(this.onOneKeyLvUp, this);
		self.jinjieBtn.removeClickListener(this.onJinJie, this);
		self.showBt.removeClickListener(self.showHandler, self);
		GGlobal.control.remove(UIConst.YISHOULU, self.updatePage, self);
	}

	/**
	 * 更新数据
	 */
	public updatePage(data: Vo_YSLData = null) {
		if (!Model_YiShouLu.dataArr || Model_YiShouLu.dataArr.length <= 0) return;

		let self = this;
		if (data) {
			let oldData: Vo_YSLData = self.gridArr[Model_YiShouLu.index].vo;
			if (oldData.suitId != data.suitId) {
				let cfg: Iystz_752 = Config.ystz_752[data.suitId];
				let lv: number = cfg.lv % 1000;
				ViewCommonWarn.text("激活" + cfg.mingzi + lv + "级");
			}
		}
		for (var i = 0; i < 8; i++) {
			self.gridArr[i].setVo(Model_YiShouLu.dataArr[i], i);
		}

		if (self.selectGrid) {
			var index = Number(self.selectGrid.name);
			self.selectIndex(index);
		} else {
			self.selectIndex(0);
		}
	}

	private onSelectGrid(e: egret.TouchEvent): void {
		let self = this;
		var index = Number(e.currentTarget.name);
		if (index == parseInt(self.selectGrid.name)) return;
		self.selectIndex(index);
	}

	/**
	 * 更新某个item数据
	 */
	public selectIndex(index: number): void {
		var self = this;
		if (self.selectGrid) {
			self.selectGrid.choose(false);
			self.selectGrid = null;
		}
		if (index < 0) {
			return;
		}
		self.selectGrid = self.gridArr[index];
		if (!self.selectGrid.vo) return;

		let costArr;
		let itemVo: VoItem;
		IconUtil.setImg(self.iconImg, Enum_Path.PIC_URL + self.selectGrid.vo.cfg.tupian1 + ".png");
		costArr = JSON.parse(self.selectGrid.vo.cfg.jihuo);
		itemVo = VoItem.create(costArr[0][1]);
		self.nameLb.text = self.selectGrid.vo.cfg.mingzi;
		self.nameLb.color = Color.getColorInt(itemVo.quality);

		let curSuitCfg: Iystz_752;
		let nextSuitCfg: Iystz_752;
		self.hasActGroup.visible = false;
		self.noActGroup.visible = false;
		if (self.selectGrid.vo.suitId <= 0)//异兽套装未激活
		{
			self.noActGroup.visible = true;
			let id: number = (index + 1) * 1000 + 1;
			nextSuitCfg = Config.ystz_752[id];
			self.effTitle.text = "下级效果（" + nextSuitCfg.jieshu + "）";
			self.labEffAct.text = nextSuitCfg.miaoshu;
			self.suitName.text = nextSuitCfg.mingzi;
			self.suitLv.text = "0级";
		} else {
			curSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId];
			nextSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId + 1];
			if (nextSuitCfg)//已激活
			{
				self.hasActGroup.visible = true;
				self.curEffTitle.text = "当前效果";
				self.labEffCur.text = curSuitCfg.miaoshu;
				self.nextEffTitle.text = "下级效果（" + nextSuitCfg.jieshu + "）";
				self.labEffNext.text = nextSuitCfg.miaoshu;
			} else {//满级
				self.noActGroup.visible = true;
				curSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId];
				self.effTitle.text = "当前效果（已满级）";
				self.labEffAct.text = curSuitCfg.miaoshu;
			}
			self.suitName.text = curSuitCfg.mingzi;
			self.suitLv.text = curSuitCfg.lv % (1000 * (index + 1)) + "级";
		}

		let attArr0 = [];
		let attArr1 = [];
		let curLvCfg: Iyssj_752 = Config.yssj_752[self.selectGrid.vo.lvUpId];
		let nextLvCfg: Iyssj_752 = Config.yssj_752[curLvCfg.next];
		self.selectGrid.choose(true);
		let count: number;
		if (self.selectGrid.vo.lvUpId == (100000 * (index + 1)))//未激活
		{
			self.c1.selectedIndex = 0;

			attArr0 = JSON.parse(nextLvCfg.attr);
			self.labAttrAct.text = ConfigHelp.attrString(attArr0, "+", Color.GREENSTR, Color.GREENSTR);
			costArr = JSON.parse(curLvCfg.jj);
			itemVo = VoItem.create(costArr[0][1]);
			count = Model_Bag.getItemCount(costArr[0][1]);
			let color = count >= costArr[0][2] ? 2 : 6;
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "x" + costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(color));

			self.activateBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);
		} else {
			if (nextLvCfg)//已激活
			{
				if (self.selectGrid.vo.exp >= curLvCfg.exp && curLvCfg.jj != 0)//进阶
				{
					self.c1.selectedIndex = 2;
					self.jinjieBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);

					costArr = JSON.parse(curLvCfg.jj);
					itemVo = VoItem.create(costArr[0][1]);
					self.vres2.setImgUrl(itemVo.icon);
					count = Model_Bag.getItemCount(costArr[0][1]);
					self.vres2.setLb(count, costArr[0][2]);
					self.itemName1.text = itemVo.name;
					attArr0 = JSON.parse(curLvCfg.attr);
					self.labAttrCur1.text = ConfigHelp.attrString(attArr0, "+", Color.WHITESTR, Color.WHITESTR);
					attArr1 = JSON.parse(nextLvCfg.attr);
					self.labAttrNext1.text = ConfigHelp.attrString(attArr1, "+", Color.GREENSTR, Color.GREENSTR);
				} else {
					self.c1.selectedIndex = 1;
					self.expBar.max = curLvCfg.exp;
					self.expBar.value = self.selectGrid.vo.exp;
					self.oneKeyLvUpBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);

					itemVo = VoItem.create(410092);
					self.vres1.setImgUrl(itemVo.icon);
					count = Model_Bag.getItemCount(410092);
					self.vres1.setCount(count);
					self.itemName.text = itemVo.name;

					let jie: number = self.selectGrid.vo.jie;
					let lv: number = curLvCfg.lv % 10;
					self.lvTxt.text = jie + "阶" + lv + "级";

					attArr0 = JSON.parse(curLvCfg.attr);
					self.labAttrCur.text = ConfigHelp.attrString(attArr0, "+", Color.WHITESTR, Color.WHITESTR);
					attArr1 = JSON.parse(nextLvCfg.attr);
					self.labAttrNext.text = ConfigHelp.attrString(attArr1, "+", Color.GREENSTR, Color.GREENSTR);
				}
			} else {//满级
				self.c1.selectedIndex = 3;
				attArr0 = JSON.parse(curLvCfg.attr);
				self.labAttrMax.text = ConfigHelp.attrString(attArr0, "+", Color.GREENSTR, Color.GREENSTR);
			}
		}
		let suitPower: number = 0;
		if (curSuitCfg) {
			suitPower = curSuitCfg.power;
		}
		self.powerLb.text = curLvCfg.power + suitPower + "";
	}

	/**
	 * 激活
	 */
	private onActivate() {
		var self = this;
		let lvCfg: Iyssj_752 = Config.yssj_752[self.selectGrid.vo.lvUpId];
		let costArr: Array<any> = JSON.parse(lvCfg.jj);
		var count = Model_Bag.getItemCount(costArr[0][1]);
		if (count < costArr[0][2]) {
			View_CaiLiao_GetPanel.show(VoItem.create(costArr[0][1]));
			return;
		}
		GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(self.selectGrid.vo.ysId, 0, self.selectGrid.index);
	}

	/**
	 * 升级
	 */
	private onLvUp() {
		var count = Model_Bag.getItemCount(410092);
		if (count < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(410092));
			return;
		}
		GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 1, this.selectGrid.index);
	}

	/**
	 * 一键升级
	 */
	private onOneKeyLvUp() {
		var count = Model_Bag.getItemCount(410092);
		if (count < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(410092));
			return;
		}
		GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 2, this.selectGrid.index);
	}

	/**
	 * 进阶
	 */
	private onJinJie() {
		var self = this;
		let cfg: Iyssj_752 = Config.yssj_752[self.selectGrid.vo.lvUpId];
		let costArr = JSON.parse(cfg.jj);
		var count = Model_Bag.getItemCount(costArr[0][1]);
		if (count < costArr[0][2]) {
			View_CaiLiao_GetPanel.show(VoItem.create(costArr[0][1]));
			return;
		}
		GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 2, self.selectGrid.index);
	}

	/**
	 * 展示
	 */
	private showHandler() {
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(14, this.selectGrid.vo.cfg.id);
	}
}