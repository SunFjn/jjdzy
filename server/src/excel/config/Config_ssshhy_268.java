package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ssshhy_268;
public class Config_ssshhy_268 extends ConfigBase<Struct_ssshhy_268> {
    private static Config_ssshhy_268 ins = null;
    public static Config_ssshhy_268 getIns(){
        if(ins==null){
            ins = new Config_ssshhy_268();
        }
        return ins;
    }
    private Config_ssshhy_268(){
        put(1001,new Struct_ssshhy_268(1001,3,"[[1,400920,1],[1,410049,2]]"));
        put(1002,new Struct_ssshhy_268(1002,5,"[[1,400920,1],[1,410049,2]]"));
        put(1003,new Struct_ssshhy_268(1003,10,"[[1,400920,1],[1,410049,3],[1,410050,1]]"));
        put(1004,new Struct_ssshhy_268(1004,15,"[[1,400920,1],[1,410049,3],[1,410050,2]]"));
        put(1005,new Struct_ssshhy_268(1005,20,"[[1,400921,1],[1,410049,4],[1,410053,1]]"));
        put(1006,new Struct_ssshhy_268(1006,25,"[[1,400921,1],[1,410049,5],[1,410050,2]]"));
        put(1007,new Struct_ssshhy_268(1007,30,"[[1,400921,1],[1,410049,6],[1,410053,1]]"));
        put(2001,new Struct_ssshhy_268(2001,1,"[[1,400922,1],[1,410058,2]]"));
        put(2002,new Struct_ssshhy_268(2002,3,"[[1,400922,1],[1,410058,3]]"));
        put(2003,new Struct_ssshhy_268(2003,5,"[[1,400922,1],[1,410058,5],[1,400910,1]]"));
        put(2004,new Struct_ssshhy_268(2004,8,"[[1,400922,1],[1,410058,5],[1,400910,2]]"));
        put(2005,new Struct_ssshhy_268(2005,10,"[[1,400923,1],[1,410058,10],[1,410053,1]]"));
        put(2006,new Struct_ssshhy_268(2006,12,"[[1,400923,1],[1,410058,10],[1,400910,2]]"));
        put(2007,new Struct_ssshhy_268(2007,15,"[[1,400923,1],[1,410058,15],[1,410053,1]]"));
        put(3001,new Struct_ssshhy_268(3001,3,"[[1,400924,1],[1,410058,2]]"));
        put(3002,new Struct_ssshhy_268(3002,5,"[[1,400924,1],[1,410058,3]]"));
        put(3003,new Struct_ssshhy_268(3003,10,"[[1,400924,1],[1,410058,5],[1,400910,1]]"));
        put(3004,new Struct_ssshhy_268(3004,15,"[[1,400924,1],[1,410058,5],[1,400910,2]]"));
        put(3005,new Struct_ssshhy_268(3005,20,"[[1,400925,1],[1,410058,10],[1,410053,1]]"));
        put(3006,new Struct_ssshhy_268(3006,25,"[[1,400925,1],[1,410058,10],[1,400910,2]]"));
        put(3007,new Struct_ssshhy_268(3007,30,"[[1,400925,1],[1,410058,15],[1,410053,1]]"));
        put(4001,new Struct_ssshhy_268(4001,3,"[[1,400926,1],[1,410049,2]]"));
        put(4002,new Struct_ssshhy_268(4002,5,"[[1,400926,1],[1,410049,2]]"));
        put(4003,new Struct_ssshhy_268(4003,8,"[[1,400926,1],[1,410049,3],[1,410050,1]]"));
        put(4004,new Struct_ssshhy_268(4004,10,"[[1,400926,1],[1,410049,3],[1,410050,2]]"));
        put(4005,new Struct_ssshhy_268(4005,15,"[[1,400927,1],[1,410049,4],[1,410053,1]]"));
        put(4006,new Struct_ssshhy_268(4006,20,"[[1,400927,1],[1,410049,5],[1,410050,2]]"));
        put(4007,new Struct_ssshhy_268(4007,25,"[[1,400927,1],[1,410049,6],[1,410053,1]]"));
    }
    public void reset(){
        ins = null;
    }
}