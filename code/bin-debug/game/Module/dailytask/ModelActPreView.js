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
var ModelActPreView = (function (_super) {
    __extends(ModelActPreView, _super);
    function ModelActPreView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tsMsgArr = [];
        return _this;
    }
    ModelActPreView.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(4050, self.GC4050, self);
        wsm.regHand(4052, self.GC4052, self);
        //推送设置
        wsm.regHand(4054, self.GC4054, self);
        wsm.regHand(4056, self.GC4056, self);
        wsm.regHand(7502, self.GC7502, self);
    };
    Object.defineProperty(ModelActPreView, "datas", {
        get: function () {
            if (!this._datas || this._regDay != Model_GlobalMsg.kaifuDay) {
                this._regDay = Model_GlobalMsg.kaifuDay;
                this._datas.length = 0;
                var lib = Config.hdyl_259;
                for (var key in lib) {
                    var cfg = lib[key];
                    if (this.isSuitable(cfg)) {
                        if (cfg.sysid == 3703 && this._regDay == 1) {
                            continue;
                        }
                        this._datas.push(cfg);
                    }
                }
            }
            for (var i = this._datas.length - 1; i >= 0; i--) {
                var _data = this._datas[i];
                var selfDay = _data.kq;
                if (!(Model_GlobalMsg.kaifuDay >= selfDay)) {
                    this._datas.splice(i, 1);
                }
            }
            this._datas.sort(this.sort);
            return this._datas;
        },
        enumerable: true,
        configurable: true
    });
    ModelActPreView.sort = function (a, b) {
        var aSt = ModelActPreView.getState(a);
        var bSt = ModelActPreView.getState(b);
        return -aSt + bSt;
    };
    ModelActPreView.getState = function (data) {
        var begin = data.start.split(":");
        var end = data.end.split(":");
        var date = new Date(Model_GlobalMsg.getServerTime());
        var beginDate = new Date(Model_GlobalMsg.getServerTime());
        beginDate.setHours(begin[0]);
        beginDate.setMinutes(begin[1]);
        var endDate = new Date(Model_GlobalMsg.getServerTime());
        endDate.setHours(end[0]);
        endDate.setMinutes(end[1]);
        if (date.getTime() > endDate.getTime()) {
            return 0;
        }
        else if (date.getTime() < beginDate.getTime()) {
            return 1;
        }
        else {
            return 2;
        }
    };
    ModelActPreView.isSuitable = function (cfg) {
        if (!(typeof cfg == "number")) {
            if (cfg.day > 10) {
                var mDay = cfg.day % 10 >> 0;
                if (TimeUitl.isIn7Days()) {
                    return mDay == Model_GlobalMsg.kaifuDay && cfg.close == 0;
                }
                else {
                    return mDay == Model_GlobalMsg.kaifuDay;
                }
            }
            else {
                var date = new Date(Model_GlobalMsg.getServerTime());
                var week = date.getDay() == 0 ? 7 : date.getDay();
                if (TimeUitl.isIn7Days()) {
                    return cfg.day == week && cfg.close == 0;
                }
                else {
                    return cfg.day == week;
                }
            }
        }
    };
    /**打开UI */
    ModelActPreView.prototype.GC4050 = function (self, bytes) {
        ModelActPreView.gotSt = bytes.readByte();
        self.setIconNotice();
    };
    /**领取奖励 */
    ModelActPreView.prototype.CG4051 = function () { this.sendSocket(4051, this.getBytes()); };
    ModelActPreView.prototype.GC4052 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            ModelActPreView.gotSt = 1;
            self.setIconNotice();
            self.notify(ModelActPreView.msg_datas);
        }
    };
    ModelActPreView.prototype.getNotice = function () {
        return !(ModelActPreView.gotSt == 1);
    };
    /**打开UI */
    ModelActPreView.prototype.GC4054 = function (self, bytes) {
        ModelActPreView.tSMsgSt = bytes.readByte();
        self.setIconNotice();
    };
    /**领取奖励 */
    ModelActPreView.prototype.CG4055 = function () { this.sendSocket(4055, this.getBytes()); };
    ModelActPreView.prototype.GC4056 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            ModelActPreView.tSMsgSt = 1;
            self.setIconNotice();
            self.notify(ModelActPreView.msg_tsmsg_red);
        }
    };
    ModelActPreView.prototype.getTSMsgNotice = function () {
        if (ChildTuiSongMsg.isOpenPf()) {
            return !(ModelActPreView.tSMsgSt == 1);
        }
        else {
            return false;
        }
    };
    ModelActPreView.prototype.setIconNotice = function () {
        var self = this;
        var red = GGlobal.reddot.checkCondition(UIConst.DAILYTASK) || self.getNotice() || self.getTSMsgNotice();
        GGlobal.mainUICtr.setIconNotice(UIConst.DAILYTASK, red);
    };
    //openUI
    ModelActPreView.prototype.CG7501 = function () { this.sendSocket(7501, this.getBytes()); };
    ModelActPreView.prototype.GC7502 = function (self, bytes) {
        var len = bytes.readShort();
        self.tsMsgArr = [];
        for (var i = 0; i < len; i++) {
            self.tsMsgArr.push({ tag: bytes.readInt(), status: bytes.readByte() });
        }
        self.notify(ModelActPreView.msg_tsMsg);
    };
    //推送设置
    ModelActPreView.prototype.CG7503 = function (arr) {
        if (arr == null || arr.length == 0)
            return;
        var b = this.getBytes();
        b.writeShort(arr.length);
        for (var i = 0; i < arr.length; i++) {
            b.writeInt(arr[i].tag);
            b.writeByte(arr[i].status);
        }
        this.sendSocket(7503, b);
    };
    ModelActPreView.msg_datas = "msg_datas";
    ModelActPreView.msg_tsMsg = "msg_tsMsg";
    ModelActPreView.msg_tsmsg_red = "msg_tsmsg_red";
    ModelActPreView.msg_tsmsg_cge = "msg_tsmsg_cge";
    ModelActPreView._datas = [];
    ModelActPreView._regDay = -1;
    ModelActPreView.gotSt = 0;
    ModelActPreView.tSMsgSt = 0;
    return ModelActPreView;
}(BaseModel));
__reflect(ModelActPreView.prototype, "ModelActPreView");
