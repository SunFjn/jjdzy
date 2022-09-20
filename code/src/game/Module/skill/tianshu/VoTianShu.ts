class VoTianShu {
	public constructor() {
	}
	/**
	 * 已装备设置为9999
	 * 激活按star
	 * 未激活懒得管
	*/
	sortIndex: number = 0;

	public id: number;
	public name: string;
	public way: string;
	public max: number;
	public icon: string;
	public pic: string;
	public pin;
	public star: number = 0;
	public starMax: number = 0;

	public att: any[] = [];
	public starAtt: any[] = [];
	public item;/**升级道具*/

	public power: number = 0;
	public cd: number = 0;
	public dragCount: number = 0;//激活的属性丹数量
	public desc: string = "";
	public skillID: number;

	public initLib() {
		var s = this;
		var lib = Config.book_215[s.id];
		s.way = lib["way"];
		s.icon = lib["icon"];
		s.pic = lib["pic"];
		s.name = lib["name"];
		s.pin = lib["pin"];
		s.starMax = lib["star"];
		s.att = JSON.parse(lib["attr"]);
		s.starAtt = JSON.parse(lib["starattr"]);
		s.item = lib["item"];

		s.skillID = lib["skill"];
		var sklib = Config.skill_210[s.skillID];
		s.cd = sklib["cd"];
		s.desc = sklib["des"];

		s.dragCount = s.star * lib["max"];
		s.max = lib["max"];
		s.updatePower();
	}

	public updatePower() {
		let s = this;
		let lib = Config.book_215[s.id];
		let starcfg = Config.bookstar_215[s.pin * 1000 + s.star];
		s.power = starcfg ? starcfg.power : 0;
		let sklib = Config.skill_210[s.skillID];
		let sv = Vo_Skill.create(s.skillID, s.star, s.star)
		s.desc = SkillUtil.getSkillDes(sv);
		s.dragCount = s.star * lib["max"];
	}

	public isMaxStar(): boolean {
		return this.star >= this.starMax;
	}

	public canAcitvate() {
		var lib = Config.book_215[this.id];
		let item = JSON.parse(lib["item"]);
		let count = Model_Bag.getItemCount(item[0][1]);
		return count > 0;
	}
}