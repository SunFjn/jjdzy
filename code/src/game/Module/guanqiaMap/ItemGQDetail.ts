class ItemGQDetail extends fairygui.GComponent {
    public static URL = "ui://qxuksu69h0zq1z";
    public iconMap: fairygui.GLoader;
    public txtName: fairygui.GTextField;
    public grid: ViewGrid;
    public iconNot: fairygui.GImage;
    public part1: fairygui.GComponent;
    public part2: fairygui.GComponent;
    public iconTG: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        let self = this;
        CommonManager.parseChildren(self, self);
        self.iconMap = <any>self.part1.getChild("iconMap");
        self.txtName = <any>self.part1.getChild("txtName");
        self.grid = <any>self.part2.getChild("grid");
        self.iconNot = <any>self.part2.getChild("iconNot");
        self.part1.addClickListener(self.onJumpMap, self);
        self.part2.addClickListener(self.onHand, self);
    }

    private onJumpMap(evt: egret.TouchEvent) {
        if (this._data.ID == ModelGuanQia.curGQID) {
            ViewCommonWarn.text("当前正在<font color='#00ff00'>" + Config.dgq_205[this._data.ID].mingcheng + "</font>" + "征战!");
            return;
        }
        if (this._data.ID == ModelGuanQia.curGQID + 1) {
            if (ModelGuanQia.hasPassed()) {
                GGlobal.modelGuanQia.CG1117();
            } else {
                ViewCommonWarn.text("请先通关<font color='#00ff00'>" + Config.dgq_205[ModelGuanQia.curGQID].mingcheng + "</font>" + "所有关卡!");
            }
        } else if (this._data.ID > ModelGuanQia.curGQID + 1) {
            const preId = this._data.ID - 1;
            const cfg = Config.dgq_205[preId];
            if (cfg) {
                ViewCommonWarn.text("请先通关<font color='#00ff00'>" + cfg.mingcheng + "</font>" + "所有关卡!");
            }
        }
    }
    private _data: Idgq_205;
    public setData(value: Idgq_205) {
        let self = this;
        self._data = value;
        IconUtil.setImg(self.iconMap, `resource/image/guanqia/${value.tupian}.png`);
        self.txtName.text = value.mingcheng;
        self.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(value.jiangli))[0];

        self.updateNot();
    }
    // public getData() {
    //     return this._data;
    // }
    private onHand() {
        GGlobal.modelGuanQia.CG1115(this._data.ID);
    }
    public updateNot() {
        this.iconNot.visible = GGlobal.modelGuanQia.curGQNotice(this._data);
        const infoArr = JSON.parse(this._data.guanqia);
        const low = infoArr[0][0],
            max = infoArr[0][1];
        this.iconTG.visible = ModelGuanQia.curGQID > this._data.ID || (ModelGuanQia.curGQID == this._data.ID && GGlobal.modelGuanQia.curGuanQiaLv > max);
        this.part2.visible = !ModelGuanQia.rewardGetDic[this._data.ID];
    }

    private eff: Part;
    public setGuard(value: boolean) {
        if (value) {
            if (!this.eff) {
                this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 66, 81, 1000, -1, true,1,Main.skill_part_type);
            }
        } else {
            if (this.eff) {
                EffectMgr.instance.removeEff(this.eff);
                this.eff = null;
            }
        }
    }

    public clean() {
        let self = this;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        IconUtil.setImg(self.iconMap, null);
    }
}