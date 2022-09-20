class ItemSHJXC extends fairygui.GComponent {
    public static URL = "ui://fx4pr5qesh622h";
    public iconType: fairygui.GLoader;
    public txtNum: fairygui.GTextField;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data: any;
    public setData(value: any) {//印记位置,印记id,印记类型
        this._data = value;
        if (value) {
            this.visible = true;
            const arr = value.split(/\,/gi);
            const pos: number = Number(arr[2]);
            IconUtil.setImg(this.iconType, "resource/image/shouling/" + ModelSH.icUrls[pos - 1] + ".png");
            this.txtNum.text = Config.shjxstar_266[arr[1]].star;
        } else {
            this.visible = false;
        }
    }
}