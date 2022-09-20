class Vo_ActLeiTai {
	public constructor() {
	}

	public id: number;
	public cfg: Ileitai_500;
	public plyArr: Vo_ActLeiTaiPly[]

	public readMsg(data: BaseBytes) {
		let s = this;
		s.id = data.readInt();
		s.plyArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: Vo_ActLeiTaiPly = new Vo_ActLeiTaiPly();
			v.readMsg(data);
			s.plyArr[v.pos] = v;
		}
		s.cfg = Config.leitai_500[s.id];
		s.setIsZhu();
	}

	private _isLeiZhu = false;
	public setIsZhu() {
		let s = this;
		let id = Model_player.voMine.id
		if (s.plyArr[0] == null) {
			s._isLeiZhu = false;
		}
		s._isLeiZhu = (id == s.plyArr[0].plyId);
	}
	//自己是擂主
	public get isLeiZhu() {
		return this._isLeiZhu
	}

	public get isNoPly() {
		let s = this;
		let ply = s.plyArr[0];
		if (!ply || ply.npcId > 0 || ply.plyId == 0) {
			return true;
		}
		return false;
	}
}


class Vo_ActLeiTaiPly {

	public constructor() {
	}
	plyId: number;//玩家id
	name: string;//玩家名字
	npcId: number;//npc
	szId: number;//时装
	godWeapon//神兵
	isLei;//是否擂主（1：是，0：否）
	pos: number;//协助位置
	horseId = 0
	power = 0
	headId = 0
	frameId = 0

	npcCfg: INPC_200 = null;

	public readMsg(data: BaseBytes) {
		let s = this;
		s.plyId = data.readLong();
		s.name = data.readUTF();
		s.headId = data.readInt();
		s.frameId = data.readInt();
		s.horseId = data.readInt();
		s.power = data.readLong();
		s.npcId = data.readInt();
		s.szId = data.readInt();
		s.godWeapon = data.readInt();
		s.isLei = data.readByte();
		s.pos = data.readByte();
		if (s.isLei) {
			s.pos = 0;
		}
		if (s.npcId) {
			s.npcCfg = Config.NPC_200[s.npcId];
		}
	}
}