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
var LiangCaoPersonItem = (function (_super) {
    __extends(LiangCaoPersonItem, _super);
    function LiangCaoPersonItem() {
        var _this = _super.call(this) || this;
        _this.render = function (idx, obj) {
            var item = obj;
            item.tipEnabled = true;
            item.isShowEff = true;
            item.vo = _this.awards[idx];
        };
        _this.setdata = function (idx) {
            var self = _this;
            var data = GGlobal.modelLiangCao.rankdata_person;
            if (idx > 2) {
                self.n2.visible = false;
                self.lbRank.text = idx + 1 + "";
            }
            else {
                self.n2.visible = true;
                self.n2.url = CommonManager.getCommonUrl("rank_" + (idx + 1));
                self.lbRank.text = "";
            }
            if (data[idx]) {
                var item = data[idx];
                self.imgNull.visible = false;
                self.groupDta.visible = true;
                self.lbName.text = item.name;
                self.lbScore.text = "总积分：" + item.score;
            }
            else {
                self.imgNull.visible = true;
                self.groupDta.visible = false;
            }
            var cfg = ModelLiangCao.getPersonalCFG(idx);
            ConfigHelp.createViewGridList(self.list, cfg.reward, self);
        };
        return _this;
    }
    LiangCaoPersonItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "LiangCaoPersonItem"));
    };
    LiangCaoPersonItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.imgNull.visible = false;
    };
    LiangCaoPersonItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    LiangCaoPersonItem.URL = "ui://mbcu0qc0hd20a";
    return LiangCaoPersonItem;
}(fairygui.GComponent));
__reflect(LiangCaoPersonItem.prototype, "LiangCaoPersonItem");
