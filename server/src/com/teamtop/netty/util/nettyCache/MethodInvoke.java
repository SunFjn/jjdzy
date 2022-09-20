package com.teamtop.netty.util.nettyCache;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.teamtop.cross.AbsCrossControl;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossIO;
import com.teamtop.cross.LocalIO;
import com.teamtop.forbid.ForbidCache;
import com.teamtop.houtaiHttp.events.BlockWord.BlockWordIO;
import com.teamtop.houtaiHttp.events.activity.ActivityIO;
import com.teamtop.houtaiHttp.events.adMark.adMarkCrossIO;
import com.teamtop.houtaiHttp.events.bag.delbag.DelBagCrossIO;
import com.teamtop.houtaiHttp.events.bag.getbag.BagCrossIO;
import com.teamtop.houtaiHttp.events.blackList.BlackListIO;
import com.teamtop.houtaiHttp.events.bsh.BshIO;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchIO;
import com.teamtop.houtaiHttp.events.exclusiveActivity.ExclusiveActivityHoutaiIO;
import com.teamtop.houtaiHttp.events.gameSystem.GameSystemIO;
import com.teamtop.houtaiHttp.events.getRechargeByTime.GetRechargeByTimeIO;
import com.teamtop.houtaiHttp.events.guanka.GuanKaHttpIO;
import com.teamtop.houtaiHttp.events.heroInfo.ForbidCrossIO;
import com.teamtop.houtaiHttp.events.heroInfo.HeroInfoIO;
import com.teamtop.houtaiHttp.events.ipWhiteList.IpWhiteListIO;
import com.teamtop.houtaiHttp.events.kickOutHero.KickOutHeroIO;
import com.teamtop.houtaiHttp.events.kuaFuFenQu.KuaFuFenQuIO;
import com.teamtop.houtaiHttp.events.mail.MailCrossIO;
import com.teamtop.houtaiHttp.events.manualOpServer.ManualOpServerIO;
import com.teamtop.houtaiHttp.events.ranking.RankingCrossIO;
import com.teamtop.houtaiHttp.events.recharge.iosRecharge.IosRechargeCrossIO;
import com.teamtop.houtaiHttp.events.recharge.rechargeSwitch.RechargeSwitchCrossIO;
import com.teamtop.houtaiHttp.events.rechargeWhiteList.RechargeWhiteListIO;
import com.teamtop.houtaiHttp.events.redList.RedListIO;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainIO;
import com.teamtop.houtaiHttp.events.serverSelfMotion.ServerSelfMotionIO;
import com.teamtop.houtaiHttp.events.switchOnOff.SwitchOnOffIO;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.exclusiveActivity.ExclusiveActivityIO;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.modifyNameSwitch.ModifyNameSwitchIO;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai.WxhuotaiShowIO;
import com.teamtop.houtaiHttp.events.sysLoopNotice.SysLoopNoticeCrossIO;
import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionIO;
import com.teamtop.houtaiHttp.events.welfareNotice.WelfareNoticeIO;
import com.teamtop.houtaiHttp.events.whiteList.WhiteListIO;
import com.teamtop.houtaiHttp.qqGift.QqGiftLocalIo;
import com.teamtop.houtaiHttp.recharge.RechargeIO;
import com.teamtop.main.RunServerException;
import com.teamtop.redeploy.cross.RedeployIO;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightIO;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.CrossDropRedPacketIO;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActIO;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.CrossGodGenSendGiftActIO;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActIO;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActIO;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross.CelebrationHaoLiZhuanPanIO;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoCrossIO;
import com.teamtop.system.antiAddictionSystem.AntiAddictionIO;
import com.teamtop.system.battleGoods.BattleGoodIO;
import com.teamtop.system.cdkey.cross.CDkeyIO;
import com.teamtop.system.chat.ChatCrossIO;
import com.teamtop.system.chat.ChatLocalIO;
import com.teamtop.system.crossAttackCity.cross.AttackCityIO;
import com.teamtop.system.crossBoss.CrossBossIO;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankIO;
import com.teamtop.system.crossDynastyWarriors.cross.DynastyWarriorsIO;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconIO;
import com.teamtop.system.crossHeroesList.cross.HeroesListIO;
import com.teamtop.system.crossKing.cross.CrossKingCrossIO;
import com.teamtop.system.crossKing.local.CrossKingLocalIO;
import com.teamtop.system.crossMine.CrossMineIO;
import com.teamtop.system.crossMine.CrossMineLocalIO;
import com.teamtop.system.crossRebornFB.cross.RebornFBIO;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingIO;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingCrossIO;
import com.teamtop.system.crossSelectKing.local.CrossSelectKingLocalIO;
import com.teamtop.system.crossSoloRun.cross.SoloRunIO;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenIO;
import com.teamtop.system.crossTeamKing.CrossTeamKingIO;
import com.teamtop.system.crossTrial.cross.CrossTrialIO;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaIO;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuIO;
import com.teamtop.system.dengFengZaoJi.cross.DengFengZaoJiCrossIO;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankIO;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerIO;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.event.useAddEvent.UseAddIO;
import com.teamtop.system.gm.event.TimeGMFunction;
import com.teamtop.system.guardArea.cross.GuardAreaIO;
import com.teamtop.system.house.houseKeeper.HouseKeeperFunction;
import com.teamtop.system.house.yanhui.cross.YanhuiCrossIO;
import com.teamtop.system.house.yard.cross.HouseIO;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.system.linglongge.LingLongGeLocalIO;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.cross.MonsterKingSearchMonsterIO;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.SaintMonsterTreasureIO;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.SaintMonsterWashRankFunction;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.SaintMonsterWashRankIO;
import com.teamtop.system.redBox.RedBoxCrossIO;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankIO;
import com.teamtop.system.tigerPass.cross.TigerPassCrossCrossIO;
import com.teamtop.system.tigerPass.cross.TigerPassLocalIO;
import com.teamtop.system.weiXinShare.WeiXinShareHTIO;
import com.teamtop.system.weiXinShare.WeiXinShareIO;
import com.teamtop.system.zcBoss.cross.ZcBossCrossIO;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xitong_001;
import excel.struct.Struct_xitong_001;
import io.netty.channel.Channel;

/**
 * 读取协议号<->方法文档
 * @name：CmdToMethodXMLReader
 * @author：Kyle
 * @date：2012-7-25 上午06:16:39
 * @version 1.0.0
 *
 */
public class MethodInvoke extends AbsServerEvent{
	public static void main(String[] args) throws Exception {
		List<Object[]> list = expalinXml("cmdToMethod.xml");
		registerCmdToMethod(list);
	}
	/**
	 * 
	 * 解析XML文件
	 * @name expalinXml
	 * @condition 解析协议号<->方法文档时使用
	 * @param xmlFilePath 文件路径
	 * @return 解析好的数据,放在List
	 * @throws DocumentException
	 * @throws UnsupportedEncodingException 
	 * List<Object[]>
	 * @author Kyle
	 * @date：2012-7-25 上午07:44:41
	 * @throws 
	 * @version 1.0.0
	 */
	@SuppressWarnings("unchecked")
	public static List<Object[]> expalinXml(String xmlFilePath) throws Exception{
		String realFile = MethodInvoke.class.getResource("/"+xmlFilePath).getFile();
		realFile = URLDecoder.decode(realFile,"utf-8");  
		File file = new File(realFile);
		SAXReader saxReader = new SAXReader();
		Document doc = saxReader.read(file);
		Element root = doc.getRootElement();
		List<Object[]> list = new ArrayList<Object[]>();
		Map<Integer,FunCmd> funCmdRelateMap = new HashMap<Integer, FunCmd>();
		for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
			Element bean = (Element) it.next();
			try {
				Object[] beanArr = new Object[2];
				beanArr[0] = bean.attributeValue("id");
				String crossControl = bean.attributeValue("crossControl");
				AbsCrossControl cc = null;
				if(crossControl!=null){
					Class<AbsCrossControl> clazz = (Class<AbsCrossControl>) Class.forName(crossControl);
					cc = clazz.newInstance();
				}
				List<?> elements = bean.elements();
				int size=elements.size();
				List<Object[]> arrList = new ArrayList<Object[]>();
				for(int i=0;i<size;i++){
					Element funEle = (Element) elements.get(i);
					int funid = Integer.parseInt(funEle.attributeValue("id"));
					int lv = 0;
					int guanqiaId = 0;
					if(funid>0){
						Struct_xitong_001 kq = Config_xitong_001.getIns().get(funid);
						if(kq==null){
							throw new RunServerException(null, "xitongkaiqi is null,funid:"+funid);
						}
						int[][] open = kq.getServer();
						if (open != null && open.length > 0) {
							guanqiaId = open[0][0];
						}
					}
					List<Element> funList = funEle.elements();
					for(Element property:funList){
						int cmd = Integer.parseInt(property.attributeValue("cmdId"));
						arrList.add(new Object[]{cmd,property.attributeValue("methodName"),property.attributeValue("paramConn")});
//						if(lv>0){
						funCmdRelateMap.put(cmd, new FunCmd(funid, cmd, lv, guanqiaId));
//						}
						if(cc!=null){
							NettyCache.crossControlMap.put(cmd, cc);
						}
					}
				}
				beanArr[1] = arrList.toArray();
				list.add(beanArr);
			} catch (Exception e) {
				throw new RunServerException(e, bean.toString());
			}
		}
		ForbidCache.getFunCmdMap().putAll(funCmdRelateMap);//funid对应的cmd结合
		return list;
	}
	/**
	 * 
	 * 注册协议号到方法
	 * @name readCmdToMethod
	 * @condition 初始化时使用
	 * @param list xml解析好的数据
	 * @author Kyle
	 * @date：2012-7-25 上午08:03:17
	 * @version 1.0.0
	 */
	public static void registerCmdToMethod(List<Object[]> list) throws Exception{
		for(Object[] objArr:list){
			String instanceName = (String) objArr[0];
			Class<?> clazz = Class.forName(instanceName);
			Method methodIns = clazz.getDeclaredMethod("getIns");
			Object obj = methodIns.invoke(null);
			Object[] propertyArr = (Object[]) objArr[1];
			int len = propertyArr.length;
			for(int i=0;i<len;i++){
				Object[] cmdToMethod = (Object[]) propertyArr[i];
				int cmdId = Integer.parseInt(cmdToMethod[0].toString());
				String methodName = (String) cmdToMethod[1];
				String paramConn =  (String) cmdToMethod[2];
				Method method = null;
				if(paramConn==null){
					method = clazz.getMethod(methodName, NettyCache.heroParamTypes);
				}else{
					method = clazz.getMethod(methodName, NettyCache.connectionParamTypes);
				}
				NettyCache.cmdToMethodCache.put(cmdId, method);
				NettyCache.cmdToObject.put(cmdId, obj);
				ForbidCache.addCmdMap(clazz, cmdId);//clazz关联协议，用于协议屏蔽
			}
		}
	}
	
	@Override
	public void startServer() throws RunServerException {
		try {
//			String xmlFilePath = "cmdToMethod.xml";
//			List<Object[]> list = expalinXml(xmlFilePath);
//			registerCmdToMethod(list);
			LogTool.showInitComplete("MethodInvoke");
			regCrossIO();
		} catch (Exception e) {
			throw new RunServerException(e,"readCmdToMethod");
		}
		
	}
	/**
	 * 注册跨服IO
	 * @throws RunServerException
	 */
	public static void regCrossIO() throws RunServerException{
		try {
			doRegExt(CrossIO.class, CrossConst.CMD_CALLBACK, "dispatchCallback");
			doRegExt(CrossIO.class, CrossConst.CMD_BLOCK_CALLBACK, "dispatchBlock");
			doRegExt(CrossIO.class, CrossConst.CMD_BIND_ZONE_CHANNEL, "bindChannelZoneid");
			doRegExt(CrossIO.class, CrossConst.ASK_CROSS, "askCross");
			doRegExt(CrossIO.class, CrossConst.UPDATE_HERO_SCENE, "uploadHeroScene");
			doRegExt(CrossIO.class, CrossConst.CMD_SEND_TO_AS_PORT, "sendToAsPort");
			doRegExt(CrossIO.class, CrossConst.SYNC_BOARDCAST_TO_CROSS, "syncBoardcastToCross");
			doRegExt(CrossIO.class, CrossConst.GET_CROSS_HEARTBEAT, "getCrossHeartbeat");
			doRegExt(CrossIO.class, CrossConst.TELL_CROSS_SERVER_CLOSE_CLIENT, "tellCrossServerCloseClient");
			/**邮件 */
			doRegExt(LocalIO.class, CrossConst.CROSS_SEND_MAIL, "crossSendMail");
			doRegExt(LocalIO.class, CrossConst.CROSS_QUIT, "crossQuit");
			//修改时间
			doRegExt(TimeGMFunction.class, CrossConst.GM_UPDATETIME_LTC, "LTC_UpdateTime");
			doRegExt(TimeGMFunction.class, CrossConst.GM_UPDATETIME_CTL, "CTL_UpdateTime");
			doRegExt(TimeGMFunction.class, CrossConst.GM_TONGBUTIME_CTL, "sendCentryTime");
			doRegExt(TimeGMFunction.class, CrossConst.GM_TONGBUTIME_LTC, "CRL_getCentryTime");
			
			//热更
			doRegExt(RedeployIO.class, CrossConst.UPLOAD_BIN_CS, "uploadBin");
			doRegExt(RedeployIO.class, CrossConst.TELL_INFO_SC, "tellInfo");
			doRegExt(RedeployIO.class, CrossConst.REBOOTSERVER, "rebootServer");
			doRegExt(RedeployIO.class, CrossConst.HOTSWAP_STEP1, "HOTSWAP_STEP1");
			doRegExt(RedeployIO.class, CrossConst.HOTSWAP_STEP2, "HOTSWAP_STEP2");
			doRegExt(RedeployIO.class, CrossConst.HOTSWAP_MSG, "HOTSWAP_MSG");
			doRegExt(RedeployIO.class, CrossConst.HOTSWAP_BY_ZID_CS, "hotSwapByZidCS");
			doRegExt(RedeployIO.class, CrossConst.HOTSWAP_BY_ZID_CHECK_CS, "hotSwapByZidCheckCS");
			//掉落
			doRegExt(UseAddIO.class, CrossConst.ASK_LOCAL_CANUSE, "askLocalCanUse");
			doRegExt(UseAddIO.class, CrossConst.ASK_LOCAL_USE, "askLocalUse");
			doRegExt(UseAddIO.class, CrossConst.ASK_LOCAL_CANADD, "askLocalCanAdd");
			doRegExt(UseAddIO.class, CrossConst.ASK_LOCAL_ADD, "askLocalAdd");
			doRegExt(UseAddIO.class, CrossConst.NPC_DROP, "npcDrop");
			//后台系统
			doRegExt(OldPlayerIO.class, CrossConst.CHECK_OLD_PLAYER, "checkPlayerByCross");
			doRegExt(RedListIO.class, CrossConst.SET_RED_LIST, "setRedByOpenid");
			doRegExt(BlackListIO.class, CrossConst.SET_BLACK_LIST, "setBlackByOpenid");
			doRegExt(RedListIO.class, CrossConst.CHECK_RED_LIST, "checkRedListCross");
			doRegExt(BlackListIO.class, CrossConst.CHECK_BLACK_LIST, "checkBlackListCross");
			doRegExt(MailCrossIO.class, CrossConst.SEND_PERSONAL_MAIL, "sendPersonalMailHandle");
			doRegExt(MailCrossIO.class, CrossConst.SEND_ZONE_MAIL, "sendZoieMailHandle");
			doRegExt(WhiteListIO.class, CrossConst.SET_WHITE_LIST, "setWhiteListHandle");
			doRegExt(WhiteListIO.class, CrossConst.CHECK_WHITE_LIST, "checkWhiteListCross");
			doRegExt(ForbidCrossIO.class, CrossConst.FORBIDDEN, "forbidOperateHandle");
			doRegExt(KickOutHeroIO.class, CrossConst.KICKOUTHERO, "kickOutHeroHandle");
			doRegExt(HeroInfoIO.class, CrossConst.GET_HERO_INFO, "getHeroInfoHandle");
			doRegExt(ServerMaintainIO.class, CrossConst.SERVER_MAINTAIN, "setServerMaintainHandle");
			doRegExt(ManualOpServerIO.class, CrossConst.MANUAL_OPEN_SERVER, "openServer");
			doRegExt(ServerSelfMotionIO.class, CrossConst.AUTO_OPEN_SERVER, "getLocalServerPlayerNum");
			doRegExt(CDkeyIO.class, CrossConst.GETCDKEYAWARD, "checkCDkey");
			doRegExt(RechargeIO.class, CrossConst.RECHARGE, "LRCPayOrderFrom");
			doRegExt(CDkeyIO.class, CrossConst.LOAD_CDKEY, "loadCDkey");
			doRegExt(RechargeWhiteListIO.class, CrossConst.SET_RECHARGE_WHITE_LIST, "setWhiteListHandle");
			doRegExt(BshIO.class, CrossConst.SYNC_BSH, "recieveBsh");
			doRegExt(BshIO.class, CrossConst.HANDLE_BSH, "handleBsh");
			doRegExt(BagCrossIO.class, CrossConst.GETBAG, "getBagHandle");
			doRegExt(DelBagCrossIO.class, CrossConst.DELBAG, "delBagHandle");
			doRegExt(RechargeSwitchCrossIO.class, CrossConst.RECHARGESWITCH, "rechargeSwitchHandle");
			doRegExt(adMarkCrossIO.class, CrossConst.ADMARK, "adMarkHandle");
			doRegExt(SysLoopNoticeCrossIO.class, CrossConst.SYSLOOPNOTICE, "sysLoopNoticeHandle");
			doRegExt(ManualOpServerIO.class, CrossConst.REFLASH_IP_PORT, "sendServerAddressData");
			doRegExt(ManualOpServerIO.class, CrossConst.REFLASH_IP_PORT_GET, "getServerAddressData");
			doRegExt(IosRechargeCrossIO.class, CrossConst.CTL_IOS_RECHARGE, "LRCiosrecharge");
			doRegExt(GuanKaHttpIO.class, CrossConst.SET_HERO_GUANKA, "LRCSETGuanka");
			doRegExt(WelfareNoticeIO.class, CrossConst.WELFARE_NOTICE, "setNotice");
			doRegExt(RankingCrossIO.class, CrossConst.RANKING_INFO, "getRankingInfoHandle");
			doRegExt(RechargeWhiteListIO.class, CrossConst.RECHARGE_WHITE_LIST_SWITCH, "setSwitchHandle");
			doRegExt(CrossActivitySwitchIO.class, CrossConst.CROSS_ACT_SWITCH, "setCrossActSwitchHandle");
			doRegExt(CrossActivitySwitchIO.class, CrossConst.CROSS_ACT_SWITCH_CENTRAL, "centralActSwitchHandle");
			doRegExt(ActivityIO.class, CrossConst.ACT_SWITCH, "actSwitchHandle");
			doRegExt(TrueNameAndAntiAddictionIO.class, CrossConst.TRUENAME_ANTI_SWITCH, "updateSwitchHandle");
			doRegExt(TrueNameAndAntiAddictionIO.class, CrossConst.TRUENAME_ANTI_SYN, "connSynStateHandle");
			doRegExt(AntiAddictionIO.class, CrossConst.ANTI_GET_ONLINE_TIME, "getAccountOnlineTime");
			doRegExt(AntiAddictionIO.class, CrossConst.ANTI_LOGOUT, "logout");
			doRegExt(KuaFuFenQuIO.class, CrossConst.GET_KUAFUFENZU_CENTRAL_INFO, "getKuaFufenQuInfo");
			doRegExt(KuaFuFenQuIO.class, CrossConst.UPDATE_KUAFUFENZU_CENTRAL_INFO, "updateKuaFuFenQuInfoHandel");
			doRegExt(QqGiftLocalIo.class, CrossConst.GIFTGET, "LRCGiftGet");
			doRegExt(WxhuotaiShowIO.class, CrossConst.CTL_WX_SHOW, "LRCWxShowCross");
			doRegExt(ModifyNameSwitchIO.class, CrossConst.MODIFYNAME_SWITCH, "setSwitchStateFromCen");
			doRegExt(SwitchOnOffIO.class, CrossConst.SWITCH_CONN, "connFromCen");
			doRegExt(ExclusiveActivityIO.class, CrossConst.EXCLUSIVE_ACT_SWITCH, "setExclusiveActivityStateHandle");
			doRegExt(ExclusiveActivityHoutaiIO.class, CrossConst.EXCLUSIVE_ACT_SET, "setExActDataLocalHandel");
			doRegExt(BlockWordIO.class, CrossConst.BLOCK_WORD, "updateBlockWordHandle");
			doRegExt(adMarkCrossIO.class, CrossConst.CHECK_ADMARK, "getAdMark");
			doRegExt(IpWhiteListIO.class, CrossConst.IPWHITELIST_SET, "ipWhiteListHandle");
			doRegExt(IpWhiteListIO.class, CrossConst.IPWHITELIST_CHECK, "checkIpLimitHandle");
			doRegExt(GameSystemIO.class, CrossConst.GAME_SYSTEM_SWITCH, "systemSwitchHandle");
			doRegExt(GameSystemIO.class, CrossConst.GAME_SYSTEM_SWITCH_CONN, "switchSyn");
			
			doRegExt(QqGiftLocalIo.class, CrossConst.GIFT_GETHERO, "LRCGiftGetHero");
			doRegExt(GetRechargeByTimeIO.class, CrossConst.GET_RECHARGENUM, "LRCGetRechargeByTime");
			
			//跨服聊天
			doRegExt(ChatCrossIO.class, CrossConst.CROSS_SG_CHAT, "CRLChat");
			doRegExt(ChatLocalIO.class, CrossConst.CROSS_GS_CHAT, "LRCchat");
			/**跨服boss*/
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_TELL_LOCAL_STATE, "LRCActState");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_MINUE_NUM, "LRCminueNum");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_GET_LOCAL_DATA, "LRCgetLocalData");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_UPLOAD_LOCAL_DATA, "CRLGlobalData");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_UPLOAD_CROSS_DATA, "LRCGlobalData");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_BOSS_KILL, "LRCBossKill");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_GM, "CRLGMData");
			doRegExt(CrossBossIO.class, CrossConst.CROSSBOSS_LOGIN_SUCCESS, "LRCloginSuccess");
			
			/** 单刀赴会 */
			doRegExt(SoloRunIO.class, CrossConst.SOLORUN_SG_MATCH, "askMatch");
			doRegExt(SoloRunIO.class, CrossConst.SOLORUN_SG_UPDATE_GRADE, "updateGradeAndScore");
			doRegExt(SoloRunIO.class, CrossConst.SOLORUN_SG_GET_RANKLIST, "getRankList");
			//乱世枭雄（最强王者）
			doRegExt(CrossKingLocalIO.class, CrossConst.KING_GS_SYNCINFO, "LRCsyncInfo");
			doRegExt(CrossKingLocalIO.class, CrossConst.KING_GS_NOTICE, "LRCnotice");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_GETINFO, "CRLgetInfo");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_CHECKCHALLENGE, "CRLcheckChallenge");
			doRegExt(CrossKingLocalIO.class,CrossConst.KING_GS_LOADRANKDATA,"LRCloadRankData");
			doRegExt(CrossKingCrossIO.class,CrossConst.KING_SG_BATTLEREST,"CRLgetBattleReward");
			doRegExt(CrossKingLocalIO.class, CrossConst.KING_GS_UPDATEBEBATTLE, "LRCupdateBeBattle");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_GETJINJIDATA, "CRLgetJinJiData");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_GETRANKLIST, "CRLgetRankList");
			doRegExt(CrossKingLocalIO.class, CrossConst.KING_GS_SENDDWAWARD, "LRCsendDwAward");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_GM, "CRLgm");
			doRegExt(CrossKingCrossIO.class, CrossConst.KING_SG_GMCHARGE, "CRLgmcharge");
			doRegExt(CrossKingCrossIO.class, CrossConst.CROSSSK_SG_ADDNPC, "CRLgmAddNpc");
			/** 三国无双 */
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_SG_GETPONDAWARD, "getPondAward");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_GS_UPDATEPOND, "updatePond");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_GS_UPDATEMATCH, "updateMatchData");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_GS_UPDATESTATE, "updateState");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_SG_UPDATEHERO, "updateFightModel");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_SG_GM, "gmHandle");
			doRegExt(DynastyWarriorsIO.class, CrossConst.DYNASTYWARRIORS_GS_UPDATEHERODATA, "updateHeroData");
			/** 群英榜 */
			doRegExt(HeroesListIO.class, CrossConst.HEROESLIST_SG_UPDATESCORE, "updateScore");
			doRegExt(HeroesListIO.class, CrossConst.HEROESLIST_SG_UPDATERANK, "updateRank");
			doRegExt(HeroesListIO.class, CrossConst.HEROESLIST_GS_UPDATERANK, "lastUpdateRank");
			//枭雄争霸
			doRegExt(CrossSelectKingLocalIO.class, CrossConst.CROSSSK_GS_SYNCALLDATA, "LRCcrossSelectInfo");
			doRegExt(CrossSelectKingLocalIO.class, CrossConst.CROSSSK_GS_NOTICE, "LRCnotice");
			doRegExt(CrossSelectKingLocalIO.class, CrossConst.CROSSSK_GS_CHANGENODE, "LRCchangeNode");
			doRegExt(CrossSelectKingLocalIO.class, CrossConst.CROSSSK_GS_SYNSTRENGTH, "LRCsynStrength");
			doRegExt(CrossSelectKingCrossIO.class, CrossConst.CROSSSK_SG_SYNSTRENGTH, "CRLsynStrength");
			doRegExt(CrossSelectKingLocalIO.class, CrossConst.CROSSSK_GS_UPDATEALLJOINER, "LRCUpdateAlljoiner");
			doRegExt(CrossSelectKingCrossIO.class, CrossConst.CROSSSK_SG_GM, "CRLgm");

			//版本号等工具
			doRegExt(RedeployIO.class, CrossConst.GET_ALL_VERSION_CS, "getAllVersionCS");
			doRegExt(RedeployIO.class, CrossConst.GET_ALL_VERSION_LC, "getAllVersionLC");
			doRegExt(RedeployIO.class, CrossConst.GET_ONE_VERSION_CL, "getVersionCL");
			doRegExt(RedeployIO.class, CrossConst.SEND_ONE_VERSION_CL, "sendVersionTo9999CL");
			doRegExt(RedeployIO.class, CrossConst.GET_CROSS_VERSION_LC, "getAllCrossVersionLC");
			doRegExt(RedeployIO.class, CrossConst.GROOVY_BY_ZID_CS, "groovyByZidCS");
			doRegExt(RedeployIO.class, CrossConst.GROOVY_BY_ZID_CHECK_CS, "groovyByZidCheckCS");
			doRegExt(RedeployIO.class, CrossConst.GROOVY_CONVENEINT_BY_ZID_CS, "groovyConveneintByZidCS");
			doRegExt(RedeployIO.class, CrossConst.GROOVY_CONVENEINT_BY_ZID_CHECK_CS, "groovyConveneintCS");
			doRegExt(RedeployIO.class, CrossConst.LOG_EXCEPTION_LC, "getLogExceptiomByZIDListLC");
			doRegExt(RedeployIO.class, CrossConst.LOG_EXCEPTION_TO_LOCAL_CL, "getLogExceptionDataCL");
			doRegExt(RedeployIO.class, CrossConst.LOG_EXCEPTION_RESULT_TO_9999_CL, "saveLogExceptionDataCL");
			doRegExt(RedeployIO.class, CrossConst.LOG_EXCEPTION_CS, "initExceptionNumCS");
			doRegExt(RedeployIO.class, CrossConst.LOG_EXCEPTION_RESULT_CS, "getExceptionNumResultCS");
			//跨服组队副本
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_VOICE_CL, "sendNewTeamDataCL");
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_SAVE_BATTLE_TIMES_CL, "saveBattleTimesCL");
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_CHACK_TEAM_LC, "checkTeamIDLC");
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_REFLASH_NUM_LC, "reflashNumLC");
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_REFLASH_BATTLE_LC, "battleCL");
			doRegExt(CrossTeamFuBenIO.class, CrossConst.CROSS_TEAM_FUBEN_REFLASH_ADDTIMES_LC, "reflashAddTimes");
			//升阶秘境
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_VOICE_CL, "sendNewTeamDataCL");
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_CHACK_TEAM_LC, "checkTeamIDLC");
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_SAVE_DATA_CL, "saveBattleDataCL");
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_REFLASH_BATTLE_LC, "battleCL");
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_VOICE_RED_EQUIP_LC, "voiceRedEquipCL");
			doRegExt(CrossSJMiJingIO.class, CrossConst.CROSS_S_J_MI_JING_SAVE_DATA_LC, "saveBattleDataLC");
			//玲珑阁跨服
			doRegExt(LingLongGeLocalIO.class, CrossConst.CROSSS_GS_BUY, "GSBuyinfo");
			doRegExt(LingLongGeLocalIO.class, CrossConst.CROSSS_SG_BUY, "LRCBuyinfo");
			doRegExt(LingLongGeLocalIO.class, CrossConst.CROSSS_GS_GETALLBUYINFO, "LRCAllBuyinfo");
			/* 烽火狼烟 */
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_SG_ENTER, "askEnter");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_SG_GET_SCORE, "getScore");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_SG_APPLY, "apply");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_GS_SENDAWARD, "sendRankAward");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_GS_BOARD, "board");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_SG_SCOREAWARD_UPDATE, "awardUpdate");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_GS_LEAVE, "leaveCd");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_GS_LEVY_AWARD, "levyAward");
			doRegExt(CrossFireBeaconIO.class, CrossConst.FIREBEACON_GS_OCCUPY_AWARD, "occupyAward");
			/** 圣兽降临-圣兽寻宝 */
			doRegExt(SaintMonsterTreasureIO.class, CrossConst.SAINT_MONSTER_TREASURE_RANK_UPDATE, "updateRank");
			doRegExt(SaintMonsterTreasureIO.class, CrossConst.SAINT_MONSTER_TREASURE_RANK_ASKUPDATE, "askUpdate");
			doRegExt(SaintMonsterTreasureIO.class, CrossConst.SAINT_MONSTER_TREASURE_RANK_SENDREWARD, "sendReward");
			//三国庆典-豪礼转盘
			doRegExt(CelebrationHaoLiZhuanPanIO.class, CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_LC, "sendRecordLC");
			doRegExt(CelebrationHaoLiZhuanPanIO.class, CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_CL, "sendRecordCL");
			//问鼎天下
			doRegExt(CrossWenDingTianXiaIO.class, CrossConst.CROSS_WEN_DING_TIAN_XIA_GET_TOP10_STR_CL, "getAllServerTop10StrengthCL");
			doRegExt(CrossWenDingTianXiaIO.class, CrossConst.CROSS_WEN_DING_TIAN_XIA_BEGIN_CL, "sendBeginTimeAndStarCL");
			doRegExt(CrossWenDingTianXiaIO.class, CrossConst.CROSS_WEN_DING_TIAN_XIA_SEND_RANK_AWARDS_CL, "sendRankAwardsCL");
			doRegExt(CrossWenDingTianXiaIO.class, CrossConst.CROSS_WEN_DING_TIAN_XIA_GM_GM_GM_LC, "gmLC");
			doRegExt(CrossWenDingTianXiaIO.class, CrossConst.CROSS_WEN_DING_TIAN_XIA_SAVE_MVP_CL, "saveMvpCL");
			//跨服战场boss
			doRegExt(ZcBossCrossIO.class, CrossConst.CROSS_ZCBOSS_CL, "getZcBossMapCL");
			doRegExt(ZcBossCrossIO.class, CrossConst.CROSS_ZCBOSS_SATE_CL, "getZcBossStateCL");
			doRegExt(ZcBossCrossIO.class, CrossConst.CROSS_ZCBOSS_QUIT, "getNoticeQuit");
			doRegExt(ZcBossCrossIO.class, CrossConst.CROSS_ZCBOSS_NOTICE_KILLER, "getAddFristKill");
			doRegExt(ZcBossCrossIO.class, CrossConst.CROSS_ZCBOSS_KILLER, "getAddKill");
			//神将送礼(活动)
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_CONN_CL, "getRankListFromCen");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_LC, "addUpdateRankFromLocal");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_CL, "addUpdateRankFromCen");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_SENDMAILAWARD_CL, "sendMailAwardFromCen");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_SENDLASTRANKLIST_CL, "getLastRankListFromCen");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_SENDRANKLIST_CL, "getRankListDataFromCen");
			doRegExt(CrossGodGenSendGiftActIO.class, CrossConst.CROSS_GODGENSENDGIFT_SYNC_NEWQSDATA_CL,
					"addNewQsDataFromCen");
			//跨服矿藏
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_OPENUI_LC, "CRLgetUIinfo");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_INVITATION_LC, "CRLinvitation");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_JOIN_MINE_LC, "CRLjoinMine");
			doRegExt(CrossMineLocalIO.class, CrossConst.CROSS_MINE_INVITATION_CL, "sendInvitationInfo");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_REFRESH_MINE_LC, "CRLrefreshMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_START_MINE_LC, "CRLstartMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_KICK_MINER_LC, "CRLkickMiner");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_LEAVE_MINE_LC, "CRLleaveMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_GOTO_MINE_LC, "CRLgotoMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_SEARCH_MINE_LC, "CRLsearchMine");
			doRegExt(CrossMineLocalIO.class, CrossConst.CROSS_MINE_PUSH_MINE_CL, "sendNewMinerInfo");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_GET_AWARD_LC, "CRLgetMineReward");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_FightMine, "CRLfightMine");			
			doRegExt(CrossMineLocalIO.class, CrossConst.CROSS_MINE_NoticeFightMine, "LRCIsfightMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_FightMine, "CRLfightMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_stealMine, "CRLstealMine");
			doRegExt(CrossMineLocalIO.class, CrossConst.CROSS_MINE_NoticeStealMine, "LRCNoticeStealMine");
			doRegExt(CrossMineIO.class, CrossConst.CROSS_MINE_ChangeName, "CRLChangeName");
			//八门金锁-鉴定排名
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_CONNSENDRANK_CL, "getRankFromCen");
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SYNCTIME_CL, "syncTimeFromCen");
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_CL, "syncRankToLocal");
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SENDMAILAWARD_CL, "sendMailAwardToLocal");
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_LC, "updateRankFromLocal");
			doRegExt(CrossEightDoorAppraiseRankIO.class, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_GM, "gmFromCen");
			// 少年英主-祈愿排名
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_CONNSENDRANK_CL, "getRankFromCen");
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_SYNCTIME_CL, "syncTimeFromCen");
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_CL, "syncRankToLocal");
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_SENDMAILAWARD_CL, "sendMailAwardToLocal");
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_LC, "updateRankFromLocal");
			doRegExt(CrossShaoZhuQiYuanRankIO.class, CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_GM, "gmFromCen");
			/** 圣兽洗练 */
			doRegExt(SaintMonsterWashRankIO.class, CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE, "updateRank");
			doRegExt(SaintMonsterWashRankIO.class, CrossConst.SAINT_MONSTER_WASH_RANK_ASKUPDATE, "askUpdate");
			doRegExt(SaintMonsterWashRankIO.class, CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD, "sendReward");
			doRegExt(SaintMonsterWashRankFunction.class, CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE_CL, "Update");
			// doRegExt(SaintMonsterWashRankIO.class, CrossConst.SAINT_MONSTER_WASH_RANK_GM,
			// "gmFromCen");
			doRegExt(SaintMonsterWashRankFunction.class, CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD_CL,
					"crossSendReward");
			/** 万兽之王-仙山寻兽排名*/
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_LC, "updateRank");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_CL, "updateRankLocal");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_LC, "noticeCentralOpen");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_CL, "noticeLocalOpen");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_CONN_CL, "synInfo");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_ASK_LC, "askNewInfo");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_SENDREWARD, "sendReward");
			doRegExt(MonsterKingSearchMonsterIO.class, CrossConst.CROSS_MK_SEARCH_MONSTER_GET_STATE, "zeroCheck");
			
			/**虎牢关*/
			doRegExt(TigerPassCrossCrossIO.class, CrossConst.TIGER_JOIN_EMPLOY, "CRLaddemploy");
			doRegExt(TigerPassCrossCrossIO.class, CrossConst.TIGER_RESH_EMPLOYLIST, "CRLreshemploylist");
			doRegExt(TigerPassCrossCrossIO.class, CrossConst.TIGER_CHOOSE_EMPLOY, "CRLchooseemployer");
			doRegExt(TigerPassLocalIO.class, CrossConst.TIGER_BECHOOSE_REWARD, "LRCbechooseReward");
			
			
			// 微信分享
			doRegExt(WeiXinShareHTIO.class, CrossConst.WEI_XIN_SHARE_FRIEND_LH, "LHnoticFriend");
			doRegExt(WeiXinShareIO.class, CrossConst.WEI_XIN_SHARE_FRIEND_HL, "HLnoticFriend");
			doRegExt(WeiXinShareHTIO.class, CrossConst.WEI_XIN_SHARE_MONEY_LH, "LHnoticMoney");
			doRegExt(WeiXinShareIO.class, CrossConst.WEI_XIN_SHARE_MONEY_HL, "HLnoticMoney");
			
			//充值排行(活动)
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_CONNSENDRANK_CL, "connEventFromCen");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_LC, "addUpdateRankFromLocal");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_CL, "addUpdateRankFromCen");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_SENDMAILAWARD_CL, "sendMailAwardFromCen");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_SYNC_NEWQSDATA_CL, "addNewQsDataFromCen");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_GM_LC, "gmFromLocal");
			doRegExt(CrossRechargeRankActIO.class, CrossConst.CROSS_RECHARGE_RANK_ACT_GM_CL, "gmFromCen");
			
			// 鉴定排名(活动)
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_CONNSENDRANK_CL, "connEventFromCen");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_LC, "addUpdateRankFromLocal");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_CL, "addUpdateRankFromCen");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SENDMAILAWARD_CL, "sendMailAwardFromCen");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SYNC_NEWQSDATA_CL, "addNewQsDataFromCen");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_LC, "gmFromLocal");
			doRegExt(CrossEightDoorAppraiseRankActIO.class, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_CL, "gmFromCen");
			// 祈愿排名(活动)
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_CONNSENDRANK_CL, "connEventFromCen");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_ADDUPDATERANK_LC, "addUpdateRankFromLocal");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_ADDUPDATERANK_CL, "addUpdateRankFromCen");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_SENDMAILAWARD_CL, "sendMailAwardFromCen");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_SYNC_NEWQSDATA_CL, "addNewQsDataFromCen");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_GM_LC, "gmFromLocal");
			doRegExt(CrossShaoZhuQiYuanRankActIO.class, CrossConst.SHAOZHU_QIYUANRANK_ACT_GM_CL, "gmFromCen");
			//通用排行
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_CONNSENDRANK_CL, "connEventFromCen");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_LC, "addUpdateRankFromLocal");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_CL, "addUpdateRankFromCen");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_SENDMAILAWARD_CL, "sendMailAwardFromCen");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_SYNC_NEWQSDATA_CL, "addNewQsDataFromCen");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_GM_LC, "gmFromLocal");
			doRegExt(CrossCommonRankIO.class, CrossConst.CROSS_COMMONRANK_GM_CL, "gmFromCen");
			// 群雄逐鹿
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_ENTER_MAP_LC, "CRLenterMap");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_MOVE_LC, "CRLmove");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_SHOW_CITY_INFO_LC, "CRLshowCityInfo");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_ATTACK_LC, "CRLattack");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_OPEN_RANK_UI_LC, "CRLopenRankUI");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_OPEN_RECORD_LC, "CRLopenRecord");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_OPEN_COUNTRY_RANK_UI_LC, "CRLopenCountryRankUI");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_BUY_STA_LC, "CRLbuySta");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_GET_DEFEND_AWARD_INFO_LC, "CRLgetDefendAwardInfo");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_GOT_DEFEND_AWARD_LC, "CRLgotDefendAward");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_BATTLE_RESULT_LC, "CRLbattleResult");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_HONG_DIAN_LC, "CRLhongDian");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_BROAD_CAST_CL, "CRLbroadCast");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_ADD_TI_LI_LC, "CRLaddTiLi");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_NOTICE_LAST_MVP_NAME_LC, "CRLsendLastMvpName");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_NOTICE_MOVE_LC, "CRLnoticeMove");
			doRegExt(CrossZhuLuIO.class, CrossConst.CROSS_ZHU_LU_NOTICE_MAIL_LC, "CRLsendMail");
			
			//申请服务器报名参加 粮草抢夺
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_SG_APPLY, "apply");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_GS_STATE, "localReceiveSate");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_SG_GM, "RLGmSate");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_GS_OUT, "outBattleGoods");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_GS_MVP, "localReceiveMvp");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_GS_KillBossBroad, "reKillBossBroad");
			doRegExt(BattleGoodIO.class, CrossConst.BATTLEGOOD_GS_BroadById, "receiveBroadById");
			
			// 跨服试炼
			doRegExt(CrossTrialIO.class, CrossConst.CROSS_TRIAL_GET_ENEMY, "getEnemyInfo");
			doRegExt(CrossTrialIO.class, CrossConst.CROSS_TRIAL_NEXT_ENEMY, "getNextEnemy");
			doRegExt(CrossTrialIO.class, CrossConst.CROSS_TRIAL_UPLOAD_RANK, "uploadRankingData");
			doRegExt(CrossTrialIO.class, CrossConst.CROSS_TRIAL_ASK_UPLOAD, "askUpload");
			doRegExt(CrossTrialIO.class, CrossConst.CROSS_TRIAL_CLEAR, "gmCrossTrialClear");
			
			//跨服王者
			doRegExt(CrossTeamKingIO.class, CrossConst.CROSS_TEAMKING_YAOQING, "sendTeamYaoqing");
			doRegExt(CrossTeamKingIO.class, CrossConst.CROSS_TEAMKING_UpDateLocalModel, "LRCupdateTeamid");
			doRegExt(CrossTeamKingIO.class, CrossConst.CROSS_TEAMKING_UpdateleftNum, "CRLupdateleftNum");
			doRegExt(CrossTeamKingIO.class, CrossConst.CROSS_TEAMKING_RANK, "LRCrank");
			doRegExt(CrossTeamKingIO.class, CrossConst.CROSS_TEAMKING_STATE, "LRCactState");
			
			// 镇守四方
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_OPEN_UI, "openUI");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_DISPATCH, "dispatch");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_GET_AWARD, "getAward");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_RECALL, "recall");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_OPEN_PLUNDER_UI, "openPlunderUI");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_PLUNDER, "plunder");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_REFRESH, "refresh");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_BATTLE_RESULT, "battleResult");
			doRegExt(GuardAreaIO.class, CrossConst.CROSS_GUARD_AREA_ZHAN_BAO, "openReportUI");
			
			//宴会
			doRegExt(YanhuiCrossIO.class, CrossConst.LOCAL2CROSS_CROSSOPENLISTUI, "crossOpenListUI");
			doRegExt(YanhuiCrossIO.class, CrossConst.LOCAL2CROSS_CROSSJUBAN, "crossJuban");
			doRegExt(YanhuiCrossIO.class, CrossConst.LOCAL2CROSS_CROSSFUYAN, "crossFuyan");
			doRegExt(YanhuiCrossIO.class, CrossConst.LOCAL2CROSS_CROSSREDPOINT, "crossRedPoint");
			doRegExt(YanhuiCrossIO.class, CrossConst.CROSS2LOCAL_LOCALYAOQING, "localYaoqing");
			doRegExt(YanhuiCrossIO.class, CrossConst.CROSS2LOCAL_LOCALMAILREWARD, "localMailReward");
			doRegExt(YanhuiCrossIO.class, CrossConst.CROSS2LOCAL_LOCALJINGJIU, "localJingjiu");
			doRegExt(YanhuiCrossIO.class, CrossConst.CROSS2LOCAL_LOCALFUYANREWARD, "localFuyanReward");
			doRegExt(YanhuiCrossIO.class, CrossConst.LOCAL2CROSS_CROSSSHENQING, "crossShenqing");

			//天降红包(活动)
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_CON_CL, "connEventFromCen");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_SEND_LC, "sendRedPacketFromLocal");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_SEND_CL, "updateSendFromCen");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_GET_LC, "getRedPacketFromLocal");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_GET_CL, "updateGetFromCen");
//			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_START_LC, "sendQSFromLocal");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_GM_LC, "gmFromLocal");
			doRegExt(CrossDropRedPacketIO.class, CrossConst.CROSS_DROPREDPACKET_GM_CL, "gmFromCen");
			
			//做元宵
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_INIT_LC,"CRLinitJoiner");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_GETLIST_LC,"CRLgetList");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_GETMYINFO_LC,"CRLgetMyYuanXiaoInfo");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_BATTLE_LC,"CRLbattle");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_CAILIAO_CL,"LRCUpDateCailiao");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_RESH_LC,"CRLreshBattleList");
			doRegExt(YuanXiaoCrossIO.class,CrossConst.YUANXIAO_USECAILIAO_LC,"CRLreshBattleList");
			
			//红包系统
			doRegExt(RedBoxCrossIO.class,CrossConst.REDBOXACT_FA_LC,"CRLfaRedBox");
			doRegExt(RedBoxCrossIO.class,CrossConst.REDBOX_CHANGE,"LRCRedBoxMapChange");
			doRegExt(RedBoxCrossIO.class,CrossConst.REDBOX_GETBOX,"CRLGetBox");
			doRegExt(RedBoxCrossIO.class,CrossConst.REDBOX_ALLMAP,"LRCRedBoxMapByChannel");

			// 府邸系统
			doRegExt(HouseIO.class, CrossConst.CROSS_HOUSE_UPDATE_FIGHT, "updateHouseFight");
			doRegExt(HouseIO.class, CrossConst.CROSS_HOUSE_UP_DC, "upDc");
			doRegExt(HouseIO.class, CrossConst.CROSS_HOUSE_DAILY_NOTIC, "dailyNotic");
			
			// 擂台比武
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_ACT_OPEN, "actOpen");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_FIGHT_START, "fightStart");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_FIGHT_END, "fightEnd");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_FIGHT_NPC_REWARD, "npcReward");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_FIGHT_REWARD, "sendReward");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_FIGHT_WIN_BOARD, "winBoard");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_ASK_OPEN_STATE, "askActSTate");
			doRegExt(ArenaFightIO.class, CrossConst.CROSS_ARENA_LOSE_TIPS, "loseTips");
			
			// 轮回副本
			doRegExt(RebornFBIO.class, CrossConst.CROSS_REBORN_FB_YAOQING, "sendYaoQingCL");
			doRegExt(RebornFBIO.class, CrossConst.CROSS_REBORN_FB_END, "saveBattleDataCL");
			doRegExt(RebornFBIO.class, CrossConst.CROSS_REBORN_FB_ZERO, "saveBattleDataLC");

			//登峰造极
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_UPDATA, "crossUpdata");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_OPENUI, "crossOpenUI");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_REPLACE, "crossReplace");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_RANKREWARD, "crossRankReward");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_GETPREDICTDATA, "crossGetPredictData");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_UPSCORE, "crossUpscore");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.CROSS2LOCAL_ASKUPDATA, "localAskUpdata");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_MYRANK, "crossMyrank");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_NOTICE, "crossNotice");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.CROSS2LOCAL_SEND_BET_AWARDS, "localSendBetAwards");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.CROSS2LOCAL_SEND_RANK_AWARDS, "localSendRankAwards");
			doRegExt(DengFengZaoJiCrossIO.class, CrossConst.LOCAL2CROSS_FIRST_RANK, "crossFirstRank");

			// 攻城拔寨
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_OPEN_UI, "openUI");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_DISPATCH, "dispatch");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_GET_AWARD, "getAward");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_PLUNDER, "plunder");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_REMOVE, "remove");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_BATTLE_RESULT, "battleResult");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_ZHAN_BAO, "openReportUI");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_REPLACE, "replace");
			doRegExt(AttackCityIO.class, CrossConst.CROSS_ATTACK_CITY_CHECK, "check");
			//府邸任务目标
			doRegExt(HouseShopTaskFunction.class, CrossConst.CROSS_SUCCRSS_HOUSEGOAL, "LRCSuccessTaskOrGoal");

			// 府邸家丁刷新
			doRegExt(HouseKeeperFunction.class, CrossConst.CROSS_REPLACE_HOUSEKEEPER, "replace");
		} catch (Exception e) {
			throw new RunServerException(e,"regExt err");
		}
	}
	
	public static void doRegExt(Class<?> clazz,int cmd,String methodName) throws Exception{
		NettyCache.crossCmdToMethodCache.put(cmd, clazz.getDeclaredMethod(methodName, Channel.class,CrossData.class));
		Method insMethod = clazz.getDeclaredMethod("getIns");
		NettyCache.crossCmdToObject.put(cmd, insMethod.invoke(null));
	}
}
