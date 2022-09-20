package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.mail.HeroLevelInfo;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.system.equip.EquipEvent;
import com.teamtop.system.event.systemEvent.ISystemEvent;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.AutoObjTableUtil;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.BaseDao;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 角色系统DAO数据处理类
 * @author hepl
 *
 */
public class HeroDao extends BaseDao<Hero> {
	private static HeroDao ins = null;

	public static HeroDao getIns() {
		if (ins == null) {
			ins = new HeroDao();
		}
		return ins;
	}
	private Logger logger = LoggerFactory.getLogger(HeroDao.class);
	public void insert(Hero t) throws Exception {
		DaoUtil.insert(t, HeroMapper.class, t.getZoneid());
//		AutoObjTableUtil.insertBatch(t.getId(), AutoObjTableUtil.newTbList);
	}
	/**
	 * 插入一个将领
	 * @param general
	 * @param zoneid
	 * @throws Exception
	 */
	public void insertGen(General general,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.insertGen(general);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * update
	 * @param hero hero
	 * @param logout 是否登出，清除缓存也算登出
	 * @throws Exception
	 */
	public void update(Hero hero,int syncType) throws Exception {
		LogTool.info("Update DB begin.Important.hid:"+hero.getId()+" type:"+syncType,this);
		try {
			DaoUtil.update(hero, HeroMapper.class, hero.getZoneid());
		} catch (Exception e1) {
			String errMsg = LogTool.exception(e1, hero.getId(), hero.getNameZoneid(), "update hero table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(), new Object[] { "hero", errMsg });
			logger.error(errMsg);
		}
		//将领表更新
		/*try {
			Map<Integer, General> generalMap = hero.getGeneralMap();
			if(generalMap!=null){
				DaoUtil.updateBatch(generalMap.values(), General.class,HeroMapper.class, hero.getZoneid());
			}
		} catch (Exception e1) {
			logger.error(LogTool.exception(e1,hero.getId(),hero.getNameZoneid(),"update general table err"));
		}*/
		//装备数据
		try {
			EquipEvent.getIns().logout(hero);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,hero.getId(),hero.getNameZoneid(),"update equipEvent table err"));
		}
		AutoObjTableUtil.handleTooLong(hero);//同步所有自动入库的表
		if(SystemEventFunction.logoutSyncPubEvents!=null){
			for(ISystemEvent event:SystemEventFunction.logoutSyncPubEvents){
				try {
					event.logoutSyncPub(hero,syncType);
				} catch (Exception e) {
					logger.error(LogTool.exception(e,hero.getId(),hero.getNameZoneid(),"logoutSyncPub err"));
				}
			}
		}
		LogTool.info("Update DB end.Important.hid:"+hero.getId()+","+hero.getNameZoneid(),this);
	}
	public Hero find(long key,List<String> excludeTbs) throws Exception {
		Hero hero = DaoUtil.find(key, HeroMapper.class, Hero.class, CommonUtil.getZoneIdById((key)));
		AutoObjTableUtil.findObjs(hero,excludeTbs);
		return hero;
	}
	@SuppressWarnings("unchecked")
	public Map<Integer,General> findGenerals(long heroId) throws Exception {
		Map<Integer, General> generalMap = new ConcurrentHashMap<Integer, General>();
		int zoneid = MybatisUtil.getZoneid(heroId);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			List<Object> findMany = mapper.findGenerals(heroId);
			if(findMany!=null){
				for(Object obj:findMany){
					Map<String,Object> map = (Map<String, Object>) obj;
					General general = OrmSqlUtil.getObjFromDB(map, General.class);
					generalMap.put(general.getJob(), general);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return generalMap;
	}
	/**
	 * 登陆查找hero基本信息
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public LightLoginHero findHeroLoginBase(long hid) throws Exception{
		int zoneid = CommonUtil.getZoneIdById(hid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			LightLoginHero hero = mapper.findHeroLoginBase(hid);
			return hero;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	
	/**
	 * 查找hero信息，包含特定的表
	 * @param key 角色id
	 * @param includeTbs 特定的表列表，如果为null或空，则查找全部
	 * @return 角色对象
	 * @throws Exception
	 */
	public Hero findWithInclude(long key, List<String> includeTbs) throws Exception {
		Hero hero = DaoUtil.find(key, HeroMapper.class, Hero.class, CommonUtil.getZoneIdById((key)));
		if(hero==null) return null;
		AutoObjTableUtil.findObjsWithInclude(hero, includeTbs);
		return hero;
	}
	/**
	 * 查找hero基本信息
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public Hero findBasic(long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hid));
		Hero hero = null;
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			hero = mapper.findBasic(hid);
		}finally{
			MybatisUtil.closeSession(session);
		}
		return hero;
	}
	public Map<Integer, List<HeroSexCount>> getHeroSexCount() throws Exception {
		Map<Integer, List<HeroSexCount>> map = new HashMap<Integer, List<HeroSexCount>>();
		for (int zoneid : GameProperties.zoneids) {
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				HeroMapper mapper = session.getMapper(HeroMapper.class);
				List<HeroSexCount> heroSexCount = mapper.getHeroSexCount(zoneid);
				map.put(zoneid, heroSexCount);
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return map;
	}
	
	/**
	 * 根据名称找到hid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public Hero findHidByName(String name) throws Exception {
		for (int zoneid : GameProperties.zoneids) {
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				HeroMapper mapper = session.getMapper(HeroMapper.class);
				Hero hero = mapper.findHidByName(name);
				if(hero != null) {
					return hero;
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return null;
	}
	
	/**
	 * 根据名称找到hid，指定区号
	 * @param name 名称
	 * @param zoneid 区号
	 * @return
	 * @throws Exception
	 */
	public Hero findHidByName(String name, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Hero hero = mapper.findHidByName(name);
			if(hero != null) {
				return hero;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return null;
	}
	
	/**
	 * 根据名称模糊查找hid
	 * @param name
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public List<Long> findHidsByName(String name, int zoneid) throws Exception {
		List<Long> rslist = null;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			rslist = mapper.findHidsByName(name);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rslist;
	}
	
	/**
	 * 根据openid找到hid
	 * @param openid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public Long findHidByOpenid(String openid, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Long hid = mapper.findHidByOpenid(openid);
			if(hid != null) {
				return hid;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return null;
	}
	/**
	 * 根据pfopenid找到hid
	 * @param openid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public Long findHidByPfOpenid(String pfopenid, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Long hid = mapper.findHidByPfOpenid(pfopenid);
			if(hid != null) {
				return hid;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return null;
	}
	
	
	/**
	 * 根据name找到hid
	 * @param openid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public Long getHidByName(String name, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Long hid = mapper.getHidByName(name);
			if(hid != null) {
				return hid;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return null;
	}
	
	/**
	 * 查找所有角色的hid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public List<Long> findAllHid(int zoneid) throws Exception {
		List<Long> rslist = null;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			rslist = mapper.findAllHid();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rslist;
	}
	
	public long findHeroNum(int zoneid) {
		long totalNum = 0;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			totalNum = mapper.findHeroNum();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return totalNum;
	}
	
	public long findIpNum(int zoneid) {
		long totalNum = 0;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			totalNum = mapper.findIpNum();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return totalNum;
	}

	/**
	 * 模拟登陆用
	 * 
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public long findHeroNumForSmiulate(int zoneid) throws Exception {
		long totalNum = 0;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			totalNum = mapper.findHeroNum();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return totalNum;
	}

	/**
	 * 查找所有满足条件的角色的hid
	 * @param zoneid
	 * @param minLvl 最小等级
	 * @param maxLvl 最大等级
	 * @param minStrength 最小战力
	 * @param maxStrength 最大战力
	 * @param minMoney 最小充值
	 * @param maxMoney 最大充值
	 * @return
	 * @throws Exception
	 */
	public List<Long> findAllHidByConditions(int zoneid, int minLvl, int maxLvl, long minStrength, long maxStrength,
			int minMoney, int maxMoney) throws Exception {
		List<Long> rslist = null;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			StringBuilder sql = new StringBuilder();
			StringBuilder condition = new StringBuilder();
			sql.append("select id from hero");
			boolean first = false;
			if(maxLvl!=0) {
				first = true;
				condition.append("level >= ").append(minLvl).append(" and level <= ").append(maxLvl)
				.append(" and reincarnationLevel = 0");
			}
			if(maxStrength!=0) {
				if(first) {
					condition.append(" and ");
				}
				condition.append("totalStrength >= ").append(minStrength).append(" and totalStrength <= ")
						.append(maxStrength);
			}
			if(maxMoney!=0) {
				if(first) {
					condition.append(" and ");
				}
				condition.append("chongZhiYuan >= ").append(minMoney).append(" and chongZhiYuan <= ")
						.append(maxMoney);
			}
			if(condition.length()>0) {
				sql.append(" where ").append(condition);
			}
			rslist = mapper.findAllHidByConditions(sql.toString());
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rslist;
	}
	
	/**
	 * 查找所有满足条件的角色的hid
	 * @param zoneid
	 * @param minLvl 最小等级
	 * @param maxLvl 最大等级
	 * @param minStrength 最小战力
	 * @param maxStrength 最大战力
	 * @param minMoney 最小充值
	 * @param maxMoney 最大充值
	 * @return
	 * @throws Exception
	 */
	public List<HeroLevelInfo> findAllHidByConditionsLh(int zoneid, int minLvl, int maxLvl, long minStrength, long maxStrength,
			int minMoney, int maxMoney) throws Exception {
		List<HeroLevelInfo> rslist = null;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			StringBuilder sql = new StringBuilder();
			StringBuilder condition = new StringBuilder();
			sql.append("select id,level,reincarnationLevel from hero");
			boolean first = false;
			if(maxLvl!=0) {
				first = true;
				condition.append("reincarnationLevel > 0");
			}
			if(maxStrength!=0) {
				if(first) {
					condition.append(" and ");
				}
				condition.append("totalStrength >= ").append(minStrength).append(" and totalStrength <= ")
						.append(maxStrength);
			}
			if(maxMoney!=0) {
				if(first) {
					condition.append(" and ");
				}
				condition.append("chongZhiYuan >= ").append(minMoney).append(" and chongZhiYuan <= ")
						.append(maxMoney);
			}
			if(condition.length()>0) {
				sql.append(" where ").append(condition);
			}
			rslist = mapper.findAllHidByConditionsLh(sql.toString());
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rslist;
	}
	
	public void UpdateStopTalk(Hero hero)throws Exception {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.UpdateStopTalk(hero.getId());
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	public void batchUpdateStopTalk(String data,int zoneid)throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.batchUpdateStopTalk(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	public void freeStopTalk(Hero hero)throws Exception {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.freeStopTalk(hero.getId());
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 查找战斗hero对象
	 * @param hid
	 * @throws Exception
	 */
	public Hero findBattleHero(long hid) throws Exception{
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hid));
		Hero hero = null;
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> findBattleHero = mapper.findBattleHero(hid);
			hero = OrmSqlUtil.getObjFromDB(findBattleHero, Hero.class);
			
			Map<String, Object> findBattleHeroDeploy = mapper.findBattleHeroDeploy(hid);
			
			
			
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("hid", hid);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return hero;
	}
	
	

	/**
	 * 查找离线时候婚宴收礼信息
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	/*public Hero findMarriageGiftList(long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hid));
		Hero hero = null;
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> marriageGift = mapper.findMarriageGiftList(hid);
			hero = OrmSqlUtil.getObjFromDB(marriageGift, Hero.class);
		} finally {
			MybatisUtil.closeSession(session);
		}
	return hero;
	}*/
	
	/**
	 * 更新玩家帮会相关信息
	 * @param hero
	 */
	public void updateGangInfo(Hero hero) throws Exception{
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hero.getId()));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hero.getId());
			params.put("gangId", hero.getGangId());
			mapper.updateGangInfo(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新玩家的霸服礼包领取数量
	 * @param hero
	 * @throws Exception
	 */
	public void updateGiftTaskIds(Hero hero) throws Exception {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hero.getId()));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hero.getId());
			params.put("giftTaskIds", ObjStrTransUtil.toStr(hero.getGiftTaskIds()));
			mapper.updateGiftTaskIds(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新玩家称号信息，针对离线玩家
	 * @param hero
	 * @throws Exception
	 */
	public void updateTitleInfo(Hero hero) throws Exception {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hero.getId()));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hero.getId());
			params.put("titleId", ObjStrTransUtil.toStr(hero.getTitleId()));
			mapper.updateTitleInfo(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新角色封号禁言状态
	 * @param hero
	 * @throws Exception
	 */
	public void updateForbidInfo(Hero hero) throws Exception{
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hero.getId()));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.updateForbidInfo(hero);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 更新角色封号禁言状态
	 * @param hero
	 * @throws Exception
	 */
	public void updateMarriage(Hero hero) throws Exception{
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hero.getId()));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hero.getId());
			params.put("marryHid", hero.getMarryHid());
			params.put("marriageId", hero.getMarriageId());
			mapper.updateMarriage(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新玩家滚服状态
	 * @param hid
	 * @param state
	 * @throws Exception
	 */
	public void updateOldPlayer(long hid, int state) throws Exception{
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hid));
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("id", hid);
			params.put("isOldPlayer", state);
			mapper.updateOldPlayer(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	public boolean existName(String name,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Long existName = mapper.existName(name);
			if(existName!=null && existName>0){
				return true;
			}
			return false;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	public void updateName(String name,long hid,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hid);
			params.put("name", name);
			mapper.updateName(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新内部号标识
	 * @param hid
	 * @param type 0非内部号，1是内部号
	 * @param zoneid
	 * @throws Exception
	 */
	public void updateIndoor(long hid, int type, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hid);
			params.put("type", type);
			mapper.updateIndoor(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 根据ip查找注册ip或登录ip相同的角色id
	 * @param ip 广告号的注册ip
	 * @param zoneid 区号
	 * @return 角色id清单
	 * @throws Exception
	 */
	public List<Long> findHeroByIp(String ip, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<Long> list = null;
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			list = mapper.findHeroByIp(ip);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}
	
	/**
	 * 更新离线的广告号数据
	 * @param hid 角色id
	 * @param state 广告号状态
	 * @param type 广告号监控类型
	 * @param illegalState 禁言状态
	 * @param illegalTimeout 禁言时间
	 * @param illegalReason 禁言原因
	 * @param zoneid 区号
	 * @param adTime 广告号添加时间
	 * @throws Exception
	 */
	public void updateAdHero(long hid, int state, int type, int illegalState, int illegalTimeout, String illegalReason,
			int zoneid, int adTime) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("id", hid);
			params.put("state", state);
			params.put("type", type);
			params.put("illegalState", illegalState);
			params.put("illegalTimeout", illegalTimeout);
			params.put("illegalReason", illegalReason);
			params.put("time", adTime);
			mapper.updateAdHero(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 查找广告号的注册ip
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public List<String> findAdIp(int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<String> list = null;
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			list = mapper.findAdIp();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}
	
	/**
	 * 查找一定等级的玩家轻量级数据
	 * @author lobbyer
	 * @param otherIds
	 * @param zoneid
	 * @return
	 * @throws Exception
	 * @date 2016年7月8日
	 */
	public List<LightLoginHero> getLvHero(String otherIds, int reLvel, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("rebornlv", reLvel);
			if(otherIds.equals("")) otherIds="0";
			params.put("ids", otherIds);
			List<LightLoginHero> list = mapper.getLvHero(params);
			return list;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新登录平台渠道数据
	 * @param params
	 * @throws Exception
	 */
	public void updateLoginPf(long hid, String loginPf, String loginPd, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hid);
			params.put("loginPf", loginPf);
			params.put("loginPd", loginPd);
			mapper.updateLoginPf(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 查找玩家等级
	 * @param hid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public int findLevel(long hid, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			return mapper.findLevel(hid);
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 获取角色收益上限
	 * @author lobbyer
	 * @param hid
	 * @return
	 * @throws Exception
	 * @date 2017年2月17日
	 */
	public Hero findLimitRec(long hid) throws Exception{
		int zoneid = MybatisUtil.getZoneid(hid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> findLimitRec = mapper.findLimitRec(hid);
			Hero hero = OrmSqlUtil.getObjFromDB(findLimitRec, Hero.class);
			if(hero == null) {
				hero = new Hero();
				Map<Integer, Map<Integer, Integer>> limitRec = new HashMap<Integer, Map<Integer,Integer>>();
				hero.setLimitRec(limitRec);
				hero.setId(hid);
				return hero;
			}
			return hero;
		} catch (Exception e) {
			MybatisUtil.closeSession(session);
		}
		return null;
	}
	
	/**
	 * 更新角色收益上限
	 * @author lobbyer
	 * @param hid
	 * @param limitRec
	 * @throws Exception
	 * @date 2017年2月17日
	 */
	public void updateLimitRec(Hero hero) throws Exception{
		int zoneid = MybatisUtil.getZoneid(hero.getId());
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			Map<Integer, Map<Integer, Integer>> rec = hero.getLimitRec();
			String str = ObjStrTransUtil.toStr(rec);
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hid", hero.getId());
			params.put("limitRec", str);
			mapper.updateLimitRec(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	
	
	
	
	/**
	 * 删除决斗无双上周前10排行
	 * @param zoneid
	 * @throws Exception
	 */
	public void delJuedouwsSZ10Rank(int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			mapper.delJuedouwsSZ10Rank();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 根据国家查找玩家id
	 * @param zoneid
	 * @param cid
	 * @return
	 */
	public Map<Long, Integer> findCountry(int zoneid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			List<Object> findCountry = mapper.findCountry();
			HashMap<Long, Integer> hashMap = new HashMap<Long, Integer>();
			for(Object obj:findCountry) {
				@SuppressWarnings("unchecked")
				Map<String, Object> map = (Map<String, Object>)obj;
				hashMap.put((Long) map.get("id"), (Integer) map.get("countryType"));
			}
			return hashMap;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 根据国家查询玩家战力限前20
	 * @param zoneid
	 * @param cid
	 * @return
	 */
	public List<CountryStrengthRankModel> findCountryStrength(int zoneid, int cid){
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			List<CountryStrengthRankModel> list = mapper.findCountryStrength(cid);
			return list;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 根据国家查询玩家全部战力(由高到低)
	 * @param zoneid
	 * @param cid
	 * @return
	 */
	public List<KingShipModel> findAllCountryStrength(int zoneid, int cid){
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			List<KingShipModel> dataList = mapper.findAllCountryStrength(cid);
			return dataList;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	public List<FightNSScoreRank> findCountryLevelPeople(int zoneid, int cid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			List<FightNSScoreRank> dataList = mapper.findCountryLevelPeople(cid);
			return dataList;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 更新玩家的充值次数
	 * @param openid
	 * @param successPayNum
	 * @throws Exception
	 */
	public void updateHeroPayNum(String openid, int successPayNum) throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("openid", openid);
			params.put("successPayNum", successPayNum);
			mapper.updateHeroPayNum(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 按照时间+平台 查询全区总充值
	 * @paytime1 
	 * @paytime2 
	 * @pfcode 
	 */
	public int getRechargeNumByTimePfcode(Integer paytime1,Integer paytime2,String pfcode) throws Exception{
		int sum=0;
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("paytime1", paytime1);
			map.put("paytime2", paytime2);
			StringBuffer pfcodebuffer=new StringBuffer();
			pfcodebuffer.append("'").append(pfcode).append("'");
			map.put("pfcode", pfcodebuffer.toString());
			Integer num = mapper.getRechargeNumByTimePfcode(map);
			if (num==null) {
				num= 0;
			}
			sum=sum+num;
		} finally {
			MybatisUtil.closeSession(session);
		}
		return sum;
		
	}
	/**
	 * 按照时间 查询全区总充值
	 * @param payTime1
	 * @param payTime12
	 * @return
	 */
	public int getRechargeNumByTime(Integer paytime1,Integer paytime2) throws Exception{
		int sum=0;
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("paytime1", paytime1);
			map.put("paytime2", paytime2);
			Integer num = mapper.getRechargeNumByTime(map);
			if (num==null) {
				num= 0;
			}
			sum=sum+num;
		} finally {
			MybatisUtil.closeSession(session);
		}
		return sum;
	}

	/**
	 * 更新零点时间
	 * 
	 * @param hero
	 */
	public void updateZeroTime() throws Exception {
		int firstZoneId = GameProperties.getFirstZoneId();
		SqlSession session = MybatisUtil.getSession(firstZoneId);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			Map<String, Object> params = new HashMap<String, Object>();
			int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			params.put("zeroTime", zeroTime);
			mapper.updateZeroTime(params);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 获取满足vip条件的玩家数量
	 * @param viplv
	 * @return
	 */
	public int getNumByVip(int viplv) {
		List<Long> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				HeroMapper mapper = session.getMapper(HeroMapper.class);
				List<Long> dataList = mapper.getNumByVip(viplv);
				if (dataList != null) {
					list.addAll(dataList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list.size();
	}


}
