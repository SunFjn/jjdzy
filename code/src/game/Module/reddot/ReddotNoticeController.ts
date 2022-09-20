/**红点控制器*/
class ReddotNoticeController extends MsgCenter {
	public constructor() {
		super();
	}
	//======================================

	//======================================

	/**红点数据保存map*/
	private _reddotMap: any = {};
	public checkCondition(type: number, index: number = 0): boolean {
		let sf = this;
		if (type == 0)
			return true;
		if (index == 0 && ReddotMgr.ins().checkIsRegistered(type + "")) {
			return ReddotMgr.ins().getValue(type + "") ? true : false;
		}
		let t_key = type + "|" + index;
		let t_value = false;
		if (ReddotMgr.ins().checkIsRegistered(t_key))
			t_value = ReddotMgr.ins().getValue(t_key) ? true : false;
		else
			t_value = sf._reddotMap[t_key];
		if (t_value) {
			if (Config.xitong_001[type]) {
				const canBeOpened: boolean = ModuleManager.isOpen(type);
				return t_value && canBeOpened;
			} else {
				return t_value;
			}
		} else return false;
	}

	//监听需要处理的检测逻辑
	public addEvent() {
		let s = this;

		let a = GGlobal.modelBingFa;
		a.listen(Model_BingFa.LVLUP, s.checkBingfa, s);//兵法属性丹
		a.listen(Model_BingFa.DRUG_UP, s.onBFDrug, s);//兵法属性丹
		a.listen(Model_BingFa.OPENUI, s.onBFSuitCheck, s);//兵法数据初始化
		a.listen(Model_BingFa.SUIT_ACTIVE, s.onBFSuitCheck, s);//升级套装
		let c = GGlobal.control;
		c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.onBagUpdate, s);//背包更新
		c.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.onBagEquipUpdate, s);//背包装备更新
		c.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.checkDuanZao, s);
		c.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.checkEquip, s);
		c.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, s.checkGodEquip, s);
		c.listen(Enum_MsgType.GOD_EQUIP_SUIT_JIE, s.checkGodEquip, s);
		c.listen(Enum_MsgType.GODEQUIP_XILIAN, s.checkGodEquip, s);
		c.listen(Enum_MsgType.SKILL_UPDATE, s.checkSkill, s);//技能数据更新
		c.listen(Enum_MsgType.GODSKILL_UPDATE, s.checkGodSkill, s);//神技数据更新
		c.listen(Enum_MsgType.TITLE_UPDATE, s.checkTitle, s);//称号
		c.listen(Enum_MsgType.LB_NOTICE, s.checkLvBu, s);//吕布
		c.listen(Enum_MsgType.BAOWU_DATA_UPDATE, s.checkBaoWu, s);//宝物
		c.listen(Enum_MsgType.SHENJIAN_DATA_UPDATE, s.checkShenJian, s);//神剑
		c.listen(Enum_MsgType.JIANGHUN_DATA_UPDATE, s.checkJiangHun, s);//将魂
		// c.listen(Enum_MsgType.SHOULING_DATA_UPDATE, s.checkShouLing, s);//兽灵
		// GGlobal.reddot.listenonce(ReddotEvent.CHECK_SHOULING, s.checkShouLing, s);
		// GGlobal.modelSHJX.listen(ModelSH.msg_notice, this.checkShouLing, this);
		c.listen(Enum_MsgType.MSG_TS_UPDATE, s.checkWearTS, s);//天书初始化
		c.listen(Enum_MsgType.MSG_TS_WAEAR, s.checkWearTS, s);//天书佩戴
		c.listen(Enum_MsgType.MSG_TS_STAR, s.checkWearTS, s);//天书激活
		c.listen(Enum_MsgType.MSG_TS_DRUG, s.checkTianShuDrug, s);
		c.listen(Enum_MsgType.MSG_GXINIT, s.checkGX, s);
		c.listen(Enum_MsgType.MSG_GXUPDATE, s.checkGX, s);
		c.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.checkTuJian, s);
		c.listen(Enum_MsgType.XINGTU_DATA_UPDATE, s.checkXingTu, s);
		// c.listen(Enum_MsgType.LUNHUI_DATA_UPDATE, s.checkLunHui, s);
		c.listen(Enum_MsgType.SHOP_UPDATE, s.checkShop, s);
		c.listen(Enum_MsgType.YJDQ_UPDATE, s.checkYJDQ, s);
		c.listen(Enum_MsgType.RUNMAN_OPENUI, s.checkRunMan, s);
		c.listen(Enum_MsgType.VIP_OPEN, s.onCheckVIP, s);
		c.listen(Enum_MsgType.VIP_LQ, s.onCheckVIP, s);
		c.listen(Enum_MsgType.MSG_QMBOSS_LOGIN, s.checkQM, s);
		// c.listen(Enum_MsgType.MH_STATE, s.checkMH, s);
		// c.listen(Enum_MsgType.KAIFUDAY_UPDATE, s.checkMH, s);
		c.listen(Enum_MsgType.MSG_QIANRENZHAN, s.checkQRZ, s);
		c.listen(Enum_MsgType.MSG_GQ_SWEEP, s.checkSWEEP, s);
		c.listen(Enum_MsgType.CAILIAOFANLI, s.checkCLFL_7out, s);
		c.listen(Enum_MsgType.CAILIAOFL_KF, s.checkCLFL_7in, s);
		c.listen(Enum_MsgType.YUANBAOFANLI, s.checkYBFL, s);
		c.listen(Enum_MsgType.YUANBAOFL_KF, s.checkYBFL, s);
		c.listen(Enum_MsgType.YIBAO_UPDATE, s.checkYiBao, s);
		c.listen(Enum_MsgType.MAIL_LIST_UPDATE, s.checkMail, s);
		c.listen(Enum_MsgType.FUBEN_CAILIAO_UPDATE, s.checkCaiLiaoFuBen, s);
		c.listen(Enum_MsgType.PEACOCK_OPENUI, s.checkPeacock, s);
		c.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, s.checkPeacock, s);
		c.listen(Enum_MsgType.REBIRTH_UPDATE, s.checkRebirth, s);//转生
		c.listen(Enum_MsgType.MSG_GXUPDATE, s.checkRebirth, s);//转生
		c.listen(Enum_MsgType.SKILL_UPDATE, s.checkRebirth, s);//转生
		c.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.checkRebirth, s);//转生
		c.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, s.checkRebirth, s);//转生
		c.listen(Enum_MsgType.TQ_INFO, s.checkTeQuan, s);
		c.listen(Enum_MsgType.TQ_LQ, s.checkTeQuan, s);
		c.listen(Enum_MsgType.WUJIANG_CHECK_NOTICE, s.checkWuJiang, s);//武将
		c.listen(Enum_MsgType.ZHANJIA_CHECK_NOTICE, s.checkZhanJia, s);//战甲
		c.listen(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI, s.checkHuodongGift, s);//精彩活动-登录豪礼
		c.listen(Enum_MsgType.HUODONG_DAIGIFTKF_UI, s.checkHuodongGiftKf, s);
		c.listen(Enum_MsgType.HUODONG_DAIGIFTACT_UI, s.checkHuodongGiftAct, s);
		c.listen(Enum_MsgType.HUODONG_DAILYONE_OPENUI, s.checkHuodongOne, s);//精彩活动-单笔充值
		c.listen(Enum_MsgType.HUODONG_DAIONEKF_UI, s.checkHuodongOneKf, s);//精彩活动-单笔充值
		c.listen(Enum_MsgType.HUODONG_DAIONEACT_UI, s.checkHuodongOneAct, s);//精彩活动-单笔充值
		c.listen(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI, s.checkHuodongAddup, s);//精彩活动-单日累充
		c.listen(Enum_MsgType.HUODONG_DAIADDACT_UI, s.checkHuodongAddAct, s);//精彩活动-单日累充
		c.listen(Enum_MsgType.HUODONG_DAIADDKF_UI, s.checkHuodongAddKf, s);//精彩活动-单日累充
		c.listen(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI, s.checkHuodongAdd, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.checkHuodongSevenKf, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_SEVEN_814, s.checkHuod_SEVEN_814, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_DAILYGIFT_814, s.checkHuod_DAILY_GIFT_814, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_DAILYONE_814, s.CHECKHUOD_DAILY_ONE_814, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_DAILYADDUP_814, s.checkHuod_DAILY_ADDUP_814, s);//精彩活动
		c.listen(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.checkHuod_ADD_RECHARGE_814, s);//精彩活动
		c.listen(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, s.checkHuod_Only_Daione, s);//精彩活动

		// c.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.checkHuodongSevenAct, s);//精彩活动
		c.listen(Enum_MsgType.GROUP_BUY_UI, s.checkGroupBuy, s);//首冲团购
		c.listen(Enum_MsgType.NZBZ_UPDATE, s.checkNZBZ, s);
		c.listen(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE, s.checkNZBZ, s);
		c.listen(Enum_MsgType.LINGLONG_OPEN_UI, s.checkLingLong, s);//玲珑
		c.listen(Enum_MsgType.LINGLONG_GET_AWARD, s.checkLingLong, s);//玲珑
		c.listen(Enum_MsgType.WUSHENG_LIST, s.checkWuShengList, s);//武圣榜
		c.listen(Enum_MsgType.WUSHENG_LIST_DRAW, s.checkWuShengList, s);//武圣榜
		c.listen(Enum_MsgType.SEVENDAY_LOGIN, s.checkSevenDayLogin, s);
		c.listen(Enum_MsgType.MSG_TASK_UP, s.checkDailyTask, s);//每日任务
		c.listen(Enum_MsgType.CROSSKING_CHECK_NOTICE, s.checkCrossKing, s);//乱世枭雄
		c.listen(Enum_MsgType.CROSSWARS_CHECK_NOTICE, s.checkCrossWars, s);//枭雄争霸
		c.listen(Enum_MsgType.CROSSKING_SJMJ, s.checkCrossSJMJ, s);//升阶秘境
		c.listen(Enum_MsgType.COUNTRY_DONATE_UPDATE, s.checkDonate, s);//国家捐献
		c.listen(Enum_MsgType.WELFARE_SIGN_UPDATE, s.checkSignkNotice, s);
		c.listen(Enum_MsgType.CHAOZHI_ZHUANPAN, s.checkChaoZhiZP, s);
		c.listen(Enum_MsgType.QUNYINGBANG, s.checkQunyingBang, s);//群英镑
		c.listen(Enum_MsgType.QUANMIN_KUANGHUAN, s.checkQuanMinKH, s);
		c.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, s.onBySysUp, s);//7系统
		c.listen(Enum_MsgType.BY_SYS_JI_BAN_UP, s.onBySysJiB, s);//7系统
		c.listen(Enum_MsgType.BAZHENTU_NOTICE, s.checkBaZhenTu, s);//八阵图
		c.listen(Enum_MsgType.ACT_HOLYB_XILIAN, s.checkHolyBXiLian, s);//圣兽降临活动-洗练
		c.listen(Enum_MsgType.ACT_HOLYB_MUBIAO, s.checkHolyBMuBiao, s);//圣兽降临活动-目标
		c.listen(Enum_MsgType.ACT_HOLYB_HUOYUE, s.checkHolyBHuoYue, s);//圣兽降临活动-活跃
		c.listen(Enum_MsgType.ACT_HOLYB_ZHUANPAN_RED, s.checkHolyBZhuanP, s);//圣兽降临活动-转盘
		c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_RED, s.checkHolyBXunBao, s);//圣兽降临活动-寻宝
		c.listen(Enum_MsgType.MSG_BAG_DECOMPOSE_RED, s.checkDecompose, s);//分解红点

		c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.WUJIANG_UP_STAR, s.checkBagNotice, s);
		c.listen(Enum_MsgType.BAOWU_DATA_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.MSG_TS_STAR, s.checkBagNotice, s);
		c.listen(Enum_MsgType.SHENJIAN_DATA_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.YIBAO_UPDATE, s.checkBagNotice, s);
		c.listen(Enum_MsgType.ZHANJIA_UP_STAR, s.checkBagNotice, s);
		GGlobal.modelWuJiang.listen(Model_WuJiang.msg_data_shiZhuang, s.checkBagNotice, s);
		GGlobal.modelBingFa.listen(Model_BingFa.LVLUP, s.checkBagNotice, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.tsmsg_red, s.checkLiuChuQS, s)

		c.listen(Enum_MsgType.KINGSHIP_UPDATEDATA, s.checkKingShip, s);//王位争夺
		c.listen(Enum_MsgType.SHAOZHU, s.check_shaozhu, s);//少主
		c.listen(Enum_MsgType.SZQIYUAN_RED, s.shaozhu_qiyuan, s);//少主祈愿
		c.listen(Enum_MsgType.COUNTRY_SKILL_RED, s.couSkilRed, s);//少主祈愿
		c.listen(UIConst.JUEXING, s.check_JueXing, s);//觉醒
		c.listen(UIConst.SANGUO_YITONG, s.check_SanGuoYiTong, s);//三国一统
		c.listen(UIConst.ZS_GODWEAPON, s.check_GodWeopn, s);//专属神兵
		c.listen(Enum_MsgType.WUJIANG_UP_STAR, s.check_GodWeopn, s);//武将升星检测神兵红点
		c.listen(UIConst.XIANSHAN_XUNSHOU, s.check_xianshan_xunshou, s);//仙山寻兽红点
		c.listen(UIConst.YISHOULU_TF, s.check_yishouTF, s);//异兽天赋红点
		c.listen(UIConst.XIULIAN_TF, s.check_yishouTF, s);//异兽天赋红点
		c.listen(UIConst.YANHUI, s.check_yanHui, s);//宴会红点
		c.listen(UIConst.YANHUI_TOAST, s.check_yanHui, s);//宴会红点

		let b = GGlobal.modelPlayer
		b.listen(Model_player.TONGBI_UPDATE, s.checkSkill, s);//技能数据更新
		b.listen(Model_player.TONGBI_UPDATE, s.checkShop, s);//商城
		b.listen(Model_player.YUANBAO_UPDATE, s.checkShop, s);//商城
		b.listen(Model_player.HUNHUO_UPDATE, s.checkJiangHun, s);//将魂
		b.listen(Model_player.GONGXUN, s.checkGX, s);
		b.listen(Model_player.XINGHUN_UPDATE, s.checkXingTu, s);
		b.listen(Model_player.ZHUANSHENG_UPDATE, s.checkXingTu, s);
		b.listen(Model_player.TONGBI_UPDATE, s.checkDuanZao, s);//锻造
		b.listen(Model_player.MSG_HERO_LEVEL, s.checkSkill, s);//技能
		b.listen(Model_player.MSG_HERO_LEVEL, s.checkRebirth, s);//转生
		b.listen(Model_player.YUANBAO_UPDATE, s.checkBaZhenTu, s);//八阵图
		b.listen(Model_player.YUANBAO_UPDATE, s.checkSH_Huanh, s);//兽魂幻化
		GGlobal.modelSHJX.listen(ModelSH.msg_huanx_red, s.checkSH_Huanh, s)
		b.listen(Model_player.MSG_HERO_LEVEL, s.checkLunHui, s);//轮回
		b.listen(Enum_MsgType.LUNHUI_DATA_UPDATE, s.checkLunHui, s);//轮回
		Timer.instance.listen(s.reddotTimer, s, 1000);
	}

	private check_yanHui() {
		let self = this;
		if (GGlobal.modelYanHui.isHasData) {
			self.setCondition(UIConst.YANHUI, 0, GGlobal.modelYanHui.checkJingJiuNotice());
		}
		self.notifyMsg(UIConst.YANHUI);
	}

	private check_yishouTF() {
		let self = this;
		if (Model_YiShouLu.hasTFData) {
			self.setCondition(UIConst.YISHOULU_TF, 0, Model_YiShouLu.checkTFLevelNotice());
			self.setCondition(UIConst.YISHOULU_TF, 1, Model_YiShouLu.checkTFColorNotice());
		}
		if (GGlobal.modelTalent.showData.length > 0) {
			self.setCondition(UIConst.XIULIAN_TF, 0, GGlobal.modelTalent.checkNotice());
		}
		self.notifyMsg(UIConst.YISHOULU_TF);
	}

	private check_xianshan_xunshou() {
		let self = this;
		if (Model_SearchAnimals.hasData) {
			self.setCondition(UIConst.XIANSHAN_XUNSHOU, 0, GGlobal.modelxsxs.checkNotcie())
		} else {
			if (!self.checkCondition(UIConst.XIANSHAN_XUNSHOU, 0)) {
				let count = Model_Bag.getItemCount(GGlobal.modelxsxs.itemID);
				self.setCondition(UIConst.XIANSHAN_XUNSHOU, 0, count > 0)
			}
		}
		this.notifyMsg(UIConst.XIANSHAN_XUNSHOU);
	}

	private check_GodWeopn() {
		let self = this;
		self.setCondition(UIConst.ZS_GODWEAPON, 0, Model_ZSGodWeapon.checkUpStar());
		self.setCondition(UIConst.ZS_GODWEAPON, 1, Model_ZSGodWeapon.checkCuiLian());
		let count = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
		let count1 = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
		self.setCondition(UIConst.ZS_GODWEAPON, 2, count > 0 || count1 > 0);
		self.notify(UIConst.ZS_GODWEAPON);
	}

	private check_SanGuoYiTong() {
		let self = this;
		self.notify(UIConst.SANGUO_YITONG);
	}

	private check_JueXing() {
		let self = this;
		self.setCondition(UIConst.JUEXING, 0, Model_JueXing.checkIconNotice(1));
		self.setCondition(UIConst.JUEXING, 1, Model_JueXing.checkIconNotice(2));
		self.setCondition(UIConst.JUEXING, 2, Model_JueXing.checkIconNotice(3));
		self.setCondition(UIConst.JUEXING, 3, Model_JueXing.checkIconNotice(4));
		self.setCondition(UIConst.JUEXING, 4, Model_JueXing.checkIconNotice(5));
		self.setCondition(UIConst.JUEXING, 5, Model_JueXing.checkIconNotice(6));
		self.setCondition(UIConst.JUEXING, 6, Model_JueXing.checkIconNotice(7));
		self.setCondition(UIConst.JUEXING, 7, Model_JueXing.checkIconNotice(8));
		self.notify(UIConst.JUEXING);
	}

	private check_shaozhu() {
		let self = this;
		if (Model_ShaoZhu.hasData) {
			self.setCondition(UIConst.SHAOZHU, 0, GGlobal.modelShaoZhu.checkStarNotice());
			self.setCondition(UIConst.SHAOZHU, 1, GGlobal.modelShaoZhu.checkQinMiNotice());
			self.setCondition(UIConst.SHAOZHU, 2, GGlobal.modelShaoZhu.checkSkillNotice());
		}
		self.notify(UIConst.SHAOZHU);
	}

	private shaozhu_qiyuan() {
		let s = this;
		s.setCondition(UIConst.SHAOZHU_QIYUAN, 0, GGlobal.modelSZQiYuan.checkNotice());
		s.notify(UIConst.SHAOZHU);
	}

	private couSkilRed() {
		let s = this;
		s.setCondition(UIConst.COUNTRY_SKILL, 0, GGlobal.modelCouSkill.checkRed());
		s.notify(UIConst.COUNTRY);
	}

	/**群英榜 */
	private checkQunyingBang() {
		let m = GGlobal.model_QunYingBang;
		let score = m.score;
		let awardid = m.awardID;
		let cfg = Config.qypoint_235;
		let nowlib;
		let ret = false;
		if (cfg[awardid + 1]) {//有下一级
			nowlib = cfg[awardid + 1];
			ret = score >= nowlib.point;
		}
		this.setCondition(UIConst.QUNYINGBANG, 0, ret);
		this.notify(UIConst.QUNYINGBANG);
	}
	/**超级转盘 */
	private checkChaoZhiZP() {
		let arr = Model_ChaoZhiFL.boxArr;
		if (arr.length > 0) {
			let index = 0;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] != 2) {
					index = i + 1;
					break;
				}
			}
			let cfg;
			if (index == 0) {
				cfg = Config.czzpbox_726[arr.length];
			} else {
				cfg = Config.czzpbox_726[index];
			}
			if (Model_ChaoZhiFL.drawNum <= 0 && (Model_ChaoZhiFL.costNum < cfg.coin || index == 0)) {
				GGlobal.reddot.setCondition(UIConst.CHAOZHI_ZHUANPAN, 0, false);
			} else {
				GGlobal.reddot.setCondition(UIConst.CHAOZHI_ZHUANPAN, 0, true);
			}
			this.notify(UIConst.CHAOZHI_ZHUANPAN);
			this.notify(UIConst.CHAOZHIFL);
		}
	}
	/**角色怒气值更新 */
	private checkSignkNotice() {
		if (ModuleManager.isOpen(UIConst.WELFARE_SIGN)) {
			if (Model_Welfare.isFirstOpen) {
				let sf = this;
				if (Model_Welfare.checSignkNotice()) {
					sf.setCondition(UIConst.WELFARE_SIGN, 0, true);
				} else {
					sf.setCondition(UIConst.WELFARE_SIGN, 0, false);
				}
				sf.notifyMsg(UIConst.WELFARE);
			}
		}
	}

	private checkSevenDayLogin() {
		if (ModuleManager.isOpen(UIConst.SEVENDAY_LOGIN) && Model_SevenDayLogin.isFirstOpen) {
			let ischeck: boolean = false;
			for (let i = 1; i <= 7; i++) {
				if (Model_SevenDayLogin.drawArr[i - 1]) {

				} else {
					ischeck = Model_SevenDayLogin.curDay >= i;
					if (ischeck) break;
				}
			}
			this.setCondition(UIConst.SEVENDAY_LOGIN, 0, ischeck);
		}
	}

	private checkWuShengList(obj) {
		let sf = this;
		let cfg1;
		let targetId;
		let state;
		let color = 0;
		if (obj && obj.state == 1) {
			sf.setCondition(UIConst.WUSHENGLIST, Math.floor(obj.targetId / 100) - 1, true);
		} else {
			for (let i = 0; i < Model_WuShengList.drawArr.length; i++) {
				let arr = Model_WuShengList.drawArr[i];
				state = arr[1];
				targetId = arr[0];
				cfg1 = Config.wsmb_238[targetId];
				if (state != 2) {
					break;
				}
			}
			if (cfg1) {
				sf.setCondition(UIConst.WUSHENGLIST, cfg1.type - 1, state == 1);
			}
		}
		sf.notifyMsg(UIConst.WUSHENGLIST);
	}

	private checkNZBZ() {
		if (ModuleManager.isOpen(UIConst.NANZHENG_BEIZHAN)) {
			if (Model_NZBZ.isFirstOpen) {
				let sf = this;
				if (Model_NZBZ.checkNotice()) {
					sf.setCondition(UIConst.NANZHENG_BEIZHAN, 0, true);
				} else {
					sf.setCondition(UIConst.NANZHENG_BEIZHAN, 0, false);
				}
				sf.notifyMsg(UIConst.NANZHENG_BEIZHAN);
			}
		}
	}

	private checkPeacock() {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.PEACOCK)) {
			sf.setCondition(UIConst.PEACOCK, 0, Model_Peacock.checkNotice());
			sf.notifyMsg(UIConst.PEACOCK);
		}
	}

	private checkCaiLiaoFuBen() {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.FUBEN_CAILIAO)) {
			if (Model_CaiLiao.isFirstOpen) {
				if (Model_CaiLiao.checkNotice()) {
					sf.setCondition(UIConst.FUBEN_CAILIAO, 0, true);
				} else {
					sf.setCondition(UIConst.FUBEN_CAILIAO, 0, false);
				}
				sf.notifyMsg(UIConst.FUBEN_CAILIAO);
			}
		}
	}

	private checkYBFL() {
		let m = GGlobal.modelCZFL;
		let dta = m.yuanbaoDta;
		let r = false;
		for (let i = 0, l = dta.length; i < l; i++) {
			if (dta[i][1] == 1) {
				r = true;
				break;
			}
		}
		this.setCondition(UIConst.YUANBAOFANLI1, 0, r);
		this.setCondition(UIConst.YUANBAOFANLI, 0, r);
		this.setCondition(UIConst.YUANBAOFL_KF, 0, r);
		this.notify(UIConst.CHAOZHIFL);
	}

	private checkCLFL_7in() {
		let m = GGlobal.modelCZFL;
		let dta = m.cailiaoDta;
		let r = false;
		for (let i = 0, l = dta.length; i < l; i++) {
			if (dta[i][1] == 1) {
				r = true;
				break;
			}
		}
		this.setCondition(UIConst.CAILIAOFL_KF, 0, r);
		this.notify(UIConst.CHAOZHIFL);
	}

	private checkCLFL_7out() {
		let m = GGlobal.modelCZFL;
		let dta = m.cailiaoDta;
		let r = false;
		for (let i = 0, l = dta.length; i < l; i++) {
			if (dta[i][1] == 1) {
				r = true;
				break;
			}
		}
		this.setCondition(UIConst.CAILIAOFANLI, 0, r);
		this.notify(UIConst.CHAOZHIFL);
	}

	private onBagUpdate(itemChangeInfo: any) {
		let sf = this;
		if (itemChangeInfo[UIConst.TIANSHU]) {//天书
			sf.checkTianShu();
		}
		if (itemChangeInfo[UIConst.DUANZAO_STRENG] || itemChangeInfo[UIConst.DUANZAO_STAR] || itemChangeInfo[UIConst.DUANZAO_STONE] || itemChangeInfo[UIConst.DUANZAO_ZHUHUN]) {//锻造
			sf.checkDuanZao();
		}
		if (itemChangeInfo[UIConst.BINGFA]) {//兵法
			sf.checkBingfa();
		}
		if (itemChangeInfo[UIConst.MAIN_SKILL_GOD]) {//神技
			sf.checkGodSkill();
		}
		if (itemChangeInfo[UIConst.TITLE]) {//称号
			sf.checkTitle();
		}
		if (itemChangeInfo[UIConst.BAOWU]) {//宝物
			sf.checkBaoWu();
		}
		if (itemChangeInfo[UIConst.SHEN_JIAN]) {//神剑
			sf.checkShenJian();
		}
		// if (itemChangeInfo[UIConst.SHOULING]) {//兽灵
		// 	sf.checkShouLing();
		// }
		if (itemChangeInfo[UIConst.TUJIAN]) {//图鉴
			sf.checkTuJian();
		}
		if (itemChangeInfo[UIConst.YIBAO]) {//异宝
			sf.checkYiBao();
		}
		if (itemChangeInfo[UIConst.WU_JIANG]) {//武将
			sf.checkWuJiang();
		}
		if (itemChangeInfo[UIConst.ZHAN_JIA]) {//战甲
			sf.checkZhanJia();
		}
		if (itemChangeInfo[UIConst.GOD_EQUIP]) {//神装
			sf.checkGodEquip();
		}
		if (itemChangeInfo[UIConst.CANGBAOGE]) {//藏宝阁
			sf.checkCangBaoGe();
		}
		if (itemChangeInfo[UIConst.LING_LONG]) {//玲珑阁
			sf.checkLingLong();
		}
		if (itemChangeInfo[UIConst.REBIRTH]) {//转生装备炼魂
			sf.checkRebirth();
		}
		if (itemChangeInfo[UIConst.HaoLiDuiHuan]) {//三国庆典 兑换
			sf.checkHaoLiDuiHuan();
		}
		if (itemChangeInfo[UIConst.BAZHENTU] || itemChangeInfo[UIConst.BAZHENTU_GOD]) {//八阵图
			sf.checkBaZhenTu();
		}
		if (itemChangeInfo[UIConst.ACTHB_XUNBAO]) {//寻宝
			sf.checkHolyBXunBao();
		}
		if (itemChangeInfo[UIConst.SHAOZHU]) {//少主
			sf.check_shaozhu();
		}
		if (itemChangeInfo[UIConst.SHAOZHU_QIYUAN]) {//少主祈愿
			sf.shaozhu_qiyuan();
		}
		if (itemChangeInfo[UIConst.JUEXING]) {//觉醒
			sf.check_JueXing();
		}

		if (itemChangeInfo[UIConst.SHOULING]) {//兽魂的洗练石
			sf.notifySH();
		}
		if (itemChangeInfo[UIConst.ZS_GODWEAPON] || itemChangeInfo[UIConst.ZS_GODWEAPON_UPSTAR] || itemChangeInfo[UIConst.ZS_GODWEAPON_CL] || itemChangeInfo[UIConst.ZS_GODWEAPON_DUANZAO]) {//神兵
			sf.check_GodWeopn();
		}

		if (itemChangeInfo[UIConst.XIANSHAN_XUNSHOU]) {//仙山寻兽
			sf.check_xianshan_xunshou();
		}
		if (itemChangeInfo[UIConst.YISHOULU_TF] || itemChangeInfo[UIConst.YISHOULU_TFCOLOR] || itemChangeInfo[UIConst.XIULIAN_TF]) {//异兽天赋
			sf.check_yishouTF();
		}
		if (itemChangeInfo[UIConst.HFKH_ZFZJ]) {//张飞醉酒
			GGlobal.control.notify(UIConst.HFKH_ZFZJ);
		}
		if (itemChangeInfo[UIConst.GOD_WUJIANG]) {//神将
			GGlobal.modelGodWuJiang.checkMainBtnNotice();
		}
		if (itemChangeInfo[UIConst.ZHENYAN]) {//阵眼
			GGlobal.modelZhenYan.checkNotice()
		}
		if (itemChangeInfo[UIConst.WISHTREE_ACT] || itemChangeInfo[UIConst.WISHTREE_SYSTEM]) {//许愿树
			GGlobal.modelWishTree.reddotCheckWishTree()
		}
		if (itemChangeInfo[UIConst.SHAOZHU_LIUYI]) {//六艺
			GGlobal.model_LiuYi.checkNotice()
		}
		if (itemChangeInfo[UIConst.HORSE] || itemChangeInfo[UIConst.HORSE_HH]) {//坐骑
			GGlobal.model_Horse.checkNotice();
			GGlobal.model_Horse.checkHHReddot();
		}
		if (itemChangeInfo[UIConst.HOME_MAID]) {//侍女
			GGlobal.model_HomeMaid.checkNotice()
		}
	}
	/**洗练石增加事件通知 */
	private notifySH() {
		GGlobal.control.notify(UIConst.SHJXXILIAN_SHUOMING);
	}


	private checkCangBaoGe() {
		let count = Model_Bag.getItemCount(410029);
		GGlobal.reddot.setCondition(UIConst.CANGBAOGE, 0, count > 0);
		GGlobal.reddot.notify(UIConst.CANGBAOGE);
	}

	private onBagEquipUpdate(itemChangeInfo: any) {
		let sf = this;
		if (itemChangeInfo["equip"]) {//装备
			sf.checkEquip();
		}
		if (itemChangeInfo["equip2"]) {//神装
			sf.checkGodEquip();
		}
		if (itemChangeInfo["equip3"]) {//将印
			sf.checkWuJiang();
		}
		if (itemChangeInfo["equip4"]) {//转生装备
			sf.checkRebirth();
		}
		if (itemChangeInfo["equip5"]) {//武将装备
			sf.checkWuJiang();
		}
		if (itemChangeInfo["equip6"]) {//战甲装备
			sf.checkZhanJia();
		}
		if (itemChangeInfo["equip7"]) {//神剑装备
			sf.checkShenJian();
		}
		if (itemChangeInfo["equip8"]) {//异宝装备
			sf.checkYiBao();
		}
		if (itemChangeInfo["equip9"]) {//兵法装备
			sf.checkBingfa();
		}
		if (itemChangeInfo["equip10"]) {//宝物装备
			sf.checkBaoWu();
		}
		if (itemChangeInfo["equip11"]) {//天书装备
			sf.checkTianShu();
		}
	}

	private onBySysUp(sys): void {
		let sf = this;
		if (sys == Model_BySys.SHEN_JIAN) {
			sf.checkShenJian();
		} else if (sys == Model_BySys.YI_BAO) {
			sf.checkYiBao();
		} else if (sys == Model_BySys.BING_FA) {
			sf.checkBingfa();
		} else if (sys == Model_BySys.BAO_WU) {
			sf.checkBaoWu();
		} else if (sys == Model_BySys.TIAN_SHU) {
			sf.checkTianShu();
		}
	}

	private onBySysJiB(sys) {
		let sf = this;
		if (sys == Model_BySys.JIB_SHENJIAN) {
			sf.checkShenJian();
		} else if (sys == Model_BySys.JIB_YIBAO) {
			sf.checkYiBao();
		} else if (sys == Model_BySys.JIB_BAOWU) {
			sf.checkBaoWu();
		} else if (sys == Model_BySys.JIB_WUJIANG) {
			sf.checkWuJiang();
		} else if (sys == Model_BySys.JIB_TIANSHU) {
			sf.checkTianShu();
		}
	}

	private checkQuanMinKH() {
		let model = GGlobal.modelqmkh;
		let s = this;
		let index = 0;
		model.getBossArr();
		model.getXiaoXiongArr();
		model.getlvbuArr();
		model.getfuhuiArr();
		if (model.completeObj[UIConst.QUANMIN_KUANGHUAN_LVBU]) {
			for (let i = 0; i < model.lvbuArr.length; i++) {
				let cfg = model.lvbuArr[i];
				if (cfg.state == 1) {
					s.setCondition(UIConst.QUANMIN_KUANGHUAN_LVBU, 0, true);
					index++;
					break;
				}
			}
			if (index == 0) {
				s.setCondition(UIConst.QUANMIN_KUANGHUAN_LVBU, 0, false);
			}
		}
		if (model.completeObj[UIConst.QUANMIN_KUANGHUAN_BOSS]) {
			index = 0;
			for (let i = 0; i < model.bossArr.length; i++) {
				let cfg = model.bossArr[i];
				if (cfg.state == 1) {
					s.setCondition(UIConst.QUANMIN_KUANGHUAN_BOSS, 0, true);
					index++;
					break;
				}
			}
			if (index == 0) {
				s.setCondition(UIConst.QUANMIN_KUANGHUAN_BOSS, 0, false);
			}
		}
		if (model.completeObj[UIConst.QUANMIN_KUANGHUAN_XIAOXIONG]) {
			index = 0;
			for (let i = 0; i < model.xiaoxiongArr.length; i++) {
				let cfg = model.xiaoxiongArr[i];
				if (cfg.state == 1) {
					s.setCondition(UIConst.QUANMIN_KUANGHUAN_XIAOXIONG, 0, true);
					index++;
					break;
				}
			}
			if (index == 0) {
				s.setCondition(UIConst.QUANMIN_KUANGHUAN_XIAOXIONG, 0, false);
			}
		}
		if (model.completeObj[UIConst.QUANMIN_KUANGHUAN_FUHUI]) {
			index = 0;
			for (let i = 0; i < model.fuhuiArr.length; i++) {
				let cfg = model.fuhuiArr[i];
				if (cfg.state == 1) {
					s.setCondition(UIConst.QUANMIN_KUANGHUAN_FUHUI, 0, true);
					index++;
					break;
				}
			}
			if (index == 0) {
				s.setCondition(UIConst.QUANMIN_KUANGHUAN_FUHUI, 0, false);
			}
		}
		s.notifyMsg(UIConst.QUANMIN_KUANGHUAN);
	}

	private checkMail() {
		this.setCondition(UIConst.MAIL_PANEL, 0, Model_Mail.checkNotice());
		this.notifyMsg(UIConst.MAIL_PANEL);
	}

	private checkSWEEP() {
		let s = GGlobal.modelGuanQia;
		let r = s.SDCount == 0 && GGlobal.modelGuanQia.curGuanQiaLv >= 30;
		this.setCondition(UIConst.GUANQIABOSSUI, 0, r);
		this.notifyMsg(UIConst.GUANQIABOSSUI);
	}

	private checkQRZ() {
		let r = false;
		let s = GGlobal.modelGuanQia;
		let index = s.killAwardsIndex + 1;
		if (!Config.kill_205[index]) {
		} else {
			let lib = Config.kill_205[index];
			let max = lib.num;
			let tj = lib.tj;
			r = max <= s.killCount && tj <= s.curGuanQiaLv;
		}
		this.setCondition(UIConst.GUANQIABOSSUI, 1, r);
		this.notifyMsg(UIConst.GUANQIABOSSUI);
	}


	private checkPerson() {
		let s = GGlobal.modelBoss;
		if (!ModuleManager.isOpen(UIConst.DRBOSS)) return;
		if (!s.needCheckPersonal) return;
		let r = false;
		let a = s.personalData;
		let t = Model_GlobalMsg.getServerTime();
		let n = egret.getTimer();
		for (let i = 0; i < a.length; i++) {
			let it = a[i];
			if (it.isActi() && it.count > 0 && it.rebornTime < n) {
				r = true;
				s.needCheckPersonal = false;
				break;
			}
		}
		this.setCondition(UIConst.DRBOSS, 0, r);
		this.notifyMsg(UIConst.DRBOSS);
	}

	private checkMH() {
		if (!ModuleManager.isOpen(UIConst.MHBOSS)) return;
		let m = GGlobal.modelBoss;
		let st = m.mhState;
		var r = false;
		let vo = m.getCurrentMHVO();
		if (vo != null) {
			let arr = m.mhBossDeadList;
			let count = m.mhCount;
			r = arr.indexOf(vo.id) < 0 && st == 2 && count > 0;
		}
		this.setCondition(UIConst.MHBOSS, 0, r);
		this.notifyMsg(UIConst.MHBOSS);
	}

	private checkQM() {
		let s = this;
		let r = false;
		if (!ModuleManager.isOpen(UIConst.QMBOSS)) return;
		let d = GGlobal.modelBoss.qmData;
		let vo: Vo_QuanMinBoss;
		let l = d.length;
		let itemCount = Model_Bag.getItemCount(410015);
		if (GGlobal.modelBoss.qmCount > 0 || itemCount > 0) {
			for (let i = l - 1; i >= 0; i--) {
				vo = d[i];
				if (vo.isOpen()) {
					if (vo.st == 1) {
						r = true;
					}
					break;
				}
			}
		}
		this.setCondition(UIConst.QMBOSS, 0, r);
		this.notifyMsg(UIConst.QMBOSS);
	}

	private reddotTimer() {
		let s = this;
		if (ModuleManager.isOpen(UIConst.BOSS)) s.checkPerson();
	}

	private onCheckVIP() {
		let m = GGlobal.modelvip;
		let vip = m.vip + 1;//从0开始
		let d = m.dta;
		let r = false;
		for (var i = 0; i < vip; i++) {
			if (d.indexOf(i) < 0) {
				r = true;
				break;
			}
		}
		this.setCondition(UIConst.VIP, 0, r);
		this.notifyMsg(UIConst.VIP);
	}

	private checkYJDQ(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.FUBEN_YJDQ)) {
			if (Model_YJDQ.isFirstOpen) {
				if (Model_YJDQ.checkTabNotice()) {
					sf.setCondition(UIConst.FUBEN_YJDQ, 0, true);
				} else {
					sf.setCondition(UIConst.FUBEN_YJDQ, 0, false);
				}
				sf.notifyMsg(UIConst.FUBEN_YJDQ);
			}
		}
	}

	private checkRunMan(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.RUNMAN)) {
			if (Model_RunMan.checkTabNotice()) {
				sf.setCondition(UIConst.RUNMAN, 0, true);
			} else {
				sf.setCondition(UIConst.RUNMAN, 0, false);
			}
			sf.notifyMsg(UIConst.RUNMAN);
		}
	}

	private checkShop(): void {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			if (ModuleManager.isOpen(UIConst.SHOP)) {
				sf.notifyMsg(UIConst.SHOP);
			}
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkShop");
	}

	private checkXingTu(): void {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			if (ModuleManager.isOpen(UIConst.XING_TU)) {
				if (Model_XingTu.isFirstOpen) {
					if (Model_XingTu.checkXingTuNotice()) {
						sf.setCondition(UIConst.XING_TU, 0, true);
					} else {
						sf.setCondition(UIConst.XING_TU, 0, false);
					}
					sf.notifyMsg(UIConst.XING_TU);
				}
			}
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkXingTu");
	}

	private checkLunHui(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.LUNHUI)) {
			if (Model_LunHui.checkLunHuiNotice()) {
				sf.setCondition(UIConst.LUNHUI, 0, true);
			} else {
				sf.setCondition(UIConst.LUNHUI, 0, false);
			}
			sf.notifyMsg(UIConst.LUNHUI);
			sf.notifyMsg(UIConst.ROLE);
		}
	}

	private checkTuJian(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.TUJIAN)) {
			if (Model_TuJian.isFirstOpen) {
				for (let i = 0; i < 4; i++) {
					if (Model_TuJian.checkTabNotice(i)) {
						sf.setCondition(UIConst.TUJIAN, i, true);
					} else {
						sf.setCondition(UIConst.TUJIAN, i, false);
					}
				}
				sf.notifyMsg(UIConst.TUJIAN);
				sf.notifyMsg(UIConst.ROLE);
			}
		}
	}

	private checkGX() {
		let s = this;
		let bo = false;
		let f = GGlobal.modelguanxian.guanzhi;
		let lib = Config.guanxian_701[f];

		if (lib) {
			let max = lib["lvup"];
			if (max > 0 && Model_player.voMine.gongxun >= max) {
				bo = true;
			}
		}
		s.setCondition(UIConst.GUANXIAN, 0, bo);
		s.notifyMsg(UIConst.REBIRTH);
	}

	// private checkShouLing(): void {
	// 	const bool = this.checkCondition(UIConst.SHOULING);
	// const notice = this.checkCondition(UIConst.SHOULING);
	// this.setCondition(UIConst.SHOULING, 0, bool);
	// GGlobal.control.notify(UIConst.SHOULING);
	// }

	private checkJiangHun(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.JIANGHUN) && Model_JiangHun.isFirstOpen) {
			for (let i = 0; i < 4; i++) {
				if (Model_JiangHun.checkTabNotice(i)) {
					sf.setCondition(UIConst.JIANGHUN, i, true);
				} else {
					sf.setCondition(UIConst.JIANGHUN, i, false);
				}
			}
			sf.notifyMsg(UIConst.JIANGHUN);
			sf.notifyMsg(UIConst.ROLE);
		}
	}

	private checkShenJian(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.SHEN_JIAN) && Model_ShenJian.isFirstOpen) {
			if (Model_ShenJian.checkUpStarNotice() || Model_ShenJian.checkDrugNotice()) {
				sf.setCondition(UIConst.SHEN_JIAN, 0, true);
			} else {
				sf.setCondition(UIConst.SHEN_JIAN, 0, false);
			}
			if (Model_ShenJian.checkUpJie()) {
				sf.setCondition(UIConst.SHEN_JIAN, 1, true);
			} else {
				sf.setCondition(UIConst.SHEN_JIAN, 1, false);
			}
			sf.setCondition(UIConst.SHEN_JIAN, 2, Model_BySys.checkSuit(Model_BySys.JIB_SHENJIAN));
			sf.notifyMsg(UIConst.SHEN_JIAN);
			sf.notifyMsg(UIConst.ROLE);
		}
	}

	private checkBaoWu(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.BAOWU)) {
			let drugNotice = Model_BaoWu.checkDrugNotice();
			if (Model_BaoWu.checkChangeBtNotice(0) || Model_BaoWu.checkChangeBtNotice(1) || drugNotice ||
				Model_BaoWu.checkUpStarNotice()) {
				sf.setCondition(UIConst.BAOWU, 0, true);
			} else {
				sf.setCondition(UIConst.BAOWU, 0, false);
			}

			if (Model_BaoWu.checkUpJie()) {
				sf.setCondition(UIConst.BAOWU, 1, true);
			} else {
				sf.setCondition(UIConst.BAOWU, 1, false);
			}
			sf.setCondition(UIConst.BAOWU, 2, Model_BySys.checkSuit(Model_BySys.JIB_BAOWU));
			sf.notifyMsg(UIConst.BAOWU);
		}
	}

	private checkLvBu() {
		let sf = this;
		let lvbu = false;
		let m = GGlobal.modelBoss;
		if (!ModuleManager.isOpen(UIConst.LBBOSS)) {
			lvbu = false;
		} else if (m.lvbuSt == 1 || m.lvbuSt == 2 || m.lvbuSt == 3) {
			lvbu = true;
		} else {
			lvbu = false;
		}
		sf.setCondition(UIConst.LBBOSS, 0, lvbu);
		sf.notifyMsg(UIConst.LBBOSS);
	}

	//检查道具
	private checkTitle() {
		let sf = this;
		let m = GGlobal.modeltitle;
		let lib = m.lib;
		let ret = false;
		for (let v in lib) {
			let slib = lib[v]
			for (let s in slib) {
				let vo = slib[s];
				if (vo.isMaxLevel()) continue;
				let condition = vo.condtion[0];
				let type = condition[0];
				let val = condition[2];
				if (type == 9) {
					let count = Model_Bag.getItemCount(val);
					if (count > 0) {
						ret = true;
						break;
					}
				}
				if (vo.email != "0") {
					let condition = JSON.parse(vo.email);
					let count = Model_Bag.getItemCount(condition[0][1]);
					if (count > 0) {
						ret = true;
						break;
					}
				}
			}
			if (ret) break;
		}
		sf.setCondition(UIConst.TITLE, 0, ret);
		sf.notifyMsg(UIConst.ROLE);
	}

	protected checkEquip(): void {
		let sf = this;
		let role: Vo_Player = Model_player.voMine;
		if (role) {
			let bo: boolean = false;
			for (let i: number = 0; i < 10; i++) {
				if (Model_Equip.checkNoticeReplace(i)) {
					bo = true;
					break;
				}
			}
			sf.setCondition(UIConst.ROLE, 1, bo);
			sf.notifyMsg(UIConst.ROLE);
		}
	}
	//神装
	private checkGodEquip(): void {
		if (ModuleManager.isOpen(UIConst.GOD_EQUIP) && Model_GodEquip.hasData) {
			let sf = this;
			let bo = false;
			let equipData = Model_player.voMine.equipData;
			for (let i: number = 10; i < 20; i++) {
				let voE = equipData[i];
				bo = Model_GodEquip.checkEquipNotice(i, voE ? voE.id : 0);
				if (!bo) {
					if (Model_Equip.checkNoticeReplace(i)) {
						bo = true;
					}
				}

				if (bo) break;
			}
			if (!bo) {//套装升阶
				let level = 999999;
				let voE: VoEquip;
				for (let i: number = 0; i < 10; i++) {
					voE = equipData[i + 10];
					if (voE) {
						if (voE.jie < level) {
							level = voE.jie;
						}
					} else {
						level = 0;
						break;
					}
				}
				if (Model_GodEquip.GOD_JIE < level) {
					let suitNext = Config.godequipsuit_208[Model_GodEquip.GOD_JIE + 1];
					if (suitNext) {
						bo = true;
					} else {
						bo = false;
					}
				} else {
					bo = false;
				}
			}

			let bo1 = false;
			for (let i: number = 10; i < 20; i++) {
				let voE = equipData[i];
				bo1 = Model_GodEquip.checkEquipNotice_XL(voE);
				if (bo1) break;
			}
			sf.setCondition(UIConst.GOD_EQUIP, 0, bo);
			sf.setCondition(UIConst.GOD_EQUIP, 1, bo1);
			sf.notifyMsg(UIConst.GOD_EQUIP);
			sf.notifyMsg(UIConst.ROLE);
		}
	}

	private checkYiBao(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.YIBAO)) {
			if (Model_YiBao.isFirstOpen) {
				if (Model_YiBao.checkYB() || Model_YiBao.checkDrugNotice()) {
					sf.setCondition(UIConst.YIBAO, 0, true);
				} else {
					sf.setCondition(UIConst.YIBAO, 0, false);
				}

				if (Model_YiBao.checkUpJie()) {
					sf.setCondition(UIConst.YIBAO, 1, true);
				} else {
					sf.setCondition(UIConst.YIBAO, 1, false);
				}
				sf.setCondition(UIConst.YIBAO, 2, Model_BySys.checkSuit(Model_BySys.JIB_YIBAO));
				sf.notifyMsg(UIConst.YIBAO);
				sf.notifyMsg(UIConst.ROLE);
			}
		}
	}

	private checkSkill(): void {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			if (ModuleManager.isOpen(UIConst.MAIN_SKILL)) {
				if (Model_Skill.checkSkillTabNotice()) {
					sf.setCondition(UIConst.MAIN_SKILL, 0, true);
				} else {
					sf.setCondition(UIConst.MAIN_SKILL, 0, false);
				}
				sf.notifyMsg(UIConst.MAIN_SKILL);
			}
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkSkill");
	}

	private checkGodSkill() {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.MAIN_SKILL_GOD)) {
			if (Model_Skill.checkGodSkillTabNotice()) {
				sf.setCondition(UIConst.MAIN_SKILL_GOD, 0, true);
			} else {
				sf.setCondition(UIConst.MAIN_SKILL_GOD, 0, false);
			}
			sf.notifyMsg(UIConst.MAIN_SKILL_GOD);
		}
	}

	private checkDuanZao() {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			//强化
			let equipData: Array<VoEquip> = Model_player.voMine.equipData;
			let isShow: boolean = false;
			if (ModuleManager.isOpen(UIConst.DUANZAO_STRENG)) {
				for (let key in equipData) {
					if (Model_Equip.isEquip(parseInt(key))) {
						isShow = Model_DuanZao.gridShowNotice_Streng(equipData[key]);
						if (isShow) break;
					}
				}
				if (!isShow) isShow = Model_DuanZao.checkStrengSuitNotice();
				if (isShow) {
					sf.setCondition(UIConst.DUANZAO_STRENG, 0, true);
				} else {
					sf.setCondition(UIConst.DUANZAO_STRENG, 0, false);
				}
			}
			//宝石
			if (ModuleManager.isOpen(UIConst.DUANZAO_STONE)) {
				isShow = false;
				for (let key in equipData) {
					if (Model_Equip.isEquip(parseInt(key))) {
						isShow = Model_DuanZao.gridShowNotice_Stone(equipData[key]);
						if (isShow) break;
					}
				}
				if (!isShow) isShow = Model_DuanZao.checkGemSuitNotice();
				if (isShow) {
					sf.setCondition(UIConst.DUANZAO_STRENG, 1, true);
				} else {
					sf.setCondition(UIConst.DUANZAO_STRENG, 1, false);
				}
			}

			//升星
			if (ModuleManager.isOpen(UIConst.DUANZAO_STAR)) {
				isShow = false;
				for (let key in equipData) {
					if (Model_Equip.isEquip(parseInt(key))) {
						isShow = Model_DuanZao.checkUpStarGridNotice(equipData[key]);
						if (isShow) break;
					}
				}
				if (!isShow) isShow = Model_DuanZao.checkStarSuitNotice();
				if (isShow) {
					sf.setCondition(UIConst.DUANZAO_STRENG, 2, true);
				} else {
					sf.setCondition(UIConst.DUANZAO_STRENG, 2, false);
				}
			}

			//铸魂
			if (ModuleManager.isOpen(UIConst.DUANZAO_ZHUHUN)) {
				isShow = false;
				for (let key in equipData) {
					if (Model_Equip.isEquip(parseInt(key))) {
						isShow = Model_DuanZao.checkZhuHunGridNotice(equipData[key]);
						if (isShow) break;
					}
				}
				if (!isShow) {
					for (let i = 1; i < 4; i++) {
						isShow = Model_DuanZao.checkShiHunNotice(i);
						if (isShow) break;
					}
				}
				if (isShow) {
					sf.setCondition(UIConst.DUANZAO_STRENG, 3, true);
				} else {
					sf.setCondition(UIConst.DUANZAO_STRENG, 3, false);
				}
			}
			sf.notifyMsg(UIConst.DUANZAO_STRENG);
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkDuanZao");
	}

	private checkTianShu() {
		let sf = this;
		if (!ModuleManager.isOpen(UIConst.TIANSHU)) return;
		let m = GGlobal.modeltianshu;
		// let count = Model_Bag.getItemCount(Model_TianShu.peiyangdan);
		// //天书 升级丹
		// if (count > 0 && m.level < 100) {
		// 	let level = m.level == 0 ? 1 : m.level;
		// 	let lib = Config.booklv_215[level];
		// 	let need = (lib.exp - m.exp) / 10;
		// 	sf.setCondition(UIConst.TIANSHU, 0, count >= need);
		// }
		// else
		// 	sf.setCondition(UIConst.TIANSHU, 0, false);

		sf.checkTianShuDrug();

		let hasStar: boolean;
		let lib = Config.book_215;
		for (let i in lib) {
			let item = JSON.parse(lib[i]["item"]);
			let id = item[0][1];
			let v = m.getVoByID(i);
			if (v.isMaxStar()) continue;
			let count = Model_Bag.getItemCount(id);//激活和升星道具
			if (count > 0 && !v.isMaxStar()) {
				hasStar = true;
				break;
			}
		}
		if (hasStar)//天书 升星丹
			sf.setCondition(UIConst.TIANSHU, 2, true);
		else
			sf.setCondition(UIConst.TIANSHU, 2, false);

		if (Model_TianShu.checkUpJie()) {
			sf.setCondition(UIConst.TIANSHU, 4, true);
		} else {
			sf.setCondition(UIConst.TIANSHU, 4, false);
		}
		sf.setCondition(UIConst.TIANSHU, 5, Model_BySys.checkSuit(Model_BySys.JIB_TIANSHU));

		sf.notifyMsg(UIConst.TIANSHU);
	}

	private checkWearTS() {
		let s = this;
		let m = GGlobal.modeltianshu;
		if (!ModuleManager.isOpen(UIConst.TIANSHU)) return;
		s.setCondition(UIConst.TIANSHU, 3, m.currentID == 0 && m.getTotalStar() > 0);
		s.notifyMsg(UIConst.TIANSHU);

		s.checkTianShu();
	}

	private checkTianShuDrug() {
		let sf = this;
		if (!ModuleManager.isOpen(UIConst.TIANSHU)) return;
		let m = GGlobal.modeltianshu;
		let lib = Config.drug_200[8];
		let count = Model_Bag.getItemCount(lib['id']);//属性丹
		if (count > 0 && m.getDrugCount() > m.shuxingdan)//天书 升级丹
			sf.setCondition(UIConst.TIANSHU, 1, true);
		else
			sf.setCondition(UIConst.TIANSHU, 1, false);
		sf.notifyMsg(UIConst.TIANSHU);
	}

	/**兵法*/
	private checkBingfa() {
		let sf = this;
		GGlobal.modelBingFa.initData();
		sf.onBFSuitCheck();
		sf.onBFDrug();
		sf.onBFJie();
	}

	private onBFSuitCheck() {//检测套装和道具
		let sf = this;
		GGlobal.modelBingFa.initData();//mapObj初始化
		//激活道具
		let hasItem: boolean;
		let m = GGlobal.modelBingFa;
		let lib = Config.book_213;
		for (let i in lib) {
			let lb = lib[i];
			let v = m.mapObj[i];
			let item = JSON.parse(lb["item"]);
			let count = Model_Bag.getItemCount(item[0][1]);
			if (count >= item[0][2] && (v && v.star < v.starMax)) {
				hasItem = true;
				break;
			}
		}
		sf.setCondition(UIConst.BINGFA, 0, hasItem);//激活道具或者是升阶道具

		let count = Model_Bag.getItemCount(410013);
		hasItem = false;
		let data: any[] = m.suitData;
		for (let j = 0; j < data.length; j++) {
			let vo: VoBingFaSuit = data[j];
			if (vo.isMax) continue;
			if (vo.item != 0) {
				let prop = JSON.parse(vo.item);
				let needCount = prop[0][2];
				if (count >= needCount) {
					if (vo.condition != "0") {
						let isfill: boolean = true;
						let condition = JSON.parse(vo.condition);
						for (let k = 0; k < condition.length; k++) {
							let id = condition[k][0];
							let star = condition[k][1];
							if (m.mapObj[id + ""].star < star) {
								isfill = false;
								break;
							}
						}
						if (isfill) {
							hasItem = true;
							break;
						}
					}
				}
			}
		}
		sf.setCondition(UIConst.BINGFA, 2, hasItem);//激活套装属性条件满足
		sf.notifyMsg(UIConst.BINGFA);
	}

	private onBFDrug() {//仅检测属性丹
		let sf = this;
		let lib = Config.drug_200[6];
		let count = Model_Bag.getItemCount(lib['id']);//属性丹
		let m = GGlobal.modelBingFa;
		if (count > 0 && m.drugCount < m.getDrugCount())
			sf.setCondition(UIConst.BINGFA, 1, true);
		else
			sf.setCondition(UIConst.BINGFA, 1, false);
		sf.notifyMsg(UIConst.BINGFA);
	}

	private onBFJie() {
		let sf = this;
		if (Model_BingFa.checkUpJie()) {
			sf.setCondition(UIConst.BINGFA, 3, true);
		} else {
			sf.setCondition(UIConst.BINGFA, 3, false);
		}
		sf.notifyMsg(UIConst.BINGFA);
	}

	//每日任务
	private checkDailyTask() {
		if (!ModuleManager.isOpen(UIConst.DAILYTASK)) return;
		let s = this;
		let r = false;
		let data = GGlobal.modeltask.mappingObj;
		for (let i in data) {
			if (data[i].state == 1) {
				r = true;
				break;
			}
		}
		if (!r) {
			data = GGlobal.modeltask.boxData;
			for (let i in data) {
				if (data[i] == 1) {
					r = true;
					break;
				}
			}
		}
		s.setCondition(UIConst.DAILYTASK, 0, r);
		s.notifyMsg(UIConst.DAILYTASK);
	}

	//转生红点  是否达到转生条件
	private checkRebirth() {
		if (!ModuleManager.isOpen(UIConst.REBIRTH)) return;
		let sf = this;
		let zs = Model_player.voMine.zsID;
		let zhuansheng = Config.zhuansheng_705[zs];
		let zhuanshengNext = null;
		if (zhuansheng.nextid != 0) {
			zhuanshengNext = Config.zhuansheng_705[zhuansheng.nextid];
			let conditionArr = ConfigHelp.SplitStr(zhuanshengNext.condition)
			let red = true;
			for (let i = 0; i < 3; i++) {
				let cdType = Number(conditionArr[i][0])
				let cdValue = Number(conditionArr[i][1])
				let boo;
				if (cdType == 1) {//人物等级
					boo = Model_LunHui.realLv >= cdValue
				} else if (cdType == 2) {//宝石等级
					boo = Model_DuanZao.totGemLv >= cdValue
				} else if (cdType == 3) {//强化等级
					boo = Model_DuanZao.totStrengLv >= cdValue
				} else if (cdType == 4) {//升星等级
					boo = Model_DuanZao.getStarLv() >= cdValue
				} else if (cdType == 5) {//技能等级
					boo = Model_Skill.getSkillLv() >= cdValue
				} else if (cdType == 6) {//官衔等级
					boo = GGlobal.modelguanxian.guanzhi >= cdValue
				} else if (cdType == 7) {//铜雀台
					boo = Model_Peacock.curLayer >= cdValue
				}
				if (!boo) {
					red = false;
					break;
				}
			}
			if (!red) {//转生装备穿戴
				red = Model_Equip.zSWearArr().length > 0;
			}
			if (!red) {//转生大师
				red = Model_Equip.zSDaShiRed()
			}
			if (!red) {//转生装备可炼魂
				red = Model_Equip.zSEquipLh()
			}
			sf.setCondition(UIConst.REBIRTH, 0, red);
		} else {
			sf.setCondition(UIConst.REBIRTH, 0, false);
		}
		sf.notifyMsg(UIConst.REBIRTH);
	}

	private checkWuJiang() {
		let sf = this;
		if (!ModuleManager.isOpen(UIConst.WU_JIANG)) return;
		sf.setCondition(UIConst.WU_JIANG, 0, Model_WuJiang.checkUpStar());
		sf.setCondition(UIConst.WU_JIANG, 1, Model_WuJiang.checkUpJie());
		sf.setCondition(UIConst.WU_JIANG, 2, Model_BySys.checkSuit(Model_BySys.JIB_WUJIANG));
		sf.setCondition(UIConst.WU_JIANG, 3, Model_WuJiang.checkJYin());
		sf.setCondition(UIConst.WU_JIANG, 4, Model_WuJiang.SZcheckAll());
		sf.notifyMsg(UIConst.WU_JIANG);
	}

	private checkZhanJia() {
		let sf = this;
		if (!ModuleManager.isOpen(UIConst.ZHAN_JIA)) return;
		if (!Model_ZhanJia.hasData) return;
		sf.setCondition(UIConst.ZHAN_JIA, 0, Model_ZhanJia.checkRed());
		sf.notifyMsg(UIConst.ZHAN_JIA);
	}

	private checkHuodongGift() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAILY_GIFT)) return;
		sf.setCondition(UIConst.HUODONG_DAILY_GIFT, 0, Model_HuoDong.isNotice(Model_HuoDong.dailyGiftArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_GIFT);
	}

	private checkHuodongGiftKf() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_GIFT_KF)) return;
		sf.setCondition(UIConst.HUODONG_DAI_GIFT_KF, 0, Model_HuoDong.isNotice(Model_HuoDong.daiGiftKfArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_GIFT_KF);
	}

	private checkHuodongGiftAct() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_GIFT_ACT)) return;
		sf.setCondition(UIConst.HUODONG_DAI_GIFT_ACT, 0, Model_HuoDong.isNotice(Model_HuoDong.daiGiftActArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_GIFT_ACT);
	}

	private checkHuodongOne() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAILY_ONE)) return;
		sf.setCondition(UIConst.HUODONG_DAILY_ONE, 0, Model_HuoDong.isNotice(Model_HuoDong.dailyOneArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_ONE);
	}

	private checkHuodongOneKf() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_ONE_KF)) return;
		sf.setCondition(UIConst.HUODONG_DAI_ONE_KF, 0, Model_HuoDong.isCtNotice(Model_HuoDong.daiOneKfArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_ONE_KF);
	}

	private checkHuodongOneAct() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_ONE_ACT)) return;
		sf.setCondition(UIConst.HUODONG_DAI_ONE_ACT, 0, Model_HuoDong.isCtNotice(Model_HuoDong.daiOneActArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_ONE_ACT);
	}

	private checkHuodongAdd() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_ADD_RECHARGE)) return;
		if (Model_GlobalMsg.kaifuDay > 7) {
			sf.setCondition(UIConst.HUODONG_ADD_RECHARGE, 0, Model_HuoDong.isVoNotice(Model_HuoDong.addRechargeArr));
			sf.notifyMsg(UIConst.HUODONG_ADD_RECHARGE);
		} else {
			sf.setCondition(UIConst.HUODONG_ADD_RECHARGESYS, 0, Model_HuoDong.isVoNotice(Model_HuoDong.addRechargeArr));
			sf.notifyMsg(UIConst.HUODONG_ADD_RECHARGESYS);
		}
	}

	private checkHuodongAddup() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAILY_ADDUP)) return;
		sf.setCondition(UIConst.HUODONG_DAILY_ADDUP, 0, Model_HuoDong.isVoNotice(Model_HuoDong.dailyAddUpArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_ADDUP);
	}

	private checkHuodongAddKf() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_ADD_KF)) return;
		sf.setCondition(UIConst.HUODONG_DAI_ADD_KF, 0, Model_HuoDong.isVoNotice(Model_HuoDong.daiAddKfArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_ADD_KF);
	}

	private checkHuodongAddAct() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_DAI_ADD_ACT)) return;
		sf.setCondition(UIConst.HUODONG_DAI_ADD_ACT, 0, Model_HuoDong.isVoNotice(Model_HuoDong.daiAddActArr));
		sf.notifyMsg(UIConst.HUODONG_DAI_ADD_ACT);
	}
	private checkHuodongSevenKf() {
		let sf = this;
		let red = Model_HuoDong.isVoNotice(Model_HuoDong.sevenKfArr) || Model_HuoDong.sevenKfStatus == 1
		// if (!ModuleManager.isOpen(UIConst.HUODONG_SEVEN_KAIFU)) return;
		sf.setCondition(UIConst.HUODONG_SEVEN_KAIFU, 0, red);
		sf.setCondition(UIConst.HUODONG_SEVEN_ACT, 0, red);
		sf.notifyMsg(UIConst.HUODONG_SEVEN_KAIFU);
	}

	private checkHuodongSevenAct() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.HUODONG_SEVEN_ACT)) return;
		sf.setCondition(UIConst.HUODONG_SEVEN_ACT, 0, Model_HuoDong.isVoNotice(Model_HuoDong.sevenKfArr));
		sf.notifyMsg(UIConst.HUODONG_SEVEN_ACT);
	}

	private checkHuod_DAILY_GIFT_814() {
		let sf = this;
		sf.setCondition(UIConst.HUODONG_DAILY_GIFT814, 0, Model_HuoDong.isVoNotice(Model_HuoD814.dailyGiftArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_GIFT814);
	}
	private CHECKHUOD_DAILY_ONE_814() {
		let sf = this;
		sf.setCondition(UIConst.HUODONG_DAILY_ONE814, 0, Model_HuoDong.isCtNotice(Model_HuoD814.dailyOneArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_ONE814);
	}

	private checkHuod_ADD_RECHARGE_814() {
		let sf = this;
		sf.setCondition(UIConst.HUODONG_ADD_RECHARGE814, 0, Model_HuoDong.isVoNotice(Model_HuoD814.addRechargeArr));
		sf.notifyMsg(UIConst.HUODONG_ADD_RECHARGE814);
	}

	private checkHuod_Only_Daione(sys) {
		let sf = this;
		sf.setCondition(UIConst.HUOD_ONLY_DAILY_ONE, sys - 1, Model_HuoDong.isCtNotice(Model_HuoDOnly.getDaiOneArr(sys)));
		sf.notifyMsg(UIConst.HUOD_ONLY);
	}

	private checkHuod_DAILY_ADDUP_814() {
		let sf = this;
		sf.setCondition(UIConst.HUODONG_DAILY_ADDUP814, 0, Model_HuoDong.isVoNotice(Model_HuoD814.dailyAddUpArr));
		sf.notifyMsg(UIConst.HUODONG_DAILY_ADDUP814);
	}

	private checkHuod_SEVEN_814() {
		let sf = this;
		let red = Model_HuoDong.isVoNotice(Model_HuoD814.sevenArr) || Model_HuoD814.sevenStatus == 1
		sf.setCondition(UIConst.HUODONG_SEVEN814, 0, red);
		sf.notifyMsg(UIConst.HUODONG_SEVEN814);
	}

	private checkGroupBuy() {
		let sf = this;
		sf.setCondition(UIConst.GROUP_BUY, 0, Model_HuoDong.isVoNotice(GGlobal.modelGroupBuy.buyArr));
		sf.notifyMsg(UIConst.GROUP_BUY);

		sf.setCondition(UIConst.GROUP_B814, 0, Model_HuoDong.isVoNotice(GGlobal.modelGroupB814.buyArr));
		sf.notifyMsg(UIConst.GROUP_B814);
		sf.notify(UIConst.CHAOZHIFL);
	}

	private checkTeQuan() {
		let r = false;
		let s = this;
		let d = GGlobal.modelvip.tq_dta;
		let hasGet = GGlobal.modelvip.dta;
		if (d) {
			let j = 0;
			for (j; j < d.length; j++) {
				let idx = d[j][0];
				if (d[j][1] == 0) {
					r = true;
					break;
				}
			}
		}
		if (!r) r = GGlobal.modelvip.headState == 1;
		s.setCondition(UIConst.TEQUAN, 0, r);
		s.notifyMsg(UIConst.TEQUAN);
	}

	private checkLingLong() {
		let r = false;
		let s = this;
		let p = Model_LingLong.pointArr;
		for (var i = 0; i < p.length; i++) {
			// let pointCfg = Config.llgpoint_239[p[i].point]
			if (p[i].status == 0) {//不能领取
				continue;
			} else if (p[i].status == -1) {//已领取
				continue;
			} else {//可领取
				r = true;
				break;
			}
		}
		if (Model_Bag.getItemCount(Model_LingLong.lingLongId) > 0) {
			r = true;
		}
		s.setCondition(UIConst.LING_LONG, 0, r);
		s.notifyMsg(UIConst.LING_LONG);
	}

	private checkCrossKing(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.CROSS_KING) && Model_CrossKing.hasData) {
			if (Model_CrossKing.checkNotice()) {
				sf.setCondition(UIConst.CROSS_KING, 0, true);
			} else {
				sf.setCondition(UIConst.CROSS_KING, 0, false);
			}
			sf.notifyMsg(UIConst.CROSS_KING);
		}
	}
	private checkCrossSJMJ() {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.SJMJ1)) {
			let red = false;
			for (let key in Config.sjmj_258) {
				red = GGlobal.modelSJMJ.checkTabRed(Config.sjmj_258[key].id)
				if (red) {
					break;
				}
			}
			sf.setCondition(UIConst.SJMJ1, 0, GGlobal.modelSJMJ.notice() || red);
			sf.notifyMsg(UIConst.SJMJ1);
		}
	}

	private checkCrossWars(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.CROSS_WARS) && (Model_CrossWars.hasData || Model_CrossWars.actStatus == 1)) {
			if (Model_CrossWars.checkNotice()) {
				sf.setCondition(UIConst.CROSS_WARS, 0, true);
			} else {
				sf.setCondition(UIConst.CROSS_WARS, 0, false);
			}
			sf.notifyMsg(UIConst.CROSS_WARS);
		}
	}

	private checkDonate(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.COUNTRY)) {
			sf.setCondition(UIConst.COUNTRY_DONATE, 0, Model_Country.checkDonate());
			sf.notifyMsg(UIConst.COUNTRY_DONATE);
		}
	}

	private checkKingShip(): void {
		let sf = this;
		if (ModuleManager.isOpen(UIConst.COUNTRY)) {
			sf.setCondition(UIConst.COUNTRY_KINGSHIP, 0, Model_Kingship.checkNotice());
			sf.notifyMsg(UIConst.COUNTRY_KINGSHIP);
			sf.notifyMsg(ReddotEvent.CHECK_COUNTRY);
		}
	}

	private checkHaoLiDuiHuan() {
		if (!ModuleManager.isOpen(UIConst.HaoLiDuiHuan)) {
			return;
		}
		if (GGlobal.modelSGQD.haoLiHave) {
			GGlobal.reddot.setCondition(UIConst.HaoLiDuiHuan, 0, GGlobal.modelSGQD.getNoti(UIConst.HaoLiDuiHuan));
			GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
		} else {
			GGlobal.modelSGQD.CG4101();
		}
	}

	private checkBaZhenTu() {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			if (!Model_BaZhenTu.isFirstOpen) return;
			if (!ModuleManager.isOpen(UIConst.BAZHENTU)) return;
			sf.setCondition(UIConst.BAZHENTU, 0, Model_BaZhenTu.checkEquip() || Model_BaZhenTu.checkDashi());
			sf.setCondition(UIConst.BAZHENTU, 1, Model_BaZhenTu.checkFenJ());
			sf.setCondition(UIConst.BAZHENTU, 2, Model_BaZhenTu.checkJianD());
			sf.setCondition(UIConst.BAZHENTU, 3, Model_BaZhenTu.checkGod());
			sf.notifyMsg(UIConst.BAZHENTU);
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkBaZhenTu");
	}

	private checkHolyBXiLian() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) return;
		let arr = GGlobal.modelActHolyB.xlArr
		sf.setCondition(UIConst.ACTHB_XILIAN, 0, Model_HuoDong.isVoNotice(arr));
		sf.notifyMsg(UIConst.ACTHB_XILIAN);
	}
	private checkHolyBMuBiao() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) return;
		let obj = GGlobal.modelActHolyB.muBObj
		sf.setCondition(UIConst.ACTHB_MUBIAO, 0, false);
		for (let keys in obj) {
			let arr = obj[keys]
			let red = Model_HuoDong.isVoNotice(arr)
			sf.setCondition(UIConst.ACTHB_MUBIAO, Number(keys), red);
			if (red) sf.setCondition(UIConst.ACTHB_MUBIAO, 0, true);
		}
		sf.notifyMsg(UIConst.ACTHB_MUBIAO);
	}
	private checkHolyBHuoYue() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) return;
		let obj = GGlobal.modelActHolyB.huoYObj
		sf.setCondition(UIConst.ACTHB_HUOYUE, 0, false);
		for (let keys in obj) {
			let arr = obj[keys]
			let red = Model_HuoDong.isVoNotice(arr)
			sf.setCondition(UIConst.ACTHB_HUOYUE, Number(keys), red);
			if (red) sf.setCondition(UIConst.ACTHB_HUOYUE, 0, true);
		}
		sf.notifyMsg(UIConst.ACTHB_HUOYUE);
	}

	private checkHolyBZhuanP() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) return;
		let model = GGlobal.modelActHolyB;
		let red = model.zpHaveCt > 0
		sf.setCondition(UIConst.ACTHB_ZHUANPAN, 0, red);
		sf.notifyMsg(UIConst.ACTHB_ZHUANPAN);
	}

	private checkHolyBXunBao() {
		let sf = this;
		// if (!ModuleManager.isOpen(UIConst.ACT_HOLY_BEAST)) return;
		let model = GGlobal.modelSHXunbao;
		//有次数
		let ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM)
		sf.setCondition(UIConst.ACTHB_XUNBAO, 1, ct > 0);
		//目标奖励
		sf.setCondition(UIConst.ACTHB_XUNBAO, 2, model.isMuBiaoNotice(model.xbMuBiaoArr));
		let red = sf.checkCondition(UIConst.ACTHB_XUNBAO, 1) || sf.checkCondition(UIConst.ACTHB_XUNBAO, 2);
		sf.setCondition(UIConst.ACTHB_XUNBAO, 0, red);
		sf.notifyMsg(UIConst.ACTHB_XUNBAO);
	}

	private checkSH_Huanh() {
		let sf = this;
		let hander = Handler.create(sf, hd);
		function hd() {
			let m = GGlobal.modelSHJX;
			for (let i = 0; i < 4; i++) {
				let red = m.checkHuanXType(i + 1)
				GGlobal.reddot.setCondition(UIConst.SH_HUANX, i, red);
			}
			sf.notifyMsg(UIConst.SH_HUANX);
		}
		RenderManager.getInstance().add(hander, "ReddotNoticeController.checkSH_Huanh");
	}
	//背包
	private checkBagNotice() {
		let sf = this;
		sf.setCondition(UIConst.BAG, 0, Model_Bag.checkItemBagNotice());
		sf.setCondition(UIConst.BAG, 1, Model_Bag.checkEquipNotice());
		sf.notifyMsg(UIConst.BAG);
		sf.checkRongLian()
		sf.checkDecompose()
		sf.checkHechen()
		//sf.checkYanhuRedPoint();
	}

	//熔炼
	private checkRongLian() {
		let sf = this;
		sf.setCondition(UIConst.RONGLIAN, 0, Model_Bag.checkRongLing());
		sf.notifyMsg(UIConst.RONGLIAN);
	}
	//合成
	private checkHechen() {
		let sf = this;
		sf.setCondition(UIConst.RONGLIAN, 2, Model_RongLian.checkHeCheng());
		sf.notifyMsg(UIConst.RONGLIAN);
	}
	//分解
	private checkDecompose() {
		let sf = this;
		sf.setCondition(UIConst.RONGLIAN, 1, Model_RongLian.checkFenJie());
		sf.notifyMsg(UIConst.RONGLIAN);
	}

	private checkLiuChuQS() {
		let sf = this;
		sf.setCondition(UIConst.CHILD_LCQS, 0, GGlobal.model_LiuChuQS.checkRed());
		sf.notifyMsg(UIConst.CHILD_LCQS);
	}

	/**
	 * type：系统
	 * 索引 分页或者自定义的id
	 * 是否达到显示红点的条件
	*/
	public setCondition(systemID: number, index: number = 0, value: boolean = false): void {
		let t_key = systemID + "|" + index;
		this._reddotMap[t_key] = value;
		if (ReddotMgr.ins().checkIsRegistered(t_key))
			ReddotMgr.ins().setValue(t_key, ~~value);
	}

	public notifyMsg(systemID) {
		let sf = this;
		if (systemID == UIConst.TIANSHU) {
			sf.notify(ReddotEvent.CHECK_TIANSHU);//天书
		} else if (systemID == UIConst.DUANZAO_STRENG) {
			sf.notify(ReddotEvent.CHECK_DAUNZAO);//锻造
		} else if (systemID == UIConst.YIBAO) {
			sf.notify(ReddotEvent.CHECK_YIBAO);//异宝
		} else if (systemID == UIConst.ROLE) {
			sf.notify(ReddotEvent.CHECK_ROLE);//角色
		} else if (systemID == UIConst.BAOWU) {
			sf.notify(ReddotEvent.CHECK_BAOWU);//宝物
		} else if (systemID == UIConst.SHEN_JIAN) {
			sf.notify(ReddotEvent.CHECK_SHENJIAN);//神剑
		} else if (systemID == UIConst.MAIN_SKILL) {
			sf.notify(ReddotEvent.CHECK_SKILL);//技能
		} else if (systemID == UIConst.MAIN_SKILL_GOD) {
			sf.notify(ReddotEvent.CHECK_GOD_SKILL);//神技
		} else if (systemID == UIConst.JIANGHUN) {
			sf.notify(ReddotEvent.CHECK_JIANGHUN);//将魂
		} else if (systemID == UIConst.BINGFA) {
			sf.notify(ReddotEvent.CHECK_BINGFA);//兵法
		} else if (systemID == UIConst.TUJIAN) {
			sf.notify(ReddotEvent.CHECK_TUJIAN);//图鉴
		} else if (systemID == UIConst.XING_TU) {
			sf.notify(ReddotEvent.CHECK_XINGTU);//星图
		} else if (systemID == UIConst.LUNHUI) {
			sf.notify(ReddotEvent.CHECK_LUNHUI);//轮回
		} else if (systemID == UIConst.SHOP) {
			sf.notify(ReddotEvent.CHECK_SHOP);//商城
		} else if (systemID == UIConst.FUBEN_YJDQ) {
			sf.notify(ReddotEvent.CHECK_YJDQ);//一骑当千
		} else if (systemID == UIConst.RUNMAN) {
			sf.notify(ReddotEvent.CHECK_RUNMAN);//过关斩将
		} else if (systemID == UIConst.VIP) {
			sf.notify(ReddotEvent.CHECK_VIP);//vip
		} else if (systemID == UIConst.MAIL_PANEL) {
			sf.notify(ReddotEvent.CHECK_MAIL);//邮件
		} else if (systemID == UIConst.FUBEN_CAILIAO) {
			sf.notify(ReddotEvent.CHECK_FUBEN_CAILIAO);//材料副本
		} else if (systemID == UIConst.REBIRTH) {
			sf.notify(ReddotEvent.CHECK_REBIRTH);//转生
		} else if (systemID == UIConst.WU_JIANG) {
			sf.notify(ReddotEvent.CHECK_WU_JIANG);//武将
		} else if (systemID == UIConst.ZHAN_JIA) {
			sf.notify(ReddotEvent.CHECK_ZHAN_JIA);//战甲
		} else if (systemID == UIConst.NANZHENG_BEIZHAN) {
			sf.notify(ReddotEvent.CHECK_NZBZ);//南征北战
		} else if (systemID == UIConst.LING_LONG) {
			sf.notify(ReddotEvent.CHECK_LINGLONG);//玲珑阁
		} else if (systemID == UIConst.WUSHENGLIST) {
			sf.notify(ReddotEvent.CHECK_WUSHENGLIST);//武圣榜
		} else if (systemID == UIConst.PEACOCK) {
			sf.notify(ReddotEvent.CHECK_PEACOCK);//铜雀台
		} else if (systemID == UIConst.SEVENDAY_LOGIN) {
			sf.notify(ReddotEvent.CHECK_SEVENDAYLOGIN);//七天登录
		} else if (systemID == UIConst.HUODONG) {
			sf.notify(ReddotEvent.CHECK_HUODONG);//精彩活动
		} else if (systemID == UIConst.HUODONG_DAILY_GIFT
			|| systemID == UIConst.HUODONG_DAI_GIFT_KF
			|| systemID == UIConst.HUODONG_DAI_GIFT_ACT
			|| systemID == UIConst.HUODONG_DAILY_ONE
			|| systemID == UIConst.HUODONG_DAI_ONE_ACT
			|| systemID == UIConst.HUODONG_DAI_ONE_KF
			|| systemID == UIConst.HUODONG_ADD_RECHARGE
			|| systemID == UIConst.HUODONG_ADD_RECHARGESYS
			|| systemID == UIConst.HUODONG_DAILY_ADDUP
			|| systemID == UIConst.HUODONG_DAI_ADD_KF
			|| systemID == UIConst.HUODONG_DAI_ADD_ACT
			|| systemID == UIConst.HUODONG_SEVEN_KAIFU
			|| systemID == UIConst.HUODONG_SEVEN_ACT
			|| systemID == UIConst.HUODONG_SEVEN814
			|| systemID == UIConst.HUODONG_DAILY_GIFT814
			|| systemID == UIConst.HUODONG_DAILY_ONE814
			|| systemID == UIConst.HUODONG_ADD_RECHARGE814
			|| systemID == UIConst.HUODONG_DAILY_ADDUP814) {
			sf.notify(ReddotEvent.CHECK_HUODONG);//精彩活动-登录豪礼
		}
		else if (systemID == UIConst.HUOD_ONLY_DAILY_ONE
			|| systemID == UIConst.HUOD_ONLY_YBFL
			|| systemID == UIConst.HUOD_ONLY_ADD_RECHARGE
			|| systemID == UIConst.HUOD_ONLY_DBFanLi
			|| systemID == UIConst.HUOD_ONLY_SHOP) {
			sf.notify(UIConst.HUOD_ONLY);//专属活动
		} else if (systemID == UIConst.CROSS_KING) {
			sf.notify(ReddotEvent.CHECK_CROSS_KING);//乱世枭雄
		} else if (systemID == UIConst.CROSS_WARS) {
			sf.notify(ReddotEvent.CHECK_CROSS_WARS);//枭雄争霸
		} else if (systemID == UIConst.COUNTRY_DONATE) {
			sf.notify(ReddotEvent.CHECK_COUNTRY);//国家捐献
		} else if (systemID == UIConst.COUNTRY_KINGSHIP) {
			sf.notify(ReddotEvent.CHECK_COUNTRY);//国家王位之争
		} else if (systemID == UIConst.COUNTRY_BOSS) {
			sf.notify(ReddotEvent.CHECK_COUNTRY);//国家BOSS
		} else if (systemID == UIConst.COUNTRY_WELFARE) {
			sf.notify(ReddotEvent.CHECK_COUNTRY);
			sf.notify(UIConst.COUNTRY_WELFARE);////国家福利 
		} else if (systemID == UIConst.VIEWLVBUCOMEUP) {
			sf.notify(ReddotEvent.CHECK_LBCOMEUP);//吕布降临
		} else if (systemID == UIConst.SJMJ1) {
			sf.notify(ReddotEvent.CHECK_CROSS_SJMJ);//升阶秘境
		} else if (systemID == UIConst.BAZHENTU) {
			sf.notify(ReddotEvent.CHECK_BAZHENTU);//八阵图
		} else if (systemID == UIConst.DANBIFANLI) {//单笔返利
			sf.notify(UIConst.DANBIFANLI);
		} else if (systemID == UIConst.DENGLUSONGLI) {//登陆有礼
			sf.notify(UIConst.DENGLUSONGLI);
		} else if (systemID == UIConst.LEICHONGFANLI) {//累充返利
			sf.notify(UIConst.LEICHONGFANLI);
		} else if (systemID == UIConst.SHAOZHU) {
			GGlobal.control.notify(UIConst.SHAOZHU);
		} else if (systemID == UIConst.TAOYUANJIEYI || systemID == UIConst.TYJY_YMRW || systemID == UIConst.TYJY_YMFB) {
			sf.notify(UIConst.TAOYUANJIEYI);//桃园结义
		} else {
			let isNotify = false;
			if (GGlobal.isEnterGame) {
				let actIDArr = JSON.parse(ConfigHelp.getSystemDesc(7550));
				for (let i = 0; i < actIDArr.length; i++) {
					let actID = actIDArr[i][0]
					let actArr: Vo_Activity[];
					if (Config.xitong_001[actID].or == 1) {
						actArr = GGlobal.modelActivity.getGroup(actID);
					} else {
						actArr = ModelEightLock.getActivity(actID);
					}
					if (actArr) {
						for (let j = 0; j < actArr.length; j++) {
							const tempAct = actArr[j];
							if (tempAct.id == systemID) {
								isNotify = true;
								sf.notify(UIConst.ACTCOM);//新活动
								break;
							}
						}
					}
				}
			}
			if (!isNotify) {
				sf.notify(systemID);
			}
		}
	}
}