class ChildEBS extends fairygui.GComponent implements IPanel {
    public static URL = "ui://4aepcdbw811a4";
    public static createInstance(): ChildEBS {
        return <ChildEBS><any>(fairygui.UIPackage.createObject("shouhunJX", "ChildEBS"));
    }
    public back: fairygui.GLoader;
    public bg: fairygui.GLoader;
    public iconType: fairygui.GLoader;
    public iconType2: fairygui.GLoader;
    public powerLb: fairygui.GLabel;
    public txtJie: fairygui.GTextField;
    public txtTZJie: fairygui.GTextField;
    private items: fairygui.GComponent[] = [];
    public btnSJ: Button1;
    public btnJH: Button0;
    public grpAttr: fairygui.GGroup;
    public grpOpe: fairygui.GGroup;
    public txtMid: fairygui.GTextField;
    public txtLeft: fairygui.GTextField;
    public txtRight: fairygui.GTextField;
    public labFull: fairygui.GLabel;
    public txtCostN: fairygui.GLabel;
    public costItem: fairygui.GLabel;
    public noticeImg: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        let self = this;
        CommonManager.parseChildren(self, self);
        self.iconType2.displayObject.touchEnabled = true;
        Utils.DisplayUtil.addPop(self.iconType2.displayObject);
        self.iconType2.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openTZ, self);
        for (let i = 1; i <= 7; i++) {
            const item = self["item" + i] as fairygui.GComponent;
            item.enabled = false;
            self.items.push(item);
        }
        self.btnSJ.addClickListener(self.onHand, self);
        self.btnJH.addClickListener(self.onHand, self);
    }

    public initView(pParent: fairygui.GObject) {

    }
    public openPanel(pData?: Ishjx_266) {
        let self = this;
        self.onSel(pData);
        GGlobal.modelsl.CG_OPEN_SHOULING();
        GGlobal.modelSHJX.listen(ModelSH.msg_ui, self.onUpdate, self);//ui数据
        GGlobal.modelSHJX.listen(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.listen(ModelSH.msg_xingSuUp, self.onUpdate, self);
        GGlobal.modelSHJX.listen(ModelSH.msg_xingUpJie, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        IconUtil.setImg(self.back, "resource/image/shjx/back.png");
    }

    public closePanel() {
        let self = this;
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, self.onUpdate, self);//ui数据
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingSuUp, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingUpJie, self.onUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        IconUtil.setImg(self.back, null);
    }

    private xsNames =
    [
        "角宿、亢宿、氐宿、房宿、心宿、尾宿、箕宿", "斗宿、牛宿、女宿、虚宿、危宿、室宿、壁宿", "奎宿、娄宿、胃宿、昴宿、毕宿、觜宿、参宿", "井宿、鬼宿、柳宿、星宿、张宿、翼宿、轸宿"
    ];
    private getXSName() {
        const info = this.xsNames[this._data.yj - 1];
        const arr = info.split("\、");
        return arr;
    }
    private onHand(evt) {
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            const cfg = Config.xj_266[info.suLv];
            const cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]) as VoItem;
            if (cost.count > Model_Bag.getItemCount(cost.id)) {
                View_CaiLiao_GetPanel.show(VoItem.create(cost.id));
                return;
            }
            GGlobal.modelSHJX.CG859(this._data.yj);
        }
    }
    private tzJie: number;
    private openTZ() {
        GGlobal.layerMgr.open(UIConst.SHSHENGSUDS, this._data);
    }
    private readonly urls = ["ui://4aepcdbwsh622w", "ui://4aepcdbwsh622y", "ui://4aepcdbwsh622x", "ui://4aepcdbwsh622z"];
    private readonly urls2 = ["ui://4aepcdbwvwaa32", "ui://4aepcdbwvwaa31", "ui://4aepcdbwvwaa34", "ui://4aepcdbwvwaa33"];
    private onUpdate() {
        if (!this._data) {
            return;
        }
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            const cfg = Config.xj_266[info.suLv];
            this.powerLb.text = cfg ? cfg.power + "" : "0";
            const jie_ji: number = info.suLv % 1000;
            const jie = Math.floor(jie_ji / 10);
            const ji = jie_ji % 10;
            this.txtJie.text = jie + "";
            if (info.suJie) {
                this.txtTZJie.text = (info.suJie % 100) + "级";
            } else {
                this.txtTZJie.text = info.suJie + "级";
            }
            let i = this.items.length;
            for (; i--;) {
                if (i < ji) {
                    this.items[i].enabled = true;
                } else {
                    this.items[i].enabled = false;
                }
            }
            if ((jie == 0 && ji == 0) || cfg.next == 0) {
                this.grpAttr.visible = false;
                this.txtMid.text = ConfigHelp.attrString(JSON.parse(cfg.attr));
            } else {
                this.grpAttr.visible = true;
                this.txtMid.text = "";
                this.txtLeft.text = ConfigHelp.attrString(JSON.parse(cfg.attr));
                this.txtRight.text = ConfigHelp.attrString(JSON.parse(Config.xj_266[cfg.next].attr));
            }
            if (cfg.next == 0) {
                this.labFull.visible = true;
                this.grpOpe.visible = false;
            } else {
                this.labFull.visible = false;
                this.grpOpe.visible = true;

                const cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]) as VoItem;
                this.txtCostN.text = cost.name;
                this.txtCostN.color = cost.qColor;
                IconUtil.setImg(this.costItem.getChild("icon").asLoader, Enum_Path.ICON70_URL + cost.icon + ".png");
                this.costItem.text = ConfigHelp.numToStr(Model_Bag.getItemCount(cost.id)) + "/" + ConfigHelp.numToStr(cost.count);
                if (cost.count > Model_Bag.getItemCount(cost.id)) {
                    this.costItem.color = 0xff0000;
                    // this.btnSJ.enabled = this.btnJH.enabled = false;
                } else {
                    this.costItem.color = 0xffffff;
                    // this.btnJH.enabled = this.btnSJ.enabled = true;
                }
            }
            if ((info.suLv % 10) == 7) {
                this.btnJH.visible = false;
                this.btnSJ.visible = true;
                this.btnSJ.checkNotice = this.checkNot();
            } else {
                this.btnJH.visible = true;
                this.btnSJ.visible = false;
                this.btnJH.checkNotice = this.checkNot();
            }
            this.noticeImg.visible = this.checkNotJie();
            const names = this.getXSName();
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].getChild("title").text = names[i];
            }
        }
    }
    private checkNot() {
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            const cfg = Config.xj_266[info.suLv];
            if (cfg && cfg.cost != 0) {
                const cost = ConfigHelp.makeItem(JSON.parse(cfg.cost)[0]);
                if (Model_Bag.getItemCount(cost.id) >= cost.count) {
                    return true;
                }
            }
        }
    }
    private checkNotJie() {
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            const nextCfg = info.suJie ? Config.xjtz_266[info.suJie + 1] : Config.xjtz_266[this._data.yj * 1000 + 1];
            if (nextCfg) {
                const fitJi = nextCfg.next % 1000 >> 0;
                const ji = info.suLv ? info.suLv : this._data.yj * 100000;
                if ((ji % 1000 >> 0) >= fitJi) {
                    return true;
                }
            }
        }
        return false;
    }
    private resolveTZ(jie: number) {
        const arr = ModelSH.resolveTZ(jie, this._data.yj);
        if (jie >= arr[arr.length - 1].fitJie) {
            return arr[arr.length - 1].jie;
        } else if (jie < arr[0].fitJie) {
            return 0;
        } else {
            for (let i = 0; i < arr.length - 1; i++) {
                if (jie >= arr[i].fitJie && jie < arr[i + 1].fitJie) {
                    return arr[i].jie;
                }
            }
        }
    }
    private _data: Ishjx_266;
    private onSel(data: Ishjx_266) {
        this._data = data;
        if (data) {
            IconUtil.setImg(this.bg, `resource/image/shjx/shouHun${data.yj}.png`);
            this.iconType.url = this.urls[data.yj - 1];
            this.iconType2.url = this.urls2[data.yj - 1];
            this.onUpdate();
        }
    }
    private onBagUpdate(itemMap: any) {
        if (itemMap[UIConst.SHOULING]) {
            this.onUpdate();
        }
    }
}