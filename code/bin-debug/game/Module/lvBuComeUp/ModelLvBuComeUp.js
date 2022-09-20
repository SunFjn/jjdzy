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
var ModelLvBuComeUp = (function (_super) {
    __extends(ModelLvBuComeUp, _super);
    function ModelLvBuComeUp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas = {}; //排名数据
        _this.awardGetInfo = {};
        _this.cfgHasInit = false;
        _this.curDatLen = 0;
        return _this;
    }
    ModelLvBuComeUp.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(2712, self.GC2712, self);
        wsm.regHand(2714, self.GC2714, self);
        wsm.regHand(2716, self.GC2716, self);
    };
    /**打开UI */
    ModelLvBuComeUp.prototype.CG2711 = function () { this.sendSocket(2711, this.getBytes()); };
    ModelLvBuComeUp.prototype.GC2712 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var paiming = bytes.readByte();
            var data = self.datas[paiming] || (self.datas[paiming] = {});
            data.name = bytes.readUTF();
            data.job = bytes.readInt();
            data.head = bytes.readInt();
            data.headBg = bytes.readInt();
            data.jiFen = bytes.readInt();
        }
        var gotInfo = {};
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            gotInfo[bytes.readByte()] = true;
        }
        self.paimingMine = bytes.readByte();
        self.jifenMine = bytes.readInt();
        self.prepareDatas();
        self.updateJLInfos(gotInfo);
        self.notify(ModelLvBuComeUp.msg_datas);
    };
    /**打开排行榜 */
    ModelLvBuComeUp.prototype.CG2713 = function () { this.sendSocket(2713, this.getBytes()); };
    ModelLvBuComeUp.prototype.GC2714 = function (self, bytes) {
        var datas = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var paiming = bytes.readByte();
            var name = bytes.readUTF();
            var jifen = bytes.readInt();
            datas.push([paiming, name, jifen]);
        }
        self.notify(ModelLvBuComeUp.msg_paiHang, datas);
    };
    /**领取奖励 */
    ModelLvBuComeUp.prototype.CG2715 = function (cfgId) {
        var bytes = this.getBytes();
        bytes.writeByte(cfgId);
        this.sendSocket(2715, bytes);
    };
    ModelLvBuComeUp.prototype.GC2716 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            var cfgId = bytes.readByte();
            var data = self.awardGetInfo[cfgId];
            if (data) {
                data.state = 2;
            }
            self.updateJLInfos();
            GGlobal.layerMgr.close2(UIConst.VIEWLBGETJL);
            self.notify(ModelLvBuComeUp.msg_single, data);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    ModelLvBuComeUp.prototype.updateJLInfos = function (gotIds) {
        var self = this;
        if (!self.cfgHasInit) {
            self.cfgHasInit = true;
            var lib = Config.lbjlpoint_250;
            for (var key in lib) {
                self.awardGetInfo[key] = { cfgId: key, jifen: lib[key].point, awards: lib[key].reward, state: 0 };
            }
        }
        var mineJifen = this.jifenMine;
        for (var key in self.awardGetInfo) {
            var hasGotId = gotIds && gotIds[key];
            var info = self.awardGetInfo[key];
            if (hasGotId) {
                info.state = 2;
            }
            else {
                if (info.state != 2) {
                    info.state = mineJifen >= info.jifen ? 1 : 0;
                }
            }
        }
    };
    ModelLvBuComeUp.prototype.prepareDatas = function () {
        var self = this;
        var lib = Config.lbjl_250;
        var lib2 = Config.lbjlpoint_250;
        if (this.curDatLen < Object.keys(lib).length) {
            for (var key in lib) {
                var cfg = lib[key];
                if (!self.datas[key]) {
                    var data = self.datas[key] = {};
                    data.headBg = null;
                    data.head = null;
                    data.jiFen = lib2[key].point;
                    data.job = null;
                    data.name = "虚位以待";
                    data.paiming = parseInt(key);
                    self.curDatLen++;
                }
            }
        }
    };
    ModelLvBuComeUp.prototype.canGetJLIndex = function () {
        var self = this;
        var cntGot = 0;
        var cntNotGot = -1;
        var len = Object.keys(self.awardGetInfo).length;
        for (var key in self.awardGetInfo) {
            var data = self.awardGetInfo[key];
            if (data.state == 1) {
                break;
            }
            else if (data.state == 0) {
                if (cntNotGot >= 0) {
                    cntNotGot = Math.min(cntNotGot, cntGot);
                }
                else {
                    cntNotGot = cntGot;
                }
            }
            cntGot++;
        }
        if (cntGot == len) {
            cntGot = cntNotGot;
        }
        var ret = Math.max(0, Math.min(cntGot, len - 4));
        return ret;
    };
    ModelLvBuComeUp.getMaxJL = function () {
        if (this._max) {
            return this._max;
        }
        var lib = Config.lbjlpoint_250;
        var targetKey;
        for (var key in lib) {
            targetKey = key;
        }
        return this._max = lib[targetKey].point;
    };
    ModelLvBuComeUp.msg_datas = "msg_datas";
    ModelLvBuComeUp.msg_paiHang = "msg_paiHang";
    ModelLvBuComeUp.msg_single = "msg_single";
    return ModelLvBuComeUp;
}(BaseModel));
__reflect(ModelLvBuComeUp.prototype, "ModelLvBuComeUp");
