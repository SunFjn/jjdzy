package com.teamtop.system.event.backstage.events.backstage.loginInfo;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.account.Account;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.event.backstage.events.backstage.HoutaiCache;
import com.teamtop.system.event.backstage.events.backstage.register.B_Register;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mission_243;
import excel.struct.Struct_mission_243;

/**
 * 登陆登出流水
 * @author hepl
 *
 */
public class FlowLoginoutEvent extends AbsBackstageEvent {
	
	@Override
	public void executeOneMin(int currTime) {
		save();
	}
	
	@Override
	public void shutdownServer() {
		save();
	}
	
	private void save(){
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowLoginInfo>> flowLoginInfoCache = HoutaiCache.getFlowLoginInfoCache();
		try {
			BackstageDao.insertBatch(flowLoginInfoCache);
		} catch (Exception e) {
			LogTool.error(e, FlowLoginoutEvent.class, "flowLoginInfoCache save error!");
		}
		
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowLoginout>> logoutCache = HoutaiCache.getFlowLogoutInfoCache();
		try {
			BackstageDao.insertBatch(logoutCache);
		} catch (Exception e) {
			LogTool.error(e, FlowLoginoutEvent.class, "logoutCache save error!");
		}
	}
	
	/**
	 * 添加一条登陆流水记录（每次登录记录）
	 * @param hero
	 * @param now 角色登录时间或零点重置时间
	 */
	public static void addFlowLoginInfo(Hero hero, int now, int reincarnationLevel) {
		int zoneid = hero.getZoneid();
		//String date = TimeDateUtil.getCurrentDateTimeStr("yyyyMMdd");
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowLoginInfo>> loginInfoCache = HoutaiCache.getFlowLoginInfoCache();
		ConcurrentLinkedQueue<B_FlowLoginInfo> queue = loginInfoCache.get(zoneid);
		if(queue == null){
			queue = new ConcurrentLinkedQueue<B_FlowLoginInfo>();
			loginInfoCache.put(zoneid, queue);
		}
		try {
			B_FlowLoginInfo flow = new B_FlowLoginInfo();
			TempData tempData = hero.getTempData();
			if (tempData==null) {
				return;
			}
			Account account=tempData.getAccount();
			if (account==null) {
				return;
			}
			B_Register b_Register=tempData.getB_Register();
			if (b_Register==null) {
				return;
			}
					
			flow.setHid(hero.getId());
			flow.setOpenid(hero.getOpenid());
			flow.setLevel(hero.getLevel());
			flow.setZoneid(zoneid);
			flow.setVipLevel(hero.getVipLv());
			flow.setLogintime(now);
			flow.setRegtime(account.getCreatetime());
			flow.setLoginip(hero.getLoginIp());
			flow.setLoginpfcode(account.getPfcode());
			flow.setPfcode(b_Register.getPfcode());
			flow.setUsesys(account.getUsesys());
			flow.setLoginsys(account.getLoginsys());
			flow.setApp_custom(account.getApp_custom());
			flow.setTotalStrength(hero.getTotalStrength());
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
		} catch (Exception e) {
			LogTool.error(e, FlowLoginoutEvent.class, hero.getId(), hero.getNameZoneid(), "addFlowLoginInfo err");
		}
	}
	
	/**
	 * 插入登录登出流水(一次一条),会在每次登出时插入
	 * @param hero 角色
	 * @param operType 玩家登出操作 1.刷新,2.正常登出,3.被迫下线,4.封号下线
	 */
	public static void addLoginout(Hero hero){
		int zoneid = hero.getZoneid();
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowLoginout>> loginOutCache = HoutaiCache.getFlowLogoutInfoCache();
		ConcurrentLinkedQueue<B_FlowLoginout> queue = loginOutCache.get(hero.getZoneid());
		if(queue == null){
			queue = new ConcurrentLinkedQueue<B_FlowLoginout>();
			loginOutCache.put(hero.getZoneid(), queue);
		}
		long hid = hero.getId();
		try {
			TempData tempData = hero.getTempData();
			if (tempData==null) {
				return;
			}
			Account account=tempData.getAccount();
			if (account==null) {
				return;
			}
			B_Register b_Register=tempData.getB_Register();
			if (b_Register==null) {
				return;
			}
			int nowTaskId=hero.getTaskUser().getTaskid();
			int beforeTaskId=hero.getBeforeTaskId();
			Struct_mission_243 struct_mission_243 = Config_mission_243.getIns().get(nowTaskId);
			String beforeTask="";
			String nowTask="";
			if (struct_mission_243!=null) {
				nowTask=struct_mission_243.getTips();
			}
			Struct_mission_243 mission_243=Config_mission_243.getIns().get(beforeTaskId);
			if (mission_243!=null) {
				beforeTask=mission_243.getTips();
			}
			
			B_FlowLoginout flow = new B_FlowLoginout();
			
			flow.setHid(hero.getId());
			flow.setOpenid(hero.getOpenid());
			flow.setLevel(hero.getLevel());
			flow.setJob(hero.getCreateJob());
			flow.setZoneid(zoneid);
			flow.setVipLevel(hero.getVipLv());
			flow.setLoginpfcode(account.getPfcode());
			flow.setPfcode(b_Register.getPfcode());
			flow.setNowTask(nowTask);
			flow.setBeforeTask(beforeTask);
			flow.setBeforeTime(hero.getBeforeTime());
			flow.setLogoutTime(TimeDateUtil.getCurrentTime());
			flow.setTotalStrength(hero.getTotalStrength());
			flow.setReincarnationLevel(hero.getReincarnationLevel());
			queue.add(flow);
		} catch (Exception e) {
			LogTool.error(e, FlowLoginoutEvent.class, hid, hero.getNameZoneid(), "insertLoginout err");
		}
	}
	
}
