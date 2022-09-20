package com.teamtop.system.crossTeamKing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BattleNewSender;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingBattleHis;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingCroCache;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingter;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingterBattleInfo;
import com.teamtop.system.crossTeamKing.cross.TeamKingRankComparator;
import com.teamtop.system.crossTeamKing.cross.TeamKingRankSys;
import com.teamtop.system.crossTeamKing.cross.TeamKingRanker;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocal;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocalCache;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.system.robot.RobotFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kfwzph_770;
import excel.config.Config_kfwzqj_770;
import excel.config.Config_kfwztz_770;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kfwzdw_770;
import excel.struct.Struct_kfwzmb_770;
import excel.struct.Struct_kfwzph_770;
import excel.struct.Struct_kfwzqj_770;
import excel.struct.Struct_kfwztz_770;
import io.netty.channel.Channel;

public class CrossTeamKingFunction {

	private static CrossTeamKingFunction ins = null;

	public static CrossTeamKingFunction getIns() {
		if (ins == null) {
			ins = new CrossTeamKingFunction();
		}
		return ins;
	}
	/**
	 * 根据转生获取相应区间
	 * @param reborn
	 * @return
	 */
	public int getRebornType(int reborn) {
		for (Struct_kfwzqj_770 kfwzqj_770:Config_kfwzqj_770.getIns().getSortList()) {
			if (reborn>=kfwzqj_770.getZs()[0][0]&&reborn<=kfwzqj_770.getZs()[0][1]) {
				return kfwzqj_770.getId();
			}

		}
		return 0;
	}
	/**
	 * 活动开始判断
	 * @return
	 */
	public  boolean getActSate() {
		//int[][] time = CrossTeamKingConst.TIME;
		//[[11,0],[22,0]]
		int time[][]=Config_xtcs_004.getIns().get(CrossTeamKingConst.TIME_ID).getOther();
		int timeNow = TimeDateUtil.getCurrentTime();
		for (int[] timeTemp : time) {
			int begin = TimeDateUtil.getTimeOfTheClock(timeTemp[0]);
			int end = TimeDateUtil.getTimeOfTheClock(timeTemp[0]+1);
			if (timeNow >= begin && timeNow <= end) {
				return true;
			}
		}
		return false;
	}
	/**
	 * 广播给某人相应区间的队伍id
	 * @param hero
	 */
	public void broadCastTeamInfoForHero(Hero hero) {
		try {
			int partId = CrossCache.getPartId(hero.getZoneid());
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				return;
			}
			int reborenType = crossTeamKingLocal.getReborenType();
			if (CrossTeamKingCroCache.getJointeamMap().containsKey(partId)) {
				if (CrossTeamKingCroCache.getJointeamMap().get(partId).containsKey(reborenType)) {
					ConcurrentHashMap<Integer, CrossTeamKingter> TeamInfos = CrossTeamKingCroCache.getJointeamMap().get(partId).get(reborenType);
					Object[] teams=new Object[TeamInfos.size()];
					int i=0;
					Iterator<Entry<Integer, CrossTeamKingter>> iterator = TeamInfos.entrySet().iterator();
					while (iterator.hasNext()) {
						Entry<Integer, CrossTeamKingter> next = iterator.next();
						CrossTeamKingter value = next.getValue();
						long captainhid = value.getCaptainhid();
						Hero hero1=HeroCache.getHero(captainhid);
						if (value.getTeamerHids().size()>0&&hero1!=null&&value.getState()==CrossTeamKingConst.TEAM_STATE_0) {
							teams[i]=new Object[] {value.getTeamid(),hero1.getIcon(),hero1.getFrame(),hero1.getNameZoneid(),value.getTeamerHids().size()};
							i++;
						}
						if (value.getTeamerHids().size()==0&&value.getState()==CrossTeamKingConst.TEAM_STATE_0) {
							iterator.remove();
						}
					}
					teams=CommonUtil.removeNull(teams);
					//I:队伍idI:头像I:头像框U:队长名字B:参与人物数量]
					CrossTeamKingSender.sendCmd_10854(hero.getId(), teams);
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "broadCastTeamInfoForHero has wrong");
		}
	}
	/**
	 * 全中央服广播队伍信息
	 */
	public void broadCastTeamInfo() {
		try {
			for (Hero hero:HeroCache.getHeroMap().values()) {
				if (HeroFunction.getIns().isOnline(hero.getId())) {
					broadCastTeamInfoForHero(hero);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "broadCastTeamInfo has wrong");
		}
	}
	
	
	
   
	public void Createteam(Hero hero) {
		try {
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			int reborenType = crossTeamKingLocal.getReborenType();
			if (reborenType==0) {
				LogTool.warn("Createteam reborenType==0", CrossTeamKingFunction.class);
				return;
			}

			int partId = CrossCache.getPartId(hero.getZoneid());
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>> teamsByPartid = CrossTeamKingCroCache.getJointeamMap().get(partId);
			if (teamsByPartid==null) {
				teamsByPartid=new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossTeamKingter>> ();
				CrossTeamKingCroCache.getJointeamMap().put(partId, teamsByPartid);
			}
			ConcurrentHashMap<Integer, CrossTeamKingter> teamsByReborenType = teamsByPartid.get(reborenType);
			if (teamsByReborenType==null) {
				teamsByReborenType=new  ConcurrentHashMap<Integer, CrossTeamKingter>();
				teamsByPartid.put(reborenType, teamsByReborenType);
			}
			CrossTeamKingter crossTeamKingter =new CrossTeamKingter();
			int teamId = CrossTeamKingCroCache.getTeamId();
			crossTeamKingter.setTeamid(teamId);
			crossTeamKingter.setCaptainhid(hero.getId());
			crossTeamKingter.setTeamerHids(new ArrayList<>());
			crossTeamKingter.getTeamerHids().add(hero.getId());
			crossTeamKingter.setRebornType(reborenType);
			crossTeamKingter.setPartid(partId);

			teamsByReborenType.put(teamId, crossTeamKingter);
			//放入人物-》队伍id缓存中
			CrossTeamKingCroCache.getTeamidMapByHid().put(hero.getId(),crossTeamKingter);

			Object[] teaminfo = makeTeamInfo(crossTeamKingter);
			CrossTeamKingSender.sendCmd_10832(hero.getId(), 0, hero.getId(),teamId, teaminfo);
			CrossTeamKingSender.sendCmd_10824(hero.getId(), 0,teamId);
			//
			broadCastTeamInfo();
			LogTool.info("Createteam has success:"+hero.getId()+" name:"+hero.getNameZoneid()+" teamId:"+teamId, CrossTeamKingFunction.class);
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "Createteam has wrong:"+hero.getId());
		}
		

	}
	/**
	 * 加入队伍
	 * @param hero
	 */
	public void JoinTeam(Hero hero,int joinTeamId) {
		try {
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			int reborenType = crossTeamKingLocal.getReborenType();
			int partId = CrossCache.getPartId(hero.getZoneid());
			long id = hero.getId();
			CrossTeamKingter jointeam = CrossTeamKingCroCache.getJointeam(partId, reborenType, joinTeamId);
			//0请求成功 1队伍不存在 2队伍己满3次数不够4段位不符合6已经在队伍中
			if (CrossTeamKingCroCache.getTeamidMapByHid().containsKey(id)) {
				CrossTeamKingSender.sendCmd_10830(id, 6);
				return;
			}
			if (jointeam==null) {
				//队伍已经解散 或者 不存在
				CrossTeamKingSender.sendCmd_10830(id, 1);
				return;
			}else {
				if (jointeam.getTeamerHids().contains(id)) {
					//已经在队伍中了
					CrossTeamKingSender.sendCmd_10830(id, 6);
					return;
				}
				if (jointeam.getTeamerHids().size()>=3) {
					CrossTeamKingSender.sendCmd_10830(id, 2);
					return;
				}
			}
			if (jointeam.getState()==CrossTeamKingConst.TEAM_STATE_1) {
				CrossTeamKingSender.sendCmd_10830(id, 7);
				return;
			}
			if (jointeam.getState()==CrossTeamKingConst.TEAM_STATE_2) {
				CrossTeamKingSender.sendCmd_10830(id, 8);
				return;
			}
			jointeam.getTeamerHids().add(id);
			//放入人物-》队伍id缓存中
			CrossTeamKingCroCache.getTeamidMapByHid().put(id,jointeam);
			Object[] teaminfo = makeTeamInfo(jointeam);
			for (long goalid:jointeam.getTeamerHids()) {
				CrossTeamKingSender.sendCmd_10832(goalid, 1, jointeam.getCaptainhid(),jointeam.getTeamid(), teaminfo);
			}
			broadCastTeamInfo();
			LogTool.info("JoinTeam has success:"+hero.getId()+" name:"+hero.getNameZoneid()+" teamId:"+joinTeamId, CrossTeamKingFunction.class);
			return;
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "JoinTeam has wrong:"+hero.getId());
		}
		
	}
	

	/**
	 * 生成队伍信息
	 * L:玩家idI:头像I:头像框U:玩家名字I:等级L:战力
	 */
	public Object[] makeTeamInfo(CrossTeamKingter crossTeamKingter) {
		ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
		Object[]  teaminfo=new Object[teamerHids.size()];
		try {
			for (int i = 0; i < teamerHids.size(); i++) {
				long teamerid = teamerHids.get(i);
				if (teamerid>0) {
					Hero hero=HeroCache.getHero(teamerid);
					if (hero!=null) {
						teaminfo[i]=new Object[] {hero.getId(),hero.getIcon(),hero.getFrame(),hero.getNameZoneid(),hero.getLevel(),hero.getTotalStrength()};
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "makeTeamInfo has wrong");
		}
		return teaminfo;
	}
	
	
	public void marryBattle1() {
		try {
			int marryCD=Config_xtcs_004.getIns().get(CrossTeamKingConst.MARRYBATTLE_CD).getNum();
			int nowTime=TimeDateUtil.getCurrentTime();
			//战斗匹配 在同一个中央服下 按着转生区间匹配
			ConcurrentHashMap<Integer, ArrayList<CrossTeamKingter>> marryBattleMap=new ConcurrentHashMap<>();
			
			Iterator<Entry<Integer, CrossTeamKingter>> iterator = CrossTeamKingCroCache.getTeamInMarrys().entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<Integer, CrossTeamKingter> next = iterator.next();
				CrossTeamKingter crossTeamKingter = next.getValue();

				Iterator<Long> iteratorHids = crossTeamKingter.getTeamerHids().iterator();
				while (iteratorHids.hasNext()) {
					Long long1 =iteratorHids.next();
					if(!HeroFunction.getIns().isOnline(long1)) {
						//离线
						iteratorHids.remove();
					}
				}
				if (crossTeamKingter.getTeamerHids().size()==0) {
					//移除
					iterator.remove();
				}else {
					if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_1) {
						int key=crossTeamKingter.getRebornType();
						if (!marryBattleMap.containsKey(key)) {
							marryBattleMap.put(key, new ArrayList<CrossTeamKingter>());
						}
						ArrayList<CrossTeamKingter> arrayList = marryBattleMap.get(key);
						if (!arrayList.contains(crossTeamKingter)) {
							arrayList.add(crossTeamKingter);
						}
					}
				}
			}
			ConcurrentHashMap<Integer, ArrayList<CrossTeamKingter>> battleDoubleId=new ConcurrentHashMap<>();
			int battleIndex=0;
			if (marryBattleMap.size()>0) {
				Iterator<Entry<Integer, ArrayList<CrossTeamKingter>>> marryBattleMapit = marryBattleMap.entrySet().iterator();
				while (marryBattleMapit.hasNext()) {
					Entry<Integer, ArrayList<CrossTeamKingter>> next = marryBattleMapit.next();
					ArrayList<CrossTeamKingter> value = next.getValue();
					int size = value.size();
					if (size==1) {
						//只有1个人\
						ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
						CrossTeamKingter crossTeamKingter = value.get(0);
						if (nowTime-crossTeamKingter.getMarryBattleTime()>=marryCD) {
							crossTeamKingters.add(value.get(0));
							battleDoubleId.put(battleIndex, crossTeamKingters);
							battleIndex++;
						}
						
					}else if(size>1){
						
						
						if (size%2!=0) {
							//奇数 
							//找出队列里匹配时间最大的那个队伍
							int maxIndex=0;
							int marryMaxTime=value.get(0).getMarryBattleTime();
							for (int i = 1; i < value.size(); i++) {
								CrossTeamKingter crossTeamKingter1 = value.get(i);
								int marryBattleTime = crossTeamKingter1.getMarryBattleTime();
								if (marryBattleTime>marryMaxTime) {
									maxIndex=i;
								}
							}
							if (nowTime-marryMaxTime>=marryCD) {
								//为他匹配电脑人
								ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
								CrossTeamKingter crossTeamKingter = value.get(maxIndex);
								crossTeamKingters.add(crossTeamKingter);
								battleDoubleId.put(battleIndex, crossTeamKingters);
								battleIndex++;
							}else {
								value.remove(maxIndex);
							}
							
						}
						List<Integer> randomIndex = RandomUtil.getMultiRandomNumInArea(0, value.size()-1, value.size());
						//偶数个数
						while (randomIndex.size()>=2) {
							Integer integer1 = randomIndex.get(0);
							Integer integer2 = randomIndex.get(1);
							
							CrossTeamKingter crossTeamKingter1 = value.get(integer1);
							CrossTeamKingter crossTeamKingter2 = value.get(integer2);
							//为他匹配一个人
							ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
							crossTeamKingters.add(crossTeamKingter1);
							crossTeamKingters.add(crossTeamKingter2);
							battleDoubleId.put(battleIndex, crossTeamKingters);
							battleIndex++;
							randomIndex.remove(0);
							randomIndex.remove(0);
						}

					}
				}
				
			}
			for (ArrayList<CrossTeamKingter> battleinfos:battleDoubleId.values()) {
				if (battleinfos.size()==1) {
					//匹配到电脑人 
					CrossTeamKingter crossTeamKingter = battleinfos.get(0);
					crossTeamKingter.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingter.setBattleTime(nowTime);
					crossTeamKingter.setBattleteamId(-1);
					
					Object[] myBattleinfo=battleInfo(crossTeamKingter);
					List<CrossHeroBaseRobot> Robotmodels=new ArrayList<>();
					ArrayList<Long> teamerHids = new ArrayList<Long>();
					teamerHids.addAll(crossTeamKingter.getTeamerHids());
					Object[] enemyBattleinfo=new Object[teamerHids.size()];
					Object[] enemyZhanBao=new Object[teamerHids.size()];
					createRobot(crossTeamKingter, Robotmodels, enemyBattleinfo,enemyZhanBao);
					//加入战报 
					CrossTeamKingterBattleInfo crossTeamKingterBattleInfo=new CrossTeamKingterBattleInfo();
					crossTeamKingterBattleInfo.setRebornType(crossTeamKingter.getRebornType());
					crossTeamKingterBattleInfo.setPartAid(crossTeamKingter.getPartid());
					
					Object[] battleinfoA=battleRsetInfo(crossTeamKingter);
					
					crossTeamKingterBattleInfo.setBattleRest(0);
					crossTeamKingterBattleInfo.setTeamAId(crossTeamKingter.getTeamid());
					crossTeamKingterBattleInfo.setTeamAinfo(battleinfoA);
					crossTeamKingterBattleInfo.setTeamKingBattlersA(teamerHids);
					crossTeamKingterBattleInfo.setTeamBId(-1);
					crossTeamKingterBattleInfo.setTeamBinfo(enemyZhanBao);
					Set<Long> synHidSet=new HashSet<Long>();
					crossTeamKingterBattleInfo.setSynHidSet(synHidSet);
					
					for (int i = 0; i < teamerHids.size(); i++) {
						Long long1 = teamerHids.get(i);
						Hero hero1=HeroCache.getHero(long1);
						//发队友属性 
						for (int j = 0; j < teamerHids.size(); j++) {
							Long long2 = teamerHids.get(j);
							if (long2!=long1) {
								Hero hero2=HeroCache.getHero(long2);
								if (hero1!=null&&hero2!=null) {
									HeroFunction.getIns().sendBattleHeroAttr(hero1, long2);
								}
								
							}
						}
						//发镜像机器人
						for (int j = 0; j < Robotmodels.size(); j++) {
							CrossHeroBaseRobot crossHeroBaseRobot = Robotmodels.get(j);
							HeroFunction.getIns().sendBattleHeroAttr(hero1, crossHeroBaseRobot);
						}
						//匹配到对手
						CrossTeamKingSender.sendCmd_10842(long1, myBattleinfo, enemyBattleinfo);
						//加入战报
						List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
						if(list==null) {
							list=new ArrayList<CrossTeamKingterBattleInfo>();
							CrossTeamKingCroCache.getBattleInfos().put(long1, list);
						}
						list.add(crossTeamKingterBattleInfo);
						synHidSet.add(long1);
					}
				}
				if (battleinfos.size()==2) {
					//双方都是队伍
					CrossTeamKingter crossTeamKingterA = battleinfos.get(0);
					CrossTeamKingter crossTeamKingterB = battleinfos.get(1);
					
					crossTeamKingterA.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingterA.setBattleTime(nowTime);
					crossTeamKingterA.setBattleteamId(crossTeamKingterB.getTeamid());
					
					crossTeamKingterB.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingterB.setBattleTime(nowTime);
					crossTeamKingterB.setBattleteamId(crossTeamKingterA.getTeamid());
					
					Object[] teamAinfo=battleRsetInfo(crossTeamKingterA);
					Object[] teamBinfo=battleRsetInfo(crossTeamKingterB);
					
					Object[] battleinfoA=battleInfo(crossTeamKingterA);
					Object[] battleinfoB=battleInfo(crossTeamKingterB);
					
					List<Hero> members=new ArrayList<Hero>();
					List<Hero> enemyList=new ArrayList<Hero>();
					
					long curHp=0; 
					long enemyHp=0; 
					long hudun=0; 
					long eHudun=0;
					//生成战报
					CrossTeamKingterBattleInfo crossTeamKingterBattleInfo=new CrossTeamKingterBattleInfo();
					crossTeamKingterBattleInfo.setBattleIndex(new int[] {0,0});
					crossTeamKingterBattleInfo.setRebornType(crossTeamKingterA.getRebornType());
					crossTeamKingterBattleInfo.setPartAid(crossTeamKingterA.getPartid());
					crossTeamKingterBattleInfo.setBattleRest(0);
					crossTeamKingterBattleInfo.setTeamAId(crossTeamKingterA.getTeamid());
					crossTeamKingterBattleInfo.setTeamAinfo(teamAinfo);
					ArrayList<Long> teamerHidsA = new ArrayList<Long>();
					teamerHidsA.addAll(crossTeamKingterA.getTeamerHids());
					crossTeamKingterBattleInfo.setTeamKingBattlersA(teamerHidsA);
					
					crossTeamKingterBattleInfo.setPartBid(crossTeamKingterB.getPartid());
					crossTeamKingterBattleInfo.setTeamBId(crossTeamKingterB.getTeamid());
					crossTeamKingterBattleInfo.setTeamBinfo(teamBinfo);
					ArrayList<Long> teamerHidsB = new ArrayList<Long>();
					teamerHidsB.addAll(crossTeamKingterB.getTeamerHids());
					crossTeamKingterBattleInfo.setTeamKingBattlersB(teamerHidsB);
				
					Set<Long> synHidSet=new HashSet<Long>();
					crossTeamKingterBattleInfo.setSynHidSet(synHidSet);
					for (int i = 0; i < teamerHidsA.size(); i++) {
						Long long1 = teamerHidsA.get(i);
						Hero hero=HeroCache.getHero(long1);
						if (hero!=null) {
							FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
							if (i==0) {
								curHp=finalFightAttr.getHpMax();
								hudun=finalFightAttr.getHudunMax();
							}
							members.add(hero);
							//加入战报
							List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
							if(list==null) {
								list=new ArrayList<CrossTeamKingterBattleInfo>();
								CrossTeamKingCroCache.getBattleInfos().put(long1, list);
							}
							list.add(crossTeamKingterBattleInfo);
							CrossTeamKingSender.sendCmd_10842(long1, battleinfoA, battleinfoB);
							synHidSet.add(long1);
						}
					}
					
					for (int i = 0; i < teamerHidsB.size(); i++) {
						Long long1 = teamerHidsB.get(i);
						Hero hero=HeroCache.getHero(long1);
						if (hero!=null) {
							if (i==0) {
								FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
								enemyHp=finalFightAttr.getHpMax();
								eHudun=finalFightAttr.getHudunMax();
							}
							enemyList.add(hero);
							//加入战报
							List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
							if(list==null) {
								list=new ArrayList<CrossTeamKingterBattleInfo>();
								CrossTeamKingCroCache.getBattleInfos().put(long1, list);
							}
							list.add(crossTeamKingterBattleInfo);
							CrossTeamKingSender.sendCmd_10842(long1, battleinfoB, battleinfoA);
							synHidSet.add(long1);
						}
					}
					//开始战斗pvp
					long battleUid = BattleNewFunction.getIns().startTeamRoundPVPBattle(members, SystemIdConst.CROSS_TEAMKING, enemyList, BttleTypeConst.BATTLETEAMKING, curHp, enemyHp, hudun, eHudun,synHidSet);
					crossTeamKingterBattleInfo.setBattleUid(battleUid);
				}
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "marryBattle1 has wrong ");
		}
	}
	
	/**
	 * 
	 */
	public void marryBattle() {
		try {
			int nowTime=TimeDateUtil.getCurrentTime();
			//partid_rebornType=>ArrayList<CrossTeamKingter>
			ConcurrentHashMap<String, ArrayList<CrossTeamKingter>> marryBattleMap=new ConcurrentHashMap<>();
			
			Iterator<Entry<Integer, CrossTeamKingter>> iterator = CrossTeamKingCroCache.getTeamInMarrys().entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<Integer, CrossTeamKingter> next = iterator.next();
				CrossTeamKingter crossTeamKingter = next.getValue();

				Iterator<Long> iteratorHids = crossTeamKingter.getTeamerHids().iterator();
				while (iteratorHids.hasNext()) {
					Long long1 =iteratorHids.next();
					if(!HeroFunction.getIns().isOnline(long1)) {
						//离线
						iteratorHids.remove();
					}
				}
				if (crossTeamKingter.getTeamerHids().size()==0) {
					//移除
					iterator.remove();
				}else {
					if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_1) {
						String key=crossTeamKingter.getPartid()+"_"+crossTeamKingter.getRebornType();
						if (!marryBattleMap.containsKey(key)) {
							marryBattleMap.put(key, new ArrayList<CrossTeamKingter>());
						}
						ArrayList<CrossTeamKingter> arrayList = marryBattleMap.get(key);
						if (!arrayList.contains(crossTeamKingter)) {
							arrayList.add(crossTeamKingter);
						}
					}
				}
			}
			ConcurrentHashMap<Integer, ArrayList<CrossTeamKingter>> battleDoubleId=new ConcurrentHashMap<>();
			int battleIndex=0;
			if (marryBattleMap.size()>0) {
				Iterator<Entry<String, ArrayList<CrossTeamKingter>>> marryBattleMapit = marryBattleMap.entrySet().iterator();
				while (marryBattleMapit.hasNext()) {
					Entry<String, ArrayList<CrossTeamKingter>> next = marryBattleMapit.next();
					ArrayList<CrossTeamKingter> value = next.getValue();
					int size = value.size();
					/*if (size>1&&size%2==0) {
						//屏蔽npc
						List<Integer> randomIndex = RandomUtil.getMultiRandomNumInArea(0, size-1, size);
						//偶数个数
						while (randomIndex.size()>=2) {
							Integer integer1 = randomIndex.get(0);
							Integer integer2 = randomIndex.get(1);
							
							CrossTeamKingter crossTeamKingter1 = value.get(integer1);
							CrossTeamKingter crossTeamKingter2 = value.get(integer2);
							//为他匹配一个人
							ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
							crossTeamKingters.add(crossTeamKingter1);
							crossTeamKingters.add(crossTeamKingter2);
							battleDoubleId.put(battleIndex, crossTeamKingters);
							battleIndex++;
							randomIndex.remove(0);
							randomIndex.remove(0);
						}
					}*/
					if (size==1) {
						//只有1个人\
						ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
						crossTeamKingters.add(value.get(0));
						battleDoubleId.put(battleIndex, crossTeamKingters);
					}else if(size>1){
						List<Integer> randomIndex = RandomUtil.getMultiRandomNumInArea(0, size-1, size);
						
						if (size%2!=0) {
							//奇数 且匹配数量队伍>1 剔除一个人
							Integer lastIndex = randomIndex.get(size-1);
							CrossTeamKingter crossTeamKingter1 = value.get(lastIndex);
							//为他匹配一个电脑人
							ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
							crossTeamKingters.add(crossTeamKingter1);
							battleDoubleId.put(battleIndex, crossTeamKingters);
							battleIndex++;
							randomIndex.remove(size-1);
							size=size-1;
							value.remove(crossTeamKingter1);
						}
						//偶数个数
						while (randomIndex.size()>=2) {
							Integer integer1 = randomIndex.get(0);
							Integer integer2 = randomIndex.get(1);
							
							CrossTeamKingter crossTeamKingter1 = value.get(integer1);
							CrossTeamKingter crossTeamKingter2 = value.get(integer2);
							//为他匹配一个人
							ArrayList<CrossTeamKingter> crossTeamKingters=new ArrayList<>();
							crossTeamKingters.add(crossTeamKingter1);
							crossTeamKingters.add(crossTeamKingter2);
							battleDoubleId.put(battleIndex, crossTeamKingters);
							battleIndex++;
							randomIndex.remove(0);
							randomIndex.remove(0);
						}

					}
				}
				
			}
			for (ArrayList<CrossTeamKingter> battleinfos:battleDoubleId.values()) {
				if (battleinfos.size()==1) {
					//匹配到电脑人 
					CrossTeamKingter crossTeamKingter = battleinfos.get(0);
					crossTeamKingter.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingter.setBattleTime(nowTime);
					crossTeamKingter.setBattleteamId(-1);
					
					Object[] myBattleinfo=battleInfo(crossTeamKingter);
					List<CrossHeroBaseRobot> Robotmodels=new ArrayList<>();
					ArrayList<Long> teamerHids = new ArrayList<Long>();
					teamerHids.addAll(crossTeamKingter.getTeamerHids());
					Object[] enemyBattleinfo=new Object[teamerHids.size()];
					Object[] enemyZhanBao=new Object[teamerHids.size()];
					createRobot(crossTeamKingter, Robotmodels, enemyBattleinfo,enemyZhanBao);
					//加入战报 
					CrossTeamKingterBattleInfo crossTeamKingterBattleInfo=new CrossTeamKingterBattleInfo();
					crossTeamKingterBattleInfo.setRebornType(crossTeamKingter.getRebornType());
					crossTeamKingterBattleInfo.setPartAid(crossTeamKingter.getPartid());
					
					Object[] battleinfoA=battleRsetInfo(crossTeamKingter);
					
					crossTeamKingterBattleInfo.setBattleRest(0);
					crossTeamKingterBattleInfo.setTeamAId(crossTeamKingter.getTeamid());
					crossTeamKingterBattleInfo.setTeamAinfo(battleinfoA);
					crossTeamKingterBattleInfo.setTeamKingBattlersA(teamerHids);
					crossTeamKingterBattleInfo.setTeamBId(-1);
					crossTeamKingterBattleInfo.setTeamBinfo(enemyZhanBao);
					
					
					for (int i = 0; i < teamerHids.size(); i++) {
						Long long1 = teamerHids.get(i);
						Hero hero1=HeroCache.getHero(long1);
						//发队友属性 
						for (int j = 0; j < teamerHids.size(); j++) {
							Long long2 = teamerHids.get(j);
							if (long2!=long1) {
								Hero hero2=HeroCache.getHero(long2);
								if (hero1!=null&&hero2!=null) {
									HeroFunction.getIns().sendBattleHeroAttr(hero1, long2);
								}
								
							}
						}
						//发镜像机器人
						for (int j = 0; j < Robotmodels.size(); j++) {
							CrossHeroBaseRobot crossHeroBaseRobot = Robotmodels.get(j);
							HeroFunction.getIns().sendBattleHeroAttr(hero1, crossHeroBaseRobot);
						}
						//匹配到对手
						CrossTeamKingSender.sendCmd_10842(long1, myBattleinfo, enemyBattleinfo);
						//加入战报
						List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
						if(list==null) {
							list=new ArrayList<CrossTeamKingterBattleInfo>();
							CrossTeamKingCroCache.getBattleInfos().put(long1, list);
						}
						list.add(crossTeamKingterBattleInfo);
					}
				}
				if (battleinfos.size()==2) {
					//双方都是队伍
					CrossTeamKingter crossTeamKingterA = battleinfos.get(0);
					CrossTeamKingter crossTeamKingterB = battleinfos.get(1);
					
					crossTeamKingterA.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingterA.setBattleTime(nowTime);
					crossTeamKingterA.setBattleteamId(crossTeamKingterB.getTeamid());
					
					crossTeamKingterB.setState(CrossTeamKingConst.TEAM_STATE_2);
					crossTeamKingterB.setBattleTime(nowTime);
					crossTeamKingterB.setBattleteamId(crossTeamKingterA.getTeamid());
					
					Object[] teamAinfo=battleRsetInfo(crossTeamKingterA);
					Object[] teamBinfo=battleRsetInfo(crossTeamKingterB);
					
					Object[] battleinfoA=battleInfo(crossTeamKingterA);
					Object[] battleinfoB=battleInfo(crossTeamKingterB);
					
					List<Hero> members=new ArrayList<Hero>();
					List<Hero> enemyList=new ArrayList<Hero>();
					
					long curHp=0; 
					long enemyHp=0; 
					long hudun=0; 
					long eHudun=0;
					//生成战报
					CrossTeamKingterBattleInfo crossTeamKingterBattleInfo=new CrossTeamKingterBattleInfo();
					crossTeamKingterBattleInfo.setBattleIndex(new int[] {0,0});
					crossTeamKingterBattleInfo.setRebornType(crossTeamKingterA.getRebornType());
					crossTeamKingterBattleInfo.setPartAid(crossTeamKingterA.getPartid());
					crossTeamKingterBattleInfo.setBattleRest(0);
					crossTeamKingterBattleInfo.setTeamAId(crossTeamKingterA.getTeamid());
					crossTeamKingterBattleInfo.setTeamAinfo(teamAinfo);
					ArrayList<Long> teamerHidsA = new ArrayList<Long>();
					teamerHidsA.addAll(crossTeamKingterA.getTeamerHids());
					crossTeamKingterBattleInfo.setTeamKingBattlersA(teamerHidsA);
					
					crossTeamKingterBattleInfo.setPartBid(crossTeamKingterB.getPartid());
					crossTeamKingterBattleInfo.setTeamBId(crossTeamKingterB.getTeamid());
					crossTeamKingterBattleInfo.setTeamBinfo(teamBinfo);
					ArrayList<Long> teamerHidsB = new ArrayList<Long>();
					teamerHidsB.addAll(crossTeamKingterB.getTeamerHids());
					crossTeamKingterBattleInfo.setTeamKingBattlersB(teamerHidsB);
				
					Set<Long> synHidSet=new HashSet<Long>();
					crossTeamKingterBattleInfo.setSynHidSet(synHidSet);
					for (int i = 0; i < teamerHidsA.size(); i++) {
						Long long1 = teamerHidsA.get(i);
						Hero hero=HeroCache.getHero(long1);
						if (hero!=null) {
							FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
							if (i==0) {
								curHp=finalFightAttr.getHpMax();
								hudun=finalFightAttr.getHudunMax();
							}
							members.add(hero);
							//加入战报
							List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
							if(list==null) {
								list=new ArrayList<CrossTeamKingterBattleInfo>();
								CrossTeamKingCroCache.getBattleInfos().put(long1, list);
							}
							list.add(crossTeamKingterBattleInfo);
							CrossTeamKingSender.sendCmd_10842(long1, battleinfoA, battleinfoB);
							synHidSet.add(long1);
						}
					}
					
					for (int i = 0; i < teamerHidsB.size(); i++) {
						Long long1 = teamerHidsB.get(i);
						Hero hero=HeroCache.getHero(long1);
						if (hero!=null) {
							if (i==0) {
								FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
								enemyHp=finalFightAttr.getHpMax();
								eHudun=finalFightAttr.getHudunMax();
							}
							enemyList.add(hero);
							//加入战报
							List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(long1);
							if(list==null) {
								list=new ArrayList<CrossTeamKingterBattleInfo>();
								CrossTeamKingCroCache.getBattleInfos().put(long1, list);
							}
							list.add(crossTeamKingterBattleInfo);
							CrossTeamKingSender.sendCmd_10842(long1, battleinfoB, battleinfoA);
							synHidSet.add(long1);
						}
					}
					//开始战斗pvp
					long battleUid = BattleNewFunction.getIns().startTeamRoundPVPBattle(members, SystemIdConst.CROSS_TEAMKING, enemyList, BttleTypeConst.BATTLETEAMKING, curHp, enemyHp, hudun, eHudun,synHidSet);
					crossTeamKingterBattleInfo.setBattleUid(battleUid);
				}
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "marryBattle has wrong");
		}
	}
	/**
	 * 匹配到对手 [I:头像I:头像框U:玩家名字L:战力B:是否是电脑人0不是1是]
	 * @param crossTeamKingter
	 * @return
	 */
	public Object[] battleInfo(CrossTeamKingter crossTeamKingter) {
		ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
		Object[]  teaminfo=new Object[teamerHids.size()];
		try {
			for (int i = 0; i < teamerHids.size(); i++) {
				long teamerid = teamerHids.get(i);
				if (teamerid>0) {
					Hero hero=HeroCache.getHero(teamerid);
					if (hero!=null) {
						teaminfo[i]=new Object[] {hero.getIcon(),hero.getFrame(),hero.getNameZoneid(),hero.getTotalStrength(),0,hero.getId()};
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "battleInfo has wrong");
		}
		teaminfo=CommonUtil.removeNull(teaminfo);
		return teaminfo;
	}  
	
	/**
	 * 战报人头像信息 L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字
	 * @param crossTeamKingter
	 * @return
	 */
	public Object[] battleRsetInfo(CrossTeamKingter crossTeamKingter) {
		ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
		Object[]  teaminfo=new Object[teamerHids.size()];
		try {
			for (int i = 0; i < teamerHids.size(); i++) {
				long teamerhid = teamerHids.get(i);
				Hero hero=HeroCache.getHero(teamerhid);
				if (hero!=null) {
					//是否是队长
					int isCapHid=0;
					if (teamerhid==crossTeamKingter.getCaptainhid()) {
						isCapHid=1;
					}
					teaminfo[i]=new Object[] {hero.getId(),isCapHid,hero.getIcon(),hero.getFrame(),hero.getNameZoneid()};
				}

			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "battleRsetInfo has wrong");
		}
		teaminfo=CommonUtil.removeNull(teaminfo);
		return teaminfo;
	}
	
	
	
	
	/**
	 * 生成镜像队伍机器人
	 * @param crossTeamKingter
	 */
	public void createRobot(CrossTeamKingter crossTeamKingter,List<CrossHeroBaseRobot> models,Object[] teaminfo,Object[] robotZhanBao) {
		try {
			int perNum=Config_xtcs_004.getIns().get(CrossTeamKingConst.ROBOT_NUM).getNum();
			ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
			int iscap=0;
			for (int i = 0; i < teamerHids.size(); i++) {
				long teamerid = teamerHids.get(i);
				if (teamerid>0&&HeroFunction.getIns().isOnline(teamerid)) {
					Hero hero=HeroCache.getHero(teamerid);
					if (hero!=null) {
						CrossHeroBaseRobot beChaModel = RobotFunction.getIns().createCrossHeroBaseRobot(hero, perNum);
						models.add(beChaModel);
						//随机区号
						int zoneid = hero.getZoneid();
						if (zoneid > 1) {
							zoneid = RandomUtil.getRandomNumInAreas(1, zoneid - 1);
						} else {
							zoneid = RandomUtil.getRandomNumInAreas(1, 10);
						}
						beChaModel.setNameZoneid(beChaModel.getName() + ".S" + zoneid);
						teaminfo[i]=new Object[] {beChaModel.getIcon(),beChaModel.getFrame(),beChaModel.getNameZoneid(),beChaModel.getTotalStrength(),1,beChaModel.getId()};
						if (i==0) {
							iscap=1;
						}
						robotZhanBao[i]=new Object[] {beChaModel.getId(),iscap,beChaModel.getIcon(),beChaModel.getFrame(),beChaModel.getNameZoneid()};
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "createRobot has wrong");
		}
		teaminfo=CommonUtil.removeNull(teaminfo);
		//HeroFunction.getIns().sendBattleHeroAttr(hero, beChaModel);
	}
	/**
	 * 结算跨服王者 pvp
	 * @param crossTeamKingterBattleInfo
	 */
	public void overBattle(CrossTeamKingterBattleInfo crossTeamKingterBattleInfo,long battleUid) {
		try {
			int rebornType = crossTeamKingterBattleInfo.getRebornType();
			int partAid = crossTeamKingterBattleInfo.getPartAid();
			int partBid = crossTeamKingterBattleInfo.getPartBid();
			Struct_kfwztz_770 kfwztz_770=Config_kfwztz_770.getIns().get(rebornType);
			if (kfwztz_770==null) {
				LogTool.warn("kfwztz_770==null "+rebornType,CrossTeamKingFunction.class);
				return;
			}
			int loseJf = kfwztz_770.getLose();
			int winJf = kfwztz_770.getWin();
			int max = kfwztz_770.getMax();
			int addJf=kfwztz_770.getLsjf();
			int[][] sbjl = kfwztz_770.getSbjl();
			int[][] sljl = kfwztz_770.getSljl();
			
			List<Object[]> winList = new ArrayList<>();
			List<Object[]> loseList = new ArrayList<>();
			if (sljl != null) {
				for (int[] win : sljl) {
					winList.add(new Object[] { win[0], win[1], win[2], 0 });
				}
			}
			if (sbjl != null) {
				for (int[] lose : sbjl) {
					loseList.add(new Object[] { lose[0], lose[1], lose[2], 0 });
				}
			}
			
			//crossTeamKingterBattleInfo.setTeamjfA(crossTeamKingterBattleInfo.getTeamAKillNum()*jsjf+bdjf);
			//crossTeamKingterBattleInfo.setTeamjfB(crossTeamKingterBattleInfo.getTeamBKillNum()*jsjf+bdjf);
			
			List<Long> teamWin=new ArrayList<Long>();
			List<Long> teamFail=new ArrayList<Long>();
			//int jfWin=0;
			//int jfFail=0;
			CrossTeamKingter teamA = CrossTeamKingCroCache.getJointeam(partAid, rebornType, crossTeamKingterBattleInfo.getTeamAId());
			CrossTeamKingter teamB = CrossTeamKingCroCache.getJointeam(partBid, rebornType, crossTeamKingterBattleInfo.getTeamBId());
			
			if (crossTeamKingterBattleInfo.getBattleRest()==1) {
				teamWin=teamA.getTeamerHids();
				teamFail=teamB.getTeamerHids();
				//jfWin=crossTeamKingterBattleInfo.getTeamjfA();
				//jfFail=crossTeamKingterBattleInfo.getTeamjfB();
			}
			if (crossTeamKingterBattleInfo.getBattleRest()==2) {
				teamWin=teamB.getTeamerHids();
				teamFail=teamA.getTeamerHids();
				//jfWin=crossTeamKingterBattleInfo.getTeamjfB();
				//jfFail=crossTeamKingterBattleInfo.getTeamjfA();
			}
			
			
			if (teamA!=null) {
				teamA.setState(CrossTeamKingConst.TEAM_STATE_0);
				teamA.setBattleteamId(0);
				teamA.setBattleTime(0);
				teamA.setMarryBattleTime(0);
			}
			if (teamB!=null) {
				teamB.setState(CrossTeamKingConst.TEAM_STATE_0);
				teamB.setBattleteamId(0);
				teamB.setBattleTime(0);
				teamB.setMarryBattleTime(0);
			}
			
			ArrayList<TeamKingRanker> changeJfList=new ArrayList<>();
			//胜利队伍结算
			for (int i = 0; i < teamWin.size(); i++) {
				Long long1 = teamWin.get(i);
				Hero heroA = HeroCache.getHero(long1);
				if (heroA!=null) {
					CrossTeamKingLocal crossTeamKingLocal = heroA.getCrossTeamKingLocal();
					
					int awayWinNum=crossTeamKingLocal.getWinAwayNum()+1;
					int awayAddJf=awayWinNum*addJf;
					int winSumNum=winJf+awayAddJf-addJf;
					if (winSumNum>=max) {
						winSumNum=max;
					}
					crossTeamKingLocal.setWinAwayNum(awayWinNum);
					
					CrossTeamKingBattleHis battleHis=new CrossTeamKingBattleHis();
					battleHis.setHid(long1);
					battleHis.setBattleRest(1);
					if (teamA.getTeamerHids().contains(long1)) {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
					}else {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
					}
					battleHis.setJfNum(winSumNum);
					//加入个人战报
					addBattleHis(long1, battleHis);
					//胜利队伍积分奖励
					crossTeamKingLocal.setJf(crossTeamKingLocal.getJf()+winSumNum);
					//扣次数
					crossTeamKingLocal.addLeftNum(-1);
					//加胜利场数
					crossTeamKingLocal.setBattleWinNum(crossTeamKingLocal.getBattleWinNum()+1);
					//胜利队伍奖励
					UseAddUtil.add(heroA, sljl, SourceGoodConst.CROSS_TEAMKING_WIN, UseAddUtil.getDefaultMail(), true);
					//更新子服model
					Channel localChannel = CrossCache.getLocalChannel(long1);
					CrossTeamKingIO.getIns().CTLupdateTeamKingLocal(localChannel, long1, crossTeamKingLocal);
					
					//积分发生变化
					TeamKingRanker teamKingRanker=new TeamKingRanker();
					teamKingRanker.setHid(long1);
					teamKingRanker.setName(heroA.getNameZoneid());
					teamKingRanker.setPartid(CrossCache.getPartId(heroA.getZoneid()));
					teamKingRanker.setRebornType(rebornType);
					teamKingRanker.setJf(crossTeamKingLocal.getJf());
					teamKingRanker.setTime(TimeDateUtil.getCurrentTime());
					teamKingRanker.setTotalStrength(heroA.getTotalStrength());
					changeJfList.add(teamKingRanker);
					
					BattleNewSender.sendCmd_3868(heroA.getId(), battleUid, 1, SystemIdConst.CROSS_TEAMKING, winList.toArray());
				}else {
					LogTool.warn("CrossTeamKingBattleEvent heroA!=null "+long1, CrossTeamKingFunction.class);
				}
			}
			//失败队伍结算
			for (int i = 0; i < teamFail.size(); i++) {
				Long long1 = teamFail.get(i);
				Hero heroB = HeroCache.getHero(long1);
				if (heroB!=null) {
					CrossTeamKingLocal crossTeamKingLocal = heroB.getCrossTeamKingLocal();
					
					crossTeamKingLocal.setWinAwayNum(0);
					
					CrossTeamKingBattleHis battleHis=new CrossTeamKingBattleHis();
					battleHis.setHid(long1);
					battleHis.setBattleRest(2);
					if (teamA.getTeamerHids().contains(long1)) {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
					}else {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
					}
					battleHis.setJfNum(loseJf);
					//加入个人战报
					addBattleHis(long1, battleHis);
					//失败队伍积分奖励
					crossTeamKingLocal.setJf(crossTeamKingLocal.getJf()+loseJf);
					//扣次数
					crossTeamKingLocal.addLeftNum(-1);
					//胜利队伍奖励
					UseAddUtil.add(heroB, sbjl, SourceGoodConst.CROSS_TEAMKING_FAIL, UseAddUtil.getDefaultMail(), true);
					//更新子服model
					Channel localChannel = CrossCache.getLocalChannel(long1);
					CrossTeamKingIO.getIns().CTLupdateTeamKingLocal(localChannel, long1, crossTeamKingLocal);
					//积分发生变化
					TeamKingRanker teamKingRanker=new TeamKingRanker();
					teamKingRanker.setHid(long1);
					teamKingRanker.setName(heroB.getNameZoneid());
					teamKingRanker.setPartid(CrossCache.getPartId(heroB.getZoneid()));
					teamKingRanker.setRebornType(rebornType);
					teamKingRanker.setJf(crossTeamKingLocal.getJf());
					teamKingRanker.setTime(TimeDateUtil.getCurrentTime());
					teamKingRanker.setTotalStrength(heroB.getTotalStrength());
					changeJfList.add(teamKingRanker);
					
					BattleNewSender.sendCmd_3868(heroB.getId(), battleUid, 0, SystemIdConst.CROSS_TEAMKING, loseList.toArray());
				}else {
					LogTool.warn("CrossTeamKingBattleEvent heroA!=null "+long1, CrossTeamKingFunction.class);
				}
			}
			
			if (changeJfList.size()>0) {
				TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
				for (int i = 0; i < changeJfList.size(); i++) {
					TeamKingRanker teamKingRanker = changeJfList.get(i);
					int partid2 = teamKingRanker.getPartid();
					int rebornType2 = teamKingRanker.getRebornType();
					ConcurrentHashMap<Integer, List<TeamKingRanker>> teamKingRankersBypartid = teamKingRankSys.getRankCache().get(partid2);
					if (teamKingRankersBypartid==null) {
						teamKingRankersBypartid=new ConcurrentHashMap<Integer, List<TeamKingRanker>>();
						teamKingRankSys.getRankCache().put(partid2, teamKingRankersBypartid);
					}
					List<TeamKingRanker> teamKingRankers = teamKingRankersBypartid.get(rebornType2);
					if (teamKingRankers==null) {
						teamKingRankers=new ArrayList<>();
						teamKingRankersBypartid.put(rebornType2, teamKingRankers);
					}
					sortTeamKingRank(teamKingRankers, teamKingRanker, CrossTeamKingConst.RANK_MAX);
				}
			}
			if (battleOverMoveMerber(teamA)||battleOverMoveMerber(teamB)) {
				broadCastTeamInfo();
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "overBattle has wrong");
		}
	}
	/**
	 * 加入排行
	 * @param hid
	 * @param name
	 * @param partid
	 * @param rebornType
	 * @param jf
	 */
	public void addTeamKingRank(Long hid,String name,int partid,int rebornType,int jf,long TotalStrength) {
		try {
			//积分发生变化
			TeamKingRanker teamKingRanker=new TeamKingRanker();
			teamKingRanker.setHid(hid);
			teamKingRanker.setName(name);
			teamKingRanker.setPartid(partid);
			teamKingRanker.setRebornType(rebornType);
			teamKingRanker.setJf(jf);
			teamKingRanker.setTime(TimeDateUtil.getCurrentTime());
			teamKingRanker.setTotalStrength(TotalStrength);
			
			TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
			ConcurrentHashMap<Integer, List<TeamKingRanker>> teamKingRankersBypartid = CrossTeamKingCroCache.getTeamKingRankSys().getRankCache().get(partid);
			if (teamKingRankersBypartid==null) {
				teamKingRankersBypartid=new ConcurrentHashMap<Integer, List<TeamKingRanker>>();
				teamKingRankSys.getRankCache().put(partid, teamKingRankersBypartid);
			}
			List<TeamKingRanker> teamKingRankers = teamKingRankersBypartid.get(rebornType);
			if (teamKingRankers==null) {
				teamKingRankers=new ArrayList<>();
				teamKingRankersBypartid.put(rebornType, teamKingRankers);
			}
			CrossTeamKingFunction.getIns().sortTeamKingRank(teamKingRankers, teamKingRanker, CrossTeamKingConst.RANK_MAX);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "addTeamKingRank has wrong:hid"+hid+"name:"+name+"partid:"+partid+"jf:"+jf);
		}
		
	}
	
	
	public void sortTeamKingRank(List<TeamKingRanker> teamKingRankers,TeamKingRanker teamKingRanker,int maxRank) {
		try {
			if (teamKingRanker==null) {
				LogTool.warn("teamKingRanker==null", CrossTeamKingFunction.class);
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					int index =-1;
					TeamKingRanker tempTeamKingRanker = null;
					index = teamKingRankers.indexOf(teamKingRanker);
					if(index >= 0){
						//存在缓存则更新
						tempTeamKingRanker = teamKingRankers.get(index);
						if (teamKingRanker.getJf()!=tempTeamKingRanker.getJf()) {
							tempTeamKingRanker.setTime(TimeDateUtil.getCurrentTime());
						}
						tempTeamKingRanker.setHid(teamKingRanker.getHid());
						tempTeamKingRanker.setJf(teamKingRanker.getJf());
						tempTeamKingRanker.setTotalStrength(teamKingRanker.getTotalStrength());
					}else {
						//不存在缓存则添加
						teamKingRankers.add(teamKingRanker);
					}
					Collections.sort(teamKingRankers, new TeamKingRankComparator());
					int i = 1;
					Iterator<TeamKingRanker> iterator = teamKingRankers.iterator();
					while(iterator.hasNext()){
						TeamKingRanker model = iterator.next();
						if(i > maxRank){
							model.setRank(0);
							iterator.remove();
						}else {
							model.setRank(i);
						}
						i++;
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.CROSS_TEAMKING_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "sortTeamKingRank  has wrong");
		}
		
	}
	
	public int duanweiByJf(int rebornType,int jf) {
		int duanWei=1;
		ConcurrentHashMap<Integer, Struct_kfwzdw_770> concurrentHashMap = CrossTeamKingLocalCache.getDuanweiRewardMap().get(rebornType);
		for (int i = 1; i <=concurrentHashMap.size(); i++) {
			Struct_kfwzdw_770 struct_kfwzdw_770 = concurrentHashMap.get(i);
			if (struct_kfwzdw_770.getJf()>0&&jf>=struct_kfwzdw_770.getJf()) {
				duanWei=struct_kfwzdw_770.getNext();
			}
		}
		return duanWei;
		
	}
	/**
	 * 将战斗信息转换成战报发给个人
	 * @param hid
	 * @param crossTeamKingterBattleInfo
	 * @return B:胜负 1赢了 2输了I:获得积分[L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字][L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字]]
	 */
	/*public Object[] changeInfoToObject(long hid,CrossTeamKingterBattleInfo crossTeamKingterBattleInfo) {
		Object[] restInfo = null;
		try {
			List<Long> teamKingBattlersA = crossTeamKingterBattleInfo.getTeamKingBattlersA();
			int battleRest = crossTeamKingterBattleInfo.getBattleRest();
			int rest=0;
			int jf=0;
			Object[] myTeams;
			Object[] enemy;
			
			if (teamKingBattlersA.contains(hid)) {
				//属于A队 
                //战斗结果 0 没有结果 1A赢了 2A输了
				if (battleRest==1) {
					//A赢了
					rest=1;
				}else {
					rest=2;
				}
				jf=crossTeamKingterBattleInfo.getTeamjfA();
				myTeams=crossTeamKingterBattleInfo.getTeamAinfo();
				enemy=crossTeamKingterBattleInfo.getTeamBinfo();
			}else {
				//属于B队 
                //战斗结果 0 没有结果 1A赢了 2A输了
				if (battleRest==1) {
					//A赢了
					rest=2;
				}else {
					rest=1;
				}
				jf=crossTeamKingterBattleInfo.getTeamjfB();
				myTeams=crossTeamKingterBattleInfo.getTeamBinfo();
				enemy=crossTeamKingterBattleInfo.getTeamAinfo();
			}
			int rebornType = crossTeamKingterBattleInfo.getRebornType();
			Struct_kfwztz_770 kfwztz_770=Config_kfwztz_770.getIns().get(rebornType);
			int bdjf = kfwztz_770.getBdjf();
			if (jf==0) {
				jf=bdjf;
			}
			restInfo=new Object[] {rest,jf,myTeams,enemy};
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "changeInfoToObject has wrong");
		}
		return restInfo;
		
	}*/
	/**
	 * 将战斗信息转换成战报发给个人
	 * @param hid
	 * @param crossTeamKingterBattleInfo
	 * @return B:胜负 1赢了 2输了I:获得积分[L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字][L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字]]
	 */
	public Object[] changeInfoToObject(long hid,CrossTeamKingBattleHis crossTeamKingBattleHis) {
		Object[] restInfo = null;
		try {
			int rest=crossTeamKingBattleHis.getBattleRest();
			int jf=crossTeamKingBattleHis.getJfNum();
			Object[] myTeams=crossTeamKingBattleHis.getTeamMyinfo();
			Object[] enemy=crossTeamKingBattleHis.getTeamEnemyinfo();
			restInfo=new Object[] {rest,jf,myTeams,enemy};
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "changeInfoToObject has wrong");
		}
		return restInfo;
		
	}
	/**
	 * 结束正在
	 * rest| 0胜利 1失败| byte
	 * @return
	 */
	public void overPveBattle(Hero hero,CrossTeamKingter crossTeamKingter,int rest,int killNum) {
		try {
			int rebornType = crossTeamKingter.getRebornType();
			int partid = crossTeamKingter.getPartid();

			Struct_kfwztz_770 kfwztz_770=Config_kfwztz_770.getIns().get(rebornType);
			if (kfwztz_770==null) {
				LogTool.warn("kfwztz_770==null "+rebornType,CrossTeamKingFunction.class);
				return ;
			}
			int loseJf = kfwztz_770.getLose();
			int winJf = kfwztz_770.getWin();
			int max = kfwztz_770.getMax();
			int addJf=kfwztz_770.getLsjf();
			
			int[][] sbjl = kfwztz_770.getSbjl();
			int[][] sljl = kfwztz_770.getSljl();
		
			
			
			List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(hero.getId());
			if (list==null) {
				LogTool.warn("overPveBattle has wrong list==null", CrossTeamKingFunction.class);
				return;
			}
			CrossTeamKingterBattleInfo crossTeamKingterBattleInfo = list.get(list.size()-1);
			if (crossTeamKingterBattleInfo==null) {
				LogTool.warn("overPveBattle has wrong crossTeamKingterBattleInfo==null", CrossTeamKingFunction.class);
				return;
			}
			
			if (crossTeamKingterBattleInfo.getBattleUid()!=0) {
				LogTool.warn("overPveBattle has wrong crossTeamKingterBattleInfo.getBattleUid()!=0", CrossTeamKingFunction.class);
				return;
			}
			
			if (crossTeamKingterBattleInfo.getBattleRest()!=0) {
				LogTool.warn("overPveBattle has wrong crossTeamKingterBattleInfo.getBattleRest()!=0", CrossTeamKingFunction.class);
				return;
			}
			crossTeamKingter.setState(CrossTeamKingConst.TEAM_STATE_0);
			crossTeamKingter.setBattleteamId(0);
			crossTeamKingter.setBattleTime(0);
			crossTeamKingter.setMarryBattleTime(0);
			
			

			ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
			int size = teamerHids.size();
			
			
			int addWinNum=0;
			int[][] reward;
			int sourceConst= SourceGoodConst.CROSS_TEAMKING_WIN;
			/*int addjf=0;
			if (rest==0) {
				//胜利
				
				crossTeamKingterBattleInfo.setBattleRest(1);
				addWinNum=1;
				reward=CommonUtil.copyDyadicArray(sljl);
				//addjf=size*jsjf;
				//crossTeamKingterBattleInfo.setTeamjfA(addjf+bdjf);
				
			}else {
				//失败
				crossTeamKingterBattleInfo.setBattleRest(2);
				sourceConst= SourceGoodConst.CROSS_TEAMKING_FAIL;
				reward=CommonUtil.copyDyadicArray(sbjl);
				if (killNum>=3) {
					killNum=1;
				}
				//addjf=killNum*jsjf;
				//crossTeamKingterBattleInfo.setTeamjfA(addjf+bdjf);
			}*/
			
			for (int i = 0; i < size; i++) {
				Long long1 = teamerHids.get(i);
				Hero heroA = HeroCache.getHero(long1);
				if (heroA!=null) {
					CrossTeamKingLocal crossTeamKingLocal = heroA.getCrossTeamKingLocal();
					CrossTeamKingBattleHis battleHis=new CrossTeamKingBattleHis();
					battleHis.setHid(long1);
					int addSumNum=0;
					if (rest==0) {
						//胜利
						int awayWinNum=crossTeamKingLocal.getWinAwayNum()+1;
						crossTeamKingLocal.setWinAwayNum(awayWinNum);
						int awayAddJf=awayWinNum*addJf;
						addSumNum=winJf+awayAddJf-addJf;
						if (addSumNum>=max) {
							addSumNum=max;
						}
						battleHis.setBattleRest(1);
						reward=CommonUtil.copyDyadicArray(sljl);
						
					}else {
						addSumNum=loseJf;
						battleHis.setBattleRest(2);
						reward=CommonUtil.copyDyadicArray(sbjl);
					}					
					battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
					battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
					battleHis.setJfNum(addSumNum);
					//加入个人战报
					addBattleHis(long1, battleHis);
					//胜利队伍积分奖励
					crossTeamKingLocal.setJf(crossTeamKingLocal.getJf()+addSumNum);
					//扣次数
					crossTeamKingLocal.addLeftNum(-1);
					//加胜利场数
					crossTeamKingLocal.setBattleWinNum(crossTeamKingLocal.getBattleWinNum()+1);
					//胜利队伍奖励
					UseAddUtil.add(heroA, reward,sourceConst, UseAddUtil.getDefaultMail(), true);
					//更新子服model
					Channel localChannel = CrossCache.getLocalChannel(long1);
					CrossTeamKingIO.getIns().CTLupdateTeamKingLocal(localChannel, long1, crossTeamKingLocal);

					//积分发生变化
					TeamKingRanker teamKingRanker=new TeamKingRanker();
					teamKingRanker.setHid(long1);
					teamKingRanker.setName(heroA.getNameZoneid());
					teamKingRanker.setPartid(partid);
					teamKingRanker.setRebornType(rebornType);
					teamKingRanker.setJf(crossTeamKingLocal.getJf());
					teamKingRanker.setTime(TimeDateUtil.getCurrentTime());
					teamKingRanker.setTotalStrength(heroA.getTotalStrength());
					
					TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
					ConcurrentHashMap<Integer, List<TeamKingRanker>> teamKingRankersBypartid = teamKingRankSys.getRankCache().get(partid);
					if (teamKingRankersBypartid==null) {
						teamKingRankersBypartid=new ConcurrentHashMap<Integer, List<TeamKingRanker>>();
						teamKingRankSys.getRankCache().put(partid, teamKingRankersBypartid);
					}
					List<TeamKingRanker> teamKingRankers = teamKingRankersBypartid.get(rebornType);
					if (teamKingRankers==null) {
						teamKingRankers=new ArrayList<>();
						teamKingRankersBypartid.put(rebornType, teamKingRankers);
					}
					CrossTeamKingFunction.getIns().sortTeamKingRank(teamKingRankers, teamKingRanker, CrossTeamKingConst.RANK_MAX);

					CrossTeamKingSender.sendCmd_10858(long1,rest);
				}else {
					LogTool.warn("CrossTeamKingFunction heroA!=null "+long1, CrossTeamKingFunction.class);
				}
			}
			if (battleOverMoveMerber(crossTeamKingter)) {
				broadCastTeamInfo();
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "overPveBattle has wrong");
		}
		return ;
		
	}
	
	public void openUI(Hero hero) {
		try {
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			if (crossTeamKingLocal.getReborenType()==0) {
				//第一次打开
				int rebornType = CrossTeamKingFunction.getIns().getRebornType(hero.getRebornlv());
				if (rebornType==0) {
					LogTool.warn("rebornType==0 "+hero.getId(), CrossTeamKingManager.class);
					return;
				}
				crossTeamKingLocal.setReborenType(rebornType);
			}
			int reborenType = crossTeamKingLocal.getReborenType();
			ConcurrentHashMap<Integer, Struct_kfwzmb_770> concurrentHashMap = CrossTeamKingLocalCache.goalRewardMap.get(reborenType);
			Object[] todayReward=new Object[concurrentHashMap.size()]; 
			int i=0;
			for (Struct_kfwzmb_770 kfwzmb_770:concurrentHashMap.values()) {
				int index = kfwzmb_770.getId();
				if (crossTeamKingLocal.getRewards().contains(index)) {
					todayReward[i]=new Object[] {index,GameConst.REWARD_2};
				}else if (crossTeamKingLocal.getBattleWinNum()>=kfwzmb_770.getCs()) {
					todayReward[i]=new Object[] {index,GameConst.REWARD_1};
				}else {
					todayReward[i]=new Object[] {index,GameConst.REWARD_0};
				}
				i++;
			}
			int state=0;
			boolean actSate = CrossTeamKingFunction.getIns().getActSate();
			if (actSate) {
				state=1;
			}


			int myrank=0;
			int partId = CrossCache.getPartId(hero.getZoneid());
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<TeamKingRanker>>> rankCache = CrossTeamKingLocalCache.getTeamKingRankSys().getRankCache();
			if (rankCache.containsKey(partId)) {
				List<TeamKingRanker> list = rankCache.get(partId).get(reborenType);
				if (list!=null) {
					for (int a = 0; a < list.size(); a++) {
						TeamKingRanker teamKingRanker = list.get(a);
						if (teamKingRanker.getHid()==hero.getId()) {
							myrank=a+1;
						}
					}
					crossTeamKingLocal.setRank(myrank);
				}

			}
			CrossTeamKingSender.sendCmd_10822(hero.getId(), state, crossTeamKingLocal.getReborenType(), crossTeamKingLocal.getDuanwei(), crossTeamKingLocal.getJf(), 
					crossTeamKingLocal.getRank(), crossTeamKingLocal.getBattleWinNum(),crossTeamKingLocal.getLeftNum(),crossTeamKingLocal.getBuyNum(), todayReward,crossTeamKingLocal.getWinAwayNum());
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "openUI has wrong");
		}
	}
	
	
	/**
	 * 活动准备
	 */
	public void read() {
		CrossTeamKingCroCache.getTeamInMarrys().clear();
		CrossTeamKingCroCache.getJointeamMap().clear();
		CrossTeamKingCroCache.getTeamidMapByHid().clear();
		CrossTeamKingCroCache.getBattleInfos().clear();
		CrossTeamKingCroCache.getBattleHisByHid().clear();
	}
	
	
	/**
	 * 通知全部子服 状态状态
	 * @param hero
	 * @param outTime
	 */
	public void noticeState(int state) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossTreamKingType.state, state);
		Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
		for (; iterator.hasNext();) {
			ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
			for (Channel channel1 : map.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_TEAMKING_STATE, crossData);
			}
		}
	}
	
	public void noticeRank() {
		TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
		if (teamKingRankSys!=null) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossTreamKingType.rank, teamKingRankSys);
			Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
			for (; iterator.hasNext();) {
				ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
				for (Channel channel1 : map.keySet()) {
					NettyWrite.writeXData(channel1, CrossConst.CROSS_TEAMKING_RANK, crossData);
				}
			}
		}
	}
	/**
	 * 战斗结束 队伍踢出次数不够玩家
	 * @param crossTeamKingter
	 */
	public boolean battleOverMoveMerber(CrossTeamKingter crossTeamKingter) {
		boolean isChange=false;
		Iterator<Long> iteratorHids = crossTeamKingter.getTeamerHids().iterator();
		while (iteratorHids.hasNext()) {
			Long long1 =iteratorHids.next();
			Hero teamers=HeroCache.getHero(long1);
			if (teamers!=null) {
				CrossTeamKingLocal crossTeamKingLocal = teamers.getCrossTeamKingLocal();
				if (crossTeamKingLocal.getLeftNum()<=0) {
					CrossTeamKingSender.sendCmd_10836(long1, 0);
					CrossTeamKingCroCache.getTeamidMapByHid().remove(long1);
					iteratorHids.remove();
					isChange=true;
				}
				
			}
			
		}
		ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
		if (!teamerHids.contains(crossTeamKingter.getCaptainhid())&&teamerHids.size()>0) {
			//队长被踢出
			crossTeamKingter.setCaptainhid(teamerHids.get(0));
		}
		if (isChange) {
			Object[] teaminfo = CrossTeamKingFunction.getIns().makeTeamInfo(crossTeamKingter);
			for (long goalid:crossTeamKingter.getTeamerHids()) {
				CrossTeamKingSender.sendCmd_10832(goalid, 2, crossTeamKingter.getCaptainhid(), crossTeamKingter.getTeamid(), teaminfo);
			}
		}
		return isChange;
		
	}
	/**
	 * 发送排行邮件
	 */
	public void sendRankReward() {
		try {
			TeamKingRankSys teamKingRankSys = CrossTeamKingLocalCache.getTeamKingRankSys();
			int getlocalPartId = CrossCache.getlocalPartId();
			ConcurrentHashMap<Integer, List<TeamKingRanker>> rankersByPartid = teamKingRankSys.getRankCache().get(getlocalPartId);
				for (List<TeamKingRanker> teamKingRankerByReborn:rankersByPartid.values()) {
					for (int i = 0; i < teamKingRankerByReborn.size(); i++) {
						TeamKingRanker teamKingRanker = teamKingRankerByReborn.get(i);
						int rankIndex=i+1;
						int rebornType = teamKingRanker.getRebornType();
						for (Struct_kfwzph_770 kfwzph_770: Config_kfwzph_770.getIns().getSortList()) {
							if (rebornType==kfwzph_770.getZs()&&rankIndex>=kfwzph_770.getPm()[0][0]&&rankIndex<=kfwzph_770.getPm()[0][1]) {
								MailFunction.getIns().sendMailWithFujianData2(teamKingRanker.getHid(), MailConst.CROSSTEAMKING_RANK, new Object[] { MailConst.CROSSTEAMKING_RANK,rankIndex}, kfwzph_770.getJl());
							    LogTool.info(" hid:"+teamKingRanker.getHid()+" rank:"+rankIndex, CrossTeamKingFunction.class);
							    break;
							}
						}
					}
				}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "weekRestSendReward has wrong");
		}
	}
	
	
	public void restWeek(Hero hero,int currentTime) {
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		crossTeamKingLocal.setJf(0);
		crossTeamKingLocal.setRank(0);
		crossTeamKingLocal.setDuanwei(1);
		crossTeamKingLocal.setWeekResetTime(currentTime);
	}
	
	
	public void upDateCrossTeamking(Hero hero) {
		try {
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			int duanwei = crossTeamKingLocal.getDuanwei();
			int jf = crossTeamKingLocal.getJf();
			int rank = crossTeamKingLocal.getRank();
			int battleWinNum = crossTeamKingLocal.getBattleWinNum();
			int leftNum = crossTeamKingLocal.getLeftNum();
			CrossTeamKingSender.sendCmd_10846(hero.getId(), duanwei, jf, rank, battleWinNum, leftNum);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "upDateCrossTeamking has wrong");
		}
	}
	
	/**
	 * 使用道具+次数
	 * @param hero
	 * @param num
	 * @return
	 */
	public boolean useItemId(Hero hero,int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return false;
			}
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return false;
			}
			
			crossTeamKingLocal.addLeftNum(num);
			int duanwei = crossTeamKingLocal.getDuanwei();
			int jf = crossTeamKingLocal.getJf();
			int rank = crossTeamKingLocal.getRank();
			int battleWinNum = crossTeamKingLocal.getBattleWinNum();
			
			CrossTeamKingSender.sendCmd_10846(hero.getId(), duanwei, jf, rank, battleWinNum, crossTeamKingLocal.getLeftNum());
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossTeamKingIO.getIns().LTCupdateleftNum(crossChannel, hero.getId(),  crossTeamKingLocal.getLeftNum());
			return true;
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "useItemId has wrong");
		}
		return false;
		
	}
	
	public void addBattleHis(long hid,CrossTeamKingBattleHis crossTeamKingBattleHis) {
		try {
			ConcurrentHashMap<Long, List<CrossTeamKingBattleHis>> battleHisByHid = CrossTeamKingCroCache.getBattleHisByHid();
			if (!battleHisByHid.containsKey(hid)) {
				battleHisByHid.put(hid, new ArrayList<CrossTeamKingBattleHis>());
			}
			List<CrossTeamKingBattleHis> list = battleHisByHid.get(hid);
			list.add(crossTeamKingBattleHis);
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingFunction.class, "addBattleHis has wrong");
		}
	}
	
	

}
