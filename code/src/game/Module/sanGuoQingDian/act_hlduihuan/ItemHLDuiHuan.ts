class ItemHLDuiHuan extends fairygui.GComponent {
    public static URL = "ui://kdt501v2tipm6";
    public txtInfo: fairygui.GTextField;
    public container1: EmptyComp;
    public container2: EmptyComp;
    public btnHand: Button0;
    public iconFin: fairygui.GImage;
    public txtDHCnt: fairygui.GTextField;
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.btnHand.addClickListener(this.onHand, this);
        this.btnHand.text = "兑换";
    }
    private onHand() {
        GGlobal.modelSGQD.CG4103(this._data.id);
    }
    private _data: Ihldh_741;
    public setData(value: Ihldh_741) {
        this._data = value;
        this.container1.setGrids(value.cailiao, 3, 110);
        const arr = JSON.parse(value.cailiao);
        if(arr.length == 1) {
            this["n3"].x = 125;
            this.container2.x = 161;
        }else {
            this["n3"].x = 235;
            this.container2.x = 271;
        }
        this.container2.setGrids(value.daoju);
        this.updateState();
    }
    public getData() {
        return this._data;
    }
    public updateState() {
        const needs = JSON.parse(this._data.cailiao);
        let bool = true;
        for (let i = 0; i < needs.length; i++) {
            const arr = needs[i];
            var cnt = Model_Bag.getItemCount(arr[1]);
            if (cnt < arr[2]) {
                bool = false;
                break;
            }
        }
        if (needs.length == 0) {
            bool = false;
        }
        const rewards = JSON.parse(this._data.daoju);
        const xianZhi = this._data.cishu;
        const dhCnt = GGlobal.modelSGQD.haoLiInfo[this._data.id] == null ? 0 : GGlobal.modelSGQD.haoLiInfo[this._data.id];
        if (xianZhi > 0 && dhCnt >= xianZhi) {
            bool = false;
            this.iconFin.visible = true;
            this.btnHand.visible = false;
        } else {
            this.iconFin.visible = false;
            this.btnHand.visible = true;
        }
        this.txtInfo.text = `收集以下物品, 可兑换` + HtmlUtil.fontNoSize(`(${bool ? rewards.length : 0}/${rewards.length})`, bool ? `#00ff00` : `#ff0000`);
        this.txtDHCnt.text = `${this._data.cishu - dhCnt}/${this._data.cishu}`;
        if (xianZhi == 0 || dhCnt >= xianZhi) {
            this.txtDHCnt.text = "";
        }
        this.btnHand.checkNotice = bool;
    }
    public onRemove() {
        this.container1.setGrids(null);
        this.container2.setGrids(null);
    }
}