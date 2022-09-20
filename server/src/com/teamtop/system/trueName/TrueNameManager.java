package com.teamtop.system.trueName;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.trueName.model.TrueNameModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

/**
 * 实名验证
 * 
 * @author hzp
 *
 */
public class TrueNameManager {

	private static TrueNameManager ins;

	private TrueNameManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TrueNameManager getIns() {
		if (ins == null) {
			ins = new TrueNameManager();
		}
		return ins;
	}

	/**
	 * 接收玩家身份证信息
	 * 
	 * @param hero
	 * @param idCard
	 */
	public void sendIdCard(Hero hero, String idCard) {
		try {
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			if(StringUtils.isEmpty(idCard)) {
				return;
			}
			int checkState = trueNameModel.getCheckState();
			int adult = trueNameModel.getAdult();
			if (checkState == 1 && adult == 1) {
				return;
			}
			trueNameModel.setCheckState(1);
			if(CommonUtil.IDCardValidate(idCard)) {				
				trueNameModel.setAdult(1);
			}
		} catch (Exception e) {
			LogTool.error(e, TrueNameManager.class, hero.getId(), hero.getName(), "TrueNameManager sendIdCard");
		}
	}

	/**
	 * 实名验证
	 * 
	 * @param hero
	 */
	public void trueName(Hero hero, String name, String idCard) {
		try {
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			if (StringUtils.isEmpty(name) || StringUtils.isEmpty(idCard)) {
				return;
			}
			trueNameModel.setName(name);
			trueNameModel.setIdCardNum(idCard);
			trueNameModel.setCheckState(1);
			if (CommonUtil.IDCardValidate(idCard)) {
				trueNameModel.setAdult(1);
			}
		} catch (Exception e) {
			LogTool.error(e, TrueNameManager.class, hero.getId(), hero.getName(), "TrueNameManager trueName");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 */
	public void getReward(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			int checkState = trueNameModel.getCheckState();
			if (checkState != 1) {
				TrueNameSender.sendCmd_5296(hid, 0, 1);
				return;
			}
			int reward = trueNameModel.getReward();
			if (reward == 1) {
				// 已领取
				TrueNameSender.sendCmd_5296(hid, 0, 2);
				return;
			}
			trueNameModel.setReward(1);
			int[][] rewards = Config_xtcs_004.getIns().get(TrueNameConst.REWARD_ID).getOther();
			UseAddUtil.add(hero, rewards, SourceGoodConst.TRUE_NAME_REWARD, UseAddUtil.getDefaultMail(), true);
			TrueNameSender.sendCmd_5296(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, TrueNameManager.class, hero.getId(), hero.getName(), "TrueNameManager trueName");
		}
	}

	public static void main(String[] args) {
		String idCard = "440783201510233018";
		System.err.println(CommonUtil.IDCardValidate(idCard));
	}

}
