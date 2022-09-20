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
var ActCom_CZPHRankItem = (function (_super) {
    __extends(ActCom_CZPHRankItem, _super);
    function ActCom_CZPHRankItem() {
        return _super.call(this) || this;
    }
    ActCom_CZPHRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComCZPH", "ActCom_CZPHRankItem"));
    };
    ActCom_CZPHRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ActCom_CZPHRankItem.prototype.setData = function (arr) {
        var self = this;
        if (arr[0] <= 3) {
            self.rankIcon.visible = true;
            self.rankLb.visible = false;
            self.rankIcon.url = CommonManager.getUrl("common", "rank_" + arr[0]);
        }
        else {
            self.rankIcon.visible = false;
            self.rankLb.visible = true;
            self.rankLb.text = arr[0] + "";
        }
        if (!arr[1]) {
            self.nameLb.visible = false;
            self.nameImg.visible = true;
        }
        else {
            self.nameLb.visible = true;
            self.nameImg.visible = false;
            self.nameLb.text = arr[1];
        }
        self.moneyLb.text = arr[2] + "";
    };
    ActCom_CZPHRankItem.prototype.clean = function () {
    };
    ActCom_CZPHRankItem.URL = "ui://q5asybs1k1rz8";
    return ActCom_CZPHRankItem;
}(fairygui.GComponent));
__reflect(ActCom_CZPHRankItem.prototype, "ActCom_CZPHRankItem");
