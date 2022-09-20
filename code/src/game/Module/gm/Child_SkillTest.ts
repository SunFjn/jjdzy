class Child_SkillTest extends fairygui.GComponent {

	public skillIdLb: fairygui.GTextInput;
	public skillActLb: fairygui.GTextInput;
	public copyBt: fairygui.GButton;
	public replaceBt: fairygui.GButton;

	public static URL: string = "ui://vm9a8xq8qla28";

	public static createInstance(): Child_SkillTest {
		return <Child_SkillTest><any>(fairygui.UIPackage.createObject("GM", "Child_SkillTest"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.skillIdLb = <fairygui.GTextInput><any>(this.getChild("skillIdLb"));
		this.skillActLb = <fairygui.GTextInput><any>(this.getChild("skillActLb"));
		this.copyBt = <fairygui.GButton><any>(this.getChild("copyBt"));
		this.replaceBt = <fairygui.GButton><any>(this.getChild("replaceBt"));
		this.replaceBt.addClickListener(this.replaceHandle, this);
		this.copyBt.addClickListener(this.copyHandle, this);
	}

	private copyHandle(): void {
		var input = document.createElement("input");
		input.value = this.skillActLb.text;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length),
			document.execCommand('Copy');
		document.body.removeChild(input);
	}

	private replaceHandle(): void {
		let skillId = parseInt(this.skillIdLb.text);
		let vo: Vo_Skill;
		for (let i = 0; i < Model_player.voMine.skillList.length; i++) {
			if (skillId == Model_player.voMine.skillList[i].id) {
				vo = Model_player.voMine.skillList[i];
				break;
			}
		}
		if (vo) {
			vo.cfg.a = JSON.parse(this.skillActLb.text);
		} else {
			ViewCommonWarn.text("该角色没有这个技能");
		}
	}
}