package com.teamtop.system.guanqia;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_BOSS_205;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_BOSS_205;


/**
 * 关卡
 */
public class GuanqiaSystemEvent extends AbsSystemEvent{
	private static GuanqiaSystemEvent ins = null;

	private GuanqiaSystemEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GuanqiaSystemEvent getIns() {
		if (ins == null) {
			ins = new GuanqiaSystemEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		Guanqia guanqia = hero.getGuanqia();
		if(guanqia==null){
			guanqia = new Guanqia();
			hero.setGuanqia(guanqia);
			guanqia.setHid(hero.getId());
			guanqia.setCurGuanqia(1);
			guanqia.setBigGuanqia(1);
			//金甲兵
			guanqia.setJingJiaPro(GuanqiaConst.JINGJIA_BASEPRO);
			int[] jingJiaSateByGuan=new int[] {1,0};
			guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
			
			OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {
				
				@Override
				public void run() {
					SystemEventFunction.triggerPassGuanqiaEvent(hero, 1);
				}
				
				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return hero.getId();
				}
			});
//			SystemEventFunction.triggerPassGuanqiaEvent(hero, 1);
		} else {
			int bigGuanqia = guanqia.getBigGuanqia();
			int curGuanqia = guanqia.getCurGuanqia();
			if (bigGuanqia == 0) {
				bigGuanqia = GuanqiaFunction.getIns().getBigGuanqia(curGuanqia);
				if (bigGuanqia < 1) {
					bigGuanqia = 1;
				}
				guanqia.setBigGuanqia(bigGuanqia);
			}
			//金甲兵
			guanqia.setJingJiaPro(GuanqiaConst.JINGJIA_BASEPRO);
			int[] jingJiaSateByGuan=new int[] {curGuanqia,0};
			guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
		}
	}

	@Override
	public void login(Hero hero) {
		int logoutTime = hero.getLogoutTime();
		int now = TimeDateUtil.getCurrentTime();
		int offtime = now - logoutTime;
		long exp = 0;
		long coin = 0;
		long starSoul = 0;
		int equipNum = 0;
		Guanqia guanqia = hero.getGuanqia();
		int curGuanqia = guanqia.getCurGuanqia();
		List<int[]> equipDropList = new ArrayList<int[]>();
		List<int[]> toolDropList = new ArrayList<int[]>();
		List<Object[]> toolSendList = new ArrayList<>();
		if(logoutTime==0){
			offtime=0;
		}
		if(offtime>GuanqiaConst.OFFLINE_DROP_MAX_TIME){
			offtime = GuanqiaConst.OFFLINE_DROP_MAX_TIME;
		}
		int showtime = offtime;
		if(offtime>=TimeDateUtil.ONE_MINUTE){
			//  离线收益时间最长48小时，超过48小时后面的收益为0
			Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);

			int[][] auto = struct_BOSS_205.getAuto();
			int length = auto.length;
			for (int i = 0; i < length; i++) {
				int[] js = auto[i];
				if (js != null) {
					int type = js[0];
					int num = js[2];
					int coefficient = Config_xtcs_004.getIns().get(GuanqiaConst.HANG_COEFFICIENT).getNum();
					num = (int) (num * ((double) offtime / TimeDateUtil.ONE_HOUR_INT) * coefficient);
					if (num == 0) {
						continue;
					}
					if (type == GameConst.GENDROP) {
						ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
						for (int j = 1; j <= num; j++) {
							js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							type = js[0];
							if (type == GameConst.EQUIP) {
								equipDropList.add(new int[] { type, js[1], 1 });
							} else {
								toolDropList.add(new int[] { type, js[1], 1 });
							}
						}
					} else {
						if (type == GameConst.COIN) {
							coin += num;
						} else if (type == GameConst.EXP) {
							exp += num;
						} else if (type == GameConst.EQUIP) {
							equipDropList.add(new int[] { type, js[1], num });
						} else if (type == GameConst.STARSOUL) {
							starSoul += num;
						} else {
							toolDropList.add(new int[] { type, js[1], num });
						}
					}
				}
			}

			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			int equipDropSize = equipDropList.size();
			int tempEquipNum = equipEmptyGrid;
			List<int[]> tempEquipDropList = new ArrayList<int[]>();
			for (int i = 0; i < equipDropSize; i++) {
				int[] js = equipDropList.get(i);
				if (js[2] >= tempEquipNum) {
					tempEquipDropList.add(new int[] { js[0], js[1], tempEquipNum });
					equipNum += tempEquipNum;
					break;
				} else {
					tempEquipNum -= js[2];
					tempEquipDropList.add(js);
					equipNum += js[2];
				}
			}
			equipDropList = tempEquipDropList;
			int[][] toolDropArr = new int[toolDropList.size()][];
			toolDropList.toArray(toolDropArr);
			for (int[] data : toolDropList) {
				toolSendList.add(new Object[] { data[1], data[2] });
			}
			int[][] equipDropArr = new int[equipDropList.size()][];
			equipDropList.toArray(equipDropArr);
			// 经验加成
			if (exp > 0) {
				int addition = GuanqiaFunction.getIns().getAddition(hero);
				exp = exp * (100 + addition) / 100;
			}
			if (exp > Integer.MAX_VALUE) {
				exp = Integer.MAX_VALUE;
			}
			if (coin > Integer.MAX_VALUE) {
				coin = Integer.MAX_VALUE;
			}
			if (starSoul > Integer.MAX_VALUE) {
				starSoul = Integer.MAX_VALUE;
			}
			UseAddUtil.add(hero, GameConst.EXP, (int) exp, SourceGoodConst.GUANQIA_OFFLINE, false);
			UseAddUtil.add(hero, GameConst.COIN, (int) coin, SourceGoodConst.GUANQIA_OFFLINE, false);
			UseAddUtil.add(hero, GameConst.STARSOUL, (int) starSoul, SourceGoodConst.GUANQIA_OFFLINE, false);
			UseAddUtil.add(hero, toolDropArr, SourceGoodConst.GUANQIA_OFFLINE, null, false);
			UseAddUtil.add(hero, equipDropArr, SourceGoodConst.GUANQIA_OFFLINE, null, false);
		}
//		if (offtime >= TimeDateUtil.ONE_MINUTE) {
		int bigGuanqia = guanqia.getBigGuanqia();
		Iterator<Integer> iterator = guanqia.getBigRewardSet().iterator();
		List<Object[]> bigSend = new ArrayList<>();
		Integer bigId = null;
		for (; iterator.hasNext();) {
			bigId = iterator.next();
			if (bigId != null) {
				bigSend.add(new Object[] { bigId });
			}
		}
		// 国家技能离线经验和铜钱收益处理
		Integer[] offlineExpAndCoin = CountrySkillFunction.getIns().offlineExpAndCoinHandle(hero);
		exp+=offlineExpAndCoin[0];
		coin+=offlineExpAndCoin[0];
		GuanqiaSender.sendCmd_1100(hero.getId(), curGuanqia, guanqia.getCurMonster(), (int) coin, (int) exp,
				(int) starSoul, equipNum, toolSendList.toArray(), showtime, bigGuanqia, bigSend.toArray());
//		}
		// 红点
		int redPoint = GuanqiaFunction.getIns().checkRedPoint(hero);
		if (redPoint > 0) {
			RedPointFunction.getIns().addLoginRedPoint(hero, GuanqiaConst.SysId, redPoint, RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}
	
	public void dailyReset(Hero hero, int now) {
		Guanqia guanqia = hero.getGuanqia();
		guanqia.setKillMonsterCount(0);
		guanqia.setKillAwardIndex(0);
		guanqia.setTodayMopUp(0);
	}

}
