package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_herooff_287;
public class Config_herooff_287 extends ConfigBase<Struct_herooff_287> {
    private static Config_herooff_287 ins = null;
    public static Config_herooff_287 getIns(){
        if(ins==null){
            ins = new Config_herooff_287();
        }
        return ins;
    }
    private Config_herooff_287(){
        put(1,new Struct_herooff_287(1,"[[0,49]]",100));
        put(2,new Struct_herooff_287(2,"[[50,99]]",95));
        put(3,new Struct_herooff_287(3,"[[100,199]]",90));
        put(4,new Struct_herooff_287(4,"[[200,599]]",85));
        put(5,new Struct_herooff_287(5,"[[600,0]]",80));
    }
    public void reset(){
        ins = null;
    }
}