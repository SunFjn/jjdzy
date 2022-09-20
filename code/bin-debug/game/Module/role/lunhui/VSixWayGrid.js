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
var VSixWayGrid = (function (_super) {
    __extends(VSixWayGrid, _super);
    function VSixWayGrid() {
        var _this = _super.call(this) || this;
        _this.isShowEff = false;
        return _this;
    }
    VSixWayGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "VSixWayGrid"));
    };
    VSixWayGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(VSixWayGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var s = this;
            s._vo = v;
            if (v && v.id > 0) {
                s.starLb.text = v.star + "";
                s.lbName.text = v.colorName;
                s.starGroup.visible = true;
                IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l" + v.pz + ".png");
                // s.showEff(s.isShowEff);
                IconUtil.setImg(s.iconImg, Enum_Path.SIXWAY_URL + v.icon + ".png");
            }
            else {
                IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l0.png");
                IconUtil.setImg(s.iconImg, null);
                s.starLb.text = "";
                s.lbName.text = "";
                s.starGroup.visible = false;
                // s.showEff(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    VSixWayGrid.prototype.showEff = function (v) {
        var s = this;
        if (v && s.vo && s.vo.id > 0) {
            s._temp = s.vo.cfg;
            s.showEffTemp(v);
        }
        else {
            if (s.effPart) {
                EffectMgr.instance.removeEff(s.effPart);
                s.effPart = null;
            }
        }
    };
    VSixWayGrid.prototype.showEffTemp = function (v) {
        var s = this;
        if (v && s._temp && s._temp.pz >= 5) {
            if (s.effPart) {
                EffectMgr.instance.removeEff(s.effPart);
                s.effPart = null;
            }
            if (s.effPart == null) {
                var idx = 0;
                if (s._temp.pz >= 8) {
                    idx = 10055;
                }
                else {
                    idx = 10001 + (s._temp.pz - 5);
                    idx = idx > 10002 ? 10002 : idx;
                }
                s.effPart = EffectMgr.addEff("uieff/" + idx, s.displayListContainer, s.width / 2 + 3, s.height / 2 - 1, 800, -1);
            }
        }
        else {
            if (s.effPart) {
                EffectMgr.instance.removeEff(s.effPart);
                s.effPart = null;
            }
        }
    };
    VSixWayGrid.prototype.clean = function () {
        var s = this;
        _super.prototype.clean.call(this);
        s.showEff(false);
        IconUtil.setImg(s.pzImg, null);
    };
    VSixWayGrid.URL = "ui://ehelf5bh11m1w11";
    return VSixWayGrid;
}(fairygui.GComponent));
__reflect(VSixWayGrid.prototype, "VSixWayGrid");
