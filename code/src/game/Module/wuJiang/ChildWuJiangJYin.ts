class ChildWuJiangJYin extends fairygui.GComponent {

	public lbName: fairygui.GTextField;
	public labPower: fairygui.GTextField;
	public lbCurAttr: fairygui.GTextField;
	public lbNextAttr: fairygui.GTextField;
	public lbMaxAttr: fairygui.GTextField;
	public arrow1: fairygui.GImage;
	public arrow2: fairygui.GImage;
	public btnDecompose: fairygui.GButton;
	public btnOperate: Button0;
	public g0: VWuJiangJYin;
	public g1: VWuJiangJYin;
	public g2: VWuJiangJYin;
	public g4: VWuJiangJYin;
	public g3: VWuJiangJYin;
	public g5: VWuJiangJYin;
	public g6: VWuJiangJYin;
	public g7: VWuJiangJYin;
	public g8: VWuJiangJYin;
	public g9: VWuJiangJYin;
	public curEquip: ViewGrid;
	public nextEquip: ViewGrid;
	public maxEquip: ViewGrid;
	public boxMat: ViewResource;
	public imgMat: fairygui.GImage;
	// public labMat: fairygui.GRichTextField;
	public boxMax: fairygui.GGroup;

	public static URL: string = "ui://zyx92gzwtht43";

	private _gridArr: Array<VWuJiangJYin>
	private selectGrid: VWuJiangJYin;

	public static createInstance(): ChildWuJiangJYin {
		return <ChildWuJiangJYin><any>(fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangJYin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self._gridArr = [self.g0, self.g1, self.g2, self.g3, self.g4, self.g5, self.g6, self.g7, self.g8, self.g9];

		GGlobal.modelEquip.CGGetEquips(3);
	}

	public addEvent(): void {
		const self = this;
		for (var i = 0; i < 10; i++) {
			self._gridArr[i].addClickListener(self.onSelectGrid, self);
		}
		self.btnOperate.addClickListener(self.onBtnHandler, self);
		self.btnDecompose.addClickListener(self.onDecompose, self);
		// self.labMat.addClickListener(self.onClickLink, self);
	}

	public removeEvent(): void {
		const self = this;
		for (var i = 0; i < 10; i++) {
			self._gridArr[i].vo = null;
			self._gridArr[i].removeClickListener(self.onSelectGrid, self);
		}
		self.curEquip.vo = null;
		self.nextEquip.vo = null;
		self.maxEquip.vo = null;
		self.btnOperate.removeClickListener(self.onBtnHandler, self);
		self.btnDecompose.removeClickListener(self.onDecompose, self);
		// self.labMat.removeClickListener(self.onClickLink, self);
	}

	public show(): void {
		const self = this;
		if (self.selectGrid) {
			self.selectGrid.grid.selectImg.visible = false;
			self.selectGrid = null;
		}
	}

	public update(): void {
		const self = this;
		var equipData = Model_player.voMine.equipData;
		var voE: VoEquip;
		for (var i: number = 0; i < self._gridArr.length; i++) {
			self._gridArr[i].index = i;
			self._gridArr[i].vo = equipData[i + 20];
			self._gridArr[i].bagEquip = null;
			if (self._gridArr[i].isLocked) {
				self._gridArr[i].checkNotice = false;
			} else {
				self._gridArr[i].checkNotice = Model_WuJiang.checkJYinSyn(i + 20)
			}
		}
		var equipBag = Model_Bag.equipList
		for (let i = 0; i < equipBag.length; i++) {
			var ve: VoEquip = equipBag[i];
			if (ve.type >= 20 && ve.type < 30) {
				if (self._gridArr[ve.type - 20].vo == null || ve.basePower > self._gridArr[ve.type - 20].vo.basePower) {
					self._gridArr[ve.type - 20].checkNotice = true;
					self._gridArr[ve.type - 20].bagEquip = ve;
				}
			}
		}
		if (self.selectGrid) {
			self.selectIndex(Number(self.selectGrid.index));
		} else {
			self.selectIndex(0);
		}
		self.labPower.text = "" + self.getJYinPower();

	}

	private onSelectGrid(e: egret.TouchEvent): void {
		const self = this;
		var target = e.currentTarget as VWuJiangJYin
		if (target.isLocked) {
			return;
		}
		var index = target.index;
		self.selectIndex(index);
	}

	//分解
	private onDecompose(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.RONGLIAN_FENJIE);
	}

	//合成  升级
	private onBtnHandler(e: egret.TouchEvent): void {
		const self = this;
		var _state = self.currentState;
		if (_state == "maxLevel") {
			return;
		}
		if (self.needBoo == false) {
			View_CaiLiao_GetPanel.show(self._matItem);
			return;
		}
		var vo: VoEquip;
		if (_state == "upgrade") {
			vo = self.curEquip.vo as VoEquip;
			GGlobal.modelWuJiang.CGUpJY(self.selectGrid.index + 20);
		} else if (_state == "puton") {
			vo = self.maxEquip.vo as VoEquip;
			GGlobal.modelEquip.CGWearEquipByid(vo.sid);
		} else {//合成
			vo = self.nextEquip.vo as VoEquip;
			GGlobal.modelWuJiang.CGHechengJY(self.selectGrid.index + 20);
		}
	}

	private selectIndex(index: number): void {
		const self = this;
		if (self.selectGrid) {
			self.selectGrid.grid.selectImg.visible = false;
		}
		self.selectGrid = self._gridArr[index];
		self.selectGrid.grid.selectImg.visible = true;

		var curVo: VoEquip = self.selectGrid.vo;
		var nextVo: VoEquip = null
		var bagEquip = self.selectGrid.bagEquip;
		var next
		if (curVo) {
			next = Model_Equip.getNextEuipLv(index + 20, curVo.id)
		} else {
			next = Model_Equip.getNextEuipLv(index + 20, 0)
		}
		var needArr = null;
		self.boxMax.visible = false;
		self.btnOperate.visible = true;
		if (bagEquip) {
			curVo = bagEquip
			self.currentState = "puton";
			self.btnOperate.text = "穿戴";
			self.btnOperate.enabled = true;
		}
		else if (curVo && next == null) {//已满级
			self.currentState = "maxLevel";
			self.btnOperate.text = "满阶";
			self.btnOperate.enabled = false;
			self.btnOperate.visible = false;
			self.boxMax.visible = true;
		}
		else {
			nextVo = VoEquip.create(next.id);
			var composeArr: Array<any> = ConfigHelp.SplitStr(next.compose)
			needArr = composeArr;
			self.btnOperate.enabled = true;
			if (!curVo) {
				self.currentState = "compose";
				self.btnOperate.text = "合成";
			} else {
				self.currentState = "upgrade";
				self.btnOperate.text = "升阶";
			}
		}
		self.setAttr(curVo, nextVo);
		self.updateNeed(needArr);
		self.btnOperate.checkNotice = self.selectGrid.checkNotice;
	}

	//显示属性
	private setAttr(cur: VoEquip, next: VoEquip): void {
		const self = this;
		if (cur == null || next == null) {//最大最小
			cur = cur ? cur : next
			self.arrow2.visible = false;
			self.arrow1.visible = false;
			self.curEquip.touchable = self.curEquip.visible = false;
			self.nextEquip.touchable = self.nextEquip.visible = false;
			self.maxEquip.touchable = self.maxEquip.visible = true;
			self.maxEquip.isShowEff = true;
			self.maxEquip.tipEnabled = true;
			self.maxEquip.vo = cur;
			self.maxEquip.lbNum.text = cur ? cur.jie + "阶" : "";
			self.lbMaxAttr.text = ConfigHelp.attrString(cur.baseAttr, "\n+", null, "#15f234");
			self.lbCurAttr.text = "";
			self.lbNextAttr.text = "";
		} else {
			self.arrow1.visible = true;
			self.arrow2.visible = true;
			self.curEquip.touchable = self.curEquip.visible = true;
			self.nextEquip.touchable = self.nextEquip.visible = true;
			self.maxEquip.touchable = self.maxEquip.visible = false;
			self.curEquip.isShowEff = true;
			self.curEquip.tipEnabled = true;
			self.curEquip.vo = cur;
			self.curEquip.lbNum.text = cur ? cur.jie + "阶" : "";
			self.nextEquip.isShowEff = true;
			self.nextEquip.tipEnabled = true;
			self.nextEquip.vo = next;
			self.nextEquip.lbNum.text = next.jie + "阶";
			self.lbCurAttr.text = ConfigHelp.attrString(cur.baseAttr, "\n+");
			self.lbNextAttr.text = ConfigHelp.attrString(next.baseAttr, "\n+", null, "#15f234");
			self.lbMaxAttr.text = ""
		}
		//名字
		self.lbName.text = cur.name;
		self.lbName.color = Color.getColorInt(cur.quality)
	}

	private needBoo: boolean = false;//是否材料足够
	private currentState
	private _matItem: VoItem
	private updateNeed(needArr: Array<any>): void {
		const self = this;
		if (!needArr) {
			self.needBoo = true
			self.boxMat.visible = false;
			self.imgMat.visible = false;
			return;
		}
		var count = Model_Bag.getItemCount(Number(needArr[0][1]));
		var needCount = Number(needArr[0][2])
		self._matItem = VoItem.create(Number(needArr[0][1]))
		self.boxMat.setImgUrl(self._matItem.icon);
		self.boxMat.visible = true;
		self.imgMat.visible = true;
		self.boxMat.setLb(count, needCount);
		if (needCount > count) {
			self.needBoo = false
		} else {
			self.needBoo = true
		}
	}

	private getJYinPower(): number {
		var power = 0;
		var equipData = Model_player.voMine.equipData;
		for (var i: number = 0; i < 10; i++) {
			var voE: VoEquip = equipData[i + 20];
			if (voE) {
				power += voE.getPower()
			}
		}
		return power;
	}

	private onClickLink(e: egret.TouchEvent): void {
		const self = this;
		if (self._matItem) {
			View_CaiLiao_GetPanel.show(self._matItem)
		}
		e.stopPropagation();
		e.stopImmediatePropagation();
	}
}