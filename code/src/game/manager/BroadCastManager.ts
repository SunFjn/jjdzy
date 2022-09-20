class BroadCastManager {
	public constructor() {
	}

	//字符串翻译
	private static _funDic: any;
	public static get funDic(): any {
		if (!BroadCastManager._funDic) {
			BroadCastManager._funDic = new Object();
			BroadCastManager._funDic["fNum"] = BroadCastManager.fNum;
			BroadCastManager._funDic["item"] = BroadCastManager.getItemName;
			BroadCastManager._funDic["fuwen"] = BroadCastManager.getFuwenName;
			BroadCastManager._funDic["pName"] = BroadCastManager.getPlayerName;
			BroadCastManager._funDic["heroName"] = BroadCastManager.getHeroName;
			BroadCastManager._funDic["zjName"] = BroadCastManager.getZhanJiaName;
			BroadCastManager._funDic["pNpc"] = BroadCastManager.getNpcName;
			BroadCastManager._funDic["getRankName"] = BroadCastManager.getRankName;
			BroadCastManager._funDic["getSaiCheng"] = BroadCastManager.getSaiCheng;
			BroadCastManager._funDic["getResult"] = BroadCastManager.getResult;
			BroadCastManager._funDic["getTXYCType"] = BroadCastManager.getTXYCType;
			BroadCastManager._funDic["crossKingName"] = BroadCastManager.crossKingName;
			BroadCastManager._funDic["crossWarsRank"] = BroadCastManager.crossWarsRank;
			BroadCastManager._funDic["crossWarsTurn"] = BroadCastManager.crossWarsTurn;
			BroadCastManager._funDic["wuShengName"] = BroadCastManager.wuShengName;
			BroadCastManager._funDic["DanDaoFHLevel"] = BroadCastManager.DanDaoFHLevel;
			BroadCastManager._funDic["zhuansheng"] = BroadCastManager.zhuansheng;
			BroadCastManager._funDic["jinsheng"] = BroadCastManager.jinsheng;
			BroadCastManager._funDic["yjdq"] = BroadCastManager.yjdq;
			BroadCastManager._funDic["yjdqItem"] = BroadCastManager.yjdqItem;
			BroadCastManager._funDic["bwItem"] = BroadCastManager.bwItem;
			BroadCastManager._funDic["tsItem"] = BroadCastManager.tsItem;
			BroadCastManager._funDic["ybItem"] = BroadCastManager.ybItem;
			BroadCastManager._funDic["sjItem"] = BroadCastManager.sjItem;
			BroadCastManager._funDic["bfItem"] = BroadCastManager.bfItem;
			BroadCastManager._funDic["peacock"] = BroadCastManager.peacock;
			BroadCastManager._funDic["CrossTeamName"] = BroadCastManager.CrossTeamName;
			BroadCastManager._funDic["CrossSJName"] = BroadCastManager.CrossSJName;
			BroadCastManager._funDic["LCQSName"] = BroadCastManager.LCQSName;//六出祁山
			BroadCastManager._funDic["LCQSHard"] = BroadCastManager.LCQSHard;//六出祁山难度
			BroadCastManager._funDic["SyzlbName"] = BroadCastManager.SyzlbName;
			BroadCastManager._funDic["link"] = BroadCastManager.linkHandler;
			BroadCastManager._funDic["link2"] = BroadCastManager.linkHandler2;
			BroadCastManager._funDic["linkLCQS"] = BroadCastManager.linkHandlerLCQS;
			BroadCastManager._funDic["linkSyzlb"] = BroadCastManager.linkHandlerSyzlb;
			BroadCastManager._funDic["EightLock"] = BroadCastManager.EightLock;
			BroadCastManager._funDic["bosszcname"] = BroadCastManager.bosszcname;
			BroadCastManager._funDic["actholyzp"] = BroadCastManager.actholyzp;
			BroadCastManager._funDic["countryName"] = BroadCastManager.countryName;
			BroadCastManager._funDic["couSkilName"] = BroadCastManager.couSkilName;
			BroadCastManager._funDic["godWeaponName"] = BroadCastManager.godWeaponName;
			BroadCastManager._funDic["cityName"] = BroadCastManager.cityName;
			BroadCastManager._funDic["qiceName"] = BroadCastManager.qiceName;
			BroadCastManager._funDic["linkKywz"] = BroadCastManager.linkKywz;
			BroadCastManager._funDic["kfwzGrade"] = BroadCastManager.kfwzGrade;
			BroadCastManager._funDic["nameLhfb"] = BroadCastManager.nameLhfb;
			BroadCastManager._funDic["linkLhfb"] = BroadCastManager.linkLhfb;
			BroadCastManager._funDic["linkTYJY"] = BroadCastManager.linkHandlerTYJY;
			BroadCastManager._funDic["horseName"] = BroadCastManager.horseName;
			BroadCastManager._funDic["linkTJHB"] = BroadCastManager.linkTJHB;
			BroadCastManager._funDic["linkYanHui"] = BroadCastManager.linkYanHui;
			BroadCastManager._funDic["YanHuiType"] = BroadCastManager.YanHuiType;
			BroadCastManager._funDic["YanHuiReward"] = BroadCastManager.YanHuiReward;
			BroadCastManager._funDic["YanHuiJiu"] = BroadCastManager.YanHuiJiu;
			BroadCastManager._funDic["linkHongBao"] = BroadCastManager.linkHongBao;
			BroadCastManager._funDic["YanHuiGift"] = BroadCastManager.YanHuiGift;
			BroadCastManager._funDic["funHometype"] = BroadCastManager.funHometype;

		}
		return BroadCastManager._funDic;
	}

	public static YanHuiGift(value) {
		return Config.partylw_298[value].name;
	}

	public static YanHuiJiu(value) {
		return Config.party9_298[value].name;
	}

	public static YanHuiReward(value) {
		return Config.partylw_298[value].name;
	}

	public static YanHuiType(value) {
		return HtmlUtil.fontNoSize(Config.party_298[value].name, Color.getColorStr(Config.party_298[value].id == 1 ? 3 : 5));
	}

	public static godWeaponName(value): string {
		return HtmlUtil.fontNoSize("神兵·" + Config.sb_750[value].name, Color.getColorStr(Config.sb_750[value].pinzhi));
	}

	/** 群雄逐鹿替换城池名的方法 */
	public static cityName(pCityId): string {
		let t_cityVo = GGlobal.modelQxzl.getCityVoById(pCityId);
		if (t_cityVo) {
			return t_cityVo.cfg.name;
		}
		else {
			return pCityId;
		}
	}

	public static nameLhfb(v): string {
		let t_levelId = ~~v;
		let t_lunhuiId = ~~(t_levelId / 1000);
		let t_star = t_levelId % 1000;
		let t_color = Color.getColorStr(t_star + 1);
		let t_copyVo = GGlobal.modelLhfb.getCopyVoByLunhuiId(t_lunhuiId);
		return HtmlUtil.font(t_copyVo.name, t_color);
	}

	public static horseName(v) {
		let cfg = Config.zq_773[v]
		if (cfg) {
			return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.quality))
		}
		return ""
	}


	/** 奇策替换名称的方法 */
	public static qiceName(pQiceId): string {
		let t_vo = GGlobal.modelQice.getVoById(pQiceId);
		if (t_vo)
			return t_vo.nameWithColor;
		else
			return pQiceId;
	}

	public static linkHandler(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "my");
	}
	public static linkHandler2(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "sjmj");
	}
	public static linkHandlerLCQS(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "lcqs");
	}
	public static linkHandlerSyzlb(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "syzlb");
	}
	public static linkHandlerTYJY(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "tyjy");
	}
	public static linkKywz(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "kfwz");
	}
	public static linkLhfb(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "lhfb");
	}
	public static linkTJHB(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "tjhb");
	}
	public static linkYanHui(value): string {
		return HtmlUtil.createLink("【点击进入】", true, "yanhui");
	}
	public static linkHongBao(value): string {
		return HtmlUtil.createLink("【点击前往】", true, "hongbao");
	}

	/** 获取跨服王者段位名字 */
	public static kfwzGrade(value): string {
		let t_vo = GGlobal.modelKfwz.getGradeVoByGrade(value);
		if (t_vo)
			return t_vo.cfg.name;
		else
			return value;
	}

	private static EightLock(value) {
		const cfg = Config.bmjs_262[value];
		return cfg.door;
	}

	private static actholyzp(value) {
		const cfg = Config.ssshzpcz_268[value];
		let item = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))[0];
		return HtmlUtil.fontNoSize(item.name, Color.getColorStr(item.quality));
	}

	private static countryName(value) {
		return Model_Country.getCouNameMin(Number(value))
	}

	private static couSkilName(value) {
		return Config.gjjn_748[value].name;
	}

	private static bosszcname(value) {
		const cfg = Config.bosszc_010[value];
		let quility = cfg.pinzhi;
		return HtmlUtil.fontNoSize(cfg.mingzi, Color.getColorStr(quility));
	}

	/**组队副本 */
	public static CrossTeamName(value): string {
		let result = Config.zdfb_255[value];
		if (result) {
			return result.n;
		}
		return "";
	}

	public static CrossSJName(value): string {
		let result = Config.sjmjfb_258[value];
		if (result) {
			return result.name;
		}
		return "";
	}
	//六出祁山
	public static LCQSName(value) {
		let result = Config.six_279[value];
		if (result) {
			return result.big + "第" + (value % 1000) + "关";
		}
		return "";
	}

	public static LCQSHard(value) {
		switch (parseInt(value)) {
			case 0:
				return "普通";
			case 1:
				return "困难";
			case 2:
				return "地狱";
			case 3:
				return "噩梦";
			default:
				return "";
		}
	}

	public static SyzlbName(value) {
		let v = Config.syzlb_762[value]
		let nd = v ? BroadCastManager.LCQSHard(v.nd - 1) : ""
		return "三英战吕布-" + nd;
	}

	/**铜雀台 */
	public static peacock(value): string {
		var cfg = Config.tower_219[value];
		if (cfg) {
			var itemArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
		}
		if (itemArr) {
			var v = itemArr[0]
		}
		if (v) {
			return "<font color='" + Color.getColorStr(v.quality) + "'>" + v.name + "</font>";
		}
		return "";
	}

	/**兵法 */
	public static bfItem(value): string {
		let cfg = Config.book_213[value];
		return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
	}

	/**神剑 */
	public static sjItem(value): string {
		let cfg = Config.sword_216[value];
		return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
	}

	/**异宝 */
	public static ybItem(value): string {
		let cfg = Config.yb_217[value];
		return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
	}

	/**天书 */
	public static tsItem(value): string {
		let cfg = Config.book_215[value];
		return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
	}

	/**宝物 */
	public static bwItem(value): string {
		let cfg = Config.bao_214[value];
		return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
	}

	public static yjdqItem(value): string {
		let cfg = Config.yiqi_007[value];
		let item = ConfigHelp.makeItemListArr(JSON.parse(cfg.award))[0];
		let str = "";
		if (item) {
			var name = item.name;
			var q = item.quality;
			str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>*" + item.count;
		}
		return str;
	}

	public static yjdq(value): string {
		let arr = ["", "普通", "困难", "噩梦", "传说"];
		return arr[value];
	}

	public static jinsheng(value): string {
		let cfg = Config.up_231[value]
		return cfg.pin + cfg.name;
	}

	public static zhuansheng(value): string {
		return Config.zhuansheng_705[value].lv;
	}

	public static DanDaoFHLevel(value): string {
		let arr = ["", "青铜", "白银", "黄金", "铂金", "钻石"];
		return arr[parseInt(value)];
	}

	/**第1天:武将
		第2天:宝物
		第3天:天书
		第4天:神剑
		第5天:异宝
		第6天:铜雀台
		第7天:总战力 */
	public static wuShengName(str: string): string {
		let arr = ["", "武将", "宝物", "天书", "神剑", "异宝", "铜雀台", "总战力"];
		return arr[parseInt(str)];
	}

	public static getTXYCType(str: string): string {
		if (str == "1") {
			return "分区预测冠亚军";
		}
		return "全服预测冠亚军";
	}

	public static crossKingName(dan: number): string {
		return Config.lsxx_232[dan].name
	}

	public static crossWarsRank(rank: number): string {
		if (rank == 1) {
			return "冠军";
		} else if (rank == 2) {
			return "亚军";
		} else {
			return rank + "强"
		}
	}

	public static crossWarsTurn(turn: number): string {
		if (turn == 0) {
			return "16强比赛";
		} else if (turn == 1) {
			return "8强比赛";
		} else if (turn == 2) {
			return "4强比赛"
		} else if (turn == 3) {
			return "决赛"
		} else {
			return "比赛"
		}
	}

	public static getResult(str: string): string {
		if (str == "1") {
			return "胜利";
		}
		return "失败";
	}

	public static getSaiCheng(str: string): string {
		var index = parseInt(str);
		var type = Math.floor(index / 100);
		var round = index % 100;
		var sc = ["16强赛", "8强赛", "半决赛", "决赛"];
		var str = "";
		if (type == 1) {
			str = "分区";
			round -= 2;
		} else {
			str = "全服";
			round -= 1;
		}
		if (round < 0 || round >= sc.length) {
			str += index % 100;
		} else {
			str += sc[round];
		}
		return str;
	}

	/**玩家名称 */
	public static fNum(val): string {
		return val + "";
	}

	/**玩家名称 */
	public static getPlayerName(name: string): string {
		return name;
	}

	/**武将名称 */
	public static getHeroName(id: number): string {
		let v = Config.hero_211[id]
		let q = Model_WuJiang.getHeroQuality(v)
		return "<font color='" + Color.getColorStr(q) + "'>" + v.name + "</font>";
	}

	/**战甲名称 */
	public static getZhanJiaName(id: number): string {
		let v = Config.clothes_212[id]
		let q = Model_ZhanJia.getZhanJiaQuality(v)
		return "<font color='" + Color.getColorStr(q) + "'>" + v.name + "</font>";
	}

	/**获取道具装备名称 */
	public static getItemName(id: number): string {
		var str = "";
		var item = Config.daoju_204[id]
		if (item) {
			var name = item.name;
			var q = item.quality;
			str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
		} else {
			str = BroadCastManager.getEquipName(id);
			if (str == "") {//货币
				str = BroadCastManager.getCurrName(id);
			}
		}
		return str;
	}

	private static getFuwenName(id: number): string {
		var str = "";
		var item = Config.bztzf_261[id]
		if (item) {
			str = ConfigHelp.createColorName(item.name, item.pz)
			// var name = item.name;
			// var q = item.pz;
			// str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
		}
		return str;
	}

	/**府邸名字 */
	public static funHometype(id: number): string {
		var str = "";
		var cfg = Config.fddc_019[id];
		if (cfg) {
			str =cfg.name;
		}
		return str;
	}
	/**获取装备名称 */
	public static getEquipName(id: number): string {
		var str = "";
		var equip = Config.zhuangbei_204[id];
		if (equip) {
			var name = equip.n;
			var q = equip.q;
			str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
		}
		return str;
	}

	/**获取货币名称 */
	public static getCurrName(type: number): string {
		var str = "";
		var cfg = Config.jssx_002[type];
		if (cfg) {
			var name = cfg.name;
			var q = cfg.color;
			str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
		}
		return str;
	}

	public static getNpcName(id: number): string {
		var str = id + "";
		if (Config.NPC_200[id]) {
			str = Config.NPC_200[id].name;
		}
		return str;
	}

	public static getRankName(type: number) {
		if (type == 1) {
			return "战力"
		}
		return "等级";
	}

	/**匹配 */
	public static repText(content: string, param: string, funStr: string): string {
		if (param && param.length > 0) {
			var params = param.split("_");
			if (funStr && funStr != "") {
				var _arr1 = funStr.split("_");
				for (var i: number = 0; i < _arr1.length; i++) {
					if (params.length <= i)
						break;
					if (BroadCastManager.funDic[_arr1[i]]) {
						params[i] = BroadCastManager.funDic[_arr1[i]](params[i]);
					}
				}
			}
			params.unshift(content);
			content = ConfigHelp.reTxt.apply(null, params);
		}
		return content;
	}

	/**
	 * 匹配
	 * @param src
	 * @param param
	 * @return 
	 */
	public static reTxt(src: string, ...param): string {
		var len = param.length;
		if (len == 0) return src;
		for (let i = 0; i < len; i += 1) {
			var d: string = param[i];
			src = src.replace(ConfigHelp.getPattern(i), d);
		}
		return src;
	}
}