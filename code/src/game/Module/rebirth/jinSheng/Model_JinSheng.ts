class Model_JinSheng extends BaseModel {

	public static level: number;
	public static exp: number;
	public static job: number;
	public static drawArr = [];
	public static taskArr: Vo_JinShengTask[] = [];
	public static jinShengArr = [];
	public static generalIcon: string;
	public static getJinSheng() {
		if (Model_JinSheng.jinShengArr.length <= 0) {
			let index = 2;
			while (index > 0) {
				let cfg = Config.up_231[index];
				if (cfg) {
					Model_JinSheng.jinShengArr.push(cfg);
					index++;
				} else {
					index = -1;
					break;
				}
			}
		}
	}
	/**2021 打开晋升界面   */
	public CG_OPEN_JINSHENG() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(2021, ba);
	}

	/**2023 领取晋升奖励 B:等级    */
	public CG_JINSHENG_DRAWREWARD(level) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(level);
		this.sendSocket(2023, ba);
	}

	/**2025 领取任务奖励 I:任务id    */
	public CG_JINSHENG_DRAWTASK(taskId) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(taskId);
		this.sendSocket(2025, ba);
	}
	/**2027 激活晋升等级    */
	public CG_JINSHENG_JIHUO() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(2027, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(2022, a.GC_OPEN_JINSHENG, a);
		wsm.regHand(2024, a.GC_JINSHENG_DRAWREWARD, a);
		wsm.regHand(2026, a.GC_JINSHENG_DRAWTASK, a);
		wsm.regHand(2028, a.GC_JINSHENG_JIHUO, a);
	}

	/**2028	激活结果 B:0：失败，1：成功B:失败：（1：已达最大等级，2：经验不足），成功：等级 */
	public GC_JINSHENG_JIHUO(self: Model_JinSheng, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let level = data.readByte();
			Model_JinSheng.level = level;
			// GGlobal.modeljinsheng.CG_JINSHENG_DRAWREWARD(Model_JinSheng.level);
			GGlobal.layerMgr.open(UIConst.JINSHENG_PROMPT);
			GGlobal.control.notify(Enum_MsgType.JINSHENG);
		}
	}

	/**2026 领取结果 B:0：失败，1：成功I:失败：错误码，成功：领取的任务idI:新任务idI:任务进度 B:等级I:经验 */
	public GC_JINSHENG_DRAWTASK(self: Model_JinSheng, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let taskId = data.readInt();
			let newTaskId = data.readInt();
			let curCount = data.readInt();
			Model_JinSheng.level = data.readByte();
			Model_JinSheng.exp = data.readInt();
			let cfg = Config.up_231[Model_JinSheng.level];
			if (newTaskId > 0) {
				let len = Model_JinSheng.taskArr.length;
				for (let i = 0; i < len; i++) {
					let vo = Model_JinSheng.taskArr[i];
					if (vo.id == taskId) {
						let vo1: Vo_JinShengTask = Vo_JinShengTask.create(newTaskId);
						switch (vo.type) {
							case 1:
								vo1.max = Math.floor(vo1.can2 / 1000);
								vo1.curCount = Math.floor(curCount / 1000);
								break;
							case 2:
							case 3:
							case 4:
							case 5:
							case 6:
							case 8:
							case 9:
							case 20:
							case 21:
								vo1.max = vo1.can1;
								vo1.curCount = curCount;
								break;
							case 7:
							case 10:
							case 11:
							case 12:
							case 13:
							case 14:
							case 15:
							case 16:
							case 17:
							case 18:
							case 19:
							case 22:
							case 23:
							case 28:
							case 29:
							case 30:
								vo1.max = vo1.can2;
								vo1.curCount = curCount;
								break;
							case 24:
							case 25:
							case 26:
							case 27:
								let max = Math.floor(vo1.can2 % 10000 / 10) * 8 + (vo1.can2 % 10);
								let count = Math.floor(curCount % 10000 / 10) * 8 + (curCount % 10);
								vo1.max = max;
								vo1.curCount = count;
								break;
						}
						vo1.state = vo1.curCount >= vo1.max ? 1 : 0;
						Model_JinSheng.taskArr[i] = vo1;
						break;
					}
				}
			} else {
				let len = Model_JinSheng.taskArr.length;
				for (let i = 0; i < len; i++) {
					let vo = Model_JinSheng.taskArr[i];
					if (vo.id == taskId) {
						vo.state = 2;
						break;
					}
				}
			}
			Model_JinSheng.taskArr.sort(self.sortTask);
		}
		GGlobal.control.notify(Enum_MsgType.JINSHENG);
	}

	/**2024 领取晋升奖励结果 B:0：失败，1：成功B:失败：错误码，成功：成功的等级  */
	public GC_JINSHENG_DRAWREWARD(self: Model_JinSheng, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let level = data.readByte();
			Model_JinSheng.drawArr.push(level);
			GGlobal.control.notify(Enum_MsgType.JINSHENG);
		}
	}

	/**2022 晋升界面数据 B:等级I:积累经验B:初始职业[B:等级]已领取的晋升奖励数据[I:任务idI:当前进度B:领取状态]任务数据  */
	public GC_OPEN_JINSHENG(self: Model_JinSheng, data: BaseBytes) {
		Model_JinSheng.level = data.readByte();
		Model_JinSheng.exp = data.readInt();
		Model_JinSheng.job = data.readByte();
		Model_JinSheng.drawArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let level = data.readByte();
			Model_JinSheng.drawArr.push(level);
		}
		Model_JinSheng.taskArr = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let taskId = data.readInt();
			let curCount = data.readInt();
			let state = data.readByte();
			let vo: Vo_JinShengTask = Vo_JinShengTask.create(taskId);
			vo.state = state;
			switch (vo.type) {
				case 1:
					vo.max = Math.floor(vo.can2 / 1000);
					vo.curCount = Math.floor(curCount / 1000);
					break;
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 20:
				case 21:
					vo.max = vo.can1;
					vo.curCount = curCount;
					break;
				case 7:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 22:
				case 23:
				case 28:
				case 29:
				case 30:
					vo.max = vo.can2;
					vo.curCount = curCount;
					break;
				case 24:
				case 25:
				case 26:
				case 27:
					let max = Math.floor(vo.can2 % 10000 / 10) * 8 + (vo.can2 % 10);
					let count = Math.floor(curCount % 10000 / 10) * 8 + (curCount % 10);
					vo.max = max;
					vo.curCount = count;
					break;
			}
			Model_JinSheng.taskArr.push(vo);
		}
		Model_JinSheng.taskArr.sort(self.sortTask);
		GGlobal.control.notify(Enum_MsgType.JINSHENG);
	}

	public sortTask(a: Vo_JinShengTask, b: Vo_JinShengTask) {
		if ((a.id < 3000 && b.id < 3000) || (a.id >= 3000 && b.id >= 3000)) {
			if ((a.id < 3000 && b.id < 3000) || a.state == b.state) {
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
		} else {
			return a.id - b.id;
		}
	}

	public sortReward(a, b) {
		if ((Model_JinSheng.drawArr.indexOf(a.id) != -1 && Model_JinSheng.drawArr.indexOf(b.id) != -1) || (Model_JinSheng.drawArr.indexOf(a.id) == -1 && Model_JinSheng.drawArr.indexOf(b.id) == -1)) {
			return a.id - b.id;
		} else {
			if (Model_JinSheng.drawArr.indexOf(a.id) != -1) {
				return 1;
			} else {
				return -1;
			}
		}
	}
}