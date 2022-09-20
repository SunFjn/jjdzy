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
var SuperMarblesItem = (function (_super) {
    __extends(SuperMarblesItem, _super);
    function SuperMarblesItem() {
        return _super.call(this) || this;
    }
    SuperMarblesItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "SuperMarblesItem"));
    };
    SuperMarblesItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.dataLb.leading = 25;
    };
    SuperMarblesItem.prototype.onExchange = function () {
        var self = this;
        var model = GGlobal.modelSuperMarbles;
        var costArr = ConfigHelp.makeItemListArr(this._vo.consume);
        var count = model.score;
        if (count >= costArr[0].count) {
            model.CG_buy(self._vo.id, 1);
        }
        else {
            ViewCommonWarn.text("积分不足");
        }
    };
    SuperMarblesItem.prototype.clean = function () {
        var self = this;
        self.grid.vo = null;
        self.buyBt.removeClickListener(self.onExchange, self);
    };
    SuperMarblesItem.prototype.update = function (idx) {
        var self = this;
        var model = GGlobal.modelSuperMarbles;
        self.typeImg0.url = "ui://gf2tw9lz77k97";
        self._vo = model.shopcfg[idx];
        if (self._vo) {
            var max = self._vo.xg;
            var count = model.shopdata[self._vo.id] ? model.shopdata[self._vo.id] : 0;
            var costArr = JSON.parse(self._vo.consume);
            var price = costArr[0][2];
            var color = Color.REDSTR;
            if (max > count) {
                color = Color.GREENSTR;
            }
            self.grid.vo = ConfigHelp.makeItemListArr(self._vo.item)[0];
            self.grid.isShowEff = true;
            self.grid.tipEnabled = true;
            self.nameLb.text = self.grid.vo.name;
            self.nameLb.color = self.grid.vo.qColor;
            self.buyBt.addClickListener(self.onExchange, self);
            self.dataLb.text = "限购：" + HtmlUtil.fontNoSize((max - count) + "/" + max, color) + "\n单价：      " + price;
        }
    };
    SuperMarblesItem.URL = "ui://gf2tw9lzx9uy3";
    return SuperMarblesItem;
}(fairygui.GComponent));
__reflect(SuperMarblesItem.prototype, "SuperMarblesItem");
