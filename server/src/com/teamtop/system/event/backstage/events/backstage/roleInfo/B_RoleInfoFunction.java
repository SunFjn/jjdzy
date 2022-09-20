package com.teamtop.system.event.backstage.events.backstage.roleInfo;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.account.Account;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.time.TimeDateUtil;

public class B_RoleInfoFunction {
	
	private static B_RoleInfoFunction ins = null;

	public static synchronized B_RoleInfoFunction getIns() {
		if (ins == null) {
			ins = new B_RoleInfoFunction();	
		}
		return ins;
	}
	/**
	 * 当玩家等级 战力 vip 金钱 发生变化调用
	 * @param hero
	 */
	public void addM_RoleInfo(Hero hero) {
		String openid=hero.getOpenid();
		int zoneid=hero.getZoneid();
		TempData tempData = hero.getTempData();
		if(tempData==null) {
			return;
		}
		Account account=tempData.getAccount();
		if (account==null) {
			return;
		}
		if (!B_RoleInfoCache.getRoleinfomap().containsKey(hero.getZoneid())) {
			B_RoleInfoCache.getRoleinfomap().put(hero.getZoneid(), new ConcurrentHashMap<Long,B_RoleInfo>());
		}
		ConcurrentHashMap<Long,B_RoleInfo> roleinfomapByzoneid=B_RoleInfoCache.getRoleinfomap().get(hero.getZoneid());
		if (roleinfomapByzoneid.containsKey(hero.getId())) {
			B_RoleInfo m_RoleInfo=roleinfomapByzoneid.get(hero.getId());
			m_RoleInfo.setOpenid(openid);
			m_RoleInfo.setId(hero.getId());
			m_RoleInfo.setZoneid(zoneid);
			m_RoleInfo.setPfopenid(account.getPfopenid());
			m_RoleInfo.setPfcode(account.getPfcode());
			m_RoleInfo.setUsesys(account.getUsesys());
			m_RoleInfo.setCreateip(account.getCreateip());
			m_RoleInfo.setName(hero.getName());
			m_RoleInfo.setLevel(hero.getLevel());
			m_RoleInfo.setTotalStrength(hero.getTotalStrength());
			m_RoleInfo.setCoin(hero.getCoin());
			m_RoleInfo.setYuanbao(hero.getYuanbao());
			m_RoleInfo.setVip(hero.getVipLv());
			m_RoleInfo.setSumMoney(hero.getChongZhiYuan());
			m_RoleInfo.setCreateHeroTime(hero.getCreateTime());
			m_RoleInfo.setRegisterTime(account.getCreatetime());
			m_RoleInfo.setUpdateTime(TimeDateUtil.getCurrentTime());
			m_RoleInfo.setIsOld(hero.getIsOldPlayer());
			m_RoleInfo.setRecentlyRechargeTime(hero.getRecentlyRechargeTime());
			m_RoleInfo.setReincarnationLevel(hero.getReincarnationLevel());
		}else {
			B_RoleInfo m_RoleInfo=new B_RoleInfo();
			m_RoleInfo.setOpenid(openid);
			m_RoleInfo.setId(hero.getId());
			m_RoleInfo.setZoneid(zoneid);
			m_RoleInfo.setPfopenid(account.getPfopenid());
			m_RoleInfo.setPfcode(account.getPfcode());
			m_RoleInfo.setUsesys(account.getUsesys());
			m_RoleInfo.setCreateip(account.getCreateip());
			m_RoleInfo.setName(hero.getName());
			m_RoleInfo.setLevel(hero.getLevel());
			m_RoleInfo.setTotalStrength(hero.getTotalStrength());
			m_RoleInfo.setCoin(hero.getCoin());
			m_RoleInfo.setYuanbao(hero.getYuanbao());
			m_RoleInfo.setVip(hero.getVipLv());
			m_RoleInfo.setSumMoney(hero.getChongZhiYuan());
			m_RoleInfo.setCreateHeroTime(hero.getCreateTime());
			m_RoleInfo.setRegisterTime(account.getCreatetime());
			m_RoleInfo.setUpdateTime(TimeDateUtil.getCurrentTime());
			m_RoleInfo.setIsOld(hero.getIsOldPlayer());
			m_RoleInfo.setRecentlyRechargeTime(hero.getRecentlyRechargeTime());
			m_RoleInfo.setReincarnationLevel(hero.getReincarnationLevel());
			roleinfomapByzoneid.put(m_RoleInfo.getId(), m_RoleInfo);
		}
	}

}
