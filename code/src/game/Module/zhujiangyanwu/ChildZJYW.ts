class ChildZJYW extends fairygui.GComponent {
    public bg: fairygui.GLoader;
    public btnHand: fairygui.GButton;
    public txtCnt: fairygui.GRichTextField;
    public txtCost: fairygui.GRichTextField;
    public itemInfo: VChInfo;
    public iconActTm: fairygui.GImage;
    public txtDes: fairygui.GTextField;
    public labTime: fairygui.GTextField;
    public imgTime: fairygui.GImage;
    private items: ItemZJYW[] = [];
    public static URL = "ui://7a366usaq5rfe";
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        for (let i = 0; i < 7; i++) {
            const item = this.items[i] = this["item" + i] as ItemZJYW;
            item._container.touchChildren = false;
            item.addClickListener(this.onHand, this);
        }
        this.txtDes.text = HtmlUtil.createLink("玩法说明");
        this.txtDes.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.btnHand.addClickListener(this.onChallenge, this);
    }
    private onLink() {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CHILDZJYW);
    }
    private onChallenge() {
        if (this.curSelData) {
            const maxCnt = Config.zjywdl_005[this.curSelData.id].cost;
            const tempData = ModelZJYW.getInfoByPos(this.curSelData.pos);
            if (ModelZJYW.remainCnt <= 0) {
                ViewCommonWarn.text("挑战次数不足");
            } else if (tempData && tempData.state != 1 && this.getItemCount() < maxCnt) {
                View_QuickBuy_Panel.show(VoItem.create(410100));
            } else {
                GGlobal.modelZJYW.CG4715(this.curSelData.pos);
            }
        }
    }
    private curSelData: IDataZJYW;
    private curSelItm: ItemZJYW;
    private onHand(evt: egret.TouchEvent) {
        const tar = evt.currentTarget as ItemZJYW;
        this.setSel(tar.getData());
    }
    private onUpdate() {
        const datas = ModelZJYW.datas;
        //假设datas长度和items长度一样
        for (let i = 0; i < datas.length; i++) {
            const item = this.items[i];
            const data = datas[i];
            item.setData(data);
        }
        this.txtCnt.text = "挑战次数: " + HtmlUtil.fontNoSize(ModelZJYW.remainCnt + "/" + Config.xtcs_004[5501].num, ModelZJYW.remainCnt ? "#00ff00" : "#ff0000");
        if (!this.curSelData) {
            this.setSel(this.items[0].getData());
        } else {
            if (!this.getItemByData(this.curSelData)) {
                this.setSel(this.items[0].getData());
            } else {
                this.setSel(this.curSelData);
            }
        }
        const act = this.items[this.items.length - 1].getData();//确定最后一个是活动？
        const actHasIn = act != null && act.id > 0;
        this.iconActTm.visible = actHasIn;

        if (actHasIn) {
            Timer.instance.listen(this.upTimer, this, 1000);
            let dstr = this.getActTimer();
            this.actTimer = new Date(dstr).getTime();
            this.upTimer();
            this.imgTime.visible = true
        } else {
            this.actOver();
        }
    }
    private actTimer;
    private upTimer() {
        let s = this;
        //倒计时用
        var d = Math.floor((s.actTimer - Model_GlobalMsg.getServerTime()) / 1000);
        if (d < 0) {
            s.actOver();
        } else {
            s.labTime.text = "活动武将剩余时间：" + DateUtil.getMSBySecond4(d)
        }
    }
    private actOver() {
        this.labTime.text = ""
        this.imgTime.visible = false
        Timer.instance.remove(this.upTimer, this);
    }

    private getActTimer(): string {
        for (let k in Config.zjywwj_005) {
            let v = Config.zjywwj_005[k];
            if (Math.floor(v.id / 1000) == 2) {
                return v.hend;
            }
        }
        return "";
    }
    public setSel(data: IDataZJYW) {
        this.curSelData = data;
        var hasChanged = false;
        if (data) {
            if (this.curSelItm) {
                this.curSelItm.selSel(false);
            }
            const curItm: ItemZJYW = this.getItemByData(data);
            if (this.curSelItm && curItm && this.curSelItm != curItm) {
                hasChanged = true;
            }
            (this.curSelItm = curItm).selSel(true);
            this.itemInfo.setData(data);
            this.itemUpdate();
            if (hasChanged) {
                this.playSkill();
            }
        }
    }
    private playSkill() {
        var secSkill = JSON.parse(Config.hero_211[this.curSelData.id].skills)[1][0];
        this.curSelItm.playSkill(secSkill);
    }
    private getItemByData(data: IDataZJYW) {
        const items = this.items;
        for (let i = 0; i < items.length; i++) {
            const tempData = items[i].getData();
            if (tempData.id == data.id) {
                return items[i];
            }
        }
        return null;
    }
    private itemUpdate() {
        if (this.curSelData) {
            const maxCnt = Config.zjywdl_005[this.curSelData.id].cost;
            const curCnt = this.getItemCount();
            if (curCnt >= maxCnt) {
                this.txtCost.text = "消耗演武令: " + HtmlUtil.fontNoSize(`${maxCnt}/${curCnt}`, "#00ff00");
            } else {
                this.txtCost.text = "消耗演武令: " + HtmlUtil.fontNoSize(`${maxCnt}/${curCnt}`, "#ff0000");
            }
            this.txtCost.visible = this.curSelData.state == 0;
        }
    }
    private getItemCount() {
        return Model_Bag.getItemCount(410100);//写死
    }
    public onShow() {
        IconUtil.setImg(this.bg, Enum_Path.BACK_URL + "zjyw.jpg");
        GGlobal.modelZJYW.listen(ModelZJYW.msg_datas, this.onUpdate, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.itemUpdate);
        GGlobal.modelZJYW.CG4713();
        //虎牢关恢复次数加红点
        GGlobal.modelTigerPass.CGOpenUI8901();
    }
    public onHide() {
        IconUtil.setImg(this.bg, null);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.itemUpdate);
        GGlobal.modelZJYW.remove(ModelZJYW.msg_datas, this.onUpdate, this);
        this.itemInfo.clean();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.clean();
        }
        Timer.instance.remove(this.upTimer, this);
    }
}