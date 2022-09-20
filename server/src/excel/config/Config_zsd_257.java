package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zsd_257;
public class Config_zsd_257 extends ConfigBase<Struct_zsd_257> {
    private static Config_zsd_257 ins = null;
    public static Config_zsd_257 getIns(){
        if(ins==null){
            ins = new Config_zsd_257();
        }
        return ins;
    }
    private Config_zsd_257(){
        put(1,new Struct_zsd_257(1,3101,415001,50,49,1,1001));
        put(2,new Struct_zsd_257(2,3102,415002,50,49,6,1001));
        put(3,new Struct_zsd_257(3,2501,415003,50,49,2,1001));
        put(4,new Struct_zsd_257(4,2601,415004,50,49,3,1001));
        put(5,new Struct_zsd_257(5,2701,415005,50,49,4,1001));
        put(6,new Struct_zsd_257(6,2801,415006,50,49,7,1001));
        put(7,new Struct_zsd_257(7,3301,415007,50,49,5,1001));
    }
    public void reset(){
        ins = null;
    }
}