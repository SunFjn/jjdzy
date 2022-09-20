class ItemJiJin extends fairygui.GComponent {
    public static URL = "ui://kdt501v2tipmo";
    public txtLoginDay: fairygui.GTextField;
    public container: EmptyComp;
    public iconGot: fairygui.GImage;
    public btnHand: Button0;
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.btnHand.addClickListener(this.onHand, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
    private onHand() {
        GGlobal.modelSGQD.CG4083(this._data.id);
    }
    private _data: Iqdjj_742;
    public setData(value: Iqdjj_742) {
        this._data = value;
        this.container.setGrids(value.jiangli);
        this.showInfo();
    }
    public getData() {
        return this._data;
    }
    private _state: number;
    public setState(value: number) {
        const self = this;
        self._state = value;
        self.showInfo();
        self.iconGot.visible = false;
        self.btnHand.visible = true;
        switch (value) {
            case 0:
            default://null or undefined
                self.btnHand.enabled = false;
                self.btnHand.checkNotice = false;
                break;
            case 1:
                self.btnHand.enabled = true;
                self.btnHand.checkNotice = true;
                break;
            case 2:
                self.btnHand.visible = false;
                self.iconGot.visible = true;
                break;
        }
    }
    private showInfo() {
        const self = this;
        if(!GGlobal.modelSGQD.jiJinInfo) {
            return;
        }
        const loginDay = GGlobal.modelSGQD.jiJinInfo.loginDay ? GGlobal.modelSGQD.jiJinInfo.loginDay : 1;
        self.txtLoginDay.text = `活动第${self._data.tianshu}天可领取` +
            HtmlUtil.fontNoSize(`(${loginDay}/${self._data.tianshu}天)`, loginDay >= self._data.tianshu ? `#00ff00` : `#ff0000`);
    }
    private onRemove() {
        this.container.setGrids(null);
    }
}