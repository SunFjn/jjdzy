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
/**
 * 主题消费数据管理
 */
var Model_ZTXL = (function (_super) {
    __extends(Model_ZTXL, _super);
    function Model_ZTXL() {
        var _this = _super.call(this) || this;
        _this.qs = 0;
        _this.rechargeNum = 0; //充值元宝
        _this.type = 0; //主题类型
        _this.expenditure = 0; //消费元宝
        _this.obj = {};
        return _this;
    }
    /**10301 CG 激活 B:主题类型 */
    Model_ZTXL.prototype.CG_ACTIVATION = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(10301, ba);
    };
    /**10303 CG 领取主题奖励 I:编号ID */
    Model_ZTXL.prototype.CG_GET_AWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10303, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ZTXL.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(10300, self.GC_OPEN_UI, self);
        wsm.regHand(10302, self.GC_ACTIVATION, self);
        wsm.regHand(10304, self.GC_GET_AWARD, self);
    };
    /**10300 GC	打开主题消费返回 I:充值元宝B:主题类型I:消费元宝[I:IDB:状态：0.条件不符 1.可领 2.已领] */
    Model_ZTXL.prototype.GC_OPEN_UI = function (s, data) {
        s.obj = {};
        s.rechargeNum = data.readInt();
        s.type = data.readByte();
        s.expenditure = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var status_1 = data.readByte();
            s.obj[id] = { id: id, status: status_1 };
        }
        GGlobal.control.notify(UIConst.ZTXF);
    };
    /**10302 GC	激活返回 B:状态：1.成功 2.参数错误 3.激活条件不足 4.已激活B:主题类型 */
    Model_ZTXL.prototype.GC_ACTIVATION = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.type = data.readByte();
            s.checkNoticeZTXF();
            GGlobal.control.notify(UIConst.ZTXF);
        }
    };
    /**10304 GC	领取主题奖励返回 B:状态：1.成功 2.背包已满 3.参数错误 4.该奖励已领 5.领取条件不足I:编号ID */
    Model_ZTXL.prototype.GC_GET_AWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            s.obj[id] = { id: id, status: 2 };
            s.checkNoticeZTXF();
            GGlobal.control.notify(UIConst.ZTXF);
        }
    };
    /**
     * 根据期数获取tabList数据
     */
    Model_ZTXL.prototype.getTabVOs = function (qs) {
        var arr = [];
        for (var key in Config.ztxfb_329) {
            var cfg = Config.ztxfb_329[key];
            if (cfg.qs == qs && cfg.yb <= 0) {
                arr.push(cfg);
            }
        }
        return arr;
    };
    /**
     * 根据期数和类型获取List数据
     */
    Model_ZTXL.prototype.getVosByLx = function (qs, lx) {
        var arr = [];
        for (var key in Config.ztxfb_329) {
            var cfg = Config.ztxfb_329[key];
            if (cfg.qs == qs && cfg.lx == lx) {
                var obj = this.obj[cfg.id];
                if (obj) {
                    arr.push(obj);
                }
                else {
                    var id = cfg.id;
                    var status_2 = 0;
                    if (cfg.yb <= 0 && cfg.lx == this.type) {
                        status_2 = 1;
                    }
                    else if (cfg.yb > 0 && cfg.lx == this.type && this.expenditure >= cfg.yb) {
                        status_2 = 1;
                    }
                    obj = { id: id, status: status_2 };
                    arr.push(obj);
                }
            }
        }
        return arr;
    };
    /**
     * 主题消费每个类型红点
     */
    Model_ZTXL.prototype.checkZTXFNoticeByType = function (qs, lx) {
        var bol = false;
        if (this.type > 0 && this.type != lx)
            return false;
        var needCharge = Config.xtcs_004[7630].num;
        if (this.type <= 0 && this.rechargeNum >= needCharge)
            return true;
        var arr = this.getVosByLx(qs, lx);
        var len = arr.length;
        var obj;
        for (var i = 0; i < len; i++) {
            obj = arr[i];
            if (obj.status == 1) {
                return true;
            }
        }
        return bol;
    };
    /**
     * 主题消费大图标红点红点
     */
    Model_ZTXL.prototype.checkNoticeZTXF = function () {
        var isNotice = false;
        var arr = this.getTabVOs(this.qs);
        var len = arr.length;
        var cfg;
        for (var i = 0; i < len; i++) {
            cfg = arr[i];
            if (this.checkZTXFNoticeByType(this.qs, cfg.lx)) {
                isNotice = true;
                break;
            }
        }
        var r = GGlobal.reddot;
        r.setCondition(UIConst.ZTXF, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    return Model_ZTXL;
}(BaseModel));
__reflect(Model_ZTXL.prototype, "Model_ZTXL");
