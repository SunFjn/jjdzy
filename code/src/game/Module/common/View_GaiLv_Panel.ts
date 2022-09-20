class View_GaiLv_Panel extends UIModalPanel {

	public titleIcon: fairygui.GLoader;
	public rewardLb: fairygui.GRichTextField;
	public numLb: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9empdbd3f1";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("common", "View_GaiLv_Panel").asCom;
		s.contentPane = s.view;
		s.titleIcon = <fairygui.GLoader><any>(s.view.getChild("titleIcon"));
		s.rewardLb = <fairygui.GRichTextField><any>(s.view.getChild("rewardLb"));
		s.rewardLb.leading = 6;
		s.numLb = <fairygui.GRichTextField><any>(s.view.getChild("numLb"));
		s.numLb.leading = 6;
		super.childrenCreated();
	}

	private updateShow() {
		let s = this;
		let showStr: string = "";
		let numStr: string = "";
		let type = s._args;
		let index: number = 1;
		while (index) {
			let cfg = Config.showRate_302[type * 1000 + index];
			if (cfg) {
				if (cfg.showType == 1) {
					if (index == 1) {
						s.titleIcon.url = "ui://jvxpx9emz05i3f4";
						showStr += cfg.name;
						numStr += (cfg.showRate / 1000) + "%";
					} else {
						showStr += "\n" + cfg.name;
						numStr += "\n" + (cfg.showRate / 1000) + "%";
					}
				} else {
					if (index == 1) {
						s.titleIcon.url = "ui://jvxpx9emz05i3f5";
						showStr += cfg.name;
						numStr += cfg.num + "次";
					} else {
						showStr += "\n" + cfg.name;
						numStr += "\n" + cfg.num + "次";
					}
				}
				index++;
			} else {
				index = 0;
				break;
			}
		}
		s.rewardLb.text = showStr;
		s.numLb.text = numStr;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.GAILV);
	}
}