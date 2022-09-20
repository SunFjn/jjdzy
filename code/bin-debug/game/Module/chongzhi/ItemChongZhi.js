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
var ItemChongZhi = (function (_super) {
    __extends(ItemChongZhi, _super);
    function ItemChongZhi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastT = 0;
        _this.cfgId = 0;
        return _this;
    }
    ItemChongZhi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.clickHand, self);
    };
    ItemChongZhi.prototype.clickHand = function () {
        var now = egret.getTimer();
        if (now - this.lastT < 1000) {
            return;
        }
        this.lastT = now;
        GGlobal.modelchongzhi.CG_CHONGZHI_135(this.cfgId);
    };
    ItemChongZhi.prototype.setdata = function (datas, index) {
        var self = this;
        self.cfgId = datas["ID"];
        var cfg = Config.chongzhi_716[self.cfgId];
        self.txtYuan.text = cfg.RMB + "元";
        self.iconGold.url = fairygui.UIPackage.getItemURL("chongzhi", "yuanbao" + Math.min(6, (index + 1)));
        var mul = GGlobal.modelchongzhi.data[index][1];
        switch (mul) {
            case 200:
                self.grpEW.visible = false;
                self.grpMul.visible = true;
                self.txtMul.text = cfg.COIN + "X2\u500D";
                self.iconMul.url = "ui://42zxp7qjdev71x";
                self.txtNum.text = "";
                break;
            case 300:
                self.iconMul.url = "ui://42zxp7qjr6t618";
                self.grpEW.visible = true;
                self.grpMul.visible = true;
                self.txtMul.text = cfg.COIN + "X2\u500D";
                self.txtNum.text = cfg.COIN + "";
                break;
            case 33:
                self.iconMul.url = "ui://42zxp7qjdev71w";
                self.grpEW.visible = true;
                self.grpMul.visible = true;
                self.txtMul.text = cfg.COIN + "X2\u500D";
                self.txtNum.text = cfg.COIN + "";
                break;
            case 320://998
                self.iconMul.url = "ui://42zxp7qjx43e22";
                self.grpEW.visible = true;
                self.grpMul.visible = true;
                self.txtMul.text = "" + cfg.COIN;
                self.txtNum.text = (cfg.COIN * 0.5) + "";
                break;
            case 350://1998
                self.iconMul.url = "ui://42zxp7qjx43e23";
                self.grpEW.visible = true;
                self.grpMul.visible = true;
                self.txtMul.text = "" + cfg.COIN;
                self.txtNum.text = (cfg.COIN * 0.5) + "";
                break;
            default:
                self.iconMul.url = "";
                self.grpEW.visible = false;
                self.grpMul.visible = false;
                self.txtNum.text = "";
                break;
        }
    };
    ItemChongZhi.URL = "ui://42zxp7qjt2yi12";
    return ItemChongZhi;
}(fairygui.GComponent));
__reflect(ItemChongZhi.prototype, "ItemChongZhi");
