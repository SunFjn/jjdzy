package com.teamtop.system.tigerPass;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.tigerPass.model.TigerPass;
import com.teamtop.system.tigerPass.model.TigerPassBattle;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.system.tigerPass.model.TigerPassJoiner;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hlg_323;
import excel.config.Config_hlggyb_323;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hlg_323;
import excel.struct.Struct_hlggyb_323;
import excel.struct.Struct_xtcs_004;


public class TigerPassFunction {
	
	private static TigerPassFunction ins;
	public static TigerPassFunction getIns(){
		if(ins == null) {
			ins = new TigerPassFunction();
		}
		return ins;
	}
	
	/**
	 * 周重置
	 * @param hero
	 */
	public void weekreset(Hero hero) {
		try {
			TigerPass tigerPass = hero.getTigerPass();
			tigerPass.setBattleNum(TigerPassFunction.getIns().getInitBattleNum());
			//初始化第一个boss
			tigerPass.setBossIndex(1);
			Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(1);
			FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
			tigerPass.setCurhp(target.getHpMax());
			tigerPass.setHpmax(target.getHpMax());
			for (Struct_hlg_323 hlg_323:Config_hlg_323.getIns().getSortList()) {
				tigerPass.getRewards().put(hlg_323.getCs(), GameConst.REWARD_0);
			}
			tigerPass.setWeekRestTime(TimeDateUtil.getMondayZeroTime());
		} catch (Exception e) {
			LogTool.error(e, TigerPassFunction.class, "weekreset has wrong:"+hero.getId());
		}
	
		
	}
	
	/**
	 * 日重置招募
	 * @param hero
	 */
	public void dayreset(Hero hero) {
		TigerPass tigerPass = hero.getTigerPass();
		tigerPass.setTigerPassEmployers(new HashMap<>());
		tigerPass.setChooseHid(0);
		tigerPass.setJoinEmploySate(0);
		tigerPass.setChooseNum(TigerPassFunction.getIns().getDayChooseNum());
	}
	
	
	/**
	 * 一周玩家的挑战次数上限
	 * @return
	 */
	public int getInitBattleNum() {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.BATTLE_INTNUM);
		return struct_xtcs_004.getNum();
	}
	/**
	 *  每天雇佣别人的次数
	 * @return
	 */
	public int getDayChooseNum() {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.CHOOSE_OTHER);
		return struct_xtcs_004.getNum();
	}
	/**
	 * 每日被雇佣次数
	 */
	public int  getBeDayChooseNum() {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.OTHER_CHOOSE);
		return struct_xtcs_004.getNum();
	}
	
	/**
	 * 虎牢关 被雇佣者的 奖励 
	 */
	public int[][] getTigerEmployReward(){
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.BECHOOSE_REWARD);
		return struct_xtcs_004.getOther();
	}
	
	
	/**
	 * 虎牢关挑战boss 保底奖励
	 */
	public int[][] getLowTigerPassReward(){
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.BATTLE_LOW_REWARD);
		return struct_xtcs_004.getOther();
	}
	
	/**
	 * 虎牢关挑战boss 保底奖励 Object[] 显示
	 */
	public Object[] getLowTigerPassReward1(){
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.BATTLE_LOW_REWARD);
		Object[] reward=new Object[struct_xtcs_004.getOther().length];
		for (int i = 0; i < reward.length; i++) {
			reward[i]=new Object[] {struct_xtcs_004.getOther()[i][0],struct_xtcs_004.getOther()[i][1],struct_xtcs_004.getOther()[i][2]};
		}
		return reward;
	}
	

	
	
	
	/**
	 * 到达下一层或者最高层
	 */
	public void getNextLay(TigerPass tigerPass) {
		if (tigerPass.getBossIndex()==Config_hlg_323.getIns().getSortList().size()) {
			//当前层数等于最大层数 
			tigerPass.setCurhp(0);
			if (tigerPass.getRewards().get(tigerPass.getBossIndex())==GameConst.REWARD_0) {
				tigerPass.getRewards().put(tigerPass.getBossIndex(), GameConst.REWARD_1);
				TigerPassSender.sendCmd_8918(tigerPass.getHid(), tigerPass.getBossIndex(), GameConst.REWARD_1);
			}
		}else {
			if (tigerPass.getRewards().get(tigerPass.getBossIndex())==GameConst.REWARD_0) {
				tigerPass.getRewards().put(tigerPass.getBossIndex(), GameConst.REWARD_1);
				TigerPassSender.sendCmd_8918(tigerPass.getHid(), tigerPass.getBossIndex(), GameConst.REWARD_1);
			}
			tigerPass.setBossIndex(tigerPass.getBossIndex()+1);
			//血量
			Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(tigerPass.getBossIndex());
			FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
			tigerPass.setCurhp(target.getHpMax());
			tigerPass.setHpmax(target.getHpMax());
		}
		LogTool.info("hid:"+tigerPass.getHid()+" lay:"+tigerPass.getBossIndex(), TigerPassFunction.class);
		
	}
	
	
	
	
	public void scheduleMonster(boolean senddata) {
		try {
			
			Iterator<Entry<Long, TigerPassBattle>> iterator = TigerPassBattleCache.getTigerPassBattle().entrySet().iterator();
			while(iterator.hasNext()){ 
				Entry<Long, TigerPassBattle> next = iterator.next();
				TigerPassBattle tigerPassBattle = next.getValue();
				long hid = tigerPassBattle.getHid();
				Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(tigerPassBattle.getBossindex());
				int limitime=struct_hlg_323.getTime();
				Hero hero = HeroCache.getHero(hid);
				if(hero!=null && hero.isOnline()){
					TigerPass tigerPass = hero.getTigerPass();
					int awayLiveTime = TimeDateUtil.getCurrentTime() - tigerPassBattle.getBettleBeginTime();
					if (awayLiveTime>=limitime) {
						//移除 tigerPassBattle 战斗失败
						tigerPass.setCurhp(tigerPassBattle.getCurhp());
						//战斗失败
						int[][] lowTigerPassReward = TigerPassFunction.getIns().getLowTigerPassReward();
						UseAddUtil.add(hero, lowTigerPassReward, SourceGoodConst.TIGER_LOW_REWARD, null, true);
						if (tigerPass.getBattleNum()>0) {
							tigerPass.setBattleNum(tigerPass.getBattleNum()-1);
						}else {
							UseAddUtil.use(hero, GameConst.TOOL, 1, TigerPassConst.TIGER_ITEMID, SourceGoodConst.TIGER_USE_ITEMID, true);
						}
						Object[] lowTigerPassReward1 = TigerPassFunction.getIns().getLowTigerPassReward1();
						TigerPassSender.sendCmd_8908(hero.getId(), 1, tigerPass.getBossIndex(), tigerPass.getCurhp(), tigerPass.getHpmax(), lowTigerPassReward1);
						iterator.remove();
					}else {
						boolean die = attBoss(tigerPassBattle,senddata);
						if(die){
							//移除 tigerPassBattle 战斗胜利
							getNextLay(tigerPass);
							int[][] lowTigerPassReward = TigerPassFunction.getIns().getLowTigerPassReward();
							UseAddUtil.add(hero, lowTigerPassReward, SourceGoodConst.TIGER_LOW_REWARD, null, true);
							if (tigerPass.getBattleNum()>0) {
								tigerPass.setBattleNum(tigerPass.getBattleNum()-1);
							}else {
								UseAddUtil.use(hero, GameConst.TOOL, 1, TigerPassConst.TIGER_ITEMID, SourceGoodConst.TIGER_USE_ITEMID, true);
							}
							Object[] lowTigerPassReward1 = TigerPassFunction.getIns().getLowTigerPassReward1();
							TigerPassSender.sendCmd_8908(hero.getId(), 0, tigerPass.getBossIndex(), tigerPass.getCurhp(), tigerPass.getHpmax(), lowTigerPassReward1);
							iterator.remove();
							
						}
					}
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassFunction.class, "scheduleMonster has wrong");
		}
	}
	
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(TigerPassBattle tigerPassBattle,boolean send){
		boolean die = false;
		long myHurt=0;
		List<Object[]> hurtList = new ArrayList<Object[]>();;
		for (TigerPassJoiner tigerPassJoiner:tigerPassBattle.getJoiners().values()) {
			long hurt = 0;
			double damg =tigerPassJoiner.getMiaoHurt();
			hurt +=damg;
			long curhp = tigerPassBattle.getCurhp();
			curhp = curhp - hurt;
			tigerPassBattle.setCurhp(curhp);
			if(tigerPassBattle.getCurhp()<=0){
				LogTool.info("TigerPassFunction boss dead hid:"+tigerPassBattle.getHid()+" bossindex:"+tigerPassBattle.getBossindex(),this);
				die = true;
				tigerPassBattle.setCurhp(0);
			}
			tigerPassJoiner.setSumhurt(tigerPassJoiner.getSumhurt()+hurt);
			if (tigerPassBattle.getHid()==tigerPassJoiner.getHid()) {
				myHurt=tigerPassJoiner.getSumhurt();
			}
			hurtList.add(new Object[]{tigerPassJoiner.getName(),tigerPassJoiner.getSumhurt()});
		}
		Object[] hurtArr = null;
		if(hurtList!=null && hurtList.size()>0){
			hurtArr = hurtList.toArray();
		}
		if (die||send) {
			TigerPassSender.sendCmd_8906(tigerPassBattle.getHid(),  myHurt, tigerPassBattle.getHpmax(), tigerPassBattle.getCurhp(), hurtArr);
		}
		return die;
	}
	
	
	
	/**
	 * 生成TigerPassEmployer 虎牢关 雇佣兵
	 * @param model 
	 * @param hero hero
	 */
	public  void makeTigerPassEmployer(TigerPassEmployer tigerPassEmployer,Hero hero){
		tigerPassEmployer.setHid(hero.getId());
		tigerPassEmployer.setName(hero.getName());
		tigerPassEmployer.setNameZoneid(hero.getNameZoneid());
		tigerPassEmployer.setJob(hero.getJob());
		tigerPassEmployer.setLevel(hero.getLevel());
		tigerPassEmployer.setZoneid(hero.getZoneid());
		tigerPassEmployer.setTotalStrength(hero.getTotalStrength());
		tigerPassEmployer.setFinalFightAttr(hero.getFinalFightAttr());
		tigerPassEmployer.setCountryType(hero.getCountryType());
		tigerPassEmployer.setSkill(hero.getSkill());
		tigerPassEmployer.setIcon(hero.getSettingData().getIcon());
		tigerPassEmployer.setFrame(hero.getSettingData().getFrame());
		tigerPassEmployer.setRebornlv(hero.getRebornlv());
		tigerPassEmployer.setOfficial(hero.getOfficial());
		tigerPassEmployer.setTitleId(hero.getTitleId());
		tigerPassEmployer.setBodyModel(hero.getShowModel().getBodyModel());
		tigerPassEmployer.setGodWeapon(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		tigerPassEmployer.setGodWeaponKill(GodWeaponFunction.getIns().getNowGodWeaponZhuanShu(hero));
		tigerPassEmployer.setBelongZoneid(GameProperties.getFirstZoneId());
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
		tigerPassEmployer.setGodSkillLevel(godSkillLevel);
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		int fms = 0;
		if (monsterSpiritModel != null) {
			fms = monsterSpiritModel.getFightMonsterSpiri();
		}
		tigerPassEmployer.setFightMonsterSpirit(fms);
		LittleLeader littleLeader = hero.getLittleLeader();
		if(littleLeader!=null) {	
			int withLeaderId = littleLeader.getWearType();
			tigerPassEmployer.setWithLeaderId(withLeaderId);
			if (withLeaderId!=0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				if(littleLeaderModel!=null) {					
					int withLeaderFid=littleLeaderModel.getNowFashId();
					int leaderStarId=littleLeaderModel.getStar();
					int leaderSkillId=littleLeaderModel.getActivityKillLv();
					tigerPassEmployer.setWithLeaderFid(withLeaderFid);
					tigerPassEmployer.setLeaderStarId(leaderStarId);
					tigerPassEmployer.setLeaderSkillId(leaderSkillId);
				}
			}
		}
		tigerPassEmployer.setBechoosenum(getBeDayChooseNum());
		
		for (Struct_hlggyb_323 hlggyb_323:Config_hlggyb_323.getIns().getSortList()) {
			long min=hlggyb_323.getZl()[0][0]*10000l;
			long max=hlggyb_323.getZl()[0][1]*10000l;
			if (hero.getTotalStrength()>=min&&hero.getTotalStrength()<=max) {
				tigerPassEmployer.setMoney(hlggyb_323.getGy()[0][2]);
				break;
			}
		}
	}
	
	/**
	 * 添加QMboss进入次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addTigerPassNum(Hero hero, int id, int num) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
			return false;
		}
		if (hero.getTigerPass()!=null) {
			hero.getTigerPass().setBattleNum(hero.getTigerPass().getBattleNum()+num);
			return true;
		}
		return false;
	}
	
	
	public void gmChargeNum(Hero hero,int index) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
			return ;
		}
		TigerPass tigerPass=hero.getTigerPass();
		//血量
		Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(index);
		if (struct_hlg_323!=null) {
			FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
			tigerPass.setCurhp(target.getHpMax());
			tigerPass.setHpmax(target.getHpMax());
			tigerPass.setBossIndex(index);
		}
		
	}
	
	
	
	

}
