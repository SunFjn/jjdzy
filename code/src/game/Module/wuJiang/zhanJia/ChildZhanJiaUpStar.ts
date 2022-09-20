class ChildZhanJiaUpStar extends fairygui.GComponent {

	public useImg: fairygui.GImage;
	public bwIcon: fairygui.GLoader;
	public drugBt: Button2;
	public useBt: Button2;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public starLb: fairygui.GTextField;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public attGroup: fairygui.GGroup;
	public upStarBt: Button0;
	public costLb: fairygui.GRichTextField;
	public upStarGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public drugCount: fairygui.GRichTextField;
	public skillDes: fairygui.GRichTextField;
	public showAtt: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public lbTip: fairygui.GRichTextField;
	public showBt: fairygui.GButton;
	public starPowerLb: fairygui.GTextField;
	public promptLb0: fairygui.GLabel;
	public jueXingBt: Button2;

	public static URL: string = "ui://3tzqotadqqvu23";
	private _showArr: Array<Iclothes_212>;
	private _selectVo: Iclothes_212;
	private _hasNeed: boolean

	public static createInstance(): ChildZhanJiaUpStar {
		return <ChildZhanJiaUpStar><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.promptLb0.text = "战甲效果";
		s.list.callbackThisObj = this;
		s.list.itemRenderer = s.renderHander;
		s.list.setVirtual();
		s.showBt.addClickListener(s.showHandler, s);
		s.jueXingBt.addClickListener(s.OnJueXing, s);
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.ZHAN_JIA);
	}

	private showHandler() {
		if (this._selectVo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(6, this._selectVo.id);
		}
	}

	public addEvent(): void {
		let s = this;
		s.list.addEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
		s.upStarBt.addClickListener(s.onClickUp, s);
		s.drugBt.addClickListener(s.onClickGrid0, s);
		GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_STAR, s.upStar, s);
		GGlobal.reddot.listen(UIConst.JUEXING, s.updateJuexing, s);
	}

	public removeEvent(): void {
		let s = this;
		if (s.curItem) s.curItem.selectImg.visible = false;
		s.curItem = null;
		s.list.numItems = 0;
		s.list.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
		s.upStarBt.removeClickListener(s.onClickUp, s);
		s.drugBt.removeClickListener(s.onClickGrid0, s);
		GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_STAR, s.upStar, s);
		GGlobal.reddot.remove(UIConst.JUEXING, s.updateJuexing, s);
		Model_GlobalMsg.selectID = 0;
	}

	private sortWuJiang(): void {
		var arr2 = [];//已激活
		var arr3 = [];//可激活
		var arr4 = [];//未激活
		for (let i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
			let v = Model_ZhanJia.zhanJiaArr[i]
			let star = Model_ZhanJia.zhanjiaStar[v.id]
			if (star) {
				arr2.push(v);
				continue;
			}
			let can = Model_ZhanJia.checkStarVo(v);
			if (can) {
				arr3.push(v);
				continue;
			}
			arr4.push(v);
		}
		arr3.sort(Model_ZhanJia.sortZhanJia)
		arr2.sort(Model_ZhanJia.sortZhanJia)
		arr4.sort(Model_ZhanJia.sortZhanJia1)
		this._showArr = arr3.concat(arr2).concat(arr4)
	}

	private upStar(): void {
		let s = this;
		s.sortWuJiang();
		let index = 0;
		for (let i = 0; i < s._showArr.length; i++) {
			if (s._showArr[i].id == s._selectVo.id) {
				index = i
				break;
			}
		}
		s.list.selectedIndex = index;
		let temp = index;
		if (temp >= 0 && temp <= 2) {
			temp = 0;
		} else if (temp > 2) {
			temp -= 2;
		}
		s.list.scrollToView(temp, true);
		s.update()
	}

	public init(): void {
		let s = this;
		s.sortWuJiang();
		let index = 0;
		if (Config.clothes_212[Model_GlobalMsg.selectID]) {
			for (let i = 0; i < s._showArr.length; i++) {
				let v = s._showArr[i]
				if (v.id == Model_GlobalMsg.selectID) {
					index = i
					break;
				}
			}
		} else {
			for (let i = 0; i < s._showArr.length; i++) {
				let v = s._showArr[i]
				let star = Model_ZhanJia.zhanjiaStar[v.id]
				let can = Model_ZhanJia.checkStarVo(v);
				if (!star && can) {
					index = i
					break;
				}
			}
		}

		s.list.numItems = s._showArr.length;
		if (s.curItem) s.curItem.selectImg.visible = false;
		let grid = (s.list._children[index] as VZhanJiaGrid)
		if (grid) {
			grid.selectImg.visible = true;
			s.curItem = grid;
		}
		s.selectdUpdate(s._showArr[index]);
		let temp = index;
		if (temp >= 0 && temp <= 2) {
			temp = 0;
		} else if (temp > 2) {
			temp -= 2;
		}
		s.list.scrollToView(temp, true);
	}

	private _voItem0: VoItem
	public update(): void {
		let s = this;
		s.list.numItems = s._showArr.length;
		if (s._selectVo) {
			s.selectdUpdate(s._selectVo);
		}
		else {
			(s.list._children[0] as VZhanJiaGrid).selectImg.visible = true;
			s.curItem = (s.list._children[0] as VZhanJiaGrid);
			s.selectdUpdate(s._showArr[0]);
		}
		var maxCount0 = 0;
		var maxCount1 = 0;
		for (let keys in Model_ZhanJia.zhanjiaStar) {
			var star = Model_ZhanJia.zhanjiaStar[keys];
			var zhanjia = Config.clothes_212[keys]
			maxCount0 += zhanjia.max1 * star;
			maxCount1 += zhanjia.max2 * star;
		}
		if (s._voItem0 == null) {
			s._voItem0 = VoItem.create(Model_ZhanJia.DAN_SHUXING)
		}
		s._voItem0.count = Model_Bag.getItemCount(Model_ZhanJia.DAN_SHUXING)
		s.drugCount.text = Model_ZhanJia.danShuxing + "/" + maxCount0

		s.drugBt.checkNotice = s._voItem0.count > 0 && Model_ZhanJia.danShuxing < maxCount0;
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VZhanJiaGrid = obj as VZhanJiaGrid
		gird.vo = this._showArr[index];
		if (this._selectVo && this._selectVo.id == gird.vo.id) {
			gird.selectImg.visible = true;
			this.curItem = gird;
		} else {
			gird.selectImg.visible = false;
		}
	}

	private itemClick(e: fairygui.ItemEvent): void {
		let self = this;
		var selectItem = e.itemObject as VZhanJiaGrid;
		if (self._selectVo && self._selectVo.id == selectItem.vo.id) return;
		if (self.curItem) self.curItem.selectImg.visible = false;
		self.curItem = null;
		self._selectVo = null;
		selectItem.selectImg.visible = true;
		self.curItem = selectItem;
		this.selectdUpdate(selectItem.vo)
	}

	private bwEff: Part;
	private curItem: VZhanJiaGrid;
	private selectdUpdate(vo: Iclothes_212): void {
		let self = this;
		let cf = Config.clothesstar_212;
		self._selectVo = vo;
		var star = Model_ZhanJia.zhanjiaStar[vo.id];
		if (!star) {
			star = 0
		}
		self.powerLb.text = Model_ZhanJia.getPowerStarVo(vo) + "";
		var attrArr;
		var nextArr;
		self.attGroup.visible = false;
		self.showAtt.visible = true;
		self.maxGroup.visible = false;
		self.upStarGroup.visible = true;
		self.skillDes.visible = false;
		self.skillDes.text = "";
		if (star == 0) {//0级
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + 1].attr);
			self.showAtt.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.upStarBt.text = "激活"
			self.starPowerLb.text = cf[vo.pinzhi * 1000 + 1].power + "";
		} else if (star >= vo.star) {//满级
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr);
			self.showAtt.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
			self.maxGroup.visible = true;
			self.upStarGroup.visible = false;
			self.upStarBt.checkNotice = false;
		} else {
			attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr);
			nextArr = JSON.parse(cf[Config.clothesstar_212[vo.pinzhi * 1000 + star].next].attr);
			self.curAtt.text = ConfigHelp.attrString(attrArr, "+");
			self.nextAtt.text = ConfigHelp.attrString(nextArr, "+", null, "#15f234");
			self.upStarBt.text = "升星";
			self.attGroup.visible = true;
			self.showAtt.visible = false;
			self.starPowerLb.text = (cf[cf[vo.pinzhi * 1000 + star].next].power - cf[vo.pinzhi * 1000 + star].power) + "";
		}
		if (star >= vo.star) {
			self.lbTip.text = "已提升战甲属性丹吞噬上限：" + HtmlUtil.fontNoSize((vo.max1 * star) + "", Color.getColorStr(5));
		} else {
			self.lbTip.text = "可提升战甲属性丹吞噬上限：" + HtmlUtil.fontNoSize((vo.max1 * (star + 1)) + "", Color.getColorStr(5));
		}

		self.starLb.text = ConfigHelp.getStarFontStr(star)
		//升星道具
		if (star >= vo.star) {
		} else {
			var consume = ConfigHelp.SplitStr(vo.item)
			self._needItem = VoItem.create(Number(consume[0][1]))
			var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
			var count = Number(consume[0][2])
			var colorStr;
			if (hasCount >= count) {
				colorStr = '#00FF00';
				self._hasNeed = true;
			} else {
				colorStr = '#FF0000';
				self._hasNeed = false;
			}
			self.costLb.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
				"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]"
		}
		IconUtil.setImg(self.bwIcon, Enum_Path.ZHANJIA_URL + vo.pic + ".png");
		if (self.bwEff) {
			EffectMgr.instance.removeEff(self.bwEff);
			self.bwEff = null;
		}
		if (vo.tptx > 0) {
			if (!self.bwEff) {
				self.bwEff = EffectMgr.addEff("uieff/" + vo.tptx, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
			}
		}
		self.nameLb.text = vo.name
		var quality = Model_ZhanJia.getZhanJiaQuality(vo)
		self.nameLb.color = Color.getColorInt(quality);
		self.upStarBt.checkNotice = Model_ZhanJia.checkStarVo(vo)
		self.showBt.visible = star > 0;
		self.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.ZHAN_JIA);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 6);
	}

	private _needItem: VoItem;
	private onClickUp(): void {
		let s = this;
		if (!s._hasNeed) {
			View_CaiLiao_GetPanel.show(s._needItem);
			return;
		}
		if (s._selectVo) {
			GGlobal.modelZhanJia.CGZhanJiaStar(s._selectVo.id);
		}
	}

	private onClickGrid0(): void {
		GGlobal.layerMgr.open(UIConst.TIP_ZHANJIA_DAN, this._voItem0)
	}


	public clean() {
		let self = this;
		if (self.curItem) self.curItem.selectImg.visible = false;
		self.curItem = null;
		self._selectVo = null;
		self.list.numItems = 0;
		IconUtil.setImg(self.bwIcon, null);
		if (self.bwEff) {
			EffectMgr.instance.removeEff(self.bwEff);
			self.bwEff = null;
		}
	}
}