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
 * 双12商城管理器
 * @author: lujiahao
 * @date: 2019-11-28 10:15:47
 */
var ModelShop12 = (function (_super) {
    __extends(ModelShop12, _super);
    function ModelShop12() {
        var _this = _super.call(this) || this;
        _this._shopVoMap = {};
        /** 购物车map表 */
        _this.shopCartMap = {};
        _this._shopCartChangeFlag = false;
        _this._setupFlag = false;
        _this._shopCartList = [];
        _this._shopVoListMap = {};
        _this._discountListMap = {};
        return _this;
    }
    ModelShop12.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.s12sc_771;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoShop12();
                t_vo.id = t_id;
                this._shopVoMap[t_id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelShop12.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10700, this.GC_DoubleTwelveShop_openUI_10700, this);
        mgr.regHand(10702, this.GC_DoubleTwelveShop_buyItems_10702, this);
    };
    /**10700 [I-I] 打开界面返回 [I:商品idI:商品可购买次数] 商品列表itemInfos*/
    ModelShop12.prototype.GC_DoubleTwelveShop_openUI_10700 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt();
            var arg2 = data.readInt();
            var t_vo = self.getShopVoById(arg1);
            if (t_vo && t_vo.update({ buyCount: arg2 })) {
                t_change = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SHOP12_UPDATE);
        }
    };
    /**10701 [I-I] 购买商品 [I:商品idI:购买数量]商品信息itemInfos*/
    ModelShop12.prototype.CG_DoubleTwelveShop_buyItems_10701 = function () {
        var t = this;
        var t_goodList = [];
        for (var k in t.shopCartMap) {
            var t_id = ~~k;
            var t_count = t.shopCartMap[k];
            if (t_count > 0)
                t_goodList.push([t_id, t_count]);
        }
        var bates = this.getBytes();
        var len = t_goodList.length;
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            bates.writeInt(t_goodList[i][0]);
            bates.writeInt(t_goodList[i][1]);
        }
        this.sendSocket(10701, bates);
    };
    /**10702 B 购买商品返回 B:状态:0-成功,1-失败state*/
    ModelShop12.prototype.GC_DoubleTwelveShop_buyItems_10702 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0:
                //成功购买后重新请求数据
                GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SHOP12);
                //购买成功后清空购物车
                self.clearShopCart();
                break;
            case 1:
                ViewCommonWarn.text("配置不存在");
                break;
            case 2:
                ViewCommonWarn.text("已达限购次数");
                break;
            case 3:
                ViewCommonWarn.text("抵金券不足");
                break;
            case 4:
                ViewCommonWarn.text("元宝不足");
                break;
            case 5:
                ViewCommonWarn.text("参数错误");
                break;
        }
    };
    //=========================================== API ==========================================
    /**
     * 添加进购物车
     * @param pId
     * @param pCount
     */
    ModelShop12.prototype.addToShopCart = function (pId, pCount) {
        var t = this;
        var t_oldCount = ~~t.shopCartMap[pId];
        if (t_oldCount != pCount) {
            t.shopCartMap[pId] = pCount;
            t._shopCartChangeFlag = true;
            GGlobal.control.notify(Enum_MsgType.SHOP12_CART_CHANGE);
        }
    };
    /** 清空购物车 */
    ModelShop12.prototype.clearShopCart = function () {
        var t = this;
        var t_change = false;
        for (var k in t.shopCartMap) {
            var t_old = t.shopCartMap[k];
            if (t_old != 0) {
                t.shopCartMap[k] = 0;
                t_change = true;
                t._shopCartChangeFlag = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SHOP12_CART_CLEAR);
        }
    };
    ModelShop12.prototype.getShopCartList = function () {
        var t = this;
        if (t._shopCartChangeFlag) {
            t._shopCartChangeFlag = false;
            t._shopCartList.length = 0;
            for (var k in t.shopCartMap) {
                var t_id = ~~k;
                var t_value = ~~t.shopCartMap[k];
                if (t_value > 0) {
                    t._shopCartList.push([t_id, t_value]);
                }
            }
        }
        return t._shopCartList;
    };
    /** 获取当前活动期数 */
    ModelShop12.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SHOP12);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    ModelShop12.prototype.getShopVoById = function (pId) {
        return this._shopVoMap[pId];
    };
    /** 获取商品数据列表 */
    ModelShop12.prototype.getShopVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._shopVoListMap[t_qs];
        if (t_list === undefined) {
            t._shopVoListMap[t_qs] = t_list = [];
            for (var k in t._shopVoMap) {
                var t_vo = t._shopVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    /** 获取优惠列表 */
    ModelShop12.prototype.getDiscountCfgList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._discountListMap[t_qs];
        if (t_list === undefined) {
            t._discountListMap[t_qs] = t_list = [];
            var t_cfg = Config.s12yh_771;
            for (var k in t_cfg) {
                if (t_cfg[k].qs == t_qs) {
                    t_list.push(t_cfg[k]);
                }
            }
        }
        return t_list;
    };
    return ModelShop12;
}(BaseModel));
__reflect(ModelShop12.prototype, "ModelShop12");
