package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_meirirenwu_708;
public class Config_meirirenwu_708 extends ConfigBase<Struct_meirirenwu_708> {
    private static Config_meirirenwu_708 ins = null;
    public static Config_meirirenwu_708 getIns(){
        if(ins==null){
            ins = new Config_meirirenwu_708();
        }
        return ins;
    }
    private Config_meirirenwu_708(){
        put(1,new Struct_meirirenwu_708(1,"[[7,0,5]]",10,"[[1,11]]"));
        put(2,new Struct_meirirenwu_708(2,"[[7,0,5]]",20,"[[1,24]]"));
        put(3,new Struct_meirirenwu_708(3,"[[7,0,5]]",10,"[[1,8]]"));
        put(4,new Struct_meirirenwu_708(4,"[[7,0,5]]",10,"[[1,1]]"));
        put(5,new Struct_meirirenwu_708(5,"[[7,0,5]]",10,"[[1,1]]"));
        put(6,new Struct_meirirenwu_708(6,"[[7,0,5]]",5,"[[200,1]]"));
        put(7,new Struct_meirirenwu_708(7,"[[7,0,5]]",15,"[[20,1]]"));
        put(8,new Struct_meirirenwu_708(8,"[[7,0,5]]",15,"[[1,12]]"));
        put(9,new Struct_meirirenwu_708(9,"[[7,0,5]]",10,"[[1,20]]"));
        put(10,new Struct_meirirenwu_708(10,"[[7,0,5]]",10,"[[1,20]]"));
        put(11,new Struct_meirirenwu_708(11,"[[7,0,5]]",20,"[[1,6]]"));
        put(12,new Struct_meirirenwu_708(12,"[[7,0,10]]",20,"[[1,11]]"));
        put(13,new Struct_meirirenwu_708(13,"[[7,0,10]]",20,"[[1,60]]"));
        put(14,new Struct_meirirenwu_708(14,"[[7,0,10]]",20,"[[1,6]]"));
        put(15,new Struct_meirirenwu_708(15,"[[7,0,10]]",30,"[[1,10]]"));
        put(16,new Struct_meirirenwu_708(16,"[[7,0,10]]",20,"[[1,28]]"));
        put(17,new Struct_meirirenwu_708(17,"[[7,0,5]]",5,"[[1,5]]"));
        put(18,new Struct_meirirenwu_708(18,"[[7,0,5]]",5,"[[100,1]]"));
        put(19,new Struct_meirirenwu_708(19,"[[7,0,5]]",5,"[[35,1]]"));
        put(20,new Struct_meirirenwu_708(20,"[[7,0,5]]",5,"[[180,1]]"));
        put(21,new Struct_meirirenwu_708(21,"[[7,0,5]]",5,"[[240,1]]"));
        put(22,new Struct_meirirenwu_708(22,"[[7,0,5]]",30,"[[40,1]]"));
        put(23,new Struct_meirirenwu_708(23,"[[7,0,5]]",30,"[[50,1]]"));
        put(24,new Struct_meirirenwu_708(24,"[[7,0,5]]",20,"[[300,1]]"));
        put(25,new Struct_meirirenwu_708(25,"[[7,0,5]]",20,"[[280,1]]"));
        put(26,new Struct_meirirenwu_708(26,"[[7,0,5]]",5,"[[1,1]]"));
        put(27,new Struct_meirirenwu_708(27,"[[7,0,5]]",5,"[[1,100]]"));
        put(28,new Struct_meirirenwu_708(28,"[[7,0,5]]",5,"[[1,30]]"));
        put(29,new Struct_meirirenwu_708(29,"[[7,0,5]]",5,"[[1,50]]"));
        put(30,new Struct_meirirenwu_708(30,"[[7,0,5]]",5,"[[50,1]]"));
        put(31,new Struct_meirirenwu_708(31,"[[7,0,5]]",5,"[[400,1]]"));
        put(32,new Struct_meirirenwu_708(32,"[[7,0,5]]",5,"[[450,1]]"));
        put(33,new Struct_meirirenwu_708(33,"[[7,0,5]]",5,"[[600,1]]"));
        put(34,new Struct_meirirenwu_708(34,"[[7,0,5]]",5,"[[200,1]]"));
    }
    public void reset(){
        ins = null;
    }
}