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
var Model_SevenDayLogin = (function (_super) {
    __extends(Model_SevenDayLogin, _super);
    function Model_SevenDayLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**1901 打开界面   */
    Model_SevenDayLogin.prototype.CG_OPEN_SEVENDAY_LOGIN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1901, ba);
    };
    /**1903 领取奖励 B:领取天数   */
    Model_SevenDayLogin.prototype.CG_SEVENDAY_LOGIN_DRAW = function (day) {
        var ba = new BaseBytes();
        ba.writeByte(day);
        this.sendSocket(1903, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_SevenDayLogin.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(1902, a.GC_OPEN_SEVENDAY_LOGIN, a);
        wsm.regHand(1904, a.GC_SEVENDAY_LOGIN_DRAW, a);
    };
    /**1904 领取奖励 B:领取状态，1：成功，2：领取天数不合法，3：重复领取B:当领取状态为成功时返回领取的天数  */
    Model_SevenDayLogin.prototype.GC_SEVENDAY_LOGIN_DRAW = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            var day = data.readByte();
            Model_SevenDayLogin.drawArr[day - 1] = day;
            GGlobal.control.notify(Enum_MsgType.SEVENDAY_LOGIN);
        }
        else {
        }
    };
    /**1902 打开界面 [B:已领取天数]领取天数列表B:登录天数  */
    Model_SevenDayLogin.prototype.GC_OPEN_SEVENDAY_LOGIN = function (self, data) {
        Model_SevenDayLogin.isFirstOpen = true;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var day = data.readByte();
            Model_SevenDayLogin.drawArr[day - 1] = day;
        }
        Model_SevenDayLogin.curDay = data.readByte();
        GGlobal.control.notify(Enum_MsgType.SEVENDAY_LOGIN);
    };
    Model_SevenDayLogin.curDay = 1;
    Model_SevenDayLogin.drawArr = [];
    Model_SevenDayLogin.isFirstOpen = false;
    return Model_SevenDayLogin;
}(BaseModel));
__reflect(Model_SevenDayLogin.prototype, "Model_SevenDayLogin");
