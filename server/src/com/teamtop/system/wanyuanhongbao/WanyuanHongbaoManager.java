package com.teamtop.system.wanyuanhongbao;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_wyhb_780;
import excel.struct.Struct_wyhb_780;


public class WanyuanHongbaoManager {
	private static WanyuanHongbaoManager ins = null;
	
	public static WanyuanHongbaoManager getIns() {
		if(ins == null) {
			ins = new WanyuanHongbaoManager();
		}
		return ins;
	}
	
	/**
	 * 打开界面
	 * @param hero 
	 * @param type 1=等级红包 2=充值红包  [S(当前已经领取过的ID)]
	 */
	public void openUI(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, WanyuanHongbaoConst.WANYUANHONGBAO)) {
			return;
		}
		List<Integer> heroAwardStateList = type==WanyuanHongbaoConst.TYPE_LEVEL?hero.getWanyuanHongbao().getLvlAwardsStateList():hero.getWanyuanHongbao().getRcAwardsStateList();
		// Object 数组转换
		ArrayList<Object[]> ctAwardsStateList = new ArrayList<Object[]>();	
		for (int i = 0; i < heroAwardStateList.size(); i++) {
			int awardState = heroAwardStateList.get(i);
			if(awardState == WanyuanHongbaoConst.GETTED) {
				int awardsId = i+type*1000+1;
				ctAwardsStateList.add(new Object[] {awardsId});
			}
		}
		int totalRecharge = Math.max((int)hero.getChongZhiYuan(),hero.getRechargeFeedback().getConsumeYb());
		WanyuanHongbaoSender.sendCmd_20012(hero.getId(),type, totalRecharge, ctAwardsStateList.toArray());
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardsId 奖励id，为配置表奖励id
	 */
	public void getAwards(Hero hero, int awardsId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, WanyuanHongbaoConst.WANYUANHONGBAO)) {
			return;
		}
		Struct_wyhb_780 struct_wyhb_780 = Config_wyhb_780.getIns().get(awardsId);
		if (struct_wyhb_780 == null) { // 奖励不存在
			WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.FAILURE_NOT_AWARD);
			return;
		}
		if(struct_wyhb_780.getType()==WanyuanHongbaoConst.TYPE_LEVEL) {
			List<Integer> awardStateListLvl = hero.getWanyuanHongbao().getLvlAwardsStateList();// 万元红包等级奖励列表List
			int awardIndex = awardsId%(struct_wyhb_780.getType()*1000)-1;
			Integer statlvl = awardStateListLvl.get(awardIndex);
			if(statlvl == WanyuanHongbaoConst.GETTED) {// 不能重复领取
				WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.FAILURE_NOT_REP);
				return;
			}
			if(hero.getLevel()<struct_wyhb_780.getLimit()) {
				WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.FAILURE_NOT_REACH);
				return;
			}
			int[][] awardlvl = struct_wyhb_780.getReward();
			UseAddUtil.add(hero, awardlvl, SourceGoodConst.WANYUANHONGBAO_AWARD, null, true); // 发放奖励
			awardStateListLvl.set(awardIndex, WanyuanHongbaoConst.GETTED);// 更新奖励状态
			hero.getWanyuanHongbao().setLvlAwardsStateList(awardStateListLvl);
			WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.SUCCESS);
			if(struct_wyhb_780.getBroadcast()!=0)
				ChatManager.getIns().broadCast(ChatConst.WANYUANHONGBAO_LVL,
					new Object[] { hero.getName(), struct_wyhb_780.getLimit(), struct_wyhb_780.getShow() }); // 全服广播
		} else if(struct_wyhb_780.getType()==WanyuanHongbaoConst.TYPE_RECHARGE_TOTAL) {
			List<Integer> awardStateListRc = hero.getWanyuanHongbao().getRcAwardsStateList();// 万元红包等级奖励列表List
			int awardIndexRc = awardsId%(struct_wyhb_780.getType()*1000)-1;
			Integer statRc = awardStateListRc.get(awardIndexRc);
			if(statRc == WanyuanHongbaoConst.GETTED) {// 不能重复领取
				WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.FAILURE_NOT_REP);
				return;
			}
			int totalRecharge = Math.max((int)hero.getChongZhiYuan(),hero.getRechargeFeedback().getConsumeYb());
			if(totalRecharge<struct_wyhb_780.getLimit()) {
				WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.FAILURE_NOT_REACH);
				return;
			}
			int[][] awardRc = struct_wyhb_780.getReward();
			UseAddUtil.add(hero, awardRc, SourceGoodConst.WANYUANHONGBAO_AWARD, null, true); // 发放奖励
			awardStateListRc.set(awardIndexRc, WanyuanHongbaoConst.GETTED);// 更新奖励状态
			hero.getWanyuanHongbao().setRcAwardsStateList(awardStateListRc);
			WanyuanHongbaoSender.sendCmd_20014(hero.getId(), WanyuanHongbaoConst.SUCCESS);
			if(struct_wyhb_780.getBroadcast()!=0)
				ChatManager.getIns().broadCast(ChatConst.WANYUANHONGBAO_RECHARGE,
					new Object[] { hero.getName(), struct_wyhb_780.getShow() }); // 全服广播
		}
	}
	
}
