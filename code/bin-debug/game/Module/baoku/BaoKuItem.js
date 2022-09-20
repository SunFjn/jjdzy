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
var BaoKuItem = (function (_super) {
    __extends(BaoKuItem, _super);
    function BaoKuItem() {
        var _this = _super.call(this) || this;
        _this.iconArr = ["ui://6tpaxc0ksu6n3", "ui://6tpaxc0ksu6n7", "ui://6tpaxc0ksu6n9", "ui://6tpaxc0ksu6n5"];
        return _this;
    }
    BaoKuItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("baoku", "BaoKuItem"));
    };
    BaoKuItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.grid.isShowEff = true;
        this.buyBt = (this.getChild("buyBt"));
        this.typeImg0 = (this.getChild("typeImg0"));
        this.buyImg = (this.getChild("buyImg"));
        this.xianshiImg = (this.getChild("xianshiImg"));
        this.nameLb = (this.getChild("nameLb"));
        this.dataLb = (this.getChild("dataLb"));
        this.lb = (this.getChild("lb"));
        this.dataLb.leading = 25;
        this.promptLb = (this.getChild("promptLb"));
        this.lbGroup = (this.getChild("lbGroup"));
        this.buyBt.addClickListener(this.onExchange, this);
    };
    BaoKuItem.prototype.onExchange = function () {
        var costArr = ConfigHelp.makeItemListArr(this.vo.consume);
        var count = Model_Bag.getItemCount(costArr[0].id);
        if (count >= costArr[0].count) {
            GGlobal.modelBaoKu.CG_BAOKU_DUIHUAN(this.vo.bk, this.vo.id);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(costArr[0].id));
        }
    };
    BaoKuItem.prototype.show = function (vo) {
        this.vo = vo;
        if (vo) {
            var reward = ConfigHelp.makeItemListArr(vo.reward);
            var costArr = ConfigHelp.makeItemListArr(vo.consume);
            this.grid.vo = reward[0];
            this.grid.tipEnabled = true;
            this.nameLb.text = reward[0].name;
            this.nameLb.color = reward[0].qColor;
            this.buyBt.visible = false;
            this.promptLb.visible = false;
            this.buyImg.visible = false;
            var color = 0;
            if (Model_player.voMine.viplv >= vo.vip) {
                if (vo.time - vo.count <= 0) {
                    this.buyImg.visible = true;
                    color = 6;
                }
                else {
                    this.buyBt.visible = true;
                    color = 2;
                }
            }
            else {
                this.promptLb.visible = true;
                this.promptLb.text = vo.vip + "可兑换";
                color = 2;
            }
            this.typeImg0.url = this.iconArr[vo.bk - 1];
            this.dataLb.text = "限购：" + HtmlUtil.fontNoSize((vo.time - vo.count) + "/" + vo.time, Color.getColorStr(color)) + "\n单价：      " + costArr[0].count;
            var date = new Date(Model_GlobalMsg.getServerTime());
            var weekDay = date.getDay();
            if (weekDay == 0)
                weekDay = 7;
            var isShow = weekDay == vo.xianshi;
            if (isShow) {
                this.lb.text = "限时";
            }
            else {
                isShow = weekDay == vo.dazhe;
                if (isShow) {
                    this.lb.text = "9折";
                }
                else {
                    isShow = vo.xinpin == 1;
                    if (isShow)
                        this.lb.text = "新品";
                }
            }
            this.lbGroup.visible = isShow;
        }
    };
    BaoKuItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    BaoKuItem.URL = "ui://6tpaxc0krkjp0";
    return BaoKuItem;
}(fairygui.GComponent));
__reflect(BaoKuItem.prototype, "BaoKuItem");
