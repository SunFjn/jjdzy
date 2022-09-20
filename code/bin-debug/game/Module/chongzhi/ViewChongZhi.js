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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewChongZhi = (function (_super) {
    __extends(ViewChongZhi, _super);
    function ViewChongZhi() {
        var _this = _super.call(this) || this;
        _this.setSkin("chongzhi", "chongzhi_atlas0", "ViewChongZhi");
        return _this;
    }
    ViewChongZhi.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChongZhiItem.URL, ChongZhiItem);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemChongZhi.URL, ItemChongZhi);
        // fairygui.UIObjectFactory.setPackageItemExtension(TeQuanCardIt.URL, TeQuanCardIt);
    };
    ViewChongZhi.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.lst.callbackThisObj = self;
        self.lst.itemRenderer = self.render;
        self.frame.setTitle("ui://42zxp7qjr6t614");
        GGlobal.modelchongzhi.normalMul = Config.xtcs_004[3701].num;
    };
    ViewChongZhi.prototype.displayList = function () {
        if (!this.dta) {
            var lib = Config.chongzhi_716;
            var arr = [];
            for (var key in lib) {
                arr.push(lib[key]);
            }
            this.lst.numItems = (this.dta = arr).length;
        }
        else {
            this.lst.numItems = this.dta.length;
        }
    };
    ViewChongZhi.prototype.render = function (index, item) {
        item.setdata(this.dta[index], index);
    };
    ViewChongZhi.prototype.onUpdate = function () {
        this.displayList();
        this.update();
        // let m = GGlobal.modelchongzhi;
        // let d = m.data;
        // if (d) {
        // 	this.dta = d;
        // 	this.lst.numItems = d.length;
        // }
    };
    ViewChongZhi.prototype.update = function () {
        var v = GGlobal.modelvip;
        var vip = v.vip + 1;
        var lib = Config.VIP_710[vip];
        this.VipBar.max = lib.MONEY;
        this.VipBar.value = v.exp;
        this.lbVip.text = "VIP" + v.vip;
        if (Config.VIP_710[vip + 1]) {
            var lb = Config.VIP_710[vip + 1];
            var money = lb.MONEY - v.exp;
            this.VipBar.max = lb.MONEY;
            this.lbPro.text = "再充值" + money + "元就可以升级到VIP" + (vip);
        }
        else {
            this.lbPro.text = "您已经是秒杀全服的顶级VIP大佬";
        }
    };
    ViewChongZhi.prototype.openVIP = function () {
        GGlobal.layerMgr.open(UIConst.VIP);
    };
    ViewChongZhi.prototype.onShown = function () {
        var s = this;
        GGlobal.modelchongzhi.CG_OPENCHONGZHI_137();
        GGlobal.control.listen(Enum_MsgType.CHONGZHIOPEN, s.onUpdate, s);
        this.vip.addClickListener(this.openVIP, this);
        IconUtil.setImg(s.czBg, Enum_Path.BACK_URL + "czBg.jpg");
    };
    ViewChongZhi.prototype.onHide = function () {
        var s = this;
        s.lst.numItems = 0;
        s.vip.removeClickListener(s.openVIP, s);
        GGlobal.control.remove(Enum_MsgType.CHONGZHIOPEN, s.onUpdate, s);
        IconUtil.setImg(s.czBg, null);
        GGlobal.layerMgr.close(UIConst.CHONGZHI);
    };
    ViewChongZhi.tryToOpenCZ = function () {
        if (GGlobal.modelRecharge.getHasSC()) {
            GGlobal.layerMgr.open(UIConst.CHONGZHI);
        }
        else {
            GGlobal.layerMgr.open(UIConst.SHOUCHONG);
        }
    };
    ViewChongZhi.URL = "ui://42zxp7qjq5ux0";
    return ViewChongZhi;
}(UIPanelBase));
__reflect(ViewChongZhi.prototype, "ViewChongZhi");
