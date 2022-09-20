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
var Model_BaoKu = (function (_super) {
    __extends(Model_BaoKu, _super);
    function Model_BaoKu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_BaoKu.prototype.sortBaoKu = function (a, b) {
        return a.sortNum - b.sortNum;
    };
    /**2041 打开宝库界面 B:宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库  */
    Model_BaoKu.prototype.CG_OPEN_BAOKU = function (id) {
        var ba = new BaseBytes();
        ba.writeByte(id);
        this.sendSocket(2041, ba);
    };
    /**2043 兑换 I:宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库I:商品id  */
    Model_BaoKu.prototype.CG_BAOKU_DUIHUAN = function (id, itemId) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        ba.writeInt(itemId);
        this.sendSocket(2043, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_BaoKu.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(2042, this.GC_OPEN_BAOKU, this);
        wsm.regHand(2044, this.GC_BAOKU_DUIHUAN, this);
    };
    /**2044 兑换返回 B:状态，1：成功，2：宝库道具不足，3：商品已售罄，4：vip等级不足，5：商品不存在I:商品id  */
    Model_BaoKu.prototype.GC_BAOKU_DUIHUAN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var itemId = data.readInt();
            var cfg = Config.bkitem_236[itemId];
            var arr = Model_BaoKu.baoKuArr[cfg.bk - 1];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == itemId) {
                    arr[i].count++;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.BAOKU);
        }
    };
    /**2042 打开宝库界面返回 [I:商品idI:商品已购买次数]商品列表  */
    Model_BaoKu.prototype.GC_OPEN_BAOKU = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var itemId = data.readInt();
            var count = data.readInt();
            var vo = Vo_BaoKu.create(itemId);
            vo.count = count;
            if (i == 0) {
                Model_BaoKu.baoKuArr[vo.bk - 1] = [];
            }
            Model_BaoKu.baoKuArr[vo.bk - 1].push(vo);
        }
        for (var i = 0; i < Model_BaoKu.baoKuArr.length; i++) {
            if (Model_BaoKu.baoKuArr[i])
                Model_BaoKu.baoKuArr[i].sort(self.sortBaoKu);
        }
        GGlobal.control.notify(Enum_MsgType.BAOKU);
    };
    Model_BaoKu.baoKuArr = [];
    return Model_BaoKu;
}(BaseModel));
__reflect(Model_BaoKu.prototype, "Model_BaoKu");
