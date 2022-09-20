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
/**
 * 跨服矿藏
 */
var ChildCrossMineral = (function (_super) {
    __extends(ChildCrossMineral, _super);
    function ChildCrossMineral() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.moneyIconArr = [];
        _this.moneyLbArr = [];
        _this.isInit = false;
        _this.isNoMine = false;
        return _this;
    }
    ChildCrossMineral.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossMineral"));
    };
    ChildCrossMineral.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.ownerItem.select = true;
        s.assistItem.select = false;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandler;
        s.list1.callbackThisObj = s;
        s.list1.itemRenderer = s.listRenderHandler;
        s.itemArr = [s["item0"], s["item1"], s["item2"]];
        s.moneyIconArr = [s["moneyIcon0"], s["moneyIcon1"], s["moneyIcon2"], s["moneyIcon3"]];
        s.moneyLbArr = [s["moneyLb0"], s["moneyLb1"], s["moneyLb2"], s["moneyLb3"]];
        s.searchBt.checkNotice = false;
        s.kfMineralBtn.checkNotice = false;
        for (var i = 0; i < s.itemArr.length; i++) {
            s.itemArr[i].addClickListener(s.onItem, s);
        }
    };
    ChildCrossMineral.prototype.initView = function (pParent) {
    };
    ChildCrossMineral.prototype.onItem = function (evt) {
        var self = this;
        var item = evt.target;
        if (self.curLootItem && self.curLootItem.hashCode == item.hashCode)
            return;
        if (self.curLootItem)
            self.curLootItem.OnSelect(false);
        item.OnSelect(true);
        self.curLootItem = item;
        self.updatePage();
    };
    ChildCrossMineral.prototype.listRenderHandler = function (index, obj) {
        var self = this;
        if (self.curLootItem) {
            var vo = self.curLootItem.vo;
            obj.setVo(vo.roleArr[index], vo.mineID, vo.times, false);
        }
    };
    ChildCrossMineral.prototype.renderHandler = function (index, obj) {
        var self = this;
        var vo;
        if (Model_CrossMineral._oldSelectId == MieralType.ASSIST) {
            vo = self.assistItem.vo;
            obj.setVo(vo.roleArr[index], vo.mineID, vo.times);
        }
        else {
            vo = self.ownerItem.vo;
            obj.setVo(vo.roleArr[index], vo.mineID, vo.times);
        }
    };
    ChildCrossMineral.prototype.changeSel = function () {
        if (this.c1.selectedIndex == 0) {
            this.updatePage();
        }
        else {
        }
    };
    ChildCrossMineral.prototype.onSteal = function () {
        var self = this;
        if (Model_CrossMineral.mySteal <= 0) {
            ViewCommonWarn.text("今日顺手牵羊次数已耗尽");
            return;
        }
        if (self.curLootItem) {
            var vo_1 = self.curLootItem.vo;
            var index = 0;
            if (self.isNoMine) {
                ViewCommonWarn.text("已无资源可被顺手");
                return;
            }
            for (var i = 0; i < vo_1.roleArr.length; i++) {
                if (vo_1.roleArr[i].roleId == Model_player.voMine.id) {
                    index++;
                    break;
                }
            }
            if (index > 0) {
                ViewCommonWarn.text("不能掠夺自己协助的矿藏");
                return;
            }
            var value = Config.xtcs_004[6602].num - vo_1.mySteal;
            if (value > 0) {
                var arr = JSON.parse(vo_1.cfg.ss);
                if (vo_1.stealItemArr[0][2] < arr[0][2] || vo_1.stealItemArr[1][2] < arr[1][2]) {
                    ViewAlert.show("该矿开采资源少\n如果顺手该矿，将获得较少资源\n是否稍后再来顺手", null, ViewAlert.OKANDCANCEL, "养肥再说", "仍然顺手", Handler.create(self, function () {
                        GGlobal.modelCrossMineral.CG_STEAL_MINE(vo_1.mineID);
                    }));
                    return;
                }
                GGlobal.modelCrossMineral.CG_STEAL_MINE(vo_1.mineID);
            }
            else {
                ViewCommonWarn.text("该矿藏已被顺手" + Config.xtcs_004[6602].num + "次, 行行好吧");
            }
        }
    };
    ChildCrossMineral.prototype.onBattle = function () {
        var self = this;
        if (Model_CrossMineral.myLoot <= 0) {
            ViewCommonWarn.text("今日抢夺次数已耗尽");
            return;
        }
        if (self.curLootItem) {
            var vo_2 = self.curLootItem.vo;
            var index = 0;
            if (self.isNoMine) {
                ViewCommonWarn.text("已无资源可被掠夺");
                return;
            }
            for (var i = 0; i < vo_2.roleArr.length; i++) {
                if (vo_2.roleArr[i].roleId == Model_player.voMine.id) {
                    index++;
                    break;
                }
            }
            if (index > 0) {
                ViewCommonWarn.text("不能掠夺自己协助的矿藏");
                return;
            }
            var value = Config.xtcs_004[6601].num - vo_2.myLoot;
            if (value > 0) {
                var arr = JSON.parse(vo_2.cfg.qd);
                if (vo_2.lootItemArr[0][2] < arr[0][2] || vo_2.lootItemArr[1][2] < arr[1][2]) {
                    ViewAlert.show("该矿开采资源少\n如果掠夺该矿，将获得较少资源\n是否稍后再来掠夺", null, ViewAlert.OKANDCANCEL, "养肥再说", "仍然掠夺", Handler.create(self, function () {
                        GGlobal.modelCrossMineral.CG_FIGHT_MINE(vo_2.mineID);
                    }));
                    return;
                }
                GGlobal.modelCrossMineral.CG_FIGHT_MINE(vo_2.mineID);
            }
            else {
                ViewCommonWarn.text("该矿藏已被抢夺" + Config.xtcs_004[6601].num + "次, 给条活路吧");
            }
        }
    };
    ChildCrossMineral.prototype.onSearch = function () {
        if (Model_CrossMineral.surNum > 0) {
            GGlobal.modelCrossMineral.CG_SEARCH_MINE();
        }
        else {
            var money = JSON.parse(Config.xtcs_004[6607].other)[0][2];
            if (Model_player.voMine.yuanbao >= money) {
                GGlobal.modelCrossMineral.CG_SEARCH_MINE();
            }
            else {
                ModelChongZhi.guideToRecharge();
            }
        }
    };
    /**
     * 添加事件
     */
    ChildCrossMineral.prototype.addListen = function () {
        var self = this;
        self.c1.selectedIndex = 0;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "mine.jpg");
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.changeSel, self);
        self.btnTips.addClickListener(self.onOpenTips, self);
        self.btnReport.addClickListener(self.onReport, self);
        self.kfMineralBtn.addClickListener(self.gotoKfMineral, self);
        self.invitationBtn.addClickListener(self.invitationFun, self);
        self.startBtn.addClickListener(self.startFun, self);
        self.ownerItem.addClickListener(self.ownerSelect, self);
        self.assistItem.addClickListener(self.assistSelect, self);
        self.stealBt.addClickListener(self.onSteal, self);
        self.battleBt.addClickListener(self.onBattle, self);
        self.searchBt.addClickListener(self.onSearch, self);
        GGlobal.control.listen(UIConst.CROSS_MINERAL, self.updatePage, self);
        GGlobal.reddot.listen(UIConst.CROSS_MINERAL, self.checkNotice, self);
        GGlobal.control.listen(Enum_MsgType.ZERO_RESET, self.updatePage, self);
    };
    /**
     * 删除事件
     */
    ChildCrossMineral.prototype.removeListen = function () {
        var self = this;
        Model_CrossMineral._oldSelectId = MieralType.OWNER;
        IconUtil.setImg(self.backIcon, null);
        IconUtil.setImg(self.mineIcon, null);
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].clean();
        }
        self.ownerItem.clean();
        self.assistItem.clean();
        self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.changeSel, self);
        self.btnTips.removeClickListener(self.onOpenTips, self);
        self.btnReport.removeClickListener(self.onReport, self);
        self.kfMineralBtn.removeClickListener(self.gotoKfMineral, self);
        self.invitationBtn.removeClickListener(self.invitationFun, self);
        self.startBtn.removeClickListener(self.startFun, self);
        self.ownerItem.removeClickListener(self.ownerSelect, self);
        self.assistItem.removeClickListener(self.assistSelect, self);
        self.stealBt.removeClickListener(self.onSteal, self);
        self.battleBt.removeClickListener(self.onBattle, self);
        self.searchBt.removeClickListener(self.onSearch, self);
        GGlobal.control.remove(UIConst.CROSS_MINERAL, self.updatePage, self);
        GGlobal.reddot.remove(UIConst.CROSS_MINERAL, self.checkNotice, self);
        GGlobal.control.remove(Enum_MsgType.ZERO_RESET, self.updatePage, self);
    };
    /**
     * 打开玩法说明界面
     */
    ChildCrossMineral.prototype.onOpenTips = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_MINERAL);
    };
    /**
     * 打开战报界面
     */
    ChildCrossMineral.prototype.onReport = function () {
        GGlobal.reddot.setCondition(UIConst.CROSS_MINERAL, 2, false);
        this.btnReport.checkNotice = false;
        GGlobal.layerMgr.open(UIConst.CROSS_MINERAL_REPORT);
    };
    /**
     * 前往跨服矿藏界面
     */
    ChildCrossMineral.prototype.gotoKfMineral = function () {
        var self = this;
        if (Model_CrossMineral.state == 1) {
            return ViewCommonWarn.text("采矿时间已结束,矿场关闭");
        }
        if (self.c1.selectedIndex == 0) {
            self.c1.selectedIndex = 1;
            GGlobal.modelCrossMineral.CG_GOTO_MINE();
        }
        else {
            self.c1.selectedIndex = 0;
        }
    };
    /**
     * 更新数据  I:矿配置idL:矿主idI:已被顺次数I:已被抢次数I:剩余采集时间(-1为未开始开采)
     */
    ChildCrossMineral.prototype.updatePage = function () {
        var self = this;
        var red = GGlobal.reddot;
        var color0 = Model_CrossMineral.mySteal > 0 ? 2 : 6;
        var color1 = Model_CrossMineral.myLoot > 0 ? 2 : 6;
        self.myStealTxt.text = "顺手牵羊次数：" + HtmlUtil.fontNoSize(Model_CrossMineral.mySteal + "/" + Config.xtcs_004[6602].num, Color.getColorStr(color0));
        self.myLootTxt.text = "战斗抢夺次数：" + HtmlUtil.fontNoSize(Model_CrossMineral.myLoot + "/" + Config.xtcs_004[6601].num, Color.getColorStr(color1));
        self.timeLb.text = "采矿时间：8:00-24:00";
        self.btnReport.checkNotice = red.checkCondition(UIConst.CROSS_MINERAL, 2);
        if (self.c1.selectedIndex == 0) {
            self.ownerItem.updateInfo(Model_CrossMineral.myMineVo);
            self.assistItem.updateInfo(Model_CrossMineral.otherMineVo);
            self.ownerSelect();
            self.assistSelect();
            var check = false;
            if (Model_CrossMineral.myMineVo) {
                check = (Model_CrossMineral.myMineVo.times == -1 && Model_CrossMineral.state == 0) || Model_CrossMineral.myMineVo.times == -2;
                if (!check && Model_CrossMineral.otherMineVo) {
                    check = Model_CrossMineral.otherMineVo.times == -2;
                }
                red.setCondition(UIConst.CROSS_MINERAL, 0, check);
            }
            self.kfMineralBtn.checkNotice = red.checkCondition(UIConst.CROSS_MINERAL, 1) && Model_CrossMineral.state == 0;
        }
        else {
            self.kfMineralBtn.checkNotice = red.checkCondition(UIConst.CROSS_MINERAL, 0) && Model_CrossMineral.state == 0;
            for (var i = 0; i < self.itemArr.length; i++) {
                var item = self.itemArr[i];
                if (i < Model_CrossMineral.kuafuMineArr.length) {
                    item.visible = true;
                    item.setVo(Model_CrossMineral.kuafuMineArr[i]);
                    if (!self.curLootItem) {
                        item.OnSelect(true);
                        self.curLootItem = item;
                    }
                }
                else {
                    item.visible = false;
                    if (self.curLootItem && self.curLootItem.hashCode == item.hashCode) {
                        self.curLootItem.OnSelect(false);
                        self.curLootItem = null;
                    }
                }
            }
            if (!self.curLootItem && Model_CrossMineral.kuafuMineArr.length > 0) {
                self.itemArr[0].OnSelect(true);
                self.curLootItem = self.itemArr[0];
            }
            if (Model_CrossMineral.surNum > 0) {
                self.freeLb.visible = true;
                self.costGroup.visible = false;
                self.searchBt.checkNotice = true;
            }
            else {
                self.costLb.text = JSON.parse(Config.xtcs_004[6607].other)[0][2] + "";
                self.freeLb.visible = false;
                self.costGroup.visible = true;
                self.searchBt.checkNotice = false;
            }
            var check = Model_CrossMineral.mySteal > 0 || Model_CrossMineral.myLoot > 0 || Model_CrossMineral.surNum > 0;
            red.setCondition(UIConst.CROSS_MINERAL, 1, check);
            if (!self.curLootItem) {
                self.promptImg.visible = true;
                self.dataGroup.visible = false;
            }
            else {
                self.promptImg.visible = false;
                self.dataGroup.visible = true;
                var vo = self.curLootItem.vo;
                var cfg = vo.cfg;
                IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + vo.cfg.pz + ".png");
                self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + vo.cfg.pz);
                self.list1.numItems = vo.roleArr.length;
                var rewardArr = ConfigHelp.makeItemListArr(vo.lootItemArr.concat(vo.stealItemArr));
                var isNoIndex = 0;
                for (var i = 0; i < self.moneyIconArr.length; i++) {
                    if (i < rewardArr.length) {
                        IconUtil.setImg(self.moneyIconArr[i], Enum_Path.ICON70_URL + rewardArr[i].icon + ".png");
                        self.moneyLbArr[i].text = rewardArr[i].count + "";
                        if (rewardArr[i].count <= 0)
                            isNoIndex++;
                    }
                }
                self.isNoMine = isNoIndex >= rewardArr.length;
                self.stealBt.grayed = vo.mySteal >= Config.xtcs_004[6602].num || self.isNoMine || Model_CrossMineral.mySteal <= 0;
                self.stealBt.checkNotice = vo.mySteal < Config.xtcs_004[6602].num && !self.isNoMine && Model_CrossMineral.mySteal > 0;
                self.battleBt.grayed = vo.myLoot >= Config.xtcs_004[6601].num || self.isNoMine || Model_CrossMineral.myLoot <= 0;
                self.battleBt.checkNotice = vo.myLoot < Config.xtcs_004[6601].num && !self.isNoMine && Model_CrossMineral.myLoot > 0;
                self.numLb0.text = "被顺次数：" + HtmlUtil.fontNoSize(vo.mySteal + "/" + Config.xtcs_004[6602].num, Color.getColorStr(vo.mySteal >= Config.xtcs_004[6602].num ? 6 : 1));
                self.numLb1.text = "被抢次数：" + HtmlUtil.fontNoSize(vo.myLoot + "/" + Config.xtcs_004[6601].num, Color.getColorStr(vo.myLoot >= Config.xtcs_004[6601].num ? 6 : 1));
            }
        }
    };
    ChildCrossMineral.prototype.updateTeamInfo = function (vo) {
        var self = this;
        if (!vo) {
            self.list.numItems = 0;
            self.collectGroup.visible = false;
        }
        else {
            self.list.numItems = vo.roleArr.length;
            self.collectGroup.visible = vo.times > 0;
            if (vo.times > 0) {
                var per = 0;
                if (vo.roleArr.length >= 3) {
                    per = Config.xtcs_004[6606].num;
                }
                else if (vo.roleArr.length >= 2) {
                    per = Config.xtcs_004[6605].num;
                }
                else {
                    per = 0;
                }
                var arr = void 0;
                if (vo.mineID == Model_player.voMine.id) {
                    arr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.reward));
                }
                else {
                    arr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.reward1));
                }
                IconUtil.setImg(self.typeIcon00, Enum_Path.ICON70_URL + arr[0].icon + ".png");
                IconUtil.setImg(self.typeIcon01, Enum_Path.ICON70_URL + arr[1].icon + ".png");
                self.rewradLb00.text = arr[0].count + "/20分钟";
                self.rewradLb01.text = arr[1].count + "/20分钟";
                self.rewardGroup.visible = false;
                self.promptLb.text = "当前加成：+" + per + "%(" + (vo.roleArr.length - 1) + "名帮手加成中)";
            }
            else {
                if (vo.times == -1) {
                    self.rewardGroup.visible = false;
                    self.promptLb.text = "1名帮手资源+" + Config.xtcs_004[6605].num + "%，2名帮手资源+" + Config.xtcs_004[6606].num + "%";
                }
                else {
                    self.rewardGroup.visible = true;
                    self.promptLb.text = "";
                }
            }
        }
    };
    /**
     * 邀请采矿
     */
    ChildCrossMineral.prototype.invitationFun = function () {
        var self = this;
        if (Model_CrossMineral.state == 1) {
            return ViewCommonWarn.text("采矿时间已结束,矿场关闭");
        }
        if (Model_CrossMineral.myMineVo.roleArr.length >= 3) {
            ViewCommonWarn.text("采矿人员已满");
            return;
        }
        GGlobal.modelCrossMineral.CG_INVITATION();
        var index = 10;
        self.invitationBtn.text = "等待" + index + "秒";
        self.invitationBtn.enabled = false;
        var times = setInterval(function () {
            index--;
            if (index <= 0) {
                self.invitationBtn.enabled = true;
                self.invitationBtn.text = "邀请采矿";
                clearInterval(times);
                times = null;
            }
            else {
                self.invitationBtn.text = "等待" + index + "秒";
            }
        }, 1000);
    };
    /**
     * 开始采矿
     */
    ChildCrossMineral.prototype.startFun = function () {
        var self = this;
        var vo;
        if (Model_CrossMineral._oldSelectId == MieralType.OWNER) {
            vo = self.ownerItem.vo;
        }
        else {
            vo = self.assistItem.vo;
        }
        if ((!vo || vo && vo.times == -1) && Model_CrossMineral.state == 1) {
            return ViewCommonWarn.text("采矿时间已结束,矿场关闭");
        }
        if (vo.times == -2) {
            GGlobal.modelCrossMineral.CG_DRAW_REWARD_7233(vo.mineID);
        }
        else {
            if (vo.cfgID < Model_CrossMineral.MAX_LEVEL) {
                GGlobal.layerMgr.open(UIConst.CROSS_MINE_PROMPT);
                return;
            }
            GGlobal.modelCrossMineral.CG_START_MINE();
        }
    };
    ChildCrossMineral.prototype.ownerSelect = function (event) {
        if (event === void 0) { event = null; }
        var self = this;
        if ((!event && Model_CrossMineral._oldSelectId != MieralType.OWNER) || (event && Model_CrossMineral._oldSelectId == MieralType.OWNER))
            return;
        var vo = self.ownerItem.vo;
        Model_CrossMineral._oldSelectId = MieralType.OWNER;
        self.invitationBtn.visible = self.startBtn.visible = self.ownerItem.select = true;
        self.assistItem.select = false;
        self.updateTeamInfo(vo);
        if (vo.times > 0) {
            self.invitationBtn.x = 249;
            self.startBtn.visible = false;
            self.startBtn.checkNotice = false;
            self.invitationBtn.grayed = vo.roleArr.length >= 3;
        }
        else if (vo.times == -1) {
            self.invitationBtn.grayed = vo.roleArr.length >= 3;
            self.invitationBtn.x = 136;
            self.startBtn.x = 338;
            self.startBtn.visible = true;
            self.startBtn.text = "开始采矿";
            self.startBtn.checkNotice = true && Model_CrossMineral.state == 0;
        }
        else if (vo.times == -2) {
            self.startBtn.x = 249;
            self.invitationBtn.visible = false;
            self.startBtn.visible = true;
            self.startBtn.text = "领取奖励";
            self.startBtn.checkNotice = true;
            if (vo.itemArr.length > 0) {
                var itemVo0 = ConfigHelp.makeItem(vo.itemArr[0]);
                var itemVo1 = ConfigHelp.makeItem(vo.itemArr[1]);
                IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
                IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
                self.rewradLb0.text = (itemVo0.count - vo.itemArr[0][3]) + "";
                self.rewradLb1.text = (itemVo1.count - vo.itemArr[1][3]) + "";
            }
        }
    };
    ChildCrossMineral.prototype.assistSelect = function (event) {
        if (event === void 0) { event = null; }
        var self = this;
        if ((!event && Model_CrossMineral._oldSelectId != MieralType.ASSIST) || (event && Model_CrossMineral._oldSelectId == MieralType.ASSIST))
            return;
        var vo = self.assistItem.vo;
        if (!vo && event) {
            ViewCommonWarn.text("尚未协助他人采矿");
            return;
        }
        Model_CrossMineral._oldSelectId = MieralType.ASSIST;
        self.invitationBtn.visible = self.startBtn.visible = self.ownerItem.select = false;
        self.assistItem.select = true;
        self.updateTeamInfo(vo);
        self.startBtn.visible = self.invitationBtn.visible = false;
        if (vo && vo.times == -2) {
            self.startBtn.x = 249;
            self.invitationBtn.visible = false;
            self.startBtn.checkNotice = self.startBtn.visible = true;
            self.startBtn.text = "领取奖励";
            if (vo.itemArr.length > 0) {
                var itemVo0 = ConfigHelp.makeItem(vo.itemArr[0]);
                var itemVo1 = ConfigHelp.makeItem(vo.itemArr[1]);
                IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
                IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
                self.rewradLb0.text = itemVo0.count + "";
                self.rewradLb1.text = itemVo1.count + "";
            }
        }
        else {
            self.startBtn.checkNotice = false;
        }
    };
    ChildCrossMineral.prototype.checkNotice = function () {
        this.btnReport.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_MINERAL, 2);
    };
    ChildCrossMineral.prototype.openPanel = function () {
        GGlobal.modelCrossMineral.CG_OPEN_UI();
        this.addListen();
    };
    ChildCrossMineral.prototype.closePanel = function () {
        this.removeListen();
    };
    ChildCrossMineral.URL = "ui://yqpfulefhhej4i";
    return ChildCrossMineral;
}(fairygui.GComponent));
__reflect(ChildCrossMineral.prototype, "ChildCrossMineral", ["IPanel"]);
