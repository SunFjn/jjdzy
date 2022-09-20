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
var ChatRoleHead = (function (_super) {
    __extends(ChatRoleHead, _super);
    function ChatRoleHead() {
        return _super.call(this) || this;
    }
    ChatRoleHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "ChatRoleHead"));
    };
    ChatRoleHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.headIcon = (a.getChild("headIcon"));
        a.frameIcon = (a.getChild("frameIcon"));
        a.countryImg = (a.getChild("countryImg"));
        a.vipLb = (a.getChild("vipLb"));
        a.vipGroup = (a.getChild("vipGroup"));
    };
    ChatRoleHead.prototype.show = function (vo) {
        var a = this;
        var headPic = Config.shezhi_707[vo.headId];
        var framePic = Config.shezhi_707[vo.frameId];
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", a.headIcon);
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + framePic.picture + ".png", a.frameIcon);
        if (vo.country > 0) {
            a.countryImg.url = CommonManager.getCommonUrl("country" + vo.country);
            a.countryImg.visible = true;
        }
        else {
            a.countryImg.visible = false;
        }
        if (vo.vip <= 0) {
            a.vipGroup.visible = false;
        }
        else {
            a.vipLb.text = ConfigHelp.getVipShow(vo.vip);
            a.vipGroup.visible = true;
        }
    };
    ChatRoleHead.URL = "ui://fx4pr5qeog791";
    return ChatRoleHead;
}(fairygui.GComponent));
__reflect(ChatRoleHead.prototype, "ChatRoleHead");
