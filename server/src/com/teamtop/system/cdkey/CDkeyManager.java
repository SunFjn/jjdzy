package com.teamtop.system.cdkey;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.cdkey.cross.CDkeyIO;
import com.teamtop.system.cdkey.model.CDkey;
import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_jhm_721;
import excel.struct.Struct_jhm_721;

public class CDkeyManager {
	private static CDkeyManager ins = null;

	public static CDkeyManager getIns() {
		if (ins == null) {
			ins = new CDkeyManager();
		}
		return ins;
	}

	private CDkeyManager() {

	}

	/**
	 * 激活码领取奖励
	 * 
	 * @param hero
	 * @param cdkey
	 */
	public void getCDkeyAward(Hero hero, String cdkey) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CDkeyConst.CDKEY_SYSTEMID)) {
			return;
		}
		if (cdkey.equals("")) {// 激活码为空
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_NULL, null);
			return;
		}
		CDkey cdkeyData = hero.getCdkey();
		Map<Integer, Set<String>> commCDkeyMap = cdkeyData.getCommCDkeyMap();
		for (Set<String> set : commCDkeyMap.values()) {
			if (set.contains(cdkey)) {
				CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_HAD_USED, null);
				return;
			}
		}
		CDkeyIO.getIns().getCDkeyAward(hero, cdkey);

	}

	public void getCDkeyAwardCallback(Hero hero, int state, CDkeyData cdkeyData) throws Exception {
		if (state == CDkeyConst.CROSS_STATE_FAULT) {// 激活码有误
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_FAULT, null);
			return;
		}
		if (state == CDkeyConst.CROSS_STATE_USED) {// 激活码已被使用
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_USED, null);
			return;
		}
		if (state == CDkeyConst.CDKEY_STATE_OUTOFDATE) {// 激活码已过期
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_OUTOFDATE, null);
			return;
		}
		if (state == CDkeyConst.CROSS_STATE_GAINLIMIT) {// 同类型激活码领取达到上限
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_GAINLIMIT, null);
			return;
		}
		if (state == CDkeyConst.CROSS_STATE_HAD_USED) {// 已使用过该通用码
			CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.CDKEY_HAD_USED, null);
			return;
		}
		int type = cdkeyData.getType();
		Struct_jhm_721 struct_jhm_721 = Config_jhm_721.getIns().get(type);
		int[][] award = struct_jhm_721.getJl();
		UseAddUtil.add(hero, award, SourceGoodConst.CDKEY_REWARD, null, true); // 发放奖励
		CDkey cdkey = hero.getCdkey();
		Map<Integer, Integer> gainCDkeyRecordMap = cdkey.getGainCDkeyRecordMap();
		if (!gainCDkeyRecordMap.containsKey(type)) {
			gainCDkeyRecordMap.put(type, 0);
		}
		int sameTypeGainNum = gainCDkeyRecordMap.get(type);
		gainCDkeyRecordMap.put(type, sameTypeGainNum + 1); // 增加同类型激活码领取次数
		Map<Integer, Set<String>> commCDkeyMap = cdkey.getCommCDkeyMap();
		Set<String> set = commCDkeyMap.get(type);
		if (set == null) {
			set = new HashSet<>();
			commCDkeyMap.put(type, set);
		}
		set.add(cdkeyData.getCdkey());
		CDkeySender.sendCmd_2212(hero.getId(), CDkeyConst.SUCCESS, cdkeyData.getCdkey());
	}
}
