package com.teamtop.system.guanqia;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;
/**
 * 关卡
 *
 */
public class GuanqiaDao {

	private static GuanqiaDao ins = null;
	
	public static GuanqiaDao getIns() {
		if (ins == null) {
			ins = new GuanqiaDao();
		}
		return ins;
	}
	/**
	 * 初始化排行榜
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Guanqia> initRank() throws Exception{
		List<Guanqia> rsList = null;
		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				GuanqiaMapper mapper = session.getMapper(GuanqiaMapper.class);
				List<Object> findMany = mapper.initRank();
				if(findMany!=null){
					for(Object obj:findMany){
						if(rsList==null) rsList = new ArrayList<Guanqia>();
						Map<String,Object> map = (Map<String, Object>) obj;
						Guanqia ar = OrmSqlUtil.getObjFromDB(map, Guanqia.class);
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
