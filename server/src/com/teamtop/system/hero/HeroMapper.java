package com.teamtop.system.hero;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.mail.HeroLevelInfo;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.util.mybatis.BaseMapper;


public interface HeroMapper extends BaseMapper<Hero>{
	public long insertGen(General general) throws SQLException;
	public Long getHidByAid(long aid) throws Exception;
	public List<HeroSexCount> getHeroSexCount(int zoneid) throws Exception;
	public Hero findHidByName(String name);
	public List<Long> findHidsByName(String name);
	public Long findHidByOpenid(String openid);
	public Long findHidByPfOpenid(String pfopenid);
	public List<Long> findHidByOpenids(Map<String, Object> params);
	public Long getHidByName(String name);
	public List<Long> findAllHid();
	public List<Long> findAllHidByConditions(String sql);
	public List<HeroLevelInfo> findAllHidByConditionsLh(String sql);
	public long findHeroNum();
	public long findIpNum();
	public void UpdateStopTalk(long hid) throws Exception;
	public void batchUpdateStopTalk(String data) throws Exception;
	public void freeStopTalk(long hid) throws Exception;
	public Hero findBasic(long hid) throws Exception;
	public Hero find(long key,List<String> excludeTbs) throws Exception;
	public List<Object> findGenerals(long hid) throws SQLException;
	//查找离线战斗玩家数据
	public Map<String,Object> findBattleHero(long hid) throws SQLException;
	//查找离线战斗玩家阵法数据
	public Map<String,Object> findBattleHeroDeploy(long hid) throws SQLException;
	//查找离线战斗玩家技能数据
	public Map<String,Object> findBattleHeroSkill(long hid) throws SQLException;
	//查找离线战斗玩家上阵将领数据
	public List<Map<String,Object>> findBattleGeneral(Map<String, Object> params) throws SQLException;
	//查找离线战斗玩家上阵将领数据
	public List<Map<String,Object>> findBattleExtGeneral(Map<String, Object> params) throws SQLException;
	//查找离线战斗宠物数据
	public Map<String,Object> findBattlePet(long hid) throws SQLException;
	//查找离线战斗侠客岛数据
	public Map<String,Object> findBattleGeneralIsland(long hid) throws SQLException;
	//查找离线战斗麒麟臂数据
	public Map<String,Object> findBattleUnicornArm(long hid) throws SQLException;
	//登陆查找hero基本信息
	public LightLoginHero findHeroLoginBase(long hid) throws Exception;
	//查找婚宴送礼列表
	Map<String,Object> findMarriageGiftList(long hid) throws Exception;
	/**
	 * 离线 更新玩家的霸服礼包领取状态
	 * @param hero
	 */
	public void updateGiftTaskIds(Map<String, Object> params) throws Exception;
	/**
	 * 更新玩家帮会相关信息
	 * @param hero
	 */
	public void updateGangInfo(Map<String, Object> params) throws Exception;
	/**
	 * 更新玩家称号信息
	 * @param params
	 * @throws Exception
	 */
	public void updateTitleInfo(Map<String, Object> params) throws Exception;
	/**
	 * 更新已穿戴称号信息
	 * @param params
	 * @throws Exception
	 */
	public void updateWearInfo(Map<String, Object> params) throws Exception;
	//更新角色封号禁言状态
	public void updateForbidInfo(Hero hero) throws Exception;
	//更新玩家结婚
	public void updateMarriage(Map<String, Object> params) throws Exception;
	//更新玩家滚服状态
	public void updateOldPlayer(Map<String, Object> params) throws Exception;
	//名字是否存在
	public Long existName(String name) throws Exception;
	//更新名字
	public void updateName(Map<String, Object> params) throws Exception;
	//更新内部号标识
	public void updateIndoor(Map<String, Object> params) throws Exception;
	//查找任务集市
	public Map<String,Object> getZoneMarket(Map<String, Object> params) throws Exception;
	//根据ip查找注册ip或登录ip相同的角色id
	public List<Long> findHeroByIp(String ip) throws Exception;
	//更新离线的广告号数据
	public void updateAdHero(Map<String, Object> params) throws Exception;
	//查找广告号的注册ip
	public List<String> findAdIp() throws Exception;
	//查找符合等级的轻量级玩家
	public List<LightLoginHero> getLvHero(Map<String, Object> params) throws Exception;
	//更新登录平台渠道数据
	public void updateLoginPf(Map<String, Object> params) throws Exception;
	//查找玩家level
	public int findLevel(long id) throws Exception;
	//查找收益上限
	public Map<String, Object> findLimitRec(long id) throws Exception;
	//更新收益上限
	public void updateLimitRec(Map<String, Object> params) throws Exception;
	//删除决斗无双上周前10排行
	public void delJuedouwsSZ10Rank() throws Exception;
	//查找国家
	public List<Object> findCountry();
	//查询玩家总战力前20成员
	public List<CountryStrengthRankModel> findCountryStrength(int countryType);
	//根据国家查询等级前20成员
	public List<FightNSScoreRank> findCountryLevelPeople(int countryType);
	//根据国家战力由高到低查询
	public List<KingShipModel> findAllCountryStrength(int countryType);
	//更新玩家的充值次数
	public void updateHeroPayNum(Map<String, Object> params) throws Exception;
	//按照时间+平台 查询全区总充值
	public Integer getRechargeNumByTimePfcode(Map<String, Object> params) throws Exception;
	//按照时间查询全区总充值 
	public Integer getRechargeNumByTime(Map<String, Object> map) throws Exception;
	//更新zeroTime
	public void updateZeroTime(Map<String, Object> params);
	//获取达标的VIP人数
	public List<Long> getNumByVip(int vipLv);
	
}
