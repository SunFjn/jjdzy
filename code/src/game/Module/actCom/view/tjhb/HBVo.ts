class HBVo {
	public isSystemHB:number = 0;//是否系统红包，0不是，1是
	public hbStatus:number = 0;//红包状态：0已抢光，1可抢，2已经抢过
	public hbId:number = 0;//红包id
	public hbType:number = 0;//红包类型，配置表id
	public name:string = "";//姓名
	public headId:number = 0;//头像
	public frameId:number = 0;//头像框
	public hbNum:number = 0;//红包个数
	public robNum:number = 0;//抢到的红包金额

	public constructor() {
	}

	public readMsg(data: BaseBytes){
		this.isSystemHB = data.readByte();
		this.hbStatus = data.readByte();
		this.hbId = data.readLong();
		this.hbType = data.readInt();
		this.name = data.readUTF();
		this.headId = data.readInt();
		this.frameId = data.readInt();
		this.hbNum = data.readInt();
		this.robNum = data.readInt();
	}

	public id:number = 0;//id
	public param:number = 0;//参数
	public sendStatus:number = 0;//0未发，1可发，2已发

	public readFhbMsg(data: BaseBytes){
		this.id = data.readInt();
		this.param = data.readInt();
		this.sendStatus = data.readByte();
	}

	public recordName:string = "";//名字
	public money:number = 0;//红包金额
	public isMyself:number = 0;//是否玩家本人,1是,0不是

	public readRecordMsg(data: BaseBytes){
		this.recordName = data.readUTF();
		this.money = data.readInt();
		this.isMyself = data.readByte();
	}
}