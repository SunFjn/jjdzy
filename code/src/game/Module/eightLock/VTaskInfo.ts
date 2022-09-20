class VTaskInfo extends UIModalPanel {
    public txtInfo: fairygui.GTextField;
    public list: fairygui.GList;
    public txtJiangLi: fairygui.GTextField;
    public txtPower: fairygui.GTextField;
    public glName: fairygui.GLoader;
    public glPic: fairygui.GLoader;
    public txtCZ: fairygui.GTextField;
    public btnGotAll: Button1;
    public txtGotAll: fairygui.GTextField;
    public iconGot: fairygui.GImage;
    public constructor() {
        super();
        fairygui.UIObjectFactory.setPackageItemExtension(ItemTaskInfo.URL, ItemTaskInfo);
        this.loadRes("eightLock", "eightLock_atlas0");
    }
    protected childrenCreated() {
        GGlobal.createPack("eightLock");
        const view = fairygui.UIPackage.createObject("eightLock", "VTaskInfo").asCom;
        this.contentPane = view;
        CommonManager.parseChildren(view, this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnGotAll.addClickListener(this.onHand, this);
        super.childrenCreated();
    }
    private onHand() {
        GGlobal.modelEightLock.CG4525(this._args);
    }
    private onListRender(index: number, render: ItemTaskInfo) {
        render.setData(this.datas[index]);
    }
    private datas: Ibmjsrw_262[] = [];
    private showList() {
        const id: number = this._args;
        this.datas.length = 0;
        const lib = Config.bmjsrw_262;
        for (let key in lib) {
            const cfg = lib[key];
            if (cfg.door == id) {
                this.datas.push(lib[key]);
            }
        }
        this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
    }
    private effPart: Part;
    private grids = [];
    private onUpdate() {
        const id: number = this._args;
        const cfg = Config.bmjs_262[id];
        const progress = GGlobal.modelEightLock.getTotalTaskProg(id);
        this.txtInfo.text = HtmlUtil.fontNoSize(`${cfg.door}任务: `, "#00ff00") + HtmlUtil.fontNoSize(`(${progress.cur}/${progress.max})`, "#00ff00");
        this.txtJiangLi.text = cfg.door + "奖励";
        this.txtPower.text = cfg.power + "";
        IconUtil.setImg(this.glName, Enum_Path.PIC_URL + cfg.name + ".png");
        IconUtil.setImg(this.glPic, Enum_Path.PIC_URL + cfg.pic + ".png");
        if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
        const rewards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 48, 454, true, false, 3, 80, 0.6);
        if (GGlobal.modelEightLock.eightLockBigRewDic[cfg.id].state == 2) {
            this.iconGot.visible = true;
            this.txtCZ.text = "";
            this.btnGotAll.visible = false;
            this.txtGotAll.visible = false;
            this.btnGotAll.checkNotice = false;
        } else {
            if (this.bigRewSuitable(cfg)) {
                this.txtCZ.text = "";
                this.btnGotAll.visible = true;
                const nextCfg = Config.bmjs_262[cfg.id + 1];
                this.txtGotAll.visible = nextCfg != null;
                this.btnGotAll.checkNotice = true;
                this.iconGot.visible = false;
            } else {
                if (ModelEightLock.chongZhiValue >= cfg.cz) {
                    this.txtCZ.text = "活动期间充值" + HtmlUtil.fontNoSize(`(${ConfigHelp.numToStr(ModelEightLock.chongZhiValue)}/${ConfigHelp.numToStr(cfg.cz)})`, "#00ff00") + "元宝可快速完成";
                } else {
                    this.txtCZ.text = "活动期间充值" + HtmlUtil.fontNoSize(`(${ConfigHelp.numToStr(ModelEightLock.chongZhiValue)}/${ConfigHelp.numToStr(cfg.cz)})`, "#ff0000") + "元宝可快速完成";
                }
                this.btnGotAll.visible = false;
                this.txtGotAll.visible = false;
                this.iconGot.visible = false;
            }
        }
        this.datas.sort(this.onSort);
        this.list.numItems = this.datas.length;
        if (!this.effPart) {
            this.effPart = EffectMgr.addEff("uieff/10011", this.contentPane.displayListContainer, this.glPic.x + this.glPic.width / 2, this.glPic.y + this.glPic.height / 2 - 30, 800, -1);
            const childIdx = this.contentPane.getChildIndex(this.glPic);
            this.contentPane.displayListContainer.setChildIndex(this.effPart.mc, childIdx - 1);
            this.effPart.mc.scaleX = this.effPart.mc.scaleY = 3;
        }
    }
    private onSort(pre: Ibmjsrw_262, next: Ibmjsrw_262) {
        let idx1 = GGlobal.modelEightLock.eightLockTaskDic[pre.id].state == 1 ? 0 :
            (GGlobal.modelEightLock.eightLockTaskDic[pre.id].state == 2 ? 2 : 1);
        let idx2 = GGlobal.modelEightLock.eightLockTaskDic[next.id].state == 1 ? 0 :
            (GGlobal.modelEightLock.eightLockTaskDic[next.id].state == 2 ? 2 : 1);
        return idx1 - idx2;
    }
    private bigRewSuitable(cfg: Ibmjs_262) {
        let valid = 1;
        const dic = GGlobal.modelEightLock.eightLockTaskDic;
        for (let key in dic) {
            if (cfg.id == Config.bmjsrw_262[key].door) {
                valid &= (dic[key].state == 2 ? 1 : 0);
            }
        }
        return !!valid;
    }
    public onShown() {
        super.onShown();
        let s = this;
        s.showList();
        s.onUpdate();
        s.frame.text = Config.bmjs_262[s._args].door;
        GGlobal.modelEightLock.listen(ModelEightLock.msg_datas, s.onUpdate, s);
    }
    public onHide() {
        super.onHide();
        let s = this;
        IconUtil.setImg(s.glPic, null);
        GGlobal.layerMgr.close(s.panelId);
        GGlobal.modelEightLock.remove(ModelEightLock.msg_datas, s.onUpdate, s);
        if (s.effPart) {
            s.effPart.mc.scaleX = s.effPart.mc.scaleY = 1;
            EffectMgr.instance.removeEff(s.effPart);
            s.effPart = null;
        }
        s.list.numItems = 0;
    }
}