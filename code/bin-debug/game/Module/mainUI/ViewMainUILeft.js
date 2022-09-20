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
var ViewMainUILeft = (function (_super) {
    __extends(ViewMainUILeft, _super);
    function ViewMainUILeft() {
        return _super.call(this) || this;
    }
    ViewMainUILeft.prototype.initUI = function () {
        var s = this;
        s.bg1 = new fairygui.GLoader();
        s.bg1.setSize(88, 357);
        s.bg1.fill = fairygui.LoaderFillType.ScaleFree;
        s.bg1.url = "ui://7gxkx46ww6ro5n";
        s.bg1.setXY(0, 6);
        s.bg1.visible = false;
        s.addChild(s.bg1);
        _super.prototype.initUI.call(this);
        s.btnContainer.setXY(5, 6);
        s.LayoutType = fairygui.GroupLayoutType.Vertical;
        GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, s.aglin, s);
    };
    Object.defineProperty(ViewMainUILeft, "instance", {
        get: function () {
            if (!ViewMainUILeft._instance)
                ViewMainUILeft._instance = new ViewMainUILeft();
            return ViewMainUILeft._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainUILeft.prototype.addMenuIcon = function (sid, isNotice) {
        _super.prototype.addMenuIcon.call(this, sid);
        switch (sid) {
            case UIConst.SHOUCHONG:
                GGlobal.modelRecharge.listen(Model_Recharge.msg_info, this.updateNot, this);
                break;
        }
    };
    ViewMainUILeft.prototype.removeMenuIcon = function (sid) {
        _super.prototype.removeMenuIcon.call(this, sid);
        switch (sid) {
            case UIConst.SHOUCHONG:
                GGlobal.modelRecharge.remove(Model_Recharge.msg_info, this.updateNot, this);
                break;
        }
    };
    ViewMainUILeft.prototype.updateNot = function () {
        var icon = GGlobal.mainUICtr.getIcon(UIConst.SHOUCHONG);
        // const keys = Object.keys(GGlobal.modelRecharge.scInfos);
        var scInfos = GGlobal.modelRecharge.scInfos;
        var state1 = scInfos["1"];
        var state2 = scInfos["2"];
        var state3 = scInfos["3"];
        var state4 = scInfos["4"];
        var red1 = (state1 == 2 || state2 == 2 || state3 == 2);
        if (icon) {
            if (red1 && state4 == 2) {
                GGlobal.mainUICtr.removeIcon(UIConst.SHOUCHONG);
            }
            else {
                var bool = state1 == 1 || state2 == 1 || state3 == 1 || state4 == 1;
                icon.checkNotice = bool;
                var cfg = Config.xitong_001[UIConst.SHOUCHONG];
                if (red1) {
                    icon.setIcon(cfg.icon + "_2");
                }
                else {
                    icon.setIcon(cfg.icon + "_1");
                }
            }
        }
    };
    ViewMainUILeft.prototype.resetPosition = function () {
        var contentH = fairygui.GRoot.inst.height - 512 - ViewMainTopUI1.instance.height - GGlobal.layerMgr.uiAlign - this._yy;
        this.setXY(-GGlobal.layerMgr.offx, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + contentH / 2 + 120);
    };
    ViewMainUILeft.prototype.aglin = function () {
        var s = this;
        _super.prototype.aglin.call(this);
        s.bg1.visible = true;
        s.bg1.setSize(88, s._yy);
        s.resetPosition();
    };
    return ViewMainUILeft;
}(BaseSceneUI));
__reflect(ViewMainUILeft.prototype, "ViewMainUILeft");
