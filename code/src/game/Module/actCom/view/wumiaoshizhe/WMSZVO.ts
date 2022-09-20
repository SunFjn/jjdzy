class WMSZVO {
	public rank:number = 0;//排名
	public name:string = "";//玩家名
	public integral:number = 0;//积分

	public constructor() {
	}

	public readRankMsg(data: BaseBytes){
		this.rank = data.readShort();
		this.name = data.readUTF();
		this.integral = data.readInt();
	}

	public id:number = 0;//配置表id
	public status:number = 0;//奖励状态，0:未达到，1:可领取，2:已领取

	public readMsg(data: BaseBytes){
		this.id = data.readInt();
		this.status = data.readByte();
	}
}