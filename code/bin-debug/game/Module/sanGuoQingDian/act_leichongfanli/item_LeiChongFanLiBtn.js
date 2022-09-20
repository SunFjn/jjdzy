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
var item_LeiChongFanLiBtn = (function (_super) {
    __extends(item_LeiChongFanLiBtn, _super);
    function item_LeiChongFanLiBtn() {
        return _super.call(this) || this;
    }
    item_LeiChongFanLiBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "item_LeiChongFanLiBtn"));
    };
    item_LeiChongFanLiBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.desc = (this.getChild("desc"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.fg = (this.getChild("fg"));
    };
    item_LeiChongFanLiBtn.prototype.setData = function (data) {
        this.voData = data;
        this.fg.visible = false;
        this.desc.text = "累充" + this.voData.lj + "元\n" + this.voData.tips;
        this.noticeImg.visible = this.voData.state == 1;
    };
    item_LeiChongFanLiBtn.prototype.setSelectedState = function (isVisible) {
        this.fg.visible = isVisible;
    };
    item_LeiChongFanLiBtn.prototype.getData = function () {
        return this.voData;
    };
    item_LeiChongFanLiBtn.URL = "ui://kdt501v2mq0c1m";
    return item_LeiChongFanLiBtn;
}(fairygui.GComponent));
__reflect(item_LeiChongFanLiBtn.prototype, "item_LeiChongFanLiBtn");
