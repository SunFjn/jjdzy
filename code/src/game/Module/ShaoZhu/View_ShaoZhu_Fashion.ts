class View_ShaoZhu_Fashion extends UIModalPanel {

	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public labStar: fairygui.GTextField;
	public fashionList: fairygui.GList;
	public pageLeft: fairygui.GButton;
	public pageRight: fairygui.GButton;
	public labAttrMax: fairygui.GRichTextField;
	public labAttrCur: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public labAttrNext: fairygui.GRichTextField;
	public costLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public MRLb: fairygui.GRichTextField;
	public costGroup: fairygui.GGroup;
	public boxMax: fairygui.GGroup;
	public attGroup: fairygui.GGroup;
	public equipBt: Button2;
	public upBt: Button4;
	public modelIcon: fairygui.GLoader;

	public static URL: string = "ui://p83wyb2bng03r";

	public constructor() {
		super();
		View_ShaoZhu_Panel.setExtends();
		this.loadRes("ShaoZhu", "ShaoZhu_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("ShaoZhu");
		self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_Fashion").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.fashionList.callbackThisObj = self;
		self.fashionList.itemRenderer = self.fashionRenderHandler;
		super.childrenCreated();
		CommonManager.listPageChange("View_ShaoZhu_Fashion", self.list, self.pageLeft, self.pageRight, 3);
		self.equipBt.addClickListener(self.EquipHandler, self);
		self.upBt.addClickListener(self.upHandler, self);
	}

	private upHandler() {
		let self = this;
		if (self.upBt.checkNotice) {
			GGlobal.modelShaoZhu.CG_UPFASHION_SHAOZHU_5107(self.curItem.vo.id);
		} else {
			let costArr = self.curItem.vo.conmuse;
			let itemVo = VoItem.create(costArr[0][1]);
			View_CaiLiao_GetPanel.show(itemVo);
		}
	}

	private EquipHandler() {
		let self = this;
		GGlobal.modelShaoZhu.CG_EQUIP_FASHION_SHAOZHU_5111(self.curGrid.vo.shaozhuID, self.curItem.bodyID);
	}

	private fashionRenderHandler(index: number, obj: ItemShaoZhuFashion) {
		let self = this;
		let vo = self.curGrid.vo
		if (index == 0) {
			obj.setVo(null, vo);
		} else if (index <= self.curGrid.vo.bodyArr.length) {
			obj.setVo(self.curGrid.vo.bodyArr[index - 1], vo);
		} else {
			obj.setVo(null);
		}
	}

	private renderHandler(index: number, obj: ShaoZhuGrid) {
		let self = this;
		obj.setVo(GGlobal.modelShaoZhu.shaoZhuArr[index]);
		obj.noticeImg.visible = GGlobal.modelShaoZhu.checkFashionNotice(GGlobal.modelShaoZhu.shaoZhuArr[index])
	}

	public updateShow() {
		let self = this;
		self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
		self.updateShaoZhu();
	}

	private curGrid: ShaoZhuGrid;
	public updateShaoZhu() {
		let self = this;
		if (!self.curGrid) {
			if (self._args) {
				for (let i = 0; i < self.list._children.length; i++) {
					let shaozhuGrid: ShaoZhuGrid = self.list._children[i] as ShaoZhuGrid;
					let shozhuVo: Vo_ShaoZhu = self._args;
					if (shaozhuGrid.vo.shaozhuID == shozhuVo.shaozhuID) {
						self.curGrid = this.list._children[i] as ShaoZhuGrid;
						break;
					}
				}
			} else {
				self.curGrid = this.list._children[0] as ShaoZhuGrid;
			}
			self.curGrid.choose(true);
		}
		if (!self.curGrid) return;
		self.fashionList.numItems = self.curGrid.vo.bodyArr.length + 2;
		self.updateFashionShow();
	}

	private curItem: ItemShaoZhuFashion;
	public updateFashionShow() {
		let self = this;
		if (!self.curItem) {
			if (self._args) {
				for (let i = 0; i < self.fashionList._children.length; i++) {
					let fashionGrid: ItemShaoZhuFashion = self.fashionList._children[i] as ItemShaoZhuFashion
					let shozhuVo: Vo_ShaoZhu = self._args;
					if (fashionGrid.bodyID == shozhuVo.bodyID) {
						self.curItem = fashionGrid;
						break;
					}
				}
			} else {
				self.curItem = self.fashionList._children[0] as ItemShaoZhuFashion;
			}
		}
		self._args = null;
		if (!self.curItem) return;
		self.curItem.choose(true);
		let vo = self.curItem.vo;
		let shaozhuVo = self.curGrid.vo;
		let model = 0;
		if (!vo) {
			self.powerLb.text = "0";
			self.labStar.visible = false;
			self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = false;
			self.promptLb.visible = self.labAttrMax.visible = self.boxMax.visible = false;
			self.MRLb.visible = true;
			model = shaozhuVo.cfg.zs;
			self.equipBt.visible = shaozhuVo.starLv > 0;
			self.equipBt.icon = shaozhuVo.bodyID == 0 ? "ui://p83wyb2bng03t" : "ui://p83wyb2bng03s";
			self.equipBt.touchable = shaozhuVo.bodyID != 0;
		} else {
			self.powerLb.text = vo.getPower() + "";
			self.labStar.visible = true;
			self.labStar.text = ConfigHelp.getStarFontStr(vo.starLv);
			self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = self.MRLb.visible = self.promptLb.visible = self.labAttrMax.visible = self.boxMax.visible = false;
			model = vo.cfg.zs;
			if (shaozhuVo.starLv <= 0) {
				self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = false;
				self.labAttrMax.visible = self.promptLb.visible = true;
				self.promptLb.text = ConfigHelp.reTxt("需激活少主·{0}", [shaozhuVo.cfg.name]);
				self.labAttrMax.text = ConfigHelp.attrString(vo.attr, "+", Color.getColorStr(1), Color.getColorStr(2));
			} else {
				self.equipBt.icon = shaozhuVo.bodyID == vo.id ? "ui://p83wyb2bng03t" : "ui://p83wyb2bng03s";
				self.equipBt.touchable = shaozhuVo.bodyID != vo.id;
				self.equipBt.visible = vo.starLv > 0;
				self.upBt.text = vo.starLv > 0 ? "升星" : "激活";
				let curAttArr = [];
				let nextAttArr = [];
				if (vo.starLv >= vo.max) {
					for (let i = 0; i < vo.attr.length; i++) {
						curAttArr.push([vo.attr[i][0], vo.attr[i][1] * vo.starLv]);
					}
					self.labAttrMax.visible = self.boxMax.visible = true;
					self.costGroup.visible = false;
					self.labAttrMax.text = ConfigHelp.attrString(curAttArr, "+", Color.getColorStr(1), Color.getColorStr(2));
				} else if (vo.starLv <= 0) {
					self.boxMax.visible = false;
					self.labAttrMax.visible = self.costGroup.visible = true;
					self.labAttrMax.text = ConfigHelp.attrString(vo.attr, "+", Color.getColorStr(1), Color.getColorStr(2));
					self.updateCost();
				} else {
					for (let i = 0; i < vo.attr.length; i++) {
						curAttArr.push([vo.attr[i][0], vo.attr[i][1] * vo.starLv]);
						nextAttArr.push([vo.attr[i][0], vo.attr[i][1] * (vo.starLv + 1)]);
					}
					self.attGroup.visible = self.costGroup.visible = true;
					self.labAttrCur.text = ConfigHelp.attrString(curAttArr, "+", Color.getColorStr(1), Color.getColorStr(1));
					self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", Color.getColorStr(2), Color.getColorStr(2));
					self.updateCost();
				}
			}
		}
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		if (!self.awatar) {
			self.awatar = EffectMgr.addEff("uieff/" + model, self.modelIcon.displayObject as fairygui.UIContainer,
				self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
		}
	}

	private updateCost() {
		let self = this;
		let costArr = self.curItem.vo.conmuse;
		let itemVo = VoItem.create(costArr[0][1]);
		let count = Model_Bag.getItemCount(costArr[0][1]);
		if (count >= costArr[0][2]) {
			self.upBt.checkNotice = true;
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "X" + costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(2));
		} else {
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "X" + costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(6));
			self.upBt.checkNotice = false;
		}
	}

	private listHandler(evt: fairygui.ItemEvent) {
		let self = this;
		let grid: ShaoZhuGrid = evt.itemObject as ShaoZhuGrid;
		if (self.curGrid && self.curGrid.vo && grid.vo.shaozhuID == self.curGrid.vo.shaozhuID) return;
		if (self.curGrid) {
			self.curGrid.choose(false);
			self.curGrid = null;
		}
		if (self.curItem) self.curItem.choose(false);
		self.curItem = null;
		grid.choose(true);
		self.curGrid = grid;

		self.updateShaoZhu();
	}

	private fashionListHandler(evt: fairygui.ItemEvent) {
		let self = this;
		let grid: ItemShaoZhuFashion = evt.itemObject as ItemShaoZhuFashion;
		if (!grid.vo && !grid.shaozhuVo) return;
		if ((self.curItem && self.curItem.vo && grid.vo && grid.vo.id == self.curItem.vo.id) || (!grid.vo && !self.curItem.vo)) return;
		if (self.curItem) {
			self.curItem.choose(false);
			self.curItem = null;
		}
		grid.choose(true);
		self.curItem = grid;
		self.updateFashionShow();
	}

	private awatar: Part;
	protected onShown(): void {
		let self = this;
		self.updateShow();
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
		self.fashionList.addEventListener(fairygui.ItemEvent.CLICK, self.fashionListHandler, self);
		GGlobal.reddot.listen(UIConst.SHAOZHU, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		self.list.numItems = 0;
		if (self.curItem) self.curItem.choose(false);
		if (self.curGrid) self.curGrid.choose(false);
		self.curItem = null;
		self.curGrid = null;
		GGlobal.layerMgr.close(UIConst.SHAOZHU_FASHION);
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
		self.fashionList.removeEventListener(fairygui.ItemEvent.CLICK, self.fashionListHandler, self);
		GGlobal.reddot.remove(UIConst.SHAOZHU, self.updateShow, self);
	}
}