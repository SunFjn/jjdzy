package com.teamtop.system.tigerPass;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFightAttr;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.tigerPass.cross.TigerPassLocalIO;
import com.teamtop.system.tigerPass.model.TigerPass;
import com.teamtop.system.tigerPass.model.TigerPassBattle;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.system.tigerPass.model.TigerPassJoiner;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hlg_323;
import excel.config.Config_hlggyb_323;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hlg_323;
import excel.struct.Struct_hlggyb_323;
import excel.struct.Struct_xtcs_004;


public class TigerPassManager {
	
	private static TigerPassManager ins = null;

	public static TigerPassManager getIns() {
		if (ins == null) {
			ins = new TigerPassManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			TigerPass tigerPass = hero.getTigerPass();
			
			
			int battleNum = tigerPass.getBattleNum();
			if(tigerPass.getRefreshTime()>0&&battleNum<TigerPassFunction.getIns().getInitBattleNum()){
				//打开UI计算恢复了多少次
				int passtime = TimeDateUtil.getCurrentTime() - tigerPass.getRefreshTime();
				int huifu = passtime / TigerPassConst.ADD_CHALLENGE_TIME_NEED;
				if(huifu>0){
					battleNum += huifu;
					if(battleNum>=TigerPassFunction.getIns().getInitBattleNum()){
						battleNum=TigerPassFunction.getIns().getInitBattleNum();
					}
					tigerPass.setBattleNum(battleNum);
					tigerPass.setRefreshTime(tigerPass.getRefreshTime() + huifu * TigerPassConst.ADD_CHALLENGE_TIME_NEED);
				}
			}
			
			int iconid=0;
			int frim=0;
			String employname="";
			int vip=0;
			long strength=0;
			long chooseHid = tigerPass.getChooseHid();
			if (chooseHid>0&&tigerPass.getTigerPassEmployers().containsKey(chooseHid)) {
				 TigerPassEmployer tigerPassEmployer = tigerPass.getTigerPassEmployers().get(chooseHid);
				 iconid=tigerPassEmployer.getIcon();
				 frim=tigerPassEmployer.getFrame();
				 vip=tigerPassEmployer.getVip();
				 strength=tigerPassEmployer.getTotalStrength();
				 employname=tigerPassEmployer.getNameZoneid();
			}
			Object[] rewards=new Object[2];
			if (tigerPass.getRewards().containsKey(tigerPass.getBossIndex()-1)) {
				rewards=new Object[2];
				rewards[0]=new Object[] {tigerPass.getBossIndex()-1,tigerPass.getRewards().get(tigerPass.getBossIndex()-1)};
				rewards[1]=new Object[] {tigerPass.getBossIndex(),tigerPass.getRewards().get(tigerPass.getBossIndex())};
			}else {
				rewards=new Object[1];
				rewards[0]=new Object[] {tigerPass.getBossIndex(),tigerPass.getRewards().get(tigerPass.getBossIndex())};
			}
			
			/*for (int j = 0; j <rewards.length; j++) {
				rewards[j]=new Object[] {j+1,tigerPass.getRewards().get(j+1)};
			}*/
			
			int cdtime=0;
			if (tigerPass.getBattleNum()<TigerPassFunction.getIns().getInitBattleNum()) {
				cdtime=TigerPassConst.ADD_CHALLENGE_TIME_NEED+tigerPass.getRefreshTime()-TimeDateUtil.getCurrentTime();
			}
			if (tigerPass.getCurhp()!=0) {
				Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(tigerPass.getBossIndex());
				FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
				if (tigerPass.getHpmax()!=target.getHpMax()) {
					tigerPass.setCurhp(target.getHpMax());
					tigerPass.setHpmax(target.getHpMax());
				}
			}
			TigerPassSender.sendCmd_8902(hero.getId(), tigerPass.getBossIndex(), tigerPass.getCurhp(), tigerPass.getHpmax(), tigerPass.getBattleNum(),cdtime,tigerPass.getJoinEmploySate(),tigerPass.getChooseNum(), rewards, chooseHid, iconid, frim, employname, vip, strength);
			if (tigerPass.getBossIndex() >= Config_hlg_323.getIns().size() && tigerPass.getCurhp() == 0) {
				// 三国战令(活动) 已通关自动完成
				WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_9, 80);
			}
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "openUI has wrong");
		}
		
	}

	public void battleboss(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			//周1 晚上00:00:00
			int weekOneTime = TimeDateUtil.getWeekOneTime(1, 0, 0, 0);
			int time1=weekOneTime-60;
			int time2=weekOneTime+60*5;
			int time=TimeDateUtil.getCurrentTime();
			if (time<time2&&time>time1) {
				TigerPassSender.sendCmd_8904(hero.getId(), 5);
				return;
			}
			
			TigerPass tigerPass = hero.getTigerPass();
			int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), TigerPassConst.TIGER_ITEMID);
			if (tigerPass.getBattleNum()==0&&goodsNumBySysId==0) {
				TigerPassSender.sendCmd_8904(hero.getId(), 2);
				return;
			}
			if(TigerPassBattleCache.getTigerPassBattle().containsKey(hero.getId())) {
				TigerPassSender.sendCmd_8904(hero.getId(), 3);
				return;
			}
			
			if (tigerPass.getBossIndex()==Config_hlg_323.getIns().getSortList().size()&&tigerPass.getCurhp()==0) {
				//当前层数等于最大层数 且 boss当前血量等于0
				TigerPassSender.sendCmd_8904(hero.getId(), 4);
				return;
			}
			
			TigerPassBattle tigerPassBattle=new TigerPassBattle();
			//设置boss
			tigerPassBattle.setHid(hero.getId());
			tigerPassBattle.setBossindex(tigerPass.getBossIndex());
			tigerPassBattle.setCurhp(tigerPass.getCurhp());
			tigerPassBattle.setHpmax(tigerPass.getHpmax());
			//设置自己 参与者
			tigerPassBattle.setJoiners(new HashMap<Long,TigerPassJoiner>());
			
			TigerPassJoiner tigerPassJoiner =new TigerPassJoiner();
			tigerPassJoiner.setHid(hero.getId());
			tigerPassJoiner.setGuzhuhid(hero.getId());
			tigerPassJoiner.setName(hero.getNameZoneid());
			
			Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(tigerPass.getBossIndex());
			FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
			tigerPassJoiner.setMiaoHurt(damg);
			tigerPassBattle.getJoiners().put(hero.getId(), tigerPassJoiner);
			TigerPassEmployer tigerPassEmployer =null;
			//设置设置雇佣兵
			if(tigerPass.getChooseHid()>0&&tigerPass.getTigerPassEmployers().containsKey(tigerPass.getChooseHid())) {
				tigerPassEmployer = tigerPass.getTigerPassEmployers().get(tigerPass.getChooseHid());
				TigerPassJoiner tigerPassJoiner1 =new TigerPassJoiner();
				tigerPassJoiner1.setGuzhuhid(hero.getId());
				tigerPassJoiner1.setHid(tigerPass.getChooseHid());
				tigerPassJoiner1.setName(tigerPassEmployer.getNameZoneid());
				
				FinalFightAttr battleAttr1 = new BattleFightAttr();
				battleAttr1=(FinalFightAttr) CloneUtils.deepClone(tigerPassEmployer.getFinalFightAttr());
				long damg1 =(long) Math.max(BattleFunction.calcDamg(battleAttr1, target),1);
				tigerPassJoiner1.setMiaoHurt(damg1);
				tigerPassBattle.getJoiners().put(tigerPass.getChooseHid(), tigerPassJoiner1);
			}
			
			if (tigerPass.getRefreshTime()==0||tigerPass.getBattleNum()==TigerPassFunction.getIns().getInitBattleNum()) {
				tigerPass.setRefreshTime(TimeDateUtil.getCurrentTime());
			}
			tigerPass.setChooseHid(0);
			tigerPassBattle.setBettleBeginTime(TimeDateUtil.getCurrentTime());
			
			
			//放入战斗缓存
			TigerPassBattleCache.getTigerPassBattle().put(hero.getId(), tigerPassBattle);
			//
			if (tigerPassEmployer!=null) {
				HeroFunction.getIns().sendBattleHeroAttr(hero, tigerPassEmployer);
			}
			TigerPassSender.sendCmd_8904(hero.getId(), 0);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_9, 1);
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "battleboss has wrong");
		}
		
	}

	public void die(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			TigerPass tigerPass = hero.getTigerPass();
			int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), TigerPassConst.TIGER_ITEMID);
			if (tigerPass.getBattleNum()==0&&goodsNumBySysId==0) {
				return;
			}
			
			if(!TigerPassBattleCache.getTigerPassBattle().containsKey(hero.getId())) {
				return;
			}
			TigerPassBattle tigerPassBattle = TigerPassBattleCache.getTigerPassBattle().get(hero.getId());
			//找到正在战斗的boss
			tigerPass.setCurhp(tigerPassBattle.getCurhp());
			TigerPassBattleCache.getTigerPassBattle().remove(hero.getId());
			int[][] lowTigerPassReward = TigerPassFunction.getIns().getLowTigerPassReward();
			UseAddUtil.add(hero, lowTigerPassReward, SourceGoodConst.TIGER_LOW_REWARD, null, true);
			if (tigerPass.getBattleNum()>0) {
				tigerPass.setBattleNum(tigerPass.getBattleNum()-1);
			}else {
				UseAddUtil.use(hero, GameConst.TOOL, 1, TigerPassConst.TIGER_ITEMID, SourceGoodConst.TIGER_USE_ITEMID, true);
			}
			Object[] lowTigerPassReward1 = TigerPassFunction.getIns().getLowTigerPassReward1();
			TigerPassSender.sendCmd_8908(hero.getId(), 1, tigerPass.getBossIndex(), tigerPass.getCurhp(), tigerPass.getHpmax(), lowTigerPassReward1);
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "die has wrong");
		}
		
	}
	/**
	 * 报名自己上报雇佣兵
	 * @param hero
	 */
	public void joinemlpoy(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			TigerPass tigerPass = hero.getTigerPass();
			if (tigerPass.getJoinEmploySate()==1) {
				//1已经加入雇佣兵
				TigerPassSender.sendCmd_8914(hero.getId(), 2);
				return;
			}
			TigerPassLocalIO.getIns().LTCjoinEmploy(hero);
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "die has wrong");
		}
		
	}
	/**
	 * 打开雇佣列表
	 * @param hero
	 */
	public void openemploy(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			
			TigerPass tigerPass = hero.getTigerPass();
			Object[] employs=null;
			int size = tigerPass.getTigerPassEmployers().size();
			if (size>0) {
				employs=new Object[size];
				int i=0;
				for (TigerPassEmployer tigerPassEmployer : tigerPass.getTigerPassEmployers().values()) {
					//I:头像I:头像框U:玩家名字I:VIP等级L:玩家idL:玩家战力
					employs[i]=new Object[] {tigerPassEmployer.getIcon(),tigerPassEmployer.getFrame(),tigerPassEmployer.getNameZoneid()
							,tigerPassEmployer.getVip(),tigerPassEmployer.getHid(),tigerPassEmployer.getTotalStrength(),tigerPassEmployer.getMoney()
							,tigerPassEmployer.getBechoosenum()};
					i++;
				}
				
			}
			TigerPassSender.sendCmd_8910(hero.getId(), employs);
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "die has wrong");
		}
		
	}
	/**
	 * 选择雇佣兵
	 * @param hero
	 * @param hid
	 */
	public void chooseemploy(Hero hero, long choosehid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			if(TigerPassBattleCache.getTigerPassBattle().containsKey(hero.getId())) {
				TigerPassSender.sendCmd_8912(hero.getId(), 1, choosehid, 0, 0, 0, 0, "");
				return;
			}
			TigerPass tigerPass = hero.getTigerPass();
			if (tigerPass.getChooseNum()<=0) {
				TigerPassSender.sendCmd_8912(hero.getId(), 3, choosehid, 0, 0, 0, 0, "");
				return;
			}
			if(!tigerPass.getTigerPassEmployers().containsKey(choosehid)) {
				TigerPassSender.sendCmd_8912(hero.getId(), 4, choosehid, 0, 0, 0, 0, "");
				return;
			}
			TigerPassEmployer tigerPassEmployer = tigerPass.getTigerPassEmployers().get(choosehid);
			if (tigerPassEmployer.getBechoosenum()==0) {
				TigerPassSender.sendCmd_8912(hero.getId(), 2, choosehid, 0, 0, 0, 0, "");
				return;
			}
			int[][] cost=null;
			for (Struct_hlggyb_323 hlggyb_323:Config_hlggyb_323.getIns().getSortList()) {
				long min=hlggyb_323.getZl()[0][0]*10000l;
				long max=hlggyb_323.getZl()[0][1]*10000l;
				if (tigerPassEmployer.getTotalStrength()>=min&&tigerPassEmployer.getTotalStrength()<=max) {
					cost=hlggyb_323.getGy();
					break;
				}
			}
			if (cost!=null) {
				if (UseAddUtil.canUse(hero, cost)) {
					TigerPassLocalIO.getIns().chooseemploy(hero,tigerPassEmployer,cost);
				}else {
					TigerPassSender.sendCmd_8912(hero.getId(), 5, choosehid, 0, 0, 0, 0, "");
				}
			}else {
				LogTool.warn("cost==null hid: "+hero.getId()+" str"+tigerPassEmployer.getTotalStrength(), TigerPassManager.class);
			}
			
			
			
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "chooseemploy has wrong");
		}
		
	}
	/**
	 * 刷新雇佣兵
	 * @param hero
	 */
	public void refreshEmploy(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TigerPassConst.FRESH_COST);
			if (UseAddUtil.canUse(hero, struct_xtcs_004.getOther())) {
				TigerPassLocalIO.getIns().LTCreshList(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "refreshEmploy has wrong");
		}
		
	}
	/**
	 * 获取首通奖励
	 * @param hero
	 * @param lay
	 */
	public void getReward(Hero hero, int lay) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
				return;
			}
			TigerPass tigerPass = hero.getTigerPass();
			
			Integer state = tigerPass.getRewards().get(lay);
			if (state==GameConst.REWARD_1) {
				Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(lay);
				if (UseAddUtil.canAdd(hero, struct_hlg_323.getTg(), false)) {
					tigerPass.getRewards().put(lay, GameConst.REWARD_2);
					UseAddUtil.add(hero, struct_hlg_323.getTg(), SourceGoodConst.TIGER_FRIST_REWARD, null, true);
					state=GameConst.REWARD_2;
				}
				
			}
			TigerPassSender.sendCmd_8918(hero.getId(), lay, state);
		} catch (Exception e) {
			LogTool.error(e, TigerPassManager.class, "getReward has wrong");
		}
		
	}
	
	
	

}
