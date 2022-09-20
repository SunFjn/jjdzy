class VoLimitGift {
	public constructor() {
	}

	type//礼包类型
	endTime//结束时间
	awaArr: { id: number, st: number, cfg: Ixslbb_331 }[]//I:表的idB:状态 0未领取 1可领取 2已领取

	public readMsg(data: BaseBytes) {
		let s = this;
		s.type = data.readInt()
		s.endTime = data.readInt()
		let len = data.readShort();
		s.awaArr = []
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let st = data.readByte()
			let cfg = Config.xslbb_331[id];
			s.awaArr.push({ id: id, st: st, cfg: cfg });
		}
	}
}