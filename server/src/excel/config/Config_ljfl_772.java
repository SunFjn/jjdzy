package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ljfl_772;
public class Config_ljfl_772 extends ConfigBase<Struct_ljfl_772> {
    private static Config_ljfl_772 ins = null;
    public static Config_ljfl_772 getIns(){
        if(ins==null){
            ins = new Config_ljfl_772();
        }
        return ins;
    }
    private Config_ljfl_772(){
        put(1001,new Struct_ljfl_772(1001,1,1,410414,500));
        put(1002,new Struct_ljfl_772(1002,1,2,410415,500));
        put(1003,new Struct_ljfl_772(1003,1,3,410416,500));
        put(1004,new Struct_ljfl_772(1004,1,4,410417,500));
        put(1005,new Struct_ljfl_772(1005,1,5,410418,500));
        put(1006,new Struct_ljfl_772(1006,1,6,410419,500));
        put(1007,new Struct_ljfl_772(1007,1,7,410420,500));
        put(1008,new Struct_ljfl_772(1008,1,8,410421,500));
        put(1009,new Struct_ljfl_772(1009,1,109,410422,500));
        put(1010,new Struct_ljfl_772(1010,1,110,410423,500));
        put(2001,new Struct_ljfl_772(2001,2,1,410414,500));
        put(2002,new Struct_ljfl_772(2002,2,2,410415,500));
        put(2003,new Struct_ljfl_772(2003,2,3,410416,500));
        put(2004,new Struct_ljfl_772(2004,2,4,410417,500));
        put(2005,new Struct_ljfl_772(2005,2,5,410418,500));
        put(2006,new Struct_ljfl_772(2006,2,6,410419,500));
        put(2007,new Struct_ljfl_772(2007,2,7,410420,500));
        put(2008,new Struct_ljfl_772(2008,2,8,410421,500));
        put(2009,new Struct_ljfl_772(2009,2,109,410422,500));
        put(2010,new Struct_ljfl_772(2010,2,110,410423,500));
        put(3001,new Struct_ljfl_772(3001,3,1,410414,500));
        put(3002,new Struct_ljfl_772(3002,3,2,410415,500));
        put(3003,new Struct_ljfl_772(3003,3,3,410416,500));
        put(3004,new Struct_ljfl_772(3004,3,4,410417,500));
        put(3005,new Struct_ljfl_772(3005,3,5,410418,500));
        put(3006,new Struct_ljfl_772(3006,3,6,410419,500));
        put(3007,new Struct_ljfl_772(3007,3,7,410420,500));
        put(3008,new Struct_ljfl_772(3008,3,8,410421,500));
        put(3009,new Struct_ljfl_772(3009,3,109,410422,500));
        put(3010,new Struct_ljfl_772(3010,3,110,410423,500));
    }
    public void reset(){
        ins = null;
    }
}