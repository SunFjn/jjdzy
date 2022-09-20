class ChildShiZhuang extends fairygui.GComponent {
	public labName: fairygui.GTextField;
	public list: fairygui.GList;
	public labAttrCur: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labAttrMax: fairygui.GTextField;
	public labCost: fairygui.GTextField;
	public labStar: fairygui.GTextField;
	public img: fairygui.GLoader;
	public btnUp: Button0;
	public labPower: fairygui.GTextField;
	public imgArrow: fairygui.GImage;
	public boxMax: fairygui.GGroup;
	public list2: fairygui.GList;
	public btnLeft: fairygui.GImage;
	public btnRight: fairygui.GImage;
	public iconMR: fairygui.GTextField;
	public static URL: string = "ui://zyx92gzweqmk38";

	private awatar: UIRole = null;
	private _showArr: Ihero_211[];
	private _clickVo: any;
	private _index: number;
	public iconDressSt: fairygui.GLoader;
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHander;
		self.list.setVirtual();
		self._index = self.displayListContainer.getChildIndex(self.img.displayObject);
		self.list2.callbackThisObj = self;
		self.list2.itemRenderer = self.renderHander2;
		self.list2.addEventListener(fairygui.ItemEvent.CLICK, self.onItemClick2, self);
		self.btnLeft.touchable = self.btnRight.touchable = true;
		self.iconDressSt.displayObject.touchEnabled = true;
		self.iconDressSt.addClickListener(self.onDress, self);
		CommonManager.listPageChange("ChildShiZhuang", self.list2, self.btnLeft, self.btnRight, 3);
	}
	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VWuJiangGrid = obj as VWuJiangGrid;
		gird.vo = this._showArr[index];
	}
	private renderHander2(index: number, renderer: ItemSZ) {
		const data = this.curSZArr[index];
		renderer.data = data;
	}
	public addEvent(): void {
		let self = this;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.img.x, self.img.y);
			// this.awatar.setScaleXY(1.5, 1.5);
			let horseId = Model_player.voMine.horseId
			if (horseId) {
				self.awatar.setScaleXY(1, 1);
			} else {
				self.awatar.setScaleXY(1.5, 1.5);
			}
		}
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemClick, self);
		self.btnUp.addClickListener(self.onClickUp, self);
		GGlobal.modelWuJiang.listen(Model_WuJiang.msg_data_shiZhuang, self.update, self);
	}

	public removeEvent(): void {
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		GGlobal.modelWuJiang.remove(Model_WuJiang.msg_data_shiZhuang, this.update, this);
		this.btnUp.removeClickListener(this.onClickUp, this);
		this.list.numItems = 0;
		this.curSelSZ = null;
		this.curSelWJ = null;
		Timer.instance.remove(this.playSkill, this);
		this.secSkill = 0;
	}

	private sortWuJiang(): void {
		var arr1 = [];//正在展示
		var arr2 = [];//已激活
		var arr3 = [];//可激活
		var arr4 = [];//未激活
		for (let i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
			let v = Model_WuJiang.wuJiangArr[i];
			if (v.type == Model_player.voMine.job) {
				arr1.push(v);
				continue;
			}
			let star = Model_WuJiang.wuJiangStar[v.type];
			if (star) {
				arr2.push(v);
				continue;
			}
			let can = Model_WuJiang.checkStarVo(v);
			if (can) {
				arr3.push(v);
				continue;
			}
			arr4.push(v);
		}
		arr2.sort(Model_WuJiang.sortWuJiang);
		arr3.sort(Model_WuJiang.sortWuJiang);
		arr4.sort(Model_WuJiang.sortWuJiang);
		this._showArr = arr1.concat(arr2).concat(arr3).concat(arr4);
	}

	public show(job = 0): void {
		let self = this;
		self.sortWuJiang();
		let index = 0
		self.list.numItems = self._showArr.length;
		if (job > 0) {
			for (let i = 0; i < self._showArr.length; i++) {
				if (self._showArr[i].type == job) {
					index = i;
					break;
				}
			}
		}
		this.list.selectedIndex = index;
		this.list.scrollToView(index);
		this.setSel(this._showArr[index]);
	}

	public hide() {
		this.curSelSZ = null;
		this.curSelWJ = null;
	}
	/**武将选择 */
	private itemClick(evt: fairygui.ItemEvent) {
		const renderer: VWuJiangGrid = evt.itemObject as VWuJiangGrid;
		const data: Ihero_211 = renderer.vo;
		this.setSel(data);
	}
	/**时装选择 */
	private onItemClick2(evt: fairygui.ItemEvent) {
		const renderer: ItemSZ = evt.itemObject as ItemSZ;
		const data = renderer.data;
		if (data) {
			this.setSel2(data);
		} else {
			evt.preventDefault();
			ViewCommonWarn.text("敬请期待");
		}
	}
	private setSel(vo: Ihero_211) {
		this.curSelWJ = vo;
		Model_WuJiang.selectJob = vo.type;
		this.list2.numItems = 0;
		this.curSelSZ = null;
		GGlobal.modelWuJiang.CG3501(vo.type);
	}
	private curRender: ItemSZ;
	private setSel2(vo: Isz_739) {
		this.curSelSZ = vo;
		const index = this.curSZArr.indexOf(vo);
		if (index >= 0) {
			this.list2.selectedIndex = index;
			this.list2.scrollToView(index);
			for (let i = 0; i < this.list2.numItems; i++) {
				var renderer = this.list2._children[i] as ItemSZ;
				if (renderer.data === vo) {
					if (this.curRender) {
						this.curRender.selected = false;
					}
					(this.curRender = renderer).selected = true;
					break;
				}
			}
		}
		this.showSZDetail();
	}

	private shiZhuangDic: { [wjId: number]: Isz_739[] } = <any>{};
	private curSZArr: Isz_739[];
	private curSelSZ: Isz_739;
	private curSelWJ: Ihero_211;
	private update() {
		const self = this;
		const wjId = Model_WuJiang.curSelWJId;//武将id
		if (!self.shiZhuangDic[wjId]) {
			self.initShiZhuang(wjId);
		}
		self.curSZArr = self.shiZhuangDic[wjId];
		self.list2.numItems = self.curSZArr.length;
		const info = Model_WuJiang.shiZhuanDic[wjId];//用model返回的id作准
		if (!self.curSelSZ) {
			if (info.onSkinId) {
				self.setSel2(self.curSZArr[1]);
			} else {
				self.setSel2(self.curSZArr[0]);
			}
		} else {
			self.setSel2(self.curSelSZ);
		}

		const wjCFG = Config.hero_211[wjId];
		self.labName.text = wjCFG.name;
		self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(wjCFG));
		//0常用时装 null是敬请期待
		for (let i = 1; i < self.list2._children.length; i++) {
			const item = self.list2._children[i] as ItemSZ;
			if (item.data != null) {
				let starLv = 0;
				for (let j = 0; j < info.ownSkinIds.length; j++) {
					if (info.ownSkinIds[j].skinId == item.data.ID) {
						starLv = info.ownSkinIds[j].starLv;
						break;
					}
				}
				item.setNot(Model_WuJiang.SZCheck(wjCFG, item.data.ID) && (Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId)));
			}
		}
		for (let i = 0; i < this.list._children.length; i++) {
			const renderer = this.list._children[i] as VWuJiangGrid;
			renderer.setNot();
		}
	}
	private showMX(vo: Ihero_211) {//展示模型
		const szMX = this.curSelSZ.moxing;
		let self = this;
		var job = 0;
		if (szMX) {
			self.awatar.setBody(szMX);
			self.awatar.setWeapon(this.curSelSZ.ID);
			job = self.curSelSZ.ID / 1000 >> 0;
		} else {
			self.awatar.setBody(vo.type);
			self.awatar.setWeapon(vo.type);
			job = vo.type;
		}
		self.awatar.setGodWeapon(Model_ZSGodWeapon.getGodWeaponByJob(job));
		let horseId = Model_player.voMine.horseId
		self.awatar.setHorseId(horseId);
		this.awatar.uiparent = this.displayListContainer;
		this.awatar.onAdd();
		// this.displayListContainer.setChildIndex(this.awatar.view, this._index + 1);
		this.addChild(this.labName)
		this.addChild(this.iconDressSt)

		if (horseId == 0) {
			var secSkill = JSON.parse(Config.hero_211[job].skills)[1][0];
			if (secSkill != this.secSkill) {
				this.secSkill = secSkill;
				Timer.instance.remove(this.playSkill, this);
				this.playSkill();
			}
		} else {
			Timer.instance.remove(this.playSkill, this);
		}
	}
	private secSkill;
	private playSkill() {
		this.awatar.playSkillID(this.secSkill, false);
		Timer.instance.callLater(this.playSkill, 5000, this);
	}
	private getShiZhuang(skinId: number) {
		const {curSZArr} = this;
		for (let i = 0; i < curSZArr.length; i++) {
			if (curSZArr[i].ID == skinId) {
				return curSZArr[i];
			}
		}
		return null;
	}
	private initShiZhuang(wjId: number) {//解释编号ID，获取所属时装ID群
		const {shiZhuangDic} = this;
		const lib = Config.sz_739;
		var arr = shiZhuangDic[wjId] = [];
		var pifu: number = Config.hero_211[wjId].pifu;
		var pinzhi: number = Config.hero_211[wjId].pfpinzhi;
		for (let key in lib) {
			const ID = lib[key].ID;
			const tempWJID = Number(ID / 1000 >> 0);
			if (tempWJID == wjId) {
				arr.push(lib[key]);
			}
		}
		arr.unshift([pifu, pinzhi]);
		arr.push(null);
	}
	private _needItem: VoItem;
	private _hasNeed: boolean;
	private hasActived: boolean = false;
	/**时装信息 */
	private showSZDetail() {
		const self = this;
		const tempSZ = self.curSelSZ;
		const wjId = Model_WuJiang.curSelWJId;
		const info = Model_WuJiang.shiZhuanDic[wjId];
		const arr = info.ownSkinIds;
		const wjCFG = Config.hero_211[wjId];
		self.showMX(wjCFG);
		self.iconDressSt.visible = true;
		if (Array.isArray(tempSZ)) {//默认
			self.btnUp.visible = false;
			self.labPower.text = "0";
			self.labStar.visible = false;
			self.labAttrCur.text = "";
			self.labAttrMax.text = "";
			self.labAttrNext.text = "";
			self.imgArrow.visible = false;
			self.iconMR.visible = true;
			self.labCost.text = "";
			self.boxMax.visible = false;
			if (info.onSkinId == 0) {
				self.iconDressSt.url = "ui://zyx92gzwur843c";
				self.iconDressSt.data = DressSt.DRESSED;
			} else {
				self.iconDressSt.url = "ui://zyx92gzwur843d";
				self.iconDressSt.data = DressSt.UNDRESSED;
			}
			self.iconMR.text = "默认时装不可升星";
		} else {
			self.labStar.visible = true;
			self.iconMR.visible = false;
			self.hasActived = false;
			var starLv = 0;
			var star_max = 0;
			for (let i = 0; i < arr.length; i++) {
				var tempObj = arr[i];
				if (tempObj.skinId == tempSZ.ID) {
					self.hasActived = true;
					starLv = tempObj.starLv;
					break;
				}
			}
			if (tempSZ) star_max = tempSZ.shangxian;
			const hasDressed = self.hasDressed = info.onSkinId == tempSZ.ID;
			if (hasDressed) {//已穿戴
				self.iconDressSt.url = "ui://zyx92gzwur843c";
				self.iconDressSt.data = DressSt.DRESSED;
			} else {
				self.iconDressSt.url = "ui://zyx92gzwur843d";
				self.iconDressSt.data = DressSt.UNDRESSED;
			}
			const attrArr = ConfigHelp.SplitStr(tempSZ.shuxing);
			var starattrArr = ConfigHelp.SplitStr(tempSZ.shengxing)
			var starAllArr = [];
			if (starLv > 0) {
				for (let i = 0; i < starattrArr.length; i++) {
					starAllArr[i] = [];
					starAllArr[i][0] = Number(starattrArr[i][0]);
					starAllArr[i][1] = Number(starattrArr[i][1]) * (starLv - 1);
				}
			}
			var allAttrArr = [attrArr];
			if (self.hasActived) {//已激活
				self.labPower.text = "" + starLv * tempSZ.sxzhanli;
				self.labStar.text = ConfigHelp.getStarFontStr(starLv);
				if (starLv >= star_max) {//满级
					allAttrArr.push(starAllArr)
					self.labAttrCur.text = "";
					self.labAttrNext.text = "";
					self.labAttrMax.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+", null, "#15f234");
					self.imgArrow.visible = false;
					self.btnUp.touchable = self.btnUp.visible = false;
					self.boxMax.visible = true;
				} else {
					self.imgArrow.visible = true;
					self.btnUp.text = "升星";
					allAttrArr.push(starAllArr);
					self.labAttrCur.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+");
					allAttrArr.push(starattrArr);
					self.labAttrNext.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+", null, "#15f234");
					self.labAttrMax.text = "";
					self.boxMax.visible = false;
					self.btnUp.touchable = self.btnUp.visible = true;
				}
			} else {
				self.labPower.text = "0";
				self.labStar.text = ConfigHelp.getStarFontStr(0);
				self.labAttrCur.text = "";
				self.labAttrNext.text = "";
				self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
				self.imgArrow.visible = false;
				self.boxMax.visible = false;
				self.btnUp.text = "激活";
				self.iconDressSt.visible = false;
				self.btnUp.touchable = self.btnUp.visible = true;
			}
			if (starLv >= star_max) {
				self.labCost.text = ""
			} else {
				//升星道具
				var consume = ConfigHelp.SplitStr(tempSZ.jihuo);
				self._needItem = VoItem.create(Number(consume[0][1]))
				var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
				var count = Number(consume[0][2])
				var colorStr;
				if (hasCount >= count) {
					colorStr = '#00FF00';
					self._hasNeed = true;
					self.btnUp.checkNotice = Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId);
				} else {
					colorStr = '#FF0000';
					self._hasNeed = false;
					self.btnUp.checkNotice = false;
				}
				self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
					"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
			}
		}
		if (!(Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId))) {
			self.iconMR.visible = true;
			self.btnUp.visible = false;
			self.labAttrMax.text = "";
			self.labCost.text = "";
			self.iconMR.text = "请先激活武将";
			self.iconDressSt.visible = false;
		}
		if (GGlobal.modelWuJiang.isJH) {
			GGlobal.modelWuJiang.isJH &= 0;
			GGlobal.modelWuJiang.CG3505(this.curSelWJ.type, this.curSelSZ.ID);
		}
	}
	/**激活或者升星 */
	private onClickUp() {
		if (!this._hasNeed) {
			View_CaiLiao_GetPanel.show(this._needItem);
			return;
		}
		GGlobal.modelWuJiang.CG3503(this.curSelSZ.ID, Number(!this.hasActived));
	}
	private hasDressed: boolean = false;
	/**穿戴 */
	private onDress() {
		if (this.iconDressSt.data == DressSt.UNDRESSED) {
			GGlobal.modelWuJiang.CG3505(this.curSelWJ.type, this.curSelSZ.ID);
		}
	}

	/**attr值叠加   格式 [[[101,100]],[[101,100]]...] */
	public addAttrValue(arr: Array<any>): Array<any> {
		var returnArr = [];
		var index = 0;
		for (let i: number = 0; i < arr.length; i++) {
			var attrArr: Array<any> = arr[i];
			for (let j = 0; j < attrArr.length; j++) {
				let attrType: number = Number(attrArr[j][0]);
				let attrValue: number = Number(attrArr[j][1]);
				let has = false;
				for (let k = 0; k < returnArr.length; k++) {
					if (returnArr[k][0] == attrType) {
						returnArr[k][1] += attrValue;
						has = true;
						break;
					}
				}
				if (!has) {
					returnArr[index] = []
					returnArr[index].push(attrType, attrValue);
					index++;
				}
			}
		}
		return returnArr;
	}

}
enum DressSt {
	DRESSED, UNDRESSED
}