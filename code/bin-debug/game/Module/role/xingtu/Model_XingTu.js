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
var Model_XingTu = (function (_super) {
    __extends(Model_XingTu, _super);
    function Model_XingTu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_XingTu.checkXingTuNotice = function () {
        var ret = false;
        for (var i = 0; i < Model_XingTu.xingtuArr.length; i++) {
            var cfg = Model_XingTu.xingtuArr[i];
            ret = Model_XingTu.checkTabNotice(cfg.type);
            if (ret)
                break;
        }
        return ret;
    };
    Model_XingTu.checkTabNotice = function (type) {
        var cfg1 = Model_XingTu.xingtuArr[type - 1];
        if (Model_player.voMine.zsID >= cfg1.condition) {
            var xingtuID = Model_XingTu.xingtuIDArr[type - 1];
            var cfg = Config.xingtu_706[xingtuID];
            var costArr = JSON.parse(cfg.need);
            if (cfg.next > 0 && Model_player.voMine.xinghun >= costArr[0][2]) {
                return true;
            }
        }
        return false;
    };
    Model_XingTu.getXingTuArr = function () {
        if (Model_XingTu.xingtuArr.length <= 0) {
            for (var i = 1; i < 8; i++) {
                var cfg = Config.xingtujh_706[i];
                Model_XingTu.xingtuArr.push(cfg);
                Model_XingTu.xingtuIDArr.push(i * 100000);
            }
        }
    };
    /*921  打开星图 */
    Model_XingTu.prototype.CG_OPEN_XINGTU = function () {
        var ba = new BaseBytes();
        this.sendSocket(921, ba);
    };
    /*923 星图升级 B:星图类型  */
    Model_XingTu.prototype.CG_XINGTU_UPGRADE = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(923, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_XingTu.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(922, this.GC_OPEN_XINGTU, this);
        wsm.regHand(924, this.GC_XINGTU_UPGRADE, this);
    };
    /**924 星图升级结果 B:0:失败，1：成功I:失败：错误码（1:达到最高级，2：未达开启条件，3：材料不足），成功：星图id   */
    Model_XingTu.prototype.GC_XINGTU_UPGRADE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var type = Math.floor(id / 100000);
            Model_XingTu.xingtuIDArr[type - 1] = id;
            GGlobal.control.notify(Enum_MsgType.XINGTU_DATA_UPDATE);
        }
    };
    /**922 星图信息返回 [I:星图id]星图信息  */
    Model_XingTu.prototype.GC_OPEN_XINGTU = function (self, data) {
        Model_XingTu.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            if (id <= 0)
                continue;
            var type = Math.floor(id / 100000);
            Model_XingTu.xingtuIDArr[type - 1] = id;
        }
        GGlobal.control.notify(Enum_MsgType.XINGTU_DATA_UPDATE);
    };
    Model_XingTu.xingtuIDArr = [];
    Model_XingTu.xingtuArr = [];
    Model_XingTu.isFirstOpen = false;
    return Model_XingTu;
}(BaseModel));
__reflect(Model_XingTu.prototype, "Model_XingTu");
