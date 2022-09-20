package com.teamtop.system.crossSelectKing;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossSelectKingDao {
	
	private static CrossSelectKingDao ins;
	public static CrossSelectKingDao getIns() {
		if(ins == null) {
			ins = new CrossSelectKingDao();
		}
		return ins;
	}
	
	
	/**
	 * 查找所有本地晋级赛战斗数据 有可能记录为空
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings("unchecked")
	public List<CrossSelectKing> findAllCrossSelectKingData() throws Exception{
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossSelectKingMapper mapper = session.getMapper(CrossSelectKingMapper.class);
			List<Object> list = mapper.findallCrossSelectKing();
			List<CrossSelectKing> datas = new ArrayList<CrossSelectKing>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				CrossSelectKing t = OrmSqlUtil.getObjFromDB(map, CrossSelectKing.class);
				datas.add(t);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 获取当前届所有节点数据
	 * @author lobbyer
	 * @param term
	 * @date 2016年6月21日
	 */
	@SuppressWarnings("unchecked")
	public List<CrossSelectKingNode> findCrossSelectKingNode() throws Exception{
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossSelectKingNodeMapper mapper = session.getMapper(CrossSelectKingNodeMapper.class);
			List<Object> list = mapper.findCrossSelectKingNode();
			List<CrossSelectKingNode> datas = new ArrayList<CrossSelectKingNode>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				CrossSelectKingNode node = OrmSqlUtil.getObjFromDB(map, CrossSelectKingNode.class);
				datas.add(node);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 批量更新节点数据
	 * @param collection
	 * @param zoneid
	 * @throws Exception
	 */
	public void updateNodeBatch(Collection<CrossSelectKingNode> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossSelectKingNode.class,CrossSelectKingNodeMapper.class, GameProperties.getFirstZoneId(), null,DaoUtil.size_100);
	}
	
	public void updateNodeBatchByZoneid(Collection<CrossSelectKingNode> collection,int zoneid) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossSelectKingNode.class,CrossSelectKingNodeMapper.class, zoneid, null,DaoUtil.size_300);
	}
	/**
	 * 清空所有晋级赛战斗节点数据
	 * @throws Exception
	 */
	public void truncateSelectKingNode(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CrossSelectKingNodeMapper mapper = session.getMapper(CrossSelectKingNodeMapper.class);
			mapper.truncateCrossSelectKingNode();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 清空所有晋级赛参赛者信息
	 * @throws Exception
	 */
	public void truncateSelectKing(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CrossSelectKingMapper mapper = session.getMapper(CrossSelectKingMapper.class);
			mapper.truncate();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 批量更新角色数据
	 * @param collection
	 * @param zoneid
	 * @throws Exception
	 */
	public void updateCrossSelectKing(Collection<CrossSelectKing> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossSelectKing.class,CrossSelectKingMapper.class, GameProperties.getFirstZoneId(), null,DaoUtil.size_100);
	}

}
