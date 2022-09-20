class VoRank {
	public constructor() {
	}

	public readMsg(data: BaseBytes): void {
		let self = this;
		self.rank = data.readInt();
		self.plyId = data.readLong();
		self.name = data.readUTF();
		self.job = data.readInt();
		self.godWeapon = data.readInt();
		self.level = data.readInt();
		self.lunhui = data.readInt();
		self.vip = data.readInt();
		self.guanxian = data.readInt();
		self.country = data.readInt();
		self.showCoun = data.readByte();
		self.power = data.readLong();
		self.params = data.readInt();
		self.headId = data.readInt();
		self.frameId = data.readInt();
		self.titleId = data.readInt();
		self.totPower = data.readLong();
		self.horseId = data.readInt();
	}
	public type: number;
	public headId: number;
	public frameId: number;
	public titleId: number;
	public totPower: number;

	public horseId: number;

	//排名
	public rank: number;
	//玩家id
	public plyId: number;
	//玩家名称
	public name: string;
	//职业
	public job: number;
	//神兵
	public godWeapon: number;
	//等级
	public level: number;
	//vip等级
	public vip: number;
	//官衔
	public guanxian: number;
	//国家
	public country: number;
	//是否显示国家
	public showCoun: number;
	//战力
	public power: number;
	//特殊字段1（铜雀台：层数）
	public params: number;
	//轮回等级
	public lunhui: number;
}