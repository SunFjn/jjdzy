class WishTreeVO {
	public id:number;
	public status:number = 0;

	public constructor() {
	}

	public readMsg(data: BaseBytes){
		this.id = data.readInt();
		this.status = data.readByte();
	}

	public rank:number = 0;
	public name:string = "";
	public wish:number = 0;
	public readRankMsg(data: BaseBytes){
		this.rank = data.readShort();
		this.name = data.readUTF();
		this.wish = data.readInt();
	}
}