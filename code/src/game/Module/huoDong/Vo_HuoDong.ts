class Vo_HuoDong {
	public constructor() {
	}

	public id:number;
	public status:number = 0;
	public canCt:number = 0;//可领取的次数
	public hasCt:number = 0;//已领取的次数
	

	public readMsg(data: BaseBytes){
		this.id = data.readByte();
		this.status = data.readByte();
	}

	public readMsgInt(data: BaseBytes){
		this.id = data.readInt();
		this.status = data.readByte();
	}

	public readMsgCt(data: BaseBytes){
		this.id = data.readInt();
		this.canCt = data.readByte();
		this.hasCt = data.readByte();
	}

	//0前往充值
	public getStaCt(max){
		if(this.canCt > this.hasCt){
			return 1;
		}else if(this.hasCt == max){
			return 2;
		}else{
			return 0
		}
	}
}