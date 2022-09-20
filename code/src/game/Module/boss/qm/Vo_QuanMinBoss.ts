class Vo_QuanMinBoss {
	public id: number = 0;
	public bossid: number = 0;
	public name: string = "";
	public bossbody: string = "";
	public weapon = 0;
	public bosshead: string = "";
	public cfg: any;
	public level: string;
	public reward: any[];
	public condition: any[];
	public time = 0;//呵呵

	public lastKiller: string = "";
	public reliveTime: number = 0;//死亡时间戳
	public curHp: number = 0;
	public maxHp:number=0;
	public st: number = 0;//0:未刷新 1已刷新

	sortIndex=0;
	public constructor() {
	}

	public initLib() {
		let s = this;
		s.cfg = Config.all_221[s.id];
		s.time = s.cfg.time;
		s.bossid = JSON.parse(s.cfg.boss)[0][1];
		let n = Config.NPC_200[s.bossid];
		s.name = n.name;
		s.maxHp = n.hp;
		s.weapon = n.weapon;
		s.condition = JSON.parse(s.cfg.con)[0];
		s.level = s.condition[0] > 0 ? s.condition[0] + "级" : s.condition[1] + "转";
		s.sortIndex = s.condition[0]*1000+s.condition[1];
		s.bossbody = n.mod;
		s.bosshead = n.head;
		s.reward = JSON.parse(s.cfg.reward);
	}

	isOpen() {
		let s = this;
		let r = false;
		if (s.condition[0] > 0) {
			r =  Model_LunHui.realLv >= s.condition[0];
		} else {
			r = ((Model_player.voMine.zsID / 1000) >> 0) >= s.condition[1];
		}
		return r;
	}

	public update() {
		let s =this;
		if (s.reliveTime  < (Model_GlobalMsg.getServerTime() / 1000) >> 0) {
			s.st = 1;
		} else {
			s.st = 0;
		}
	}
}