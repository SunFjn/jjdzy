package com.teamtop.system.crossKing.local;

import java.util.ArrayList;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossKing.CrossKingAssist;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lsxxbp_232;
import excel.struct.Struct_lsxxbp_232;
import io.netty.channel.Channel;

public class CrossKingLocalFunction {
	
	private static CrossKingLocalFunction ins;
	public static  CrossKingLocalFunction getIns(){
		if(ins == null) {
			ins = new CrossKingLocalFunction();
		}
		return ins;
	}
	
	/**
	 * 判断能否进行活动
	 * @author lobbyer
	 * @param hero
	 * @param checkEnd 检查活动结束
	 * @return
	 * @date 2016年8月31日
	 */
	public boolean canActivity(Hero hero,boolean checkEnd) {
		CrossKing crossKing = hero.getCrossKing();
		if(crossKing == null) {
			LogTool.warn("canActivity crossKing == null", CrossKingLocalFunction.class);
			return false;
		} 
		CrossKingInfo info = CrossKingLocalCache.getInfo();
		if(info == null || info.getState() == CrossKingConst.STATE_NOTOPEN) {
			//未开启
			CrossKingSender.sendCmd_1866(hero.getId(), 1);
			return false;
		}
		if(checkEnd && info.getState() == CrossKingConst.STATE_END) {
			//已结束
			CrossKingSender.sendCmd_1866(hero.getId(), 2);
			return false;
		}
		return true;
	}
	
	
	/**
	 * 通知状态
	 * @author lobbyer
	 * @param type
	 * @date 2016年8月22日
	 */
	public void notice(int type){
		try {
			String content = "";
			if(type == CrossKingConst.NOTICE_CANNOT) {
				content = "操作不通过";
			}else if(type == CrossKingConst.NOTICE_START){
				CrossKingLocalCache.getInfo().setState(type);
				content = "活动开启";
			}else if(type == CrossKingConst.NOTICE_END) {
				CrossKingLocalCache.getInfo().setState(type);
				content = "活动结束";
			}
			LogTool.warn("最强王者："+content,CrossKingLocalFunction.class);
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()) {
				if(!HeroFunction.getIns().isOnline(hero.getId())) continue;
				if(type == CrossKingConst.NOTICE_END) {
					//活动结束 发送奖励
					//sendScoreAward(hero);
					//CrossKingLocalFunction.getIns().sendIcon(hero, 0, false);
					CrossKingSender.sendCmd_1860(hero.getId(), type);
				}else if(type == CrossKingConst.NOTICE_START) {
					CrossKing king = hero.getCrossKing();
					if(king != null) {
						king.termReset(hero.getBelongZoneid());
					}
					//CrossKingLocalFunction.getIns().sendIcon(hero, 1, false);
					CrossKingSender.sendCmd_1860(hero.getId(), type);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, "notice type:"+type+" Exception!");
		}
	}
	
	/**
	 * 生成最强王者 crossking
	 * @param model 
	 * @param hero hero
	 */
	public CrossKingRank makeCrossKingRank(Hero hero){
		CrossKingRank model=new CrossKingRank();
		int rebornType = CrossKingAssist.getIns().getRebornLvType(hero.getCrossKing().getRebornType());
		model.setRid(hero.getId());
		model.setRname(hero.getNameZoneid());
		model.setRebornType(rebornType);
		model.setStrength(hero.getTotalStrength());
		model.setJob(hero.getJob());
		model.setFinalFightAttr(hero.getFinalFightAttr());
		model.setSkill(hero.getSkill());
		model.setZoneid(hero.getZoneid());
		model.setBelongZoneid(GameProperties.getFirstZoneId());
		LogTool.info("CrossCache.getlocalPartId()" + CrossCache.getlocalPartId(), this);
		model.setPartId(CrossCache.getlocalPartId());
		if (hero.getShowModel().getHerdid()==0) {
			hero.getShowModel().setHerdid(hero.getIcon());
		}
		if (hero.getShowModel().getHerdUi()==0) {
			hero.getShowModel().setHerdUi(hero.getFrame());
		}
		model.setModel(hero.getShowModel());
		model.getModel().setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		int fms = 0;
		if(monsterSpiritModel!=null) {
			fms = monsterSpiritModel.getFightMonsterSpiri();
		}
		model.setFigthMonsterSpirit(fms);
		//少主相关信息上传
		int withLeaderId=0;
		int withLeaderFid=0;
		int leaderStarId=0;
		int leaderSkillId=0;
		LittleLeader littleLeader=hero.getLittleLeader();
		if (littleLeader!=null) {
			withLeaderId=littleLeader.getWearType();
			if (withLeaderId!=0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				withLeaderFid=littleLeaderModel.getNowFashId();
				leaderStarId=littleLeaderModel.getStar();
				leaderSkillId=littleLeaderModel.getActivityKillLv();
			}

		}
		ArrayList<Integer> LeaderInfo=new ArrayList<>();
		LeaderInfo.add(withLeaderId);
		LeaderInfo.add(withLeaderFid);
		LeaderInfo.add(leaderStarId);
		LeaderInfo.add(leaderSkillId);
		model.setLittleLeaderInfo(LeaderInfo);
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
		model.setGodSkillLevel(godSkillLevel);
		model.getModel().setRideModel(hero.getMountId());
		model.setBaowu(hero.getTreasureData());
		model.setTianshu(hero.getGodbook());
		return model;
	}
	
	
	/**
	 * 发送自己信息
	 * @author lobbyer
	 * @param hero
	 * @date 2016年8月23日
	 */
	public void sendOwnData(Hero hero) {
		CrossKing king = hero.getCrossKing();
		if(king == null) return;
		Map<Integer, Integer> scoreReward = king.getScoreReward();
		Object[] score = new Object[scoreReward.size()];
		int sumScore=king.getScore();
		int i = 0;
		for (Struct_lsxxbp_232 lsxxbp_232: Config_lsxxbp_232.getIns().getSortList()) {
			if (!scoreReward.containsKey(lsxxbp_232.getId())) {
				scoreReward.put(lsxxbp_232.getId(), GameConst.REWARD_0);
			}
			if (scoreReward.get(lsxxbp_232.getId())==GameConst.REWARD_0&&sumScore>=lsxxbp_232.getBp()) {
				scoreReward.put(lsxxbp_232.getId(), GameConst.REWARD_1);
			}
			score[i] = new Object[]{lsxxbp_232.getId(),scoreReward.get(lsxxbp_232.getId())};
			i++;
		}
		if (king.getRebornType()==0) {
			king.setRebornType(hero.getRebornlv());
		}
		int rebornType = CrossKingAssist.getIns().getRebornLvType(king.getRebornType());
		CrossKingSender.sendCmd_1870(hero.getId(), rebornType, king.getDuanwei(),king.getMaxDw(), king.getRank(), king.getChallCount(), king.getBuyCount(),king.getScore(),hero.getTotalStrength(), score);
	}
	
	
	public void gmAddCrossJoiner() {
		try {
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.CROSSSK_SG_ADDNPC,  new CrossData());
		} catch (Exception e) {
			LogTool.error(e, CrossKingLocalFunction.class, "gmAddCrossJoiner has wrong ");
		}
	}
	
	/**
	 * 使用道具添加挑战次数
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return false;
			}
			CrossKing crossKing = hero.getCrossKing();
			if (crossKing != null) {
				int chaNum = crossKing.getChallCount();
				crossKing.setChallCount(chaNum + num);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, CrossKingLocalFunction.class, hid, "", "CrossKingLocalFunction addChaNum");
		}
		return false;
	}

}
