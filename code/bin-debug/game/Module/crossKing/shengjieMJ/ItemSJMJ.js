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
var ItemSJMJ = (function (_super) {
    __extends(ItemSJMJ, _super);
    function ItemSJMJ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        return _this;
    }
    ItemSJMJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconPassed = self["n5"];
        self.btnHand.addClickListener(self.onHand, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.dispose, self);
    };
    ItemSJMJ.prototype.onHand = function () {
        var fbCfg = this.getFBCfg(); //副本表信息
        GGlobal.layerMgr.open(UIConst.SJMJ2, fbCfg.id);
    };
    Object.defineProperty(ItemSJMJ.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var self = this;
            self._data = value;
            var fbCfg = self.getFBCfg(); //副本表信息
            var monsterCfg = Config.NPC_200[fbCfg.boss];
            self.container.setUIRole(monsterCfg.mod);
            self.txtName.text = monsterCfg.name;
            self.txtTitle.text = fbCfg.name;
            if (self.grids) {
                ConfigHelp.cleanGridview(self.grids);
            }
            var awars = ConfigHelp.makeItemListArr(JSON.parse(fbCfg.kf));
            awars.length > 3 && (awars.length = 3);
            self.grids = ConfigHelp.addGridview(awars, self.gridContainer, 0, 0, true, false, 5, 87, 0.8);
            // const sdCnt: number = GGlobal.modelSJMJ.fubenInfo[fbCfg.id] != null ? GGlobal.modelSJMJ.fubenInfo[fbCfg.id] : 1;
            var sdCnt = GGlobal.modelSJMJ.sdCntDic[value.id];
            self.txtSDCount.text = "挑战次数: " + (sdCnt <= 0 ? HtmlUtil.fontNoSize(sdCnt + "", "#ff0000") : HtmlUtil.fontNoSize(sdCnt + "", "#00ff00"));
            self["n13"].visible = self["txtSDCount"].visible = sdCnt > 0;
            var openLv = value.lv;
            if (Model_LunHui.realLv < openLv) {
                self.c1.setSelectedIndex(1);
                self.txtOpenLv.text = openLv + "\u7EA7\u5F00\u542F";
                self["n17"].visible = true;
                self["n20"].visible = true;
            }
            else {
                self.c1.setSelectedIndex(0);
                self.txtOpenLv.text = "";
                self["n17"].visible = false;
                self["n20"].visible = false;
            }
            self.iconPassed.visible = false;
            self.btnHand.checkNotice = GGlobal.modelSJMJ.noticeSingle(value.id) || GGlobal.modelSJMJ.checkTabRed(value.id);
            IconUtil.setImg(self.taiziImg, Enum_Path.BACK_URL + "taizi.png");
            var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
            this.imgDoub.visible = (act != null);
        },
        enumerable: true,
        configurable: true
    });
    ItemSJMJ.prototype.dispose = function () {
        var self = this;
        self.container.setUIRole(null);
        IconUtil.setImg(this.taiziImg, null);
        ConfigHelp.cleanGridEff(this.grids);
    };
    ItemSJMJ.prototype.setBg = function (index) {
        var bgIndex = index % 3 >> 0;
        IconUtil.setImg(this.bgLD, Enum_Path.BACK_URL + "sjmj_" + bgIndex + ".png");
    };
    ItemSJMJ.prototype.getFBCfg = function () {
        var _data = this._data;
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        var idAsKey = _data.id;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return Config.sjmjfb_258[_data.id * 1000 + 1];
    };
    ItemSJMJ.URL = "ui://yqpfulefgenj3x";
    return ItemSJMJ;
}(fairygui.GComponent));
__reflect(ItemSJMJ.prototype, "ItemSJMJ");
