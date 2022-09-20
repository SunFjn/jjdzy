class ChildSuit extends fairygui.GComponent {

	public labNeed: fairygui.GRichTextField;
	public boxMax: fairygui.GGroup;
	public labPower: fairygui.GLabel;
	public list: fairygui.GList;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public lab1: fairygui.GRichTextField;
	public listGrid: fairygui.GList;
	public labAttr: fairygui.GLabel;
	public lab2: fairygui.GRichTextField;
	public lab3: fairygui.GRichTextField;
	public labName: fairygui.GLabel;
	public labLevel: fairygui.GRichTextField;
	public labSM: fairygui.GRichTextField;
	public btnExplain: fairygui.GRichTextField;
	public btnActivity: Button1;
	public imgName: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;

	public static URL: string = "ui://3tzqotadby8m38";

	private _selectVo: VoBingFaSuit
	private _jiBanArr: VoBingFaSuit[];
	private _conditionArr: any[]
	private sysName = "兵法"

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const sf = this;
		CommonManager.parseChildren(sf, sf);
		sf.list.callbackThisObj = sf;
		sf.list.itemRenderer = sf.renderHander;
		sf.list.setVirtual();

		sf.listGrid.callbackThisObj = sf;
		sf.listGrid.itemRenderer = sf.renderGrid;
	}

	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.btnRight, EventUtil.TOUCH, self.pageHandler, self);
		event(t, self.btnLeft, EventUtil.TOUCH, self.pageHandler, self);
		event(t, self.btnExplain, EventUtil.TOUCH, self.onExplain, self);
		event(t, self.btnActivity, EventUtil.TOUCH, self.onClickActivity, self);
		event(t, self.list, fairygui.ItemEvent.CLICK, self.onClickList, self);
	}

	public open(): void {
		const sf = this;
		const control = GGlobal.control;
		sf.eventFunction(1);
		GGlobal.modelBingFa.listen(Model_BingFa.SUIT_ACTIVE, sf.jiBanUp, sf);
		sf.update();
	}

	public hide(): void {
		const sf = this;
		const control = GGlobal.control;
		sf.eventFunction(0);
		GGlobal.modelBingFa.remove(Model_BingFa.SUIT_ACTIVE, sf.jiBanUp, sf);
		IconUtil.setImg1(null, sf.imgName);
		IconUtil.setImg1(null, sf.imgIcon);
	}

	private jiBanUp() {
		const sf = this;
		sf.list.numItems = sf._jiBanArr.length;
		var selectIndex = Math.floor(sf._selectVo.id / 1000);
		sf.selectdUpdate(sf._jiBanArr[selectIndex - 1])
		sf.upPower();
	}

	public update(): void {
		const sf = this;
		sf._jiBanArr = GGlobal.modelBingFa.suitData
		sf.list.numItems = sf._jiBanArr.length;
		sf.list.scrollToView(0);
		sf.list.selectedIndex = 0;
		sf.selectdUpdate(sf._jiBanArr[0])
		sf.upPower();
	}

	private upPower(): void {
		//套装战力
		const sf = this;
		var power = 0;
		if (sf._jiBanArr) {
			for (let i = 0; i < sf._jiBanArr.length; i++) {
				let v = sf._jiBanArr[i];
				let suit = Config.booksuit_212[v.id];
				if (suit) {
					power += suit ? suit.power : 0
				}
			}
		}
		sf.labPower.text = power + ""
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		const sf = this;
		var gird: Button3 = obj as Button3;
		var v = sf._jiBanArr[index]
		gird.title = v.name;
		gird.data = v;
		gird.checkNotice = Model_BySys.checkSuitVo(v.id, Model_BySys.JIB_BINGFA)
	}

	private renderGrid(index: number, obj: fairygui.GObject): void {
		const sf = this;
		let v: BingfaItem = obj as BingfaItem
		v.setSuitVo(sf._conditionArr[index].v);
	}

	private onClickList(e: fairygui.ItemEvent): void {
		const sf = this;
		var selectItem = e.itemObject as fairygui.GButton
		sf.selectdUpdate(selectItem.data)
	}

	private selectdUpdate(v: VoBingFaSuit): void {
		const sf = this;
		if (v == null) {
			return;
		}
		sf._selectVo = v;
		var suitId = v.id
		var level = suitId % 1000
		var suit = Config.booksuit_212[suitId];
		var suitNext = Config.booksuit_212[suitId + 1];
		if (level == 0) {
			sf.btnActivity.text = "激活"
		} else {
			sf.btnActivity.text = "升级"
		}
		sf.labLevel.text = "羁绊等级：" + level
		sf.labSM.text = suit.tips
		sf.labName.text = suit.name;

		var conditionArr
		sf._hasCondition = true;
		if (suit.condition == "0") {//满级
			sf.btnActivity.touchable = sf.btnActivity.visible = false
			sf.labNeed.text = "";
			sf.labAttrCur.text = "";
			sf.boxMax.visible = true;
			sf.imgArrow.visible = false;
			sf.labAttrNext.text = ""
			sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+", null, "#15f234") + sf.jcTxt(suit.jc, Color.getColorStr(Color.ORANGE))

			var suitPre = Config.booksuit_212[suitId - 1];
			conditionArr = ConfigHelp.SplitStr(suitPre.condition)
			sf._hasCondition = false;
		} else {//升级
			if (suit.power == 0) {//0级
				sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + sf.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE))
				sf.labAttrCur.text = ""
				sf.labAttrNext.text = ""
				sf.imgArrow.visible = false;
			} else {
				sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+") + sf.jcTxt(suit.jc)
				sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + sf.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE))
				sf.labAttrMax.text = ""
				sf.imgArrow.visible = true;
			}
			sf.boxMax.visible = false;
			sf.btnActivity.visible = true

			var allNum = 0;
			var reachNum = 0;
			var need
			conditionArr = ConfigHelp.SplitStr(suit.condition)
			if (suitId == 0 || suitId % 1000 == 0) {
				need = "【" + suit.name + "】所属" + sf.sysName + "收集进度"
			} else {
				let $star = Number(conditionArr[0][1])
				need = "【" + suit.name + "】所属" + sf.sysName + "达到" + $star + "星"
			}
			for (let j = 0; j < conditionArr.length; j++) {
				let $id = Number(conditionArr[j][0])
				let $star = Number(conditionArr[j][1])
				allNum++;
				let vo: VoBingFa = GGlobal.modelBingFa.mapObj[$id]
				reachNum += vo.star >= $star ? 1 : 0;
			}
			if (reachNum < allNum) {
				sf._hasCondition = false;
			}
			sf.btnActivity.enabled = sf.btnActivity.checkNotice = sf._hasCondition
			sf.labNeed.text = need + HtmlUtil.fontNoSize("(" + reachNum + "/" + allNum + ")", reachNum >= allNum ? '#00ff00' : '#ff0000');
		}
		sf._conditionArr = [];
		for (let i = 0; i < conditionArr.length; i++) {
			let $id = Number(conditionArr[i][0])
			let $star = Number(conditionArr[i][1])
			let vo: VoBingFa = GGlobal.modelBingFa.mapObj[$id]
			sf._conditionArr.push({ v: vo, starLv: $star });
		}
		let totalType = 303;
		let totalValue = 0;
		for (let i = 0; i < sf._jiBanArr.length; i++) {
			let v = sf._jiBanArr[i];
			let cfg = Config.booksuit_212[v.id];

			let arr = ConfigHelp.SplitStr(cfg.attr1)
			totalType = Number(arr[0][0])
			totalValue += Number(arr[0][1])
		}
		if (Config.jssx_002[totalType]) {
			sf.lab2.text = Config.jssx_002[totalType].attr + (totalValue / 1000) + "%"
		}

		sf.lab3.text = "可通过升级" + sf.sysName + "所属羁绊提升效果"
		sf.listGrid.numItems = sf._conditionArr.length;

		IconUtil.setImg1(Enum_Path.JIBAN_URL + "n" + UIConst.BINGFA + ".png", sf.imgName);
		IconUtil.setImg1(Enum_Path.JIBAN_URL + "i" + UIConst.BINGFA + ".png", sf.imgIcon);
	}

	private _hasCondition: boolean = false;
	private onClickActivity(): void {
		const sf = this;
		if (sf._selectVo.isMax) {
			ViewCommonWarn.text("已满级", Color.getColorInt(Color.RED));
			return;
		}
		if (!sf._hasCondition) {
			ViewCommonWarn.text("未满足条件", Color.getColorInt(Color.RED));
			return;
		}
		GGlobal.modelBingFa.CG_ACTIVESUIT_905(sf._selectVo.type);
	}

	private pageHandler(event: egret.TouchEvent): void {
		const sf = this;
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = sf.list.getFirstChildInView();
		switch (btn.id) {
			case sf.btnLeft.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case sf.btnRight.id:
				if (curpage < sf.list.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= sf.list.numItems - 1) curpage = sf.list.numItems - 1;
				}
				break;
		}
		sf.list.scrollToView(curpage, true, true);
	}

	private onExplain(e) {
		GGlobal.layerMgr.open(UIConst.WFLAB_PANEL);
		e.stopPropagation();
		e.stopImmediatePropagation();
	}

	private jcTxt(jc, color?): string {
		const sf = this;
		if (color)
			return HtmlUtil.fontNoSize("\n" + sf.sysName + "属性+" + (jc / 1000) + "%", color);
		else
			return "\n" + sf.sysName + "属性+" + (jc / 1000) + "%";
	}
}