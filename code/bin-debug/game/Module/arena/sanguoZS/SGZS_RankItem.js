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
var SGZS_RankItem = (function (_super) {
    __extends(SGZS_RankItem, _super);
    function SGZS_RankItem() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        return _this;
    }
    SGZS_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SGZS_RankItem"));
    };
    SGZS_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        for (var i = 0; i < 4; i++) {
            var grid = (this.getChild("grid" + i));
            grid.isShowEff = true;
            this.gridArr.push(grid);
        }
    };
    Object.defineProperty(SGZS_RankItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var arr = JSON.parse(vo.rank);
            if (arr[0][0] == arr[0][1]) {
                this.lbRank.text = "第" + arr[0][0] + "名";
            }
            else if (vo.id == 1) {
                this.lbRank.text = arr[0][0] + "名以后";
            }
            else {
                this.lbRank.text = "第" + arr[0][0] + "-" + arr[0][1] + "名";
            }
            var rewardArr = JSON.parse(vo.reward1);
            for (var i = 0; i < this.gridArr.length; i++) {
                if (i < rewardArr.length) {
                    var vo_1 = void 0;
                    if (rewardArr[i][0] == Enum_Attr.ITEM) {
                        vo_1 = VoItem.create(rewardArr[i][1]);
                    }
                    else if (rewardArr[i][0] == Enum_Attr.EQUIP) {
                        vo_1 = VoEquip.create(rewardArr[i][1]);
                    }
                    else {
                        vo_1 = Vo_Currency.create(rewardArr[i][0]);
                    }
                    vo_1.count = rewardArr[i][2];
                    this.gridArr[i].vo = vo_1;
                    this.gridArr[i].tipEnabled = true;
                    this.gridArr[i].visible = true;
                }
                else {
                    this.gridArr[i].visible = false;
                    this.gridArr[i].tipEnabled = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SGZS_RankItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.gridArr);
    };
    SGZS_RankItem.URL = "ui://me1skowlp24e8";
    return SGZS_RankItem;
}(fairygui.GComponent));
__reflect(SGZS_RankItem.prototype, "SGZS_RankItem");
