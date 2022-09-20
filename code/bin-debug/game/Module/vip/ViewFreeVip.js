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
var ViewFreeVip = (function (_super) {
    __extends(ViewFreeVip, _super);
    function ViewFreeVip() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        _this.loadRes("LoginVip", "LoginVip_atlas0");
        return _this;
    }
    ViewFreeVip.createInstance = function () {
        return (fairygui.UIPackage.createObject("LoginVip", "ViewFreeVip"));
    };
    ViewFreeVip.prototype.childrenCreated = function () {
        GGlobal.createPack("LoginVip");
        var s = this;
        s.view = fairygui.UIPackage.createObject("LoginVip", "ViewFreeVip").asCom;
        s.contentPane = s.view;
        this.icon0 = (s.view.getChild("icon0"));
        this.icon1 = (s.view.getChild("icon1"));
        this.icon2 = (s.view.getChild("icon2"));
        this.n11 = (s.view.getChild("n11"));
        this.n13 = (s.view.getChild("n13"));
        this.n14 = (s.view.getChild("n14"));
        this.lb0 = (s.view.getChild("lb0"));
        this.lb1 = (s.view.getChild("lb1"));
        this.lb2 = (s.view.getChild("lb2"));
        this.n23 = (s.view.getChild("n23"));
        this.n15 = (s.view.getChild("n15"));
        this.grids = [this['icon0'], this['icon1'], this['icon2']];
        _super.prototype.childrenCreated.call(this);
    };
    ViewFreeVip.prototype.onShown = function () {
        var arr = JSON.parse(ConfigHelp.getSystemDesc(3814));
        arr = ConfigHelp.makeItemListArr(arr);
        for (var i = 0; i < 3; i++) {
            var itemVo = arr[i];
            this['lb' + i].text = ConfigHelp.getYiWanText(itemVo.count);
            this['icon' + i].vo = itemVo;
            this['icon' + i].tipEnabled = true;
            this.texts.push(itemVo);
        }
        this.n23.addClickListener(this.doHideAnimation, this);
    };
    ViewFreeVip.prototype.doHideAnimation = function () {
        if (this.hasClick)
            return;
        this.hasClick = true;
        AnimationUtil.grid2ToBag(this.grids, 1000);
        while (this.texts.length > 0) {
            var itemVo = this.texts.shift();
            ViewBroadcastItemText.text("获得【" + itemVo.name + "】X" + itemVo.count, itemVo.qColor);
        }
        Timer.instance.callLater(_super.prototype.doHideAnimation, 1000, this);
    };
    ViewFreeVip.prototype.onHide = function () {
        this.n23.removeClickListener(this.doHideAnimation, this);
        var titleID = 460109;
        if (Model_Bag.getItemCount(titleID) > 0) {
            GGlobal.modelBag.CG_BAG_ITEM_USE(titleID, 1);
        }
        GGlobal.layerMgr.close(UIConst.LOGINVIP);
        this.texts = null;
        Model_TrueName.openTureName();
    };
    ViewFreeVip.URL = "ui://ghovj25xucgg0";
    return ViewFreeVip;
}(UIModalPanel));
__reflect(ViewFreeVip.prototype, "ViewFreeVip");
