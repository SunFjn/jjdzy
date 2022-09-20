package com.teamtop.system.push;

import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

/**
 * 推送系统
 */
public class PushManager {

	private static PushManager PushManager;

	private PushManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PushManager getIns() {
		if (PushManager == null) {
			PushManager = new PushManager();
		}
		return PushManager;
	}

	/**
	 * 打开
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			Push push = hero.getPush();
			if (push == null) {
				return;
			}
			List<Object[]> pushList = push.getPushList();
			PushSender.sendCmd_7502(hero.getId(), pushList.toArray());
		} catch (Exception e) {
			LogTool.error(e, PushManager.class, hero.getId(), hero.getName(), "openUI");
		}
	}


	/**
	 * 设置推送 
	 * 后端改为单纯保存设置
	 * 
	 * @param hero
	 */
	public void setPust(Hero hero, Object[] data) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		try {
			Push push = hero.getPush();
			if (push == null) {
				return;
			}
			List<Object[]> pushList = push.getPushList();
			pushList.clear();
			for (Object msg : data) {
				Object[] obj = (Object[]) msg;
				pushList.add(obj);
			}
			push.setPushList(pushList);
		}catch (Exception e) {
			LogTool.error(e, PushManager.class, hero.getId(), hero.getName(), "setPust");
		}
	}




}
