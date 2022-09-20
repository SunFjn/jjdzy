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
var ViewCtryBoss = (function (_super) {
    __extends(ViewCtryBoss, _super);
    function ViewCtryBoss() {
        var _this = _super.call(this) || this;
        _this.PROG_WIDTH = 303;
        _this.grids = []; //86 680
        _this._selBossId = 0;
        _this.setSkin("country", "country_atlas0", "ViewCtryBoss");
        return _this;
    }
    ViewCtryBoss.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Country_RankItem.URL, Country_RankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_CountryBoss_MyRank.URL, Child_CountryBoss_MyRank);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_CountryBoss_Rank.URL, Child_CountryBoss_Rank);
        fairygui.UIObjectFactory.setPackageItemExtension(CountryBossInfo.URL, CountryBossInfo);
    };
    ViewCtryBoss.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.btnLeft.addClickListener(self.onChange, self);
        self.btnRight.addClickListener(self.onChange, self);
        self.btnHand.addClickListener(self.onHand, self);
        self.btnAdd.addClickListener(self.onHand, self);
        self.btnGet.addClickListener(self.onHand, self);
        self.listBt.addClickListener(self.onHand, self);
        self.killReward.addClickListener(self.onHand, self);
    };
    ViewCtryBoss.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        var data = GGlobal.modelCtryBoss.data;
        switch (tar) {
            case this.btnHand:
                if (data.leftCount <= 0) {
                    this.addCount();
                }
                else {
                    GGlobal.modelCtryBoss.CG3203(this._selBossId);
                }
                break;
            case this.btnAdd:
                this.addCount();
                break;
            case this.btnGet://奖励
                GGlobal.modelCtryBoss.CG3215(this._selBossId);
                break;
            case this.listBt://排行
                GGlobal.layerMgr.open(UIConst.COUNTRYBOSS_RANK, this._selBossId);
                break;
            case this.killReward://击杀奖励
                var cfg = Config.gjboss_738[this._selBossId];
                var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jisha));
                View_BoxReward_Show.show(rewardArr, "奖励邮件发放");
                break;
        }
    };
    ViewCtryBoss.prototype.addCount = function () {
        var data = GGlobal.modelCtryBoss.data;
        var costNum = JSON.parse(Config.xtcs_004[3817].other)[0][2];
        var leftBuyCnt = data.remainLeftCnt;
        ViewAlertBuy.show(costNum, Config.xtcs_004[3818].num - leftBuyCnt, Config.xtcs_004[3818].num - leftBuyCnt, "", Handler.create(this, function (count) {
            if (Model_player.voMine.yuanbao < costNum * count) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelCtryBoss.CG3213(count);
        }));
    };
    ViewCtryBoss.prototype.visBtnChange = function () {
        var self = this;
        var tempBossId = self._selBossId;
        var maxBossId = GGlobal.modelCtryBoss.maxBossId();
        if (tempBossId == 1) {
            self.btnLeft.visible = false;
            self.btnRight.visible = true;
        }
        else if (tempBossId == maxBossId || tempBossId == GGlobal.modelCtryBoss.data.curBossId + 1) {
            self.btnLeft.visible = true;
            self.btnRight.visible = false;
        }
        else {
            self.btnLeft.visible = self.btnRight.visible = true;
        }
    };
    ViewCtryBoss.prototype.onChange = function (evt) {
        var self = this;
        var tar = evt.currentTarget;
        var tempBossId = self._selBossId;
        switch (tar) {
            case self.btnLeft:
                if (tempBossId > 1) {
                    tempBossId--;
                }
                break;
            case self.btnRight:
                if (tempBossId < GGlobal.modelCtryBoss.maxBossId()) {
                    tempBossId++;
                }
                break;
        }
        if (!!(tempBossId ^ self._selBossId)) {
            self.setSel(tempBossId);
        }
    };
    ViewCtryBoss.prototype.getState = function () {
        var self = this;
        var data = GGlobal.modelCtryBoss.data;
        if (self._selBossId <= data.curBossId && !data.states[self._selBossId]) {
            return 0;
        }
        else if (data.states[self._selBossId] == 1) {
            return 1;
        }
        else if (data.states[self._selBossId] == 2) {
            return 2;
        }
        else if (self._selBossId > data.curBossId) {
            return 3;
        }
        return 0;
    };
    ViewCtryBoss.prototype.setSel = function (bossId) {
        this._selBossId = bossId;
        if (bossId > 0) {
            this.onUpdate();
        }
    };
    ViewCtryBoss.prototype.getSelId = function (selBossId) {
        if (selBossId === void 0) { selBossId = 0; }
        var model = GGlobal.modelCtryBoss;
        var ret = model.data.curBossId;
        var states = model.data.states;
        for (var key in states) {
            if (states[key] == 1 && ((selBossId > 0 && Number(key) > selBossId) || selBossId == 0)) {
                ret = Number(key);
                break;
            }
        }
        return ret;
    };
    ViewCtryBoss.prototype.onUpdate = function () {
        var self = this;
        var data = GGlobal.modelCtryBoss.data;
        if (self._selBossId) {
            if (ViewCtryBoss.isGetAwardBack) {
                ViewCtryBoss.isGetAwardBack = false;
                tempBossId = self._selBossId = self.getSelId(self._selBossId);
            }
            else {
                tempBossId = self._selBossId;
            }
        }
        else {
            var tempBossId = self._selBossId = self.getSelId();
        }
        self.visBtnChange();
        var cfg = Config.gjboss_738[tempBossId];
        var bossInfo = JSON.parse(cfg.boss);
        var boss = Config.NPC_200[bossInfo[0][1]];
        self.txtBossName.text = "\u7B2C" + cfg.cengshu + "\u5C42 " + boss.name;
        if (data.killers[tempBossId]) {
            self.txtKiller.text = "\u51FB\u6740\u8005: " + data.killers[tempBossId];
        }
        else {
            self.txtKiller.text = "";
        }
        self.txtLeftCnt.text = "挑战次数" + data.leftCount + "/" + Config.xtcs_004[3816].num;
        // self.btnAdd.enabled = !(data.leftCount >= 3 || data.remainLeftCnt >= Config.xtcs_004[3818].num);
        var state = self.getState();
        self.c1.setSelectedIndex(state);
        switch (state) {
            case 0://挑战
                self.btnHand.checkNotice = data.leftCount > 0 && data.bossHp > 0;
                self.txtProg.text = (data.bossHp / data.bossMaxHp * 100).toFixed(1) + "%";
                self.iconProg.width = self.PROG_WIDTH * data.bossHp / data.bossMaxHp;
                break;
            case 1://领取
                self.btnGet.checkNotice = true;
                self.txtProg.text = "0%";
                self.iconProg.width = 0;
                break;
            case 2://已领取
                self.txtProg.text = "0%";
                self.iconProg.width = 0;
                break;
            case 3://还没通关
                self.txtProg.text = "100%";
                self.iconProg.width = self.PROG_WIDTH;
                break;
        }
        var awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        self.grids = ConfigHelp.addGridview(awards, self, (self.view.width - awards.length * 120) >> 1, 680, true, false, 10, 120);
        if (!self.uiRole) {
            self.uiRole = UIRole.create();
            self.uiRole.uiparent = self.displayListContainer;
            self.uiRole.setPos(308, 510);
            self.uiRole.setScaleXY(1.5, 1.5);
        }
        self.uiRole.setBody(boss.mod);
        if (boss.weapon) {
            self.uiRole.setWeapon(boss.mod);
        }
        else {
            self.uiRole.setWeapon(null);
        }
        self.uiRole.onAdd();
    };
    ViewCtryBoss.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_datas, this.onUpdate, this);
        GGlobal.modelCtryBoss.CG3201();
    };
    ViewCtryBoss.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(UIConst.COUNTRY_BOSS);
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_datas, this.onUpdate, this);
        if (this.uiRole) {
            this.uiRole.onRemove();
            this.uiRole = null;
        }
        this._selBossId = 0;
    };
    ViewCtryBoss.isGetAwardBack = false;
    return ViewCtryBoss;
}(UIPanelBase));
__reflect(ViewCtryBoss.prototype, "ViewCtryBoss");
