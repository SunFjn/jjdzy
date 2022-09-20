class View_Country_Rank extends UIModalPanel {

	public c1: fairygui.Controller;
	public item0: Child_CountryBoss_MyRank;
	public item1: Child_CountryBoss_Rank;
	public static URL: string = "ui://uwzc58njp1wo29";
	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("country", "View_Country_Rank").asCom;
		this.contentPane = this.view;
		this.item0 = <Child_CountryBoss_MyRank><any>(this.view.getChild("item0"));
		this.item1 = <Child_CountryBoss_Rank><any>(this.view.getChild("item1"));
		this.c1 = this.view.getController("c1");
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.changeHandler, this);
		super.childrenCreated();
	}

	private changeHandler() {
		if (this.c1.selectedIndex == 0) {
			this.frame.asLabel.text = "排行榜(" + this._args + "层)";
			this.item0.updateShow()
		} else {
			this.frame.asLabel.text = "排行榜";
			this.item1.updateShow();
		}
	}

	protected onShown(): void {
		if (this.c1.selectedIndex == 0) {
			this.changeHandler();
		} else {
			this.c1.selectedIndex = 0;
		}
		GGlobal.modelCtryBoss.CG_OPEN_COUNTRYBOSS_RANK(this._args);
		GGlobal.modelCtryBoss.CG_OPEN_COUNTRYRANK();
		GGlobal.control.listen(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE, this.changeHandler, this);
	}

	protected onHide(): void {
		GGlobal.modelCtryBoss.countryRankArr = [];
		GGlobal.modelCtryBoss.myRankArr = [];
		GGlobal.modelCtryBoss.myhurt = 0;
		GGlobal.control.remove(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE, this.changeHandler, this);
		GGlobal.layerMgr.close(UIConst.COUNTRYBOSS_RANK);
		this.item0.clean();
		this.item1.clean();
	}
}