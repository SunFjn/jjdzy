class Vo_QianNeng {
	public constructor() {
	}

	public szId: number;// 少主index
	public qianNId: number;//潜能id
	public danArr: { ty: number, cfg: Idrug_200, ct: number }[]//I:丹药id I:数量

	public cfg: Isonqn_267
	public act = true;

	public readMsg(data: BaseBytes) {
		let s = this;
		s.szId = data.readInt();
		s.qianNId = data.readInt();
		s.danArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let ty = data.readInt()
			let ct = data.readInt()
			let danCfg = Config.drug_200[ty]
			s.danArr.push({ ty: ty, cfg: danCfg, ct: ct });
		}
		s.initCfg();
	}

	public initCfg() {
		let s = this;
		s.cfg = Config.sonqn_267[s.qianNId];
	}

	// public static createVo(szId) {
	// 	let v = new Vo_QianNeng()
	// 	v.act = false;
	// 	v.szId = szId
	// 	v.qianNId = szId * 100000
	// 	v.danArr = [];
	// 	v.initCfg();
	// 	return v;
	// }
}