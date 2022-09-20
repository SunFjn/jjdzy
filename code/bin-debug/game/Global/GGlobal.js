var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GGlobal = (function () {
    function GGlobal() {
    }
    Object.defineProperty(GGlobal, "isIOS", {
        get: function () {
            if (GGlobal.sdk) {
                return GGlobal.loginArg.os == "ios" && GGlobal.modelGuanQia.curGuanQiaLv < Model_GlobalMsg.ios_open;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    GGlobal.initData = function () {
        //角色激活检测
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        // GGlobal.mapscene.enterScene(SceneCtrl.ARPG);
        GGlobal.modelXFFP.setup();
        GGlobal.modelXianding.setup();
        GGlobal.modelSGZL.setup();
        GGlobal.modelSGZL2.setup();
        GGlobal.modelQxzl.setup();
        GGlobal.modelQice.setup();
        GGlobal.modelXfyt.setup();
        GGlobal.modelBalloon.setup();
        GGlobal.modelAchievement.setup();
        GGlobal.modelCJS.setup();
        GGlobal.modelBzpt.setup();
        GGlobal.modelShop12.setup();
        GGlobal.modelKfwz.setup();
        GGlobal.modelLuckyEgg.setup();
        GGlobal.modelGGL.setup();
        GGlobal.modelLhfb.setup();
    };
    GGlobal.init = function () {
        var mainSp = GGlobal.main;
        GGlobal.layerMgr = new LayerManager();
        GGlobal.resMgr = new RESManager();
        GGlobal.socketMgr = new WebSocketMgr();
        GGlobal.control = new MsgCenter();
        GGlobal.reddot = new ReddotNoticeController();
        EffectMgr.instance = new EffectMgr();
        GGlobal.layerMgr.init(mainSp);
        GGlobal.initModel();
        GGlobal.registerUI();
        GGlobal.reddot.addEvent();
    };
    GGlobal.initModel = function () {
        var socketMgr = GGlobal.socketMgr;
        GGlobal.modelLogin = new ModelLogin();
        GGlobal.modelLogin.listenServ(socketMgr);
        GGlobal.modelPlayer = new Model_player();
        GGlobal.modelPlayer.listenServ(socketMgr);
        GGlobal.modelBag = new Model_Bag();
        GGlobal.modelBag.listenServ(socketMgr);
        GGlobal.modelGM = new Model_GM();
        GGlobal.modelGM.listenServ(socketMgr);
        GGlobal.modelMail = new Model_Mail();
        GGlobal.modelMail.listenServ(socketMgr);
        GGlobal.modelRL = new Model_RongLian();
        GGlobal.modelRL.listenServ(socketMgr);
        GGlobal.modelScene = new ModelScene();
        GGlobal.modelScene.listenServ(socketMgr);
        GGlobal.modelSkill = new Model_Skill();
        GGlobal.modelSkill.listenServ(socketMgr);
        GGlobal.modelDuanZao = new Model_DuanZao();
        GGlobal.modelDuanZao.listenServ(socketMgr);
        GGlobal.modelEquip = new Model_Equip();
        GGlobal.modelEquip.listenServ(GGlobal.socketMgr);
        GGlobal.modelGodEquip = new Model_GodEquip();
        GGlobal.modelGodEquip.listenServ(socketMgr);
        GGlobal.modelZhanJia = new Model_ZhanJia();
        GGlobal.modelZhanJia.listenServ(socketMgr);
        GGlobal.modelTuJian = new Model_TuJian();
        GGlobal.modelTuJian.listenServ(socketMgr);
        GGlobal.modelGuanQia = new ModelGuanQia();
        GGlobal.modelGuanQia.listenServ(GGlobal.socketMgr);
        GGlobal.modelGlobalMsg = new Model_GlobalMsg();
        GGlobal.modelGlobalMsg.listenServ(GGlobal.socketMgr);
        GGlobal.modelBoss = new Model_Boss();
        GGlobal.modelBoss.listenServ(GGlobal.socketMgr);
        GGlobal.modelguanxian = new Model_GuanXian();
        GGlobal.modelguanxian.listenServ(GGlobal.socketMgr);
        GGlobal.modelsl = new Model_ShouLing();
        GGlobal.modelsl.listenServ(GGlobal.socketMgr);
        GGlobal.modeltitle = new Model_Title();
        GGlobal.modeltitle.listenServ(GGlobal.socketMgr);
        GGlobal.modelbw = new Model_BaoWu();
        GGlobal.modelbw.listenServ(GGlobal.socketMgr);
        GGlobal.modelxt = new Model_XingTu();
        GGlobal.modelxt.listenServ(GGlobal.socketMgr);
        GGlobal.modelsj = new Model_ShenJian();
        GGlobal.modelsj.listenServ(GGlobal.socketMgr);
        GGlobal.modeljh = new Model_JiangHun();
        GGlobal.modeljh.listenServ(GGlobal.socketMgr);
        GGlobal.modeltianshu = new Model_TianShu();
        GGlobal.modeltianshu.listenServ(GGlobal.socketMgr);
        GGlobal.modelWuJiang = new Model_WuJiang();
        GGlobal.modelWuJiang.listenServ(GGlobal.socketMgr);
        GGlobal.modelBingFa = new Model_BingFa();
        GGlobal.modelBingFa.listenServ(GGlobal.socketMgr);
        GGlobal.modelshop = new Model_Shop();
        GGlobal.modelshop.listenServ(GGlobal.socketMgr);
        GGlobal.modelYiBao = new Model_YiBao();
        GGlobal.modelYiBao.listenServ(GGlobal.socketMgr);
        GGlobal.modelSetting = new Model_Setting();
        GGlobal.modelSetting.listenServ(GGlobal.socketMgr);
        GGlobal.modeltask = new Model_Task();
        GGlobal.modeltask.listenServ(GGlobal.socketMgr);
        GGlobal.modelyjdq = new Model_YJDQ();
        GGlobal.modelyjdq.listenServ(GGlobal.socketMgr);
        GGlobal.modelPeacock = new Model_Peacock();
        GGlobal.modelPeacock.listenServ(GGlobal.socketMgr);
        GGlobal.modelcailiao = new Model_CaiLiao();
        GGlobal.modelcailiao.listenServ(GGlobal.socketMgr);
        GGlobal.modelCountry = new Model_Country();
        GGlobal.modelCountry.listenServ(GGlobal.socketMgr);
        GGlobal.modelCouSkill = new Model_CountrySkill();
        GGlobal.modelCouSkill.listenServ(GGlobal.socketMgr);
        GGlobal.modelRank = new Model_Rank();
        GGlobal.modelRank.listenServ(GGlobal.socketMgr);
        GGlobal.modelnzbz = new Model_NZBZ();
        GGlobal.modelnzbz.listenServ(GGlobal.socketMgr);
        GGlobal.modelRunMan = new Model_RunMan();
        GGlobal.modelRunMan.listenServ(GGlobal.socketMgr);
        GGlobal.modelsgzs = new Model_SGZS();
        GGlobal.modelsgzs.listenServ(GGlobal.socketMgr);
        GGlobal.modelKingship = new Model_Kingship();
        GGlobal.modelKingship.listenServ(GGlobal.socketMgr);
        GGlobal.modelWorldNet = new Model_WorldNet();
        GGlobal.modelWorldNet.listenServ(GGlobal.socketMgr);
        GGlobal.modelddfh = new Model_DDFH();
        GGlobal.modelddfh.listenServ(GGlobal.socketMgr);
        GGlobal.modelCrossKing = new Model_CrossKing();
        GGlobal.modelCrossKing.listenServ(GGlobal.socketMgr);
        GGlobal.modelCrossWars = new Model_CrossWars();
        GGlobal.modelCrossWars.listenServ(GGlobal.socketMgr);
        GGlobal.modelRecharge = new Model_Recharge();
        GGlobal.modelRecharge.listenServ(GGlobal.socketMgr);
        GGlobal.modelchongzhi = new ModelChongZhi();
        GGlobal.modelchongzhi.listenServ(GGlobal.socketMgr);
        GGlobal.modelvip = new ModelVip();
        GGlobal.modelvip.listenServ(GGlobal.socketMgr);
        GGlobal.modelsgws = new Model_SGWS();
        GGlobal.modelsgws.listenServ(GGlobal.socketMgr);
        GGlobal.modelwelfare = new Model_Welfare();
        GGlobal.modelwelfare.listenServ(GGlobal.socketMgr);
        GGlobal.modelsevent = new Model_SevenDayLogin();
        GGlobal.modelsevent.listenServ(GGlobal.socketMgr);
        GGlobal.modeljinsheng = new Model_JinSheng();
        GGlobal.modeljinsheng.listenServ(GGlobal.socketMgr);
        GGlobal.modelPreview = new Model_FunctionPreview();
        GGlobal.modelPreview.listenServ(GGlobal.socketMgr);
        GGlobal.modelWuSheng = new Model_WuShengList();
        GGlobal.modelWuSheng.listenServ(GGlobal.socketMgr);
        GGlobal.modelBaoKu = new Model_BaoKu();
        GGlobal.modelBaoKu.listenServ(GGlobal.socketMgr);
        GGlobal.modelLingLong = new Model_LingLong();
        GGlobal.modelLingLong.listenServ(GGlobal.socketMgr);
        GGlobal.modelJBP = new ModelJBP();
        GGlobal.modelJBP.listenServ(GGlobal.socketMgr);
        GGlobal.modelActivityHall = new Model_ActivityHall();
        GGlobal.modelActivityHall.listenServ(GGlobal.socketMgr);
        GGlobal.modelchat = new Model_Chat();
        GGlobal.modelchat.listenServ(GGlobal.socketMgr);
        GGlobal.model_QunYingBang = new Model_QunYingBang();
        GGlobal.model_QunYingBang.listenServ(GGlobal.socketMgr);
        GGlobal.model_KaiFKH = new Model_KaiFKH();
        GGlobal.model_KaiFKH.listenServ(GGlobal.socketMgr);
        GGlobal.modelHuoDong = new Model_HuoDong();
        GGlobal.modelHuoDong.listenServ(GGlobal.socketMgr);
        GGlobal.modelHuoD814 = new Model_HuoD814();
        GGlobal.modelHuoD814.listenServ(GGlobal.socketMgr);
        GGlobal.modelHuoDOnly = new Model_HuoDOnly();
        GGlobal.modelHuoDOnly.listenServ(GGlobal.socketMgr);
        GGlobal.modelActivity = new Model_Activity();
        GGlobal.modelActivity.listenServ(GGlobal.socketMgr);
        GGlobal.modelCZFL = new Model_ChaoZhiFL();
        GGlobal.modelCZFL.listenServ(GGlobal.socketMgr);
        GGlobal.modelqmkh = new Model_QuanMinKH();
        GGlobal.modelqmkh.listenServ(GGlobal.socketMgr);
        GGlobal.modelShare = new ModelShare();
        GGlobal.modelShare.listenServ(GGlobal.socketMgr);
        GGlobal.modelLvBuCompup = new ModelLvBuComeUp();
        GGlobal.modelLvBuCompup.listenServ(GGlobal.socketMgr);
        GGlobal.modelWarToDead = new ModelWarToDead();
        GGlobal.modelWarToDead.listenServ(GGlobal.socketMgr);
        GGlobal.modelGroupBuy = new Model_GroupBuy();
        GGlobal.modelGroupBuy.listenServ(GGlobal.socketMgr);
        GGlobal.modelGroupB814 = new Model_GroupB814();
        GGlobal.modelGroupB814.listenServ(GGlobal.socketMgr);
        GGlobal.modelLXXF = new ModelLXXF();
        GGlobal.modelLXXF.listenServ(GGlobal.socketMgr);
        GGlobal.modelLXX814 = new ModelLXX814();
        GGlobal.modelLXX814.listenServ(GGlobal.socketMgr);
        GGlobal.modelCtryBoss = new ModelCtryBoss();
        GGlobal.modelCtryBoss.listenServ(GGlobal.socketMgr);
        GGlobal.modelCrossTeam = new Model_CrossTeam();
        GGlobal.modelCrossTeam.listenServ(GGlobal.socketMgr);
        GGlobal.modelCrossMineral = new Model_CrossMineral();
        GGlobal.modelCrossMineral.listenServ(GGlobal.socketMgr);
        GGlobal.modelZhiGou = new Model_ZhiGou();
        GGlobal.modelZhiGou.listenServ(GGlobal.socketMgr);
        GGlobal.modelBySys = new Model_BySys();
        GGlobal.modelBySys.listenServ(GGlobal.socketMgr);
        GGlobal.modelSJMJ = new ModelShengJieMJ();
        GGlobal.modelSJMJ.listenServ(GGlobal.socketMgr);
        GGlobal.modelFengHuoLY = new ModelFengHuoLY();
        GGlobal.modelFengHuoLY.listenServ(GGlobal.socketMgr);
        GGlobal.modelbwXianShi = new Model_bwXianShi();
        GGlobal.modelbwXianShi.listenServ(GGlobal.socketMgr);
        GGlobal.modelbattle = new Model_battle();
        GGlobal.modelbattle.listenServ(GGlobal.socketMgr);
        GGlobal.modelactPreView = new ModelActPreView();
        GGlobal.modelactPreView.listenServ(GGlobal.socketMgr);
        GGlobal.modelSGQD = new ModelSGQD();
        GGlobal.modelSGQD.listenServ(GGlobal.socketMgr);
        GGlobal.modelChuangGuanYL = new ModelChuangGuanYL();
        GGlobal.modelChuangGuanYL.listenServ(GGlobal.socketMgr);
        GGlobal.modelLCHK = new ModelLCHK();
        GGlobal.modelLCHK.listenServ(GGlobal.socketMgr);
        GGlobal.modelEightLock = new ModelEightLock();
        GGlobal.modelEightLock.listenServ(GGlobal.socketMgr);
        GGlobal.modelWenDingTX = new ModelWenDingTX();
        GGlobal.modelWenDingTX.listenServ(GGlobal.socketMgr);
        GGlobal.modelBaZhenTu = new Model_BaZhenTu();
        GGlobal.modelBaZhenTu.listenServ(GGlobal.socketMgr);
        GGlobal.modelZhenYan = new Model_ZhenYan();
        GGlobal.modelZhenYan.listenServ(GGlobal.socketMgr);
        GGlobal.modelZJYW = new ModelZJYW();
        GGlobal.modelZJYW.listenServ(GGlobal.socketMgr);
        GGlobal.modelShaoZhu = new Model_ShaoZhu();
        GGlobal.modelShaoZhu.listenServ(GGlobal.socketMgr);
        GGlobal.modelBossZc = new Model_BossZC();
        GGlobal.modelBossZc.listenServ(GGlobal.socketMgr);
        GGlobal.modelSHJX = new ModelSH();
        GGlobal.modelSHJX.listenServ(GGlobal.socketMgr);
        GGlobal.modelActHolyB = new Model_ActHolyBeast();
        GGlobal.modelActHolyB.listenServ(GGlobal.socketMgr);
        GGlobal.modelTrueName = new Model_TrueName();
        GGlobal.modelTrueName.listenServ(GGlobal.socketMgr);
        GGlobal.modeljx = new Model_JueXing();
        GGlobal.modeljx.listenServ(GGlobal.socketMgr);
        GGlobal.modelShaoZhuAct = new ModelShaoZhuAct();
        GGlobal.modelShaoZhuAct.listenServ(GGlobal.socketMgr);
        GGlobal.modelShaoZhuEscort = new Model_ShaoZhuEscort();
        GGlobal.modelShaoZhuEscort.listenServ(GGlobal.socketMgr);
        GGlobal.modelXFFP = new ModelXFFP();
        GGlobal.modelXFFP.listenServ(GGlobal.socketMgr);
        GGlobal.modelXfyt = new ModelXfyt();
        GGlobal.modelXfyt.listenServ(GGlobal.socketMgr);
        GGlobal.modelXyfq = new ModelXyfq();
        GGlobal.modelXyfq.listenServ(GGlobal.socketMgr);
        GGlobal.modelBalloon = new ModelBalloon();
        GGlobal.modelBalloon.listenServ(GGlobal.socketMgr);
        GGlobal.modelXianding = new ModelXianding();
        GGlobal.modelXianding.listenServ(GGlobal.socketMgr);
        GGlobal.modelSGZL = new ModelSGZL();
        GGlobal.modelSGZL.listenServ(GGlobal.socketMgr);
        GGlobal.modelSGZL2 = new ModelSGZL2();
        GGlobal.modelSGZL2.listenServ(GGlobal.socketMgr);
        GGlobal.modelBzpt = new ModelBzpt();
        GGlobal.modelBzpt.listenServ(GGlobal.socketMgr);
        GGlobal.modelShop12 = new ModelShop12();
        GGlobal.modelShop12.listenServ(GGlobal.socketMgr);
        GGlobal.modelQxzl = new ModelQxzl();
        GGlobal.modelQxzl.listenServ(GGlobal.socketMgr);
        GGlobal.modelQice = new ModelQice();
        GGlobal.modelQice.listenServ(GGlobal.socketMgr);
        GGlobal.modelAchievement = new ModelAchievement();
        GGlobal.modelAchievement.listenServ(GGlobal.socketMgr);
        GGlobal.modelCJS = new ModelCJS();
        GGlobal.modelCJS.listenServ(GGlobal.socketMgr);
        GGlobal.modelKfwz = new ModelKfwz();
        GGlobal.modelKfwz.listenServ(GGlobal.socketMgr);
        GGlobal.modelLuckyEgg = new ModelLuckyEgg();
        GGlobal.modelLuckyEgg.listenServ(GGlobal.socketMgr);
        GGlobal.modelGGL = new ModelGGL();
        GGlobal.modelGGL.listenServ(GGlobal.socketMgr);
        GGlobal.modelSHXunbao = new Model_SHXunBao();
        GGlobal.modelSHXunbao.listenServ(GGlobal.socketMgr);
        GGlobal.modelSZQiYuan = new Model_SZQiYuan();
        GGlobal.modelSZQiYuan.listenServ(GGlobal.socketMgr);
        GGlobal.modelSanGuoYT = new Model_SanGuoYiTong();
        GGlobal.modelSanGuoYT.listenServ(GGlobal.socketMgr);
        GGlobal.modelGuanQiaHelp = new ModelGuanQiaHelp();
        GGlobal.modelGuanQiaHelp.listenServ(GGlobal.socketMgr);
        GGlobal.modellh = new Model_LunHui();
        GGlobal.modellh.listenServ(GGlobal.socketMgr);
        GGlobal.modelGodWeapon = new Model_ZSGodWeapon();
        GGlobal.modelGodWeapon.listenServ(GGlobal.socketMgr);
        GGlobal.model_HSCB = new Model_HSCB();
        GGlobal.model_HSCB.listenServ(GGlobal.socketMgr);
        GGlobal.model_LiuChuQS = new Model_LiuChuQS();
        GGlobal.model_LiuChuQS.listenServ(GGlobal.socketMgr);
        GGlobal.modelLhfb = new ModelLhfb();
        GGlobal.modelLhfb.listenServ(GGlobal.socketMgr);
        GGlobal.model_Syzlb = new Model_Syzlb();
        GGlobal.model_Syzlb.listenServ(GGlobal.socketMgr);
        GGlobal.model_XuTian = new Model_XuTian();
        GGlobal.model_XuTian.listenServ(GGlobal.socketMgr);
        GGlobal.modelYiShouLu = new Model_YiShouLu();
        GGlobal.modelYiShouLu.listenServ(GGlobal.socketMgr);
        GGlobal.modelCaoCao = new Model_CaoCaoCome();
        GGlobal.modelCaoCao.listenServ(GGlobal.socketMgr);
        GGlobal.model_actCom = new Model_ActCom();
        GGlobal.model_actCom.listenServ(GGlobal.socketMgr);
        GGlobal.modelVipDiscount = new Model_VipDiscount();
        GGlobal.modelVipDiscount.listenServ(GGlobal.socketMgr);
        GGlobal.modelsgbz = new Model_CountryTreasure();
        GGlobal.modelsgbz.listenServ(GGlobal.socketMgr);
        GGlobal.modelczph = new Model_ConsumeRankAct();
        GGlobal.modelczph.listenServ(GGlobal.socketMgr);
        GGlobal.modelxsxs = new Model_SearchAnimals();
        GGlobal.modelxsxs.listenServ(GGlobal.socketMgr);
        GGlobal.modelLoginGift = new Model_LoginYouJiang();
        GGlobal.modelLoginGift.listenServ(GGlobal.socketMgr);
        GGlobal.modelWanShouZhiWang = new Model_WanShouZhiWang();
        GGlobal.modelWanShouZhiWang.listenServ(GGlobal.socketMgr);
        GGlobal.modelYSSL = new ModelYSSL();
        GGlobal.modelYSSL.listenServ(GGlobal.socketMgr);
        GGlobal.modelTigerPass = new Model_TigerPass();
        GGlobal.modelTigerPass.listenServ(GGlobal.socketMgr);
        GGlobal.modelTalent = new Model_Talent();
        GGlobal.modelTalent.listenServ(GGlobal.socketMgr);
        GGlobal.modelxfzd = new Model_ConsumeSmashEgg();
        GGlobal.modelxfzd.listenServ(GGlobal.socketMgr);
        GGlobal.modelActTalent = new Model_ActTalent();
        GGlobal.modelActTalent.listenServ(GGlobal.socketMgr);
        GGlobal.modelYiShouBOSS = new ModelYiShouBOSS();
        GGlobal.modelYiShouBOSS.listenServ(GGlobal.socketMgr);
        ModelArpgMap.getInstance();
        GGlobal.modelhfsc = new Model_HFSC();
        GGlobal.modelhfsc.listenServ(GGlobal.socketMgr);
        GGlobal.modelzfzj = new Model_ZFZJ();
        GGlobal.modelzfzj.listenServ(GGlobal.socketMgr);
        GGlobal.modelsjxs = new Model_SJXS();
        GGlobal.modelsjxs.listenServ(GGlobal.socketMgr);
        GGlobal.modelGodWuJiang = new ModelGodWuJiang();
        GGlobal.modelGodWuJiang.listenServ(GGlobal.socketMgr);
        GGlobal.modelWishTree = new Model_WishTree();
        GGlobal.modelWishTree.listenServ(GGlobal.socketMgr);
        GGlobal.modelLiangCao = new ModelLiangCao();
        GGlobal.modelLiangCao.listenServ(GGlobal.socketMgr);
        GGlobal.model_ZTXF = new Model_ZTXL();
        GGlobal.model_ZTXF.listenServ(GGlobal.socketMgr);
        GGlobal.model_TYJY = new Model_TYJY();
        GGlobal.model_TYJY.listenServ(GGlobal.socketMgr);
        GGlobal.modelkfsl = new Model_CrossShiLian();
        GGlobal.modelkfsl.listenServ(GGlobal.socketMgr);
        GGlobal.model_LuckTurn = new Model_LuckTurn();
        GGlobal.model_LuckTurn.listenServ(GGlobal.socketMgr);
        GGlobal.model_limitGift = new Model_LimitGift();
        GGlobal.model_limitGift.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActQFXF = new Model_ActQFXF();
        GGlobal.model_ActQFXF.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActLJFL = new Model_ActComLJFL();
        GGlobal.model_ActLJFL.listenServ(GGlobal.socketMgr);
        GGlobal.modelCaiShenSongLli = new Model_CaiShenSongLi();
        GGlobal.modelCaiShenSongLli.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActJRSC = new Model_ActComJRSC();
        GGlobal.model_ActJRSC.listenServ(GGlobal.socketMgr);
        GGlobal.model_LiuYi = new Model_LiuYi();
        GGlobal.model_LiuYi.listenServ(GGlobal.socketMgr);
        GGlobal.modelzssf = new Model_ZSSF();
        GGlobal.modelzssf.listenServ(GGlobal.socketMgr);
        GGlobal.model_QianNeng = new Model_QianNeng();
        GGlobal.model_QianNeng.listenServ(GGlobal.socketMgr);
        GGlobal.modelHouseKeeper = new Model_HouseKeeper();
        GGlobal.modelHouseKeeper.listenServ(GGlobal.socketMgr);
        GGlobal.homemodel = new HomeModel();
        GGlobal.homemodel.listenServ(GGlobal.socketMgr);
        GGlobal.model_Horse = new Model_Horse();
        GGlobal.model_Horse.listenServ(GGlobal.socketMgr);
        GGlobal.model_DDL = new Model_ActComDDL();
        GGlobal.model_DDL.listenServ(GGlobal.socketMgr);
        GGlobal.model_TJHB = new Model_ActComTJHB();
        GGlobal.model_TJHB.listenServ(GGlobal.socketMgr);
        GGlobal.modelJSSC = new Model_GoldenMouse();
        GGlobal.modelJSSC.listenServ(GGlobal.socketMgr);
        GGlobal.modelYanHui = new Model_YanHui();
        GGlobal.modelYanHui.listenServ(GGlobal.socketMgr);
        GGlobal.model_HomeMaid = new Model_HomeMaid();
        GGlobal.model_HomeMaid.listenServ(GGlobal.socketMgr);
        GGlobal.model_HomeTask = new Model_HomeTask();
        GGlobal.model_HomeTask.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActNianShou = new Model_ActNianShou();
        GGlobal.model_ActNianShou.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActLeiTai = new Model_ActLeiTai();
        GGlobal.model_ActLeiTai.listenServ(GGlobal.socketMgr);
        GGlobal.modelyuanxiao = new Model_YuanXiaoLocal();
        GGlobal.modelyuanxiao.listenServ(GGlobal.socketMgr);
        GGlobal.modelHB = new Model_HongBao();
        GGlobal.modelHB.listenServ(GGlobal.socketMgr);
        GGlobal.modelSuperMarbles = new ModelSuperMarbles();
        GGlobal.modelSuperMarbles.listenServ(GGlobal.socketMgr);
        GGlobal.modelgcbz = new Model_GCBZ();
        GGlobal.modelgcbz.listenServ(GGlobal.socketMgr);
        GGlobal.modelDengFengZJ = new Model_DengFengZJ();
        GGlobal.modelDengFengZJ.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActPXSB = new Model_ActComPXSB();
        GGlobal.model_ActPXSB.listenServ(GGlobal.socketMgr);
        GGlobal.model_ActWMSZ = new Model_ActComWMSZ();
        GGlobal.model_ActWMSZ.listenServ(GGlobal.socketMgr);
        GGlobal.modelWarOrder = new Model_WarOrderAct();
        GGlobal.modelWarOrder.listenServ(GGlobal.socketMgr);
        GGlobal.modelBT = new ModelBT();
        GGlobal.modelBT.listenServ(GGlobal.socketMgr);
    };
    //----------model
    GGlobal.registerUI = function () {
        var global = GGlobal;
        var layerManager = global.layerMgr;
        var uiconst = UIConst;
        layerManager.register(uiconst.ARPG_SCENEVIEW, ViewArpgSceneChange, null, layerManager.UI_Popup);
        layerManager.register(uiconst.COMMONWARN, ViewCommonWarn, null, layerManager.UI_OFFLINE);
        layerManager.register(uiconst.BROADCASTITEMTEXT, ViewBroadcastItemText, null, layerManager.UI_Message);
        layerManager.register(uiconst.COMMON_PROMPT, ViewCommonPrompt, null, layerManager.UI_Message);
        layerManager.register(uiconst.MAIL_PANEL, View_Mail_Panel);
        layerManager.register(uiconst.MAIL_CONTENT, View_Mail_Content, null, layerManager.UI_Popup);
        layerManager.register(uiconst.BAG, ViewBagPanel);
        layerManager.register(uiconst.GM, ViewGmPanel);
        layerManager.register(uiconst.GM_PROTOCOL, ViewGMProtocolPanel);
        layerManager.register(uiconst.MAIN_SKILL, View_Skill_Panel);
        layerManager.register(uiconst.MAIN_SKILL_GOD, View_Skill_Panel, 1);
        layerManager.register(uiconst.GODSKILL_ZHENYAN, Tip_Skill_ZhenYan, null, layerManager.UI_Popup);
        layerManager.register(uiconst.RONGLIAN, ViewRongLianPanel);
        layerManager.register(uiconst.RONGLIAN_SUCCESS, ViewRongLianSuccess, null, layerManager.UI_Popup);
        layerManager.register(uiconst.RONGLIAN_FENJIE, ViewRongLianPanel, 1);
        layerManager.register(uiconst.RONGLIAN_HC, ViewRongLianPanel, 2);
        layerManager.register(uiconst.DUANZAO_STRENG, View_DuanZao_Panel);
        layerManager.register(uiconst.DUANZAO_STONE, View_DuanZao_Panel, 1);
        layerManager.register(uiconst.DUANZAO_STAR, View_DuanZao_Panel, 2);
        layerManager.register(uiconst.DUANZAO_ZHUHUN, View_DuanZao_Panel, 3);
        layerManager.register(uiconst.DUANZAO_STRENG_SUIT, View_DuanZao_StrengSuit, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DUANZAO_STONE_BAG, View_Stone_Bag, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DUANZAO_STONE_SUIT, View_DuanZao_StoneSuit, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DUANZAO_ZHUHUN_SHIHUN, View_ShiHun_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DUANZAO_STAR_SUIT, View_DuanZao_StarSuit, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DUANZAO_STAR_PERFECT, View_PerUpStar_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ROLE, ViewRolePanel, 0);
        layerManager.register(uiconst.GOD_EQUIP, ViewRolePanel, 2);
        layerManager.register(uiconst.GOD_EQUIP_SUIT, ViewGodSuit, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIP_REBIRTH_LOOK, TipRebirthLook, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VIEW_REBIRTH_DS, View_Rebirth_DS, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIP_REBIRTH_EQUIP, TipRebirthEquip, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZHAN_JIA, ViewZhanJiaPanel, 0);
        layerManager.register(uiconst.ZHAN_JIA_JIE, ViewZhanJiaPanel, 1);
        layerManager.register(uiconst.ZHAN_JIA_SUIT, ViewZhanJiaPanel, 2);
        layerManager.register(uiconst.ZHAN_JIA_SKILL, TipZhanJiaSkill, null, layerManager.UI_Popup);
        layerManager.register(uiconst.BY_SYS_TIP_SKILL, ViewSysTipSkill, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TUJIAN, View_TuJian_Panel);
        // layerManager.register(uiconst.TUJIAN_UPGRADE, View_TuJianUp_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TUJIAN_UPSTAR, View_TuJianUpStar_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TUJIAN_SUIT, View_TuJianSuit_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ALERT, ViewAlert, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ALERT_BUY, ViewAlertBuy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ALERT_BUY2, ViewAlertBuy2, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GUANQIABOSSUI, ViewGQBossUI); //关卡BOSS入口大面板
        layerManager.register(uiconst.GUANQIAOFFLINEINCOM, ViewOfflineAwards, null, layerManager.UI_Popup); //离线收益
        layerManager.register(uiconst.BOSSANI, GuanQiaBossAni, null, layerManager.UI_MainBottom); //BOSS入场
        layerManager.register(uiconst.BOSSAPPEAR, ViewBossAppear); //BOOS出现！！！
        layerManager.register(uiconst.BATTLEFAULT, ViewBattleFault, null, layerManager.UI_Popup); //战斗失败
        layerManager.register(uiconst.BATTLEWIN, ViewFightWin, null, layerManager.UI_Popup); //胜利结算
        layerManager.register(uiconst.GUANQIABOSSENTRY, ViewGuanQiaBossEntry, null, layerManager.UI_MainLowBottom); //关卡入口(主场景右下角)
        layerManager.register(uiconst.QIANRENZHAN, ViewQianRenZhan, null, layerManager.UI_Popup); //千人斩界面
        layerManager.register(uiconst.NEWSKILL, ViewNewSkill, null, layerManager.UI_Popup); //新技能开放
        layerManager.register(uiconst.GUANQIARNK, ViewGuanQiaRnk, null, layerManager.UI_Popup); //关卡排行榜
        layerManager.register(uiconst.GUANQIASWEEPING, ViewGuanQiaSweeping, null, layerManager.UI_Popup); //扫荡
        layerManager.register(uiconst.GQBOSSTIPS, ViewGuanQiaTips, null, layerManager.UI_Popup); //关卡BOSS收益面板
        layerManager.register(uiconst.REBIRTH, ViewRolePanel, 1); //转生
        layerManager.register(uiconst.TITLE, ViewRolePanel, 3); //称号
        // layerManager.register(uiconst.TIANSHU, View_Skill_Panel, 3);//天书
        layerManager.register(uiconst.TIANSHU, View_TianShu_Panel); //天书
        layerManager.register(uiconst.TIANSHULEVEL, View_TianShu_Panel, 1); //天书升阶
        layerManager.register(uiconst.TIANSHUDRAG, ViewTianShuTunShi, null, layerManager.UI_Popup); //天书属性丹
        // layerManager.register(uiconst.SHOULING, View_ShouLing_Panel, null, layerManager.UI_Popup);//兽灵
        layerManager.register(uiconst.ZHISHENGDAN, ViewZSD, null, layerManager.UI_Popup); //直升丹
        // layerManager.register(uiconst.BAOWU, View_Skill_Panel, 2);//宝物
        layerManager.register(uiconst.BAOWU, View_BaoWu_Panel); //宝物
        layerManager.register(uiconst.BAOWU_SJ, View_BaoWu_Panel, 1); //宝物
        layerManager.register(uiconst.BAOWU_JIB, View_BaoWu_Panel, 2); //宝物羁绊
        layerManager.register(uiconst.BAOWU_DRUG, View_BaoWu_Drug, null, layerManager.UI_Popup); //宝物属性丹
        layerManager.register(uiconst.BAOWU_LEVELUP, ViewBaoWuLevelUp, null, layerManager.UI_Popup); //宝物属性丹
        layerManager.register(uiconst.BAOWU_EQUIP, View_BaowWu_Use, null, layerManager.UI_Popup); //宝物属性丹
        layerManager.register(uiconst.BAOWU_GETTIPS, VTipBWJiHuo, null, layerManager.UI_OFFLINE); //宝物、神剑等可激活的提示(off_line最高层)
        layerManager.register(uiconst.XING_TU, View_Skill_Panel, 2); //星图
        layerManager.register(uiconst.LUNHUI, View_LunHui_Panel, 0); //轮回
        layerManager.register(uiconst.SHEN_JIAN, View_ShenJian_Panel); //神剑
        layerManager.register(uiconst.SHEN_JIAN_SJ, View_ShenJian_Panel, 1); //神剑升阶 
        layerManager.register(uiconst.SHEN_JIAN_DRUG, View_ShenJian_Drug, null, layerManager.UI_Popup); //神剑属性丹
        layerManager.register(uiconst.JIANGHUN, View_JiangHun_Panel); //将魂
        layerManager.register(uiconst.JIANGHUN_SUIT, View_JiangHun_Suit, null, layerManager.UI_Popup); //将魂套装
        layerManager.register(uiconst.JIANGHUN_UP, View_JiangHun_UpgradePanel, null, layerManager.UI_Popup); //将魂升级
        layerManager.register(uiconst.WUJIANGZHILI, WuJiangZhiLiMainView, 0, layerManager.UI_Popup); //武将之力
        layerManager.register(uiconst.WUJIANGZHILI_SKILL, WuJiangZhiLiMainView, 1, layerManager.UI_Popup); //武将之力 - 技能进阶
        layerManager.register(uiconst.WU_JIANG, ViewWuJiangPanel); //武将
        layerManager.register(uiconst.WU_JIANG_JIE, ViewWuJiangPanel, 1); //武将
        layerManager.register(uiconst.WU_JIANG_JYIN, ViewWuJiangPanel, 3); //武将
        layerManager.register(uiconst.WU_JIANG_JIB, ViewWuJiangPanel, 2); //武将
        layerManager.register(uiconst.GOD_WUJIANG, ViewWuJiangPanel, 20); //神将
        layerManager.register(uiconst.GOD_WUJIANG_XL, ViewWuJiangPanel, 21); //神将修炼
        layerManager.register(uiconst.ZS_GODWEAPON, ViewWuJiangPanel, 10); //专属神兵
        layerManager.register(uiconst.ZS_GODWEAPON_CL, ViewWuJiangPanel, 11); //专属神兵 淬炼
        layerManager.register(uiconst.ZS_GODWEAPON_DUANZAO, ViewWuJiangPanel, 12); //专属神兵 打造
        layerManager.register(uiconst.WU_JIANG_SZ, ViewWuJShiZPanel); //武将时装
        layerManager.register(uiconst.WU_JIANG_GETTIPS, View_NewWuJiang, null, layerManager.UI_Popup); //获取新武将
        layerManager.register(uiconst.WU_JIANG_SKILL, TipWuJiangSkill, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GUANXIAN, ViewRebirthPanel, 1); //官衔
        layerManager.register(uiconst.BINGFA, ViewBingFa); //兵法
        layerManager.register(uiconst.BINGFA_SJ, ViewBingFa, 1); //兵法升阶
        layerManager.register(uiconst.BINGFA_JIB, ViewBingFa, 2); //兵法羁绊
        layerManager.register(uiconst.BINGFA_DRUG, ViewBingFaDrug, null, layerManager.UI_Popup); //兵法属性丹
        layerManager.register(uiconst.ROLESHUXING, ViewShuXing, null, layerManager.UI_Popup); //属性
        layerManager.register(uiconst.SHOP, View_Shop_Panel); //商城
        layerManager.register(uiconst.SHOP_SW, View_Shop_Panel, 3); //商城
        layerManager.register(uiconst.SHOP_SM, View_Shop_Panel, 2); //商城
        layerManager.register(uiconst.BOSSZC_SHOP, View_Shop_Panel, 5); //商城
        layerManager.register(uiconst.YIBAO, View_YB_Panel); //异宝
        layerManager.register(uiconst.YIBAO_SJ, View_YB_Panel, 1); //异宝
        layerManager.register(uiconst.YIBAO_DRUG, View_YB_Drug, null, layerManager.UI_Popup); //异宝属性丹
        layerManager.register(uiconst.SETTING, ViewSettingPanel, null, layerManager.UI_Popup); //设置
        layerManager.register(uiconst.MAINTOWN, ViewMainTown, null, layerManager.UI_floorUI); //设置
        layerManager.register(uiconst.FUBEN, View_FuBen_Panel); //副本
        layerManager.register(uiconst.FUBEN_YJDQ, View_FuBen_Panel, 2); //副本
        layerManager.register(uiconst.PEACOCK, View_FuBen_Panel, 0); //铜雀台
        layerManager.register(uiconst.FUBEN_CAILIAO, View_FuBen_Panel, 1); //副本
        layerManager.register(uiconst.RUNMAN, View_FuBen_Panel, 3); //过关斩将
        layerManager.register(uiconst.FUBEN_YJDQ, View_FuBen_Panel, 2); //副本
        layerManager.register(uiconst.FUBEN_YJDQ_PROMPT, View_YJDQ_Prompt, null, layerManager.UI_floorUI); //一骑当千波数显示
        layerManager.register(uiconst.FUBEN_YJDQ_REWARD, View_YJDQ_Reward, null, layerManager.UI_floorUI); //一骑当千奖励展示
        layerManager.register(uiconst.FUBEN_YJDQ_WIN, View_YJDQ_Fight, null, layerManager.UI_Popup); //一骑当千胜利失败
        layerManager.register(uiconst.FUBEN_YJDQ_RANK, View_YJDQ_Rank, null, layerManager.UI_Popup); //一骑当千排名
        layerManager.register(uiconst.FUBEN_YJDQ_REWARDSHOW, View_YJDQ_RewardShow, null, layerManager.UI_Popup); //一骑当千奖励展示
        layerManager.register(uiconst.FUBEN_YJDQ_WAVE, View_YJDQ_WaveName, null, layerManager.UI_MainLowBottom); //一骑当千波数
        layerManager.register(uiconst.FUBEN_RUNMAN_RES, ViewRunManBattleRes, null, layerManager.UI_Popup); //过关斩将 战斗胜利结算
        layerManager.register(uiconst.FUBEN_RUNMAN_MOP, ViewRunManMopping, null, layerManager.UI_Popup); //过关斩将 扫荡
        layerManager.register(uiconst.BOSS, ViewBoss); //BOSS
        layerManager.register(uiconst.OFFLINE, ViewOffLine, null, layerManager.UI_OFFLINE); //掉线重连
        layerManager.register(uiconst.OFFLINE1, ViewOffLine1, null, layerManager.UI_OFFLINE); //掉线重连
        layerManager.register(uiconst.COUNTRY, ViewCountryPanel); //国家
        layerManager.register(uiconst.COUNTRY_SELECT, ViewCouSelectPanel); //国家选择
        layerManager.register(uiconst.COUNTRY_DONATE, ViewCountryDonate, null, layerManager.UI_Popup); //国家捐献
        layerManager.register(uiconst.COUNTRY_BOSS, ViewCtryBoss); //国家BOSS
        // layerManager.register(uiconst.COUNTRY_WELFARE, CountryWelfarePanel);//国家福利
        // layerManager.register(uiconst.COUNTRY_SHEYAN, ViewSetYanhu, null, layerManager.UI_Popup);//设宴界面
        // layerManager.register(uiconst.YANHU_JINJIUJILU, ViewJinjiuJiLu, null, layerManager.UI_Popup);//敬酒记录界面
        // layerManager.register(uiconst.CONTRY_GONGGAO, ViewEditGonggao, null, layerManager.UI_Popup);//国家公告编辑界面
        layerManager.register(uiconst.COUNTRY_SKILL, View_CountrySkill_Panel); //国家技能
        layerManager.register(uiconst.QMBOSSRANK, ViewQMBossRnk, null, layerManager.UI_Popup); //BOSS rank
        layerManager.register(uiconst.RELIFEPANEL, TimeLimitPanel, null, layerManager.UI_floorUI); //BOSS rank
        layerManager.register(uiconst.RANK, ViewRankPanel); // rank
        layerManager.register(uiconst.RANK_INFO, ViewRankInfo, null, layerManager.UI_Popup); // rank info
        layerManager.register(uiconst.NANZHENG_BEIZHAN, View_NZBZ_Panel); // 南征北战
        layerManager.register(uiconst.NANZHENG_BEIZHAN_SAODANG, View_NZBZ_SaoDang, null, layerManager.UI_Popup); // 南征北战胜利	
        layerManager.register(uiconst.NANZHENG_BEIZHAN_RANK, View_NZBZ_Rank, null, layerManager.UI_Popup); // 南征北战排行
        layerManager.register(uiconst.NANZHENG_BEIZHAN_JIFEN, View_NZBZ_JiFenReward, null, layerManager.UI_Popup); // 南征北战积分
        layerManager.register(uiconst.ARENA, View_Arena_Panel); // 竞技 三国战神
        layerManager.register(uiconst.SANGUO_ZHANSHEN, View_Arena_Panel); // 竞技 三国战神
        layerManager.register(uiconst.SANGUO_WUSHUANG, View_Arena_Panel, 2); // 竞技 三国无双
        layerManager.register(uiconst.KFWZ, View_Arena_Panel, 5); //竞技 跨服王者
        layerManager.register(uiconst.KFWZ_REWARD_VIEW, ViewRewardKfwz, null, layerManager.UI_Popup); //跨服王者目标奖励预览界面
        layerManager.register(uiconst.KFWZ_GRADE_REWARD, ViewGradeRewardKfwz, null, layerManager.UI_Popup); //跨服王者段位奖励界面
        layerManager.register(uiconst.KFWZ_RANK, ViewRankKfwz, null, layerManager.UI_Popup); //跨服王者排行榜界面
        layerManager.register(uiconst.KFWZ_MATCH, ViewMatchKfwz, null, layerManager.UI_Popup); //跨服王者匹配界面
        layerManager.register(uiconst.KFWZ_LOG, ViewLogKfwz, null, layerManager.UI_Popup); //跨服王者日志界面
        layerManager.register(uiconst.KFWZ_START, ViewStartKfwz, null, layerManager.UI_Popup); //跨服王者开始界面
        layerManager.register(uiconst.KFWZ_BATTLE, ViewBattleKfwz, null, layerManager.UI_MainBottom); //跨服王者战斗界面
        layerManager.register(uiconst.SANGUO_ZHANSHEN_REWARD, View_SGZS_Rank, null, layerManager.UI_Popup); // 竞技 三国战神 排行
        layerManager.register(uiconst.LVBUBOX, ViewLvBuBox, null, layerManager.UI_Popup); // 吕布宝箱
        layerManager.register(uiconst.LVBURANK, LvBuRank, null, layerManager.UI_Popup); // 吕布排行榜
        layerManager.register(uiconst.COMMON_WIN, ViewCommonWin, null, layerManager.UI_Popup); //胜利结算
        layerManager.register(uiconst.COMMON_WIN1, ViewCommonWin1, null, layerManager.UI_Popup); //胜利结算
        layerManager.register(uiconst.COMMON_WIN2, ViewCommonWin2, null, layerManager.UI_Popup); //胜利结算
        layerManager.register(uiconst.COMMON_FAIL, ViewCommonFail, null, layerManager.UI_Popup); //胜利结算
        layerManager.register(uiconst.CONNECT_WORLD, ViewConnectWorldNet, null, layerManager.UI_Popup); // 中央服链接loading
        layerManager.register(uiconst.MHRANK, MengHuoRank, null, layerManager.UI_Popup); // 孟获排行榜
        layerManager.register(uiconst.MHAWARDS, ViewMHTagert, null, layerManager.UI_Popup); // 孟获目标奖励
        layerManager.register(uiconst.SCENELOADING, ViewSceneChange, null, layerManager.UI_MainBottom);
        layerManager.register(uiconst.DANDAO_FUHUI_RANK, View_DDFH_Rank, null, layerManager.UI_Popup); //单刀赴会排行
        layerManager.register(uiconst.DANDAO_FUHUI_MATH, View_DDFH_Math, null, layerManager.UI_Popup); //单刀赴会匹配
        layerManager.register(uiconst.DANDAO_FUHUI_EXPLAIN, View_DDFH_Explain, null, layerManager.UI_Popup); //单刀赴会匹配 玩法说明
        layerManager.register(uiconst.DANDAO_FUHUI_BATTLENOTE, View_DDFH_BattleNote, null, layerManager.UI_Popup); //单刀赴会 战斗日志
        layerManager.register(uiconst.DANDAO_FUHUI_REWARDSHOW, View_DDFH_RewardShow, null, layerManager.UI_Popup); //单刀赴会 奖励显示
        layerManager.register(uiconst.CROSS_KING, View_Arena_Panel, 3);
        layerManager.register(uiconst.CROSS_KING_STORE, ViewCrossKingStore);
        layerManager.register(uiconst.CROSS_WARS, View_Arena_Panel, 4);
        layerManager.register(uiconst.SHOUCHONG, ViewShouChong, null, layerManager.UI_Popup); // 首冲
        layerManager.register(uiconst.MEIRISHOUCHONG, ViewMeiRiChongZhi); // 首冲
        layerManager.register(uiconst.MRSCBOX, ViewMRBOX, null, layerManager.UI_Popup); // 首冲
        layerManager.register(uiconst.CHONGZHI, ViewChongZhi); // 首冲
        layerManager.register(uiconst.VIP, ViewVip); // vip
        layerManager.register(uiconst.VIPDESC, ViewVipDes, null, layerManager.UI_Popup); // vip
        layerManager.register(uiconst.CROSS_KING_RANK, ViewCrossKingRank, null, layerManager.UI_Popup); //乱世枭雄
        layerManager.register(uiconst.CROSS_KING_REWARD, ViewCrossKingReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_KING_PROMOTE, ViewCrossKingPromotion, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_KING_REPORT, ViewCrossKingReport, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_KING_ProSuc, ViewCrossKingProSuc, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WELFARE, View_Welfare_Panel);
        layerManager.register(uiconst.WELFARE_NOTICE, View_Welfare_Panel, 2);
        layerManager.register(uiconst.HUODONG, View_HuoDong_Panel);
        layerManager.register(uiconst.HUODONG_ADD_RECHARGE, View_HuoDong_Panel, uiconst.HUODONG_ADD_RECHARGE);
        layerManager.register(uiconst.HUODONG_ADD_RECHARGESYS, View_HuoDong_Panel, uiconst.HUODONG_ADD_RECHARGESYS);
        layerManager.register(uiconst.HUOD_ONLY, View_HuoDOnly_Panel);
        layerManager.register(uiconst.ACT_HOLY_BEAST, ViewActHolyBeastPanel);
        layerManager.register(uiconst.ACT_HOLYB_ZPSHOW, ViewActHolyB_ZPShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACT_HOLYB_XBMUBIAO, ViewActHolyBMuB, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACT_HOLYB_XBRANK, ViewActHolyBRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACT_HOLYB_XBSHOW, ViewActHolyBShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACT_HOLYB_XBREWARD, ViewActHolyBReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTHB_XILIANRANK_VIEW, ViewXiLianRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTHB_SGZL_UPGRADE, ViewSGZLUpgrade, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_SGZL2_UPGRADE, ViewSGZL2Upgrade, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_CJS_TASK, ViewTaskCJS, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_CJS_REWARD, ViewRewardCJS, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TEQUAN, ViewTeQuan);
        layerManager.register(uiconst.REWARD_SHOW, View_Reward_Show, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REWARD_SHOW1, View_Reward_Show1, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REWARD_SHOW2, View_Reward_Show2, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REWARD_SHOW4, View_Reward_Show4, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REWARD_SHOW5, View_Reward_Show5, null, layerManager.UI_Popup);
        layerManager.register(uiconst.BOSS_TISHI, ViewBossTiShi, null, layerManager.UI_MainBottom);
        layerManager.register(uiconst.SEVENDAY_LOGIN, View_SevenDayLogin_Panel);
        layerManager.register(uiconst.CROSS_WARS_BET, ViewCrossWarsBet, null, layerManager.UI_Popup); //枭雄争霸
        layerManager.register(uiconst.CROSS_WARS_REWARD, ViewCrossWarsReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_WARS_WIN, ViewCrossWarsWin, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_WARS_LOOK, ViewCrossWarsLook, null, layerManager.UI_Popup);
        layerManager.register(uiconst.JINSHENG_REWARD, View_JinShengReward_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LVBUDAILOG, ViewLBDialog);
        layerManager.register(uiconst.PEACOCK_REWARD, ViewPeacockGetReward, null, layerManager.UI_Popup); //铜雀台  奖励
        layerManager.register(uiconst.FUNCTIONPREVIEW, View_FunctionPreview_Panel); //功能预览
        layerManager.register(uiconst.WUSHENGLIST, View_WuShengList_Panel); //武圣榜
        layerManager.register(uiconst.WUSHENGLIST_RANK, View_WuShengRank_Panel, null, layerManager.UI_Popup); //武圣榜排行
        layerManager.register(uiconst.BAOKU_LZ, View_BaoKu_Panel); //宝库
        layerManager.register(uiconst.BAOKU_WS, View_BaoKu_Panel, 1); //宝库
        layerManager.register(uiconst.BAOKU_XX, View_BaoKu_Panel, 2); //宝库
        layerManager.register(uiconst.BAOKU_SG, View_BaoKu_Panel, 3); //宝库
        layerManager.register(uiconst.LING_LONG, ViewLingLongPanel);
        layerManager.register(uiconst.LING_LONG_RANK, ViewLingLongRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LING_LONG_REWARD, ViewLingLongReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LING_LONG_SHOW, ViewLingLongShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SG_ZHUANPAN_SHOW, ViewSG_ZPShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SG_ZHUANPAN_REWARD, ViewZhuanPanReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SGWS_DESC, ViewSanGuoDes, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SGWS_POOL, ViewSGWardPool, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SGWS_RANK, ViewSGRankWard, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SGWS_WIN, ViewSGWin, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SGWS_YZ, ViewSGYaZhu, null, layerManager.UI_Popup);
        layerManager.register(uiconst.JUBAOPENG, ViewJBP);
        layerManager.register(uiconst.ACTIVITYHALL, ViewActivityHall);
        layerManager.register(uiconst.LONGZHONGDUI, ViewLZD);
        layerManager.register(uiconst.LONGZHONGDUIRET, ViewLZDRet);
        layerManager.register(uiconst.LZDBOX, ViewLZDShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LZDRANK, ViewLZDRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT, View_Chat_Panel);
        layerManager.register(uiconst.CHAT_LOOK, View_Chat_LookPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_BLACKLIST, View_Chat_BlackList, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QUNYINGBANG, ViewQunYingB);
        layerManager.register(uiconst.KAIFUKUANGHUAN, View_KaiFKH);
        layerManager.register(uiconst.CAILIAO_GET, View_CaiLiao_GetPanel, null, layerManager.UI_Tips);
        layerManager.register(uiconst.CHAOZHIFL, ViewChaoZhiFL);
        layerManager.register(uiconst.CHAOZHI_ZHUANPAN_REWARD, View_ChaoZhiZP_Reward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAOZHI_ZHUANPAN_NOTE, View_CZZP_MyNote, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QUANMIN_KUANGHUAN, View_QMKH_Panel);
        layerManager.register(uiconst.BROADCAST, ViewBroadcastText, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DRBOSS, ViewBoss, 0);
        layerManager.register(uiconst.QMBOSS, ViewBoss, 1);
        layerManager.register(uiconst.YSBOSS, ViewBoss, 3);
        layerManager.register(uiconst.BOSS_BATTLEFIELD_LOCAL, ViewBoss, 20);
        layerManager.register(uiconst.BOSS_BATTLEFIELD_CROSS, ViewBoss, 21);
        layerManager.register(uiconst.LBBOSS, ViewLvBu);
        layerManager.register(uiconst.JINSHENG, ViewRebirthPanel);
        layerManager.register(uiconst.ACHIEVEMENT, ViewRebirthPanel, 2);
        layerManager.register(uiconst.ACHIEVEMENT_MASTER, ViewAchieveMaster, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACHIEVEMENT_REWARD, ViewAchieveReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIP_BAG_ITEM, TipBagItem, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_BAG_ITEM_USE, TipBagItemUse, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_BAG_ITEM_USE1, TipBagItemUse1, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_BAG_ITEM_USE_WUJ, TipBagItemUseWuJ, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_BAG_ITEM_USE_SYS, TipBagItemUseBySys, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_EQUIP, TipEquip, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_ROLE_EQUIP, TipRoleEquip, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_ZHANJIA_DAN, TipZhanJiaDan, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_WUJIANG_DAN, TipWuJiangDan, null, layerManager.UI_Tips);
        layerManager.register(uiconst.TIP_WUJIANG_SKILLSHOW, TipWuJiangSkillShow, null, layerManager.UI_Tips);
        layerManager.register(uiconst.SHARE, View_Share_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.BOX_REWARD_SHOW, View_BoxReward_Show, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DAILYTASKBOX, ViewDailyBox, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VACTPREVIEWBOX, VActPreViewBox, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TUISONG_SET_BOX, VTuiSongMsgBox, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WFSM_PANEL, View_WFSM_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WFLAB_PANEL, View_WFLab_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DISCOUNT_SHOP, ViewChaoZhiFL, UIConst.DISCOUNT_SHOP);
        layerManager.register(uiconst.DANDAO_FUHUI, View_Arena_Panel, 1);
        layerManager.register(uiconst.SANGUO_ZHANSHEN_RANK_REWARD, ViewSanGuoZSPrompt, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIP_STRING, ViewCommonTips, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VIEWLVBUCOMEUP, ViewLvBuComeup);
        layerManager.register(uiconst.VIEWLBPAIHANG, ViewLBPaiHang, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VIEWLBGETJL, ViewLBGetJL, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHENJIAN_GETTER, ViewNewSkillShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LOGINVIP, ViewFreeVip, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CANGBAOGE, ViewCangBaoGe);
        layerManager.register(uiconst.CANGBAOGE_RANK, ViewCangBaoGeRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CANGBAOGE_RANK2, ViewCangBaoGeRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CANGBAOGE_RANK2_OLDER, ViewCangBaoGeRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CANGBAOGE_RANK_OLDER, ViewCangBaoGeRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CANGBAOGE_REW, ViewCangBaoGeRew, null, layerManager.UI_Popup);
        layerManager.register(uiconst.JINSHENG_PROMPT, ViewJingShengPrompt, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SANGUO_ZHANSHEN_BZ, View_SanGuoZS_Shop);
        layerManager.register(uiconst.DAILYTASK, ViewDailyTask);
        layerManager.register(uiconst.CROSS_TEAM, ViewCrossKingPanel, 0);
        layerManager.register(uiconst.SJMJ1, ViewCrossKingPanel, 1);
        layerManager.register(uiconst.CROSS_MINERAL, ViewCrossKingPanel, 2); //跨服矿藏
        layerManager.register(uiconst.CROSS_MINERAL_REFRESH, ViewCrossMineralRefresh, null, layerManager.UI_Popup); //跨服矿藏-刷新
        layerManager.register(uiconst.CROSS_MINERAL_REPORT, ViewCrossMineralReport, null, layerManager.UI_Popup); //跨服矿藏-战报
        layerManager.register(uiconst.CROSS_MINE_LOOK, ViewCrossMineralLook, null, layerManager.UI_Popup); //跨服矿藏-录像
        layerManager.register(uiconst.CROSS_MINE_PROMPT, ViewMineralTips, null, layerManager.UI_Popup); //跨服矿藏-提示
        layerManager.register(uiconst.ZHI_GOU, View_ZhiGou_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SYSTEM_ZHI_GOU, View_ZhiGou_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZHI_GOU828, View_ZhiGou_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZHI_GOU_REWARD, ViewZhiGouReward, null, layerManager.UI_Popup); //直购奖励框
        layerManager.register(uiconst.SJMJ2, ViewSJMJ);
        layerManager.register(uiconst.SJMJ_BX, VSJMJBaoXiang, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SJMJ_SD, VSJSaoDang, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_TUJIAN, View_chat_TuJian, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_BAOWU, View_chat_BaoWu, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_WUJIANG, View_chat_WuJiang, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_YISHOU, View_chat_YiShou, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_QICE, View_chat_Qice, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_HORSE, View_chat_Horse, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHAT_MAID, View_chat_Maid, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL, ViewQxzl, null, layerManager.UI_floorUI);
        layerManager.register(uiconst.QXZL_CITY_INFO, ViewCityInfoQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_TASK, ViewTaskQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_SHOP, ViewShopQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_RANK, ViewRankQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_EVENT, ViewEventQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_REWARD, ViewRewardQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QXZL_DQPM, ViewDqpmQxzl, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QICE_STAR, ViewQice, 0);
        layerManager.register(uiconst.QICE_LEVEL, ViewQice, 1);
        layerManager.register(uiconst.QICE_LOTTERY, ViewQice, 2);
        layerManager.register(uiconst.QICE_HUN, ViewHunQice, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QICE_SUIT, ViewSuitQice, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QICE_LOTTERY_TARGET, ViewQiceReward, null, layerManager.UI_Popup);
        //幸运福签
        layerManager.register(uiconst.XYFQ_RANK, ViewRankXyfq, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XYFQ_TASK, ViewTaskXyfq, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XYFQ_QIAN_USE, ViewQianUse, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XYFQ_REWARD, ViewRewardXyfq, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XYFQ_COMPOUND, ViewCompoundXyfq, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_BZPT_REWARD, ViewBzptReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_SHOP12_BUY, ViewShop12Buy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_LUCKY_EGG_PREVIEW, ViewPoolPreviewLucky, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_LUCKY_EGG_REWARD, ViewPoolRewardLucky, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FHLY, FengHuoLangYanScene, null, layerManager.UI_floorUI);
        layerManager.register(uiconst.FHLY_RANK, ViewFenghuoRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FHLY_INFO, ViewCityInfo, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FHLY_BATTLE, ViewFenghuoBattleRt, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FHLY_END, ViewFengHuoRet, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REVIVE_PANEL, RevivePanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FHLY_SCORE, ViewFengHuoScoreGet, null, layerManager.UI_Popup);
        layerManager.register(uiconst.FUNCTIONNOTICE, View_FunctionNotice_Panel, null, layerManager.UI_Tips);
        layerManager.register(uiconst.MAP, View_MapPanel, null, layerManager.UI_floorUI_1);
        layerManager.register(uiconst.COUNTRYBOSS_RANK, View_Country_Rank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.COUNTRYBOSS_RANK1, ViewCountryBossRnk, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SANGUOQD, ViewActCom);
        layerManager.register(UIConst.XIAOFEIPHB, VXiaoFeiPaiHang, null, layerManager.UI_Popup);
        layerManager.register(UIConst.CHUANGGUANYOULI, ViewChuangGuanYL);
        layerManager.register(UIConst.GUANQIAMAP, ViewGQDetail, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LCHK, ViewLJCZ);
        layerManager.register(UIConst.TSMS_PANEL, View_TSMS_Panel, null, layerManager.UI_floorUI_1);
        // layerManager.register(uiconst.EIGHTLOCK, ViewEightLock, uiconst.EIGHTLOCK);
        layerManager.register(uiconst.EIGHTLOCK, ViewEightLock);
        layerManager.register(uiconst.FUWENCOLLECT, ViewEightLock, uiconst.FUWENCOLLECT);
        layerManager.register(uiconst.FUWENJIANDING, ViewEightLock, uiconst.FUWENJIANDING);
        layerManager.register(uiconst.FUWENYOULI, ViewEightLock, uiconst.FUWENYOULI);
        layerManager.register(uiconst.VIEWTASKINFO, VTaskInfo, null, layerManager.UI_Popup);
        layerManager.register(UIConst.LIANJI, View_LianJi_Panel, null, layerManager.UI_floorUI_1);
        layerManager.register(UIConst.GAILV, View_GaiLv_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VIEW_AUTHEN_RANK, ViewAuthenRank, null, layerManager.UI_Popup);
        layerManager.register(UIConst.WENDINGTX_RANK, ViewWenDingTXRank, null, layerManager.UI_Popup);
        layerManager.register(UIConst.WENDINGTX_RET, ViewWenDingTXRet, null, layerManager.UI_Popup);
        layerManager.register(UIConst.SG_ZHUANPAN_TARGET_REWARD, ViewZhuanPanTargetReward, null, layerManager.UI_Popup);
        layerManager.register(UIConst.BAZHENTU, ViewBaZhenTuPanel);
        layerManager.register(UIConst.BAZHENTU_FENJIE, ViewBaZhenTuPanel, [0, 1]);
        layerManager.register(UIConst.BAZHENTU_JIANDING, ViewBaZhenTuPanel, [0, 2]);
        layerManager.register(uiconst.ZHENYAN, ViewBaZhenTuPanel, [1, 0]);
        layerManager.register(UIConst.BAZHENTU_SHOW, ViewBaZhenTuShow, null, layerManager.UI_Popup);
        layerManager.register(UIConst.BAZHENTU_BUY, ViewBaZhenTuBuy, null, layerManager.UI_Popup);
        layerManager.register(UIConst.BAZHENTU_BAG, ViewBaZhenTuBag);
        layerManager.register(UIConst.BAZHENTU_TEMP, ViewBaZhenTuTemp);
        layerManager.register(uiconst.TIP_BAZHENTU_ITEM, TipBaZhenTu, null, layerManager.UI_Tips);
        layerManager.register(uiconst.BAZHENTU_DASHI, ViewBaZhenTuDaShi, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CHILDZJYW, ViewZJYW, 0);
        layerManager.register(uiconst.CHILD_HSCB, ViewZJYW, 1);
        layerManager.register(uiconst.GIFTBAG_USE, ViewGiftBAG, null, layerManager.UI_Popup);
        layerManager.register(uiconst.VIPGIFT, ViewVipGift);
        layerManager.register(uiconst.SHAOZHU, View_ShaoZhu_Panel);
        layerManager.register(uiconst.SHAOZHU_QINMI, View_ShaoZhu_Panel, 1);
        layerManager.register(uiconst.SHAOZHU_SKILL, View_ShaoZhu_Panel, 2);
        layerManager.register(uiconst.SHAOZHU_QIYUAN, View_ShaoZhu_Panel, 3);
        layerManager.register(uiconst.SHAOZHU_LIUYI, View_ShaoZhu_Panel, 4);
        layerManager.register(uiconst.CHAT_SHAOZHU, View_chat_ShaoZhu, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_ALLSKILL, View_ShaoZhuSkill_Panel);
        layerManager.register(uiconst.SHAOZHU_QINMI_REWARD, View_ShaoZhu_QinMiUp, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_FASHION, View_ShaoZhu_Fashion, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_ONESKILL, View_ShaoZhu_SkillDataPanel, null, layerManager.UI_Popup);
        //少主潜能
        layerManager.register(uiconst.SHAOZHU_QIANNENG, View_ShaoZhu_QianNeng, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_QIANNENG_DAN, TipQianNengDan, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHOULING, VShouHunJX, 0);
        layerManager.register(uiconst.SHJX, VShouHunJX, 1);
        layerManager.register(uiconst.ERBASU, VShouHunJX, 2);
        layerManager.register(uiconst.ACTHB_XUNBAO, VShouHunJX, 3);
        layerManager.register(uiconst.SHJXXILIAN, VSHJXPeiyang, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SH_HUANX, VSHHuanXing, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHJXXILIAN_SHUOMING, View_ShouHun_GaiLv, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHJXXCAILIAO, VShouHunJXMeti, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHJXCHECKINFO, ViewSHJXInfo, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHSHENGSUDS, VErBarTZ, null, layerManager.UI_Popup);
        layerManager.register(uiconst.COUNTRY_KINGSHIP, View_KingShip_Panel);
        layerManager.register(uiconst.COUNTRY_KINGSHIP_REWARD, View_KingShip_RewardPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.QUICK_BUY, View_QuickBuy_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XIN_SHOU_JU_QING, ViewJuQingPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TRUE_NAME, ViewTrueNamePanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TRUE_NAME_ALERT, ViewTrueNameAlert, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TRUE_NAME_REWARD, ViewTrueNameReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.JUEXING, View_JueXing_Panel);
        layerManager.register(uiconst.JUEXING_WUJIANG, View_WJ_JueXing_Panel);
        layerManager.register(uiconst.JUEXING_SUIT, View_JueXing_Suit, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_QIYUAN_SHOW, ViewSZQiYuanShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_QIYUAN_REWARD, ViewSZQiYuanReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SANGUO_YITONG, View_SanGuoYT_Panel);
        layerManager.register(uiconst.SANGUO_YITONG_ZLP, View_SanGuoYT_ZLP, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SANGUO_YITONG_SCENE, View_SanGuoYT_ScenePanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_ACT, ViewShaoZhuAct);
        layerManager.register(uiconst.SHAOZHU_SINGLE_LOG, ViewShaoZhuActSingleLog, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_HONGBAO_AWARDS, ViewShaoZhuActHongBao, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_SINGLE_AWARDS, ViewShaoZhuActAwards, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTIVITY_PROMPT, View_ActivityOpenPrompt_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHAOZHU_QY_RANK_VIEW, ViewShaoZhuQYRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.COMMON_HEAD_WIN, ViewHeadWin, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GUI_BIN_VIP, guibin_panel, null, layerManager.UI_Popup); //贵宾VIP
        layerManager.register(uiconst.ACTCOM, ViewActCom);
        layerManager.register(uiconst.ACTCOM_XIANDING_REWARD, ViewXiandingReward, null, layerManager.UI_Popup); //限定武将奖励查看
        layerManager.register(uiconst.SHAOZHU_ESCORT, ShaoZhuEscortView); //少主护送
        layerManager.register(uiconst.SHAOZHU_ESCORT_GUARD, ShaoZhuGuardView, null, layerManager.UI_Popup); //少主护送-护卫武将
        layerManager.register(uiconst.SHAOZHU_ESCORT_REWARD, ShaoZhuEscortRewardView, null, layerManager.UI_Popup); //少主护送-奖励面板
        layerManager.register(uiconst.SHAOZHU_ESCORT_REPORT, ShaoZhuEscReportView, null, layerManager.UI_Popup); //少主护送-战报
        layerManager.register(uiconst.SHAOZHU_ESCORT_INTER, ShaoZhuEscortInterView, null, layerManager.UI_Popup); //少主护送-拦截面板
        layerManager.register(uiconst.SHAOZHU_ESCORT_LOOK, ViewShaoZhuEscortLook, null, layerManager.UI_Popup); //少主护送-录像
        layerManager.register(uiconst.ZS_GODWEAPON_DAN, Tip_ZSGodWeaponDan, null, layerManager.UI_Popup); //专属神兵 属性丹
        layerManager.register(uiconst.ZS_GODWEAPON_SUIT, View_ZSGodWeaponSuit_Panel, null, layerManager.UI_Popup); //专属神兵 套装
        layerManager.register(uiconst.ZS_GODWEAPON_REWARD, ViewZSGodWeaponShow, null, layerManager.UI_Popup); //专属神兵 奖励
        layerManager.register(uiconst.ZS_GODWEAPON_BODY_SHOW, VTipGodWeaponJiHuo, null, layerManager.UI_Popup); //专属神兵 h获得新皮肤
        layerManager.register(uiconst.HSCB_RANK, View_HSCB_RanK, null, layerManager.UI_Popup); //火烧赤壁rank
        layerManager.register(uiconst.CHILD_LCQS, ViewZJYW, 2); //六出祁山
        layerManager.register(uiconst.CHILD_LCQS_PANEL, View_LiuChuQS_Panel); //六出祁山-创建房间
        layerManager.register(uiconst.CHILD_LCQS_SAODANG, View_LiuChuQS_SaoDang, null, layerManager.UI_Popup); //六出祁山-扫荡
        layerManager.register(uiconst.CHILD_TIGER_PASS, ViewZJYW, 3); //虎牢关
        layerManager.register(uiconst.YISHOULU, View_YiShouLu_Panel); //异兽录
        layerManager.register(uiconst.XIANSHAN_XUNSHOU, View_YiShouLu_Panel, 1); //仙山寻兽
        layerManager.register(uiconst.YISHOULU_TF, View_YiShouLu_Panel, 10); //异兽天赋升级
        layerManager.register(uiconst.YISHOULU_TFCOLOR, View_YiShouLu_Panel, 11); //异兽录升品
        layerManager.register(uiconst.XIULIAN_TF, View_YiShouLu_Panel, 12); //修炼天赋
        layerManager.register(uiconst.CAOCAO_LAIXI_RANK, CaoCaoRank, null, layerManager.UI_Popup); //曹操来袭排行榜
        layerManager.register(uiconst.CAOCAO_LAIXI_BOX, ViewCaoCaoBox, null, layerManager.UI_Popup); //曹操来袭奖励显示
        layerManager.register(uiconst.CAOCAO_LAIXI_RELIFEPANEL, CaoCaoTimeLimitPanel, null, layerManager.UI_floorUI); //曹操来袭复活界面
        //新活动单笔
        layerManager.register(uiconst.ACTCOM_DBZP_LOG, ViewActComDbZpLog, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_DBZP_AWARDS, ViewActComDbZpAwards, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_CZZP_SHOW, View_ActCom_CzZPShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_XFZP_SHOW, View_ActCom_XfZpShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_SGBZ_PREVIEW, View_ActCom_SGBZReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_SGBZ_LIST, View_ActCom_SGBZList, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_CZPH_RANK, View_ActCom_CZPHRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.REWARD_SHOW3, View_Reward_Show3, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_RANK_RANK, View_ActCom_Rank, null, layerManager.UI_Popup); //系统排名活动
        layerManager.register(uiconst.WSZW_ACT, ViewActCom); //万兽之王
        layerManager.register(uiconst.ACTCOM_TAL, ViewActCom); //天赋
        layerManager.register(uiconst.HFKH, ViewActCom); //合服狂欢
        layerManager.register(uiconst.YUNCHOUWEIWO, ViewActCom); //运筹帷幄
        layerManager.register(uiconst.ACTCOM_LEITAI, ViewActCom, uiconst.ACTCOM_LEITAI); //擂台
        //虎牢关
        layerManager.register(uiconst.TIGER_PASS_EMPLOY, ViewTigerPassEmploy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIGER_PASS_SIGNUP, ViewTigerPassSignUp, null, layerManager.UI_Popup);
        layerManager.register(uiconst.MHBOSS, ViewMenghuo);
        layerManager.register(uiconst.YSBOSSRANK, ViewYiShowBossRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YSBOSSREVIVE, ViewYiShouTip, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HFKH_ZFZJ_REWARD, View_ZFZJ_Reward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HFKH_ZFZJ_RANK, View_ActCom_ZFZJRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHENJIANG_XIANSHI_REWARD, View_ActCom_SJXS_Reward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SHENJIANG_XIANSHI_RANK, View_ActCom_SJXS_Rank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GOD_WUJIANG_TF, ViewGodWuJiangInnate, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YSBOSSBUY, ViewYiShouBossBuy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TIANFU_SKILL_SHOW, ViewTianFuSkillShow, null, layerManager.UI_Popup);
        //轮回副本
        layerManager.register(uiconst.LHFB, ViewSYZLB, 2);
        //三英战吕布
        layerManager.register(uiconst.SYZLB, ViewSYZLB, 1);
        layerManager.register(uiconst.ZSSF, ViewSYZLB);
        layerManager.register(uiconst.SYZLB_REW, ViewSYZLBRward, null, layerManager.UI_MainBottom);
        layerManager.register(uiconst.SYZLB_INFO, ViewSYZLBTeamInfo, null, layerManager.UI_MainBottom);
        layerManager.register(uiconst.SYZLB_RELIVE, ViewSYZLBRelive, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SYZLB_CTBUY, ViewSYZLBCtBuy, null, layerManager.UI_Popup); //飞龙在天
        layerManager.register(uiconst.ACTCOM_FLZT, ViewActCom);
        layerManager.register(uiconst.WISHTREE_RANK, WishTreeRankView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WISHTREE_REW, WishTreeRewView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WISHTREE_TARGET, WishTreeTargetView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LIANGCAO_RANK, ViewLiangCaoRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LIANGCAO_RESULT, ViewLiangCaoReslut, null, layerManager.UI_Popup);
        //
        layerManager.register(uiconst.DENG_FENG_SEA, ViewSYZLB, 3);
        layerManager.register(uiconst.DENG_FENG_FINAL, ViewSYZLB, 3);
        layerManager.register(uiconst.DENG_FENG_RANK, ViewDengFengRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DENG_FENG_POINT, ViewDengFengPoint, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DENG_FENG_BET, ViewDengFengBet, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DENG_FENG_BUY, ViewDengFengBuy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.WMSZ_INTEGRAL, WMSZIntegralView, null, layerManager.UI_Popup); //许田狩猎仓库
        layerManager.register(uiconst.XU_TIAN, View_XuTian_Panel);
        layerManager.register(uiconst.XU_TIAN_CANKU, View_XuTian_CangKu, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XU_TIAN_BUY, View_XuTian_Buy, null, layerManager.UI_Popup);
        layerManager.register(uiconst.XU_TIAN_TIP, Tip_XuTian_Buf, null, layerManager.UI_Popup);
        //无极而生
        layerManager.register(uiconst.ACTCOM_WJES, ViewActCom);
        //幸运翻牌
        layerManager.register(uiconst.LUCK_TURN_TARGE, ViewActLuckTurnTarge, null, layerManager.UI_Popup);
        layerManager.register(uiconst.LUCK_TURN_PRIZE, ViewActLuckTurnPrize, null, layerManager.UI_Popup);
        //限时礼包
        layerManager.register(uiconst.LIMIT_GIFT, ViewLimitGiftPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.CROSS_SHILIAN, ViewCrossKingPanel, 3);
        layerManager.register(uiconst.CROSS_SHILIAN_BUFF, View_CrossShiLian_Buff, null, layerManager.UI_Popup);
        //桃园结义
        layerManager.register(uiconst.TYJY_CREATE, TYJY_CreatView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TYJY_APPLY, TYJY_ApplyView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TYJY_MEMBER, TYJY_ChangeView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TYJY_TASKBOX, TYJY_BoxView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TYJY_BOSSTIPS, TYJY_BossTips, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TYJY_JOINTIPS, TYJY_JoinTipsView, null, layerManager.UI_MainBottom);
        layerManager.register(uiconst.TAOYUANJIEYI, TaoYuanJieYi_View, 0);
        layerManager.register(uiconst.TYJY_YMRW, TaoYuanJieYi_View, 1);
        layerManager.register(uiconst.TYJY_YMFB, TaoYuanJieYi_View, 2);
        layerManager.register(uiconst.SHAOZHU_LIUYI_KAOSHI, View_LiuYiKaoShiPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZSSF_GO, View_ZSSF_GeneralGo, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZSSF_BATTLEREPORT, View_ZSSF_battleReport, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ZSSF_SHOP, View_ZSSF_Shop, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_PRE, ViewHomePoolPre, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_JIADING, View_JiaDing_Panel);
        layerManager.register(uiconst.HOME_JIADING_SKILL, View_JiaDingSkill_Tips, null, layerManager.UI_Popup);
        /**坐骑*/
        layerManager.register(uiconst.HORSE, View_Horse_Panel, 0);
        layerManager.register(uiconst.HORSE_HH, View_Horse_Panel, 2);
        layerManager.register(uiconst.YANHUI, View_YanHui_Panel);
        layerManager.register(uiconst.YANHUI_FUYAN, View_YanHui_FuYanPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_HOLD, View_YanHui_HoldPanel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_BATTLE, View_YanHui_Tournament, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_TOAST, View_YanHui_JingJiu_Panel, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_FWREWARD, View_YanHui_FWReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_BKLIST, View_YanHui_BKList, null, layerManager.UI_Popup);
        layerManager.register(uiconst.YANHUI_APPLY, View_YanHui_ApplyListPanel, null, layerManager.UI_Popup);
        //新活动-对对联
        layerManager.register(uiconst.DDL_RANK, ViewRankDDL, null, layerManager.UI_Popup);
        layerManager.register(uiconst.DDL_REWARD, DDLRewardView, null, layerManager.UI_Popup);
        /**侍女*/
        layerManager.register(uiconst.HOME_MAID, ViewHomeMaidPanel);
        layerManager.register(uiconst.HOME_MAID_ATTR, ViewHomeMaidAttr, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_SHOP, View_Home_Shop);
        //新活动-天降红包
        layerManager.register(uiconst.TJHB_FHB, ViewFHB, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TJHB_RECORD, ViewHBRecord, null, layerManager.UI_Popup);
        layerManager.register(uiconst.TJHB_EFF, TJHBEff, null, layerManager.UI_Popup);
        /**任务*/
        layerManager.register(uiconst.HOME_TASK, ViewHomeTask);
        layerManager.register(uiconst.HOME_TASK_BOX, ViewHomeTaskBox, null, layerManager.UI_Popup);
        //年兽奖励
        layerManager.register(uiconst.ACTCOM_NIANSHOU_REWARD, ViewNianShouReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_NIANSHOU_ALERT, ViewNianShouAlert, null, layerManager.UI_Popup);
        //活动-擂台
        layerManager.register(uiconst.ACTCOM_LEITAI_REPORT, ViewLeiTaiReport, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOM_LEITAI_REWARD, ViewLeiTaiReward, null, layerManager.UI_Popup);
        layerManager.register(uiconst.COMMON_VIDEOTAP, ViewVideotapLook, null, layerManager.UI_Popup); //录像
        layerManager.register(uiconst.HONGBAO, View_HongBao_Panel); //红包系统
        layerManager.register(uiconst.HONGBAO_RECORD, ViewHongBaoRecord, null, layerManager.UI_Popup); //红包系统-记录
        layerManager.register(uiconst.HONGBAO_SEND, View_HongBao_SendPanel, null, layerManager.UI_Popup); //红包系统-发红包
        layerManager.register(uiconst.HOME_LEVELUP_UI, ViewHome, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_TIANGONG_bag_UI, ViewTianGongBag, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_TIANGONG_UI, ViewTianGongLu, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_JIAJU_UI, ViewFurnitureLevelUp, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_GOD_UI, ViewHomeGod, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_MONEYTREE_UI, ViewMoneyTree, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_LIST_UI, ViewHomeRank, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_LOG_UI, ViewHomeLog, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_EVENT_UI, ViewHomeEvent, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_JIADING_UI, ViewJiaDingSkill, null, layerManager.UI_Popup);
        layerManager.register(uiconst.HOME_TGL_ADD, HomeTGLUse, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOMCJDZ_POOL, ViewSuperMarblesPool, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOMCJDZ_SHOP, ViewSuperMarblesShop, null, layerManager.UI_Popup);
        layerManager.register(uiconst.ACTCOMCJDZ_AWARDS, ViewSuperMarblesShow, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GCBZ, View_GCBZ_Panel);
        layerManager.register(uiconst.GCBZ_SHOP, View_GCBZ_Shop, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GCBZ_CITYDATA, View_GCBZ_CityData, null, layerManager.UI_Popup);
        layerManager.register(uiconst.GCBZ_BATTLEREPORT, View_GCBZ_BattleReport, null, layerManager.UI_Popup);
        //六道
        layerManager.register(uiconst.TIANMING, View_LunHui_Panel, 1);
        layerManager.register(uiconst.SIXWAY, View_LunHui_Panel, 2);
        layerManager.register(uiconst.SIXWAY_YINJI, SixWayYinJiView);
        layerManager.register(uiconst.SIXWAY_BAG, SixWayBagView);
        layerManager.register(uiconst.SIXWAY_CHECK, SixWayCheckView, null, layerManager.UI_Popup);
        layerManager.register(uiconst.SIXWAY_FENJIE, ChildSixWayFenJie);
        //犒赏三军
        layerManager.register(UIConst.WAR_ORDER, ViewWarOrderPanel, UIConst.WAR_ORDER);
        layerManager.register(UIConst.WAR_ORDER_HD, ViewWarOrderPanel, UIConst.WAR_ORDER_HD);
        layerManager.register(UIConst.WAR_ORDER_UPGRADE, ViewWarOrderUpgrade, null, layerManager.UI_Popup);
        layerManager.register(UIConst.WAR_ORDER_BUYCT, ViewWarOrderBuyCt, null, layerManager.UI_Popup);
        //荣誉勋章
        layerManager.register(UIConst.WAR_ORDER1, ViewWarOrderPanel1, UIConst.WAR_ORDER1);
        layerManager.register(UIConst.WAR_ORDER_HD1, ViewWarOrderPanel1, UIConst.WAR_ORDER_HD1);
        layerManager.register(UIConst.WAR_ORDER_UPGRADE1, ViewWarOrderUpgrade1, null, layerManager.UI_Popup);
        layerManager.register(UIConst.WAR_ORDER_BUYCT1, ViewWarOrderBuyCt1, null, layerManager.UI_Popup);
        //BT  act
        layerManager.register(UIConst.CZLB_BT, ViewCZHB);
        layerManager.register(UIConst.WYHB_BT, ViewWYHB);
    };
    GGlobal.createPack = function (key) {
        var t_pkg = GGlobal.packDic[key];
        if (!t_pkg)
            GGlobal.packDic[key] = t_pkg = fairygui.UIPackage.addPackage(key);
        return t_pkg;
    };
    GGlobal.setUnitLayerVis = function (v, n) {
        if (n === void 0) { n = true; }
        if (GGlobal.mapscene) {
            GGlobal.mapscene.setUnitLayerVis(v);
        }
        var forceShow = false;
        if (GGlobal.sceneType == SceneCtrl.WDTX_PVE) {
            //在问鼎天下强制显示。
            forceShow = true;
        }
        else if (GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
            //群雄逐鹿特殊处理
            forceShow = true;
        }
        if (ViewMainTopUI.instance && n) {
            ViewMainTopUI.instance.visible = !v;
        }
        if (forceShow)
            ViewMainTopUI.instance.visible = true;
    };
    GGlobal.deCodeLogin = function (data) {
        var self = GGlobal;
        self.loginArg = data;
        self.zone = data.zoneid ? Number(data.zoneid) : 1;
        self.ip = data.ip ? data.ip : "192.1.1.1";
        self.port = data.port ? data.port : "1";
        self.zoneName = data.serverName ? data.serverName : "1区";
        self.clientversion = data.clientversion ? data.clientversion : "v1";
        self.mainType = data.mainType ? data.mainType : 0;
        Model_UserData.isWhitePlayer = window.whitelist;
    };
    GGlobal.requestLoginData_ADB = function (data) {
        var self = GGlobal;
        self.loginArg = data;
        self.zone = data.zoneid ? Number(data.zoneid) : 1;
        self.ip = data.ip ? data.ip : "192.1.1.1";
        self.port = data.port ? data.port : "1";
        self.zoneName = data.serverName ? data.serverName : "1区";
        self.clientversion = data.clientversion ? data.clientversion : "v1";
        self.mainType = data.mainType ? data.mainType : 0;
    };
    /**是否进入了游戏 */
    GGlobal.isEnterGame = false;
    GGlobal.loginArg = {};
    GGlobal.resHead = "http://192.168.22.18:8090/";
    GGlobal.serverVer = '';
    GGlobal.clientversion = '';
    GGlobal.mainType = 0;
    GGlobal.isActivation = true;
    GGlobal.isNetWorking = true;
    GGlobal.frameScale = 2;
    GGlobal.aniCfg = {};
    GGlobal.pauseBattle = false;
    GGlobal.layerMgr = new LayerManager();
    GGlobal.mainUICtr = new MainUIController();
    GGlobal.control = new MsgCenter();
    GGlobal.COMMON = "common";
    GGlobal.NUM = "num"; //数字资源包名
    GGlobal.sceneID = 0;
    GGlobal.packDic = {};
    GGlobal.autoSkill = 0;
    return GGlobal;
}());
__reflect(GGlobal.prototype, "GGlobal");
