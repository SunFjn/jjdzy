var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReddotEvent = (function () {
    function ReddotEvent() {
    }
    ReddotEvent.CHECK_BAG_NOTICE = "CHECK_BAG_NOTICE";
    ReddotEvent.CHECK_TIANSHU = "CHECK_TIANSHU";
    ReddotEvent.CHECK_DAUNZAO = "check_daunzao";
    ReddotEvent.CHECK_SKILL = "1101";
    ReddotEvent.CHECK_GOD_SKILL = "1102";
    ReddotEvent.CHECK_YIBAO = "check_yibao";
    ReddotEvent.CHECK_ROLE = "CHECK_ROLE";
    ReddotEvent.CHECK_BAOWU = "2501";
    ReddotEvent.CHECK_SHENJIAN = "2701";
    ReddotEvent.CHECK_JIANGHUN = "2401";
    // public static CHECK_SHOULING: string = "2001";
    ReddotEvent.CHECK_BINGFA = "2801";
    ReddotEvent.CHECK_TUJIAN = "2901";
    ReddotEvent.CHECK_XINGTU = "2301";
    ReddotEvent.CHECK_LUNHUI = "6901";
    ReddotEvent.CHECK_SHOP = "3401";
    ReddotEvent.CHECK_YJDQ = "1704";
    ReddotEvent.CHECK_RUNMAN = "1705";
    ReddotEvent.CHECK_VIP = "5001";
    ReddotEvent.CHECKGQ = 1;
    ReddotEvent.CHECKKFKH = 5101;
    ReddotEvent.CHECK_MAIL = 3201;
    ReddotEvent.CHECK_FUBEN_CAILIAO = 1703;
    ReddotEvent.CHECK_REBIRTH = 4101;
    ReddotEvent.CHECK_WU_JIANG = 3101;
    ReddotEvent.CHECK_ZHAN_JIA = 3102;
    ReddotEvent.CHECK_NZBZ = 1503;
    ReddotEvent.CHECK_LINGLONG = 4801;
    ReddotEvent.CHECK_WUSHENGLIST = 4901;
    ReddotEvent.CHECK_PEACOCK = "1702";
    ReddotEvent.CHECK_SEVENDAYLOGIN = 5005;
    ReddotEvent.CHECK_HUODONG = 4501;
    ReddotEvent.CHECK_CROSS_KING = 3602;
    ReddotEvent.CHECK_CROSS_WARS = 3603;
    ReddotEvent.CHECK_CROSS_SJMJ = 3605;
    ReddotEvent.CHECK_COUNTRY = 1501;
    ReddotEvent.CHECK_COUNTRY_SKILL = 1511;
    ReddotEvent.CHECK_COU_KSHIP = 1504;
    ReddotEvent.CHECK_LBCOMEUP = 5501;
    ReddotEvent.CHECK_BAZHENTU = 6001;
    return ReddotEvent;
}());
__reflect(ReddotEvent.prototype, "ReddotEvent");
