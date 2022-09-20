class PlatformManager {
	public constructor() {
	}

	/**
	 * 根据策划表判断是否属于当前平台
	*/
	public static getPlatform(str) {
		let ret = false;
		if (GGlobal.loginArg.pfcode) {
			ret = GGlobal.loginArg.pfcode == str;
		}
		return ret;
	}

	/**
	 * 0无，1 微端1,2 微端2,
	*/
	private static _pfIndex = 0
	public static getPfIndex() {
		if (!PlatformManager._pfIndex) {
			let ret: string = GGlobal.loginArg.pfcode
			if (ret) {
				for (let keys in Config.ptdyb_316) {
					let v = Config.ptdyb_316[keys];
					if (PlatformManager.isYiXin1377) {
						if (v.pfcode == "ztsgzj01-yx") {
							PlatformManager._pfIndex = v.wd;
							break;
						}
					} else if (ret.indexOf(v.pfcode) != -1) {
						PlatformManager._pfIndex = v.wd
						break;
					}
				}
			}
		}
		return PlatformManager._pfIndex;
	}

	private static _wxst = -1;
	public static isWx() {
		if (PlatformManager._wxst == -1) {
			try {
				if (wx) {
					PlatformManager._wxst = 1;
				}
			} catch (e) {
				PlatformManager._wxst = 0;
			}
		}
		return PlatformManager._wxst == 1;
	}

	/**万紫*/
	public static get isWanZi() {
		return PlatformManager.checkPlatform("wzsgzj01");
	}

	/**多娱*/
	public static get isDuoYu() {
		return PlatformManager.checkPlatform("dysgzj01");
	}

	/**高热*/
	public static get isGaoRe() {
		return PlatformManager.checkPlatform("grsgzj01");
	}

	/**赞钛 1377*/
	public static get is1377() {
		return PlatformManager.checkPlatform("ztsgzj01");
	}

	//ztsgzj01-yxapk	壹心-安卓
	//ztsgzj01-yxios	壹心-iOS
	public static get isYiXin1377() {
		return PlatformManager.checkPlatform("ztsgzj01-yx");
	}

	/**贪玩*/
	public static get isTanWan() {
		return PlatformManager.checkPlatform("twsgzj01") || PlatformManager.checkPlatform("twsgzj02");
	}

	/**350*/
	public static get is350() {
		return PlatformManager.checkPlatform("swsgzj01");
	}

	/**915 千腾*/
	public static get is915() {
		return PlatformManager.checkPlatform("jywsgzj01");
	}

	public static checkPlatform(pf) {
		return GGlobal.loginArg && GGlobal.loginArg.pfcode && GGlobal.loginArg.pfcode.indexOf(pf) != -1;
	}
}