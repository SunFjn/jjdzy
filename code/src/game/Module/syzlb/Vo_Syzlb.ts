class Vo_Syzlb {
	public constructor() {
	}
	public type: number;//1队长 2队员
	public name: string;//队长名/名
	public pId: number;
	public head: number;
	public frame: number;
	public lv: number;
	public power: number;

	public ct: number;//B:队伍人数
	public teamId: number;//B:队伍人数
	public hard: number;//B:队伍难度
	
	

	public readMsgTeam(d: BaseBytes){
		let s = this;
		s.type = d.readByte()
		s.name = d.readUTF()
		s.pId = d.readLong()
		s.head = d.readInt()
		s.frame = d.readInt()
		s.lv = d.readInt()
		s.power = d.readLong()
	}

	public readMsgJoin(d: BaseBytes){
		let s = this;
		s.name = d.readUTF()
		s.teamId = d.readInt()
		s.head = d.readInt()
		s.frame = d.readInt()
		s.ct = d.readByte()
		s.hard = d.readByte()
	}
}