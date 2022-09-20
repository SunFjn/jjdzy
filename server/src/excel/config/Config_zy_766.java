package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zy_766;
public class Config_zy_766 extends ConfigBase<Struct_zy_766> {
    private static Config_zy_766 ins = null;
    public static Config_zy_766 getIns(){
        if(ins==null){
            ins = new Config_zy_766();
        }
        return ins;
    }
    private Config_zy_766(){
        put(1,new Struct_zy_766(1,446001));
        put(2,new Struct_zy_766(2,446002));
        put(3,new Struct_zy_766(3,446003));
        put(4,new Struct_zy_766(4,446004));
    }
    public void reset(){
        ins = null;
    }
}