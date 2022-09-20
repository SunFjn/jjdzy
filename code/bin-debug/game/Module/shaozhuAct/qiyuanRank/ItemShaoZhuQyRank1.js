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
var ItemShaoZhuQyRank1 = (function (_super) {
    __extends(ItemShaoZhuQyRank1, _super);
    function ItemShaoZhuQyRank1() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this._bigAwards = [];
        _this._index = 0;
        return _this;
    }
    ItemShaoZhuQyRank1.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ItemShaoZhuQyRank1"));
    };
    ItemShaoZhuQyRank1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.bpList.itemRenderer = self.itemRender1;
        self.bpList.callbackThisObj = self;
    };
    ItemShaoZhuQyRank1.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemShaoZhuQyRank1.prototype.itemRender1 = function (idx, obj) {
        var bol = false;
        if (this._rank && this._rank.jdCount >= Config.xtcs_004[6204].num) {
            bol = true;
        }
        var item = obj;
        item.setVo(this._bigAwards[idx], bol);
    };
    ItemShaoZhuQyRank1.prototype.setVO = function (id) {
        var self = this;
        self._index = id;
        var cfg = Config.szqypm_272[id];
        self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = this._awards.length;
        self._bigAwards = JSON.parse(cfg.big);
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
    ItemShaoZhuQyRank1.prototype.setData = function () {
        var self = this;
        self._rank = ModelShaoZhuAct.rankData[self._index - 1];
        if (!self._rank) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
            self.nameTxt.text = self._rank.name;
            self.jdTxt.text = "祈愿：" + self._rank.jdCount + "次";
            if (ModelShaoZhuAct.myRank == self._index) {
                self.nameTxt.color = Color.GREENINT;
                self.nameTxt.bold = true;
            }
            else {
                self.nameTxt.color = Color.WHITEINT;
            }
        }
        var headVO;
        if (self._index == 2) {
            headVO = ModelShaoZhuAct.headData[0];
        }
        else {
            headVO = ModelShaoZhuAct.headData[1];
        }
        if (!headVO) {
            self.viewHead.setdata(null);
        }
        else {
            self.viewHead.setdata(headVO.headId, -1, "", headVO.vip, false, null, headVO.country);
        }
        self.bpList.numItems = self._bigAwards.length;
    };
    ItemShaoZhuQyRank1.URL = "ui://w5ll6n5jfoqs1y";
    return ItemShaoZhuQyRank1;
}(fairygui.GComponent));
__reflect(ItemShaoZhuQyRank1.prototype, "ItemShaoZhuQyRank1");
