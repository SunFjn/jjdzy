class Vo_Npc {
	public constructor() {
	}

	id;//serverid
	cfgID;
	hp=1;
	maxHp=1;
	cfg: INPC_200;

	init(id, cfgID = 0) {
		let s = this;
		s.id = id;
		s.cfgID = cfgID;
		s.cfg = Config.NPC_200[cfgID];
		if (DEBUG && !s.cfg) {
			throw new Error("没有配置NPCID：" + id);
		}
	}

	static create(id, cfgID = 0): Vo_Npc {
		let vo = Pool.getItemByClass("Vo_Npc", Vo_Npc);
		vo.init(id, cfgID);
		return vo;
	}

	recover() {
		Pool.recover("Vo_Npc", this);
	}
}