package com.teamtop.system.signIn;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.system.signIn.model.SignIn;

import excel.config.Config_qdbaoxiang_720;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_qdbaoxiang_720;
import excel.struct.Struct_qiandao_720;

public class SignInManager {
	private static SignInManager ins = null;

	public static SignInManager getIns() {
		if (ins == null) {
			ins = new SignInManager();
		}
		return ins;
	}

	private SignInManager() {

	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SignInConst.SIGNIN)) {
			return;
		}

		List<Integer> signStateList = hero.getSignIn().getSignStateList();
		List<Object> signStateArrayList = new ArrayList<Object>();
		for (Integer state : signStateList) {
			signStateArrayList.add(new Object[] { state });
		}
		List<Integer> accSignBXStateList = hero.getSignIn().getAccSignBXStateList();
		List<Object> accSignBXStateArrayList = new ArrayList<Object>();
		for (Integer state : accSignBXStateList) {
			accSignBXStateArrayList.add(new Object[] { state });
		}

		int signDay = SignInFunction.getIns().getSignDay(hero);
		int restDay = SignInFunction.getIns().getRestDay(hero);
//		int state = 0;
//		if (PrivilegeCardFunction.getIns().isSignReward(hero)) {
//			state = 1;
//		}
		int qs = hero.getSignIn().getQs();
		SignInSender.sendCmd_2152(hero.getId(), signStateArrayList.toArray(), accSignBXStateArrayList.toArray(),
				signDay, restDay, qs);
	}

	/**
	 * 签到
	 * 
	 * @param hero
	 * @param signDay 签到天数
	 */
	public void signIn(Hero hero, int signDay) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SignInConst.SIGNIN)) {
			return;
		}
		if (signDay < 1 && signDay > 30) {
			return;
		}
		List<Integer> signStateList = hero.getSignIn().getSignStateList();
		Integer state = signStateList.get(signDay - 1);
		if (state == SignInConst.CAN_SIGNIN) {// 签到成功
			SignIn signIn = hero.getSignIn();
			int qs = signIn.getQs();
			Map<Integer, Struct_qiandao_720> map = SignInCache.getSignInConfig().get(qs);
			int[][] award = map.get(signDay).getAWARD();
			if (PrivilegeCardFunction.getIns().isSignReward(hero)) {// 判断是否双倍奖励
				UseAddUtil.add(hero, award, 2, SourceGoodConst.SIGNIN_AWARD, null, true);// 发放双倍奖励
			} else {
				UseAddUtil.add(hero, award, SourceGoodConst.SIGNIN_AWARD, null, true); // 发放奖励
			}
			signStateList.set(signDay - 1, SignInConst.SIGNINED);
			SignInFunction.getIns().refreshAccSignBXStateList(hero);
			SignInSender.sendCmd_2154(hero.getId(), SignInConst.SUCCESS, signDay);
		} else { // 签到失败
			SignInSender.sendCmd_2154(hero.getId(), SignInConst.FAILURE_SIGN, 0);
		}
	}

	/**
	 * 补签
	 * 
	 * @param hero
	 * @param repairSignDay 补签天数
	 */
	public void repairSign(Hero hero, int repairSignDay) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SignInConst.SIGNIN)) {
			return;
		}
		if (repairSignDay < 1 && repairSignDay > 30) {
			return;
		}
		List<Integer> signStateList = hero.getSignIn().getSignStateList();
		Integer state = signStateList.get(repairSignDay - 1);
		if (state == SignInConst.CAN_REPAIRSIGN) {
			int consume = Config_xtcs_004.getIns().get(SignInConst.REPAIRSIGN_CONSUME).getNum();
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, consume)) {// 元宝不足
				SignInSender.sendCmd_2156(hero.getId(), SignInConst.FAILURE_NOT_YUANBAO, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, consume, SourceGoodConst.SIGNIN_CONSUME, true);
			int qs = hero.getSignIn().getQs();
			Map<Integer, Struct_qiandao_720> map = SignInCache.getSignInConfig().get(qs);
			int[][] award = map.get(repairSignDay).getAWARD();
			if (PrivilegeCardFunction.getIns().isSignReward(hero)) {// 判断是否双倍奖励
				UseAddUtil.add(hero, award, 2, SourceGoodConst.SIGNIN_AWARD, null, true);// 发放双倍奖励
			} else {
				UseAddUtil.add(hero, award, SourceGoodConst.SIGNIN_AWARD, null, true); // 发放奖励
			}
			signStateList.set(repairSignDay - 1, SignInConst.SIGNINED);
			SignInFunction.getIns().refreshAccSignBXStateList(hero);
			SignInSender.sendCmd_2156(hero.getId(), SignInConst.SUCCESS, repairSignDay);
		} else {// 补签失败
			SignInSender.sendCmd_2156(hero.getId(), SignInConst.FAILURE_NOT_LEGAL, 0);
		}
	}

	/**
	 * 领取累签宝箱奖励
	 * 
	 * @param hero
	 * @param baoxiangId 累签宝箱id
	 */
	public void getBaoxiangAwards(Hero hero, int baoxiangId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SignInConst.SIGNIN)) {
			return;
		}
		Struct_qdbaoxiang_720 struct_qdbaoxiang_720 = Config_qdbaoxiang_720.getIns().get(baoxiangId);
		if (struct_qdbaoxiang_720 == null) {// 奖励不存在
			SignInSender.sendCmd_2158(hero.getId(), SignInConst.FAILURE_NOT_AWARD, 0);
			return;
		}
		int signDay = SignInFunction.getIns().getSignDay(hero);
		int needDay = struct_qdbaoxiang_720.getDAY();
		if (signDay < needDay) {// 未达到条件
			SignInSender.sendCmd_2158(hero.getId(), SignInConst.FAILURE_NOT_REACH, 0);
			return;
		}
		int indexOf = Config_qdbaoxiang_720.getIns().getSortList().indexOf(struct_qdbaoxiang_720);
		Integer baoxiangState = hero.getSignIn().getAccSignBXStateList().get(indexOf);
		if (baoxiangState == SignInConst.GETTED) { // 不能重复领取
			SignInSender.sendCmd_2158(hero.getId(), SignInConst.FAILURE_NOT_REP_GET, 0);
			return;
		}
		int[][] award = struct_qdbaoxiang_720.getAWARD();
		UseAddUtil.add(hero, award, SourceGoodConst.SIGNIN_BAOXIANGAWARD, null, true); // 发放奖励
		hero.getSignIn().getAccSignBXStateList().set(indexOf, SignInConst.GETTED);
		SignInSender.sendCmd_2158(hero.getId(), SignInConst.SUCCESS, baoxiangId);
	}
}
