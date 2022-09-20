class Vo_CrossKingRep {
	public constructor() {
	}

	public batRes:number = 0;//战斗结果0失败1成功
	public name:string;//名字
	public rank:number;//排名 0不变1上升下降
	public isUp:number;//是否晋级 1晋级2掉级

	public readMsg(data:BaseBytes):void{
		this.batRes = data.readByte();
		this.name = data.readUTF();
		this.rank = data.readByte();
		this.isUp = data.readByte();
	}
}