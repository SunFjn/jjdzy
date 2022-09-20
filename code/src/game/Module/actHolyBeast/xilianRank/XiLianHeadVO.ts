class XiLianHeadVO {
	public constructor() {
	}

	//头像id
	public headId:number;
	//国家
	public country:number;
	//vip等级
	public vip:number;
	//头像框
	public frameId:number;

	public readMsg(data: BaseBytes):void{
		this.headId = data.readInt();
		this.country = data.readInt();
		this.vip = data.readInt();
		this.frameId = data.readInt();
	}
}