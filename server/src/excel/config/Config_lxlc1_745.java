package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxlc1_745;
public class Config_lxlc1_745 extends ConfigBase<Struct_lxlc1_745> {
    private static Config_lxlc1_745 ins = null;
    public static Config_lxlc1_745 getIns(){
        if(ins==null){
            ins = new Config_lxlc1_745();
        }
        return ins;
    }
    private Config_lxlc1_745(){
        put(1,new Struct_lxlc1_745(1,2,"[[1,432002,1]]",46001));
        put(2,new Struct_lxlc1_745(2,3,"[[1,434004,1]]",46002));
        put(3,new Struct_lxlc1_745(3,5,"[[1,431224,1]]",46003));
    }
    public void reset(){
        ins = null;
    }
}