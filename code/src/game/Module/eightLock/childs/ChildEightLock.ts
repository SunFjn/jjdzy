class ChildEightLock extends ABActUI {
    public bg: fairygui.GLoader;
    public txtRemainTm: fairygui.GTextField;
    public txtCZ: fairygui.GTextField;
    public list: fairygui.GList;
    protected childrenCreated() {
        super.childrenCreated();
        const datas = GGlobal.modelEightLock.getDatas();
        this.list.itemRenderer = (i, r) => { r.setData(datas[i]) };
        this.list.callbackThisObj = this;
        this.list.numItems = datas.length;
    }
    public getView() {
        return fairygui.UIPackage.createObject("eightLock", "ChildEightLock").asCom;
    }
    private onUpdate() {
        const datas = GGlobal.modelEightLock.getDatas();
        this.list.numItems = datas.length;
        const act = ModelEightLock.originalDatas[UIConst.EIGHTLOCK];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        } else {
            this.txtRemainTm.text = "00:00:00";
        }
        this.txtCZ.text = "您在本活动已充值" + HtmlUtil.fontNoSize(ModelEightLock.chongZhiValue + "元宝", "#00ff00");
    }
    private onTick() {
        const act = ModelEightLock.originalDatas[UIConst.EIGHTLOCK];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
        } else {
            this.txtRemainTm.text = "00:00:00";
            Timer.instance.remove(this.onTick, this);
        }
    }
    public onShow() {
        IconUtil.setImg(this.bg, "resource/image/pic/bg1.png");
        GGlobal.modelEightLock.listen(ModelEightLock.msg_datas, this.onUpdate, this);
        GGlobal.modelEightLock.CG4521();
    }
    public onHide() {
        IconUtil.setImg(this.bg, null);
        Timer.instance.remove(this.onTick, this);
        GGlobal.modelEightLock.remove(ModelEightLock.msg_datas, this.onUpdate, this);
        this.list.numItems = 0;
    }
}