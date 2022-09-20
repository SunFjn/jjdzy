package com.teamtop.system.firstRechargeNew;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xsc_731;
import excel.struct.Struct_xsc_731;

public class FirstRechargeNewFunction {

	private static FirstRechargeNewFunction ins;

	private FirstRechargeNewFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeNewFunction getIns() {
		if (ins == null) {
			ins = new FirstRechargeNewFunction();
		}
		return ins;
	}

	public void firstRecharge(Hero hero, int productId) {
		try {
			int index = getIndex(productId, hero);
			if (index == 0) {
				LogTool.warn("FirstRechargeNewFunction firstRecharge hid=" + hero.getId() + ", pid=" + productId,
						FirstRechargeNewFunction.class);
				return;
			}
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			if (firstRechargeAward.keySet().contains(index)) {
				return;
			}
			firstRechargeAward.put(index, FirstRechargeNewConst.CAN_GET);
			FirstRechargeNewManager.getIns().openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewFunction.class, hero.getId(), hero.getName(),
					"FirstRechargeNewFunction firstRecharge");
		}
	}

	public int getIndex(int productId, Hero hero) {
		List<Struct_xsc_731> sortList = Config_xsc_731.getIns().getSortList();
		int size = sortList.size();
		Struct_xsc_731 excel = null;
		int createJob = hero.getCreateJob();
		for (int i = 0; i < size; i++) {
			excel = sortList.get(i);
			if (excel.getId() == productId&& excel.getZhiye() == createJob) {
				return excel.getIndex();
			}else if(excel.getId() == productId&& excel.getZhiye() == 0) {
				return excel.getIndex();
			}
		}
		return 0;
	}

	/** 红点检测 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, FirstRechargeNewConst.SysId)) {
				return false;
			}
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			Iterator<Integer> iterator = firstRechargeAward.values().iterator();
			for (; iterator.hasNext();) {
				Integer state = iterator.next();
				if (state != null && state == FirstRechargeNewConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewFunction.class, hero.getId(), hero.getName(),
					"FirstRechargeNewFunction checkRedPoint");
		}
		return false;
	}

	/** 更新红点 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, FirstRechargeNewConst.SysId,
						FirstRechargeNewConst.RedPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, FirstRechargeNewConst.SysId,
						FirstRechargeNewConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewFunction.class, hero.getId(), hero.getName(),
					"FirstRechargeNewFunction updateRedPoint");
		}
	}

	/** 检测ICON */
	public void checkIcon(Hero hero) {
		try {
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			int size = Config_xsc_731.getIns().getSortList().size();
			if (firstRechargeAward.size() == size) {
				int getNum = 0;
				Integer state = null;
				Iterator<Integer> iterator = firstRechargeAward.values().iterator();
				for (; iterator.hasNext();) {
					state = iterator.next();
					if (state != null && state == FirstRechargeNewConst.ALREADY_GET) {
						getNum += 1;
					}
				}
				if (getNum < size) {
					HeroFunction.getIns().addLoginSytemState(hero, FirstRechargeNewConst.SysId,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
				} else {
					HeroFunction.getIns().addLoginSytemState(hero, FirstRechargeNewConst.SysId,
							SystemStateEnum.StateEnum.NOT_OPEN.getState());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewFunction.class, hero.getId(), hero.getName(),
					"FirstRechargeNewFunction checkIcon");
		}
	}

	/** 当天首次登录 */
	public void fristLoginToday(Hero hero, int gq) {
		try {
			Guanqia guanqia = hero.getGuanqia();
			int curGuanqia = guanqia.getCurGuanqia();
			if(curGuanqia < FirstRechargeNewConst.GUANG_QIA) {
				return;
			}
			
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			int size = Config_xsc_731.getIns().getSortList().size();
			int getNum = 0;
//			if (firstRechargeAward.size() == size) {
				Integer state = null;
				Iterator<Integer> iterator = firstRechargeAward.values().iterator();
				for (; iterator.hasNext();) {
					state = iterator.next();
					if (state != null && state == FirstRechargeNewConst.ALREADY_GET) {
						getNum += 1;
					}
				}
//				firstRechargeAward.get(1);
				if (getNum >= size) {
					return;
				}
//			}
			
 			int logoutTime = hero.getFirstRechargeCloseUITime();
			boolean sameDay = TimeDateUtil.isSameDay(logoutTime*1000l, TimeDateUtil.getCurrentTimeInMillis());
//			if((getNum==0)||(getNum==1)|| gq==13|| gq==18|| gq==26) {
			if((!sameDay&& getNum==0)||(!sameDay&& getNum==1)|| gq==13|| gq==18|| gq==26) {
				FirstRechargeNewSender.sendCmd_2756(hero.getId());
//				hero.setFirstRechargeCloseUITime(TimeDateUtil.getCurrentTime());
			}
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewFunction.class, hero.getId(), hero.getName(),
					"FirstRechargeNewFunction checkIcon");
		}
	}
}
