package com.teamtop.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossLoginCache;
import com.teamtop.cross.connEvent.CrossLoginType;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.cross.upload.CrossHeroSceneModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.pf.PfConst;
import com.teamtop.system.battleNew.BattleNewManager;
import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.hero.TempVariables;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.zhenYan.ZhenYan;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossFunction {
	private static Logger logger = LoggerFactory.getLogger(CrossFunction.class);
	
	
	/**
	 * 判断当前服务器是否是内测服
	 * @return true是内测服 false不是
	 */
	public static boolean isTestServer() {
		List<Integer> zoneids = GameProperties.zoneids;
//		if(GameProperties.serverAddress.equals("neice.sgzj.ptyu.net2")){
//			return false;
//		}
		if(zoneids.contains(GameConst.MAX_ZONEID-4) || zoneids.contains(GameConst.MAX_ZONEID-3) || zoneids.contains(GameConst.MAX_ZONEID-2) 
				|| zoneids.contains(GameConst.MAX_ZONEID-1) || zoneids.contains(GameConst.MAX_ZONEID)) {
			return true;
		}
		return false;
	}
	/**
	 * 请求连接中央服
	 * 上传基本数据
	 * @param hero
	 * @param type 中央服类型/系统ID
	 * @param param 附加参数 跨服类型
	 */
	public static void askCross(final Hero hero,final int type) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			final AbsCrossLoginEvent event = CrossLoginCache.getEvent(type);
			if (event == null) {
				LogTool.warn("askCross,can not found event,crossLoginType:" + type, CrossFunction.class);
				return;
			}
			//额外参数
			List<Object[]> sendParam = new ArrayList<>();
			Channel channel = event.localAsk(hero, type, sendParam);
			if (channel == null || !channel.isActive()) {
				CrossSender.sendCmd_1662(hero.getId(), 4, null);
				LogTool.warn("askCross,channel is null or notIsActive,channel:"+channel+",crossLoginType:" + type, CrossFunction.class);
				return;
			}
			Object[] tmepParam = new Object[] {};
			if(sendParam.size()>0) {
				tmepParam = sendParam.get(0);
			}
			final Object[] param = tmepParam;
			CrossSender.sendCmd_1662(hero.getId(), 1, null);// TO CLIENT：正在请求中央服务器
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.crossLoginType, type);
			crossData.putObject(CrossEnum.crossLoginParam, param);
			logger.info("AskCross1.hid:"+hero.getId()+" type:"+CrossLoginType.getSystemName(type));
			// 请求分配房间
			NettyWrite.writeXData(channel, CrossConst.ASK_CROSS, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					logger.info("AskCross2 recieve.callback1.hid:"+hero.getId()+",type:"+CrossLoginType.getSystemName(type));
					final CrossSelectRoom crossSelectRoom = (CrossSelectRoom) crossData.getObject(CrossEnum.crossSelectRoom, CrossSelectRoom.class);
					if (crossSelectRoom != null) {
						int rtn = crossSelectRoom.getRtn();
						if(rtn!=1){
							LogTool.warn("askCross,rtn:" + rtn, this);
							return;
						}
						// 分配成功
						CrossSender.sendCmd_1662(hero.getId(), 2, null);// TO CLIENT：正在准备数据
						//跨服基础信息
						CrossHeroSceneModel model = new CrossHeroSceneModel();
						CrossFunction.makeCrossBaseHeroModel(model, hero);
						model.setScene(hero.getScene());
						hero.setCrossChannel(channel);
						hero.setCrossChannelSyncTime(TimeDateUtil.getCurrentTime());
						CrossData heroData = new CrossData();
						heroData.putObject(CrossEnum.update_hero_scene, model);

						SceneFunction.getIns().getHeroBoradData(hero);
						HashMap<Object, Object> sceneShowData = hero.getSceneShowData();
						heroData.putObject(CrossEnum.sceneData, LMessageFormat.write(sceneShowData));
						heroData.putObject(CrossEnum.crossLoginType, type);
						heroData.putObject(CrossEnum.crossLoginRoomId, crossSelectRoom.getRoomId());
						heroData.putObject(CrossEnum.crossLoginParam, param);
						event.localBeforeUpload(hero, channel, param, heroData);
						// 请求上传数据
						NettyWrite.writeXData(channel, CrossConst.UPDATE_HERO_SCENE, heroData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								// 上传成功
								CrossSender.sendCmd_1662(hero.getId(), 3,crossSelectRoom.getCrossIp()  + "_" + crossSelectRoom.getCrossPort());// TO
								event.localAfterUploadSucc(hero, channel, param, crossData);
								logger.info("AskCross3.callback2.hid:"+hero.getId()+",type:"+CrossLoginType.getSystemName(type)+" ip:"+crossSelectRoom.getCrossIp()  + "_" + crossSelectRoom.getCrossPort());
							}
						});
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFunction.class, "AskCross has wrong hero id:"+hero.getId()+" name:"+hero.getName());
		}
		
	}
	/**
	 * 生成跨服基础hero数据
	 * @param model UploadHeroBaseModel的子类
	 * @param hid hid
	 * @throws Exception 查找数据错误
	 */
	public static void makeCrossBaseHeroModel(CrossHeroBaseModel model,Long hid) throws Exception{
		Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BATTLE);
		makeCrossBaseHeroModel(model, hero);
	}
	/**
	 * 生成跨服基础hero数据
	 * @param model UploadHeroBaseModel的子类
	 * @param hero hero
	 */
	public static void makeCrossBaseHeroModel(CrossHeroBaseModel model,Hero hero){
		model.setId(hero.getId());
		model.setName(hero.getName());
		model.setNameZoneid(hero.getNameZoneid());
		model.setSex(hero.getSex());
		model.setJob(hero.getJob());
		model.setLevel(hero.getLevel());
		model.setReincarnationLevel(hero.getReincarnationLevel());
		model.setZoneid(hero.getZoneid());
		model.setTotalStrength(hero.getTotalStrength());
		model.setFightAttr(hero.getFightAttr());
		model.setFinalFightAttr(hero.getFinalFightAttr());
		model.setWuJiang(hero.getWujiang());
		model.setGangId(hero.getGangId());
		model.setGangName(hero.getGangName());
		model.setCountryType(hero.getCountryType());
		model.setSkill(hero.getSkill());
		model.setIcon(hero.getSettingData().getIcon());
		model.setFrame(hero.getSettingData().getFrame());
		model.setRebornlv(hero.getRebornlv());
		model.setOfficial(hero.getOfficial());
		model.setTitleId(hero.getTitleId());
		model.setBodyModel(hero.getShowModel().getBodyModel());
		model.setGodWeapon(hero.getGodWeapon());
		model.setBelongZoneid(GameProperties.getFirstZoneId());
		model.setWuJiang(hero.getWujiang());
		if (hero.getCrossBoss()!=null) {
			model.setCrossBossNum(hero.getCrossBoss().getNum());
		}
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		int fms = 0;
		if (monsterSpiritModel != null) {
			fms = monsterSpiritModel.getFightMonsterSpiri();
		}
		model.setFightMonsterSpirit(fms);
		LittleLeader littleLeader = hero.getLittleLeader();
		if(littleLeader!=null) {	
			int withLeaderId = littleLeader.getWearType();
			model.setWithLeaderId(withLeaderId);
			if (withLeaderId!=0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				if(littleLeaderModel!=null) {					
					int withLeaderFid=littleLeaderModel.getNowFashId();
					int leaderStarId=littleLeaderModel.getStar();
					int leaderSkillId=littleLeaderModel.getActivityKillLv();
					model.setWithLeaderFid(withLeaderFid);
					model.setLeaderStarId(leaderStarId);
					model.setLeaderSkillId(leaderSkillId);
				}
			}
		}
		model.setGuanqia(hero.getCurGuanqia());
		ZhenYan zhenYan = hero.getZhenYan();
		if(zhenYan!=null) {			
			model.setZhenXinLevel(zhenYan.getZhenXinLevel());
		}
		Mount mount = hero.getMount();
		if(mount == null) {
			mount=new Mount();
			mount.setHid(hero.getId());
			mount.setMountModels(new HashMap<>());
		}
		model.setMount(mount);
		model.setVip(hero.getVipLv());
		TreasureData treasureData = hero.getTreasureData();
		if (treasureData != null) {// 只获取当前穿戴的数据上传
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			Map<Integer, TreasureModel> crossTreasureMap = new HashMap<>();

			TreasureData treasureDataCross = new TreasureData();
			treasureDataCross.setWearTreasureList(wearTreasureList);
			for (int tid : wearTreasureList) {
				if (tid > 0) {
					TreasureModel treasureModel = treasureMap.get(tid);
					crossTreasureMap.put(tid, treasureModel);
				}
			}
			treasureDataCross.setTreasureMap(crossTreasureMap);
			model.setTreasureData(treasureDataCross);
		}
		GodBook godbook = hero.getGodbook();
		if (godbook != null) {// 只获取当前穿戴的数据上传
			int wearid = godbook.getWearid();
			HashMap<Integer, GodBookModel> hasBooks = godbook.getHasBooks();
			GodBookModel godBookModel = hasBooks.get(wearid);

			HashMap<Integer, GodBookModel> crossHasBooks = new HashMap<>();
			GodBook godbookCross = new GodBook();
			godbookCross.setWearid(wearid);
			if (godBookModel != null) {
				crossHasBooks.put(wearid, godBookModel);
			}
			godbookCross.setHasBooks(crossHasBooks);
			model.setGodBook(godbookCross);
		}
	}
	/**
	 * 生成跨服场景hero数据
	 * @param model
	 * @param hero
	 */
	public static void makeCrossSceneHeroModel(CrossHeroSceneModel model,Hero hero){
		makeCrossBaseHeroModel(model, hero);
	}
	/**
	 * 生成战斗用的hero对象
	 * @param bm
	 * @return
	 */
	public static Hero makeHeroForBattle(CrossHeroBaseModel bm){
		Hero hero = new Hero();
		hero.setId(bm.getId());
		hero.setName(bm.getName());
		hero.setNameZoneid(bm.getNameZoneid());
		hero.setSex(bm.getSex());
		hero.setJob(bm.getJob());
		hero.setLevel(bm.getLevel());
		hero.setReincarnationLevel(bm.getReincarnationLevel());
		hero.setZoneid(bm.getZoneid());
		hero.setTotalStrength(bm.getTotalStrength());
		hero.setFightAttr(bm.getFightAttr());
		hero.setFinalFightAttr(bm.getFinalFightAttr());
		hero.setWujiang(bm.getWuJiang());
		hero.setGangId(bm.getGangId());
		hero.setGangName(bm.getGangName());
		hero.setSkill(bm.getSkill());
		hero.setRebornlv(bm.getRebornlv());
		hero.setCountryType(bm.getCountryType());
		SettingData settingData = new SettingData();
		settingData.setIcon(bm.getIcon());
		settingData.setFrame(bm.getFrame());
		hero.setIcon(bm.getIcon());
		hero.setFrame(bm.getFrame());
		hero.setSettingData(settingData);
		hero.setOfficial(bm.getOfficial());
		CrossBoss crossBoss=new CrossBoss();
		crossBoss.setNum(bm.getCrossBossNum());
		hero.setCrossBoss(crossBoss);
		ShowModel showModel = new ShowModel();
		hero.setShowModel(showModel);
		showModel.setBodyModel(bm.getBodyModel());
		Mount mount = bm.getMount();
		int mountId = 0;
		if(mount != null){
			mountId = mount.getRideId();
		}
		showModel.setRideModel(mountId);
		hero.setGodWeapon(bm.getGodWeapon());
		hero.setBelongZoneid(bm.getBelongZoneid());
		hero.setWujiang(bm.getWuJiang());
		MonsterSpiritModel monsterSpiritModel = new MonsterSpiritModel();
		monsterSpiritModel.setFightMonsterSpiri(bm.getFightMonsterSpirit());
		hero.setMonsterSpiritModel(monsterSpiritModel);
		LittleLeader littleLeader = new LittleLeader();
		hero.setLittleLeader(littleLeader);
		int withLeaderId = bm.getWithLeaderId();
		littleLeader.setWearType(withLeaderId);
		if (withLeaderId!=0) {
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if(hasLittleLeaderModels==null) {
				hasLittleLeaderModels = new HashMap<>();
				littleLeader.setHasLittleLeaderModels(hasLittleLeaderModels);
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(withLeaderId);
			if(littleLeaderModel==null) {	
				littleLeaderModel = new LittleLeaderModel();
				hasLittleLeaderModels.put(withLeaderId, littleLeaderModel);
			}
			int withLeaderFid=bm.getWithLeaderFid();
			int leaderStarId=bm.getLeaderStarId();
			int leaderSkillId=bm.getLeaderSkillId();
			littleLeaderModel.setNowFashId(withLeaderFid);
			littleLeaderModel.setStar(leaderStarId);
			littleLeaderModel.setActivityKillLv(leaderSkillId);
		}
		//关卡
		hero.setLittleLeader(littleLeader);
		Guanqia guanqia=new Guanqia();
		guanqia.setCurGuanqia(bm.getGuanqia());
		hero.setGuanqia(guanqia);
		// 阵眼
		ZhenYan zhenYan = new ZhenYan();
		zhenYan.setZhenXinLevel(bm.getZhenXinLevel());
		hero.setZhenYan(zhenYan);
		//坐骑
		if(mount == null) {
			mount=new Mount();
			mount.setHid(hero.getId());
			mount.setMountModels(new HashMap<>());
		}
		hero.setMountId(mount.getRideId());
		hero.setMount(mount);
		hero.setVipLv(bm.getVip());
		// 宝物
		hero.setTreasureData(bm.getTreasureData());
		// 天书
		hero.setGodbook(bm.getGodBook());
		return hero;
	}
	/**
	 * 生成场景用的hero对象
	 * @param model
	 * @return
	 */
	public static Hero makeHeroForScene(CrossHeroSceneModel model){
		Hero hero = makeHeroForBattle(model);
		hero.setScene(model.getScene());
		return hero;
	}
	/*public static void syncWearChangeToCross(Hero hero,int systype,int wearid,int weartype){
		if(hero.getCrossChannel()==null) return;
		CrossData crossData = new CrossData();
		crossData.put(CrossEnum.systype, systype);
		crossData.put(CrossEnum.wearid, wearid);
		crossData.put(CrossEnum.weartype, weartype);
		crossData.put(CrossEnum.hid, hero.getId());
		NettyWrite.writeXData(hero.getChannel(), CrossConst.SYNC_BOARDCAST_TO_CROSS, crossData);
	}*/
	
	public static void syncHeroFightToCross(Hero hero,FightChange fc){/*
   		if(hero.getCrossChannel()==null) return;
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		long totalStrength = hero.getTotalStrength();
		int strength = hero.getStrength();
		CrossData cd = new CrossData();
		cd.put(CrossEnum.hid, hero.getId());
		if(fc.getHeroCount()>0){
			cd.put(CrossEnum.totalStrength, totalStrength);
			cd.put(CrossEnum.fightData, new FightData(finalFightAttr, strength));
		}
		
//		if(fc.getPetCount()>0){
//			FinalFightAttr petFinalFightAttr = hero.getPet().getFinalFightAttr();
//			int petStrength = hero.getPet().getStrength();
//			cd.put(CrossEnum.petFightData, new FightData(petFinalFightAttr, petStrength));
//		}
		Map<Integer, Integer> genCountMap = fc.getGenCountMap();
		if(genCountMap!=null){
			Map<Integer, FightData> genFightData = new HashMap<Integer, FightData>();
			Iterator<Entry<Integer, Integer>> it = genCountMap.entrySet().iterator();
			while(it.hasNext()){
				Entry<Integer, Integer> next = it.next();
				if(next.getValue()>0){
//					int gid = next.getKey();
//					General general = hero.getGeneral(gid);
//					FinalFightAttr genFinalFightAttr = general.getFinalFightAttr();
//					int genStrength = general.getStrength();
//					genFightData.put(gid, new FightData(genFinalFightAttr, genStrength));
				}
			}
			cd.put(CrossEnum.genFightData, genFightData);
		}
		cd.put(CrossEnum.level, hero.getLevel());
		NettyWrite.writeXData(hero.getCrossChannel(), CrossConst.SYNC_FIGHT_TO_CROSS, cd);
	*/}
	/**
	 * 同步广播的变化到中央服
	 * @param hero
	 * @param datas
	 */
	public static void syncHeroChangeToCross(Hero hero,Map<Object, Object> datas){
		if(hero==null || datas==null) return;
		try {
			if(hero.getCrossChannel()==null) return;
			Map<String, Object> chg = null;
			Map<String, Object> sceneData = null;
			chg = new HashMap<String, Object>();
			Iterator<Entry<Object, Object>> it = datas.entrySet().iterator();
			while(it.hasNext()){
				Entry<Object, Object> next = it.next();
				chg.put(next.getKey().toString(), next.getValue());
			}
			sceneData = new HashMap<String, Object>();
//			Iterator<Entry<Object, Object>> it2 = hero.getSceneShowData().entrySet().iterator();
//			while(it2.hasNext()){
//				Entry<Object, Object> next = it2.next();
//				sceneData.put(next.getKey().toString(), next.getValue());
//			}
			CrossData cd = new CrossData();
			cd.putObject(CrossEnum.hid, hero.getId());
			cd.putObject(CrossEnum.chg, LMessageFormat.write(datas));
//			cd.put(CrossEnum.sceneData, LMessageFormat.write(hero.getSceneShowData()));
			NettyWrite.writeXData(hero.getCrossChannel(), CrossConst.SYNC_BOARDCAST_TO_CROSS, cd);
		} catch (Exception e) {
//			logger.error(LogTool.exception(e, hero.getId(), "syncHeroChangeToCross err"));
		}
	}
	/**
	 * 中央服登出
	 * @param hero
	 */
	public static void logout(Hero hero){
		if(hero==null || hero.getTempData()==null) {
			LogTool.warn("Cross logout hero is null.hid:"+hero.getId()+" name:"+hero.getName(), CrossFunction.class);
			return;
		}
		TempVariables tempVariables = hero.getTempVariables();
		int crossLoginType = tempVariables.getCrossLoginType();
		LogTool.info("Cross logout start.hid:"+hero.getId()+" name:"+hero.getName()+" system:"+CrossLoginType.getSystemName(crossLoginType), CrossFunction.class);
		try {
			Channel channel = hero.getChannel();
			CrossData crossData = new CrossData(CrossEnum.hid, hero.getId());
			try {
				AbsCrossLoginEvent event = CrossLoginCache.getEvent(crossLoginType);
				if (event == null) {
					LogTool.warn("logout,can not found event,crossLoginType:" + crossLoginType, CrossFunction.class);
					return;
				}
				crossData.putObject(CrossEnum.crossLoginType, crossLoginType);
				event.crossLogout(hero,crossData);
				//退出中央服战斗
				BattleNewManager.getIns().leave(hero);
				//退出中央服场景
				SceneFunction.getIns().exitScene(hero,true);
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(), "cross event logout err"));
			}
			NettyWrite.writeXData(hero.getLocalChannel(), CrossConst.CROSS_QUIT, crossData);
//			TeamManager.getIns().quitTeam(hero);
//			SceneFunction.getIns().delHeroFromScene(hero);
//			InBattle inBattle = BattleCache.getInBattleMap().get(hero.getId());
//			if(inBattle!=null){
//				//补丁，防止没有退出战斗
//				int bid = inBattle.getBid();
//				BattleFunction.getIns().tellLocalEndBattle(hero.getId(), BattleConst.RESULT_ATT_LOSE, bid);
//				logger.info(LogTool.rec(hero.getId(), hero.getName(), "cross logout in battle,battleinfo:"+BattleCache.getBattleInfoMap().get(bid)));
//				BattleCache.getInBattleMap().remove(hero.getId());//确保玩家在中央服不在战斗
//			}
			hero.setCrossChannel(null);
			hero.setLocalChannel(null);
			HeroCache.removeHero(hero.getId());
			hero.setTempData(null);
			if(channel!=null) channel.close();
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "cross logout err"));
		}
		LogTool.info("Cross logout end.hid:"+hero.getId()+" name:"+hero.getName(), CrossFunction.class);
	}
	
	/**
	 * 判断当前服务器数据能否上传中央服务器
	 * @author lobbyer
	 * @date 2016年8月1日
	 */
	public static boolean canUploadData() {
		/*List<Integer> zoneids = GameProperties.zoneids;
		if(zoneids.contains(9995) || zoneids.contains(9996) || zoneids.contains(9997) 
				|| zoneids.contains(9998) || zoneids.contains(9999)) {
			return false;
		}*/
		return true;
	}
	/**
	 * 向子服获取将领
	 * @param hero
	 * @param gid
	 * @return
	 */
//	public static General getLocalGeneral(Hero hero,int gid){
//		CrossData crossData = new CrossData();
//		crossData.put(CrossEnum.gid, gid);
//		CrossData rs = NettyWrite.writeBlockData(hero.getLocalChannel(), CrossConst.ASK_GENERAL_FROM_LOCAL, hero.getId(), crossData);
//		General general = (General) rs.get(CrossEnum.general);
//		hero.getGeneralMap().put(gid, general);
//		return general;
//	}
	/**
	 * 根据区号分配房间
	 * 由最小的区开始算，每3个区一起打跨服帮会战，合服区算1个区，如果不是3的倍数则剩余的区服一起打跨服帮会战。
	如：1/2/3是合服区，4区是单独，5/10是合服区，6/7是合服区，8/9是合服区
	则以合服区最小的区号为准，1/2/3+4+5/10，这3个大区一起打跨服帮会战。6/7+8/9，这2个大区一起打跨服帮会战（因为只开到10服）
	 * @return
	 */
	public static void matchRoomsByZoneid(HashMap<Channel, Integer> rooms){
		rooms.clear();
		
		ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
		boolean needMatch = false;
		if(GameProperties.platform.contains(PfConst.PF_TW)){
			//台湾使用自定义分配方式
			ArrayList<RoomMatch> roomMatchExcel = CrossCache.getRoomMatchExcel();
			for(RoomMatch rm:roomMatchExcel){
				Integer room = rm.getRoom();
				List<Integer> value = rm.getZoneids();
				for(int zoneid:value){
					Channel channel = zoneidToChannel.get(zoneid);
					if(channel!=null){
						if(!rooms.containsKey(channel)){
							rooms.put(channel, room);
						}
					}
				}
			}
			if(rooms.size()==0){
				needMatch = true;
			}
		}else{
			needMatch = true;
		}
		if(needMatch){
			int maxZoneid = 0;
			for(Integer zoneid:zoneidToChannel.keySet()){
				if(zoneid>maxZoneid){
					maxZoneid = zoneid;
				}
			}
			int room =1;
			int count = 0;
			for(int i=1;i<=maxZoneid;i++){
				Channel channel = zoneidToChannel.get(i);
				if(channel!=null){
					if(!rooms.containsKey(channel)){
						count++;
						rooms.put(channel, room);
					}
					if(count==3){
						count = 0;
						room++;
					}
				}
			}
		}
		logger.info("match room,rooms:"+rooms.size()+","+rooms.keySet());
		
	}
}
