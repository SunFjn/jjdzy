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
var VPeacockPly = (function (_super) {
    __extends(VPeacockPly, _super);
    function VPeacockPly() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    VPeacockPly.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "VPeacockPly"));
    };
    VPeacockPly.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgPass = (this.getChild("imgPass"));
        this.lblayer = (this.getChild("lblayer"));
        this.addClickListener(this.onClick, this);
    };
    Object.defineProperty(VPeacockPly.prototype, "vo", {
        set: function (v) {
            this._layer = v;
            var cfg = Config.tower_219[v];
            if (!cfg)
                return;
            var arr = ConfigHelp.SplitStr(cfg.boss);
            var bossId = Number(arr[0][0]);
            if (!this.awatar) {
                this.awatar = UIRole.create();
                this.awatar.setPos(this.imgPass.width / 2, this.imgPass.height + 20);
                this.awatar.setScaleXY(1, 1);
            }
            var boss = Config.NPC_200[bossId];
            this.awatar.setBody(boss.mod);
            if (boss.weapon) {
                this.awatar.setWeapon(boss.mod);
            }
            else {
                this.awatar.setWeapon(null);
            }
            this.awatar.uiparent = this.displayListContainer;
            this.awatar.onAdd();
            this.addChild(this.imgPass);
            this.lblayer.text = v + "层";
            var curLayer = Model_Peacock.curLayer + 1;
            if (v < curLayer) {
                this.imgPass.visible = true;
            }
            else {
                this.imgPass.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    VPeacockPly.prototype.removeListen = function () {
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
    };
    VPeacockPly.prototype.onClick = function (e) {
        var curLayer = Model_Peacock.curLayer + 1;
        if (this._layer < curLayer) {
            ViewCommonWarn.text("已通关");
            return;
        }
        else if (this._layer > curLayer) {
            ViewCommonWarn.text("请先挑战上一层");
            return;
        }
        GGlobal.modelPeacock.CG_UPTOWER();
    };
    VPeacockPly.URL = "ui://pkuzcu87m1lm32";
    return VPeacockPly;
}(fairygui.GComponent));
__reflect(VPeacockPly.prototype, "VPeacockPly");
