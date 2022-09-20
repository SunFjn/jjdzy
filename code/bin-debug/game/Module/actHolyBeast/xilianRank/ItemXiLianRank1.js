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
var ItemXiLianRank1 = (function (_super) {
    __extends(ItemXiLianRank1, _super);
    function ItemXiLianRank1() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        _this._index = 0;
        return _this;
    }
    ItemXiLianRank1.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ItemXiLianRank1"));
    };
    ItemXiLianRank1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    ItemXiLianRank1.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemXiLianRank1.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._rank && this._rank.jdCount >= Config.xtcs_004[5704].num) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    ItemXiLianRank1.prototype.setVO = function (id) {
        var self = this;
        self._index = id;
        var cfg = Config.shxlpm_268[id];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = this._awards.length;
        self._bigAwards = JSON.parse(cfg.reward1);
        self.bpList.numItems = this._bigAwards.length;
        self.secondImg.visible = false;
        self.thirdImg.visible = false;
        if (id == 2) {
            self.secondImg.visible = true;
        }
        else {
            self.thirdImg.visible = true;
        }
    };
    /**更新数据 */
    ItemXiLianRank1.prototype.setData = function () {
        var self = this;
        self._rank = Model_ActHolyBeast.rankData[self._index - 1];
        if (!self._rank) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self.nameTxt.text = self._rank.name;
            self.jdTxt.text = "圣兽洗练：" + self._rank.jdCount + "次";
            if (Model_ActHolyBeast.myRank == self._index) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
        }
        var headVO;
        if (self._index == 2) {
            headVO = Model_ActHolyBeast.headData[0];
        }
        else {
            headVO = Model_ActHolyBeast.headData[1];
        }
        if (!headVO) {
            self.viewHead.setdata(null);
        }
        else {
            self.viewHead.setdata(headVO.headId, -1, "", headVO.vip, false, null, headVO.country);
        }
        self.bpList.numItems = this._bigAwards.length;
    };
    /**销毁事件 */
    ItemXiLianRank1.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
        this.bpList.numItems = 0;
    };
    ItemXiLianRank1.URL = "ui://d5y9ngt6cl031p";
    return ItemXiLianRank1;
}(fairygui.GComponent));
__reflect(ItemXiLianRank1.prototype, "ItemXiLianRank1");
