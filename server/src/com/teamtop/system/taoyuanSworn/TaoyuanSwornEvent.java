package com.teamtop.system.taoyuanSworn;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.taoyuanSworn.dao.TaoyuanSwornDao;
import com.teamtop.system.taoyuanSworn.model.Member;
import com.teamtop.system.taoyuanSworn.model.SortTemplate;
import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.log.LogTool;

public class TaoyuanSwornEvent extends AbsSystemEvent {

	private static TaoyuanSwornEvent taoyuanSwornEvent;

	private TaoyuanSwornEvent() {
	}

	public static synchronized TaoyuanSwornEvent getIns() {
		if (taoyuanSwornEvent == null) {
			taoyuanSwornEvent = new TaoyuanSwornEvent();
		}
		return taoyuanSwornEvent;
	}

	@Override
	public void init(Hero hero) {
		Sworn sworn = hero.getSworn();
		if(sworn == null) {
			sworn = new Sworn();
			sworn.setHid(hero.getId());
			sworn.setTaskAwardState(new HashMap<Integer, Map<Integer,Integer>>());
			sworn.setApply(new HashSet<Long>());
			hero.setSworn(sworn);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
		Sworn sworn = hero.getSworn();
		Set<Long> apply = sworn.getApply();
		TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
		if(taoyuanSworn != null) {
			//处理义盟成员
			HashMap<Long, Member> members = taoyuanSworn.getMember();
			Iterator<Entry<Long, Member>> it = members.entrySet().iterator();
			while(it.hasNext()) {
				Entry<Long, Member> m = it.next();
				Long thid = m.getKey();
				if(thid != hero.getId()) {
					Hero thero = TaoyuanSwornFunction.getIns().getOtherhero(thid);
					if(thero != null) {
						Sworn tsworn = thero.getSworn();
						long tid = tsworn.getTaoyuanSwornId();
						if(tid==0 || tid!=taoyuanSworn.getId()) {
							it.remove();
						}
					}
				}
					
				Member mb = m.getValue();
				int tips = mb.getTips();
				if(tips==0 && hero.getId()==mb.getHid()) {
					mb.setTips(1);
					Member tm = TaoyuanSwornFunction.getIns().getMember(taoyuanSworn.getId());
					TaoyuanSwornSender.sendCmd_3130(hero.getId(), 1, tm.getHid(), tm.getName(), taoyuanSworn.getName(), taoyuanSworn.getId());
				}
			}
			//处理义盟申请成员
			HashMap<Long, Member> applyMember = taoyuanSworn.getApplyMember();
			Iterator<Member> aIt = applyMember.values().iterator();
			while(aIt.hasNext()) {
				Member m = aIt.next();
				long thid = m.getHid();
				Hero thero = TaoyuanSwornFunction.getIns().getOtherhero(thid);
				if(thero != null) {
					Sworn tsworn = thero.getSworn();
					Set<Long> tApply = tsworn.getApply();
					if(!tApply.contains(taoyuanSworn.getId())) {
						aIt.remove();
					}
				}
			}
			
			TaoyuanSwornFunction.getIns().loginRed(hero);//红点
			TaoyuanSwornFunction.getIns().delAllApply(hero.getId(), hero.getNameZoneid(), apply, 0);//删除所有申请信息
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_LOGIN_1, 1);//桃园结义任务
		}else {
			Iterator<Long> it = apply.iterator();
			while(it.hasNext()) {
				Long id = it.next();
				TaoyuanSworn tTaoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(id);
				if(tTaoyuanSworn != null) {
					HashMap<Long, Member> appleyMember = tTaoyuanSworn.getApplyMember();
					Member member = appleyMember.get(hero.getId());
					if(member == null) {
						it.remove();//不在对方申请列表里，删除
					}
				}else {
					it.remove();//对方义盟义解散
				}
			}
		}
	}
	
	@Override
	public void logout(Hero hero){
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
			TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
			if(taoyuanSworn != null) {
				long taoyuanSwornId = taoyuanSworn.getId();
				TaoyuanBossModel taoyuanBossModel = TaoyuanSwornSysCache.getTaoyuanBossModel(taoyuanSwornId);
				if(taoyuanBossModel != null) {
					taoyuanBossModel.getInHeros().remove(hero.getId());
				}
				TaoyuanSwornDao.getDao().update(taoyuanSworn);
			}
		} catch (Exception e) {
			LogTool.error(e, TaoyuanSwornEvent.class, hero.getId(), hero.getName(), "TaoyuanSwornEvent logout");
		}
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	/**零点个人结义信息重置处理*/
	@Override
	public void zeroHero(Hero hero,int now){
		if (!HeroFunction.getIns().checkSystemOpen(hero, TaoyuanSwornConst.SysId)) return;
		Sworn sworn = hero.getSworn();
		sworn.setBossAwardState(0);
		///sworn.setTaskAwardState(new HashMap<Integer, Map<Integer,Integer>>());//移动到补发奖励处重置
		
		TaoyuanSworn taoyuanSworn = TaoyuanSwornFunction.getIns().getTaoyuanSworn(hero);
		if(taoyuanSworn != null) {
			//taoyuanSworn.setCurhp(0);
			int time = TaoyuanSwornFunction.getCurrentTime(); 
			taoyuanSworn.setTime(time);
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_LOGIN_1, 1);//桃园结义任务
		}
	}
	
	/**义盟信息重置及清理超过7天未登陆义盟*/
	@Override
	public void zeroPub(int now){
		try {
			int currTime = TaoyuanSwornFunction.getCurrentTime();
			List<SortTemplate> list = TaoyuanSwornFunction.getIns().sortTaoyuanSwornList(0);
			for(SortTemplate sortTemplate : list) {
				long id = sortTemplate.getId();
				ConcurrentHashMap<Long, TaoyuanSworn> map = TaoyuanSwornSysCache.getMap();
				TaoyuanSworn taoyuanSworn = map.get(id);
				if(taoyuanSworn != null) {
					int time = taoyuanSworn.getTime();
					if(currTime-time > TaoyuanSwornConst.ALLOUTTIME) {
						map.remove(id);
						TaoyuanSwornDao.getDao().delete(taoyuanSworn);
					}else {
						TaoyuanSwornFunction.getIns().replacementReward(taoyuanSworn);//桃园结义奖励补发
						HashMap<Long, Member> members = taoyuanSworn.getMember();
						for(Member member : members.values()) {
							member.getSwornTaskMap().clear();
						}
						taoyuanSworn.setBossId(0);
						taoyuanSworn.setOpenBossName("");
						taoyuanSworn.setCurhp(0);
						taoyuanSworn.setDieState(0);
						taoyuanSworn.getTaskComplete().clear();
						TaoyuanSwornDao.getDao().update(taoyuanSworn);
					}
					
					//零点重置，所有玩家退出副本
					TaoyuanBossModel boss = TaoyuanSwornSysCache.getTaoyuanBossModel(id);
					if(boss != null) {
						List<Long> inHeros = boss.getInHeros();
						for(long hid : inHeros) {
							TaoyuanSwornSender.sendCmd_3142(hid, 1, 0);
						}
					}
				}
			}
			
			ConcurrentHashMap<Long, TaoyuanBossModel> taoyuanBossModelMap = TaoyuanSwornSysCache.getTaoyuanSwornBossMap();
			if(taoyuanBossModelMap != null) {
				taoyuanBossModelMap.clear();
			}
		} catch (Exception e) {
			LogTool.error(e, TaoyuanSwornEvent.class, "TaoyuanSwornEvent zeroPub");
		}
	}
	
}
