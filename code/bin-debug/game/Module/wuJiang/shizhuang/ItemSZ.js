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
var ItemSZ = (function (_super) {
    __extends(ItemSZ, _super);
    function ItemSZ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selected = false;
        return _this;
    }
    ItemSZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Object.defineProperty(ItemSZ.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (_dt) {
            var self = this;
            self._data = _dt;
            var info = Model_WuJiang.shiZhuanDic[Model_WuJiang.curSelWJId];
            if (_dt === null) {
                self.ctrl.setSelectedIndex(1);
            }
            else if (Array.isArray(_dt)) {
                self.ctrl.setSelectedIndex(2);
                var pifu = _dt[0];
                var pinzhi = _dt[1];
                IconUtil.setImg(self.iconDefault, "resource/image/pifu/" + pifu + ".png");
                IconUtil.setImg(self.backIcon, Enum_Path.ICON70_URL + "BmG_" + pinzhi + ".png");
                var wjId = Model_WuJiang.curSelWJId;
                self.iconDressed.visible = info.onSkinId == 0 && !!Model_WuJiang.wuJiangStar[wjId];
            }
            else {
                var vo = _dt;
                self.ctrl.setSelectedIndex(0);
                var item = ConfigHelp.makeItemListArr(JSON.parse(vo.jihuo))[0];
                var arr = info.ownSkinIds;
                self.txtName.text = item.name;
                self.txtName.color = item.qColor;
                var starLv = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].skinId == vo.ID) {
                        starLv = arr[i].starLv;
                        break;
                    }
                }
                if (vo.tujing && !info.ownSkinIds.length) {
                    self["n19"].visible = true;
                    self["n10"].text = vo.tujing;
                }
                else {
                    self["n19"].visible = false;
                }
                self.iconDressed.visible = info.onSkinId > 0;
                self.txtNum.text = "" + starLv;
                if (starLv > 0) {
                    self["n31"].visible = true;
                    var num = starLv % 10 >> 0 == 0 ? starLv / 10 : (starLv / 10 >> 0) + 1;
                    self.imgStar.url = CommonManager.getUrl("common", "big_star_" + num);
                }
                else {
                    self.txtNum.text = 0 + "";
                    self.imgStar.url = CommonManager.getUrl("common", "big_star_0");
                    self["n31"].visible = false;
                }
                self.grid.vo = item;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemSZ.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.selectImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    ItemSZ.prototype.setNot = function (val) {
        this.noticeImg.visible = val;
    };
    ItemSZ.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, null);
    };
    ItemSZ.URL = "ui://zyx92gzwke3i39";
    return ItemSZ;
}(fairygui.GComponent));
__reflect(ItemSZ.prototype, "ItemSZ");
