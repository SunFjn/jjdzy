package com.teamtop.system.crossKing.local;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.happyCrossKing.HappyCrossKingFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossKing.CrossKingAssist;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.CrossKingEnum;
import com.teamtop.system.crossKing.model.CrossKingAward;
import com.teamtop.system.crossKing.model.CrossKingHistory;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.util.db.orm.AutoObjTableDao;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lsxx_232;
import excel.config.Config_xtcs_004;
import io.netty.channel.Channel;
/**
 * 最强王者子服跟中央服通信类
 * @author lobbyer
 * @date 2016年8月29日
 */
public class CrossKingLocalIO {
	private static CrossKingLocalIO ins;
	public static synchronized CrossKingLocalIO getIns(){
		if(ins == null) {
			ins = new CrossKingLocalIO();
		}
		return ins;
	}
	
	/**
	 * 同步赛季数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月17日
	 */
	public void LRCsyncInfo(Channel channel,CrossData crossData) {
		CrossKingInfo info = crossData.getObject(CrossKingEnum.info,CrossKingInfo.class);
		CrossKingLocalCache.setInfo(info);
	}
	
	/**
	 * 中央服通知下发状态提醒
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月22日
	 */
	public void LRCnotice(Channel channel,CrossData crossData) {
		int type =crossData.getObject(CrossKingEnum.notice,Integer.class);
		CrossKingInfo info = crossData.getObject(CrossKingEnum.info,CrossKingInfo.class);
		CrossKingLocalCache.setInfo(info);
		CrossKingLocalFunction.getIns().notice(type);
		
	}
	
	/**
	 * 子服向中央服获取对手数据
	 * 若第一次申请 则把角色信息一起更新下来
	 * @author lobbyer
	 * @param crossKing
	 * @param rank
	 * @date 2016年8月18日
	 */
	public void getInfo(Hero hero,int type, CrossKing crossKing, CrossKingRank rank) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossKingEnum.extra, type);
		crossData.putObject(CrossKingEnum.heroData, crossKing);
		crossData.putObject(CrossKingEnum.rankData, rank);
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null || !channel.isOpen()) {
			CrossKingSender.sendCmd_1866(hero.getId(), 1);
			return;
		}
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.KING_SG_GETINFO, crossKing.getHid(), crossData);
		if(writeBlockData == null) {
			return;
		}
		CrossKing newKing =writeBlockData.getObject(CrossKingEnum.heroData,CrossKing.class);
		CrossKingAssist.getIns().updateKingData(crossKing, newKing);
		List<CrossKingRank> enemyData =  writeBlockData.getObject(CrossKingEnum.enemyData,new TypeReference<List<CrossKingRank>>(){}.getType());
//		List<CrossKingRank> enemyData =  writeBlockData.getObjectList(CrossKingEnum.enemyData, CrossKingRank.class);
		if(HeroFunction.getIns().isOnline(hero.getId())) {
			if(type == 0){
				CrossKingLocalFunction.getIns().sendOwnData(hero);
			}
			Object[] enemyDatas=new Object[enemyData.size()];
			for (int i = 0; i < enemyData.size(); i++) {
				CrossKingRank crossKingRank=enemyData.get(i);
				int bodyid=FashionClothesManager.getIns().getBodyid(crossKingRank.getJob(), crossKingRank.getModel().getBodyModel());
				enemyDatas[i]=new Object[] {crossKingRank.getRank(),crossKingRank.getRid(),crossKingRank.getSysid(),crossKingRank.getRname(),crossKingRank.getStrength(),crossKingRank.getType(),crossKingRank.getModel().getWeaponModel(),bodyid,crossKingRank.getModel().getRideModel()};
			}
			CrossKingSender.sendCmd_1862(hero.getId(),0, enemyDatas);
		}
		//全民狂欢活动-乱世枭雄狂欢
		HappyCrossKingFunction.getIns().addNumByType(hero);
		
	}

	/**
	 * 挑战
	 * @author lobbyer
	 * @param hero
	 * @param type| 挑战类型1普通2晋级| byte
	 * @param index| 对象索引0最强王者>0第n个对手| byte
	 * @param rid 对手id
	 * @date 2016年8月22日
	 */
	public void challenge(final Hero hero, final CrossKing king,final  CrossKingRank rank,final int type, int index,final long rid) {
		Channel channel = Client_2.getIns().getCrossChannel();
		if(channel == null) {
			//中央服未连接未开启
			CrossKingSender.sendCmd_1866(hero.getId(), 1);
			return;
		}
		final long hid = hero.getId();
		final CrossData data = new CrossData();
		data.putObject(CrossKingEnum.type,type);
		data.putObject(CrossKingEnum.extra,index);
		data.putObject(CrossKingEnum.hid,rid);
		data.putObject(CrossKingEnum.heroData, rank);
		NettyWrite.writeXData(channel, CrossConst.KING_SG_CHECKCHALLENGE, data, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				int state = crossData.getObject(CrossKingEnum.state,Integer.class);
				
				if(state != 0) {
					CrossKingSender.sendCmd_1866(hid, state);
					return;
				}
				king.setChallTime(TimeDateUtil.getCurrentTime());
				if (king.getChallCount() > 0) {
					king.setChallCount(king.getChallCount() - 1);
				}
				king.setSumBattleNum(king.getSumBattleNum()+1);
				int battleRest =crossData.getObject(CrossKingEnum.battleRest, Integer.class);
				CrossKingRank crossKingRank=crossData.getObject(CrossKingEnum.enemyData, CrossKingRank.class);
				Object[] attr=null;
				Object[] skillinfo=null;
				Object[] skillinfo130 = null;
				//GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
				List<Object[]> extdataList = new ArrayList<>();
				int wearTreasure1 = 0;
				int baowu1Star = 0;
				int wearTreasure2 = 0;
				int baowu2Star = 0;
				int godBookid = 0;
				int godBookStar = 0;
				int wujiangStar = 0;
				int godWeapon = 0;
				if (crossKingRank.getType()==CrossKingConst.KINGTYPE_HERO) {
					FinalFightAttr fightAttr=crossKingRank.getFinalFightAttr();
					List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(fightAttr);
					attr=attrSendData.toArray();
					wujiangStar=fightAttr.getStar();
					//技能数据
					Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero,
							crossKingRank.getRid(), crossKingRank.getGodSkillLevel(), crossKingRank.getJob());
					List<Object[]> skillData = new ArrayList<Object[]>();
					List<Object[]> skillData130 = new ArrayList<Object[]>();
					for(Entry<Integer, SkillInfo> entry:crossKingRank.getSkill().getSkillMap().entrySet()){
						int index=entry.getKey();
						SkillInfo skillInfo=entry.getValue();
						skillData.add(new Object[]{index,skillInfo.getId(),(short)skillInfo.getLevel()});
						Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap)
								.map(mapper -> mapper.get(skillInfo.getId())).orElse(0);
						skillData130.add(
								new Object[] { index, skillInfo.getId(), (short) skillInfo.getLevel(), skillHurtAdd });
					}
					skillinfo=skillData.toArray();
					skillinfo130 = skillData130.toArray();
					godWeapon = crossKingRank.getModel().getWeaponModel();

					TreasureData treasureData = crossKingRank.getBaowu();
					if (treasureData != null) {
						List<Integer> wearTreasureList = treasureData.getWearTreasureList();
						if (wearTreasureList != null) {
							Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
							wearTreasure1 = wearTreasureList.get(0);
							wearTreasure2 = wearTreasureList.get(1);
							if (wearTreasure1 != 0 && treasureMap.containsKey(wearTreasure1)) {
								TreasureModel treasureModel = treasureMap.get(wearTreasure1);
								baowu1Star = treasureModel.getStarLevel();
							}
							if (wearTreasure2 != 0 && treasureMap.containsKey(wearTreasure2)) {
								TreasureModel treasureModel = treasureMap.get(wearTreasure2);
								baowu2Star = treasureModel.getStarLevel();
							}
						}
					}
					GodBook godBook = crossKingRank.getTianshu();
					if (godBook != null) {
						HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
						godBookid = godBook.getWearid();
						if (godBookid != 0 && hasBooks.containsKey(godBookid)) {
							GodBookModel godBookModel = hasBooks.get(godBookid);
							godBookStar = godBookModel.getStar();
						}
					}
				}
				king.setChallTime(TimeDateUtil.getCurrentTime());
				int fms = crossKingRank.getFigthMonsterSpirit();
				Hero enermy = HeroCache.getHero(rid);
				if (enermy != null) {
					MonsterSpiritModel spiritModel = enermy.getMonsterSpiritModel();
					if (spiritModel != null) {
						fms = spiritModel.getFightMonsterSpiri();
					}
				}
				int withLeaderId=0;
				int withLeaderFid=0;
				int leaderStarId=0;
				int leaderSkillId=0;
				
				if (crossKingRank.getLittleLeaderInfo()!=null&&crossKingRank.getLittleLeaderInfo().size()>0) {
					List<Integer> littleLeaderInfo = crossKingRank.getLittleLeaderInfo();
					withLeaderId=littleLeaderInfo.get(0);
					withLeaderFid=littleLeaderInfo.get(1);;
					leaderStarId=littleLeaderInfo.get(2);;
					leaderSkillId=littleLeaderInfo.get(3);;
				}
				extdataList.add(new Object[] { wearTreasure1 });
				extdataList.add(new Object[] { baowu1Star });
				extdataList.add(new Object[] { wearTreasure2 });
				extdataList.add(new Object[] { baowu2Star });
				extdataList.add(new Object[] { godBookid });
				extdataList.add(new Object[] { godBookStar });
				extdataList.add(new Object[] { wujiangStar });
				extdataList.add(new Object[] { godWeapon });
				extdataList.add(new Object[] { 0 });
				
				List<Object[]> attrData = new ArrayList<Object[]>();
				attrData.add(new Object[] { rid, crossKingRank.getJob(), attr, skillinfo130,
						crossKingRank.getModel().getBodyModel() });
				HeroSender.sendCmd_130(hid, rid, crossKingRank.getRname(), 0,
						0, 0, fms, attrData.toArray(), crossKingRank.getStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
				
				CrossKingSender.sendCmd_1868(hid, 0, battleRest, rid, fms, attr, skillinfo);
				CrossKingSender.sendCmd_1888(hid, king.getSumBattleNum());
			}
		});
	}
	/**
	 * 战斗获取对手属性数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月23日
	 */
	public void LRCloadRankData(Channel channel,CrossData crossData) {
		long hid =crossData.getObject(CrossKingEnum.hid, Long.class);
		crossData.finishGet();
		try {
			Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BATTLE);
			CrossKingRank rank=CrossKingLocalFunction.getIns().makeCrossKingRank(hero);
			crossData.putObject(CrossKingEnum.heroData,rank);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, "LRCloadRankData hid:"+hid+" Exception!");
		}
		
	}
	/**
	 * 前段发战斗结果
	 * @param hero
	 * @param brest
	 * @param crossKingRank
	 */
	public void getBattleReward(final Hero hero, int brest, CrossKingRank crossKingRank) {
		try {
			Channel channel = Client_2.getIns().getCrossChannel();
			if(channel == null) {
				//中央服未连接未开启
				CrossKingSender.sendCmd_1866(hero.getId(), 1);
				return;
			}
			CrossData data = new CrossData();
			data.putObject(CrossKingEnum.hid,hero.getId());
			data.putObject(CrossKingEnum.battleRest,brest);
			NettyWrite.writeXData(channel, CrossConst.KING_SG_BATTLEREST, data, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
				    CrossKingHistory crossKingHistory=crossData.getObject(CrossKingEnum.video, CrossKingHistory.class);
					CrossKingRank crossKingRank=crossData.getObject(CrossKingEnum.heroData, CrossKingRank.class);
					int[][] reward=null;
					int jifeng=0;
					if (crossKingHistory.getWin()==0) {
						//打赢了 发奖励 +积分
						reward=Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_WIN_REWARD).getOther();
						jifeng=Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_WIN_JIFEN).getNum();
					}else {
						reward=Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_FAILED_REWARD).getOther();
						jifeng=Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_FAILED_JIFEN).getNum();
					}
					UseAddUtil.add(hero, reward, SourceGoodConst.CROSSKING_BATTLE_REWARD, null, true);
					hero.getCrossKing().setScore(hero.getCrossKing().getScore()+jifeng);
					hero.getCrossKing().setDuanwei(crossKingRank.getDuanwei());
					hero.getCrossKing().setRank(crossKingRank.getRank());
					hero.getCrossKing().addHistory(crossKingHistory);
					if (crossKingHistory.getWin()==0&&crossKingHistory.getIsJingJi()==CrossKingConst.ISJINGJI) {
						int newDw=crossKingRank.getDuanwei();
						if (hero.getCrossKing().getJingJiReward().get(newDw)==GameConst.REWARD_0) {
							hero.getCrossKing().getJingJiReward().put(newDw, GameConst.REWARD_2);
							int[][] jingjireward=Config_lsxx_232.getIns().get(newDw).getReward1();
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(),  MailConst.MAIL_ID_CROSSKING_JINGJI,  new Object[]{MailConst.MAIL_ID_CROSSKING_JINGJI,newDw}, jingjireward);
							if (newDw>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_KINGDW).getNum()) {
								ChatManager.getIns().broadCast(ChatConst.BROCAST_CROSSKING,
										new Object[] { hero.getName(), newDw}); // 全服广播
							}
						}
						//八门金锁
						EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_14, newDw);
						// // 成就
						AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_43, newDw);
						// 少主活动-金猪送财
						ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_7, newDw);
						// 宝藏拼图
						BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_8, newDw);
					}
					CrossKingLocalFunction.getIns().sendOwnData(hero);
					//全民狂欢活动-乱世枭雄狂欢
					HappyCrossKingFunction.getIns().addNumByType(hero);
					// 限定武将
					WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_11, 0);
					// 成就树
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_7, 1, 0);
					// 犒赏三军(活动)
					WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_16, 1);
					// 犒赏三军(开服)
					WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_16, 1);
				    return;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, "getBattleReward hid:"+hero.getId()+" Exception!");
		}
		
	}
	/**
	 * 被打 更新数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年9月14日
	 */
	public void LRCupdateBeBattle(Channel channel, CrossData crossData) {
		CrossKingRank crossKingRank = crossData.getObject(CrossKingEnum.heroData, CrossKingRank.class);
		CrossKingHistory history =crossData.getObject(CrossKingEnum.video,CrossKingHistory.class);
		long id = crossKingRank.getRid();
		Hero hero = HeroCache.getHero(id, HeroConst.FIND_TYPE_ALL);
		if(hero == null || hero.getCrossKing() == null) {
			return;
		}
		boolean isdiaoduan=false;
		CrossKing king = hero.getCrossKing();
		if (king.getDuanwei()>crossKingRank.getDuanwei()) {
			isdiaoduan=true;
			CrossKingLocalCache.getIsbeatMap().put(king.getHid(), history.getName());
		}
		king.setDuanwei(crossKingRank.getDuanwei());
		king.setRank(crossKingRank.getRank());
		king.addHistory(history);
		boolean online = HeroFunction.getIns().isOnline(king.getHid());
		if(online) {
			CrossKingLocalFunction.getIns().sendOwnData(HeroCache.getHero(king.getHid()));
			//全民狂欢活动-乱世枭雄狂欢
			HappyCrossKingFunction.getIns().addNumByType(hero);
			//有战报
			if (isdiaoduan) {
				CrossKingSender.sendCmd_1892(king.getHid());
			}
		}else{
			try {
				AutoObjTableDao.getIns().update(king, king.getHid(), crossKingRank.getZoneid());
			} catch (SQLException e) {
				LogTool.error(e, king.getHid(), "beBattle updateKing win:"+history.getWin()+" Excepiton!");
			}
		}
		
		
	}
	/**
	 * 子服向中央服获取晋级对手数据
	 * 若第一次申请 则把角色信息一起更新下来
	 * @author lobbyer
	 * @param crossKing
	 * @param rank
	 * @date 2016年8月18日
	 */
	public void getJinJiData(Hero hero,int type, CrossKing crossKing, CrossKingRank rank) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossKingEnum.extra, type);
		crossData.putObject(CrossKingEnum.heroData, crossKing);
		crossData.putObject(CrossKingEnum.rankData, rank);
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.KING_SG_GETJINJIDATA, crossKing.getHid(), crossData);
		if(writeBlockData == null) {
			return;
		}
		List<CrossKingRank> enemyData = writeBlockData.getObject(CrossKingEnum.enemyData,new TypeReference<List<CrossKingRank>>(){}.getType());
//		List<CrossKingRank> enemyData = writeBlockData.getObjectList(CrossKingEnum.enemyData, CrossKingRank.class);
		if(HeroFunction.getIns().isOnline(hero.getId())) {
			//[I:排名L:玩家idU:名字I:战力I:武器模型I:人物模型]
			Object[] enemyDatas=new Object[enemyData.size()];
			for (int i = 0; i < enemyData.size(); i++) {
				CrossKingRank crossKingRank=enemyData.get(i);
				int bodyid=FashionClothesManager.getIns().getBodyid(crossKingRank.getJob(), crossKingRank.getModel().getBodyModel());
				enemyDatas[i]=new Object[] {crossKingRank.getRank(),crossKingRank.getRid(),crossKingRank.getSysid(),crossKingRank.getRname(),crossKingRank.getStrength(),crossKingRank.getType(),crossKingRank.getModel().getWeaponModel(),bodyid,crossKingRank.getModel().getRideModel()};
			}
			CrossKingSender.sendCmd_1872(hero.getId(), 0, enemyDatas);
		}
			
	}
	
	/**
	 * 申请排行榜数据
	 * @author lobbyer
	 * @param hero
	 * @param dw
	 * @date 2016年8月22日
	 */
	public void getRankList(Hero hero,int dw) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossKingEnum.extra, dw);
		crossData.putObject(CrossKingEnum.hid, hero.getId());
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.KING_SG_GETRANKLIST, hero.getId(), crossData);
		if(writeBlockData == null) {
			return;
		}
		byte[] rankList =   writeBlockData.getObject(CrossKingEnum.rankList,byte[].class);
		if(HeroFunction.getIns().isOnline(hero.getId()))
			hero.getChannel().write(rankList);
	}
	/**
	 * 发送段位奖励
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月25日
	 */
	public void LRCsendDwAward(Channel channel, CrossData crossData) {
		List<CrossKingAward> list =crossData.getObject(CrossKingEnum.dwMap,new TypeReference<List<CrossKingAward>>() {}.getType());
		if(list.isEmpty()) return;
		for(CrossKingAward award:list) {
			int maxDw = award.getMaxduanwei();
			long hid = award.getRid();
			int[][] jingjireward=Config_lsxx_232.getIns().get(maxDw).getReward2();
			if(jingjireward == null) continue;
			MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_ID_CROSSKING_DW, new Object[]{MailConst.MAIL_ID_CROSSKING_DW,maxDw}, jingjireward);
		}
		LogTool.info("sendDwAward success!",CrossKingLocalIO.class);
	}
	
	/**
	 * GM操作
	 * @author lobbyer
	 * @param type 1开启 2关闭
	 * @date 2016年8月18日
	 */
	public void GM(int type) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossKingEnum.gmCmd, type);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.KING_SG_GM, crossData);
	}
	/**
	 * 换位置
	 * @param dw
	 * @param rank
	 */
	public void GMcharge(Hero hero,int dw,int rank) {
		int bangid=CrossKingAssist.getIns().getRebornLvType(hero.getCrossKing().getRebornType());
		if (bangid!=0) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossKingEnum.hid, hero.getId());
			crossData.putObject(CrossKingEnum.type,bangid);
			crossData.putObject(CrossKingEnum.duanwei, dw);
			crossData.putObject(CrossKingEnum.rank, rank);
			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.KING_SG_GMCHARGE, crossData);
		}
	}

	
	
}
