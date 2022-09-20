class Child_ActLuckTurn extends fairygui.GComponent implements IPanel {

	public btnTarge: Button2;
	public btnSM: fairygui.GButton;
	public btnTen: Button1;
	public btnMust: Button1;
	public card1: ItemActLuckTurn;
	public lbTime: fairygui.GRichTextField;
	public list: fairygui.GList;
	public card2: ItemActLuckTurn;
	public card3: ItemActLuckTurn;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;
	public lbMust: fairygui.GRichTextField;
	public lbTen: fairygui.GRichTextField;
	public card0: ItemActLuckTurn;
	public checkBox: fairygui.GButton;

	public static URL: string = "ui://px5jiht9kzdy0";

	public static pkg = "actLuckTurn";

	private _cardArr: ItemActLuckTurn[];

	public static createInstance(): Child_ActLuckTurn {
		return <Child_ActLuckTurn><any>(fairygui.UIPackage.createObject("actLuckTurn", "Child_ActLuckTurn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemActLuckTurn.URL, ItemActLuckTurn);
		f(ItemActLuckTurnTarge.URL, ItemActLuckTurnTarge);
	}

	initView(pParent: fairygui.GObject) {
		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s._cardArr = [s.card0, s.card1, s.card2, s.card3]
		for (let i = 0; i < s._cardArr.length; i++) {
			s._cardArr[i].index = i - 1;
		}
		s.lb3.text = "每期活动重置翻牌数和目标奖励"
	}
	openPanel(pData?: any) {
		let s = this;
		let m = GGlobal.model_LuckTurn;
		s.y = 257;
		s._act = pData as Vo_Activity;
		Timer.instance.listen(s.upTimer, s);
		m.listen(Model_LuckTurn.OPENUI, s.upView, s);
		m.listen(Model_LuckTurn.TURN, s.upTurn, s);
		GGlobal.reddot.listen(UIConst.ACTCOM, s.upRed, s);
		s.btnTarge.addClickListener(s.onTarge, s);
		s.btnSM.addClickListener(s.onShuoMing, s);
		s.btnTen.addClickListener(s.onTen, s);
		s.btnMust.addClickListener(s.onMust, s);
		s.checkBox.addClickListener(s.onCheck, s);
		for (let i = 1; i < s._cardArr.length; i++) {
			s._cardArr[i].addClickListener(s.onCard, s);
		}
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		//红点
		m.CG_TARGET_OPEN_10343();
		s.upList(s._act.qs);
		s.upView()
		s.upRed();

		let key = Model_player.voMine.id + "LuckTurnCheck"
		let val = egret.localStorage.getItem(key);
		Model_LuckTurn.skipTween = val == "1" ? true : false;
		s.checkBox.selected = Model_LuckTurn.skipTween;
	}
	closePanel(pData?: any) {
		let s = this;
		let m = GGlobal.model_LuckTurn;
		s.list.numItems = 0
		Timer.instance.remove(s.upTimer, s);
		m.remove(Model_LuckTurn.OPENUI, s.upView, s);
		m.remove(Model_LuckTurn.TURN, s.upTurn, s);
		GGlobal.reddot.remove(UIConst.ACTCOM, s.upRed, s);
		s.btnTarge.removeClickListener(s.onTarge, s);
		s.btnSM.removeClickListener(s.onShuoMing, s);
		s.btnTen.removeClickListener(s.onTen, s);
		s.btnMust.removeClickListener(s.onMust, s);
		s.checkBox.removeClickListener(s.onCheck, s);
		for (let i = 1; i < s._cardArr.length; i++) {
			s._cardArr[i].removeClickListener(s.onCard, s);
		}
	}
	dispose() {
		super.dispose()
		this.closePanel()
	}

	private itemRender(index, obj) {
		let s = this;
		let item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = item.isShowEff = true;
		item.vo = s._listData[index];
	}

	private _listData: Array<IGridImpl>
	private _act: Vo_Activity

	private upTimer() {
		let s = this;
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			s.lbTime.text = "00:00:00";
		}
	}


	private upList(qs): void {
		let s = this;
		let m = GGlobal.model_LuckTurn;
		let cfg = Config.slfpjlb_330[qs]
		s._listData = ConfigHelp.makeItemListArr(JSON.parse(cfg.show))
		s.list.numItems = s._listData ? s._listData.length : 0;
		if (s.list.numItems > 0) {
			s.list.scrollToView(0);
		}
		let ybCost = Config.slfpxhb_330[qs * 1000 + 1].yb
		let ybMust = Config.slfpxhb_330[qs * 1000 + 2].yb
		let ybTen = Config.slfpxhb_330[qs * 1000 + 3].yb

		m.ybCost = ybCost
		m.ybMust = ybMust
		m.ybTen = ybTen
	}

	private upCost() {
		let s = this;
		let m = GGlobal.model_LuckTurn;
		let yb = Model_player.voMine.yuanbao
		let color = m.ybCost <= yb ? Color.GREENSTR : Color.REDSTR
		for (let i = 0; i < s._cardArr.length; i++) {
			s._cardArr[i].cost = HtmlUtil.fontNoSize(m.ybCost + "", color)
		}
		color = m.ybMust <= yb ? Color.GREENSTR : Color.REDSTR
		s.lbMust.text = HtmlUtil.fontNoSize(m.ybMust + "", color)
		color = m.ybTen <= yb ? Color.GREENSTR : Color.REDSTR
		s.lbTen.text = HtmlUtil.fontNoSize(m.ybTen + "", color)
	}

	private upView() {
		let s = this;
		let m = GGlobal.model_LuckTurn;
		s.upTimer();
		let max = ConfigHelp.getSystemNum(7635)
		let color = m.turnCt >= max ? Color.REDSTR : Color.GREENSTR
		s.lb2.text = "已翻牌数：" + HtmlUtil.fontNoSize(m.turnCt + "/" + max, color);
		s.lb1.text = "累计获胜数：" + HtmlUtil.fontNoSize(m.winCt + "", Color.GREENSTR);
		
		m.cardArr
		s.card1.st = m.cardArr[0];
		s.card2.st = m.cardArr[1];
		s.card3.st = m.cardArr[2];

		s.upCost();
	}

	private upRed() {
		let s = this;
		s.btnTarge.checkNotice = GGlobal.reddot.checkCondition(UIConst.LUCK_TURN);
	}

	private upTurn(pos) {
		let s = this;
		if (pos < 4) {
			s._cardArr[pos + 1].turn();
		} else {//10连
			for (let i = 1; i < s._cardArr.length; i++) {
				s._cardArr[i].turn();
			}
		}

	}

	private onShuoMing() {
		let s = this;
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, s._act.id);
	}

	private onTarge() {
		GGlobal.layerMgr.open(UIConst.LUCK_TURN_TARGE)
	}

	private onTen() {
		GGlobal.model_LuckTurn.turnTenCt()
	}

	private onMust() {
		if (Model_LuckTurn.isMoive) {
			ViewCommonWarn.text("请稍后")
			return;
		}
		if(!Model_LuckTurn.skipTween){
			Model_LuckTurn.isMoive = true;
		}
		GGlobal.model_LuckTurn.CG_TURN_10341(20)
	}

	private onCard(e: egret.TouchEvent) {
		let item: ItemActLuckTurn = e.currentTarget as ItemActLuckTurn
		if (item.index == -1) {
			return;
		}
		if (item.st != -1) {
			return;
		}
		if (Model_LuckTurn.isMoive) {
			ViewCommonWarn.text("请稍后")
			return;
		}
		if(!Model_LuckTurn.skipTween){
			Model_LuckTurn.isMoive = true;
		}
		GGlobal.model_LuckTurn.CG_TURN_10341(10 + item.index)
	}

	private onCheck(e) {
		Model_LuckTurn.skipTween = this.checkBox.selected
		let key = Model_player.voMine.id + "LuckTurnCheck"
		let val = Model_LuckTurn.skipTween ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}
}