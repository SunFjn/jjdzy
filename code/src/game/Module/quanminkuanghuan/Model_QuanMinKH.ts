class Model_QuanMinKH extends BaseModel {
	public completeObj: any = {};
	// public iconArr;
	// public filterArr(): void {
	// 	let a = this;
	// 	a.iconArr = [];
	// 	let t = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
	// 	t.forEach(element => {
	// 		if (ModuleManager.isOpen(element.id)) {
	// 			a.iconArr.push(element);
	// 		}
	// 	});
	// }

	public bossArr = [];
	public getBossArr(): void {
		if (this.bossArr.length <= 0) {
			for (let key in Config.allpartyboss_241) {
				let cfg = Config.allpartyboss_241[key];
				this.bossArr[parseInt(key) - 1] = cfg;
			}
		}
	}

	public xiaoxiongArr = [];
	public getXiaoXiongArr(): void {
		if (this.xiaoxiongArr.length <= 0) {
			for (let key in Config.allpartylsxx_241) {
				let cfg = Config.allpartylsxx_241[key];
				this.xiaoxiongArr[parseInt(key) - 1] = cfg;
			}
		}
	}

	public lvbuArr = [];
	public getlvbuArr(): void {
		if (this.lvbuArr.length <= 0) {
			for (let key in Config.allpartylvbu_241) {
				let cfg = Config.allpartylvbu_241[key];
				this.lvbuArr[parseInt(key) - 1] = cfg;
			}
		}
	}

	public fuhuiArr = [];
	public getfuhuiArr(): void {
		if (this.fuhuiArr.length <= 0) {
			for (let key in Config.allpartyddfh_241) {
				let cfg = Config.allpartyddfh_241[key];
				this.fuhuiArr[parseInt(key) - 1] = cfg;
			}
		}
	}

	/** 2571 2581 2591 2601 CG 打开ui信息   */
	public CG_QUANMINKUANGHUAN_OPENUI(panelId) {
		let ba: BaseBytes = new BaseBytes();
		let cmd = 0;
		switch (panelId) {
			case UIConst.QUANMIN_KUANGHUAN_BOSS:
				cmd = 2571;
				break;
			case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
				cmd = 2581;
				break;
			case UIConst.QUANMIN_KUANGHUAN_LVBU:
				cmd = 2591;
				break;
			case UIConst.QUANMIN_KUANGHUAN_FUHUI:
				cmd = 2601;
				break;
		}
		this.sendSocket(cmd, ba);
	}

	/**2573 获取奖励 B:奖励序号 */
	public CG_QUANMINKUANGHUAN_DRAWREWARD(index, panelId) {
		let ba: BaseBytes = new BaseBytes();
		let cmd = 0;
		switch (panelId) {
			case UIConst.QUANMIN_KUANGHUAN_BOSS:
				cmd = 2573;
				break;
			case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
				cmd = 2583;
				break;
			case UIConst.QUANMIN_KUANGHUAN_LVBU:
				cmd = 2593;
				break;
			case UIConst.QUANMIN_KUANGHUAN_FUHUI:
				cmd = 2603;
				break;
		}
		ba.writeByte(index);
		this.sendSocket(cmd, ba);
	}

	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(2572, a.GC_QUANMINKUANGHUAN_OPEN_BOSS, a);
		wsm.regHand(2582, a.GC_QUANMINKUANGHUAN_OPEN_XIAOXIONG, a);
		wsm.regHand(2592, a.GC_QUANMINKUANGHUAN_OPEN_LVBU, a);
		wsm.regHand(2602, a.GC_QUANMINKUANGHUAN_OPEN_FUHUI, a);
		wsm.regHand(2574, a.GC_QUANMINKUANGHUAN_DRAWREWARD_BOSS, a);
		wsm.regHand(2584, a.GC_QUANMINKUANGHUAN_DRAWREWARD_XIAOXIONG, a);
		wsm.regHand(2594, a.GC_QUANMINKUANGHUAN_DRAWREWARD_LVBU, a);
		wsm.regHand(2604, a.GC_QUANMINKUANGHUAN_DRAWREWARD_FUHUI, a);
	}

	/**2604	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
	public GC_QUANMINKUANGHUAN_DRAWREWARD_FUHUI(self: Model_QuanMinKH, data: BaseBytes) {
		let id = data.readByte();
		let state = data.readByte();
		let completeVal = data.readInt();
		for (let i = 0; i < self.fuhuiArr.length; i++) {
			let cfg = self.fuhuiArr[i];
			if (cfg.id == id) {
				cfg.state = state;
				break;
			}
		}
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_FUHUI] = completeVal;
		self.fuhuiArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}
	/**2594	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
	public GC_QUANMINKUANGHUAN_DRAWREWARD_LVBU(self: Model_QuanMinKH, data: BaseBytes) {
		let id = data.readByte();
		let state = data.readByte();
		let completeVal = data.readInt();
		for (let i = 0; i < self.lvbuArr.length; i++) {
			let cfg = self.lvbuArr[i];
			if (cfg.id == id) {
				cfg.state = state;
				break;
			}
		}
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_LVBU] = completeVal;
		self.lvbuArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}
	/**2584	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
	public GC_QUANMINKUANGHUAN_DRAWREWARD_XIAOXIONG(self: Model_QuanMinKH, data: BaseBytes) {
		let id = data.readByte();
		let state = data.readByte();
		let completeVal = data.readInt();
		for (let i = 0; i < self.xiaoxiongArr.length; i++) {
			let cfg = self.xiaoxiongArr[i];
			if (cfg.id == id) {
				cfg.state = state;
				break;
			}
		}
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_XIAOXIONG] = completeVal;
		self.xiaoxiongArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}
	/**2574	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
	public GC_QUANMINKUANGHUAN_DRAWREWARD_BOSS(self: Model_QuanMinKH, data: BaseBytes) {
		let id = data.readByte();
		let state = data.readByte();
		let completeVal = data.readInt();
		for (let i = 0; i < self.bossArr.length; i++) {
			let cfg = self.bossArr[i];
			if (cfg.id == id) {
				cfg.state = state;
				break;
			}
		}
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_BOSS] = completeVal;
		self.bossArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}

	/**2602 GC 打开ui信息 [B:奖励序号B:奖励状态]I:完成度  */
	public GC_QUANMINKUANGHUAN_OPEN_FUHUI(self: Model_QuanMinKH, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readByte();
			let state = data.readByte();
			for (let j = 0; j < self.fuhuiArr.length; j++) {
				let cfg = self.fuhuiArr[j];
				if (cfg.id == id) {
					cfg.state = state;
					break;
				}
			}
		}
		let completeVal = data.readInt();
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_FUHUI] = completeVal;
		self.fuhuiArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}

	/**2592 GC 打开ui信息 [B:奖励序号B:奖励状态]I:完成度  */
	public GC_QUANMINKUANGHUAN_OPEN_LVBU(self: Model_QuanMinKH, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readByte();
			let state = data.readByte();
			for (let j = 0; j < self.lvbuArr.length; j++) {
				let cfg = self.lvbuArr[j];
				if (cfg.id == id) {
					cfg.state = state;
					break;
				}
			}
		}
		let completeVal = data.readInt();
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_LVBU] = completeVal;
		self.lvbuArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}

	/**2582 GC 打开ui信息 [B:奖励序号B:奖励状态] I:完成度 */
	public GC_QUANMINKUANGHUAN_OPEN_XIAOXIONG(self: Model_QuanMinKH, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readByte();
			let state = data.readByte();
			for (let j = 0; j < self.xiaoxiongArr.length; j++) {
				let cfg = self.xiaoxiongArr[j];
				if (cfg.id == id) {
					cfg.state = state;
					break;
				}
			}
		}
		let completeVal = data.readInt();
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_XIAOXIONG] = completeVal;
		self.xiaoxiongArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}

	/**2572 GC 打开ui信息 [B:奖励序号B:奖励状态] I:完成度 */
	public GC_QUANMINKUANGHUAN_OPEN_BOSS(self: Model_QuanMinKH, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readByte();
			let state = data.readByte();
			for (let j = 0; j < self.bossArr.length; j++) {
				let cfg = self.bossArr[j];
				if (cfg.id == id) {
					cfg.state = state;
					break;
				}
			}
		}
		let completeVal = data.readInt();
		self.completeObj[UIConst.QUANMIN_KUANGHUAN_BOSS] = completeVal;
		self.bossArr.sort(self.sortQMKH);
		GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
	}

	private sortQMKH(a, b) {
		if (a.state == b.state) {
			return a.id - b.id;
		} else {
			if (a.state == 1) {
				return -1;
			} else if (b.state == 1) {
				return 1;
			} else {
				return a.state - b.state;
			}
		}
	}
}