package com.teamtop.util.mybatis;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

@SuppressWarnings("rawtypes")
public class BlobTypeHandler implements TypeHandler{
	  
	    @Override  
	    public Object getResult(ResultSet arg0, String arg1) throws SQLException {  
	        String str = arg0.getString(arg1);  
	        Boolean rt = Boolean.FALSE;  
	        if (str.equalsIgnoreCase("Y")){  
	            rt = Boolean.TRUE;  
	        }  
	        return rt;   
	    }  
	    @Override  
	    public Object getResult(CallableStatement arg0, int arg1)  
	            throws SQLException {  
	        Boolean b = arg0.getBoolean(arg1);  
	        return b == true ? "Y" : "N";  
	    }  
	  
	    @Override  
	    public void setParameter(PreparedStatement arg0, int arg1, Object arg2,  
	            JdbcType arg3) throws SQLException { 
	    	
	    	byte[] manyData = (byte[]) arg2;
			ByteArrayInputStream bis = new ByteArrayInputStream(manyData);
			
			arg0.setBinaryStream(arg1, bis, manyData.length);
	    	try {
				bis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	    }

		@Override
		public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
			return null;
		}  
	}  
