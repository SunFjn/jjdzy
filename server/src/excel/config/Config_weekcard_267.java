package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_weekcard_267;
public class Config_weekcard_267 extends ConfigBase<Struct_weekcard_267> {
    private static Config_weekcard_267 ins = null;
    public static Config_weekcard_267 getIns(){
        if(ins==null){
            ins = new Config_weekcard_267();
        }
        return ins;
    }
    private Config_weekcard_267(){
        put(1,new Struct_weekcard_267(1,"[[4,0,9488],[1,410029,3],[1,400175,66]]",1,2,1));
    }
    public void reset(){
        ins = null;
    }
}