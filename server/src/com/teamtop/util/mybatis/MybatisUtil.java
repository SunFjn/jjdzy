package com.teamtop.util.mybatis;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.datasource.unpooled.UnpooledDataSource;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.autoTable.AlterColumn;
import com.teamtop.util.db.autoTable.DDLMapper;
import com.teamtop.util.db.autoTable.DDLUtil;
import com.teamtop.util.db.autoTable.FieldStru;
import com.teamtop.util.log.LogTool;

/**
 * Mybatis工具类，提供sqlSession
 * @author kyle
 *
 */
public class MybatisUtil extends AbsServerEvent{
	private static Logger logger = LoggerFactory.getLogger(MybatisUtil.class);
	/**
	 * 所有数据库连接session数据 key：zoneid，value：SqlSessionFactory
	 */
	private static Map<Integer,SqlSessionFactory> factoryMap = new HashMap<Integer, SqlSessionFactory>();
	/**
	 * 所有数据库连接信息 key：zoneid，value：数据库信息
	 */
	private static Map<Integer,DataBaseProp> dataBasePropMap = new HashMap<Integer, DataBaseProp>();
	/**
	 * 获取所有数据库连接信息 key：zoneid，value：数据库信息
	 * @return
	 */
	public static Map<Integer, DataBaseProp> getDataBasePropMap() {
		return dataBasePropMap;
	}
	/**
	 * 获取sqlSession
	 * @return
	 */
	public static SqlSession getSession(int zoneid){
		SqlSessionFactory sqlSessionFactory = factoryMap.get(zoneid);
		if(sqlSessionFactory==null){
			logger.info("get DB session but not found,init this session,zoneid:"+zoneid);
			DataBaseProp prop = dataBasePropMap.get(zoneid);
			if(prop == null){
				return null;
			}
			sqlSessionFactory = DataSourceFactory.getSqlSessionFactory(zoneid, DataSourceFactory.DRIVER, prop.getUrl(), prop.getUser(), prop.getPwd());
			logger.info("get DB session url"+prop.getUrl()+" user="+prop.getUser()+" pwd="+prop.getPwd());
			factoryMap.put(zoneid, sqlSessionFactory);
		}
		try {
			SqlSession openSession = sqlSessionFactory.openSession();
			return openSession;
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "zoneid:"+zoneid));
			return null;
		}
	}
	/**
	 * 获取本服 sqlSession
	 * @author lobbyer
	 * @return
	 * @date 2016年6月15日
	 */
	public static SqlSession getLocalSession() {
		int firstZoneId = GameProperties.getFirstZoneId();
		return getSession(firstZoneId);
	}
	
	public static void closeSession(SqlSession session){
		if(session!=null){
			session.close();
		}
	}
	
	@SuppressWarnings("resource")
	public void getDBS() throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(GamePath.CONFIG_DIR+"dbs.properties")));
		String readLine = null;
		List<String[]> zoneidinfo = new ArrayList<String[]>();
		while((readLine = br.readLine())!=null){
			readLine = readLine.trim();
			if(readLine.indexOf("#")>=0 ||"".equals(readLine)) continue;
			String[] arr = readLine.split("=");
			String key = arr[0];
			String value = arr[1];
			String[] varr = value.split("&");
			zoneidinfo.add(new String[]{key,varr[0],varr[1],varr[2]});
		}
		if(zoneidinfo.size()==0){
			throw new RunServerException(null, "dbs properties not found zoneid");
		}
		for(String[] info:zoneidinfo){
			int zoneid=Integer.parseInt(info[0]);
			String url = info[1];
			int indexOf = url.indexOf("/", 13);
			String dbname = url.substring(indexOf+1, url.length());
			DataBaseProp dataBaseProp = new DataBaseProp(zoneid, info[1]+"?useUnicode=true&amp;characterEncoding=utf-8", info[2], info[3]);
			dataBaseProp.setDbname(dbname);
			dataBasePropMap.put(zoneid, dataBaseProp);
			
			String[] split = url.split("//");
			String[] split2 = split[1].split(":");
			GameProperties.dbAddress.put( zoneid, split2[0]);
		}
		br.close();
	}
	public void getDB() throws Exception{
		//调试阶段记录sql打印
		UnpooledDataSource source = DataSourceFactory.createUnpooledDataSource(GamePath.CONFIG_DIR+"db.properties");
		TransactionFactory transactionFactory = new JdbcTransactionFactory();
		Environment environment = new Environment("dataBaseProp", transactionFactory, source);
		Configuration configuration = new Configuration(environment);
		//add mapper
		String resource = "com/teamtop/util/mybatis/dataBaseProp.xml";
		ErrorContext.instance().resource(resource);
        InputStream inputStream = Resources.getResourceAsStream(resource);
        XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
        mapperParser.parse();
        //build
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
		//find db properties
		SqlSession session = sqlSessionFactory.openSession();
		try{
			checkDBPro("dataBaseProp", "com.teamtop.util.mybatis.DataBaseProp", session);
			DataBasePropMapper mapper = session.getMapper(DataBasePropMapper.class);
			List<DataBaseProp> list = mapper.getProp();
			if(list.size()==0){
				UnpooledDataSource ds = (UnpooledDataSource) session.getConfiguration().getEnvironment().getDataSource();
				mapper.insert(new DataBaseProp(GameProperties.getFirstZoneId(), ds.getUrl(), ds.getUsername(), ds.getPassword()));
				session.commit();
				list = mapper.getProp();
			}
			for(DataBaseProp prop:list){
				int zoneid = prop.getZoneid();
				dataBasePropMap.put(zoneid, prop);
//				if(GameProperties.serverId==1){
//					if(GameProperties.zoneids.contains(zoneid)){
//						SqlSessionFactory factory = DataSourceFactory.getSqlSessionFactory(zoneid, DataSourceFactory.DRIVER, prop.getUrl(), prop.getUser(), prop.getPwd());
//						factoryMap.put(zoneid, factory);
//					}
//				}
			}
		}finally{
			session.close();
		}
	}
	@Override
	public void startServer() throws RunServerException {
		try {
			int gm = PropertiesTools.getPropertiesInt("gmFlag");
			if(gm==1){
				DataSourceFactory.DRIVER = "com.p6spy.engine.spy.P6SpyDriver";
			}
			getDBS();
		} catch (Exception e) {
			throw new RunServerException(e, "get db properties");
		}
	}
	public static void main(String[] args) throws RunServerException, SQLException {
		new MybatisUtil().startServer();
		/*while(true){
			SqlSession openSession = factoryMap.get(1).openSession();
			try {
				System.err.println(openSession.getConnection());
				AccountMapper accountMapper = openSession.getMapper(AccountMapper.class);
				accountMapper.find("select * from account where id=1");
			}finally{
				openSession.close();
			}
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}*/
	}
	
	public static int getZoneid(long key){
		return CommonUtil.getZoneIdById(key);
	}
	/**
	 * 检查配置数据库信息的表是否存在
	 * @param tbname
	 * @param resClass
	 * @param session
	 */
	private static void checkDBPro(String tbname,String resClass,SqlSession session){
		UnpooledDataSource ds = (UnpooledDataSource) session.getConfiguration().getEnvironment().getDataSource();
		SqlSessionFactory factory = DataSourceFactory.getSqlSessionFactory(0, ds.getDriver(), ds.getUrl(), ds.getUsername(), ds.getPassword());
		session = factory.openSession();
		List<FieldStru> descTable = null;
		try {
			DDLMapper mapper = session.getMapper(DDLMapper.class);
			try {
				descTable = mapper.descTable(tbname);
			} catch (Exception e) {
			}
			if (descTable == null) {
				List<AlterColumn> alterTableList = DDLUtil.getAlterTableList(resClass, tbname);
				// 新表
				String sql = DDLUtil.getCreateTableSql(tbname, alterTableList,null,1);
				mapper.createTable(sql);
				session.commit();
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			session.close();
		}
	}

	public static String getInfo() {
		String info1 = "\r\n";
		try {
			Iterator<DataBaseProp> iterator = dataBasePropMap.values().iterator();
			for (; iterator.hasNext();) {
				DataBaseProp prop = iterator.next();
				info1 += CommonUtil.safeFormat("连接池别名=%s;数据库URL=%s;用户名=%s;\r\n",
						prop.getDbname() + ":" + prop.getZoneid(), prop.getUrl(), prop.getUser());
			}
		} catch (Exception e) {
			LogTool.error(e, MybatisUtil.class, "MybatisUtil getInfo");
		}
		return info1;
	}
}
