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
var WarOrderRewItem2 = (function (_super) {
    __extends(WarOrderRewItem2, _super);
    function WarOrderRewItem2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarOrderRewItem2.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "WarOrderRewItem2"));
    };
    WarOrderRewItem2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    WarOrderRewItem2.prototype.updata = function (pData) {
        var t = this;
        if (!pData) {
            return;
        }
        t._curData = pData;
        t.tfIndex.text = ConfigHelp.reTxt("第{0}级", pData.cfg.lv);
        if (pData.rewardList0[0]) {
            t.item0.tipEnabled = true;
            t.item0.isShowEff = true;
            this.item0.vo = pData.rewardList0[0];
            t.item0.visible = true;
            t.lbNo0.visible = false;
        }
        else {
            t.item0.visible = false;
            t.lbNo0.visible = true;
        }
        if (pData.rewardList1[0]) {
            t.item1.tipEnabled = true;
            t.item1.isShowEff = true;
            t.item1.vo = pData.rewardList1[0];
            t.item1.visible = true;
            t.lbNo1.visible = false;
        }
        else {
            t.item1.visible = false;
            t.lbNo1.visible = true;
        }
    };
    //>>>>end
    WarOrderRewItem2.URL = "ui://89er3bo3e7lco";
    return WarOrderRewItem2;
}(fairygui.GComponent));
__reflect(WarOrderRewItem2.prototype, "WarOrderRewItem2");
