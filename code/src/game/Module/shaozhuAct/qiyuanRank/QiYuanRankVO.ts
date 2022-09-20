class QiYuanRankVO {
	public constructor() {
	}

	//玩家名字
	public name:string;
	//鉴定次数
	public jdCount:number;

	public readMsg(data: BaseBytes):void{
		this.name = data.readUTF();
		this.jdCount = data.readInt();
	}
}