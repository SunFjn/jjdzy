class Child_CountryBoss_MyRank extends fairygui.GComponent {

	public list: fairygui.GList;
	public rankLb: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;

	public static URL: string = "ui://uwzc58njp1wo28";

	public static createInstance(): Child_CountryBoss_MyRank {
		return <Child_CountryBoss_MyRank><any>(fairygui.UIPackage.createObject("country", "Child_CountryBoss_MyRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.list = <fairygui.GList><any>(s.getChild("list"));
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandler;
		s.rankLb = <fairygui.GRichTextField><any>(s.getChild("rankLb"));
		s.jifenLb = <fairygui.GRichTextField><any>(s.getChild("jifenLb"));
	}

	private renderHandler(index: number, obj: Country_RankItem): void {
		if (index < GGlobal.modelCtryBoss.myRankArr.length) {
			obj.updateShow(index + 1, GGlobal.modelCtryBoss.myRankArr[index].name, GGlobal.modelCtryBoss.myRankArr[index].hurt);
		} else {
			obj.updateShow(index + 1, null, 0);
		}
	}

	public updateShow() {
		let s = this;
		s.list.numItems = 10;
		let index = 0;
		let model = GGlobal.modelCtryBoss;
		for (let i = 0; i < model.myRankArr.length; i++) {
			if (model.myRankArr[i].playerId == Model_player.voMine.id) {
				index = i + 1;
				break;
			}
		}

		if (index == 0) {
			s.rankLb.text = "我的排名：10+";
		} else {
			s.rankLb.text = "我的排名：" + index;
		}
		s.jifenLb.text = "我的伤害：" + ConfigHelp.getYiWanText(model.myhurt);
	}

	public clean() {
		super.clean()
		this.list.numItems = 0;
	}
}