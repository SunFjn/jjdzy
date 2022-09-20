package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dfzjjs2_261;
public class Config_dfzjjs2_261 extends ConfigBase<Struct_dfzjjs2_261> {
    private static Config_dfzjjs2_261 ins = null;
    public static Config_dfzjjs2_261 getIns(){
        if(ins==null){
            ins = new Config_dfzjjs2_261();
        }
        return ins;
    }
    private Config_dfzjjs2_261(){
        put(1,new Struct_dfzjjs2_261(1,"[[2,3]]"));
        put(2,new Struct_dfzjjs2_261(2,"[[4,8]]"));
        put(3,new Struct_dfzjjs2_261(3,"[[9,16]]"));
        put(4,new Struct_dfzjjs2_261(4,"[[17,32]]"));
    }
    public void reset(){
        ins = null;
    }
}