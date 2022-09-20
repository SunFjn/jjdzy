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
var ViewWenDingTXTopUI = (function (_super) {
    __extends(ViewWenDingTXTopUI, _super);
    function ViewWenDingTXTopUI() {
        return _super.call(this) || this;
    }
    ViewWenDingTXTopUI.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXTopUI"));
        }
        return this._inst;
    };
    ViewWenDingTXTopUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n27 = (this.getChild("n27"));
        this.n28 = (this.getChild("n28"));
        this.n29 = (this.getChild("n29"));
        this.lbTime = (this.getChild("lbTime"));
        this.lbAwards = (this.getChild("lbAwards"));
        this.lbMapName = (this.getChild("lbMapName"));
        this.lbDesc = (this.getChild("lbDesc"));
        this.lb = (this.getChild("lb"));
        this.n10 = (this.getChild("n10"));
        this.n32 = (this.getChild("n32"));
        this.imghead = (this.getChild("imghead"));
        this.imgHeadGrid = (this.getChild("imgHeadGrid"));
        this.n17 = (this.getChild("n17"));
        this.lbMVPName = (this.getChild("lbMVPName"));
        this.g0 = (this.getChild("g0"));
        this.g1 = (this.getChild("g1"));
        this.g2 = (this.getChild("g2"));
        this.n30 = (this.getChild("n30"));
        this.n31 = (this.getChild("n31"));
        this.n33 = (this.getChild("n33"));
        this.n38 = (this.getChild("n38"));
        this.lbKillCount = (this.getChild("lbKillCount"));
        this.groupInfo = (this.getChild("groupInfo"));
        this.n39 = (this.getChild("n39"));
        this.n34 = (this.getChild("n34"));
        this.n34.text = HtmlUtil.createLink("隐藏");
        this.lbDesc.text = HtmlUtil.createLink("玩法说明");
        this.grids = [this.g0, this.g1, this.g2];
    };
    ViewWenDingTXTopUI.prototype.openDesc = function (evt) {
        evt.stopPropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.WENDINGTX);
    };
    ViewWenDingTXTopUI.prototype.timingHD = function () {
        var m = GGlobal.modelWenDingTX;
        var now = Model_GlobalMsg.getServerTime();
        var limt = m.activiyEndTime - now;
        if (limt > 0) {
            this.lbTime.text = "活动时间：<font color='#ffffff'>" + DateUtil.getMSBySec3((limt / 1000) >> 0, ":") + "</font>";
        }
        else {
            this.lbTime.text = "活动已结束";
        }
        var progres = ((m.fixedTimeAwards - now) / 1000) >> 0;
        progres = progres > 0 ? progres : 0;
        this.lb.text = "收益发放倒计时:<font color='#ffffff'>" + progres + "s</font>";
    };
    ViewWenDingTXTopUI.prototype.pushData = function () {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        if (m.layer == 0)
            return;
        var cfg = Config.wdtx_260[m.layer];
        s.lbAwards.text = "<font color='#ffffff'>" + ConfigHelp.makeItemRewardText(cfg.reward) + "\n积分*" + cfg.point1 + "</font>";
        s.lbMapName.text = "第" + m.layer + "层";
        s.n10.text = cfg.tips;
        s.lbKillCount.text = "" + m.kill_count;
        this.n39.visible = m.kill_count >= 3;
        s.lbMVPName.text = m.mvp_name;
        if (!m.mvpHeadGrid_id) {
            this.imgHeadGrid.visible = false;
            this.imghead.visible = false;
            this.n38.visible = true;
        }
        else {
            this.n38.visible = false;
            this.imghead.visible = true;
            this.imgHeadGrid.visible = true;
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid_id + ""), this.imgHeadGrid);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead_id + ""), this.imghead);
        }
    };
    ViewWenDingTXTopUI.prototype.setInfoVis = function (e) {
        e.stopPropagation();
        this.groupInfo.visible = !this.groupInfo.visible;
        this.n34.text = this.groupInfo.visible ? HtmlUtil.createLink("隐藏") : HtmlUtil.createLink("显示");
    };
    ViewWenDingTXTopUI.prototype.toShow = function () {
        var s = this;
        var pat = GGlobal.layerMgr.UI_MainBottom;
        pat.addChild(s);
        s.resetPostion();
        s.pushData();
        s.n34.addEventListener(egret.TextEvent.LINK, s.setInfoVis, s);
        s.lbDesc.addEventListener(egret.TextEvent.LINK, s.openDesc, s);
        Timer.instance.listen(s.timingHD, s, 1000);
        GGlobal.control.listen(Enum_MsgType.WDTX_MINE_UPDATE, s.pushData, s);
        GGlobal.control.listen(Enum_MsgType.WDTX_MVP, s.pushData, s);
        var yuxiAwards = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(4702)));
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = true;
            this.grids[i].vo = yuxiAwards[i];
            this.grids[i].showEff(true);
        }
    };
    ViewWenDingTXTopUI.prototype.toHide = function () {
        var s = this;
        s.n34.removeEventListener(egret.TextEvent.LINK, s.setInfoVis, s);
        s.lbDesc.removeEventListener(egret.TextEvent.LINK, s.openDesc, s);
        GGlobal.control.remove(Enum_MsgType.WDTX_MVP, s.pushData, s);
        GGlobal.control.remove(Enum_MsgType.WDTX_MINE_UPDATE, s.pushData, s);
        Timer.instance.remove(s.timingHD, s);
        for (var i = 0; i < 3; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
        s.removeFromParent();
    };
    ViewWenDingTXTopUI.prototype.resetPostion = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign + 46);
    };
    ViewWenDingTXTopUI.URL = "ui://gxs8kn67fl2h0";
    return ViewWenDingTXTopUI;
}(fairygui.GComponent));
__reflect(ViewWenDingTXTopUI.prototype, "ViewWenDingTXTopUI");
