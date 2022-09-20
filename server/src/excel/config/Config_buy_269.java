package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_buy_269;
public class Config_buy_269 extends ConfigBase<Struct_buy_269> {
    private static Config_buy_269 ins = null;
    public static Config_buy_269 getIns(){
        if(ins==null){
            ins = new Config_buy_269();
        }
        return ins;
    }
    private Config_buy_269(){
        put(1,new Struct_buy_269(1,"[[1,410053,1]]","[[4,0,5000]]",0));
        put(2,new Struct_buy_269(2,"[[1,410049,1]]","[[4,0,500]]",0));
        put(3,new Struct_buy_269(3,"[[1,410050,1]]","[[4,0,2500]]",0));
        put(4,new Struct_buy_269(4,"[[1,410100,1]]","[[4,0,2500]]",0));
    }
    public void reset(){
        ins = null;
    }
}