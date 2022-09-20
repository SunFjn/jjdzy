class Tip_Skill_ZhenYan extends UIModalPanel {
	public iconImg: fairygui.GLoader;
	public upgradeBt: Button0;
	public nameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public curAttLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public costItem: ViewResource;

	public static URL: string = "ui://c7onhgk8lqbqo";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("Skill", "Tip_Skill_ZhenYan").asCom;
		this.contentPane = this.view;
		this.iconImg = <fairygui.GLoader><any>(this.view.getChild("iconImg"));
		this.upgradeBt = <Button0><any>(this.view.getChild("upgradeBt"));
		this.nameLb = <fairygui.GRichTextField><any>(this.view.getChild("nameLb"));
		this.levelLb = <fairygui.GRichTextField><any>(this.view.getChild("levelLb"));
		this.curAttLb = <fairygui.GRichTextField><any>(this.view.getChild("curAttLb"));
		this.nextAttLb = <fairygui.GRichTextField><any>(this.view.getChild("nextAttLb"));
		this.costItem = <ViewResource><any>(this.view.getChild("costItem"));
		this.upgradeBt.addClickListener(this.upgradeHandle, this);
		super.childrenCreated();
	}

	private upgradeHandle(): void {
		if (this.upgradeBt.checkNotice) {
			GGlobal.modelSkill.CG_UPGRADE_GODSKILL_ZHENYAN(this.skillID);
		} else {
			if (this.ret == 1) {
				ViewCommonWarn.text("已满级");
			} else if (this.ret == 2) {
				View_CaiLiao_GetPanel.show(this._costItem);
			}
		}
	}

	public update(): void {
		let skillList = Model_player.voMine.skillList;
		for (let i = 0; i < skillList.length; i++) {
			if (skillList[i].type == Model_Skill.TYPE3) {
				this._args = skillList[i].zhenYanArr[Math.floor(this.skillID / 1000) - 1];
				break;
			}
		}
		this.show();
	}

	private iconurlArr = ["", "ui://c7onhgk8dn7917", "ui://c7onhgk8dn7919", "ui://c7onhgk8dn7918"]
	private skillID: number = 0;
	private ret: number = 0;
	private _costItem:VoItem
	public show(): void {
		this.skillID = this._args;
		this.ret = 0;
		let cfg = Config.godskill_210[this.skillID];
		var arr: Array<any> = JSON.parse(cfg.result);
		this.iconImg.url = this.iconurlArr[cfg.type];
		this.nameLb.text = cfg.name;
		this.levelLb.text = cfg.dengji % 1000 + "级";

		this.curAttLb.text = Vo_attr.getShowStr(arr[0][0], arr[0][1]);
		if (cfg.next > 0) {
			let costArr: Array<any> = JSON.parse(cfg.consume);
			this._costItem = VoItem.create(costArr[0][1]);
			let count = Model_Bag.getItemCount(costArr[0][1])
			this.costItem.setLb(count, costArr[0][2]);
			this.costItem.setImgUrl(this._costItem.icon);
			let cfg1 = Config.godskill_210[cfg.next];
			var arr1: Array<any> = JSON.parse(cfg1.result);
			this.nextAttLb.text = Vo_attr.getShowStr(arr1[0][0], arr1[0][1]);
			this.upgradeBt.checkNotice = count >= costArr[0][2];
			if (count < costArr[0][2]) this.ret = 2;
		} else {
			this.nextAttLb.text = this.curAttLb.text;
			this.upgradeBt.checkNotice = false;
			this.costItem.setCount(HtmlUtil.fontNoSize("已满级", Color.getColorStr(6)));
			this.costItem.setImgUrl();
			this.ret = 1;
		}
	}

	protected onShown(): void {
		this.show();
		GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, this.update, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.GODSKILL_ZHENYAN);
		GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, this.update, this);
	}
}