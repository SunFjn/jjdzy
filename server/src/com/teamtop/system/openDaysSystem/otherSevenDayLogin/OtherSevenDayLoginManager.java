package com.teamtop.system.openDaysSystem.otherSevenDayLogin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_scdlhb_272;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_scdlhb_272;

public class OtherSevenDayLoginManager extends AbsOpenDaysManager {
	
	private static OtherSevenDayLoginManager ins;
	public static OtherSevenDayLoginManager getIns(){
		if(ins == null) {
			ins = new OtherSevenDayLoginManager();
		}
		return ins;
	}
	
	
	@Override
	public void openUI(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SEVENDAYLOGIN)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SEVENDAYLOGIN);
		/*Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		int end = hdfl_012.getEnd();
		int openDays = TimeDateUtil.betweenOpen();
		int days = openDays - open + 1;*/
		OtherSevenDayLogin data = (OtherSevenDayLogin) getSystemModel(hero, uid);
		Map<Integer, OtherSevenDayLoginData> dataMap = data.getDataMap();
		OtherSevenDayLoginEvent.getIns().login(hero);// 玩家等级一开始不达到八门金锁要求
		Map<Integer, Integer> checkDay = data.getCheckDay();
		int day = checkDay.size();// 玩家登录活动天数 按顺序领取奖励
		if (day > 7) {
			day = 7;
		}
		List<Object[]> sendData = new ArrayList<>();
		for (int i = 1; i <= 7; i++){
			OtherSevenDayLoginData dataOneDay = dataMap.get(i);
			int state=0;             
			if(dataOneDay==null){					
				sendData.add(new Object[] { i , state , null  });
			}else{
				state = dataOneDay.getAwardsGet();
				List<Object[]> prop = dataOneDay.getProps();
				if(prop==null) {
					sendData.add(new Object[] { i , state , null   });	
				}else {				
				sendData.add(new Object[] { i , state , prop.toArray()   });
				}
			}
		}
		ArrayList<Object> noticeList = new ArrayList<>();
		List<OtherSevenDayLoginModel> awardNoticeList = OtherSevenDayLoginCache.getAwardNoticeList();
		for (int i=0;i<awardNoticeList.size();i++) {
			noticeList.add(new Object[] { awardNoticeList.get(i).getName(), awardNoticeList.get(i).getAward(),
					awardNoticeList.get(i).getAwardId(), awardNoticeList.get(i).getAwardNum() });
		}		
		OtherSevenDayLoginSender.sendCmd_5472(hero.getId(), sendData.toArray(),noticeList.toArray(), day);
	}
	
	public void getAwards(Hero hero, int day) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SEVENDAYLOGIN)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SEVENDAYLOGIN);
		OtherSevenDayLogin dataAll = (OtherSevenDayLogin) getSystemModel(hero, uid);		
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		
		int openDays = TimeDateUtil.betweenOpen();
		int days = open+day-1;
		
		if (days > openDays) {
			return;
		}
		
		if(dataAll == null){
			//null
			OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 2, null, day);
			return;
		} 

		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SEVENDAYLOGIN)) {
			//系统未开启
			OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 3, null , day);
			return;
		}
		Struct_scdlhb_272 excel = Config_scdlhb_272.getIns().get(day);
		if( excel==null){
			//配置表不存在
			OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 4, null , day);
			return;
		}
		
		Map<Integer, OtherSevenDayLoginData> dataMap = dataAll.getDataMap();
		OtherSevenDayLoginData dataOneDay = dataMap.get(day);
		if( dataOneDay==null){
			return;
		}
		int awardsGet = dataOneDay.getAwardsGet();
		if( awardsGet==0){
			  return;
			}
		
		if(awardsGet == OtherSevenDayLoginConst.TYPE_AWARD_GET){
			//已领取
			OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 5, null ,day);
			return;
		}		

	
		String big = excel.getBig();	
		List<Object> awardNoticeList = new ArrayList<Object>();// 拆的大奖要公布的奖品列表		
		 List<Object[]> propTips = new ArrayList<Object[]>();//七日红包登录随机物品领取
		 List<ProbabilityEventModel> pelist = OtherSevenDayLoginCache.getRewardMap().get(day);
		 int size = pelist.size();
			List<int[]> propArr = new ArrayList<int[]>();
			for (int i = 0; i < size; i++) {
				ProbabilityEventModel pe = pelist.get(i);
				int bigState = 0;
				int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
				if (js != null) {										
						String propId = String.valueOf(js[1]);	
						if(big.contains(propId)) {//大奖奖励							
							bigState=1;		
							awardNoticeList.add(new Object[] { hero.getName(),js[0], js[1] , js[2]});
						}
						propTips.add(new Object[] { js[0], js[1], js[2] , bigState});
						propArr.add(js);									
				}
			}
			int[][] drops = new int[propArr.size()][];
			int[][] array = propArr.toArray(drops);
			if (!UseAddUtil.canAdd(hero, array, false)) {
				//背包满了
				OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 6 , propTips.toArray()  , day);
				return;
			}
			UseAddUtil.add(hero, array, SourceGoodConst.SEVENDAYLOGIN, null, false);
			
			for (Object obj : awardNoticeList) {
				Object[] objArray = (Object[]) obj;
			refreshAwardNoticeList(hero, (int) objArray[2], (int) objArray[3]);
			}
			/*	if (awardNoticeList.size() != 0) {
				Set<Long> heroIdSet = HeroCache.getHeroMap().keySet();// 获取在线玩家id
				for (long hid : heroIdSet) {
					OtherSevenDayLoginSender.sendCmd_5476(hid, awardNoticeList.toArray());// 给所有在线玩家推送获奖公告
				}
			}*/
			
			OtherSevenDayLoginSender.sendCmd_5474(hero.getId(), 1 , propTips.toArray()  , day);			
		dataOneDay.setAwardsGet( OtherSevenDayLoginConst.TYPE_AWARD_GET);		
		dataOneDay.setProps(propTips);
		
//		openUI(hero);
	}
	
	

	/**
	 * @param hero
	 * @param type  1登录
	 */
	public void chackRed(Hero hero){
		int betweenOpen = TimeDateUtil.betweenOpen();
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SEVENDAYLOGIN);
		if (uid == -1) {
			return;
		}
		int end = Config_hdfl_012.getIns().get(uid).getEnd();
		int open = Config_hdfl_012.getIns().get(uid).getOpen();
		if (betweenOpen >= open && betweenOpen <= end) {
			OtherSevenDayLogin data = (OtherSevenDayLogin) getSystemModel(hero, uid);
			Map<Integer, OtherSevenDayLoginData> dataMap = data.getDataMap();
			Iterator<Integer> iterator = dataMap.keySet().iterator();
			for(;iterator.hasNext();){
				Integer id = iterator.next();				
				OtherSevenDayLoginData dataOneDay = dataMap.get(id);
				if(dataOneDay == null){
					continue;
				}
				int awardsGet = dataOneDay.getAwardsGet();								
					if( awardsGet == OtherSevenDayLoginConst.TYPE_AWARD_GET){				
					continue;
				}else if(awardsGet != OtherSevenDayLoginConst.TYPE_AWARD_GET&&awardsGet != 0){
					//有可领								
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, OtherSevenDayLoginConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SEVENDAYLOGIN, OtherSevenDayLoginConst.RED_1, RedPointConst.HAS_RED);						
						return;
																				
				}														
			}
		}
	}			
			
	/**
	 * 刷新获奖公告列表
	 * 
	 * @param hero
	 * @param awardId 为0用来改名
	 */
	public void refreshAwardNoticeList(final Hero hero, final int awardId , final int awardNum) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<OtherSevenDayLoginModel> awardNoticeList = OtherSevenDayLoginCache.getAwardNoticeList();
					if (awardId == 0) {
						for (OtherSevenDayLoginModel OtherSevenDayLoginModel : awardNoticeList) {
							if (OtherSevenDayLoginModel.getId() == hero.getId()) {
								OtherSevenDayLoginModel.setName(hero.getName());
							}
						}
					} else {
						OtherSevenDayLoginModel OtherSevenDayLoginModel = new OtherSevenDayLoginModel();
						OtherSevenDayLoginModel.setId(hero.getId());
						OtherSevenDayLoginModel.setName(hero.getName());
						OtherSevenDayLoginModel.setAwardId(awardId);
						OtherSevenDayLoginModel.setAwardNum(awardNum);
						int size = awardNoticeList.size();
						if (size < OtherSevenDayLoginConst.AWARD_NOTICE_NUM) {
							awardNoticeList.add(OtherSevenDayLoginModel);
						} else {
							awardNoticeList.remove(0);
							awardNoticeList.add(OtherSevenDayLoginModel);
						}
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.OVERTURNTABLE_AWARDNOTICE;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "OverTurntableFunction refreshAwardNoticeList has wrong");
		}
	}
	
	
	@Override
	public void handleOpenPub() {
		

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		

	}

	@Override
	public void handleEndPub() {
	

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
	

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherSevenDayLogin otherSevenDayLogin = (OtherSevenDayLogin) opSysDataMap.get(uid);
		if (otherSevenDayLogin == null) {
			otherSevenDayLogin = new OtherSevenDayLogin();
			otherSevenDayLogin.setDataMap(new HashMap<>());	
		}
		return otherSevenDayLogin;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherSevenDayLogin.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherSevenDayLoginEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {

	}

}
