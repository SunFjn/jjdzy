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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewJBP = (function (_super) {
    __extends(ViewJBP, _super);
    function ViewJBP() {
        var _this = _super.call(this) || this;
        _this.setSkin("jubaopeng", "jubaopeng_atlas0", "ViewJBP");
        return _this;
    }
    ViewJBP.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(JuBaoPIt.URL, JuBaoPIt);
    };
    ViewJBP.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.tabArr = [s.t0, s.t1, s.t3, s.t2];
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itemRender;
        s.lst.setVirtual();
        s.frame.icon = "ui://fr83a88vcct45";
    };
    ViewJBP.prototype.itemRender = function (i, obj) {
        var item = obj;
        var type = this.c1.selectedIndex + 1;
        item.setdata(this.lstDta[i], type, this.isBuy);
    };
    ViewJBP.prototype.buyHandler = function () {
        var type = this.c1.selectedIndex + 1;
        var lib = Config.jbpbuy_718[type];
        var money = lib.COIN;
        var vip = lib.VIP;
        if (GGlobal.modelvip.vip < vip) {
            ViewCommonWarn.text("VIP等级不足");
            return;
        }
        var self = this;
        var na = "<font color='#FF00FF'>" + lib.name + "</font>";
        if (self.c1.selectedIndex >= 2) {
            var cfg1 = Config.shop_011[lib.cz];
            var rmb = cfg1.rmb;
            na = "是否花费<font color='#ffc334'>" + rmb / 100 + "元</font>购买" + na + "？";
            GGlobal.modelchongzhi.CG_CHONGZHI_135(lib.cz, na);
            return;
        }
        na = "是否花费<font color='#ffc334'>" + money + "元宝</font>购买" + na + "？";
        ViewAlert.show(na, Handler.create(this, this.buyHd), ViewAlert.OKANDCANCEL);
    };
    ViewJBP.prototype.buyHd = function () {
        var type = this.c1.selectedIndex + 1;
        var lib = Config.jbpbuy_718[type];
        var money = lib.COIN;
        if (Model_player.voMine.yuanbao < money) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelJBP.CG_BUY(type);
    };
    ViewJBP.prototype.update = function () {
        var s = this;
        var type = s.c1.selectedIndex + 1;
        var m = GGlobal.modelJBP;
        if (!m.actDta)
            return;
        s.isBuy = m.packDta.indexOf(type) >= 0;
        s.g0.visible = !s.isBuy;
        var lib = Config.jbpbuy_718[type];
        s.lbCondition.text = "VIP" + lib.VIP + "可购买";
        s.lbCondition.color = GGlobal.modelvip.vip < lib.VIP ? Color.REDINT : Color.GREENINT;
        var myvip = Model_player.voMine.viplv;
        var cfg = Config.jbpbuy_718[type];
        var vip = cfg.VIP;
        s.btn.checkNotice = myvip >= vip;
        s.lstDta = m.actDta[type - 1];
        s.lst.numItems = s.lstDta.length;
        IconUtil.setImg(s.pic, Enum_Path.BACK_URL + lib.PICTURE + ".jpg");
        s.check();
    };
    ViewJBP.prototype.check = function () {
        var self = this;
        var s = GGlobal.modelJBP;
        if (!s.red)
            return;
        for (var i in s.red) {
            if (s.red[i] == true) {
                self.tabArr[i].checkNotice = true;
            }
            else {
                self.tabArr[i].checkNotice = false;
            }
        }
    };
    ViewJBP.prototype.onTabHandler = function () {
        var self = this;
        self.btn.text = ["购买", "购买", "648元", "198元"][self.c1.selectedIndex];
        self.lst.scrollToView(0);
        self.update();
    };
    ViewJBP.prototype.onShown = function () {
        var s = this;
        var self = this;
        s.c1.selectedIndex = 0;
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.onTabHandler, s);
        self.btn.text = ["购买", "购买", "198元", "648元"][s.c1.selectedIndex];
        GGlobal.modelJBP.CG_OPEN();
        GGlobal.control.listen(Enum_MsgType.JUBAOPENG, s.update, s);
        s.btn.addClickListener(s.buyHandler, s);
    };
    ViewJBP.prototype.onHide = function () {
        var s = this;
        s.lst.numItems = 0;
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.onTabHandler, s);
        IconUtil.setImg(s.pic, null);
        s.btn.removeClickListener(s.buyHandler, s);
        GGlobal.control.remove(Enum_MsgType.JUBAOPENG, s.update, s);
        GGlobal.layerMgr.close(UIConst.JUBAOPENG);
    };
    ViewJBP.URL = "ui://fr83a88vs8ql0";
    return ViewJBP;
}(UIPanelBase));
__reflect(ViewJBP.prototype, "ViewJBP");
