class ChildFenJie extends fairygui.GComponent implements IPanel {

	//>>>>start
	public imageItem: fairygui.GLoader;
	public list1: fairygui.GList;
	public btn_fj: Button0;
	public viewRes: ViewResource;
	public btnMin: Button2;
	public btnReduce: Button2;
	public btnAdd: Button2;
	public lbCount: fairygui.GTextField;
	public btnMax: Button2;
	public grid_fj: ViewGrid;
	public list2: fairygui.GList;
	public btn_fj1: Button0;
	public viewRes1: ViewResource;
	//>>>>end

	public static URL: string = "ui://ny9kb4yzetor2";

	private _listData1: Array<IGridImpl>;
	private _listData2: Array<IGridImpl>;

	public static createInstance(): ChildFenJie {
		return <ChildFenJie><any>(fairygui.UIPackage.createObject("rongLian", "ChildFenJie"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		let self = this;
		self.addListen();
		self.update();
	}

	closePanel(pData?: any) {
		let self = this;
		self.removeListen();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list1.callbackThisObj = self;
		self.list1.itemRenderer = self.itemRender1;
		self.list1.setVirtual();
		self.list2.callbackThisObj = self;
		self.list2.itemRenderer = self.itemRender2;
	}

	public addListen(): void {
		let self = this;
		self.list1.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, this);
		self.btn_fj.addClickListener(self.onFenJie, this);
		self.btn_fj1.addClickListener(self.onFenJieOneKey, this);
		self.btnMin.addClickListener(self.onMinCountHandler, this);
		self.btnMax.addClickListener(self.onMaxCountHandler, this);
		self.btnReduce.addClickListener(self.onReduceHandler, this);
		self.btnAdd.addClickListener(self.onAddHandler, this);
		GGlobal.control.listen(Enum_MsgType.GOD_EQUIP_DECOMPOSE, self.fenJieSuccess, this);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_DECOMPOSE, self.fenJieSuccess, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_DECOMPOSE, self.fenJieSuccess, this);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_DECOMPOSE_ONEKEY, self.update, this);
		IconUtil.setImg(self.imageItem, Enum_Path.BACK_URL + "fenJieBack.jpg");
	}

	public removeListen(): void {
		let self = this;
		self.list1.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
		self.btn_fj.removeClickListener(self.onFenJie, self);
		self.btn_fj1.removeClickListener(self.onFenJieOneKey, self);
		self.btnMin.removeClickListener(self.onMinCountHandler, self);
		self.btnMax.removeClickListener(self.onMaxCountHandler, self);
		self.btnReduce.removeClickListener(self.onReduceHandler, self);
		self.btnAdd.removeClickListener(self.onAddHandler, self);
		GGlobal.control.remove(Enum_MsgType.GOD_EQUIP_DECOMPOSE, self.fenJieSuccess, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_DECOMPOSE, self.fenJieSuccess, self);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_DECOMPOSE, self.fenJieSuccess, self);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_DECOMPOSE_ONEKEY, self.update, self);
		self.currentVo = null;
		self.list1.numItems = 0;
		self.list2.numItems = 0;
	}

	public update(): void {
		let self = this;
		//装备  神装 将印
		var arr0 = [];
		for (let i = 0; i < Model_Bag.equipList.length; i++) {
			var voEquip = Model_Bag.equipList[i]
			if (voEquip && Config.decompose_204[voEquip.id]) {
				arr0.push(voEquip)
			}
		}
		arr0.sort(Model_Bag.sortFunc)
		var arr1 = []
		//道具  
		for (let i = 0; i < Model_Bag.itemList.length; i++) {
			var voItem = Model_Bag.itemList[i]
			if (voItem && Config.decompose_204[voItem.id]) {
				arr1.push(voItem)
			}
		}
		arr1.sort(Model_Bag.sortFunc)
		self._listData1 = arr0.concat(arr1)
		self.list1.numItems = Math.max(10, self._listData1.length);
		self.list1.selectedIndex = 0;
		self.list1.scrollToView(0);
		self.selectUp(self._listData1[0]);
		//一键分解消耗
		self.viewRes1.setImgUrl(Enum_Attr.TONGBI + "");
		self._onekeyArr = self.onekeyFenJieArr()
		let total = 0
		for (let i = 0; i < self._onekeyArr.length; i++) {
			let v = self._onekeyArr[i]
			let cfg = Config.decompose_204[v.id]
			if (cfg.consume != "0") {
				var consumeArr = ConfigHelp.SplitStr(cfg.consume);
				total += Number(consumeArr[0][2]) * v.count;
			}
		}
		self._tatal = total
		if (Model_player.voMine.tongbi < total) {
			self.viewRes1.setCount(HtmlUtil.fontNoSize(total + "", Color.getColorStr(6)));
		} else {
			self.viewRes1.setCount(HtmlUtil.fontNoSize(total + "", Color.getColorStr(2)));
		}
		if (total > 0 && Model_player.voMine.tongbi >= total) {
			self.btn_fj1.checkNotice = true;
		} else {
			self.btn_fj1.checkNotice = false;
		}
	}
	private _onekeyArr: IGridImpl[];
	private _tatal = 0

	private itemRender1(index: number, obj: fairygui.GComponent): void {
		let self = this;
		var item: VFenJieGrid = obj as VFenJieGrid
		item.vo = self._listData1[index]
	}
	private itemRender2(index: number, obj: fairygui.GComponent): void {
		let self = this;
		var item: ViewGrid = obj as ViewGrid
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = self._listData2[index]
		if (item.vo) {
			let count = item.vo.count * self.count
			if (count > 1) {
				item.showText = ConfigHelp.getYiWanText(count)
			} else {
				item.showText = ""
			}
		}
	}

	// private _selItem: IGridImpl
	private onFenJie(): void {
		let self = this;
		if (!self.currentVo) {
			ViewCommonWarn.text("无可分解道具");
			return;
		}
		if (Model_player.voMine.tongbi < self._consumeCount * self.count) {
			ViewCommonWarn.text("铜币不足");
			return;
		}
		if (self.currentVo instanceof VoItem) {
			Model_RongLian.fenjieObj[self.currentVo.id] = self.currentVo
			GGlobal.modelBag.CG_BAG_FEJIE(self.currentVo.id, self.count)
		} else {
			var equ: VoEquip = Model_player.voMine.equipData[(self.currentVo as VoEquip).type]
			if (equ == null || equ.basePower < (self.currentVo as VoEquip).basePower) {
				ViewAlert.show("该件装备比已穿戴的同部位装备更好，是否分解？", Handler.create(this, self.onAlertSure, null, true),
					ViewAlert.OKANDCANCEL, "确定", "取消");
			} else {
				self.onAlertSure();
			}
		}
	}

	private onFenJieOneKey() {
		let self = this;
		if (self._onekeyArr.length == 0) {
			ViewCommonWarn.text("无可分解道具");
			return;
		}
		if (Model_player.voMine.tongbi < self._tatal) {
			ViewCommonWarn.text("铜币不足");
			return;
		}
		let arr1: number[] = [];
		let arr2: { id: number, ct: number }[] = [];
		for (let i = 0; i < self._onekeyArr.length; i++) {
			let voe: IGridImpl = self._onekeyArr[i] as VoEquip;
			if (voe instanceof VoEquip) {
				arr1.push(voe.sid)
			} else {
				arr2.push({ id: voe.id, ct: voe.count })
			}
		}
		GGlobal.modelBag.CG_BAG_FEJIE_ONEKEY(arr1, arr2);

	}

	private equipBest: { [type: number]: IGridImpl };
	private onekeyFenJieArr(): IGridImpl[] {
		let self = this;
		var ret = [];
		var list = self._listData1;
		var len = self._listData1.length;
		self.equipBest = {};
		for (let i: number = 0; i < len; i++) {
			let voe: IGridImpl = list[i] as VoEquip;
			if (voe instanceof VoEquip) {
				//评分小
				let plyEq: VoEquip = Model_player.voMine.equipData[voe.type];//身上装备 或要保留的装备
				if (plyEq && plyEq.basePower >= voe.basePower) {
					ret.push(voe);
				} else {
					//取最强的装备
					let eqBest = self.equipBest[voe.type];
					//存最强的装备
					if (eqBest == null || (eqBest as VoEquip).basePower < voe.basePower) {
						if (eqBest) {
							ret.push(eqBest)
						}
						self.equipBest[voe.type] = voe
					} else {
						ret.push(voe);
					}
				}
			} else {
				ret.push(voe);
			}
		}
		return ret;
	}

	private onAlertSure(): void {
		let self = this;
		if (!self.currentVo) {
			return;
		}
		Model_RongLian.fenjieObj[self.currentVo.sid] = self.currentVo
		if ((self.currentVo as VoEquip).type >= 10 && (self.currentVo as VoEquip).type < 20) {//神装
			GGlobal.modelGodEquip.CGDeComposeOrange(self.currentVo.sid)
		}
		else if ((self.currentVo as VoEquip).type >= 30 && (self.currentVo as VoEquip).type < 33) {//转生装备
			GGlobal.modelGodEquip.CGDeComposeOrange(self.currentVo.sid)
		}
		else {//将印
			GGlobal.modelWuJiang.CGDecompose(self.currentVo.sid)
		}
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let self = this;
		let grid: ViewGridRender = event.itemObject as ViewGridRender;
		self.selectUp(grid.vo)
	}

	private _consumeCount
	private selectUp(vo: IGridImpl): void {
		let self = this;
		self.currentVo = vo
		if (self.currentVo) {
			self.grid_fj.vo = self.currentVo
			self.grid_fj.tipEnabled = true;
			self.grid_fj.isShowEff = true;
			var cfg = Config.decompose_204[self.currentVo.id]
			if (cfg.consume == "0") {
				self._consumeCount = 0
			} else {
				var consumeArr = ConfigHelp.SplitStr(cfg.consume);
				self._consumeCount = Number(consumeArr[0][2]);
			}
			self.viewRes.setImgUrl(Enum_Attr.TONGBI + "");
			var rewardArr = ConfigHelp.SplitStr(cfg.reward);
			self._listData2 = ConfigHelp.makeItemListArr(rewardArr);

			self.count = Model_Bag.getItemCount(vo.id);
			if (self.count == 0) {
				self.count = 1;
			}
			self.upCount();
			if (vo instanceof VoEquip) {
				self.btn_fj.checkNotice = Model_RongLian.checkFJEqu(vo)
			} else {
				self.btn_fj.checkNotice = true;
			}
		} else {
			self.viewRes.setImgUrl(Enum_Attr.TONGBI + "")
			self.viewRes.setCount(0)
			self.grid_fj.vo = null
			self.grid_fj.tipEnabled = false;
			self.grid_fj.isShowEff = false;
			self._listData2 = []
			self.count = 1;

			self.lbCount.text = "" + self.count;
			self.list2.numItems = 4;
			self.btn_fj.checkNotice = false;
		}
	}

	public onMinCountHandler(event: egret.TouchEvent): void {
		let self = this;
		if (self.currentVo == null || self.currentVo instanceof VoEquip) {
			return;
		}
		self.count -= 10;
		if (self.count <= 0) {
			self.count = 1;
		}
		self.upCount();
	}

	public onMaxCountHandler(event: egret.TouchEvent): void {
		let self = this;
		if (self.currentVo == null || self.currentVo instanceof VoEquip) {
			return;
		}
		self.count += 10;
		var bagCount = Model_Bag.getItemCount(self.currentVo.id);
		if (self.count > bagCount) {
			self.count = bagCount;
		}
		if (self.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			self.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
		}
		self.upCount();
	}

	public onReduceHandler(event: egret.TouchEvent): void {
		let self = this;
		if (self.currentVo == null || self.currentVo instanceof VoEquip) {
			return;
		}
		if (self.count > 1) {
			self.count--;
			self.upCount();
		}
	}

	public onAddHandler(event: egret.TouchEvent): void {
		let self = this;
		if (self.currentVo == null || self.currentVo instanceof VoEquip) {
			return;
		}
		var maxCount: number = Model_Bag.getItemCount(self.currentVo.id);
		if (maxCount > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			maxCount = Model_Bag.CONST_MAX_MUL_USE_NUM;
		}
		if (self.count < maxCount) {
			self.count++;
			self.upCount();
		}
	}

	private upCount(): void {
		let self = this;
		self.lbCount.text = "" + self.count;
		self.list2.numItems = 4;
		if (Model_player.voMine.tongbi < self._consumeCount * self.count) {
			self.viewRes.setCount(HtmlUtil.fontNoSize((self._consumeCount * self.count) + "", Color.getColorStr(6)));
		} else {
			self.viewRes.setCount(HtmlUtil.fontNoSize((self._consumeCount * self.count) + "", Color.getColorStr(2)));
		}
	}

	public currentVo: IGridImpl;
	public count: number = 0;

	private fenJieSuccess(): void {
		var self = this;
		EffectMgr.addEff("uieff/10007", self.grid_fj.displayListContainer, self.grid_fj.width / 2, self.grid_fj.height / 2, 400, 400, false);
		setTimeout(function () {
			self.update.apply(self);
		}, 600);
	}
}