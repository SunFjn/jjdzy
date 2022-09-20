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
var QunYingBIt = (function (_super) {
    __extends(QunYingBIt, _super);
    function QunYingBIt() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        return _this;
    }
    QunYingBIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("qunyingbang", "QunYingBIt"));
    };
    QunYingBIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbName = (s.getChild("lbName"));
        s.imgRank = (s.getChild("imgRank"));
        s.lbRank = (s.getChild("lbRank"));
        s.n8 = (s.getChild("n8"));
        s.n8.callbackThisObj = s;
        s.n8.itemRenderer = s.awardsRender;
    };
    QunYingBIt.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    QunYingBIt.prototype.clean = function () {
        this.n8.numItems = 0;
    };
    QunYingBIt.prototype.setdata = function (dta) {
        var s = this;
        s.lbName.text = dta[2] + "\n积分：" + dta[3];
        if (dta[0] < 4) {
            s.imgRank.visible = true;
            s.lbRank.visible = false;
            s.imgRank.url = CommonManager.getCommonUrl("rank_" + dta[0]);
        }
        else {
            s.lbRank.visible = true;
            s.lbRank.text = "第" + dta[0] + "名";
            s.imgRank.visible = false;
        }
        var d = GGlobal.model_QunYingBang.day;
        var award = Model_QunYingBang.getLibByID(dta[0]);
        award = JSON.parse(award["reward" + d]);
        s.awards = ConfigHelp.makeItemListArr(award);
        s.n8.numItems = s.awards.length;
    };
    QunYingBIt.URL = "ui://pxel4rmbwzou1";
    return QunYingBIt;
}(fairygui.GComponent));
__reflect(QunYingBIt.prototype, "QunYingBIt");
