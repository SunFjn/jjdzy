class Vo_CaiLiaoFB {
	//ID	NAME	startcondition	monster	boss	ADD	AWARD	picture	scene

	public id: number;
	public name: string;
	public startcondition: string;
	public monsterArr: Array<any> = [];
	public bossArr: Array<any> = [];
	public addArr: Array<any> = [];
	public rewardArr: Array<any> = [];
	public picture;
	public tupian = 0;
	public scene: number;
	/**剩余挑战次数 */
	public battleNum: number = 0;
	/**已购买次数 */
	public buyNum: number = 0;
	/**是否通关 0没有1有*/
	public pass: number = 0;
	public isOpen: number;
	public paixu: number;
	public taskType: number;
	public lib: Icailiaofuben_709;
	public constructor() {
	}

	public initcfg(id: number): void {
		let a = this;
		a.id = id;
		let cfg = Config.cailiaofuben_709[id];
		a.lib = cfg;
		a.name = cfg.NAME;
		a.startcondition = cfg.startcondition;
		a.monsterArr = JSON.parse(cfg.monster);
		a.bossArr = JSON.parse(cfg.boss);
		a.addArr = JSON.parse(cfg.ADD);
		a.rewardArr = JSON.parse(cfg.AWARD);
		a.picture = cfg.picture;
		a.scene = cfg.scene;
		a.tupian = cfg.tupian;
		a.paixu = cfg.paixu;
		a.taskType = cfg.type;
	}

	public static create(id: number): Vo_CaiLiaoFB {
		let vo: Vo_CaiLiaoFB = new Vo_CaiLiaoFB();
		vo.initcfg(id);
		return vo;
	}
}