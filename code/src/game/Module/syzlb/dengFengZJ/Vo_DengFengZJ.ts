class Vo_DengFengZJ {
	public constructor() {
	}

	rank//排名
	plyId//玩家ID
	name//玩家名称
	power//战力
	fashion//时装
	weakean//专属神兵
	horse//坐骑
	st//0.未挑战 1.已挑战

	head;
	frame;

	public readMsg(data) {
		let s = this;
		s.readMsgRp(data)
		s.st = data.readByte();
	}


	public readMsgRp(data) {
		let s = this;
		s.rank = data.readInt();
		s.plyId = data.readLong();
		s.name = data.readUTF();
		s.power = data.readLong();
		s.fashion = data.readInt();
		s.weakean = data.readInt();
		s.horse = data.readInt();
		s.st = 0;
	}

	public readMsgPre(data) {
		let s = this;
		s.plyId = data.readLong();
		s.name = data.readUTF();
		s.power = data.readLong();
		s.head = data.readInt();
		s.frame = data.readInt();
	}


}