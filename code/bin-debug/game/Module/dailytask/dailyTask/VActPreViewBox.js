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
var VActPreViewBox = (function (_super) {
    __extends(VActPreViewBox, _super);
    function VActPreViewBox() {
        var _this = _super.call(this) || this;
        _this.grids = []; //86 118
        _this.childrenCreated();
        return _this;
    }
    VActPreViewBox.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("dailytask", "VActPreViewBox").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.btnHand.addClickListener(self.onHand, self);
        _super.prototype.childrenCreated.call(this);
    };
    VActPreViewBox.prototype.onHand = function () {
        GGlobal.modelactPreView.CG4051();
        this.doHideAnimation();
    };
    VActPreViewBox.prototype.onShown = function () {
        var self = this;
        ConfigHelp.cleanGridview(self.grids);
        var awards = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[4301].other));
        var beginX = self.width - awards.length * 110 >> 1;
        self.grids = ConfigHelp.addGridview(awards, self, beginX, 118, true, false, 5, 120);
        self.onUpdate();
        GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, self.onUpdate, self);
    };
    VActPreViewBox.prototype.onUpdate = function () {
        var self = this;
        self.btnHand.visible = !(self.iconGot.visible = ModelActPreView.gotSt == 1);
    };
    VActPreViewBox.prototype.onHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, this.onUpdate, this);
    };
    return VActPreViewBox;
}(UIModalPanel));
__reflect(VActPreViewBox.prototype, "VActPreViewBox");
