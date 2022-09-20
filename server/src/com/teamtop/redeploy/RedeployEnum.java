package com.teamtop.redeploy;
/**
 * 部署服枚举
 * @author Administrator
 *
 */
public enum RedeployEnum {
	bin,//bin
	type,//bin类型
	server,//服务端
	client,//客户端
	hotswap,//服务端热更
	reboot,//服务端重启
	info,//server端返回给client端的打印；日志
	error,//server端返回给client端的错误打印
	zone,//区号，同一个服务器的不同java
	zonelist,//需要热更的正式服区号
	pf, // 平台号
	version,//版本号
	msg,//热更正式服的文字消息
	groovy,//脚本
	groovyByZID,//脚本执行
	groovyByZIDCheck,//脚本执行
	GROOVY_CONVENIENT,//脚本便捷式
	hotswapByZID,//根据区号热更
	hotswapByZIDCheck,//查看热更结果
	
	updateVersionAndMakeBin,//更新指定工程的版本号,打包bin
	updateOldBin,//更新oldbin下的bin.zip
	jar,//要跟新的jar名  xxx.jar
	numServer,//查看区服总数
	checkAllServer,//查看启动和关闭的区
	updateServerBin,//全服更bin
	updateServerJar,//全服更jar
	updateServerBin2,//全服更bin 解压
	updateServerJar2,//全服更jar 解压
	deleteOldJar,//全服移除旧jar 包
	checkUpdateServerBinJar,//全服更bin检查
	stopServer,//关闭全服
	startServer,//启动全服
	getVersion1,//获取版本号
	getVersion2,//获取版本号
	getOldBinFileList,//获取oldbin文件列表
	updateAllServerConfig,//全服修改config文件//TODO
	
	name,//文件名
	logTime,//log日志文件夹名  yyyy-mm-dd
	LOG_EXCEPTION,
	LOG_CONSOLE,//console日志
	LOG_INFO_WARN_ERR,//InfoWarnErr日志
}
