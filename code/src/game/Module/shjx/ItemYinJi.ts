class ItemYinJi extends fairygui.GComponent {
    public static URL = "ui://4aepcdbwrjpys";
    public iconLock: fairygui.GLoader;
    public iconType: fairygui.GLoader;
    public txtNum: fairygui.GTextField;
    public txtAttr: fairygui.GTextField;
    public typeIcon: fairygui.GLoader;
    public maskImg: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.iconLock.displayObject.touchEnabled = true;
        Utils.DisplayUtil.addPop(this.iconLock.displayObject);
        this.iconLock.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLock, this);
    }
    private onLock() {
        let opeType: number = this._data.entityData.isLock == 1 ? 0 : 1;
        GGlobal.modelSHJX.CG863(this._data.type, this._data.equipPos, this._data.entityData.position, opeType);
    }
    private _data: IJXMixData;
    public setData(value: IJXMixData) {
        this._data = value;
        this.iconLock.icon = value.entityData.isLock == 1 ? "ui://4aepcdbwk0ep3w" : "ui://4aepcdbwrjpy1v";
        this.maskImg.visible = value.entityData.isLock == 1;
        this.typeIcon.url = ModelSH.icNameUrls[value.entityData.type - 1];
        IconUtil.setImg(this.iconType, "resource/image/shouling/" + ModelSH.icUrls[value.entityData.type - 1] + ".png");
        const cfg = Config.shjxstar_266[value.entityData.starID];
        if (cfg) {
            this.txtNum.text = cfg.star + "";
            this.txtAttr.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
        }
    }
    public getData() {
        return this._data;
    }
}
interface IJXMixData {
    entityData: IJXDetail;
    equipPos: number;
    type: number;
}