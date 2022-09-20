class Vo_Kingship {
	public constructor() {
	}

	public sid: number = 0;//玩家id
	public name: string;//玩家姓名
	public power: number;//战力
	public job: number;//职业
	public godWeapon: number;//神兵
	public pos = 0;
	public id = 0;
	public type = 0;//0怪物1角色
	public horseId = 0;
	/**L:玩家IDI:npc系统idU:玩家名字L:玩家战力I:玩家时装B:玩家位置1魏王2魏相3魏国大将军 */
	public readMsg(data: BaseBytes): void {
		let self = this;
		self.sid = data.readLong();
		self.id = data.readInt();
		self.name = data.readUTF();
		self.power = data.readLong();
		self.job = data.readInt();
		self.godWeapon = data.readInt();
		self.pos = data.readByte();
		self.horseId = data.readInt();
		if (self.sid != 0) {
			self.id = self.sid;
		} else {
			let cfg = Config.NPC_200[self.id];
			self.name = cfg.name;
			self.job = cfg.mod;
			self.power = cfg.power;
		}
		self.type = 1;
	}
}