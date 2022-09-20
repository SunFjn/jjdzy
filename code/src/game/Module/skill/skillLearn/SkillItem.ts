class SkillItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public cdLb: fairygui.GRichTextField;
	public desLb: fairygui.GRichTextField;
	public costItem: ViewResource;
	public skillIcon: fairygui.GLoader;
	public upBt: Button0;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public showGroup: fairygui.GGroup;
	private levelLb: fairygui.GRichTextField;
	private promptLb: fairygui.GRichTextField;

	public static URL: string = "ui://c7onhgk8c14zj";

	public static createInstance(): SkillItem {
		return <SkillItem><any>(fairygui.UIPackage.createObject("Skill", "SkillItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.nameLb = <fairygui.GRichTextField><any>(s.getChild("nameLb"));
		s.cdLb = <fairygui.GRichTextField><any>(s.getChild("cdLb"));
		s.desLb = <fairygui.GRichTextField><any>(s.getChild("desLb"));
		s.promptLb = <fairygui.GRichTextField><any>(s.getChild("promptLb"));
		s.costItem = <ViewResource><any>(s.getChild("costItem"));
		s.costItem.setImgUrl(Enum_Attr.TONGBI + "")
		s.levelLb = <fairygui.GRichTextField><any>(s.getChild("levelLb"));
		s.skillIcon = <fairygui.GLoader><any>(s.getChild("skillIcon"));
		s.upBt = <Button0><any>(s.getChild("upBt"));
		s.showGroup = <fairygui.GGroup><any>(s.getChild("showGroup"));
		s.selectImg = <fairygui.GImage><any>(s.getChild("selectImg"));
		s.noticeImg = <fairygui.GImage><any>(s.getChild("noticeImg"));
		// s.showGroup.visible = s.selectImg.visible = false;
		s.upBt.addClickListener(s.upHandle, this);
	}

	private upHandle(): void {
		let s = this;
		let arr = ["", "已满级", "技能等级不能超过角色等级", "铜币不足"];
		if (s.ret == 3) {
			View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
		} else if (s.ret) {
			ViewCommonWarn.text(arr[s.ret]);
		} else if (s.checkNotice) {
			GGlobal.modelSkill.CG_UPGRADE_SKILL(s.vo.id);
		}
	}

	/**1已满级 2技能等级超过角色等级3铜币不足*/
	public ret: number = 0;
	private _vo: Vo_Skill;
	public set vo(vo: Vo_Skill) {
		let s = this;
		s._vo = vo;
		s.ret = 0;
		s.nameLb.text = vo.name;
		s.cdLb.text = "CD:" + (vo.cdms / 1000) + "秒";
		(s.desLb.displayObject as egret.TextField).wordWrap = true;
		const desContent = HtmlUtil.fontNoColor(SkillUtil.getSkillDes(vo, 2), 20);
		const desArr = desContent.split("+");
		const desResult = desArr[0] + "\n+" + desArr[1] + "+" + desArr[2];
		s.desLb.text = desResult;
		let level = vo.level;
		if (level <= 0) {
			level = 1
			s.promptLb.text = vo.openguanqia + "关开启";
			s.promptLb.visible = true;
			s.costItem.visible = false;
			s.upBt.touchable = s.upBt.visible = false;
		} else {
			s.promptLb.visible = false;
			s.costItem.visible = true;
			s.upBt.touchable = s.upBt.visible = true;
		}
		s.levelLb.text = vo.level + "";
		ImageLoader.instance.loader(Enum_Path.SKILL_URL + vo.icon + ".png", s.skillIcon);
		var cost: number = Config.xiaohao_210[level].xiaohao;
		if (!Config.xiaohao_210[level+1]) {
			s.costItem.setCount("已满级");
			s.checkNotice = false;
			s.ret = 1;
		} else {

			if (Model_player.voMine.tongbi >= cost) {//铜币足够
				s.costItem.setCount(HtmlUtil.fontNoSize(cost + "", Color.getColorStr(2)));
				// if (Model_player.voMine.level > vo.level) {
				if (Model_LunHui.realLv > vo.level) {
					s.checkNotice = true;
				} else {
					s.ret = 2;
					s.checkNotice = false;
				}
			} else {
				s.ret = 3;
				s.costItem.setCount(HtmlUtil.fontNoSize(cost + "", Color.getColorStr(6)));
				s.checkNotice = false;
			}
		}
		s.skillIcon.grayed = vo.level <= 0;
		if (vo.level <= 0) s.checkNotice = false;
	}

	public get vo(): Vo_Skill {
		return this._vo;
	}

	private _choose: boolean = false;
	public set choose(value: boolean) {
		let s = this;
		s._choose = value;
		s.selectImg.visible = value;
		// s.showGroup.visible = value;
	}

	public get choose(): boolean {
		return this._choose;
	}

	private check: boolean = false;
	public set checkNotice(value: boolean) {
		let s = this;
		s.noticeImg.visible = value;
		s.check = value;
	}

	public get checkNotice(): boolean {
		return this.check;
	}
}