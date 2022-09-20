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
var ModelShare = (function (_super) {
    __extends(ModelShare, _super);
    function ModelShare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statesDic = {};
        return _this;
    }
    ModelShare.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(2700, self.GC2700, self);
        wsm.regHand(2702, self.GC2702, self);
    };
    /**获取领取状态 0不可领 1可以领取 2已经领取*/
    ModelShare.prototype.GC2700 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.statesDic[bytes.readByte()] = bytes.readByte();
        }
        self.notify(ModelShare.msg_datas);
    };
    /**领取分享奖励 */
    ModelShare.prototype.CG2701 = function (cfgId) {
        var bytes = this.getBytes();
        bytes.writeByte(cfgId);
        this.sendSocket(2701, bytes);
    };
    ModelShare.prototype.GC2702 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 0) {
            var cfgId = bytes.readByte();
            self.statesDic[cfgId] = 2;
            self.notify(ModelShare.msg_datas);
        }
        else {
            if (self.statesDic[1] == 2) {
                ViewCommonWarn.text("您已领取了该奖励");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    ModelShare.msg_datas = "msg_datas";
    return ModelShare;
}(BaseModel));
__reflect(ModelShare.prototype, "ModelShare");
