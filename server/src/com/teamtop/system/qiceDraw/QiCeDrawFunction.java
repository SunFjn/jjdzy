package com.teamtop.system.qiceDraw;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.qiceDraw.model.QiCeDraw;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class QiCeDrawFunction {
	private static QiCeDrawFunction QiCeDrawFunction;

	private QiCeDrawFunction() {
	}

	public static synchronized QiCeDrawFunction getIns() {
		if (QiCeDrawFunction == null) {
			QiCeDrawFunction = new QiCeDrawFunction();
		}
		return QiCeDrawFunction;
	}
	
	/**
	 * 登录推送图标显示红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, QiCeDrawConst.SysId))
				return;
			QiCeDraw qiCeDraw = hero.getQiCeDraw();
			if (qiCeDraw == null)
				return;
			Map<Integer, Integer> awards = qiCeDraw.getAwards();
			if(awards == null) return;
			for(Integer num : awards.values()) {
				if(num > 0) {
					RedPointFunction.getIns().addLoginRedPoint(hero, QiCeDrawConst.SysId, QiCeDrawConst.RED_POINT,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "QiCeDrawFunction loginRed");
		}
	}
}
