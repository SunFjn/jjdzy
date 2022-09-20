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
var TuJianItem = (function (_super) {
    __extends(TuJianItem, _super);
    function TuJianItem() {
        var _this = _super.call(this) || this;
        _this.isShowMask = true;
        _this.isShowNotice = true;
        _this.STARMAX = 5;
        _this.check = false;
        return _this;
    }
    TuJianItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("TuJian", "TuJianItem"));
    };
    TuJianItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(TuJianItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var s = this;
            s._vo = vo;
            if (vo) {
                IconUtil.setImg(s.iconImg, Enum_Path.TUJIAN_URL + vo.pic + ".jpg");
                IconUtil.setImg(s.colorImg, Enum_Path.TUJIAN_URL + "bg" + vo.quality + ".png");
                s.nameLb.text = vo.name;
                if (vo.isJiHuo) {
                    s.checkNotice = false;
                    s.maskImg.visible = false;
                    s.levelLb.visible = true;
                    var starstr = "";
                    var starcfg = Config.picstar_005[s.vo.starLv];
                    var starNum = Math.floor(s.vo.starLv / s.STARMAX);
                    var starNum1 = s.vo.starLv % s.STARMAX;
                    for (var i = 0; i < s.STARMAX; i++) {
                        if (i < starNum1) {
                            starstr += "" + (starNum + 1);
                        }
                        else {
                            starstr += "" + starNum;
                        }
                    }
                    s.starLb.text = starstr;
                    s.levelLb.text = vo.level + "";
                    if (vo.next_star > 0) {
                        var costArr0 = s.vo.consume_star;
                        var costVo0 = VoItem.create(costArr0[0][1]);
                        var count0 = Model_Bag.getItemCount(costArr0[0][1]);
                        if (count0 >= costArr0[0][2] && s.isShowNotice) {
                            s.checkNotice = true;
                        }
                    }
                    if (vo.level < vo.levelMax) {
                        var costArr1 = s.vo.consume_level;
                        var costVo1 = VoItem.create(costArr1[0][1]);
                        var count1 = Model_Bag.getItemCount(costArr1[0][1]);
                        if (count1 >= costArr1[0][2] && s.isShowNotice) {
                            s.checkNotice = true;
                        }
                    }
                }
                else {
                    s.maskImg.visible = s.isShowMask;
                    s.levelLb.visible = false;
                    s.starLb.text = "00000";
                    var costArr0 = s.vo.activation_jihuo;
                    var costVo0 = VoItem.create(costArr0[0][1]);
                    costVo0.count = costArr0[0][2];
                    var count = Model_Bag.getItemCount(costArr0[0][1]);
                    if (count >= costVo0.count && s.isShowNotice) {
                        s.checkNotice = true;
                    }
                    else {
                        s.checkNotice = false;
                    }
                    var starstr = "";
                    var starNum = Math.floor(s.vo.starLv / s.STARMAX);
                    var starNum1 = s.vo.starLv % s.STARMAX;
                    for (var i = 0; i < s.STARMAX; i++) {
                        if (i < starNum1) {
                            starstr += "" + (starNum + 1);
                        }
                        else {
                            starstr += "" + starNum;
                        }
                    }
                    s.starLb.text = starstr;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TuJianItem.prototype, "checkNotice", {
        get: function () {
            return this.check;
        },
        set: function (value) {
            this.noticeImg.visible = value;
            this.check = value;
        },
        enumerable: true,
        configurable: true
    });
    TuJianItem.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.iconImg, null);
        IconUtil.setImg(self.colorImg, null);
    };
    TuJianItem.URL = "ui://m0rbmsgscia23b";
    return TuJianItem;
}(fairygui.GComponent));
__reflect(TuJianItem.prototype, "TuJianItem");
