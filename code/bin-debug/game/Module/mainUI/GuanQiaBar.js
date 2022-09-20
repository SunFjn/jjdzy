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
var GuanQiaBar = (function (_super) {
    __extends(GuanQiaBar, _super);
    function GuanQiaBar() {
        return _super.call(this) || this;
    }
    GuanQiaBar.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "GuanQiaBar"));
    };
    GuanQiaBar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.fis1 = (this.getChild("fis1"));
        this.fis2 = (this.getChild("fis2"));
        this.fis3 = (this.getChild("fis3"));
        this.g3 = (this.getChild("g3"));
        this.fis11 = (this.getChild("fis11"));
        this.g1 = (this.getChild("g1"));
        this.fis21 = (this.getChild("fis21"));
        this.fis23 = (this.getChild("fis23"));
        this.g2 = (this.getChild("g2"));
        this._eff_list = [];
    };
    GuanQiaBar.prototype.setVo = function (val, max) {
        while (this._eff_list.length) {
            var eff = this._eff_list.shift();
            if (eff)
                EffectMgr.instance.removeEff(eff);
        }
        if (max == 1) {
            this.fis11.visible = val > 0;
            if (val > 0) {
                this.putEffect(this.fis11, true);
            }
        }
        else if (max == 2) {
            this.fis21.visible = val > 0;
            if (val > 0) {
                this.putEffect(this.fis21);
            }
            this.fis23.visible = val > 1;
            if (val > 1) {
                this.putEffect(this.fis23);
            }
        }
        else if (max == 3) {
            this.fis1.visible = val > 0;
            if (val > 0) {
                this.putEffect(this.fis1);
            }
            this.fis2.visible = val > 1;
            if (val > 1) {
                this.putEffect(this.fis2, true);
            }
            this.fis3.visible = val > 2;
            if (val > 2) {
                this.putEffect(this.fis3);
            }
        }
        this.g1.visible = max == 1;
        this.g2.visible = max == 2;
        this.g3.visible = max == 3;
    };
    GuanQiaBar.prototype.putEffect = function (_parent, isBig, _x, _y) {
        if (isBig === void 0) { isBig = false; }
        if (_x === void 0) { _x = 18; }
        if (_y === void 0) { _y = 14; }
        if (isBig)
            _x = 27, _y = 23;
        var eff = EffectMgr.addEff("uieff/10016", _parent.parent.displayListContainer, _parent.x + _x, _parent.y + _y, 800, -1, true);
        if (isBig)
            eff.mc.scaleX = eff.mc.scaleY = 1.35;
        this._eff_list.push(eff);
    };
    GuanQiaBar.URL = "ui://7gxkx46wbq0h59";
    return GuanQiaBar;
}(fairygui.GComponent));
__reflect(GuanQiaBar.prototype, "GuanQiaBar");
