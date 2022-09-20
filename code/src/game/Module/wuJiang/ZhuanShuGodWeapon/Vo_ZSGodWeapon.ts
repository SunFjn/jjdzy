class Vo_ZSGodWeapon {
	/**可激活 */
	public static CANACTIVITY = 0;
	/**已激活 */
	public static ACTIVITY = 1;
	/**未激活 */
	public static NOCANACTIVITY = 2;
	public bodyArr: Isbpf_750[] = [];
	public cfg: Isb_750;
	public job = 0;
	public quality = 0;
	public starMax = 0;
	public costArr = []
	public wujiangVo: Ihero_211;
	public state = 0;
	/**星级 */
	public starLv = 0;
	public equipID = 0;
	public bodyIDArr: any[] = [];
	public tunshiArr: any[] = [0, 0, 0];
	public zsLv = 0;
	public clLv = 0;
	public initcfg(value) {
		let self = this;
		self.cfg = Config.sb_750[value];
		self.job = self.cfg.type;
		self.quality = self.cfg.pinzhi;
		self.starMax = self.cfg.shengxing;
		self.costArr = JSON.parse(self.cfg.activation);
		self.wujiangVo = Config.hero_211[self.cfg.type];
		self.initCuiLian(1);
		self.initZhuanShu(0);
		let index = 1;
		while (index > 0) {
			let bodycfg = Config.sbpf_750[self.cfg.type * 1000 + index];
			if (bodycfg) {
				self.bodyArr.push(bodycfg);
				index++;
			} else {
				index = 0;
			}
		}
	}

	public clExp = 0;
	public cuiLianCfg: Isbcl_750;
	public initCuiLian(level) {
		let self = this;
		self.clLv = level;
		self.cuiLianCfg = Config.sbcl_750[self.quality * 10000 + level];
	}

	public zhuanShuCfg: Isbzs_750;
	public initZhuanShu(level) {
		let self = this;
		self.zsLv = level;
		self.zhuanShuCfg = Config.sbzs_750[self.job * 1000 + level];
		let vomine = Model_player.voMine;
		if (self.job == Model_player.voMine.job) {
			for (let i = 0; i < vomine.skillList.length; i++) {
				let vo = vomine.skillList[i];
				if (vo.type == Model_Skill.TYPE3) {
					vo.godWeaponPer = JSON.parse(self.zhuanShuCfg.jineng)[0][1];
					break;
				}
			}
			if (vomine.sceneChar) {
				vomine.sceneChar.attackCount = 0;
				vomine.sceneChar.skillList = vomine.skillList;
			}
		}
	}


	public static create(id: number) {
		let vo = new Vo_ZSGodWeapon();
		vo.initcfg(id);
		return vo;
	}
}