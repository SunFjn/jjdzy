package com.teamtop.system.signIn;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.signIn.model.SignIn;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qdbaoxiang_720;

public class SignInFunction {
	private static SignInFunction ins = null;

	public static SignInFunction getIns() {
		if (ins == null) {
			ins = new SignInFunction();
		}
		return ins;
	}

	private SignInFunction() {
	}

	/**
	 * 签到天数
	 * 
	 * @return
	 */
	public int getSignDay(Hero hero) {
		List<Integer> signStateList = hero.getSignIn().getSignStateList();
		int signDay = 0;
		for (int state : signStateList) {
			if (state == SignInConst.SIGNINED) {
				signDay++;
			}
		}
		return signDay;
	}

	/**
	 * 重置剩余天数
	 * 
	 * @return
	 */
	public int getRestDay(Hero hero) {
		int resetZeroTime = hero.getSignIn().getResetTime();
		int todayZeroTimeReturnInt = TimeDateUtil.getTodayZeroTimeReturnInt();
		int restTime = resetZeroTime - todayZeroTimeReturnInt;
		int restDay = restTime / TimeDateUtil.SECONDS_IN_DAY;
		return restDay;
	}

	/**
	 * 刷新签到状态列表
	 * 
	 * @param hero
	 */
	public void refreshSignState(Hero hero) {
		SignIn signIn = hero.getSignIn();
		List<Integer> signStateList = signIn.getSignStateList();
		int openDayZero = TimeDateUtil.getOneDayZeroTime(signIn.getStartTime()); // 签到功能开启当天的零点时间
		int currentTime = TimeDateUtil.getCurrentTime();
		int daysBetween = TimeDateUtil.getDaysBetween(openDayZero, currentTime) + 1;
		int newCanSignDay = daysBetween % SignInConst.SIGNIN_RESET_ROUNTDAY == 0 ? SignInConst.SIGNIN_RESET_ROUNTDAY
				: daysBetween % SignInConst.SIGNIN_RESET_ROUNTDAY;

		signStateList.set(newCanSignDay - 1, SignInConst.CAN_SIGNIN);

		StringBuilder log = new StringBuilder(
				"SignInFunction.refreshSignState.hid:" + hero.getId() + " newCanSignDay:" + newCanSignDay);
		for (int i = 0; i < newCanSignDay - 1; i++) {
			Integer state = signStateList.get(i);
			if (state == SignInConst.NOT_REACH || state == SignInConst.CAN_SIGNIN) {
				log.append(" ").append(i);
				signStateList.set(i, SignInConst.CAN_REPAIRSIGN);
			}
		}
		LogTool.info(log.toString(), this);
	}

	/**
	 * 刷新累签宝箱状态列表
	 * 
	 * @param hero
	 */
	public void refreshAccSignBXStateList(Hero hero) {
		int signDay = getSignDay(hero);
		List<Integer> accSignBXStateList = hero.getSignIn().getAccSignBXStateList();
		int size = accSignBXStateList.size();
		for (int i = 0; i < size; i++) {
			Integer state = accSignBXStateList.get(i);
			if (state == SignInConst.NOT_REACH) {
				int needDay = Config_qdbaoxiang_720.getIns().getSortList().get(i).getDAY();
				if (signDay == needDay) {
					accSignBXStateList.set(i, SignInConst.CAN_GET);
				} else {
					break;
				}
			}
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		SignIn signIn = hero.getSignIn();
		List<Integer> signStateList = signIn.getSignStateList();
		for (int state : signStateList) {
			if (state == SignInConst.CAN_SIGNIN) {// 签到红点
				RedPointFunction.getIns().addLoginRedPoint(hero, SignInConst.FULI, SignInConst.REDPOINT_SIGNIN,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, SignInConst.SIGNIN, SignInConst.REDPOINT_SIGNIN,
						RedPointConst.HAS_RED);
				return;
			}
		}
		List<Integer> accSignBXStateList = signIn.getAccSignBXStateList();
		for (int bxAwardState : accSignBXStateList) {
			if (bxAwardState == SignInConst.CAN_GET) {// 宝箱红点
				RedPointFunction.getIns().addLoginRedPoint(hero, SignInConst.FULI, SignInConst.REDPOINT_BXAWARD,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, SignInConst.SIGNIN, SignInConst.REDPOINT_BXAWARD,
						RedPointConst.HAS_RED);
				return;
			}
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		SignIn signIn = hero.getSignIn();
		List<Integer> signStateList = signIn.getSignStateList();
		for (int state : signStateList) {
			if (state == SignInConst.CAN_SIGNIN) {// 签到红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SignInConst.FULI, SignInConst.REDPOINT_SIGNIN,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SignInConst.SIGNIN, SignInConst.REDPOINT_SIGNIN,
						RedPointConst.HAS_RED);
				return;
			}
		}
		List<Integer> accSignBXStateList = signIn.getAccSignBXStateList();
		for (int bxAwardState : accSignBXStateList) {
			if (bxAwardState == SignInConst.CAN_GET) {// 宝箱红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SignInConst.FULI, SignInConst.REDPOINT_BXAWARD,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SignInConst.SIGNIN, SignInConst.REDPOINT_BXAWARD,
						RedPointConst.HAS_RED);
				return;
			}
		}
	}

}
