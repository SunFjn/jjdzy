class Model_ActLeiTai extends BaseModel {
	public constructor() {
		super();
	}

	static OPENUI = "openui"
	static REPORT = "report"
	static FIGHTEND = "fightend"
	// static ST_CG = "st_cg"//状态改变

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11600, this.GC_OPENUI_11600, this);
		mgr.regHand(11602, this.GC_CHALLENGE_11602, this);
		mgr.regHand(11604, this.GC_FIGHTEND_11604, this);
		mgr.regHand(11606, this.GC_ASSIST_11606, this);
		mgr.regHand(11608, this.GC_KICKOUT_11608, this);
		mgr.regHand(11610, this.GC_GETNOTICELIST_11610, this);
		mgr.regHand(11612, this.GC_BAT_ST_11612, this);
		mgr.regHand(11614, this.GC_LOSE_11614, this);
	}

	public leiTaiArr: Vo_ActLeiTai[] = null
	public hasMine() {//我是否在擂台上
		let m = this;
		if (!m.leiTaiArr) {
			return false;
		}
		let mineId = Model_player.voMine.id;
		for (let i = 0; i < m.leiTaiArr.length; i++) {
			let v = m.leiTaiArr[i];
			for (let j = 0; j < v.plyArr.length; j++) {
				if (v.plyArr[j] && mineId == v.plyArr[j].plyId) {
					return true;
				}
			}
		}
		return false;
	}
	//战斗
	public batLeiTai: Vo_ActLeiTai = null
	public batPlyId: number = 0
	public batRes: number
	public batDrop: IGridImpl[] = null
	public batSt: number = 0;
	public batCd: number = 0

	//战报
	reportArr: { res: number, name: string }[] = [];

	/**11600 [I-[L-U-I-I-B-B]] 返回界面信息 [I:擂台id[L:玩家idU:玩家名字I:时装I:神兵B:是否擂主（1：是，0：否）B:协助位置]]擂台数据arenaData*/
	public GC_OPENUI_11600(self: Model_ActLeiTai, data: BaseBytes): void {
		let len = data.readShort();
		self.leiTaiArr = [];
		for (let i = 0; i < len; i++) {
			let v = new Vo_ActLeiTai();
			v.readMsg(data);
			self.leiTaiArr.push(v);
		}
		self.leiTaiArr.sort(function (a, b) { return a.id - b.id })
		self.batCd = data.readInt();
		self.checkNotice()
		self.notify(Model_ActLeiTai.OPENUI);
	}

	/**11601 I-L 挑战擂主 I:擂台idarenaIdL:擂主idmasterId*/
	public CG_CHALLENGE_11601(id: number, plyId: number): void {
		if(HomeModel.inHome){
			this.warn("请先离开府邸");
			return;
		}
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeLong(plyId);
		this.sendSocket(11601, bates, true);
	}

	public actId
	/**11602 B-I-L 请求挑战结果 B:结果：0：失败，1：成功，2：直接占领rtnCodeI:失败：（1：不能挑战自己，2：刷新界面信息，3：擂主被挑战中，4：你在被挑战），成功：擂台idarenaIdL:擂主idmasterId*/
	public GC_CHALLENGE_11602(self: Model_ActLeiTai, data: BaseBytes): void {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			self.batPlyId = data.readLong();
			for (let i = 0; i < self.leiTaiArr.length; i++) {
				if (self.leiTaiArr[i].id == id) {
					self.batLeiTai = self.leiTaiArr[i]
					break;
				}
			}
			GGlobal.mapscene.enterScene(SceneCtrl.ACTCOM_LEITAI);
		} else if (res == 0) {
			ViewCommonWarn.text(["不能挑战自己", "刷新界面信息", "擂主被挑战中", "你在被挑战", "不可挑战自己驻守的擂台", "挑战cd中"][id - 1])
			if (id == 2) {
				GGlobal.modelActivity.CG_OPENACT(self.actId)
			}
		} else {
			//直接战领
		}

	}

	/**11603 B 战斗结束 B:战斗结果（0：失败，1：胜利）result*/
	public CG_FIGHTEND_11603(res): void {
		var bates = this.getBytes();
		bates.writeByte(res);
		this.sendSocket(11603, bates, true);
	}

	/**11604 B-[B-I-I] 战斗结果返回 B:0：失败，1：胜利 2超时result[B:道具类型I:道具idI:道具数量]奖励数据rewardData*/
	public GC_FIGHTEND_11604(self: Model_ActLeiTai, data: BaseBytes): void {
		self.batRes = data.readByte();
		let len = data.readShort();
		let drop = []
		for (let i = 0; i < len; i++) {
			let arg2 = data.readByte();
			let arg3 = data.readInt();
			let arg4 = data.readInt();
			drop.push([arg2, arg3, arg4])
		}
		self.batPlyId = 0;
		self.batDrop = ConfigHelp.makeItemListArr(drop)
		self.notify(Model_ActLeiTai.FIGHTEND)
	}

	/**11605 I-I 协助擂主 I:擂台idarenaIdI:协助位置index*/
	public CG_ASSIST_11605(id, pos): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeInt(pos);
		this.sendSocket(11605, bates, true);
	}

	/**11606 B-I-I 协助结果 B:结果：0：失败，1：成功rtnCodeI:擂台idarenaIdI:擂台位置index*/
	public GC_ASSIST_11606(self: Model_ActLeiTai, data: BaseBytes): void {
		let res = data.readByte();
		let id = data.readInt();
		let pos = data.readInt();
		if (res == 1) {
			//
			ViewCommonWarn.text("协助成功")
			// self.notify(Model_ActLeiTai.OPENUI);
		} else {
			ViewCommonWarn.text(["是擂主不能协助", "已在协助", "不是同服不能协助", "协助位满人", "位置已有人"][id - 1])
		}
	}

	/**11607 I-I 踢出擂台 I:擂台idarenaIdI:协助位置index*/
	public CG_KICKOUT_11607(id, pos): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeInt(pos);
		this.sendSocket(11607, bates, true);
	}

	/**11608 B-I-I 踢出结果 B:结果：0：失败，1：成功 2：被踢出 I:失败：（1：不是擂主不能操作，2：已关闭），成功：擂台idarenaIdI:协助位置index*/
	public GC_KICKOUT_11608(self: Model_ActLeiTai, data: BaseBytes): void {
		let res = data.readByte();
		let id = data.readInt();
		let pos = data.readInt();
		if (res == 1) {
			for (let i = 0; i < self.leiTaiArr.length; i++) {
				let v = self.leiTaiArr[i]
				if (v.id == id) {
					v.plyArr[pos] = null;
					break;
				}
			}
			self.notify(Model_ActLeiTai.OPENUI);
		} else if (res == 0) {
			ViewCommonWarn.text(["不是擂主不能操作", "已关闭"][id - 1])
		} else if (res == 2) {
			ViewCommonWarn.text("你已被请离擂台")
			let mineId = Model_player.voMine.id
			for (let i = 0; i < self.leiTaiArr.length; i++) {
				let v = self.leiTaiArr[i]
				for (let j = 0; j < v.plyArr.length; j++) {
					if (v.plyArr[j] && v.plyArr[j].plyId == mineId) {
						v.plyArr[j] = null;
						mineId = null
						break;
					}
				}
				if (!mineId) {
					break;
				}
			}
			self.notify(Model_ActLeiTai.OPENUI);
		}
	}

	/**11609  获取战报 */
	public CG_GETNOTICELIST_11609(): void {
		var bates = this.getBytes();
		this.sendSocket(11609, bates, true);
	}

	/**11610 [B-U] 战报数据返回 [B:0：失败，1：胜利U:玩家名]战报数据noticeData*/
	public GC_GETNOTICELIST_11610(self: Model_ActLeiTai, data: BaseBytes): void {
		let len = data.readShort();
		self.reportArr = []
		for (let i = 0; i < len; i++) {
			let arg1 = data.readByte();
			let arg2 = data.readUTF();
			self.reportArr.push({ res: arg1, name: arg2 });
		}
		self.notify(Model_ActLeiTai.REPORT)

		//红点
		let reddot = GGlobal.reddot
		reddot.setCondition(UIConst.ACTCOM_LEITAI, 1, false);
		self.checkNotice()
	}

	private GC_BAT_ST_11612(self: Model_ActLeiTai, data: BaseBytes) {
		self.batSt = data.readByte();
		// self.notify(Model_ActLeiTai.ST_CG)
		let reddot = GGlobal.reddot
		let red = self.batSt == 1;
		reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, red);
		reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
	}

	private GC_LOSE_11614(self: Model_ActLeiTai, data: BaseBytes) {
		GGlobal.mainUICtr.addReportBTN(UIConst.ACTCOM_LEITAI);
		//红点
		let reddot = GGlobal.reddot
		reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, true);
		reddot.setCondition(UIConst.ACTCOM_LEITAI, 1, true);
		reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
	}


	private checkNotice() {
		let s = this;
		let reddot = GGlobal.reddot
		let red = s.isOpenTime();
		reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, red);
		reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
	}

	public isOpenTime() {
		let s = this;
		//开启期间
		let timeArr = s.leiTaiTime
		for (let i = 0; i < timeArr.length; i++) {
			let v = timeArr[i];
			if (Model_ActLeiTai.getState(v.start, v.end0, v.end1)) {
				return true;
			}
		}
		return false;
	}

	public static getState($start, $end0, $end1) {
		let nowT = Model_GlobalMsg.getServerTime()
		const beginDate = new Date(nowT);
		beginDate.setHours($start);
		beginDate.setMinutes(0);
		beginDate.setSeconds(0);
		const endDate = new Date(nowT);
		endDate.setHours($end0);
		endDate.setMinutes($end1);
		endDate.setSeconds(0);
		if (nowT < endDate.getTime() && nowT > beginDate.getTime()) {
			return true;
		}
		return false;
	}


	private _leiTaiTime: { start: number, end0: number, end1: number }[]
	public get leiTaiTime() {
		let s = this;
		if (s._leiTaiTime == null) {
			s._leiTaiTime = []
			for (let key in Config.leitaitime_500) {
				let v = Config.leitaitime_500[key];
				let star = v.star.split(":")
				let end = v.end.split(":")
				let vt = { start: Number(star[0]), end0: Number(end[0]), end1: Number(end[1]) }
				s._leiTaiTime.push(vt)
			}
		}
		return s._leiTaiTime
	}
}