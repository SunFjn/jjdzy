package com.teamtop.system.wanyuanhongbao;

import java.util.List;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wdtxrank_260;
import excel.config.Config_wyhb_780;

public class WanyuanHongbaoFunction {
	
	private static WanyuanHongbaoFunction ins = null;
	
	public static WanyuanHongbaoFunction getIns() {
		if(ins == null) {
			ins = new WanyuanHongbaoFunction();
		}
		return ins;
	}

	/**
	 * 万元红包奖励未领取完就发158协议通知前端开启入口(登录用)
	 * 
	 * @param hero
	 */
	public void loginNoticeFront(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, WanyuanHongbaoConst.WANYUANHONGBAO)) {
			boolean close = true;
			List<Integer> lvlAwardsStateList = hero.getWanyuanHongbao().getLvlAwardsStateList();
			for (Integer awardsstate : lvlAwardsStateList) {// 万元红包奖励未领取完就发158协议通知前端开启入口
				if (awardsstate != WanyuanHongbaoConst.GETTED) {
					HeroFunction.getIns().addLoginSytemState(hero, WanyuanHongbaoConst.WANYUANHONGBAO,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					return;
				} else if(awardsstate == WanyuanHongbaoConst.NOT_REACH) {
					close = false;
				}
			}
			
			List<Integer> rcAwardsStateList = hero.getWanyuanHongbao().getRcAwardsStateList();
			for (Integer rcawardsstate : rcAwardsStateList) {// 万元红包奖励未领取完就发158协议通知前端开启入口
				if (rcawardsstate != WanyuanHongbaoConst.GETTED) {
					HeroFunction.getIns().addLoginSytemState(hero, WanyuanHongbaoConst.WANYUANHONGBAO,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					return;
				} else if(rcawardsstate == WanyuanHongbaoConst.NOT_REACH) {
					close = false;
				}
			}
			// 发送开启或关闭消息
			HeroSender.sendCmd_20100(hero.getId(), WanyuanHongbaoConst.WANYUANHONGBAO, close?SystemStateEnum.StateEnum.NOT_OPEN.getState():SystemStateEnum.StateEnum.OPEN_NOW.getState());
		} else {
			HeroSender.sendCmd_20100(hero.getId(), WanyuanHongbaoConst.WANYUANHONGBAO, SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
	}

	/**
	 * 更新用户万元红包等级奖励状态
	 * 
	 * @param hero
	 */
	public void refreshAwardState(Hero hero,int type) {
		if (HeroFunction.getIns().checkSystemOpen(hero, WanyuanHongbaoConst.WANYUANHONGBAO)) {
			// 判断等级条件，更新奖励状态
			updateAwardsStateList(hero, type);
		}
	}

	/**
	 * 更新万元红包，等级红包，累计充值红包
	 * 
	 * @param hero
	 * @param type 等级，充值
	 * @param own 当前等级 或者累计充值金额
	 */
	public void updateAwardsStateList(Hero hero, int type) {
		List<Integer> awardsStateList = type == WanyuanHongbaoConst.TYPE_LEVEL?hero.getWanyuanHongbao().getLvlAwardsStateList():hero.getWanyuanHongbao().getRcAwardsStateList();
		for (int j = 1; j <= awardsStateList.size(); j++) {
			Integer state = awardsStateList.get(j - 1);
			if(state == WanyuanHongbaoConst.NOT_REACH) {
				int awardId = type * 1000 + j; // 配置表奖励id
				int need = Config_wyhb_780.getIns().get(awardId).getLimit();
				if(type == WanyuanHongbaoConst.TYPE_LEVEL) {
					if(hero.getLevel()>=need) {
						updateAwardState(hero, type, j, awardsStateList);
					} else {
						break;
					}
				} else if(type == WanyuanHongbaoConst.TYPE_RECHARGE_TOTAL) {
					int totalRecharge = Math.max((int)hero.getChongZhiYuan(),hero.getRechargeFeedback().getConsumeYb());
					if(totalRecharge>=need) {
						updateAwardState(hero, type, j, awardsStateList);
					} else {
						break;
					}
				}
			}
		}
	}

	/**
	 * 更新奖励状态和发送红点
	 * 
	 * @param hero
	 * @param type
	 * @param aStateListIndex
	 * @param awardsStateList
	 */
	public void updateAwardState(Hero hero, int type, int aStateListIndex, List<Integer> awardsStateList) {
		awardsStateList.set(aStateListIndex - 1, WanyuanHongbaoConst.CAN_GET);// 更新奖励状态
		RedPointFunction.getIns().fastUpdateRedPoint(hero, WanyuanHongbaoConst.WANYUANHONGBAO, type, RedPointConst.HAS_RED);
	}

	
}
