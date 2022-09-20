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
var TipBaZhenTu = (function (_super) {
    __extends(TipBaZhenTu, _super);
    function TipBaZhenTu() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TipBaZhenTu.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "TipBaZhenTu"));
    };
    TipBaZhenTu.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("baZhenTu", "TipBaZhenTu").asCom;
        this.contentPane = this.view;
        this.lbName = (this.view.getChild("lbName"));
        this.lbPower = (this.view.getChild("lbPower"));
        this.lbLevel = (this.view.getChild("lbLevel"));
        this.lbDes = (this.view.getChild("lbDes"));
        this.lbDesTit = (this.view.getChild("lbDesTit"));
        this.grid = (this.view.getChild("grid"));
        _super.prototype.childrenCreated.call(this);
    };
    TipBaZhenTu.prototype.onShown = function () {
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
    };
    TipBaZhenTu.prototype.onHide = function () {
        this.grid.showEff(false);
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        GGlobal.layerMgr.close(UIConst.TIP_BAZHENTU_ITEM);
    };
    TipBaZhenTu.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
        this.resize();
    };
    TipBaZhenTu.prototype.show = function (v) {
        this.grid.isShowEff = true;
        this.grid.vo = v;
        this.lbName.text = v.colorName;
        // this.lbName.color = Color.QUALITYCOLOR[v.pz];
        this.lbLevel.text = "Lv." + v.level + "/" + v.maxLv;
        this.lbPower.text = "战力：" + v.power;
        if (v.type == 0) {
            this.lbDes.text = v.tipDes;
        }
        else {
            this.lbDes.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
        }
    };
    TipBaZhenTu.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2);
    };
    TipBaZhenTu.URL = "ui://xrzn9ppamnlv1c";
    return TipBaZhenTu;
}(UIModalPanel));
__reflect(TipBaZhenTu.prototype, "TipBaZhenTu");
