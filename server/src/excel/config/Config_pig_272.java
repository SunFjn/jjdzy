package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_pig_272;
public class Config_pig_272 extends ConfigBase<Struct_pig_272> {
    private static Config_pig_272 ins = null;
    public static Config_pig_272 getIns(){
        if(ins==null){
            ins = new Config_pig_272();
        }
        return ins;
    }
    private Config_pig_272(){
        put(1,new Struct_pig_272(1,42,"[[4,0,15000]]","[[4,0,15000]]"));
        put(2,new Struct_pig_272(2,43,"[[4,0,49000]]","[[4,0,49000]]"));
    }
    public void reset(){
        ins = null;
    }
}