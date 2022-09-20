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
 * 六道item
 */
var SixWayItem = (function (_super) {
    __extends(SixWayItem, _super);
    function SixWayItem() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    SixWayItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayItem"));
    };
    SixWayItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    SixWayItem.prototype.setdata = function (id, index) {
        var s = this;
        var cfg1;
        for (var key in Config.sixdao_505) {
            var cfg = Config.sixdao_505[key];
            if (Math.floor(cfg.id / 10) == (index + 1)) {
                cfg1 = cfg;
                break;
            }
        }
        if (id <= 0) {
            if (Model_player.voMine.reincarnationLevel >= cfg1.lh) {
                s.c1.selectedIndex = 1;
            }
            else {
                s.c1.selectedIndex = 0;
                s.lbActivate.text = cfg1.lh + "世轮回开启";
            }
            for (var key in Config.sixdaotz_505) {
                var cfg = Config.sixdaotz_505[key];
                if (cfg.type == (index + 1)) {
                    s._cfg = cfg;
                    break;
                }
            }
            IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + s._cfg.type + ".jpg");
            IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k0.png");
            s.nameLb.text = HtmlUtil.fontNoSize(s._cfg.name + "(2/4/6)", "#666666");
            // let attArr: Array<any> = JSON.parse(s._cfg.attr);
            // let attstr:string = "";
            // for (let i = 0; i < attArr.length; i++) {
            // 	attstr += Vo_attr.getShowStr(attArr[i][0], 0);
            // }
            s.proLb.text = "尚未激活";
        }
        else {
            s.c1.selectedIndex = 1;
            s._cfg = Config.sixdaotz_505[id];
            if (!s._cfg)
                return;
            var str = "";
            if (s._cfg.num == 2) {
                str = "(" + HtmlUtil.fontNoSize("2", Color.WHITESTR) + "/4/6)";
            }
            else if (s._cfg.num == 4) {
                str = "(2/" + HtmlUtil.fontNoSize("4", Color.WHITESTR) + "/6)";
            }
            else {
                str = "(2/4/" + HtmlUtil.fontNoSize("6", Color.WHITESTR) + ")";
            }
            s.nameLb.text = ConfigHelp.createColorName(s._cfg.name, s._cfg.pz) + str;
            // let attArr: Array<any> = JSON.parse(s._cfg.attr);
            // let attstr:string = "";
            // for (let i = 0; i < attArr.length; i++) {
            // 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
            // }
            s.proLb.text = s._cfg.tips;
            s.proLb.color = Color.WHITEINT;
            IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + s._cfg.type + ".jpg");
            IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k" + s._cfg.pz + ".png");
        }
        s.addClickListener(s.onClick, s);
        s.checkNotice = GGlobal.reddot.checkCondition(UIConst.SIXWAY, index);
    };
    /**
     * 点击事件
     */
    SixWayItem.prototype.onClick = function (e) {
        if (this.c1.selectedIndex <= 0)
            return;
        Model_LunHui.type = this._cfg.type;
        // GGlobal.layerMgr.close2(UIConst.SIXWAY);
        // GGlobal.layerMgr.close2(UIConst.LUNHUI);
        // GGlobal.layerMgr.close2(UIConst.TIANMING);
        GGlobal.layerMgr.open(UIConst.SIXWAY_YINJI, Model_LunHui.type);
    };
    Object.defineProperty(SixWayItem.prototype, "checkNotice", {
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
    SixWayItem.URL = "ui://ehelf5bh11m1ww";
    return SixWayItem;
}(fairygui.GComponent));
__reflect(SixWayItem.prototype, "SixWayItem");
