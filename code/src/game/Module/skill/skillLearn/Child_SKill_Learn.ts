class Child_SKill_Learn extends fairygui.GComponent implements IPanel {

	//>>>>start
	public item0: SkillItem;
	public item1: SkillItem;
	public item2: SkillItem;
	public keyBt: Button1;
	public powerLb: fairygui.GLabel;
	//>>>>end

	public itemArr: Array<SkillItem> = [];

	public static URL: string = "ui://c7onhgk8c14zm";

	public static createInstance(): Child_SKill_Learn {
		return <Child_SKill_Learn><any>(fairygui.UIPackage.createObject("Skill", "Child_SKill_Learn"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		
		CommonManager.parseChildren(a, a);

		for (let i = 0; i < 3; i++) {
			let item: SkillItem = <SkillItem><any>(a.getChild("item" + i));
			item.data = i;
			a.itemArr.push(item);
			item.addClickListener(a.itemHandle, this);
		}
		a.itemArr[0].choose = true;
		a.curItem = a.itemArr[0];
	}

	private curItem: SkillItem;
	private itemHandle(event: egret.TouchEvent): void {
		let a = this;
		let item: SkillItem = event.target as SkillItem;
		if (item == a.curItem || item.vo.level <= 0) {
			if (item.vo.level <= 0) {
				ViewCommonWarn.text("第" + Config.skillstart_210[item.data + 1].start + "关开启");
			}
			return;
		}
		if (a.curItem) a.curItem.choose = false;
		item.choose = true;
		a.curItem = item;
	}

	private keyHandle(): void {
		let arr = ["", "已满级", "技能等级不能超过角色等级", "铜币不足"];
		let a = this;
		if (a.skillRet == 3) {
			View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
		} else if (a.skillRet) {
			ViewCommonWarn.text(arr[a.skillRet]);
		} else if (a.keyBt.checkNotice) {
			GGlobal.modelSkill.CG_KEYUPGRADE_SKILL();
		}
	}

	/**1已满级 2技能等级超过角色等级3铜币不足*/
	private skillRet: number = 0;
	private updateShow() {
		let a = this;
		let power: number = 0;
		a.skillRet = 0;
		let checkNotice: boolean = false;
		let arr: Array<Vo_Skill> = Model_player.voMine.skillList;
		let len = a.itemArr.length;
		var cfgids: Array<number> = JSON.parse(Config.hero_211[Model_player.voMine.job].attack);
		for (let i = 0; i < len; i++) {
			let vo: Vo_Skill;
			vo = arr[i + cfgids.length];
			let item: SkillItem = a.itemArr[i];
			item.vo = vo;
			if (vo.level > 0) {
				power += vo.skill_power;
			}
			if (item.checkNotice) {
				checkNotice = true;
			}
			if (item.ret > a.skillRet) {
				a.skillRet = item.ret;
			}
		}
		if (checkNotice) a.skillRet = 0;
		a.powerLb.text = power + "";
		a.keyBt.checkNotice = checkNotice;
	}

	public open(): void {
		this.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_SKILL, this.updateShow, this);
		this.keyBt.addClickListener(this.keyHandle, this);
	}

	public close() {
		GGlobal.reddot.remove(ReddotEvent.CHECK_SKILL, this.updateShow, this);
		this.keyBt.removeClickListener(this.keyHandle, this);
	}
}