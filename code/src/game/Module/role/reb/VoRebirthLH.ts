class VoRebirthLH {
	public constructor() {
	}

	public  exp;
	public  pos;
	public  lv;

	public readMsg(data){
		this.pos = data.readByte();
		this.lv = data.readInt();
		this.exp = data.readInt();
	}
}