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
var Model_Shop = (function (_super) {
    __extends(Model_Shop, _super);
    function Model_Shop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_Shop.checkVipShop = function () {
        var arr = Model_Shop.shopArr[2];
        if (arr) {
            var len = arr.length;
            var vomine = Model_player.voMine;
            for (var i = 0; i < len; i++) {
                var vo = arr[i];
                if ((vo.condition.length <= 0 || vo.condition[0][1] <= vomine.viplv) && vo.buyNum < vo.time) {
                    return true;
                }
            }
        }
        return false;
    };
    /**5253	打开界面 */
    Model_Shop.prototype.CG_OPEN_QUICKBUY_5253 = function () {
        this.sendSocket(5253, new BaseBytes());
    };
    /**5251	购买商品 I:商品idI:购买数量 */
    Model_Shop.prototype.CG_QUICKBUY_BUY_5251 = function (id, count) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        ba.writeInt(count);
        this.sendSocket(5251, ba);
    };
    /**1181 打开商城界面 B:商店类  */
    Model_Shop.prototype.CG_OPEN_SHOP = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1181, ba);
    };
    /**1183 刷新商店 B:商店类型   */
    Model_Shop.prototype.CG_SHOP_REFRESH = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1183, ba);
    };
    /**1185 购买商品 B:商店类型I:商品索引idI:购买次数（预留字段）   */
    Model_Shop.prototype.CG_SHOP_BUYITEM = function (type, id, num) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        ba.writeInt(num);
        this.sendSocket(1185, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_Shop.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1182, this.GC_OPEN_SHOP, this);
        wsm.regHand(1186, this.GC_SHOP_BUYITEM, this);
        wsm.regHand(5254, this.GC_OPEN_QUICKBUY_5254, this);
        wsm.regHand(5252, this.GC_QUICKBUY_BUY_5252, this);
    };
    /**5252	购买结果返回 B:结果：0：失败，1：成功I:失败：（1：达到今天限购数量），成功：商品idI:今日已购数量 */
    Model_Shop.prototype.GC_QUICKBUY_BUY_5252 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var count = data.readInt();
            Model_Shop.buyArr[id] = count;
            ViewCommonWarn.text("购买成功");
        }
        else {
        }
    };
    /**5254	返回界面信息 [I:购买idI:已购买数量]已购买信息 */
    Model_Shop.prototype.GC_OPEN_QUICKBUY_5254 = function (self, data) {
        View_QuickBuy_Panel.isFirt = false;
        Model_Shop.buyArr = {};
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readInt();
            var count = data.readInt();
            Model_Shop.buyArr[id] = count;
        }
        View_QuickBuy_Panel.show(null, View_QuickBuy_Panel.ct);
    };
    /**1186 购买结果 B:0：失败，1：成功B:商店类型I:失败：错误码（1：商品不存在，2：vip等级不足，3：达购买上限，4：背包满，5：货币不足），成功：商品索引idI:已购买数量  */
    Model_Shop.prototype.GC_SHOP_BUYITEM = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var id = data.readInt();
            var buyNum = data.readInt();
            var len = Model_Shop.shopArr[type - 1].length;
            for (var j = 0; j < len; j++) {
                var vo = Model_Shop.shopArr[type - 1][j];
                if (id == vo.id) {
                    vo.buyNum = buyNum;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.SHOP_UPDATE);
        }
    };
    /**1182 商店数据返回 [B:商店类型[I:商品索引idB:商品格子位置I:已购买次数]商品数据]商店数据 */
    Model_Shop.prototype.GC_OPEN_SHOP = function (self, data) {
        Model_Shop.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            Model_Shop.shopArr[type - 1] = [];
            var len1 = data.readShort();
            for (var j = 0; j < len1; j++) {
                var id = data.readInt();
                var pos = data.readByte();
                var buyNum = data.readInt();
                var vo = Vo_Shop.create(id);
                vo.pos = pos;
                vo.buyNum = buyNum;
                Model_Shop.shopArr[type - 1].push(vo);
            }
            Model_Shop.shopArr[type - 1].sort(Model_Shop.sortShop);
        }
        GGlobal.control.notify(Enum_MsgType.SHOP_UPDATE);
    };
    Model_Shop.sortShop = function (a, b) {
        if (a.pos == b.pos) {
            return a.id - b.id;
        }
        else {
            return a.pos - b.pos;
        }
    };
    Model_Shop.itemID = 410040;
    Model_Shop.shopArr = [];
    Model_Shop.buyArr = {};
    Model_Shop.isFirstOpen = false;
    return Model_Shop;
}(BaseModel));
__reflect(Model_Shop.prototype, "Model_Shop");
