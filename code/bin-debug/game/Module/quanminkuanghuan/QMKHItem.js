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
var QMKHItem = (function (_super) {
    __extends(QMKHItem, _super);
    function QMKHItem() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.completedVal = 0;
        _this.panelId = 0;
        return _this;
    }
    QMKHItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("QMKH", "QMKHItem"));
    };
    QMKHItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.jifenLb = (a.getChild("jifenLb"));
        a.drawBt = (a.getChild("drawBt"));
        a.goBt = (a.getChild("goBt"));
        a.drawImg = (a.getChild("drawImg"));
        for (var i = 0; i < 4; i++) {
            var grid = (a.getChild("grid" + i));
            grid.isShowEff = true;
            a.gridArr.push(grid);
        }
        a.drawBt.addClickListener(a.OnDraw, a);
        a.goBt.addClickListener(a.OnDraw, a);
    };
    QMKHItem.prototype.OnDraw = function () {
        if (this.cfg.state == 0) {
            GGlobal.layerMgr.open(this.cfg.UI);
            return;
        }
        GGlobal.modelqmkh.CG_QUANMINKUANGHUAN_DRAWREWARD(this.cfg.id, this.panelId);
    };
    QMKHItem.prototype.show = function (cfg, value) {
        var a = this;
        var model = GGlobal.modelqmkh;
        a.cfg = cfg;
        a.panelId = value;
        a.completedVal = GGlobal.modelqmkh.completeObj[a.panelId];
        var color = a.completedVal >= cfg.yq ? 2 : 6;
        a.jifenLb.text = cfg.tips + HtmlUtil.fontNoSize("(" + a.completedVal + "/" + cfg.yq + ")", Color.getColorStr(color));
        if (!cfg.state)
            cfg.state = 0;
        if (cfg.state == 0 && a.completedVal >= cfg.yq)
            cfg.state = 1;
        a.drawImg.visible = cfg.state == 2;
        a.goBt.visible = cfg.state == 0;
        a.drawBt.visible = a.drawBt.checkNotice = cfg.state == 1;
        var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < a.gridArr.length; i++) {
            var grid = a.gridArr[i];
            if (i < reward.length) {
                grid.visible = true;
                grid.vo = reward[i];
                grid.tipEnabled = true;
            }
            else {
                grid.visible = false;
            }
        }
    };
    QMKHItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.gridArr);
    };
    QMKHItem.URL = "ui://vrex0iz4woj23";
    return QMKHItem;
}(fairygui.GComponent));
__reflect(QMKHItem.prototype, "QMKHItem");
