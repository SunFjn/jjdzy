class VoTianMing {
	public constructor() {
	}


	public id;//天命id
	public lvId;//天命升级表id
	public pinId;//天命升品表id
	public cfg: Itm_292;
	public cfgLv: Itmlv_292;
	public cfgPin: Itmpin_292;


	public readMsg(data: BaseBytes) {
		let s = this;
		s.id = data.readInt();
		s.lvId = data.readInt();
		s.pinId = data.readInt();
		s.cfg = Config.tm_292[s.id];
		s.init();
	}

	public init() {
		let s = this;
		s.cfgLv = Config.tmlv_292[s.lvId];
		s.cfgPin = Config.tmpin_292[s.pinId];
	}
}