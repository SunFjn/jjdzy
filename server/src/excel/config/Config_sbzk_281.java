package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sbzk_281;
public class Config_sbzk_281 extends ConfigBase<Struct_sbzk_281> {
    private static Config_sbzk_281 ins = null;
    public static Config_sbzk_281 getIns(){
        if(ins==null){
            ins = new Config_sbzk_281();
        }
        return ins;
    }
    private Config_sbzk_281(){
        put(1,new Struct_sbzk_281(1,"[[0,49]]",100));
        put(2,new Struct_sbzk_281(2,"[[50,99]]",90));
        put(3,new Struct_sbzk_281(3,"[[100,199]]",80));
        put(4,new Struct_sbzk_281(4,"[[200,599]]",70));
        put(5,new Struct_sbzk_281(5,"[[600,0]]",60));
    }
    public void reset(){
        ins = null;
    }
}