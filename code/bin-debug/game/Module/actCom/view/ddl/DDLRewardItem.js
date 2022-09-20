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
var DDLRewardItem = (function (_super) {
    __extends(DDLRewardItem, _super);
    function DDLRewardItem() {
        return _super.call(this) || this;
    }
    DDLRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    DDLRewardItem.prototype.setVo = function (vo) {
        var self = this;
        self._vo = vo;
        self._cfg = Config.ddlreward_297[vo.id];
        self.lbCount.text = "对" + self._cfg.num + "联";
        self.btnAward.addClickListener(self.onGetAward, self);
        self.c1.selectedIndex = vo.status >= 2 ? 1 : 0;
        self.btnAward.checkNotice = vo.status == 1 ? true : false;
    };
    DDLRewardItem.prototype.onGetAward = function (e) {
        GGlobal.layerMgr.open(UIConst.DDL_REWARD, { cfg: this._cfg });
    };
    DDLRewardItem.URL = "ui://ke8qv0cktcq69";
    return DDLRewardItem;
}(fairygui.GComponent));
__reflect(DDLRewardItem.prototype, "DDLRewardItem");
