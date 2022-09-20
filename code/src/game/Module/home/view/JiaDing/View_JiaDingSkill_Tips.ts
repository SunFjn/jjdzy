class View_JiaDingSkill_Tips extends UIModalPanel {
	public skillLb: JiaDingSkill;
	public skillDesLb: fairygui.GRichTextField;
	public static URL: string = "ui://ypo8uejwgz25e";

	public static createInstance(): View_JiaDingSkill_Tips {
		return <View_JiaDingSkill_Tips><any>(fairygui.UIPackage.createObject("JiaDing", "View_JiaDingSkill_Tips"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("JiaDing", "View_JiaDingSkill_Tips").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private vo: Ijdskill_021;
	protected onShown(): void {
		let self = this
		self.vo = self._args;
		self.skillLb.setVo(self.vo);
		self.skillDesLb.text = ConfigHelp.reTxt(self.vo.xiaoguo, self.vo.canshu1 / 1000, self.vo.canshu2 / 1000);
	}

	protected onHide(): void {
		this.skillLb.clean();
	}
}