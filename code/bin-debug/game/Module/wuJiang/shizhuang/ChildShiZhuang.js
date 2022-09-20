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
var ChildShiZhuang = (function (_super) {
    __extends(ChildShiZhuang, _super);
    function ChildShiZhuang() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.shiZhuangDic = {};
        _this.hasActived = false;
        _this.hasDressed = false;
        return _this;
    }
    ChildShiZhuang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHander;
        self.list.setVirtual();
        self._index = self.displayListContainer.getChildIndex(self.img.displayObject);
        self.list2.callbackThisObj = self;
        self.list2.itemRenderer = self.renderHander2;
        self.list2.addEventListener(fairygui.ItemEvent.CLICK, self.onItemClick2, self);
        self.btnLeft.touchable = self.btnRight.touchable = true;
        self.iconDressSt.displayObject.touchEnabled = true;
        self.iconDressSt.addClickListener(self.onDress, self);
        CommonManager.listPageChange("ChildShiZhuang", self.list2, self.btnLeft, self.btnRight, 3);
    };
    ChildShiZhuang.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._showArr[index];
    };
    ChildShiZhuang.prototype.renderHander2 = function (index, renderer) {
        var data = this.curSZArr[index];
        renderer.data = data;
    };
    ChildShiZhuang.prototype.addEvent = function () {
        var self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.img.x, self.img.y);
            // this.awatar.setScaleXY(1.5, 1.5);
            var horseId = Model_player.voMine.horseId;
            if (horseId) {
                self.awatar.setScaleXY(1, 1);
            }
            else {
                self.awatar.setScaleXY(1.5, 1.5);
            }
        }
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemClick, self);
        self.btnUp.addClickListener(self.onClickUp, self);
        GGlobal.modelWuJiang.listen(Model_WuJiang.msg_data_shiZhuang, self.update, self);
    };
    ChildShiZhuang.prototype.removeEvent = function () {
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        GGlobal.modelWuJiang.remove(Model_WuJiang.msg_data_shiZhuang, this.update, this);
        this.btnUp.removeClickListener(this.onClickUp, this);
        this.list.numItems = 0;
        this.curSelSZ = null;
        this.curSelWJ = null;
        Timer.instance.remove(this.playSkill, this);
        this.secSkill = 0;
    };
    ChildShiZhuang.prototype.sortWuJiang = function () {
        var arr1 = []; //正在展示
        var arr2 = []; //已激活
        var arr3 = []; //可激活
        var arr4 = []; //未激活
        for (var i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
            var v = Model_WuJiang.wuJiangArr[i];
            if (v.type == Model_player.voMine.job) {
                arr1.push(v);
                continue;
            }
            var star = Model_WuJiang.wuJiangStar[v.type];
            if (star) {
                arr2.push(v);
                continue;
            }
            var can = Model_WuJiang.checkStarVo(v);
            if (can) {
                arr3.push(v);
                continue;
            }
            arr4.push(v);
        }
        arr2.sort(Model_WuJiang.sortWuJiang);
        arr3.sort(Model_WuJiang.sortWuJiang);
        arr4.sort(Model_WuJiang.sortWuJiang);
        this._showArr = arr1.concat(arr2).concat(arr3).concat(arr4);
    };
    ChildShiZhuang.prototype.show = function (job) {
        if (job === void 0) { job = 0; }
        var self = this;
        self.sortWuJiang();
        var index = 0;
        self.list.numItems = self._showArr.length;
        if (job > 0) {
            for (var i = 0; i < self._showArr.length; i++) {
                if (self._showArr[i].type == job) {
                    index = i;
                    break;
                }
            }
        }
        this.list.selectedIndex = index;
        this.list.scrollToView(index);
        this.setSel(this._showArr[index]);
    };
    ChildShiZhuang.prototype.hide = function () {
        this.curSelSZ = null;
        this.curSelWJ = null;
    };
    /**武将选择 */
    ChildShiZhuang.prototype.itemClick = function (evt) {
        var renderer = evt.itemObject;
        var data = renderer.vo;
        this.setSel(data);
    };
    /**时装选择 */
    ChildShiZhuang.prototype.onItemClick2 = function (evt) {
        var renderer = evt.itemObject;
        var data = renderer.data;
        if (data) {
            this.setSel2(data);
        }
        else {
            evt.preventDefault();
            ViewCommonWarn.text("敬请期待");
        }
    };
    ChildShiZhuang.prototype.setSel = function (vo) {
        this.curSelWJ = vo;
        Model_WuJiang.selectJob = vo.type;
        this.list2.numItems = 0;
        this.curSelSZ = null;
        GGlobal.modelWuJiang.CG3501(vo.type);
    };
    ChildShiZhuang.prototype.setSel2 = function (vo) {
        this.curSelSZ = vo;
        var index = this.curSZArr.indexOf(vo);
        if (index >= 0) {
            this.list2.selectedIndex = index;
            this.list2.scrollToView(index);
            for (var i = 0; i < this.list2.numItems; i++) {
                var renderer = this.list2._children[i];
                if (renderer.data === vo) {
                    if (this.curRender) {
                        this.curRender.selected = false;
                    }
                    (this.curRender = renderer).selected = true;
                    break;
                }
            }
        }
        this.showSZDetail();
    };
    ChildShiZhuang.prototype.update = function () {
        var self = this;
        var wjId = Model_WuJiang.curSelWJId; //武将id
        if (!self.shiZhuangDic[wjId]) {
            self.initShiZhuang(wjId);
        }
        self.curSZArr = self.shiZhuangDic[wjId];
        self.list2.numItems = self.curSZArr.length;
        var info = Model_WuJiang.shiZhuanDic[wjId]; //用model返回的id作准
        if (!self.curSelSZ) {
            if (info.onSkinId) {
                self.setSel2(self.curSZArr[1]);
            }
            else {
                self.setSel2(self.curSZArr[0]);
            }
        }
        else {
            self.setSel2(self.curSelSZ);
        }
        var wjCFG = Config.hero_211[wjId];
        self.labName.text = wjCFG.name;
        self.labName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(wjCFG));
        //0常用时装 null是敬请期待
        for (var i = 1; i < self.list2._children.length; i++) {
            var item = self.list2._children[i];
            if (item.data != null) {
                var starLv = 0;
                for (var j = 0; j < info.ownSkinIds.length; j++) {
                    if (info.ownSkinIds[j].skinId == item.data.ID) {
                        starLv = info.ownSkinIds[j].starLv;
                        break;
                    }
                }
                item.setNot(Model_WuJiang.SZCheck(wjCFG, item.data.ID) && (Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId)));
            }
        }
        for (var i = 0; i < this.list._children.length; i++) {
            var renderer = this.list._children[i];
            renderer.setNot();
        }
    };
    ChildShiZhuang.prototype.showMX = function (vo) {
        var szMX = this.curSelSZ.moxing;
        var self = this;
        var job = 0;
        if (szMX) {
            self.awatar.setBody(szMX);
            self.awatar.setWeapon(this.curSelSZ.ID);
            job = self.curSelSZ.ID / 1000 >> 0;
        }
        else {
            self.awatar.setBody(vo.type);
            self.awatar.setWeapon(vo.type);
            job = vo.type;
        }
        self.awatar.setGodWeapon(Model_ZSGodWeapon.getGodWeaponByJob(job));
        var horseId = Model_player.voMine.horseId;
        self.awatar.setHorseId(horseId);
        this.awatar.uiparent = this.displayListContainer;
        this.awatar.onAdd();
        // this.displayListContainer.setChildIndex(this.awatar.view, this._index + 1);
        this.addChild(this.labName);
        this.addChild(this.iconDressSt);
        if (horseId == 0) {
            var secSkill = JSON.parse(Config.hero_211[job].skills)[1][0];
            if (secSkill != this.secSkill) {
                this.secSkill = secSkill;
                Timer.instance.remove(this.playSkill, this);
                this.playSkill();
            }
        }
        else {
            Timer.instance.remove(this.playSkill, this);
        }
    };
    ChildShiZhuang.prototype.playSkill = function () {
        this.awatar.playSkillID(this.secSkill, false);
        Timer.instance.callLater(this.playSkill, 5000, this);
    };
    ChildShiZhuang.prototype.getShiZhuang = function (skinId) {
        var curSZArr = this.curSZArr;
        for (var i = 0; i < curSZArr.length; i++) {
            if (curSZArr[i].ID == skinId) {
                return curSZArr[i];
            }
        }
        return null;
    };
    ChildShiZhuang.prototype.initShiZhuang = function (wjId) {
        var shiZhuangDic = this.shiZhuangDic;
        var lib = Config.sz_739;
        var arr = shiZhuangDic[wjId] = [];
        var pifu = Config.hero_211[wjId].pifu;
        var pinzhi = Config.hero_211[wjId].pfpinzhi;
        for (var key in lib) {
            var ID = lib[key].ID;
            var tempWJID = Number(ID / 1000 >> 0);
            if (tempWJID == wjId) {
                arr.push(lib[key]);
            }
        }
        arr.unshift([pifu, pinzhi]);
        arr.push(null);
    };
    /**时装信息 */
    ChildShiZhuang.prototype.showSZDetail = function () {
        var self = this;
        var tempSZ = self.curSelSZ;
        var wjId = Model_WuJiang.curSelWJId;
        var info = Model_WuJiang.shiZhuanDic[wjId];
        var arr = info.ownSkinIds;
        var wjCFG = Config.hero_211[wjId];
        self.showMX(wjCFG);
        self.iconDressSt.visible = true;
        if (Array.isArray(tempSZ)) {
            self.btnUp.visible = false;
            self.labPower.text = "0";
            self.labStar.visible = false;
            self.labAttrCur.text = "";
            self.labAttrMax.text = "";
            self.labAttrNext.text = "";
            self.imgArrow.visible = false;
            self.iconMR.visible = true;
            self.labCost.text = "";
            self.boxMax.visible = false;
            if (info.onSkinId == 0) {
                self.iconDressSt.url = "ui://zyx92gzwur843c";
                self.iconDressSt.data = DressSt.DRESSED;
            }
            else {
                self.iconDressSt.url = "ui://zyx92gzwur843d";
                self.iconDressSt.data = DressSt.UNDRESSED;
            }
            self.iconMR.text = "默认时装不可升星";
        }
        else {
            self.labStar.visible = true;
            self.iconMR.visible = false;
            self.hasActived = false;
            var starLv = 0;
            var star_max = 0;
            for (var i = 0; i < arr.length; i++) {
                var tempObj = arr[i];
                if (tempObj.skinId == tempSZ.ID) {
                    self.hasActived = true;
                    starLv = tempObj.starLv;
                    break;
                }
            }
            if (tempSZ)
                star_max = tempSZ.shangxian;
            var hasDressed = self.hasDressed = info.onSkinId == tempSZ.ID;
            if (hasDressed) {
                self.iconDressSt.url = "ui://zyx92gzwur843c";
                self.iconDressSt.data = DressSt.DRESSED;
            }
            else {
                self.iconDressSt.url = "ui://zyx92gzwur843d";
                self.iconDressSt.data = DressSt.UNDRESSED;
            }
            var attrArr = ConfigHelp.SplitStr(tempSZ.shuxing);
            var starattrArr = ConfigHelp.SplitStr(tempSZ.shengxing);
            var starAllArr = [];
            if (starLv > 0) {
                for (var i = 0; i < starattrArr.length; i++) {
                    starAllArr[i] = [];
                    starAllArr[i][0] = Number(starattrArr[i][0]);
                    starAllArr[i][1] = Number(starattrArr[i][1]) * (starLv - 1);
                }
            }
            var allAttrArr = [attrArr];
            if (self.hasActived) {
                self.labPower.text = "" + starLv * tempSZ.sxzhanli;
                self.labStar.text = ConfigHelp.getStarFontStr(starLv);
                if (starLv >= star_max) {
                    allAttrArr.push(starAllArr);
                    self.labAttrCur.text = "";
                    self.labAttrNext.text = "";
                    self.labAttrMax.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+", null, "#15f234");
                    self.imgArrow.visible = false;
                    self.btnUp.touchable = self.btnUp.visible = false;
                    self.boxMax.visible = true;
                }
                else {
                    self.imgArrow.visible = true;
                    self.btnUp.text = "升星";
                    allAttrArr.push(starAllArr);
                    self.labAttrCur.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+");
                    allAttrArr.push(starattrArr);
                    self.labAttrNext.text = ConfigHelp.attrString(self.addAttrValue(allAttrArr), "+", null, "#15f234");
                    self.labAttrMax.text = "";
                    self.boxMax.visible = false;
                    self.btnUp.touchable = self.btnUp.visible = true;
                }
            }
            else {
                self.labPower.text = "0";
                self.labStar.text = ConfigHelp.getStarFontStr(0);
                self.labAttrCur.text = "";
                self.labAttrNext.text = "";
                self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
                self.imgArrow.visible = false;
                self.boxMax.visible = false;
                self.btnUp.text = "激活";
                self.iconDressSt.visible = false;
                self.btnUp.touchable = self.btnUp.visible = true;
            }
            if (starLv >= star_max) {
                self.labCost.text = "";
            }
            else {
                //升星道具
                var consume = ConfigHelp.SplitStr(tempSZ.jihuo);
                self._needItem = VoItem.create(Number(consume[0][1]));
                var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
                var count = Number(consume[0][2]);
                var colorStr;
                if (hasCount >= count) {
                    colorStr = '#00FF00';
                    self._hasNeed = true;
                    self.btnUp.checkNotice = Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId);
                }
                else {
                    colorStr = '#FF0000';
                    self._hasNeed = false;
                    self.btnUp.checkNotice = false;
                }
                self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
                    "[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
            }
        }
        if (!(Model_WuJiang.wuJiangStar[wjId] || ModelGodWuJiang.getWuJiangIsActivation(wjId))) {
            self.iconMR.visible = true;
            self.btnUp.visible = false;
            self.labAttrMax.text = "";
            self.labCost.text = "";
            self.iconMR.text = "请先激活武将";
            self.iconDressSt.visible = false;
        }
        if (GGlobal.modelWuJiang.isJH) {
            GGlobal.modelWuJiang.isJH &= 0;
            GGlobal.modelWuJiang.CG3505(this.curSelWJ.type, this.curSelSZ.ID);
        }
    };
    /**激活或者升星 */
    ChildShiZhuang.prototype.onClickUp = function () {
        if (!this._hasNeed) {
            View_CaiLiao_GetPanel.show(this._needItem);
            return;
        }
        GGlobal.modelWuJiang.CG3503(this.curSelSZ.ID, Number(!this.hasActived));
    };
    /**穿戴 */
    ChildShiZhuang.prototype.onDress = function () {
        if (this.iconDressSt.data == DressSt.UNDRESSED) {
            GGlobal.modelWuJiang.CG3505(this.curSelWJ.type, this.curSelSZ.ID);
        }
    };
    /**attr值叠加   格式 [[[101,100]],[[101,100]]...] */
    ChildShiZhuang.prototype.addAttrValue = function (arr) {
        var returnArr = [];
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            var attrArr = arr[i];
            for (var j = 0; j < attrArr.length; j++) {
                var attrType = Number(attrArr[j][0]);
                var attrValue = Number(attrArr[j][1]);
                var has = false;
                for (var k = 0; k < returnArr.length; k++) {
                    if (returnArr[k][0] == attrType) {
                        returnArr[k][1] += attrValue;
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    returnArr[index] = [];
                    returnArr[index].push(attrType, attrValue);
                    index++;
                }
            }
        }
        return returnArr;
    };
    ChildShiZhuang.URL = "ui://zyx92gzweqmk38";
    return ChildShiZhuang;
}(fairygui.GComponent));
__reflect(ChildShiZhuang.prototype, "ChildShiZhuang");
var DressSt;
(function (DressSt) {
    DressSt[DressSt["DRESSED"] = 0] = "DRESSED";
    DressSt[DressSt["UNDRESSED"] = 1] = "UNDRESSED";
})(DressSt || (DressSt = {}));
