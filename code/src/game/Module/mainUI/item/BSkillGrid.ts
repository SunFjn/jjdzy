/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BSkillGrid extends fairygui.GButton implements ISkillGrid {

	public skillIcon: fairygui.GLoader;
	public angerBar0: fairygui.GImage;
	public angerBar1: fairygui.GImage;
	public cmImg: fairygui.GImage;

	public static URL: string = "ui://7gxkx46wtw1l2g";

	public static createInstance(): BSkillGrid {
		return <BSkillGrid><any>(fairygui.UIPackage.createObject("MainUI", "BSkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.angerBar0._content.fillMode = egret.BitmapFillMode.CLIP;
		self.angerBar0.height = 0;
		self.angerBar1._content.fillMode = egret.BitmapFillMode.CLIP;
		self.angerBar1.height = 0;
	}


	public vo: Vo_Skill;
	setVo(value: Vo_Skill) {
		this.vo = value;
		if (value) {
			ImageLoader.instance.loader(Enum_Path.SKILL_URL + value.icon + ".png", this.skillIcon);
			this.skillIcon.visible = true;
		} else {
			this.skillIcon.visible = false;
		}
	}

	setCDRemain(remainTime: number) {

	}

	setRage(value: number) {
		let max = Config.changshu_101[3].num / 200;
		if (value > max) {
			this.angerBar1.height = 89;
			this.angerBar0.height = (value - max) / max * 89;
		} else {
			this.angerBar1.height = value / max * 89;
			this.angerBar0.height = 0;
		}
	}

	public setCM(value: boolean) {
		let self = this;
		self.cmImg.visible = value;
	}
}
