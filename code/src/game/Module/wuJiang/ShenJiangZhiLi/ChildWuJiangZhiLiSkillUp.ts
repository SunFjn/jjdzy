/**
 * 神将之力 - 技能进阶
 */
class ChildWuJiangZhiLiSkillUp extends fairygui.GComponent implements IPanel{
	public c1: fairygui.Controller;
	public nextLb: fairygui.GTextField;
	public nextDes: fairygui.GTextField;
	public nextAttLb: fairygui.GTextField;
	public curLb: fairygui.GTextField;
	public curDes: fairygui.GTextField;
	public curAttLb: fairygui.GTextField;
	public powerLb: fairygui.GRichTextField;
	public vres: ViewResource;
	public itemName: fairygui.GTextField;
	public skillTxt0: fairygui.GTextField;
	public skillTxt1: fairygui.GTextField;
	public skillTxt2: fairygui.GTextField;
	public skillUpBtn: Button1;
	private _maxLv:number = 0;
	private heroType : number = 0;
	private _count: number = 0;
	private _costArr;

	public static URL: string = "ui://zyx92gzwf00b4y";

	public static createInstance(): ChildWuJiangZhiLiSkillUp {
		return <ChildWuJiangZhiLiSkillUp><any>(fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangZhiLiSkillUp"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.vres.setType(1);
	}

	openPanel(pData?: any) {
		let s = this;
		s.heroType = Model_WuJiang.wujiangzhiliType;
		s.skillUpBtn.addClickListener(s.onSkillUp, s);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP,s.updateView, s);
		s.updateView();
	}

	closePanel(pData?: any) {
		let s = this;
		s.skillUpBtn.removeClickListener(s.onSkillUp, s);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP,s.updateView, s);
	}

	private updateView() {
		let s = this;
		let cfg:Iherogodskill_211;
		for(let key in Config.herogodskill_211)
		{
			cfg = Config.herogodskill_211[key];
			let id:number = Math.floor(cfg.id / 100);
			if(id == Model_WuJiang.wujiangzhiliType)
			{
				s._maxLv = cfg.star;
			}
		}
		let shenjiangzhiliSkillLv:number = Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType]? Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] : 0;
		let shenjiangzhiliLv:number = Model_WuJiang.wujiangGodPower[Model_WuJiang.wujiangzhiliType]? Model_WuJiang.wujiangGodPower[Model_WuJiang.wujiangzhiliType] : 0;
		let id:number = Model_WuJiang.wujiangzhiliType * 100 + shenjiangzhiliSkillLv;
		let curCfg:Iherogodskill_211 = Config.herogodskill_211[id];
		let nextCfg:Iherogodskill_211 = Config.herogodskill_211[id + 1];
		if (shenjiangzhiliSkillLv > 0) {
			if (nextCfg) {
				s.c1.selectedIndex = 1;
				s.powerLb.text = curCfg.power + "";
				let color:string = shenjiangzhiliLv >= curCfg.star? "#58ff31" : "#ee1515";
				s.curLb.text = "[color=#ffee79]当前阶段：[/color][color=#fffccc]神将之力达到" + curCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + curCfg.star + ")[/color]";
				s.curDes.text = curCfg.tips;
				let attArr: Array<any> = JSON.parse(curCfg.attr);
				let attStr: string = "";
				for (let i = 0; i < attArr.length; i++) {
					if (i == 0) {
						attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
					} else {
						attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
					}
				}
				s.curAttLb.text = attStr;

				color = shenjiangzhiliLv >= nextCfg.star? "#58ff31" : "#ee1515";
				s.nextLb.text = "[color=#ffee79]下一阶段：[/color][color=#fffccc]神将之力达到" + nextCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + nextCfg.star + ")[/color]";
				s.nextDes.text = nextCfg.tips;
				attArr = JSON.parse(nextCfg.attr);
				attStr = "";
				for (let i = 0; i < attArr.length; i++) {
					if (i == 0) {
						attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					} else {
						attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					}
				}
				s.nextAttLb.text = attStr;

				s._costArr = JSON.parse(nextCfg.consume);
				let itemVo: VoItem = VoItem.create(s._costArr[0][1]);
				s.vres.setImgUrl(itemVo.icon);
				s._count = Model_Bag.getItemCount(s._costArr[0][1]);
				s.vres.setLb(s._count, s._costArr[0][2]);
				s.itemName.text = itemVo.name;
			}else {
				s.c1.selectedIndex = 2;
				s.powerLb.text = curCfg.power + "";
				let color:string = shenjiangzhiliLv >= curCfg.star? "#58ff31" : "#ee1515";
				s.curLb.text = "[color=#ffee79]当前阶段：[/color][color=#fffccc]神将之力达到" + curCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + curCfg.star + ")[/color]";
				s.curDes.text = curCfg.tips;
				let attArr: Array<any> = JSON.parse(curCfg.attr);
				let attStr: string = "";
				for (let i = 0; i < attArr.length; i++) {
					if (i == 0) {
						attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
					} else {
						attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
					}
				}
				s.curAttLb.text = attStr;
			}
			let arr = JSON.parse(curCfg.attpg);
			let len:number = arr.length;
			for(let i:number = 0;i < len;i ++)
			{
				if(s["skillTxt" + i])
				{
					s["skillTxt" + i].text = s.ShowSkillTxt(arr[i][0], arr[i][1]);
				}
			}
		}else{
			s.c1.selectedIndex = 0;
			s.powerLb.text = "0";
			let color:string = shenjiangzhiliLv >= nextCfg.star? "#58ff31" : "#ee1515";
			s.nextLb.text = "[color=#ffee79]下一阶段：[/color][color=#fffccc]神将之力达到" + nextCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + nextCfg.star + ")[/color]";
			s.nextDes.text = nextCfg.tips;
			let attArr: Array<any> = JSON.parse(nextCfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			s.nextAttLb.text = attStr;

			s._costArr = JSON.parse(nextCfg.consume);
			let itemVo: VoItem = VoItem.create(s._costArr[0][1]);
			s.vres.setImgUrl(itemVo.icon);
			s._count = Model_Bag.getItemCount(s._costArr[0][1]);
			s.vres.setLb(s._count, s._costArr[0][2]);
			s.itemName.text = itemVo.name;
			
			let arr = JSON.parse(nextCfg.attpg);
			let len:number = arr.length;
			for(let i:number = 0;i < len;i ++)
			{
				if(s["skillTxt" + i])
				{
					s["skillTxt" + i].text = s.ShowSkillTxt(arr[i][0], 0);
				}
			}
		}
		s.skillUpBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, this.heroType);
	}

	/**
	 * 技能伤害txt
	 */
	private ShowSkillTxt(id:number, per:number):string
	{
		let str:string = "";
		let cfg:Iskill_210 = Config.skill_210[id];
		str = cfg? cfg.n : "";
		str += "：" + per/ 1000 + "%";
		return str
	}

	/**
	 * 技能进阶
	 */
	private onSkillUp() {
		// let s = this;
		// if(Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] = null)
		// {
		// 	ViewCommonWarn.text("神将未激活");
		// 	return;
		// }
		// if(Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] >= this._maxLv)
		// {
		// 	ViewCommonWarn.text("已达最大阶");
		// 	return;
		// }
		// if(s._count < s._costArr[0][2])
		// {
		// 	ViewCommonWarn.text("道具不足");
		// 	return;
		// }
		GGlobal.modelWuJiang.CG_GENERAL_SKILLUP(Model_WuJiang.wujiangzhiliType);
	}
}