class Child_YB_JiBan extends fairygui.GComponent {

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

	public static createInstance(): Child_YB_JiBan {
		return <Child_YB_JiBan><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu_JiBan"));
	}

	private _selectVo: number
	private _jiBanArr: number[];
	private _conditionArr: Array<Vo_YiBao>;
	private sysName = "异宝"

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
		event(t, self.list, fairygui.ItemEvent.CLICK, self.onClickList, self);
		event(t, self.btnActivity, EventUtil.TOUCH, self.onClickActivity, self);
		event(t, self.btnLeft, EventUtil.TOUCH, self.pageHandler, self);
		event(t, self.btnRight, EventUtil.TOUCH, self.pageHandler, self);
		event(t, self.btnExplain, EventUtil.TOUCH, self.onExplain, self);
	}

	public onOpen(): void {
		const sf = this;
		sf.eventFunction(1);
		GGlobal.control.listen(Enum_MsgType.BY_SYS_JI_BAN, sf.jiBanUp, sf);
		sf.update();
	}

	public onClose(): void {
		const sf = this;
		GGlobal.control.remove(Enum_MsgType.BY_SYS_JI_BAN, sf.jiBanUp, sf);
		IconUtil.setImg(sf.imgName, null);
		IconUtil.setImg(sf.imgIcon, null);
	}

	private jiBanUp(arr) {
		const sf = this;
		let sys = arr[0];
		let index = arr[1];
		let sid = arr[2];
		if (sys != Model_BySys.JIB_YIBAO) {
			return;
		}
		sf._jiBanArr = Model_BySys.getJiBan(Model_BySys.JIB_YIBAO)
		sf.list.numItems = sf._jiBanArr.length;
		var selectIndex = Math.floor(Number(sf._selectVo) / 1000);
		if (selectIndex == index) {
			sf.list.selectedIndex = index - 1;
			sf.selectdUpdate(sf._jiBanArr[index - 1])
		} else {
			sf.selectdUpdate(sf._selectVo)
		}
		sf.upPower();
	}

	public update(): void {
		const sf = this;
		sf._jiBanArr = Model_BySys.getJiBan(Model_BySys.JIB_YIBAO)
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
				let ids: number = sf._jiBanArr[i];
				let suit = Config.ybsuit_217[ids];
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
		var suitId = sf._jiBanArr[index]
		var suit = Config.ybsuit_217[suitId];
		gird.title = suit.name;
		gird.data = suitId;
		gird.checkNotice = Model_BySys.checkSuitVo(suitId, Model_BySys.JIB_YIBAO)
	}

	private renderGrid(index: number, obj: fairygui.GObject): void {
		const sf = this;
		let v: ViewYBGrid = obj as ViewYBGrid
		v.setSuitVo(sf._conditionArr[index]);
	}

	private onClickList(e: fairygui.ItemEvent): void {
		const sf = this;
		var selectItem = e.itemObject as fairygui.GButton
		sf.selectdUpdate(selectItem.data)
	}

	private selectdUpdate(suitId: number): void {
		const sf = this;
		if (suitId == null) {
			return;
		}
		sf._selectVo = suitId;
		var level = suitId % 1000

		var suit = Config.ybsuit_217[suitId];
		var suitNext = Config.ybsuit_217[suitId + 1];
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

			var suitPre = Config.ybsuit_217[suitId - 1];
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
			sf.btnActivity.enabled = sf.btnActivity.checkNotice = Model_BySys.checkSuitVo(suit.suitid, Model_BySys.JIB_YIBAO);
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
				for (let k = 0; k < Model_YiBao.YBArr.length; k++) {
					let vo: Vo_YiBao = Model_YiBao.YBArr[k];
					if (vo.id == $id) {
						if (vo.starLv >= $star) {
							reachNum++;
						}
						break;
					}
				}
			}
			if (reachNum < allNum) {
				sf._hasCondition = false;
			}
			sf.labNeed.text = need + HtmlUtil.fontNoSize("(" + reachNum + "/" + allNum + ")", reachNum >= allNum ? '#00ff00' : '#ff0000');
		}
		sf._conditionArr = [];
		for (let i = 0; i < conditionArr.length; i++) {
			let $id = Number(conditionArr[i][0])
			let $star = Number(conditionArr[i][1])

			for (let k = 0; k < Model_YiBao.YBArr.length; k++) {
				let vo: Vo_YiBao = Model_YiBao.YBArr[k];
				if (vo.id == $id) {
					sf._conditionArr.push(vo);
					break;
				}
			}
		}
		let totalType = 303;
		let totalValue = 0;
		for (let i = 0; i < sf._jiBanArr.length; i++) {
			let v = sf._jiBanArr[i];
			let cfg = Config.ybsuit_217[v];

			let arr = ConfigHelp.SplitStr(cfg.attr1)
			totalType = Number(arr[0][0])
			totalValue += Number(arr[0][1])
		}
		if (Config.jssx_002[totalType]) {
			sf.lab2.text = Config.jssx_002[totalType].attr + (totalValue / 1000) + "%"
		}

		sf.lab3.text = "可通过升级" + sf.sysName + "所属羁绊提升效果"
		sf.listGrid.numItems = sf._conditionArr.length;

		IconUtil.setImg(sf.imgName, Enum_Path.JIBAN_URL + "n" + UIConst.YIBAO + ".png");
		IconUtil.setImg(sf.imgIcon, Enum_Path.JIBAN_URL + "i" + UIConst.YIBAO + ".png");
	}

	private _hasCondition: boolean = false;
	private onClickActivity(): void {
		const sf = this;
		if (!sf._hasCondition) {
			ViewCommonWarn.text(sf.sysName + "星级不足")
			return;
		}
		var index = Math.floor(Number(sf._selectVo) / 1000);
		GGlobal.modelBySys.CGJiBanUp(Model_BySys.JIB_YIBAO, index);
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