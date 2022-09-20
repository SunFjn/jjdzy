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
/**
 * 矿藏item
 */
var MineralItem = (function (_super) {
    __extends(MineralItem, _super);
    function MineralItem(type) {
        var _this = _super.call(this) || this;
        _this._select = false;
        return _this;
    }
    MineralItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "MineralItem"));
    };
    MineralItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.refreshBtn.addClickListener(this.onRefresh, this);
    };
    Object.defineProperty(MineralItem.prototype, "select", {
        set: function (bol) {
            this._select = bol;
            this.selectImg.visible = bol;
        },
        enumerable: true,
        configurable: true
    });
    MineralItem.prototype.removeListen = function () {
        this.refreshBtn.removeClickListener(this.onRefresh, this);
    };
    /**
     * 更新信息
     */
    MineralItem.prototype.updateInfo = function (vo) {
        var self = this;
        self.vo = vo;
        if (!vo) {
            self.c1.selectedIndex = 2;
        }
        else {
            var cfg = vo.cfg;
            if (vo.mineID == Model_player.voMine.id) {
                self.c1.selectedIndex = 0;
            }
            else {
                self.c1.selectedIndex = 1;
            }
            self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + vo.cfg.pz);
            if (vo.itemArr.length > 0) {
                var itemVo0 = ConfigHelp.makeItem(vo.itemArr[0]);
                var itemVo1 = ConfigHelp.makeItem(vo.itemArr[1]);
                IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
                IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
                if (vo.itemArr[0][3] > 0) {
                    self.moneyLb0.text = itemVo0.count + HtmlUtil.fontNoSize("(-" + vo.itemArr[0][3] + ")", Color.getColorStr(6));
                }
                else {
                    self.moneyLb0.text = itemVo0.count + "";
                }
                if (vo.itemArr[1][3] > 0) {
                    self.moneyLb1.text = itemVo1.count + HtmlUtil.fontNoSize("(-" + vo.itemArr[1][3] + ")", Color.getColorStr(6));
                }
                else {
                    self.moneyLb1.text = itemVo1.count + "";
                }
            }
            else {
                var arr = vo.mineID == Model_player.voMine.id ? JSON.parse(cfg.max1) : JSON.parse(cfg.max2);
                var itemVo0 = ConfigHelp.makeItem(arr[0]);
                var itemVo1 = ConfigHelp.makeItem(arr[1]);
                IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
                IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
                self.moneyLb0.text = itemVo0.count + "";
                self.moneyLb1.text = itemVo1.count + "";
            }
            self.numLb0.text = "被顺次数:" + vo.mySteal + "/" + Config.xtcs_004[6602].num;
            self.numLb1.text = "被抢次数:" + vo.myLoot + "/" + Config.xtcs_004[6601].num;
            IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + cfg.pz + ".png");
            self.txtGroup.visible = true;
            self.refreshBtn.visible = false;
            if (vo.times > 0) {
                self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(vo.times);
                self.sourceLb.text = "已采资源：";
                if (!Timer.instance.has(self.timeHandler, self)) {
                    Timer.instance.listen(self.timeHandler, self, 1000);
                }
            }
            else {
                Timer.instance.remove(self.timeHandler, self);
                if (vo.times == -1) {
                    self.txtGroup.visible = false;
                    self.refreshBtn.visible = true;
                    self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(vo.cfg.time);
                    self.sourceLb.text = "满采资源：";
                }
                else {
                    self.sourceLb.text = "已采资源：";
                    self.timeLb.text = HtmlUtil.fontNoSize("采矿完毕", Color.getColorStr(6));
                }
            }
        }
    };
    MineralItem.prototype.timeHandler = function () {
        var self = this;
        self.vo.times--;
        self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(self.vo.times);
        if (self.vo.times <= 0) {
            self.timeLb.text = HtmlUtil.fontNoSize("采矿完毕", Color.getColorStr(6));
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    /**
     * 刷新按钮事件
     */
    MineralItem.prototype.onRefresh = function () {
        if (Model_CrossMineral.state == 1) {
            return ViewCommonWarn.text("不在活动时间内");
        }
        GGlobal.layerMgr.open(UIConst.CROSS_MINERAL_REFRESH);
    };
    MineralItem.prototype.clean = function () {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.mineIcon, null);
        IconUtil.setImg(self.typeIcon0, null);
        IconUtil.setImg(self.typeIcon1, null);
    };
    MineralItem.URL = "ui://yqpfulefnyv753";
    return MineralItem;
}(fairygui.GComponent));
__reflect(MineralItem.prototype, "MineralItem");
