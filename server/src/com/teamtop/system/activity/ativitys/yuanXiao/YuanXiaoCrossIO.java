package com.teamtop.system.activity.ativitys.yuanXiao;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossDao;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossJoiner;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossShow;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoEnemy;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class YuanXiaoCrossIO {
	
	private static YuanXiaoCrossIO ins;
	public static synchronized YuanXiaoCrossIO getIns(){
		if(ins == null) {
			ins = new YuanXiaoCrossIO();
		}
		return ins;
	}
	
	public void LTCgetMyYuanXiaoInfo(Hero hero,YuanXiaoLocal yuanXiaoLocal) {
		CrossData crossData = new CrossData();
		crossData.putObject(YuanXiaoEnum.hid, hero.getId());
		crossData.putObject(YuanXiaoEnum.zoneid, hero.getBelongZoneid());
		crossData.putObject(YuanXiaoEnum.strength, hero.getTotalStrength());
		crossData.putObject(YuanXiaoEnum.show, hero.getShowModel());
		crossData.putObject(YuanXiaoEnum.name, hero.getNameZoneid());
		
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null || !channel.isOpen()) {
			LogTool.warn("initYuanXiaoCrossJoiner has wrong", YuanXiaoCrossIO.class);
			return;
		}
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.YUANXIAO_GETMYINFO_LC,hero.getId(), crossData);
		Integer rest = writeBlockData.getObject(YuanXiaoEnum.myInfoRest, Integer.class);
		if (rest==1) {
			//获取成功
			Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
			HashMap<Integer, Integer> cailiaoMap = writeBlockData.getObject(YuanXiaoEnum.cailiaoMap, classType);
			yuanXiaoLocal.setCailiaoMap(cailiaoMap);
		}else {
			initYuanXiaoCrossJoiner(hero, yuanXiaoLocal);
		}
		
	}
	
	
	public void CRLgetMyYuanXiaoInfo(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_GETMYINFO_LC;
		try {
			long hid = crossData.getObject(YuanXiaoEnum.hid, Long.class);
			int zoneid=crossData.getObject(YuanXiaoEnum.zoneid, Integer.class);
			
			//战力 名字 外观
			long strength = crossData.getObject(YuanXiaoEnum.strength, Long.class);
			String name=crossData.getObject(YuanXiaoEnum.name, String.class);
			ShowModel showModel = crossData.getObject(YuanXiaoEnum.show, ShowModel.class);
			
			int partId = CrossCache.getPartId(zoneid);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			crossData.finishGet();
			
			if (concurrentHashMap!=null&&concurrentHashMap.containsKey(hid)) {
				YuanXiaoCrossJoiner yuanXiaoCrossJoiner = concurrentHashMap.get(hid);
				yuanXiaoCrossJoiner.setName(name);
				yuanXiaoCrossJoiner.setStrength(strength);
				yuanXiaoCrossJoiner.setModel(showModel);
				
				crossData.putObject(YuanXiaoEnum.myInfoRest, 1);
				crossData.putObject(YuanXiaoEnum.cailiaoMap, yuanXiaoCrossJoiner.getCailiaoMap());
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}else {
				//玩家不存在
				crossData.putObject(YuanXiaoEnum.myInfoRest, 0);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
				
			}
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLinitJoiner has wrong");
		}
		
	}
	
	public void initYuanXiaoCrossJoiner(Hero hero,YuanXiaoLocal yuanXiaoLocal) {
		YuanXiaoCrossJoiner yuanXiaoCrossJoiner = YuanXiaoFunction.getIns().newYuanXiaoCrossJoiner(hero,yuanXiaoLocal);
		CrossData crossData = new CrossData();
		crossData.putObject(YuanXiaoEnum.joinerData, yuanXiaoCrossJoiner);
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null || !channel.isOpen()) {
			//CrossKingSender.sendCmd_1866(hero.getId(), 1);
			LogTool.warn("initYuanXiaoCrossJoiner has wrong", YuanXiaoCrossIO.class);
			return;
		}
		NettyWrite.writeXData(channel, CrossConst.YUANXIAO_INIT_LC, crossData);
	}
	
	
	public void CRLinitJoiner(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_INIT_LC;
		try {
			YuanXiaoCrossJoiner yuanXiaoCrossJoiner = crossData.getObject(YuanXiaoEnum.joinerData, YuanXiaoCrossJoiner.class);
			
			int partId = CrossCache.getPartId(yuanXiaoCrossJoiner.getBelongZoneid());
			yuanXiaoCrossJoiner.setBelongPartid(partId);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			if (concurrentHashMap==null) {
				concurrentHashMap=new ConcurrentHashMap<>();
				YuanXiaoCrossSyscache.getYuanXiaoCrossMap().put(partId, concurrentHashMap);
			}
			concurrentHashMap.put(yuanXiaoCrossJoiner.getHid(), yuanXiaoCrossJoiner);
			try {
				YuanXiaoCrossDao.getIns().insertRank(yuanXiaoCrossJoiner);
			} catch (Exception e) {
				LogTool.error(e, YuanXiaoFunction.class, "Dao.getIns().insertRank has wrong hid"+yuanXiaoCrossJoiner.getHid());
			}
			
			LogTool.info("CRLinitJoiner success Hid:"+yuanXiaoCrossJoiner.getHid(), YuanXiaoCrossIO.class);
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLinitJoiner has wrong");
		}
		
	}
	
	public void  LTCgetList(Hero hero,int type,YuanXiaoLocal yuanXiaoLocal) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(YuanXiaoEnum.hid, hero.getId());
			crossData.putObject(YuanXiaoEnum.type, type);
			crossData.putObject(YuanXiaoEnum.zoneid, GameProperties.getFirstZoneId());
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				LogTool.warn("getList has wrong", YuanXiaoCrossIO.class);
				return;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.YUANXIAO_GETLIST_LC, hero.getId(), crossData);
			if (writeBlockData==null) {
				LogTool.warn("writeBlockData==null", YuanXiaoCrossIO.class);
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int freeReshTime = yuanXiaoLocal.getFreeReshTime();
			int restTime=0;
			if (currentTime-freeReshTime<YuanXiaoConst.FREECD) {
				//免费刷新
				int pastTime=currentTime-freeReshTime;
				restTime=YuanXiaoConst.FREECD-pastTime;
			}
			Integer listRest = writeBlockData.getObject(YuanXiaoEnum.listRest, Integer.class);
			if (listRest==0) {
				//列表没人
			    YuanXiaoLocalSender.sendCmd_11632(hero.getId(), yuanXiaoLocal.getBattleNum(),restTime, type, null);
			    return;
			}
			if (listRest==1) {
				List<YuanXiaoCrossShow> enemyData =  writeBlockData.getObject(YuanXiaoEnum.enemyData,new TypeReference<List<YuanXiaoCrossShow>>(){}.getType());
				if (enemyData==null) {
					LogTool.warn("enemyData==null", YuanXiaoCrossIO.class);
					return;
				}
				Object[] infos =new Object[enemyData.size()];
				for (int i = 0; i < infos.length; i++) {
					YuanXiaoCrossShow yuanXiaoCrossShow = enemyData.get(i);
					ShowModel model = yuanXiaoCrossShow.getModel();
					int bodyModel = model.getBodyModel();
					int weaponModel = model.getWeaponModel();
					int rideModel = model.getRideModel();
					int num=yuanXiaoCrossShow.getNum();
					infos[i]=new Object[] {yuanXiaoCrossShow.getHid(),yuanXiaoCrossShow.getName(),yuanXiaoCrossShow.getStrength(),bodyModel,weaponModel,rideModel,num};
				}
			    YuanXiaoLocalSender.sendCmd_11632(hero.getId(), yuanXiaoLocal.getBattleNum(),restTime, type, infos);
			}
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "LTCgetList has wrong");
		}
	}
	
	public  void CRLgetList(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_GETLIST_LC;
		try {
			long hid =crossData.getObject(YuanXiaoEnum.hid, Long.class);
			int type =crossData.getObject(YuanXiaoEnum.type, Integer.class);
			int zoneid=crossData.getObject(YuanXiaoEnum.zoneid, Integer.class);
			int partId = CrossCache.getPartId(zoneid);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			if (concurrentHashMap==null) {
				LogTool.warn("concurrentHashMap==null hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			if(!concurrentHashMap.containsKey(hid)) {
				LogTool.warn("!concurrentHashMap.containsKey(hid) hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			//
			YuanXiaoCrossJoiner yuanXiaoCrossJoinerMY = concurrentHashMap.get(hid);
			HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap = yuanXiaoCrossJoinerMY.getLookListMap();
			
			crossData.finishGet();
			LogTool.info("CRLgetList partid=" + partId + ", hid=" + hid, this);
			
			
			if (!lookListMap.containsKey(type)) {
				//没有抢夺目标 免费刷新一次
				boolean reshBattleList = YuanXiaoFunction.getIns().reshBattleList(hid, type, concurrentHashMap, lookListMap);
				if (!reshBattleList) {
					//没有抢夺目标
					crossData.putObject(YuanXiaoEnum.listRest, 0);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				
			}
			
			ArrayList<YuanXiaoEnemy> arrayList = lookListMap.get(type);
			List<YuanXiaoCrossShow> enemyList = new ArrayList<YuanXiaoCrossShow>();
			
			for (int i = 0; i < arrayList.size(); i++) {
				YuanXiaoEnemy yuanXiaoEnemy = arrayList.get(i);
				YuanXiaoCrossJoiner yuanXiaoCrossJoiner = concurrentHashMap.get(yuanXiaoEnemy.getHid());
				YuanXiaoCrossShow yuanXiaoCrossShow=new YuanXiaoCrossShow();
				yuanXiaoCrossShow.setHid(hid);
				yuanXiaoCrossShow.setName(yuanXiaoCrossJoiner.getName());
				yuanXiaoCrossShow.setModel(yuanXiaoCrossJoiner.getModel());
				int num=yuanXiaoCrossJoiner.getCailiaoMap().get(type);
				yuanXiaoCrossShow.setNum(num);
				yuanXiaoCrossShow.setStrength(yuanXiaoCrossJoiner.getStrength());
				yuanXiaoCrossShow.setIsbot(yuanXiaoEnemy.getIsRob());
				enemyList.add(yuanXiaoCrossShow);
			}
			crossData.putObject(YuanXiaoEnum.listRest, 1);
			crossData.putObject(YuanXiaoEnum.enemyData, enemyList);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLgetList has wrong");
		}
		
	}
	
	public void LTCbattleHid(Hero hero,Long enemyhid,int type,YuanXiaoLocal yuanXiaoLocal) {
		CrossData crossData = new CrossData();
		crossData.putObject(YuanXiaoEnum.hid, hero.getId());
		crossData.putObject(YuanXiaoEnum.strength,hero.getTotalStrength());
		crossData.putObject(YuanXiaoEnum.type, type);
		crossData.putObject(YuanXiaoEnum.enemyHid, enemyhid);
		
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null || !channel.isOpen()) {
			//CrossKingSender.sendCmd_1866(hero.getId(), 1);
			LogTool.warn("LTCbattleHid has wrong", YuanXiaoCrossIO.class);
			return;
		}
		NettyWrite.writeXData(channel, CrossConst.YUANXIAO_BATTLE_LC, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				int battleRest =crossData.getObject(YuanXiaoEnum.battleRest, Integer.class);
				
				
				// 0失败对方没有屯粮 1成功 2战斗失败
				if (battleRest==0) {
					HashMap<Integer, Integer> cailiaoMap = yuanXiaoLocal.getCailiaoMap();
					Integer cailiao1 = cailiaoMap.get(YuanXiaoConst.CAILIAO_1);
					Integer cailiao2 = cailiaoMap.get(YuanXiaoConst.CAILIAO_2);
					Integer cailiao3 = cailiaoMap.get(YuanXiaoConst.CAILIAO_3);
					// * @param winID 胜利玩家ID head 胜利头像ID  power 战力name 名字 jxID 胜利者将衔ID leftID 左边玩家ID rightID 右边玩家ID
					YuanXiaoLocalSender.sendCmd_11634(hero.getId(), 1, 0, cailiao1, cailiao2, cailiao3,0,0,0,"",0,hero.getId(),enemyhid);
					return;
				}
				
				YuanXiaoCrossJoiner yuanXiaoCrossJoiner=crossData.getObject(YuanXiaoEnum.enemyData, YuanXiaoCrossJoiner.class);
				Object[] attr=null;
				Object[] skillinfo130 = null;
				//GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
				List<Object[]> extdataList = new ArrayList<>();
				int wearTreasure1 = 0;
				int baowu1Star=0;
				int wearTreasure2 = 0;
				int baowu2Star=0;
				int godBookid=0;
				int godBookStar=0;
				int wujiangStar=0;
				int godWeapon=0;
				FinalFightAttr fightAttr=yuanXiaoCrossJoiner.getFinalFightAttr();
				List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(fightAttr);
				attr=attrSendData.toArray();
				wujiangStar=fightAttr.getStar();
				//技能数据
				Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero,
						yuanXiaoCrossJoiner.getHid(), yuanXiaoCrossJoiner.getGodSkillLevel(), yuanXiaoCrossJoiner.getJob());
				List<Object[]> skillData = new ArrayList<Object[]>();
				List<Object[]> skillData130 = new ArrayList<Object[]>();
				for(Entry<Integer, SkillInfo> entry:yuanXiaoCrossJoiner.getSkill().getSkillMap().entrySet()){
					int index=entry.getKey();
					SkillInfo skillInfo=entry.getValue();
					skillData.add(new Object[]{index,skillInfo.getId(),(short)skillInfo.getLevel()});
					Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap)
							.map(mapper -> mapper.get(skillInfo.getId())).orElse(0);
					skillData130.add(
							new Object[] { index, skillInfo.getId(), (short) skillInfo.getLevel(), skillHurtAdd });
				}
				skillinfo130 = skillData130.toArray();
				godWeapon = yuanXiaoCrossJoiner.getModel().getWeaponModel();
				
				int fms = yuanXiaoCrossJoiner.getFigthMonsterSpirit();
				/*Hero enermy = HeroCache.getHero(rid);
				if (enermy != null) {
					MonsterSpiritModel spiritModel = enermy.getMonsterSpiritModel();
					if (spiritModel != null) {
						fms = spiritModel.getFightMonsterSpiri();
					}
				}*/
				int withLeaderId=0;
				int withLeaderFid=0;
				int leaderStarId=0;
				int leaderSkillId=0;
				
				if (yuanXiaoCrossJoiner.getLittleLeaderInfo()!=null&&yuanXiaoCrossJoiner.getLittleLeaderInfo().size()>0) {
					List<Integer> littleLeaderInfo = yuanXiaoCrossJoiner.getLittleLeaderInfo();
					withLeaderId=littleLeaderInfo.get(0);
					withLeaderFid=littleLeaderInfo.get(1);;
					leaderStarId=littleLeaderInfo.get(2);;
					leaderSkillId=littleLeaderInfo.get(3);;
				}
				extdataList.add(new Object[] { wearTreasure1});
				extdataList.add(new Object[] { baowu1Star});
				extdataList.add(new Object[] { wearTreasure2});
				extdataList.add(new Object[] { baowu2Star});
				extdataList.add(new Object[] { godBookid});
				extdataList.add(new Object[] { godBookStar});
				extdataList.add(new Object[] { wujiangStar});
				extdataList.add(new Object[] { godWeapon});
				extdataList.add(new Object[] { 0});
				List<Object[]> attrData = new ArrayList<Object[]>();
				attrData.add(new Object[] { hero.getId(), yuanXiaoCrossJoiner.getJob(), attr, skillinfo130,
						yuanXiaoCrossJoiner.getModel().getBodyModel() });
				
				HeroSender.sendCmd_130(hero.getId(), enemyhid, yuanXiaoCrossJoiner.getName(), 0,
						0, 0, fms, attrData.toArray(), yuanXiaoCrossJoiner.getStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
				if (battleRest==1) {
					//战斗胜利 
					//本人材料数量变化
					Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
					HashMap<Integer, Integer> cailiaoMap=crossData.getObject(YuanXiaoEnum.cailiaoMap, classType);
					yuanXiaoLocal.setCailiaoMap(cailiaoMap);
					Integer cailiao1 = cailiaoMap.get(YuanXiaoConst.CAILIAO_1);
					Integer cailiao2 = cailiaoMap.get(YuanXiaoConst.CAILIAO_2);
					Integer cailiao3 = cailiaoMap.get(YuanXiaoConst.CAILIAO_3);
					YuanXiaoLocalSender.sendCmd_11634(hero.getId(), 0, 0, cailiao1, cailiao2, cailiao3,hero.getId(),hero.getIcon(),hero.getTotalStrength(),hero.getNameZoneid(),hero.getOfficial(),hero.getId(),enemyhid);
					return;
				}else {
					//战斗失败
					HashMap<Integer, Integer> cailiaoMap = yuanXiaoLocal.getCailiaoMap();
					Integer cailiao1 = cailiaoMap.get(YuanXiaoConst.CAILIAO_1);
					Integer cailiao2 = cailiaoMap.get(YuanXiaoConst.CAILIAO_2);
					Integer cailiao3 = cailiaoMap.get(YuanXiaoConst.CAILIAO_3);
					
					YuanXiaoLocalSender.sendCmd_11634(hero.getId(), 0, 1, cailiao1, cailiao2, cailiao3,yuanXiaoCrossJoiner.getHid(),yuanXiaoCrossJoiner.getHerdid(),yuanXiaoCrossJoiner.getStrength(),yuanXiaoCrossJoiner.getName(),
							yuanXiaoCrossJoiner.getOfficial(),hero.getId(),enemyhid);
				    return;
				}
				
			}
		});
		
	}
	
	
	public void CRLbattle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_BATTLE_LC;
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					long hid =crossData.getObject(YuanXiaoEnum.hid, Long.class);
					int type =crossData.getObject(YuanXiaoEnum.type, Integer.class);
					long enemyhid =crossData.getObject(YuanXiaoEnum.enemyHid, Long.class);
					long strength =crossData.getObject(YuanXiaoEnum.strength, Long.class);
					
					crossData.finishGet();
					
					int zoneid = MybatisUtil.getZoneid(hid);
					int partId = CrossCache.getPartId(zoneid);
					
					ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
					if (concurrentHashMap==null) {
						LogTool.warn("CRLbattle concurrentHashMap==null hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
						return;
					}
					if(!concurrentHashMap.containsKey(hid)) {
						LogTool.warn("CRLbattle !concurrentHashMap.containsKey(hid) hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
						return;
					}
					if(!concurrentHashMap.containsKey(enemyhid)) {
						LogTool.warn("CRLbattle !concurrentHashMap.containsKey(hid) enemyhid:"+enemyhid+" partid:"+partId, YuanXiaoCrossIO.class);
						return;
					}
					YuanXiaoCrossJoiner myJoiner = concurrentHashMap.get(hid);
					YuanXiaoCrossJoiner enemyJoiner = concurrentHashMap.get(enemyhid);
					long strength2 = enemyJoiner.getStrength();
					int num=enemyJoiner.getCailiaoMap().get(type);
					if (num==0) {
						crossData.putObject(YuanXiaoEnum.battleRest, 0);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					
					
					HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap = myJoiner.getLookListMap();
					if (!lookListMap.containsKey(type)) {
						crossData.putObject(YuanXiaoEnum.battleRest, 0);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						LogTool.warn("CRLbattle !lookListMap.containsKey(type) has wrong hid:"+hid, YuanXiaoCrossIO.class);
						return;
					}else {
						boolean isCunzaiEnemy=false;
						ArrayList<YuanXiaoEnemy> arrayList =lookListMap.get(type);
						for (int i = 0; i < arrayList.size(); i++) {
							YuanXiaoEnemy yuanXiaoEnemy = arrayList.get(i);
							if (yuanXiaoEnemy.getHid()==enemyhid) {
								isCunzaiEnemy=true;
								if (yuanXiaoEnemy.getIsRob()==1) {
									crossData.putObject(YuanXiaoEnum.battleRest, 0);
									NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
									LogTool.warn("CRLbattle yuanXiaoEnemy.getIsRob()==0 hid:"+hid+" type:"+type, YuanXiaoCrossIO.class);
									return;
								}else {
									if (strength>=strength2) {
										//抢赢了
										int leftNum=num-1;
										int mynum=myJoiner.getCailiaoMap().get(type);
										enemyJoiner.getCailiaoMap().put(type, leftNum);
										myJoiner.getCailiaoMap().put(type, mynum+1);
										yuanXiaoEnemy.setIsRob(YuanXiaoConst.IsBob);
										crossData.putObject(YuanXiaoEnum.battleRest, 1);
										crossData.putObject(YuanXiaoEnum.cailiaoMap, myJoiner.getCailiaoMap());
										NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
										//对方材料数据 
										CTLcaiLiaoMap(enemyJoiner);
										return;
									}else {
										//抢输了
										crossData.putObject(YuanXiaoEnum.battleRest, 2);
										NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
										LogTool.warn("CRLbattle yuanXiaoEnemy.getIsRob()==0 hid:"+hid+" type:"+type, YuanXiaoCrossIO.class);
										return;
									}

								}
							}

						}
						
						if (!isCunzaiEnemy) {
							//巧夺目标不存在
							crossData.putObject(YuanXiaoEnum.battleRest, 0);
							NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
							LogTool.warn("CRLbattle isCunzaiEnemy hid:"+hid+" type:"+type, YuanXiaoCrossIO.class);
							return;
						}
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.YUANXIAO_BATTLE;
				}
			});
			
			
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLbattle has wrong");
		}
	}
	
	public void CTLcaiLiaoMap(YuanXiaoCrossJoiner yuanXiaoCrossJoiner) {
		try {
			CrossData crossData=new CrossData();
			long hid = yuanXiaoCrossJoiner.getHid();
			crossData.putObject(YuanXiaoEnum.hid, hid);
			crossData.putObject(YuanXiaoEnum.cailiaoMap, yuanXiaoCrossJoiner.getCailiaoMap());
			int zoneid = MybatisUtil.getZoneid(hid);
			Channel channel = CrossCache.getZoneidToChannel().get(zoneid);
			NettyWrite.writeXData(channel, CrossConst.YUANXIAO_CAILIAO_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CTLcaiLiaoMap has wrong");
		}
	}
	
	public void LRCUpDateCailiao(Channel channel, CrossData crossData) {
		int cmd=CrossConst.YUANXIAO_CAILIAO_CL;
		try {
			long hid =crossData.getObject(YuanXiaoEnum.hid, Long.class);
			Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
			HashMap<Integer, Integer> cailiaoMap = crossData.getObject(YuanXiaoEnum.cailiaoMap, classType);
			if (HeroFunction.getIns().isOnline(hid)) {
				Hero hero = HeroCache.getHero(hid);
				if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
					return;
				}
				YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
				yuanXiaoLocal.setCailiaoMap(cailiaoMap);
				YuanXiaoFunction.getIns().changeCaiLiaoNum(yuanXiaoLocal);
			}
			
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "LRCUpDateCailiao has wrong");
		}
	}
	/**
	 * 
	 * @param yuanXiaoLocal
	 * @param type 
	 * @return 0刷新失败 1刷新成功
	 */
	public int reshBattleList(YuanXiaoLocal yuanXiaoLocal,int type) {
		CrossData crossData=new CrossData();
		crossData.putObject(YuanXiaoEnum.hid,yuanXiaoLocal.getId());
		crossData.putObject(YuanXiaoEnum.type,type);
		
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null || !channel.isOpen()) {
			LogTool.warn("reshBattleList has wrong", YuanXiaoCrossIO.class);
			return 0;
		}
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.YUANXIAO_RESH_LC,yuanXiaoLocal.getId(), crossData);
		if (writeBlockData==null) {
			YuanXiaoLocalSender.sendCmd_11636(yuanXiaoLocal.getId(), 3);
			LogTool.warn("reshBattleList writeBlockData==null has worng", YuanXiaoCrossIO.class);
			return 0;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		int freeReshTime = yuanXiaoLocal.getFreeReshTime();
		int restTime=0;
		if (currentTime-freeReshTime<YuanXiaoConst.FREECD) {
			//免费刷新
			int pastTime=currentTime-freeReshTime;
			restTime=YuanXiaoConst.FREECD-pastTime;
		}
		Integer listRest = writeBlockData.getObject(YuanXiaoEnum.listRest, Integer.class);
		if (listRest==0) {
			//列表没人
		    YuanXiaoLocalSender.sendCmd_11636(yuanXiaoLocal.getId(),1);
		    return 0;
		}
		if (listRest==1) {
			List<YuanXiaoCrossShow> enemyData =  writeBlockData.getObject(YuanXiaoEnum.enemyData,new TypeReference<List<YuanXiaoCrossShow>>(){}.getType());
			if (enemyData==null) {
				LogTool.warn("enemyData==null", YuanXiaoCrossIO.class);
				return 0;
			}
			Object[] infos =new Object[enemyData.size()];
			for (int i = 0; i < infos.length; i++) {
				YuanXiaoCrossShow yuanXiaoCrossShow = enemyData.get(i);
				ShowModel model = yuanXiaoCrossShow.getModel();
				int bodyModel = model.getBodyModel();
				int weaponModel = model.getWeaponModel();
				int rideModel = model.getRideModel();
				int num=yuanXiaoCrossShow.getNum();
				infos[i]=new Object[] {yuanXiaoCrossShow.getHid(),yuanXiaoCrossShow.getName(),yuanXiaoCrossShow.getStrength(),bodyModel,weaponModel,rideModel,num};
			}
		    YuanXiaoLocalSender.sendCmd_11632(yuanXiaoLocal.getId(), yuanXiaoLocal.getBattleNum(),restTime, type, infos);
		    YuanXiaoLocalSender.sendCmd_11636(yuanXiaoLocal.getId(),0);
		    return 1;
		}
		return 0;
	}
	
	public void CRLreshBattleList(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_RESH_LC;
		try {
			long hid = crossData.getObject(YuanXiaoEnum.hid, Long.class);
			int  type = crossData.getObject(YuanXiaoEnum.type, Integer.class);
			
			int zoneid = MybatisUtil.getZoneid(hid);
			int partId = CrossCache.getPartId(zoneid);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			if (concurrentHashMap==null) {
				LogTool.warn("concurrentHashMap==null hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			if(!concurrentHashMap.containsKey(hid)) {
				LogTool.warn("!concurrentHashMap.containsKey(hid) hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			
			YuanXiaoCrossJoiner yuanXiaoCrossJoinerMy = concurrentHashMap.get(hid);
			
			
			
			crossData.finishGet();
			
			HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap = yuanXiaoCrossJoinerMy.getLookListMap();
			if (!lookListMap.containsKey(type)) {
				//没有抢夺目标 免费刷新一次
				boolean reshBattleList = YuanXiaoFunction.getIns().reshBattleList(hid, type, concurrentHashMap, lookListMap);
				if (!reshBattleList) {
					//没有抢夺目标
					crossData.putObject(YuanXiaoEnum.listRest, 0);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				
			}
			
			ArrayList<YuanXiaoEnemy> arrayList = lookListMap.get(type);
			List<YuanXiaoCrossShow> enemyList = new ArrayList<YuanXiaoCrossShow>();
			
			for (int i = 0; i < arrayList.size(); i++) {
				YuanXiaoEnemy yuanXiaoEnemy = arrayList.get(i);
				YuanXiaoCrossJoiner yuanXiaoCrossJoiner = concurrentHashMap.get(yuanXiaoEnemy.getHid());
				YuanXiaoCrossShow yuanXiaoCrossShow=new YuanXiaoCrossShow();
				yuanXiaoCrossShow.setHid(hid);
				yuanXiaoCrossShow.setName(yuanXiaoCrossJoiner.getName());
				yuanXiaoCrossShow.setModel(yuanXiaoCrossJoiner.getModel());
				int num=yuanXiaoCrossJoiner.getCailiaoMap().get(type);
				yuanXiaoCrossShow.setNum(num);
				yuanXiaoCrossShow.setStrength(yuanXiaoCrossJoiner.getStrength());
				yuanXiaoCrossShow.setIsbot(yuanXiaoEnemy.getIsRob());
				enemyList.add(yuanXiaoCrossShow);
			}
			crossData.putObject(YuanXiaoEnum.listRest, 1);
			crossData.putObject(YuanXiaoEnum.enemyData, enemyList);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e,YuanXiaoCrossIO.class, "CRLreshBattleList has wrong");
		}
	}
	
	
	public boolean LTCusecailiao(YuanXiaoLocal yuanXiaoLocal,HashMap<Integer, Integer> useCaiLiao) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(YuanXiaoEnum.hid, yuanXiaoLocal.getId());
			crossData.putObject(YuanXiaoEnum.useMap, useCaiLiao);
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				LogTool.warn("LTCusecailiao has wrong", YuanXiaoCrossIO.class);
				return false;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.YUANXIAO_USECAILIAO_LC,yuanXiaoLocal.getId(), crossData);
			Integer useRest = writeBlockData.getObject(YuanXiaoEnum.useRest, Integer.class);
			if (useRest==1) {
				//成功
				Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
				HashMap<Integer, Integer> cailiaoMap = writeBlockData.getObject(YuanXiaoEnum.cailiaoMap,classType);
				yuanXiaoLocal.setCailiaoMap(cailiaoMap);
				YuanXiaoFunction.getIns().changeCaiLiaoNum(yuanXiaoLocal);
				return true;
			}
		}catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "LTCusecailiao has wrong:"+yuanXiaoLocal.getId());
		}
		return false;
	}
	
	public void CRLusecailiao(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_RESH_LC;
		try {
			
			long hid = crossData.getObject(YuanXiaoEnum.hid, Long.class);
			Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
			HashMap<Integer, Integer>  useMap = crossData.getObject(YuanXiaoEnum.useMap, classType);
			
			int zoneid = MybatisUtil.getZoneid(hid);
			int partId = CrossCache.getPartId(zoneid);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			if (concurrentHashMap==null) {
				LogTool.warn("concurrentHashMap==null hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			if(!concurrentHashMap.containsKey(hid)) {
				LogTool.warn("!concurrentHashMap.containsKey(hid) hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			crossData.finishGet();
			YuanXiaoCrossJoiner yuanXiaoCrossJoiner = concurrentHashMap.get(hid);
			HashMap<Integer, Integer> mycailiaoMap = yuanXiaoCrossJoiner.getCailiaoMap();
			if (YuanXiaoFunction.getIns().canUseCaiLiao(mycailiaoMap, useMap)) {
				YuanXiaoFunction.getIns().useCaiLiao(mycailiaoMap, useMap);
				//使用成功
				crossData.putObject(YuanXiaoEnum.useRest, 1);
				crossData.putObject(YuanXiaoEnum.cailiaoMap, yuanXiaoCrossJoiner.getCailiaoMap());
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				LogTool.info("minuecailiao hid:"+hid+mycailiaoMap.get(YuanXiaoConst.CAILIAO_1)+"2:"+mycailiaoMap.get(YuanXiaoConst.CAILIAO_2)+"3"+mycailiaoMap.get(YuanXiaoConst.CAILIAO_3), YuanXiaoCrossIO.class);
				return;
			}else {
				//材料不足
				crossData.putObject(YuanXiaoEnum.useRest, 0);
				crossData.putObject(YuanXiaoEnum.cailiaoMap, yuanXiaoCrossJoiner.getCailiaoMap());
				return;
				
			}
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLusecailiao has wrong:");
		}
	}
	
	
	public void  LTCaddcailiao(YuanXiaoLocal yuanXiaoLocal,HashMap<Integer, Integer> useCaiLiao) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(YuanXiaoEnum.hid, yuanXiaoLocal.getId());
			crossData.putObject(YuanXiaoEnum.addMap, useCaiLiao);
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null || !channel.isOpen()) {
				LogTool.warn("LTCaddcailiao has wrong", YuanXiaoCrossIO.class);
				return ;
			}
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.YUANXIAO_ADD_LC,yuanXiaoLocal.getId(), crossData);
			Integer useRest = writeBlockData.getObject(YuanXiaoEnum.addRest, Integer.class);
			if (useRest==1) {
				//成功
				Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
				HashMap<Integer, Integer> cailiaoMap = writeBlockData.getObject(YuanXiaoEnum.cailiaoMap,classType);
				yuanXiaoLocal.setCailiaoMap(cailiaoMap);
				YuanXiaoFunction.getIns().changeCaiLiaoNum(yuanXiaoLocal);
				return ;
			}
		}catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "LTCaddcailiao has wrong:"+yuanXiaoLocal.getId());
		}
		return ;
	}
	
	
	public void CRLaddcailiao(Channel channel, CrossData crossData) {
		int cmd = CrossConst.YUANXIAO_ADD_LC;
		try {
			
			long hid = crossData.getObject(YuanXiaoEnum.hid, Long.class);
			Type classType = new TypeReference<HashMap<Integer, Integer>>() {}.getType();
			HashMap<Integer, Integer>  addMap = crossData.getObject(YuanXiaoEnum.addMap, classType);
			
			int zoneid = MybatisUtil.getZoneid(hid);
			int partId = CrossCache.getPartId(zoneid);
			
			ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap = YuanXiaoCrossSyscache.getYuanXiaoCrossMap().get(partId);
			if (concurrentHashMap==null) {
				LogTool.warn("concurrentHashMap==null hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			if(!concurrentHashMap.containsKey(hid)) {
				LogTool.warn("!concurrentHashMap.containsKey(hid) hid:"+hid+" partid:"+partId, YuanXiaoCrossIO.class);
				return;
			}
			crossData.finishGet();
			
			YuanXiaoCrossJoiner yuanXiaoCrossJoiner = concurrentHashMap.get(hid);
			HashMap<Integer, Integer> mycailiaoMap = yuanXiaoCrossJoiner.getCailiaoMap();
			for (int key: addMap.keySet()) {
				if (mycailiaoMap.containsKey(key)) {
					Integer addNum = addMap.get(key);
					Integer hasnum = mycailiaoMap.get(key);
					mycailiaoMap.put(key, hasnum+addNum);
				}
			}
			//添加成功
			crossData.putObject(YuanXiaoEnum.addRest, 1);
			crossData.putObject(YuanXiaoEnum.cailiaoMap, yuanXiaoCrossJoiner.getCailiaoMap());
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			LogTool.info("addcailiao hid:"+hid+mycailiaoMap.get(YuanXiaoConst.CAILIAO_1)+"2:"+mycailiaoMap.get(YuanXiaoConst.CAILIAO_2)+"3"+mycailiaoMap.get(YuanXiaoConst.CAILIAO_3), YuanXiaoCrossIO.class);
			return;
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoCrossIO.class, "CRLusecailiao has wrong:");
		}
	}
	
	

}
