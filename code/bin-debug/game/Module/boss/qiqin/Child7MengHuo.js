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
var Child7MengHuo = (function (_super) {
    __extends(Child7MengHuo, _super);
    function Child7MengHuo() {
        var _this = _super.call(this) || this;
        _this._cur = 0;
        _this.si = 0;
        _this._awards = [];
        _this._awards1 = [];
        _this._lstDta = [];
        fairygui.UIObjectFactory.setPackageItemExtension(MHTab.URL, MHTab);
        return _this;
    }
    Child7MengHuo.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "Child7MengHuo"));
    };
    Child7MengHuo.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child7MengHuo.prototype.openPanel = function (pData) {
        this.open();
    };
    Child7MengHuo.prototype.closePanel = function (pData) {
        this.close();
    };
    Child7MengHuo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itemRenderer;
        s.btnRank.text = "<u>查看上期排名</u>";
    };
    Child7MengHuo.prototype.itemRenderer = function (index, obj) {
        var t = obj;
        var v = this._lstDta[this.si + index];
        t.setVO(v);
        var sl = false;
        var z = (Model_player.voMine.zsID / 1000) >> 0;
        if (z == 0) {
            if (index == 0) {
                sl = true;
            }
        }
        else if (z >= v.sortIndex && z <= v.sortMxIndex) {
            sl = true;
        }
        if (sl)
            this._cur = this.si + index;
        t.setSel(sl);
    };
    Child7MengHuo.prototype.rankHander = function () {
        GGlobal.layerMgr.open(UIConst.MHRANK, { type: 0, id: this._vo.id });
    };
    Child7MengHuo.prototype.setdate = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        s.si = m.dtaIndex;
        s._lstDta = m.mhCFG;
        s.lst.numItems = 4;
        var vo = this._vo = s._lstDta[s._cur];
        GGlobal.modelBoss.mhid = vo.id;
        s.lbName.text = Config.NPC_200[vo.id].name;
        ConfigHelp.cleanGridview(s._awards);
        ConfigHelp.cleanGridview(s._awards1);
        s._awards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.showAward), this, 380, 336, true, false, 2, 110);
        s._awards1 = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.killerAward), this, 440, 600, true, false, 2);
        s.lbAdd.text = "再起：BOSS生命提高<font color='" + Color.GREENSTR + "'>" + (m.hpMul * 100) + "%</font>";
        if (m.mhCount > 0)
            s.lbCount.text = "进入次数：<font color='" + Color.GREENSTR + "'>" + m.mhCount + "/5</font>";
        else
            s.lbCount.text = "进入次数：<font color='" + Color.REDSTR + "'>" + m.mhCount + "/5</font>";
        s.lbKiller.text = m.MHKiller;
    };
    Child7MengHuo.prototype.buyHandler = function () {
        var m = GGlobal.modelBoss;
        var mx = ConfigHelp.getSystemNum(1083);
        // if (m.mhCount >= 1) {
        // 	ViewCommonWarn.text("还有次数，无法购买");
        // } else 
        if (m.mhBuyCount >= mx) {
            ViewCommonWarn.text("没有剩余购买次数");
        }
        else {
            var n = ConfigHelp.getSystemNum(1082);
            ViewAlert.show("是否消耗<font color='" + Color.YELLOWSTR + "'>" + n + "元宝</font>购买次数？", Handler.create(this, this.send_buyHd));
        }
    };
    Child7MengHuo.prototype.send_buyHd = function () {
        var n = ConfigHelp.getSystemNum(1082);
        if (Model_player.voMine.yuanbao < n) {
            ModelChongZhi.guideToRecharge();
        }
        else {
            GGlobal.modelBoss.GC_MHCOUNT_1707();
        }
    };
    Child7MengHuo.prototype.fightHander = function () {
        var z = (Model_player.voMine.zsID / 1000) >> 0;
        if (z == 0) {
            ViewCommonWarn.text("等级不足");
            return;
        }
        // if(GGlobal.modelBoss.mhCount <= 0){
        // 	this.buyHandler();
        // 	return;
        // }
        if (GGlobal.sceneType == SceneCtrl.MENGHUO)
            return;
        if (TimeUitl.cool("Child7MengHuofightHander", 2000)) {
            GGlobal.layerMgr.close2(UIConst.MHBOSS);
            GGlobal.modelBoss.CG_MHENTER_1709();
        }
    };
    Child7MengHuo.prototype.update = function () {
        var m = GGlobal.modelBoss;
        var t = m.MHcd;
        var r = true;
        var vo = m.getCurrentMHVO();
        if (vo != undefined) {
            var arr = GGlobal.modelBoss.mhBossDeadList;
            r = arr.indexOf(vo.id) < 0;
        }
        if (m.mhState == 2 && r) {
            var c = ((m.MHcd - Model_GlobalMsg.getServerTime()) / 1000) >> 0;
            if (c > 0) {
                this.lbTime.visible = true;
                this.lbTime.text = "进入冷却倒计时：" + c + "s";
                m.MHcd--;
            }
            else {
                this.lbTime.visible = false;
            }
        }
        else {
            this.lbTime.visible = true;
            var st = Model_GlobalMsg.getServerTime();
            var nowd = new Date(st);
            var nowH = nowd.getHours();
            var nowM = nowd.getMinutes();
            var nows = nowd.getSeconds();
            var h = 0;
            if (nowH < 8) {
                h = 8 - nowH;
            }
            else if (nowH >= 23) {
                h = 32 - nowH;
            }
            nows = 60 - nows;
            nowM = 59 - nowM;
            var d = nowM < 10 ? "0" + nowM : nowM;
            var s = nows < 10 ? "0" + nows : nows;
            this.lbTime.text = "孟获刷新倒计时：" + h + ":" + d + ":" + s;
        }
    };
    Child7MengHuo.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        m.initMH();
        s.setdate();
        if (!s.awatar) {
            s.awatar = UIRole.create();
            s.awatar.uiparent = s.displayListContainer;
            s.awatar.setPos(178, 654);
            s.awatar.setScaleXY(1.5, 1.5);
        }
        var lb = Config.NPC_200[240001];
        s.awatar.setBody(lb.mod);
        if (lb.weapon) {
            s.awatar.setWeapon(lb.mod);
        }
        s.awatar.onAdd();
        Timer.instance.listen(s.update, s, 1000);
        s.btBuy.addClickListener(s.buyHandler, s);
        s.btnRank.addClickListener(s.rankHander, s);
        s.btnFight.addClickListener(s.fightHander, s);
        GGlobal.control.listen(Enum_MsgType.MH_OPEN, s.setdate, s);
        GGlobal.control.listen(Enum_MsgType.MH_ENTER_FAIL, s.buyHandler, s);
        GGlobal.modelBoss.CG_MHOPENUI_1701(this._vo.id);
    };
    Child7MengHuo.prototype.close = function () {
        var s = this;
        if (s.awatar) {
            s.awatar.onRemove();
            s.awatar = null;
        }
        ConfigHelp.cleanGridview(s._awards);
        ConfigHelp.cleanGridview(s._awards1);
        Timer.instance.remove(s.update, s);
        s.btBuy.removeClickListener(s.buyHandler, s);
        s.btnFight.removeClickListener(s.fightHander, s);
        s.btnRank.removeClickListener(s.rankHander, s);
        GGlobal.control.remove(Enum_MsgType.MH_OPEN, s.setdate, s);
        GGlobal.control.remove(Enum_MsgType.MH_ENTER_FAIL, s.buyHandler, s);
        GGlobal.layerMgr.close(UIConst.MHRANK);
        s.lst.numItems = 0;
    };
    //>>>>end
    Child7MengHuo.URL = "ui://47jfyc6erjjf13";
    return Child7MengHuo;
}(fairygui.GComponent));
__reflect(Child7MengHuo.prototype, "Child7MengHuo", ["IPanel"]);
