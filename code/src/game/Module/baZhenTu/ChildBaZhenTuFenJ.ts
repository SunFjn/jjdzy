class ChildBaZhenTuFenJ extends fairygui.GComponent {

	public list: fairygui.GList;
	public lbName: fairygui.GTextField;
	public lbAttr: fairygui.GTextField;
	public lbLevel: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	// public check1: fairygui.GButton;
	// public check2: fairygui.GButton;
	// public check3: fairygui.GButton;
	// public check4: fairygui.GButton;
	// public check5: fairygui.GButton;
	public grid: VBaZTGrid;
	public labChip: fairygui.GLabel;
	public labGod: fairygui.GLabel;
	public labT: fairygui.GLabel;
	public btnUnLock: fairygui.GButton;
	public imgLock: fairygui.GImage;
	public btnLock: fairygui.GButton;
	public btnFenJ: Button0;

	public static URL: string = "ui://xrzn9ppaf8nk2";

	private _checkArr: fairygui.GButton[]

	public static createInstance(): ChildBaZhenTuFenJ {
		return <ChildBaZhenTuFenJ><any>(fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTuFenJ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s)

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHander;
		this.list.setVirtual();
		this._checkArr = []
		for (let i = 1; i <= 5; i++) {
			this._checkArr.push(<fairygui.GButton><any>(this.getChild("check" + i)))
		}
		let img: fairygui.GLoader = this.labGod.getChild("icon") as fairygui.GLoader;
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + Config.daoju_204[Model_BaZhenTu.GODid].icon + ".png", img);
	}
	public open() {
		let s = this;
		s.btnFenJ.addClickListener(s.onFenJ, s);
		s.btnLock.addClickListener(s.onLock, s);
		s.btnUnLock.addClickListener(s.onUnLock, s);
		for (let i = 0; i < 5; i++) {
			this._checkArr[i].addClickListener(s.onCheck, s);
			if (i < 2) {
				this._checkArr[i].selected = true
			} else {
				this._checkArr[i].selected = false
			}
		}
		s.grid.tipEnable = true;
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			if (v.type == 0 || v.pz < 5) {
				v.fenJ = 1;
			} else {
				v.fenJ = 0;
			}
		}
		s.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.LOCK, this.upLock, this);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, this.update, this);
		GGlobal.modelPlayer.listen(Model_player.FUWEN_UPDATE, s.upFuwen, s);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.UP_FENJIE, s.upFenJ, s);
		GGlobal.socketMgr.registerReconnectHD("ChildBaZhenTuFenJ_onFenJ", Handler.create(GGlobal.modelBaZhenTu, GGlobal.modelBaZhenTu.CGOPENUI4401));
		s.update();
	}

	public close() {
		let s = this;
		s.btnFenJ.removeClickListener(s.onFenJ, s);
		s.btnLock.removeClickListener(s.onLock, s);
		s.btnUnLock.removeClickListener(s.onUnLock, s);
		for (let i = 0; i < 5; i++) {
			this._checkArr[i].removeClickListener(s.onCheck, s);
		}
		s.grid.tipEnable = false;
		s.grid.showEff(false)
		s.list.numItems = 0;
		s.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.LOCK, this.upLock, this);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, this.update, this);
		GGlobal.modelPlayer.remove(Model_player.FUWEN_UPDATE, s.upFuwen, s);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.UP_FENJIE, s.upFenJ, s);
		GGlobal.socketMgr.removeReconnectHD("ChildBaZhenTuFenJ_onFenJ");
	}

	private onFenJ() {
		if (!TimeUitl.cool("ChildBaZhenTuFenJ_onFenJ", 200)) {
			return;
		}
		let s = this;
		let loacIndex = 0;
		let arr = []
		let tyfenJ = true;
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			if (v.locked == 1 && v.type != 0) continue;
			if (v.locked == 1) loacIndex++;
			let idx = s.idxArr[v.cfg.pz]
			if (v.fenJ == 1) {
				arr.push(v.pos);
				//分解的  check未选中
				if (tyfenJ && this._checkArr[idx].selected == false) {
					tyfenJ = false;
				}
			} else {
				//不分解  check选中了
				if (tyfenJ && this._checkArr[idx].selected == true) {
					tyfenJ = false;
				}
			}
		}
		if (arr.length == 0) {
			if (loacIndex > 0) {
				ViewCommonWarn.text("选中符文已被锁定");
			} else {
				ViewCommonWarn.text("未选中任何符文");
			}
			return;
		}
		if (tyfenJ) {
			let arrCheck = []
			for (let i = 0; i < this._checkArr.length; i++) {
				let ck = this._checkArr[i]
				if (ck.selected) {
					// arrCheck.push(i + 2);
					if (i == 0) {
						arrCheck.push(2)
						arrCheck.push(3)
					}
					else if (i == 4) {
						arrCheck.push(8)
					}
					else {
						arrCheck.push(i + 3)
					}
				}
			}
			GGlobal.modelBaZhenTu.CG_FENJIE_4421(arrCheck)
		} else {
			GGlobal.modelBaZhenTu.CGFenjie4409(arr);
		}
	}

	private onLock() {
		if (this._selectVo) {
			if (this._selectVo.cfg && this._selectVo.cfg.type != 0) {
				GGlobal.modelBaZhenTu.CGLocked4413(this._selectVo.pos, 1);
			}
		}
	}

	private onUnLock() {
		if (this._selectVo) {
			GGlobal.modelBaZhenTu.CGLocked4413(this._selectVo.pos, 0);
		}
	}

	private _showArr;
	private update() {
		this._showArr = [];
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			this._showArr.push(Model_BaZhenTu.bagArr[i]);
		}
		this._showArr.sort(this.sortFunc);
		this.list.numItems = this._showArr.length;
		if (Model_BaZhenTu.bagArr.length > 0) {
			this.list.scrollToView(0);
			this.list.selectedIndex = 0
		}
		this.upSelect(this._showArr[0])
		this.upFuwen();
		this.btnFenJ.checkNotice = Model_BaZhenTu.checkFenJ()
	}

	private sortFunc(a: VoBaZhenTu, b: VoBaZhenTu) {
		if (a.pz != b.pz) {
			return a.pz - b.pz;
		}
		if (a.starLv != b.starLv) {
			return a.starLv - b.starLv;
		}
		if (a.level != b.level) {
			return a.level - b.level;
		}
		return a.id - b.id;
	}

	private _selectVo: VoBaZhenTu;
	private upSelect(v: VoBaZhenTu) {
		let self = this;
		self._selectVo = v;
		self.grid.isShowEff = true
		self.grid.vo = v;
		if (v && v.cfg) {
			self.lbName.text = ConfigHelp.createColorName(v.name, v.pz)//HtmlUtil.fontNoSize(v.name, Color.QUALITYCOLORH[v.pz]);
			if (v.type == 0) {
				self.lbLevel.text = "";
				self.lbPower.text = ""
				self.lbAttr.text = v.tipDes;
			} else {
				self.lbLevel.text = "Lv." + v.level + "/" + v.maxLv;
				self.lbPower.text = "战力：" + v.power;
				self.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
			}
			if (v.type == 0) {
				self.btnLock.visible = false;
				self.btnUnLock.visible = false;
				self.imgLock.visible = false;
			} else {
				if (v.locked == 0) {
					self.btnLock.visible = true;
					self.btnUnLock.visible = false;
				} else {
					self.btnLock.visible = false;
					self.btnUnLock.visible = true;
				}
				self.imgLock.visible = v.locked == 1;
			}
		} else {
			self.lbPower.text = ""
			self.lbName.text = ""
			self.lbLevel.text = ""
			self.lbAttr.text = ""
			self.btnLock.visible = false;
			self.btnUnLock.visible = false;
			self.imgLock.visible = false;
		}
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VBaZTGridFenJ = obj as VBaZTGridFenJ;
		gird.grid.isShowEff = true;
		gird.voFenJ = this._showArr[index]
	}

	private itemClick(e: fairygui.ItemEvent): void {
		var gird: VBaZTGridFenJ = e.itemObject as VBaZTGridFenJ
		this.upSelect(gird.vo)
		gird.onCheck()
		this.upFuwen();
	}

	private upLock() {
		this.list.numItems = Model_BaZhenTu.bagArr.length
		if (this._selectVo) {
			this.upSelect(this._selectVo)
		} else {
			this.upSelect(Model_BaZhenTu.bagArr[0])
		}
		this.upFuwen();
	}

	private onCheck(e: egret.TouchEvent) {
		let checkBtn: fairygui.GButton = e.currentTarget as fairygui.GButton
		if (checkBtn.id == this._checkArr[3].id || checkBtn.id == this._checkArr[4].id) {
			if (checkBtn.selected) {
				ViewAlert.show(`当前选中了珍稀符文，确认分解？`, Handler.create(this, this.doCheckSure, [checkBtn], true),
					ViewAlert.OKANDCANCEL, "确认", "取消", Handler.create(this, this.doCheckCancel, [checkBtn], true), false, Handler.create(this, this.doCheckCancel, [checkBtn], true));
				return;
			}
		}
		this.doCheck();
	}

	private doCheckSure(check: fairygui.GButton) {
		check.selected = true
		this.doCheck();
	}

	private doCheckCancel(check: fairygui.GButton) {
		check.selected = false
		this.doCheck();
	}

	private idxArr = [0, 0, 0, 0, 1, 2, 3, 3, 4]
	//				 [0, 1, 2, 3, 4, 5, 6, 7, 8]

	private doCheck() {
		let arr = [];
		for (let i = 0; i < 5; i++) {
			if (this._checkArr[i].selected) {
				if (i == 0) {
					arr.push(2)
					arr.push(3)
				}
				else if (i == 4) {
					arr.push(8)
				}
				else {
					arr.push(i + 3)
				}
			}
		}
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			let isFj = 0
			for (let j = 0; j < arr.length; j++) {
				if (v.pz == arr[j]) {
					isFj = 1;
					break
				}
			}
			v.fenJ = isFj
		}
		GGlobal.modelBaZhenTu.notify(Model_BaZhenTu.CHECKED);
		this.upFuwen();
	}

	private upFuwen() {
		let total = 0
		let toGod = 0
		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			if (v.locked == 1 && v.type > 0) {
				continue;
			}
			if (v.fenJ == 1) {
				total += v.fjExp;
				toGod += v.fjGod;
			}
		}
		let str = ConfigHelp.numToStr(Model_player.voMine.fuwen);
		if (total > 0) {
			str += HtmlUtil.fontNoSize("(+" + ConfigHelp.numToStr(total) + ")", Color.GREENSTR)
		}
		this.labChip.text = str
		//神符碎片
		str = ConfigHelp.numToStr(Model_Bag.getItemCount(Model_BaZhenTu.GODid));
		if (toGod > 0) {
			str += HtmlUtil.fontNoSize("(+" + ConfigHelp.numToStr(toGod) + ")", Color.GREENSTR)
		}
		this.labGod.text = str
	}

	private upFenJ() {
		for (let i = 0; i < 5; i++) {
			this._checkArr[i].selected = false
		}
		this.update();
	}
}