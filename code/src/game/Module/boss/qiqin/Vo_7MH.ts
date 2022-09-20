class Vo_7MH {
	public constructor() {
	}

	id: number = 0;
	linkID:number = 0;
	condition: any[];
	showAward: any[];
	killerAward: any[];
	map: number = 0;
	contryWard: any[];
	personRankWard: any[];
	tagWardDta: Vo_MHTag[] = [];

	lib;
	sortIndex: number = 0;
	sortMxIndex: number = 0;
	level;
	head;
	public init() {
		let s = this;
		let l = s.lib;
		s.id = l.boss;
		s.linkID = l.id;
		s.condition = JSON.parse(l.con);
		s.map = l.map;
		s.showAward = JSON.parse(l.reward);
		s.killerAward = JSON.parse(l.killreward);
		//当前国家的BOSS击杀奖励
		s.contryWard = [JSON.parse(l.reward1), JSON.parse(l.reward2), JSON.parse(l.reward3)];
		s.personRankWard = [JSON.parse(l.reward4), JSON.parse(l.reward5), JSON.parse(l.reward6), JSON.parse(l.reward7)];

		let c = s.condition[0];
		s.sortIndex = (c[0] / 1000) >> 0;
		s.sortMxIndex = (c[1] / 1000) >> 0;

		s.head = Config.NPC_200[s.id].head;
		s.level =((c[0] / 1000) >> 0)+"-"+((c[1] / 1000) >> 0) + "转";
	}

	public setTag(){

	}
}