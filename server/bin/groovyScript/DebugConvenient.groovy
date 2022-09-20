
package groovyScript;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.sun.tools.classfile.Opcode.Set;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletAct;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActConst;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.model.DailyDirectBuyAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.alarmSystem.AlarmConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.boss.specialAnimalBoss.SpecialAnimalBossSysCache;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossData;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossRank;
import com.teamtop.system.crossTrial.model.TrialModel;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.exclusiveActivity.model.ExActStateInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.godOfWar.GodOfWarConst;
import com.teamtop.system.godOfWar.GodOfWarRankDao;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godWeapon.GodWeaponInfo;
import com.teamtop.system.guanqia.GuanqiaCache;
import com.teamtop.system.guanqia.GuanqiaRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialAnimalDir.model.TalentEquipInfo;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.groovy.IFoo;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chenghao_702;
import excel.config.Config_s12sc_771;
import excel.config.Config_tjhbsys_296;
import excel.config.Config_warbot_222;
import excel.config.Config_zshdb_315;
import excel.config.Config_zshddbcz_315;
import excel.config.Config_zshddbfl_315;
import excel.config.Config_zshdljcz_315;
import excel.config.Config_zshdybfl_315;
import excel.struct.Struct_s12sc_771;
import excel.struct.Struct_warbot_222;
import excel.struct.Struct_zshdb_315;

/**
 * 便捷式 
 * 小王子  1000200000000019L
 */
public class DebugConvenient implements IFoo {
//	private Logger logger = LoggerFactory.getLogger(Debug.class);
	/**	 * 返回给界面的数据	 */
	private Map<Object ,Object> groovyResult = new HashMap<Object ,Object>();
	
	@Override
	public Object run(Object foo) {
		String result = null;
		try {
			//[[10,0,29],[1,400023,1]]
			//
			int currentTime = TimeDateUtil.getCurrentTime();
			
//			StringBuilder ss = new StringBuilder();
//			List<Integer> sdf = new ArrayList<>();
//			Iterator<Struct_zshdb_315> iterator = Config_zshdb_315.getIns().getSortList().iterator();
//			for(;iterator.hasNext();){
//				Struct_zshdb_315 struct_zshdb_315 = iterator.next();
//				String hend = struct_zshdb_315.getHend();
//				try {					
//					int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
//					if(endTime<currentTime) {
////					iterator.remove();
////					Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
//					}else {
//						sdf.add(struct_zshdb_315.getId());
//					}
//				} catch (Exception e) {
//					iterator.remove();
//					Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
//					ss.append(struct_zshdb_315.getHend());
//				}
//			}
//			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
//			for(int id : openExActMap.keySet()) {
//				if(sdf.contains(id)) {
//					ss.append(id).append(",");
//				}
//			}
//			Iterator<Struct_zshdb_315> iterator1 = Config_zshdb_315.getIns().getSortList().iterator();
//			for(;iterator1.hasNext();){
//				Struct_zshdb_315 struct_zshdb_315 = iterator1.next();
//				String hend = struct_zshdb_315.getHend();
//				try {					
//					int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
//					if(endTime<currentTime) {
//						iterator1.remove();
//						Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
//					}
//				} catch (Exception e) {
//					iterator1.remove();
//					Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
//				}
//			}
//			
//			Map<Integer, Struct_zshdb_315> exActPfMap = ExclusiveActivitySysCache.getExActPfMap();
//			if(exActPfMap.size()>500){
//				ExclusiveActivitySysCache.houtaiInitExcel();
//				exActPfMap = ExclusiveActivitySysCache.getExActPfMap();
//			}
//			groovyResult.put("补偿完毕", ExclusiveActivitySysCache.getExActPfMap().size());
			
//			HashSet<Long> clearHid=new HashSet<>();
//			//需要补发的元宝
//			HashMap<Long, String> yuanbaoMap=new HashMap<>();
//			//需要补发的鉴定锤子 410046
//			HashMap<Long, String> chuiMap=new HashMap<>();
//			//400892宝箱
//			HashMap<Long, String> box1Map=new HashMap<>();
//			//400945宝箱
//			HashMap<Long, String> box2Map=new HashMap<>();
//			
//
//			
//			
//			//发元宝邮件
//			for (long hid:yuanbaoMap.keySet()) {
//				int zoneid = CommonUtil.getZoneIdById(hid);
//				List<Integer> zoneids = GameProperties.zoneids;
//				if (zoneids.contains(zoneid)) {
//					String rewardStr = yuanbaoMap.get(hid);
//					String[] arr = rewardStr.split(",");
//					int[] b = new int[3];
//					b[0] = Integer.parseInt(arr[0]);
//					b[1] = Integer.parseInt(arr[1]);
//					b[2] = Integer.parseInt(arr[2]);
//					int[][] buchang = new int[1][];
//					buchang[0] = b;
//					//hid
//					MailFunction.getIns().sendMailWithFujianData2(hid,  MailConst.MAIL_ID_SYSTEM,"八阵图异常期间消耗补发","各位主公好，八阵图异常问题已修复，附件为主公在异常时间段内八阵图的相关消耗补发，请查收。非常抱歉给您带来了不好的体验，也非常感谢您的耐心等待与支持~！祝您游戏愉快，武运昌隆~！", buchang);
//				}
//			}
//			//发鉴定锤子邮件
//			for (long hid:chuiMap.keySet()) {
//				int zoneid = CommonUtil.getZoneIdById(hid);
//				List<Integer> zoneids = GameProperties.zoneids;
//				if (zoneids.contains(zoneid)) {
//					String rewardStr = chuiMap.get(hid);
//					String[] arr = rewardStr.split(",");
//					int[] b = new int[3];
//					b[0] = Integer.parseInt(arr[0]);
//					b[1] = Integer.parseInt(arr[1]);
//					b[2] = Integer.parseInt(arr[2]);
//					int[][] buchang = new int[1][];
//					buchang[0] = b;
//					//hid
//					MailFunction.getIns().sendMailWithFujianData2(hid,  MailConst.MAIL_ID_SYSTEM,"八阵图异常期间消耗补发","各位主公好，八阵图异常问题已修复，附件为主公在异常时间段内八阵图的相关消耗补发，请查收。非常抱歉给您带来了不好的体验，也非常感谢您的耐心等待与支持~！祝您游戏愉快，武运昌隆~！", buchang);
//				}
//			}
//			//发400892宝箱 邮件
//			for (long hid:box1Map.keySet()) {
//				int zoneid = CommonUtil.getZoneIdById(hid);
//				List<Integer> zoneids = GameProperties.zoneids;
//				if (zoneids.contains(zoneid)) {
//					String rewardStr = box1Map.get(hid);
//					String[] arr = rewardStr.split(",");
//					int[] b = new int[3];
//					b[0] = Integer.parseInt(arr[0]);
//					b[1] = Integer.parseInt(arr[1]);
//					b[2] = Integer.parseInt(arr[2]);
//					int[][] buchang = new int[1][];
//					buchang[0] = b;
//					MailFunction.getIns().sendMailWithFujianData2(hid,  MailConst.MAIL_ID_SYSTEM,"八阵图异常期间消耗补发","各位主公好，八阵图异常问题已修复，附件为主公在异常时间段内八阵图的相关消耗补发，请查收。非常抱歉给您带来了不好的体验，也非常感谢您的耐心等待与支持~！祝您游戏愉快，武运昌隆~！", buchang);
//				}
//			}
////			
//			//发400945宝箱 邮件
//			for (long hid:box2Map.keySet()) {
//				int zoneid = CommonUtil.getZoneIdById(hid);
//				List<Integer> zoneids = GameProperties.zoneids;
//				if (zoneids.contains(zoneid)) {
//					String rewardStr = box2Map.get(hid);
//					String[] arr = rewardStr.split(",");
//					int[] b = new int[3];
//					b[0] = Integer.parseInt(arr[0]);
//					b[1] = Integer.parseInt(arr[1]);
//					b[2] = Integer.parseInt(arr[2]);
//					int[][] buchang = new int[1][];
//					buchang[0] = b;
//					MailFunction.getIns().sendMailWithFujianData2(hid,  MailConst.MAIL_ID_SYSTEM,"八阵图异常期间消耗补发","各位主公好，八阵图异常问题已修复，附件为主公在异常时间段内八阵图的相关消耗补发，请查收。非常抱歉给您带来了不好的体验，也非常感谢您的耐心等待与支持~！祝您游戏愉快，武运昌隆~！", buchang);
//				}
//			}
////			//清神符文碎片
//			for (long hid:clearHid) {
//				int zoneid = CommonUtil.getZoneIdById(hid);
//				List<Integer> zoneids = GameProperties.zoneids;
//				if (zoneids.contains(zoneid)) {
//					Hero hero = HeroCache.getHero(hid);
//					if(hero==null){
//						//需要从数据库查找
//						try {
//							hero = HeroDao.getIns().find(hid,null);
//							HeroCache.removeTempHero(hid);
//							HeroCache.putHero(hero);
//							SystemEventFunction.triggerInitEvent(hero);
//						} catch (Exception e) {
//							LogTool.error(e, this, "hero==null id:"+hid);
//							groovyResult.put("hero==null", "不在线"+hid);
//						}
//					}
//					if(hero!=null) {						
//						int num = BagFunction.getIns().getGoodsNumBySysId(hid, 411016);
//						boolean houtaiBagDel = BagFunction.getIns().houtaiBagDel(hid, 411016, num);
//						if (houtaiBagDel) {
//							groovyResult.put("411016 删除成功"+hid, "hid:"+hid);
//							LogTool.info("411016 删除成功hid:"+hid, BagFunction.class);
//						}
//					}
//				}
//				
//			}
//			groovyResult.put("补偿完毕", " success");
			
			
/*			TreeSet<BaseRankModel> tempLevelRank = new TreeSet<>();
			TreeSet<BaseRankModel> levelRank = new TreeSet<>();
			List<LevelRankModel> list = RankingDao.getIns().findLevel();
//			setNameAddZoneid(list);
			tempLevelRank.addAll(list);
			groovyResult.put("国家dd bossindex", tempLevelRank.size());*/
//			groovyResult.put("国家dd bossindex3", MybatisUtil.getSession(470).getConnection().getAutoCommit());
			/*CountryBossModel countryBossModel2 = CountryBossSysCache.getCountryBossCache().getCountryBossMap().get(2);
			groovyResult.put("国家2 bossindex", countryBossModel2.getBossId()+" 血量："+countryBossModel2.getCurhp()+" max血量："+countryBossModel2.getHpmax());
			CountryBossModel countryBossModel3 = CountryBossSysCache.getCountryBossCache().getCountryBossMap().get(3);
			groovyResult.put("国家3 bossindex", countryBossModel3.getBossId()+" 血量："+countryBossModel3.getCurhp()+" max血量："+countryBossModel3.getHpmax());*/
			
			long hid = 1035300000000138l;//1000400000000012l;
			Hero hero = HeroCache.getHero(hid);
			if(hero==null) {
				groovyResult.put("国家ee", "not online");
			}else {
				groovyResult.put("国家ee00", hero.getName());
			}
			//JSON.toJSONString(Config_zshdb_315.getIns().getMap())
			
			groovyResult.put("国家PPPPPPPPPPPPP", Config_zshdybfl_315.getIns().getSortList().size());//TimeDateUtil.getTimeStrByInt(TimeDateUtil.getCurrentTime(), "yyyy-MM-dd HH:mm:ss"));
//			Map<Integer, ExActStateInfo> exActOpenStateMap = hero.getExclusiveActivityData().getExActOpenStateMap();
//			HashSet<Integer> openidSet = new HashSet<>(exActOpenStateMap.keySet());
//			for (int aid : openidSet) {
//				Struct_zshdb_315 zshdb_3152 = Config_zshdb_315.getIns().get(aid);
//				if (zshdb_3152 == null) {
//					exActOpenStateMap.remove(aid);
//				}
//			}
//			groovyResult.put("openExActMap", hero.getExclusiveActivityData().getExActOpenStateMap().size());
			
/*			Iterator<GuanqiaRank> iterator = GuanqiaCache.getRankList().iterator();
			for(;iterator.hasNext();) {
				GuanqiaRank rank = iterator.next();
				if(hid==rank.getHid()) {
					iterator.remove();
					groovyResult.put("国家关卡", hid);
				}
			}*/
			
			
			/*Iterator<SpecialAnimalBossRank> iterator = SpecialAnimalBossSysCache.getPassRank().iterator();
			for(;iterator.hasNext();){
				SpecialAnimalBossRank bossRank = iterator.next();
				if(bossRank.getHid()==hid) {
					iterator.remove();
					groovyResult.put("国家异兽", hid);
				}
			}*/
			
			/*ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();
			List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
			List<Struct_warbot_222> sortList = Config_warbot_222.getIns().getSortList();
			GodOfWarRank godOfWarRank = godOfWarRankMap.get(hid);
			int ranking = godOfWarRank.getRanking();
			Struct_warbot_222 robot = null;
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				robot = sortList.get(i);
				int[][] rank = robot.getRank();
				if (ranking>=rank[0][0]&&ranking<=rank[0][1]) {
					GodOfWarRank robotRank = new GodOfWarRank();
					robotRank.setHid(ranking);
					robotRank.setJob(robot.getJob());
					robotRank.setLevel(robot.getLv());
					robotRank.setName(robot.getName());
					robotRank.setStrength(robot.getPower());
					robotRank.setIcon(robot.getHead());
					robotRank.setFrame(robot.getHeadk());
					robotRank.setRanking(ranking);
					robotRank.setRobotId(robot.getId());
					robotRank.setZoneid(GameProperties.getFirstZoneId());
					if(godOfWarRankList.get(ranking-1).getHid()==hid) {						
						godOfWarRankMap.put((long) ranking, robotRank);
						godOfWarRankList.set(ranking-1, robotRank);
						GodOfWarRankDao.getIns().delete(godOfWarRank);
						Map<Long, GodOfWarRank> mm = new HashMap<>();
						mm.put((long) ranking, robotRank);
						GodOfWarRankDao.getIns().insertOnDuplicateBatch(mm.values(), null,
								GameProperties.zoneids.get(0));
						groovyResult.put("国家ee00"+ranking,"");
					}
					break;
				}
			}*/
			
//			Map<Integer, ConcurrentSkipListSet<BaseRankModel>> rankingmap = RankingCache.getRankingmap();
//			Iterator<Integer> iterator = rankingmap.keySet().iterator();
//			for(;iterator.hasNext();) {
//				Integer id = iterator.next();
//				Iterator<BaseRankModel> iterator2 = rankingmap.get(id).iterator();
//				for(;iterator2.hasNext();) {
//					BaseRankModel model = iterator2.next();
//					if(model.getHid()==hid) {
//						iterator2.remove();
//						groovyResult.put("国家"+id, hid);
//					}
//				}
//			}
			
			
//			Iterator<SpecialAnimalDirInfo> iterator = hero.getSpecialAnimalDir().getInfoMap().values().iterator();
//			for(;iterator.hasNext();) {
//				SpecialAnimalDirInfo info = iterator.next();
//				if(info.getUpId()%100000<100) {		
//					int n = info.getUpId()/100000;
//					info.setUpId(n*100000+100);
//					groovyResult.put("国家ee"+info.getUpId(), info.getUpId());
//				}
//			}
					
//			
//			if(hero!=null) {
//				ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,DestinyBagData>> bodyData = hero.getPersonalDestiny().getBodyData();
//				ConcurrentHashMap<Integer, DestinyBagData> goalDestiny = bodyData.get(0);
//				int dd = 0;
//				for(DestinyBagData dbd : goalDestiny.values()) {
//					if(dbd.getStar()<10) {						
//						groovyResult.put("国家ee"+dd, dbd.getStar());
//						dd++;
//						dbd.setStar(10);
//					}
//				}
//			}else {
//				groovyResult.put("国家ee", "not online");
//			}
//			groovyResult.put("国家ee11", 88888);
			
			
//			hero.getQiCe().getQiCeMap().get(500008).setStar(0);
//			hero.getQiCe().getQiCeMap().get(500007).setStar(0);
//			
//			int star = hero.getQiCe().getQiCeMap().get(500007).getStar();
//			StringBuffer sBuffer = new StringBuffer();
//			ConcurrentSkipListSet<SpecialAnimalBossRank> passRank = SpecialAnimalBossSysCache.getPassRank();
//			int i=1;
//			for(SpecialAnimalBossRank rank : passRank) {
//				sBuffer.append(rank.getHid()).append(", ").append(rank.getName()).append(", ").append(rank.getPassGq()).append(", ").append(rank.getUpdateTime()).append("; ");
//			}
//			String faString = "";
//			for(int i=1;i<20;i++) {
//				AbsUseAddEvent event = UseAddCache.getEvent(i);
//				if(event==null) {
//					faString = faString+i+", ";
//				}
//			}
//			groovyResult.put("teamID hid=", RankingConst.RANK_SIZE);
//			try {
//			     HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
//			     HeroDao.getIns().update(hero,HeroDataSaver.CLEAR);
//			    } catch (Exception e) {
//			e.printStackTrace();
//			}
			
//			groovyResult.put("状态", ServerMaintainCache.MAINTAIN_STATE);
//			groovyResult.put("状态：", BattleGoodsLocalCache.getState());
			
		    
//			
//			int i=1;
//			int h=0;
//			while (minueNum>0) {
//				h++;
//				if (h>500000) {
//					break;
//				}
//				SpecialAnimalDirInfo specialAnimalDirInfo = specialAnimalDir.getInfoMap().get(i);
//				if (specialAnimalDirInfo!=null) {
//					//等级
//					int upId = specialAnimalDirInfo.getUpId();
//					//经验
//					int curExp = specialAnimalDirInfo.getCurExp();
//					if (curExp>=10) {
//						//降经验
//						specialAnimalDirInfo.setCurExp(curExp-10);
//						minueNum--;
//					}else {
//						//降等级
//						int lowLv=upId-1;
//						Struct_yssj_752 struct_yssj_752 = Config_yssj_752.getIns().get(lowLv);
//						if (struct_yssj_752!=null&&struct_yssj_752.getExp()!=0) {
//							int exp2 = struct_yssj_752.getExp();
//							specialAnimalDirInfo.setUpId(lowLv);
//							specialAnimalDirInfo.setCurExp(exp2-10);
//							minueNum--;
//						}
//					}
//				}
//				i++;
//				if (i>=8) {
//					i=1;
//				}
//			}
//			//降级降经验完了之后  降异 兽录套装表等级lv
//			for (int j = 1; j <=8; j++) {
//				SpecialAnimalDirInfo specialAnimalDirInfo = specialAnimalDir.getInfoMap().get(j);
//				if (specialAnimalDirInfo!=null) {
//					int upId = specialAnimalDirInfo.getUpId();
//					int index=j*1000+1;
//					int overid=j*1000+9;
//					for (int k = index; k <=overid; k++) {
//						Struct_ystz_752 ystz_752=Config_ystz_752.getIns().get(k);
//						if (upId>=ystz_752.getNext()) {
//							specialAnimalDirInfo.setSuitId(k);
//						}
//					}
//					//然后在降对应阶数 取等级的10位数
//					int step=(upId % 100)/10;
//					specialAnimalDirInfo.setStep(step);
//				}
//			}
//			groovyResult.put("处理完成","玩家名字："+hero.getName());	
//			try {
//			    HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
//				HeroDao.getIns().update(hero,HeroDataSaver.CLEAR);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			groovyResult.put("数据修改完成","okkkkkk");	

//			long hid = 1000400000000011L;//1000400000000011L;
//			Hero hero = HeroCache.getHero(hid);
//			if (hero==null) {
//				groovyResult.put("角色不存在","hero==null");			
//			}
//			else {
//				groovyResult.put("角色在线","hero!=null");
//				groovyResult.put("角色在线 task", hero.getTaskUser().getTaskid()+", state="+hero.getTaskUser().getState());
//				hero.getTaskUser().setState(1);
//			}
//			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
//			CrossData crossData = new CrossData();
//			crossData.putObject(CrossMineEnum.Hid, hero.getId());
//			crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());
//			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);
//
//			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_OPENUI_LC,
//					crossData);
//			if (writeBlockData != null) {
//				CrossMine crossMine = writeBlockData.getObject(CrossMineEnum.CrossMineInfo, CrossMine.class);				
//				groovyResult.put("角色在线", JSON.toJSONString(crossMine.getMinersInfo().get(2)));
//			}
			
			//Global缓存数据
			//GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.RANKLIST_TITLE);
			//logger.info("globaldata:"+globalData.getContent());
		    //在线人数
//			CrossFireBeaconSysCache.membersScoreMap.clear();
//			groovyResult.put("CrossFireBeaconSysCache.membersScoreMap size==",CrossFireBeaconSysCache.membersScoreMap.size());
//			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
//			String info = UC.getAllCacheSize();
			/*
			String proPath = "protocol.pro";
			FileInputStream fis;
				fis = new FileInputStream(URLDecoder.decode((ProtocolInvoke.class.getResource("/"+proPath).getFile()),"UTF-8"));
				DataInputStream input = new DataInputStream(fis);
				int len = input.readShort();
				for(int i=0;i<len;i++){
					int cmdId = input.readShort();
					String field = input.readUTF();
					Object[] proListToArr = null;
					if(StringUtils.isBlank(field)){
						proListToArr = new Object[0];
					}else{
						Node strToNode = NodeUtil.strToNode(field);
						proListToArr = NodeUtil.nodeToArr(strToNode);
					}
					if(cmdId!=1100) {
						continue;
					}
					groovyResult.put("在线人数", cmdId);
					NettyCache.cmd2ProtocalMap.put(cmdId, proListToArr);
				}
				input.close();
				fis.close();
			*/
//			Channel crossChannel = Client_2.getIns().getCrossChannel();
//			CrossData aaData = new CrossData();
//			NettyWrite.writeXData(crossChannel, CrossConst.HEROESLIST_SG_UPDATERANK, aaData, new Callback() {
//
//				@Override
//				public void dataReci(Channel channel, CrossData crossData) {
//					Type type = new TypeReference<TreeSet<HeroesListRank>>() {}.getType();
//					TreeSet<HeroesListRank> rankSet = crossData.getObject(HeroesListCrossType.RankingList.name(), type);
//					groovyResult.put("在线人数", JSON.toJSONString(rankSet));
//					System.err.println("在线人数88::"+JSON.toJSONString(rankSet));
//				}
//			});
			/*long hid = 1000100000000005L;
			Hero hero = HeroCache.getHero(hid);
			boolean hascache = true;
			if(hero==null){
				hascache = false;
				//需要从数据库查找
				try {
					hero = HeroDao.getIns().find(hid,null);
					HeroCache.removeTempHero(hid);
					HeroCache.putHero(hero);
					SystemEventFunction.triggerInitEvent(hero);
				} catch (Exception e) {
					LogTool.error(e, this, "id:"+hid);
				}
			}
			List<Object> sendList = new ArrayList<>();
			if(hero!=null) {
				List<Struct_shop_011> sortList = Config_shop_011.getIns().getSortList();
				for(Struct_shop_011 shop_011 :sortList) {
					int type = shop_011.getType();
					int pid = shop_011.getIndex();
					try {
						boolean add = false;
						Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
						groovyResult.put("玩家不在线  hero", firstRechargeAward!=null&&firstRechargeAward.size()==0);
						if(firstRechargeAward!=null&&firstRechargeAward.size()==0){
							if(type==RechargeConst.FIRST_RECHARGE) {								
								groovyResult.put("玩家不在线y", hero.getGuanqia().getCurGuanqia());
							}
							if(type==RechargeConst.FIRST_RECHARGE&&hero.getGuanqia().getCurGuanqia()>=3) {
								// 条件（3关）
								add = true;
//								B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//								rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
							}
						}else {
							if(type==RechargeConst.WEEK_CARD&&hero.getGuanqia().getCurGuanqia()>=20) {
								// 条件（20关）
								add = true;
//								B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//								rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
							}
							if(type==RechargeConst.TEQUANKA&&hero.getGuanqia().getCurGuanqia()>=20) {
								// 条件（20关）
								add = true;
//								B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//								rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
							}
							if(type==RechargeConst.DAILYDIRECTBUY&&hero.getGuanqia().getCurGuanqia()>=30) {
								// 条件（30关）
								add = false;
								if(HeroFunction.getIns().checkSystemOpen(hero, 5009)){
									try {
										Map<Integer, Integer> awardList = hero.getDailyDirectBuy().getAwardMap();

										int betweenOpen = TimeDateUtil.betweenOpen();
										// [[B:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天
										for (int i = 0; i < betweenOpen; i++) {
											List<Struct_mrzg1_256> list = DailyDirectBuyCache.getDailyDirectBuyConfigMap().get(i + 1);
											for (int j = 0; j < list.size(); j++) {
												int id = list.get(j).getId();
												Integer state = awardList.get(id);
												if (state == null) {
													state = 0;
												}
												if(state==0) {
													sendList.add(shop_011.getIndex());
												}
											}
										}
									} catch (Exception e) {
										continue;
									}
								}else if(OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
									try {
										int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
										OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) OtherDailyDirectBuyManager.getIns()
												.getSystemModel(hero, uid);
										Map<Integer, Integer> awardList = dailyDirectBuy.getAwardMap();
										int qs = dailyDirectBuy.getQs();
										int dayIndex = TimeDateUtil.betweenOpen() - qs * 7;
										Map<Integer, List<Struct_mrzg3_256>> map = OtherDailyDirectBuyCache.getDailyDirectBuyConfigMap().get(qs);
										Iterator<Entry<Integer, List<Struct_mrzg3_256>>> iterator = map.entrySet().iterator();
										for (int j=1;j<=dayIndex;j++) {
											List<Struct_mrzg3_256> list = map.get(j);
											for (int i = 0; i < list.size(); i++) {
												Struct_mrzg3_256 struct_mrzg3_256 = list.get(i);
												if(struct_mrzg3_256.getCz()!=pid) {
													continue;
												}
												int id = struct_mrzg3_256.getId();
												Integer status = awardList.get(id);
												if (status == null) {
													status = DailyDirectBuyActConst.NOTBUY;
													awardList.put(id, status);
												}
												sendList.add(pid);
											}
										}
									} catch (Exception e) {
										LogTool.error(e, this, hid, hero.getName(), "开启天数控制  系统活动每日直购");
										continue;
									}
								}else if(ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)){
									try {
										DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
												ActivitySysId.ACT_DAILYDIRECTBUY);
										Map<Integer, Integer> awardList = dailyDirectBuy.getAwardList();
										int periods = dailyDirectBuy.getPeriods();
										int activityOpenDays = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_DAILYDIRECTBUY);
										Map<Integer, List<Struct_mrzg2_256>> map = DailyDirectBuyActCache.getDailyDirectBuyConfigMap().get(periods);
										for (int j=1;j<=activityOpenDays;j++) {
											List<Struct_mrzg2_256> list = map.get(j);
											for (int i = 0; i < list.size(); i++) {
												Struct_mrzg2_256 struct_mrzg2_256 = list.get(i);
												if(struct_mrzg2_256.getCz()!=pid) {
													continue;
												}
												int id = struct_mrzg2_256.getId();
												Integer status = awardList.get(id);
												if (status == null) {
													status = DailyDirectBuyActConst.NOTBUY;
												}
												if(status==0) {
													sendList.add(shop_011.getIndex());
												}
											}
										}
									} catch (Exception e) {
										continue;
									}
								}
							}
							if(type==RechargeConst.YB&&firstRechargeAward!=null&&firstRechargeAward.size()>0) {
								// 条件（成功首充过）
								add = true;
//								B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//								rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
							}
							if(type==RechargeConst.JI_JIN&&hero.getGuanqia().getCurGuanqia()>=30) {
								if(ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_JI_JIN)) {							
									// 条件（活动开启）
									add = true;
//									B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//									rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
								}
							}
							if(type==RechargeConst.SHAO_ZHU_GOLD_PIG) {
								if(OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
									// 条件（活动开启）
									add = true;
//									B_PayAccount b_PayAccount = requestRecharge(hero, type, pid, "");
//									rInfo.setCpOrderNum(b_PayAccount.getProduct_id());
								}
							}
						}
						if(add) {
							groovyResult.put("玩家不在线p"+pid, pid);
							sendList.add(pid);
						}
					} catch (Exception e) {
						continue;
					}
				}
				
			groovyResult.put("玩家不在线oo", sendList.toString());	
			}	*/
//			long hid = 1019900000001318l;//1000400000000011L;
//			Hero hero = HeroCache.getHero(hid);//
//			if (hero==null) {
//				groovyResult.put("玩家不在线", "0");		
//			}else {
////				hero.setOpenid("21622424-yapk");
//                groovyResult.put("玩家 "+hero.getName()+" 在线", hero.getOpenid());
//			}
//			List<Integer> iconList = new ArrayList<>();
//			iconList.add(hero.getSettingData().getIcon());
//			hero.getSettingData().setIconList(iconList);
//			List<Integer> frameList = new ArrayList<>();
//			frameList.add(hero.getSettingData().getFrame());
//			hero.getSettingData().setFrameList(frameList);
			
			/** 活动
			HashMap<String, List<Method>> hotswapMap = ExcelHotswapCache.getHotswapMap();
			Iterator<Entry<String, List<Method>>> iterator = hotswapMap.entrySet().iterator();
			String dd = "";
			for(;iterator.hasNext();) {
				Entry<String, List<Method>> entry = iterator.next();
				String key = entry.getKey();
				List<Method> list = entry.getValue();
				if(list.size()<2) {
					continue;
				}
				dd = dd+key+", listSize="+list.size()+";";
			}
			String bb = "";
			for(Method mm : hotswapMap.get("excel.config.Config_huodong_009")) {
				bb = bb + mm.getName() +","+mm.getDeclaringClass().getSimpleName()+";";
			}
			groovyResult.put("玩家称号3", bb);
			**/
			//List<Struct_zshdb_315> sortList = Config_zshdb_315.getIns().getSortList();
			//groovyResult.put("专属活动数据", JSON.toJSONString(Config_zshdb_315.getIns().getMap().keySet()));

			//SevenWuShenRankCache.getIns().update();
		
			
//			//String bb = "";
//			if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_TOTAL_RECHARGE)) {
//				int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
//				groovyResult.put("uid","uid ："+uid);		
//				/*OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
//						.getSystemModel(hero, uid);
//				Map<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
//				for (int index : rewardMap.keySet()) {
//					bb = bb + index + "state:"+rewardMap.get(index) + ";";
//				}*/
//				
//			}
//			groovyResult.put("uuu", "8888888888888");			
//			Hero hero = HeroCache.getHero(hid); //410053
//			AntiAddictionFunction.getIns().getAccountOnlineTime(hero);
//			int onlineTime = hero.getAntiAddictionModel().getOnlineTime();
//			int taskid = hero.getTaskUser().getTaskid();
//			CDkeyFunction.getIns().gmHandle(hero, null);
//			long hid = 1000400000000011L;
//			Hero hero = HeroCache.getHero(hid);//HeroDao.getIns().find(hid, null);
//			boolean checkExActOpen = ExclusiveActivityFunction.getIns().checkExActOpen(11104);
//			Map<Integer, AbsExclusiveActivityManager> exActManagerMap = ExclusiveActivitySysCache.getExActManagerMap();
//			AbsExclusiveActivityManager manager = exActManagerMap.get(7103);
//			boolean checkExcel = manager.checkExcel();
//			Map<Integer, Struct_zshdb_315> map = ExclusiveActivitySysCache.getExActPfMap();
//			Class<? extends Class> clazz = PlatformDependent.class.getClass();
//			Method method = clazz.getMethod("maxDirectMemory");
//			Long maxDirectMemory = (Long) method.invoke(PlatformDependent.class);
//			groovyResult.put("天数据：", PlatformDependent./1024);
			
//			Class c = Class.forName("java.nio.Bits");
//			Field nowMemory = c.getDeclaredField("totalCapacity");
//			Field countMemory = c.getDeclaredField("count");
//			Field maxMemory = c.getDeclaredField("maxMemory");
//			maxMemory.setAccessible(true);
//			nowMemory.setAccessible(true);
//			countMemory.setAccessible(true);
//			groovyResult.put("总堆外内存：", maxMemory.get(null));
//			groovyResult.put("堆外内存：", nowMemory.get(null));
//			groovyResult.put("count堆外内存：", countMemory.get(null));
//			groovyResult.put("HeroCache：", HeroCache.getHeroMap().size());
//			Class c = Class.forName("com.teamtop.cross.callback.ListenerLogic");
//			Field field = c.getDeclaredField("listenerMap");
//			field.setAccessible(true);
			
//			StringBuffer sb = new StringBuffer();
//			for(Hero hero : HeroCache.getHeroMap().values()) {
//				Channel channel = hero.getChannel();
//				if(channel!=null) {
//					int obsize = hero.getChannel().unsafe().outboundBuffer().size();
//					if(obsize>30) {						
//						sb.append(hero.getId()+"::"+obsize).append(";");
////						KickOutHeroIO.getIns().kickOut(hero.getId());
//					}
//				}
//			}
//			groovyResult.put("总堆外内存：", sb.toString());
			
//			Channel channel = HeroCache.getHero(1015200000000637L).getChannel();
//			groovyResult.put("个人channel：", channel.isWritable());
//			if(!channel.isWritable()) {
//				KickOutHeroIO.getIns().kickOut(1015200000000637L);
//			}
			
//			Channel channel = HeroCache.getHero(1014300000001102L).getTempData().getChannel();
//			groovyResult.put("个人channel：", channel.isActive());
//			ConcurrentHashMap<Integer, CountryRankJioner> killersByCountry = CountryBossSysCache.getCountryBossCache().getNewkillersByCountry().get(hero.getCountryType());
//			String bb = "";
//			if (killersByCountry.size()>0) {
//				for (int i = 1; i <=killersByCountry.size(); i++) {
//					CountryRankJioner countryRankJioner = killersByCountry.get(i);
//					if (countryRankJioner!=null) {
//						Long killerid = countryRankJioner.getKillerid();
//						if (killerid!=null&&killerid!=0) {
//							Hero hero1 =HeroCache.getHero(killerid, HeroConst.FIND_TYPE_BASIC);
//							bb = bb + i + hero1.getNameZoneid() + ";";
//						}else {
//							bb = bb + i + "BH" + ";";
//						}
//					}
//				}
//			}
			/*CountryBossModel countryBossModel = CountryBossSysCache.getCountryBossCache().getCountryBossMap().get(hero.getCountryType());
			CountryRankJioner countryRankJioner = CountryBossSysCache.getCountryBossCache().getNewkillersByCountry().get(hero.getCountryType()).get(10);
			groovyResult.put("国家bosstype+++ ", JSON.toJSONString(hero.getCountryType()));
			if (countryRankJioner==null) {
				groovyResult.put("10号 国家boss状态：", "没有击杀者");
			}else {
				groovyResult.put("10号 国家boss击杀者：", JSON.toJSONString(countryRankJioner.getKillerid()));
				groovyResult.put("10号 国家boss排行榜：", JSON.toJSONString(countryRankJioner.getHurtRankArr().size()));
				long num=0;
				for (int i = 0; i < countryRankJioner.getHurtRankArr().size(); i++) {
					num=countryRankJioner.getHurtRankArr().get(i).getHurt()+num;
					groovyResult.put("10号 国家boss伤害"+i+" :", JSON.toJSONString(countryRankJioner.getHurtRankArr().get(i).getHurt()));
				}
				groovyResult.put("10号 国家boss被打伤害", num);
			}*/
			
			//groovyResult.put("国家状态：", JSON.toJSONString(killersByCountry.keySet()));
			//groovyResult.put("国家状态", countryBossModel.getBossId()+","+countryBossModel.getCurhp());
			
			
//			CountryBossCache countryBossCache = CountryBossSysCache.getCountryBossCache();
//			countryBossCache.getCountryBossMap();
//			for (CountryBossModel countryBossModel:countryBossCache.getCountryBossMap().values()) {
//				groovyResult.put("国家bossid：", JSON.toJSONString(countryBossModel.getBossId()));
//				groovyResult.put("国家bossid 血量：", JSON.toJSONString(countryBossModel.getCurhp()));
//				List<CountryBossDamgModel> rankList = countryBossModel.getRankList();
//				groovyResult.put("国家伤害排行奖励大小：", JSON.toJSONString(rankList.size()));
//				groovyResult.put("国家伤害排行奖励 1名次  ：", JSON.toJSONString(rankList.get(0).getHid()));
//				groovyResult.put("国家伤害排行奖励 2名次  ：", JSON.toJSONString(rankList.get(1).getHid()) );
//			}
//			Client_2 ins = Client_2.getIns();
//			ins.conn();
//			groovyResult.put("当前国家boss的长度  ：", ins.getCrossChannel().isActive());
			
//			CountryBoss countryBoss = hero.getCountryBoss();
//			Object[] rewards=new Object[Config_gjboss_738.getIns().size()];
//			int size = Config_gjboss_738.getIns().size();
//			if (countryBossModel.getBossId()<size&&countryBossModel.getCurhp()<=0) {
//				CountryBossFunction.getIns().creatNewBoss(hero.getCountryType(), countryBossModel.getBossId());
//			}
//			int nowBossid= countryBossModel.getBossId();
//			long nowBossBool=(long)countryBossModel.getCurhp();
//			for (Struct_gjboss_738 Struct_gjboss_738: Config_gjboss_738.getIns().getSortList()) {
//				int cengshu=Struct_gjboss_738.getCengshu();
//				if(countryBoss.getBossReward().containsKey(cengshu)) {
//					int rewardState=countryBoss.getBossReward().get(cengshu);
//					if (cengshu==size&&nowBossid==size&&nowBossBool<=0&&rewardState==GameConst.REWARD_0) {
//						countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
//						rewardState=GameConst.REWARD_1;
//					}else if (nowBossid>cengshu&&rewardState==GameConst.REWARD_0) {
//						countryBoss.getBossReward().put(cengshu, GameConst.REWARD_1);
//						rewardState=GameConst.REWARD_1;
//					}
//					rewards[cengshu-1]=new Object[] {cengshu,rewardState};
//				}else {
//					countryBoss.getBossReward().put(cengshu, GameConst.REWARD_0);
//					rewards[cengshu-1]=new Object[] {cengshu,GameConst.REWARD_0};
//				}
//			}
			
			//查询某玩家
//			long hid = 1000100000000171L;
//			Hero hero = HeroCache.getHero(hid);
//			if(hero==null){
//				groovyResult.put("玩家不在线",-1);
//			}else{
//				groovyResult.put("玩家 "+hero.getName()+" 在线",1);
//				ContinuousConsume dataAll =(ContinuousConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME);
//				Map<Integer, ContinuousConsumeData> dataMap = dataAll.getDataMap();
//				ContinuousConsumeData continuousConsumeData = dataMap.get(2);
//				int moneySpend = continuousConsumeData.getMoneySpend();
//				continuousConsumeData.setMoneySpend(moneySpend+6296);
//				groovyResult.put("消耗元宝1", moneySpend);
//				moneySpend = continuousConsumeData.getMoneySpend();
//				groovyResult.put("消耗元宝2", moneySpend);
//			}
			
			//TODO 写指令，根据流水重置消耗元宝
		} catch (Exception e) {
			e.printStackTrace();
			LogTool.error(e, this, "Groovy.foo:"+foo);
			return "控制台报错，请查看console日志或err日志。";
		}
		result = JsonUtils.toStr(groovyResult);
		return result;
	}
}