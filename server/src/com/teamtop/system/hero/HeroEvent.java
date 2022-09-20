package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.houtaiHttp.events.kickOutHero.KickOutHeroIO;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.account.Account;
import com.teamtop.system.event.backstage.events.backstage.loginInfo.FlowLoginoutEvent;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerIO;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.firstRecharge.FirstRechargeSender;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.mount.MountFunction;
import com.teamtop.system.openDaysSystem.offlineNewDayRecharge.OfflineNewDayRechargeManager;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_guanxian_701;
import excel.config.Config_hero_211;
import excel.struct.Struct_hero_211;
import io.netty.channel.Channel;

/**
 * hero事件
 * @author Administrator
 *
 */
public class HeroEvent extends AbsSystemEvent {
	private static HeroEvent ins = null;

	public static HeroEvent getIns() {
		if (ins == null) {
			ins = new HeroEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		//默认等级
		if(hero.getLevel()==0){
			hero.setLevel(1);
		}
		if(hero.getJob()==0) {
			hero.setJob(1);
		}
		//技能
		if(hero.getSkill()==null) {
			Skill skill = new Skill();
			hero.setSkill(skill);
			Map<Integer, SkillInfo> skillMap = new LinkedHashMap<>();
			skill.setSkillMap(skillMap);
			hero.getSkill().setSkillMap(skillMap);
			// List<Struct_skill_210> jobSkillList = SkillCache.getJobSkillList(0);
			// Struct_skill_210 skillDatat = jobSkillList.get(0);
			// skillMap.put(SkillConst.skiil_site_0, new SkillInfo(skillDatat.getId(),
			// 1,0));
		}
		//最终战斗属性
		if (hero.getFinalFightAttr()==null) {
			FinalFightAttr finalFightAttr = new FinalFightAttr();
			finalFightAttr.setUid(hero.getId());
			int type=hero.getJob();
			if (hero.getJob()>1000) {
				type=type/1000;
			}
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			finalFightAttr.setType(struct_hero_211.getPinzhi());
			hero.setFinalFightAttr(finalFightAttr);
		}
		if (hero.getFinalFightAttr().getType()==0) {
			int type=hero.getJob();
			if (hero.getJob()>1000) {
				type=type/1000;
			}
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			hero.getFinalFightAttr().setType(struct_hero_211.getPinzhi());
		}
//		if (hero.getFinalFightAttr().getStar()==0) {
//			int type=hero.getJob();
//			if (hero.getJob()>1000) {
//				type=type/1000;
//			}
//			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
//			hero.getFinalFightAttr().setStar(wuJiangModel.getStar());
//		}
		//战斗属性详细
		hero.setFightAttr(new FightAttr());
		hero.setFightAttrBySysid(new HashMap<>());
		Map<Integer, Integer> battleCheckMap = hero.getBattleCheckMap();
		if(battleCheckMap==null){
			battleCheckMap = new HashMap<Integer, Integer>();
			hero.setBattleCheckMap(battleCheckMap);
		}
		// 档次充值记录
		Set<Integer> rechargeGrade = hero.getRechargeGrade();
		if (rechargeGrade == null) {
			rechargeGrade = new HashSet<>();
			hero.setRechargeGrade(rechargeGrade);
		}
		List<Integer> oneDayEveryIndexRechargeList = hero.getOneDayEveryIndexRechargeList();
		if(oneDayEveryIndexRechargeList==null) {
			oneDayEveryIndexRechargeList=new ArrayList<>();
			hero.setOneDayEveryIndexRechargeList(oneDayEveryIndexRechargeList);;
		}
		Map<Integer, Integer> rechargeFiveTimes = hero.getRechargeFiveTimes();
		if(rechargeFiveTimes==null) {
			rechargeFiveTimes = new HashMap<Integer, Integer>();
			hero.setRechargeFiveTimes(rechargeFiveTimes);
		}
		PrivilegeCardFunction.getIns().init(hero);
		//默认官职
		if (hero.getOfficial()==0) {
			hero.setOfficial(1);
		}
		//系统开启奖励
		if (hero.getOpenSysReward()==null) {
			Set<Integer> openSysReward = new TreeSet<>();
			hero.setOpenSysReward(openSysReward);
		}
		ShowModel showModel = hero.getShowModel();
		if(showModel==null){
			showModel = new ShowModel();
			hero.setShowModel(showModel);
			showModel.setOfficial(1);
		}
		Set<Integer> endUidSet = hero.getEndUidSet();
		if(endUidSet==null) {
			endUidSet = new HashSet<>();
			hero.setEndUidSet(endUidSet);
		}
		Set<Integer> giftTaskIds = hero.getGiftTaskIds();
		if (giftTaskIds==null) {
			giftTaskIds=new HashSet<>();
			hero.setGiftTaskIds(giftTaskIds);
		}
		if (hero.getTempData()!=null) {
			Account account = hero.getTempData().getAccount();
			if (account!=null) {
				hero.setUsesys(account.getUsesys());
			}
		}
		HeroCurrencies heroCurrencies = hero.getHeroCurrencies();
		if (heroCurrencies == null) {
			heroCurrencies = new HeroCurrencies();
			heroCurrencies.setHid(hero.getId());
			hero.setHeroCurrencies(heroCurrencies);
		}
		
	}
	@Override
	public void login(Hero hero) {
		//重算战力
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.LOGIN,SystemIdConst.SYSID);
		//玩家基础数据
		int addition = GuanqiaFunction.getIns().getAddition(hero);
		int monsterSpirit = hero.getMonsterSpiritModel().getFightMonsterSpiri();
		
		//少主信息
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
		//桃园结义ID
		long taoyuanSwornId = TaoyuanSwornFunction.getIns().getTaoyuanSwornId(hero);
		
		int speed = MountFunction.getIns().getSpeed(hero);//速度
		
		HeroSender.sendCmd_108(hero.getId(), hero.getId(), hero.getName(),hero.getLevel(),hero.getExp(),
				hero.getJob(), hero.getCountryType(), hero.getYuanbao(), hero.getCoin(), hero.getStarSoul(),
				hero.getSoulFire(), hero.getVipLv(), hero.getZhanGong(), hero.getPrestige(), hero.getTotalStrength(),
				hero.getRebornlv(), hero.getGuanqia().getCurGuanqia(), hero.getTitleId(), hero.getExcaliburId(),
				addition, hero.getPromotionModel().getLevel(), GodWeaponFunction.getIns().getNowGodWeapon(hero), hero.getDestinyExp(),
				hero.getZcBossJf(), monsterSpirit,withLeaderId,withLeaderFid,leaderStarId,leaderSkillId,hero.getReincarnationLevel(),hero.getRealLevel(),taoyuanSwornId,hero.getMountId(),speed);
		//玩家所有战斗属性
		sendFightAttr(hero);
		
		HeroSender.sendCmd_104(hero.getId());
		
		if(hero.getNowCreate() == 1){
			hero.setNowCreate(0);
		}
		//登陆流水
		FlowLoginoutEvent.addFlowLoginInfo(hero, hero.getLoginTime(), hero.getReincarnationLevel());
		//声音
//		HeroSender.sendCmd_148(hero.getId(), hero.getGameSound(), hero.getAutoFight());
		//转生红点
		HeroFunction.getIns().loginRebornUpReadPoint(hero,true);
		//ios充值开启关卡
		HeroSender.sendCmd_166(hero.getId(), HeroCache.getIosChargeGuanka());
		//登录就送VIP3
		HeroFunction.getIns().loginSendVip3(hero);
		//登录发初创职业
		FirstRechargeSender.sendCmd_1964(hero.getId(), hero.getCreateJob());
		if (hero.getNoticestr()==null||!hero.getNoticestr().equals(GlobalCache.getVersion())) {
			HeroSender.sendCmd_172(hero.getId());
		}
		if (HeroCache.getOnOffModel().getOnOffCache()!=null) {
			List<Object[]> typeList = new ArrayList<>();
			for (OnOffTypeEnum onOffTypeEnum : OnOffTypeEnum.values()) {
				int countryType = onOffTypeEnum.getCountryType();
				Integer state = HeroCache.getOnOffModel().getOnOffCache().get(countryType);
				if (state != null) {
					typeList.add(new Object[] { countryType, state });
				}
			}
			GlobalSender.sendCmd_268(hero.getId(), typeList.toArray());
		}
		LogTool.info("IosChargeGuanka :"+HeroCache.getIosChargeGuanka(), HeroEvent.class);
	}
	/**
	 * 玩家所有战斗属性
	 * @param hero
	 */
	public void sendFightAttr(Hero hero){
		FinalFightAttr attr=hero.getFinalFightAttr();
		Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
		Set<Integer> photoCenterSet = hero.getSkill().getPhotoCenterSet();
		Object[] data = new Object[1];
		List<Object[]> skillData = new ArrayList<>();
		List<Object[]> pcData = new ArrayList<>();
		//int job = hero.getJob();
		//Struct_hero_211 heroData = Config_hero_211.getIns().get(job);
		//int[][] skills = heroData.getSkills();
		// skillMap.clear();
		// if(skillMap.size()==0) {
		// for(int j=0;j<skills.length;j++) {
		// skillMap.put(j, new SkillInfo(skills[j][0], 1,0));
		// }
		// if(photoCenterSet==null) {
		// photoCenterSet = new HashSet<>();
		// hero.getSkill().setPhotoCenterSet(photoCenterSet);
		// }
		// photoCenterSet.add(1000);
		// photoCenterSet.add(2000);
		// photoCenterSet.add(3000);
		// }
		for (int site : skillMap.keySet()) {
			SkillInfo skillInfo = skillMap.get(site);
			if(skillInfo==null) {
				continue;
			}
			if(site>SkillConst.skiil_site_4) {
				continue;
			}
			skillData.add(new Object[] { site, skillInfo.getLevel() });
		}
		if(photoCenterSet!=null) {				
			for(Integer pcId : photoCenterSet) {
				pcData.add(new Object[] {pcId});
			}
		}
		List<Object[]> arrList = FightAttrFunction.createAttrSendData(attr);
		data[0] = new Object[] { attr.getUid(), hero.getJob(), arrList.toArray(), skillData.toArray(),
				pcData.toArray() };
		NettyWrite.writeData(hero.getId(), new Object[]{data,hero.getTotalStrength()}, HeroCmd.GC_HeroAttr_110);
	}
	

	@Override
	public void logout(Hero hero) {
		FlowLoginoutEvent.addLoginout(hero);
	}
	/**
	 * 每日官衔俸禄
	 * @param hero
	 */
	private void sendOfficialReward(Hero hero){
		if (hero.getOfficial()>=2) {
			int[][] reward=Config_guanxian_701.getIns().get(hero.getOfficial()).getAward();
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_OFFICE, new Object[] {MailConst.MAIL_ID_OFFICE}, reward);
		}
	}
	@Override
	public void loginReset(Hero hero,int now) {
		resetDayRechargeAndConsmeNum(hero);
		sendOfficialReward(hero);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		resetDayRechargeAndConsmeNum(hero);
		sendOfficialReward(hero);
		//登陆流水
		FlowLoginoutEvent.addFlowLoginInfo(hero, now, hero.getReincarnationLevel());
	}
	/**
	 * 重置收益上限
	 * @param hero
	 */
	public void resetLimitRec(Hero hero){
		Map<Integer, Map<Integer, Integer>> limitRec = hero.getLimitRec();
		if(limitRec!=null){
			limitRec.clear();
		}
	}
	@Override
	public void zeroPub(int now) {
	}
	
	@Override
	public void afterLogin(Hero hero) {
		//判断是否是滚服玩家
		OldPlayerIO.getIns().checkOldPlayer(hero);
	}

	@Override
	public void fixTime(int cmdId,int now) {
//		if (cmdId == 1) {
//			try {
//				String info = UC.getAllCacheSize();
//				LogTool.info("Game Cache Size Info: " + info, HeroEvent.class);
//			} catch (Exception e) {
//				LogTool.error(e, HeroEvent.class, "fixTime, Game Cache Size Info");
//			}
//		}
		if (cmdId == 2) {
			try {
				List<Long> kickOutList = new ArrayList<>();
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for (Hero hero : heroMap.values()) {
					RedPointFunction.getIns().sendUpdateRedPoint(hero);
					try {
						Channel channel = hero.getChannel();
						if(channel!=null) {
							int obsize = hero.getChannel().unsafe().outboundBuffer().size();
							if(obsize>30) {
								kickOutList.add(hero.getId());
								LogTool.info(hero.getId(), hero.getName(), "HeroEvent obsize="+obsize, HeroEvent.class);
							}
						}
					} catch (Exception e) {
						LogTool.error(e, HeroEvent.class, "fixTime kickout hid="+hero.getId());
					}
				}
				for(long hid : kickOutList) {
					KickOutHeroIO.getIns().kickOut(hid);
					LogTool.info(hid, "", "HeroEvent obSize over line, kickout hid="+hid, HeroEvent.class);
				}
				// System.err.println(MemoryHttpEvent.getIns().getSystemInfo());
			} catch (Exception e) {
				LogTool.error(e, HeroEvent.class, "fixTime sendUpdateRedPoint");
			}
			/*try {
				if(TimeDateUtil.getMinute()%5==0) {					
					Class c = Class.forName("java.nio.Bits");
					Field nowMemory = c.getDeclaredField("totalCapacity");
					Field countMemory = c.getDeclaredField("count");
					Field maxMemory = c.getDeclaredField("maxMemory");
					maxMemory.setAccessible(true);
					nowMemory.setAccessible(true);
					countMemory.setAccessible(true);
					LogTool.info("N堆外内存监控  nowMemory="+nowMemory.get(null)+", countMemory="+countMemory.get(null)+", maxMemory="+maxMemory.get(null), HeroEvent.class);
					LogTool.info("N堆外内存监控gc  nowMemory="+nowMemory.get(null), HeroEvent.class);
					System.gc();
					LogTool.info("N堆外内存监控gc  nowMemory="+nowMemory.get(null), HeroEvent.class);
				}
			} catch (Exception e) {
				LogTool.exception(e);
			}*/
		}
		if (cmdId == 3) {
			// 新服公告
//			int openDays = TimeDateUtil.betweenOpen();
//			if (openDays > 7) {
//				return;
//			}
//			try {
//				ChatManager.getIns().broadCast(ChatConst.NEW_SERVER_NOTICE, null);
//			} catch (Exception e) {
//				LogTool.error(e, HeroEvent.class, "fixTime send notice");
//			}
		}
	}
	@Override
	public void levelUp(Hero hero,int newLv,int oldLv){
		//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
	}
	/**
	 * 每日充值/消费充值
	 * @param hero
	 */
	private void resetDayRechargeAndConsmeNum(Hero hero){
		hero.setOneDayConsume(0);
		OfflineNewDayRechargeManager.getIns().sendMailYB(hero);
		hero.setOneDayRecharge(0);
		hero.getOneDayEveryIndexRechargeList().clear();
	}
}
