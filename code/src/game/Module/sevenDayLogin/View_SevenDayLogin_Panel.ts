class View_SevenDayLogin_Panel extends UIPanelBase {

	public drawBt: Button0;
	public tabArr: ViewGrid[] = [];
	public drawImgArr: fairygui.GImage[] = [];
	public gridArr: ViewGrid[] = [];
	public selImg: fairygui.GImage;
	public drawImg: fairygui.GImage;
	public backImg: fairygui.GLoader;

	public static URL: string = "ui://cg6stvjxmbqo0";

	public constructor() {
		super();
		this.setSkin("sevenDayLogin", "sevenDayLogin_atlas0", "View_SevenDayLogin_Panel");
	}

	protected initView(): void {
		super.initView();
		let a = this;
		for (let i = 0; i < 7; i++) {
			if (i < 3) {
				let grid = a["grid" + i];
				grid.isShowEff = true;
				a.gridArr.push(grid);
			}
			let drawImg = a["drawImg" + i];
			a.drawImgArr.push(drawImg);
			let tab: ViewGrid = a["tab" + i];
			tab.data = i;
			tab.isShowEff = true;
			tab.addClickListener(a.onTab, a)
			a.tabArr.push(tab);
		}

		a.drawBt.addClickListener(a.drawHandle, a);
		GGlobal.modelsevent.CG_OPEN_SEVENDAY_LOGIN();
	}

	private drawHandle() {
		const sf = this;
		if (sf.drawBt.checkNotice) {
			GGlobal.modelsevent.CG_SEVENDAY_LOGIN_DRAW(sf.curDay);
		} else {
			ViewCommonWarn.text("累计登录" + sf.curDay + "天可领取");
		}
	}

	private curTab: ViewGrid;
	private onTab(evt: egret.TouchEvent) {
		const sf = this;
		let tab = evt.target as ViewGrid;
		let day = tab.data + 1;
		if (day == sf.curDay) return;
		sf.curDay = day;
		sf.curTab = tab;
		sf.updateShow();
	}

	private updateTabShow() {
		const sf = this;
		for (let i = 0; i < sf.tabArr.length; i++) {
			let tab = sf.tabArr[i];
			let cfg = Config.qrdl_717[i + 1];
			let reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
			tab.vo = reward[0];
			if (Model_SevenDayLogin.drawArr[i]) {
				sf.drawImgArr[i].visible = true;
			} else {
				sf.drawImgArr[i].visible = false;
				tab.checkNotice = Model_SevenDayLogin.curDay >= i + 1;
			}
		}
		sf.updateShow();
	}

	private updateShow() {
		const sf = this;
		sf.selImg.x = sf.curTab.x - 10;
		sf.selImg.y = sf.curTab.y - 7;
		let cfg = Config.qrdl_717[sf.curDay];
		let reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
		let len = sf.gridArr.length;
		for (let i = 0; i < len; i++) {
			let grid: ViewGrid = sf.gridArr[i];
			if (i < reward.length) {
				grid.vo = reward[i];
				grid.tipEnabled = true;
				grid.visible = true;
			} else {
				grid.visible = false;
				grid.vo = null;
			}
		}
		if (Model_SevenDayLogin.drawArr[sf.curDay - 1]) {
			sf.drawImg.visible = true;
			sf.drawBt.visible = false;
			sf.curTab.checkNotice = false;
		} else {
			sf.drawImg.visible = false;
			sf.drawBt.visible = true;
			sf.drawBt.enabled = sf.drawBt.checkNotice = Model_SevenDayLogin.curDay >= sf.curDay;
		}
	}

	public updateDay() {
		const sf = this;
		sf.curDay = Model_SevenDayLogin.curDay;

		for (let i = 0; i < sf.tabArr.length; i++) {
			if (Model_SevenDayLogin.drawArr[i]) {
				sf.tabArr[i].checkNotice = false;
			}
		}
		for (let i = 0; i < 7; i++) {
			if (Model_SevenDayLogin.curDay > i && !Model_SevenDayLogin.drawArr[i]) {
				sf.curDay = i + 1;
				break;
			}
		}
		sf.curTab = sf.tabArr[sf.curDay - 1];
		sf.updateTabShow();
	}

	private curDay = 0;
	protected onShown(): void {
		const sf = this;
		sf.updateDay();
		IconUtil.setImg(sf.backImg, Enum_Path.BACK_URL + "sevenDayLogin.jpg");
		GGlobal.control.listen(Enum_MsgType.SEVENDAY_LOGIN, sf.updateDay, sf);
	}

	protected onHide(): void {
		const sf = this;
		GGlobal.layerMgr.close(UIConst.SEVENDAY_LOGIN);
		ConfigHelp.cleanGridEff(sf.gridArr);
		ConfigHelp.cleanGridEff(sf.tabArr);
		IconUtil.setImg(sf.backImg, null);
		GGlobal.control.remove(Enum_MsgType.SEVENDAY_LOGIN, sf.updateDay, sf);
	}
}