package com.teamtop.util.LoggerAppender;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.spi.LoggingEvent;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.Layout;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

public class ErrorAppender extends AppenderBase<LoggingEvent> {
//	public static final int ERROR_UPLOAD = 6733;
	private static Logger logger = LoggerFactory.getLogger(ErrorAppender.class);
	protected MyEncoder<LoggingEvent> encoder;

	@Override
	public void start() {
		super.start();
	}

	@Override
	protected void append(LoggingEvent e) {
		try {
			if(GameProperties.gmFlag){
				String layout = encoder.getLayout(e);
				int index = layout.indexOf("Caused by");
				if(index>-1){
					layout = layout.substring(index, layout.length());
					StringBuilder sb = new StringBuilder();
					sb.append(layout);
					int i;   
				    StackTraceElement stack[] = (new Throwable()).getStackTrace();   
				    for (i=0; i < stack.length; i++) {   
				      StackTraceElement ste=stack[i];   
				      String className = ste.getClassName();
				      if(className.indexOf("com.teamtop")<0) continue;
				      if(className.indexOf("Appender")>0) continue;
				      sb.append("at ").append(className).append(".").append(ste.getMethodName()).append("(")
				      .append(ste.getFileName()).append(":").append(ste.getLineNumber()).append(")");
				      sb.append('\n').append('\n');
				    }  
//				    NettyWrite.writeAll(GmCmd.GC_ErrorPrint_96,new ErrorPrintResp(sb.toString(),2));
				}else{
//					NettyWrite.writeAll(GmCmd.GC_ErrorPrint_96,new ErrorPrintResp(layout,2));
				}
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
