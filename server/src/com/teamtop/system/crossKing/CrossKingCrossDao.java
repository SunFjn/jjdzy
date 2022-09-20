package com.teamtop.system.crossKing;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingInfoMapper;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.crossKing.model.CrossKingRankMapper;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossKingCrossDao {
	private static CrossKingCrossDao ins;
	public static CrossKingCrossDao getIns() {
		if(ins == null) {
			ins = new CrossKingCrossDao();
		}
		return ins;
	}
	
	/**
	 * 插入一个赛季信息
	 * @author lobbyer
	 * @param info
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void insert(CrossKingInfo info) throws Exception {
		DaoUtil.insert(info, CrossKingInfoMapper.class, GameProperties.getFirstZoneId());
	}
	/**
	 * 更新赛季数据
	 * @author lobbyer
	 * @param info
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void updateInfo(CrossKingInfo info) throws Exception {
		DaoUtil.update(info, CrossKingInfoMapper.class, GameProperties.getFirstZoneId());
	}
	/**
	 * 获取当前赛季数据
	 * @author lobbyer
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public CrossKingInfo findInfo() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossKingInfoMapper mapper = session.getMapper(CrossKingInfoMapper.class);
			CrossKingInfo info = mapper.findInfo();
			return info;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 插入赛季排行数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void insertRank(CrossKingRank rank) throws Exception {
		DaoUtil.insert(rank, CrossKingRankMapper.class, GameProperties.getFirstZoneId());
	}
	/**
	 * 获取指定赛季排行数据
	 * @author lobbyer
	 * @param term
	 * @return
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	@SuppressWarnings("unchecked")
	public List<CrossKingRank> findTermRank() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossKingRankMapper mapper = session.getMapper(CrossKingRankMapper.class);
			List<Object> list = mapper.findTermRank();
			List<CrossKingRank> datas = new ArrayList<CrossKingRank>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				CrossKingRank rank = OrmSqlUtil.getObjFromDB(map, CrossKingRank.class);
				//rank.initData();
				datas.add(rank);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 删除赛季数据
	 * @author lobbyer
	 * @param term
	 * @throws Exception
	 * @date 2016年8月18日
	 */
	public void deleteTerm() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossKingRankMapper mapper = session.getMapper(CrossKingRankMapper.class);
			mapper.truncate();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 批量更新排行数据
	 * @author lobbyer
	 * @param collection
	 * @param notInclude
	 * @param zoneid
	 * @throws Exception
	 * @date 2016年8月23日
	 */
	public void insertOnDuplicateBatch(Collection<CrossKingRank> collection , String[] notInclude, int zoneid) throws Exception{
		DaoUtil.insertOnDuplicateBatch(collection, CrossKingRank.class,CrossKingRankMapper.class, zoneid, notInclude,1000);
	}
}
