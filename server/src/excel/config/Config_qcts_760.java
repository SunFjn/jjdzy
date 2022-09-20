package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qcts_760;
public class Config_qcts_760 extends ConfigBase<Struct_qcts_760> {
    private static Config_qcts_760 ins = null;
    public static Config_qcts_760 getIns(){
        if(ins==null){
            ins = new Config_qcts_760();
        }
        return ins;
    }
    private Config_qcts_760(){
        put(1,new Struct_qcts_760(1,410409,7700,"百万兵魂","[[102,4800],[103,80],[104,64],[109,16]]",0));
        put(2,new Struct_qcts_760(2,410408,7700,"千古将魂","0",100));
    }
    public void reset(){
        ins = null;
    }
}