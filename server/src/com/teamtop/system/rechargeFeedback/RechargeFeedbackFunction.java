package com.teamtop.system.rechargeFeedback;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.rechargeFeedback.moel.RechargeFeedback;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lchk_744;
import excel.struct.Struct_lchk_744;

public class RechargeFeedbackFunction {
	private static RechargeFeedbackFunction ins = null;

	public static RechargeFeedbackFunction getIns() {
		if (ins == null) {
			ins = new RechargeFeedbackFunction();
		}
		return ins;
	}

	private RechargeFeedbackFunction() {
	}

	public void rechargeYB(Hero hero, int money) {
		// TODO Auto-generated method stub
		try {
			RechargeFeedback rechargeFeedback = hero.getRechargeFeedback();
			Map<Integer, Integer> awardStateMap = rechargeFeedback.getAwardStateMap();
			int consumeYb = rechargeFeedback.getConsumeYb();
			int preYb = consumeYb;//防止重复发邮件
			boolean open = HeroFunction.getIns().checkSystemOpen(hero,SystemIdConst.OFFLINE_TOTAL_RECHARGE);
			rechargeFeedback.setConsumeYb(consumeYb + money);
			int newConsumeYb = rechargeFeedback.getConsumeYb();
			List<Struct_lchk_744> sortList = Config_lchk_744.getIns().getSortList();
			boolean flag = false;
			//List<Struct_lchk_744> lineLists = new ArrayList<>();
			for (Struct_lchk_744 struct_lchk_744 : sortList) {
				int id = struct_lchk_744.getId();
				if (newConsumeYb >= struct_lchk_744.getCoin() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, RechargeFeedbackConst.CAN_GET);
					flag = true;
					if(open && struct_lchk_744.getMail()!=null && preYb<struct_lchk_744.getCoin()) {
						int[][] reward = struct_lchk_744.getMail();
						
						int mailSysId = MailConst.OFFLINE_TOTALRECHARGE;
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailSysId,
								new Object[] { mailSysId, struct_lchk_744.getCoin() }, reward);
					}
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, RechargeFeedbackConst.SYS, 1, RedPointConst.HAS_RED);
			}
			RechargeFeedbackManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "rechargeYB money:" + money);
		}
	}

}
