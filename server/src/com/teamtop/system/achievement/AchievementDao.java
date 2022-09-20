package com.teamtop.system.achievement;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class AchievementDao {

	private static AchievementDao ins;

	public static AchievementDao getIns() {
		if(ins == null) {
			ins = new AchievementDao();
		}
		return ins;
	}
	
	/**
	 * @param info
	 * @throws Exception
	 * @date
	 */
	public void updateInfo(Achievement info) throws Exception {
		DaoUtil.update(info, AchievementMapper.class, GameProperties.getFirstZoneId());
	}

	/**
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public Achievement findAchievement(long hid) throws Exception {
		int zoneid = CommonUtil.getZoneIdById(hid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			AchievementMapper mapper = session.getMapper(AchievementMapper.class);
			Object obj = mapper.findAchievement(hid);
			Map<String, Object> map = (Map<String, Object>) obj;
			Achievement t = OrmSqlUtil.getObjFromDB(map, Achievement.class);
			return t;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	
	/**
	 * @param hid
	 * @param type
	 *            boss类型
	 * @param i
	 *            名次
	 * @return
	 * @throws Exception
	 */
	public void checkTask(long hid, int type, int i) {
		try {
			Achievement findAchievement = AchievementDao.getIns().findAchievement(hid);
			if (findAchievement != null) {
				Map<Integer, Map<Integer, Integer>> countMap = findAchievement.getCountMap();
				if (countMap == null) {
					countMap = new HashMap<>();
				}
				Map<Integer, Integer> map = countMap.get(type);
				if (map == null) {
					map = new HashMap<>();
					countMap.put(type, map);
				}
				Integer num = map.get(i);
				if (num == null) {
					num = 0;
				}
				map.put(i, num + 1);
				AchievementDao.getIns().updateInfo(findAchievement);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			LogTool.error(e, AchievementDao.class, hid, "", "AchievementDao checkTask type = " + type + " rank = " + i);
		}
	}

}
