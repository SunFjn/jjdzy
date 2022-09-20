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
var LiangCaoServerItem = (function (_super) {
    __extends(LiangCaoServerItem, _super);
    function LiangCaoServerItem() {
        var _this = _super.call(this) || this;
        _this.setdata = function (idx) {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            var data = model.server_data;
            self.n111.url = CommonManager.getCommonUrl("rank_" + (idx + 1));
            if (data[idx]) {
                var serverdata = data[idx];
                self.lbName.text = serverdata.zoneid;
                self.lbScore.text = "总积分：" + serverdata.score;
                self.groupServer.visible = true;
                self.lbNull.visible = false;
            }
            else {
                self.lbNull.visible = true;
                self.groupServer.visible = false;
            }
            ConfigHelp.createViewGridList(self.list, Config.ricerank_290[idx + 1].reward, self);
        };
        return _this;
    }
    LiangCaoServerItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "LiangCaoServerItem"));
    };
    LiangCaoServerItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    LiangCaoServerItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    LiangCaoServerItem.URL = "ui://mbcu0qc0hd20d";
    return LiangCaoServerItem;
}(fairygui.GComponent));
__reflect(LiangCaoServerItem.prototype, "LiangCaoServerItem");
