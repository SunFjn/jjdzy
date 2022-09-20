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
var VBaZTGridFenJ = (function (_super) {
    __extends(VBaZTGridFenJ, _super);
    function VBaZTGridFenJ() {
        return _super.call(this) || this;
    }
    VBaZTGridFenJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VBaZTGridFenJ"));
    };
    VBaZTGridFenJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.check.touchable = false;
    };
    VBaZTGridFenJ.prototype.setTemp = function (v) {
        this._temp = v;
        this.check.visible = this.check.touchable = false;
        this.imgLock.visible = false;
        this.grid.setTemp(v);
        this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
        // let pz = v ? v.pz : 0
        // this.lbName.color = Color.QUALITYCOLOR[pz];
    };
    VBaZTGridFenJ.prototype.getTemp = function () {
        return this._temp;
    };
    Object.defineProperty(VBaZTGridFenJ.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            this.setTemp(v.cfg);
            this.grid.vo = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VBaZTGridFenJ.prototype, "voFenJ", {
        set: function (v) {
            this._vo = v;
            this.grid.vo = v;
            this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
            // this.lbName.text = v.name;
            // this.lbName.color = Color.QUALITYCOLOR[v.pz];
            if (v.locked == 0) {
                this.check.visible = true;
                this.check.selected = v.fenJ == 1;
                this.imgLock.visible = false;
                GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.CHECKED, this.upChecked, this);
            }
            else {
                this.check.visible = false;
                this.check.selected = false;
                this.imgLock.visible = true;
                GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.CHECKED, this.upChecked, this);
            }
            if (v.type == 0) {
                this.imgLock.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VBaZTGridFenJ.prototype, "checked", {
        get: function () {
            return this.check.selected;
        },
        enumerable: true,
        configurable: true
    });
    VBaZTGridFenJ.prototype.upChecked = function () {
        if (this.vo && this.vo.locked == 0) {
            this.check.selected = this.vo.fenJ == 1;
        }
        else {
            this.check.selected = false;
        }
    };
    VBaZTGridFenJ.prototype.onCheck = function () {
        if (this.vo && this.vo.locked == 1) {
            this.check.selected = false;
            return;
        }
        this.check.selected = this.check.selected ? false : true;
        if (this.vo) {
            this.vo.fenJ = this.check.selected ? 1 : 0;
        }
    };
    VBaZTGridFenJ.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.clean();
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.CHECKED, this.upChecked, this);
    };
    VBaZTGridFenJ.URL = "ui://xrzn9ppab5l2k";
    return VBaZTGridFenJ;
}(fairygui.GButton));
__reflect(VBaZTGridFenJ.prototype, "VBaZTGridFenJ");
