class ViewCtryBoss extends UIPanelBase {
    public txtBossName: fairygui.GRichTextField;
    public btnLeft: Button2;
    public btnRight: Button2;
    public txtProg: fairygui.GTextField;
    public iconProg: fairygui.GImage;
    public txtKiller: fairygui.GRichTextField;
    public txtLeftCnt: fairygui.GRichTextField;
    public btnAdd: Button2;
    public btnHand: Button0;
    public btnGet: Button1;
    public listBt: Button2;
    public killReward: Button2;
    public c1: fairygui.Controller;
    public constructor() {
        super();
        this.setSkin("country", "country_atlas0", "ViewCtryBoss");
    }

    protected setExtends() {
        fairygui.UIObjectFactory.setPackageItemExtension(Country_RankItem.URL, Country_RankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_CountryBoss_MyRank.URL, Child_CountryBoss_MyRank);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_CountryBoss_Rank.URL, Child_CountryBoss_Rank);
        fairygui.UIObjectFactory.setPackageItemExtension(CountryBossInfo.URL, CountryBossInfo);
    }
    private uiRole: UIRole;//308 511
    private readonly PROG_WIDTH = 303;
    private grids = [];//86 680
    private _selBossId: number = 0;
    protected initView() {
        super.initView();
        const self = this;
        self.btnLeft.addClickListener(self.onChange, self);
        self.btnRight.addClickListener(self.onChange, self);
        self.btnHand.addClickListener(self.onHand, self);
        self.btnAdd.addClickListener(self.onHand, self);
        self.btnGet.addClickListener(self.onHand, self);
        self.listBt.addClickListener(self.onHand, self);
        self.killReward.addClickListener(self.onHand, self);
    }

    private onHand(evt) {
        const tar = evt.currentTarget;
        const {data} = GGlobal.modelCtryBoss;
        switch (tar) {
            case this.btnHand:
                if (data.leftCount <= 0) {
                    this.addCount();
                } else {
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
                const cfg = Config.gjboss_738[this._selBossId];
                let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jisha))
                View_BoxReward_Show.show(rewardArr, "奖励邮件发放");
                break;
        }
    }

    private addCount() {
        const {data} = GGlobal.modelCtryBoss;
        const costNum = JSON.parse(Config.xtcs_004[3817].other)[0][2];
        const leftBuyCnt = data.remainLeftCnt;
        ViewAlertBuy.show(costNum, Config.xtcs_004[3818].num - leftBuyCnt, Config.xtcs_004[3818].num - leftBuyCnt, "", Handler.create(this, (count) => {
            if (Model_player.voMine.yuanbao < costNum * count) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelCtryBoss.CG3213(count);
        }));
    }
    private visBtnChange() {
        const self = this;
        const tempBossId = self._selBossId;
        const maxBossId = GGlobal.modelCtryBoss.maxBossId();
        if (tempBossId == 1) {
            self.btnLeft.visible = false;
            self.btnRight.visible = true;
        } else if (tempBossId == maxBossId || tempBossId == GGlobal.modelCtryBoss.data.curBossId + 1) {
            self.btnLeft.visible = true;
            self.btnRight.visible = false;
        } else {
            self.btnLeft.visible = self.btnRight.visible = true;
        }
    }
    private onChange(evt) {
        const self = this;
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
    }
    private getState() {//1挑战 2领取 3已领取 4先通关上个boss
        const self = this;
        const {data} = GGlobal.modelCtryBoss;
        if (self._selBossId <= data.curBossId && !data.states[self._selBossId]) {
            return 0;
        } else if (data.states[self._selBossId] == 1) {
            return 1;
        } else if (data.states[self._selBossId] == 2) {
            return 2;
        } else if (self._selBossId > data.curBossId) {
            return 3;
        }
        return 0;
    }
    private setSel(bossId: number) {
        this._selBossId = bossId;
        if (bossId > 0) {
            this.onUpdate();
        }
    }
    private getSelId(selBossId: number = 0) {
        const model = GGlobal.modelCtryBoss;
        var ret = model.data.curBossId;
        const states = model.data.states;
        for (let key in states) {
            if (states[key] == 1 && ((selBossId > 0 && Number(key) > selBossId) || selBossId == 0)) {
                ret = Number(key);
                break;
            }
        }
        return ret;
    }
    public static isGetAwardBack = false;
    private onUpdate() {
        const self = this;
        const {data} = GGlobal.modelCtryBoss;
        if (self._selBossId) {
            if (ViewCtryBoss.isGetAwardBack) {
                ViewCtryBoss.isGetAwardBack = false;
                tempBossId = self._selBossId = self.getSelId(self._selBossId);
            } else {
                tempBossId = self._selBossId;
            }
        } else {
            var tempBossId = self._selBossId = self.getSelId();
        }

        self.visBtnChange();
        const cfg = Config.gjboss_738[tempBossId];
        const bossInfo = JSON.parse(cfg.boss);
        const boss = Config.NPC_200[bossInfo[0][1]];
        self.txtBossName.text = `第${cfg.cengshu}层 ` + boss.name;
        if (data.killers[tempBossId]) {
            self.txtKiller.text = `击杀者: ${data.killers[tempBossId]}`;
        } else {
            self.txtKiller.text = "";
        }
        self.txtLeftCnt.text = "挑战次数" + data.leftCount + "/" + Config.xtcs_004[3816].num;
        // self.btnAdd.enabled = !(data.leftCount >= 3 || data.remainLeftCnt >= Config.xtcs_004[3818].num);
        const state = self.getState();
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
        const awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
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
        } else {
            self.uiRole.setWeapon(null);
        }
        self.uiRole.onAdd();
    }
    protected onShown() {
        super.onShown();
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_datas, this.onUpdate, this);
        GGlobal.modelCtryBoss.CG3201();
    }
    protected onHide() {
        super.onHide();
        GGlobal.layerMgr.close(UIConst.COUNTRY_BOSS);
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_datas, this.onUpdate, this);
        if (this.uiRole) {
            this.uiRole.onRemove();
            this.uiRole = null;
        }
        this._selBossId = 0;
    }
}