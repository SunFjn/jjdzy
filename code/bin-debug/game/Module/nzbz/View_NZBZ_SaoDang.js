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
var View_NZBZ_SaoDang = (function (_super) {
    __extends(View_NZBZ_SaoDang, _super);
    function View_NZBZ_SaoDang() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_NZBZ_SaoDang.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_SaoDang").asCom;
        a.contentPane = a.view;
        a.sureBt = (a.view.getChild("sureBt"));
        a.rewardLb = (a.view.getChild("rewardLb"));
        a.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
        a.sureBt.addClickListener(a.sureHandler, a);
    };
    View_NZBZ_SaoDang.prototype.sureHandler = function () {
        this.doHideAnimation();
    };
    View_NZBZ_SaoDang.prototype.onShown = function () {
        if (!this._args)
            return;
        var arr = this._args;
        var rewardStr0 = "";
        var rewardStr1 = "";
        var rewardStr2 = HtmlUtil.fontNoSize("积分    ", Color.getColorStr(2)) + "+" + Model_NZBZ.addJiFen;
        for (var i = 0; i < arr.length; i++) {
            var vo = arr[i];
            if (vo.gType == Enum_Attr.PRESTIGE) {
                rewardStr0 = HtmlUtil.fontNoSize("声望", Color.getColorStr(2)) + "           +" + vo.count;
            }
            else if (vo.gType == Enum_Attr.GONGXUN) {
                rewardStr1 = HtmlUtil.fontNoSize("功勋", Color.getColorStr(2)) + "           +" + vo.count;
            }
        }
        this.rewardLb.text = rewardStr0 + "\n" + rewardStr1 + "\n" + rewardStr2;
    };
    View_NZBZ_SaoDang.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_SAODANG);
    };
    View_NZBZ_SaoDang.URL = "ui://xzyn0qe381i01b";
    return View_NZBZ_SaoDang;
}(UIModalPanel));
__reflect(View_NZBZ_SaoDang.prototype, "View_NZBZ_SaoDang");
