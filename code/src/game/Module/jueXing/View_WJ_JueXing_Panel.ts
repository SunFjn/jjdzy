class View_WJ_JueXing_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public suitLb: fairygui.GRichTextField;
	public iconBt0: JueXingBt;
	public iconBt1: JueXingBt;
	public iconBt2: JueXingBt;
	public curLb: fairygui.GRichTextField;
	public attLb: fairygui.GRichTextField;
	public maxLb: fairygui.GRichTextField;
	public jxBt: Button4;
	public suitBt: Button2;
	public costLb: fairygui.GRichTextField;
	public costGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	private awatar: UIRole = null;

	public static URL: string = "ui://tbqdf7fdb8g14";

	public constructor() {
		super();
		this.setSkin("jueXing", "jueXing_atlas0", "View_WJ_JueXing_Panel");
	}
	protected setExtends() {
		const func = fairygui.UIObjectFactory.setPackageItemExtension;
		func(JueXingGrid.URL, JueXingGrid);
		func(JueXingBt.URL, JueXingBt);
		func(JueXingIconBt.URL, JueXingIconBt);
	}

	protected initView(): void {
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
		self.iconBt0.data = 0;
		self.iconBt1.data = 1;
		self.iconBt2.data = 2;
		self.iconBt0.addClickListener(self.iconHandler, self);
		self.iconBt1.addClickListener(self.iconHandler, self);
		self.iconBt2.addClickListener(self.iconHandler, self);
		self.jxBt.addClickListener(self.jueXingHandle, self);
		self.suitBt.addClickListener(self.openSuit, self);
	}

	private openSuit() {
		GGlobal.layerMgr.open(UIConst.JUEXING_SUIT, this.curGrid.vo);
	}

	private jueXingHandle() {
		let self = this;
		let vo = self.curGrid.vo
		if (self.jxBt.checkNotice) {
			let index = Model_JueXing.panelIDArr.indexOf(self.systemID);
			GGlobal.modeljx.CG_UPGRADE_JUEXING_821(index, vo.id, self.curBt.data + 1)
		} else {
			if (vo["skilllv" + self.curBt.data] % 1000 >= Config.jxzl_271[vo.quality * 100 + vo.suitLv].max) {
				ViewCommonWarn.text("已达升级上限，提升觉醒之力可提高上限");
			} else {
				View_CaiLiao_GetPanel.show(VoItem.create(self.curGrid.vo.costId));
			}
		}
	}

	private curBt: JueXingBt;
	private iconHandler(event: egret.TouchEvent) {
		let self = this;
		let bt = event.target as JueXingBt;
		if (self.curBt && self.curBt.hashCode == bt.hashCode) return;
		if (self.curBt) self.curBt.selected = false;
		self.curBt = null;
		bt.selected = true;
		self.curBt = bt;
		self.updateAttShow();
	}

	private curGrid: JueXingGrid;
	private listHandler(event: fairygui.ItemEvent): void {
		let self = this;
		let grid = event.itemObject as JueXingGrid;
		if (self.curGrid && self.curGrid.hashCode == grid.hashCode) return;
		if (self.curGrid) self.curGrid.choose = false;
		grid.choose = true;
		self.curGrid = grid;
		if (self.curBt) self.curBt.selected = false;
		self.curBt = null;
		self.updateGridShow();
	}

	private listArr: Vo_JueXing[] = [];
	private renderHandler(index: number, grid: JueXingGrid) {
		let self = this;
		grid.setVo(self.listArr[index]);
		grid.checkNotice = Model_JueXing.checkGridNotice(self.listArr[index]);
	}

	public updateShow() {
		let self = this;
		let index = Model_JueXing.panelIDArr.indexOf(self.systemID);
		self.listArr = Model_JueXing.jueXingData[index];
		self.updateListShow();
	}

	public updateListShow() {
		let self = this;
		self.list.numItems = self.listArr.length;
		self.updateGridShow();
	}

	private updateGridShow() {
		let self = this;
		if (!self.curGrid) {
			self.curGrid = self.list._children[0] as JueXingGrid;
			self.curGrid.choose = true;
		}
		let vo = self.curGrid.vo;
		if (!vo) return;
		self.nameLb.text = vo.name;
		var skillsArr = JSON.parse(vo.skills);
		var secSkill = skillsArr[1][0];
		const szInfo = Model_WuJiang.shiZhuanDic[vo.id];
		if (szInfo && szInfo.onSkinId) {
			var mx = Config.sz_739[szInfo.onSkinId].moxing;
			self.awatar.setBody(mx);
			self.awatar.setWeapon(szInfo.onSkinId);
		} else {
			self.awatar.setBody(vo.id);
			self.awatar.setWeapon(vo.id);
		}
		self.awatar.onAdd();
		self.iconBt0.text = "七杀  Lv." + vo.skilllv0 % 1000;
		self.iconBt1.text = "破军  Lv." + vo.skilllv1 % 1000;
		self.iconBt2.text = "贪狼  Lv." + vo.skilllv2 % 1000;
		self.iconBt0.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 0));
		self.iconBt1.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 1));
		self.iconBt2.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 2));
		if (!self.curBt) {
			self.curBt = self.iconBt0;
			self.curBt.selected = true;
		}
		self.updateAttShow();
		if (self.secSkill != secSkill) {
			self.secSkill = secSkill;
			Timer.instance.remove(self.playSkill, self);
			self.playSkill();
		}
	}

	private secSkill: number = 0;
	private playSkill() {
		let self = this;
		self.awatar.playSkillID(self.secSkill, false);
		Timer.instance.callLater(self.playSkill, 5000, self);
	}

	private updateAttShow() {
		let self = this;
		let vo = self.curGrid.vo;
		if (!vo) return;
		let suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
		let cfg = Config.jx_271[vo["skilllv" + self.curBt.data]];
		if (!cfg) return;
		let strArr = ["七杀", "破军", "贪狼"];
		self.curLb.text = "觉醒·" + strArr[self.curBt.data] + "  Lv." + vo["skilllv" + self.curBt.data] % 1000 + "/" + suitcfg.max;
		let attArr = JSON.parse(cfg.attr);
		let attStr: string = "";
		self.costGroup.visible = self.maxGroup.visible = true;

		if (cfg.next > 0) {
			let nextcfg = Config.jx_271[cfg.next];
			let nextArr = JSON.parse(nextcfg.attr);
			self.maxGroup.visible = false;
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+") + HtmlUtil.fontNoSize("(+" + nextArr[i][1] + ")", Color.getColorStr(2));
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+") + HtmlUtil.fontNoSize("(+" + nextArr[i][1] + ")", Color.getColorStr(2));
				}
			}
			let costItem = VoItem.create(vo.costId);
			let count = Model_Bag.getItemCount(vo.costId);
			let color = 0;
			if (count >= cfg.consume) {
				color = 2;
			} else {
				color = 6
			}
			self.jxBt.checkNotice = count >= cfg.consume && vo["skilllv" + self.curBt.data] % 1000 < suitcfg.max;
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(costItem.name, Color.getColorStr(costItem.quality)) + "x" + cfg.consume +
				HtmlUtil.fontNoSize("(" + count + "/" + cfg.consume + ")", Color.getColorStr(color));
		} else {
			attStr = ConfigHelp.attrString(attArr, "+", Color.getColorStr(1), Color.getColorStr(1));
			self.costGroup.visible = false;
		}
		self.attLb.text = attStr;
		self.maxLb.text = vo.suitLv + "阶觉醒之力提升觉醒技能等级上限：" + suitcfg.max;
		self.suitLb.text = vo.suitLv + "阶";
		self.powerLb.text = (Config.jx_271[vo.skilllv0].power + Config.jx_271[vo.skilllv1].power + Config.jx_271[vo.skilllv2].power) + "";
		let index: number = 0;
		if (suitcfg.lv != suitcfg.max) {
			if (vo.skilllv0 % 1000 >= suitcfg.max) {
				index++;
			}
			if (vo.skilllv1 % 1000 >= suitcfg.max) {
				index++;
			}
			if (vo.skilllv2 % 1000 >= suitcfg.max) {
				index++;
			}
		}
		self.suitBt.checkNotice = index >= 3;
	}

	systemID = 0;//武将 神将觉醒
	protected onShown(): void {
		let self = this;
		self.systemID = self._args;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(370, 426);
			self.awatar.setScaleXY(1.5, 1.5);
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
		}
		let index = Model_JueXing.panelIDArr.indexOf(self.systemID);
		if (index > 0) {
			Model_JueXing.getJueXingData(self.systemID);
			self.updateShow();
			GGlobal.reddot.listen(UIConst.JUEXING, self.updateShow, self);
		}
	}

	protected onHide(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		GGlobal.layerMgr.close(UIConst.JUEXING_WUJIANG);
		GGlobal.reddot.remove(UIConst.JUEXING, self.updateShow, self);
		if (GGlobal.layerMgr.lastPanelId <= 0) {
			GGlobal.layerMgr.open(self.systemID);
		}
		if (self.curBt) self.curBt.selected = false;
		self.curBt = null;
		if (self.curGrid) self.curGrid.choose = false;
		self.curGrid = null;
		self.list.numItems = 0;
		Timer.instance.remove(self.playSkill, self);
		self.secSkill = 0;
	}
}