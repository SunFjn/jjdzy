package com.teamtop.system.xuTianHunt;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.xuTianHunt.model.HuntTempData;
import com.teamtop.system.xuTianHunt.model.XuTianHuntModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_xtwl_776;
import excel.config.Config_xtwlbf_776;
import excel.config.Config_xtwlcs_776;
import excel.struct.Struct_xtwl_776;
import excel.struct.Struct_xtwlbf_776;
import excel.struct.Struct_xtwlcs_776;

public class XuTianHuntManager {

	private static XuTianHuntManager ins;

	private XuTianHuntManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized XuTianHuntManager getIns() {
		if (ins == null) {
			ins = new XuTianHuntManager();
		}
		return ins;
	}

	/**
	 * 打开界面
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			int huntNum = xuTianHuntModel.getHuntNum();
			int buyNum = xuTianHuntModel.getBuyNum();
			XuTianHuntSender.sendCmd_11822(hid, huntNum, buyNum);
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager openUI");
		}
	}

	/**
	 * 购买狩猎次数
	 * @param hero
	 */
	public void buyHunt(Hero hero, int buyNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			int huntNum = xuTianHuntModel.getHuntNum();
			int oldBuyNum = xuTianHuntModel.getBuyNum();
			Map<Integer, Struct_xtwlcs_776> map = Config_xtwlcs_776.getIns().getMap();
			int limitNum = map.size();
			if (oldBuyNum >= limitNum) {
				// 超过可购买次数
				XuTianHuntSender.sendCmd_11824(hid, 0, 2, 0);
				return;
			}
			int newBuyNum = oldBuyNum + buyNum;
			if (newBuyNum > limitNum) {
				// 超过可购买次数
				XuTianHuntSender.sendCmd_11824(hid, 0, 2, 0);
				return;
			}
			int start = oldBuyNum + 1;
			Struct_xtwlcs_776 xtwlcs_776 = null;
			int[][] total = new int[0][];
			for (int i = start; i <= newBuyNum; i++) {
				xtwlcs_776 = map.get(i);
				int[][] xh = xtwlcs_776.getXh();
				total = CommonUtil.arrayPlusArraysItems(xh, total);
			}
			if (!UseAddUtil.canUse(hero, total)) {
				// 元宝不足
				XuTianHuntSender.sendCmd_11824(hid, 0, 1, 0);
				return;
			}
			UseAddUtil.use(hero, total, SourceGoodConst.XUTIAN_HUNT_BUY_NUM, true);
			xuTianHuntModel.setBuyNum(newBuyNum);
			xuTianHuntModel.addHuntNum(buyNum);
			XuTianHuntSender.sendCmd_11824(hid, 1, xuTianHuntModel.getHuntNum(), newBuyNum);
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager openUI");
		}
	}

	/**
	 * 请求开始狩猎
	 * @param hero
	 */
	public void startHunt(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			int huntNum = xuTianHuntModel.getHuntNum();
			List<Object[]> rewardPreyData = new ArrayList<>();
			List<Object[]> buffPreyData = new ArrayList<>();
			
			HuntTempData tempData = xuTianHuntModel.getHuntTempData();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (tempData != null) {
				int endTime = tempData.getEndTime();
				if (currentTime < endTime) {
					// 上次围猎未结束
					LogTool.warn("XuTianHuntManager startHunt, hid=" + hero.getId(), XuTianHuntManager.class);
					return;
				}
			}
			if (huntNum <= 0) {
				if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, XuTianHuntConst.TOOL_ID)) {					
					XuTianHuntSender.sendCmd_11826(hid, 2, rewardPreyData.toArray(), buffPreyData.toArray());
					return;
				}
				UseAddUtil.use(hero, GameConst.TOOL, 1, XuTianHuntConst.TOOL_ID, SourceGoodConst.XUTIAN_HUNT_START, true);
			}else {				
				xuTianHuntModel.addHuntNum(-1);
			}
			int arrowNum = Config_xtcs_004.getIns().get(XuTianHuntConst.BASE_ARROW_NUM).getNum();
			int huntTime = Config_xtcs_004.getIns().get(XuTianHuntConst.HUNT_TIME).getNum();
			int buffNum = Config_xtcs_004.getIns().get(XuTianHuntConst.BUFF_PREY_NUM).getNum();
			int highNum = Config_xtcs_004.getIns().get(XuTianHuntConst.HIGH_PREY_NUM).getNum();
			int nomalNum = Config_xtcs_004.getIns().get(XuTianHuntConst.NOMAL_PREY_NUM).getNum();

			HuntTempData huntTempData = new HuntTempData();
			Map<Integer, Integer> preyMap = huntTempData.getPreyMap();
			XuTianHuntSysCache.getHigh(highNum, preyMap);
			int index = highNum + 1;
			XuTianHuntSysCache.getNomal(nomalNum, index, preyMap);

			Map<Integer, Integer> buffMap = huntTempData.getBuffMap();
			index = highNum + nomalNum + 1;
			XuTianHuntSysCache.getBuff(buffNum, index, buffMap);


			huntTempData.setArrowNum(arrowNum);
			huntTempData.setStartTime(currentTime);
			huntTempData.setEndTime(currentTime + huntTime);
			xuTianHuntModel.setHuntTempData(huntTempData);

			Iterator<Entry<Integer, Integer>> preyIte = preyMap.entrySet().iterator();
			for (; preyIte.hasNext();) {
				Entry<Integer, Integer> entry = preyIte.next();
				rewardPreyData.add(new Object[] { entry.getKey(), entry.getValue() });
			}
			Iterator<Entry<Integer, Integer>> iterator = buffMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, Integer> entry = iterator.next();
				buffPreyData.add(new Object[] { entry.getKey(), entry.getValue() });
			}
			XuTianHuntSender.sendCmd_11826(hid, 1, rewardPreyData.toArray(), buffPreyData.toArray());
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE34);
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager startHunt");
		}
	}

	/**
	 * 射箭狩猎
	 * @param hero
	 */
	public void hunt(Hero hero, int type, int uid) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			HuntTempData huntTempData = xuTianHuntModel.getHuntTempData();
			int currentTime = TimeDateUtil.getCurrentTime();
			if(huntTempData==null) {
				return;
			}
			int endTime = huntTempData.getEndTime();
			if (currentTime >= endTime) {
				// 狩猎已结束
				return;
			}
			int arrowNum = huntTempData.getArrowNum();
			if (arrowNum <= 0) {
				// 没箭了
				XuTianHuntSender.sendCmd_11828(hid, 0, 1, type, uid, 0);
				return;
			}
			int newArrowNum = arrowNum - 1;
			if (type == -1 && uid == -1) {
				huntTempData.setArrowNum(newArrowNum);
				XuTianHuntSender.sendCmd_11828(hid, 1, 0, type, uid, newArrowNum);
				return;
			}
			Map<Integer, int[]> buffEffect = huntTempData.getBuffEffect();
			int addPro = 0;// 增加的概率
			int[] buffInfo = buffEffect.get(type);
			if (buffInfo != null) {
				if (currentTime < buffInfo[0]) {
					addPro += buffInfo[1];
				} else {
					buffEffect.remove(type);
				}
			}
			if (type == 1) {
				Map<Integer, Integer> preyMap = huntTempData.getPreyMap();
				if (!preyMap.containsKey(uid)) {
					// 没该猎物
					return;
				}
				int id = preyMap.get(uid);
				Struct_xtwl_776 struct_xtwl_776 = Config_xtwl_776.getIns().get(id);
				int jzgl = struct_xtwl_776.getJzgl() + addPro;
				int randomNum = RandomUtil.getRandomNumInAreas(1, XuTianHuntConst.TOTAL_PRO);
				huntTempData.setArrowNum(newArrowNum);
				if (randomNum > jzgl) {
					// 没击中
					XuTianHuntSender.sendCmd_11828(hid, 0, 2, type, uid, newArrowNum);
					return;
				}
				preyMap.remove(uid);
				int[][] jl = struct_xtwl_776.getJl();
//				UseAddUtil.add(hero, jl, SourceGoodConst.XUTIAN_HUNT_REWARD, UseAddUtil.getDefaultMail(), false);
				List<int[][]> rewardList = huntTempData.getRewardList();
				rewardList.add(jl);
			} else {
				Map<Integer, Integer> buffMap = huntTempData.getBuffMap();
				if (!buffMap.containsKey(uid)) {
					// 没该猎物
					return;
				}
				/*
				 * 1.冰冻 2.减速 3.额外羽箭 4.加速射击 5.概率提升
				 */
				int id = buffMap.get(uid);
				Struct_xtwlbf_776 struct_xtwlbf_776 = Config_xtwlbf_776.getIns().get(id);
				int gl2 = struct_xtwlbf_776.getGl2() + addPro;

				int randomNum = RandomUtil.getRandomNumInAreas(1, XuTianHuntConst.TOTAL_PRO);
				if (randomNum > gl2) {
					// 没击中
					XuTianHuntSender.sendCmd_11828(hid, 0, 2, type, uid, newArrowNum);
					return;
				}
				buffMap.remove(uid);
				int[][] buff = struct_xtwlbf_776.getBuff();
				int lx = struct_xtwlbf_776.getLx();
				if (lx == 3) {
					// 额外羽箭
					huntTempData.setArrowNum(newArrowNum + buff[0][1]);
				} else {
					huntTempData.setArrowNum(newArrowNum);
				}
				if (lx == 5) {
					int buffEnd = currentTime + buff[0][2];
					if(buffInfo!=null) {						
						if (buffInfo[0] == buff[0][0]) {
							buffInfo[1] = buffEnd;
						} else if (buffInfo[0] < buff[0][0]) {
							buffInfo[0] = buff[0][0];
							buffInfo[1] = buffEnd;
						}
					}else {
						buffInfo = new int[] { buff[0][0], buffEnd };
						buffEffect.put(type, buffInfo);
					}
				}
			}
			XuTianHuntSender.sendCmd_11828(hid, 1, 0, type, uid, huntTempData.getArrowNum());
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager hunt");
		}
	}

	/**
	 * 结束狩猎
	 * @param hero
	 */
	public void endHunt(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			HuntTempData huntTempData = xuTianHuntModel.getHuntTempData();
			if (huntTempData == null) {
				return;
			}
			List<int[][]> rewardList = huntTempData.getRewardList();
			int[][] total = new int[0][];
			for (int[][] arr : rewardList) {
				total = CommonUtil.arrayPlusArrays(total, arr);
			}
			if (rewardList.size() == 0) {
				int mailId = MailConst.XUTIAN_HUNT_NO_REWARD;
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, total);
			} else {
				int mailId = MailConst.XUTIAN_HUNT;
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, total);
			}
			// UseAddUtil.add(hero, total, SourceGoodConst.XUTIAN_HUNT_REWARD,
			// UseAddUtil.getDefaultMail(), true);
			xuTianHuntModel.setHuntTempData(null);
			XuTianHuntSysCache.getHuntingMap().remove(hid);
			XuTianHuntSender.sendCmd_11830(hid);
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager endHunt");
		}
	}

	/**
	 * 打开狩猎仓库
	 * @param hero
	 */
	public void openWareHouse(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.XUTIAN_HUNT)) {
				return;
			}
			XuTianHuntModel xuTianHuntModel = hero.getXuTianHuntModel();
			HuntTempData huntTempData = xuTianHuntModel.getHuntTempData();
			if(huntTempData==null) {
				//狩猎已结束
				return;
			}
			List<int[][]> rewardList = huntTempData.getRewardList();
			List<Object[]> data = new ArrayList<>();
			for (int[][] info : rewardList) {
				data.add(new Object[] { info[0][0], info[0][1], info[0][2] });
			}
			XuTianHuntSender.sendCmd_11832(hid, data.toArray());
		} catch (Exception e) {
			LogTool.error(e, XuTianHuntManager.class, hero.getId(), hero.getName(), "XuTianHuntManager startHunt");
		}
	}

}
