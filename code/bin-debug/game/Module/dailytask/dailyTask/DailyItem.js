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
var DailyItem = (function (_super) {
    __extends(DailyItem, _super);
    function DailyItem() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        return _this;
    }
    DailyItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "DailyItem"));
    };
    DailyItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.progress = (s.getChild("progress"));
        s.btnLQ = (s.getChild("btnLQ"));
        s.btn = (s.getChild("btn"));
        s.lbAwards = (s.getChild("lbAwards"));
        s.lbTitle = (s.getChild("lbTitle"));
        s.lbHuoYue = (s.getChild("lbHuoYue"));
        s.imgYWC = (s.getChild("imgYWC"));
        s.btnLQ.checkNotice = true;
        s.btnLQ.addClickListener(s.getAwardsHandler, s);
        s.btn.addClickListener(s.getAwardsHandler, s);
    };
    DailyItem.prototype.getAwardsHandler = function (e) {
        if (!this._vo) {
            return;
        }
        var st = this._vo.state;
        if (st == 0) {
            e.stopPropagation();
            GGlobal.layerMgr.close2(UIConst.DAILYTASK);
            GGlobal.layerMgr.backPanelId = UIConst.DAILYTASK;
            if (this._link == UIConst.CHAT && Model_GlobalMsg.kaifuDay <= 7) {
                GGlobal.layerMgr.open(this._link, 1);
            }
            else {
                GGlobal.layerMgr.open(this._link);
            }
        }
        else if (st == 1)
            GGlobal.modeltask.CG_AWARDS_1053(this._vo.id);
    };
    DailyItem.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    DailyItem.prototype.setVO = function (vo) {
        var s = this;
        s._vo = vo;
        s.progress.max = vo.max;
        s._link = vo.link;
        s.progress.value = vo.progress;
        s.lbAwards.text = ConfigHelp.makeItemRewardText(vo.award, "  ", "+");
        s.lbTitle.text = vo.name;
        s.lbHuoYue.text = "活跃度+" + vo.huoyuedu;
        ConfigHelp.cleanGridview(s.grids);
        var awards = ConfigHelp.makeItemListArr(JSON.parse(vo.icon));
        ;
        s.grids = ConfigHelp.addGridview(awards, s, 10, 10, false, false);
        s.imgYWC.visible = vo.state == 2;
        s.btn.visible = vo.state == 0;
        s.btnLQ.visible = vo.state == 1;
    };
    DailyItem.URL = "ui://b3p8szvvtw1l2";
    return DailyItem;
}(fairygui.GComponent));
__reflect(DailyItem.prototype, "DailyItem");
