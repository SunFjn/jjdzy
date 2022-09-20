package com.teamtop.system;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.excel.ExcelConst;
import com.teamtop.util.excel.ExcelWrite1;

/**
 * 玩法活动系统状态记录 如：系统 未开启，准备，开启； 需要新的状态自己在StateEnum里添加
 * 
 * @author hzp
 *
 */
public enum SystemStateEnum {
	CrossBoss(1804, new StateEnum[] { StateEnum.NOT_OPEN, StateEnum.READY_NOW, StateEnum.OPEN_NOW }),
	SoloRun(1603, new StateEnum[] { StateEnum.NOT_OPEN, StateEnum.OPEN_NOW }),
	DailyFirstRecharge(4501, new StateEnum[] { StateEnum.OPEN_NOW }),
	DynastyWarriors(1604, new StateEnum[] { StateEnum.NOT_OPEN, StateEnum.OPEN_NOW }),
	FirstRecharge(4601, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN }),
	LONGZHONGDUI(3702, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN }),
	COLLECTTREASURY(5002, new StateEnum[] { StateEnum.OPEN_NOW }),
	HeroesList(4401, new StateEnum[] { StateEnum.OPEN_NOW }),
	OVERCALLBACKCLSE(4609, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN }),
	OVERCALLBACKCL(4610, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN }),
	OVERCALLBACKYB(4603, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN }),
	FirstRechargeNew(5602, new StateEnum[] { StateEnum.OPEN_NOW, StateEnum.NOT_OPEN });

	/** 系统id */
	private int sysId;

	/** 状态激活 */
	private StateEnum[] states;

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public StateEnum[] getStates() {
		return states;
	}

	public void setStates(StateEnum[] states) {
		this.states = states;
	}

	private SystemStateEnum(int sysId, StateEnum[] states) {
		this.sysId = sysId;
		this.states = states;
	}

	/**
	 * 系统特殊状态（需要新的状态自己添加）
	 * 
	 * @author hzp
	 *
	 */
	public enum StateEnum {
		/** 未开启 */
		NOT_OPEN(0, "未开启"),
		/** 准备 */
		READY_NOW(1, "准备"),
		/** 开启中 */
		OPEN_NOW(2, "开启中");

		private int state;
		private String name;

		public int getState() {
			return state;
		}

		public void setState(int state) {
			this.state = state;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		private StateEnum(int state, String name) {
			this.state = state;
			this.name = name;
		}
	}

	public static void main(String[] args) {
		// 生成新的状态文件
		List<List<String>> rowsList = new ArrayList<List<String>>();
		for (SystemStateEnum systemStateEnum : SystemStateEnum.values()) {
			List<String> rowList = new ArrayList<String>();
			rowList.add(String.valueOf(systemStateEnum.getSysId()));
			StringBuffer statesRowBuffer = new StringBuffer();// 行buff
			StateEnum[] states = systemStateEnum.getStates();
			for (int i = 0; i < states.length; i++) {
				if (i == 0) {
				} else {
					statesRowBuffer.append(",");
				}
				statesRowBuffer.append(String.valueOf(states[i].getState()));
			}
			rowList.add(statesRowBuffer.toString());
			rowsList.add(rowList);
		}
		String[] systemstateenumTitlerownames = ExcelConst.SystemStateEnum_TITLEROWNAMES;
		StringBuffer statesTitleBuffer = new StringBuffer(systemstateenumTitlerownames[1]);// 标题buff
		StateEnum[] titleStates = StateEnum.values();
		for (int i = 0; i < titleStates.length; i++) {
			if (i == 0) {
				statesTitleBuffer.append("(");
			} else {
				statesTitleBuffer.append(",");
			}
			statesTitleBuffer.append(String.valueOf(titleStates[i].getState()));
			statesTitleBuffer.append(":");
			statesTitleBuffer.append(titleStates[i].getName());
			if (i == titleStates.length - 1) {
				statesTitleBuffer.append(")");
			}
		}
		systemstateenumTitlerownames[1] = statesTitleBuffer.toString();
		try {
			ExcelWrite1.writeToExcel_f1(ExcelConst.SystemStateEnum_FILEDIR, ExcelConst.SystemStateEnum_SHEETNAME,
					systemstateenumTitlerownames, rowsList);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
