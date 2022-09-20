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
var Model_TrueName = (function (_super) {
    __extends(Model_TrueName, _super);
    function Model_TrueName() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hours = 0;
        return _this;
    }
    /**发送实名身份证号 U:身份证号 */
    Model_TrueName.prototype.CGSEND_ID_CARD = function (card) {
        var bates = this.getBytes();
        bates.writeUTF(card);
        this.sendSocket(5291, bates);
    };
    /**发送实名身份证号 U:身份证号 */
    Model_TrueName.prototype.CGTRUE_NAME = function (name, card) {
        var bates = this.getBytes();
        bates.writeUTF(name);
        bates.writeUTF(card);
        this.sendSocket(5293, bates);
    };
    /**领奖 */
    Model_TrueName.prototype.CGGET_REWARD = function () {
        var bates = this.getBytes();
        this.sendSocket(5295, bates);
    };
    //协议处理
    Model_TrueName.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(5290, this.GCSWITCH_STATUS5290, this);
        mgr.regHand(5312, this.GC_NOTICE_5312, this);
        mgr.regHand(5296, this.GC_GET_REWARD_5296, this);
    };
    /**同步实名验证开关状态 B:开关状态：0：关闭，1：开启B:奖励领取状态：0：未领取，1：可领取，2：已领取 */
    Model_TrueName.prototype.GCSWITCH_STATUS5290 = function (self, data) {
        Model_TrueName.status = data.readByte();
        Model_TrueName.rewStatus = data.readByte();
        if (Model_TrueName.status == 0) {
            GGlobal.mainUICtr.removeIcon(UIConst.TRUE_NAME);
            GGlobal.layerMgr.close(UIConst.TRUE_NAME);
            GGlobal.layerMgr.close(UIConst.TRUE_NAME_ALERT);
            return;
        }
        if (HLSDK.whalePbSDK == null || HLSDK.whalePbSDK.userInfo == null) {
            Model_TrueName.status = 0;
            return;
        }
        var identity = HLSDK.whalePbSDK.userInfo.identity;
        if (identity == null || identity == "") {
            Model_TrueName.isIdentity = false;
            Model_TrueName.isChenMi = true;
        }
        else {
            self.setAgeInfo(identity);
            if (Model_TrueName.rewStatus != 2) {
                GGlobal.modelTrueName.CGSEND_ID_CARD(identity);
            }
        }
        if (!GGlobal.main.isNewRole) {
            Model_TrueName.openTureName();
        }
    };
    /**防沉迷通知 I:防沉迷在线时间 */
    Model_TrueName.prototype.GC_NOTICE_5312 = function (self, data) {
        if (Model_TrueName.status == 0) {
            return;
        }
        if (!Model_TrueName.isChenMi) {
            return;
        }
        var t = data.readInt(); //秒数
        var h = t / 60 / 60; //小时
        if (h < 0.5) {
            return;
        }
        else if (h < 1.5) {
            h = 1;
        }
        else if (h < 2.5) {
            h = 2;
        }
        else if (h < 3.2) {
            h = 3;
        }
        else if (h < 3.7) {
            h = 3.5;
        }
        else if (h < 4.2) {
            h = 4;
        }
        else if (h < 4.7) {
            h = 4.5;
        }
        else {
            h = 5;
        }
        var v = GGlobal.layerMgr.isOpenView1(UIConst.TRUE_NAME);
        self.hours = h;
        if (!v) {
            //已经打开界面
            Model_TrueName.getnewuser(Model_TrueName.freshIdentity1);
        }
    };
    //领取奖励结果 B:结果：0：失败，1：成功B:失败（1：未实名验证，2：已领取过）
    Model_TrueName.prototype.GC_GET_REWARD_5296 = function (self, data) {
        var res = data.readByte();
        var res1 = data.readByte();
        if (res == 1) {
            ViewCommonWarn.text("领取成功");
            Model_TrueName.rewStatus = 2;
            GGlobal.mainUICtr.removeIcon(UIConst.TRUE_NAME);
        }
        else {
            if (res1 == 1) {
                ViewCommonWarn.text("未实名验证");
            }
            else if (res1 == 2) {
                ViewCommonWarn.text("已领取过");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    Model_TrueName.prototype.openAlert = function () {
        if (Model_TrueName.isChenMi && this.hours > 0) {
            GGlobal.layerMgr.open(UIConst.TRUE_NAME_ALERT, this.hours);
            this.hours = 0;
        }
    };
    Model_TrueName.getAge = function (identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        }
        else {
            if ((len != 15) && (len != 18)) {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18) {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    Model_TrueName.prototype.uploadRealNameInfo = function (n, c) {
        if (HLSDK.whalePbSDK == null) {
            GGlobal.control.notify(Enum_MsgType.TRUE_NAME_CLOSE);
            return;
        }
        var s = this;
        var userInfo = {
            idcard: c,
            truename: n
        };
        HLSDK.whalePbSDK.authentication(userInfo, function (result) {
            if (result.status) {
                s.setAgeInfo(c);
                GGlobal.control.notify(Enum_MsgType.TRUE_NAME_CLOSE);
                if (Model_TrueName.isChenMi) {
                    ViewAlert.show("您的信息已登记，但您未满18周岁，仍处于防沉迷状态，请合理安排游戏时间。", null, ViewAlert.OK);
                    GGlobal.mainUICtr.removeIcon(UIConst.TRUE_NAME);
                }
                else {
                    GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD);
                }
            }
            else {
                ViewCommonWarn.text(result.message);
            }
        });
    };
    Model_TrueName.prototype.setAgeInfo = function (c) {
        Model_TrueName.isIdentity = true;
        var age = Model_TrueName.getAge(c);
        if (age < 18) {
            Model_TrueName.isChenMi = true;
        }
        else {
            Model_TrueName.isChenMi = false;
        }
    };
    Model_TrueName.openTureName = function () {
        if (Model_TrueName.status == 0) {
            GGlobal.mainUICtr.removeIcon(UIConst.TRUE_NAME);
            return;
        }
        if (!Model_TrueName.isIdentity) {
            GGlobal.layerMgr.open(UIConst.TRUE_NAME);
            GGlobal.mainUICtr.addIcon(UIConst.TRUE_NAME, false);
        }
        else if (!Model_TrueName.isChenMi && Model_TrueName.rewStatus != 2) {
            GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD); //奖励
            GGlobal.mainUICtr.addIcon(UIConst.TRUE_NAME, false);
        }
    };
    Model_TrueName.checkIdcard = function (idcard) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
        idcard = idcard + '';
        if (reg.test(idcard)) {
            if (idcard.length == 18) {
                var birthCheckReg = /^(18|19|20|21|22|23)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)$/;
                if (typeof area[idcard.substring(0, 2)] != 'undefined' && birthCheckReg.test(idcard.substring(6, 14))) {
                    return true;
                }
            }
            else if (idcard.length == 15) {
                var birthCheckReg = /^\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)$/;
                if (typeof area[idcard.substring(0, 2)] != 'undefined' && birthCheckReg.test(idcard.substring(6, 12))) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_TrueName.getnewuser = function (callback) {
        if (HLSDK.whalePbSDK == null) {
            callback(false);
            return;
        }
        HLSDK.whalePbSDK.getnewuser(callback);
    };
    Model_TrueName.freshIdentity = function (userInfo) {
        if (userInfo == false)
            return;
        var identity = userInfo.identity;
        if (identity == null || identity == "") {
            Model_TrueName.isIdentity = false;
            Model_TrueName.isChenMi = true;
        }
        else {
            GGlobal.modelTrueName.setAgeInfo(identity);
            GGlobal.modelTrueName.CGSEND_ID_CARD(identity);
        }
        if (Model_TrueName.isIdentity) {
            GGlobal.control.notify(Enum_MsgType.TRUE_NAME_CLOSE);
            if (!Model_TrueName.isChenMi && Model_TrueName.rewStatus != 2) {
                GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD);
            }
        }
    };
    Model_TrueName.freshIdentity1 = function (userInfo) {
        if (userInfo == false)
            return;
        var identity = userInfo.identity;
        if (identity == null || identity == "") {
            Model_TrueName.isIdentity = false;
            Model_TrueName.isChenMi = true;
        }
        else {
            GGlobal.modelTrueName.setAgeInfo(identity);
            GGlobal.modelTrueName.CGSEND_ID_CARD(identity);
        }
        if (Model_TrueName.isIdentity && !Model_TrueName.isChenMi) {
            if (Model_TrueName.rewStatus != 2) {
                GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD);
            }
        }
        else {
            GGlobal.layerMgr.open(UIConst.TRUE_NAME_ALERT, GGlobal.modelTrueName.hours);
            GGlobal.modelTrueName.hours = 0;
        }
    };
    //开关状态：0：关闭，1：开启
    Model_TrueName.status = 0;
    //奖励是否领取
    Model_TrueName.rewStatus = 0;
    //已经身份认证过了  true已经提交身份证信息了
    Model_TrueName.isIdentity = false;
    //防沉迷系统  true要开启防沉迷
    Model_TrueName.isChenMi = false;
    return Model_TrueName;
}(BaseModel));
__reflect(Model_TrueName.prototype, "Model_TrueName");
