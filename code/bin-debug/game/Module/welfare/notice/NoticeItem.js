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
var NoticeItem = (function (_super) {
    __extends(NoticeItem, _super);
    function NoticeItem() {
        return _super.call(this) || this;
    }
    NoticeItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "NoticeItem"));
    };
    NoticeItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeLb = (this.getChild("noticeLb"));
    };
    NoticeItem.prototype.show = function () {
        if (Model_Welfare.welfareNotice) {
            this.noticeLb.text = Model_Welfare.welfareNotice;
        }
        else {
            this.noticeLb.text = Config.wfsm_200[4204].tips;
        }
    };
    NoticeItem.URL = "ui://ye1luhg3ffubh";
    return NoticeItem;
}(fairygui.GComponent));
__reflect(NoticeItem.prototype, "NoticeItem");
