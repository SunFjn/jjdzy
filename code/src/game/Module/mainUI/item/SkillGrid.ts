/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SkillGrid extends fairygui.GButton implements ISkillGrid {

	public bg: fairygui.GLoader;
	public skillIcon: fairygui.GLoader;
	public lbCD: fairygui.GRichTextField;

	public static URL: string = "ui://7gxkx46wtw1l2f";

	public static createInstance(): SkillGrid {
		return <SkillGrid><any>(fairygui.UIPackage.createObject("MainUI", "SkillGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.skillIcon = <fairygui.GLoader><any>(this.getChild("skillIcon"));
		this.lbCD = <fairygui.GRichTextField><any>(this.getChild("lbCD"));
	}

	public vo: Vo_Skill;
	setVo(value: Vo_Skill) {
		this.vo = value;
		if (value) {
			ImageLoader.instance.loader(Enum_Path.SKILL_URL + value.icon + ".png", this.skillIcon);
			this.skillIcon.visible = true;
			this.lbCD.visible = true;
		} else {
			this.skillIcon.visible = false;
			this.lbCD.visible = false;
		}
	}

	setCDRemain(remainTime: number) {
		if (remainTime <= 0) {
			this.lbCD.visible = false;
		} else {
			var remainSec = Math.ceil(remainTime / 1000);
			this.lbCD.text = remainSec.toString();
			this.lbCD.visible = true;
		}
	}
}