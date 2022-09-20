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
var Child_Country_Rank = (function (_super) {
    __extends(Child_Country_Rank, _super);
    function Child_Country_Rank() {
        var _this = _super.call(this) || this;
        _this.countryImgArr = [];
        _this.jifenLbArr = [];
        _this.groupArr = [];
        return _this;
    }
    Child_Country_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "Child_Country_Rank"));
    };
    Child_Country_Rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        for (var i = 0; i < 3; i++) {
            var countryImg = (this.getChild("countryImg" + i));
            this.countryImgArr.push(countryImg);
            var boxImg = this.getChild("boxImg" + i).asLoader;
            boxImg.data = i + 1;
            boxImg.addClickListener(this.OnBox, this);
            var jifenLb = (this.getChild("jifenLb" + i));
            this.jifenLbArr.push(jifenLb);
            var countryGroup = (this.getChild("group" + i));
            this.groupArr.push(countryGroup);
        }
        this.nameLb = (this.getChild("nameLb"));
        this.countryLb = (this.getChild("countryLb"));
    };
    Child_Country_Rank.prototype.OnBox = function (event) {
        var cfg = Config.nzbz_226[10 + event.target.data];
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
        View_BoxReward_Show.show(arr, "排名" + event.target.data + "可领取");
    };
    //B:国家I:积分
    Child_Country_Rank.prototype.updateShow = function () {
        var self = this;
        for (var i = 0; i < 3; i++) {
            if (i < Model_NZBZ.countryRankArr.length) {
                self.groupArr[i].visible = true;
                IconUtil.setImg(self.countryImgArr[i], Enum_Path.IMAGE_MODULES_URL + "country/countrya" + Model_NZBZ.countryRankArr[i][0] + ".png");
                self.jifenLbArr[i].text = Model_NZBZ.countryRankArr[i][1] + "积分";
            }
            else {
                self.groupArr[i].visible = false;
            }
        }
        self.countryLb.text = "我的国家：" + Model_Country.getCountryName(Model_player.voMine.country);
        if (Model_NZBZ.kingName) {
            self.nameLb.text = Model_NZBZ.kingName;
        }
        else {
            self.nameLb.text = "虚位以待";
        }
    };
    Child_Country_Rank.prototype.show = function () {
        this.updateShow();
    };
    Child_Country_Rank.prototype.hide = function () {
        var self = this;
        for (var i = 0; i < 3; i++) {
            IconUtil.setImg(self.countryImgArr[i], null);
        }
    };
    Child_Country_Rank.URL = "ui://xzyn0qe3l3h3f";
    return Child_Country_Rank;
}(fairygui.GComponent));
__reflect(Child_Country_Rank.prototype, "Child_Country_Rank");
