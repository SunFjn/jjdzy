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
var View_WFLab_Panel = (function (_super) {
    __extends(View_WFLab_Panel, _super);
    function View_WFLab_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_WFLab_Panel.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "View_WFLab_Panel").asCom;
        this.contentPane = this.view;
        this.labDesc = (this.view.getChild("labDesc"));
        _super.prototype.childrenCreated.call(this);
    };
    View_WFLab_Panel.prototype.onShown = function () {
        this.show(this._args);
    };
    View_WFLab_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.WFLAB_PANEL);
    };
    View_WFLab_Panel.prototype.show = function (obj) {
        if (obj) {
            this.labDesc.text = obj;
        }
        else {
            this.labDesc.text = "属性加成只针对本系统的\n[color=#FFC000]升星[/color]和[color=#FFC000]升阶[/color]属性进行百分比加成";
        }
    };
    return View_WFLab_Panel;
}(UIModalPanel));
__reflect(View_WFLab_Panel.prototype, "View_WFLab_Panel");
