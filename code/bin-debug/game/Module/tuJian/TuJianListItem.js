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
var TuJianListItem = (function (_super) {
    __extends(TuJianListItem, _super);
    function TuJianListItem() {
        return _super.call(this) || this;
    }
    TuJianListItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("TuJian", "TuJianListItem"));
    };
    TuJianListItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.chooseImg.visible = false;
    };
    TuJianListItem.prototype.setVo = function (vo) {
        this.vo = vo;
        this.item.vo = vo;
        this.wayGroup.visible = true;
        if (vo.isJiHuo) {
            this.wayGroup.visible = false;
        }
        else {
            this.wayLb.text = "获取途径\n" + HtmlUtil.fontNoSize(vo.source, Color.getColorStr(1));
        }
    };
    TuJianListItem.prototype.setChoose = function (value) {
        this.chooseImg.visible = value;
    };
    TuJianListItem.prototype.clean = function () {
        this.item.clean();
    };
    TuJianListItem.URL = "ui://m0rbmsgsrcvu25";
    return TuJianListItem;
}(fairygui.GComponent));
__reflect(TuJianListItem.prototype, "TuJianListItem");
