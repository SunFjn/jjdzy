class RoleUtil {
	public constructor() {
	}

	public static SIZE77_75: string = "77_75";
	/**npc的头像 */
	public static getHeadImg(id: string) {
		var ret = null;
		ret = "resource/assets/head/" + id + ".png";
		return ret;
	}

	/**人物的头像 */
	public static getHeadRole(id: string) {
		var ret = null;
		ret = "resource/assets/head/" + id + ".png";
		return ret;
	}

	/**人物的头像 */
	public static getHeadRoleByCfg(id: string) {
		var ret = null;
		var headPic = Config.shezhi_707[id];
		ret = "resource/assets/head/" + headPic.picture + ".png";
		return ret;
	}

	/**剧情-人物的头像 */
	public static getHeadJuQ(id: string) {
		var ret = null;
		ret = "resource/assets/head/jq" + id + ".png";
		return ret;
	}

}