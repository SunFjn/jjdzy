class ItemTaskInfo extends fairygui.GComponent {
    public static URL = "ui://hincjqblvib68";
    public txtInfo1: fairygui.GTextField;
    public btnLingQu: Button1;
    public btnQW: Button0;
    public txtInfo2: fairygui.GTextField;
    public iconGot: fairygui.GImage;
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnLingQu.addClickListener(this.onHand, this);
        this.btnQW.addClickListener(this.onHand, this);
    }
    private onHand(evt: egret.TouchEvent) {
        const tar = evt.currentTarget;
        switch (tar) {
            case this.btnLingQu:
                GGlobal.modelEightLock.CG4523(this._data.id);
                break;
            case this.btnQW:
                evt.stopImmediatePropagation();
                if (ModuleManager.isOpen(this._data.open, true)) {
                    if (this._data.open == UIConst.QMBOSS || this._data.open == UIConst.MHBOSS) {
                        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
                            GGlobal.layerMgr.open(this._data.open);
                            GGlobal.layerMgr.close2(UIConst.VIEWTASKINFO);
                        } else {
                            ViewCommonWarn.text("副本中，不能打开这些界面!");
                        }
                    } else {
                        GGlobal.layerMgr.open(this._data.open);
                        GGlobal.layerMgr.close2(UIConst.VIEWTASKINFO);
                    }
                }
                break;
        }
    }
    private grids = [];
    private _data: Ibmjsrw_262;
    public setData(value: Ibmjsrw_262) {
        this._data = value;
        this.txtInfo1.text = value.name;
        if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
        const rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 18, 46, true, false, 3, 70, 0.6);
        const state = GGlobal.modelEightLock.getTaskState(value.id);
        switch (state) {
            case 0://前往完成任务
            case undefined:
            default:
                this.btnLingQu.visible = false;
                this.btnQW.visible = true;
                const progress = GGlobal.modelEightLock.getTaskProg(value.id);
                let cur = progress.cur;
                let max = progress.max;
                if (value.type == 13) {//过关斩将
                    if (Config.ggzj_008[progress.cur]) {
                        cur = Config.ggzj_008[progress.cur].guan;
                        max = Config.ggzj_008[progress.max].guan;
                    } else {
                        cur = progress.cur;
                        max = Config.ggzj_008[progress.max].guan;
                    }
                }
                this.txtInfo2.text = `${ConfigHelp.numToStr(cur)}/${ConfigHelp.numToStr(max)}`;
                this.iconGot.visible = false;
                break;
            case 1://可领取
                this.btnLingQu.visible = true;
                this.btnLingQu.checkNotice = true;
                this.btnQW.visible = false;
                this.txtInfo2.text = "";
                this.iconGot.visible = false;
                break;
            case 2:
                this.btnLingQu.visible = false;
                this.btnQW.visible = false;
                this.txtInfo2.text = "";
                this.iconGot.visible = true;
                break;
        }
    }
    public getData() {
        return this._data;
    }
    public clean(){
          if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
    }
}