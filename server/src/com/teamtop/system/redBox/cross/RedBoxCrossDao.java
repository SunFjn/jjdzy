package com.teamtop.system.redBox.cross;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class RedBoxCrossDao {
	
	private static RedBoxCrossDao ins;
	public static RedBoxCrossDao getIns() {
		if(ins == null) {
			ins = new RedBoxCrossDao();
		}
		return ins;
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
	public void insertOnDuplicateBatch(Collection<RedBoxCross> collection , String[] notInclude, int zoneid) throws Exception{
		DaoUtil.insertOnDuplicateBatch(collection, RedBoxCross.class,RedBoxCrossMapper.class, zoneid, notInclude,1000);
	}
	/**
	 * 插入数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void insertRank(RedBoxCross joiner) throws Exception {
		DaoUtil.insert(joiner, RedBoxCrossMapper.class, GameProperties.getFirstZoneId());
	}
	/**
	 * 获取所有参与者数据
	 * @author lobbyer
	 * @param term
	 * @return
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	@SuppressWarnings("unchecked")
	public List<RedBoxCross> findAllJoinerList() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			RedBoxCrossMapper mapper = session.getMapper(RedBoxCrossMapper.class);
			List<Object> list = mapper.findRedBoxCrossList();
			List<RedBoxCross> datas = new ArrayList<RedBoxCross>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				RedBoxCross rank = OrmSqlUtil.getObjFromDB(map, RedBoxCross.class);
				//rank.initData();
				datas.add(rank);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 删除所有参与者数据
	 * @author lobbyer
	 * @param term
	 * @throws Exception
	 * @date 2016年8月18日
	 */
	public void deleteRedBoxCross() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			RedBoxCrossMapper mapper = session.getMapper(RedBoxCrossMapper.class);
			mapper.truncate();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}

}
