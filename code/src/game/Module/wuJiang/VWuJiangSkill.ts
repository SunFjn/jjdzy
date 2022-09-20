class VWuJiangSkill extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public imgLocked: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public lbLevel: fairygui.GLabel;

	public static URL: string = "ui://zyx92gzwtht44";

	public static createInstance(): VWuJiangSkill {
		return <VWuJiangSkill><any>(fairygui.UIPackage.createObject("wuJiang", "VWuJiangSkill"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
	}
	private _vo:any;
	public set vo(value: any) {
		this._vo = value;
		this.lbLevel.text = "";
		var skill = Config.herolvskill_211[value]
		if (skill) {
			if (skill.power == 0) {
				this.imgLocked.visible = true;
			} else {
				this.imgLocked.visible = false;
			}
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + skill.icon + ".png", this.imgIcon);
			this.imgIcon.visible = true;
			var level = skill.id % 1000
			if (level > 0) {
				this.lbLevel.text = "Lv." + level;
			}
			this.noticeImg.visible = Model_WuJiang.checkSkill(value);
		} else {
			this.imgLocked.visible = true;
			this.imgIcon.visible = false;
			this.noticeImg.visible = false;
		}
	}

	public get vo(){
		return this._vo;
	}
}