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
var ChildYiShouBoss = (function (_super) {
    __extends(ChildYiShouBoss, _super);
    function ChildYiShouBoss() {
        var _this = _super.call(this) || this;
        _this.itemRender = function (idx, obj) {
            var item = obj;
            item.tipEnabled = true;
            item.isShowEff = true;
            item.vo = _this.awards[idx];
        };
        _this.fightHD = function () {
            var itemcount = Model_Bag.getItemCount(410403);
            if (itemcount <= 0 && GGlobal.modelYiShouBOSS.remaindCount <= 0) {
                ViewCommonWarn.text("挑战次数不足");
                return;
            }
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_challengeBoss_9433();
        };
        _this.getHD = function () {
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_getReward_9439();
        };
        _this.addCountHD = function () {
            if (ModelYiShouBOSS.geMax_buy() > GGlobal.modelYiShouBOSS.hasBuyCount) {
                GGlobal.layerMgr.open(UIConst.YSBOSSBUY);
            }
            else {
                ViewCommonWarn.text("今日购买次数已满");
            }
        };
        _this.openRankHD = function () {
            GGlobal.layerMgr.open(UIConst.YSBOSSRANK);
        };
        _this.openDescHD = function () {
            GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YSBOSS);
        };
        _this.update = function () {
            var self = _this;
            var m = GGlobal.modelYiShouBOSS;
            if (m.currentlayer == 0) {
                return;
            }
            var cfg = Config.ysboss_759[m.currentlayer];
            var bossid = JSON.parse(cfg.boss)[0][1];
            var npcCFG = Config.NPC_200[bossid];
            self.awards = ConfigHelp.makeItemListArr(cfg.tgjl);
            self.n30.numItems = self.awards.length;
            self.lbName.text = m.FirstKiller;
            self.lbBossName.text = "第" + m.currentlayer + "关·" + npcCFG.name;
            var hasKiller = m.FirstKiller != '';
            self.groupDebuff.visible = hasKiller;
            self.imgNULL.visible = !hasKiller;
            self.lbName.visible = hasKiller;
            var debuf = ConfigHelp.getSystemNum(7301);
            self.lbDebuff.text = BroadCastManager.reTxt("<font color='#f1f1f1'>boss已被<font color='#15f234'>{0}</font>率先击杀，属性降低{1}%</font>", m.FirstKiller, debuf);
            self.grid.tipEnabled = true;
            self.grid.isShowEff = true;
            self.grid.vo = ConfigHelp.makeItemListArr(cfg.ssjl)[0];
            self.lbCount.text = "挑战次数：<font color='#15f234'>" + m.remaindCount + "/5<font>";
            self.lbCount.visible = true;
            self.btnAdd.visible = true;
            self.groupItem.visible = false;
            if (m.remaindCount > 0) {
                self.groupItem.visible = false;
                self.btnAdd.visible = true;
            }
            else {
                var itemcount = Model_Bag.getItemCount(410403);
                if (itemcount > 0) {
                    self.btnAdd.visible = false;
                    self.groupItem.visible = true;
                    self.lbCount.visible = false;
                }
                self.n29.text = itemcount + "";
            }
            self.btnGet.visible = m.crossLayer > m.completeLayer;
            self.btnFght.visible = m.currentlayer > m.crossLayer;
            self.lbComplete.visible = self.imgYlq.visible = m.currentlayer == m.crossLayer && m.crossLayer == m.completeLayer;
            self.drawAwatar(bossid);
        };
        _this.drawAwatar = function (bossid) {
            var self = _this;
            var bossCFG = Config.NPC_200[bossid];
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.uiparent = self.displayListContainer;
            }
            self.awatar.setPos(310, 530);
            self.awatar.setScaleXY(1.5, 1.5);
            if (bossCFG.weapon) {
                self.awatar.setWeapon(bossCFG.mod);
            }
            else {
                self.awatar.setWeapon(0);
            }
            self.awatar.setBody(bossCFG.mod);
            self.awatar.onAdd();
        };
        _this.updateTime = function () {
            var self = _this;
            var now = Model_GlobalMsg.getServerTime();
            var m = GGlobal.modelYiShouBOSS;
            if (m.nextAddTime <= 0)
                return;
            if (m.remaindCount < 5) {
                if (now < m.nextAddTime) {
                    self.lbTime.text = "恢复时间：" + TimeUitl.getRemainingTime(m.nextAddTime, now, { minute: "分", second: "秒" });
                }
                else {
                    m.remaindCount++;
                    self.groupItem.visible = false;
                    self.lbCount.text = "挑战次数：<font color='#15f234'>" + m.remaindCount + "/5<font>";
                    self.lbCount.visible = true;
                    if (m.remaindCount < 5) {
                        m.nextAddTime += 3600 * 1000;
                        self.lbTime.text = "恢复时间：" + TimeUitl.getRemainingTime(m.nextAddTime, now, { minute: "分", second: "秒" });
                    }
                    else {
                        self.lbTime.text = "";
                    }
                }
            }
            else {
                self.lbTime.text = "";
            }
        };
        _this.eventFun = function (v) {
            var self = _this;
            var register = EventUtil.register;
            register(v, self.btnFght, egret.TouchEvent.TOUCH_TAP, self.fightHD, self);
            register(v, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.openRankHD, self);
            register(v, self.btnGet, egret.TouchEvent.TOUCH_TAP, self.getHD, self);
            register(v, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.addCountHD, self);
            register(v, self.lbDesc, egret.TextEvent.LINK, self.openDescHD, self);
        };
        _this.initView = function (pParent) {
            _this._viewParent = pParent;
            _this.addRelation(_this._viewParent, fairygui.RelationType.Size);
        };
        _this.openPanel = function (pData) {
            var s = _this;
            var m = GGlobal.modelYiShouBOSS;
            m.nextAddTime = 0;
            s.eventFun(1);
            m.CG_SpecialAnimalBoss_openUI_9431();
            GGlobal.control.listen(UIConst.YSBOSS, s.update, s);
            s.lbTime.text = "";
            Timer.instance.listen(s.updateTime, s, 1000);
            IconUtil.setImg(s.n10, Enum_Path.BACK_URL + "ysbossbg.jpg");
            IconUtil.setImg(s.n27, Enum_Path.ICON70_URL + "410403.png");
        };
        _this.closePanel = function (pData) {
            var s = _this;
            s.eventFun(0);
            s.n30.numItems = 0;
            s.grid.clean();
            if (s.awatar) {
                s.awatar.onRemove();
                s.awatar = null;
            }
            Timer.instance.remove(s.updateTime, s);
            GGlobal.control.remove(UIConst.YSBOSS, s.update, s);
            IconUtil.setImg(s.n10, null);
            IconUtil.setImg(s.n27, null);
        };
        return _this;
    }
    ChildYiShouBoss.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ChildYiShouBoss"));
    };
    ChildYiShouBoss.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.lbDesc.text = HtmlUtil.createLink("玩法说明", true, "");
        this.n30.callbackThisObj = this;
        this.n30.itemRenderer = this.itemRender;
    };
    ChildYiShouBoss.URL = "ui://47jfyc6ehul73h";
    return ChildYiShouBoss;
}(fairygui.GComponent));
__reflect(ChildYiShouBoss.prototype, "ChildYiShouBoss", ["IPanel"]);
