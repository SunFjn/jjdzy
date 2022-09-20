class Vo_SystemRank {
	public constructor() {
	}

	//玩家名字
	public name: string;
	//鉴定次数
	public count: number;
	//鉴定次数
	public rank: number;
	public readMsg(data: BaseBytes): void {
		let self = this;
		self.rank = data.readInt();
		self.name = data.readUTF();
		self.count = data.readInt();
	}

	//头像id
	public headId: number;
	//国家
	public country: number;
	//vip等级
	public vip: number;
	//头像框
	public frameId: number;
	public readHeadMsg(data: BaseBytes): void {
		let self = this;
		self.headId = data.readInt();
		self.frameId = data.readInt();
		self.country = data.readInt();
		self.vip = data.readInt();
	}
}