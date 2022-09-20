package com.teamtop.system.battleVixens;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;

public class BattleVixensDao {

	private static BattleVixensDao battleVixensDao;

	private BattleVixensDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleVixensDao getIns() {
		if (battleVixensDao == null) {
			battleVixensDao = new BattleVixensDao();
		}
		return battleVixensDao;
	}

	/**
	 * 初始化排行榜
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<BattleVixens> initRank() throws Exception {
		List<BattleVixens> rsList = null;
		for (int zoneid : GameProperties.zoneids) {
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				BattleVixensMapper mapper = session.getMapper(BattleVixensMapper.class);
				List<Object> findMany = mapper.initRank(TimeDateUtil.getTodayZeroTimeReturnInt());
				if (findMany != null) {
					for (Object obj : findMany) {
						if (rsList == null)
							rsList = new ArrayList<BattleVixens>();
						Map<String, Object> map = (Map<String, Object>) obj;
						BattleVixens ar = OrmSqlUtil.getObjFromDB(map, BattleVixens.class);
						rsList.add(ar);
					}
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return rsList;
	}

}
