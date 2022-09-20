class ZhiGouVO {
	public constructor() {
	}

	//每日直购表id
	public id:number = 0;
	//奖励状态，0:未达到，1:可领取，2:已领取
	public state:number = 0;

	public readMsg(data: BaseBytes):void{
		this.id = data.readInt();
		this.state = data.readInt();
	}
}