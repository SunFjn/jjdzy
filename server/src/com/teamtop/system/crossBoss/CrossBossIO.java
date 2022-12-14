package com.teamtop.system.crossBoss;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBossOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.achievement.AchievementConst;
import com.teamtop.system.achievement.AchievementDao;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.crossBoss.cross.CrossBossCrossEvent;
import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.crossBoss.model.CrossBossAllGlobalData;
import com.teamtop.system.crossBoss.model.CrossBossLocalGlobalData;
import com.teamtop.system.crossBoss.model.CrossBossRankModel;
import com.teamtop.system.crossBoss.model.ZSBossHis;
import com.teamtop.system.crossBoss.model.ZSBossHisModel;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornTaskConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_seven_223;
import excel.struct.Struct_seven_223;
import io.netty.channel.Channel;

/**
 * ??????boss IO
 * @author Administrator
 *
 */
public class CrossBossIO {
	private static CrossBossIO ins = null;

	public static synchronized CrossBossIO getIns() {
		if (ins == null) {
			ins = new CrossBossIO();
		}
		return ins;
	}
	/**
	 * ??????????????????????????? (??????????????????????????????)
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.state, CrossBossCache.CROSS_STATE);
			
			//??????????????????
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_GET_LOCAL_DATA, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					LogTool.info("connEvent,matchServer:"+channel, this);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "CrossBossFunction connEvent Exception!");
		}
	}
	/**
	 * ???????????????????????????????????????
	 * @param channel
	 * @param data
	 */
	public void LRCgetLocalData(Channel channel,CrossData data){
		try {
			int state = (int) data.getObject(CrossBossEnum.state, Integer.class);
			
			CrossBossCache.CROSS_STATE = state;
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.firstZoneid, GameProperties.getFirstZoneId());
			crossData.putObject(CrossBossEnum.zoneids, GameProperties.zoneids);
			//??????????????????
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_UPLOAD_LOCAL_DATA, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					LogTool.info("LRCgetLocalData,matchServer:"+channel, this);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "LRCgetLocalData connEvent Exception!");
		}
	}
	
	public void CRLGlobalData(Channel channel, CrossData data) {
		OpTaskExecutorService.PublicOrderService.execute(new CrossBossOpTaskRunnable() {

			@Override
			public void run() {
				CRLGlobalDataHandle(channel, data);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.CROSS_BOSS;
			}
		});
	}

	/**
	 * ?????????????????????????????????
	 * @param channel
	 * @param data
	 */
	public void CRLGlobalDataHandle(Channel channel, CrossData data) {
		try {
			int partId = CrossCache.getPartId(channel);
			Map<Integer, Integer> zsBossZoneidMap = CrossBossCache.getZsBossZoneidMap(partId);
			Map<Integer, Integer> minZoneidMap = CrossBossCache.getMinZoneidMap(partId);
			CrossBossAllGlobalData cossBossAllGlobalData= CrossBossCache.getCrossBossAllGlobalData();
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossBossLocalGlobalData>> nowGlobalData = cossBossAllGlobalData
					.getNowGlobalData();
			ConcurrentHashMap<Integer, CrossBossLocalGlobalData> concurrentHashMap = nowGlobalData.get(partId);
			if (concurrentHashMap == null) {
				concurrentHashMap = new ConcurrentHashMap<>();
				nowGlobalData.put(partId, concurrentHashMap);
			}
			
			StringBuffer buffer = new StringBuffer();
			int firstZoneid = (int) data.getObject(CrossBossEnum.firstZoneid, Integer.class);
			buffer.append(firstZoneid).append(":");
			Type type = new TypeReference<List<Integer>>() {}.getType();
			List<Integer> zoneids = data.getObject(CrossBossEnum.zoneids, type);
			if(zoneids!=null){
				for(Integer zoneid:zoneids){
					buffer.append(zoneid).append(",");
					//???????????????????????????(?????????????????????)
					if(zsBossZoneidMap.containsKey(zoneid)){
						zsBossZoneidMap.remove(zoneid);
					}
					if(minZoneidMap.containsKey(zoneid)){
						minZoneidMap.remove(zoneid);
					}
					//????????????
					zsBossZoneidMap.put(zoneid, firstZoneid);
				}
			}
			minZoneidMap.put(firstZoneid, firstZoneid);
			int roomId=firstZoneid/CrossBossConst.ZONEIDSIZE;
			CrossBossLocalGlobalData crossBossLocalGlobalData;
			if (!concurrentHashMap.containsKey(roomId)) {
				crossBossLocalGlobalData=new CrossBossLocalGlobalData();
				Map<Integer, ZSBossHis> bossHisMapByBossid=new ConcurrentHashMap<Integer, ZSBossHis>();
				crossBossLocalGlobalData.setBossHisMapByBossid(bossHisMapByBossid);
				for (Struct_seven_223 seven_223:Config_seven_223.getIns().getMap().values()) {
					ZSBossHis zsBossHis = new ZSBossHis();
					zsBossHis.setBossId(seven_223.getId());
					zsBossHis.setCountryRankList(new ArrayList<ZSBossHisModel>());
					zsBossHis.setHeroRankList(new ArrayList<ZSBossHisModel>());
					bossHisMapByBossid.put(seven_223.getBoss(), zsBossHis);
				}
				crossBossLocalGlobalData.getZoneids().add(firstZoneid);
				concurrentHashMap.put(roomId, crossBossLocalGlobalData);
				
			}else {
				crossBossLocalGlobalData=concurrentHashMap.get(roomId);
				crossBossLocalGlobalData.getZoneids().add(firstZoneid);
			}
    		CrossData crossData = new CrossData();
    		crossData.putObject(CrossBossEnum.crossBossGlobalData, crossBossLocalGlobalData);
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_UPLOAD_CROSS_DATA, crossData, new Callback() {
    			@Override
    			public void dataReci(Channel channel, CrossData crossData) {
    				LogTool.info("tell ctl  server done,crossBossLocalGlobalData:"+channel, this);
    			}
    		});
			LogTool.info("CRLGlobalData :"+buffer.toString(), this);
		} catch (Exception e) {
			LogTool.error(e, this, "CRLGlobalData connEvent Exception!");
		}
	}
	
	/**
	 * ???????????????????????????????????????:??????boss????????????
	 * @param channel
	 * @param data
	 */
	public void LRCActState(Channel channel,CrossData data){
		try {
			int state = (int) data.getObject(CrossBossEnum.state, Integer.class);
			if(CrossBossCache.CROSS_STATE==state) return;
			LogTool.info("local tell cross state:"+state+"  "+GameProperties.getFirstZoneId(),CrossBossIO.class);
			CrossBossCache.CROSS_STATE=state;
			if(state == CrossBossConst.STATE_READY){
				//ChatManager.getIns().broadCast(ChatConst.BROCAST_KFBOSS_READY, new Object[]{});
			}else if(state == CrossBossConst.STATE_START){
				//ChatManager.getIns().broadCast(ChatConst.BROCAST_KFBOSS_START, new Object[]{});
				CrossBossLocalCache.dieBoss.clear();
			}
			Map<Long,Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()){
				if(hero==null||!hero.isOnline()){
					continue;
				}
				//
				if (state == CrossBossConst.STATE_START) {
					CrossBossFunction.getIns().noticeBossSate(hero, 0, 1);
				}
				//??????
				CrossBossManager.getIns().showInfo(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossBossIO.class, "LRCActState has wrong");
		}
		
	}
	/**
	 * ????????????????????? ??????boss???????????????
	 * @param channel
	 * @param data
	 */
	public void LRCGlobalData(Channel channel,CrossData data){
		try {
			CrossBossLocalGlobalData crossBossLocalGlobalData = (CrossBossLocalGlobalData) data.getObject(CrossBossEnum.crossBossGlobalData, CrossBossLocalGlobalData.class);
			CrossBossLocalCache.crossBossLocalGlobalData = crossBossLocalGlobalData;
			String dataStr = ObjStrTransUtil.toStr(crossBossLocalGlobalData);
			LogTool.info("localReceiveData :"+dataStr, this);
		} catch (Exception e) {
			LogTool.error(e, this, "LRCGlobalData connEvent Exception!");
		}
	}
	
	/**
	 * ?????????????????????????????????boss??????
	 * @param channel
	 * @param data
	 */
	public void CTLminueNum(Channel channel,long hid){
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.hid, hid);
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_MINUE_NUM, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "CTLminueNum CTLminueNum Exception!");
		}
	}
	/**
	 * ????????????????????? ???????????????boss??????
	 * @param channel
	 * @param data
	 */
	public void LRCminueNum(Channel channel,CrossData data){
		try {
			long hid = (long) data.getObject(CrossBossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			CrossBoss crossBoss = hero.getCrossBoss();
			if(crossBoss!=null&&crossBoss.getNum()>0){
				crossBoss.setNum(crossBoss.getNum()-1);
				String usesys = hero.getTempData().getAccount().getUsesys();
				FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
						hero.getTotalStrength(), SystemIdConst.FUN_CROSS_BOSS_MH, hero.getZoneid(), hero.getPf(),
						usesys, hero.getReincarnationLevel());
				
				// ????????????-????????????
				ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_2, 1);
				// ????????????
				WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_8, 1);
				// ????????????(??????)
				WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_11, 1);
				// ????????????(??????)
				WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_13, 1);
				// ????????????(??????)
				WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_13, 1);
			}
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_3, 1);
			//??????????????????
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_MENGHUO_3, 1);
		} catch (Exception e) {
			LogTool.error(e, this, "LRCminueNum LTCminueNum Exception!");
		}
	}
	/**
	 * ????????????????????????????????????
	 * @param channel
	 * @param data
	 */
	public void CTLloginSuccess(Channel channel,long hid){
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.hid, hid);
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_LOGIN_SUCCESS, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "CTLloginSuccess  Exception!");
		}
	}
	/**
	 * ????????????????????? ??????????????????
	 * @param channel
	 * @param data
	 */
	public void LRCloginSuccess(Channel channel,CrossData data){
		try {
			long hid = (long) data.getObject(CrossBossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			CrossBoss crossBoss = hero.getCrossBoss();
			if(crossBoss!=null){
				crossBoss.setIsInBoss(CrossBossConst.INBOSS_STATE1);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "LRCminueNum LTCminueNum Exception!");
		}
	}

	
	
	
	/**
	 * ??????????????????BOSS?????????
	 * @param channel
	 * @param data
	 */
	public void LRCBossKill(Channel channel,CrossData data){
		String killName = (String) data.getObject(CrossBossEnum.killName, String.class);
		int KillBossId=(Integer)data.getObject(CrossBossEnum.bossdieid, Integer.class);
		CrossBossLocalCache.dieBoss.add(KillBossId);
		// ??????
		Type type = new TypeReference<List<CrossBossRankModel>>() {
		}.getType();
		List<CrossBossRankModel> rankList = data.getObject(CrossBossEnum.heroRankList, type);
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		int ii = 1;
		for (CrossBossRankModel model : rankList) {
			Hero hero = heroMap.get(model.getId());
			int zoneIdById = CommonUtil.getZoneIdById(model.getId());
			if (!GameProperties.zoneids.contains(zoneIdById)) {
				continue;
			}
			if (hero != null) {
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_40, ii);
			} else {
				// ??????????????????????????????
				AchievementDao.getIns().checkTask(model.getId(), AchievementConst.count_1, ii);
			}
			ii++;
		}
		//ChatManager.getIns().broadCast(ChatConst.BROCAST_KFBOSS_KILL, new Object[]{killName,KillBossId});
		//??????boss?????????
		Object[] diebossid=new Object[CrossBossLocalCache.dieBoss.size()];
		int i=0;
		for (int bossid : CrossBossLocalCache.dieBoss) {
			diebossid[i]=new Object[] {bossid};
			i++;
		}
		Map<Long, Hero> roleCache = HeroCache.getHeroMap();
		Iterator<Hero> it = roleCache.values().iterator();
		while(it.hasNext()){
			Hero role = it.next();
			//boss????????????
			CrossBossFunction.getIns().noticeBossSate(role, KillBossId, 2);
			//??????
			CrossBossSender.sendCmd_1726(role.getId(), diebossid);
		}
		
		
	}
	
	/**
	 * ??????????????????BOSS?????????
	 * @param channel
	 * @param data
	 */
	public void CTLocalBossKill(List<Integer> zoneids, String name, int bossid, List<CrossBossRankModel> heroRankList) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.killName, name);
			crossData.putObject(CrossBossEnum.bossdieid, bossid);
			crossData.putObject(CrossBossEnum.heroRankList, heroRankList);
			Channel channel;
			for(Integer zoneid:zoneids){
				channel = CrossCache.getChannel(zoneid);
				//??????????????????
				NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_BOSS_KILL, crossData,new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						LogTool.info("tell ctb CTLocalBossKill ,matchServer:"+channel, this);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, this, "CTLocalBossKill connEvent Exception!");
		}
	}
	/**
	 * ????????????????????????????????????
	 */
	public void CTLActState(List<Integer> zoneids, int state){
		try {
			CrossData crossData = new CrossData(CrossBossEnum.state, state);
			Channel channel;
			for(Integer zoneid:zoneids){
				channel = CrossCache.getChannel(zoneid);
				if(channel==null){
					continue;
				}
				NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_TELL_LOCAL_STATE, crossData,new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						LogTool.info("CTLActState tell cross server done,matchServer:"+channel+",zoneids:"+CrossCache.getZoneidListByChannel(channel), this);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, this);
		}
	}

	
	public void LTC_GM(int cmd){
		try {
			Channel channel = CrossBossCrossLoginEvent.getIns().localAsk(null, 0, null);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossBossEnum.state, cmd);
			//??????????????????
			NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_GM, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					LogTool.info("tell ctb cross server gm,matchServer:"+channel, this);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "LTC_GM GM Exception!");
		}
	}
	
	/**
	 * ?????????????????????????????????
	 * @param channel
	 * @param data
	 */
	public void CRLGMData(Channel channel,CrossData data){
		try {
			int state = (int) data.getObject(CrossBossEnum.state, Integer.class);
			CrossBossCrossEvent.getIns().fixTime(state, TimeDateUtil.getCurrentTime());
			LogTool.info("CRLGMData :"+state, this);
		} catch (Exception e) {
			LogTool.error(e, this, "CRLGMData connEvent Exception!");
		}
	}
	
	
	
	
}
