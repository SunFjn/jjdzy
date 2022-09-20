class ViewGodEquipPanel extends fairygui.GComponent implements IPanel {

	//>>>>start
	public c1: fairygui.Controller;
	public g0: ViewGridRender;
	public g1: ViewGridRender;
	public g2: ViewGridRender;
	public g3: ViewGridRender;
	public g4: ViewGridRender;
	public g5: ViewGridRender;
	public g6: ViewGridRender;
	public g7: ViewGridRender;
	public g8: ViewGridRender;
	public g9: ViewGridRender;
	public labPart: fairygui.GTextField;
	public btnOperate: Button1;
	public btnResolve: Button2;
	public boxMat: ViewResource;
	public labPower: fairygui.GLabel;
	public boxMax: fairygui.GGroup;
	public titleIcon: fairygui.GLoader;
	public lbCurAttr: fairygui.GRichTextField;
	public lbNextAttr: fairygui.GRichTextField;
	public curEquip: ViewGridRender;
	public nextEquip: ViewGridRender;
	public btnSuit: Button2;
	public imgMat: fairygui.GImage;
	public labArrow: fairygui.GImage;
	public labSuitJie: fairygui.GTextField;
	public arrow: fairygui.GImage;
	public lbMaxAttr: fairygui.GRichTextField;
	public upGroup: fairygui.GGroup;
	public btnXL: Button2;
	public curEquip1: ViewGridRender;
	public xltip: fairygui.GRichTextField;
	public bar0: fairygui.GProgressBar;
	public bar1: fairygui.GProgressBar;
	public bar2: fairygui.GProgressBar;
	public xlAtt0: fairygui.GRichTextField;
	public xlAtt1: fairygui.GRichTextField;
	public xlAtt2: fairygui.GRichTextField;
	public boxAtt: fairygui.GGroup;
	public xlGroup: fairygui.GGroup;
	public btnUp: Button2;
	//>>>>end

	public static URL: string = "ui://3tzqotadltpm15";

	public static createInstance(): ViewGodEquipPanel {
		return <ViewGodEquipPanel><any>(fairygui.UIPackage.createObject("role", "ViewGodEquipPanel"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onOpen();
	}

	closePanel(pData?: any) {
		this.onClose();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		var self = this;
		CommonManager.parseChildren(self, self);

		self.gridArr = [];
		for (var i = 0; i < 10; i++) {
			self.gridArr.push(self["g" + i]);
			self.gridArr[i].name = "" + i;
			self.gridArr[i].tipEnabled = false;
		}
		self.curEquip.lbName.color = 0xCEC4A1;
		self.nextEquip.lbName.color = 0xCEC4A1;


		self.bar0._titleObject.visible = false;
		self.bar1._titleObject.visible = false;
		self.bar2._titleObject.visible = false;

		self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
		if (Model_GodEquip.getXLJie() == 1) {
			self.xltip.text = "";
		} else {
			self.xltip.text = "神装达到" + Model_GodEquip.getXLJie() + "阶才能洗练";
		}
	}

	public onOpen(): void {
		var self = this;
		self.c1.selectedIndex = 0;
		self.addListen();
		self.updateShow();
	}

	public onClose(): void {
		var self = this;
		self.selectIndex(-1);
		self.removeListen();
	}
	private _first = false;
	private addListen(): void {
		var self = this;
		if (!self._first) {
			GGlobal.modelEquip.CGGetEquips(2);
			self._first = true;
		}
		for (var i = 0; i < 10; i++) {
			self.gridArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
		}
		self.btnOperate.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onBtnHandler, self);
		self.btnResolve.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickResolve, self);
		self.btnSuit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickSuit, self);
		GGlobal.reddot.listen(UIConst.GOD_EQUIP, self.updateShow, self);
		GGlobal.modelGodEquip.CGGetJieOrange();
		GGlobal.modelGodEquip.CG_GODEQUIP_379();
	}


	private removeListen(): void {
		var self = this;
		for (var i = 0; i < 10; i++) {
			self.gridArr[i].vo= null;
			self.gridArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
		}
		self.curEquip.vo = null;
		self.nextEquip.vo = null;
		self.curEquip1.vo = null;
		self.btnOperate.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBtnHandler, self);
		self.btnResolve.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickResolve, self);
		self.btnSuit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickSuit, self);
		GGlobal.reddot.remove(UIConst.GOD_EQUIP, self.updateShow, self);
	}

	private gridArr: ViewGridRender[];

	private onSelectGrid(e: egret.TouchEvent): void {
		let self = this;
		var index = Number(e.currentTarget.name);
		if (self.c1.selectedIndex == 0) {
			self.selectIndex(index);
		} else {
			if (index == parseInt(self.selectGrid.name)) return;
			if (self.selectGrid) {
				self.selectGrid.selected = false;
				self.selectGrid = null;
			}
			self.selectGrid = e.currentTarget;
			self.updateXiLian();
		}
	}

	private onClickOrigin(e: egret.TouchEvent): void {
		View_CaiLiao_GetPanel.show(this._matItem)
	}

	private onClickResolve(): void {
		GGlobal.layerMgr.open(UIConst.RONGLIAN_FENJIE);
	}

	private onClickSuit(): void {
		GGlobal.layerMgr.open(UIConst.GOD_EQUIP_SUIT)
	}

	//合成  升级
	private onBtnHandler(e: egret.TouchEvent): void {
		var self = this;
		var vo: VoEquip
		if (self.c1.selectedIndex == 0) {
			var _state = self.currentState;
			if (_state == "upgrade") {
				vo = self.nextEquip.vo as VoEquip;
			} else {
				if (_state == "puton") {
					vo = Model_Equip.getBagScoreMaxEquip(Number(self.selectGrid.name) + 10)
				} else {
					vo = self.curEquip.vo as VoEquip;
				}
			}
			if (vo == null) {
				return;
			}
			if (_state == "puton") {//穿戴
				GGlobal.modelEquip.CGWearEquipByid(vo.sid);
				return;
			}
			if (self.needCount > Model_Bag.getItemCount(Model_GodEquip.GODCHIP)) {
				View_CaiLiao_GetPanel.show(VoItem.create(Model_GodEquip.GODCHIP));
				return;
			}
			if (_state == "upgrade") {//升级
				GGlobal.modelGodEquip.CGUpgradeOrangeEquip(Number(self.selectGrid.name) + 10);
			} else {//合成
				GGlobal.modelGodEquip.CGComposeOrange(Number(self.selectGrid.name) + 10, vo.id);
			}
		} else {
			vo = self.curEquip1.vo as VoEquip;
			if (vo) {
				let cfg = Config.szxlsx_306[vo.jie];
				if (cfg.xl == 0) {
					ViewCommonWarn.text("神装达到" + Model_GodEquip.getXLJie() + "阶才能洗练");
					return;
				}
				if (vo.xlhp >= cfg.hp && vo.xlatk >= cfg.atk && vo.xldef >= cfg.def) {
					let next = Model_Equip.getNextEuipLv(vo.ownPos, vo.id);
					if (next) {
						ViewCommonWarn.text("提升神装阶数可提高洗练属性上限");
					} else {
						ViewCommonWarn.text("洗练属性已满");
					}
				} else {
					if (self.btnOperate.checkNotice) {
						GGlobal.modelGodEquip.CG_GODEQUIP_XL(vo.ownPos);
					} else {
						View_CaiLiao_GetPanel.show(VoItem.create(JSON.parse(cfg.cost)[0][1]))
					}
				}
			} else {
				if (Model_GodEquip.getXLJie() == 1) {
					ViewCommonWarn.text("请先合成该部位的神装");
				} else {
					ViewCommonWarn.text("神装达到" + Model_GodEquip.getXLJie() + "阶才能洗练");
				}
			}
		}
	}

	private selectGrid: ViewGridRender;
	public selectIndex(index: number): void {
		var self = this;
		if (self.selectGrid) {
			self.selectGrid.selected = false;
			self.selectGrid = null;
		}
		if (index < 0) {
			return;
		}
		var grid = self.selectGrid = self.gridArr[index];
		self.selectGrid.selected = true;
		var resource = self.selectGrid.data;
		var state;
		var next = Model_Equip.getNextEuipLv(Number(grid.name) + 10, grid.vo ? grid.vo.id : 0);
		var curVo: VoEquip = grid.vo as VoEquip;
		var nextVo: VoEquip = null;
		self.needCount = 0;
		self.boxMax.visible = false;
		if (resource != null) {
			state = "puton";
			self.btnOperate.text = "穿戴";
			self.btnOperate.visible = self.btnOperate.touchable = true;
			self.btnOperate.checkNotice = true;
			curVo = VoEquip.create(next.id);
			curVo = resource;
		}
		else if (next == null) {//已满级
			state = "maxLevel";
			self.btnOperate.visible = false;
			self.boxMax.visible = true;
			self.getChild("n57").asRichTextField.text = "已满级";
		} else {
			var composeArr: Array<any> = ConfigHelp.SplitStr(next.compose);
			self.needCount = Number(composeArr[0][2]);
			self.btnOperate.visible = self.btnOperate.touchable = true;
			if (!curVo) {
				state = "compose";
				self.btnOperate.text = "合成";
				curVo = VoEquip.create(next.id);
			} else {
				state = "upgrade";
				self.btnOperate.text = "升阶";
				nextVo = VoEquip.create(next.id);
			}
		}
		self.currentState = state;
		self.setAttr(curVo, nextVo);
		self.updateNeed();
	}

	//显示属性
	private setAttr(cur: VoEquip, next: VoEquip): void {
		var self = this;
		if (cur == null || next == null) {
			self.curEquip.vo = cur ? cur : next;
			self.lbMaxAttr.text = ConfigHelp.attrString(cur ? cur.baseAttr : next.baseAttr, "+", null, "#15f234")
			self.labArrow.visible = false;
			self.arrow.visible = false;
			self.nextEquip.visible = self.nextEquip.touchable = false;
			self.curEquip.x = 276
			self.lbCurAttr.text = ""
			self.lbNextAttr.text = ""
		} else {
			self.lbCurAttr.text = ConfigHelp.attrString(cur.baseAttr, "+")
			self.lbNextAttr.text = ConfigHelp.attrString(next.baseAttr, "+", null, "#15f234")
			self.lbMaxAttr.text = ""
			self.curEquip.vo = cur;
			self.curEquip.x = 171
			self.nextEquip.visible = self.nextEquip.touchable = true;
			self.labArrow.visible = true;
			self.arrow.visible = true;
		}
		self.nextEquip.vo = next;
		let type = cur ? cur.type : next.type;
		self.labPart.text = Model_Equip.getPartName(type);
	}

	protected needCount: number;
	private currentState
	private _matItem: VoItem
	private updateNeed(): void {
		var self = this;
		if (self.currentState == "maxLevel" || self.currentState == "puton") {
			self.boxMat.visible = self.imgMat.visible = false;
			return;
		}
		self.boxMat.visible = self.imgMat.visible = true;
		var count = Model_Bag.getItemCount(Model_GodEquip.GODCHIP);
		self._matItem = VoItem.create(Model_GodEquip.GODCHIP)
		self._matItem.count = count
		self.boxMat.setImgUrl(self._matItem.icon)
		if (self.needCount > count) {//背包个数不足
			self.boxMat.setLb(count, self.needCount);
			self.btnOperate.checkNotice = false;
		} else {
			self.boxMat.setLb(count, self.needCount);
			self.btnOperate.checkNotice = true;
		}
		// self.btnGet.text = "[u]" + self._matItem.name + "来源[/u]";
		// self.btnGet.color = Color.getColorInt(self._matItem.quality);
	}
	public updateEquip(): void {
		var self = this;
		var equipData = Model_player.voMine.equipData;
		var grid: ViewGridRender;
		var voE: VoEquip;
		let level = 999999;
		for (var i: number = 0; i < self.gridArr.length; i++) {
			grid = self.gridArr[i];
			voE = equipData[Number(grid.name) + 10];
			grid.vo = voE;
			grid.data = null;//来源  身上
			grid.showNotice = Model_GodEquip.checkEquipNotice(Number(grid.name) + 10, voE ? voE.id : 0);
		}

		var equipBag = Model_Bag.equipList;
		for (let i = 0; i < equipBag.length; i++) {
			var ve: VoEquip = equipBag[i];
			if (ve.type >= 10 && ve.type < 20) {
				var gridVo = self.gridArr[ve.type - 10]
				if (gridVo.vo == null || ve.basePower > (gridVo.vo as VoEquip).basePower) {
					if (gridVo.data == null || ve.basePower > (gridVo.data as VoEquip).basePower) {
						gridVo.data = ve;
					}
					gridVo.showNotice = true;
				}
			}
		}

		if (self.selectGrid) {
			self.selectIndex(Number(self.selectGrid.name));
		} else {
			self.selectIndex(0);
		}
		self.upSuitJie();
	}

	private updateEquipXL() {
		var self = this;
		var equipData = Model_player.voMine.equipData;
		var grid: ViewGridRender;
		var voE: VoEquip;
		for (var i: number = 0; i < self.gridArr.length; i++) {
			grid = self.gridArr[i];
			voE = equipData[Number(grid.name) + 10];
			grid.vo = voE;
			grid.data = null;//来源  身上
			grid.showNotice = Model_GodEquip.checkEquipNotice_XL(voE);
		}

		if (self.selectGrid) {
			self.updateXiLian();
		} else {
			self.selectGrid = self.gridArr[0]
			self.updateXiLian();
		}
	}

	private updateXiLian() {
		var self = this;
		self.boxMax.visible = false;
		self.boxMat.visible = true;
		self.btnOperate.visible = true;
		var grid = self.selectGrid;
		let curVo: VoEquip = grid.vo as VoEquip;
		self.selectGrid.selected = true;
		self.curEquip1.vo = curVo;
		let cfg: Iszxlsx_306;
		if (curVo) {
			cfg = Config.szxlsx_306[curVo.jie];
		} else {
			cfg = Config.szxlsx_306[1];
		}
		let costArr = JSON.parse(cfg.cost);
		let costVo = VoItem.create(costArr[0][1]);
		costVo.count = costArr[0][2];
		self.boxMat.setImgUrl(costVo.icon);
		let count = Model_Bag.getItemCount(costArr[0][1]);
		self.xltip.visible = false
		self.boxAtt.visible = false
		if (curVo) {
			self.boxMat.setLb(count, costVo.count);
			if (count >= costVo.count) {
				if (curVo.xlhp >= cfg.hp && curVo.xlatk >= cfg.atk && curVo.xldef >= cfg.def) {
					self.btnOperate.checkNotice = false;
					let next = Model_Equip.getNextEuipLv(Number(grid.name) + 10, grid.vo ? grid.vo.id : 0);
					if (!next) {
						self.boxMax.visible = true;
						self.btnOperate.visible = false;
						self.getChild("n57").asRichTextField.text = "已洗练满";
					}
				} else {
					if (cfg.xl == 0) {
						self.btnOperate.checkNotice = false;
					} else {
						self.btnOperate.checkNotice = true;
					}
				}
			} else {
				self.btnOperate.checkNotice = false;
			}

			if (cfg.xl == 0) {
				self.xltip.visible = true
			} else {
				self.boxAtt.visible = true
			}
			self.bar0.value = curVo.xlhp;
			self.bar1.value = curVo.xlatk;
			self.bar2.value = curVo.xldef;
		} else {
			self.xltip.visible = true
			self.boxMat.setLb(count, 0);
			self.btnOperate.checkNotice = false;
			self.bar2.value = self.bar1.value = self.bar0.value = 0;
		}
		self.bar0.max = cfg.hp;
		self.bar1.max = cfg.atk;
		self.bar2.max = cfg.def;
		self.xlAtt0.text = self.bar0.value + "/" + cfg.hp;
		self.xlAtt1.text = self.bar1.value + "/" + cfg.atk;
		self.xlAtt2.text = self.bar2.value + "/" + cfg.def;
		self.btnOperate.text = "洗练";
		self.labPart.text = Model_Equip.getPartName(Number(grid.name) + 10);
		self.upPower();
	}

	private upSuitJie(): void {
		var self = this;
		let level = 999999;
		var equipData = Model_player.voMine.equipData;
		for (var i: number = 0; i < self.gridArr.length; i++) {
			var grid: ViewGridRender = self.gridArr[i];
			var voE: VoEquip = equipData[Number(grid.name) + 10];
			if (voE) {
				if (voE.cfg.jie < level) {
					level = voE.cfg.jie;
				}
			} else {
				level = 0;
			}
		}
		if (Model_GodEquip.GOD_JIE < level) {
			let suitNext = Config.godequipsuit_208[Model_GodEquip.GOD_JIE + 1];
			if (suitNext) {
				self.btnSuit.checkNotice = true;
			} else {
				self.btnSuit.checkNotice = false;
			}
		} else {
			self.btnSuit.checkNotice = false;
		}
		self.labSuitJie.text = Model_GodEquip.GOD_JIE + "阶"
		self.upPower();
	}

	private upPower(): void {
		//装备
		var equipData = Model_player.voMine.equipData;
		var power = 0;
		for (var i: number = 0; i < 10; i++) {
			var voE: VoEquip = equipData[i + 10];
			if (voE) {
				power += voE.getPower();
			}
		}
		//套装
		if (Model_GodEquip.GOD_JIE > 0) {
			var suitCur = Config.godequipsuit_208[Model_GodEquip.GOD_JIE]
			power += suitCur.power
		}
		this.labPower.text = power + "";
	}

	public updateChip(): void {
		let self = this;
		if (self.c1.selectedIndex == 0) {
			self.updateNeed();
		} else {
			self.updateXiLian();
		}
	}

	private updateShow() {
		let self = this;
		self.btnUp.checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_EQUIP, 0);
		self.btnXL.checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_EQUIP, 1);
		if (self.c1.selectedIndex == 0) {
			self.updateEquip();
		} else {
			self.updateEquipXL();
		}
	}
}