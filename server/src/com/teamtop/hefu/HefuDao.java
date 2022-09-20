package com.teamtop.hefu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.autoTable.DDLDao;
import com.teamtop.util.db.autoTable.FieldStru;
import com.teamtop.util.mybatis.MybatisUtil;


/**
 * 合服
 * @author kyle
 *
 */
public class HefuDao {
	private static HefuDao ins = null;
	
	public static HefuDao getIns(){
		if(ins == null){
			ins = new HefuDao();
		}
		return ins;
	}
	
	/**	 * 合服数据批量处理数量	 */
	public static int hefuBatchNum = 500;
	private Logger logger = LoggerFactory.getLogger(HefuDao.class);
	/**
	 * 找出合服需要删除的角色数据
	 * @param zoneid 区id
	 * @param level 等级
	 * @param chongZhiYuan 充值RMB
	 * @param time 登出比较的时间
	 * @return
	 */
	public List<DelHero> getDelHero(int zoneid,int level,int chongZhiYuan,int time){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("level", level);
		if(chongZhiYuan>0){
			chongZhiYuan = chongZhiYuan-1;
		}
		params.put("chongZhiYuan", chongZhiYuan);
		params.put("time", time);
		
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<DelHero> rsList = null;
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			rsList = mapper.getDelHero(params);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	
	/**
	 * 删除玩家关联的表
	 */
	public void delHero(int zoneid,List<DelHero> delList){
		//优化合服打印 heroext 的一些类删除流失玩家 可以只打印几组
		int logNums=0;
		for (HefuDel hd : HefuCache.getHeroExtraTbList()) {
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				String tbname = hd.getTbname();
				String key = hd.getKey();
				List<FieldStru> descTable = DDLDao.getInstance().descTable(tbname, zoneid);
				if(descTable==null){
					logger.info("del hero extra table,but not found:"+tbname);
					continue;
				}
				logger.info("del hero extra table:"+tbname);
				logNums++;
				HefuMapper mapper = session.getMapper(HefuMapper.class);
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("tbname", tbname);
				params.put("id", key);
				StringBuilder sb = new StringBuilder();
				int count = 0;
				int size = delList.size();
				for(int i=0;i<size;i++){
					DelHero del = delList.get(i);
					long hid = del.getHid();
					count++;
					sb.append(hid);
					if(count>=hefuBatchNum){
						params.put("delcontent", sb.toString());
						//del
						mapper.delExtra(params);
						if (logNums<=1) {
							logger.info("del hero.del "+hefuBatchNum+" hid:"+sb);
						}
						session.commit();
						count = 0;
						sb.setLength(0);
					}else if(i<size-1){
						sb.append(",");
					}
				}
				if(count>0 && sb.length()>0){
					//del
					params.put("delcontent", sb.toString());
					mapper.delExtra(params);
					session.commit();
				}
				
				if(count>0 && sb.length()>0&& tbname.equals("hero")){
					if (logNums<=3) {
						logger.info("del hero.del "+sb.length()+" hid:"+sb);
					}
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
	}
	
	/**
	 * 重置指定表某字段 设置为"",0等
	 */
	public void resetByUpdate( int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		HefuMapper mapper = session.getMapper(HefuMapper.class);
		try {
			for (HefuDel hd : HefuCache.getResetByUpdateList()) {
				String tbname = hd.getTbname();
				String resetField = hd.getKey();
				List<FieldStru> descTable = DDLDao.getInstance().descTable(tbname, zoneid);
				if(descTable==null){
					logger.info("resetByUpdate,but not found tbname:"+tbname+" zoneid:"+zoneid );
					continue;
				}
				logger.info("resetByUpdate.table:"+tbname+" resetField:"+resetField+" zoneid:"+zoneid);
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("tbname", tbname);
				params.put("resetField", resetField);
				mapper.resetByUpdate(params);
				session.commit();
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 获取需要转移的表的所有数据
	 * @param tbname
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public List<Object> getMoveData(String tbname, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			List<Object> findMany = mapper.getMoveData(tbname);
			return findMany;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 转移数据（插入）
	 * @param tbname 表名
	 * @param zoneid 区号
	 * @param sbField 表字段str
	 * @param sbVal 值str
	 * @throws Exception
	 */
	public void moveData(String tbname, int zoneid,String sbField,String sbVal) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("tbname", tbname);
			params.put("sbField", sbField);
			params.put("sbVal", sbVal);
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.moveData(params);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 清空数据 
	 * @param tbname 表名
	 * @param zoneid 区号
	 * @throws Exception
	 */
	public void truncateData(String tbname, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.truncateData(tbname);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 找出所有角色名字数据
	 * @return
	 */
	public List<HefuHeroName> getAllHeroName(int zoneid){
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			return mapper.getAllHeroName();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 修改角色名字
	 * @param hn
	 */
	public void updateHeroName(HefuHeroName hn){
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(hn.getHid()));
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.updateHeroName(hn);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 删除没有附件的邮件
	 * @param hn
	 */
	public void delReadNoFjMail(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.delReadNoFjMail();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 删除公共数据
	 */
	public void delGlobaldata(int type,int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.delGlobaldata(type);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 删除 crossMine 中hid=1的主键
	 * @throws Exception
	 */
	public void del_crossMine(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.del_crossMine();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 删除 tigerPassEmployer 中hid=1的主键
	 * @throws Exception
	 */
	public void del_tigerPassEmployer(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.del_tigerPassEmployer();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}	
	/**
	 * 删除crossSelectKing 中hid=1的主键
	 * @throws Exception
	 */
	public void del_crossSelectKing(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.del_crossSelectKing();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	
	/**
	 * 删除 crosszhuluheroinfo 中hid=1的主键
	 * @throws Exception
	 */
	public void del_crosszhuluheroinfo(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.del_crosszhuluheroinfo();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 删除crosskingrank 错误的数据 
	 * @throws Exception
	 */
	public void del_crosskingrank(int zoneid)throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			mapper.del_crosskingrank();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 *  找出crosskingrank中 最大npc序号
	 */
	public int getMaxNpcId(int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			Integer maxNpcId = mapper.getMaxNpcId();
			if (maxNpcId!=null) {
				return maxNpcId;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return 0;
	}
	
	/**
	 *  找出crossselectkingnode中 最大nodeIndex序号
	 */
	public int getMaxNodeIndex(int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HefuMapper mapper = session.getMapper(HefuMapper.class);
			Integer maxNodeIndex = mapper.getMaxNodeIndex();
			if (maxNodeIndex!=null) {
				return maxNodeIndex;
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return 0;
	}
	
	
}
