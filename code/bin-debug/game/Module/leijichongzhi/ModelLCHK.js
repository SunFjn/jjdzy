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
var ModelLCHK = (function (_super) {
    __extends(ModelLCHK, _super);
    function ModelLCHK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas = {};
        _this.money = 0;
        return _this;
    }
    ModelLCHK.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(4392, this.GC4392, this);
        wsm.regHand(4394, this.GC4394, this);
    };
    /**打开UI */
    ModelLCHK.prototype.CG4391 = function () { this.sendSocket(4391, this.getBytes()); };
    ModelLCHK.prototype.GC4392 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var id = bytes.readInt();
            self.datas[id] = bytes.readByte(); //0:未达到，1:可领取，2:已领取
        }
        self.money = bytes.readInt();
        var canGetId = self.canGetId();
        GGlobal.reddot.setCondition(UIConst.LCHK, 0, self.datas[canGetId] == 1);
        GGlobal.reddot.notify(UIConst.LCHK);
        self.notify(ModelLCHK.msg_datas);
    };
    /**领取奖励 */
    ModelLCHK.prototype.CG4393 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4393, bytes);
    };
    ModelLCHK.prototype.GC4394 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            bytes.readInt(); //清掉字节数组里最后一个int(没有用)
            self.CG4391(); //拉数据刷新
        }
        else {
            //B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
            ViewCommonWarn.text(["没有该奖励", "", "未达条件", "已领取"][state]);
        }
    };
    ModelLCHK.prototype.canGetId = function () {
        for (var key in this.datas) {
            if (this.datas[key] == 1) {
                return key;
            }
        }
        return this.minNonGet();
    };
    ModelLCHK.prototype.minNonGet = function () {
        for (var key in this.datas) {
            if (this.datas[key] == 0) {
                return key;
            }
        }
        return null;
    };
    ModelLCHK.msg_datas = "msg_datas";
    return ModelLCHK;
}(BaseModel));
__reflect(ModelLCHK.prototype, "ModelLCHK");
