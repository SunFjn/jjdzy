class Vo_ShaoZhu {
	public constructor() {
	}
	public bodyID = 0;
	public skillLv = 0;
	public bodyArr: ShaoZhuFashionVo[] = [];
	/**被动技能数组 */
	public skillData: { [key: string]: ShaoZhuSkill } = {};
	public shaozhuID = 0;
	public cfg: Ison_267;
	public initcfg(id) {
		let self = this;
		self.shaozhuID = id;
		self.cfg = Config.son_267[id];
		self.initStarCfg(self.cfg.star)
		self.initQinMiCfg(1);
		for (let key in Config.sonshow_267) {
			let fashioncfg = Config.sonshow_267[key];
			if (fashioncfg.son == id) {
				let fashionVo: ShaoZhuFashionVo = new ShaoZhuFashionVo();
				fashionVo.initcfg(fashioncfg);
				self.bodyArr.push(fashionVo);
			}
		}
	}

	public starLv = 0;
	public starcfg: Isonstar_267;
	public initStarCfg(starId: number) {
		let self = this;
		self.starLv = starId % 100;
		this.starcfg = Config.sonstar_267[starId];
	}

	public level = 1;
	public exp = 0;
	public qinMiCfg: Isonqm_267;
	public initQinMiCfg(level: number) {
		this.level = level;
		this.qinMiCfg = Config.sonqm_267[level];
	}

	public dispose() {
		let ret = this;
		ret.exp = 0;
		ret.level = 0;
		ret.starLv = 0;
		ret.shaozhuID = 0;
		ret.cfg = null;
		ret.qinMiCfg = null;
		ret.starcfg = null;

		ret.bodyID = 0;
		ret.skillLv = 0;
		ret.bodyArr = [];
		ret.skillData = {};
		Pool.recover("Vo_Skill", ret);
	}

	public static create(id) {
		let vo = Pool.getItemByClass("Vo_ShaoZhu", Vo_ShaoZhu);
		vo.initcfg(id);
		return vo;
	}
}

class ShaoZhuSkill {
	cfg: Isonskill_267;
	skillID: number;
	pos: number;
	alternativeSkillArr: any[];
	public initSkillCfg(value) {
		this.skillID = value;
		this.cfg = Config.sonskill_267[value];
	}
}

class ShaoZhuFashionVo {
	cfg: Isonshow_267;
	id: number;
	name: string;
	/**所属少主*/
	son: number
	/**升星属性 */
	attr: any[];
	/**升星道具 */
	conmuse: any[];
	/**升星上限 */
	max: number;
	/**品质 */
	pz: number
	/**模型 */
	mod: number;
	/**星级 */
	starLv: number;

	public initcfg(value: Isonshow_267) {
		let self = this;
		self.cfg = value;
		self.id = value.id;
		self.name = value.name;
		self.attr = JSON.parse(value.attr);
		self.conmuse = JSON.parse(value.conmuse);
		self.max = value.max;
		self.pz = value.pz;
		self.mod = value.mod;
		self.starLv = 0;
	}

	public getPower() {
		return ConfigHelp.powerFormulaArr(this.attr) * this.starLv;
	}
}