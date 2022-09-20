package com.teamtop.system.recharge.events;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.recharge.AbsRechargeEvent;

public class RechageFiveTimesHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		/*int pType = Config_shop_011.getIns().get(product_id).getType();
		if (pType != RechargeConst.YB) {
			return;
		}
		Map<Integer, Integer> rechargeFiveTimes = hero.getRechargeFiveTimes();
		if (rechargeFiveTimes == null) {
			return;
		}
		int rmbNum = money;
		List<Struct_chongzhi_716> sortList = Config_chongzhi_716.getIns().getSortList();
		int size = sortList.size();
		Struct_chongzhi_716 chongzhi = null;
		Struct_chongzhi_716 tempChongzhi = null;
		for (int i = 0; i < size; i++) {
			tempChongzhi = sortList.get(i);
			if (tempChongzhi.getRMB() == rmbNum) {
				chongzhi = tempChongzhi;
				break;
			}
		}
		if (chongzhi == null) {
			// 不存在对应的充值项
			return;
		}
		int id = chongzhi.getID();
		Integer num = rechargeFiveTimes.get(id);
		boolean isFive = false;
		if (num == null) {
			num = 0;
			isFive = true;
		} else {
			int limitNum = Config_xtcs_004.getIns().get(RechargeConst.FIVETIMES_NUM).getNum();
			if (num >= limitNum) {
				isFive = true;
			}
		}
		if (isFive) {
			num = 0;
			UseAddUtil.add(hero, GameConst.YUANBAO, RechargeConst.BaseYb*money*4, SourceGoodConst.RECHARGE_FIVETIMES, true);
		} else {
			num += 1;
		}
		rechargeFiveTimes.put(id, num);
		HeroManager.getIns().openRecharge(hero);*/
	}

}
