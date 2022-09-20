class Model_ActQFXF extends BaseModel {

	static OPENUI = "openui"

	public constructor() {
		super();
	}

	/**领取奖励 I:要领取的奖励id*/
	public CG_GET_REWARD(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10421, ba);
	}
	//全服消费
	qfxf: number = 0;
	//个人消费
	grxf: number = 0;

	qfxfArr: { id: number, st: number, cfg: any }[][] = [];

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(10420, s.GC_OPENUI_10420, s);
		wsm.regHand(10422, s.GC_GETREWARD_10422, s);
	}
	//打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表L:全服消费I:个人消费
	private GC_OPENUI_10420(s: Model_ActQFXF, data: BaseBytes) {
		let len = data.readShort();
		s.qfxfArr = [];
		let qfObj = {}
		let idx = 0
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let st = data.readByte()
			let cfg = Config.qfxf_768[id];
			let v: { id: number, st: number, cfg: Iqfxf_768 } = { id: id, st: st, cfg: cfg };
			if (qfObj[cfg.qf] == null) {
				qfObj[cfg.qf] = cfg.qf
				s.qfxfArr[idx] = []
				idx++
			}
			s.qfxfArr[idx - 1].push(v);
		}
		s.qfxf = data.readLong()
		s.grxf = data.readInt()
		s.checkRed()
		s.notify(Model_ActQFXF.OPENUI);
	}

	//领取奖励结果 B:领取状态，0:没有该奖励，1:成功，2:未达到条件I:领取的奖励id
	private GC_GETREWARD_10422(s: Model_ActQFXF, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			for (let i = 0; i < s.qfxfArr.length; i++) {
				for (let j = 0; j < s.qfxfArr[i].length; j++) {
					if (s.qfxfArr[i][j].id == id) {
						s.qfxfArr[i][j].st = 2;
						break;
					}
				}
			}
			s.checkRed()
			s.notify(Model_ActQFXF.OPENUI);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	private checkRed() {
		let s = this;
		let red = false;
		for (let i = 0; i < s.qfxfArr.length; i++) {
			for (let j = 0; j < s.qfxfArr[i].length; j++) {
				if (s.qfxfArr[i][j].st == 1) {
					red = true;
					break;
				}
			}
		}
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.ACTCOM_QFXF, 0, red);
		sf.notifyMsg(UIConst.ACTCOM_QFXF);
	}
}