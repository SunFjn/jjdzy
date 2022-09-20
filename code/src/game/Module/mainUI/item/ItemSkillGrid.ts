/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemSkillGrid extends fairygui.GButton implements ISkillGrid {

	public skillIcon: fairygui.GLoader;
	public lbCD: fairygui.GRichTextField;
	public maskImg: fairygui.GImage;
	public cmImg: fairygui.GImage;

	public static URL: string = "ui://7gxkx46wtw1l2h";

	public static createInstance(): ItemSkillGrid {
		return <ItemSkillGrid><any>(fairygui.UIPackage.createObject("MainUI", "ItemSkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public type = 0;
	public vo: Vo_Skill;
	setVo(value: Vo_Skill) {
		let self = this;
		self.vo = value;
		self.lbCD.visible = false;
		self.maskImg.visible = false;
		if (value) {
			IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + value.icon + ".png");
		} else {
			IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + self.type + ".png");
		}
	}

	setCDRemain(remainTime: number) {
		let self = this;
		if (remainTime <= 0) {
			self.lbCD.visible = false;
			self.maskImg.visible = false;
		} else {
			var remainSec = Math.ceil(remainTime / 1000);
			self.lbCD.text = remainSec.toString();
			self.lbCD.visible = true;
			self.maskImg.visible = true;
		}
	}

	public setCM(value: boolean) {
		let self = this;
		self.cmImg.visible = value;
	}
}