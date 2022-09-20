var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BroadCastManager = (function () {
    function BroadCastManager() {
    }
    Object.defineProperty(BroadCastManager, "funDic", {
        get: function () {
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
                BroadCastManager._funDic["LCQSName"] = BroadCastManager.LCQSName; //六出祁山
                BroadCastManager._funDic["LCQSHard"] = BroadCastManager.LCQSHard; //六出祁山难度
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
        },
        enumerable: true,
        configurable: true
    });
    BroadCastManager.YanHuiGift = function (value) {
        return Config.partylw_298[value].name;
    };
    BroadCastManager.YanHuiJiu = function (value) {
        return Config.party9_298[value].name;
    };
    BroadCastManager.YanHuiReward = function (value) {
        return Config.partylw_298[value].name;
    };
    BroadCastManager.YanHuiType = function (value) {
        return HtmlUtil.fontNoSize(Config.party_298[value].name, Color.getColorStr(Config.party_298[value].id == 1 ? 3 : 5));
    };
    BroadCastManager.godWeaponName = function (value) {
        return HtmlUtil.fontNoSize("神兵·" + Config.sb_750[value].name, Color.getColorStr(Config.sb_750[value].pinzhi));
    };
    /** 群雄逐鹿替换城池名的方法 */
    BroadCastManager.cityName = function (pCityId) {
        var t_cityVo = GGlobal.modelQxzl.getCityVoById(pCityId);
        if (t_cityVo) {
            return t_cityVo.cfg.name;
        }
        else {
            return pCityId;
        }
    };
    BroadCastManager.nameLhfb = function (v) {
        var t_levelId = ~~v;
        var t_lunhuiId = ~~(t_levelId / 1000);
        var t_star = t_levelId % 1000;
        var t_color = Color.getColorStr(t_star + 1);
        var t_copyVo = GGlobal.modelLhfb.getCopyVoByLunhuiId(t_lunhuiId);
        return HtmlUtil.font(t_copyVo.name, t_color);
    };
    BroadCastManager.horseName = function (v) {
        var cfg = Config.zq_773[v];
        if (cfg) {
            return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.quality));
        }
        return "";
    };
    /** 奇策替换名称的方法 */
    BroadCastManager.qiceName = function (pQiceId) {
        var t_vo = GGlobal.modelQice.getVoById(pQiceId);
        if (t_vo)
            return t_vo.nameWithColor;
        else
            return pQiceId;
    };
    BroadCastManager.linkHandler = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "my");
    };
    BroadCastManager.linkHandler2 = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "sjmj");
    };
    BroadCastManager.linkHandlerLCQS = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "lcqs");
    };
    BroadCastManager.linkHandlerSyzlb = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "syzlb");
    };
    BroadCastManager.linkHandlerTYJY = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "tyjy");
    };
    BroadCastManager.linkKywz = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "kfwz");
    };
    BroadCastManager.linkLhfb = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "lhfb");
    };
    BroadCastManager.linkTJHB = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "tjhb");
    };
    BroadCastManager.linkYanHui = function (value) {
        return HtmlUtil.createLink("【点击进入】", true, "yanhui");
    };
    BroadCastManager.linkHongBao = function (value) {
        return HtmlUtil.createLink("【点击前往】", true, "hongbao");
    };
    /** 获取跨服王者段位名字 */
    BroadCastManager.kfwzGrade = function (value) {
        var t_vo = GGlobal.modelKfwz.getGradeVoByGrade(value);
        if (t_vo)
            return t_vo.cfg.name;
        else
            return value;
    };
    BroadCastManager.EightLock = function (value) {
        var cfg = Config.bmjs_262[value];
        return cfg.door;
    };
    BroadCastManager.actholyzp = function (value) {
        var cfg = Config.ssshzpcz_268[value];
        var item = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))[0];
        return HtmlUtil.fontNoSize(item.name, Color.getColorStr(item.quality));
    };
    BroadCastManager.countryName = function (value) {
        return Model_Country.getCouNameMin(Number(value));
    };
    BroadCastManager.couSkilName = function (value) {
        return Config.gjjn_748[value].name;
    };
    BroadCastManager.bosszcname = function (value) {
        var cfg = Config.bosszc_010[value];
        var quility = cfg.pinzhi;
        return HtmlUtil.fontNoSize(cfg.mingzi, Color.getColorStr(quility));
    };
    /**组队副本 */
    BroadCastManager.CrossTeamName = function (value) {
        var result = Config.zdfb_255[value];
        if (result) {
            return result.n;
        }
        return "";
    };
    BroadCastManager.CrossSJName = function (value) {
        var result = Config.sjmjfb_258[value];
        if (result) {
            return result.name;
        }
        return "";
    };
    //六出祁山
    BroadCastManager.LCQSName = function (value) {
        var result = Config.six_279[value];
        if (result) {
            return result.big + "第" + (value % 1000) + "关";
        }
        return "";
    };
    BroadCastManager.LCQSHard = function (value) {
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
    };
    BroadCastManager.SyzlbName = function (value) {
        var v = Config.syzlb_762[value];
        var nd = v ? BroadCastManager.LCQSHard(v.nd - 1) : "";
        return "三英战吕布-" + nd;
    };
    /**铜雀台 */
    BroadCastManager.peacock = function (value) {
        var cfg = Config.tower_219[value];
        if (cfg) {
            var itemArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        if (itemArr) {
            var v = itemArr[0];
        }
        if (v) {
            return "<font color='" + Color.getColorStr(v.quality) + "'>" + v.name + "</font>";
        }
        return "";
    };
    /**兵法 */
    BroadCastManager.bfItem = function (value) {
        var cfg = Config.book_213[value];
        return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
    };
    /**神剑 */
    BroadCastManager.sjItem = function (value) {
        var cfg = Config.sword_216[value];
        return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
    };
    /**异宝 */
    BroadCastManager.ybItem = function (value) {
        var cfg = Config.yb_217[value];
        return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
    };
    /**天书 */
    BroadCastManager.tsItem = function (value) {
        var cfg = Config.book_215[value];
        return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
    };
    /**宝物 */
    BroadCastManager.bwItem = function (value) {
        var cfg = Config.bao_214[value];
        return HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pin));
    };
    BroadCastManager.yjdqItem = function (value) {
        var cfg = Config.yiqi_007[value];
        var item = ConfigHelp.makeItemListArr(JSON.parse(cfg.award))[0];
        var str = "";
        if (item) {
            var name = item.name;
            var q = item.quality;
            str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>*" + item.count;
        }
        return str;
    };
    BroadCastManager.yjdq = function (value) {
        var arr = ["", "普通", "困难", "噩梦", "传说"];
        return arr[value];
    };
    BroadCastManager.jinsheng = function (value) {
        var cfg = Config.up_231[value];
        return cfg.pin + cfg.name;
    };
    BroadCastManager.zhuansheng = function (value) {
        return Config.zhuansheng_705[value].lv;
    };
    BroadCastManager.DanDaoFHLevel = function (value) {
        var arr = ["", "青铜", "白银", "黄金", "铂金", "钻石"];
        return arr[parseInt(value)];
    };
    /**第1天:武将
        第2天:宝物
        第3天:天书
        第4天:神剑
        第5天:异宝
        第6天:铜雀台
        第7天:总战力 */
    BroadCastManager.wuShengName = function (str) {
        var arr = ["", "武将", "宝物", "天书", "神剑", "异宝", "铜雀台", "总战力"];
        return arr[parseInt(str)];
    };
    BroadCastManager.getTXYCType = function (str) {
        if (str == "1") {
            return "分区预测冠亚军";
        }
        return "全服预测冠亚军";
    };
    BroadCastManager.crossKingName = function (dan) {
        return Config.lsxx_232[dan].name;
    };
    BroadCastManager.crossWarsRank = function (rank) {
        if (rank == 1) {
            return "冠军";
        }
        else if (rank == 2) {
            return "亚军";
        }
        else {
            return rank + "强";
        }
    };
    BroadCastManager.crossWarsTurn = function (turn) {
        if (turn == 0) {
            return "16强比赛";
        }
        else if (turn == 1) {
            return "8强比赛";
        }
        else if (turn == 2) {
            return "4强比赛";
        }
        else if (turn == 3) {
            return "决赛";
        }
        else {
            return "比赛";
        }
    };
    BroadCastManager.getResult = function (str) {
        if (str == "1") {
            return "胜利";
        }
        return "失败";
    };
    BroadCastManager.getSaiCheng = function (str) {
        var index = parseInt(str);
        var type = Math.floor(index / 100);
        var round = index % 100;
        var sc = ["16强赛", "8强赛", "半决赛", "决赛"];
        var str = "";
        if (type == 1) {
            str = "分区";
            round -= 2;
        }
        else {
            str = "全服";
            round -= 1;
        }
        if (round < 0 || round >= sc.length) {
            str += index % 100;
        }
        else {
            str += sc[round];
        }
        return str;
    };
    /**玩家名称 */
    BroadCastManager.fNum = function (val) {
        return val + "";
    };
    /**玩家名称 */
    BroadCastManager.getPlayerName = function (name) {
        return name;
    };
    /**武将名称 */
    BroadCastManager.getHeroName = function (id) {
        var v = Config.hero_211[id];
        var q = Model_WuJiang.getHeroQuality(v);
        return "<font color='" + Color.getColorStr(q) + "'>" + v.name + "</font>";
    };
    /**战甲名称 */
    BroadCastManager.getZhanJiaName = function (id) {
        var v = Config.clothes_212[id];
        var q = Model_ZhanJia.getZhanJiaQuality(v);
        return "<font color='" + Color.getColorStr(q) + "'>" + v.name + "</font>";
    };
    /**获取道具装备名称 */
    BroadCastManager.getItemName = function (id) {
        var str = "";
        var item = Config.daoju_204[id];
        if (item) {
            var name = item.name;
            var q = item.quality;
            str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
        }
        else {
            str = BroadCastManager.getEquipName(id);
            if (str == "") {
                str = BroadCastManager.getCurrName(id);
            }
        }
        return str;
    };
    BroadCastManager.getFuwenName = function (id) {
        var str = "";
        var item = Config.bztzf_261[id];
        if (item) {
            str = ConfigHelp.createColorName(item.name, item.pz);
            // var name = item.name;
            // var q = item.pz;
            // str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
        }
        return str;
    };
    /**府邸名字 */
    BroadCastManager.funHometype = function (id) {
        var str = "";
        var cfg = Config.fddc_019[id];
        if (cfg) {
            str = cfg.name;
        }
        return str;
    };
    /**获取装备名称 */
    BroadCastManager.getEquipName = function (id) {
        var str = "";
        var equip = Config.zhuangbei_204[id];
        if (equip) {
            var name = equip.n;
            var q = equip.q;
            str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
        }
        return str;
    };
    /**获取货币名称 */
    BroadCastManager.getCurrName = function (type) {
        var str = "";
        var cfg = Config.jssx_002[type];
        if (cfg) {
            var name = cfg.name;
            var q = cfg.color;
            str = "<font color='" + Color.getColorStr(q) + "'>" + name + "</font>";
        }
        return str;
    };
    BroadCastManager.getNpcName = function (id) {
        var str = id + "";
        if (Config.NPC_200[id]) {
            str = Config.NPC_200[id].name;
        }
        return str;
    };
    BroadCastManager.getRankName = function (type) {
        if (type == 1) {
            return "战力";
        }
        return "等级";
    };
    /**匹配 */
    BroadCastManager.repText = function (content, param, funStr) {
        if (param && param.length > 0) {
            var params = param.split("_");
            if (funStr && funStr != "") {
                var _arr1 = funStr.split("_");
                for (var i = 0; i < _arr1.length; i++) {
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
    };
    /**
     * 匹配
     * @param src
     * @param param
     * @return
     */
    BroadCastManager.reTxt = function (src) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var len = param.length;
        if (len == 0)
            return src;
        for (var i = 0; i < len; i += 1) {
            var d = param[i];
            src = src.replace(ConfigHelp.getPattern(i), d);
        }
        return src;
    };
    return BroadCastManager;
}());
__reflect(BroadCastManager.prototype, "BroadCastManager");
