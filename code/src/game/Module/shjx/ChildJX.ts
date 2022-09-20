class ChildJX extends fairygui.GComponent implements IPanel {
    public static URL = "ui://4aepcdbw811a2";
    public static createInstance(): ChildJX {
        return <ChildJX><any>(fairygui.UIPackage.createObject("shouhunJX", "ChildJX"));
    }
    
    public powerLb: fairygui.GLabel;
    public container: EmptyComp;
    public iconType: fairygui.GLoader;
    public item1: ItemSHJX;
    public item2: ItemSHJX;
    public item3: ItemSHJX;
    public txtCost: fairygui.GTextField;
    public btnJH: Button1;
    public btnHX: Button2;
    public btnBattle: Button2;
    public iconOnBat: fairygui.GImage;
    public txtShuoMing: fairygui.GTextField;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        let self = this;
        CommonManager.parseChildren(self, self);
        self.btnJH.addClickListener(self.onHand, self);
        self.btnHX.addClickListener(self.onHandHX, self);
        self.btnBattle.addClickListener(self.onHand, self);
        self.txtShuoMing.text = HtmlUtil.createLink(self.txtShuoMing.text);
        self.txtShuoMing.displayObject.touchEnabled = true;
        self.txtShuoMing.displayObject.addEventListener(egret.TextEvent.LINK, self.onLink, self);
    }

    public initView(pParent: fairygui.GObject) {

    }
    public openPanel(pData?: Ishjx_266) {
        let self = this;
        let model = GGlobal.modelSHJX;
        GGlobal.modelsl.CG_OPEN_SHOULING();
        self.onSel(pData);
        model.listen(ModelSH.msg_ui, self.onUpdate, self);//ui数据
        model.listen(ModelSH.msg_itemSel, self.onSel, self);
        model.listen(ModelSH.msg_enable, self.onUpdate, self);//激活
        model.listen(ModelSH.msg_chuanDai, self.onUpdate, self);//穿戴
        model.listen(ModelSH.msg_onbat, self.onUpdate, self);//出战
        model.listen(ModelSH.msg_xilian, self.onUpdate, self);//洗练
        model.listen(ModelSH.msg_onbat, self.upSkin, self);//换皮肤
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);//添加装备更新消息
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);//添加背包物品更新消息
        GGlobal.reddot.listen(UIConst.SH_HUANX, self.upHxRed, self);
    }
    public closePanel() {
        let self = this;
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, self.onSel, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_enable, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_chuanDai, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_onbat, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_xilian, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_onbat, self.upSkin, self);//换皮肤
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.reddot.remove(UIConst.SH_HUANX, self.upHxRed, self);
        self.container.setEff(null);
    }

    private readonly urls = ["ui://4aepcdbweium2l", "ui://4aepcdbweium2k", "ui://4aepcdbweium2j", "ui://4aepcdbweium2m"];
    private onLink() {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHJX);
    }
    private onHand(evt) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnBattle:
                GGlobal.modelSHJX.CG865(this._data.yj);
                break;
            case this.btnJH:
                GGlobal.modelSHJX.CG861(this._data.yj);
                break;
        }
    }
    private onHandHX() {
        if (this.btnJH.visible) {
            ViewCommonWarn.text("请先激活兽魂")
            return
        }
        GGlobal.layerMgr.open(UIConst.SH_HUANX, this._data)
    }
    private _data: Ishjx_266;
    protected onUpdate() {
        let self = this;
        if (!self._data) {
            return;
        }
        self.powerLb.text = ModelSH.getTotalPower(self._data.yj) + "";
        const name = ["青龙", "白虎", "朱雀", "玄武"][self._data.yj - 1];
        self.txtCost.text = "集齐12枚" + name + "印可激活" + name + "之魂";
        self.iconType.icon = self.urls[self._data.yj - 1];
        var datas = ModelSH.getOrigDatas()[self._data.yj];
        datas.sort((a, b) => a.id - b.id);//按部位从小到大排序
        self.item1.setData(datas[0]);
        self.item2.setData(datas[1]);
        self.item3.setData(datas[2]);
        const state = self.getState();
        switch (state) {
            case 0://未激活
                self.txtCost.visible = self.btnJH.visible = true;
                self.btnBattle.visible = self.iconOnBat.visible = false;
                if (self.canBeJH()) {
                    self.btnJH.checkNotice = true;
                    self.btnJH.enabled = true;
                } else {
                    self.btnJH.checkNotice = false;
                    self.btnJH.enabled = false;
                }
                break;
            case 1://已激活 未出战
                self.btnBattle.visible = true;
                self.iconOnBat.visible = self.txtCost.visible = self.btnJH.visible = false;
                break;
            case 2://已激活 已出战
                self.iconOnBat.visible = true;
                self.btnBattle.visible = self.txtCost.visible = self.btnJH.visible = false;
                break;
        }
        self.upHxRed();
    }

    private upHxRed() {
        this.btnHX.checkNotice = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, this._data.yj - 1)
    }
    private canBeJH() {
        const info = ModelSH.servDatas[this._data.yj];
        let counter: number = 0;
        if (info) {
            const equips = info.datas;
            for (let i = 0; i < equips.length; i++) {
                const attrs = equips[i].datas;
                for (let j = 0; j < attrs.length; j++) {
                    const attr = attrs[j];
                    if (attr.type == this._data.yj) {
                        counter++;
                    }
                }
            }
        }
        return counter >= 12;
    }
    private getState() {
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            if (info.state == 1) {
                if (info.isOnBat) {
                    return 2;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        }
    }
    private getByPart(part: number) {
        const lib = Config.zhuangbei_204;
        for (let key in lib) {
            let cfg = lib[key];
            if (cfg.part == part) {
                return cfg;
            }
        }
        return null;
    }
    protected onSel(data: Ishjx_266) {
        this._data = data;
        if (data) {
            this.upSkin();
            this.onUpdate();
        }
    }

    private upSkin() {
        const info = ModelSH.servDatas[this._data.yj];
        if (info == null || info.pifu == 0) {
            this.container.setEff(`uieff/${Config.sh_266[this._data.yj * 1000].mod2}`);
        } else {
            this.container.setEff(`uieff/${Config.shhx_266[info.pifu].mod2}`);
        }
    }

    private onBagUpdate(itemMap: any) {
        if (itemMap["equip12"] || itemMap[UIConst.SHOULING] || itemMap[UIConst.SHJX]) {
            this.onUpdate();
        }
    }
}