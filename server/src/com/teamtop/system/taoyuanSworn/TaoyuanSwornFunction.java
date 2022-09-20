package com.teamtop.system.taoyuanSworn;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.system.boss.countryBoss.CountryBossFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.taoyuanSworn.dao.SwornDao;
import com.teamtop.system.taoyuanSworn.dao.TaoyuanSwornDao;
import com.teamtop.system.taoyuanSworn.model.Member;
import com.teamtop.system.taoyuanSworn.model.SortTemplate;
import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossDamgModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_tyjyboss_251;
import excel.config.Config_tyjyrw_251;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_tyjyboss_251;
import excel.struct.Struct_tyjyrw_251;
import excel.struct.Struct_xtcs_004;

public class TaoyuanSwornFunction {
	private static TaoyuanSwornFunction taoyuanSwornFunction;

	private TaoyuanSwornFunction() {
	}

	public static synchronized TaoyuanSwornFunction getIns() {
		if (taoyuanSwornFunction == null) {
			taoyuanSwornFunction = new TaoyuanSwornFunction();
		}
		return taoyuanSwornFunction;
	}
	
	/**获得当前时间（秒）*/
	public static int getCurrentTime() {
		//int time2 = (int)(DateUtil.getCurrentTime()/1000);
		int time = TimeDateUtil.getCurrentTime();
		return time;
	}
	
	/**获得桃园结义ID*/
	public long getTaoyuanSwornId(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return 0;
			Sworn sworn = hero.getSworn();
			long id = sworn.getTaoyuanSwornId();
			if(id > 0) {
				TaoyuanSworn ts = TaoyuanSwornSysCache.getMap().get(id);
				if(ts == null) {//义盟解散了
					sworn.setTaoyuanSwornId(0);
					return 0;
				}else {
					HashMap<Long, Member> member = ts.getMember();
					Member m = member.get(hero.getId());
					if(m == null) {//被踢了
						sworn.setTaoyuanSwornId(0);
						return 0;
					}
				}
				return id;
			}else {
				Set<Long> apply = sworn.getApply();
				for(long tid : apply) {
					TaoyuanSworn ts = TaoyuanSwornSysCache.getMap().get(tid);
					if(ts != null) {
						HashMap<Long, Member> members = ts.getMember();
						Member member = members.get(hero.getId());
						if(member != null) {
							sworn.setTaoyuanSwornId(tid);
							return tid;
						}
					}
				}
				return 0;
			}
		} catch (Exception e) {
			LogTool.error(e, TaoyuanSwornFunction.class, hero.getId(), hero.getName(), "TaoyuanSwornFunction getTaoyuanSwornId");
		}
		return 0;
	}
	
	/**获得我的义盟*/
	public TaoyuanSworn getTaoyuanSworn(Hero hero) {
		long id = getTaoyuanSwornId(hero);
		if(id > 0) {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornSysCache.getMap().get(id);
			if(taoyuanSworn != null) {
				taoyuanSworn.setTime(getCurrentTime());
				refreshTaoyuanSworn(taoyuanSworn);
				return taoyuanSworn;
			}
		}
		return null;
	}
	
	/**根据义盟id获得义盟*/
	public TaoyuanSworn getTaoyuanSworn(long taoyuanSwornId) {
		TaoyuanSworn taoyuanSworn = TaoyuanSwornSysCache.getMap().get(taoyuanSwornId);
		return taoyuanSworn;
	}
	
	/**获得成员(大哥)*/
	public Member getMember(long taoyuanSwornId) {
		TaoyuanSworn taoyuanSworn = getTaoyuanSworn(taoyuanSwornId);
		HashMap<Long, Member> member = taoyuanSworn.getMember();
		for(Member m : member.values()) {
			if(TaoyuanSwornConst.BROTHER == m.getFlag()) {
				return m;
			}
		}
		return null;
	}
	
	/**刷新义盟成员信息*/
	public void refreshTaoyuanSworn(TaoyuanSworn taoyuanSworn) {
		int time = getCurrentTime();
		HashMap<Long, Member> member = taoyuanSworn.getMember();
		for(Member m : member.values()) {
			long hid = m.getHid();
			boolean bool = HeroFunction.getIns().isOnline(hid);
			if(bool) {
				Hero hero = HeroCache.getHero(hid);
				if(hero != null) {
					taoyuanSworn.setTime(time);
					TaoyuanSworn.refreshMember(hero, taoyuanSworn);
				}
			}
		}
	}
	
	/**验证名称*/
	public int checkName(String name) {
		//1成功，2非法字符，3名字没有改变，4名字已经存在，5没有改名道具
		if(StringUtils.isBlank(name)) {
			return 2;
		}
		//非法openId
		if(!IlliegalUtil.isNameIll(name, Integer.MAX_VALUE)){
			return 2;
		}
		//简单防注入验证
		String CHECKSQL = ".*([';]+|(--)+).*";
		if(Pattern.matches(CHECKSQL,name)){
			return 2;
		}
		
		Map<Long, TaoyuanSworn> map = TaoyuanSwornSysCache.getMap();
		for(TaoyuanSworn ts : map.values()) {
			if(name.equals(ts.getName())){
				return 4;
			}
		}
		return 0;
	}
	
	/**排序义盟*/
	public List<SortTemplate> sortTaoyuanSwornList(long hid) {
		Map<Long, TaoyuanSworn> map = TaoyuanSwornSysCache.getMap();
		List<SortTemplate> list = new ArrayList<SortTemplate>();
		for(TaoyuanSworn ts : map.values()) {
			refreshTaoyuanSworn(ts);
			SortTemplate sortT = SortTemplate.valueOf(hid,ts);
			list.add(sortT);
		}
		TaoyuanSwornComparator comparator = new TaoyuanSwornComparator();
		Collections.sort(list, comparator);
		return list;
	}
	
	/**拒绝申请，删除申请成员*/
	public void delApplyMember(long taoyuanSwornId, long thid) {
		boolean bool = HeroFunction.getIns().isOnline(thid);
		if(bool) {
			Hero thero = HeroCache.getHero(thid);
			delApplyInfo(thero, taoyuanSwornId);
		}
	}
	
	/**对方义盟解散，删除我的结义申请信息*/
	public void delApplyInfo(Hero hero,long taoyuanSwornId) {
		if(hero != null) {
			Sworn sworn = hero.getSworn();
			Set<Long> apply = sworn.getApply();
			apply.remove(taoyuanSwornId);
		}
	}
	
	/**获得成员地位标识*/
	public int getMemberFlag(HashMap<Long, Member> members) {
		int flag = members.size()+1;
		for(Member m : members.values()) {
			if(m.getFlag() == flag) {
				m.setFlag(flag-1);
			}
		}
		return flag;
	}
	
	/**获得对方hero对象，null不在线*/
	public Hero getOtherhero(long thid) {
		Hero thero = null;
		boolean bool = HeroFunction.getIns().isOnline(thid);
		if(bool) {
			thero = HeroCache.getHero(thid);
		}
		return thero;
	}
	
	/**获得总的任务完成次数*/
	public int getCompleteTaskNum(TaoyuanSworn taoyuanSworn) {
		int totalNum = 0;
		HashMap<Integer, Set<Long>> taskComplete = taoyuanSworn.getTaskComplete();
		for(Set<Long> set : taskComplete.values()) {
			totalNum += set.size();
		}
		
		return totalNum;
	}
	/**获得单个任务完成次数*/
	public int getCompleteTaskNumByTaskId(TaoyuanSworn taoyuanSworn, int taskId) {
		int num = 0;
		HashMap<Integer, Set<Long>> taskComplete = taoyuanSworn.getTaskComplete();
		Set<Long> set = taskComplete.get(taskId);
		if(set != null) {
			num = set.size();
		}
		return num;
	}
	
	/**触发桃园结义任务*/
	public void reshSwornTask(Hero hero, int taskId, int value) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			Member member = members.get(hid);
			HashMap<Integer, Integer> taskMap = member.getSwornTaskMap();
			Integer num = taskMap.get(taskId);
			if(num == null) {
				num = value;
				taskMap.put(taskId, num);
			}else {
				num += value;
				taskMap.put(taskId, num);
			}
			
			Struct_tyjyrw_251 struct_tyjyrw_251 = Config_tyjyrw_251.getIns().get(taskId);
			int cs = struct_tyjyrw_251.getCs();
			if(num < cs) {
				TaoyuanSwornDao.getDao().update(taoyuanSworn);
			}else {
				HashMap<Integer, Set<Long>> taskComplete = taoyuanSworn.getTaskComplete();
				Set<Long> set = taskComplete.get(taskId);
				if(set == null) {
					set = new HashSet<Long>();
					set.add(hid);
					taskComplete.put(taskId, set);
					TaoyuanSwornDao.getDao().update(taoyuanSworn);
					fastUpdateRed(hero);
				}else {
					if(!set.contains(hid)) {
						set.add(hid);
						TaoyuanSwornDao.getDao().update(taoyuanSworn);
						fastUpdateRed(hero);
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornFunction.class, hid, hero.getName(), "TaoyuanSwornFunction reshSwornTask");
		}
	}
	
	/**
	 * 每秒桃园boss的战斗状态监测
	 * @param boss 目标boss
	 * @param nowTime 当前时间
	 * @param key 目标boss key
	 * @param senddata 是否同步给前段
	 */
	public boolean scheduleAttCoutryBoss(TaoyuanBossModel boss,int now,int time,boolean senddata) {
		boolean bossDead = false;
		try {
			//计算伤害
			List<TaoyuanBossDamgModel> rankList = boss.getDamgList();
			List<Long> inheroList = boss.getInHeros();
			List<Object[]> hurtList = new ArrayList<Object[]>();
			List<Object[]> restLive = null;
			int nowTime=TimeDateUtil.getCurrentTime();
			if(inheroList.size()>0 && rankList.size()>0){
				for(TaoyuanBossDamgModel model :rankList){
					if(!bossDead){
						//boss攻击的对象
						if(nowTime - model.getInTime()>=1){
							Hero hero = HeroCache.getHero(model.getHid());
							if(hero!=null && hero.isOnline() && inheroList.contains(hero.getId())){
								FinalFightAttr attr = model.getAttrmap();
								long curhp = attr.getHp();
								if(curhp<=0 && now-model.getDeadTime() >= time){//自动复活
									if(restLive == null) {
										restLive = new ArrayList<Object[]>();
									}
									model.fullHp();
									curhp = attr.getHp();
									restLive.add(new Object[] {model.getHid()});
									//continue;
								}
								
								if(curhp <= 0){
									continue;
								}
								
								boolean die = attBoss(model,boss);
								if(die){
									bossDead = true;
								}
							}
						}
					}
				}
				
				//发送数据
				if(senddata || bossDead){
					for (TaoyuanBossDamgModel model : rankList) {
						hurtList.add(new Object[]{model.getName(),model.getHurt()});
					}
					Object[] hurtArr = hurtList.toArray();
					
					long hpmax = (long) boss.getHpmax();
					long curhp = (long) boss.getCurhp();
					for (int i = 0; i < rankList.size(); i++) {
						TaoyuanBossDamgModel bossAttModel = rankList.get(i);
						Hero h = HeroCache.getHero(bossAttModel.getHid());
						
						if(h!=null && h.isOnline() && inheroList.contains(h.getId())){
							TaoyuanSwornSender.sendCmd_3140(bossAttModel.getHid(), bossAttModel.getCurhp(), hpmax, curhp, (long)(bossAttModel.getHurt()), hurtArr);
							if(bossDead){
								TaoyuanSwornSender.sendCmd_3146(bossAttModel.getHid());
								TaoyuanSwornSender.sendCmd_3142(h.getId(), 1, 0);
								boss.getInHeros().remove(h.getId());
							}
							if(restLive != null) {
								TaoyuanSwornSender.sendCmd_3148(h.getId(), restLive.toArray());
							}
						}
					}
				}
				
				if(bossDead) {
					long taoyuanSwornId = boss.getTaoyuanSwornId();
					TaoyuanSworn taoyuanSworn = getTaoyuanSworn(taoyuanSwornId);
					if(taoyuanSworn != null) {
						int dieState = taoyuanSworn.getDieState();
						if(dieState == 0) {
							taoyuanSworn.setDieState(1);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CountryBossFunction.class, "scheduleAttCoutryBoss has wrong");
		}
		return bossDead;
	}
	
	/**
	 * 计算攻击boss伤害
	 * @param hero
	 * @param qmboss
	 * @return
	 */
	public boolean attBoss(TaoyuanBossDamgModel model,TaoyuanBossModel boss){
		long hurt = 0;
		double damg =model.getBossHurtInfo().getOnehurtAB();
		hurt +=damg;
		double curhp = boss.getCurhp();
		curhp = curhp - hurt;
		boss.setCurhp(curhp);
		boolean die = false;
		if(boss.getCurhp()<=0){
			die = true;
			boss.setCurhp(0);
		}
		if(hurt>0){
			sortCountryBossHurt(model, hurt, boss);
		}
		return die;
	}
	
	public void sortCountryBossHurt(TaoyuanBossDamgModel model,double hurt,TaoyuanBossModel boss){
		TaoyuanBossDamgModel countryBossDamgModel = new TaoyuanBossDamgModel();
		countryBossDamgModel.setHid(model.getHid());
		List<TaoyuanBossDamgModel> rankList = boss.getDamgList();
		int indexOf = rankList.indexOf(countryBossDamgModel);
		if(indexOf<0){
			countryBossDamgModel.setHid(model.getHid());
			countryBossDamgModel.setName(model.getName());
			countryBossDamgModel.setHurt((long)hurt);
			rankList.add(countryBossDamgModel);
		}else{
			countryBossDamgModel = rankList.get(indexOf);
			countryBossDamgModel.setName(model.getName());
			countryBossDamgModel.setHurt(countryBossDamgModel.getHurt()+(long)hurt);
			countryBossDamgModel.setHid(model.getHid());
		}
	}
	
	/**
	 * 登录推送图标显示红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
			TaoyuanSworn taoyuanSworn = getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			//申请红点
			long taoyuanSwornId = taoyuanSworn.getId();
			Member member = getMember(taoyuanSwornId);
			if(member.getHid() == hero.getId()) {
				HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
				if(applyMember.size() > 0) {
					RedPointFunction.getIns().addLoginRedPoint(hero,  TaoyuanSwornConst.SysId, RedPointConst.RED_1, RedPointConst.HAS_RED);
				}
			}
			
			Sworn sworn = hero.getSworn();
			//Boss 奖励红点
			int bossId = taoyuanSworn.getBossId();
			if(bossId > 0) {
				int bossAwardState = sworn.getBossAwardState();
				if(bossAwardState != 2) {
					int dieState = taoyuanSworn.getDieState();
					if(dieState == 1) {
						RedPointFunction.getIns().addLoginRedPoint(hero,  TaoyuanSwornConst.SysId_Boss, RedPointConst.RED_1, RedPointConst.HAS_RED);
					}
				}
			}else {
				int completeNum = getCompleteTaskNum(taoyuanSworn);
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.CHOOSEBOSS);
				int sysNum = struct_xtcs_004.getNum();
				if(completeNum >= sysNum) {
					RedPointFunction.getIns().addLoginRedPoint(hero,  TaoyuanSwornConst.SysId_Boss, RedPointConst.RED_1, RedPointConst.HAS_RED);
				}
			}
			
			//义盟奖励红点
			Map<Integer, Map<Integer, Integer>> taskAwardState = sworn.getTaskAwardState();
			List<Struct_tyjyrw_251> list = Config_tyjyrw_251.getIns().getSortList();
			for(Struct_tyjyrw_251 rw : list) {
				int taskId = rw.getId();
				int num = TaoyuanSwornFunction.getIns().getCompleteTaskNumByTaskId(taoyuanSworn, taskId);//获得单个任务完成次数
				Map<Integer, Integer> stateMap = taskAwardState.get(taskId);
				for(int i=1; i<=TaoyuanSwornConst.MEMBER_NUM; i++) {
					if(num >= i) {
						if(stateMap != null) {
							Integer state = stateMap.get(i);
							if(state == null) {
								RedPointFunction.getIns().addLoginRedPoint(hero,  TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
								return;
							}
						}else {
							RedPointFunction.getIns().addLoginRedPoint(hero,  TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
							return;
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TaoyuanSwornFunction loginRed 登录推送图标显示红点  异常");
		}
	}
	
	/**
	 * 更新图标红点
	 * @param hero
	 */
	public void fastUpdateRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
			TaoyuanSworn taoyuanSworn = getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			//int dieState = taoyuanSworn.getDieState();
			//if(dieState == 1) return;
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			for(long thid : members.keySet()) {
				Hero thero = getOtherhero(thid);
				if(thero != null) {
					Sworn sworn = thero.getSworn();
					//Boss 奖励红点
					int bossId = taoyuanSworn.getBossId();
					if(bossId == 0) {
						int completeNum = getCompleteTaskNum(taoyuanSworn);
						Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.CHOOSEBOSS);
						int sysNum = struct_xtcs_004.getNum();
						if(completeNum >= sysNum) {
							//RedPointFunction.getIns().fastUpdateRedPoint(hero, TaoyuanSwornConst.SysId_Boss, RedPointConst.RED_1, RedPointConst.HAS_RED);
							RedPointFunction.getIns().updateRedPoint(thero, TaoyuanSwornConst.SysId_Boss, RedPointConst.RED_1, RedPointConst.HAS_RED);
						}
					}
					
					//义盟奖励红点
					Map<Integer, Map<Integer, Integer>> taskAwardState = sworn.getTaskAwardState();
					List<Struct_tyjyrw_251> list = Config_tyjyrw_251.getIns().getSortList();
					for(Struct_tyjyrw_251 rw : list) {
						int taskId = rw.getId();
						int num = TaoyuanSwornFunction.getIns().getCompleteTaskNumByTaskId(taoyuanSworn, taskId);//获得单个任务完成次数
						Map<Integer, Integer> stateMap = taskAwardState.get(taskId);
						for(int i=1; i<=TaoyuanSwornConst.MEMBER_NUM; i++) {
							if(num >= i) {
								if(stateMap != null) {
									Integer state = stateMap.get(i);
									if(state == null) {
										//RedPointFunction.getIns().fastUpdateRedPoint(hero, TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
										RedPointFunction.getIns().updateRedPoint(thero, TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
										return;
									}
								}else {
									//RedPointFunction.getIns().fastUpdateRedPoint(hero, TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
									RedPointFunction.getIns().updateRedPoint(thero, TaoyuanSwornConst.SysId_Task, RedPointConst.RED_1, RedPointConst.HAS_RED);
									return;
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TaoyuanSwornFunction fastUpdateRed 登录推送图标显示红点  异常");
		}
	}
	
	/**
	 * 义盟奖励补发
	 * @param hero
	 */
	public void replacementReward(TaoyuanSworn taoyuanSworn) {
		try {
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			for(long hid : members.keySet()) {
				//桃园结义BOSS奖励补发
				Sworn sworn = null;
				//Hero thero = getOtherhero(hid);
				Hero thero = HeroCache.getHero(hid);
				//boolean isOnline = false;//是否在线：true.在线
				if(thero == null) {
					sworn = SwornDao.getIns().getSwornByHid(hid);
				}else {
					//isOnline = true;
					sworn = thero.getSworn();
				}
				if(sworn == null) continue;
				int bossId = taoyuanSworn.getBossId();
				if(bossId > 0) {
					int dieState = taoyuanSworn.getDieState();
					if(dieState == 1) {
						int bossAwardState = sworn.getBossAwardState();
						if(bossAwardState != 2) {
//							sworn.setBossAwardState(2);
//							if(!isOnline) {
//								SwornDao.getIns().updateSwornByHid(hid, sworn);
//							}
							Struct_tyjyboss_251 struct_tyjyboss_251 = Config_tyjyboss_251.getIns().get(bossId);
							if(struct_tyjyboss_251 != null) {
								int[][] reward = struct_tyjyboss_251.getReward();
								MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.TAOYUANSWORN_BOSSAWARD, new Object[] { MailConst.TAOYUANSWORN_BOSSAWARD }, reward);
							}
						}
					}
				}
				
				//桃园结义任务奖励补发
				Map<Integer, Map<Integer, Integer>> taskAwardState = sworn.getTaskAwardState();
				HashMap<Integer, Set<Long>> taskComplete = taoyuanSworn.getTaskComplete();
				for(Entry<Integer,Set<Long>> entry : taskComplete.entrySet()) {
					int taskId = entry.getKey();
					int num = entry.getValue().size();
					Map<Integer, Integer> awardState = taskAwardState.get(taskId);
					Struct_tyjyrw_251 struct_tyjyrw_251 = Config_tyjyrw_251.getIns().get(taskId);
					if(struct_tyjyrw_251 == null) continue;
					for(int i=1; i<=TaoyuanSwornConst.MEMBER_NUM; i++) {
						if(num >= i) {
							if(awardState != null) {
								Integer state = awardState.get(i);
								if(state != null) {
									continue;//已领
								}
							}
//							else {
//								awardState = new HashMap<Integer, Integer>();
//								taskAwardState.put(taskId, awardState);
//							}
							int[][] reward = null;
							switch(i) {
							case 1 : reward = struct_tyjyrw_251.getReward1(); break;
							case 2 : reward = struct_tyjyrw_251.getReward2(); break;
							case 3 : reward = struct_tyjyrw_251.getReward3(); break;
							}
							if(reward != null) {
								//awardState.put(i, 2);
								MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.TAOYUANSWORN_TASKAWARD, new Object[] { MailConst.TAOYUANSWORN_TASKAWARD }, reward);
							}
						}
						
					}
				}
				//个人领奖状态重置
				sworn.setTaskAwardState(new HashMap<Integer, Map<Integer,Integer>>());
				if(thero == null) {
					SwornDao.getIns().updateSwornByHid(hid, sworn);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, taoyuanSworn.getId(), taoyuanSworn.getName(), "TaoyuanSwornFunction replacementReward 义盟奖励补发及重置  异常");
		}
	}
	
	/**
	 * 广播玩家复活
	 */
	public void broadliveHero(List<Long> inheroList,ArrayList<Object[]> lives) {
		for(long hid : inheroList) {
			Hero hero = getOtherhero(hid);
			if(hero!=null && hero.isOnline()){
				TaoyuanSwornSender.sendCmd_3148(hero.getId(), lives.toArray());
			}
		}
	}
	
	/**
	 * 删除所有申请包括对方义盟申请列表
	 */
	public void delAllApply(long hid,String name,Set<Long> apply,long myTaoyuanSwornId) {
		if(apply.size() > 0) {
			for(long taoyuanSwornId : apply) {
				TaoyuanSworn t = TaoyuanSwornFunction.getIns().getTaoyuanSworn(taoyuanSwornId);
				if(t != null) {
					HashMap<Long, Member> applyMember = t.getApplyMember();
					applyMember.remove(hid);
					//通知大哥
					Member tMember = TaoyuanSwornFunction.getIns().getMember(t.getId());
					if(tMember != null) {
						boolean bool = HeroFunction.getIns().isOnline(tMember.getHid());
						if(bool) {
							if(taoyuanSwornId != myTaoyuanSwornId) {
								TaoyuanSwornSender.sendCmd_3130(tMember.getHid(), 4, hid, name, t.getName(), taoyuanSwornId);
							}
						}
					}
				}
			}
			apply.clear();
		}
	}
}
