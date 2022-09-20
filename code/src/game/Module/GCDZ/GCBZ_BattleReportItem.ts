class GCBZ_BattleReportItem extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://vgiijkm8r5geq";

	public static createInstance(): GCBZ_BattleReportItem {
		return <GCBZ_BattleReportItem><any>(fairygui.UIPackage.createObject("GCBZ", "GCBZ_BattleReportItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}
	/**U:玩家名字B:状态 1战胜 2战败I:城池id */
	public vo: { name: string, state: number, cityID: number };
	public setVo(vo: { name: string, state: number, cityID: number }) {
		let self = this;
		self.vo = vo;
		let cfg = Config.gcbz_777[vo.cityID];
		self.iconImg.url = CommonManager.getUrl("GCBZ", vo.state == 1 ? "win" : "fail");
		if (vo.state == 1) {
			self.lb.text = ConfigHelp.reTxt("{0}不自量力入侵你所占领的城池{1}，被你狠狠教训！", HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)),
				HtmlUtil.fontNoSize(cfg.mz, Color.getColorStr(5)));
		} else {
			self.lb.text = ConfigHelp.reTxt("{0}入侵你所占领的城池{1}，不敌对方兵强马壮，你被迫紧急撤离！", HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)),
				HtmlUtil.fontNoSize(cfg.mz, Color.getColorStr(5)));
		}
	}

	public clean() {

	}
}