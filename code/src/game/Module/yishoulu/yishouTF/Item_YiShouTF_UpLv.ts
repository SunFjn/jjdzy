class Item_YiShouTF_UpLv extends fairygui.GComponent implements IPanel {

	public list: fairygui.GList;
	public labPower: fairygui.GLabel;
	public curGrid: YiShouEquipGrid;
	public curGrid0: YiShouEquipGrid;
	public nextGrid: YiShouEquipGrid;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public labUp: fairygui.GLabel;
	public boxNeed: ViewResource;
	public levelLb: fairygui.GLabel;
	public labNeedName: fairygui.GRichTextField;
	public skillLb: fairygui.GRichTextField;
	public btnOnekey: Button1;
	public btnUp: Button1;
	public promptLb: fairygui.GRichTextField;
	public gridGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public upGroup: fairygui.GGroup;
	public maxLb: fairygui.GRichTextField;
	public maxLb0: fairygui.GRichTextField;
	public skillNeedLb: fairygui.GRichTextField;
	public skillIcon: fairygui.GLoader;
	public skillName: fairygui.GRichTextField;
	public equipArr: YiShouEquipGrid[] = [];
	public attGroup: fairygui.GGroup;

	public static URL: string = "ui://7y83phvnvxvaw";
	public static createInstance(): Item_YiShouTF_UpLv {
		return <Item_YiShouTF_UpLv><any>(fairygui.UIPackage.createObject("YiShouLu", "Item_YiShouTF_UpLv"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.equipArr = [self["grid0"], self["grid1"], self["grid2"], self["grid3"]];
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
	}

	public initView() {
	}

	private renderHandler(index: number, grid: YiShouLuGrid): void {
		let self = this;
		grid.choose(false);
		grid.setTFVo(Model_YiShouLu.dataArr[index]);

	}

	public updateShow() {
		let self = this;
		for (let i = 0; i < self.list._children.length; i++) {
			let grid = self.list._children[i] as YiShouLuGrid;
			if (grid.vo.cfg.tianfu == 1) {
				if (self.selectIndex == 0) {
					grid.checkNotice(Model_YiShouLu.checkTFLvYiShouNotice(Model_YiShouLu.dataArr[i]));
				} else {
					grid.checkNotice(Model_YiShouLu.checkTFColorYiShouNotice(Model_YiShouLu.dataArr[i]));
				}
			} else {
				grid.checkNotice(false);
			}
		}
		if (!self.curYiShou) {
			self.curYiShou = self.list._children[0] as YiShouLuGrid;
			self.curYiShou.choose(true);
		}
		let vo = self.curYiShou.vo;
		for (let i = 0; i < self.equipArr.length; i++) {
			if (i < vo.equipArr.length) {
				self.equipArr[i].setShowImg(true);
				self.equipArr[i].touchable = true;
				self.equipArr[i].setVo(vo.equipArr[i], self.selectIndex);
				if (self.selectIndex == 0) {
					self.equipArr[i].checkNotice(Model_YiShouLu.checkTFLvGridNotice(vo, vo.equipArr[i]));
				} else {
					self.equipArr[i].checkNotice(Model_YiShouLu.checkTFColorGridNotice(vo, vo.equipArr[i]));
				}
			} else {
				self.equipArr[i].setVo(null, self.selectIndex);
				self.equipArr[i].touchable = false;
			}
		}
		if (self.selectIndex == 1) {
			self.updateColorGrid();
		} else {
			self.updateLevelGrid();
		}
		self.updateSkillShow();
	}

	private updateColorGrid() {
		let self = this;
		let vo = self.curYiShou.vo;
		if (!self.curEquip) {
			self.equipArr[0].setChoose(true);
			self.curEquip = self.equipArr[0];
		}
		self.labUp.text = "升品属性";
		let curVo: Vo_YiShouEquip = self.curEquip.vo;
		if (curVo.colorcfg.xyp > 0) {
			self.gridGroup.visible = true;
			self.maxGroup.visible = self.curGrid0.visible = false;
			self.curGrid.setVo(curVo, self.selectIndex);
			let nextVo = Vo_YiShouEquip.create(curVo.cfg.id);
			nextVo.jie = curVo.jie;
			nextVo.level = curVo.level;
			nextVo.setColor(curVo.colorcfg.xyp);
			self.nextGrid.setVo(nextVo, self.selectIndex);
			let curcfg = curVo.colorcfg;
			let nextcfg = Config.ystfsp_752[curVo.colorcfg.xyp];
			if (curVo.level % 1000 == 0) {
				self.labAttrMax.visible = self.upGroup.visible = false;
				self.attGroup.visible = self.promptLb.visible = true;
				self.promptLb.text = ConfigHelp.reTxt("需激活" + curVo.cfg.mingzi);

				self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(1));
				self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(2), Color.getColorStr(2));
			} else if (curVo.colorcfg.zl == 0) {
				self.promptLb.visible = self.attGroup.visible = false;
				self.upGroup.visible = self.labAttrMax.visible = true;
				self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(2));
			} else {
				if (curVo.levelcfg.power == 0) {
					self.upGroup.visible = false;
					self.promptLb.visible = true;
					self.promptLb.text = "需激活当前天赋装备";
				} else {
					self.upGroup.visible = true;
					self.promptLb.visible = false;
				}
				self.attGroup.visible = true;
				self.labAttrMax.visible = false;
				self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(1));
				self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(2), Color.getColorStr(2));
			}
			let costArr = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xh));
			let count = Model_Bag.getItemCount(costArr[0].id);
			self.labNeedName.text = costArr[0].name;
			self.labNeedName.color = costArr[0].qColor;
			self.boxNeed.setImgUrl(costArr[0].icon);
			self.boxNeed.setLb(count, costArr[0].count);
			self.btnOnekey.checkNotice = count >= costArr[0].count;
			self.costVo = costArr[0] as VoItem;
		} else {

			self.maxGroup.visible = self.labAttrMax.visible = self.curGrid0.visible = true;
			self.promptLb.visible = self.upGroup.visible = self.attGroup.visible = self.gridGroup.visible = false;
			self.curGrid0.setVo(curVo, self.selectIndex);
			let curcfg = curVo.colorcfg;
			self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.maxLb.text = "已满品";
		}
		self.labPower.text = curVo.colorcfg.zl + "";
		self.btnOnekey.text = "升品";
	}

	private costVo: VoItem;
	private updateLevelGrid() {
		let self = this;
		let vo = self.curYiShou.vo;
		self.gridGroup.visible = false;
		self.curGrid0.visible = true;
		self.labUp.text = "升级属性";
		if (!self.curEquip) {
			self.equipArr[0].setChoose(true);
			self.curEquip = self.equipArr[0];
		}
		let curVo: Vo_YiShouEquip = self.curEquip.vo;
		self.curGrid0.setVo(curVo, self.selectIndex);
		let curcfg = curVo.levelcfg;
		self.labPower.text = curcfg.power + "";
		self.promptLb.visible = false;
		if (curcfg.xj > 0) {
			self.attGroup.visible = self.curGrid0.visible = true;
			self.maxGroup.visible = self.labAttrMax.visible = self.gridGroup.visible = false;
			let nextcfg = Config.ystfsj_752[curcfg.xj];
			self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			if (vo.lvUpId % 1000 == 0) {
				self.upGroup.visible = false;
				self.promptLb.visible = true;
				self.promptLb.text = ConfigHelp.reTxt("需激活异兽" + vo.cfg.mingzi);
			} else if (nextcfg.tj > vo.skillLv % 1000) {
				let skillcfg = Config.ystf_752[vo.skillLv];
				self.upGroup.visible = false;
				self.promptLb.visible = true;
				self.promptLb.text = ConfigHelp.reTxt("天赋·{0}达到{1}级可继续升级", skillcfg.mz, nextcfg.tj);
			} else {
				let itemVo: IGridImpl;
				if (curcfg.power == 0) {
					self.labAttrMax.visible = true;
					self.attGroup.visible = false;
					self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
				}
				self.upGroup.visible = true;
				if (curcfg.jinjie) {
					itemVo = VoItem.create(curVo.cfg.daoju);
					itemVo.count = JSON.parse(curcfg.xiaohao)[0][2];
					if (curcfg.power <= 0) {
						self.btnOnekey.text = "激活";
					} else {
						self.btnOnekey.text = "升阶";
					}
				} else {
					itemVo = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xiaohao))[0]
					self.btnOnekey.text = "升级";
				}
				let count = Model_Bag.getItemCount(itemVo.id);
				self.labNeedName.text = itemVo.name;
				self.labNeedName.color = itemVo.qColor;
				self.boxNeed.setImgUrl(itemVo.icon);
				self.boxNeed.setLb(count, itemVo.count);
				self.btnOnekey.checkNotice = count >= itemVo.count;
				self.costVo = itemVo as VoItem;
			}
		} else {
			self.maxGroup.visible = self.labAttrMax.visible = self.curGrid0.visible = true;
			self.upGroup.visible = self.attGroup.visible = self.gridGroup.visible = false;
			self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.maxLb.text = "已满阶";
		}
	}

	private updateSkillShow() {
		let self = this;
		let vo = self.curYiShou.vo;
		IconUtil.setImg(self.skillIcon, Enum_Path.YISHOULU_URL + "skill" + vo.ysId + ".png");
		let cfg = Config.ystf_752[vo.skillLv];
		let nextcfg;
		self.skillName.text = cfg.mz;
		self.levelLb.text = "天赋·" + cfg.mz + "(" + vo.skillLv % 1000 + "级)";
		let skillStr = "";
		let attArr = JSON.parse(cfg.sx);
		if (cfg.xj > 0) {
			nextcfg = Config.ystf_752[cfg.xj]
			let attArr1 = JSON.parse(nextcfg.sx);
			skillStr = Vo_attr.getAttrName(attArr[0][0]) + "+" + self.getShuXing(attArr[0][0], attArr[0][1]) +
				HtmlUtil.fontNoSize("(+" + self.getShuXing(attArr1[0][0], (attArr1[0][1] - attArr[0][1])) + ")", Color.getColorStr(2));
			let index = 0;
			let tiaoJianArr = JSON.parse(cfg.tj);
			for (let i = 0; i < tiaoJianArr.length; i++) {
				let grid = self.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
				if (grid.vo.level >= tiaoJianArr[i][1]) {
					index++;
				}
			}
			self.maxLb0.visible = false;
			self.btnUp.visible = true;
			if (index >= tiaoJianArr.length) {
				self.skillNeedLb.visible = false;
				self.btnUp.checkNotice = self.btnUp.visible = true;
			} else {
				self.skillNeedLb.visible = true;
				self.btnUp.checkNotice = self.btnUp.visible = false;
				self.skillNeedLb.text = ConfigHelp.reTxt("所有部位达到{0}阶", Math.floor((tiaoJianArr[0][1] % 1000) / 10));
			}
		} else {
			self.maxLb0.visible = true;
			self.skillNeedLb.visible = self.btnUp.visible = false;
			skillStr = Vo_attr.getAttrName(attArr[0][0]) + "+" + self.getShuXing(attArr[0][0], attArr[0][1]);
		}
		switch (attArr[0][0]) {
			case 309:
				skillStr += "点"
				break;
			case 310:
				skillStr += "毫秒"
				break;
			case 311:
				skillStr += ""
				break;
			case 312:
				skillStr += "毫秒"
				break;
		}
		if (nextcfg) {
			skillStr += "\n升级属性+" + cfg.sj / 100 + "‰" + HtmlUtil.fontNoSize("(+" + (nextcfg.sj - cfg.sj) / 100 + "‰)", Color.getColorStr(2))
				+ "\n升品属性+" + cfg.sp / 100 + "‰" + HtmlUtil.fontNoSize("(+" + (nextcfg.sp - cfg.sp) / 100 + "‰)", Color.getColorStr(2));
		} else {
			skillStr += "\n升级属性+" + cfg.sj / 100 + "‰\n升品属性+" + cfg.sp / 100 + "‰";
		}
		self.skillLb.text = skillStr;
	}

	private getShuXing(id: number, value: number) {
		let type = Config.jssx_002[id].type;
		let val: string = "";
		switch (type) {
			case 1:
			case 3:
				val = value + "";
				break;
			case 2:
				val = (value / 100) + "‰";
				break;
		}
		return val;
	}

	private curYiShou: YiShouLuGrid;
	private onList(evt: fairygui.ItemEvent) {
		let self = this;
		let item = evt.itemObject as YiShouLuGrid;
		if (!item.vo.cfg.tianfu) {
			item.choose(false);
			ViewCommonWarn.text("暂未开放");
			return;
		}
		if (self.curYiShou.hashCode == item.hashCode) return;
		if (self.curYiShou) self.curYiShou.choose(false);
		item.choose(true);
		self.curYiShou = item;
		self.curGrid.vo = null;
		self.curGrid0.vo = null;
		if (self.curEquip) self.curEquip.setChoose(false);
		self.curEquip = null;
		self.updateShow();
	}

	private onBtnOneKey() {
		let self = this;
		if (self.btnOnekey.checkNotice) {
			if (self.selectIndex == 0) {
				GGlobal.modelYiShouLu.CG_YISHOUTF_EQUIP_UPLV(self.curYiShou.vo.ysId, self.curEquip.vo.cfg.id)
			} else {
				GGlobal.modelYiShouLu.CG_YISHOUTF_EQUIP_UPCOLOR(self.curYiShou.vo.ysId, self.curEquip.vo.cfg.id);
			}
		} else {
			View_CaiLiao_GetPanel.show(self.costVo);
		}
	}

	private OnUpSKillLv() {
		let self = this;
		if (self.btnUp.checkNotice) {
			GGlobal.modelYiShouLu.CG_YISHOUTF_UPSKILLLV(self.curYiShou.vo.ysId);
		}
	}

	private curEquip: YiShouEquipGrid
	private onEquip(evt: egret.TouchEvent) {
		let self = this;
		let equip = evt.target as YiShouEquipGrid;
		if (self.curEquip && equip.data == self.curEquip.data) return;
		if (self.curEquip) self.curEquip.setChoose(false);
		equip.setChoose(true);
		self.curEquip = equip;
		if (self.selectIndex == 0) {
			self.updateLevelGrid();
		} else {
			self.updateColorGrid();
		}
	}

	private updateList() {
		let self = this;
		if (Model_YiShouLu.dataArr.length > 0) {
			self.list.numItems = Model_YiShouLu.dataArr.length;
			self.updateShow();
			GGlobal.control.remove(UIConst.YISHOULU, self.updateList, self);
		}
	}

	private selectIndex = 0;
	openPanel(pData?: any) {
		let self = this;
		self.selectIndex = pData;
		if (Model_YiShouLu.dataArr.length > 0) {
			self.list.numItems = Model_YiShouLu.dataArr.length;
			self.updateShow();
		} else {
			GGlobal.control.listen(UIConst.YISHOULU, self.updateList, self);
		}
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onList, self);
		GGlobal.reddot.listen(UIConst.YISHOULU_TF, self.updateShow, self);
		self.btnOnekey.addClickListener(self.onBtnOneKey, self);
		self.btnUp.addClickListener(self.OnUpSKillLv, self);
		for (let i = 0; i < self.equipArr.length; i++) {
			self.equipArr[i].data = i;
			self.equipArr[i].addClickListener(self.onEquip, self);
		}
	}

	closePanel(pData?: any) {
		let self = this;
		self.list.numItems = 0;
		if (self.curGrid) self.curGrid.clean();
		if (self.curGrid0) self.curGrid0.clean();
		if (self.nextGrid) self.nextGrid.clean();
		if (self.curYiShou) self.curYiShou.clean();
		self.curYiShou = null;
		if (self.curEquip) self.curEquip.setChoose(false);
		self.curEquip = null;
		for (let i = 0; i < self.equipArr.length; i++) {
			self.equipArr[i].removeClickListener(self.onEquip, self);
			self.equipArr[i].clean();
		}
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onList, self);
		GGlobal.reddot.remove(UIConst.YISHOULU_TF, self.updateShow, self);
		self.btnOnekey.removeClickListener(self.onBtnOneKey, self);
		self.btnUp.removeClickListener(self.OnUpSKillLv, self);
		GGlobal.control.remove(UIConst.YISHOULU, self.updateList, self);
	}
}