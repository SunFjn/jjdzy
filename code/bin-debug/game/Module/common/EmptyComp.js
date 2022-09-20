var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EmptyComp = (function (_super) {
    __extends(EmptyComp, _super);
    function EmptyComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        return _this;
    }
    EmptyComp.prototype.setUIRole = function (value, godWeapon, horseId, changeModel) {
        if (godWeapon === void 0) { godWeapon = 0; }
        if (horseId === void 0) { horseId = 0; }
        if (changeModel === void 0) { changeModel = 0; }
        var self = this;
        if (value) {
            if (!self.uirole) {
                self.uirole = UIRole.create();
                self.uirole.uiparent = self._container;
                self.uirole.setPos(0, 0);
            }
            if (changeModel > 0) {
                self.uirole.changeModel = changeModel;
            }
            else {
                var mx = 0;
                if (Config.sz_739[value]) {
                    mx = Config.sz_739[value].moxing;
                }
                else {
                    mx = Number(value);
                }
                self.uirole.setBody(mx);
                self.uirole.setWeapon(value);
                self.uirole.setGodWeapon(godWeapon);
                self.uirole.setHorseId(horseId);
            }
            self.uirole.onAdd();
        }
        else {
            if (self.uirole) {
                self.uirole.onRemove();
                self.uirole = null;
            }
        }
    };
    EmptyComp.prototype.getUIRole = function () {
        return this.uirole;
    };
    EmptyComp.prototype.showPic = function (value) {
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
                this.eff = EffectMgr.addEff("uieff/10019", this.img["_container"], 63, 63);
            }
        }
        else {
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
    };
    EmptyComp.prototype.setEff = function (value) {
        if (this._eff) {
            EffectMgr.instance.removeEff(this._eff);
            this._eff = null;
        }
        if (value) {
            this._eff = EffectMgr.addEff(value, this._container);
        }
    };
    EmptyComp.prototype.setGrids = function (value, colNum, wid, horizontal) {
        if (colNum === void 0) { colNum = 3; }
        if (wid === void 0) { wid = 110; }
        if (horizontal === void 0) { horizontal = "toRight"; }
        var self = this;
        if (value) {
            var awars = ConfigHelp.makeItemListArr(JSON.parse(value));
            if (self.grids) {
                ConfigHelp.cleanGridview(self.grids);
            }
            self.grids = ConfigHelp.addGridview(awars, self, 0, 0, true, false, colNum, wid, 0.8);
        }
        else {
            if (self.grids) {
                ConfigHelp.cleanGridview(self.grids);
            }
        }
    };
    EmptyComp.URL = "ui://jvxpx9emtc2x3dv";
    return EmptyComp;
}(fairygui.GComponent));
__reflect(EmptyComp.prototype, "EmptyComp");
