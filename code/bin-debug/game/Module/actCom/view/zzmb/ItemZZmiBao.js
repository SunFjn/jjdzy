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
var ItemZZmiBao = (function (_super) {
    __extends(ItemZZmiBao, _super);
    function ItemZZmiBao() {
        return _super.call(this) || this;
    }
    ItemZZmiBao.createInstance = function () {
        return (fairygui.UIPackage.createObject("zhizhunmibao", "ItemZZmiBao"));
    };
    ItemZZmiBao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemZZmiBao.prototype.clean = function () {
        this.grid.vo = null;
    };
    ItemZZmiBao.prototype.setdata = function (data, showEffect) {
        var self = this;
        self.grid.isShowEff = true;
        self.grid.vo = ConfigHelp.makeItem([data[1], data[2], data[3]]);
        self.grid.tipEnabled = true;
        self.lbRemaind.text = "剩余份数：" + data[4];
        self.lbRemaind.color = data[4] == 0 ? Color.REDINT : Color.GREENINT;
        self.imgBig.visible = data[5];
        if (showEffect) {
            var grid = self.grid;
            EffectMgr.addEff("uieff/10092", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
        }
    };
    ItemZZmiBao.URL = "ui://swuqw468x9uy1";
    return ItemZZmiBao;
}(fairygui.GComponent));
__reflect(ItemZZmiBao.prototype, "ItemZZmiBao");
