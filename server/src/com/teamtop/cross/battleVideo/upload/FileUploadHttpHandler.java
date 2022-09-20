package com.teamtop.cross.battleVideo.upload;

import io.netty.buffer.ByteBufInputStream;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpMessage;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.LastHttpContent;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.battleVideo.upload.event.AbsUploadEvent;
import com.teamtop.cross.battleVideo.upload.event.HttpUploadCache;
import com.teamtop.cross.battleVideo.upload.event.HttpUploadConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
public class FileUploadHttpHandler extends ChannelInboundHandlerAdapter {
    private volatile OutputStream out;
    private volatile File file;
    private AbsUploadEvent event;
    public static final int DEFAULT_MAX_COMPOSITEBUFFER_COMPONENTS = 1024;
	private static final Logger logger = LoggerFactory.getLogger(FileUploadHttpHandler.class);
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg)
			throws Exception {
		if (msg instanceof HttpMessage) {
			HttpMessage m = (HttpMessage) msg;
			if (msg instanceof HttpRequest) {
                HttpHeaders headers = m.headers();
                int uploadType = CommonUtil.transforObjtoInt(headers.get(HttpUploadConst.uploadType));
//                logger.info(m.toString());
                event = HttpUploadCache.getEvent(uploadType);
                if(event==null){
//                	System.err.println(event);
                }
                File tempFile = event.getFile(headers);
                if(tempFile.exists()) { // 文件已经存在可能是上次上传遗留的
                	tempFile.delete();
                }
                this.file = tempFile;
                this.out = new FileOutputStream(file, true);
            } else {
                throw new Error();
            }

		} else if (msg instanceof HttpContent) {
			if(this.out==null) return;
			HttpContent chunk = (HttpContent) msg;
			if (chunk.content().isReadable()) {
                chunk.retain();
                IOUtils.copyLarge(new ByteBufInputStream(chunk.content()), this.out);
            }

            final boolean last;
            if (!chunk.getDecoderResult().isSuccess()) {
                last = true;
            } else {
                last = chunk instanceof LastHttpContent;
            }

            if (last) {
            	this.out.flush();
                this.out.close();
                
                this.out = null;
                this.file = null;
                try {
					event.afterUpload(ctx);
				} catch (Exception e) {
					LogTool.error(e,this);
				}
            }
		} else {
            throw new Error();
        }
	}
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
//		super.exceptionCaught(ctx, cause);
	}
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
//		logger.info("disconnect");
	}
	
}
