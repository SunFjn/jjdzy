class Model_UserData {
	public constructor() {
	}
	public static isWhitePlayer = false;//是否是白名单玩家
	public static isBlackPlayer = false;//是否是黑名单玩家
	public static newPlayer = false;//是否是新玩家 WX直接进入游戏

	public static SERVERLIST = 202;
	public static BROADCAST = 201;
	public static MAINTAIN = 203;/**0白名单 1维护公告*/

	public static PHPURL: string = "http://neice.sgzj.jyouy.com:7002/"

	public static getMD5(val) {
		var a = new GameMD5().hex_md5(val);
		return a;
	}

	public static getServerListPanel(cmd, openid = 112, pf = "wxsgzj01", type = 2) {
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
		let time = new Date().getTime();
		let md5 = Model_UserData.getMD5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time+ "type=" + type + "clientKey")
		let str =
			"sign=" + md5 +
			"&cmd=" + cmd +
			"&randnum=" + time +
			"&pf=" + pf +
			"&openid=" + openid+
			"&type=" + type 
			;
		request.send(str);
		egret.log(str);
		return request;
	}

	public static getPhpParam(cmd, openid = 112, pf = "wxsgzj01") {
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
		let time = new Date().getTime();
		let md5 = Model_UserData.getMD5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time + "clientKey")
		let str =
			"sign=" + md5 +
			"&cmd=" + cmd +
			"&randnum=" + time +
			"&pf=" + pf +
			"&openid=" + openid
			;
		request.send(str);
		egret.log(str);
		return request;
	}

	public static getNotice(cmd, openid = 112, ip, zoneid, pf = "wxsgzj01") {
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
		let time = new Date().getTime();
		let md5 = Model_UserData.getMD5("cmd=" + cmd + "ip=" + ip + "openid=" + openid + "pf=" + pf + "randnum=" + time + "zoneid=" + zoneid + "clientKey")
		let str = "sign=" + md5 + "&cmd=" + cmd + "&pf=" + pf
			+ "&zoneid=" + zoneid + "&ip=" + ip + "&openid=" + openid + "&randnum=" + time;
		request.send(str);
		egret.log(str);
		return request;
	}
}