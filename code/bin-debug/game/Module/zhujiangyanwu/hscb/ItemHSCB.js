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
var ItemHSCB = (function (_super) {
    __extends(ItemHSCB, _super);
    function ItemHSCB() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    ItemHSCB.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemHSCB"));
    };
    ItemHSCB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChild("img"));
        this.lb = (this.getChild("lb"));
        this.imgPass = (this.getChild("imgPass"));
    };
    Object.defineProperty(ItemHSCB.prototype, "vo", {
        set: function (v) {
            var self = this;
            self.lb.text = "第" + v.id + "关";
            if (v.id > GGlobal.model_HSCB.curLayer) {
                self.imgPass.visible = false;
            }
            else {
                self.imgPass.visible = true;
            }
            var arr = JSON.parse(v.boss);
            var npcId = Number(arr[0][0]);
            var boVo = Config.NPC_200[npcId];
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.setPos(self.img.x + self.img.width / 2, self.img.y);
                self.awatar.setScaleXY(1, 1);
                self.awatar.uiparent = self.displayListContainer;
                self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
            }
            self.awatar.setBody(boVo.mod);
            if (boVo.weapon) {
                self.awatar.setWeapon(boVo.mod);
            }
            else {
                self.awatar.setWeapon(null);
            }
            self.awatar.onAdd();
            self.addChild(self.imgPass);
        },
        enumerable: true,
        configurable: true
    });
    ItemHSCB.prototype.removeEvent = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    ItemHSCB.URL = "ui://7a366usaql4ng";
    return ItemHSCB;
}(fairygui.GComponent));
__reflect(ItemHSCB.prototype, "ItemHSCB");
