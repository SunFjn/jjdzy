class DDLVO {
	public rank:number = 0;//排名
	public name:string = "";//玩家名字
	public count:number = 0;//对联正确次数

	public constructor() {
	}

	public readRankMsg(data: BaseBytes){
		this.rank = data.readByte();
		this.name = data.readUTF();
		this.count = data.readInt();
	}

	public id:number = 0;
	public status:number = 0;//奖励状态，0:未达到，1:可领取，2:已领取
	public readAwardMsg(data: BaseBytes){
		this.id = data.readInt();
		this.status = data.readByte();
	}
}