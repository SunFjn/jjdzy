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
var ActCom_ZFZJ_RankItem = (function (_super) {
    __extends(ActCom_ZFZJ_RankItem, _super);
    function ActCom_ZFZJ_RankItem() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        return _this;
    }
    ActCom_ZFZJ_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZFZJ", "ActCom_ZFZJ_RankItem"));
    };
    ActCom_ZFZJ_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    ActCom_ZFZJ_RankItem.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.rewardArr[index];
    };
    ActCom_ZFZJ_RankItem.prototype.setVo = function (index, roleData, cfg) {
        var self = this;
        if (index <= 3) {
            self.rankLb.text = "";
            self.rankIcon.url = CommonManager.getCommonUrl("rank_" + index);
            self.rankIcon.visible = true;
        }
        else {
            self.rankLb.text = index + "";
            self.rankIcon.visible = false;
        }
        if (roleData) {
            self.nameLb.text = roleData.name + "\n敬酒：" + roleData.zuiyi;
            self.imgNo.visible = false;
        }
        else {
            self.nameLb.text = "";
            self.imgNo.visible = true;
        }
        self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.rewardArr.length;
    };
    ActCom_ZFZJ_RankItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    ActCom_ZFZJ_RankItem.URL = "ui://4h4iwgjrr3jem";
    return ActCom_ZFZJ_RankItem;
}(fairygui.GComponent));
__reflect(ActCom_ZFZJ_RankItem.prototype, "ActCom_ZFZJ_RankItem");
