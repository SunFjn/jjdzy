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
var ChildQuanMinBoss = (function (_super) {
    __extends(ChildQuanMinBoss, _super);
    function ChildQuanMinBoss() {
        var _this = _super.call(this) || this;
        _this.selID = 0;
        _this.grids = [];
        _this.needRefresh = false;
        _this.dta = [];
        return _this;
    }
    ChildQuanMinBoss.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ChildQuanMinBoss"));
    };
    ChildQuanMinBoss.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildQuanMinBoss.prototype.openPanel = function (pData) {
        this.open();
    };
    ChildQuanMinBoss.prototype.closePanel = function (pData) {
        this.close();
    };
    ChildQuanMinBoss.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.hpBar.max = 100;
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.itemRender;
        s.lst.setVirtual();
        s.com = new fairygui.GComponent();
        s.addChildAt(s.com, s.numChildren - 8);
        s.gridCom = new fairygui.GComponent();
        s.gridCom.setScale(0.8, 0.8);
        s.addChild(s.gridCom);
        s.groupItem.visible = false;
    };
    ChildQuanMinBoss.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVO(this.dta[index]);
        if (!s.curItem && s.selID == index) {
            s.curItem = item;
            s.curItem.setSel(true);
            s._vo = item.vo;
            s.setInfo();
        }
        else {
            item.setSel(false);
        }
    };
    ChildQuanMinBoss.prototype.itemClickHandle = function (event) {
        var s = this;
        var item = event.itemObject;
        if (s.curItem)
            s.curItem.setSel(false);
        s.curItem = item;
        s.curItem.setSel(true);
        s._vo = item.vo;
        s.setInfo();
    };
    ChildQuanMinBoss.prototype.onFight = function (e) {
        if (!this._vo) {
            ViewCommonWarn.text("BOSS数据已刷新");
            GGlobal.modelBoss.CG_OPENUI_1351();
            return;
        }
        var itemCount = Model_Bag.getItemCount(410015);
        if (GGlobal.modelBoss.qmCount < 1 && itemCount == 0) {
            ViewCommonWarn.text("没有剩余次数");
            return;
        }
        var te = this._vo.reliveTime * 1000 - Model_GlobalMsg.getServerTime();
        if (te > 0) {
            ViewCommonWarn.text("BOSS尚未复活");
            return;
        }
        if (GGlobal.sceneType == SceneCtrl.QMBOSS) {
            return;
        }
        if (Model_Bag.checkBagCapacity()) {
            if (e.currentTarget.id == this.btnFight.id) {
                GGlobal.modelBoss.CG_ENTER_1353(this._vo.id);
            }
            else {
                GGlobal.modelBoss.CG_MOPUP_1369(this._vo.id);
            }
        }
    };
    ChildQuanMinBoss.prototype.upSaodan = function (arr) {
        var s = this;
        // s.update();
        //飘奖励
        var startPos = s.btnSao.localToRoot();
        var retPos = ViewMainBottomUI.instance.getBagRootPos();
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var g = ViewGrid.createInstance();
            g.vo = arr[i];
            g.setXY(startPos.x + s.btnSao.width / 2 - g.width / 2, startPos.y - g.height);
            GGlobal.layerMgr.UI_Message.addChild(g);
            // Timer.instance.callLater(function () {
            egret.Tween.get(g).to({ x: g.x - len * 15 + i * 30, y: g.y - 30 }, 300, egret.Ease.backIn).to({ x: retPos.x, y: retPos.y }, 500, egret.Ease.backIn).call(s.clearGrid, s, [g]);
            ;
            // }, 200 * (len - i - 1), s);
        }
    };
    ChildQuanMinBoss.prototype.clearGrid = function (g) {
        if (g && g.parent) {
            g.removeFromParent();
            g.disposePanel();
        }
    };
    ChildQuanMinBoss.prototype.setInfo = function () {
        if (!this._vo)
            return;
        var s = this;
        var v = s._vo;
        s.lbName.text = v.name.replace("·", "\n·\n");
        ;
        ConfigHelp.cleanGridview(s.grids);
        var award = ConfigHelp.makeItemListArr(v.reward);
        s.grids = ConfigHelp.addGridview(award, s.gridCom, 270, 853, true, false, 5, 115);
        s.lbKiller.text = v.lastKiller;
        if (!s.awatar) {
            s.awatar = UIRole.create();
            s.awatar.uiparent = s.com.displayListContainer;
        }
        s.awatar.setPos(380, 490);
        s.awatar.setScaleXY(1.5, 1.5);
        if (v.weapon) {
            s.awatar.setWeapon(v.bossbody);
        }
        else {
            s.awatar.setWeapon(0);
        }
        s.awatar.setBody(v.bossbody);
        if (v.bossbody == "201002") {
            s.awatar.setScaleXY(1.5, 1.5);
        }
        else if (v.bossbody == "201011") {
            s.awatar.setPos(400, 645);
        }
        s.awatar.onAdd();
        if (Config.all_221[v.id].single == 1) {
            s.hpBar.value = s.hpBar.max;
        }
        else {
            s.hpBar.value = v.curHp;
        }
        s.setTime();
    };
    ChildQuanMinBoss.prototype.setTime = function () {
        if (!this._vo)
            return;
        var s = this;
        var m = GGlobal.modelBoss;
        var te = s._vo.reliveTime * 1000 - Model_GlobalMsg.getServerTime();
        if (te > 0) {
            s.g0.visible = true;
            s.hpBar.value = 0;
            s.lbRelive.text = "复活时间：" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " });
        }
        else {
            if (this._vo.curHp == 0) {
                this.hpBar.value = this._vo.maxHp;
            }
            s.g0.visible = false;
        }
        te = GGlobal.modelBoss.remainSec - Model_GlobalMsg.getServerTime();
        var c = "挑战次数：<font color='#15f234'>" + m.qmCount + "/5</font>";
        if (te > 0) {
            s.needRefresh = true;
            s.lbCount.text = c + "<font color='#fe0000'>(" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " }) + "后回复1次)</font>";
            s.lbRemaindTime.text = "<font color='#fe0000'>(" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " }) + "后回复1次)</font>";
        }
        else {
            s.lbCount.text = c;
            if (s.needRefresh) {
                GGlobal.modelBoss.CG_OPENUI_1351();
                s.needRefresh = false;
            }
        }
    };
    ChildQuanMinBoss.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        s.dta = m.qmData;
        s.selID = 0;
        if (s.curItem) {
            s.curItem.setSel(false);
            s.curItem = null;
        }
        for (var i = s.dta.length - 1; i >= 0; i--) {
            var v = s.dta[i];
            if (s.selID == 0 && v.isOpen() && v.st == 1) {
                s.selID = i;
                break;
            }
        }
        s.lst.numItems = s.dta.length;
        var temp = s.selID;
        if (temp >= 0 && temp < 2) {
            temp = 0;
        }
        else {
            temp -= 2;
        }
        s.lst.scrollToView(temp);
        egret.callLater(this.setSelected, this);
        if (s.dta.length)
            s._vo = s.dta[s.selID];
        s.lbCount.text = "挑战次数：<font color='#15f234'>" + m.qmCount + "/5</font>";
        s.groupItem.visible = false;
        s.lbCount.visible = true;
        if (m.qmCount == 0) {
            var itemCount = Model_Bag.getItemCount(410015);
            if (itemCount > 0) {
                this.groupItem.visible = true;
                s.lbCount.visible = false;
                this.lbItemCount.text = "全民挑战令：      <font color='#15f234'>" + itemCount + "/1</font>";
            }
        }
        s.setInfo();
    };
    ChildQuanMinBoss.prototype.setSelected = function () {
        var s = this;
        if (s.curItem)
            s.curItem.setSel(true);
    };
    ChildQuanMinBoss.prototype.open = function () {
        var s = this;
        GGlobal.modelBoss.CG_OPENUI_1351();
        s.btnFight.addClickListener(s.onFight, s);
        s.btnSao.addClickListener(s.onFight, s);
        s.lst.addEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
        Timer.instance.listen(s.setTime, s, 1000, 0, false);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_UPDATE, s.update, s);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_SAODAN, s.upSaodan, s);
        var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        this.imgDoub.visible = (act != null);
        var vip = ConfigHelp.getSystemNum(8421);
        var guan = ConfigHelp.getSystemNum(8422);
        if (Model_player.voMine.viplv < vip || GGlobal.modelGuanQia.curGuanQiaLv < guan) {
            s.btnSao.visible = false;
            s.btnFight.x = 323;
            this.lbTips.text = "VIP" + vip + "且通关" + guan + "关开启扫荡";
        }
        else {
            s.btnSao.visible = true;
            s.btnFight.x = 232;
            this.lbTips.text = "";
        }
    };
    ChildQuanMinBoss.prototype.close = function () {
        var s = this;
        s.curItem = null;
        if (s.awatar) {
            s.awatar.onRemove();
            s.awatar = null;
        }
        s.lst.numItems = 0;
        s.needRefresh = false;
        ConfigHelp.cleanGridview(s.grids);
        Timer.instance.remove(s.setTime, s);
        s.btnFight.removeClickListener(s.onFight, s);
        s.btnSao.removeClickListener(s.onFight, s);
        s.lst.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_UPDATE, s.update, s);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_SAODAN, s.upSaodan, s);
    };
    ChildQuanMinBoss.prototype.guide_QMBOSS_battle = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnFight, self.btnFight.width / 2, self.btnFight.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnFight, self.btnFight.width / 2, 0, -90, -106, -100);
        if (self.btnFight.parent)
            self.btnFight.parent.setChildIndex(self.btnFight, self.btnFight.parent.numChildren - 1);
    };
    //>>>>end
    ChildQuanMinBoss.URL = "ui://47jfyc6egs0dq";
    return ChildQuanMinBoss;
}(fairygui.GComponent));
__reflect(ChildQuanMinBoss.prototype, "ChildQuanMinBoss", ["IPanel"]);
