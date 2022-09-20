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
var JiFenRewardItem = (function (_super) {
    __extends(JiFenRewardItem, _super);
    function JiFenRewardItem() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        return _this;
    }
    JiFenRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "JiFenRewardItem"));
    };
    JiFenRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.jifenLb = (this.getChild("jifenLb"));
        this.drawBt = (this.getChild("drawBt"));
        this.drawImg = (this.getChild("drawImg"));
        for (var i = 0; i < 3; i++) {
            var grid = (this.getChild("grid" + i));
            grid.isShowEff = true;
            this.gridArr.push(grid);
        }
        this.drawBt.addClickListener(this.drawHandler, this);
    };
    JiFenRewardItem.prototype.drawHandler = function () {
        if (this.drawBt.checkNotice) {
            GGlobal.modelnzbz.CG_NZBZ_DRAW_JIFENREWARD(this.vo.point);
        }
        else {
            ViewCommonWarn.text("尚未达到领取条件");
        }
    };
    Object.defineProperty(JiFenRewardItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            if (vo) {
                if (Model_NZBZ.myJiFen >= vo.point) {
                    this.jifenLb.text = "积分达到" + HtmlUtil.fontNoSize("(" + Model_NZBZ.myJiFen + "/" + vo.point + ")", Color.getColorStr(2));
                }
                else {
                    this.jifenLb.text = "积分达到" + HtmlUtil.fontNoSize("(" + Model_NZBZ.myJiFen + "/" + vo.point + ")", Color.getColorStr(6));
                }
                var rewardArr = JSON.parse(vo.reward);
                for (var i = 0; i < 3; i++) {
                    if (i < rewardArr.length) {
                        var vo_1 = void 0;
                        if (rewardArr[i][0] == Enum_Attr.ITEM) {
                            vo_1 = VoItem.create(rewardArr[i][1]);
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
                    }
                }
                if (Model_NZBZ.drawArr.indexOf(vo.point) != -1) {
                    this.drawImg.visible = true;
                    this.drawBt.visible = false;
                    this.drawBt.checkNotice = false;
                }
                else {
                    this.drawImg.visible = false;
                    this.drawBt.visible = true;
                    this.drawBt.enabled = this.drawBt.checkNotice = Model_NZBZ.myJiFen >= vo.point;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    JiFenRewardItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.gridArr);
    };
    JiFenRewardItem.URL = "ui://xzyn0qe3i6imj";
    return JiFenRewardItem;
}(fairygui.GComponent));
__reflect(JiFenRewardItem.prototype, "JiFenRewardItem");
