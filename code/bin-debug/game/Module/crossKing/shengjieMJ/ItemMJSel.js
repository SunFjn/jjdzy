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
var ItemMJSel = (function (_super) {
    __extends(ItemMJSel, _super);
    function ItemMJSel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemMJSel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconBX.displayObject.touchEnabled = true;
        self.iconBX.addClickListener(self.onHand, self);
        self.iconSel.visible = self.iconSel.touchable = false;
        self.grid1.isShowEff = true;
        self.grid2.isShowEff = true;
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
    };
    ItemMJSel.prototype.onHand = function (evt) {
        GGlobal.layerMgr.open(UIConst.SJMJ_BX, this.data.id);
        evt.stopImmediatePropagation();
    };
    Object.defineProperty(ItemMJSel.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var self = this;
            self._data = value;
            self.txtTitle.text = value.name;
            var target = self.getTGInfo();
            var level = Model_LunHui.realLv;
            self.state = -1;
            if (target == null || value.id > target.id) {
                self.c1.setSelectedIndex(0);
                if (!GGlobal.modelSJMJ.isLvlFit(value.id)) {
                    self.txtOpenLv.color = 0xFF0000;
                    self.txtOpenLv.text = "" + ModelShengJieMJ.idToName[value.id / 1000 >> 0] + (value.open / 10 >> 0) + "\u9636\u5F00\u542F";
                    self.state = 0;
                }
                else {
                    if ((target == null && (value.id % 1000 >> 0) == 1) || (target && value.id == target.id + 1)) {
                        self.txtOpenLv.color = 0xffff00;
                        self.txtOpenLv.text = "首通奖励";
                        self.state = 2;
                    }
                    else {
                        self.txtOpenLv.color = 0xFF0000;
                        self.txtOpenLv.text = "需通上一关";
                        self.state = 1;
                    }
                    // if (self.preHasPass() || (!target.hasPassed && value.id == target.cfgFB.id)) {
                    //     self.txtOpenLv.color = 0xFFFF00;
                    //     self.txtOpenLv.text = "首通奖励";
                    //     self.state = 2;
                    // } else {
                    //     self.txtOpenLv.color = 0xFF0000;
                    //     self.txtOpenLv.text = "需通上一关";
                    //     self.state = 1;
                    // }
                }
                var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(value.reward2));
                self.grid1.vo = rewardArr[0];
                self.grid2.vo = rewardArr[1];
                self.grid1.tipEnabled = true;
                self.grid2.tipEnabled = true;
                this.imgZhe.visible = false;
                this.lbZhe.text = "";
            }
            else {
                self.c1.setSelectedIndex(1);
                var info = GGlobal.modelSJMJ.idBoughts;
                var bool = self.noticeImg.visible = !info[value.id];
                self.iconKQ.visible = !bool;
                if (Number(value.zhekou) > 0) {
                    this.imgZhe.visible = true;
                    this.lbZhe.text = value.zhekou + "折";
                }
                else {
                    this.imgZhe.visible = false;
                    this.lbZhe.text = "";
                }
            }
            var childIndex = self.getChildIndex(self.taiziImg);
            if (!self.uirole) {
                self.uirole = UIRole.create();
                self.uirole.uiparent = self._container;
            }
            var monsterCfg = Config.NPC_200[value.boss];
            self.uirole.setBody(monsterCfg.mod);
            self.uirole.setWeapon(monsterCfg.mod);
            self.uirole.onAdd();
            self.uirole.setPos(97, 192);
            self._container.addChildAt(self.uirole.view, childIndex + 1);
            IconUtil.setImg(self.iconSel, Enum_Path.BACK_URL + "seletedbg.png");
            IconUtil.setImg(self.taiziImg, Enum_Path.BACK_URL + "taizi.png");
            var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
            this.imgDoub.visible = (act != null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemMJSel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.iconSel.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    ItemMJSel.prototype.onRemove = function () {
        if (this.uirole) {
            this.uirole.onRemove();
        }
        this.uirole = null;
        this.iconSel.visible = false;
        IconUtil.setImg(this.taiziImg, null);
        IconUtil.setImg(this.iconSel, null);
    };
    ItemMJSel.prototype.getTGInfo = function () {
        var _data = this._data;
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        var idAsKey = _data.id / 1000 >> 0;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    };
    ItemMJSel.URL = "ui://yqpfulefudgz42";
    return ItemMJSel;
}(fairygui.GComponent));
__reflect(ItemMJSel.prototype, "ItemMJSel");
