class ModelChuangGuanYL extends BaseModel {
	public constructor() {
		super();
	}

	currentId = 2;
	currentTargetST = 0;

	progress = 0;
	maxProgress = 4;
	currentDta: any[] = [];
	listenServ(sc: WebSocketMgr) {
		let s = this;
		s.socket = sc;
		sc.regHand(4152, s.GC_OPEN_4152, s);
		sc.regHand(4154, s.GC_LQ_4154, s);
		sc.regHand(4156, s.GC_LQMB_4156, s);
		sc.regHand(4150, s.GC_SHOWICON_4150, s);
	}

	public CG_OPEN_4151() {
		this.sendSocket(4151, this.getBytes());
	}

	/**4152  S-B-[S-B-I] 
	 * 
	 * 打开界面 S:目标IDB:目标领取姿态[S:任务表IDB:状态 0不可领 1可领取 2已领取I:玩家进度]所有目前档ID
	*/
	private GC_OPEN_4152(m: ModelChuangGuanYL, ba: BaseBytes) {
		m.currentId = ba.readShort();
		m.currentTargetST = ba.readByte();
		m.currentDta = ba.readFmt([["S", "B", "I"]])[0];
		m.currentDta = m.currentDta.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
		GGlobal.control.notify(Enum_MsgType.CGYL_OPEN);

		let hasNotice = m.currentTargetST == 1;
		if (!hasNotice) {
			let j = m.currentDta.length;
			for (let i = 0; i < j; i++) {
				hasNotice = m.currentDta[i][1] == 1;
				if (hasNotice) break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.CHUANGGUANYOULI, 0, hasNotice);
		GGlobal.reddot.notify(UIConst.CHUANGGUANYOULI);
	}

	public CG_LQ_4153(idx) {
		let ba = this.getBytes();
		ba.writeShort(idx);
		this.sendSocket(4153, ba);
	}

	/**
	 * 4154 B
	 * 取任务奖励 B:结果 1成功 2奖励不存在 3该任务不属于本目标 4任务初始化失败 5奖励已领取 6任务未达标 7背包已满
	*/
	private GC_LQ_4154(m: ModelChuangGuanYL, ba: BaseBytes) {
		let ret = ba.readByte();
		let str = '';
		switch (ret) {
			case 1: str = "领取成功"; GGlobal.control.notify(Enum_MsgType.CGYL_LQ); break;
			case 2: str = "奖励不存在"; break;
			case 3: str = "任务不属于本目标"; break;
			case 4: str = "任务初始化失败"; break;
			case 5: str = "奖励已领取"; break;
			case 6: str = "任务未达标"; break;
			case 7: str = "背包已满"; break;
		}
		ViewCommonWarn.text(str);
	}

	public CG_LQMB_4155() {
		let ba = this.getBytes();
		this.sendSocket(4155, ba);
	}


	//领取目标奖励 B:结果 1成功
	private GC_LQMB_4156(m: ModelChuangGuanYL, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 1) {
			ViewCommonWarn.text("领取成功");
			GGlobal.control.notify(Enum_MsgType.CGYL_LQ1);
		}
	}

	private nowCurent = 0;
	private maxCount = 0;
	//入口开关 B:状态 0关 1开 入口开关 B:状态 0关 1开S:当前目标IDS:最大目标ID
	public GC_SHOWICON_4150(m: ModelChuangGuanYL, ba: BaseBytes) {
		let ret = ba.readByte();
		let nowCurent = ba.readByte();
		let maxCount = ba.readByte();
		m.currentId = ba.readShort();
		if (ret == 1) {
			if (ModuleManager.isOpen(UIConst.CHUANGGUANYOULI)) {
				ChuangGuanYLIcon.createInstance().show1(nowCurent, maxCount);
			} else {
				m.nowCurent = nowCurent;
				m.maxCount = maxCount;
				GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, m.guanQiaUpdate, m);
			}
		}
		else
			ChuangGuanYLIcon.createInstance().hide1();
	}

	public guanQiaUpdate() {
		let self = this;
		if (ModuleManager.isOpen(UIConst.CHUANGGUANYOULI)) {
			GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.guanQiaUpdate, self);
			ChuangGuanYLIcon.createInstance().show1(self.nowCurent, self.maxCount);
		}
	}
}