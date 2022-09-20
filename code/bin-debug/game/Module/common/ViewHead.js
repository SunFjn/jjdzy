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
var ViewHead = (function (_super) {
    __extends(ViewHead, _super);
    function ViewHead() {
        return _super.call(this) || this;
    }
    ViewHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewHead"));
    };
    ViewHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.headIcon = (s.getChild("headIcon"));
        s.frameIcon = (s.getChild("frameIcon"));
        s.lbLv = (s.getChild("lbLv"));
        s.g0 = (s.getChild("g0"));
        s.ng = (s.getChild("ng"));
        s.lbName = (s.getChild("lbName"));
        s.g1 = (s.getChild("g1"));
        s.gvip = (s.getChild("gvip"));
        s.vipLb = (s.getChild("vipLb"));
        s.imgCountry = (s.getChild("imgCountry"));
        s.imgCountry.visible = false;
    };
    /**
     * head 设置表的id
     * lv 等级
     * name 名字
     *  vip
     * nocfg 全URL
    */
    ViewHead.prototype.setdata = function (head, lv, name, vip, noCFG, frame, country) {
        if (head === void 0) { head = null; }
        if (lv === void 0) { lv = -1; }
        if (name === void 0) { name = ""; }
        if (vip === void 0) { vip = -1; }
        if (noCFG === void 0) { noCFG = false; }
        if (frame === void 0) { frame = null; }
        if (country === void 0) { country = 0; }
        var s = this;
        if (!head) {
            ImageLoader.instance.loader(RoleUtil.getHeadRole("tx_00"), s.headIcon);
        }
        else if (noCFG) {
            ImageLoader.instance.loader(head, s.headIcon);
        }
        else {
            var headPic = Config.shezhi_707[head];
            ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), s.headIcon);
        }
        if (!frame) {
            ImageLoader.instance.loader(RoleUtil.getHeadRole("2001"), s.frameIcon);
        }
        else if (noCFG) {
            ImageLoader.instance.loader(frame, s.frameIcon);
        }
        else {
            var framePic = Config.shezhi_707[frame];
            ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), s.frameIcon);
        }
        s.g0.visible = false;
        s.g1.visible = false;
        s.gvip.visible = false;
        if (lv > 0) {
            s.lbLv.text = lv + "";
            s.g0.visible = true;
        }
        if (name) {
            s.lbName.text = name;
            s.g1.visible = true;
        }
        if (vip > 0) {
            s.vipLb.text = ConfigHelp.getVipShow(vip);
            s.gvip.visible = true;
        }
        if (country > 0) {
            s.imgCountry.url = CommonManager.getCommonUrl("country" + country);
            s.imgCountry.visible = true;
        }
        else {
            s.imgCountry.visible = false;
        }
    };
    ViewHead.URL = "ui://jvxpx9emp75387";
    return ViewHead;
}(fairygui.GComponent));
__reflect(ViewHead.prototype, "ViewHead");
