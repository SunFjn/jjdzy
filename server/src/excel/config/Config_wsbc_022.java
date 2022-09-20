package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wsbc_022;
public class Config_wsbc_022 extends ConfigBase<Struct_wsbc_022> {
    private static Config_wsbc_022 ins = null;
    public static Config_wsbc_022 getIns(){
        if(ins==null){
            ins = new Config_wsbc_022();
        }
        return ins;
    }
    private Config_wsbc_022(){
        put(1,new Struct_wsbc_022(1,"[[1,440006,1]]","[[1,460061,1]]","[[1,460062,1]]","[[1,440005,1]]"));
        put(2,new Struct_wsbc_022(2,"[[1,431223,1]]","[[1,460063,1]]","[[1,460064,1]]","[[1,431203,1]]"));
        put(3,new Struct_wsbc_022(3,"[[1,432003,1]]","[[1,460065,1]]","[[1,460066,1]]","[[1,432001,1]]"));
        put(4,new Struct_wsbc_022(4,"[[1,430004,1]]","[[1,460067,1]]","[[1,460068,1]]","[[1,430001,1]]"));
        put(5,new Struct_wsbc_022(5,"[[1,434005,1]]","[[1,460069,1]]","[[1,460070,1]]","[[1,434002,1]]"));
        put(6,new Struct_wsbc_022(6,"[[1,441008,1]]","[[1,460071,1]]","[[1,460072,1]]","[[1,441001,1]]"));
        put(7,new Struct_wsbc_022(7,"[[1,401001,1]]","[[1,460073,1]]","[[1,460074,1]]","[[1,440008,1]]"));
    }
    public void reset(){
        ins = null;
    }
}