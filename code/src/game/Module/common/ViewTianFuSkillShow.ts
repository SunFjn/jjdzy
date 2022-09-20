/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewTianFuSkillShow extends UIModalPanel {

	public frame: frame3;
	public n3: fairygui.GImage;
	public gridSkill: VWuJiangSkillS;
	public lbDescription: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9empb4s3gk";

	public static createInstance(): ViewTianFuSkillShow {
		return <ViewTianFuSkillShow><any>(fairygui.UIPackage.createObject("common", "ViewTianFuSkillShow"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "ViewTianFuSkillShow").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	public onShown() {
		let s = this;
		let data = this._args;
		s.gridSkill.setVo(data.skillid, data.level);
		s.lbDescription.text = SkillUtil.getBuffDescription(data.id, data.level);
	}

	public onHide() {

		GGlobal.layerMgr.close(UIConst.TIANFU_SKILL_SHOW);

	}

}