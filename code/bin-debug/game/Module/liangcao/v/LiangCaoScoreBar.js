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
var LiangCaoScoreBar = (function (_super) {
    __extends(LiangCaoScoreBar, _super);
    function LiangCaoScoreBar() {
        var _this = _super.call(this) || this;
        //idx 索引  type：1为结算界面 需要显示胜负  2为活动内显示积分
        _this.setdata = function (idx, type, score) {
            var self = _this;
            var m = GGlobal.modelLiangCao;
            var data = m.server_data;
            var selfZone = "-1";
            var camp = 1;
            if (data[idx]) {
                var item = data[idx];
                ;
                selfZone = item.zoneid;
                camp = item.camp;
                self.n2.text = item.zoneid;
                self.n3.text = item.score + "";
                var wid = 218 * item.score / score;
                wid = item.score == 0 ? 0 : wid;
                self.hp1.width = wid;
            }
            else {
                self.hp1.width = 0;
                self.n2.text = "轮空";
                self.n3.text = "";
            }
            self.hp1.url = ["", "ui://mbcu0qc0lipbp", "ui://mbcu0qc0lipbo", "ui://mbcu0qc0lipbn"][camp];
            self.n4.visible = type != 2 && m.winZone == selfZone;
        };
        return _this;
    }
    LiangCaoScoreBar.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "LiangCaoScoreBar"));
    };
    LiangCaoScoreBar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    LiangCaoScoreBar.URL = "ui://mbcu0qc0hd202";
    return LiangCaoScoreBar;
}(fairygui.GComponent));
__reflect(LiangCaoScoreBar.prototype, "LiangCaoScoreBar");
