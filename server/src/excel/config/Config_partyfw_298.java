package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_partyfw_298;
public class Config_partyfw_298 extends ConfigBase<Struct_partyfw_298> {
    private static Config_partyfw_298 ins = null;
    public static Config_partyfw_298 getIns(){
        if(ins==null){
            ins = new Config_partyfw_298();
        }
        return ins;
    }
    private Config_partyfw_298(){
        put(101,new Struct_partyfw_298(101,1,"[[1,416073,50]]",200,1));
        put(102,new Struct_partyfw_298(102,1,"[[1,416073,80]]",350,1));
        put(103,new Struct_partyfw_298(103,1,"[[1,416073,120]]",1000,1));
        put(104,new Struct_partyfw_298(104,1,"[[1,416073,160]]",1200,1));
        put(105,new Struct_partyfw_298(105,1,"[[1,416073,200]]",2000,1));
        put(111,new Struct_partyfw_298(111,2,"[[1,416088,50]]",500,1));
        put(112,new Struct_partyfw_298(112,2,"[[1,416088,100]]",1000,1));
        put(113,new Struct_partyfw_298(113,2,"[[1,416088,150]]",1700,1));
        put(114,new Struct_partyfw_298(114,2,"[[1,416088,200]]",2500,1));
        put(115,new Struct_partyfw_298(115,2,"[[1,416088,250]]",5000,1));
        put(121,new Struct_partyfw_298(121,3,"[[1,410450,50]]",1300,1));
        put(122,new Struct_partyfw_298(122,3,"[[1,410450,100]]",2000,1));
        put(123,new Struct_partyfw_298(123,3,"[[1,410450,150]]",3100,1));
        put(124,new Struct_partyfw_298(124,3,"[[1,410450,200]]",5000,1));
        put(125,new Struct_partyfw_298(125,3,"[[1,410450,250]]",8000,1));
        put(131,new Struct_partyfw_298(131,4,"[[1,416090,20]]",3000,1));
        put(132,new Struct_partyfw_298(132,4,"[[1,416090,40]]",4000,1));
        put(133,new Struct_partyfw_298(133,4,"[[1,416090,60]]",6000,1));
        put(134,new Struct_partyfw_298(134,4,"[[1,416090,80]]",9000,1));
        put(135,new Struct_partyfw_298(135,4,"[[1,416090,100]]",12000,1));
        put(141,new Struct_partyfw_298(141,5,"[[1,402093,1]]",6000,1));
        put(142,new Struct_partyfw_298(142,5,"[[1,402094,1]]",8000,1));
        put(143,new Struct_partyfw_298(143,5,"[[1,402095,1]]",10000,1));
        put(144,new Struct_partyfw_298(144,5,"[[1,402096,1]]",12500,1));
        put(145,new Struct_partyfw_298(145,5,"[[1,402097,1]]",15000,1));
        put(201,new Struct_partyfw_298(201,1,"[[1,416073,100]]",1000,2));
        put(202,new Struct_partyfw_298(202,1,"[[1,416073,200]]",3500,2));
        put(203,new Struct_partyfw_298(203,1,"[[1,416073,300]]",7000,2));
        put(204,new Struct_partyfw_298(204,1,"[[1,416073,400]]",11000,2));
        put(205,new Struct_partyfw_298(205,1,"[[1,416073,500]]",15000,2));
        put(211,new Struct_partyfw_298(211,2,"[[1,416088,200]]",5000,2));
        put(212,new Struct_partyfw_298(212,2,"[[1,416088,300]]",7000,2));
        put(213,new Struct_partyfw_298(213,2,"[[1,416088,400]]",11000,2));
        put(214,new Struct_partyfw_298(214,2,"[[1,416088,600]]",16000,2));
        put(215,new Struct_partyfw_298(215,2,"[[1,416088,800]]",22000,2));
        put(221,new Struct_partyfw_298(221,3,"[[1,416090,50]]",12000,2));
        put(222,new Struct_partyfw_298(222,3,"[[1,416090,100]]",15000,2));
        put(223,new Struct_partyfw_298(223,3,"[[1,416090,150]]",19000,2));
        put(224,new Struct_partyfw_298(224,3,"[[1,416090,200]]",24000,2));
        put(225,new Struct_partyfw_298(225,3,"[[1,416090,250]]",30000,2));
        put(231,new Struct_partyfw_298(231,4,"[[1,416074,1]]",20000,2));
        put(232,new Struct_partyfw_298(232,4,"[[1,416074,2]]",23000,2));
        put(233,new Struct_partyfw_298(233,4,"[[1,416074,3]]",26000,2));
        put(234,new Struct_partyfw_298(234,4,"[[1,416074,4]]",32000,2));
        put(235,new Struct_partyfw_298(235,4,"[[1,416074,6]]",38000,2));
        put(241,new Struct_partyfw_298(241,5,"[[1,402098,1]]",28000,2));
        put(242,new Struct_partyfw_298(242,5,"[[1,402099,1]]",31000,2));
        put(243,new Struct_partyfw_298(243,5,"[[1,402100,1]]",35000,2));
        put(244,new Struct_partyfw_298(244,5,"[[1,402101,1]]",40000,2));
        put(245,new Struct_partyfw_298(245,5,"[[1,402102,1]]",45000,2));
    }
    public void reset(){
        ins = null;
    }
}