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
var GridActQFXF = (function (_super) {
    __extends(GridActQFXF, _super);
    function GridActQFXF() {
        return _super.call(this) || this;
    }
    GridActQFXF.createInstance = function () {
        return (fairygui.UIPackage.createObject("actQFXF", "GridActQFXF"));
    };
    GridActQFXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnGet.addClickListener(s.onGet, s);
        s.btnGo.addClickListener(s.onGo, s);
    };
    Object.defineProperty(GridActQFXF.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            if (v.cfg.gr == 0) {
                s.lb.text = "免费领取";
            }
            else {
                s.lb.text = "消费" + ConfigHelp.getYiWanText(v.cfg.gr) + "元宝";
            }
            s.grid.tipEnabled = s.grid.isShowEff = true;
            s.grid.vo = ConfigHelp.makeItem(JSON.parse(v.cfg.jl)[0]);
            if (v.st == 1) {
                s.btnGet.visible = true;
                s.btnGet.checkNotice = true;
                s.btnGo.visible = false;
                s.imgHas.visible = false;
            }
            else if (v.st == 2) {
                s.imgHas.visible = true;
                s.btnGet.visible = false;
                s.btnGo.visible = false;
            }
            else {
                s.btnGo.visible = true;
                s.btnGet.visible = false;
                s.imgHas.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    GridActQFXF.prototype.onGet = function () {
        GGlobal.model_ActQFXF.CG_GET_REWARD(this._vo.id);
    };
    GridActQFXF.prototype.onGo = function () {
        GGlobal.layerMgr.open(UIConst.CANGBAOGE);
    };
    GridActQFXF.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.grid.clean();
    };
    GridActQFXF.URL = "ui://p8fr1bvgkzdy7";
    return GridActQFXF;
}(fairygui.GComponent));
__reflect(GridActQFXF.prototype, "GridActQFXF");
