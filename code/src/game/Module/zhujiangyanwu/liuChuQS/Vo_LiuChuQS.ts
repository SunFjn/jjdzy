class Vo_LiuChuQS {
	public constructor() {
	}
	
	//B:类型 1队长 2队员
	public type;
	//U:队员名字
	public name;
	// L:队员id
	public plyId;
	//I:队员头像
	public head;
	//I:队员头像框 
	public frame;
	//I:队员等级
	public lv;
	// L:队员战力
	public power;

	public teamId//队伍id
	public guan//关卡id

	public readMsg(b: BaseBytes){
		this.type = b.readByte();
		this.name = b.readUTF();
		this.plyId = b.readLong();
		this.head = b.readInt();
		this.frame = b.readInt();
		this.lv = b.readInt();
		this.power = b.readLong();
	}

}