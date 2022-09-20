package com.teamtop.system.activity.ativitys.yuanXiao.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class YuanXiaoCrossDao {
	
	private static YuanXiaoCrossDao ins;
	public static YuanXiaoCrossDao getIns() {
		if(ins == null) {
			ins = new YuanXiaoCrossDao();
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
	public void insertOnDuplicateBatch(Collection<YuanXiaoCrossJoiner> collection , String[] notInclude, int zoneid) throws Exception{
		DaoUtil.insertOnDuplicateBatch(collection, YuanXiaoCrossJoiner.class,YuanXiaoCrossJoinerMapper.class, zoneid, notInclude,1000);
	}
	/**
	 * 插入数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public void insertRank(YuanXiaoCrossJoiner joiner) throws Exception {
		DaoUtil.insert(joiner, YuanXiaoCrossJoinerMapper.class, GameProperties.getFirstZoneId());
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
	public List<YuanXiaoCrossJoiner> findAllJoinerList() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			YuanXiaoCrossJoinerMapper mapper = session.getMapper(YuanXiaoCrossJoinerMapper.class);
			List<Object> list = mapper.findJoinerList();
			List<YuanXiaoCrossJoiner> datas = new ArrayList<YuanXiaoCrossJoiner>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				YuanXiaoCrossJoiner rank = OrmSqlUtil.getObjFromDB(map, YuanXiaoCrossJoiner.class);
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
	public void deleteAllJoiner() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			YuanXiaoCrossJoinerMapper mapper = session.getMapper(YuanXiaoCrossJoinerMapper.class);
			mapper.truncate();
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}

}
