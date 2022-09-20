class Country_RankItem extends fairygui.GComponent {

	public boxImg: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;
	public promptImg: fairygui.GImage;

	public static URL: string = "ui://uwzc58njp1wo2h";

	public static createInstance(): Country_RankItem {
		return <Country_RankItem><any>(fairygui.UIPackage.createObject("country", "Country_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.boxImg = <fairygui.GLoader><any>(s.getChild("boxImg"));
		s.lbRank = <fairygui.GRichTextField><any>(s.getChild("lbRank"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.jifenLb = <fairygui.GRichTextField><any>(s.getChild("jifenLb"));
		s.promptImg = <fairygui.GImage><any>(s.getChild("promptImg"));
		s.boxImg.addClickListener(s.boxHandler, this);
	}

	private boxHandler() {
		let s = this;
		for (let key in Config.gjbsgr_738) {
			let cfg = Config.gjbsgr_738[key];
			let arr = JSON.parse(cfg.rank);
			if (arr[0][0] <= s.rank && arr[0][1] >= s.rank) {
				let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))
				View_BoxReward_Show.show(rewardArr, "奖励邮件发放");
				break;
			}
		}
	}

	private rank: number;
	public updateShow(rank: number, name: string, hurt: number) {
		let s = this;
		s.rank = rank;
		s.lbRank.text = "第" + rank + "名";
		if (name) {
			s.promptImg.visible = false;
			s.lbName.visible = true;
			s.lbName.text = name;
		} else {
			s.promptImg.visible = true;
			s.lbName.visible = false;
		}
		s.jifenLb.text = ConfigHelp.getYiWanText(hurt) + "";
	}
}