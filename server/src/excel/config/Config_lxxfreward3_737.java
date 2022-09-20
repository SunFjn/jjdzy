package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxxfreward3_737;
public class Config_lxxfreward3_737 extends ConfigBase<Struct_lxxfreward3_737> {
    private static Config_lxxfreward3_737 ins = null;
    public static Config_lxxfreward3_737 getIns(){
        if(ins==null){
            ins = new Config_lxxfreward3_737();
        }
        return ins;
    }
    private Config_lxxfreward3_737(){
        put(1003,new Struct_lxxfreward3_737(1003,"[[1,430006,1]]"));
        put(1007,new Struct_lxxfreward3_737(1007,"[[1,431210,1]]"));
        put(2003,new Struct_lxxfreward3_737(2003,"[[1,432006,1]]"));
        put(2007,new Struct_lxxfreward3_737(2007,"[[1,433010,1]]"));
        put(3003,new Struct_lxxfreward3_737(3003,"[[1,430006,1]]"));
        put(3007,new Struct_lxxfreward3_737(3007,"[[1,431210,1]]"));
    }
    public void reset(){
        ins = null;
    }
}