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
var Child_GCBZ = (function (_super) {
    __extends(Child_GCBZ, _super);
    function Child_GCBZ() {
        var _this = _super.call(this) || this;
        _this.posArr0 = [{ x: 50, y: 650 }, { x: 90, y: 400 }, { x: 120, y: 150 }, { x: 450, y: 570 }];
        _this.posArr1 = [{ x: 70, y: 650 }, { x: 250, y: 440 }, { x: 280, y: 150 }, { x: 630, y: 260 }];
        _this.moveObj0 = { x: -265, y: 570 };
        _this.moveObj1 = { x: -25, y: 300 };
        _this.index = 0;
        return _this;
    }
    Child_GCBZ.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "Child_GCBZ"));
    };
    Child_GCBZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.itemArr = [self.item0, self.item1, self.item2, self.item3];
        self.container.touchable = false;
    };
    Child_GCBZ.prototype.setVo = function (voArr, value) {
        if (value === void 0) { value = 0; }
        var self = this;
        self.voArr = voArr;
        self.index = value;
        self.c1.selectedIndex = value;
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + UIConst.GCBZ + "_" + (value + 1) + ".jpg");
        self.container.visible = false;
        for (var i = 0; i < self.itemArr.length; i++) {
            var item = self.itemArr[i];
            if (i < voArr.length) {
                var vo = voArr[i];
                item.visible = true;
                item.data = i;
                item.setVo(vo);
                if (vo.cfg.tgs == GGlobal.modelgcbz.curID) {
                    self.container.visible = true;
                    var vomine = Model_player.voMine;
                    if (Config.sz_739[vomine._shiZhuang]) {
                        self.container.setUIRole(vomine._shiZhuang, vomine.godWeapon);
                    }
                    else {
                        self.container.setUIRole(vomine.job, vomine.godWeapon);
                    }
                    self.container.getUIRole().setScaleXY(0.8, 0.8);
                    if (value == 0) {
                        self.container.setXY(self.posArr0[item.data].x, self.posArr0[item.data].y);
                    }
                    else {
                        self.container.setXY(self.posArr1[item.data].x, self.posArr1[item.data].y);
                    }
                }
            }
            else {
                item.visible = false;
            }
        }
        if (!self.container.visible)
            self.container.setUIRole(0);
        GGlobal.control.listen(Enum_MsgType.GCBZ_MOVE_TWEEN, self.moveTo, self);
    };
    Child_GCBZ.prototype.moveTo = function (value) {
        var self = this;
        var model = GGlobal.modelgcbz;
        self.container.visible = false;
        for (var i = 0; i < self.itemArr.length; i++) {
            var item = self.itemArr[i];
            if (item.visible && item.vo.cfg.tgs == model.curID) {
                self.container.visible = true;
                var vomine = Model_player.voMine;
                if (Config.sz_739[vomine._shiZhuang]) {
                    self.container.setUIRole(vomine._shiZhuang, vomine.godWeapon);
                }
                else {
                    self.container.setUIRole(vomine.job, vomine.godWeapon);
                }
            }
        }
        if (!self.container.visible) {
            self.container.setUIRole(0);
            return;
        }
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
        if (value == 0) {
            startX = self.index == 0 ? self.moveObj0.x : self.moveObj1.x;
            startY = self.index == 0 ? self.moveObj0.y : self.moveObj1.y;
            endX = self.index == 0 ? self.posArr0[value].x : self.posArr1[value].x;
            endY = self.index == 0 ? self.posArr0[value].y : self.posArr1[value].y;
        }
        else {
            startX = self["posArr" + self.index][value - 1].x;
            startY = self["posArr" + self.index][value - 1].y;
            endX = self["posArr" + self.index][value].x;
            endY = self["posArr" + self.index][value].y;
        }
        self.container.setXY(startX, startY);
        self.container.getUIRole().move_state = 1;
        self.container.getUIRole().setScaleXY(0.8, 0.8);
        self.container.getUIRole().invalid |= 1023;
        var tgs = self.voArr[value].cfg.tgs;
        egret.Tween.get(self.container).to({ x: endX, y: endY }, 1000).call(function () {
            if (self.container.getUIRole()) {
                self.container.getUIRole().move_state = 0;
                self.container.getUIRole().invalid |= 1023;
            }
            model.CG_AttackCity_attackNPC_12061(tgs);
        }, self);
    };
    Child_GCBZ.prototype.clean = function () {
        var self = this;
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].clean();
        }
        GGlobal.control.remove(Enum_MsgType.GCBZ_MOVE_TWEEN, self.moveTo, self);
    };
    Child_GCBZ.URL = "ui://vgiijkm8uvs33";
    return Child_GCBZ;
}(fairygui.GComponent));
__reflect(Child_GCBZ.prototype, "Child_GCBZ");
