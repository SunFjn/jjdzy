class Vo_CrossKingPly {
	public constructor() {
	}

	public rank:number;//排名
	public sid:number;
	public npcId:number;
	public name:string;//名字
	public power:number;//战力
	public isNpc:number;//是不是机器人0人物1npc
	public godWeapon:number;//神兵
	public job:number;//人物模型(job)
	public horseId:number;
	public index:number = 0;

	public readMsg(data:BaseBytes):void{
		let self = this;
		self.rank = data.readInt();
		self.sid = data.readLong();
		self.npcId = data.readInt();
		self.name = data.readUTF();
		self.power = data.readLong();
		self.isNpc = data.readByte();
		self.godWeapon = data.readInt();
		self.job = data.readInt();
		self.horseId = data.readInt();
	}

	public readMsgRank(data:BaseBytes):void{
		this.sid = data.readLong();
		this.name = data.readUTF();
	}
}