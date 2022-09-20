package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shouchong_714;
public class Config_shouchong_714 extends ConfigBase<Struct_shouchong_714> {
    private static Config_shouchong_714 ins = null;
    public static Config_shouchong_714 getIns(){
        if(ins==null){
            ins = new Config_shouchong_714();
        }
        return ins;
    }
    private Config_shouchong_714(){
        put(1,new Struct_shouchong_714(1,"[[1,430001,1],[1,422104,1],[1,422204,1],[1,422304,1],[1,422404,1]]"));
    }
    public void reset(){
        ins = null;
    }
}