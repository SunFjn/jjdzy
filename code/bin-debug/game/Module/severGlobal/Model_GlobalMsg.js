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
var Model_GlobalMsg = (function (_super) {
    __extends(Model_GlobalMsg, _super);
    function Model_GlobalMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSendServ = 0;
        _this.heartTime = 0;
        _this.quickCount = 0;
        _this.data = [];
        /**
         * 268 GC 分享开关0关 1开 B:分享开关状态
        */
        _this.share_st = 1;
        return _this;
    }
    //协议处理
    Model_GlobalMsg.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(252, self.GC_GLOBAL_SERVER_TIME, self);
        mgr.regHand(254, self.GC_GLOBAL_SERVER_NOTICE, self);
        mgr.regHand(256, self.GC_GLOBAL_SERVER_MSG, self);
        mgr.regHand(258, self.GC_GLOBAL_KAI_FU_TIME_MSG, self);
        mgr.regHand(260, self.GC_GLOBAL_SERVER_PROMPT, self);
        mgr.regHand(158, self.GC_ACTIVITY_STATE, self);
        mgr.regHand(2350, self.GC_ACTIVITY_PREVIEW, self);
        // mgr.regHand(160, self.GC_REDDOT, self);
        mgr.regHand(160, self.GC_REDDOT, self);
        mgr.regHand(162, self.GC_ZERO_RESET, self);
        mgr.regHand(164, self.GC_SERVER_MAINTAIN, self);
        mgr.regHand(166, self.GC_IOS_GUANQIA_OPEN, self);
        mgr.regHand(2300, self.GC_GET_KAIFU_DAY, self);
        mgr.regHand(168, self.GC_SERVER_VERSION, self);
        mgr.regHand(262, self.GC_BATTLEWIN_COMMON, self);
        mgr.regHand(264, self.GC_BOSS_TISHI, self);
        mgr.regHand(3742, self.GC3742, self);
        mgr.regHand(172, self.GC_NOTICE_172, self);
        mgr.regHand(268, self.GC_SHARE_STATE, self);
        mgr.regHand(270, self.GC_OPEN_UI, self);
    };
    Model_GlobalMsg.prototype.enterGame = function () {
        var self = this;
        self.heartTime = 5000;
        self.isSendServ = 0;
        self.quickCount = 0;
        var t = egret.getTimer();
        Timer.listen(self.onSyncServTime, self, 500, t);
    };
    Model_GlobalMsg.prototype.onSyncServTime = function (nowTime) {
        var self = this;
        if (GGlobal.isEnterGame && Model_GlobalMsg.updateTime) {
            if (nowTime - Model_GlobalMsg.updateTime < self.heartTime || self.isSendServ != 0)
                return;
            self.isSendServ++;
            self.CG_GLOBAL_SERVER_TIME();
        }
    };
    Model_GlobalMsg.prototype.onSocketClose = function () {
        var self = this;
        self.isSendServ = 0;
        Timer.remove(self.onSyncServTime, self);
    };
    /**270	返回排行数据 I:活动系统idI:唯一idI:第一名职业[I:排名U:玩家名I:排名统计比较值]排名数据
     * [I:头像I:头像框I:国家I:vip等级]第二，第三名头像id，头像框，国家，vip等级I:自身统计值I:自身排名I:结束时间 */
    Model_GlobalMsg.prototype.GC_OPEN_UI = function (m, ba) {
        Model_GlobalMsg.rankData = [];
        Model_GlobalMsg.headData = [];
        Model_GlobalMsg.sysID = ba.readInt();
        Model_GlobalMsg.sysType = ba.readInt();
        Model_GlobalMsg.firstJob = ba.readInt();
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var rank = new Vo_SystemRank();
            rank.readMsg(ba);
            Model_GlobalMsg.rankData.push(rank);
        }
        len = ba.readShort();
        for (var j = 0; j < len; j++) {
            var headVO = new Vo_SystemRank();
            headVO.readHeadMsg(ba);
            var rank = Model_GlobalMsg.rankData[j + 1];
            Model_GlobalMsg.headData.push(headVO);
        }
        Model_GlobalMsg.myCount = ba.readInt();
        Model_GlobalMsg.myRank = ba.readInt();
        Model_GlobalMsg.endTime = ba.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_RANK);
    };
    /**262	弹出奖励界面 B:状态 1胜率 2失败[B:道具类型I:道具idI:道具数量B:状态 0默认 1额外]奖励 */
    Model_GlobalMsg.prototype.GC_BATTLEWIN_COMMON = function (self, data) {
        var result = data.readByte();
        Model_GlobalMsg.batResult = result;
        var arr;
        if (result == 1) {
            arr = [];
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var type = data.readByte();
                var id = data.readInt();
                var count = data.readInt();
                var extra = data.readByte();
                var vo;
                if (type == Enum_Attr.EQUIP) {
                    vo = VoEquip.create(id);
                }
                else if (type == Enum_Attr.ITEM) {
                    vo = VoItem.create(id);
                }
                else {
                    vo = Vo_Currency.create(type);
                }
                vo.count = count;
                vo.extra = extra;
                arr.push(vo);
            }
        }
        switch (GGlobal.sceneType) {
            case SceneCtrl.LHFB:
                GGlobal.modelLhfb.showResultPanel(result, arr);
                break;
            default:
                if (result == 1) {
                    setTimeout(function () {
                        ViewCommonWin.show(arr);
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        ViewBattleFault.show();
                    }, 1000);
                }
                break;
        }
    };
    Model_GlobalMsg.prototype.GC_BOSS_TISHI = function (self, data) {
        var sysid = data.readInt();
        var boss = data.readInt();
        var status = data.readByte();
        var cfg = ViewBossTiShi.getCfg(sysid, boss);
        if (!cfg)
            return;
        if (cfg.boss == 0) {
            if (cfg.yxj > ViewBossTiShi.yxj) {
                GGlobal.layerMgr.close2(UIConst.BOSS_TISHI);
                if (status == 1 && !GGlobal.modelFengHuoLY.inActivity && !GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
                    View_ActivityOpenPrompt_Panel.show(cfg);
                }
                else if (status == 2) {
                    View_ActivityOpenPrompt_Panel.hide();
                }
            }
        }
        else {
            if (cfg.yxj > View_ActivityOpenPrompt_Panel.yxj) {
                View_ActivityOpenPrompt_Panel.hide();
                if (status == 1 && !GGlobal.modelFengHuoLY.inActivity && !GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
                    ViewBossTiShi.show(sysid, boss);
                }
                else if (status == 2) {
                    ViewBossTiShi.hide(sysid, boss);
                }
            }
        }
    };
    /**166	GC 通知前段IOS充值开启关卡数 I:IOS充值开启关卡数 */
    Model_GlobalMsg.prototype.GC_IOS_GUANQIA_OPEN = function (self, data) {
        Model_GlobalMsg.ios_open = data.readInt();
        egret.log("ios屏蔽关卡:" + Model_GlobalMsg.ios_open);
        GGlobal.control.notify(Enum_MsgType.IOS_OPEN_CHANGE);
    };
    /**164	服务端通知提示 U:通知提示内容B:通知类型：0：普通，1：服务器维护信息*/
    Model_GlobalMsg.prototype.GC_SERVER_MAINTAIN = function (self, data) {
        var str = data.readUTF();
        var type = data.readByte();
        if (GGlobal.sdk) {
            if (type == 2 && !GGlobal.isEnterGame) {
                GGlobal.sdk.blackPlayerWarning();
            }
            else if (type == 3 || type == 4) {
                ViewOffLine1.show(str, 1);
            }
            else {
                ViewOffLine.show(str);
            }
        }
        else {
            if (GGlobal.commonpkg) {
                if (type == 1) {
                    ViewOffLine1.show("维护时间：" + str, 1);
                }
                else if (type == 3 || type == 4) {
                    ViewOffLine1.show(str, 1);
                }
                else {
                    ViewOffLine1.show(str, 1);
                }
            }
            else {
                GGlobal.main.showFenHaoByServer();
            }
        }
    };
    /**2300 GC 登陆发送 B:开服第几天  */
    Model_GlobalMsg.prototype.GC_GET_KAIFU_DAY = function (self, data) {
        Model_GlobalMsg.kaifuDay = data.readInt();
        GGlobal.control.notify(Enum_MsgType.KAIFUDAY_UPDATE);
    };
    /**162 零点重置  */
    Model_GlobalMsg.prototype.GC_ZERO_RESET = function (self, data) {
        View_QuickBuy_Panel.isFirt = true;
        GGlobal.control.notify(Enum_MsgType.ZERO_RESET);
        if (ModuleManager.isOpen(UIConst.SHOP)) {
            Model_Shop.shopArr = [];
            GGlobal.control.notify(Enum_MsgType.SHOP_UPDATE);
        }
        if (ModuleManager.isOpen(UIConst.DANDAO_FUHUI)) {
            GGlobal.modelddfh.CG_OPEN_DANDAOFH();
        }
        if (ModuleManager.isOpen(UIConst.DISCOUNT_SHOP)) {
            if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
                GGlobal.modelEightLock.CG4571(UIConst.DISCOUNT_SHOP1);
            }
            else {
                GGlobal.modelCZFL.CG_OPEN_DISCOUNTSHOP();
            }
        }
        if (ModuleManager.isOpen(UIConst.COUNTRY_DONATE) && Model_player.voMine.country > 0) {
            GGlobal.reddot.setCondition(UIConst.COUNTRY_DONATE, 0, true);
            GGlobal.reddot.notifyMsg(UIConst.COUNTRY_DONATE);
        }
        var arr = [UIConst.HUODONG_DAI_GIFT_ACT, UIConst.HUODONG_DAI_ONE_ACT, UIConst.HUODONG_DAI_ADD_ACT];
        for (var i = 0; i < arr.length; i++) {
            var hid = arr[i];
            var red = GGlobal.reddot.checkCondition(hid);
            if (red) {
                var a = GGlobal.modelActivity.get(Model_HuoDong.TYPE, hid);
                if (!a || a.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000) < 0) {
                    if (hid == UIConst.HUODONG_DAI_GIFT_ACT)
                        Model_HuoDong.daiGiftActArr = [];
                    else if (hid == UIConst.HUODONG_DAI_ONE_ACT)
                        Model_HuoDong.daiOneActArr = [];
                    else if (hid == UIConst.HUODONG_DAI_ADD_ACT)
                        Model_HuoDong.daiAddActArr = [];
                    GGlobal.reddot.setCondition(hid, 0, false);
                    GGlobal.reddot.notifyMsg(hid);
                }
                else {
                    if (hid == UIConst.HUODONG_DAI_GIFT_ACT)
                        GGlobal.modelActivity.CG_OPENACT(hid);
                    else if (hid == UIConst.HUODONG_DAI_ONE_ACT)
                        GGlobal.modelHuoDong.CG_DAIONEACT_UI();
                    else if (hid == UIConst.HUODONG_DAI_ADD_ACT)
                        GGlobal.modelHuoDong.CG_DAIADDACT_OPENUI();
                }
            }
        }
        arr = [UIConst.HUODONG_DAI_GIFT_KF, UIConst.HUODONG_DAI_ONE_KF, UIConst.HUODONG_DAI_ADD_KF];
        var kaiFuOver = Model_GlobalMsg.getkaiFuTime();
        for (var i = 0; i < arr.length; i++) {
            var hid = arr[i];
            var red = GGlobal.reddot.checkCondition(hid);
            if (red) {
                var a = GGlobal.modelActivity.get(Model_HuoDong.TYPE, hid);
                if (kaiFuOver < 0) {
                    if (hid == UIConst.HUODONG_DAI_GIFT_KF)
                        Model_HuoDong.daiGiftKfArr = [];
                    else if (hid == UIConst.HUODONG_DAI_ONE_KF)
                        Model_HuoDong.daiOneKfArr = [];
                    else if (hid == UIConst.HUODONG_DAI_ADD_KF)
                        Model_HuoDong.daiAddKfArr = [];
                    GGlobal.reddot.setCondition(hid, 0, false);
                    GGlobal.reddot.notifyMsg(hid);
                }
                else {
                    if (hid == UIConst.HUODONG_DAI_GIFT_KF)
                        GGlobal.modelHuoDong.CG_DAIGIFTKF_UI();
                    else if (hid == UIConst.HUODONG_DAI_ONE_KF)
                        GGlobal.modelHuoDong.CG_DAIONEKF_UI();
                    else if (hid == UIConst.HUODONG_DAI_ADD_KF)
                        GGlobal.modelHuoDong.CG_DAIADDKF_OPENUI();
                }
            }
        }
        if (ModuleManager.isOpen(UIConst.ZHI_GOU828)) {
            if (ModelEightLock.originalDatas[UIConst.ZHI_GOU828]) {
                GGlobal.modelEightLock.CG4571(UIConst.ZHI_GOU828);
            }
        }
        //八阵图 0点重置
        if (ModuleManager.isOpen(UIConst.BAZHENTU)) {
            GGlobal.modelBaZhenTu.CGOPENUI4401();
        }
        //虎牢关 0点重置
        if (ModuleManager.isOpen(UIConst.CHILD_TIGER_PASS)) {
            GGlobal.modelTigerPass.CGOpenUI8901();
        }
        /**跨服试炼 */
        if (ModuleManager.isOpen(UIConst.CROSS_SHILIAN)) {
            GGlobal.modelkfsl.floor = 0;
        }
        /**镇守四方 */
        if (ModuleManager.isOpen(UIConst.ZSSF) && GGlobal.layerMgr.isOpenView(UIConst.ZSSF)) {
            GGlobal.modelzssf.CG_GuardArea_openUI_10901();
        }
        /**红包系统 */
        if (ModuleManager.isOpen(UIConst.HONGBAO) && GGlobal.layerMgr.isOpenView(UIConst.HONGBAO)) {
            GGlobal.modelHB.CG_OPEN_HONGBAO_11769();
        }
        /**天降红包系统 */
        if (ModuleManager.isOpen(UIConst.ACTCOM_TJHB)) {
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_TJHB);
        }
        //轮回副本
        if (ModuleManager.isOpen(UIConst.LHFB) && GGlobal.layerMgr.isOpenView(UIConst.LHFB)) {
            GGlobal.modelLhfb.CG_RebornFB_openUi_11861();
        }
        /**貔貅散宝 */
        if (ModuleManager.isOpen(UIConst.ACTCOM_PXSB)) {
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_PXSB);
        }
        Model_CrossTeam.isZero = true;
    };
    Model_GlobalMsg.getkaiFuTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 - (ms - h0);
        var day = Model_GlobalMsg.kaifuDay;
        ax += 86400000 * (7 - day);
        return ax;
    };
    /**2350 活动预告返回 I:活动索引idI:活动预告结束时间  */
    Model_GlobalMsg.prototype.GC_ACTIVITY_PREVIEW = function (self, data) {
        Model_GlobalMsg.actPreviewId = data.readInt();
        Model_GlobalMsg.actPreviewTime = data.readInt();
        if (GGlobal.isEnterGame) {
            View_ActPreview.instance.show();
        }
    };
    /**251 CG申请同步服务器时间**/
    Model_GlobalMsg.prototype.CG_GLOBAL_SERVER_TIME = function () {
        var bates = this.getBytes();
        this.sendSocket(251, bates);
    };
    //252 L-U GC发送服务器当前时间 L:当前服务器时间戳U:当前服务器时区
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_TIME = function (self, data) {
        var clientTime = Model_GlobalMsg.serverTime;
        Model_GlobalMsg.updateTime = egret.getTimer();
        Model_GlobalMsg.serverTime = data.readLong();
        Model_GlobalMsg.serverTimeZone = data.readUTF();
        if (!true && clientTime && self.isSendServ) {
            var timeInterval = Model_GlobalMsg.serverTime - clientTime;
            if (self.heartTime >= timeInterval + 1500) {
                self.quickCount++;
                if (self.quickCount > 1) {
                    self.quickCount = 0;
                    var s = "请停止使用第三方加速插件";
                    ViewOffLine1.show(s, 1);
                    GGlobal.socketMgr.close();
                    WorldSocketMgr.instance.close();
                }
            }
            else {
                if (self.quickCount > 0)
                    self.quickCount--;
            }
        }
        self.isSendServ = 0;
        GGlobal.modelGlobalMsg.notify(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE);
    };
    /**
     * 服务器时间 ms
     */
    Model_GlobalMsg.getServerTime = function () {
        var time = egret.getTimer() + Model_GlobalMsg.serverTime - Model_GlobalMsg.updateTime;
        return time;
    };
    //254 B-I-I-I GC个人事件提示 B:0 使用 1 获得 I:属性类型I:物品系统IDI:提示数量或角色id
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_NOTICE = function (self, data) {
        var oper = data.readByte();
        var type = data.readInt();
        var id = data.readInt();
        var hidOrNum = data.readInt();
        var msg = null;
        if (oper == 1) {
            var lib = Config.jssx_002;
            msg = ConfigHelp.AttrName(type) + "  +" + hidOrNum;
            var color = Color.QUALITYCOLOR[lib[type].color];
            ViewBroadcastItemText.text(msg, color);
        }
        else {
            msg = "未知个人事件提示：" + oper;
        }
    };
    /**256 S-I GC全局消息和提示 S:消息类型 1等级不够进行此操作2系统已屏蔽I:标识 消息标识(功能id)*/
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_MSG = function (self, data) {
        var type = data.readShort();
        var funID = data.readInt();
        var msg = null;
        if (type == 1) {
            var lib = Config.xitong_001;
            if (ModuleManager.isOpen(funID, true) == false) {
            }
            else {
                msg = "等级不够进行此操作"; //进入此处可能是系统开启表没有同步
            }
        }
        else if (type == 2) {
            msg = "活动暂时关闭，敬请耐心等待";
        }
        else {
            msg = "未知个全局消息和提示：type = " + type;
        }
        if (msg) {
            ViewCommonWarn.text(msg);
        }
    };
    /**258 L 开服时间*/
    Model_GlobalMsg.prototype.GC_GLOBAL_KAI_FU_TIME_MSG = function (self, data) {
        Model_GlobalMsg.kaiFuTime = data.readLong();
    };
    /**
     * 260 B-U GC后端返回提示字符串 B:1系统提示2GM热更U:内容
     */
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_PROMPT = function (self, data) {
        var type = data.readByte();
        var content = data.readUTF();
        if (type == 1) {
            ViewCommonWarn.text(content);
        }
        else if (type == 2) {
            ViewCommonWarn.text(content);
        }
        else if (type == 3) {
            Model_GlobalMsg.serverVersion = content;
            return;
        }
        else if (type == 4) {
            GGlobal.layerMgr.open(UIConst.TIP_STRING, content);
        }
    };
    /**
     * 168
     * U
    */
    Model_GlobalMsg.prototype.GC_SERVER_VERSION = function (s, d) {
        GGlobal.serverVer = d.readUTF();
    };
    /**
     * 158
     * [I-I]
     * 发送玩法活动系统状态 [I:系统idI:活动状态 0 未开启 1准备 2开启中]系统状态数据
    */
    Model_GlobalMsg.prototype.GC_ACTIVITY_STATE = function (s, d) {
        var l = d.readShort();
        for (var i = 0; i < l; i++) {
            var c = d.readInt();
            var st = d.readInt();
            s.data.push([c, st]);
        }
        if (GGlobal.isEnterGame) {
            s.delayAddIcon();
        }
        else {
            GGlobal.modelLogin.handList.push(Handler.create(s, s.delayAddIcon));
        }
    };
    Model_GlobalMsg.prototype.delayAddIcon = function () {
        var ctr = GGlobal.control;
        var s = this;
        var l = s.data.length;
        while (s.data.length) {
            ctr.notify(Enum_MsgType.ADD_ACTIVITYICON, s.data.shift());
        }
    };
    /**
     * 160
     *  [I-[I-B]]
     * 发送系统红点 [I:系统id[I:系统功能编号B:红点状态]系统功能红点数据]系统红点数据
    */
    Model_GlobalMsg.prototype.GC_REDDOT = function (s, d) {
        // let ctr = GGlobal.control;
        // let data = d.readFmt([["I",["I","B"]]]);
        // console.log("登录红点数据"+data);
        // GGlobal.control.notify(Enum_MsgType.REDDOT_NOTICE, data);
        var ctr = GGlobal.control;
        var data = [];
        var len = d.readShort();
        for (var i = 0; i < len; i++) {
            data[i] = [];
            var id = d.readInt();
            data[i].push(id);
            var size = d.readShort();
            var child = [];
            for (var j = 0; j < size; j++) {
                child[j] = [];
                child[j].push(d.readInt());
                child[j].push(d.readByte());
            }
            data[i].push(child);
        }
        GGlobal.control.notify(Enum_MsgType.REDDOT_NOTICE, data);
        // s.otherMethod(s, d);
    };
    Model_GlobalMsg.prototype.CG3741 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(3741, bytes);
    };
    Model_GlobalMsg.prototype.GC3742 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            var type = bytes.readByte();
            switch (type) {
                case 1:
                    // GGlobal.control.notify(Enum_MsgType.WUJIANG_UPJIE_UPDATE);
                    break;
                case 2:
                    // Model_ZhanJia.jieShu++;
                    // GGlobal.control.notify(Enum_MsgType.ZHANJIA_UP_SUIT);
                    break;
                case 3:
                    // Child_BaoWu.nickVo.starLv++;
                    GGlobal.reddot.notify(ReddotEvent.CHECK_BAOWU);
                    break;
                case 4:
                    // GGlobal.modeltianshu.CG_OPENUI_971();
                    GGlobal.control.notify(Enum_MsgType.MSG_TS_LEVELUP);
                    break;
                case 5:
                    // View_ShenJian_Panel.nickVo.starLv++;
                    // GGlobal.control.notify(ReddotEvent.CHECK_SHENJIAN);
                    break;
                case 6:
                    // ChildBingFa.nickVo.star++;
                    // GGlobal.modelBingFa.notify(Model_BingFa.LVLUP);
                    break;
                case 7:
                    // View_YB_Panel.nickVo.starLv++;
                    // GGlobal.reddot.notify(ReddotEvent.CHECK_YIBAO);
                    break;
            }
            GGlobal.layerMgr.close(UIConst.ZHISHENGDAN);
        }
        else {
            ViewCommonWarn.text(["系统未开启", "", "直升丹数量不足!", "参数错误!"][state]);
        }
    };
    /***
     * 172 显示更新公告按钮
     **/
    Model_GlobalMsg.prototype.GC_NOTICE_172 = function (self, bytes) {
        if (GGlobal.main.isNewRole) {
            self.CG_NOTICE_173();
            return; //创角不允许弹出公告
        }
        GGlobal.mainUICtr.addTipBTN(UIConst.WELFARE_NOTICE);
    };
    /***
     * 173 打开公告
     **/
    Model_GlobalMsg.prototype.CG_NOTICE_173 = function () {
        this.sendSocket(173, this.getBytes());
    };
    Model_GlobalMsg.prototype.GC_SHARE_STATE = function (self, bytes) {
        self.share_st = bytes.readByte();
    };
    Model_GlobalMsg.decode = function (data) {
        // Model_GlobalMsg.chatLevel = data.chatLevel;
        Model_GlobalMsg.rename = Number(data.rename) > 0;
        Model_GlobalMsg.resVer = data.resVer;
        Model_GlobalMsg.resArr = data.resArr;
    };
    /**根据ID判断请求活动数据或者系统数据 */
    Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA = function (sysID) {
        var cfg = Config.xitong_001[sysID];
        if (cfg.or == 0) {
            GGlobal.modelEightLock.CG4571(sysID);
        }
        else {
            GGlobal.modelActivity.CG_OPENACT(sysID);
        }
    };
    Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE = "MSG_GLOBAL_SERVER_TIME_UPDATE";
    /**副本场景中点击了退出按钮 */
    Model_GlobalMsg.MSG_EXIT_FUBEN = "MSG_EXIT_FUBEN";
    /**退出战报场景 */
    Model_GlobalMsg.MSG_EXIT_PVPFIGHT = "MSG_EXIT_PVPFIGHT";
    Model_GlobalMsg.serverTime = 0;
    Model_GlobalMsg.updateTime = 0;
    Model_GlobalMsg.kaifuDay = 0; //开服天数
    Model_GlobalMsg.selectID = 0;
    Model_GlobalMsg.actPreviewId = 0;
    Model_GlobalMsg.actPreviewTime = 0;
    /**ios开启关卡数 */
    Model_GlobalMsg.ios_open = 0;
    Model_GlobalMsg.rankData = [];
    Model_GlobalMsg.headData = [];
    Model_GlobalMsg.firstJob = 0;
    Model_GlobalMsg.myCount = 0;
    Model_GlobalMsg.myRank = 0;
    Model_GlobalMsg.endTime = 0;
    Model_GlobalMsg.sysID = 0;
    Model_GlobalMsg.sysType = 0;
    // static chatLevel = 1;
    Model_GlobalMsg.rename = true; //是否可以改名
    return Model_GlobalMsg;
}(BaseModel));
__reflect(Model_GlobalMsg.prototype, "Model_GlobalMsg");
