class Child_CountryBoss_Rank extends fairygui.GComponent {

	public lbRank0: fairygui.GRichTextField;
	public countryIcon0: fairygui.GLoader;
	public passLb0: fairygui.GRichTextField;
	public boxImg0: fairygui.GLoader;
	public lbRank1: fairygui.GRichTextField;
	public countryIcon1: fairygui.GLoader;
	public passLb1: fairygui.GRichTextField;
	public boxImg1: fairygui.GLoader;
	public rankLb: fairygui.GRichTextField;
	public lbRank2: fairygui.GRichTextField;
	public countryIcon2: fairygui.GLoader;
	public passLb2: fairygui.GRichTextField;
	public boxImg2: fairygui.GLoader;

	public static URL: string = "ui://uwzc58njp1wo27";

	public static createInstance(): Child_CountryBoss_Rank {
		return <Child_CountryBoss_Rank><any>(fairygui.UIPackage.createObject("country", "Child_CountryBoss_Rank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.lbRank0 = <fairygui.GRichTextField><any>(s.getChild("lbRank0"));
		s.countryIcon0 = <fairygui.GLoader><any>(s.getChild("countryIcon0"));
		s.passLb0 = <fairygui.GRichTextField><any>(s.getChild("passLb0"));
		s.boxImg0 = <fairygui.GLoader><any>(s.getChild("boxImg0"));
		s.lbRank1 = <fairygui.GRichTextField><any>(s.getChild("lbRank1"));
		s.countryIcon1 = <fairygui.GLoader><any>(s.getChild("countryIcon1"));
		s.passLb1 = <fairygui.GRichTextField><any>(s.getChild("passLb1"));
		s.boxImg1 = <fairygui.GLoader><any>(s.getChild("boxImg1"));
		s.rankLb = <fairygui.GRichTextField><any>(s.getChild("rankLb"));
		s.lbRank2 = <fairygui.GRichTextField><any>(s.getChild("lbRank2"));
		s.countryIcon2 = <fairygui.GLoader><any>(s.getChild("countryIcon2"));
		s.passLb2 = <fairygui.GRichTextField><any>(s.getChild("passLb2"));
		s.boxImg2 = <fairygui.GLoader><any>(s.getChild("boxImg2"));
		s.boxImg0.data = 1;
		s.boxImg1.data = 2;
		s.boxImg2.data = 3;
		s.boxImg0.addClickListener(s.boxHandler, s);
		s.boxImg1.addClickListener(s.boxHandler, s);
		s.boxImg2.addClickListener(s.boxHandler, s);
	}

	private boxHandler(event: egret.TouchEvent) {
		let cfg = Config.gjbsgj_738[event.target.data];
		if (cfg) {
			let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
			View_BoxReward_Show.show(arr, "奖励邮件发放");
		}
	}

	public updateShow() {
		let model = GGlobal.modelCtryBoss;
		let s = this;
		s.countryIcon0.url = model.countryRankArr.length > 0 ? CommonManager.getCommonUrl("country" + model.countryRankArr[0].countryId) : "ui://uwzc58njqnae1k";
		s.countryIcon1.url = model.countryRankArr.length > 1 ? CommonManager.getCommonUrl("country" + model.countryRankArr[1].countryId) : "ui://uwzc58njqnae1k";
		s.countryIcon2.url = model.countryRankArr.length > 2 ? CommonManager.getCommonUrl("country" + model.countryRankArr[2].countryId) : "ui://uwzc58njqnae1k";
		s.passLb0.text = model.countryRankArr.length > 0 ? model.countryRankArr[0].countryNum + "" : "0";
		s.passLb1.text = model.countryRankArr.length > 1 ? model.countryRankArr[1].countryNum + "" : "0";
		s.passLb2.text = model.countryRankArr.length > 2 ? model.countryRankArr[2].countryNum + "" : "0";
		s.rankLb.text = "我的国家：" + Model_Country.getCountryName(Model_player.voMine.country);
	}
}