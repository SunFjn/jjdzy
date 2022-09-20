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
var Model_ShouLing = (function (_super) {
    __extends(Model_ShouLing, _super);
    function Model_ShouLing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_ShouLing.checkTabNotice = function (type) {
        var ret = false;
        var cfg = Config.shoulin_704[Model_ShouLing.slArr[type]];
        if (cfg.next > 0) {
            var costArr = JSON.parse(cfg.consume);
            var count = Model_Bag.getItemCount(costArr[0][1]);
            if (count >= costArr[0][2])
                ret = true;
        }
        return ret;
    };
    /**851  请求界面信息   */
    Model_ShouLing.prototype.CG_OPEN_SHOULING = function () {
        var ba = new BaseBytes();
        this.sendSocket(851, ba);
    };
    /**853 兽灵升级 I:兽灵id   */
    Model_ShouLing.prototype.CG_UPGRADE_SHOULING = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(853, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ShouLing.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        // wsm.regHand(852, this.GC_OPEN_SHOULING, this);
        wsm.regHand(854, this.GC_UPGRADE_SHOULING, this);
    };
    /**854 升级兽灵结果 B:0：失败，1：成功I:失败：错误码；成功：兽灵id  */
    Model_ShouLing.prototype.GC_UPGRADE_SHOULING = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            Model_ShouLing.slArr[Math.floor(id / 1000) - 1] = id;
            GGlobal.control.notify(Enum_MsgType.SHOULING_DATA_UPDATE);
        }
    };
    /**852 返回兽灵信息 [I:兽灵id]兽灵数据  */
    Model_ShouLing.prototype.GC_OPEN_SHOULING = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            Model_ShouLing.slArr[Math.floor(id / 1000) - 1] = id;
        }
        GGlobal.control.notify(Enum_MsgType.SHOULING_DATA_UPDATE);
    };
    Model_ShouLing.isFirst = false;
    Model_ShouLing.slArr = [1000, 2000, 3000, 4000];
    return Model_ShouLing;
}(BaseModel));
__reflect(Model_ShouLing.prototype, "Model_ShouLing");
