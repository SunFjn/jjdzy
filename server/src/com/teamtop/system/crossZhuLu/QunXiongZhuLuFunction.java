package com.teamtop.system.crossZhuLu;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossMine.CrossMineFunction;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuEnum;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuFunction;
import com.teamtop.system.crossZhuLu.model.QunXiongZhuLu;
import com.teamtop.system.crossZhuLu.model.TaskInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qxzlrw_273;
import excel.struct.Struct_qxzlrw_273;
import io.netty.channel.Channel;

public class QunXiongZhuLuFunction {
	private static QunXiongZhuLuFunction ins;

	public static synchronized QunXiongZhuLuFunction getIns() {
		if (ins == null) {
			ins = new QunXiongZhuLuFunction();
		}
		return ins;
	}

	private QunXiongZhuLuFunction() {

	}

	/**
	 * 初始化任务
	 * 
	 * @param hero
	 */
	public void initTask(Hero hero) {
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		for (Struct_qxzlrw_273 config : Config_qxzlrw_273.getIns().getSortList()) {
			int configId = config.getId();
			if (configId % 10 == 1) {
				// 第一个任务
				TaskInfo info = new TaskInfo();
				info.setConfigId(configId);
				info.setState(0);
				info.setValue(0);
				qunXiongZhuLu.getTaskInfoMap().put(configId, info);
			}
		}
	}

	/**
	 * 刷新任务
	 * 
	 * @param hero
	 */
	public void resetTask(Hero hero) {
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		int mailId = MailConst.QUN_XIONG_TASK_MAIL_149;
		List<Integer> rList = new ArrayList<>();
		for (TaskInfo info : qunXiongZhuLu.getTaskInfoMap().values()) {
			Struct_qxzlrw_273 config = Config_qxzlrw_273.getIns().get(info.getConfigId());
			if (config == null) {
				continue;
			}
			rList.add(info.getConfigId());
			if (info.getState() == QunXiongZhuLuConst.TASK_STATE_1) {
				// 补发邮件
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId },
						config.getReward());
			}
		}
		for (int taskId : rList) {
			qunXiongZhuLu.getTaskInfoMap().remove(taskId);
		}
		initTask(hero);
	}

	/**
	 * 更新任务进度
	 * 
	 * @param hero
	 * @param taskType
	 * @param value
	 */
	public void doTask(Hero hero, int taskType, long value) {
		if (!CrossZhuLuFunction.getIns().isOpen()) {
			return;
		}
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		for (TaskInfo info : qunXiongZhuLu.getTaskInfoMap().values()) {
			Struct_qxzlrw_273 config = Config_qxzlrw_273.getIns().get(info.getConfigId());
			if (config == null) {
				continue;
			}
			if (config.getType() == taskType) {
				if (taskType == QunXiongZhuLuConst.TASK_TYPES_3) {
					// 领取体力任务比较特殊
					continue;
				}
				if (taskType == QunXiongZhuLuConst.TASK_TYPES_2 || taskType == QunXiongZhuLuConst.TASK_TYPES_5) {
					// 积分任务获取信息时刷新值
					info.setValue(value);
				} else {
					info.setValue(info.getValue() + value);
				}
				// 判断是否完成
				if (info.getValue() >= config.getCs()) {
					if (info.getState() == QunXiongZhuLuConst.TASK_STATE_0) {
						info.setState(QunXiongZhuLuConst.TASK_STATE_1);
					}
				}
			}
		}
	}

	/**
	 * 检查领取体力任务是否可领
	 * 
	 * @param hero
	 */
	public void checkTiLiTask(Hero hero) {
		boolean isCanGet = false;
		int currentTime = TimeDateUtil.getCurrentTime();
		int startTime = TimeDateUtil.getTimeOfTheClock(12);
		int endTime = TimeDateUtil.getTimeOfTheClock(14);
		if (currentTime >= startTime && currentTime <= endTime) {
			isCanGet = true;
		}
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		for (TaskInfo info : qunXiongZhuLu.getTaskInfoMap().values()) {
			Struct_qxzlrw_273 config = Config_qxzlrw_273.getIns().get(info.getConfigId());
			if (config == null) {
				continue;
			}
			if (config.getType() == QunXiongZhuLuConst.TASK_TYPES_3) {
				// 如果在可领时间之间为可领取,否则为不可领取
				if (info.getState() != QunXiongZhuLuConst.TASK_STATE_2) {
					info.setState(isCanGet ? QunXiongZhuLuConst.TASK_STATE_1 : QunXiongZhuLuConst.TASK_STATE_0);
				}
			}
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero) {
		boolean[] hadRedPoint = new boolean[5];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		hadRedPoint[2] = false;
		hadRedPoint[3] = false;
		hadRedPoint[4] = false;
		QunXiongZhuLu zhuLu = hero.getQunXiongZhuLu();
		for (TaskInfo info : zhuLu.getTaskInfoMap().values()) {
			if (info.getState() == QunXiongZhuLuConst.TASK_STATE_1) {
				hadRedPoint[1] = true;
			}
		}

		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());

		Channel channel = Client_2.getIns().getCrossChannel();
		if (channel == null || !channel.isOpen()) {
			LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
			return hadRedPoint;
		}
		NettyWrite.writeXData(channel, CrossConst.CROSS_ZHU_LU_HONG_DIAN_LC, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				String state = crossData.getObject(CrossZhuLuEnum.State, String.class);
				String[] red = state.split("_");
				for (String r : red) {
					String[] point = r.split("&");
					int i = Integer.valueOf(point[0]);
					boolean hadRed = point[1].equals("1");
					if (hadRed) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
								RedPointConst.HAS_RED);
					} else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
								RedPointConst.NO_RED);
					}
				}
			}
		});
		return hadRedPoint;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero);
			for (int i = 1; i < 5; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QUN_XIONG_ZHU_LU, i,
							RedPointConst.NO_RED);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
