package com.teamtop.util.groovy;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;

import groovy.lang.GroovyClassLoader;
/**
 * 调用groovy脚本
 * @author Administrator
 *
 */
public class InvokeGroovy {
	private static Logger logger = LoggerFactory.getLogger(InvokeGroovy.class);
	public static void main(String[] args) {
			runScript("");
	}
	
	public static String runScript(String groovyFile){
		StringBuilder rs = new StringBuilder("run script ok");
		ClassLoader cl = new InvokeGroovy().getClass().getClassLoader();
		GroovyClassLoader groovyCl = new GroovyClassLoader(cl);
		try {
			//URL resource = InvokeGroovy.class.getResource("/groovyScript/Debug.groovy");
			@SuppressWarnings("rawtypes")
			//Class<IFoo> groovyClass = groovyCl.parseClass(new File(URLDecoder.decode((resource.getFile()),"UTF-8")));
			Class groovyClass = groovyCl.parseClass(new File(InvokeGroovy.class.getResource("/groovyScript/"+groovyFile).toURI()));
			IFoo foo = (IFoo)groovyClass.newInstance();
			Object result = foo.run(2);
			groovyCl.close();
			logger.info("debug ok");
			rs.append(" 【【脚本结果】").append(result).append("】");
		} catch (Exception e) {
			String exception = LogTool.exception(e);
			logger.error(exception);
			rs = new StringBuilder(exception);
		}
		return rs.toString();
	}
	
}
