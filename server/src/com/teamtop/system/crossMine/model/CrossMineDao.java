package com.teamtop.system.crossMine.model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossMine.CrossMineMapper;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossMineDao {
	
	private static CrossMineDao ins;
	public static CrossMineDao getIns() {
		if(ins == null) {
			ins = new CrossMineDao();
		}
		return ins;
	}
	
	
	/**
	 * 查找所有本地晋级赛战斗数据 有可能记录为空
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings("unchecked")
	public List<CrossMine> findAllCrossMineData() throws Exception{
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossMineMapper mapper = session.getMapper(CrossMineMapper.class);
			List<Object> list = mapper.findallCrossMine();
			List<CrossMine> datas = new ArrayList<CrossMine>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				CrossMine t = OrmSqlUtil.getObjFromDB(map, CrossMine.class);
				datas.add(t);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	

	/**
	 * 批量更新数据
	 * @param collection
	 * @param zoneid
	 * @throws Exception
	 */
	public void updateCrossMineBatch(Collection<CrossMine> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossMine.class,CrossMineMapper.class, GameProperties.getFirstZoneId(), null,DaoUtil.size_100);
	}
	
	
	/**
	 * 清空
	 * @throws Exception
	 */
	public void truncateCrossMine(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CrossMineMapper mapper = session.getMapper(CrossMineMapper.class);
			mapper.truncate();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 插入数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void insertCrossMine(CrossMine crossMine) throws Exception {
		DaoUtil.insert(crossMine, CrossMineMapper.class, GameProperties.getFirstZoneId());
	}
	
	
}
