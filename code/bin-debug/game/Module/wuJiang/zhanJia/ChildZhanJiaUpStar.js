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
var ChildZhanJiaUpStar = (function (_super) {
    __extends(ChildZhanJiaUpStar, _super);
    function ChildZhanJiaUpStar() {
        return _super.call(this) || this;
    }
    ChildZhanJiaUpStar.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    ChildZhanJiaUpStar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.promptLb0.text = "战甲效果";
        s.list.callbackThisObj = this;
        s.list.itemRenderer = s.renderHander;
        s.list.setVirtual();
        s.showBt.addClickListener(s.showHandler, s);
        s.jueXingBt.addClickListener(s.OnJueXing, s);
    };
    ChildZhanJiaUpStar.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.ZHAN_JIA);
    };
    ChildZhanJiaUpStar.prototype.showHandler = function () {
        if (this._selectVo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(6, this._selectVo.id);
        }
    };
    ChildZhanJiaUpStar.prototype.addEvent = function () {
        var s = this;
        s.list.addEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        s.upStarBt.addClickListener(s.onClickUp, s);
        s.drugBt.addClickListener(s.onClickGrid0, s);
        GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_STAR, s.upStar, s);
        GGlobal.reddot.listen(UIConst.JUEXING, s.updateJuexing, s);
    };
    ChildZhanJiaUpStar.prototype.removeEvent = function () {
        var s = this;
        if (s.curItem)
            s.curItem.selectImg.visible = false;
        s.curItem = null;
        s.list.numItems = 0;
        s.list.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        s.upStarBt.removeClickListener(s.onClickUp, s);
        s.drugBt.removeClickListener(s.onClickGrid0, s);
        GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_STAR, s.upStar, s);
        GGlobal.reddot.remove(UIConst.JUEXING, s.updateJuexing, s);
        Model_GlobalMsg.selectID = 0;
    };
    ChildZhanJiaUpStar.prototype.sortWuJiang = function () {
        var arr2 = []; //已激活
        var arr3 = []; //可激活
        var arr4 = []; //未激活
        for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
            var v = Model_ZhanJia.zhanJiaArr[i];
            var star = Model_ZhanJia.zhanjiaStar[v.id];
            if (star) {
                arr2.push(v);
                continue;
            }
            var can = Model_ZhanJia.checkStarVo(v);
            if (can) {
                arr3.push(v);
                continue;
            }
            arr4.push(v);
        }
        arr3.sort(Model_ZhanJia.sortZhanJia);
        arr2.sort(Model_ZhanJia.sortZhanJia);
        arr4.sort(Model_ZhanJia.sortZhanJia1);
        this._showArr = arr3.concat(arr2).concat(arr4);
    };
    ChildZhanJiaUpStar.prototype.upStar = function () {
        var s = this;
        s.sortWuJiang();
        var index = 0;
        for (var i = 0; i < s._showArr.length; i++) {
            if (s._showArr[i].id == s._selectVo.id) {
                index = i;
                break;
            }
        }
        s.list.selectedIndex = index;
        var temp = index;
        if (temp >= 0 && temp <= 2) {
            temp = 0;
        }
        else if (temp > 2) {
            temp -= 2;
        }
        s.list.scrollToView(temp, true);
        s.update();
    };
    ChildZhanJiaUpStar.prototype.init = function () {
        var s = this;
        s.sortWuJiang();
        var index = 0;
        if (Config.clothes_212[Model_GlobalMsg.selectID]) {
            for (var i = 0; i < s._showArr.length; i++) {
                var v = s._showArr[i];
                if (v.id == Model_GlobalMsg.selectID) {
                    index = i;
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < s._showArr.length; i++) {
                var v = s._showArr[i];
                var star = Model_ZhanJia.zhanjiaStar[v.id];
                var can = Model_ZhanJia.checkStarVo(v);
                if (!star && can) {
                    index = i;
                    break;
                }
            }
        }
        s.list.numItems = s._showArr.length;
        if (s.curItem)
            s.curItem.selectImg.visible = false;
        var grid = s.list._children[index];
        if (grid) {
            grid.selectImg.visible = true;
            s.curItem = grid;
        }
        s.selectdUpdate(s._showArr[index]);
        var temp = index;
        if (temp >= 0 && temp <= 2) {
            temp = 0;
        }
        else if (temp > 2) {
            temp -= 2;
        }
        s.list.scrollToView(temp, true);
    };
    ChildZhanJiaUpStar.prototype.update = function () {
        var s = this;
        s.list.numItems = s._showArr.length;
        if (s._selectVo) {
            s.selectdUpdate(s._selectVo);
        }
        else {
            s.list._children[0].selectImg.visible = true;
            s.curItem = s.list._children[0];
            s.selectdUpdate(s._showArr[0]);
        }
        var maxCount0 = 0;
        var maxCount1 = 0;
        for (var keys in Model_ZhanJia.zhanjiaStar) {
            var star = Model_ZhanJia.zhanjiaStar[keys];
            var zhanjia = Config.clothes_212[keys];
            maxCount0 += zhanjia.max1 * star;
            maxCount1 += zhanjia.max2 * star;
        }
        if (s._voItem0 == null) {
            s._voItem0 = VoItem.create(Model_ZhanJia.DAN_SHUXING);
        }
        s._voItem0.count = Model_Bag.getItemCount(Model_ZhanJia.DAN_SHUXING);
        s.drugCount.text = Model_ZhanJia.danShuxing + "/" + maxCount0;
        s.drugBt.checkNotice = s._voItem0.count > 0 && Model_ZhanJia.danShuxing < maxCount0;
    };
    ChildZhanJiaUpStar.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._showArr[index];
        if (this._selectVo && this._selectVo.id == gird.vo.id) {
            gird.selectImg.visible = true;
            this.curItem = gird;
        }
        else {
            gird.selectImg.visible = false;
        }
    };
    ChildZhanJiaUpStar.prototype.itemClick = function (e) {
        var self = this;
        var selectItem = e.itemObject;
        if (self._selectVo && self._selectVo.id == selectItem.vo.id)
            return;
        if (self.curItem)
            self.curItem.selectImg.visible = false;
        self.curItem = null;
        self._selectVo = null;
        selectItem.selectImg.visible = true;
        self.curItem = selectItem;
        this.selectdUpdate(selectItem.vo);
    };
    ChildZhanJiaUpStar.prototype.selectdUpdate = function (vo) {
        var self = this;
        var cf = Config.clothesstar_212;
        self._selectVo = vo;
        var star = Model_ZhanJia.zhanjiaStar[vo.id];
        if (!star) {
            star = 0;
        }
        self.powerLb.text = Model_ZhanJia.getPowerStarVo(vo) + "";
        var attrArr;
        var nextArr;
        self.attGroup.visible = false;
        self.showAtt.visible = true;
        self.maxGroup.visible = false;
        self.upStarGroup.visible = true;
        self.skillDes.visible = false;
        self.skillDes.text = "";
        if (star == 0) {
            attrArr = JSON.parse(cf[vo.pinzhi * 1000 + 1].attr);
            self.showAtt.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            self.upStarBt.text = "激活";
            self.starPowerLb.text = cf[vo.pinzhi * 1000 + 1].power + "";
        }
        else if (star >= vo.star) {
            attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr);
            self.showAtt.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            self.maxGroup.visible = true;
            self.upStarGroup.visible = false;
            self.upStarBt.checkNotice = false;
        }
        else {
            attrArr = JSON.parse(cf[vo.pinzhi * 1000 + star].attr);
            nextArr = JSON.parse(cf[Config.clothesstar_212[vo.pinzhi * 1000 + star].next].attr);
            self.curAtt.text = ConfigHelp.attrString(attrArr, "+");
            self.nextAtt.text = ConfigHelp.attrString(nextArr, "+", null, "#15f234");
            self.upStarBt.text = "升星";
            self.attGroup.visible = true;
            self.showAtt.visible = false;
            self.starPowerLb.text = (cf[cf[vo.pinzhi * 1000 + star].next].power - cf[vo.pinzhi * 1000 + star].power) + "";
        }
        if (star >= vo.star) {
            self.lbTip.text = "已提升战甲属性丹吞噬上限：" + HtmlUtil.fontNoSize((vo.max1 * star) + "", Color.getColorStr(5));
        }
        else {
            self.lbTip.text = "可提升战甲属性丹吞噬上限：" + HtmlUtil.fontNoSize((vo.max1 * (star + 1)) + "", Color.getColorStr(5));
        }
        self.starLb.text = ConfigHelp.getStarFontStr(star);
        //升星道具
        if (star >= vo.star) {
        }
        else {
            var consume = ConfigHelp.SplitStr(vo.item);
            self._needItem = VoItem.create(Number(consume[0][1]));
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            var count = Number(consume[0][2]);
            var colorStr;
            if (hasCount >= count) {
                colorStr = '#00FF00';
                self._hasNeed = true;
            }
            else {
                colorStr = '#FF0000';
                self._hasNeed = false;
            }
            self.costLb.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
                "[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
        }
        IconUtil.setImg(self.bwIcon, Enum_Path.ZHANJIA_URL + vo.pic + ".png");
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
        if (vo.tptx > 0) {
            if (!self.bwEff) {
                self.bwEff = EffectMgr.addEff("uieff/" + vo.tptx, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
            }
        }
        self.nameLb.text = vo.name;
        var quality = Model_ZhanJia.getZhanJiaQuality(vo);
        self.nameLb.color = Color.getColorInt(quality);
        self.upStarBt.checkNotice = Model_ZhanJia.checkStarVo(vo);
        self.showBt.visible = star > 0;
        self.updateJuexing();
    };
    ChildZhanJiaUpStar.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.ZHAN_JIA);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 6);
    };
    ChildZhanJiaUpStar.prototype.onClickUp = function () {
        var s = this;
        if (!s._hasNeed) {
            View_CaiLiao_GetPanel.show(s._needItem);
            return;
        }
        if (s._selectVo) {
            GGlobal.modelZhanJia.CGZhanJiaStar(s._selectVo.id);
        }
    };
    ChildZhanJiaUpStar.prototype.onClickGrid0 = function () {
        GGlobal.layerMgr.open(UIConst.TIP_ZHANJIA_DAN, this._voItem0);
    };
    ChildZhanJiaUpStar.prototype.clean = function () {
        var self = this;
        if (self.curItem)
            self.curItem.selectImg.visible = false;
        self.curItem = null;
        self._selectVo = null;
        self.list.numItems = 0;
        IconUtil.setImg(self.bwIcon, null);
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    };
    ChildZhanJiaUpStar.URL = "ui://3tzqotadqqvu23";
    return ChildZhanJiaUpStar;
}(fairygui.GComponent));
__reflect(ChildZhanJiaUpStar.prototype, "ChildZhanJiaUpStar");
