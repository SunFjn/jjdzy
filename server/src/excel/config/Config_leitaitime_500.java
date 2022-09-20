package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_leitaitime_500;
public class Config_leitaitime_500 extends ConfigBase<Struct_leitaitime_500> {
    private static Config_leitaitime_500 ins = null;
    public static Config_leitaitime_500 getIns(){
        if(ins==null){
            ins = new Config_leitaitime_500();
        }
        return ins;
    }
    private Config_leitaitime_500(){
        put(1,new Struct_leitaitime_500(1,"12:00:00","12:10:00"));
        put(2,new Struct_leitaitime_500(2,"14:00:00","14:10:00"));
        put(3,new Struct_leitaitime_500(3,"16:00:00","16:10:00"));
        put(4,new Struct_leitaitime_500(4,"18:00:00","18:10:00"));
        put(5,new Struct_leitaitime_500(5,"20:00:00","20:10:00"));
    }
    public void reset(){
        ins = null;
    }
}