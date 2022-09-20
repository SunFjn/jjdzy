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
var LongZDIt = (function (_super) {
    __extends(LongZDIt, _super);
    function LongZDIt() {
        return _super.call(this) || this;
    }
    LongZDIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("activityHall", "LongZDIt"));
    };
    LongZDIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.imgBg = (s.getChild("imgBg"));
        s.imgBg1 = (s.getChild("imgBg1"));
        s.lbInfo = (s.getChild("lbInfo"));
        s.imgright = (s.getChild("imgright"));
        s.imageX = (s.getChild("imageX"));
        s.addClickListener(s.clickHd, s);
        s.imageX.visible = s.imgright.visible == false;
    };
    LongZDIt.prototype.clickHd = function () {
        var m = GGlobal.modelActivityHall;
        if (m.lzd_id == m.lzd_lastId) {
            return;
        }
        this.imgBg.visible = false;
        this.imgBg1.visible = true;
        GGlobal.modelActivityHall.CG_ANSWER_1983(this.idx);
    };
    LongZDIt.prototype.check = function () {
        var s = this;
        var isRight = s.isAnswer;
        s.imgright.visible = isRight;
        s.imageX.visible = !isRight;
        var m = GGlobal.modelActivityHall;
        var isSelect = m.curAnswerID == s.idx;
        s.imgBg.visible = !isSelect;
        s.imgBg1.visible = isSelect;
    };
    LongZDIt.prototype.setdata = function (txt, isAnswer) {
        var s = this;
        s.isAnswer = isAnswer;
        s.lbInfo.text = ["", "A", "B", "C", "D"][s.idx] + "、" + txt;
        var m = GGlobal.modelActivityHall;
        if (m.lzd_id == m.lzd_lastId) {
            this.check();
        }
        else {
            s.imgBg.visible = true;
            s.imgBg1.visible = false;
            s.imageX.visible = s.imgright.visible = false;
        }
    };
    LongZDIt.URL = "ui://1xydor24n7ie2";
    return LongZDIt;
}(fairygui.GComponent));
__reflect(LongZDIt.prototype, "LongZDIt");
