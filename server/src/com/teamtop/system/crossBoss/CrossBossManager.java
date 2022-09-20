package com.teamtop.system.crossBoss;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossBoss.cross.ZSBoss;
import com.teamtop.system.crossBoss.model.CrossBossRankModel;
import com.teamtop.system.crossBoss.model.ZSBossHis;
import com.teamtop.system.crossBoss.model.ZSBossHisModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_seven_223;
import excel.config.Config_sevenmb_223;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_seven_223;
import excel.struct.Struct_sevenmb_223;
import excel.struct.Struct_xtcs_004;

public class CrossBossManager {
	private static CrossBossManager ins = null;

	public static CrossBossManager getIns() {
		if (ins == null) {
			ins = new CrossBossManager();
		}
		return ins;
	}
	
	/**
	 * 登录推送
	 * @param hero
	 */
	public void showInfo(Hero hero) {
		long hid = hero.getId();
		CrossBossSender.sendCmd_1700(hid, CrossBossCache.CROSS_STATE);
		if (CrossBossLocalCache.dieBoss.size()>0) {
			Object[] diebossid=new Object[CrossBossLocalCache.dieBoss.size()];
			int i=0;
			for (int bossid : CrossBossLocalCache.dieBoss) {
				diebossid[i]=new Object[] {bossid};
				i++;
			}
			CrossBossSender.sendCmd_1726(hid, diebossid);
		}else {
			CrossBossSender.sendCmd_1726(hid, new Object[]{});
		}
	}
	/**
	 * 打开ui
	 * @param hero
	 * @param bossid
	 */
	public void openUi(Hero hero, int bossid) {
		try {
			int floornum=0;
			String skillName="";
			ZSBossHis zsBossHis=CrossBossLocalCache.getCrossBossLocalGlobalData().getBossHisMapByBossid().get(bossid);
			if (zsBossHis!=null) {
				floornum=zsBossHis.getAddDoubleNum();
				skillName=zsBossHis.getSkillName();
			}
			int incd=0;
			if (TimeDateUtil.getCurrentTime()<hero.getCrossBoss().getJoinInCD()) {
				incd=hero.getCrossBoss().getJoinInCD()-TimeDateUtil.getCurrentTime();
			}
			CrossBossSender.sendCmd_1702(hero.getId(), hero.getCrossBoss().getNum(),hero.getCrossBoss().getBuyNum(), floornum,incd,skillName);
			
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class,hero.getId(),hero.getName(),  "openUi has wrong");
		}
	}

	public void openRank(Hero hero, int bossid) {
		try {
			Object[] ranks=null;
			Object[] countrys=null;
			ZSBossHis zsBossHis=CrossBossLocalCache.getCrossBossLocalGlobalData().getBossHisMapByBossid().get(bossid);
		    if (zsBossHis!=null&&zsBossHis.getHeroRankList()!=null&&zsBossHis.getHeroRankList().size()>0) {
		    	ranks=new Object[zsBossHis.getHeroRankList().size()];
		    	for (int i = 0; i < zsBossHis.getHeroRankList().size();i++) {
		    		if (i<10) {
		    			ZSBossHisModel model = zsBossHis.getHeroRankList().get(i);
		    			ranks[i]=new Object[]{model.getName(),model.getHurt(),model.getId()};
					}else {
						break;
					}
		    	}
			}
		    if (zsBossHis!=null&&zsBossHis.getCountryRankList()!=null&&zsBossHis.getCountryRankList().size()>0) {
		    	countrys=new Object[zsBossHis.getCountryRankList().size()];
		    	for (int i = 0; i < zsBossHis.getCountryRankList().size();i++) {
		    		ZSBossHisModel model =zsBossHis.getCountryRankList().get(i);
		    		countrys[i]=new Object[]{model.getCountry(),model.getHurt()};
		    	}
			}
			CrossBossSender.sendCmd_1704(hero.getId(), ranks, hero.getCountryType(), countrys);
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class, hero.getId(),hero.getName(), "openRank has wrong");
		}
		
	}

	public void join(Hero hero) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CROSS_BOSS_MH)) return;
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				CrossBossSender.sendCmd_1710(hero.getId(), 2, null, 0, 0, 0, 0, 0, 0);
				return;
			}
			if (TimeDateUtil.getCurrentTime()<hero.getCrossBoss().getJoinInCD()) {
				CrossBossSender.sendCmd_1710(hero.getId(), 5, null, 0, 0, 0, 0, 0, 0);
				return;
			}
			CrossFunction.askCross(hero, SystemIdConst.FUN_CROSS_BOSS_MH);
			
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class,hero.getId(),hero.getName(),  "join has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void buyLive(Hero hero,int type) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				CrossBossSender.sendCmd_1706(hero.getId(), 1);
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			int fuhuoCD=Config_xtcs_004.getIns().get(CrossBossConst.CD_FUHUO_HORE).getNum();
			if(zsBoss.getHeros().containsKey(hero.getId())){
				CrossBossRankModel heroRankModel= zsBoss.getHeroRankMap().get(hero.getId());
				if (type==0) {
					if(TimeDateUtil.getCurrentTime() - heroRankModel.getDeadTime() <fuhuoCD){
						if(UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
							UseAddUtil.use(hero, GameConst.YUANBAO, fuhuoCost, SourceGoodConst.CROSS_BUY_LIVE, true);
							heroRankModel.setDeadTime(0);
							heroRankModel.fullHp();
							heroRankModel.setLiveTime(TimeDateUtil.getCurrentTime());
							CrossBossSender.sendCmd_1706(hero.getId(), 0);
							return;
						}
					}
				}else if (type==1) {
					if(TimeDateUtil.getCurrentTime() - heroRankModel.getDeadTime() >=fuhuoCD){
						heroRankModel.setDeadTime(0);
						heroRankModel.fullHp();
						heroRankModel.setLiveTime(TimeDateUtil.getCurrentTime());
						CrossBossSender.sendCmd_1706(hero.getId(), 0);
						return;
					}
				}
			}
			CrossBossSender.sendCmd_1706(hero.getId(), 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class,hero.getId(),hero.getName(),  "join has wrong");
		}
		
	}
	/**
	 * 买次数
	 * @param hero
	 */
	public void buyNum(Hero hero) {
		try {
			if(CrossZone.isCrossServer()){
				return;
			}
			int datBuyMaxNum=Config_xtcs_004.getIns().get(CrossBossConst.BUYMAX).getNum();
			int buyCost=Config_xtcs_004.getIns().get(CrossBossConst.BUYCOST).getNum();
			
			if(hero.getCrossBoss().getBuyNum()>=datBuyMaxNum) {
				CrossBossSender.sendCmd_1708(hero.getId(), 1, hero.getCrossBoss().getNum());
				return;
			}
			if(UseAddUtil.canUse(hero, GameConst.YUANBAO, buyCost)) {
				UseAddUtil.use(hero, GameConst.YUANBAO, buyCost, SourceGoodConst.CROSS_BUY_LIVE, true);
				hero.getCrossBoss().setBuyNum(hero.getCrossBoss().getBuyNum()+1);
				hero.getCrossBoss().setNum(hero.getCrossBoss().getNum()+1);
				CrossBossSender.sendCmd_1708(hero.getId(),0, hero.getCrossBoss().getNum());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class,hero.getId(),hero.getName(),  "buyNum has wrong");
		}
	}
	/**
	 * 离开跨服boss
	 * @param hero
	 */
	public void exitCrossBoss(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				if (hero.getCrossBoss()!=null&&hero.getCrossBoss().getIsInBoss()==CrossBossConst.INBOSS_STATE1) {
					hero.getCrossBoss().setJoinInCD(TimeDateUtil.getCurrentTime()+CrossBossConst.IN_BOSS_CD);
					hero.getCrossBoss().setIsInBoss(CrossBossConst.INBOSS_STATE0);
				}
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			if(zsBoss.getHeros().containsKey(hero.getId())){
				zsBoss.getHeros().remove(hero.getId());
				LogTool.info("exitCrossBoss success heroID:"+hero.getId()+" heroName:"+hero.getNameZoneid(), CrossBossManager.class);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class,hero.getId(),hero.getName(),  "exitCrossBoss has wrong");
		}
		
	}
	/**
	 * 打开boss伤害排行榜
	 * @param hero
	 * @param bossid
	 */
	public void openBossRank(Hero hero, int bossid) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			//伤害排行
			List<Object[]> hurtList = new ArrayList<Object[]>();
			int num=0;
			for(CrossBossRankModel heroRankModel :zsBoss.getHeroRankList()){
				if (num<10) {
					hurtList.add(new Object[]{heroRankModel.getName(),heroRankModel.getHurt()});
					num++;
				}else {
					break;
				}
			}
			Object[] hurtArr = new Object[] {};
			if(hurtList!=null && hurtList.size()>0){
				hurtArr = hurtList.toArray();
			}
			CrossBossSender.sendCmd_1714(hero.getId(), bossid, hurtArr);
			return;
		} catch (Exception e) {
			LogTool.error(e,  CrossBossManager.class,hero.getId(),hero.getName(),  "openBossRank has wrong");
		}
		
	}
	/**
	 * 打开奖励情况
	 * @param hero
	 */
	public void openRewards(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			CrossBossRankModel heroBossModel =zsBoss.getHeroRankMap().get(hero.getId());
			if (heroBossModel.getRewardState()==null) {
				LogTool.warn("heroBossModel.getRewardState()==null id:"+hero.getId(), CrossBossManager.class);
				return;
			}
			Object[] rewards=new Object[heroBossModel.getRewardState().length];
			for (int i = 0; i < rewards.length; i++) {
				rewards[i]=new Object[] {heroBossModel.getRewardState()[i]};
			}
			CrossBossSender.sendCmd_1716(hero.getId(), rewards);
			return;
		} catch (Exception e) {
			LogTool.error(e,  CrossBossManager.class,hero.getId(),hero.getName(),  "openRewards has wrong");
		}
		
	}
	/**
	 * 获取伤害目标奖励
	 * @param hero
	 * @param index
	 */
	public void getreward(Hero hero, int index) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			CrossBossRankModel heroBossModel =zsBoss.getHeroRankMap().get(hero.getId());
			if (heroBossModel.getRewardState()==null) {
				LogTool.warn("heroBossModel.getRewardState()==null id:"+hero.getId(), CrossBossManager.class);
				return;
			}
			Struct_sevenmb_223 sevenmb_223=Config_sevenmb_223.getIns().get(index+1);
			int[][] reward=null;
			if(heroBossModel.getRewardState()[index]==GameConst.REWARD_1) {
				switch (zsBoss.getIndex()) {
				case 1:
					reward=sevenmb_223.getReward1();
					break;
				case 2:
					reward=sevenmb_223.getReward2();
					break;
				case 3:
					reward=sevenmb_223.getReward3();
					break;
				case 4:
					reward=sevenmb_223.getReward4();
					break;
				case 5:
					reward=sevenmb_223.getReward5();
					break;
				default:
					break;
				}
				if (UseAddUtil.canAdd(hero, reward, false)) {
					UseAddUtil.add(hero, reward, SourceGoodConst.CROSS_GOAL_HURT, null, true);
					heroBossModel.getRewardState()[index]=GameConst.REWARD_2;
					CrossBossSender.sendCmd_1718(hero.getId(), 0, index, GameConst.REWARD_2);
					return;
				}
			}
			CrossBossSender.sendCmd_1718(hero.getId(), 1, index, heroBossModel.getRewardState()[index]);
			
		} catch (Exception e) {
			LogTool.error(  e,CrossBossManager.class,hero.getId(),hero.getName(),  "getreward has wrong");
		}
		
	}
	/**
	 * 购买攻击buff
	 * @param hero
	 */
	public void buyAttPro(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			CrossBossRankModel heroBossModel =zsBoss.getHeroRankMap().get(hero.getId());
			//1086 七擒孟获增加伤害值
			//1087 七擒孟获增加伤害的消耗
			if (heroBossModel.getBuyAttNum()<CrossBossConst.ADD_ATT_MAX) {
				Struct_xtcs_004 addNum = Config_xtcs_004.getIns().get(CrossBossConst.BUY_ATT_ADDNUM);
				Struct_xtcs_004 cost = Config_xtcs_004.getIns().get(CrossBossConst.BUY_ATT_COST);
				if (UseAddUtil.canUse(hero, cost.getOther())) {
					UseAddUtil.use(hero, cost.getOther(), SourceGoodConst.CROSS_BUY_ATT, true);
					heroBossModel.setBuyAttNum(heroBossModel.getBuyAttNum()+1);
					double hurt = 0;
					hurt = (long) BattleFunction.calcDamg(heroBossModel.getAttr(), zsBoss.getAttr());
					hurt=hurt+heroBossModel.getBuyAttNum()/addNum.getNum()*hurt;
					heroBossModel.setMeHurtBoss((long)hurt);
					CrossBossSender.sendCmd_1720(hero.getId(), 0, heroBossModel.getBuyAttNum());
					return;
				}
			}
			CrossBossSender.sendCmd_1720(hero.getId(), 1, heroBossModel.getBuyAttNum());
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossBossManager.class, "buyAttPro has wrong");
		}
		
	}

	public void cgdie(Hero hero) {
		try {
			if(!CrossZone.isCrossServer()){
				return;
			}
			int fuhuoCost=Config_xtcs_004.getIns().get(CrossBossConst.FUHUO_YB).getNum();
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			ArrayList<Object[]> dieId=new ArrayList<>();
			if(zsBoss.getHeros().containsKey(hero.getId())){
				CrossBossRankModel heroRankModel= zsBoss.getHeroRankMap().get(hero.getId());
				if (heroRankModel.getAttr().getHp()<=0) {
					LogTool.warn("heroRankModel.getAttr().getHp() hid:"+hero.getId(), CrossBossManager.class);
					return;
				}
				if (heroRankModel.getAotufuhuo()==1) {
					if (UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
						//自动复活
						UseAddUtil.use(hero, GameConst.YUANBAO, fuhuoCost, SourceGoodConst.CROSS_BUY_LIVE, true);
						heroRankModel.setDeadTime(0);
						heroRankModel.fullHp();
						heroRankModel.setLiveTime(TimeDateUtil.getCurrentTime());
						CrossBossSender.sendCmd_1706(hero.getId(), 0);
						CrossBossSender.sendCmd_1732(hero.getId(), 0);
					}else {
						CrossBossSender.sendCmd_1732(hero.getId(), 1);
						//前段通知死亡
						heroRankModel.getAttr().setHp(0);
						heroRankModel.setDeadTime(TimeDateUtil.getCurrentTime());
						dieId.add(new Object[] {heroRankModel.getId()});
						CrossBossFunction.getIns().broaddieHero(zsBoss,dieId);
					}
				}else {
					//前段通知死亡
					heroRankModel.getAttr().setHp(0);
					heroRankModel.setDeadTime(TimeDateUtil.getCurrentTime());
					dieId.add(new Object[] {heroRankModel.getId()});
					CrossBossFunction.getIns().broaddieHero(zsBoss,dieId);
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e,CrossBossManager.class,hero.getId(),hero.getName(),  "buyAttPro has wrong");
		}
		
	}

	public void isaotufuhuo(Hero hero, int state) {
		try {
			if (state!=1&&state!=0) {
				return;
			}
			if(!CrossZone.isCrossServer()){
				return;
			}
			if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
				return;
			}
			ZSBoss zsBoss=null;
			for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
				if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
					zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
					break;
				}
			}
			if (zsBoss==null) {
				return;
			}
			CrossBossRankModel heroBossModel =zsBoss.getHeroRankMap().get(hero.getId());
			heroBossModel.setAotufuhuo(state);
			CrossBossSender.sendCmd_1730(hero.getId(), state);
			if (state==1) {
				buyLive(hero, 0);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e,CrossBossManager.class,hero.getId(),hero.getName(),  "isaotufuhuo has wrong");
		}
		
	}
	
	
	

}
