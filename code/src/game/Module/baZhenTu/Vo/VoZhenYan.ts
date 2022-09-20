class VoZhenYan {
	public constructor() {
	}

	public cfg:Izy_766;
	public id;
	public lvId;
	//等级
	public get lv() {
		return this.lvId % 10000
	}
	//星级
	public get star() {
		return Math.floor(this.lvId % 10000 / 10)
	}

	public readMsg(data: BaseBytes) {
		let s = this;
		s.id = data.readInt();
		s.lvId = data.readInt();
		s.cfg = Config.zy_766[s.id];
	}

}