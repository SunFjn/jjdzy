package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fwsj_263;
public class Config_fwsj_263 extends ConfigBase<Struct_fwsj_263> {
    private static Config_fwsj_263 ins = null;
    public static Config_fwsj_263 getIns(){
        if(ins==null){
            ins = new Config_fwsj_263();
        }
        return ins;
    }
    private Config_fwsj_263(){
        put(1,new Struct_fwsj_263(1,1,2,"[[1,400893,1]]",1));
        put(2,new Struct_fwsj_263(2,2,2,"[[1,400893,1]]",1));
        put(3,new Struct_fwsj_263(3,3,2,"[[1,400893,2]]",1));
        put(4,new Struct_fwsj_263(4,1,3,"[[1,410046,1],[1,400893,2]]",1));
        put(5,new Struct_fwsj_263(5,2,3,"[[1,410046,1],[1,400893,2]]",1));
        put(6,new Struct_fwsj_263(6,3,3,"[[1,410046,1],[1,400893,4]]",1));
        put(7,new Struct_fwsj_263(7,1,4,"[[1,410046,2],[1,400893,4]]",1));
        put(8,new Struct_fwsj_263(8,2,4,"[[1,410046,2],[1,400893,4]]",1));
        put(9,new Struct_fwsj_263(9,3,4,"[[1,410046,2],[1,400893,5]]",1));
        put(10,new Struct_fwsj_263(10,4,4,"[[1,410046,2],[1,400893,5]]",1));
        put(11,new Struct_fwsj_263(11,1,5,"[[1,410046,3],[1,400894,1]]",1));
        put(12,new Struct_fwsj_263(12,2,5,"[[1,410046,3],[1,400894,1]]",1));
        put(13,new Struct_fwsj_263(13,3,5,"[[1,410046,4],[1,400894,1]]",1));
        put(14,new Struct_fwsj_263(14,4,5,"[[1,410046,4],[1,400894,2]]",1));
        put(15,new Struct_fwsj_263(15,5,5,"[[1,410046,5],[1,400894,2]]",1));
        put(16,new Struct_fwsj_263(16,6,5,"[[1,410046,5],[1,400894,2]]",1));
        put(17,new Struct_fwsj_263(17,1,6,"[[1,410046,7],[1,400895,1]]",1));
        put(18,new Struct_fwsj_263(18,2,6,"[[1,410046,7],[1,400895,1]]",1));
        put(19,new Struct_fwsj_263(19,3,6,"[[1,410046,8],[1,400895,1]]",1));
        put(20,new Struct_fwsj_263(20,4,6,"[[1,410046,8],[1,400895,1]]",1));
    }
    public void reset(){
        ins = null;
    }
}