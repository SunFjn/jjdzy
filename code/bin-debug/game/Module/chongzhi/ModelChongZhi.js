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
var ModelChongZhi = (function (_super) {
    __extends(ModelChongZhi, _super);
    function ModelChongZhi() {
        var _this = _super.call(this) || this;
        _this.normalMul = 0;
        return _this;
    }
    ModelChongZhi.guideToRecharge = function (callFun) {
        if (callFun === void 0) { callFun = null; }
        GGlobal.layerMgr.close2(UIConst.ALERT_BUY);
        setTimeout(function () {
            ViewAlert.show("元宝不足，是否前往充值？", Handler.create(this, function () {
                if (callFun) {
                    callFun.run();
                }
                ViewChongZhi.tryToOpenCZ();
            }), ViewAlert.OKANDCANCEL, "前往充值", "取消");
        }, 100);
    };
    /**充值调用
     * money 单位分
     * product_id 产品ID
     * product_name 产品名字
     * product_num 产品数量
    */
    ModelChongZhi.recharge = function (money, product_id, product_name, product_num) {
        if (product_num === void 0) { product_num = 1; }
        var loginArg = GGlobal.loginArg;
        var voMine = Model_player.voMine;
        // if (GGlobal.sdk) {
        // 	ModelChongZhi.payParams.money = money;
        // 	ModelChongZhi.payParams.product_id = product_id;
        // 	ModelChongZhi.payParams.product_name = product_name;
        // 	ModelChongZhi.payParams.product_num = product_num;
        // 	ModelChongZhi.payParams.app_server = loginArg.zoneid + "";  // 服务器
        // 	ModelChongZhi.payParams.role_level = voMine.level;
        // 	ModelChongZhi.payParams.role_name = voMine.name;
        // 	ModelChongZhi.payParams.passthrough_params = '';
        // } else {
        var cfg = Config.shop_011[product_id];
        var vomine = Model_player.voMine;
        var orderInfo = new Object();
        ModelChongZhi.orderInfo.productCode = GameConfig.productCode;
        ModelChongZhi.orderInfo.uid = GameConfig.uid;
        ModelChongZhi.orderInfo.username = GameConfig.username;
        ModelChongZhi.orderInfo.userRoleId = vomine.id;
        ModelChongZhi.orderInfo.userRoleName = vomine.name;
        ModelChongZhi.orderInfo.serverId = GGlobal.zone;
        ModelChongZhi.orderInfo.userServer = GGlobal.zoneName;
        ModelChongZhi.orderInfo.userLevel = vomine.level;
        ModelChongZhi.orderInfo.amount = Math.ceil(money / 100);
        ModelChongZhi.orderInfo.subject = cfg.name;
        ModelChongZhi.orderInfo.desc = cfg.explain;
        ModelChongZhi.orderInfo.callbackUrl = '';
        ModelChongZhi.orderInfo.extrasParams = "" + loginArg.zoneid + "_" + GameConfig.pf;
        ModelChongZhi.orderInfo.goodsId = product_id;
        ModelChongZhi.orderInfo.count = product_num;
        ModelChongZhi.orderInfo.quantifier = '个';
    };
    /**
     * 订单号 whiteList:0不是白名单 1是白名单
    */
    ModelChongZhi.chongzhi = function (order, whiteList, cfgid) {
        // if (GGlobal.sdk) {
        // 	if (ModelChongZhi.payParams.product_id != cfgid) {
        // 		ViewCommonWarn.text("订单数据错误");
        // 		return;
        // 	}
        // 	ModelChongZhi.payParams.cp_order_num = order;
        // 	if (whiteList == 1) {
        // 		ModelChongZhi.payParams.money = 100;
        // 	}
        // 	egret.log("充值数据" + JSON.stringify(ModelChongZhi.payParams));
        // 	GGlobal.sdk.payOrder(ModelChongZhi.payParams);
        // } else 
        if (ModelChongZhi.orderInfo.goodsId != cfgid) {
            ViewCommonWarn.text("订单数据错误");
            return;
        }
        ModelChongZhi.orderInfo.cpOrderNo = order;
        if (GameConfig.realTest == 1) {
            ModelChongZhi.orderInfo.amount = 1;
        }
        if (Model_UserData.isWhitePlayer) {
            ModelChongZhi.orderInfo.amount = 1;
        }
        HLSDK.payOrder(ModelChongZhi.orderInfo);
    };
    ModelChongZhi.prototype.listenServ = function (s) {
        var a = this;
        this.socket = s;
        s.regHand(138, a.GC_OPENCHONGZHI_138, a);
        s.regHand(136, a.GC_CHONGZHI_136, a);
    };
    /**
    * customTip:自定义提示文本
    * cfgId: 默认读取充值商品表的ID
    * customTip:自定义提示文本
    * isMsg:是否需要提示
    * customParam:与后端约定的参数内容(待定)
    */
    ModelChongZhi.prototype.CG_CHONGZHI_135 = function (cfgId, customTip, isMsg, customParam) {
        if (customTip === void 0) { customTip = null; }
        if (isMsg === void 0) { isMsg = true; }
        if (customParam === void 0) { customParam = ''; }
        var cfg1 = Config.shop_011[cfgId];
        var itemName = cfg1.name;
        var rmb = cfg1.rmb;
        var type = cfg1.clienttype;
        ModelChongZhi.recharge(rmb, cfgId, cfg1.name);
        if (isMsg) {
            if (!customTip) {
                customTip = "是否花费<font color='#15f234'>{0}元</font>购买{1}\n" +
                    "(金额计算至VIP经验)\n" +
                    "<font color='#FFC344'>(注意：特权卡计算入充值活动)</font>\n";
                customTip = BroadCastManager.reTxt(customTip, rmb / 100, itemName);
            }
            ViewAlert.show(customTip, Handler.create(this, this.RequestRechargeOrder, [[type, cfgId, customParam]]));
        }
        else {
            this.RequestRechargeOrder([type, cfgId, customParam]);
        }
    };
    /**
     * 135 I-I
    * 请求充值 I:充值类型 1元宝 2特权卡 6尊贵周卡  I:对应充值项id U 与后端约定的参数内容(待定)
    * 返回订单号
    */
    ModelChongZhi.prototype.RequestRechargeOrder = function (arg) {
        var b = this.getBytes();
        b.writeInt(arg[0]);
        b.writeInt(arg[1]);
        b.writeUTF(arg[2]);
        this.sendSocket(135, b, true);
    };
    /**
     * 136 	B-U
     * 申请充值返回 B:返回 1：成功，2：充值未开放U:订单信息B:0不是白名单 1是白名单
    */
    ModelChongZhi.prototype.GC_CHONGZHI_136 = function (s, b) {
        var r = b.readByte();
        if (r == 1) {
            var code = b.readUTF();
            var whiteList = b.readByte();
            var cfgid = b.readInt();
            ModelChongZhi.chongzhi(code, whiteList, cfgid);
        }
        else {
            ViewCommonWarn.text("充值系统维护中");
        }
    };
    /**137
    *打开充值界面
    */
    ModelChongZhi.prototype.CG_OPENCHONGZHI_137 = function () {
        var b = this.getBytes();
        this.sendSocket(137, b);
    };
    /**
     * 138 	B-I-[I-B]
     * 返回充值界面数据 B:vip等级I:vip经验[I:充值额度IDB:剩余次数（满足送5倍）]5倍返利信息
    */
    ModelChongZhi.prototype.GC_OPENCHONGZHI_138 = function (s, b) {
        var v = GGlobal.modelvip;
        v.setVip(b.readByte());
        v.exp = b.readInt();
        s.data = b.readFmt([["I", "I"]])[0];
        var len = s.data.length;
        s.data[len - 1] = [0, 350];
        s.data[len - 2] = [0, 320];
        GGlobal.control.notify(Enum_MsgType.CHONGZHIOPEN);
    };
    ModelChongZhi.payParams = {};
    ModelChongZhi.orderInfo = {};
    return ModelChongZhi;
}(BaseModel));
__reflect(ModelChongZhi.prototype, "ModelChongZhi");
