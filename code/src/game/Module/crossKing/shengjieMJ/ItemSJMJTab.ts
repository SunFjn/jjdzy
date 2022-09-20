class ItemSJMJTab extends fairygui.GComponent {
    public static URL = "ui://yqpfulefsh6249";
    public iconLD: fairygui.GLoader;
    public iconSel: fairygui.GImage;
    public noticeImg: fairygui.GImage;
    public iconSt: fairygui.GLoader;
    public txtName: fairygui.GTextField;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data: Isjmj_258;
    public setData(value: Isjmj_258) {
        this._data = value;
        const openLv = value.lv;
        this.txtName.text = value.name;
        this.noticeImg.visible = false;
        IconUtil.setImg(this.iconLD, "resource/image/sjmj/" + value.id + ".png");
        if (Model_LunHui.realLv < openLv) {
            IconUtil.setImg(this.iconSt, "resource/image/sjmj/tips" + value.id + ".png");
            this.iconSt.visible = true;
        } else {
            const tongGuanCfg = this.getTGInfo(value.id);
            if (!tongGuanCfg && GGlobal.modelSJMJ.isLvlFit((value.id * 1000 >> 0) + 1)) {//1关都没通 并且第一关可挑战
                this.iconSt.icon = "ui://yqpfulefvwaa4e";
                this.iconSt.visible = true;
            } else {//通关过
                if (GGlobal.modelSJMJ.isLvlFit(tongGuanCfg.id + 1)) {//下一关可以挑战
                    this.iconSt.icon = "ui://yqpfulefvwaa4e";
                    this.iconSt.visible = true;
                } else {
                    const sdCnt = GGlobal.modelSJMJ.sdCntDic[value.id];
                    const canSD = sdCnt > 0;//可扫荡
                    if (canSD) {
                        this.iconSt.icon = "ui://yqpfulefvwaa4e";
                        this.iconSt.visible = true;
                    } else {
                        this.iconSt.visible = false;
                    }
                }
                this.noticeImg.visible = GGlobal.modelSJMJ.checkTabRed(value.id);
            }
        }

    }
    private getTGInfo(id: number) {
        const {fubenInfo} = GGlobal.modelSJMJ;
        for (let key in fubenInfo) {
            const compareId = Number(key) / 1000 >> 0;
            if (compareId == id) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    }
    public getData() {
        return this._data;
    }
    private _lastTime: number = 0;
    private _selected: boolean = false;
    public setSel(value: boolean) {
        this.selected = value;
        var now = egret.getTimer();
        if (value && now - this._lastTime >= 500) {
            this._lastTime = now;
            const cfg = this.getFBCfg();
            const view: ViewSJMJ = GGlobal.layerMgr.getView(UIConst.SJMJ2);
            if (view) {
                view.mixHander(cfg.id);
            }
        }
    }
    public set selected(value: boolean) {
        this._selected = value;
        this.iconSel.visible = value;
    }
    public get selected() {
        return this._selected;
    }
    private getFBCfg() {
        const {_data} = this;
        const {fubenInfo} = GGlobal.modelSJMJ;
        const idAsKey = _data.id;
        for (let key in fubenInfo) {
            const compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return Config.sjmjfb_258[_data.id * 1000 + 1];
    }
}