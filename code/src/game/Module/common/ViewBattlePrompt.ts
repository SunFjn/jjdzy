class ViewBattlePrompt extends fairygui.GComponent {

	public label: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9emruw93as";

	private static _instance: ViewBattlePrompt;
	public static createInstance(): ViewBattlePrompt {
		if (!ViewBattlePrompt._instance) {
			ViewBattlePrompt._instance = <ViewBattlePrompt><any>(fairygui.UIPackage.createObject("common", "ViewBattlePrompt"));
		}
		return ViewBattlePrompt._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.label = <fairygui.GRichTextField><any>(this.getChild("label"));
	}

	public show(times: number) {
		this.label.text = times + "秒后挑战失败";
		this.resetPosition();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 360 - this.height);
	}

	public static show(times) {
		let ui = ViewBattlePrompt.createInstance();
		if (ui.parent) {
			if (times <= 0) {
				ui.removeFromParent();
			} else {
				ui.show(times);
			}
		} else {

			if (times > 0) {
				GGlobal.layerMgr.UI_MainBottom.addChild(ui);
				ui.show(times);
			}
		}
	}
}