package com.teamtop.system.tigerPass.cross;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class TigerPassEmployerDao {
	

	private static TigerPassEmployerDao ins;
	public static TigerPassEmployerDao getIns() {
		if(ins == null) {
			ins = new TigerPassEmployerDao();
		}
		return ins;
	}
	
	
	/**
	 * 查找所有本地虎牢关 雇佣兵
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<TigerPassEmployer> findAllTigerPassEmployerData() throws Exception{
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			TigerPassEmployerMapper mapper = session.getMapper(TigerPassEmployerMapper.class);
			List<Object> list = mapper.findallTigerPassEmployer();
			List<TigerPassEmployer> datas = new ArrayList<TigerPassEmployer>();
			for(Object obj:list){
				Map<String,Object> map = (Map<String, Object>) obj;
				TigerPassEmployer t = OrmSqlUtil.getObjFromDB(map, TigerPassEmployer.class);
				datas.add(t);
			}
			return datas;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 清空
	 * @throws Exception
	 */
	public void truncate(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			TigerPassEmployerMapper mapper = session.getMapper(TigerPassEmployerMapper.class);
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
	public void update(Collection<TigerPassEmployer> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, TigerPassEmployer.class,TigerPassEmployerMapper.class, GameProperties.getFirstZoneId(), null,DaoUtil.size_100);
	}

}
