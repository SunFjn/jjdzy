package com.teamtop.system.privilegeCard;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_tqk_719;
import excel.struct.Struct_tqk_719;

public class PrivilegeCardFunction {

	private static PrivilegeCardFunction privilegeCardFunction;

	public PrivilegeCardFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PrivilegeCardFunction getIns() {
		if (privilegeCardFunction == null) {
			privilegeCardFunction = new PrivilegeCardFunction();
		}
		return privilegeCardFunction;
	}

	/**
	 * 初始化特权卡数据
	 * @param hero
	 */
	public void init(Hero hero) {
		try {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			if (privilegeCardMap == null) {
				privilegeCardMap = new HashMap<>();
				hero.setPrivilegeCardMap(privilegeCardMap);
			}
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardFunction.class, hero.getId(), hero.getName(), "PrivilegeCardFunction init");
		}
	}

	/**
	 * 获取特权增加挂机经验百分比
	 * 
	 * @param hero
	 * @return
	 */
	public int getHangExp(Hero hero) {
		int expPercent = 0;
		if (HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int cid = iterator.next();
				expPercent += Config_tqk_719.getIns().get(cid).getGUAJI();
			}
		}
		return expPercent;
	}

	/**
	 * 获取特权增加挂机铜钱百分比
	 * 
	 * @param hero
	 * @return
	 */
	public int getHangCOIN(Hero hero) {
		int coinPercent = 0;
		if (HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int cid = iterator.next();
				coinPercent += Config_tqk_719.getIns().get(cid).getTONGQIAN();
			}
		}
		return coinPercent;
	}

	/**
	 * 双倍登录奖励是否开启
	 * 
	 * @return true 开启
	 */
	public boolean isLoginReachGifOpen(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int cid = iterator.next();
				int denglu = Config_tqk_719.getIns().get(cid).getDENGLU();
				if (denglu == 1) {// 1 开启
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 双倍签到奖励是否开启
	 * 
	 * @return true 开启
	 */
	public boolean isSignReward(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int cid = iterator.next();
				int sign = Config_tqk_719.getIns().get(cid).getQIANDAO();
				if (sign == 1) {// 1 开启
					return true;
				}
			}
		}
		return false;
	}

	/** 
	 * 是否有至尊卡
	 * @return true 有 
	 * */
	public boolean isOwnSupermacyCard(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			if (privilegeCardMap.containsKey(PrivilegeCardConst.SUPERMACY_CARD)) {
				return true;
			}
		}
		return false;
	}
	
	public int leftTime(Hero hero,int type) {
		int leftTime=0;
		int currentTime = TimeDateUtil.getCurrentTime();
		Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
		Map<Integer, Struct_tqk_719> map = Config_tqk_719.getIns().getMap();
		if (privilegeCardMap.containsKey(type)) {
			Struct_tqk_719 struct_tqk_719 = map.get(type);
			int qixian = struct_tqk_719.getQIXIAN();
			if (qixian > 0) {
				int[] info = privilegeCardMap.get(type);
				if (currentTime < info[1]) {
					//过期
					leftTime=info[1]-currentTime;
				}
			}
		}
		return leftTime;
	}

	/**
	 * 检测特权卡
	 * @param hero
	 */
	public void checkPrivilegeCard(Hero hero) {
		try {
			if(CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Map<Integer, Struct_tqk_719> map = Config_tqk_719.getIns().getMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				Struct_tqk_719 struct_tqk_719 = map.get(id);
				int qixian = struct_tqk_719.getQIXIAN();
				if (qixian > 0) {
					int[] info = privilegeCardMap.get(id);
					if (currentTime >= info[1]) {
						iterator.remove();
					}
				}
			}
			int privilegeAward = hero.getPrivilegeAward();
			if (privilegeAward > 0) {
				return;
			}
			if (privilegeCardMap.size() >= PrivilegeCardConst.THREE_LIMIT) {
				hero.setPrivilegeAward(PrivilegeCardConst.THREE_CAN_GET);
			}
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardFunction.class, hero.getId(), hero.getName(),
					"PrivilegeCardFunction checkPrivilegeCard");
		}
	}

}
