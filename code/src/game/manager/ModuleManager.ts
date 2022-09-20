/**系统管理*/class ModuleManager {
	public constructor() {
	}

	public static getName(id: number): string {
		var lib = Config.xitong_001;
		if (lib[id]) {
			return lib[id].name;
		}
		return id + "";
	}

	public static isXianShi(id: number): boolean {
		if (Config.xitong_001 && Model_player.voMine) {
			if (Config.xitong_001[id].xianshi == 0) {
				return true;
			}
			// if (Model_player.voMine.level < Config.xitong_001[id].xianshi) {
			// 	return false;
			// }
			if (Model_LunHui.realLv < Config.xitong_001[id].xianshi) {
				return false;
			}
		}
		return true;
	}

	/**功能是否开启 
	 * id 系统id
	 * isMsg 未开启时是否提示
	*/
	public static isOpen(id: number, isMsg: boolean = false, arg?: any): boolean {
		var bo: boolean = true;
		var self = this;
		var lib = Config.xitong_001;
		if (!lib) return true;
		bo = self.isOpenByCFG(id, isMsg) && self.checkCoditionOpen(id, arg, isMsg);
		return bo;
	}

	public static isOpenByCFG(id: number, isMsg: boolean = false): boolean {
		var bo: boolean = true;
		var lib = Config.xitong_001;
		if (lib) {
			var info = lib[id];
			if (info && Model_player.voMine) {
				if (info.ios == 0 && GGlobal.isIOS) {
					return false;
				}
				if (info.day) {
					let d = info.day;
					let d1 = 0;
					if (Model_GlobalMsg.kaifuDay == 0) {
						bo = false;
					} else if (d > 1000) {
						d1 = (Math.floor(d / 1000) - 1) * Math.floor(d % 1000)
						d = Math.floor(d / 1000) * Math.floor(d % 1000);
						if (d1 < Model_GlobalMsg.kaifuDay && Model_GlobalMsg.kaifuDay <= d) {
							bo = true;
						} else {
							if (isMsg)
								ViewCommonWarn.text("开服前" + d + "天开启" + "【" + info.name + "】", Color.REDINT);
							bo = false;
						}
					} else {
						if (d <= Model_GlobalMsg.kaifuDay) {//第几天开启某个系统
							bo = true;
						} else {
							if (isMsg)
								ViewCommonWarn.text("开服第" + info.day + "天开启" + "【" + info.name + "】", Color.REDINT);
							bo = false;
						}
					}
				}
			}
		}
		return bo;
	}

	/**特殊处理 */
	public static checkCoditionOpen(id: number, arg: any = null, isMsg: boolean = true): boolean {
		var ret: boolean = true;
		var lib = Config.xitong_001[id];
		if (!lib) return true;
		if (!Model_player.voMine) return false;
		if (lib["open"] != "0") {
			var condition = JSON.parse(lib["open"]);
			var cl = condition.length;
			var b;
			var msg;
			var m = GGlobal.modelGuanQia;
			for (var i: number = 0; i < cl; i++) {
				var tp = condition[i][0];
				var val = condition[i][1];
				switch (tp) {
					case 1:
						b = m.curGuanQiaLv >= val;
						if (val == 9999) {
							msg = "功能暂未开放";
						} else {
							msg = BroadCastManager.reTxt("第{0}关开启", val);
						}
						break;//关卡
					case 2:
						b = Model_player.voMine.zsID >= val;
						msg = BroadCastManager.reTxt("{0}开启", Config.zhuansheng_705[val].lv);
						break;//转生等级
					case 3:
						// b = Model_player.voMine.level >= val;
						b = Model_LunHui.realLv >= val;
						if (val == 9999) {
							msg = "功能暂未开放";
						} else {
							msg = BroadCastManager.reTxt("等级{0}级开启", val);
						}
						break;
				}
				if (!b) {
					ret = false;
					break;
				}
			}
			if (!b && isMsg) ViewCommonWarn.text(msg);
		}
		return ret;
	}

	//主界面需要做关联依赖处理
	public static isModuleUI(id) {
		var lb = Config.xitong_001;
		if (lb && (lb[id] || !lb[id]))
			return true;
		return false;
	}

	public static isInActivityTime(id) {
		let ret = true;
		let nowday = Model_GlobalMsg.kaifuDay;
		let lib = Config.xitong_001;
		if (lib && nowday > 0) {
			var info = lib[id];
			if (info && info.day) {
				let day = Math.floor(info.day / 1000) * Math.floor(info.day % 1000);
				let day1 = (Math.floor(info.day / 1000) - 1) * Math.floor(info.day % 1000)
				if (day > 1000) {
					day = day - 1000;
					ret = day1 < nowday && nowday <= day;
				} else {
					ret = nowday >= day;
				}
			}
		}
		return ret;
	}
}