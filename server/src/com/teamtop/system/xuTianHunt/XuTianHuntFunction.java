package com.teamtop.system.xuTianHunt;

import java.util.List;
import java.util.Set;

import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.xuTianHunt.model.XuTianHuntModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class XuTianHuntFunction implements ActHallInterface {

	private static XuTianHuntFunction ins;

	private XuTianHuntFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized XuTianHuntFunction getIns() {
		if (ins == null) {
			ins = new XuTianHuntFunction();
		}
		return ins;
	}

	/**
	 * 检测时间点增加狩猎次数
	 * @param hero
	 */
	public void checkTimeAdd(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			Set<Integer> addSet = xuTianHuntModel.getAddSet();
			int hour = TimeDateUtil.getHour();
			if (hour >= 12 && (!addSet.contains(12))) {
				addSet.add(12);
				xuTianHuntModel.addHuntNum(1);
			}
			if (hour >= 18 && (!addSet.contains(18))) {
				addSet.add(18);
				xuTianHuntModel.addHuntNum(1);
			}
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntFunction.class, hero.getId(), hero.getName(), "XuTianHuntFunction checkTimeAdd");
		}
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.XUTIAN_HUNT, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.XUTIAN_HUNT, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntFunction.class, hero.getId(), hero.getName(), "XuTianHuntFunction checkRedPoint");
		}
	}
	
	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return false;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			int huntNum = xuTianHuntModel.getHuntNum();
			if(huntNum>0) {
				return true;
			}
			int num = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), XuTianHuntConst.TOOL_ID);
			if (num > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntFunction.class, hero.getId(), hero.getName(), "XuTianHuntFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 加狩猎次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addHuntNum(Hero hero, int id, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return false;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			xuTianHuntModel.addHuntNum(num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntFunction.class, hero.getId(), hero.getName(), "XuTianHuntFunction addNum");
		}
		return false;
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		list.add(new Object[] { SystemIdConst.XUTIAN_HUNT, "" });
	}

}
