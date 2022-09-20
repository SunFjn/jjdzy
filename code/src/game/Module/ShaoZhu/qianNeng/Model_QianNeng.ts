class Model_QianNeng extends BaseModel {
	public constructor() {
		super();
	}

	static OPENUI = "openui"

	static EAT_DAN0 = 412015
	static EAT_DAN1 = 412016

	static TYPE_DAN0 = 10
	static TYPE_DAN1 = 11

	/**打开潜能界面 */
	public CG_OPENUI_5133(): void {
		var bates = this.getBytes();
		this.sendSocket(5133, bates);
	}

	/**升级潜能：冲穴 I:少主index */
	public CG_UP_LEVEL_5135(szId: number): void {
		var bates = this.getBytes();
		bates.writeInt(szId);
		this.sendSocket(5135, bates);
	}

	/**服食 I:少主index I:道具id I:数量 */
	public CG_EAT_5137(szId: number, itId: number, ct: number): void {
		var bates = this.getBytes();
		bates.writeInt(szId);
		bates.writeInt(itId);
		bates.writeInt(ct);
		this.sendSocket(5137, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(5134, this.GC_OPENUI_5134, this);
		mgr.regHand(5136, this.GC_UP_LEVEL_5136, this);
		mgr.regHand(5138, this.GC_EAT_5138, this);
	}
	public static hasData: boolean = false;
	qianNObj: { [id: number]: Vo_QianNeng } = {}

	//打开潜能界面返回 [I:少主index I:潜能id[I:丹药id I:数量]]
	private GC_OPENUI_5134(self: Model_QianNeng, data: BaseBytes): void {
		Model_QianNeng.hasData = true;
		let len = data.readShort();
		self.qianNObj = {};
		for (let i = 0; i < len; i++) {
			let v: Vo_QianNeng = new Vo_QianNeng()
			v.readMsg(data);
			self.qianNObj[v.szId] = v
		}
		self.notify(Model_QianNeng.OPENUI)
		self.checkNotice();
	}
	//冲穴返回 B:1.成功 2.少主未激活 3.冲穴条件不足 4.已满级I:少主indexI: 潜能id
	private GC_UP_LEVEL_5136(self: Model_QianNeng, data: BaseBytes) {
		let res = data.readByte();
		let szId = data.readInt();
		let qianNId = data.readInt();
		if (res == 1) {
			let v: Vo_QianNeng = self.qianNObj[szId]
			v.qianNId = qianNId;
			v.initCfg();
			self.notify(Model_QianNeng.OPENUI)
			self.checkNotice();
		} else {
			ViewCommonWarn.text(["少主未激活", "冲穴条件不足", "已满级"][res - 2])
		}

	}
	//服食返回 B:1.成功 2.少主未激活 3.参数错误 4.道具不足 5.已达服食上限I:少主indexI: 道具idI:已服食数量
	private GC_EAT_5138(self: Model_QianNeng, data: BaseBytes) {
		let res = data.readByte();
		let szId = data.readInt();
		let ty = data.readInt();
		let ct = data.readInt();
		if (res == 1) {
			let v: Vo_QianNeng = self.qianNObj[szId]
			for (let i = 0; i < v.danArr.length; i++) {
				let dan = v.danArr[i]
				if (dan.ty == ty) {
					dan.ct = ct;
					break;
				}
			}
			self.notify(Model_QianNeng.OPENUI)
			self.checkNotice();
		} else {
			ViewCommonWarn.text(["少主未激活", "参数错误", "道具不足", "已达服食上限"][res - 2])
		}
	}

	private checkNotice() {
		let reddot = GGlobal.reddot;
		let model = GGlobal.modelShaoZhu;
		let m = this;
		let redAll = false;
		for (let i = 0; i < model.shaoZhuArr.length; i++) {
			let sz = model.shaoZhuArr[i];
			let red = m.checkSz(sz)
			reddot.setCondition(UIConst.SHAOZHU_QIANNENG, sz.shaozhuID, red);
			if (red) {
				redAll = true;
			}
		}
		reddot.setCondition(UIConst.SHAOZHU_QIANNENG, 0, redAll);
		reddot.notify(UIConst.SHAOZHU_QIANNENG);
	}

	public checkSz(sz) {
		let m = this;
		let qn: Vo_QianNeng = m.qianNObj[sz.shaozhuID]
		if (!qn) return false;//未激活
		if (sz.starcfg.next > 0) return false;//未满星

		let hasCt0 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN0)
		let hasCt1 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN1)
		//可吞噬
		for (let j = 0; j < qn.danArr.length; j++) {
			let dan = qn.danArr[j]
			if (dan.ty == Model_QianNeng.TYPE_DAN0) {
				if ((hasCt0 > 0 && dan.ct < qn.cfg.max1)) {
					return true;
				}
			}
			else if (dan.ty == Model_QianNeng.TYPE_DAN1) {
				if ((hasCt1 > 0 && dan.ct < qn.cfg.max2)) {
					return true;
				}
			}
		}
		//可升级可突破 ;
		if (qn.cfg.next == 0) return false;//最大
		let itRes = JSON.parse(qn.cfg.consume);
		let hasCt = Model_Bag.getItemCount(itRes[0][1])
		if (hasCt >= itRes[0][2]) {
			return true;
		}
		return false;
	}
}