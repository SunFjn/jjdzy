class Vo_LingLong {
	public constructor() {
	}

	public readMsgRank(data:BaseBytes):void{
		this.plyId = data.readLong();
		this.name = data.readUTF();
		this.point = data.readInt();
		this.rankId = data.readInt();
	}
	public plyId:number;
	public name:string;//U:玩家姓名
	public point:number;//I:玩家积分
	public status:number;//玩家积分 领取情况 -1已领取  0不可领取  123可领取
	public rankId:number = 0;//I:玲珑阁排名表id  区服id
	public rank:number;//玲珑阁排名
	public itemVo:IGridImpl;//道具

	public readMsgLog(data:BaseBytes):void{
		this.name = data.readUTF();
		this.itemVo = ConfigHelp.parseItemBa(data);
	}

	public readMsgPoint(data:BaseBytes):void{
		this.point = data.readInt();
		this.status = data.readInt();
	}

	public readMsgRank1(data:BaseBytes):void{
		this.rankId = data.readInt();
		this.point = data.readInt();
	}
	
}