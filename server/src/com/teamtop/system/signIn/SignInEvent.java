package com.teamtop.system.signIn;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.signIn.model.SignIn;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qdbaoxiang_720;
import excel.struct.Struct_qdbaoxiang_720;
import excel.struct.Struct_qiandao_720;

public class SignInEvent extends AbsSystemEvent {
	private static SignInEvent ins = null;

	public static SignInEvent getIns() {
		if (ins == null) {
			ins = new SignInEvent();
		}
		return ins;
	}

	private SignInEvent() {

	}

	@Override
	public void init(Hero hero) {
		SignIn signIn = hero.getSignIn();
		if (signIn == null) {
			signIn = new SignIn();
			signIn.setHid(hero.getId());
			ArrayList<Integer> signStateList = new ArrayList<Integer>();
			signIn.setSignStateList(signStateList);
			ArrayList<Integer> accSignBXStateList = new ArrayList<Integer>();
			signIn.setAccSignBXStateList(accSignBXStateList);
			hero.setSignIn(signIn);
		}
		int qs = signIn.getQs();
		if (qs == 0) {
			signIn.setQs(1);
		}
	}

	@Override
	public void login(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, SignInConst.SIGNIN)) {
			SignIn signIn = hero.getSignIn();
			if (signIn.getStartTime() == 0) {
				signIn.setStartTime(TimeDateUtil.getCurrentTime());
				signIn.setResetTime(0);
				loginReset(hero, 0);
			}
			SignInFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		int currentTime = TimeDateUtil.getCurrentTime();
		SignIn signIn = hero.getSignIn();
		int resetTime = signIn.getResetTime();
		if (currentTime >= resetTime) {
			resetSignAndBaoxiangState(hero);
			int signInResetRountTime = SignInConst.SIGNIN_RESET_ROUNTDAY * TimeDateUtil.SECONDS_IN_DAY;// 签到重置周期时间（30天）
			int openDayZero = TimeDateUtil.getOneDayZeroTime(signIn.getStartTime()); // 签到功能开启当天的零点时间
			int betweenTime = (TimeDateUtil.getTodayZeroTimeReturnInt() - openDayZero) / signInResetRountTime;
			int nextResetTime = openDayZero + signInResetRountTime * (betweenTime + 1);
			signIn.setResetTime(nextResetTime);
			LogTool.info("SignInEvent.loginReset.hid:" + hero.getId(), this);
		}
		SignInFunction.getIns().refreshSignState(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
		SignInManager.getIns().openUI(hero);
		SignInFunction.getIns().fastSendRedPoint(hero);
	}

	/**
	 * 关卡激活签到
	 */
	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		hero.getSignIn().setStartTime(TimeDateUtil.getCurrentTime());
		hero.getSignIn().setQs(0);
		loginReset(hero, 0);
		SignInFunction.getIns().fastSendRedPoint(hero);
	}

	/**
	 * 重置签到状态列表和累签宝箱状态列表,邮件发送未领取宝箱奖励
	 * 
	 * @param hero
	 */
	public void resetSignAndBaoxiangState(Hero hero) {
		SignIn signIn = hero.getSignIn();
		List<Integer> signStateList = signIn.getSignStateList();
		List<Integer> accSignBXStateList = signIn.getAccSignBXStateList();
		int size = accSignBXStateList.size();
		// 邮件发送未领取宝箱奖励
		for (int i = 0; i < size; i++) {
			int bxState = accSignBXStateList.get(i);
			if (bxState == SignInConst.CAN_GET) {
				int[][] reward = Config_qdbaoxiang_720.getIns().getSortList().get(i).getAWARD();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.SIGNIN_BXAWARD,
						new Object[] { MailConst.SIGNIN_BXAWARD }, reward);
			}
		}
		signStateList.clear();
		accSignBXStateList.clear();
		int nextQs = getNextQs(hero);
		signIn.setQs(nextQs);
		Map<Integer, Struct_qiandao_720> map = SignInCache.getSignInConfig().get(nextQs);
		int signDay = map.size();
		for (int i = 1; i <= signDay; i++) {
			signStateList.add(SignInConst.NOT_REACH);
		}
		List<Struct_qdbaoxiang_720> qdbaoxiangList = Config_qdbaoxiang_720.getIns().getSortList();
		int baoxiangNum = qdbaoxiangList.size();
		for (int i = 1; i <= baoxiangNum; i++) {
			accSignBXStateList.add(SignInConst.NOT_REACH);
		}
	}

	/**
	 * 取得下期期数
	 * 
	 * @param hero
	 * @return
	 */
	public int getNextQs(Hero hero) {
		SignIn signIn = hero.getSignIn();
		int qs = signIn.getQs();
		Map<Integer, Struct_qiandao_720> map = SignInCache.getSignInConfig().get(++qs);
		if (map == null) {
			qs = 1;
		}
		return qs;
	}

}
