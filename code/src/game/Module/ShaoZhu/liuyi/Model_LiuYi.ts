class Model_LiuYi extends BaseModel {
	public constructor() {
		super();
	}

	static OPENUI = "openui"
	static UPLEVEL = "uplevel"
	static KAOSHI = "kaoshi"


	/** 打开界面 */
	public CG_OPENUI_5125(): void {
		var bates = this.getBytes();
		this.sendSocket(5125, bates);
	}

	/** 升级六艺 I:少主index B:六艺id */
	public CG_UPLV_5127(szId: number, lyId: number): void {
		var bates = this.getBytes();
		bates.writeInt(szId)
		bates.writeByte(lyId)
		this.sendSocket(5127, bates);
	}
	/** 进修 I:少主index */
	public CG_EDUCAT_5129(szId: number): void {
		var bates = this.getBytes();
		bates.writeInt(szId)
		this.sendSocket(5129, bates);
	}

	/** 考试 I:少主index B:六艺id */
	public CG_KAOSHI_5131(szId: number, lyId: number): void {
		var bates = this.getBytes();
		bates.writeInt(szId)
		bates.writeByte(lyId)
		this.sendSocket(5131, bates);
	}


	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(5126, this.GC_OPENUI_5126, this);
		mgr.regHand(5128, this.GC_UPLV_5128, this);
		mgr.regHand(5130, this.GC_EDUCAT_5130, this);
		mgr.regHand(5132, this.GC_KAOSHI_5132, this);
	}

	liuyiObj: { [id: number]: Vo_LiuYi } = {}

	//六艺信息返回(已激活少主) [I:少主index B:学堂id [B:六艺id I:六艺等级 B:考试状态：0.不合格 1合格]]
	private GC_OPENUI_5126(self: Model_LiuYi, data: BaseBytes): void {
		let len = data.readShort();
		self.liuyiObj = {};
		for (let i = 0; i < len; i++) {
			let v: Vo_LiuYi = new Vo_LiuYi()
			v.readMsg(data);
			self.liuyiObj[v.szId] = v
		}

		self.notify(Model_LiuYi.OPENUI)
		self.checkNotice();
	}

	//升级六艺返回 B:1.成功 2参数错误 3.升级条件不足 4.已达上限I:少主index B:六艺id I:等级
	private GC_UPLV_5128(self: Model_LiuYi, data: BaseBytes): void {
		let res = data.readByte();
		let szId = data.readInt()
		let lyId = data.readByte()
		let lv = data.readInt()
		if (res == 1) {
			let v = self.liuyiObj[szId]
			for (let i = 0; i < v.lyArr.length; i++) {
				if (lyId == v.lyArr[i].lyId) {
					v.lyArr[i].lyLv = lv
					v.lyArr[i].initCfg();
					break;
				}
			}
			self.notify(Model_LiuYi.UPLEVEL)
			ViewCommonWarn.text("升级成功")
			self.checkNotice();
		} else {
			ViewCommonWarn.text(["参数错误", "升级条件不足", "已达上限"][res - 2])
		}

	}

	//进修返回 B:1.成功 2.参数错误 3.进修条件不足 4.已达顶级学堂I:少主index B:学堂id
	private GC_EDUCAT_5130(self: Model_LiuYi, data: BaseBytes) {
		let res = data.readByte();
		let szId = data.readInt()
		let xtId = data.readByte()
		if (res == 1) {
			let v = self.liuyiObj[szId]
			v.xtId = xtId
			v.initCfg();
			v.initSt();
			ViewCommonWarn.text("进修成功")
			self.notify(Model_LiuYi.OPENUI);
			self.checkNotice();
		} else {
			ViewCommonWarn.text(["参数错误", "进修条件不足", "已达上限"][res - 2])
		}
	}

	//考试返回 B:1.成功 2.参数错误 3.考试条件不足B:1.合格 0.不合格I:少主index B:六艺id
	private GC_KAOSHI_5132(self: Model_LiuYi, data: BaseBytes) {
		let res = data.readByte();
		let st = data.readByte();
		let szId = data.readInt()
		let lyId = data.readByte()
		if (res == 1) {
			let v = self.liuyiObj[szId]
			let ly = null
			for (let i = 0; i < v.lyArr.length; i++) {
				if (v.lyArr[i].lyId == lyId) {
					v.lyArr[i].st = st;
					ly = v.lyArr[i]
					break;
				}
			}
			ViewCommonWarn.text(["考试不合格", "考试合格"][st])
			self.notify(Model_LiuYi.KAOSHI, ly);
			self.checkNotice();
		} else {
			ViewCommonWarn.text(["参数错误", "考试条件不足", "已达上限"][res - 2])
		}

	}

	public checkNotice() {
		let s = this;
		let reddot = GGlobal.reddot;
		let red = false;
		let shaoZhuArr = GGlobal.modelShaoZhu.shaoZhuArr
		for (let i = 0; i < shaoZhuArr.length; i++) {
			let szRed = s.checkShaoZhu(shaoZhuArr[i]);
			reddot.setCondition(UIConst.SHAOZHU_LIUYI, i + 1, szRed);
			if (!red) red = szRed;
		}
		reddot.setCondition(UIConst.SHAOZHU_LIUYI, 0, red);
		reddot.notify(UIConst.SHAOZHU_LIUYI);
	}
	//少主红点
	public checkShaoZhu(sz: Vo_ShaoZhu) {
		let s = this;
		let xtVo = s.liuyiObj[sz.shaozhuID]
		if (!xtVo) {
			return false;
		}
		for (let i = 0; i < xtVo.lyArr.length; i++) {
			if (s.checkLyUpLv(sz, xtVo, xtVo.lyArr[i])) {
				return true;
			}
		}
		if (s.checkXTKaoShi(xtVo)) {
			return true;
		}
		return false
	}
	//六艺能升级
	public checkLyUpLv(sz: Vo_ShaoZhu, xtVo: Vo_LiuYi, ly: Vo_LiuYi_LY) {
		if (!xtVo.openSix[ly.lyId]) {//未开启
			return false;
		}
		if (!ly.cfg || ly.cfg.consume == "0") {//满级
			return false;
		}
		let nextCfg = Config.sonsix_267[ly.cfg.next];
		if (sz.starLv < nextCfg.star) {//星级不够
			return false;
		}
		let it = JSON.parse(ly.cfg.consume)[0];
		let hasCt = Model_Bag.getItemCount(it[1])
		if (hasCt >= it[2]) {//可升级
			return true;
		}
		return false
	}

	//学堂考试
	public checkXTKaoShi(xtVo: Vo_LiuYi) {
		if (!xtVo) {
			return false;
		}
		if (xtVo.cfg.consume == "0") {//已满级
			return false
		}
		let it = JSON.parse(xtVo.cfg.consume)[0];
		//达到要求
		let cfgYQ = {};
		let yqArr: number[][] = JSON.parse(xtVo.cfg.yq)
		for (let i = 0; i < yqArr.length; i++) {
			cfgYQ[yqArr[i][0]] = yqArr[i][1]
		}
		let educat = true;
		let kaoShi = true;
		let ct = Model_Bag.getItemCount(it[1]);
		if (ct < it[2]) {
			kaoShi = false;
		}
		for (let i = 0; i < xtVo.lyArr.length; i++) {
			let ly = xtVo.lyArr[i];
			let isOpen = xtVo.openSix[ly.lyId] ? true : false
			let max = cfgYQ[ly.lyId];
			if (!isOpen) {
				continue;
			}
			if (ly.lyLv < max) {//未达到考试要求
				return false;
			}
			if (ly.st == 0) {
				educat = false
			}
		}
		if (educat || kaoShi) {//能进修 能考试
			return true;
		}
		return false
	}

	public getStarMaxCfg(star): Isonsixclient_267 {
		if (!star) {
			star = 1
		}
		let preCfg: Isonsixclient_267 = null;
		for (let k in Config.sonsixclient_267) {
			let v = Config.sonsixclient_267[k]
			if (star == v.id) {
				return v;
			}
			if (star < v.id) {
				return preCfg
			}
			preCfg = v;
		}
		return preCfg
	}

}