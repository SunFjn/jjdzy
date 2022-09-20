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
/**
 * 红包记录item
 */
var ItemHBRecord = (function (_super) {
    __extends(ItemHBRecord, _super);
    function ItemHBRecord() {
        return _super.call(this) || this;
    }
    ItemHBRecord.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_TJHB", "ItemHBRecord"));
    };
    ItemHBRecord.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    ItemHBRecord.prototype.setData = function (vo, bol) {
        if (bol === void 0) { bol = false; }
        var self = this;
        if (!vo)
            return;
        self.lbName.text = vo.recordName;
        self.lbName.color = vo.isMyself ? Color.GREENINT : Color.WHITEINT;
        self.lbNum.text = vo.money + "";
        self.dingImg.visible = bol;
    };
    ItemHBRecord.URL = "ui://fm0lrzctv465j";
    return ItemHBRecord;
}(fairygui.GComponent));
__reflect(ItemHBRecord.prototype, "ItemHBRecord");
