class ChildActPreView extends fairygui.GComponent {
    public static URL = "ui://b3p8szvvtc2x1p";
    public list: fairygui.GList;
    public txtDate: fairygui.GTextField;
    public rewardGRP: fairygui.GImage;
    public noticeImg: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = (index, render) => { render.setData(ModelActPreView.datas[index]) };
        self.rewardGRP.displayObject.touchEnabled = true;
        self.rewardGRP.addClickListener(self.onGetReward, self);
    }
    private onGetReward() {
        GGlobal.layerMgr.open(UIConst.VACTPREVIEWBOX);
    }
    public onOpen() {
        const self = this;
        const date = new Date(Model_GlobalMsg.getServerTime());
        self.txtDate.text = (date.getMonth() + 1) + "月" + date.getDate() + "日  " + "周" + self.getWeek(date.getDay());
        self.list.numItems = ModelActPreView.datas.length;
        GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, self.showNot, self);
        this.showNot()
    }
    private showNot() {
        this.noticeImg.visible = GGlobal.modelactPreView.getNotice();
    }
    private getWeek(day: number) {
        if (day == 0) {
            return "日";
        } else {
            return ConfigHelp.NumberToChinese(day);
        }
    }
    public onHide() {
        let self = this;
        self.list.numItems = 0;
        GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, this.showNot, this);
    }
}