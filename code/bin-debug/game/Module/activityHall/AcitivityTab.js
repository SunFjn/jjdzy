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
var AcitivityTab = (function (_super) {
    __extends(AcitivityTab, _super);
    function AcitivityTab() {
        return _super.call(this) || this;
    }
    AcitivityTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("activityHall", "AcitivityTab"));
    };
    AcitivityTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lbDesc.text = HtmlUtil.createLink("玩法说明", true);
        s.lbDesc.addEventListener(egret.TextEvent.LINK, s.onTFClick, s);
        s.btnGo.addClickListener(s.onGO, s);
        s.grids = [s.g0, s.g1, s.g2, s.g3];
        s._flagArr = [s.i0, s.i1, s.i2];
    };
    AcitivityTab.prototype.onRemove = function () {
        IconUtil.setImg(this.imgBg, null);
        IconUtil.setImg(this.imgTitle, null);
    };
    AcitivityTab.prototype.onTFClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, this.idx);
    };
    AcitivityTab.prototype.onGO = function () {
        if (this.idx != UIConst.WENDINGTX) {
            if (ModuleManager.isOpen(this.idx, true) == false) {
                return;
            }
        }
        switch (this.idx) {
            case UIConst.FHLY:
                if (TimeUitl.cool("AcitivityTabFHLY", 3000)) {
                    GGlobal.modelFengHuoLY.enter();
                }
                break;
            case UIConst.WENDINGTX:
                if (TimeUitl.cool("AcitivityTabwdtx", 3000)) {
                    GGlobal.modelWenDingTX.enterAct4223();
                }
                break;
            case UIConst.QXZL:
                GGlobal.layerMgr.open(UIConst.QXZL, { from: UIConst.ACTIVITYHALL });
                break;
            case UIConst.LIANGCAO:
                GGlobal.modelLiangCao.CG_BattleGoods_inscene_10101();
                break;
            default:
                GGlobal.layerMgr.open(this.idx);
                break;
        }
    };
    AcitivityTab.prototype.setIdx = function (val, pos) {
        var sf = this;
        sf.idx = val;
        sf.listen();
        IconUtil.setImg(sf.imgTitle, Enum_Path.PIC_URL + val + "a.png");
        IconUtil.setImg(sf.imgBg, "resource/image/actpreview/" + val + ".png");
        var cfg = Config.hddt_200[val];
        sf.lbTime.text = cfg.time;
        sf.drawFlag(cfg.kf);
        sf.setMvp(val);
        sf.checkNotice(val);
        sf.showAwards(cfg);
    };
    AcitivityTab.prototype.drawFlag = function (kf) {
        var flags = [];
        if (kf != '0') {
            flags = JSON.parse(kf)[0];
        }
        var len = flags.length;
        for (var i = 0; i < this._flagArr.length; i++) {
            if (i < len) {
                var url = void 0;
                switch (flags[i]) {
                    case 1:
                        url = "ui://1xydor24vuo012";
                        break; //跨服
                    case 2:
                        url = "ui://1xydor24ljbu15";
                        break; //测试
                    case 3:
                        url = "ui://1xydor24vuo012";
                        break; //重要
                }
                this._flagArr[i].url = url;
                this._flagArr[i].visible = true;
            }
            else {
                this._flagArr[i].visible = false;
            }
        }
    };
    AcitivityTab.prototype.setMvp = function (val) {
        var sf = this;
        if (val == UIConst.SHAOZHU_ESCORT || val == UIConst.MHBOSS || val == UIConst.KFWZ || val == UIConst.XU_TIAN || val == UIConst.GCBZ) {
            sf.n15.visible = false;
            sf.lbName.text = "";
            return;
        }
        var mvp = GGlobal.modelActivityHall.getMVp(val);
        sf.n15.visible = true;
        if (mvp == '') {
            if (val == UIConst.LONGZHONGDUI) {
                sf.lbName.text = '上届第一：暂无';
            }
            else {
                sf.lbName.text = '上届MVP：暂无';
            }
        }
        else {
            if (val == UIConst.LONGZHONGDUI) {
                sf.lbName.text = '上届状元：' + mvp;
            }
            else if (val == UIConst.WENDINGTX) {
                sf.lbName.text = '真龙天子：' + mvp;
            }
            else {
                sf.lbName.text = '上届MVP：' + mvp;
            }
        }
    };
    AcitivityTab.prototype.showAwards = function (cfg) {
        var sf = this;
        var mvpcfg = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        for (var i = 0; i < 4; i++) {
            if (i < mvpcfg.length) {
                sf.grids[i].visible = true;
                sf.grids[i].vo = mvpcfg[i];
                sf.grids[i].tipEnabled = true;
                sf.grids[i].showEff(true);
                sf.grids[i].tipEnabled = true;
            }
            else {
                sf.grids[i].visible = false;
            }
        }
    };
    AcitivityTab.prototype.checkNotice = function (val) {
        this.imgNotice.visible = GGlobal.modelActivityHall.checkNotice(val);
    };
    AcitivityTab.prototype.listen = function () {
        var s = this;
        s.lbDesc.addEventListener(egret.TextEvent.LINK, s.onTFClick, s);
        s.btnGo.addClickListener(s.onGO, s);
        s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
    };
    AcitivityTab.prototype.clean = function () {
        var s = this;
        s.lbDesc.removeEventListener(egret.TextEvent.LINK, s.onTFClick, s);
        s.btnGo.removeClickListener(s.onGO, s);
        s.displayObject.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
        for (var i = 0; i < 4; i++) {
            s.grids[i].showEff(false);
            s.grids[i].visible = false;
        }
    };
    AcitivityTab.URL = "ui://1xydor24oc0js";
    return AcitivityTab;
}(fairygui.GComponent));
__reflect(AcitivityTab.prototype, "AcitivityTab");
