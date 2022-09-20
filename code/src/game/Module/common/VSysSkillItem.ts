class VSysSkillItem extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public lbLevel: fairygui.GRichTextField;
	public imgLocked: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emdv773dn";

	public static createInstance(): VSysSkillItem {
		return <VSysSkillItem><any>(fairygui.UIPackage.createObject("common", "VSysSkillItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.imgIcon = <fairygui.GLoader><any>(this.getChild("imgIcon"));
		this.lbLevel = <fairygui.GRichTextField><any>(this.getChild("lbLevel"));
		this.imgLocked = <fairygui.GImage><any>(this.getChild("imgLocked"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));


	}

	private _vo: any
	public set vo(v: any) {
		this._vo = v;
		let type = v[0];
		let value = v[1];
		let cfg
		if (type == Model_BySys.BING_FA) {
			cfg = Config.booklvskill_213;
		} else if (type == Model_BySys.YI_BAO) {
			cfg = Config.yblvskill_217;
		} else if (type == Model_BySys.SHEN_JIAN) {
			cfg = Config.swordlvskill_216;
		} else if (type == Model_BySys.BAO_WU) {
			cfg = Config.baolvskill_214;
		} else if (type == Model_BySys.TIAN_SHU) {
			cfg = Config.booklvskill_215;
		} else if (type == Model_BySys.ZHAN_JIA) {
			cfg = Config.clotheslvskill_212;
		} else if (type == Model_BySys.WU_JIANG) {
			cfg = Config.herolvskill_211;
		}
		var skill = cfg[value]
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
		this.lbLevel.text = ""
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
			if (type == Model_BySys.BING_FA) {
				this.noticeImg.visible = Model_BingFa.checkSkill(value);
			} else if (type == Model_BySys.YI_BAO) {
				this.noticeImg.visible = Model_YiBao.checkSkill(value);
			} else if (type == Model_BySys.SHEN_JIAN) {
				this.noticeImg.visible = Model_ShenJian.checkSkill(value);
			} else if (type == Model_BySys.BAO_WU) {
				this.noticeImg.visible = Model_BaoWu.checkSkill(value);
			} else if (type == Model_BySys.TIAN_SHU) {
				this.noticeImg.visible = Model_TianShu.checkSkill(value);
			} else if (type == Model_BySys.ZHAN_JIA) {
				this.noticeImg.visible = Model_ZhanJia.checkSkill(value);
			} else if (type == Model_BySys.WU_JIANG) {
				this.noticeImg.visible = Model_WuJiang.checkSkill(value);
			}
		} else {
			this.imgLocked.visible = true;
			this.imgIcon.visible = false;
			this.noticeImg.visible = false;
		}
	}

	public get vo() {
		return this._vo;
	}
}