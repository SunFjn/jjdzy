var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainUIController = (function (_super) {
    __extends(MainUIController, _super);
    function MainUIController() {
        var _this = _super.call(this) || this;
        _this.menusIconGroup = [];
        _this.redIcon = {};
        /**界面下方提示按钮区域*/
        _this.tipBTNS = [];
        /**界面下方提示按钮区域 end*/
        /**战报按钮区域*/
        _this.REPORT_BTNS = [];
        _this._curState = 0;
        return _this;
    }
    MainUIController.prototype.init = function () {
        //初始化一些主界面按钮
        this.menusIconGroup = this.menusIconGroup.concat([UIConst.WELFARE, UIConst.HUODONG, UIConst.JINSHENG, UIConst.SHOUCHONG, UIConst.TEQUAN, UIConst.CANGBAOGE,
            UIConst.LING_LONG, UIConst.DAILYTASK, UIConst.BAOKU_LZ, UIConst.RANK, UIConst.SHOP, UIConst.TAOYUANJIEYI, UIConst.HOME]);
        var p = GGlobal.layerMgr.UI_Popup;
        p.addChild(ViewMainBottomUI.instance);
        p.addChild(ViewMainTopUI.instance);
        ViewMainTopUI.instance.visible = false;
        //低于UI层
        var b = GGlobal.layerMgr.UI_MainBottom;
        b.addChild(ViewMainTopUI1.instance);
        b.addChild(ViewMainUILeft.instance);
        b.addChild(ViewMainUILeft1.instance);
        b.addChild(ViewMainUIRight.instance);
        b.addChild(ViewMainTopUI2.instance);
        b.addChild(ViewMainUIBottomUI1.instance);
        b.addChild(ViewMainTownTop.instance);
        b.addChild(ViewMainTownLeft.instance);
        b.addChild(ViewMainTownBottom.instance);
        b.addChild(ViewMainTownRight.instance);
        var rightCompnent = ViewMainUIRightTipContainer.getInstance();
        b.addChild(rightCompnent);
        rightCompnent.setPosition();
        View_ActPreview.instance;
        this.linsten();
        GGlobal.modelLogin.doDelayEvent();
    };
    MainUIController.prototype.linsten = function () {
        var a = this;
        var r = GGlobal.reddot;
        var c = GGlobal.control;
        a.setState(0);
        a.addIcon(UIConst.TEQUAN);
        a.addIcon(UIConst.RANK);
        a.addIcon(UIConst.MAIL_PANEL, GGlobal.reddot.checkCondition(UIConst.MAIL_PANEL));
        a.guanQiaUpdate();
        a.levlUpdate();
        a.addActivityIcon();
        a.kaifuDayUpdate();
        GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, a.checkWaitIcons, a);
        r.listen(ReddotEvent.CHECK_SHOP, a.checkShop, a);
        r.listen(UIConst.TEQUAN, a.checkTeQuan, a);
        r.listen(UIConst.LCHK, a.checkLCHK, a);
        r.listen(UIConst.WELFARE, a.checkWelfare, a);
        r.listen(UIConst.DAILYTASK, a.checkDailytask, a);
        r.listen(ReddotEvent.CHECK_MAIL, a.checkMail, a);
        r.listen(ReddotEvent.CHECK_REBIRTH, a.checkRebirth, a);
        r.listen(ReddotEvent.CHECK_ROLE, a.checkRebirth, a);
        r.listen(UIConst.ACHIEVEMENT, a.checkRebirth, a);
        r.listen(ReddotEvent.CHECK_LINGLONG, a.checkLingLong, a);
        r.listen(UIConst.QUANMIN_KUANGHUAN, a.checkQuanMinKH, a);
        r.listen(UIConst.QUNYINGBANG, a.setQunYingbangNotice, a); //群英榜
        r.listen(UIConst.CHAOZHIFL, a.setCZFLNotice, a);
        r.listen(UIConst.CHAOZHIFL1, a.setCZFLNotice, a);
        r.listen(UIConst.YUANBAOFANLI1, a.setCZFLNotice, a);
        r.listen(ReddotEnum.GROUP_QICE, a.setQiceNotice, a);
        r.listen(UIConst.TAOYUANJIEYI, a.checkTYJY, a);
        GGlobal.modelSGQD.listen(ModelSGQD.msg_notice, a.setSGQDNotice, a);
        r.listen(ReddotEvent.CHECK_JIANGHUN, a.checkJiangHu, a);
        r.listen(ReddotEvent.CHECK_TUJIAN, a.checkTuJian, a);
        r.listen(ReddotEvent.CHECK_BAZHENTU, a.checkBaZhenTu, a);
        r.listen(UIConst.ZHENYAN, a.checkBaZhenTu, a);
        r.listen(UIConst.DANBIFANLI, a.checkDANBIFANLI, a);
        r.listen(UIConst.DENGLUSONGLI, a.checkDENGLYOULI, a);
        r.listen(UIConst.LEICHONGFANLI, a.checkLEICHONGFANLI, a);
        GGlobal.modelPlayer.listen(Model_player.MSG_ZHANLI, a.zhanliUpdate, a);
        GGlobal.modelWarToDead.listen(ModelWarToDead.msg_datas, a.setCZFLNotice, a);
        GGlobal.modelPlayer.listen(Model_player.ZHUANSHENG_UPDATE, a.zsUpdate, a);
        GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, a.levlUpdate, a);
        r.listen(UIConst.KAIFUKUANGHUAN, a.KFKHNotice, a);
        r.listen(ReddotEvent.CHECK_HUODONG, a.checkHuodong, a);
        r.listen(UIConst.ACTCOM, a.checkActCom, a);
        r.listen(UIConst.ACTCOM_TAL, a.checkActComTal, a);
        r.listen(UIConst.HUOD_ONLY, a.checkHuodOnly, a);
        r.listen(UIConst.ACTHB_XUNBAO, a.checkSHJX, a);
        r.listen(UIConst.ACTHB_ZHUANPAN, a.checkHolyBeast, a);
        r.listen(UIConst.ACTHB_XILIAN, a.checkHolyBeast, a);
        r.listen(UIConst.ACTHB_MUBIAO, a.checkHolyBeast, a);
        r.listen(UIConst.ACTHB_HUOYUE, a.checkHolyBeast, a);
        r.listen(UIConst.ACTHB_SGZL, a.checkHolyBeast, a);
        r.listen(ReddotEvent.CHECK_WUSHENGLIST, a.checkWuShengList, a);
        r.listen(UIConst.CANGBAOGE, a.checkCangBaoGe, a);
        r.listen(UIConst.CANGBAOGE_RANK, a.checkCangBaoGe, a);
        r.listen(UIConst.CANGBAOGE_RANK2, a.checkCangBaoGe, a);
        r.listen(UIConst.SHAOZHU, a.checkShaoZhu, a);
        r.listen(UIConst.SHAOZHU_QIYUAN, a.checkShaoZhu, a);
        r.listen(UIConst.SHAOZHU_LIUYI, a.checkShaoZhu, a);
        r.listen(UIConst.SHAOZHU_QIANNENG, a.checkShaoZhu, a);
        r.listen(UIConst.YISHOULU, a.checkYiShouLu, a);
        r.listen(UIConst.XIANSHAN_XUNSHOU, a.checkYiShouLu, a);
        r.listen(UIConst.YISHOULU_TF, a.checkYiShouLu, a);
        r.listen(UIConst.HORSE, a.checkHorse, a);
        r.listen(UIConst.HORSE_HH, a.checkHorse, a);
        r.listen(UIConst.YANHUI, a.check_YanHui, a);
        r.listen(UIConst.HOME_MAID, a.checkHome, a);
        r.listen(UIConst.HOME_TASK, a.checkHome, a);
        r.listen(UIConst.WAR_ORDER, a.checkWarOrder, a);
        r.listen(UIConst.WAR_ORDER1, a.checkWarOrder, a);
        r.listen(UIConst.WAR_ORDER_HD, a.checkWarOrder, a);
        r.listen(UIConst.WAR_ORDER_HD1, a.checkWarOrder, a);
        c.listen(Enum_MsgType.MSG_GQ_UPDATE, a.guanQiaUpdate, a);
        c.listen(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM, a.huodOnly, a);
        c.listen(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, a.daysSysUpdate, a);
        c.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, a.checkCangBaoGe, a);
        c.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, a.checkCangBaoGe, a);
        c.listen(Enum_MsgType.JUBAOPENG, a.checkJBP, a);
        c.listen(Enum_MsgType.ADD_ACTIVITYICON, a.addMainUIIcon, a);
        c.listen(Enum_MsgType.REDDOT_NOTICE, a.addReddot, a);
        c.listen(Enum_MsgType.KAIFUDAY_UPDATE, a.kaifuDayUpdate, a);
        c.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, a.addActivityIcon, a);
        c.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, a.addActivityIcon, a);
        c.listen(ReddotEvent.CHECK_SEVENDAYLOGIN, a.checkSevenDayLogin, a);
        c.listen(Enum_MsgType.VIP_CHANGE, a.addguibinVIPIcon, a);
        GGlobal.modelSHJX.listen(ModelSH.msg_notice, this.checkSHJX, this);
        r.listen(UIConst.SH_HUANX, this.checkSHJX, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.checkSHJX, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, this.checkSHJX, this);
        c.listen(Enum_MsgType.ZHIGOU_UPDATE, a.checkZhiGou, a); //直购活动
        c.listen(UIConst.YISHOULU, a.checkYiShouLu, a);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE, a.checkBaoKu, a);
    };
    /**单笔返利红点 */
    MainUIController.prototype.checkDANBIFANLI = function () {
        var ret = GGlobal.reddot.checkCondition(UIConst.DANBIFANLI, 0);
        if (ret) {
            this.setIconNotice(UIConst.SANGUOQD, ret);
        }
    };
    /**登陆有礼 */
    MainUIController.prototype.checkDENGLYOULI = function () {
        var ret = GGlobal.reddot.checkCondition(UIConst.DENGLUSONGLI, 0);
        if (ret) {
            this.setIconNotice(UIConst.SANGUOQD, ret);
        }
    };
    /**累充返利 */
    MainUIController.prototype.checkLEICHONGFANLI = function () {
        var ret = GGlobal.reddot.checkCondition(UIConst.LEICHONGFANLI, 0);
        if (ret) {
            this.setIconNotice(UIConst.SANGUOQD, ret);
        }
    };
    MainUIController.prototype.checkCangBaoGe = function () {
        var red = GGlobal.reddot.checkCondition(UIConst.CANGBAOGE) || GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK) || GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK2);
        this.setIconNotice(UIConst.CANGBAOGE, red);
        if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK)) {
            this.setIconDisImg(UIConst.CANGBAOGE, true);
        }
        else {
            this.setIconDisImg(UIConst.CANGBAOGE, false);
        }
    };
    MainUIController.prototype.checkWelfare = function () {
        var temp = GGlobal.reddot.checkCondition(UIConst.REWARD_BACK);
        var red = GGlobal.reddot.checkCondition(UIConst.WELFARE_SIGN) || temp;
        this.setIconNotice(UIConst.WELFARE, red);
    };
    MainUIController.prototype.checkDailytask = function () {
        var red = GGlobal.reddot.checkCondition(UIConst.DAILYTASK);
        var bool = red || GGlobal.modelactPreView.getNotice();
        this.setIconNotice(UIConst.DAILYTASK, bool);
    };
    //开服时间更新 界面显示等事件
    MainUIController.prototype.kaifuDayUpdate = function () {
        var s = this;
        s.addKaiFuAct();
        s.addActivityIcon();
    };
    MainUIController.prototype.checkHuodong = function () {
        var reddot = GGlobal.reddot;
        var red = reddot.checkCondition(UIConst.HUODONG_DAILY_GIFT, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_GIFT_KF, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_GIFT_ACT, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAILY_ONE, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_ONE_ACT, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_ONE_KF, 0)
            || reddot.checkCondition(UIConst.HUODONG_ADD_RECHARGE, 0)
            || reddot.checkCondition(UIConst.HUODONG_ADD_RECHARGESYS, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAILY_ADDUP, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_ADD_ACT, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAI_ADD_KF, 0)
            || reddot.checkCondition(UIConst.HUODONG_DIANJIANG, 0)
            || reddot.checkCondition(UIConst.HUODONG_DIANJIANG_SYS, 0)
            || reddot.checkCondition(UIConst.HUODONG_SEVEN_KAIFU, 0)
            || reddot.checkCondition(UIConst.HUODONG_SEVEN_ACT, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAILY_GIFT814, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAILY_ONE814, 0)
            || reddot.checkCondition(UIConst.HUODONG_ADD_RECHARGE814, 0)
            || reddot.checkCondition(UIConst.HUODONG_DAILY_ADDUP814, 0)
            || reddot.checkCondition(UIConst.HUODONG_SEVEN814, 0);
        this.setIconNotice(UIConst.HUODONG, red);
    };
    MainUIController.prototype.checkActCom = function () {
        var r = GGlobal.reddot;
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "SHOUCHONG_RESET_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        if (ModuleManager.isOpen(UIConst.SHOUCHONG_RESET) && GGlobal.modelActivity.getActivityByID(UIConst.SHOUCHONG_RESET)) {
            r.setCondition(UIConst.SHOUCHONG_RESET, 0, !value);
        }
        var actIDArr = JSON.parse(ConfigHelp.getSystemDesc(7550));
        for (var i = 0; i < actIDArr.length; i++) {
            // let actArr = GGlobal.modelActivity.getGroup(actIDArr[i]);
            var actID = actIDArr[i][0];
            var actArr = void 0;
            if (Config.xitong_001[actID].or == 1) {
                actArr = GGlobal.modelActivity.getGroup(actID);
            }
            else {
                actArr = ModelEightLock.getActivity(actID);
            }
            if (actArr && actArr.length > 0) {
                var red = false;
                for (var j = 0; j < actArr.length; j++) {
                    var tempAct = actArr[j];
                    red = r.checkCondition(tempAct.id, 0);
                    if (red)
                        break;
                }
                this.setIconNotice(actID, red);
            }
        }
    };
    MainUIController.prototype.checkActComTal = function () {
        var r = GGlobal.reddot;
        var red = r.checkCondition(UIConst.ACTCOM_TALENT, 0)
            || r.checkCondition(UIConst.ACTCOM_TALENT_GOAL, 0);
        this.setIconNotice(UIConst.ACTCOM_TAL, red);
    };
    MainUIController.prototype.checkHuodOnly = function () {
        var red = false;
        for (var keys in Model_HuoDOnly.originalDatas) {
            var act = Model_HuoDOnly.originalDatas[keys];
            var boo = GGlobal.reddot.checkCondition(act.index, act.id - 1);
            if (boo) {
                red = boo;
                break;
            }
        }
        this.setIconNotice(UIConst.HUOD_ONLY, red);
    };
    MainUIController.prototype.checkHolyBeast = function () {
        var redMubiao;
        for (var i = 0; i < 4; i++) {
            redMubiao = GGlobal.reddot.checkCondition(UIConst.ACTHB_MUBIAO, i);
            if (redMubiao)
                break;
        }
        var redHuoYue;
        for (var i = 0; i < 5; i++) {
            redHuoYue = GGlobal.reddot.checkCondition(UIConst.ACTHB_HUOYUE, i);
            if (redHuoYue)
                break;
        }
        var red = GGlobal.reddot.checkCondition(UIConst.ACTHB_ZHUANPAN, 0)
            || GGlobal.reddot.checkCondition(UIConst.ACTHB_XILIAN, 0)
            || GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL)
            || redMubiao
            || redHuoYue;
        this.setIconNotice(UIConst.ACT_HOLY_BEAST, red);
    };
    MainUIController.prototype.checkQuanMinKH = function () {
        var reddot = GGlobal.reddot;
        var red = reddot.checkCondition(UIConst.QUANMIN_KUANGHUAN_BOSS, 0)
            || reddot.checkCondition(UIConst.QUANMIN_KUANGHUAN_FUHUI, 0)
            || reddot.checkCondition(UIConst.QUANMIN_KUANGHUAN_LVBU, 0)
            || reddot.checkCondition(UIConst.QUANMIN_KUANGHUAN_XIAOXIONG, 0);
        this.setIconNotice(UIConst.QUANMIN_KUANGHUAN, red);
    };
    MainUIController.prototype.checkSevenDayLogin = function () {
        this.setIconNotice(UIConst.SEVENDAY_LOGIN, GGlobal.reddot.checkCondition(UIConst.SEVENDAY_LOGIN));
    };
    MainUIController.prototype.checkWuShengList = function () {
        var redDta = false;
        for (var i = 0; i < 7; i++) {
            redDta = GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, i) && i < Model_GlobalMsg.kaifuDay;
            if (redDta) {
                break;
            }
        }
        this.setIconNotice(UIConst.WUSHENGLIST, redDta);
    };
    MainUIController.prototype.checkTeQuan = function () {
        var r = GGlobal.reddot.checkCondition(UIConst.TEQUAN) || GGlobal.reddot.checkCondition(UIConst.WEEK_VIP);
        this.setIconNotice(UIConst.TEQUAN, r);
    };
    MainUIController.prototype.checkLCHK = function () {
        var r = GGlobal.reddot.checkCondition(UIConst.LCHK);
        this.setIconNotice(UIConst.LCHK, r);
    };
    MainUIController.prototype.checkMail = function () {
        this.setIconNotice(UIConst.MAIL_PANEL, GGlobal.reddot.checkCondition(UIConst.MAIL_PANEL));
    };
    MainUIController.prototype.checkRebirth = function () {
        var isNotice = GGlobal.reddot.checkCondition(UIConst.JINSHENG) ||
            GGlobal.reddot.checkCondition(UIConst.GUANXIAN) ||
            GGlobal.reddot.checkCondition(UIConst.VIEWLVBUCOMEUP) ||
            GGlobal.reddot.checkCondition(UIConst.ACHIEVEMENT);
        this.setIconNotice(UIConst.JINSHENG, isNotice);
    };
    MainUIController.prototype.checkWarOrder = function (id) {
        var isNotice = GGlobal.reddot.checkCondition(id);
        this.setIconNotice(id, isNotice);
    };
    MainUIController.prototype.checkLingLong = function () {
        this.setIconNotice(UIConst.LING_LONG, GGlobal.reddot.checkCondition(UIConst.LING_LONG));
    };
    MainUIController.prototype.checkZhiGou = function () {
        var showNotice = Model_ZhiGou.checkNotice();
        var _act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
        if (Model_GlobalMsg.kaifuDay <= 7) {
            this.setIconNotice(UIConst.SYSTEM_ZHI_GOU, showNotice);
            GGlobal.reddot.setCondition(UIConst.SYSTEM_ZHI_GOU, 0, showNotice);
        }
        else if (_act) {
            this.setIconNotice(UIConst.ZHI_GOU828, showNotice);
            GGlobal.reddot.setCondition(UIConst.ZHI_GOU828, 0, showNotice);
        }
        else {
            this.setIconNotice(UIConst.ZHI_GOU, showNotice);
            GGlobal.reddot.setCondition(UIConst.ZHI_GOU, 0, showNotice);
        }
    };
    /**开服狂欢、超级返利 三国庆典*/
    MainUIController.prototype.addActivityIcon = function () {
        if (Model_GlobalMsg.kaifuDay > 0) {
            var self_1 = this;
            var bool = TimeUitl.isIn7Days();
            var model = GGlobal.modelActivity;
            model.append(UIConst.CHAOZHIFL, -1, UIConst.DISCOUNT_SHOP);
            if (bool) {
                model.append(UIConst.CHAOZHIFL, -1, UIConst.SHENGJIE_SHOP);
                model.append(UIConst.CHAOZHIFL, -1, UIConst.GROUP_BUY);
                model.append(UIConst.CHAOZHIFL, -1, UIConst.WARTODEAD_7IN);
                model.append(UIConst.CHAOZHIFL, -1, UIConst.CAILIAOFL_KF);
                model.append(UIConst.CHAOZHIFL, -1, UIConst.YUANBAOFL_KF);
                model.append(UIConst.CHAOZHIFL, -1, UIConst.LXXF1);
            }
            else {
                model.castOff(UIConst.CHAOZHIFL, UIConst.CAILIAOFL_KF, 0);
            }
            self_1.resolveActs(UIConst.CHAOZHIFL);
            self_1.resolveActs(UIConst.QUANMIN_KUANGHUAN);
            self_1.resolveActs(UIConst.SANGUOQD);
            if (ModuleManager.isOpen(UIConst.SYSTEM_ZHI_GOU) && !self_1.getIcon(UIConst.SYSTEM_ZHI_GOU)) {
                self_1.addIcon(UIConst.SYSTEM_ZHI_GOU, GGlobal.reddot.checkCondition(UIConst.SYSTEM_ZHI_GOU));
                var date = new Date(Model_GlobalMsg.getServerTime());
                var key = "zhigou_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
                var value = egret.localStorage.getItem(key);
                this.setIconNotice(UIConst.SYSTEM_ZHI_GOU, !value);
            }
            self_1.resolveActs(UIConst.ZHI_GOU);
            //玲珑阁 7天后跨服
            if (Model_GlobalMsg.kaifuDay > 7) {
                var icon = this.getIcon(UIConst.LING_LONG);
                if (icon) {
                    icon.setKF(true);
                }
            }
            self_1.addCangBaoGeKf();
            self_1.resolveActs(UIConst.ACTCOM);
            if (self_1.getIcon(UIConst.ACTCOM)) {
                self_1.checkActCom(); //通用活动
            }
        }
    };
    MainUIController.prototype.addCangBaoGeKf = function () {
        var icon = this.getIcon(UIConst.CANGBAOGE);
        if (!icon)
            return;
        if (Model_GlobalMsg.kaifuDay > 30 && GGlobal.modelActivityHall.isOpenCbgRank2()) {
            icon.setKF(true);
        }
        else {
            icon.setKF(false);
        }
    };
    //下个版本优化
    MainUIController.prototype.resolveActs = function (groupId, sureAdd) {
        if (sureAdd === void 0) { sureAdd = false; }
        var self = this;
        var group = GGlobal.modelActivity.getGroup(groupId);
        if (sureAdd || (group && ModuleManager.isOpen(groupId))) {
            self.addIcon(groupId);
            if (groupId == UIConst.CHAOZHIFL) {
                self.setCZFLNotice();
            }
            else if (groupId == UIConst.ZHI_GOU) {
                var date = new Date(Model_GlobalMsg.getServerTime());
                var key = "zhigou_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
                var value = egret.localStorage.getItem(key);
                this.setIconNotice(UIConst.ZHI_GOU, !value);
            }
            else if (groupId == UIConst.SANGUOQD) {
                this.setSGQDNotice();
            }
        }
        else {
            self.removeIcon(groupId);
            if (GGlobal.layerMgr.isOpenView(groupId)) {
                GGlobal.layerMgr.close(groupId);
            }
        }
    };
    MainUIController.prototype.setQunYingbangNotice = function () {
        var r = GGlobal.reddot;
        var ret = r.checkCondition(UIConst.QUNYINGBANG);
        this.setIconNotice(UIConst.QUNYINGBANG, ret);
    };
    /**血战到底->战力更新 */
    MainUIController.prototype.zhanliUpdate = function () {
        var notice = GGlobal.modelWarToDead.checkNotice();
        if (Model_GlobalMsg.kaifuDay > 0) {
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                GGlobal.reddot.setCondition(UIConst.WARTODEAD1, 0, notice);
            }
            else {
                if (TimeUitl.isIn7Days()) {
                    GGlobal.reddot.setCondition(UIConst.WARTODEAD_7IN, 0, notice);
                }
                else {
                    GGlobal.reddot.setCondition(UIConst.WARTODEAD_7OUT, 0, notice);
                }
            }
        }
        this.setCZFLNotice();
    };
    MainUIController.prototype.setCZFLNotice = function () {
        var r = GGlobal.reddot;
        var ret = r.checkCondition(UIConst.YUANBAOFL_KF) || r.checkCondition(UIConst.YUANBAOFANLI) || r.checkCondition(UIConst.YUANBAOFANLI1) ||
            r.checkCondition(UIConst.CAILIAOFANLI) || r.checkCondition(UIConst.CAILIAOFL_KF) ||
            r.checkCondition(UIConst.CHAOZHI_ZHUANPAN) || r.checkCondition(UIConst.GROUP_BUY) || r.checkCondition(UIConst.GROUP_B814) ||
            r.checkCondition(UIConst.WARTODEAD_7IN) || r.checkCondition(UIConst.WARTODEAD_7OUT) || r.checkCondition(UIConst.WARTODEAD1) ||
            r.checkCondition(UIConst.LXXF1) || r.checkCondition(UIConst.LXXF2) || r.checkCondition(UIConst.LXXF3);
        this.setIconNotice(UIConst.CHAOZHIFL, ret);
        this.setIconNotice(UIConst.CHAOZHIFL1, ret);
    };
    MainUIController.prototype.setSGQDNotice = function () {
        var r = GGlobal.reddot;
        var dhNot = GGlobal.modelSGQD.noticeAllHL();
        r.setCondition(UIConst.HaoLiDuiHuan, 0, dhNot);
        r.setCondition(UIConst.HUOYUEYOULI, 0, GGlobal.modelSGQD.getNoti(UIConst.HUOYUEYOULI));
        var ret = r.checkCondition(UIConst.XIAOFEIPH) ||
            r.checkCondition(UIConst.HaoLiDuiHuan) ||
            r.checkCondition(UIConst.JiJin) ||
            r.checkCondition(UIConst.HUOYUEYOULI) ||
            r.checkCondition(UIConst.SG_ZHUANPAN) ||
            r.checkCondition(UIConst.DANBIFANLI) ||
            r.checkCondition(UIConst.DENGLUSONGLI) ||
            r.checkCondition(UIConst.LEICHONGFANLI);
        this.setIconNotice(UIConst.SANGUOQD, ret);
    };
    MainUIController.prototype.setQiceNotice = function () {
        this.setIconNotice(UIConst.QICE_STAR, ReddotMgr.ins().getValue(ReddotEnum.GROUP_QICE) > 0);
    };
    MainUIController.prototype.zsUpdate = function () {
        var a = this;
        // a.addLvBuCome();
    };
    MainUIController.prototype.addKaiFuAct = function () {
        var s = this;
        var day = Model_GlobalMsg.kaifuDay;
        if (day > 0) {
            s.addKFKH();
            s.addWuShengList();
        }
    };
    MainUIController.prototype.addWuShengList = function () {
        if (ModuleManager.isOpen(UIConst.WUSHENGLIST) && !this.getIcon(UIConst.WUSHENGLIST)) {
            var redDta = false;
            for (var i = 0; i < 7; i++) {
                redDta = GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, i) && i < Model_GlobalMsg.kaifuDay;
                if (redDta) {
                    break;
                }
            }
            this.addIcon(UIConst.WUSHENGLIST, redDta);
        }
    };
    MainUIController.prototype.addKFKH = function () {
        if (ModuleManager.isOpen(UIConst.KAIFUKUANGHUAN)) {
            var ret = GGlobal.reddot.checkCondition(UIConst.KAIFUKUANGHUAN);
            this.addIcon(UIConst.KAIFUKUANGHUAN, ret);
        }
    };
    MainUIController.prototype.KFKHNotice = function () {
        if (ModuleManager.isOpen(UIConst.KAIFUKUANGHUAN)) {
            var ret = GGlobal.reddot.checkCondition(UIConst.KAIFUKUANGHUAN, 0);
            if (!ret) {
                for (var i = 0; i < 6; i++) {
                    if (ret)
                        break;
                    if (i == 2) {
                        ret = GGlobal.reddot.checkCondition(UIConst.KAIFUKUANGHUAN, GGlobal.model_KaiFKH.getThemeType() - 1);
                    }
                    else if (i == 3) {
                        ret = GGlobal.reddot.checkCondition(UIConst.KAIFUKUANGHUAN, 9);
                    }
                    else if (i == 5) {
                    }
                    else {
                        ret = GGlobal.reddot.checkCondition(UIConst.KAIFUKUANGHUAN, i);
                    }
                }
            }
            this.setIconNotice(UIConst.KAIFUKUANGHUAN, ret);
        }
    };
    MainUIController.prototype.addReddot = function (data) {
        var self = this;
        if (!data || data.length == 0)
            return;
        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            var id = temp[0];
            var childSystem = temp[1];
            var icon = this.getIcon(id);
            var isCheck = false;
            if (childSystem && childSystem.length) {
                for (var j = 0, l = childSystem.length; j < l; j++) {
                    var t_index = childSystem[j][0];
                    if (ReddotMgr.ins().checkIsRegistered(id + "|" + t_index)) {
                        //如果是注册了组别的红点，index不用减1
                        GGlobal.reddot.setCondition(id, t_index, childSystem[j][1] == 1);
                    }
                    else {
                        //旧红点需要减1
                        GGlobal.reddot.setCondition(id, t_index - 1, childSystem[j][1] == 1);
                        if (id == UIConst.ZSSF && t_index == 2 && childSystem[j][1] == 1) {
                            self.addReportBTN(id);
                        }
                    }
                    if (childSystem[j][1] == 1) {
                        isCheck = true;
                    }
                }
                if (icon)
                    icon.checkNotice = isCheck;
                if (id == UIConst.QUANMIN_KUANGHUAN_BOSS || id == UIConst.QUANMIN_KUANGHUAN_FUHUI ||
                    id == UIConst.QUANMIN_KUANGHUAN_LVBU || id == UIConst.QUANMIN_KUANGHUAN_XIAOXIONG) {
                    id = UIConst.QUANMIN_KUANGHUAN;
                }
                if (id == UIConst.JINSHENG)
                    id = UIConst.REBIRTH;
                if ((id == UIConst.REWARD_BACK || UIConst.WELFARE == id || UIConst.WELFARE_SIGN == id) && isCheck) {
                    if (id == UIConst.REWARD_BACK) {
                        self.addTipBTN(UIConst.REWARD_BACK);
                    }
                    self.checkWelfare();
                }
                GGlobal.reddot.notifyMsg(id);
            }
        }
    };
    MainUIController.prototype.addMainUIIcon = function (arg) {
        var self = this;
        var id = arg[0];
        var st = arg[1];
        var c = GGlobal.control;
        switch (id) {
            case UIConst.JUBAOPENG:
                GGlobal.modelJBP.CG_OPEN();
                break;
            case UIConst.SHOUCHONG:
            case UIConst.MEIRISHOUCHONG:
                GGlobal.modelRecharge.setChongZhiState(id);
                break;
            case UIConst.FHLY:
                GGlobal.reddot.setCondition(UIConst.FHLY, 1, st != 0);
                GGlobal.reddot.notifyMsg(UIConst.FHLY);
                break;
        }
        if (st == 0) {
            var index = this.menusIconGroup.indexOf(id);
            if (index > -1) {
                self.menusIconGroup.slice(index, 1);
            }
            self.removeIcon(id);
        }
        else {
            if (!ModuleManager.isOpen(id)) {
                self.menusIconGroup.push(id);
                return;
            }
            self.addIcon(id);
            if (id == UIConst.YANHUI) {
                self.check_YanHui();
            }
        }
    };
    MainUIController.prototype.check_YanHui = function () {
        var btn = this.getIcon(UIConst.YANHUI);
        if (btn) {
            btn.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
            ;
        }
    };
    MainUIController.prototype.checkJBP = function () {
        var btn = this.getIcon(UIConst.JUBAOPENG);
        if (btn) {
            btn.checkNotice = GGlobal.modelJBP.checkMain();
        }
    };
    MainUIController.prototype.checkJiangHu = function () {
        var btn = this.getIcon(UIConst.JIANGHUN);
        if (!btn)
            return;
        var ret = false;
        for (var i = 0; i < 4; i++) {
            ret = GGlobal.reddot.checkCondition(UIConst.JIANGHUN, i);
            if (ret) {
                break;
            }
        }
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkBaZhenTu = function () {
        var btn = this.getIcon(UIConst.BAZHENTU);
        if (!btn)
            return;
        var ret = false;
        for (var i = 0; i < 4; i++) {
            ret = GGlobal.reddot.checkCondition(UIConst.BAZHENTU, i);
            if (ret) {
                break;
            }
        }
        if (!ret) {
            ret = GGlobal.reddot.checkCondition(UIConst.ZHENYAN, 0);
        }
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkTuJian = function () {
        var btn = this.getIcon(UIConst.TUJIAN);
        if (!btn)
            return;
        var ret = false;
        if (ModuleManager.isOpen(UIConst.TUJIAN)) {
            for (var i = 0; i < 4; i++) {
                ret = GGlobal.reddot.checkCondition(UIConst.TUJIAN, i);
                if (ret) {
                    break;
                }
            }
        }
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkShaoZhu = function () {
        var btn = this.getIcon(UIConst.SHAOZHU);
        if (!btn)
            return;
        var ret = false;
        for (var i = 0; i < 3; i++) {
            ret = GGlobal.reddot.checkCondition(UIConst.SHAOZHU, i);
            if (ret) {
                break;
            }
        }
        if (!ret) {
            ret = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIYUAN, 0)
                || GGlobal.reddot.checkCondition(UIConst.SHAOZHU_LIUYI, 0)
                || GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, 0);
        }
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkYiShouLu = function () {
        var btn = this.getIcon(UIConst.YISHOULU);
        if (!btn)
            return;
        var r = GGlobal.reddot;
        var ret = r.checkCondition(UIConst.YISHOULU) || r.checkCondition(UIConst.XIANSHAN_XUNSHOU)
            || r.checkCondition(UIConst.YISHOULU_TF, 0) || r.checkCondition(UIConst.YISHOULU_TF, 1) || r.checkCondition(UIConst.XIULIAN_TF, 0);
        ;
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkHorse = function () {
        var btn = this.getIcon(UIConst.HORSE);
        if (!btn)
            return;
        var r = GGlobal.reddot;
        var ret = r.checkCondition(UIConst.HORSE) || r.checkCondition(UIConst.HORSE_HH);
        btn.checkNotice = ret;
    };
    MainUIController.prototype.checkHome = function () {
        var btn = this.getIcon(UIConst.HOME);
        if (!btn)
            return;
        var r = GGlobal.reddot;
        var ret = r.checkCondition(UIConst.HOME_MAID) || r.checkCondition(UIConst.HOME_TASK);
        btn.checkNotice = ret;
    };
    //根据系统开启表去判断该图标是否可以创建，可以创建则立即创建，不可创建则放入监听
    MainUIController.prototype.addIconWithListener = function (id) {
        var _data = this.menusIconGroup;
        var idx = _data.indexOf(id);
        if (ModuleManager.isOpen(id)) {
            if (!this.getIcon(id)) {
                this.addIcon(id, GGlobal.reddot.checkCondition(id));
            }
            if (idx != -1) {
                this.menusIconGroup.splice(idx, 1);
            }
        }
        else {
            if (idx == -1) {
                _data.push(id);
            }
        }
    };
    //移除正在监听的图标
    MainUIController.prototype.removeIconInWaitList = function (id) {
        var _data = this.menusIconGroup;
        var idx = _data.indexOf(id);
        if (idx != -1) {
            this.menusIconGroup.splice(idx, 1);
        }
    };
    //通过关卡开启系统图标
    MainUIController.prototype.guanQiaUpdate = function () {
        var s = this;
        if (GGlobal.modelGuanQia.curGuanQiaLv >= ModelGuanQia.autoWave && !ViewGuanQiaBossEntry.createInstance().parent) {
            GGlobal.layerMgr.UI_MainBottom.addChild(ViewGuanQiaBossEntry.createInstance());
        }
        if (ModuleManager.isOpen(UIConst.FUNCTIONPREVIEW) && !View_FunctionPreview.createInstance().parent) {
            ViewMainUIRightTipContainer.getInstance().addCompnent(View_FunctionPreview.createInstance());
        }
        s.checkWaitIcons();
        if (ModuleManager.isOpen(UIConst.WELFARE) && !s.getIcon(UIConst.WELFARE)) {
            var red = GGlobal.reddot.checkCondition(UIConst.WELFARE_SIGN);
            s.addIcon(UIConst.WELFARE, red);
        }
        if (!s.getIcon(UIConst.HUODONG) && ModuleManager.isOpen(UIConst.HUODONG)) {
            s.checkHuodong();
        }
        if (ModuleManager.isOpen(UIConst.LING_LONG)) {
            if (Model_GlobalMsg.kaifuDay > 7) {
                var iconll = s.getIcon(UIConst.LING_LONG);
                if (iconll)
                    iconll.setKF(true);
            }
        }
        if (ModuleManager.isOpen(UIConst.SHOUCHONG) && !GGlobal.modelRecharge.disShowIcon()) {
            s.addIcon(UIConst.SHOUCHONG, GGlobal.reddot.checkCondition(UIConst.SHOUCHONG));
        }
        s.addguibinVIPIcon();
        if (ModuleManager.isOpen(UIConst.MEIRISHOUCHONG) && GGlobal.modelRecharge.hasMRShouchong) {
            s.addIcon(UIConst.MEIRISHOUCHONG, GGlobal.reddot.checkCondition(UIConst.MEIRISHOUCHONG));
        }
        if (ModuleManager.isOpen(UIConst.CANGBAOGE)) {
            //藏宝阁 30天后跨服
            s.addCangBaoGeKf();
        }
        s.addKFKH();
        s.updateTipBtn();
        s.addWuShengList();
        GGlobal.modelEightLock.checkAndOpenIcon();
        if (ModuleManager.isOpen(UIConst.BAOKU_LZ) && !s.getIcon(UIConst.BAOKU_LZ)) {
            s.checkBaoKu();
        }
        this.addActivityIcon();
        if (!s.hasRedIcon(UIConst.GOD_EQUIP) && ModuleManager.isOpen(UIConst.GOD_EQUIP)) {
            s.setRedIcon(UIConst.GOD_EQUIP); //第一次开启神装，更新神装红点  
            GGlobal.modelEquip.CGGetEquips(2); //神装
            GGlobal.modelGodEquip.CGGetJieOrange();
        }
        if (!s.hasRedIcon(UIConst.REBIRTH) && ModuleManager.isOpen(UIConst.REBIRTH)) {
            s.setRedIcon(UIConst.REBIRTH); //第一次开启转生 
            GGlobal.control.notify(Enum_MsgType.REBIRTH_UPDATE);
        }
        s.openActHolyB();
        s.huodOnly();
    };
    MainUIController.prototype.huodOnly = function () {
        var s = this;
        if (!s.getIcon(UIConst.HUOD_ONLY)) {
            if (ModuleManager.isOpen(UIConst.HUOD_ONLY) && Model_HuoDOnly.getActivity().length > 0 && Model_HuoDOnly.ON_OFF) {
                s.addIcon(UIConst.HUOD_ONLY);
                s.checkHuodOnly();
                //第一次打开
                Model_HuoDOnly.getSkipShow();
                if (!Model_HuoDOnly.skipShow) {
                    if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
                        GGlobal.layerMgr.open(UIConst.HUOD_ONLY);
                    }
                    else {
                        GGlobal.control.listen(Enum_MsgType.SCENE_CHANGE, this.openHuodOnly, this);
                    }
                }
            }
        }
        else {
            if (!ModuleManager.isOpen(UIConst.HUOD_ONLY) || Model_HuoDOnly.getActivity().length == 0 || !Model_HuoDOnly.ON_OFF) {
                s.removeIcon(UIConst.HUOD_ONLY);
                GGlobal.layerMgr.close2(UIConst.HUOD_ONLY);
            }
        }
    };
    MainUIController.prototype.openHuodOnly = function () {
        if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
            GGlobal.layerMgr.open(UIConst.HUOD_ONLY);
            GGlobal.control.remove(Enum_MsgType.SCENE_CHANGE, this.openHuodOnly, this);
        }
    };
    MainUIController.prototype.daysSysUpdate = function () {
        var s = this;
        s.openActHolyB();
    };
    /**添加贵宾VIP 图标 */
    MainUIController.prototype.addguibinVIPIcon = function () {
        var self = this;
        var pf = PlatformManager.getPfIndex();
        var cfg = Config.guibin_749[pf];
        if (cfg && Model_player.voMine.viplv >= cfg.vip) {
            self.addIcon(UIConst.GUI_BIN_VIP);
        }
    };
    MainUIController.prototype.openActHolyB = function () {
        var s = this;
        if (s.getIcon(UIConst.ACT_HOLY_BEAST)) {
            var arr = ModelEightLock.getActivity(UIConst.ACT_HOLY_BEAST);
            if (arr.length == 0) {
                s.removeIcon(UIConst.ACT_HOLY_BEAST);
            }
        }
        else {
            if (ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) {
                var arr = ModelEightLock.getActivity(UIConst.ACT_HOLY_BEAST);
                if (arr.length > 0) {
                    s.addIcon(UIConst.ACT_HOLY_BEAST);
                }
            }
        }
    };
    //玩家升级开启按钮
    MainUIController.prototype.levlUpdate = function () {
        var s = this;
        if (!s.getIcon(UIConst.JIANGHUN)) {
            s.addIconByXian(UIConst.JIANGHUN);
        }
        if (!s.getIcon(UIConst.TUJIAN)) {
            s.addIconByXian(UIConst.TUJIAN);
        }
        if (!s.getIcon(UIConst.BAZHENTU)) {
            s.addIconByXian(UIConst.BAZHENTU);
        }
        if (!s.getIcon(UIConst.SHAOZHU)) {
            s.addIconByXian(UIConst.SHAOZHU);
        }
        if (!s.getIcon(UIConst.YISHOULU)) {
            s.addIconByXian(UIConst.YISHOULU);
        }
        if (!s.getIcon(UIConst.QICE_STAR)) {
            s.addIconByXian(UIConst.QICE_STAR);
        }
        if (!s.getIcon(UIConst.HORSE)) {
            s.addIconByXian(UIConst.HORSE);
        }
        if (!s.getIcon(UIConst.HONGBAO)) {
            s.addIconByXian(UIConst.HONGBAO);
        }
        this.checkSHJX();
    };
    MainUIController.prototype.checkSHJX = function (item) {
        if (item) {
            if (item[UIConst.SHOULING] || item[UIConst.SHJX] || item["equip12"]) {
                ModelSH.updateNotAll();
            }
            else {
                return;
            }
        }
        var icon = this.getIcon(UIConst.SHOULING);
        if (!icon) {
            this.addIcon(UIConst.SHOULING);
            icon = this.getIcon(UIConst.SHOULING);
        }
        var bool = GGlobal.reddot.checkCondition(UIConst.SHOULING);
        if (!bool) {
            for (var i = 0; i < 4; i++) {
                var red = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, i);
                if (red) {
                    bool = true;
                    break;
                }
            }
        }
        if (icon) {
            var notice = icon.checkNotice;
            if (bool != notice) {
                icon.checkNotice = bool;
            }
        }
    };
    MainUIController.prototype.hasRedIcon = function (id) {
        return this.redIcon[id];
    };
    MainUIController.prototype.setRedIcon = function (id) {
        this.redIcon[id] = true;
    };
    //根据条件创建一些尚未达到开启等级，后端已经推送的图标
    MainUIController.prototype.checkWaitIcons = function () {
        for (var i = 0; i < this.menusIconGroup.length;) {
            var id = this.menusIconGroup[i];
            if (ModuleManager.isOpen(id)) {
                if (!this.getIcon(id)) {
                    this.addIcon(id, GGlobal.reddot.checkCondition(id));
                }
                this.menusIconGroup.splice(i, 1);
            }
            else {
                i++;
            }
        }
        this.updateTipBtn();
    };
    MainUIController.prototype.checkBaoKu = function () {
        if (ModuleManager.isOpen(UIConst.BAOKU_LZ) && this.getIcon(UIConst.BAOKU_LZ)) {
            var date = new Date(Model_GlobalMsg.getServerTime());
            var key = "baoku_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
            var value = egret.localStorage.getItem(key);
            this.setIconNotice(UIConst.BAOKU_LZ, !value);
        }
    };
    MainUIController.prototype.checkShop = function () {
        this.setIconNotice(UIConst.SHOP, GGlobal.reddot.checkCondition(UIConst.SHOP));
    };
    MainUIController.prototype.checkTYJY = function () {
        var ret = GGlobal.reddot.checkCondition(UIConst.TAOYUANJIEYI, 0) || GGlobal.reddot.checkCondition(UIConst.TYJY_YMRW, 0) || GGlobal.reddot.checkCondition(UIConst.TYJY_YMFB, 0);
        this.setIconNotice(UIConst.TAOYUANJIEYI, ret);
    };
    MainUIController.showBottomExite = function (bo, callBack, thisObj) {
        ViewMainBottomUI.instance.setExitBtn(bo, callBack, thisObj);
    };
    MainUIController.setSkillEnable = function (val) {
        ViewMainUIBottomUI1.instance.setSkillEnable(val);
    };
    MainUIController.prototype.addIcon = function (systemID, isNotice) {
        if (systemID == UIConst.DISCOUNT_SHOP) {
            return; //去掉折扣商店
        }
        if (!ModuleManager.isOpen(systemID)) {
            return;
        }
        if (systemID == UIConst.WYHB_BT || systemID == UIConst.CZLB_BT) {
            isNotice = true;
        }
        var _paren = this.getPosition(systemID);
        if (_paren) {
            _paren.addMenuIcon(systemID, isNotice);
        }
    };
    MainUIController.prototype.addIconByXian = function (systemID, isNotice) {
        if (!ModuleManager.isXianShi(systemID)) {
            return;
        }
        var _paren = this.getPosition(systemID);
        if (_paren) {
            _paren.addMenuIcon(systemID, isNotice);
        }
    };
    MainUIController.prototype.removeIcon = function (systemID) {
        var _paren = this.getPosition(systemID);
        if (_paren) {
            _paren.removeMenuIcon(systemID);
        }
        GGlobal.mainUICtr.removeIconInWaitList(systemID);
    };
    MainUIController.prototype.setIconNotice = function (systemID, isNotice) {
        var _paren = this.getPosition(systemID);
        if (_paren)
            _paren.setIconNotice(systemID, isNotice);
    };
    MainUIController.prototype.setIconDisImg = function (systemID, bol) {
        var _paren = this.getPosition(systemID);
        if (_paren)
            _paren.setIconDisImg(systemID, bol);
    };
    MainUIController.prototype.getIcon = function (systemID) {
        var _paren = this.getPosition(systemID);
        if (_paren)
            return _paren.getIcon(systemID);
        else
            return null;
    };
    MainUIController.prototype.getPosition = function (systemID) {
        var cfg = Config.xitong_001[systemID] && Config.tubiao_003[systemID];
        if (!cfg) {
            return;
        }
        var pos = cfg.area;
        var _paren;
        switch (pos) {
            case 2:
                _paren = ViewMainTopUI2.instance;
                break;
            case 3:
                _paren = ViewMainUILeft.instance;
                break;
            case 4:
                _paren = ViewMainUIRight.instance;
                break;
            case 6:
                _paren = ViewMainTownTop.instance;
                break;
            case 7:
                _paren = ViewMainTownBottom.instance;
                break;
            case 8:
                _paren = ViewMainTownLeft.instance;
                break;
            case 9:
                _paren = ViewMainUILeft1.instance;
                break;
            case 10:
                _paren = ViewMainTownRight.instance;
                break;
        }
        return _paren;
    };
    /**
     * 0最底层 1上一层
    */
    MainUIController.addChildToUI = function (tar, lay) {
        if (lay === void 0) { lay = 0; }
        if (lay == 0) {
            GGlobal.layerMgr.UI_MainBottom.addChild(tar);
        }
        else if (lay == -1) {
            GGlobal.layerMgr.UI_MainLowBottom.addChild(tar);
        }
        else if (lay == 1) {
            GGlobal.layerMgr.UI_floorUI_1.addChild(tar);
        }
        else {
            GGlobal.layerMgr.UI_Popup.addChild(tar);
        }
    };
    MainUIController.removeUI = function (tar) {
        if (tar && tar.parent)
            tar.parent.removeChild(tar);
        tar = null;
    };
    MainUIController.prototype.addTipBTN = function (id) {
        if (this.tipBTNS.indexOf(id) < 0) {
            this.tipBTNS.push(id);
        }
        this.updateTipBtn();
    };
    MainUIController.prototype.removeTipBTN = function (id) {
        var idx = this.tipBTNS.indexOf(id);
        if (idx >= 0) {
            this.tipBTNS.splice(idx, 1);
        }
        this.updateTipBtn();
    };
    //关卡和等级更新显示下方提示按钮
    MainUIController.prototype.updateTipBtn = function () {
        if (ViewMainTownBottom.instance) {
            this.delayAddTipBtn();
        }
        else {
            GGlobal.modelLogin.handList.push(Handler.create(this, this.delayAddTipBtn));
        }
    };
    MainUIController.prototype.delayAddTipBtn = function () {
        ViewMainUIBottomUI1.instance.showTipBtn();
    };
    MainUIController.prototype.addReportBTN = function (id) {
        if (this.REPORT_BTNS.indexOf(id) < 0) {
            this.REPORT_BTNS.push(id);
        }
        this.updateReportBtn();
    };
    MainUIController.prototype.removeReportBTN = function (id) {
        var idx = this.REPORT_BTNS.indexOf(id);
        if (idx >= 0) {
            this.REPORT_BTNS.splice(idx, 1);
        }
        this.updateReportBtn();
    };
    MainUIController.prototype.updateReportBtn = function () {
        if (ViewMainTownBottom.instance) {
            this.delayAddReportBtn();
        }
        else {
            GGlobal.modelLogin.handList.push(Handler.create(this, this.delayAddReportBtn));
        }
    };
    MainUIController.prototype.delayAddReportBtn = function () {
        ViewMainUIBottomUI1.instance.showReportTip();
    };
    // private _lastSt = 0;
    MainUIController.prototype.setState = function (st) {
        var visibleArr = [];
        for (var i = 0; i < 17; i++) {
            visibleArr.push(false);
        }
        // console.log("======================== mainui.state=", st);
        // this._lastSt = st;
        var topui = 0, topui1 = 1, topui2 = 2, bottomui1 = 3, uileft = 4, uiright = 5, towntop = 6, townleft = 7, townbottom = 8, bottomui = 9, bottomuiExiteBtn = 10, changeTownBt = 11, guanqia = 12, taskbtn = 13, TipContainer = 14, skill = 16;
        switch (st) {
            case 0://关卡
                visibleArr[topui1] = true;
                visibleArr[topui2] = true;
                visibleArr[bottomui1] = true;
                visibleArr[uileft] = true;
                visibleArr[uiright] = true;
                visibleArr[bottomui] = true;
                visibleArr[changeTownBt] = true;
                visibleArr[guanqia] = true;
                visibleArr[taskbtn] = true;
                visibleArr[TipContainer] = true;
                visibleArr[skill] = true;
                break;
            case 1://主城         
                visibleArr[topui1] = true;
                visibleArr[towntop] = true;
                visibleArr[townleft] = true;
                visibleArr[townbottom] = true;
                visibleArr[bottomui] = true;
                visibleArr[skill] = true;
                break;
            case 2://关卡BOSS
                visibleArr[topui1] = true;
                visibleArr[topui2] = true;
                visibleArr[bottomui1] = true;
                visibleArr[uileft] = true;
                visibleArr[bottomui] = true;
                visibleArr[bottomuiExiteBtn] = true;
                visibleArr[changeTownBt] = true;
                visibleArr[15] = true;
                visibleArr[skill] = true;
                break;
            case 3://副本和其他战斗
                visibleArr[topui1] = true;
                visibleArr[topui2] = true;
                visibleArr[bottomui1] = true;
                visibleArr[uileft] = true;
                visibleArr[bottomui] = true;
                visibleArr[bottomuiExiteBtn] = true;
                visibleArr[changeTownBt] = true;
                visibleArr[15] = true;
                visibleArr[skill] = true;
                break;
            case MainUIController.ARPGMAP:
                visibleArr[0] = true;
                visibleArr[bottomui1] = true;
                visibleArr[bottomui] = true;
                visibleArr[bottomuiExiteBtn] = true;
                visibleArr[15] = true;
                break;
            case MainUIController.KFWZ:
                // visibleArr[0] = true;
                visibleArr[3] = true;
                visibleArr[9] = true;
                visibleArr[10] = true;
                visibleArr[15] = true;
                break;
            case MainUIController.FHLY:
            case MainUIController.WENDINGTIANXIA:
            case MainUIController.SANGUO_YITONG:
            case MainUIController.QXZL:
                visibleArr[0] = true;
                visibleArr[bottomui1] = true;
                visibleArr[15] = true;
                break;
            case MainUIController.BOSS_BATTLEFIELD:
                visibleArr[topui1] = true;
                visibleArr[topui2] = true;
                visibleArr[bottomui1] = true;
                visibleArr[uileft] = true;
                visibleArr[bottomui] = true;
                visibleArr[bottomuiExiteBtn] = true;
                visibleArr[15] = true;
                break;
            case MainUIController.VIDEOTAPE://录像  
                visibleArr[topui1] = true;
                visibleArr[topui2] = true;
                visibleArr[bottomui1] = true;
                visibleArr[uileft] = true;
                visibleArr[bottomui] = true;
                visibleArr[bottomuiExiteBtn] = true;
                visibleArr[changeTownBt] = true;
                visibleArr[15] = true;
                break;
            case MainUIController.YANHUI://宴会
                visibleArr[0] = true;
                visibleArr[3] = true;
                break;
            case MainUIController.HOME://家园
                visibleArr[bottomui1] = true;
                visibleArr[bottomui] = true;
                // visibleArr[towntop] = true;
                break;
        }
        ViewMainTopUI.instance.visible = visibleArr[topui];
        ViewMainTopUI1.instance.visible = visibleArr[topui1];
        ViewMainTopUI2.instance.visible = visibleArr[topui2];
        ViewMainUIBottomUI1.instance.visible = visibleArr[bottomui1];
        ViewMainUILeft.instance.visible = visibleArr[uileft];
        ViewMainUIRight.instance.visible = visibleArr[uiright];
        ViewMainTownTop.instance.visible = visibleArr[towntop];
        ViewMainTownLeft.instance.visible = visibleArr[townleft];
        ViewMainTownRight.instance.visible = visibleArr[townleft];
        ViewMainTownBottom.instance.visible = visibleArr[townbottom];
        ViewMainBottomUI.instance.visible = visibleArr[bottomui];
        ViewMainBottomUI.instance.setExitVis(visibleArr[bottomuiExiteBtn]);
        ViewMainBottomUI.instance.changeTownBt(visibleArr[changeTownBt]);
        ViewGuanQiaBossEntry.createInstance().setVisible(visibleArr[guanqia]);
        if (visibleArr[taskbtn]) {
            GGlobal.control.notify(Enum_MsgType.SHOW_TASK);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.HIDE_TASK);
        }
        ViewMainUIRightTipContainer.getInstance().visible = visibleArr[taskbtn];
        // ChildFuBenActEntrance.createInstance().setViewVisble(visibleArr[15]);
        ViewMainUIBottomUI1.instance.setSkillEnable(visibleArr[skill]);
        ViewMainUILeft1.instance.visible = visibleArr[uileft];
    };
    /**战报按钮区域 end*/
    MainUIController.GUANQIA = 0; //关卡
    MainUIController.MAINTOWN = 1; //主城
    MainUIController.GUANQIABOSS = 2; //关卡BOSS
    MainUIController.BATTLE = 3; //关卡BOSS
    MainUIController.FHLY = 4; //烽火狼烟
    MainUIController.ARPGMAP = 5; //地图
    MainUIController.WENDINGTIANXIA = 6; //问鼎天下
    MainUIController.BOSS_BATTLEFIELD = 7; //boss战场
    MainUIController.SANGUO_YITONG = 8; //三国一统
    MainUIController.VIDEOTAPE = 9; //录像
    MainUIController.QXZL = 10; //群雄逐鹿
    MainUIController.KFWZ = 11; //跨服王者
    MainUIController.YANHUI = 12; //宴会
    MainUIController.HOME = 13; //家园
    return MainUIController;
}(MsgCenter));
__reflect(MainUIController.prototype, "MainUIController");
