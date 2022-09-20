package com.teamtop.netty.util;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;

/**
 * ByteBufToBytes 读取NIO的工具类，可以一次性把ByteBuf的数据读取出来，也可以把多次ByteBuf中的数据统一读取出来
 * @author Administrator
 *
 */
public class ByteBufToBytes {  
    private ByteBuf temp;  
  
    private boolean end = true;  
  
    public ByteBufToBytes(int length) {  
        temp = Unpooled.buffer(length);  
    }  
  
    public void reading(ByteBuf datas) {  
        datas.readBytes(temp, datas.readableBytes());  
        if (this.temp.writableBytes() != 0) {  
            end = false;  
        } else {  
            end = true;  
        }  
    }  
  
    public boolean isEnd() {  
        return end;  
    }  
  
    public byte[] readFull() {  
        if (end) {  
            byte[] contentByte = new byte[this.temp.readableBytes()];  
            this.temp.readBytes(contentByte);  
            this.temp.release();  
            return contentByte;  
        } else {  
            return null;  
        }  
    }  
  
    public byte[] read(ByteBuf datas) {  
        byte[] bytes = new byte[datas.readableBytes()];  
        datas.readBytes(bytes);  
        return bytes;  
    }  
} 
