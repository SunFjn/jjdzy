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
var LZDRankIt = (function (_super) {
    __extends(LZDRankIt, _super);
    function LZDRankIt() {
        return _super.call(this) || this;
    }
    LZDRankIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.imgRank = (s.getChild("imgRank"));
        s.lbRank = (s.getChild("lbRank"));
        s.lbName = (s.getChild("lbName"));
        s.lbScore = (s.getChild("lbScore"));
        s.box = (s.getChild("box"));
        s.box.addClickListener(s.clickHD, s);
    };
    LZDRankIt.prototype.clickHD = function () {
        GGlobal.layerMgr.open(UIConst.LZDBOX, this.idx);
    };
    LZDRankIt.prototype.setdata = function (i, arr) {
        var s = this;
        s.idx = i;
        s.imgRank.visible = i < 4;
        s.lbRank.visible = i > 3;
        if (i < 4) {
            s.imgRank.url = CommonManager.getCommonUrl("rank_" + i);
        }
        else {
            s.lbRank.text = "第" + i + "名";
        }
        s.lbName.text = arr[0];
        s.lbScore.text = arr[1] + "";
    };
    LZDRankIt.URL = "ui://1xydor24n7ie5";
    return LZDRankIt;
}(fairygui.GComponent));
__reflect(LZDRankIt.prototype, "LZDRankIt");
