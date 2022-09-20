class ItemSZ extends fairygui.GComponent {
    public txtName: fairygui.GTextField;
    public txtNum: fairygui.GTextField;
    public imgStar: fairygui.GLoader;
    public grid: ViewGrid;
    public ctrl: fairygui.Controller;
    public iconDefault: fairygui.GLoader;
    public selectImg: fairygui.GImage;
    public noticeImg: fairygui.GImage;
    public iconDressed: fairygui.GImage;
    public backIcon: fairygui.GLoader;
    public static URL = "ui://zyx92gzwke3i39";
    public constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
    }
    private _data: Isz_739;
    public set data(_dt: any) {
        const self = this;
        self._data = _dt;
        const info = Model_WuJiang.shiZhuanDic[Model_WuJiang.curSelWJId];
        if (_dt === null) {//敬请期待
            self.ctrl.setSelectedIndex(1);
        } else if (Array.isArray(_dt)) {
            self.ctrl.setSelectedIndex(2);
            const pifu = _dt[0];
            const pinzhi = _dt[1];
            IconUtil.setImg(self.iconDefault, `resource/image/pifu/${pifu}.png`);
            IconUtil.setImg(self.backIcon, Enum_Path.ICON70_URL + "BmG_" + pinzhi + ".png");
            const wjId = Model_WuJiang.curSelWJId;
            self.iconDressed.visible = info.onSkinId == 0 && !!Model_WuJiang.wuJiangStar[wjId];
        } else {
            const vo = _dt;
            self.ctrl.setSelectedIndex(0);
            const item = ConfigHelp.makeItemListArr(JSON.parse(vo.jihuo))[0];
            const arr = info.ownSkinIds;
            self.txtName.text = item.name;
            self.txtName.color = item.qColor;
            var starLv = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].skinId == vo.ID) {
                    starLv = arr[i].starLv;
                    break;
                }
            }
            if (vo.tujing && !info.ownSkinIds.length) {
                self["n19"].visible = true;
                self["n10"].text = vo.tujing;
            } else {
                self["n19"].visible = false;
            }
            self.iconDressed.visible = info.onSkinId > 0;

            self.txtNum.text = "" + starLv;
            if (starLv > 0) {
                self["n31"].visible = true;
                const num = starLv % 10 >> 0 == 0 ? starLv / 10 : (starLv / 10 >> 0) + 1;
                self.imgStar.url = CommonManager.getUrl("common", `big_star_${num}`);
            } else {
                self.txtNum.text = 0 + "";
                self.imgStar.url = CommonManager.getUrl("common", "big_star_0");
                self["n31"].visible = false;
            }
            self.grid.vo = item;
        }
    }
    public get data() {
        return this._data;
    }
    private _selected: boolean = false;
    public set selected(value: boolean) {
        this._selected = value;
        this.selectImg.visible = value;
    }
    public get selected() {
        return this._selected;
    }
    public setNot(val: boolean) {
        this.noticeImg.visible = val;
    }

    public clean() {
        let self = this;
        IconUtil.setImg(self.backIcon, null);
    }
}