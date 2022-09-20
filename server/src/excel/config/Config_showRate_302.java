package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_showRate_302;
public class Config_showRate_302 extends ConfigBase<Struct_showRate_302> {
    private static Config_showRate_302 ins = null;
    public static Config_showRate_302 getIns(){
        if(ins==null){
            ins = new Config_showRate_302();
        }
        return ins;
    }
    private Config_showRate_302(){
        put(1001,new Struct_showRate_302(1001,1,1));
        put(1002,new Struct_showRate_302(1002,1,2));
        put(2001,new Struct_showRate_302(2001,2,1));
        put(2002,new Struct_showRate_302(2002,2,2));
        put(2003,new Struct_showRate_302(2003,2,3));
        put(2004,new Struct_showRate_302(2004,2,4));
        put(3001,new Struct_showRate_302(3001,2,1));
        put(3002,new Struct_showRate_302(3002,2,2));
        put(3003,new Struct_showRate_302(3003,2,3));
        put(4001,new Struct_showRate_302(4001,2,1));
        put(4002,new Struct_showRate_302(4002,2,2));
        put(4003,new Struct_showRate_302(4003,2,3));
        put(5001,new Struct_showRate_302(5001,2,1));
        put(5002,new Struct_showRate_302(5002,2,2));
        put(5003,new Struct_showRate_302(5003,2,3));
        put(5004,new Struct_showRate_302(5004,2,4));
        put(5005,new Struct_showRate_302(5005,2,5));
        put(5006,new Struct_showRate_302(5006,2,6));
        put(6001,new Struct_showRate_302(6001,2,1));
        put(6002,new Struct_showRate_302(6002,2,2));
        put(7001,new Struct_showRate_302(7001,1,1));
        put(7002,new Struct_showRate_302(7002,1,2));
        put(7003,new Struct_showRate_302(7003,1,3));
        put(8001,new Struct_showRate_302(8001,2,1));
        put(8002,new Struct_showRate_302(8002,2,2));
        put(8003,new Struct_showRate_302(8003,2,3));
        put(9001,new Struct_showRate_302(9001,2,1));
        put(9002,new Struct_showRate_302(9002,2,2));
        put(9003,new Struct_showRate_302(9003,2,3));
        put(10001,new Struct_showRate_302(10001,2,1));
        put(11001,new Struct_showRate_302(11001,1,1));
        put(11002,new Struct_showRate_302(11002,1,2));
        put(11003,new Struct_showRate_302(11003,1,3));
        put(11004,new Struct_showRate_302(11004,1,4));
        put(11005,new Struct_showRate_302(11005,1,5));
        put(11006,new Struct_showRate_302(11006,1,6));
        put(11007,new Struct_showRate_302(11007,1,7));
        put(11008,new Struct_showRate_302(11008,1,8));
        put(12001,new Struct_showRate_302(12001,1,1));
        put(12002,new Struct_showRate_302(12002,1,2));
        put(12003,new Struct_showRate_302(12003,1,3));
        put(12004,new Struct_showRate_302(12004,1,4));
        put(12005,new Struct_showRate_302(12005,1,5));
        put(12006,new Struct_showRate_302(12006,1,6));
        put(12007,new Struct_showRate_302(12007,1,7));
        put(13001,new Struct_showRate_302(13001,1,1));
        put(13002,new Struct_showRate_302(13002,1,2));
    }
    public void reset(){
        ins = null;
    }
}