package com.teamtop.system.taoyuanSworn;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.countryBoss.CountryBossSender;
import com.teamtop.system.boss.qmboss.BossHurtInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.taoyuanSworn.dao.SwornDao;
import com.teamtop.system.taoyuanSworn.dao.TaoyuanSwornDao;
import com.teamtop.system.taoyuanSworn.model.Member;
import com.teamtop.system.taoyuanSworn.model.SortTemplate;
import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossDamgModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_tyjyboss_251;
import excel.config.Config_tyjyrw_251;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_NPC_200;
import excel.struct.Struct_tyjyboss_251;
import excel.struct.Struct_tyjyrw_251;
import excel.struct.Struct_xtcs_004;

public class TaoyuanSwornManager {

	private static TaoyuanSwornManager taoyuanSwornManager;
	private TaoyuanSwornManager() {
		
	}
	public static synchronized TaoyuanSwornManager getIns() {
		if (taoyuanSwornManager == null) {
			taoyuanSwornManager = new TaoyuanSwornManager();
		}
		return taoyuanSwornManager;
	}
	
	/**????????????????????????*/
	public void getInfos(Hero hero, int page) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			//???????????????????????????
			Sworn sworn = hero.getSworn();
			Set<Long> apply = sworn.getApply();
			Iterator<Long> it = apply.iterator();
			while(it.hasNext()) {
				Long id = it.next();
				TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(id);
				if(taoyuanSworn != null) {
					HashMap<Long, Member> appleyMember = taoyuanSworn.getApplyMember();
					Member am = appleyMember.get(hid);
					if(am != null) {
						int applyTime = am.getApplyTime();
						int currTime = TaoyuanSwornFunction.getCurrentTime();
						if(currTime-applyTime > TaoyuanSwornConst.APPLYTIME) {
							it.remove();
							appleyMember.remove(hid);
							//????????????????????????
							Member tMember = TaoyuanSwornFunction.getIns().getMember(id);
							if(tMember != null) {
								boolean bool = HeroFunction.getIns().isOnline(tMember.getHid());
								if(bool) {
									TaoyuanSwornSender.sendCmd_3130(tMember.getHid(), 4, hid, hero.getNameZoneid(), taoyuanSworn.getName(), id);
								}
							}
						}
					}
				}else {
					it.remove();//?????????????????????
				}
			}
			
			List<Object[]> infos = new ArrayList<>();
			int sumPage = 0;
			List<SortTemplate> list = TaoyuanSwornFunction.getIns().sortTaoyuanSwornList(hid);
			int size = list.size();
			if(size > 0) {
				sumPage = size/TaoyuanSwornConst.PAGE_NUM; 
				if(size%TaoyuanSwornConst.PAGE_NUM != 0) {
					sumPage+=1;
				}
				if(page > sumPage) {
					page = sumPage;
				}
				int minNum = TaoyuanSwornConst.PAGE_NUM*(page-1);
				
				int maxNum = page*TaoyuanSwornConst.PAGE_NUM;
				if(maxNum > size) {
					maxNum = size;
				}
				for(int i=minNum; i<maxNum; i++) {
					SortTemplate st = list.get(i);
					if(st != null) {
						infos.add(new Object[] {st.getId(),st.getNum(),st.getName(),(byte)st.getState(),st.getStrength(),st.gethName()});
					}
				}
			}else{
				page = sumPage;
			}
			
			TaoyuanSwornSender.sendCmd_3102(hid, infos.toArray(), page, sumPage);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager getInfos");
		}
	}
	//????????????
	public void openMyGang(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			//??????????????????
			List<Object[]> memberInfo = new ArrayList<>();
			List<Object[]> taskInfo = new ArrayList<>();
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			Sworn sworn = hero.getSworn();
			Map<Integer, Map<Integer, Integer>> taskAwardState = sworn.getTaskAwardState();
			
			String name = taoyuanSworn.getName(); 
			HashMap<Long, Member> member = taoyuanSworn.getMember();
			
			for(Member m : member.values()) {
				long mHid = m.getHid();
				int online = 0;
				boolean bool = HeroFunction.getIns().isOnline(mHid);
				if(!bool) {
					online = TaoyuanSwornFunction.getCurrentTime()-m.getLogoutTime();
					if(online < 0) {
						online = Math.abs(online);
					}
				}
				memberInfo.add(new Object[] {mHid,m.getName(),online,m.getIcon(),m.getFrame(),m.getFlag(),m.getVipLv(),m.getLevel(),m.getStrength()});
			}
			
			List<Map.Entry<Long, Member>> memberList = new ArrayList<Map.Entry<Long, Member>>(member.entrySet());
			//??????
			Collections.sort(memberList, new Comparator<Map.Entry<Long, Member>>() {   
			    public int compare(Map.Entry<Long, Member> o1, Map.Entry<Long, Member> o2) {      
			        return (o1.getValue().getFlag() - o2.getValue().getFlag()); 
			    }
			}); 
			
			//??????????????????
			HashMap<Integer, Set<Long>> taskComplete = taoyuanSworn.getTaskComplete();
			List<Struct_tyjyrw_251> list = Config_tyjyrw_251.getIns().getSortList();
			for(Struct_tyjyrw_251 rw : list) {
				int taskId = rw.getId();
				List<Object[]> userTask = new ArrayList<>();
				Set<Long> taskSet = taskComplete.get(taskId);
				for(Entry<Long, Member> entry : memberList) {
					Member m = entry.getValue();
					if(taskSet == null) {
						HashMap<Integer, Integer> taskMap = m.getSwornTaskMap();
						Integer value = taskMap.get(taskId);
						if(value == null) {
							value=0;
						}
						userTask.add(new Object[] {m.getName(),value});
					}else {
						boolean bool = taskSet.contains(m.getHid());
						if(bool) {
							userTask.add(new Object[] {m.getName(),rw.getCs()});
						}else {
							HashMap<Integer, Integer> taskMap = m.getSwornTaskMap();
							Integer value = taskMap.get(taskId);
							if(value == null) {
								value=0;
							}
							userTask.add(new Object[] {m.getName(),value});
						}
					}
				}
				
				int num = TaoyuanSwornFunction.getIns().getCompleteTaskNumByTaskId(taoyuanSworn, taskId);//??????????????????????????????
				
				Map<Integer, Integer> stateMap = taskAwardState.get(taskId);
				List<Object[]> stateList = new ArrayList<>();
				for(int i=1; i<=TaoyuanSwornConst.MEMBER_NUM; i++) {
					if(num >= i) {
						if(stateMap == null) {
							stateList.add(new Object[] {1});
						}else {
							Integer state = stateMap.get(i);
							if(state != null) {
								stateList.add(new Object[] {2});
							}else {
								stateList.add(new Object[] {1});
							}
						}
					}else {
						if(stateMap != null) {
							Integer state = stateMap.get(i);
							if(state != null) {
								stateList.add(new Object[] {2});
							}else {
								stateList.add(new Object[] {0});
							}
						}else {
							stateList.add(new Object[] {0});
						}
					}
				}
				
				taskInfo.add(new Object[] {rw.getId(),userTask.toArray(),stateList.toArray()});
			}
			TaoyuanSwornSender.sendCmd_3104(hid, memberInfo.toArray(), taskInfo.toArray(), name);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager openMyGang");
		}
	}
	
	/**????????????*/
	public void create(Hero hero, String name) {
		if (hero == null) return;
		long hid = hero.getId();
		try {//1.?????? 2.???????????? 3.???????????? 4.?????????????????? 5.????????????
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
			long id = TaoyuanSwornFunction.getIns().getTaoyuanSwornId(hero);
			if(id > 0) {
				TaoyuanSwornSender.sendCmd_3128(hid, 6, 0);
				return;
			}
			if(name.length() > TaoyuanSwornConst.LEN) {
				TaoyuanSwornSender.sendCmd_3128(hid, 3, 0);
				return;
			}
			int flag = TaoyuanSwornFunction.getIns().checkName(name);
			if(flag > 0) {
				TaoyuanSwornSender.sendCmd_3128(hid, flag, 0);
				return;
			}
			
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.COSTKEY);
			int[][] cost = struct_xtcs_004.getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				TaoyuanSwornSender.sendCmd_3128(hid, 5, 0);
				return;//????????????
			}
			int zoneid = hero.getZoneid();
			Member member = Member.valueOf(hero);
			member.setFlag(TaoyuanSwornConst.BROTHER);
			member.setTips(1);
			TaoyuanSworn taoyuanSworn = TaoyuanSworn.valueOf(name, member, zoneid);
			TaoyuanSwornDao.getDao().insert(taoyuanSworn);
			
			Sworn sworn = hero.getSworn();
			sworn.setTaoyuanSwornId(taoyuanSworn.getId());
			Set<Long> apply = sworn.getApply();
			
			TaoyuanSwornFunction.getIns().delAllApply(hid, name, apply, 0);//????????????????????????
			
			UseAddUtil.use(hero, cost, SourceGoodConst.TAOYUANSWORN_CREATE, true);
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_LOGIN_1, 1);//??????????????????
			TaoyuanSwornSender.sendCmd_3128(hid, 1, taoyuanSworn.getId());
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager create");
		}
	}
	/**??????????????????*/
	public void changeName(Hero hero, String name) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			if(name.length() > TaoyuanSwornConst.LEN) {
				TaoyuanSwornSender.sendCmd_3126(hid, 7);
				return;
			}
			
			int flag = TaoyuanSwornFunction.getIns().checkName(name);
			if(flag > 0) {//1.?????? 2.???????????? 3.?????????????????? 4.?????????????????? 5.??????????????? 6.????????????
				TaoyuanSwornSender.sendCmd_3126(hid, flag);
				return;
			}
			
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			if(name.equals(taoyuanSworn.getName())) {
				TaoyuanSwornSender.sendCmd_3126(hid, 3);
				return;
			}
			
			HashMap<Long, Member> member = taoyuanSworn.getMember();
			Member m = member.get(hid);
			if(m == null) return;
			if(m.getFlag() != TaoyuanSwornConst.BROTHER) {
				TaoyuanSwornSender.sendCmd_3126(hid, 6);
				return;
			}
			
			if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, TaoyuanSwornConst.CHANGE_NAME_ITEM_ID)){
				TaoyuanSwornSender.sendCmd_3126(hid, 5);
				return;
			}
			
			taoyuanSworn.setName(name);
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			UseAddUtil.use(hero, GameConst.TOOL, 1, TaoyuanSwornConst.CHANGE_NAME_ITEM_ID, SourceGoodConst.TAOYUANSWORN_CHANGE_NAME);
			
			TaoyuanSwornSender.sendCmd_3126(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager changeName");
		}
	}
	/**??????????????????*/
	public void applyJoin(Hero hero, long id) {
		if (hero == null) return;
		long hid = hero.getId();
		try {//state ?????????1.?????? 2.????????????????????? 3.????????????????????? 4???????????????????????????????????? 5.????????????????????? 6.??????????????????
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(id);
			if(taoyuanSworn == null) {
				TaoyuanSwornSender.sendCmd_3106(hid, 6, id);
				return;
			}
			long tsId = TaoyuanSwornFunction.getIns().getTaoyuanSwornId(hero);
			if(tsId > 0) {
				TaoyuanSwornSender.sendCmd_3106(hid, 2, id);
				return;
			}
			HashMap<Long, Member> member = taoyuanSworn.getMember();
			int size = member.size();
			if(size >= TaoyuanSwornConst.MEMBER_NUM) {
				TaoyuanSwornSender.sendCmd_3106(hid, 3, id);
				return;
			}
			HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
			if(applyMember.size() >= TaoyuanSwornConst.TS_APPLY_NUM) {
				TaoyuanSwornSender.sendCmd_3106(hid, 4, id);
				return;
			}
			Member aMember = applyMember.get(hid);
			if(aMember != null) {
				TaoyuanSwornSender.sendCmd_3106(hid, 1, id);
				return;
			}
			
			Sworn sworn = hero.getSworn();
			Set<Long> myApply = sworn.getApply();
			if(myApply.size() >= TaoyuanSwornConst.APPLY_NUM) {
				TaoyuanSwornSender.sendCmd_3106(hid, 5, id);
				return;
			}
			Member value = Member.valueOf(hero); 
			applyMember.put(hid, value);
			myApply.add(id);
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			TaoyuanSwornSender.sendCmd_3106(hid, 1, id);
			
			Member m = TaoyuanSwornFunction.getIns().getMember(id);
			TaoyuanSwornSender.sendCmd_3130(m.getHid(), 3, hid, hero.getName(), taoyuanSworn.getName(), id);//????????????
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager applyJoin");
		}
	}
	/**???????????????????????????????????????*/
	public void getApplyMember(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {// [L:??????idU:????????????I:????????????I:???????????????L:????????????B:??????vip]
			List<Object[]> applyList = new ArrayList<>();
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
			List<SortTemplate> list = new ArrayList<SortTemplate>();
			for(Member member : applyMember.values()) {
				list.add(SortTemplate.valueOf(member));
			}
			ApplyMemberComparator comparator = new ApplyMemberComparator();
			Collections.sort(list, comparator);
			for(SortTemplate st : list) {
				applyList.add(new Object[] {st.getHid(),st.gethName(),st.getIcon(),st.getFrame(),st.getStrength(),st.getVipLv()});
			}
			TaoyuanSwornSender.sendCmd_3108(hid, applyList.toArray());
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager getApplyMember");
		}
	}
	
	/**????????????  B:1.?????? 2?????? 3????????????L:??????id*/
	public void approvalApply(Hero hero, int type, long thid) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			long taoyuanSwornId = taoyuanSworn.getId();
			Member member = TaoyuanSwornFunction.getIns().getMember(taoyuanSwornId);//??????
			if(member.getFlag() != TaoyuanSwornConst.BROTHER) {//????????????
				TaoyuanSwornSender.sendCmd_3110(hid, 6, thid);
				return;
			}
//			Hero thero = null;
//			boolean bool = HeroFunction.getIns().isOnline(thid);
//			if(bool) {
//				thero = HeroCache.getHero(thid);
//			}
			
			Hero thero = HeroCache.getHero(thid);
			
			HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
			
			if(type == 2) {
				TaoyuanSwornFunction.getIns().delApplyInfo(thero, taoyuanSwornId);
				applyMember.remove(thid);
				TaoyuanSwornSender.sendCmd_3130(thid, 5, hid, hero.getNameZoneid(), taoyuanSworn.getName(), taoyuanSwornId);
				TaoyuanSwornSender.sendCmd_3110(hid, 2, thid);
			}else if(type == 3) {
				for(long ahid : applyMember.keySet()) {
					TaoyuanSwornFunction.getIns().delApplyMember(taoyuanSwornId, ahid);
					TaoyuanSwornSender.sendCmd_3130(ahid, 5, hid, hero.getNameZoneid(), taoyuanSworn.getName(), taoyuanSwornId);//??????????????????????????????
				}
				applyMember.clear();
				TaoyuanSwornSender.sendCmd_3110(hid, 7, thid);
			}else {
				HashMap<Long, Member> members = taoyuanSworn.getMember();
				if(members.size() >= TaoyuanSwornConst.MEMBER_NUM) {//?????????????????????
					TaoyuanSwornFunction.getIns().delApplyInfo(thero, taoyuanSwornId);
					applyMember.remove(thid);
					TaoyuanSwornSender.sendCmd_3110(hid, 5, thid);
					return;
				}
				
				//??????????????????
				long tTaoyuanSwornId = 0;
				Sworn tsworn = null;
				if(thero != null) {
					tsworn = thero.getSworn();
					tTaoyuanSwornId = TaoyuanSwornFunction.getIns().getTaoyuanSwornId(thero);
				}else {
					tsworn = SwornDao.getIns().getSwornByHid(thid);
					tTaoyuanSwornId = tsworn.getTaoyuanSwornId();
				}
				if(tTaoyuanSwornId > 0) {
					TaoyuanSwornSender.sendCmd_3110(hid, 4, thid);
					return;
				}
				
				//?????????????????????
				Member aMember = applyMember.get(thid);
				if(aMember == null) {
					TaoyuanSwornFunction.getIns().delApplyInfo(thero, taoyuanSwornId);
					TaoyuanSwornSender.sendCmd_3110(hid, 8, thid);
					return;
				}
				
				//TaoyuanSwornFunction.getIns().delApplyInfo(thero, taoyuanSwornId);
				
				//????????????
				int applyTime = aMember.getApplyTime();
				int currTime = TaoyuanSwornFunction.getCurrentTime();
				if(currTime-applyTime > TaoyuanSwornConst.APPLYTIME) {
					//????????????
					applyMember.remove(thid);
					TaoyuanSwornFunction.getIns().delApplyInfo(thero, taoyuanSwornId);
					TaoyuanSwornSender.sendCmd_3110(hid, 3, thid);
					return;
				}
				
				
				int flag = TaoyuanSwornFunction.getIns().getMemberFlag(members);
				aMember.setFlag(flag);
				
				members.put(thid, aMember);
				TaoyuanSwornSender.sendCmd_3110(hid, 1, thid);
				if(thero == null) {
					tsworn.setTaoyuanSwornId(taoyuanSwornId);
					SwornDao.getIns().updateSwornByHid(thid, tsworn);
				}else {
					tsworn.setTaoyuanSwornId(taoyuanSwornId);
					Set<Long> tApply = tsworn.getApply();
					TaoyuanSwornFunction.getIns().delAllApply(thid, thero.getNameZoneid(), tApply, taoyuanSwornId);//????????????????????????
					aMember.setTips(1);
					//B:1???????????? 2?????? 3.??????????????????????????????L:??????idU:????????????U:????????????L:??????id
					TaoyuanSwornSender.sendCmd_3130(thid, 1, hid, hero.getName(), taoyuanSworn.getName(), taoyuanSwornId);//????????????????????????????????????
					TaoyuanSwornFunction.getIns().reshSwornTask(thero, TaoyuanSwornTaskConst.TASK_LOGIN_1, 1);//??????????????????
				}
				//????????????
				applyMember.remove(thid);
				TaoyuanSwornDao.getDao().update(taoyuanSworn);
			}
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager approvalApply");
		}
	}
	/**????????????*/
	public void cancelApply(Hero hero, long id) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			Sworn sworn = hero.getSworn();
			Set<Long> apply = sworn.getApply();
			apply.remove(id);
			
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(id);
			if(taoyuanSworn != null) {
				HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
				applyMember.remove(hid);
				
				Member member = TaoyuanSwornFunction.getIns().getMember(id);
				if(member != null) {//?????????????????????????????????
					boolean bool = HeroFunction.getIns().isOnline(member.getHid());
					if(bool) {
						TaoyuanSwornSender.sendCmd_3130(member.getHid(), 4, hid, hero.getName(), taoyuanSworn.getName(), id);
					}
				}
				TaoyuanSwornDao.getDao().update(taoyuanSworn);
			}
			TaoyuanSwornSender.sendCmd_3112(hid, 1, id);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager cancelApply");
		}
	}
	/**????????????*/
	public void quit(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			long id = taoyuanSworn.getId();
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			if(members.size() == 1) {
				TaoyuanSwornSysCache.removeTaoyuanSworn(id);
				TaoyuanSwornDao.getDao().delete(taoyuanSworn);
			}else {
				Member member = TaoyuanSwornFunction.getIns().getMember(id);
				Member tmember = null;//????????????
				if(hid == member.getHid()) {//????????????
					long strength = 0;
					for(Member m : members.values()) {
						if(m.getStrength()>strength && m.getHid()!=hid) {
							strength = m.getStrength();
							tmember = m;
						}
					}
					tmember.setFlag(TaoyuanSwornConst.BROTHER);
				}
				members.remove(hid);
				TaoyuanSwornDao.getDao().update(taoyuanSworn);
			}
			
			Sworn sworn = hero.getSworn();
			sworn.setTaoyuanSwornId(0);
			
			TaoyuanSwornSender.sendCmd_3114(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager quit");
		}
	}
	/**??????*/
	public void expel(Hero hero, long thid) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			long id = taoyuanSworn.getId();
			Member member = TaoyuanSwornFunction.getIns().getMember(id);
			if(hid != member.getHid()) {//????????????
				TaoyuanSwornSender.sendCmd_3116(hid, 2, thid);
				return;
			}
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			members.remove(thid);
			//Hero thero = TaoyuanSwornFunction.getIns().getOtherhero(thid);
			Hero thero = HeroCache.getHero(thid);
			if(thero == null) {
				Sworn tsworn = SwornDao.getIns().getSwornByHid(thid);
				tsworn.setTaoyuanSwornId(0);
				SwornDao.getIns().updateSwornByHid(hid, tsworn);
			}else {
				Sworn sworn = thero.getSworn();
				sworn.setTaoyuanSwornId(0);
			}
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			//B:1???????????? 2?????? 3.??????????????????????????????L:??????idU:????????????U:????????????L:??????id
			TaoyuanSwornSender.sendCmd_3130(thid, 2, hid, hero.getName(), taoyuanSworn.getName(), id);
			MailFunction.getIns().sendMailWithFujianData2(thid, MailConst.TAOYUANSWORN_EXPEL, new Object[] { MailConst.TAOYUANSWORN_EXPEL }, new int[][] {});
			TaoyuanSwornSender.sendCmd_3116(hid, 1, thid);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager expel");
		}
	}
	/**????????????*/
	public void transfer(Hero hero, long thid) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			long id = taoyuanSworn.getId();
			Member member = TaoyuanSwornFunction.getIns().getMember(id);
			if(hid != member.getHid()) {//????????????
				TaoyuanSwornSender.sendCmd_3120(hid, 2);
				return;
			}
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			Member tMember = members.get(thid);
			if(tMember == null) {
				TaoyuanSwornSender.sendCmd_3120(hid, 3);
				return;
			}
			member.setFlag(tMember.getFlag());
			tMember.setFlag(TaoyuanSwornConst.BROTHER);
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			TaoyuanSwornSender.sendCmd_3120(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager transfer");
		}
	}
	/**????????????*/
	public void applyBrother(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			if(members.size() == 1) return;
			
			long id = taoyuanSworn.getId();
			Member member = TaoyuanSwornFunction.getIns().getMember(id);
			if(hid == member.getHid()) return;
			int outTime = member.getLogoutTime();
			int currTime = TaoyuanSwornFunction.getCurrentTime();
			if(currTime-outTime < TaoyuanSwornConst.OUTTIME) {
				TaoyuanSwornSender.sendCmd_3122(hid, 2);//????????????3?????????????????????
				return;
			}
			Member myMember = members.get(hid);
			member.setFlag(myMember.getFlag());
			myMember.setFlag(TaoyuanSwornConst.BROTHER);
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			TaoyuanSwornSender.sendCmd_3122(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager applyBrother");
		}
	}
	/**????????????*/
	public void recruiting(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			long id = taoyuanSworn.getId();
			Member member = TaoyuanSwornFunction.getIns().getMember(id);
			if(hid != member.getHid()) return;
			ChatManager.getIns().broadCast(ChatConst.TAOYUANSWORN_RECRUITING,new Object[] {hero.getNameZoneid(),TaoyuanSwornConst.SysId}); // ????????????
			TaoyuanSwornSender.sendCmd_3124(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager recruiting");
		}
	}
	/**????????????BOSS??????*/
	public void openTaoyuanBossUI(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {// I:BOSS id 0.?????????U:??????????????????B:???????????????0.???????????? 1.????????? 2.?????????
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			int bossId = taoyuanSworn.getBossId();
			String openBossName = taoyuanSworn.getOpenBossName();
			Sworn sworn = hero.getSworn();
			int awardState = sworn.getBossAwardState();
			int dieState = taoyuanSworn.getDieState();
			if(awardState == 0) {
				if(dieState == 1) {
					awardState = 1;
				}
			}
			int num = TaoyuanSwornFunction.getIns().getCompleteTaskNum(taoyuanSworn);
			int time = TimeDateUtil.getTomorrowZeroTimeReturnInt() - TaoyuanSwornFunction.getCurrentTime();
			TaoyuanSwornSender.sendCmd_3132(hid, bossId, openBossName, awardState, num, time);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager openTaoyuanBossUI");
		}
	}
	
	/**??????????????????*/
	public void getreward(Hero hero, int taskid, int type) {
		if (hero == null) return;
		long hid = hero.getId();
		try {//B:?????????1.?????? 2.???????????? 3.???????????? 4.?????????????????? 5?????????
			Struct_tyjyrw_251 struct_tyjyrw_251 = Config_tyjyrw_251.getIns().get(taskid);
			if(struct_tyjyrw_251 == null) {
				TaoyuanSwornSender.sendCmd_3118(hid, 3, taskid, type);
				return;
			}
			Sworn sworn = hero.getSworn();
			Map<Integer, Map<Integer, Integer>> taskAwardState = sworn.getTaskAwardState();
			Map<Integer, Integer> awardState = taskAwardState.get(taskid);
			if(awardState != null) {
				Integer state = awardState.get(type);
				if(state != null) {
					TaoyuanSwornSender.sendCmd_3118(hid, 5, taskid, type);
					return;
				}
			}else {
				awardState = new HashMap<Integer, Integer>();
				taskAwardState.put(taskid, awardState);
			}
			
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			int num = TaoyuanSwornFunction.getIns().getCompleteTaskNumByTaskId(taoyuanSworn, taskid);
			if(type > num) {
				TaoyuanSwornSender.sendCmd_3118(hid, 4, taskid, type);
				return;
			}
			
			int[][] reward = null;
			switch(type) {
			case 1 : reward = struct_tyjyrw_251.getReward1(); break;
			case 2 : reward = struct_tyjyrw_251.getReward2(); break;
			case 3 : reward = struct_tyjyrw_251.getReward3(); break;
			default : 
				TaoyuanSwornSender.sendCmd_3118(hid, 3, taskid, type);
				return;
			}
			if(reward != null) {
				boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
				if(!canAdd){
					TaoyuanSwornSender.sendCmd_3118(hid, 2, taskid, type);
					return;
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.TAOYUANSWORN_GETREWARD, UseAddUtil.getDefaultMail(), true);
			}
			
			awardState.put(type, 2);
			
			TaoyuanSwornSender.sendCmd_3118(hid, 1, taskid, type);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager getreward");
		}
	}
	/**????????????BOSS??????*/
	public void getBossReward(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {//B:1.?????? 2.???????????? 3.?????????????????? 4?????????
			Sworn sworn = hero.getSworn();
			int state = sworn.getBossAwardState();
			if(state == 2) {//?????????
				TaoyuanSwornSender.sendCmd_3136(hid, 4);
				return;
			}
			
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
//			long taoyuanSwornId = taoyuanSworn.getId();
//			TaoyuanBossModel taoyuanBossModel = TaoyuanSwornSysCache.getTaoyuanSwornBossMap().get(taoyuanSwornId);
//			if(taoyuanBossModel == null) {
//				TaoyuanSwornSender.sendCmd_3136(hid, 3);
//				return;
//			}
			
			int dieState = taoyuanSworn.getDieState();
			if(dieState == 0) {//boss ?????????
				TaoyuanSwornSender.sendCmd_3136(hid, 3);
				return;
			}
			
			
			int bossId = taoyuanSworn.getBossId();
			Struct_tyjyboss_251 struct_tyjyboss_251 = Config_tyjyboss_251.getIns().get(bossId);
			if(struct_tyjyboss_251 == null) {
				sworn.setBossAwardState(0);
				TaoyuanSwornSender.sendCmd_3136(hid, 3);
				return;
			}
			int[][] reward = struct_tyjyboss_251.getReward();
			boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
			if(!canAdd){
				TaoyuanSwornSender.sendCmd_3136(hid, 2);
				return;
			}
			sworn.setBossAwardState(2);
			UseAddUtil.add(hero, reward, SourceGoodConst.TAOYUANSWORN_BOSSREWARD, UseAddUtil.getDefaultMail(), true);
			TaoyuanSwornSender.sendCmd_3136(hid, 1);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager getBossReward");
		}
	}
	
	/**????????????BOSS*/
	public void chooseBoss(Hero hero, int bossId) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			String name = hero.getNameZoneid();
			if(taoyuanSworn.getBossId() > 0) {
				TaoyuanSwornSender.sendCmd_3134(hid, 2, bossId, name);
				return;
			}
			int completeNum = TaoyuanSwornFunction.getIns().getCompleteTaskNum(taoyuanSworn);
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.CHOOSEBOSS);
			int sysNum = struct_xtcs_004.getNum();
			if(completeNum < sysNum) {
				TaoyuanSwornSender.sendCmd_3134(hid, 3, bossId, name);
				return;
			}
			
			Struct_tyjyboss_251 struct_tyjyboss_251 = Config_tyjyboss_251.getIns().get(bossId);
			if(struct_tyjyboss_251 == null) {
				TaoyuanSwornSender.sendCmd_3134(hid, 5, bossId, name);
				return;
			}
			int[][] consume = struct_tyjyboss_251.getConsume();
			if(consume != null) {
				if (!UseAddUtil.canUse(hero, consume)) {
					TaoyuanSwornSender.sendCmd_3134(hid, 4, bossId, name);
					return;
				}
				UseAddUtil.use(hero, consume, SourceGoodConst.TAOYUANSWORN_CHOOSEBOSS, true);
			}
			
//			HashMap<Long, Member> members = taoyuanSworn.getMember();
//			for(Member member : members.values()) {
//				long thid = member.getHid();
//				Hero thero = TaoyuanSwornFunction.getIns().getOtherhero(thid);
//				if(thero != null) {
//					Sworn sworn = thero.getSworn();
//					sworn.setBossAwardState(0);
//				}
//			}
			
			taoyuanSworn.setBossId(bossId);
			taoyuanSworn.setOpenBossName(hero.getNameZoneid());
			taoyuanSworn.setDieState(0);
			TaoyuanSwornDao.getDao().update(taoyuanSworn);
			
			TaoyuanSwornSender.sendCmd_3134(hid, 1, bossId, name);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager chooseBoss");
		}
	}
	
	/**??????BOSS*/
	public void challengeBOSS(Hero hero) {
		if (hero == null) return;
		long hid = hero.getId();
		try {//B:1.?????? 2.boss????????????3????????????????????? 4.??????BOSS?????????
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn == null) return;
			int bossid = taoyuanSworn.getBossId();
			if(bossid == 0) {
				TaoyuanSwornSender.sendCmd_3138(hid, 4, bossid);
				return;
			}
			int dieState = taoyuanSworn.getDieState();
			if (dieState==1) {
				CountryBossSender.sendCmd_3204(hero.getId(), 2, bossid);
				return;
			}
			
			long taoyuanSwornId = taoyuanSworn.getId();
			TaoyuanBossModel taoyuanBossModel = TaoyuanSwornSysCache.getTaoyuanBossModel(taoyuanSwornId);
			if(taoyuanBossModel == null) {
				Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(bossid);
				//long taoyuanSwornId = taoyuanSworn.getId(); 
				if(taoyuanBossModel == null) {
					taoyuanBossModel = new TaoyuanBossModel();
				}
				long curhp = taoyuanSworn.getCurhp();
				if(curhp > 0) {
					taoyuanSworn.setCurhp(0);
					taoyuanBossModel.setCurhp(curhp);
				}else {
					taoyuanBossModel.setCurhp(struct_NPC_200.getHp());
				}
				taoyuanBossModel.setBossId(bossid);
				taoyuanBossModel.setTaoyuanSwornId(taoyuanSwornId);
				taoyuanBossModel.setHpmax(struct_NPC_200.getHp());
				taoyuanBossModel.getDamgList().clear();
				taoyuanBossModel.getInHeros().clear();
				
				TaoyuanSwornSysCache.getTaoyuanSwornBossMap().put(taoyuanSworn.getId(), taoyuanBossModel);
			}
			
			if (taoyuanBossModel.getBossId() != bossid) {
				CountryBossSender.sendCmd_3204(hero.getId(), 2, bossid);
				return;
			}
			if (taoyuanBossModel.getInHeros().contains(hero.getId())) {
				CountryBossSender.sendCmd_3204(hero.getId(), 3,bossid);
				return;
			}
			
			List<TaoyuanBossDamgModel> rankList = taoyuanBossModel.getDamgList();
			TaoyuanBossDamgModel model = new TaoyuanBossDamgModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getNameZoneid());
				rankList.add(model);
			}else{
				model = rankList.get(rankList.indexOf(model));
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			model.setInTime(TimeDateUtil.getCurrentTime());
			
			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(bossid);
			long hurt = (long) struct_NPC_200.getAtt();
			FinalFightAttr target = BattleFunction.initNPC(bossid);
			long damg =(long) Math.max(BattleFunction.calcDamg(fightAttr, target),1);
			
			BossHurtInfo bossHurtInfo=new BossHurtInfo();
			bossHurtInfo.setBossId(taoyuanBossModel.getBossId());
			bossHurtInfo.setOnehurtAB(damg);
			bossHurtInfo.setOnehurtBA(hurt);
			
			model.setBossHurtInfo(bossHurtInfo);
			taoyuanBossModel.getInHeros().add(hero.getId());
			
			TaoyuanSwornSender.sendCmd_3138(hid, 1, bossid);
			for (int j = 0; j < taoyuanBossModel.getInHeros().size(); j++) {
				long h=taoyuanBossModel.getInHeros().get(j);
				Hero hero1=HeroCache.getHero(h);
				HeroFunction.getIns().sendBattleHeroAttr(hero1, hero.getId());
				HeroFunction.getIns().sendBattleHeroAttr(hero, h);
			}
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager challengeBOSS");
		}
	}
	
	/**??????/??????/???????????????????????? ??????BOSS*/
	public void quitTaoyuanBoss(Hero hero, int type) {
		if (hero == null) return;
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) {
				return;
			}
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn != null) {
				long taoyuanSwornId = taoyuanSworn.getId();
				TaoyuanBossModel taoyuanBossModel = TaoyuanSwornSysCache.getTaoyuanBossModel(taoyuanSwornId);
				if(taoyuanBossModel == null) return;
				if(type == 0) {//0.?????? 
					if(taoyuanBossModel!= null) {
						List<Long> inHeros = taoyuanBossModel.getInHeros();
						if (inHeros.contains(hid)) {
							if(inHeros.size()==1 && taoyuanSworn.getDieState()==1) {
								TaoyuanSwornDao.getDao().update(taoyuanSworn);
							}
							taoyuanBossModel.getInHeros().remove(hid);
						}
					}
				} else if(type == 1) {//1??????
					if(taoyuanSworn.getDieState() == 1) {
						TaoyuanSwornSender.sendCmd_3142(hid, 1, 0);
						return;
					}
					Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(TaoyuanSwornConst.FUHUO_YB);
					int fuhuoCost = struct_xtcs_004.getNum();
					if(UseAddUtil.canUse(hero, GameConst.YUANBAO, fuhuoCost)) {
						UseAddUtil.use(hero, GameConst.YUANBAO, fuhuoCost, SourceGoodConst.TAOYUAN_BOSS_FUHUO, true);
						List<TaoyuanBossDamgModel> damgList = taoyuanBossModel.getDamgList();
						TaoyuanBossDamgModel model = new TaoyuanBossDamgModel();
						model.setHid(hid);
						if(damgList.contains(model)){
							model = damgList.get(damgList.indexOf(model));
						}
						model.fullHp();
						List<Long> inheroList = taoyuanBossModel.getInHeros();
						ArrayList<Object[]> lives = new ArrayList<>();
						lives.add(new Object[] {hid});
						TaoyuanSwornFunction.getIns().broadliveHero(inheroList, lives);//??????????????????
					}else {
						TaoyuanSwornSender.sendCmd_3142(hid, 2, type);
						return;
					}
				}else if(type == 2){//2????????????????????????
					List<TaoyuanBossDamgModel> damgList = taoyuanBossModel.getDamgList();
					TaoyuanBossDamgModel model = new TaoyuanBossDamgModel();
					model.setHid(hid);
					if(damgList.contains(model)){
						model = damgList.get(damgList.indexOf(model));
					}
					int deadTime = TaoyuanSwornFunction.getCurrentTime(); 
					model.setDeadTime(deadTime);
					model.getAttrmap().setHp(0);
					
					List<Object[]> dieList = new ArrayList<Object[]>();
					List<Long> inheroList = taoyuanBossModel.getInHeros();
					for(long thid : inheroList) {
						Hero thero = TaoyuanSwornFunction.getIns().getOtherhero(thid);
						if(thero!=null && thero.isOnline()){
							dieList.add(new Object[] {hid});
							TaoyuanSwornSender.sendCmd_3144(thid, dieList.toArray());//??????????????????
						}
					}
				}else {
					return;
				}
			}
			TaoyuanSwornSender.sendCmd_3142(hid, 1, type);
		}catch (Exception e) {
			LogTool.error(e, TaoyuanSwornManager.class, hid, hero.getName(), "TaoyuanSwornManager quitTaoyuanBoss");
		}
	}

}
