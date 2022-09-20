package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_meirishouchong_715;
public class Config_meirishouchong_715 extends ConfigBase<Struct_meirishouchong_715> {
    private static Config_meirishouchong_715 ins = null;
    public static Config_meirishouchong_715 getIns(){
        if(ins==null){
            ins = new Config_meirishouchong_715();
        }
        return ins;
    }
    private Config_meirishouchong_715(){
        put(1,new Struct_meirishouchong_715(1,"[[1,410029,2],[1,400132,1],[1,410015,3],[1,410001,500],[9,0,100000]]",43001));
    }
    public void reset(){
        ins = null;
    }
}