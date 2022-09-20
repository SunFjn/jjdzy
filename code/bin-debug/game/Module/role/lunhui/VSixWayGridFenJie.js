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
/**
 * 六道分解item
 */
var VSixWayGridFenJie = (function (_super) {
    __extends(VSixWayGridFenJie, _super);
    function VSixWayGridFenJie() {
        return _super.call(this) || this;
    }
    VSixWayGridFenJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "VSixWayGridFenJie"));
    };
    VSixWayGridFenJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.check.touchable = false;
    };
    Object.defineProperty(VSixWayGridFenJie.prototype, "voFenJ", {
        set: function (v) {
            var s = this;
            s._vo = v;
            s.grid.vo = v;
            s.check.visible = true;
            s.check.selected = v.fenJ == 1;
            GGlobal.modellh.listen(Model_LunHui.CHECKED, s.upChecked, s);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VSixWayGridFenJie.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    VSixWayGridFenJie.prototype.onCheck = function () {
        this.check.selected = this.check.selected ? false : true;
        if (this.vo) {
            this.vo.fenJ = this.check.selected ? 1 : 0;
        }
    };
    VSixWayGridFenJie.prototype.upChecked = function () {
        var s = this;
        if (s.vo) {
            s.check.selected = s.vo.fenJ == 1;
        }
        else {
            s.check.selected = false;
        }
    };
    VSixWayGridFenJie.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.clean();
        GGlobal.modellh.remove(Model_LunHui.CHECKED, this.upChecked, this);
    };
    VSixWayGridFenJie.URL = "ui://ehelf5bh11m1w10";
    return VSixWayGridFenJie;
}(fairygui.GButton));
__reflect(VSixWayGridFenJie.prototype, "VSixWayGridFenJie");
