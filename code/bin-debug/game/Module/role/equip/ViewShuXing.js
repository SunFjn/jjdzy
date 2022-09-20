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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewShuXing = (function (_super) {
    __extends(ViewShuXing, _super);
    function ViewShuXing() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(lstLabel.URL, lstLabel);
        _this.loadRes();
        _this.isShowOpenAnimation = false;
        return _this;
    }
    ViewShuXing.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewShuXing"));
    };
    ViewShuXing.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("role", "ViewShuXing").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.content = (this.view.getChild("content"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewShuXing.prototype.onShown = function () {
        var lhCfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
        var sblue = Color.getColorStr(Color.WHITE);
        var green = Color.getColorStr(Color.GREEN);
        var blue = Color.getColorStr(Color.BLUE);
        var voMine = Model_player.voMine;
        var str = "";
        str += "<font color='" + sblue + "'>等级：</font>" + "<font color='" + green + "'>" + voMine.level + "</font>" + "\n";
        var lb = Config.lv_200[voMine.level];
        if (lb)
            str += "<font color='" + sblue + "'>经验：</font>" + "<font color='" + green + "'>" + voMine.exp + "/" + (lb.exp * (1 + lhCfg.exp / 100)) + "</font>" + "\n";
        else
            str += "<font color='" + sblue + "'>经验：</font>" + "<font color='" + green + "'>" + voMine.exp + "/" + lb.exp + "</font>" + "\n";
        var baseAttrs = [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 301, 302, 303, 304, 305, 306, 307, 308];
        var j = baseAttrs.length;
        for (var i = 0; i < j; i++) {
            str += this.createLabel(baseAttrs[i], i == (j - 1));
        }
        this.content.setText(str);
        this.content.reScroll();
        this.resetPosition();
    };
    ViewShuXing.prototype.createLabel = function (idx, isend) {
        if (isend === void 0) { isend = false; }
        var cfg = Config.jssx_002[idx];
        if (!cfg) {
            return "";
        }
        var colorStr = Color.getColorStr(cfg.color);
        var white = Color.getColorStr(Color.WHITE);
        var name = Vo_attr.getAttrName(idx);
        var ret = "<font color='" + white + "'>" + name + "：</font>";
        var mine = Model_player.voMine;
        var value = mine[Enum_Attr.roleAttributes[idx]];
        var needFiexd = Config.jssx_002[idx].type == 2;
        if (needFiexd)
            value = Number(value * 100).toFixed(2) + "%";
        ret += "<font color='" + colorStr + "'>" + value + "</font>";
        if (!isend)
            ret += "\n";
        return ret;
    };
    ViewShuXing.prototype.setvv = function (v) {
        var f = Math.ceil(v * 100);
        f = f / 100;
        return f;
    };
    ViewShuXing.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ROLESHUXING);
    };
    ViewShuXing.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewShuXing.URL = "ui://3tzqotadltpm18";
    return ViewShuXing;
}(UIModalPanel));
__reflect(ViewShuXing.prototype, "ViewShuXing");
