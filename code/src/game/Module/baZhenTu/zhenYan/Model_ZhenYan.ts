class Model_ZhenYan extends BaseModel {
	public constructor() {
		super();
	}

	public static OPENUI = "openui";
	// public static UP_LEVEL = "up_level";

	/**
	 * 打开界面
	*/
	public CGOPENUI10251() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(10251, b);
		console.log("======================== 10251 send");
	}

	/**
	 * 升级/激活阵眼 I:阵眼id
	*/
	public CGUpYan10253(id: number) {
		let b = this.getBytes();
		b.writeInt(id);
		this.socket.sendCMDBytes(10253, b);
	}

	/**
	 *升级/激活阵心
	*/
	public CGUpXin10255() {
		let b = this.getBytes();
		this.socket.sendCMDBytes(10255, b);
	}

	public lvId: number;
	//星级
	public get star() {
		return Math.floor(this.lvId % 1000)
	}
	public zYanArr: VoZhenYan[] = [];

	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(10252, this.GC_OPENUI_10252, this);
		mgr.regHand(10254, this.GC_UpYan_10254, this);
		mgr.regHand(10256, this.GC_UpXin_10256, this);
	}

	/**
	 *打开界面返回 I:阵心等级[I:阵眼idI:阵眼等级]阵眼信息
	*/
	private GC_OPENUI_10252(self: Model_ZhenYan, data: BaseBytes) {
		self.lvId = data.readInt();
		let l = data.readShort();
		self.zYanArr = [];
		for (var i = 0; i < l; i++) {
			let vo: VoZhenYan = new VoZhenYan();
			vo.readMsg(data);
			self.zYanArr[vo.id - 1] = vo;
		}
		// self.notify(Model_ZhenYan.OPENUI)
		GGlobal.control.notify(Model_ZhenYan.OPENUI);
		console.log("======================== 10252");
		self.checkRed();
	}

	/**
	 *升级/激活阵眼返回 B:状态:0-成功,1-失败I:阵眼idI:阵眼等级
	*/
	private GC_UpYan_10254(self: Model_ZhenYan, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			let id = data.readInt();
			let lvId = data.readInt();
			self.zYanArr[id - 1].lvId = lvId
			// self.notify(Model_ZhenYan.OPENUI);
			GGlobal.control.notify(Model_ZhenYan.OPENUI);
			if (lvId % 10000 == 1) {
				ViewCommonWarn.text("激活成功")
			}
			else if (lvId % 10 == 0) {
				ViewCommonWarn.text("升星成功")
			}
			else {
				ViewCommonWarn.text("升级成功")
			}
			self.checkRed();
		} else {
			ViewCommonWarn.text("升级失败")
		}
	}

	/**
	 *升级/激活阵心返回 B:状态:0-成功,1-失败I:阵心等级
	*/
	private GC_UpXin_10256(self: Model_ZhenYan, data: BaseBytes) {
		let res = data.readByte();
		if (res == 0) {
			self.lvId = data.readInt();
			// self.notify(Model_ZhenYan.OPENUI);
			GGlobal.control.notify(Model_ZhenYan.OPENUI);
			if (self.lvId % 1000 == 1) {
				ViewCommonWarn.text("激活成功")
			} else {
				ViewCommonWarn.text("升星成功")
			}
			self.checkRed();
		} else {
			ViewCommonWarn.text("升星失败")
		}
	}

	private checkRed() {
		let red = this.isRed();
		GGlobal.reddot.setCondition(UIConst.ZHENYAN, 0, red);
		GGlobal.reddot.notifyMsg(UIConst.ZHENYAN);
	}

	public checkNotice() {
		if (!ModuleManager.isOpen(UIConst.ZHENYAN)) {
			return;
		}
		let m = this
		if (m.zYanArr.length == 0) {
			m.CGOPENUI10251()
			return;
		}
		m.checkRed();
	}

	private isRed(): boolean {
		//可升级 激活 升星
		let m = GGlobal.modelZhenYan;
		for (var i = 0; i < m.zYanArr.length; i++) {
			let v: VoZhenYan = m.zYanArr[i];
			if (m.isRedYan(v)) {
				return true;
			}
		}
		if (m.isRedXin()) {
			return true;
		}
		return false;
	}

	//某个阵眼 是否
	public isRedYan(v: VoZhenYan) {
		let curLv = Config.zysj_766[v.lvId];
		if (curLv.xj == 0) {//满级
			return false;
		}
		let costItem: IGridImpl
		let xhItem = ConfigHelp.makeItem(JSON.parse(curLv.xiaohao)[0])
		if (curLv.shengxing > 0) {//升星 改变下道具
			costItem = VoItem.create(v.cfg.djid);
		} else {//升级消耗
			costItem = xhItem
		}
		let ct = Model_Bag.getItemCount(costItem.id);
		if (ct >= xhItem.count) {
			return true;
		}
		return false;
	}

	public isRedXin() {
		let m = this;
		let curXin = Config.zx_766[m.lvId];
		if (curXin.xj == 0) {//满级
			return false;
		}
		let nextXin = Config.zx_766[curXin.xj];
		let xhItem = ConfigHelp.makeItem(JSON.parse(curXin.sxxh)[0])
		let ct = Model_Bag.getItemCount(xhItem.id);
		//最小等级
		let minLv = -1;
		for (let i = 0; i < m.zYanArr.length; i++) {
			let v = m.zYanArr[i]
			if (v.lvId < minLv || minLv == -1) {
				minLv = v.lvId
			}
		}
		if (minLv >= curXin.tj && ct >= xhItem.count) {
			return true;
		}
		return false;
	}
}