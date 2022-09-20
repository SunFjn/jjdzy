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
 * 背包印记item
 */
var SixWayBagItem = (function (_super) {
    __extends(SixWayBagItem, _super);
    function SixWayBagItem() {
        return _super.call(this) || this;
    }
    SixWayBagItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayBagItem"));
    };
    SixWayBagItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnWear.addClickListener(s.onWear, s);
        s.btnDown.addClickListener(s.onDown, s);
    };
    Object.defineProperty(SixWayBagItem.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            s.grid.vo = v;
            if (v && v.id > 0) {
                s.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
                if (v.type == 0) {
                    s.lbLevel.text = "";
                    s.lbPower.text = "";
                }
                else {
                    s.lbLevel.text = "Lv." + v.lv + "/" + v.maxLv;
                    s.lbPower.text = "战力：" + v.power;
                    s.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
                }
            }
            else {
                s.lbName.text = "";
                s.lbPower.text = "";
                s.lbAttr.text = "";
                s.lbLevel.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    SixWayBagItem.prototype.setBag = function (v, pos) {
        var s = this;
        var modellh = GGlobal.modellh;
        s._equipPos = pos;
        s.vo = v;
        s.btnWear.visible = s.btnWear.touchable = true;
        var same = Model_LunHui.checkTypeSame(v.type);
        var eq = modellh.equipArr[pos];
        if (eq && eq.id > 0 && eq.type == v.type) {
            s.btnWear.text = "替换";
            same = false;
        }
        else {
            s.btnWear.text = "镶嵌";
        }
        if (eq && eq.id > 0 && v.pz > eq.pz) {
            s.btnWear.checkNotice = true;
        }
        else if (!eq || eq.id == 0) {
            s.btnWear.checkNotice = true;
        }
        else {
            s.btnWear.checkNotice = false;
        }
        if (same) {
            s.btnWear.checkNotice = false;
        }
        s.btnDown.visible = s.btnDown.touchable = false;
    };
    SixWayBagItem.prototype.setEqu = function (v, pos) {
        var s = this;
        s.vo = v;
        s._equipPos = pos;
        if (v && v.id > 0) {
            s.btnDown.visible = s.btnDown.touchable = true;
        }
        else {
            s.btnDown.visible = s.btnDown.touchable = false;
        }
        s.btnWear.visible = s.btnWear.touchable = false;
    };
    /**
     * 镶嵌
     */
    SixWayBagItem.prototype.onWear = function () {
        var modellh = GGlobal.modellh;
        var s = this;
        var eq = modellh.equipArr[s._equipPos];
        if (eq && eq.id > 0 && eq.type == s._vo.type) {
        }
        else {
            //相同的类型不穿
            for (var key in modellh.equipArr) {
                var v = modellh.equipArr[key];
                if (v && v.type == s._vo.type) {
                    ViewCommonWarn.text("同类型印记只可镶嵌1个");
                    return;
                }
            }
        }
        modellh.CG_USE_YINGJI(1, s._vo.id, s._vo.pos, s._equipPos);
    };
    /**
     * 卸下
     */
    SixWayBagItem.prototype.onDown = function () {
        var s = this;
        var posB = -1;
        for (var i = 1; i < 301; i++) {
            if (Model_LunHui.bagMap[i] == null) {
                posB = i;
                break;
            }
        }
        if (posB == -1) {
            ViewCommonWarn.text("符文背包已满");
            return;
        }
        GGlobal.modellh.CG_USE_YINGJI(2, s._vo.id, posB, s._equipPos);
    };
    SixWayBagItem.URL = "ui://ehelf5bh11m1wy";
    return SixWayBagItem;
}(fairygui.GLabel));
__reflect(SixWayBagItem.prototype, "SixWayBagItem");
