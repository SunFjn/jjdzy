class Model_ActComLJFL extends BaseModel {
	public constructor() {
		super();
	}
	static OPENUI = "openui"
	public datArr: { id: number, lj: number, st: number, cfg: Iljfl_772 }[]

	/**领取奖励 I:要领取的奖励id*/
	public CG_GET_10751(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10751, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(10750, s.GC_OPENUI_10750, s);
		wsm.regHand(10752, s.GC_GET_10752, s);
	}

	//打开累计返利界面返回 [I:充值IDI:累计返利B:0.条件不符 1.可领取 2.已领取]
	private GC_OPENUI_10750(s: Model_ActComLJFL, data: BaseBytes) {
		let qs = data.readInt();
		let len = data.readShort();
		s.datArr = [];
		let cfgQs: { [id: number]: Iljfl_772 } = Model_ActComLJFL.getCfg(qs)
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let lj = data.readInt()
			let st = data.readByte()
			let cfg = cfgQs[id];
			let v: { id: number, lj: number, st: number, cfg: Iljfl_772 } = { id: id, lj: lj, st: st, cfg: cfg };
			s.datArr.push(v);
		}
		s.checkRed()
		s.notify(Model_ActComLJFL.OPENUI);
	}

	//领取累计返利奖励返回 B:1.成功 2参数错误 3.领取条件不足 4.已领取I:充值ID
	private GC_GET_10752(s: Model_ActComLJFL, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			for (let i = 0; i < s.datArr.length; i++) {
				if (s.datArr[i].id == id) {
					s.datArr[i].st = 2;
					break;
				}
			}
			s.checkRed()
			s.notify(Model_ActComLJFL.OPENUI);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	public checkRed() {
		let s = this;
		let red = false
		// for (let i = 0; i < s.datArr.length; i++) {
		// 	if (s.datArr[i].st == 1) {
		// 		red = true;
		// 		break;
		// 	}
		// }
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.ACTCOM_LJFL, 0, red);
		sf.notifyMsg(UIConst.ACTCOM_LJFL);
	}

	static CFG
	private static getCfg(qs): { [id: number]: Iljfl_772 } {
		if (!Model_ActComLJFL.CFG) {
			Model_ActComLJFL.CFG = {}
			for (let k in Config.ljfl_772) {
				let v = Config.ljfl_772[k];
				if (Model_ActComLJFL.CFG[v.qs] == null) {
					Model_ActComLJFL.CFG[v.qs] = {}
				}
				Model_ActComLJFL.CFG[v.qs][v.id] = v;
			}
		}
		return Model_ActComLJFL.CFG[qs]
	}
}