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
 * 六道印记item
 */
var SixWayYinJiItem = (function (_super) {
    __extends(SixWayYinJiItem, _super);
    function SixWayYinJiItem() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    SixWayYinJiItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayYinJiItem"));
    };
    SixWayYinJiItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    SixWayYinJiItem.prototype.setVo = function (v, pos) {
        var s = this;
        s._vo = v;
        s.pos = pos;
        if (v && v.id != 0) {
            s.c1.selectedIndex = 1;
            s.labName1.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
            IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l" + v.pz + ".png");
            IconUtil.setImg(s.iconImg, Enum_Path.SIXWAY_URL + v.icon + ".png");
            s.lbStar.text = v.star + "";
            s.checkNotice = (Model_LunHui.canUpLevel(v) || Model_LunHui.canUpStar(v) || Model_LunHui.canUpPower(v.pos));
        }
        else {
            s.c1.selectedIndex = 0;
            IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "l0.png");
            var curCfg = void 0;
            for (var key in Config.sixdaoyj_505) {
                var cfg = Config.sixdaoyj_505[key];
                if (cfg && cfg.type == pos) {
                    curCfg = cfg;
                    break;
                }
            }
            s.labName.text = HtmlUtil.fontNoSize(curCfg ? curCfg.name : "", "#666666");
            IconUtil.setImg(s.iconImg, null);
            s.checkNotice = Model_LunHui.canWear(pos);
        }
    };
    Object.defineProperty(SixWayYinJiItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SixWayYinJiItem.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            if (this._checkNotice != value) {
                this._checkNotice = value;
                this.noticeImg.visible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SixWayYinJiItem.URL = "ui://ehelf5bh11m1w15";
    return SixWayYinJiItem;
}(fairygui.GButton));
__reflect(SixWayYinJiItem.prototype, "SixWayYinJiItem");
