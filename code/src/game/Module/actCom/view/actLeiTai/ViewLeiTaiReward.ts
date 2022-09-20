class ViewLeiTaiReward extends UIModalPanel {

	public lb4: fairygui.GRichTextField;
	public list0: fairygui.GList;
	public list1: fairygui.GList;
	public list2: fairygui.GList;
	public lb0: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;
	public lb2: fairygui.GRichTextField;

	public static URL: string = "ui://rhfap29iut4i9";

	public static createInstance(): ViewLeiTaiReward {
		return <ViewLeiTaiReward><any>(fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReward"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReward").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	protected onShown(): void {
		let s = this;
		let vo: Vo_ActLeiTai = s._args as Vo_ActLeiTai

		// let cfg = Config.leitai_500[11];
		let cfg = vo.cfg;
		//npc
		ConfigHelp.createViewGridList(s.list2, cfg.reward1, s);
		//擂主
		ConfigHelp.createViewGridList(s.list0, cfg.reward2, s);
		//协助
		ConfigHelp.createViewGridList(s.list1, cfg.reward3, s);
	}


	protected onHide(): void {
		let s = this;
		s.list0.numItems = 0;
		s.list1.numItems = 0;
		s.list2.numItems = 0;
	}
}