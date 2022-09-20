package com.teamtop.util.mybatis;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.ibatis.datasource.pooled.PooledDataSource;
import org.apache.ibatis.datasource.unpooled.UnpooledDataSource;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.defaults.DefaultSqlSessionFactory;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;

import com.teamtop.util.Properties.SafeProperties;

public class DataSourceFactory {
	public static String DRIVER = "com.mysql.jdbc.Driver";
//	public static final String DRIVER = "com.p6spy.engine.spy.P6SpyDriver";
	public static void main(String[] args) {
//		String url = "jdbc:mysql://192.168.7.251:3306/xy?useUnicode=true&amp;characterEncoding=utf-8";
//		String user = "develop";
//		String pwd = "develop";
		
//		SqlSessionFactory sqlSessionFactory = getSqlSessionFactory(1, DRIVER, url, user, pwd);
		
		
		
	}
	
	/**
	 * 获取sqlSessionFactory
	 * @param zoneid
	 * @param driver
	 * @param url
	 * @param user
	 * @param pwd
	 * @return
	 */
	public static SqlSessionFactory getSqlSessionFactory(int zoneid,String driver,String url,String user,String pwd){
		SqlSessionFactory sqlSessionFactory = null;
		try {
			PooledDataSource dataSource = DataSourceFactory.createPooledDataSource(driver,url,user,pwd);
			dataSource.setPoolPingEnabled(true);
			dataSource.setPoolPingQuery("show tables");
//			dataSource.setPoolPingQuery("SELECT 1 FROM hero limit 1");
			dataSource.setPoolPingConnectionsNotUsedFor(99000);
			
			TransactionFactory transactionFactory = new JdbcTransactionFactory();
			Environment environment = new Environment("s"+zoneid, transactionFactory, dataSource);
			InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
			XMLConfigReader xmlConfigReader = new XMLConfigReader(is);
			sqlSessionFactory = new DefaultSqlSessionFactory(xmlConfigReader.parse());
			Configuration configuration = sqlSessionFactory.getConfiguration();
			configuration.setEnvironment(environment);
			
			/*Configuration configuration = new Configuration(environment);
			TypeAliasRegistry typeAliasRegistry = configuration.getTypeAliasRegistry();
			String realFile = FileUtils.getAbsFilePath("mybatis.xml");
			realFile = URLDecoder.decode(realFile, "utf-8");
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			//alias
			Element alaisEle = root.element("typeAliases");
			for (Iterator<?> it = alaisEle.elementIterator("typeAlias"); it.hasNext();) {
				bean = (Element) it.next();
				String alias = bean.attributeValue("alias");
				String type = bean.attributeValue("type");
				typeAliasRegistry.registerAlias(alias, type);
			}
			//mapper
			Element mapperEle = root.element("mappers");
			for (Iterator<?> it = mapperEle.elementIterator("mapper"); it.hasNext();) {
				bean = (Element) it.next();
				String resource = bean.attributeValue("resource");
				ErrorContext.instance().resource(resource);
	            InputStream inputStream = Resources.getResourceAsStream(resource);
	            XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
	            mapperParser.parse();
			}
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
			sqlSessionFactory.getConfiguration().getEnvironment();*/
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return sqlSessionFactory;
	}
	
	public static UnpooledDataSource createUnpooledDataSource(String resource) throws IOException {
//		Properties props = Resources.getResourceAsProperties(resource);
		resource = URLDecoder.decode(resource, "utf-8");
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(resource));
		SafeProperties props = new SafeProperties();
		props.load(in);
		return createUnPooledDataSource(DRIVER, props.getProperty("url"), 
				props.getProperty("username"), props.getProperty("password"));
	}
	
	public static UnpooledDataSource createUnPooledDataSource(String driver, String url, String username, String password) throws IOException {
		UnpooledDataSource ds = new UnpooledDataSource();
		ds.setDriver(driver);
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		return ds;
	}
	public static PooledDataSource createPooledDataSource(String resource) throws IOException {
//		Properties props = Resources.getResourceAsProperties(resource);
		resource = URLDecoder.decode(resource, "utf-8");
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(resource));
		SafeProperties props = new SafeProperties();
		props.load(in);
		return createPooledDataSource(DRIVER, props.getProperty("url"), 
				props.getProperty("username"), props.getProperty("password"));
	}

	public static PooledDataSource createPooledDataSource(String driver, String url, String username, String password) throws IOException {
		PooledDataSource ds = new PooledDataSource();
		ds.setDriver(driver);
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		return ds;
	}

	public static void runScript(DataSource ds, String resource) throws IOException, SQLException {
		Connection connection = ds.getConnection();
		try {
			ScriptRunner runner = new ScriptRunner(connection);
			runner.setAutoCommit(true);
			runner.setStopOnError(false);
			runner.setLogWriter(null);
			runner.setErrorLogWriter(null);
			runScript(runner, resource);
		} finally {
			connection.close();
		}
	}

	public static void runScript(ScriptRunner runner, String resource) throws IOException, SQLException {
		Reader reader = Resources.getResourceAsReader(resource);
		try {
			runner.runScript(reader);
		} finally {
			reader.close();
		}
	}

	public static DataSource createBlogDataSource() throws IOException, SQLException {
		String BLOG_PROPERTIES = "databases/blog/blog-derby.properties";
		String BLOG_DDL = "databases/blog/blog-derby-schema.sql";
		String BLOG_DATA = "databases/blog/blog-derby-dataload.sql";
		DataSource ds = createUnpooledDataSource(BLOG_PROPERTIES);
		runScript(ds, BLOG_DDL);
		runScript(ds, BLOG_DATA);
		return ds;
	}

	public static DataSource createJPetstoreDataSource() throws IOException, SQLException {
		String JPETSTORE_PROPERTIES = "databases/jpetstore/jpetstore-hsqldb.properties";
		String JPETSTORE_DDL = "databases/jpetstore/jpetstore-hsqldb-schema.sql";
		String JPETSTORE_DATA = "databases/jpetstore/jpetstore-hsqldb-dataload.sql";
		DataSource ds = createUnpooledDataSource(JPETSTORE_PROPERTIES);
		runScript(ds, JPETSTORE_DDL);
		runScript(ds, JPETSTORE_DATA);
		return ds;
	}
}
