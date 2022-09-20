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
var JuBaoPIt = (function (_super) {
    __extends(JuBaoPIt, _super);
    function JuBaoPIt() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.grids = [];
        return _this;
    }
    JuBaoPIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("jubaopeng", "JuBaoPIt"));
    };
    JuBaoPIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn = (this.getChild("btn"));
        this.pic = (this.getChild("pic"));
        this.lbCondition = (this.getChild("lbCondition"));
        this.btn.addClickListener(this.clickhd, this);
        this.n9 = (this.getChild("n9"));
        this.n9.callbackThisObj = this;
        this.n9.itemRenderer = this.awardsRender;
    };
    JuBaoPIt.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    JuBaoPIt.prototype.clickhd = function () {
        GGlobal.modelJBP.CG_GET(this.idx);
    };
    JuBaoPIt.prototype.clean = function () {
        this.n9.numItems = 0;
    };
    JuBaoPIt.prototype.setdata = function (dta, type, isBuy) {
        var s = this;
        var st = dta[0];
        var index = dta[2];
        s.idx = type * 1000 + index + 1;
        var lib = Config.jbp_718[s.idx];
        s.pic.visible = st == 2;
        s.btn.visible = st != 2;
        s.btn.enabled = st == 1 && isBuy;
        s.btn.checkNotice = st == 1 && isBuy;
        var str;
        var arr = JSON.parse(lib.NEED);
        switch (type) {
            case 1:
                str = GGlobal.modelJBP.day + "/" + arr[1] + "天";
                break;
            case 2:
                str = GGlobal.modelGuanQia.curGuanQiaLv + "/" + arr[1] + "关";
                break;
            case 3:
                // str = Model_player.voMine.level + "/" + arr[1] + "级"
                str = Model_LunHui.realLv + "/" + arr[1] + "级";
                break;
            case 4:
                str = Model_player.voMine.str + "/" + arr[1];
                break;
        }
        if (st == 1 || st == 2) {
            s.lbCondition.text = lib.SEC + "<font color='#15f234'>(" + str + ")</font>";
        }
        else {
            s.lbCondition.text = lib.SEC + "<font color='#ed1414'>(" + str + ")</font>";
        }
        s.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
        s.n9.numItems = s.awards.length;
    };
    JuBaoPIt.URL = "ui://fr83a88vm8f81";
    return JuBaoPIt;
}(fairygui.GComponent));
__reflect(JuBaoPIt.prototype, "JuBaoPIt");
