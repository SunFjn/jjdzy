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
var LiangCaoScoreItem = (function (_super) {
    __extends(LiangCaoScoreItem, _super);
    function LiangCaoScoreItem() {
        var _this = _super.call(this) || this;
        _this.clickHD = function () {
            GGlobal.modelLiangCao.CG_BattleGoods_getreward_10125(_this.idx);
        };
        _this.setdata = function (idx) {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            var data = model.rankdata_score;
            var scoredata = data[idx];
            var id = scoredata.id;
            self.idx = id;
            var st = scoredata.st;
            self.imgYLQ.visible = st == 2;
            self.btnGet.enabled = st == 1;
            self.btnGet.visible = st != 2;
            var myscore = model.myScore;
            var cfg = Config.ricemb_290[id];
            var color = cfg.point <= myscore ? Color.GREENSTR : Color.REDSTR;
            self.lbDesc.text = BroadCastManager.reTxt("积分达到{0}<font color='{1}'>({2}/{3})</font>", cfg.point, color, myscore, cfg.point);
            self.btnGet.addClickListener(self.clickHD, self);
            ConfigHelp.createViewGridList(self.list, cfg.reward, self);
        };
        return _this;
    }
    LiangCaoScoreItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "LiangCaoScoreItem"));
    };
    LiangCaoScoreItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    LiangCaoScoreItem.prototype.clean = function () {
        this.list.numItems = 0;
        this.btnGet.removeClickListener(this.clickHD, self);
    };
    LiangCaoScoreItem.URL = "ui://mbcu0qc0hd20f";
    return LiangCaoScoreItem;
}(fairygui.GComponent));
__reflect(LiangCaoScoreItem.prototype, "LiangCaoScoreItem");
