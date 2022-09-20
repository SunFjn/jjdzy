package com.teamtop.util.LoggerAppender;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.spi.LoggingEvent;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.Layout;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

public class WarnAppender extends AppenderBase<LoggingEvent> {
//	public static final int ERROR_UPLOAD = 6733;
	private static Logger logger = LoggerFactory.getLogger(WarnAppender.class);
	protected MyEncoder<LoggingEvent> encoder;

	@Override
	public void start() {
		super.start();
	}

	@Override
	protected void append(LoggingEvent e) {
		try {
			final String layout = encoder.getLayout(e);
			if(GameProperties.gmFlag){
				StringBuilder sb = new StringBuilder();
				sb.append(layout);
				int i;   
			    StackTraceElement stack[] = (new Throwable()).getStackTrace();   
			    for (i=0; i < stack.length; i++) {   
			      StackTraceElement ste=stack[i];   
//			      System.out.println(ste.getClassName()+"."+ste.getMethodName()+"(...)");   
//			      System.out.println(i+"--"+ste.getMethodName());   
//			      System.out.println(i+"--"+ste.getFileName());   
//			      System.out.println(i+"--"+ste.getLineNumber());   
			      String className = ste.getClassName();
			      if(className.indexOf("com.teamtop")<0) continue;
			      if(className.indexOf("Appender")>0) continue;
			      sb.append("at ").append(className).append(".").append(ste.getMethodName()).append("(")
			      .append(ste.getFileName()).append(":").append(ste.getLineNumber()).append(")");
			      sb.append('\n').append('\n');
			    }
			    String data = null;
			    if(sb.length()>65535){
			    	data = sb.substring(0, 65535);
			    }else{
			    	data = sb.toString();
			    }
//			    NettyWrite.writeAll(GmCmd.GC_ErrorPrint_96,new ErrorPrintResp(data,1));
			}
		} catch (Exception e1) {
//			logger.error(LogGame.exception(e1));
		}
	}

	public void setLayout(Layout<LoggingEvent> layout) {
		MyEncoder<LoggingEvent> lwe = new MyEncoder<LoggingEvent>();
		lwe.setLayout(layout);
		lwe.setContext(context);
		this.encoder = lwe;
	}
}
