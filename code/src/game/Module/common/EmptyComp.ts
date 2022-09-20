class EmptyComp extends fairygui.GComponent {
    public static URL = "ui://jvxpx9emtc2x3dv";
    private uirole: UIRole;
    public setUIRole(value: string | number, godWeapon: number = 0, horseId = 0, changeModel = 0) {
        const self = this;
        if (value) {
            if (!self.uirole) {
                self.uirole = UIRole.create();
                self.uirole.uiparent = self._container;
                self.uirole.setPos(0, 0);
            }
            if (changeModel > 0) {
                self.uirole.changeModel = changeModel;
            } else {
                let mx = 0;
                if (Config.sz_739[value]) {
                    mx = Config.sz_739[value].moxing;
                } else {
                    mx = Number(value);
                }
                self.uirole.setBody(mx);
                self.uirole.setWeapon(value);
                self.uirole.setGodWeapon(godWeapon);
                self.uirole.setHorseId(horseId);
            }
            self.uirole.onAdd();
        } else {
            if (self.uirole) {
                self.uirole.onRemove();
                self.uirole = null;
            }
        }
    }
    public getUIRole() {
        return this.uirole;
    }
    private img: fairygui.GLoader;
    private eff: Part;
    public showPic(value: string) {
        if (value) {
            this.img = this.img || (this.img = new fairygui.GLoader());
            IconUtil.setImg(this.img, value);
            this.img.width = 134;
            this.img.height = 122;
            this.img.setXY(-47, -61);
            this.img.setScale(0.8, 0.8);
            this.addChild(this.img);
            this.img.fill = fairygui.LoaderFillType.Scale;
            if (!this.eff) {
                this.eff = EffectMgr.addEff(`uieff/10019`, this.img["_container"], 63, 63);
            }
        } else {
            if (this.img) {
                IconUtil.setImg(this.img, null);
                this.img.parent.removeChild(this.img);
                this.img = null;
            }
            if (this.eff) {
                EffectMgr.instance.removeEff(this.eff);
                this.eff = null;
            }
        }
    }
    private _eff: Part;
    public setEff(value: string): void {
        if (this._eff) {
            EffectMgr.instance.removeEff(this._eff);
            this._eff = null;
        }
        if (value) {
            this._eff = EffectMgr.addEff(value, this._container);
        }
    }
    private grids = [];
    public setGrids(value: string, colNum: number = 3, wid: number = 110, horizontal: "toRight" | "toLeft" = "toRight") {
        const self = this;
        if (value) {
            var awars = ConfigHelp.makeItemListArr(JSON.parse(value));
            if (self.grids) {
                ConfigHelp.cleanGridview(self.grids);
            }
            self.grids = ConfigHelp.addGridview(awars, self, 0, 0, true, false, colNum, wid, 0.8);
        } else {
            if (self.grids) {
                ConfigHelp.cleanGridview(self.grids);
            }
        }
    }
}