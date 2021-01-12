import moment from 'moment'


export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getNextPlayDate=(day)=>{
    let i;
    if(day === "tuesday")
    i = 2;
    if(day === "saturday")
    i = 6;
    var d = new Date();
    d.setDate(d.getDate() + (i + 7 - d.getDay()) % 7);
    return moment(d).format("YYYY-MM-DD");
}


export function uuid() {
    let d = moment(Date.now()).format("SSSSS-MMssDD-HHYYYYmm");
    let str = Math.floor(Math.random() * 10000);
    d += "-" + str
    console.log(d)
    return d;
  }
