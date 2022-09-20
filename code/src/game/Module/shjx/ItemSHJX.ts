class ItemSHJX extends fairygui.GComponent {
    public static URL = "ui://4aepcdbwuikji";
    public grid: ViewGridRender;
    public btnCD: Button1;//穿戴
    public btnXL: Button2;//兽魂洗练
    public grayBg: fairygui.GImage;
    public grayLD: fairygui.GLoader;
    public txtCnt: fairygui.GTextField;
    private icons: fairygui.GLoader[] = [];
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnCD.addClickListener(this.onHand, this);
        this.btnXL.addClickListener(this.onHand, this);
        this.grid.tipEnabled = true;
        for (let i = 1; i < 5; i++) {
            const icon = this[`icon${i}`];
            this.icons.push(icon);
        }
    }
    private onHand(evt: egret.TouchEvent) {
        switch (evt.currentTarget) {
            case this.btnCD:
                if (this.zhuanVali) {
                    ViewCommonWarn.text("需要主角" + Config.zhuansheng_705[this.zhuanVali].lv);
                } else {
                    if (this.btnCD.checkNotice) {
                        GGlobal.modelSHJX.CG855(this._data.yj, this._data.id);
                    } else {
                        View_CaiLiao_GetPanel.show(VoItem.create(410052));
                    }
                }
                break;
            case this.btnXL:
                //洗练
                GGlobal.layerMgr.open(UIConst.SHJXXILIAN, this._data);
                break;
        }
    }
    private zhuanVali: number = 0;//转生记录
    private _data: Ishjx_266;
    public setData(value: Ishjx_266) {
        this._data = value;
        this.zhuanVali &= 0;
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].visible = false;
        }
        const tempData = ModelSH.getEquipByPos(this._data.yj, this._data.id);
        if (tempData && tempData.equipID) {
            const vo = VoEquip.create(tempData.equipID);
            this.grid.vo = vo;
            this.grid.grid.equipLb.visible = false;
            const len = tempData.datas && tempData.datas.length;
            let count: number = 0;
            for (let i = 0; i < len; i++) {
                const icon = this.icons[i];
                var cfg = tempData.datas[i];
                if (cfg.type == value.yj) {
                    count++;
                }
                icon.visible = true;
                IconUtil.setImg(icon, "resource/image/shouling/" + ModelSH.icUrls[cfg.type - 1] + ".png");
            }
            this.txtCnt.text = `已洗练${["青龙", "白虎", "朱雀", "玄武"][value.yj - 1]}印: ${count}/4`;
            if (count >= 4) {
                this.txtCnt.color = 0x00ff00;
            } else {
                this.txtCnt.color = 0xff0000;
            }
            this.grid.visible = true;
            this.grayLD.visible = false;
            this.grayBg.visible = false;
            const betJug: any = ModelSH.hasBetterEQ(tempData.equipID, value.id);
            if (betJug && !betJug.zhuanCnt) {
                this.btnCD.visible = true;
                this.btnCD.text = "更换";
                this.btnXL.visible = false;
                this.btnCD.checkNotice = true;
                this.btnCD.enabled = true;
            } else {
                this.btnCD.visible = false;
                this.btnXL.visible = true;
                this.btnXL.checkNotice = !ModelSH.hasFullStar(tempData.datas) && Model_Bag.getItemCount(410049) >= JSON.parse(Config.xtcs_004[5601].other)[0][2];
            }
        } else {
            this.txtCnt.text = `已洗练${["青龙", "白虎", "朱雀", "玄武"][value.yj - 1]}印: 0/4`;
            this.txtCnt.color = 0xff0000;
            this.btnCD.visible = true;
            this.btnCD.text = "穿戴";
            const betJug: any = ModelSH.hasBetterEQ(0, value.id);
            if (betJug && !betJug.zhuanCnt) {
                this.btnCD.checkNotice = true;
            } else {
                this.btnCD.checkNotice = false;
                if (betJug && betJug.zhuanCnt) {
                    this.zhuanVali = betJug.zhuanCnt;
                }
            }
            this.btnXL.visible = false;
            this.grid.visible = false;
            this.grayLD.visible = true;
            this.grayBg.visible = true;
            IconUtil.setImg(this.grayLD, Enum_Path.ICON70_URL + `gray${value.id}.png`);
        }
    }
    public getData() {
        return this._data;
    }
    public clean() {
        ConfigHelp.cleanGridEff(this.grid);
    }
}