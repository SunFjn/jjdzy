package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_yqhy_278;
public class Config_yqhy_278 extends ConfigBase<Struct_yqhy_278> {
    private static Config_yqhy_278 ins = null;
    public static Config_yqhy_278 getIns(){
        if(ins==null){
            ins = new Config_yqhy_278();
        }
        return ins;
    }
    private Config_yqhy_278(){
        put(1,new Struct_yqhy_278(1,2,1,"[[1,400134,1],[4,0,4888],[1,400176,8]]"));
        put(2,new Struct_yqhy_278(2,3,3,"[[1,460080,1],[4,0,19888],[1,400176,38]]"));
        put(3,new Struct_yqhy_278(3,4,5,"[[1,400137,1],[4,0,29888],[1,400176,58]]"));
        put(4,new Struct_yqhy_278(4,5,8,"[[1,460081,1],[4,0,44888],[1,400176,88]]"));
        put(5,new Struct_yqhy_278(5,6,10,"[[1,400142,1],[4,0,54888],[1,400176,188]]"));
    }
    public void reset(){
        ins = null;
    }
}