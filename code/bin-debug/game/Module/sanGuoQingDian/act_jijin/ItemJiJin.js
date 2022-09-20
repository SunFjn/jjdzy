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
var ItemJiJin = (function (_super) {
    __extends(ItemJiJin, _super);
    function ItemJiJin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemJiJin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnHand.addClickListener(this.onHand, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    ItemJiJin.prototype.onHand = function () {
        GGlobal.modelSGQD.CG4083(this._data.id);
    };
    ItemJiJin.prototype.setData = function (value) {
        this._data = value;
        this.container.setGrids(value.jiangli);
        this.showInfo();
    };
    ItemJiJin.prototype.getData = function () {
        return this._data;
    };
    ItemJiJin.prototype.setState = function (value) {
        var self = this;
        self._state = value;
        self.showInfo();
        self.iconGot.visible = false;
        self.btnHand.visible = true;
        switch (value) {
            case 0:
            default://null or undefined
                self.btnHand.enabled = false;
                self.btnHand.checkNotice = false;
                break;
            case 1:
                self.btnHand.enabled = true;
                self.btnHand.checkNotice = true;
                break;
            case 2:
                self.btnHand.visible = false;
                self.iconGot.visible = true;
                break;
        }
    };
    ItemJiJin.prototype.showInfo = function () {
        var self = this;
        if (!GGlobal.modelSGQD.jiJinInfo) {
            return;
        }
        var loginDay = GGlobal.modelSGQD.jiJinInfo.loginDay ? GGlobal.modelSGQD.jiJinInfo.loginDay : 1;
        self.txtLoginDay.text = "\u6D3B\u52A8\u7B2C" + self._data.tianshu + "\u5929\u53EF\u9886\u53D6" +
            HtmlUtil.fontNoSize("(" + loginDay + "/" + self._data.tianshu + "\u5929)", loginDay >= self._data.tianshu ? "#00ff00" : "#ff0000");
    };
    ItemJiJin.prototype.onRemove = function () {
        this.container.setGrids(null);
    };
    ItemJiJin.URL = "ui://kdt501v2tipmo";
    return ItemJiJin;
}(fairygui.GComponent));
__reflect(ItemJiJin.prototype, "ItemJiJin");
