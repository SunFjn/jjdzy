package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tm_292;
public class Config_tm_292 extends ConfigBase<Struct_tm_292> {
    private static Config_tm_292 ins = null;
    public static Config_tm_292 getIns(){
        if(ins==null){
            ins = new Config_tm_292();
        }
        return ins;
    }
    private Config_tm_292(){
        put(1,new Struct_tm_292(1,1));
        put(2,new Struct_tm_292(2,1));
        put(3,new Struct_tm_292(3,2));
        put(4,new Struct_tm_292(4,2));
        put(5,new Struct_tm_292(5,3));
        put(6,new Struct_tm_292(6,3));
    }
    public void reset(){
        ins = null;
    }
}