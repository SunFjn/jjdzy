class View_chat_WuJiang extends UIModalPanel {

	public starLb: fairygui.GRichTextField;
	public ownerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public backIcon: fairygui.GLoader;
	public groupTF: fairygui.GGroup;
	public groupStar: fairygui.GGroup;
	public skill0: ChatWuJiangSkillS;
	public skill1: ChatWuJiangSkillS;
	public skill2: ChatWuJiangSkillS;
	public skill3: ChatWuJiangSkillS;
	public skillInnate: ChatWuJiangSkillS;
	public imgDi:fairygui.GImage;

	public static URL: string = "ui://fx4pr5qewjpa2b";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_WuJiang").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}
	private secSkill;
	/**武将：id_时装_星级_等阶_战力_技能等级1_2_3 */
	private updateShow() {
		let s = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		let fashion = parseInt(arr[1]);
		let job = parseInt(arr[0]);
		s.starLb.text = arr[2];
		s.ownerLb.text = "拥有者：" + vo.name;
		s.powerLb.text = "战力：" + arr[4];//(wjcfg.power + parseInt(arr[2]) * wjcfg.starpower)星级战力计算
		let wjcfg: Ihero_211 = Config.hero_211[job];
		let isGodWuJiang = Model_WuJiang.isGodWuJiang(job);
		let skillArr = JSON.parse(wjcfg.skills);
		let star:any  = arr[2];
		if (isGodWuJiang) {
			star = ModelGodWuJiang.conversionToStar(star);
			s.nameLb.text = HtmlUtil.fontNoSize(wjcfg.name + "(" + ModelGodWuJiang.getXiuLianStr(parseInt(arr[2])) + ")", Color.getColorStr(wjcfg.pinzhi));
		} else {
			s.nameLb.text = HtmlUtil.fontNoSize("武将·" + wjcfg.name + "(" + Config.herolv_211[parseInt(arr[3])].jie + ")", Color.getColorStr(wjcfg.pinzhi));
		}
		let skillDamArr = [];
		let godskillCfg:Iherogodskill_211 = Config.herogodskill_211[job * 100 + parseInt(arr[10])];
		if(godskillCfg)
		{
			let skillId:number;
			let attArr = JSON.parse(godskillCfg.attpg);
			for(let i:number = 0;i < skillArr.length;i ++)
			{
				skillId = skillArr[i][0];
				for(let j:number = 0;j < attArr.length; j++)
				{
					if(attArr[j][0] == skillId)
					{
						skillDamArr.push(attArr[j][1]);
					}
				}
			}
		}
		s.skill0.setVo(skillArr[0][0], 0, parseInt(arr[5]) > 0 ? parseInt(arr[5]) : 1, job, star, 0, skillDamArr[0]?skillDamArr[0]:0);
		s.skill1.setVo(skillArr[1][0], 1, parseInt(arr[6]) > 0 ? parseInt(arr[6]) : 1, job, star, 0, skillDamArr[0]?skillDamArr[0]:0);
		s.skill2.setVo(skillArr[2][0], 2, parseInt(arr[7]) > 0 ? parseInt(arr[7]) : 1, job, star, 0, skillDamArr[0]?skillDamArr[0]:0);
		s.skill3.setVo(skillArr[3][0], 3, 1, job, star);
		let cfg = Config.sz_739[fashion];
		if (cfg) {
			s.awatar.setBody(cfg.moxing);
			s.awatar.setWeapon(fashion);
		} else {
			s.awatar.setBody(job);
			s.awatar.setWeapon(job);
		}
		s.awatar.setGodWeapon(parseInt(arr[8]));
		s.awatar.setHorseId(vo.horseId);
		s.awatar.uiparent = s.displayListContainer;
		s.awatar.onAdd();
		Timer.instance.remove(s.playSkill, s);
		s.secSkill = skillArr[1][0];
		if (isGodWuJiang) {
			s.skillInnate.setVo(wjcfg.skill, 4, parseInt(arr[9]), job, arr[2], { id: wjcfg.buffid });
			s.groupTF.visible = true;
			s.groupStar.visible = false;
		} else {
			s.groupTF.visible = false;
			s.groupStar.visible = true;
		}

		if (!vo.horseId) {
			s.playSkill();
			s.awatar.setScaleXY(1.5, 1.5);
		} else {
			s.awatar.setScaleXY(1, 1);
		}
		// s.playSkill();
	}
	private playSkill() {
		this.awatar.playSkillID(this.secSkill, false);
		Timer.instance.callLater(this.playSkill, 5000, this);
	}

	private awatar: UIRole = null;
	protected onShown(): void {
		let self = this;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.imgDi.x, self.imgDi.y);
			// self.awatar.setScaleXY(1.5, 1.5);
		}
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		IconUtil.setImg(self.backIcon, null);
		GGlobal.layerMgr.close(UIConst.CHAT_WUJIANG);
		Timer.instance.remove(self.playSkill);
	}
}