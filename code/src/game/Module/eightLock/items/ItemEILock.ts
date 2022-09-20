class ItemEILock extends fairygui.GComponent {
    public static URL = "ui://hincjqblvib66";
    public txtInfo: fairygui.GTextField;
    public list: fairygui.GList;
    public txtInfo3: fairygui.GTextField;
    public txtInfo4: fairygui.GTextField;
    public btnQW: Button1;
    public btnTask: Button0;
    public iconGot: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.txtInfo3.addEventListener(egret.TextEvent.LINK, this.onHand, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnTask.addClickListener(this.onHand, this);
    }
    private rewards: IGridImpl[];
    private onListRender(index: number, render: ViewGrid) {
        if (this.rewards) {
            render.vo = this.rewards[index];
            render.isShowEff = true;
            render.tipEnabled = true;
        }
    }
    private onHand() {
        GGlobal.layerMgr.open(UIConst.VIEWTASKINFO, this._data.id);
    }
    private _data: Ibmjs_262;
    public setData(value: Ibmjs_262) {
        this._data = value;
        this.txtInfo.text = value.door;
        this.rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.list.numItems = this.rewards.length;
        const state = GGlobal.modelEightLock.getState(value.id);
        switch (state) {
            case 0://已完成
                this.txtInfo3.text = HtmlUtil.createLink("<font color='#00ff00' size='20'>查看任务</font>");
                this.txtInfo4.text = "";
                this.btnQW.visible = false;
                this.btnTask.visible = false;
                this.iconGot.visible = true;
                break;
            case 1://可以领取 红点
                this.txtInfo3.text = this.txtInfo4.text = "";
                this.iconGot.visible = false;
                this.btnTask.visible = false;
                this.btnQW.visible = true;
                this.btnQW.checkNotice = true;
                break;
            case 2://任务进度
                const progress = GGlobal.modelEightLock.getTotalTaskProg(value.id);
                if (progress.cur >= progress.max) {
                    this.txtInfo3.text = "<font color='#ffffff' size='18'>任务进度: </font>" + `<font color='#00ff00' size='18'>${progress.cur}/${progress.max}` + "</font>";
                } else {
                    this.txtInfo3.text = "<font color='#ffffff' size='18'>任务进度: </font>" + `<font color='#ff0000' size='18'>${progress.cur}/${progress.max}` + "</font>";
                }
                this.txtInfo4.text = "";
                this.btnQW.visible = false;
                this.btnTask.visible = true;
                this.btnTask.text = `${value.door}任务`;
                this.iconGot.visible = false;
                break;
            case 3://还没开启
                this.txtInfo3.text = "";
                this.txtInfo4.text = `需开启${Config.bmjs_262[value.id - 1].door}`;
                this.btnQW.visible = false;
                this.btnTask.visible = false;
                this.iconGot.visible = false;
                break;
        }
    }
    public getData() {
        return this._data;
    }
    public clean(){
         this.list.numItems = 0;
    }
}