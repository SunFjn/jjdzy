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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewWenDingTXRet = (function (_super) {
    __extends(ViewWenDingTXRet, _super);
    function ViewWenDingTXRet() {
        var _this = _super.call(this) || this;
        _this._tabArr = [];
        _this.loadRes();
        return _this;
    }
    ViewWenDingTXRet.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRet"));
    };
    ViewWenDingTXRet.prototype.childrenCreated = function () {
        GGlobal.createPack("wendingTX");
        var s = this;
        s.view = fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRet").asCom;
        s.contentPane = s.view;
        s.n5 = (s.view.getChild("n5"));
        s.n14 = (s.view.getChild("n14"));
        s.n6 = (s.view.getChild("n6"));
        s.n2 = (s.view.getChild("n2"));
        s.closeButton = (s.view.getChild("closeButton"));
        s.n13 = (s.view.getChild("n13"));
        s.n8 = (s.view.getChild("n8"));
        s.n7 = (s.view.getChild("n7"));
        s.n9 = (s.view.getChild("n9"));
        s.n10 = (s.view.getChild("n10"));
        s.groupHead = (s.view.getChild("groupHead"));
        s.n16 = (s.view.getChild("n16"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewWenDingTXRet.prototype.closeHD = function () {
        GGlobal.layerMgr.close2(UIConst.WENDINGTX_RET);
    };
    ViewWenDingTXRet.prototype.onShown = function () {
        var sf = this;
        var m = GGlobal.modelWenDingTX;
        if (m.mvpHead_id != 0) {
            sf.n16.visible = false;
            sf.n10.text = m.mvp_name;
            sf.n10.visible = true;
            sf.n9.visible = true;
            sf.groupHead.visible = true;
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid_id + ""), sf.n7);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead_id + ""), sf.n8);
        }
        else {
            sf.groupHead.visible = false;
            sf.n10.text = "";
            sf.n16.visible = true;
            sf.n10.visible = false;
            sf.n9.visible = false;
        }
        var title = Config.chenghao_702[55].picture;
        ImageLoader.instance.loader(Enum_Path.TITLE_URL + title + ".png", sf.n13);
        this.n2.addClickListener(this.closeHD, this);
        this.closeButton.addClickListener(this.closeHD, this);
    };
    ViewWenDingTXRet.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.WENDINGTX_RET);
        this.n2.removeClickListener(this.closeHD, this);
        this.closeButton.removeClickListener(this.closeHD, this);
    };
    ViewWenDingTXRet.URL = "ui://gxs8kn67fl2hb";
    return ViewWenDingTXRet;
}(UIModalPanel));
__reflect(ViewWenDingTXRet.prototype, "ViewWenDingTXRet");
