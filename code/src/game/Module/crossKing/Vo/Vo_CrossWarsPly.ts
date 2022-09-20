class Vo_CrossWarsPly {
	public constructor() {
	}

	public turn: number = 0;//轮数0-4
	public index: number = 0;//场数0-8
	public hid1: number;//对手hid1
	public hid2: number;//对手hid2
	public name1: string;//对手名字
	public name2: string;//对手名字
	public job1: number;//人物模型(job)
	public job2: number;//人物模型(job)
	public weakean1: number;//武器模型
	public weakean2: number;//武器模型
	public power1: number;//战力
	public power2: number;//战力
	public battleRes: number;//战斗结果0未有结果, 1为ID1赢, 2为ID2赢
	public buywin: number;//买输赢情况0没有买, 1为ID1赢, 2为ID2赢
	public guanxian1: number;//官衔
	public guanxian2: number;//
	public head1: number;//头像
	public head2: number;//
	public frame1: number;//头像框
	public frame2: number;

	public horseId1: number;
	public horseId2: number;


	public readMsg(data: BaseBytes): void {
		let self = this;
		self.turn = data.readByte();
		self.index = data.readByte();
		self.hid1 = data.readLong();
		self.hid2 = data.readLong();
		self.name1 = data.readUTF();
		self.name2 = data.readUTF();
		self.job1 = data.readInt();
		self.job2 = data.readInt();
		self.weakean1 = data.readInt();
		self.weakean2 = data.readInt();
		self.power1 = data.readLong();
		self.power2 = data.readLong();
		self.guanxian1 = data.readByte();
		self.guanxian2 = data.readByte();
		self.head1 = data.readInt();
		self.head2 = data.readInt();
		self.frame1 = data.readInt();
		self.frame2 = data.readInt();
		self.battleRes = data.readByte();
		self.buywin = data.readByte();
		self.horseId1 = data.readInt();
		self.horseId2 = data.readInt();
	}


	public readWinMsg(data: BaseBytes): void {
		let self = this;
		self.turn = data.readByte();
		self.name1 = data.readUTF();
		self.power1 = data.readLong();
		self.job1 = data.readInt();
		self.weakean1 = data.readInt();
		self.horseId1 = data.readInt();
	}
}