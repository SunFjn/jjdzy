class ItemActPreView extends fairygui.GComponent {
    public static URL = "ui://b3p8szvvtc2x1q";
    public iconMask: fairygui.GGraph;
    public iconImp: fairygui.GLoader;
    public iconKuaFu: fairygui.GLoader;
    public txtName: fairygui.GLoader;
    public txtActTime: fairygui.GTextField;
    public btnHand: Button0;
    public iconJX: fairygui.GImage;
    public emptyCon: fairygui.GComponent;
    public txtLink: fairygui.GTextField;
    public bg: fairygui.GLoader;
    private grids = [];//70 72
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.iconMask.visible = false;
        self.btnHand.addClickListener(self.onHand, self);
        self.txtLink.displayObject.touchEnabled = true;
        self.txtLink.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHand, this);
        self.txtLink.text = HtmlUtil.createLink("玩法说明");
    }
    private onHand(evt: egret.TouchEvent) {
        let self = this;
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        const tar = evt.currentTarget;
        let cfg1: Ihdyl_259 = self.getData();
        switch (tar) {
            case self.btnHand:
                const sysId = cfg1.open;
                if (sysId == UIConst.COUNTRY_KINGSHIP && Model_player.voMine.country <= 0) {
                    ViewCommonWarn.text("请先加入国家");
                    return;
                } else if (ModuleManager.isOpen(sysId, true)) {
                    if (sysId == UIConst.ACTIVITYHALL) {
                        let cfg = Config.hddt_200[cfg1.sysid];
                        if (cfg) GGlobal.layerMgr.open(sysId, cfg.fenlei - 1);
                    } else {
                        GGlobal.layerMgr.open(sysId);
                    }
                }
                break;
            default:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, cfg1.sysid);
                break;
        }
    }
    private _data: Ihdyl_259;
    public setData(value: Ihdyl_259) {
        const self = this;
        self._data = value;
        // self.iconImp.visible = value.zy;
        self.iconKuaFu.visible = value.kf;
        self.iconImp.visible = value.zy;
        self.iconKuaFu.x = value.zy ? 258 : 197;
        // self.txtName.text = value.name;
        IconUtil.setImg(self.txtName, Enum_Path.PIC_URL + value.sysid + "a.png");
        ConfigHelp.cleanGridview(self.grids);
        let awards = ConfigHelp.makeItemListArr(JSON.parse(value.tips));
        self.grids = ConfigHelp.addGridview(awards, self.emptyCon, 0, 0, true, false, 5, 110);
        IconUtil.setImg(self.bg, "resource/image/actpreview/" + value.sysid + ".png");
        const kaiQiSt = ModelActPreView.getState(this.getData());
        switch (kaiQiSt) {
            case 0://活动结束
                self.iconMask.visible = true;
                self.txtActTime.visible = true;
                self.txtActTime.text = "" + value.start + "-" + value.end;
                self.iconJX.visible = false;
                self["n16"].visible = true;
                self["n35"].visible = false;
                break;
            case 1://活动未开启
                self.iconMask.visible = false;
                self.txtActTime.visible = true;
                self.txtActTime.text = "" + value.start + "-" + value.end;
                self.iconJX.visible = false;
                self["n16"].visible = true;
                self["n35"].visible = false;
                break;
            case 2://活动进行中
                self.iconMask.visible = false;
                self.txtActTime.visible = false;
                self.iconJX.visible = true;
                self["n16"].visible = false;
                self["n35"].visible = true;
                break;
        }
    }
    public getData() {
        return this._data;
    }

    public clean() {
        let self = this
         ConfigHelp.cleanGridview(self.grids);
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.txtName, null);
    }
}