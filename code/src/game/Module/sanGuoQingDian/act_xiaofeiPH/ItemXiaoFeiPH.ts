class ItemXiaoFeiPH extends fairygui.GComponent {
    public static URL = "ui://kdt501v2tipmg";
    public static readonly CUT_LEN = 2;
    private iconFirst: fairygui.GImage;
    private iconPM: fairygui.GLoader;
    private txtName: fairygui.GTextField;
    private container: EmptyComp;
    public c1: fairygui.Controller;
    public txtPer: fairygui.GTextField;
    public iconXWYD: fairygui.GImage;
    private resUrl = ["ui://kdt501v2tipmf", "ui://kdt501v2tipm9", "ui://kdt501v2tipma", "ui://kdt501v2tipmb", "ui://kdt501v2tipmc"];
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.txtName.addEventListener(egret.TextEvent.LINK, self.onHand, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
        self.container.x = 25;
    }
    private onHand() {
        GGlobal.layerMgr.open(UIConst.XIAOFEIPHB);
    }
    private _data: Isgxfph_261;
    public setData(value: Isgxfph_261) {
        const self = this;
        self._data = value;
        self.iconXWYD.visible = false;
        if (self._index == 0) {
            self.c1.setSelectedIndex(0);
            self.container.y = 55;
            self.txtPer.y = 60;
            // self.container.x = 25;
            self.container.setGrids(value.show, 3, 90);
            // self.iconFirst.visible = true;
            // self.txtPaiMing.text = "";
            // self.txtName.text = "";
        } else {
            self.c1.setSelectedIndex(1);
            self.container.y = 42;
            self.txtPer.y = 47;
            // self.iconFirst.visible = false;
            if (self._index == 1) {
                const second = GGlobal.modelSGQD.paiHangDatas[1];
                // self.iconPM.source = self.resUrl[1];
                self.iconPM.icon = self.resUrl[1];
                if (second && second.name) {
                    self.txtName.text = HtmlUtil.fontNoSize(second.name, "#FF9900");
                } else {
                    // self.txtName.text = HtmlUtil.fontNoSize("无人上榜", "#00ff00");
                    self.iconXWYD.visible = true;
                    self.txtName.text = "";
                }
                self.txtName.y = 7;
            } else {
                const arr = JSON.parse(value.rank)[0];
                // self.txtPaiMing.text = `第${arr[0] - arr[1]}名`;
                // self.iconPM.source = self.resUrl[self._index];
                self.iconPM.icon = self.resUrl[self._index];
                self.txtName.text = HtmlUtil.fontNoSize(HtmlUtil.createLink("查看排行"), "#00ff00");
                self.txtName.y = 3;
            }
            // if (self._index < 3) {
            //     self.container.x = 25;
            // } else {
            //     self.container.x = 115;
            // }
            self.container.setGrids(value.show, 3, 90);
        }
        self.addChild(self.txtName)//点击事件被container挡住
        if (value.fh == 0) {
            this.txtPer.visible = false;
        } else {
            this.txtPer.visible = true;
            this.txtPer.text = `${value.fh}%`;
        }

    }
    public getData() {
        return this._data;
    }
    private _index: number;
    public setIndex(value: number) {
        this._index = value;
    }
    private onRemove() {
        this.container.setGrids(null);
    }
}